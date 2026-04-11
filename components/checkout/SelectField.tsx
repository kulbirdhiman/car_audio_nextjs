"use client";

import React from "react";

type OptionType = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[] | OptionType[];
  required?: boolean;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
};

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  error,
  disabled = false,
  placeholder,
}: SelectFieldProps) {
  const isObjectOptions = typeof options[0] === "object";

  return (
    <div className="w-full">
      {/* Label */}
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-gray-800"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {/* Select */}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`h-12 w-full rounded-2xl border px-4 text-sm outline-none transition
          ${error ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-black"}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          text-gray-900`}
      >
        <option value="">
          {placeholder || `Select ${label}`}
        </option>

        {options.map((item:any, index) => {
          if (isObjectOptions) {
            const opt = item as OptionType;
            return (
              <option key={index} value={opt.value}>
                {opt.label}
              </option>
            );
          }

          return (
            <option key={index} value={item as string}>
              {item}
            </option>
          );
        })}
      </select>

      {/* Error */}
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

export default SelectField;