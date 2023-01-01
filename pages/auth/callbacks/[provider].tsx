import { ApiResponse } from '@lib/server/api'
import type { NextPage } from 'next'
import { NextRouter, useRouter } from 'next/router'
import { useEffect } from 'react'
import useMutation from '../../../lib/client/useMutation'
import useUser from '@lib/client/useUser'
import { OAuthParamForAccessCodeToBackend } from '@api/auth/oauth'

const getProviderAndCode = (router: NextRouter) => {
  const provider = router.query.provider
  let { code } = router.query

  // extract code from asPath
  if (code) {
    const paramsString = router.asPath.split('?')[1]
    const params: { [key: string]: string } = paramsString
      .split('&')
      .map((param) => param.split('='))
      .reduce((acc, cur) => { return {...acc, [cur[0]]: cur[1]}}, {})
    code = params.code
  }

  // URL encoded character to normal symbol, to surpress "Malformed auth code."
  code = code?.replaceAll("%2F", "/")

  return { provider, code }
}

const OAuth: NextPage = () => {
  const router = useRouter()

  const [exchangeAccessToken, {data: accessTokenData, loading, error}] = useMutation<OAuthParamForAccessCodeToBackend, ApiResponse>("/api/auth/oauth")

  // 1. get and set access_token from github via backend
  useEffect(() => {
    if (loading || accessTokenData?.ok || !router.query.provider || error) {
      return
    }
    exchangeAccessToken(getProviderAndCode(router))
  }, [router, loading, accessTokenData, error])

  // 2. get user info using access_token via backend
  const { user, isLoading } = useUser(()=>{
    return Boolean(accessTokenData?.ok)
  })

  // 3. redirect to root
  useEffect(()=>{
    if(user) {
      router.replace("/")
    }
  }, [user, router, isLoading])

  return (
    <div className="flex flex-col w-full">
      <div className="text-3xl font-semibold text-center flex flex-col gap-4 justify-center items-center">
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
  )
}

export default OAuth