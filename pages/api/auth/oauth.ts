// 1. get access token from provider if there is no access_token provided.
// 2. create new session using cookie

import type { NextApiRequest, NextApiResponse } from "next";
import withMethodGuard from "@lib/server/withMethodGuard";
import { withApiSession } from "@lib/server/withSession";
import { ApiResponse } from "@lib/server/api";
import { fetchUserInfoFromProvider, oauthMapForToken, OAuthMapForToken, registerIfNewUser } from "@lib/server/oauth";

const OAUTH_PROVIDERS = ["google", "github", "line", "discord"]
export function validProvider(provider: string) {
  return OAUTH_PROVIDERS.includes(provider)
}

interface OAuthParamForAccessCode {
  client_id: string
  client_secret: string
  code: string
  redirect_uri: string
  grant_type: string
}

async function fetchWithFormUrlEncoded(url: string, headers: HeadersInit, jsonData: OAuthParamForAccessCode): Promise<Response> {
  const formData = new URLSearchParams();
  Object
    .keys(jsonData)
    .map(key => key as keyof (OAuthParamForAccessCode))
    .forEach(key => formData.append(key, jsonData[key]));

  return await fetch(url, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formData,
  })
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { provider, code } = req.body

  if (!validProvider(provider)) {
    return res.status(400).json({ ok: false, message: `Auth provider ${provider} is not allowed.` })
  }

  // codeでaccess_tokenを取得
  if (!code) {
    return res.status(400).json({ ok: false, message: "No authorization code." })
  }

  const oauthInfo = oauthMapForToken[provider as keyof OAuthMapForToken]

  let headers = {
    "Content-Type": "application/json, charset=utf-8",
    "Accept": "application/json",
  }

  let formData: OAuthParamForAccessCode = {
    client_id: oauthInfo.client_id,
    client_secret: oauthInfo.client_secret,
    redirect_uri: oauthInfo.redirect_uri,
    code: code.toString(),
    grant_type: "authorization_code",
  }

  try {
    const response =
      provider == "line"
        ? await fetchWithFormUrlEncoded(oauthInfo.access_token_endpoint, headers, formData)
        : await fetch(oauthInfo.access_token_endpoint, {
          method: "POST",
          headers,
          body: JSON.stringify(formData),
        })

    const {
      access_token, token_type, scope, expires_in, refresh_token, // success
      error, error_description,       // fails
    } = await response.json()

    if (access_token) {
      // save in session
      console.log("access_token:", access_token)
      req.session.auth = {
        provider,
        access_token,
      }
      await req.session.save()

      // register if new user
      const userInfo = await fetchUserInfoFromProvider(provider, access_token)
      await registerIfNewUser(userInfo)

      // end response
      return res.status(200).json({ ok: true })
    }

    if (error) {
      console.log(error, error_description)
      return res.status(403).json({ ok: false, message: "Authorization Failed. Try again." })
    }
  } catch (err) {
    console.log("api/auth/oauth err: ", err)
    return res.status(500).json({ ok: false, message: "Authorization Failed. Try again." })
  }
}

export default withApiSession(withMethodGuard({ methods: ["POST"], handler }));
