"use client";

import React from "react";

type InputFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
};

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
  error,
  disabled = false,
  icon,
}: InputFieldProps) {
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

      {/* Input wrapper */}
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`h-12 w-full rounded-2xl border px-4 text-sm outline-none transition
            ${icon ? "pl-10" : ""}
            ${error ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-black"}
            ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
            placeholder:text-gray-400 text-gray-900`}
        />
      </div>

      {/* Error */}
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

export default InputField;