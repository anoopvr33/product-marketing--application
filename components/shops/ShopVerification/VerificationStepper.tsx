import { Check } from "lucide-react";
import { verificationSteps } from "./types";

type Props = {
  currentStep: number;
  onStepClick: (step: number) => void;
  completedSteps: number[];
};

export default function VerificationStepper({
  currentStep,
  onStepClick,
  completedSteps,
}: Props) {
  return (
    <nav aria-label="Verification progress" className="w-full">
      <div className="grid grid-cols-5 gap-2">
        {verificationSteps.map((label, index) => {
          const completed = completedSteps.includes(index);
          const active = currentStep === index;

          return (
            <button
              type="button"
              key={label}
              onClick={() => onStepClick(index)}
              className="group min-w-0 text-center"
              aria-current={active ? "step" : undefined}
            >
              <span
                className={`mx-auto flex size-9 items-center justify-center rounded-full border text-sm ${
                  active || completed
                    ? "border-black bg-black text-white"
                    : "border-neutral-300 bg-white text-neutral-500"
                }`}
              >
                {completed ? <Check size={16} /> : index + 1}
              </span>

              <span
                className={`mt-2 hidden text-xs sm:block ${
                  active ? "font-semibold text-black" : "text-neutral-500"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 h-1 overflow-hidden rounded-full bg-neutral-200">
        <div
          className="h-full bg-black transition-all duration-300"
          style={{
            width: `${(currentStep / (verificationSteps.length - 1)) * 100}%`,
          }}
        />
      </div>
    </nav>
  );
}
