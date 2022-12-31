import { ApiResponse } from '@lib/server/api'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useMutation from '../../../lib/client/useMutation'
import useUser from '@lib/client/useUser'

const OAuth: NextPage = () => {
  const router = useRouter()
  const authorizationCode = router.query.code

  const [getAccessTokenFromGithub, {data: accessTokenData, loading}] = useMutation<{authorizationCode: string}, ApiResponse>("/api/auth/oauth")

  // 1. get and set access_token from github via backend
  useEffect(() => {
    if (loading || !authorizationCode || accessTokenData) {
      return
    }
    console.log("get and set access token")
    getAccessTokenFromGithub({ authorizationCode })
  }, [authorizationCode, loading, accessTokenData])

  // 2. get user info using access_token via backend
  const { user, isLoading } = useUser(()=>{
    console.log("get user info when 'access_token' is ready")
    return Boolean(accessTokenData?.ok)
  })

  // 3. redirect to root
  useEffect(()=>{
    if(user) {
      console.log("jump to root")
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