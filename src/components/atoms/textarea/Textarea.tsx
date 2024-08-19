import { TextareaHTMLAttributes, useEffect, useRef } from "react";

interface TextareaModel extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: number;
}

function Textarea({
  id,
  name,
  value,
  required,
  placeholder,
  maxHeight = 10,
  className = "",
  onChange,
}: TextareaModel) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      id={id}
      name={name}
      value={value}
      ref={textareaRef}
      required={required}
      className={className}
      placeholder={placeholder}
      style={{ overflowY: "auto", maxHeight: `${maxHeight}rem` }}
      onChange={onChange}
    />
  );
}

export default Textarea;
