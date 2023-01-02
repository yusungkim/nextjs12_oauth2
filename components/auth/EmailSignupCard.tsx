import { NFC } from "@components/component"
import useMutation from "@lib/client/useMutation"
import { cls } from "@lib/client/utils"
import { ApiResponse } from "@lib/server/api"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import MessageBox from "./MessageBox"

interface EmailForm {
  name?: string
  email: string
}

const EmailSignupCard: NFC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<EmailForm>()
  const [issueToken, { data, loading, error }] = useMutation<EmailForm, ApiResponse>("/api/auth/email/signup")
  const router = useRouter()

  const onValid = (formData: EmailForm) => {
    if (loading) {
      return
    }
    if (data?.ok) {
      return router.replace("/")
    }

    issueToken(formData)
  }

  useEffect(() => {
    if (data?.ok) {
      console.log("TOKEN issued.")
    }
  }, [data])

  const SignWithEmail = () => {
    return (
      <>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Alice"
            className="input input-bordered input-primary"
            required={true}
            id="name"
            {...register(
              "name",
              {
                required: "Please input your name",
                minLength: { value: 3, message: "Names should be longer than 2 characters." },
                maxLength: { value: 30, message: "Names should be shorter than 31 characters." },
                pattern: {
                  value: /^\w.+\w$/,
                  message: "Remove space(s) at the start and/or end",
                },
              }
            )}
          />
          {errors && <span className="text-red-500 text-sm py-1 px-2">{errors.name?.message}</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email address</span>
          </label>
          <input
            type="text"
            placeholder="your_email@me.com"
            className="input input-bordered input-primary"
            required={true}
            id="email"
            {...register(
              "email",
              {
                required: "Please input your email",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid email",
                },
              }
            )}
          />
          {errors && <span className="text-red-500 text-sm py-1 px-2">{errors.email?.message}</span>}
        </div>
        <div className="form-control mt-6">
          <button
            onClick={handleSubmit(onValid)}
            className={cls("btn btn-primary btn-outline", loading ? "loading" : "")}
          >Continue</button>
        </div>
      </>
    )
  }

  return (
    <div className="card-body">
      <div>
        {loading && <MessageBox type="info" message="Sending authorizaion code...." />}
        {data?.ok && <MessageBox type="success" message="Please check your email." />}
        {error && <MessageBox type="error" message="Something happened. Please try later." />}
        {!data?.ok && data?.message && <MessageBox type="error" message={data?.message} />}
      </div>
      <SignWithEmail />
    </div>
  )
}

export default EmailSignupCard