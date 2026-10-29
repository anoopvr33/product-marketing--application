import VerificationInput from "@/components/ui/verification/VerificationInput";
import VerificationSelect from "@/components/ui/verification/VerificationSelect";
import type { VerificationData } from "../types";

type Props = {
  data: VerificationData;
  update: (field: keyof VerificationData, value: unknown) => void;
};

const categories = [
  "Clothing",
  "Footwear",
  "Accessories",
  "Jewellery",
  "Bags",
  "Beauty",
  "Other",
];

export default function BasicInformation({ data, update }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-black">Basic information</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Tell customers about your shop.
        </p>
      </div>

      <VerificationInput
        label="Shop name"
        name="shopName"
        placeholder="Enter your registered shop name"
        value={data.shopName}
        required
        onChange={(e) => update("shopName", e.target.value)}
      />

      <VerificationSelect
        label="Shop category"
        name="category"
        value={data.category}
        required
        options={categories.map((category) => ({
          label: category,
          value: category,
        }))}
        onChange={(value) => update("category", value)}
      />

      <VerificationInput
        label="Contact number"
        name="contactNumber"
        type="tel"
        inputMode="numeric"
        maxLength={10}
        placeholder="10-digit mobile number"
        value={data.contactNumber}
        required
        onChange={(e) =>
          update(
            "contactNumber",
            e.target.value.replace(/\D/g, "").slice(0, 10),
          )
        }
      />

      <label className="flex items-start gap-3 text-sm text-black">
        <input
          type="checkbox"
          checked={data.ownerConfirmed}
          onChange={(e) => update("ownerConfirmed", e.target.checked)}
          className="mt-1 size-4 accent-black"
        />
        <span>
          I confirm that I am the shop owner or an authorised representative.
        </span>
      </label>
    </div>
  );
}
