import useSignout from '@lib/client/useSignout'
import { NextComponentType, NextPageContext } from "next"

const SignoutButton: NextComponentType<NextPageContext, {}, {}> = () => {
  const { signout, loading } = useSignout()
  return (
    <button className={`btn btn-error ${loading ? "loading" : ""}`} onClick={signout} >Sign out</button>
  )
}

export default SignoutButton