import { cls } from '@lib/client/utils'
import { OAuthGithub, OAuthGoogle } from './oauth/AuthLink'

const Login = () => {
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
            <OAuthGithub />
            <OAuthGoogle />
          </div>
        </>
  )
}

export default Login
