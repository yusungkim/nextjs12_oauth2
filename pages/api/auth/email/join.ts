import type { NextApiRequest, NextApiResponse } from "next"
import withMethodGuard from "@lib/server/withMethodGuard"
import { withApiSession } from "@lib/server/withSession"
import { ApiResponse } from "@lib/server/api"
import dbClient from "@lib/server/db"
import { createToken } from "@lib/server/utils"
import mail from "@sendgrid/mail"
import loginHtmlText from "@lib/server/email"
import { SignType } from "@components/auth/EmailSignupCard"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime"

mail.setApiKey(process.env.SENDGRID_API_KEY!)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { name, email, signType } = req.body

  console.log(signType)

  if (!email) {
    return res.status(400).json({ ok: false, message: "Email is required." })
  }

  if (signType == "signup" && !name) {
    return res.status(400).json({ ok: false, message: "Name is required." })
  }

  let safeName = name?.toString().trim()
  const safeEmail = email.toString().trim()
  const id = `email/${safeEmail}`
  const payload = createToken("email")

  if (signType == "signup") {
    console.log("signup")
    try {
      await dbClient?.token.create({
        data: {
          payload: payload,
          user: {
            create: {
              id,
              name: safeName
            }
          }
        }
      })
    } catch (error) {
      console.log(error)
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        console.log("error.message: ", error.message)
        return res.status(400).json({ ok: false, message: "Email is already registered. CODE=201" })
      }
      return res.status(500).json({ ok: false, message: "Cannot register. Try again. CODE=202" })
    }

  } else {
    try {
      const token = await dbClient?.token.create({
        data: {
          payload: payload,
          user: {
            connect: {
              id,
            }
          }
        },
        include: {
          user: {
            select: {
              name: true
            }
          }
        }
      })
      safeName = token.user.name
    } catch (error) {
      console.log(error)
      return res.status(500).json({ ok: false, message: "Cannot register. Try again. CODE=203" })
    }

  }

  await mail.send({
    from: "jinliuxing@gmail.com",
    to: email,
    subject: `Your ${process.env.APP_NAME} Verification Email`,
    html: loginHtmlText(
      process.env.APP_NAME,
      safeName,
      `http://localhost:3000/auth/callbacks/confirm?token=${payload}`
    ),
  })

  return res.status(200).json({ ok: true })
}

// get and post, both ok.
export default withApiSession(withMethodGuard({ methods: ["POST"], handler }))
