"use client";

import { useState } from "react";

type Props = {
  onClose: () => void;
  onSubmit: (data: any) => void;
  departments: any[];
  companies: any[];
};

const BulkEditModal: React.FC<Props> = ({
  onClose,
  onSubmit,
  departments,
  companies,
}) => {
  const [form, setForm] = useState({
    department_id: "",
    company_id: "",
    regular_price: "",
    discount_price: "",
    quantity: "",
  });

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 dark:bg-[#0b1120]">

        <h2 className="mb-4 text-lg font-semibold">Bulk Edit Products</h2>

        {/* Department */}
        <select
          value={form.department_id}
          onChange={(e) => handleChange("department_id", e.target.value)}
          className="mb-3 w-full rounded border p-2"
        >
          <option value="">Change Department (optional)</option>
          {departments.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Company */}
        <select
          value={form.company_id}
          onChange={(e) => handleChange("company_id", e.target.value)}
          className="mb-3 w-full rounded border p-2"
        >
          <option value="">Change Company (optional)</option>
          {companies.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Price */}
        <input
          type="number"
          placeholder="Regular Price"
          value={form.regular_price}
          onChange={(e) => handleChange("regular_price", e.target.value)}
          className="mb-3 w-full rounded border p-2"
        />

        <input
          type="number"
          placeholder="Discount Price"
          value={form.discount_price}
          onChange={(e) => handleChange("discount_price", e.target.value)}
          className="mb-3 w-full rounded border p-2"
        />

        {/* Quantity */}
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => handleChange("quantity", e.target.value)}
          className="mb-3 w-full rounded border p-2"
        />

        {/* Actions */}
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded bg-gray-300 px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkEditModal;