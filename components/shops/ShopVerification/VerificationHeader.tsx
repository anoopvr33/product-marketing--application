"use client";

import { ArrowLeft, ShieldCheck } from "lucide-react";

type Props = {
  onBack: () => void;
};

export default function VerificationHeader({ onBack }: Props) {
  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-neutral-600 hover:text-black"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="flex items-center gap-2">
          <ShieldCheck size={22} />
          <span className="font-semibold text-black">Shop Verification</span>
        </div>

        <span className="text-xs text-neutral-500">India</span>
      </div>
    </header>
  );
}
