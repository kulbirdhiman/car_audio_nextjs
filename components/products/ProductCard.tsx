"use client";

import Link from "next/link";
import Image from "next/image";

type Props = {
  product: any;
};

const ProductCard = ({ product }: Props) => {
  const image =
    product?.images?.[0]
      ? `${product.images[0]}`
      : "/placeholder.png";

  const salePrice = Number(product?.salePrice || 0);
  const price = Number(product?.price || 0);
  const hasDiscount = salePrice > 0 && salePrice < price;

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <Link href={`/products/${product?.slug || product?._id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
          <Image
            src={image}
            alt={product?.name || "Product"}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />
          {hasDiscount && (
            <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
              Sale
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="mb-2 flex flex-wrap gap-2">
          {product?.departmentId?.name && (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {product.departmentId.name}
            </span>
          )}
          {product?.companyId?.name && (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {product.companyId.name}
            </span>
          )}
        </div>

        <Link href={`/products/${product?.slug || product?._id}`}>
          <h3 className="line-clamp-2 min-h-[48px] text-base font-semibold text-slate-900 transition group-hover:text-blue-600 dark:text-white">
            {product?.name}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 min-h-[40px] text-sm text-slate-500 dark:text-slate-400">
          {product?.shortDescription || "High-quality product for your vehicle."}
        </p>

        <div className="mt-4 flex items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                ${salePrice}
              </span>
              <span className="text-sm text-slate-400 line-through">
                ${price}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              ${price || salePrice || 0}
            </span>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            href={`/product/${product?.slug || product?._id}`}
            className="flex-1 rounded-xl border border-slate-300 px-4 py-2 text-center text-sm font-medium transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            View Details
          </Link>

          <button className="flex-1 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;