import { NFC } from "@components/component"
import useMutation from "@lib/client/useMutation"
import { cls } from "@lib/client/utils"
import { ApiResponse } from "@lib/server/api"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import MessageBox from "./MessageBox"

interface EmailForm {
  email: string
}

const EmailSigninCard: NFC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<EmailForm>()
  const [issueToken, { data, loading, error }] = useMutation<EmailForm, ApiResponse>("/api/auth/email/signin")

  const onValid = (formData: EmailForm) => {
    if (loading) {
      return
    }
    issueToken(formData)
  }

  useEffect(() => {
    if (data?.ok) {
      console.log("TOKEN issued.")
    }
  }, [data])

  const CodeConfirm = () => {
    return (<></>)
  }

  const SignWithEmail = () => {
    return (
      <>
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
      {data?.ok ? <CodeConfirm /> : <SignWithEmail />}
    </div>
  )
}

export default EmailSigninCard