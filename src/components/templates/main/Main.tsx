import { HtmlHTMLAttributes } from "react";

type MainModel = HtmlHTMLAttributes<HTMLElement>;

function main({ children, className = "" }: MainModel) {
  return <main className={className}>{children}</main>;
}

export default main;
