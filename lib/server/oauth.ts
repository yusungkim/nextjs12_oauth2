import { UserInfo } from './withSession'
import dbClient from './db'
import { OAuthCommon, oauthCommonMap } from "@lib/common/oauth"

// for access token exchange
interface OAuthForAccessToken extends OAuthCommon {
  client_secret: string
  access_token_endpoint: string
}

export interface OAuthMapForToken {
  github: OAuthForAccessToken
  google: OAuthForAccessToken
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
}

const InfoUrls: {[key: string]: string} = {
  google: "https://www.googleapis.com/oauth2/v1/userinfo",
  github: "https://api.github.com/user"
}

const constructUserInfo = (info: {[key: string]: any}, provider: keyof OAuthMapForToken): UserInfo => {
  const userInfo = {
    id: `${provider}/${info.id || info.email || info.phone}`,
    name: info.name,
    avatar_url: info.avatar_url,
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

export const fetchUserInfoFromProvider = async (provider: keyof OAuthMapForToken, access_token: string) => {
  const infoFromProvider = await (await fetch(InfoUrls[provider], {
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
    }
  })).json();

  return constructUserInfo(infoFromProvider, provider)
}

export const registerIfNewUser = async (userInfo: UserInfo) => {
  const user = await dbClient?.user.findUnique({
    where: {
      id: userInfo.id
    }
  })
  if (!user) {
    await dbClient?.user.create({
      data: userInfo
    })
  }
}