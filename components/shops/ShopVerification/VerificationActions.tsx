"use client";

import VerificationButton from "@/components/ui/verification/VerificationButton";

type Props = {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
  onSubmit: () => void;
  isLastStep: boolean;
};

export default function VerificationActions({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onSkip,
  onSubmit,
  isLastStep,
}: Props) {
  return (
    <div className="flex flex-col-reverse gap-3 border-t border-neutral-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-3">
        {currentStep > 0 && (
          <VerificationButton variant="secondary" onClick={onBack}>
            Back
          </VerificationButton>
        )}

        {currentStep < totalSteps - 1 && (
          <VerificationButton variant="ghost" onClick={onSkip}>
            Skip for now
          </VerificationButton>
        )}
      </div>

      {isLastStep ? (
        <VerificationButton onClick={onSubmit}>
          Submit for review
        </VerificationButton>
      ) : (
        <VerificationButton onClick={onNext}>Continue</VerificationButton>
      )}
    </div>
  );
}
