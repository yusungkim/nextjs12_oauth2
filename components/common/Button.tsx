import { NFC } from "@components/component"
import { LevelClass } from "./daisyui"

interface ButtonProps {
  title: string
  onClick: () => void
  loading?: boolean
  levelClass?: LevelClass
  disabled?: boolean
}

const Button: NFC<ButtonProps> = ({
  title,
  onClick,
  loading = false,
  levelClass = "primary",
  disabled = false,
}) => {
  return (
    <div className="form-control mt-6">
      <button
        disabled={disabled}
        onClick={onClick}
        className={`btn btn-${levelClass} ${loading ? "loading" : ""}`}
      >{title}</button>
    </div>
  )
}

export default Button