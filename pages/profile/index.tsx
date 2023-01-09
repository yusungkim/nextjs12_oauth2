import Layout from '@components/layout/Layout'
import { useLocale } from '@lib/client/useLocale'
import type { NextPage } from 'next'

const Profile: NextPage = () => {
  const { i18n: { PAGE: { PROFILE } } } = useLocale()

  return (
    <Layout pageTitle={PROFILE.TITLE} privatePage >
      <div className="flex flex-col w-full">
        <h1 className="text-xl">{PROFILE.TITLE}</h1>
      </div>
    </Layout>
  )
}

export default Profile
