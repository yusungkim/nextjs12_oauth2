import { v4 as uuidv4 } from 'uuid'

const redirectHostUrl = "http://localhost:3000/auth/callbacks"

// for authorization code
interface OAuthForCode {
  endpoint: string
  client_id: string
  redirect_uri: string
  scope: string
  additionals?: string
}

// for access token exchange
interface OAuthForAccessToken {
  client_id: string
  client_secret: string
  access_token_endpoint: string
}

export interface OAuthMap {
  github: OAuthForCode & OAuthForAccessToken
  google: OAuthForCode & OAuthForAccessToken
}

export const oauthMap: OAuthMap = {
  github: {
    // doc: "https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps",
    endpoint: "https://github.com/login/oauth/authorize",
    client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
    redirect_uri: `${redirectHostUrl}/github`,
    scope: "read:user",
    access_token_endpoint: "https://github.com/login/oauth/access_token",
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
  },
  google: {
    // doc: "https://developers.google.com/identity/protocols/oauth2/web-server#httprest_1",
    endpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    redirect_uri: `${redirectHostUrl}/google`,
    scope: "https://www.googleapis.com/auth/userinfo.profile",
    additionals: "&response_type=code&include_granted_scopes=true&access_type=offline", // response_type can be token or code
    access_token_endpoint: "https://oauth2.googleapis.com/token",
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
  },
}

export const oauthUrl = (provider: keyof OAuthMap) => {
  const {endpoint, client_id, redirect_uri, scope, additionals} = oauthMap[provider]
  return `${endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${uuidv4()}${additionals || ""}`
}