import { NFC } from "@components/component"
import EmailSignupCard, { SignType } from './EmailSignupCard'
import { OAuthGithubButton, OAuthGoogleButton, OAuthLineButton, OAuthFacebookButton } from './OAuthButton'

const Login: NFC = () => {
  const signType: SignType = "signup"

  return (
    <>
      <h1 className="text-3xl font-semibold text-center">
        {signType == "signup" ? "Join" : "Login to"} {process.env.NEXT_PUBLIC_APP_NAME}</h1>
      <div className="grid overflow-hidden card rounded-box place-items-center">
        <div className="flex-col lg:flex-row-reverse w-full">
          <div className="card w-full my-4 bg-base-200">
            <EmailSignupCard signType={signType} />
          </div>
        </div>
      </div>
      <div className="divider">OR</div>
      <div className="grid min-h-min w-full gap-3 place-items-center my-4">
        <OAuthLineButton />
        <OAuthGoogleButton />
        <OAuthFacebookButton />
        <OAuthGithubButton />
      </div>
    </>
  )
}

export default Login
