import type { NextApiRequest, NextApiResponse } from "next"
import withMethodGuard from "@lib/server/withMethodGuard"
import { UserInfo, withApiSession } from "@lib/server/withSession"
import { ApiResponse } from "@lib/server/api"
import { currentUnixTime } from "@lib/server/utils"
import { validProvider } from "@api/auth/oauth"
import { fetchUserInfoFromProvider, OAuthMapForToken } from "@lib/server/oauth"
import { saveUserToSession } from "@lib/server/session"

export interface UserResponse extends ApiResponse {
  user?: Omit<UserInfo, "id">
}

const expireInSec = parseInt(process.env.USER_CACHE_EXPIRY_IN_SEC!) || 60

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse>
) {
  const { user, auth } = req.session

  console.log("verify me")

  // 1. Use user info from the session if valid.
  if (user) {
    const { id, expiry, ...rest } = user

    if (currentUnixTime() <= expiry) {
      return res.status(200).json({
        ok: true,
        user: rest
      })
    } else {
      // clear invalid userinfo
      req.session.user = undefined
      await req.session.save()
    }
  }

  if (!auth?.access_token) {
    console.log("no access token")
    return res.status(404).json({ ok: false, message: "You've been logged out." })
  }

  const { access_token, provider: providerString } = auth
  if (!validProvider(providerString)) {
    console.log(`Auth provider ${providerString} is not allowed.`)
    return res.status(400).json({ ok: false, message: "Authorization Failed. Try again." })
  }

  const provider = providerString as keyof OAuthMapForToken

  // 2. Use access token and get user info from the provider if exist.
  try {
    console.log("Authenticate and Get User info from", provider)
    const userInfo = await fetchUserInfoFromProvider(provider, access_token)
    await saveUserToSession(req, userInfo, expireInSec)
    const { id, ...rest } = userInfo
    return res.status(200).json({ ok: true, user: rest })
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Something happened during oauth" })
  }
}



export default withApiSession(withMethodGuard({ methods: ["GET"], handler }))
