import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export default function VerificationButton({
  variant = "primary",
  className = "",
  type = "button",
  children,
  ...props
}: Props) {
  const styles = {
    primary: "bg-black text-white hover:bg-neutral-800",
    secondary:
      "border border-neutral-300 bg-white text-black hover:bg-neutral-100",
    ghost: "bg-transparent text-black hover:bg-neutral-100",
  };

  return (
    <button
      {...props}
      type={type}
      className={`inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
