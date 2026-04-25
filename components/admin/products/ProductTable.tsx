"use client";

import Link from "next/link";
import { ProductItemType } from "./types";

type Props = {
  products: ProductItemType[];
  isLoading: boolean;
  isFetching: boolean;
  isDeleting: boolean;
  selectedProducts: string[];
  setSelectedProducts: (ids: string[]) => void;
  onEdit: (product: ProductItemType) => void;
  onDelete: (id: string) => void;
};

const ProductTable = ({
  products,
  isLoading,
  isFetching,
  isDeleting,
  selectedProducts,
  setSelectedProducts,
  onEdit,
  onDelete,
}: Props) => {

  // ✅ Select all logic
  const isAllSelected =
    products.length > 0 &&
    products.every((p) => selectedProducts.includes(p._id));

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = products.map((p) => p._id);
      setSelectedProducts(allIds);
    } else {
      setSelectedProducts([]);
    }
  };

  const toggleSingle = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, id]);
    } else {
      setSelectedProducts(selectedProducts.filter((i) => i !== id));
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-[#111827]">
      <div className="overflow-x-auto">
        <table className="min-w-[1500px] w-full">

          {/* 🔥 HEADER */}
          <thead className="bg-gray-100 dark:bg-[#1f2937]">
            <tr>
              <th className="px-4 py-4">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                />
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold">Image</th>
              <th className="px-4 py-4 text-left text-sm font-semibold">Name</th>
              <th className="px-4 py-4 text-left text-sm font-semibold">SKU</th>
              <th className="px-4 py-4 text-left text-sm font-semibold">Department</th>
              <th className="px-4 py-4 text-left text-sm font-semibold">Company</th>
              <th className="px-4 py-4 text-left text-sm font-semibold">Model</th>
              <th className="px-4 py-4 text-left text-sm font-semibold">Sub Model</th>
              <th className="px-4 py-4 text-left text-sm font-semibold">Year</th>
              <th className="px-4 py-4 text-left text-sm font-semibold">Price</th>
              <th className="px-4 py-4 text-left text-sm font-semibold">Sale Price</th>
              <th className="px-4 py-4 text-left text-sm font-semibold">Stock</th>
              <th className="px-4 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-4 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          {/* 🔥 BODY */}
          <tbody>
            {isLoading || isFetching ? (
              <tr>
                <td colSpan={14} className="px-4 py-10 text-center text-sm text-gray-500">
                  Loading products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={14} className="px-4 py-10 text-center text-sm text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const isChecked = selectedProducts.includes(product._id);

                return (
                  <tr
                    key={product._id}
                    className="border-t border-gray-200 dark:border-gray-800"
                  >
                    {/* ✅ CHECKBOX */}
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) =>
                          toggleSingle(product._id, e.target.checked)
                        }
                      />
                    </td>

                    {/* IMAGE */}
                    <td className="px-4 py-4">
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-14 w-14 rounded-lg border object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-200 text-xs">
                          N/A
                        </div>
                      )}
                    </td>

                    {/* ✅ CLICKABLE NAME */}
                    <td className="px-4 py-4">
                      <Link
                        href={`/product/${product._id}`}
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        {product.name}
                      </Link>

                      <div className="text-xs text-gray-500">
                        {product.slug}
                      </div>
                    </td>

                    <td className="px-4 py-4">{product.sku}</td>
                    <td className="px-4 py-4">{product.departmentId?.name || "-"}</td>
                    <td className="px-4 py-4">{product.companyId?.name || "-"}</td>
                    <td className="px-4 py-4">{product.modelId?.name || "-"}</td>
                    <td className="px-4 py-4">{product.subModelId?.name || "-"}</td>
                    <td className="px-4 py-4">{product.year}</td>
                    <td className="px-4 py-4">${product.price}</td>
                    <td className="px-4 py-4">${product.salePrice}</td>
                    <td className="px-4 py-4">{product.stock}</td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          product.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-4 py-4">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => {
                            const url = `https://car-audio-nextjs.vercel.app/product/${product._id}`;
                            navigator.clipboard.writeText(url);
                            alert("Link copied!");
                          }}
                          className="rounded bg-gray-800 px-3 py-2 text-xs text-white"
                        >
                          Copy
                        </button>

                        <button
                          onClick={() => onEdit(product)}
                          className="rounded bg-blue-600 px-3 py-2 text-xs text-white"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => onDelete(product._id)}
                          disabled={isDeleting}
                          className="rounded bg-red-600 px-3 py-2 text-xs text-white disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;