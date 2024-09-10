import { forwardRef, InputHTMLAttributes, Ref } from "react";

type InputModel = InputHTMLAttributes<HTMLInputElement>;

function Input(
  {
    id,
    name,
    value,
    placeholder,
    autoComplete,
    type = "text",
    className = "",
    disabled = false,
    "aria-describedby": ariaDescribedby,
    onChange,
  }: InputModel,
  ref: Ref<HTMLInputElement>
) {
  return (
    <input
      id={id}
      ref={ref}
      type={type}
      name={name}
      value={value}
      disabled={disabled}
      className={className}
      placeholder={placeholder}
      autoComplete={autoComplete}
      aria-describedby={ariaDescribedby}
      onChange={onChange}
    />
  );
}

export default forwardRef(Input);
