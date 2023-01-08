// common params
export interface OAuthCommon {
  client_id: string
  redirect_uri: string
}

interface OAuthCommonMap {
  github: OAuthCommon
  google: OAuthCommon
  line: OAuthCommon
  facebook: OAuthCommon
}

const redirectHostUrl = "http://localhost:3000/auth/callback"

export const oauthCommonMap: OAuthCommonMap = {
  github: {
    // doc: "https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps",
    client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
    redirect_uri: `${redirectHostUrl}/github`,
  },
  google: {
    // doc: "https://developers.google.com/identity/protocols/oauth2/web-server#httprest_1",
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    redirect_uri: `${redirectHostUrl}/google`,
  },
  line: {
    // doc: "https://developers.line.biz/en/docs/line-login/integrate-line-login/#create-a-channel",
    client_id: process.env.NEXT_PUBLIC_LINE_CLIENT_ID!,
    redirect_uri: `${redirectHostUrl}/line`,
  },
  facebook: {
    // doc: "https://developers.facebook.com/docs/facebook-login/guides/advanced/manual-flow/",
    client_id: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID!,
    redirect_uri: `${redirectHostUrl}/facebook`,
  },
}
