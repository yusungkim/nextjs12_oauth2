import { useRouter } from "next/router"
import { ReactNode } from "react"
import { oauthUrl } from '@lib/client/oauth'
import { NFC } from '@components/component'
import Icon from "@components/icon"

interface OAuthButtonProps {
  url: string
  readonly children: ReactNode
}

const OAuthButton: NFC<OAuthButtonProps> = ({
  url = "",
  children
}) => {
  const router = useRouter()
  return (
    <button onClick={() => router.push(url)} className="btn btn-primary gap-2 w-3/4 hover:btn-success">
      {children}
    </button>
  )
}

// https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
export const OAuthGithubButton: NFC = () => {
  return (
    <OAuthButton url={oauthUrl("github")}>
      <Icon name="github" fill="white" />
      <div className="flex items-center gap-1 justify-center">
        <span className="text-lg">Login with Github</span>
        <Icon name="arrow-long-right" size="S" />
      </div>
    </OAuthButton>
  )
}

// https://developers.google.com/identity/protocols/oauth2/web-server#httprest_1
export const OAuthGoogleButton: NFC = () => {
  return (
    <OAuthButton url={oauthUrl("google")}>
      <Icon name="google" fill="white" />
      <div className="flex items-center gap-1 justify-center">
        <span className="text-lg">Login with Google</span>
        <Icon name="arrow-long-right" size="S" />
      </div>
    </OAuthButton>
  )
}

// // https://developers.weixin.qq.com/doc/oplatform/en/Website_App/WeChat_Login/Wechat_Login.html
// export const OAuthWechatButton: NFC = () => {
//   return (
//     <OAuthButton url={oauthUrl("wechat")}>
//       <Icon name="wechat" />
//       <div className="flex items-center gap-1 justify-center">
//         <span className="text-lg">Login with WeChat</span>
//         <Icon name="arrow-long-right" size="S" />
//       </div>
//     </OAuthButton>
//   )
// }

// https://developers.line.biz/en/docs/line-login/integrate-line-login/#create-a-channel
export const OAuthLineButton: NFC = () => {
  return (
    <OAuthButton url={oauthUrl("line")}>
      <Icon name="line" />
      <div className="flex items-center gap-1 justify-center">
        <span className="text-lg">Login with WeChat</span>
        <Icon name="arrow-long-right" size="S" />
      </div>
    </OAuthButton>
  )
}
