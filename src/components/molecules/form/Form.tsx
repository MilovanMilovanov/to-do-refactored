import { FormHTMLAttributes, ReactNode } from "react";
import styles from "./Form.module.scss";

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
    <form id={id} className={`${styles.form} ${className}`} onSubmit={onSubmit}>
      <fieldset>
        <legend className={styles.title}>{title}</legend>
        {children}
        <div className={styles.buttonContainer}>{buttons}</div>
      </fieldset>
    </form>
  );
}

export default Form;
