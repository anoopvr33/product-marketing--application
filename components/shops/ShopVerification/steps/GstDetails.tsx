import VerificationInput from "@/components/ui/verification/VerificationInput";
import CertificateUpload from "@/components/ui/verification/CertificateUpload";
import type { VerificationData } from "../types";

type Props = {
  data: VerificationData;
  update: (field: keyof VerificationData, value: unknown) => void;
};

export default function GstDetails({ data, update }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-black">GST verification</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Provide your GSTIN and supporting certificate for review.
        </p>
      </div>

      <div className="rounded-xl border border-neutral-200 p-4">
        <p className="text-sm font-medium text-black">
          Why do we ask for GST details?
        </p>
        <p className="mt-1 text-sm leading-6 text-neutral-500">
          GST details help us review your business identity. Submitting these
          details does not automatically make your shop verified.
        </p>
      </div>

      <VerificationInput
        label="GST Identification Number (GSTIN)"
        name="gstNumber"
        placeholder="Enter your 15-character GSTIN"
        value={data.gstNumber}
        maxLength={15}
        autoCapitalize="characters"
        required
        onChange={(e) =>
          update(
            "gstNumber",
            e.target.value.toUpperCase().replace(/\s/g, "").slice(0, 15),
          )
        }
        hint="Enter the GSTIN associated with your business."
      />

      <CertificateUpload
        file={data.gstCertificate}
        onChange={(file) => update("gstCertificate", file)}
      />
    </div>
  );
}
