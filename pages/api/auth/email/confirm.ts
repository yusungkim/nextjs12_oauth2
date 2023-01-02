import type { NextApiRequest, NextApiResponse } from "next"
import withMethodGuard from "@lib/server/withMethodGuard"
import { withApiSession } from "@lib/server/withSession"
import { ApiResponse } from "@lib/server/api"
import dbClient from "@lib/server/db"
import { currentUnixTime } from "@lib/server/utils"
import { saveUserToSession } from "@lib/server/session"

const OAUTH_PROVIDERS = ["google", "github", "discord"]
export function validProvider(provider: string) {
  return OAUTH_PROVIDERS.includes(provider)
}

interface OAuthParamForAccessCode {
  client_id: string
  client_secret: string
  code: string
  redirect_uri: string
  grant_type?: string
}

const clearTokens = async (userId: string) => {
  await dbClient?.token.deleteMany({
    where: {
      userId
    }
  })
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { token } = req.body

  if (!token) {
    return res.status(400).json({ ok: false, message: 'Login failed (Invalid token). Please try again from the beginning. CODE:001' })
  }

  const provider = token.split("-")[0]
  if (provider != "email") {
    return res.status(400).json({ ok: false, message: 'Login failed (Invalid token). Please try again from the beginning. CODE:002' })
  }

  try {
    // Step1. check token
    const dbToken = await dbClient?.token.findFirst({
      where: {
        payload: token
      },
      select: {
        payload: true,
        expireAt: true,
        user: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
          }
        }
      },
    })

    if (!dbToken) {
      return res.status(400).json({ ok: false, message: 'Login failed (Invalid token). Please try again from the beginning. CODE:003' })
    }

    if (dbToken.expireAt > currentUnixTime()) {
      await clearTokens(dbToken.user.id)
      return res.status(400).json({ ok: false, message: 'Login failed (Token expired). Please try again from the beginning. CODE:004' })
    }

    // Step2. Mark as verified user
    await dbClient?.user.update({
      where: {
        id: dbToken.user.id
      },
      data: {
        ...dbToken.user,
        verified: true
      }
    })

    // Step3. Clean tokens for this user
    await clearTokens(dbToken.user.id)

    // Step4. Save user in session
    req.session.auth = {
      provider,
      access_token: null
    }
    const expireInSec = 60 * 60 * 24 // 1 day
    saveUserToSession(req, dbToken.user, expireInSec)
    await req.session.save()

    return res.status(200).json({ ok: true })
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Login failed. Please try again from the beginning. CODE:005' })
  }
}

export default withApiSession(withMethodGuard({ methods: ["POST"], handler }))
