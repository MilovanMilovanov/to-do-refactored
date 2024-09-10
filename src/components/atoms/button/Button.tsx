import { ButtonHTMLAttributes } from "react";

type ButtonModel = ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  className = "",
  type = "button",
  disabled = false,
  "aria-label": ariaLabel,
  children,
  onClick,
}: ButtonModel) {
  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
