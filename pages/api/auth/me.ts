import type { NextApiRequest, NextApiResponse } from "next";
import withMethodGuard from "@lib/server/withMethodGuard";
import { UserInfo, withApiSession } from "@lib/server/withSession";
import { ApiResponse } from "@lib/server/api";
import { currentUnixTime } from "@lib/server/utils";
import { validProvider } from "@api/auth/oauth"

export interface UserResponse extends ApiResponse {
  user?: Omit<UserInfo, "id">
}

const expireInSec = parseInt(process.env.USER_CACHE_EXPIRY_IN_SEC!) || 60
const InfoUrls: {[key: string]: string} = {
  google: "https://www.googleapis.com/oauth2/v1/userinfo",
  github: "https://api.github.com/user"
}

const fetchUserInfo = async (url: string, access_token: string) => {
  return await (await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
    }
  })).json();
}

const constructUserInfo = (info: {[key: string]: any}, provider: string): UserInfo => {
  const userInfo = {
    id: `${provider}/${info.id || info.email || info.phone}`,
    name: info.name,
    avatar_url: info.avatar_url
  }

  switch (provider) {
    case "google":
      // id, email, verified_email, name, given_name, family_name, picture, locale
      return { 
        ...userInfo,
        avatar_url: info.picture
      }

    case "github":
      break;

    default:
      break;
  }
  return userInfo
}

async function saveUserInSession(req: NextApiRequest, userInfo: UserInfo) {
  const { id, name, avatar_url } = userInfo
  
  if (id) {
    req.session.user = {
      id,  // email/test@example.com | github/31542457 | phone/+81-09012341234
      name,
      avatar_url,
      expiry: currentUnixTime() + expireInSec,
    }
    await req.session.save()
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse>
) {
  const { user, auth } = req.session

  console.log("verify me")

  // 1. Use user info from the session if valid.
  if (user) {
    const { expiry, name, avatar_url } = user
    if (currentUnixTime() <= expiry) {
      return res.status(200).json({
        ok: true, 
        user: { name, avatar_url }
      })
    } else {
      // clear invalid userinfo
      req.session.user = undefined
      await req.session.save()
    }
  }

  if (!auth?.access_token) {
    console.log("no access token")
    return res.status(404).json({ok: false, message: "You've been logged out."})
  }

  const { access_token, provider } = auth
  if (!validProvider(provider)) {
    console.log(`Auth provider ${provider} is not allowed.`)
    return res.status(400).json({ ok: false, message: "Authorization Failed. Try again."})
  }

  // 2. Use access token and get user info from the provider if exist.
  try {
    console.log("Authenticate and Get User info from", provider)
    const info = await fetchUserInfo(InfoUrls[provider], access_token)
    const {id, ...rest} = constructUserInfo(info, provider)
    await saveUserInSession(req, {id, ...rest})
    return res.status(200).json({ok: true, user: rest})
  } catch (err) {
    return res.status(500).json({ok: false, message: "Something happened during oauth"})
  }
}

export default withApiSession(withMethodGuard({ methods: ["GET"], handler }));
