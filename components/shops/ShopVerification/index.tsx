"use client";

import { useState } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import VerificationHeader from "./VerificationHeader";
import VerificationStepper from "./VerificationStepper";
import VerificationForm from "./VerificationForm";
import VerificationActions from "./VerificationActions";
import {
  initialVerificationData,
  verificationSteps,
  type VerificationData,
} from "./types";
import VerificationButton from "@/components/ui/verification/VerificationButton";

export default function ShopVerification() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<VerificationData>(initialVerificationData);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [notice, setNotice] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function update(field: keyof VerificationData, value: unknown) {
    setData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setNotice("");
    setSubmitted(false);
  }

  function goToStep(step: number) {
    if (step < 0 || step >= verificationSteps.length) return;

    setCurrentStep(step);
    setNotice("");
  }

  function validateCurrentStep() {
    if (currentStep === 0) {
      if (
        !data.shopName.trim() ||
        !data.category ||
        !/^\d{10}$/.test(data.contactNumber)
      ) {
        setNotice(
          "Enter your shop name, category and valid 10-digit contact number.",
        );
        return false;
      }

      if (!data.ownerConfirmed) {
        setNotice(
          "Please confirm that you are the shop owner or authorised representative.",
        );
        return false;
      }
    }

    if (currentStep === 1) {
      if (data.gstNumber && !/^[0-9A-Z]{15}$/.test(data.gstNumber)) {
        setNotice("Enter a valid 15-character GSTIN format.");
        return false;
      }

      if (data.gstNumber && !data.gstCertificate) {
        setNotice("Upload the GST certificate or clear the GSTIN to continue.");
        return false;
      }
    }

    if (currentStep === 2) {
      if (
        !data.state ||
        !data.district.trim() ||
        !data.city.trim() ||
        !/^\d{6}$/.test(data.pinCode)
      ) {
        setNotice(
          "Complete the required address fields and enter a 6-digit PIN code.",
        );
        return false;
      }
    }

    return true;
  }

  function markCompleted(step: number) {
    setCompletedSteps((previous) =>
      previous.includes(step) ? previous : [...previous, step],
    );
  }

  function handleNext() {
    if (!validateCurrentStep()) return;

    markCompleted(currentStep);
    goToStep(currentStep + 1);
  }

  function handleSkip() {
    markCompleted(currentStep);
    goToStep(currentStep + 1);
  }

  function handleSubmit() {
    const basicValid =
      data.shopName.trim() &&
      data.category &&
      /^\d{10}$/.test(data.contactNumber) &&
      data.ownerConfirmed;

    if (!basicValid) {
      setNotice("Please complete the required basic information first.");
      goToStep(0);
      return;
    }

    if (
      data.gstNumber &&
      (!/^[0-9A-Z]{15}$/.test(data.gstNumber) || !data.gstCertificate)
    ) {
      setNotice(
        "Please correct your GST information or clear the incomplete GST details.",
      );
      goToStep(1);
      return;
    }

    if (!data.gstNumber) {
      setNotice(
        "GST details are missing. You can continue with this UI demo, but the application cannot be considered GST-verified.",
      );
      return;
    }

    setSubmitted(true);
    setNotice("");
    markCompleted(4);
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <VerificationHeader
        onBack={() => goToStep(Math.max(0, currentStep - 1))}
      />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <div className="mb-3 flex size-12 items-center justify-center rounded-xl border border-neutral-200">
              <ShieldCheck size={25} />
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Verify your shop
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
              Complete your shop details to prepare your verification
              application. You can skip optional sections and return to edit
              them later.
            </p>
          </div>

          <div className="mb-9">
            <VerificationStepper
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepClick={goToStep}
            />
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-neutral-200 p-6 sm:p-10">
              <CheckCircle2 size={36} />

              <h2 className="mt-4 text-xl font-semibold">
                Demo submission complete
              </h2>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                Your details are currently held in this page's state. No
                application has been sent to a server and no actual verification
                has taken place.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <VerificationButton
                  onClick={() => {
                    setSubmitted(false);
                    goToStep(4);
                  }}
                >
                  Review details
                </VerificationButton>

                <VerificationButton
                  variant="secondary"
                  onClick={() => {
                    setSubmitted(false);
                    goToStep(0);
                  }}
                >
                  Edit information
                </VerificationButton>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-neutral-200 p-5 sm:p-8">
              <VerificationForm
                currentStep={currentStep}
                data={data}
                update={update}
                onEdit={goToStep}
              />

              {notice && (
                <div
                  role="alert"
                  className="mt-5 rounded-lg border border-neutral-300 p-3 text-sm leading-6 text-black"
                >
                  {notice}
                </div>
              )}

              <div className="mt-8">
                <VerificationActions
                  currentStep={currentStep}
                  totalSteps={verificationSteps.length}
                  onBack={() => goToStep(currentStep - 1)}
                  onNext={handleNext}
                  onSkip={handleSkip}
                  onSubmit={handleSubmit}
                  isLastStep={currentStep === verificationSteps.length - 1}
                />
              </div>

              <p className="mt-5 text-center text-xs text-neutral-500">
                Step {currentStep + 1} of {verificationSteps.length}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
