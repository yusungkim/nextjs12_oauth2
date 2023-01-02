import type { NextApiRequest, NextApiResponse } from "next"
import withMethodGuard from "@lib/server/withMethodGuard"
import { withApiSession } from "@lib/server/withSession"
import { ApiResponse } from "@lib/server/api"
import dbClient from "@lib/server/db"
import { createToken } from "@lib/server/utils"

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
  const payload = createToken("email")

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
            name: safeName
          }
        }
      }
    }
  })

  return res.status(200).json({ ok: true })
  return res.status(200).json({ ok: false, message: "This user does not exist." })
}

// get and post, both ok.
export default withApiSession(withMethodGuard({ methods: ["GET", "POST"], handler }))
