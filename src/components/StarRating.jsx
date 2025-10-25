// src/components/StarRating.jsx
import React from "react";

/**
 * Props:
 * - id: string (unique per song) -> used to namespace the radio group
 * - value: number (0..5 in 0.5 increments)
 * - onChange: (val:number) => void
 */
export default function StarRating({ id, value = 0, onChange }) {
  // Create 10 steps: 0.5, 1.0, 1.5, ... 5.0
  const steps = Array.from({ length: 10 }, (_, i) => (i + 1) * 0.5);
  const groupName = `rating-group-${id}`;

  return (
    <div className="flex items-center gap-1" aria-label="Star rating">
      {steps.map((step) => {
        const checked = Number(value) === step;
        return (
          <label
            key={`${groupName}-${step}`}
            className={`cursor-pointer select-none leading-none`}
            title={`${step} stars`}
          >
            <input
              type="radio"
              name={groupName}  // IMPORTANT: scoped per song id so groups don't conflict
              className="hidden"
              value={step}
              checked={checked}
              onChange={() => onChange?.(step)}
            />
            <span
              className={`text-xl ${
                step <= value ? "text-yellow-400" : "text-gray-500"
              }`}
              style={{ lineHeight: 1 }}
            >
              ★
            </span>
          </label>
        );
      })}
      <span className="ml-2 text-sm text-gray-400">{value ? value.toFixed(1) : "0.0"}</span>
    </div>
  );
}
