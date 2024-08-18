import { LabelHTMLAttributes } from "react";

type LabelModel = LabelHTMLAttributes<HTMLLabelElement>;

function Label({ htmlFor, className, children }: LabelModel) {
  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  );
}
export default Label;
