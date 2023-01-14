import { ApiResponse } from '@lib/server/api'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useMutation from '@lib/client/useMutation'
import useUser from '@lib/client/useUser'
import Layout from '@components/layout/Layout'

interface ConfirmTokenForm {
  token: string
}

const Confirm: NextPage = () => {
  const router = useRouter()

  const [confirm, { data, loading }] = useMutation<ConfirmTokenForm, ApiResponse>("/api/auth/email/confirm")

  const { user, revalidateUser } = useUser()

  useEffect(() => {
    if (router.isReady) {
      const token = router?.query?.token
      confirm({ token })
    }
  }, [router])

  useEffect(() => {
    if (data?.ok && revalidateUser) {
      revalidateUser()
    }
  }, [revalidateUser, data])

  // redirect if login success
  useEffect(() => {
    if (user) {
      router.replace("/")
    }
  }, [user, router])

  return (
    <Layout pageTitle='Confirm'>
      <div className="flex flex-col w-full">
        <div className="text-3xl font-semibold text-center flex flex-col gap-4 justify-center items-center">
          <div className="artboard phone-1 flex flex-col justify-center items-center gap-4">
            {(loading || data?.ok)
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

export default Confirm