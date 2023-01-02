import { NFC } from "@components/component"
import EmailSignupCard from './EmailSignupCard'
import EmailSigninCard from './EmailSigninCard'
import { OAuthGithubButton, OAuthGoogleButton } from './OAuthButton'

const Login: NFC = () => {
  const signup = true
  return (
    <>
      <h1 className="text-3xl font-semibold text-center">
        {signup ? "Join with" : "Login to"} {process.env.NEXT_PUBLIC_APP_NAME}</h1>
      <div className="grid overflow-hidden card rounded-box place-items-center">
        <div className="flex-col lg:flex-row-reverse w-full">
          <div className="card w-full my-4 bg-base-200">
            {signup
              ? <EmailSignupCard />
              : <EmailSigninCard />
            }
          </div>
        </div>
      </div>
      <div className="divider">OR</div>
      <div className="grid min-h-min w-full gap-3 place-items-center my-4">
        <OAuthGithubButton />
        <OAuthGoogleButton />
      </div>
    </>
  )
}

export default Login
