import { OAuthCommon, oauthCommonMap } from '@lib/common/oauth'
import { v4 as uuidv4 } from 'uuid'

// for authorization code
export interface OAuthForCode extends OAuthCommon {
  endpoint: string
  scope: string
  additionals?: string
}
export interface OAuthMapForCode {
  github: OAuthForCode
  google: OAuthForCode
  line: OAuthForCode
  facebook: OAuthForCode
}
export const oauthMapForCode: OAuthMapForCode = {
  github: {
    ...oauthCommonMap.github,
    endpoint: "https://github.com/login/oauth/authorize",
    scope: "read:user",
  },
  google: {
    ...oauthCommonMap.google,
    endpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    scope: "https://www.googleapis.com/auth/userinfo.profile",
    additionals: "&include_granted_scopes=true&access_type=offline", // response_type can be token or code
  },
  line: {
    ...oauthCommonMap.line,
    endpoint: "https://access.line.me/oauth2/v2.1/authorize",
    scope: "profile openid",
    additionals: "",
  },
  facebook: {
    ...oauthCommonMap.facebook,
    endpoint: "https://www.facebook.com/v15.0/dialog/oauth",
    scope: "public_profile",
    additionals: "",
  },
}

export const oauthUrl = (provider: keyof OAuthMapForCode) => {
  const { endpoint, client_id, redirect_uri, scope, additionals } = oauthMapForCode[provider]
  const url = `${endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=code&state=${uuidv4()}}&nonce=${uuidv4()}${additionals || ""}`
  return url
}