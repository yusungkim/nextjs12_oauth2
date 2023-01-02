import { useState } from "react"

// request headers
interface MutationOptions {
  headers?: {
    [key: string]: string
  }[]
}

// mutator function
type Mutator = (formData: any) => void

// response data that is updated when the mutator is called.
export interface MutationState<ReturnType> {
  data: undefined | ReturnType
  loading: boolean
  error: undefined | any
}

type UseMutationResponse<ReturnType> = [Mutator, MutationState<ReturnType>]

export default function useMutation<InputFormType = any, ReturnType = any>(
  url: string,
  options: MutationOptions = {}
): UseMutationResponse<ReturnType> {
  const [state, setState] = useState<MutationState<ReturnType>>({
    data: undefined,
    loading: false,
    error: undefined,
  })

  const mutator = async (formData: InputFormType) => {
    setState((prev) => ({ ...prev, loading: true }))
    const headers = options.headers || {}

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...headers,
        },
        body: JSON.stringify(formData),
      })
      const json = await response.json()
      setState((prev) => ({ ...prev, data: json }))
    } catch (err) {
      setState((prev) => ({ ...prev, error: err }))
    }
    setState((prev) => ({ ...prev, loading: false }))
  }
  return [mutator, state]
}
