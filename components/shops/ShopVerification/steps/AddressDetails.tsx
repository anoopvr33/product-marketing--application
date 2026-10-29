import VerificationInput from "@/components/ui/verification/VerificationInput";
import VerificationSelect from "@/components/ui/verification/VerificationSelect";
import type { VerificationData } from "../types";

type Props = {
  data: VerificationData;
  update: (field: keyof VerificationData, value: unknown) => void;
};

const states = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export default function AddressDetails({ data, update }: Props) {
  function toggleDelivery(option: string) {
    const next = data.deliveryOptions.includes(option)
      ? data.deliveryOptions.filter((item) => item !== option)
      : [...data.deliveryOptions, option];

    update("deliveryOptions", next);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-black">Shop address</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Add your shop location and available delivery options.
        </p>
      </div>

      <VerificationSelect
        label="State / Union Territory"
        name="state"
        value={data.state}
        required
        options={states.map((state) => ({
          label: state,
          value: state,
        }))}
        onChange={(value) => update("state", value)}
      />

      <VerificationInput
        label="District"
        name="district"
        value={data.district}
        placeholder="Enter district"
        required
        onChange={(e) => update("district", e.target.value)}
      />

      <VerificationInput
        label="City / Town"
        name="city"
        value={data.city}
        placeholder="Enter city or town"
        required
        onChange={(e) => update("city", e.target.value)}
      />

      <VerificationInput
        label="Locality"
        name="locality"
        value={data.locality}
        placeholder="Area, street or neighbourhood"
        onChange={(e) => update("locality", e.target.value)}
      />

      <VerificationInput
        label="PIN code"
        name="pinCode"
        value={data.pinCode}
        placeholder="6-digit PIN code"
        inputMode="numeric"
        maxLength={6}
        required
        onChange={(e) =>
          update("pinCode", e.target.value.replace(/\D/g, "").slice(0, 6))
        }
      />

      <div className="space-y-3">
        <p className="text-sm font-medium text-black">Delivery options</p>

        {[
          { value: "home-delivery", label: "Home delivery" },
          { value: "pickup", label: "Store pickup" },
          { value: "both", label: "Both options" },
        ].map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-3 text-sm text-black"
          >
            <input
              type="checkbox"
              checked={data.deliveryOptions.includes(option.value)}
              onChange={() => toggleDelivery(option.value)}
              className="size-4 accent-black"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}
