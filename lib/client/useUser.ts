import useSWR from "swr";
import { UserResponse } from "@api/auth/me";
import { useEffect } from "react";
import { useRouter } from "next/router";

export interface User {
  name: string;
  avatar_url: string | null;
}

interface UseUserState {
  isLoading: boolean;
  user?: User
}

type TriggerFetch = () => Boolean
interface UseUserProps {
  triggerFetch?: TriggerFetch,
  privatePage?: boolean,
}

const useUser = ({
  triggerFetch = () => { return true },
  privatePage = false,
}: UseUserProps): UseUserState => {

  const { data, isLoading } = useSWR<UserResponse>(triggerFetch() ? '/api/auth/me' : null);

  const { push } = useRouter()

  useEffect(() => {
    if (privatePage && data && !data.ok) {
      push("/login")
    }
  }, [data, privatePage, push])

  return { isLoading, user: data?.user }
};

export default useUser;
