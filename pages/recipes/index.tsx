import Layout from '@components/layout/Layout'
import { useLocale } from '@lib/client/useLocale'
import type { NextPage } from 'next'

const Recipe: NextPage = () => {
  const { i18n: { PAGE: { RECIPE } } } = useLocale()

  return (
    <Layout pageTitle={RECIPE.TITLE} >
      <div className="flex flex-col w-full">
        <h1 className="text-xl">{RECIPE.TITLE}</h1>
      </div>
    </Layout>
  )
}

export default Recipe
