import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SunriseIcon,
  Sun03Icon,
  SunsetIcon,
  Moon02Icon,
} from "@hugeicons/core-free-icons";
import type { TimeSlot } from "./NewJobContext";

interface JobTimeSelectProps {
  value?: TimeSlot;
  onChange?: (value: TimeSlot) => void;
  className?: string;
}

// --- THE FIX IS HERE ---
// The 'value' for each option is now lowercase to match the logic in BookingPrice.tsx
const OPTIONS: { value: TimeSlot; label: string; icon: React.ReactNode }[] = [
  {
    value: "morning",
    label: "8am to 12pm",
    icon: <HugeiconsIcon icon={SunriseIcon} size={32} />,
  },
  {
    value: "afternoon",
    label: "12pm to 5pm",
    icon: <HugeiconsIcon icon={Sun03Icon} size={32} />,
  },
  {
    value: "evening",
    label: "5pm to 9pm",
    icon: <HugeiconsIcon icon={SunsetIcon} size={32} />,
  },
  {
    value: "late-night",
    label: "9pm to 11pm",
    icon: <HugeiconsIcon icon={Moon02Icon} size={32} />,
  },
];

const JobTimeSelect: React.FC<JobTimeSelectProps> = ({
  value,
  onChange,
  className = "",
}) => {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<TimeSlot | "">("");

  const selected = (isControlled ? value : internal) || "";

  const handleSelect = (val: TimeSlot) => {
    if (!isControlled) setInternal(val);
    onChange?.(val);
  };

  return (
    <div className={`w-full flex flex-col lg:flex-row gap-2 ${className}`}>
      {OPTIONS.map((opt) => {
        const isSelected = selected === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleSelect(opt.value)}
            className={`w-full flex justify-between lg:justify-start gap-2 items-center rounded-md border px-4 py-3 lg:px-2 lg:py-1.5 ${
              isSelected
                ? "bg-primary text-accent border-transparent"
                : "bg-white border-gray-300 hover:bg-gray-50"
            }`}
          >
            {/* The text displayed to the user can still be capitalized */}
            <div className="hidden lg:flex justify-start gap-2">{opt.icon}</div>
            <div className="hidden lg:flex flex-col items-start justify-center text-xs">
              <p className="flex items-center">
                {opt.value.charAt(0).toUpperCase() + opt.value.slice(1)}
              </p>
              <p className="">{opt.label}</p>
            </div>
            <div className="flex justify-start gap-2 lg:hidden">
              {opt.icon}
              <p className="flex items-center">
                {opt.value.charAt(0).toUpperCase() + opt.value.slice(1)}
              </p>
            </div>
            <div className="lg:hidden text-sm">
              <p className="">{opt.label}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default JobTimeSelect;
