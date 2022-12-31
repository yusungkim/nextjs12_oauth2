// 1. get access token from provider
// 2. create new session using cookie

import type { NextApiRequest, NextApiResponse } from "next";
import withMethodGuard from "@lib/server/withMethodGuard";
import { withApiSession } from "@lib/server/withSession";
import { ApiResponse } from "@lib/server/api";

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

  if (!auth?.access_token) {
    console.log("no access token")
    return res.status(400).json({ok: false, message: "Authorization Failed. Try again."})
  }

  const { access_token, provider } = auth

  // get user info from git
  switch(provider) {
    case "github":
      const { name, id, avatar_url } = await (await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })).json();

      // set user info in session
      if (id) {
        // req.session.auth = {
        //   provider: "github",
        //   id,
        //   access_token
        // }
        // await req.session.save()
        return res.status(200).json({
          ok: true, 
          user: { name, avatar_url }
        })
      }
    default:
      res.status(400).json({ok: false, message: "Wrong auth provider."})
  }

  return res.status(500).json({ ok: false, message: "Authorization Failed. Try again." })
}

export default withApiSession(withMethodGuard({ methods: ["GET"], handler }));
