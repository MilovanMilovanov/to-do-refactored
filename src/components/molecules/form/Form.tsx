import { FormHTMLAttributes, ReactNode } from "react";

interface FormModel extends FormHTMLAttributes<HTMLFormElement> {
  title: string;
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
      <fieldset role="group" aria-labelledby={`${title}-legend`}>
        <legend id={`${title}-legend`}>{title}</legend>
        {children}
        {buttons}
      </fieldset>
    </form>
  );
}

export default Form;
