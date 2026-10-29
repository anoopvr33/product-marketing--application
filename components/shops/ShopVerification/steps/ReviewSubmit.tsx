import type { VerificationData } from "../types";

type Props = {
  data: VerificationData;
  onEdit: (step: number) => void;
};

function ReviewSection({
  title,
  step,
  onEdit,
  children,
}: {
  title: string;
  step: number;
  onEdit: (step: number) => void;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-neutral-200">
      <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-black">{title}</h3>
        <button
          type="button"
          onClick={() => onEdit(step)}
          className="text-sm underline underline-offset-4 hover:no-underline"
        >
          Edit
        </button>
      </div>

      <div className="space-y-2 p-4 text-sm">{children}</div>
    </section>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap justify-between gap-3">
      <span className="text-neutral-500">{label}</span>
      <span className="max-w-[65%] break-words text-right text-black">
        {value || "Not provided"}
      </span>
    </div>
  );
}

export default function ReviewSubmit({ data, onEdit }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-black">
          Review your details
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Check your information before submitting for review.
        </p>
      </div>

      <ReviewSection title="Basic information" step={0} onEdit={onEdit}>
        <ReviewRow label="Shop name" value={data.shopName} />
        <ReviewRow label="Category" value={data.category} />
        <ReviewRow
          label="Contact"
          value={data.contactNumber ? `+91 ${data.contactNumber}` : ""}
        />
        <ReviewRow
          label="Owner confirmation"
          value={data.ownerConfirmed ? "Confirmed" : "Not confirmed"}
        />
      </ReviewSection>

      <ReviewSection title="GST details" step={1} onEdit={onEdit}>
        <ReviewRow label="GSTIN" value={data.gstNumber} />
        <ReviewRow
          label="Certificate"
          value={data.gstCertificate?.name ?? "Not uploaded"}
        />
      </ReviewSection>

      <ReviewSection title="Shop address" step={2} onEdit={onEdit}>
        <ReviewRow label="State" value={data.state} />
        <ReviewRow label="District" value={data.district} />
        <ReviewRow label="City / Town" value={data.city} />
        <ReviewRow label="Locality" value={data.locality} />
        <ReviewRow label="PIN code" value={data.pinCode} />
        <ReviewRow
          label="Delivery"
          value={data.deliveryOptions
            .map(
              (item) =>
                ({
                  "home-delivery": "Home delivery",
                  pickup: "Store pickup",
                  both: "Both",
                })[item] ?? item,
            )
            .join(", ")}
        />
      </ReviewSection>

      <ReviewSection title="Bank details (optional)" step={3} onEdit={onEdit}>
        <ReviewRow label="Account holder" value={data.accountHolder} />
        <ReviewRow
          label="Account number"
          value={data.accountNumber ? "Provided" : ""}
        />
        <ReviewRow label="IFSC code" value={data.ifscCode} />
      </ReviewSection>

      <div className="rounded-xl border border-neutral-200 p-4">
        <p className="text-sm font-medium text-black">Verification status</p>
        <p className="mt-1 text-sm leading-6 text-neutral-500">
          Your shop will remain pending until its GST information and supporting
          documents have been reviewed. This prototype does not submit or verify
          information on a server.
        </p>
      </div>
    </div>
  );
}
