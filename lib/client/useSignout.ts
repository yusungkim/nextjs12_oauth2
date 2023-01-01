import useMutation from "./useMutation";
import { ApiResponse } from "@lib/server/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useSignout = () => {
  const [signout, { data, loading }] = useMutation<void, ApiResponse>("/api/auth/signout")

  const router = useRouter()

  useEffect(() => {
    if (data?.ok) {
      console.log("back to login page")
      router.reload()
    }
  }, [data, router])

  return { signout: ()=>signout({}), loading }
};

export default useSignout;
