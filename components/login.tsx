import Link from 'next/link'
import Icon from '../components/icon'
import { cls } from '../lib/client/utils'

type OAuthProvider = "github" | "google"

// https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
const OAuthGithubUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

const Login = () => {
  const oauth = (provider: OAuthProvider) => {
    switch (provider) {
      case "github":
        console.log("github")
    }
  }

  const loading = false

  return (
  <>
          <h1 className="text-3xl font-semibold text-center">Log in to {process.env.NEXT_PUBLIC_APP_NAME}</h1>
          <div className="grid overflow-hidden card rounded-box place-items-center">
            <div className="flex-col lg:flex-row-reverse w-full">
              <div className="card w-full my-4 bg-base-200">
                <div className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input type="text" placeholder="email" className="input input-bordered" />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input type="text" placeholder="password" className="input input-bordered" />
                    <label className="label">
                      <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                  </div>
                  <div className="form-control mt-6">
                    <button className={cls("btn btn-secondary", loading ? "loading" : "")}>Login</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="divider">OR</div>
          <div className="grid min-h-min w-full gap-3 place-items-center my-4">
            <Link href={OAuthGithubUrl} rel="noopener noreferrer" target="_blank" className="btn btn-primary gap-2 w-3/4 hover:btn-success">
              <Icon name="github" fill="white" /><span className="text-lg">Sign in with Github</span>
            </Link>
            <button onClick={()=>oauth("google")} className="btn btn-primary gap-2 w-3/4 hover:btn-success">
              <Icon name="google" fill="white" /><span className="text-lg">Sign in with Google</span>
            </button>
          </div>
        </>
  )
}

export default Login
