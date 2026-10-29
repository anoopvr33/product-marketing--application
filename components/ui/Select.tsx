import type { SelectHTMLAttributes } from "react";

type Option = {
  label: string;
  value: string;
};

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: Option[];
};

export default function Select({
  label,
  options,
  id,
  className = "",
  ...props
}: Props) {
  const selectId = id ?? props.name;

  return (
    <div className="min-w-0 space-y-2">
      <label
        htmlFor={selectId}
        className="block text-sm font-medium text-black"
      >
        {label}
      </label>

      <select
        {...props}
        id={selectId}
        className={`h-11 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm text-black outline-none focus:border-black ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
