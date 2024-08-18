import { ButtonHTMLAttributes } from "react";

interface ButtonModel extends ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel?: string;
}

function Button({
  type = "button",
  disabled = false,
  className = "",
  ariaLabel,
  children,
  onClick,
}: ButtonModel) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={className}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
