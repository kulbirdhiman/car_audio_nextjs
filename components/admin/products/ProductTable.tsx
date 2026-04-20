"use client";

import { ProductItemType } from "./types";

type Props = {
  products: ProductItemType[];
  isLoading: boolean;
  isFetching: boolean;
  isDeleting: boolean;
  onEdit: (product: ProductItemType) => void;
  onDelete: (id: string) => void;
};

const ProductTable = ({
  products,
  isLoading,
  isFetching,
  isDeleting,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-[#111827]">
      <div className="overflow-x-auto">
        <table className="min-w-[1500px] w-full">
          <thead className="bg-gray-100 dark:bg-[#1f2937]">
            <tr>
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

          <tbody>
            {isLoading || isFetching ? (
              <tr>
                <td
                  colSpan={13}
                  className="px-4 py-10 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  Loading products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td
                  colSpan={13}
                  className="px-4 py-10 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-t border-gray-200 dark:border-gray-800"
                >
                  <td className="px-4 py-4">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-14 w-14 rounded-lg border border-gray-200 object-cover dark:border-gray-700"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-200 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                        N/A
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-4">
                    <div className="font-semibold">{product.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {product.slug}
                    </div>
                  </td>

                  <td className="px-4 py-4 font-medium">{product.sku}</td>
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
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${product.isActive
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          const url = `https://car-audio-nextjs.vercel.app/product/${product._id}`;
                          navigator.clipboard.writeText(url);
                          alert("Link copied!");
                        }}
                        className="rounded-lg bg-gray-800 px-3 py-2 text-xs font-semibold text-white hover:bg-gray-900"
                      >
                        Copy Link
                      </button>
                      <button
                        onClick={() => onEdit(product)}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(product._id)}
                        disabled={isDeleting}
                        className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;