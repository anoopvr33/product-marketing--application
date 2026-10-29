import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export default function VerificationInput({
  label,
  hint,
  id,
  required,
  className = "",
  ...props
}: Props) {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="block text-sm font-medium text-black">
        {label}
        {required && <span className="ml-1">*</span>}
      </label>

      <input
        {...props}
        id={inputId}
        required={required}
        className={`h-11 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm text-black outline-none transition placeholder:text-neutral-400 focus:border-black focus:ring-1 focus:ring-black disabled:bg-neutral-100 ${className}`}
      />

      {hint && <p className="text-xs text-neutral-500">{hint}</p>}
    </div>
  );
}
