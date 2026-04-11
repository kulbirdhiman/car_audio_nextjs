import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductByIdController } from "@/controllers/product.controller";
import ProductActionButtons from "@/components/products/ProductActionButtons";

type ProductType = {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  year: number;
  price: number;
  salePrice?: number;
  stock: number;
  images: string[];
  shortDescription?: string;
  description?: string;
  isActive: boolean;
  departmentId?: {
    _id?: string;
    name?: string;
    slug?: string;
  };
  companyId?: {
    _id?: string;
    name?: string;
    slug?: string;
  };
  modelId?: {
    _id?: string;
    name?: string;
    slug?: string;
  };
  subModelId?: {
    _id?: string;
    name?: string;
    slug?: string;
  } | null;
};

async function getProduct(id: string): Promise<ProductType | null> {
  try {
    const req = new Request(`http://localhost/api/product/${id}`);
    const response: any = await getProductByIdController(req, id);

    if (response instanceof Response) {
      const json = await response.json();
      if (!response.ok) return null;
      return json?.data || null;
    }

    if (response?.statusCode && response.statusCode >= 400) {
      return null;
    }

    return response?.data || null;
  } catch (error) {
    console.error("Product fetch error:", error);
    return null;
  }
}

function formatPrice(price?: number) {
  const value = Number(price || 0);
  return `$${value.toLocaleString()}`;
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const hasSale =
    Number(product.salePrice) > 0 &&
    Number(product.salePrice) < Number(product.price);

  const discountPercent = hasSale
    ? Math.round(
        ((Number(product.price) - Number(product.salePrice)) /
          Number(product.price)) *
          100
      )
    : 0;

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : ["/placeholder.png"];

  const mainImage = images[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-6 text-sm text-gray-500 flex flex-wrap items-center gap-2">
          <Link href="/" className="hover:text-black transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-black transition">
            Products
          </Link>
          {product.departmentId?.name && (
            <>
              <span>/</span>
              <span className="text-gray-700">{product.departmentId.name}</span>
            </>
          )}
          <span>/</span>
          <span className="text-black font-medium line-clamp-1">
            {product.name}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12">
          <div className="lg:col-span-7">
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                {hasSale && (
                  <div className="absolute left-4 top-4 z-10 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                    {discountPercent}% OFF
                  </div>
                )}

                {!product.isActive && (
                  <div className="absolute right-4 top-4 z-10 rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                    Inactive
                  </div>
                )}

                <div className="relative aspect-[4/4] w-full bg-gradient-to-br from-gray-50 to-gray-100">
                  <Image
                    src={mainImage}
                    alt={product.name}
                    fill
                    priority
                    className="object-contain p-4 sm:p-6"
                  />
                </div>
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="relative aspect-square w-full bg-gray-50">
                        <Image
                          src={img}
                          alt={`${product.name}-${index + 1}`}
                          fill
                          className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <p className="text-sm text-gray-500">Compatible Year</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {product.year || "N/A"}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <p className="text-sm text-gray-500">Product SKU</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900 break-all">
                    {product.sku || "N/A"}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <p className="text-sm text-gray-500">Availability</p>
                  <p
                    className={`mt-1 text-lg font-semibold ${
                      product.stock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.stock > 0
                      ? `In Stock (${product.stock})`
                      : "Out of Stock"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <div className="mb-4 flex flex-wrap gap-2">
                  {product.departmentId?.name && (
                    <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                      {product.departmentId.name}
                    </span>
                  )}
                  {product.companyId?.name && (
                    <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700">
                      {product.companyId.name}
                    </span>
                  )}
                  {product.modelId?.name && (
                    <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700">
                      {product.modelId.name}
                    </span>
                  )}
                  {product.subModelId?.name && (
                    <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700">
                      {product.subModelId.name}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950 leading-tight">
                  {product.name}
                </h1>

                {product.shortDescription && (
                  <p className="mt-4 text-base leading-7 text-gray-600">
                    {product.shortDescription}
                  </p>
                )}

                <div className="mt-6 rounded-2xl bg-gray-50 border border-gray-200 p-5">
                  {hasSale ? (
                    <div className="flex flex-wrap items-end gap-3">
                      <span className="text-3xl sm:text-4xl font-bold text-red-600">
                        {formatPrice(product.salePrice)}
                      </span>
                      <span className="text-xl text-gray-400 line-through">
                        {formatPrice(product.price)}
                      </span>
                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                        Save {discountPercent}%
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                  )}

                  <div className="mt-4">
                    {product.stock > 0 ? (
                      <span className="inline-flex items-center rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                        ● In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-700">
                        ● Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 space-y-3 border-t border-gray-100 pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-sm text-gray-500">SKU</span>
                    <span className="text-sm font-medium text-gray-900 text-right break-all">
                      {product.sku || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <span className="text-sm text-gray-500">Year</span>
                    <span className="text-sm font-medium text-gray-900 text-right">
                      {product.year || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <span className="text-sm text-gray-500">Slug</span>
                    <span className="text-sm font-medium text-gray-900 text-right break-all">
                      {product.slug || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <span className="text-sm text-gray-500">Status</span>
                    <span
                      className={`text-sm font-semibold text-right ${
                        product.isActive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                <ProductActionButtons product={product} />

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 text-center">
                    <p className="text-sm font-semibold text-gray-900">
                      Secure Payment
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Safe checkout process
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 text-center">
                    <p className="text-sm font-semibold text-gray-900">
                      Fast Shipping
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Quick order dispatch
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 text-center">
                    <p className="text-sm font-semibold text-gray-900">
                      Quality Product
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Trusted fit & finish
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/products"
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    ← Back to Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {(product.shortDescription || product.description) && (
          <div className="mt-10 lg:mt-14 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
            <div className="max-w-4xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-950">
                Product Details
              </h2>
              <p className="mt-2 text-gray-500">
                Everything you need to know about this product.
              </p>

              {product.shortDescription && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Overview
                  </h3>
                  <p className="text-gray-700 leading-8">
                    {product.shortDescription}
                  </p>
                </div>
              )}

              {product.description && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Full Description
                  </h3>

                  <div
                    className="prose prose-gray max-w-none leading-8"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}