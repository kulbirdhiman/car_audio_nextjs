import Link from "next/link";
import { categories } from "@/data/homeDummyData";

export default function CategorySection() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 md:mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
            Categories
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Shop by Department
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-gray-600 dark:text-gray-300 md:text-base">
            Explore premium product categories designed to improve comfort,
            technology, and sound quality in your vehicle.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((item) => (
            <Link
              href={item.link}
              key={item.id}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-[#111827]"
            >
              <div className="h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>

                <div className="mt-4 text-sm font-semibold text-black dark:text-white">
                  Explore Category →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}