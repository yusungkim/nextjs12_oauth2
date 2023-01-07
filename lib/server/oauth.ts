import { UserInfo } from './withSession'
import dbClient from './db'
import { OAuthCommon, oauthCommonMap } from "@lib/common/oauth"
import { json } from 'stream/consumers'

// for access token exchange
interface OAuthForAccessToken extends OAuthCommon {
  client_secret: string
  access_token_endpoint: string // Getting an access token with a web app
}

export interface OAuthMapForToken {
  github: OAuthForAccessToken
  google: OAuthForAccessToken
  line: OAuthForAccessToken
}

export const oauthMapForToken: OAuthMapForToken = {
  github: {
    ...oauthCommonMap.github,
    access_token_endpoint: "https://github.com/login/oauth/access_token",
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
  },
  google: {
    ...oauthCommonMap.google,
    access_token_endpoint: "https://oauth2.googleapis.com/token",
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
  },
  line: {
    ...oauthCommonMap.line,
    access_token_endpoint: "https://api.line.me/oauth2/v2.1/token",
    client_secret: process.env.LINE_CLIENT_SECRET!,
  },
}

// Get profile information from an ID token
const InfoUrls: { [key: string]: string } = {
  google: "https://www.googleapis.com/oauth2/v1/userinfo",
  github: "https://api.github.com/user",
  line: "https://api.line.me/oauth2/v2.1/userinfo",
}

const constructUserInfo = (info: { [key: string]: any }, provider: keyof OAuthMapForToken): UserInfo => {
  console.log("info: ", info)
  const userInfo = {
    id: `${provider}/${info.id || info.email || info.phone}`,
    name: info.name,
    avatar_url: info.picture,
  }

  switch (provider) {
    case "google":
      // id, email, verified_email, name, given_name, family_name, picture, locale
      return userInfo

    case "github":
      return {
        ...userInfo,
        avatar_url: info.avatar_url,
      }

    case "line":
      return {
        ...userInfo,
        id: `${provider}/${info.sub}`,
      }
  }
}

export const fetchUserInfoFromProvider = async (provider: keyof OAuthMapForToken, access_token: string) => {
  try {
    const infoFromProvider = await (await fetch(InfoUrls[provider], {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
      }
    })).json()
    return constructUserInfo(infoFromProvider, provider)
  } catch (error) {
    console.log(error)
    throw Error("Cannot get user info. CODE=301")
  }
}

export const registerIfNewUser = async (userInfo: UserInfo) => {
  const user = await dbClient?.user.findUnique({
    where: {
      id: userInfo.id
    }
  })
  if (!user) {
    await dbClient?.user.create({
      data: {
        ...userInfo,
        verified: true,
      }
    })
  }
}