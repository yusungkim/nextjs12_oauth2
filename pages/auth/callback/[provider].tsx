import { ApiResponse } from '@lib/server/api'
import type { NextPage } from 'next'
import { NextRouter, useRouter } from 'next/router'
import { useEffect } from 'react'
import useMutation from '@lib/client/useMutation'
import useUser from '@lib/client/useUser'
import Layout from '@components/layout/Layout'

interface OAuthParamForAccessCodeToBackend {
  code: string
  provider: string
}

const getProviderAndCode = (router: NextRouter): OAuthParamForAccessCodeToBackend => {
  const provider = router.query.provider?.toString() || ""
  let code = router.query.code?.toString()

  // extract code from asPath
  if (!code) {
    const paramsString = router.asPath.split('?')[1]
    const params: { [key: string]: string } = paramsString
      .split('&')
      .map((param) => param.split('='))
      .reduce((acc, cur) => { return { ...acc, [cur[0]]: cur[1] } }, {})
    code = params.code
  }

  // URL encoded character to normal symbol, to surpress "Malformed auth code."
  code = code?.replaceAll("%2F", "/") || ""

  return { provider, code }
}

const OAuth: NextPage = () => {
  const router = useRouter()

  const [exchangeAccessToken, { data: accessTokenData, loading }] = useMutation<OAuthParamForAccessCodeToBackend, ApiResponse>("/api/auth/oauth")

  // 1. get and set access_token from github via backend
  useEffect(() => {
    if (router.isReady) {
      exchangeAccessToken(getProviderAndCode(router))
    }
  }, [router])

  const { user, isLoading, revalidateUser } = useUser()

  // 2. get user info using access_token via backend
  useEffect(() => {
    if (accessTokenData && revalidateUser) {
      revalidateUser()
    }
  }, [accessTokenData, revalidateUser])


  // 3. redirect to root
  useEffect(() => {
    if (user && router.isReady) {
      router.replace("/")
    }
  }, [user, router, isLoading])

  return (
    <Layout pageTitle='Confirm'>
      <div className="flex flex-col w-full">
        <div className="text-3xl font-semibold text-center flex flex-col gap-4 justify-center items-center">
          <div className="artboard phone-1 flex flex-col justify-center items-center gap-4">
            {(loading || accessTokenData?.ok)
              ? (
                <>
                  <p>{loading ? "Authorizing... " : "Login success."}</p>
                  <progress className="progress w-full"></progress>
                  <p className="font-normal text-xl">Do not refresh the page.</p>
                </>
              )
              : (
                <p>Login failed. Try again.</p>
              )
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default OAuth