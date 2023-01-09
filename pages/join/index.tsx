import Login from '@components/auth/Login'
import Layout from '@components/layout/Layout'
import { useLocale } from '@lib/client/useLocale'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const { i18n: { PAGE: { JOIN } } } = useLocale()

  return (
    <Layout pageTitle={JOIN.TITLE} >
      <div className="flex flex-col w-full items-center">
        <Login signType="signup" />
      </div>
    </Layout>
  )
}

export default Home
