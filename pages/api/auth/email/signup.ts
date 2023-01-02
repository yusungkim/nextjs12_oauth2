import type { NextApiRequest, NextApiResponse } from "next"
import withMethodGuard from "@lib/server/withMethodGuard"
import { withApiSession } from "@lib/server/withSession"
import { ApiResponse } from "@lib/server/api"
import dbClient from "@lib/server/db"
import { createToken } from "@lib/server/utils"
import mail from "@sendgrid/mail"
import loginHtmlText from "@lib/server/email"

mail.setApiKey(process.env.SENDGRID_API_KEY!)

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

  try {
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
  } catch (error) {
    console.log(error)
    console.log(typeof error)
    return res.status(400).json({ ok: false, message: "Cannot register." })
  }

  await mail.send({
    from: "jinliuxing@gmail.com",
    to: email,
    subject: "Your Carrot Market Verification Email",
    text: `Welcome to ${process.env.APP_NAME}`,
    html: loginHtmlText(process.env.APP_NAME, safeName, `http://localhost:3000/auth/callbacks/confirm?token=${payload}`),
  })

  return res.status(200).json({ ok: true })
}

// get and post, both ok.
export default withApiSession(withMethodGuard({ methods: ["POST"], handler }))
