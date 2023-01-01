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
    additionals: "&response_type=code&include_granted_scopes=true&access_type=offline", // response_type can be token or code
  },
}

export const oauthUrl = (provider: keyof OAuthMapForCode) => {
  const {endpoint, client_id, redirect_uri, scope, additionals} = oauthMapForCode[provider]
  return `${endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${uuidv4()}${additionals || ""}`
}