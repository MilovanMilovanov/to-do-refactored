import { InputHTMLAttributes } from "react";

type InputModel = InputHTMLAttributes<HTMLInputElement>;

function Input({
  id,
  name,
  value,
  required,
  placeholder,
  type = "text",
  className = "",
  disabled = false,
  onChange,
}: InputModel) {
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      required={required}
      disabled={disabled}
      className={className}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default Input;
