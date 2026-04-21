import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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

async function getProduct(slug: string): Promise<ProductType | null> {
  try {
    console.log(slug , "this is slug")
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ADDRESS}/products/slug/${slug}`,
      {
        cache: "no-store",
      }
    );
    console.log(res , "this is res")
    if (!res.ok) return null;

    const json = await res.json();
    return json?.data || null;
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
  params: { slug: string };
}) {
  const { slug } = await params;
  console.log(slug , "this is slugsdsadsa")
  const product = await getProduct(slug);

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
        
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500 flex flex-wrap items-center gap-2">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/products">Products</Link>

          {product.departmentId?.name && (
            <>
              <span>/</span>
              <span>{product.departmentId.name}</span>
            </>
          )}

          <span>/</span>
          <span className="text-black font-medium line-clamp-1">
            {product.name}
          </span>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Images */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-3xl border bg-white">
              
              {hasSale && (
                <div className="absolute left-4 top-4 bg-red-600 text-white px-3 py-1 rounded-full">
                  {discountPercent}% OFF
                </div>
              )}

              <div className="relative aspect-square w-full">
                <Image
                  src={mainImage}
                  alt={product.name}
                  fill
                  className="object-contain p-6"
                />
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <div key={i} className="relative aspect-square border rounded-xl">
                    <Image
                      src={img}
                      alt="thumb"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-white border rounded-3xl p-6">

              <h1 className="text-3xl font-bold">{product.name}</h1>

              {product.shortDescription && (
                <p className="mt-3 text-gray-600">
                  {product.shortDescription}
                </p>
              )}

              {/* Price */}
              <div className="mt-6">
                {hasSale ? (
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-red-600">
                      {formatPrice(product.salePrice)}
                    </span>
                    <span className="line-through text-gray-400">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {/* Stock */}
              <div className="mt-3">
                {product.stock > 0 ? (
                  <span className="text-green-600">In Stock</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>

              {/* Info */}
              <div className="mt-6 space-y-2 text-sm">
                <p><b>SKU:</b> {product.sku}</p>
                <p><b>Year:</b> {product.year}</p>
                <p><b>Status:</b> {product.isActive ? "Active" : "Inactive"}</p>
              </div>

              {/* Actions */}
              <div className="mt-6">
                <ProductActionButtons product={product} />
              </div>

              <Link href="/products" className="block mt-6 text-blue-600">
                ← Back to Products
              </Link>
            </div>
          </div>
        </div>

        {/* Description */}
        {(product.shortDescription || product.description) && (
          <div className="mt-12 bg-white border rounded-3xl p-6">
            <h2 className="text-2xl font-bold">Product Details</h2>

            {product.shortDescription && (
              <p className="mt-4">{product.shortDescription}</p>
            )}

            {product.description && (
              <div
                className="mt-4 prose"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}