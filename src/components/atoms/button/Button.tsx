import { ButtonHTMLAttributes } from "react";

interface ButtonModel extends ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel?: string;
}

function Button({
  type = "button",
  disabled = false,
  className = "",
  children,
  onClick,
}: ButtonModel) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
