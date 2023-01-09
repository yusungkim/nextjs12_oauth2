import { NFC } from "@components/component"
import Icon from "@components/common/Icon"
import Link from "next/link"
import EmailSignupCard, { SignType } from './EmailSignupCard'
import { OAuthGithubButton, OAuthGoogleButton, OAuthLineButton, OAuthFacebookButton } from './OAuthButton'

interface LoginProps {
  signType: SignType
}

const Login: NFC<LoginProps> = ({ signType = "signup" }) => {

  return (
    <div className="max-w-[600px] w-full py-20">
      <h1 className="text-3xl font-semibold text-center">
        {signType == "signup" ? "Join" : "Login to"} {process.env.NEXT_PUBLIC_APP_NAME}</h1>
      <div className="grid overflow-hidden card rounded-box place-items-center">
        <div className="flex-col lg:flex-row-reverse w-full">
          <div className="card w-full my-4 bg-base-200">
            <EmailSignupCard signType={signType} />
          </div>
        </div>
        <div className="flex justify-center items-center gap-2">
          {signType == "signup" ? (
            <>
              <span>Already have an account?</span>
              <Link href="/login" className="flex justify-center items-center text-info">
                <span>Login</span>
                <Icon name="arrow-long-right-mini" size="S" />
              </Link>
            </>
          ) : (
            <>
              <span>Don&apos;t have an account?</span>
              <Link href="/join" className="flex justify-center items-center text-info">
                <span>Create One</span>
                <Icon name="arrow-long-right-mini" size="S" />
              </Link></>
          )}

        </div>
      </div>
      <div className="divider py-10">OR</div>
      <div className="grid min-h-min w-full gap-3 place-items-center my-4">
        <OAuthLineButton />
        <OAuthGoogleButton />
        <OAuthFacebookButton />
        <OAuthGithubButton />
      </div>
    </div>
  )
}

export default Login
