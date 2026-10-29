"use client";

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";

export type ProductFormValues = {
  title: string;
  type: string;
  category: string;
  brand: string;
  price: string;
  discount: string;
  availability: string;
  description: string;
  sizes: string[];
  colors: string[];
};

type Props = {
  values: ProductFormValues;
  onChange: (field: keyof ProductFormValues, value: string | string[]) => void;
};

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = ["Black", "White", "Blue", "Grey", "Green", "Red"];

const categories = [
  { label: "Select category", value: "" },
  { label: "T-Shirts", value: "T-Shirts" },
  { label: "Shirts", value: "Shirts" },
  { label: "Jeans", value: "Jeans" },
  { label: "Trousers", value: "Trousers" },
  { label: "Kurtis", value: "Kurtis" },
  { label: "Dresses", value: "Dresses" },
  { label: "Ethnic Wear", value: "Ethnic Wear" },
  { label: "Footwear", value: "Footwear" },
  { label: "Accessories", value: "Accessories" },
  { label: "Other", value: "Other" },
];

export default function ProductFields({ values, onChange }: Props) {
  function toggleValue(field: "sizes" | "colors", value: string) {
    const current = values[field];

    onChange(
      field,
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  }

  return (
    <section className="space-y-5 border-t border-neutral-200 pt-6">
      <h2 className="font-semibold text-black">Product Details</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Product type *"
          name="type"
          required
          value={values.type}
          onChange={(e) => onChange("type", e.target.value)}
          options={[
            { label: "Select type", value: "" },
            { label: "Men", value: "Men" },
            { label: "Women", value: "Women" },
            { label: "Unisex", value: "Unisex" },
            { label: "Kids", value: "Kids" },
          ]}
        />

        <Select
          label="Category *"
          name="category"
          required
          value={values.category}
          onChange={(e) => onChange("category", e.target.value)}
          options={categories}
        />

        <Input
          label="Product name *"
          name="title"
          required
          maxLength={120}
          placeholder="e.g. Premium Cotton T-Shirt"
          value={values.title}
          onChange={(e) => onChange("title", e.target.value)}
        />

        <Input
          label="Brand"
          name="brand"
          maxLength={80}
          placeholder="Enter brand"
          value={values.brand}
          onChange={(e) => onChange("brand", e.target.value)}
        />

        <Input
          label="Price (₹) *"
          name="price"
          type="number"
          min="1"
          step="0.01"
          required
          placeholder="899"
          value={values.price}
          onChange={(e) => onChange("price", e.target.value)}
        />

        <Input
          label="Discount (%)"
          name="discount"
          type="number"
          min="0"
          max="99"
          step="1"
          value={values.discount}
          onChange={(e) => onChange("discount", e.target.value)}
        />

        <Select
          label="Availability *"
          name="availability"
          required
          value={values.availability}
          onChange={(e) => onChange("availability", e.target.value)}
          options={[
            { label: "In stock", value: "In Stock" },
            { label: "Out of stock", value: "Out of Stock" },
          ]}
        />
      </div>

      <Textarea
        label="Description *"
        name="description"
        required
        minLength={10}
        maxLength={500}
        rows={4}
        placeholder="Describe the fabric, fit, features and other product details..."
        value={values.description}
        onChange={(e) => onChange("description", e.target.value)}
      />

      <p className="-mt-3 text-right text-xs text-neutral-500">
        {values.description.length}/500
      </p>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-black">Available sizes</h3>

        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const selected = values.sizes.includes(size);

            return (
              <button
                key={size}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleValue("sizes", size)}
                className={`min-w-11 rounded-lg border px-3 py-2 text-sm ${
                  selected
                    ? "border-black bg-black text-white"
                    : "border-neutral-200 bg-white text-black"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-black">Available colours</h3>

        <div className="flex flex-wrap gap-2">
          {colors.map((color) => {
            const selected = values.colors.includes(color);

            return (
              <button
                key={color}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleValue("colors", color)}
                className={`rounded-full border px-4 py-2 text-sm ${
                  selected
                    ? "border-black bg-black text-white"
                    : "border-neutral-200 bg-white text-black"
                }`}
              >
                {color}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
