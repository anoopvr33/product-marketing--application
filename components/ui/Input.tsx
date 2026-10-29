import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function Input({
  label,
  error,
  className = "",
  id,
  ...props
}: Props) {
  const inputId = id ?? props.name;

  return (
    <div className="min-w-0 space-y-2">
      <label htmlFor={inputId} className="block text-sm font-medium text-black">
        {label}
      </label>

      <input
        {...props}
        id={inputId}
        className={`h-11 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm text-black outline-none transition placeholder:text-neutral-400 focus:border-black disabled:bg-neutral-100 ${className}`}
      />

      {error && <p className="text-xs text-neutral-600">{error}</p>}
    </div>
  );
}
