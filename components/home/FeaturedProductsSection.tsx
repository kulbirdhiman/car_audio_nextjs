import Link from "next/link";

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_ADDRESS}/home/featured-products?limit=4`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("API ERROR:", res.status);
    return [];
  }

  const data = await res.json();
  return data.data || [];
}

export default async function FeaturedProductsSection() {
  const products = await getProducts();
  return (
    <section className="bg-gray-50 py-14 dark:bg-[#0f172a] md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
              Featured
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Popular Products
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-gray-600 dark:text-gray-300 md:text-base">
              A few highlighted products to give your homepage a premium ecommerce feel.
            </p>
          </div>

          <Link
            href="/products"
            className="text-sm font-semibold text-black hover:underline dark:text-white"
          >
            View All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((item: any) => (
            <div
              key={item._id}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-xl dark:border-gray-800 dark:bg-[#111827]"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={item?.images[0]}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />

                {item.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-black">
                    {item.badge}
                  </span>
                )}
              </div>

              <div className="p-5">
                <h3 className="line-clamp-2 text-lg font-bold text-gray-900 dark:text-white">
                  {item.name}
                </h3>

                <div className="mt-3 flex items-center gap-3">
                  <span className="text-xl font-extrabold text-gray-900 dark:text-white">
                    ${item.price}
                  </span>

                  {item.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ${item.oldPrice}
                    </span>
                  )}
                </div>

                <div className="mt-5 flex gap-3">
                  <Link
                    href={`/product/${item.slug}`}
                    className="flex-1 rounded-2xl bg-black px-4 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-black"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}