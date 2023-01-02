import Login from '@components/auth/login'
import SignoutButton from '@components/auth/SignoutButton'
import useUser, { User } from '@lib/client/useUser'
import type { NextPage, NextComponentType, NextPageContext } from 'next'

const Welcome: NextComponentType<NextPageContext, {}, { user: User }> = ({ user }) => {
  return (
    <>
      <h1 className="text-3xl font-semibold text-center">Welcome back, {user.name}.</h1>
      <div className="divider"></div>
      <SignoutButton />
    </>
  )
}

const Home: NextPage = () => {
  const { user } = useUser()

  return (
    <div className="flex flex-col w-full">
      {user ? (
        <Welcome user={user} />
      ) : (
        <Login />
      )}
    </div>
  )
}

export default Home
