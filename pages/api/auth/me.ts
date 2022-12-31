// 1. get access token from provider
// 2. create new session using cookie

import type { NextApiRequest, NextApiResponse } from "next";
import withMethodGuard from "@lib/server/withMethodGuard";
import { withApiSession } from "@lib/server/withSession";
import { ApiResponse } from "@lib/server/api";
import { currentUnixTime } from "@lib/server/utils";

const expireInSec = parseInt(process.env.USER_CACHE_EXPIRY_IN_SEC!) || 60

export interface UserResponse extends ApiResponse {
  user?: {
    name: string;
    avatar_url: string | null;
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
      console.log("Valid User Info for", name)
      return res.status(200).json({
        ok: true, 
        user: { name, avatar_url }
      })
    } else {
      req.session.user = undefined
      await req.session.save()
    }
  }

  if (!auth?.access_token) {
    console.log("no access token")
    return res.status(400).json({ok: false, message: "Authorization Failed. Try again."})
  }

  // 2. Use access token and get user info from the provider if exist.
  const { access_token, provider } = auth
  console.log("Validate and Get User info from", provider)
  switch(provider) {
    case "github":
      const { name, id, avatar_url } = await (await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })).json();

      // set user info in session
      if (id) {
        console.log("set id to session")
        req.session.user = {
          id: `github/${id}`,
          name,
          avatar_url,
          expiry: currentUnixTime() + expireInSec,
        }
        await req.session.save()

        return res.status(200).json({
          ok: true, 
          user: { name, avatar_url }
        })
      }
    default:
      return res.status(400).json({ok: false, message: "Wrong auth provider."})
  }
}

export default withApiSession(withMethodGuard({ methods: ["GET"], handler }));
