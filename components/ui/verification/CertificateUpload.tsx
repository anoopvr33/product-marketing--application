"use client";

import { useRef } from "react";
import { FileText, Upload, X } from "lucide-react";

type Props = {
  file: File | null;
  onChange: (file: File | null) => void;
};

export default function CertificateUpload({ file, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(selectedFile?: File) {
    if (!selectedFile) return;

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Please select a PDF, JPG or PNG file.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("The file must be 5 MB or smaller.");
      return;
    }

    onChange(selectedFile);
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-black">
        GST Certificate
      </label>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={(event) => {
          handleFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />

      {file ? (
        <div className="flex items-center gap-3 rounded-xl border border-neutral-300 p-4">
          <FileText size={22} />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-black">
              {file.name}
            </p>
            <p className="text-xs text-neutral-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          <button
            type="button"
            aria-label="Remove certificate"
            onClick={() => onChange(null)}
            className="rounded-md p-2 hover:bg-neutral-100"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex min-h-36 w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-neutral-400 bg-white p-6 text-center hover:bg-neutral-50"
        >
          <Upload size={22} />

          <span className="text-sm font-medium text-black">
            Click to upload or drag and drop
          </span>

          <span className="text-xs text-neutral-500">
            PDF, JPG or PNG · Maximum 5 MB
          </span>
        </button>
      )}
    </div>
  );
}
