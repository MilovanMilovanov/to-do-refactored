import {
  forwardRef,
  Ref,
  TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { mergeRefs } from "../../../utils/utils";

interface TextareaModel extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: number;
}

function Textarea(
  {
    id,
    name,
    value,
    required,
    placeholder,
    maxHeight = 10,
    className = "",
    onChange,
  }: TextareaModel,
  forwardedRef: Ref<HTMLTextAreaElement>
) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextArea = useCallback((textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `calc(${textarea.scrollHeight}px - 1rem)`;
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      const resizeObserver = new ResizeObserver(() => resizeTextArea(textarea));

      resizeObserver.observe(textarea);

      return () => resizeObserver.disconnect();
    }
  }, [resizeTextArea]);

  return (
    <textarea
      id={id}
      name={name}
      value={value}
      required={required}
      className={className}
      placeholder={placeholder}
      ref={mergeRefs(textareaRef, forwardedRef)}
      style={{ overflowY: "auto", maxHeight: `${maxHeight}rem` }}
      onChange={onChange}
    />
  );
}

export default forwardRef(Textarea);
