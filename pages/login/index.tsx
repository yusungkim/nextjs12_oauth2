import Login from '@components/auth/Login'
import Layout from '@components/layout/Layout'
import { useLocale } from '@lib/client/useLocale'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const {i18n: {PAGE: {LOGIN}}} = useLocale()

  return (
    <Layout pageTitle={LOGIN.TITLE} >
      <div className="flex flex-col w-full items-center">
        <Login signType="signin" />
      </div>
    </Layout>
  )
}

export default Home
