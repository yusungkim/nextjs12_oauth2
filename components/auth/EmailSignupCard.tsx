import Button from "@components/common/Button"
import TextInput from "@components/common/TextInput"
import { NFC } from "@components/component"
import useMutation from "@lib/client/useMutation"
import { ApiResponse } from "@lib/server/api"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import MessageBox from "./MessageBox"

interface EmailForm {
  name?: string
  email: string
  signType: string
}

export type SignType = "signup" | "signin"

const EmailSignupCard: NFC<{ signType: SignType }> = ({ signType }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<EmailForm>()
  const [issueToken, { data, loading, error }] = useMutation<EmailForm, ApiResponse>("/api/auth/email/join")
  const router = useRouter()

  const onValid = (formData: EmailForm) => {
    if (loading || data?.ok) { return }

    issueToken({
      ...formData,
      signType,
    })
  }

  return (
    <div className="card-body">
      <>
        {loading && <MessageBox type="info" message="Sending email...." />}
        {data?.ok && <MessageBox type="success" message="Please check your email." />}
        {error && <MessageBox type="error" message="Something happened. Please try later." />}
        {!data?.ok && data?.message && <MessageBox type="error" message={data?.message} />}
      </>
      {signType == "signup" &&
        <TextInput
          label="Name"
          placeholder="Jennifer Lawrence"
          name="name"
          levelClass="primary"
          required={true}
          register={register(
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
          errorMessage={errors.name?.message}
        />}
      <TextInput
        label="Email address"
        placeholder="your_email@me.com"
        name="email"
        levelClass="primary"
        required={true}
        register={register(
          "email",
          {
            required: "Please input your email",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Invalid email",
            },
          }
        )}
        errorMessage={errors.email?.message}
      />
      <div />
      <div />
      <Button onClick={handleSubmit(onValid)} loading={loading} title="Continue" />
    </div>
  )
}

export default EmailSignupCard