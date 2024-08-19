import { FormHTMLAttributes, ReactNode } from "react";

interface FormModel extends FormHTMLAttributes<HTMLFormElement> {
  buttons?: ReactNode;
}

function Form({
  id,
  title,
  buttons,
  children,
  className = "",
  onSubmit,
}: FormModel) {
  return (
    <form id={id} className={className} onSubmit={onSubmit}>
      <fieldset>
        <legend>{title}</legend>
        {children}
        {buttons}
      </fieldset>
    </form>
  );
}

export default Form;
