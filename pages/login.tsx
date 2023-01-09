import Login from '@components/auth/Login'
import type { NextPage, NextComponentType, NextPageContext } from 'next'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col w-full">
      <Login signType="signin" />
    </div>
  )
}

export default Home
