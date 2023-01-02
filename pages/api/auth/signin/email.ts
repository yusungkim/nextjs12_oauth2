import type { NextApiRequest, NextApiResponse } from "next"
import withMethodGuard from "@lib/server/withMethodGuard"
import { withApiSession } from "@lib/server/withSession"
import { ApiResponse } from "@lib/server/api"
import dbClient from "@lib/server/db"

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { name, email } = req.body

  if (!name || !email) {
    return res.status(400).json({ ok: false, message: "Both of name and email are required." })
  }

  const safeName = name.toString().trim()
  const safeEmail = email.toString().trim()
  const id = `email/${safeEmail}`
  const payload = Math.floor(100_000 + Math.random() * 900_000) + ""

  await dbClient?.token.create({
    data: {
      payload: payload,
      user: {
        connectOrCreate: {
          where: {
            id,
          },
          create: {
            id,
            name: safeName,
            nickname: safeName
          }
        }
      }
    }
  })

  return res.status(200).json({ ok: true })
}

// get and post, both ok.
export default withApiSession(withMethodGuard({ methods: ["GET", "POST"], handler }))
