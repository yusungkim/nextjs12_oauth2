import useSWR from "swr";
import { UserResponse } from "@api/auth/me";

export interface User {
  name: string;
  avatar_url: string | null;
}

interface UseUserState {
  isLoading: boolean;
  user?: User
}

type TriggerFetch = () => Boolean

const useUser = (triggerFetch: TriggerFetch = ()=>{ return true }): UseUserState => {

  const { data, isLoading } = useSWR<UserResponse>( triggerFetch() ? '/api/auth/me' : null);

  return { isLoading, user: data?.user}
};

export default useUser;
