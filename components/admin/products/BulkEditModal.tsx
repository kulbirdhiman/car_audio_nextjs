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
    stock: "",
  });

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const payload: any = {};

    if (form.department_id) payload.departmentId = form.department_id;
    if (form.company_id) payload.companyId = form.company_id;
    if (form.regular_price) payload.price = Number(form.regular_price);
    if (form.discount_price) payload.salePrice = Number(form.discount_price);
    if (form.stock) payload.stock = Number(form.stock);

    onSubmit(payload);
  };

  const isEmpty = Object.values(form).every((v) => v === "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl transition-all dark:bg-[#0f172a]">

        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Bulk Edit Products
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 dark:text-gray-400"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">

          {/* Department */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">
              Department
            </label>
            <select
              value={form.department_id}
              onChange={(e) =>
                handleChange("department_id", e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#020817] dark:text-gray-200"
            >
              <option value="">No Change</option>
              {departments.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Company */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">
              Company
            </label>
            <select
              value={form.company_id}
              onChange={(e) =>
                handleChange("company_id", e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#020817] dark:text-gray-200"
            >
              <option value="">No Change</option>
              {companies.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>



          {/* Quantity */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">
              Quantity
            </label>
            <input
              type="number"
              placeholder="Enter quantity"
              value={form.stock}
              onChange={(e) =>
                handleChange("stock", e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#020817] dark:text-gray-200"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isEmpty}
            className={`rounded-lg px-5 py-2 text-sm font-medium text-white transition ${isEmpty
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkEditModal;