import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductByIdController } from "@/controllers/product.controller";

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
    // your controller ignores req, but still expects one
    const req = new Request("http://localhost/api/product/" + id);

    const response: any = await getProductByIdController(req, id);

    // if your successResponse/errorResponse returns a Response object
    if (response instanceof Response) {
      const json = await response.json();

      if (!response.ok) return null;

      return json?.data || null;
    }

    // fallback if your helper returns plain object
    if (response?.statusCode && response.statusCode >= 400) {
      return null;
    }

    return response?.data || null;
  } catch (error) {
    console.error("Product fetch error:", error);
    return null;
  }
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

  const mainImage =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : "/placeholder.png";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center text-sm text-blue-600 hover:underline"
          >
            ← Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-2xl shadow-sm p-6 lg:p-10">
          {/* Left Side Images */}
          <div>
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 border">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {Array.isArray(product.images) && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100 border"
                  >
                    <Image
                      src={img}
                      alt={`${product.name}-${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Side Details */}
          <div className="flex flex-col">
            <div className="mb-3 flex flex-wrap gap-2">
              {product.departmentId?.name && (
                <span className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full">
                  {product.departmentId.name}
                </span>
              )}
              {product.companyId?.name && (
                <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                  {product.companyId.name}
                </span>
              )}
              {product.modelId?.name && (
                <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                  {product.modelId.name}
                </span>
              )}
              {product.subModelId?.name && (
                <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                  {product.subModelId.name}
                </span>
              )}
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-semibold text-gray-900">SKU:</span>{" "}
                {product.sku}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Year:</span>{" "}
                {product.year}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Slug:</span>{" "}
                {product.slug}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Status:</span>{" "}
                {product.isActive ? "Active" : "Inactive"}
              </p>
            </div>

            <div className="mt-6">
              {hasSale ? (
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-red-600">
                    ${product.salePrice}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ${product.price}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
              )}
            </div>

            <div className="mt-4">
              {product.stock > 0 ? (
                <span className="inline-block px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-medium">
                  In Stock ({product.stock})
                </span>
              ) : (
                <span className="inline-block px-4 py-2 rounded-full bg-red-50 text-red-700 text-sm font-medium">
                  Out of Stock
                </span>
              )}
            </div>

            {product.shortDescription && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Short Description
                </h2>
                <p className="text-gray-700 leading-7">
                  {product.shortDescription}
                </p>
              </div>
            )}

            {product.description && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Full Description
                </h2>
                <div className="text-gray-700 leading-7 whitespace-pre-line">
                  {product.description}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="px-6 py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition">
                Add to Cart
              </button>
              <button className="px-6 py-3 rounded-xl border border-gray-300 text-gray-900 font-medium hover:bg-gray-100 transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}