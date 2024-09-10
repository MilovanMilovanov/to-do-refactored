import { forwardRef, Ref, SelectHTMLAttributes } from "react";

interface SelectModel extends SelectHTMLAttributes<HTMLSelectElement> {
  filterDefaultText: string;
  options: string[];
}

function Select(
  {
    id,
    name,
    value,
    options,
    className = "",
    filterDefaultText,
    onChange,
  }: SelectModel,
  forwardedRef: Ref<HTMLSelectElement>
) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      ref={forwardedRef}
      className={className}
      onChange={onChange}
    >
      <option value="" disabled>
        {filterDefaultText}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default forwardRef(Select);
