import { NFC } from "@components/component"
import { UseFormRegisterReturn } from "react-hook-form"
import { LevelClass } from "./daisyui"

interface TextInputProps {
  name: string
  register: UseFormRegisterReturn
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  errorMessage?: string
  levelClass: LevelClass
}

const TextInput: NFC<TextInputProps> = ({
  name,
  register,
  label,
  type = "text",
  placeholder = "",
  required = false,
  errorMessage,
  levelClass = "primary"
}) => {
  return (
    <div className="form-control">
      {label &&
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      }
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered input-${levelClass}`}
        required={required}
        id={name}
        {...register}
      />
      {errorMessage && <span className="text-red-500 text-sm py-1 px-2">{errorMessage}</span>}
    </div>
  )
}

export default TextInput