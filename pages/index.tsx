import Login from '@components/auth/Login'
import SignoutButton from '@components/auth/SignoutButton'
import useUser, { User } from '@lib/client/useUser'
import type { NextPage, NextComponentType, NextPageContext } from 'next'

const Welcome: NextComponentType<NextPageContext, {}, { user: User }> = ({ user }) => {
  return (
    <>
      <h1 className="text-3xl font-semibold text-center">Welcome back, {user.name}.</h1>
      <img className="w-16 h-16 mx-auto my-5 border border-1 rounded-full p-1" src={user.avatar_url} alt=""/>
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
