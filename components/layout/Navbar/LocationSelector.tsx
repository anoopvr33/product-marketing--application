"use client";

import { useState } from "react";
import { ChevronDown, MapPin, MapPinned } from "lucide-react";

const locations = [
  { city: "Thrissur", state: "Kerala" },
  { city: "Kochi", state: "Kerala" },
  { city: "Thiruvananthapuram", state: "Kerala" },
  { city: "Bengaluru", state: "Karnataka" },
  { city: "Chennai", state: "Tamil Nadu" },
  { city: "Hyderabad", state: "Telangana" },
  { city: "Mumbai", state: "Maharashtra" },
  { city: "New Delhi", state: "Delhi" },
];

export default function LocationSelector() {
  const [selected, setSelected] = useState<{
    city: string;
    state: string;
  } | null>(null);

  const [open, setOpen] = useState(false);

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Select location"
        className="flex h-11 max-w-[180px] items-center gap-2 rounded-xl border border-stone-200 bg-white px-3 text-left transition hover:border-black-300 sm:max-w-[200px]"
      >
        <MapPin size={19} className="shrink-0 text-[#aaa]" />

        <span className="min-w-0 flex-1">
          <span className="block text-[10px] font-medium uppercase tracking-wider text-stone-500">
            Your location
          </span>
          <span className="block truncate text-xs font-bold text-stone-800">
            {selected ? selected.city : "Select city"}
          </span>
        </span>

        <ChevronDown
          size={15}
          className={`shrink-0 text-stone-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close location selector"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />

          <div className="absolute left-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-stone-200 bg-white p-2 shadow-xl">
            <div className="flex items-center gap-2 px-3 py-3">
              <MapPinned size={18} className="text-green-700" />
              <div>
                <p className="text-sm font-bold text-stone-900">
                  Explore nearby
                </p>
                <p className="text-xs text-stone-500">Select an Indian city</p>
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {locations.map((location) => {
                const active =
                  selected?.city === location.city &&
                  selected?.state === location.state;

                return (
                  <button
                    key={`${location.city}-${location.state}`}
                    type="button"
                    onClick={() => {
                      setSelected(location);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left hover:bg-orange-50 ${
                      active ? "bg-orange-50" : ""
                    }`}
                  >
                    <span>
                      <span className="block text-sm font-semibold text-stone-800">
                        {location.city}
                      </span>
                      <span className="text-xs text-stone-500">
                        {location.state}
                      </span>
                    </span>

                    {active && (
                      <span className="text-sm font-bold text-green-700">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
