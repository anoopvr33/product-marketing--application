import VerificationInput from "@/components/ui/verification/VerificationInput";
import type { VerificationData } from "../types";

type Props = {
  data: VerificationData;
  update: (field: keyof VerificationData, value: unknown) => void;
};

export default function BankDetails({ data, update }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-black">Bank details</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Optional for this UI prototype. You can skip this step.
        </p>
      </div>

      <VerificationInput
        label="Account holder name"
        name="accountHolder"
        value={data.accountHolder}
        placeholder="Name on bank account"
        onChange={(e) => update("accountHolder", e.target.value)}
      />

      <VerificationInput
        label="Account number"
        name="accountNumber"
        value={data.accountNumber}
        type="password"
        autoComplete="off"
        placeholder="Enter account number"
        onChange={(e) => update("accountNumber", e.target.value)}
      />

      <VerificationInput
        label="IFSC code"
        name="ifscCode"
        value={data.ifscCode}
        placeholder="Example: SBIN0001234"
        maxLength={11}
        onChange={(e) =>
          update("ifscCode", e.target.value.toUpperCase().slice(0, 11))
        }
      />

      <p className="text-xs leading-5 text-neutral-500">
        These fields are for UI demonstration only. Do not enter real bank
        details until secure backend storage and access controls are
        implemented.
      </p>
    </div>
  );
}
