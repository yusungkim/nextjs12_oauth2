// 1. get access token from provider
// 2. create new session using cookie

import type { NextApiRequest, NextApiResponse } from "next";
import withMethodGuard from "@lib/server/withMethodGuard";
import { withApiSession } from "@lib/server/withSession";
import { ApiResponse } from "@lib/server/api";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { authorizationCode } = req.body

  if (!authorizationCode) {
    return res.status(400).json({ ok: false, message: "No authorization code."})
  }

  const formData = {
    client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: authorizationCode,
  }

  try {
    // https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(formData),
    })

    const {error, error_description, access_token} = await response.json();
    
    if (access_token) {
      req.session.auth = {
        provider: "github",
        access_token,
      }
      await req.session.save()
      return res.status(200).json({ ok: true })
    }

    if (error) {
      console.log(error_description)
      return res.status(403).json({ ok: false, message: "Authorization Failed. Try again." })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ ok: false, message: "Authorization Failed. Try again." })
  }
}

export default withApiSession(withMethodGuard({ methods: ["POST"], handler }));
