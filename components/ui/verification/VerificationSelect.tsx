type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  name: string;
  value: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export default function VerificationSelect({
  label,
  name,
  value,
  options,
  placeholder = "Select an option",
  required = false,
  disabled = false,
  onChange,
}: Props) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-black">
        {label}
        {required && <span className="ml-1">*</span>}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        required={required}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm text-black outline-none focus:border-black focus:ring-1 focus:ring-black disabled:bg-neutral-100"
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
