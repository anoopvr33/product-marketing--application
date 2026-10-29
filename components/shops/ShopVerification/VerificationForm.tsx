"use client";

import type { ReactNode } from "react";
import BasicInformation from "./steps/BasicInformation";
import GstDetails from "./steps/GstDetails";
import AddressDetails from "./steps/AddressDetails";
import BankDetails from "./steps/BankDetails";
import ReviewSubmit from "./steps/ReviewSubmit";
import type { VerificationData } from "./types";

type Props = {
  currentStep: number;
  data: VerificationData;
  update: (field: keyof VerificationData, value: unknown) => void;
  onEdit: (step: number) => void;
};

export default function VerificationForm({
  currentStep,
  data,
  update,
  onEdit,
}: Props) {
  const steps: ReactNode[] = [
    <BasicInformation key="basic" data={data} update={update} />,
    <GstDetails key="gst" data={data} update={update} />,
    <AddressDetails key="address" data={data} update={update} />,
    <BankDetails key="bank" data={data} update={update} />,
    <ReviewSubmit key="review" data={data} onEdit={onEdit} />,
  ];

  return <div>{steps[currentStep]}</div>;
}
