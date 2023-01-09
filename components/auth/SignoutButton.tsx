import { NFC } from '@components/component'
import useSignout from '@lib/client/useSignout'

const SignoutButton: NFC = () => {
  const { signout, loading } = useSignout()
  return (
    <button className={loading ? "loading" : ""} onClick={signout} >Sign out</button>
  )
}

export default SignoutButton