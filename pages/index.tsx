import Login from '@components/login'
import useUser from '@lib/client/useUser'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const { user } = useUser()

  return (
    <div className="flex flex-col w-full">
      { user ? (
        <>
          <h1 className="text-3xl font-semibold text-center">Welcome back, {user.name}.</h1>  
        </>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default Home
