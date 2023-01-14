import useSWR, { KeyedMutator } from "swr"
import { UserResponse } from "@api/auth/me"
import { useEffect } from "react"
import { useRouter } from "next/router"

export interface User {
  name: string
  avatar_url: string | null
}

interface UseUserState {
  isLoading: boolean
  user?: User
  revalidateUser: KeyedMutator<UserResponse>
}

type TriggerFetch = () => Boolean
interface UseUserProps {
  privatePage?: boolean
}

const useUser = ({
  privatePage = false,
}: UseUserProps = { privatePage: false }): UseUserState => {

  const { data, isLoading, mutate: revalidateUser } = useSWR<UserResponse>('/api/auth/me')

  const { push } = useRouter()

  useEffect(() => {
    if (privatePage && data && !data.ok) {
      push("/login")
    }
  }, [data, privatePage, push])

  return { isLoading, user: data?.user, revalidateUser }
}

export default useUser
