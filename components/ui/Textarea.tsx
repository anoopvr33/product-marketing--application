import type { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export default function Textarea({
  label,
  id,
  className = "",
  ...props
}: Props) {
  const textareaId = id ?? props.name;

  return (
    <div className="space-y-2">
      <label
        htmlFor={textareaId}
        className="block text-sm font-medium text-black"
      >
        {label}
      </label>

      <textarea
        {...props}
        id={textareaId}
        className={`w-full rounded-lg border border-neutral-200 bg-white px-3 py-3 text-sm text-black outline-none placeholder:text-neutral-400 focus:border-black ${className}`}
      />
    </div>
  );
}
