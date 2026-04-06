import { ShieldCheck, Headphones, BadgeCheck, Car } from "lucide-react";
import { whyChooseUs } from "@/data/homeDummyData";

const icons = [Car, BadgeCheck, Headphones, ShieldCheck];

export default function WhyChooseUsSection() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 text-center md:mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
            Why Choose Us
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Built for better driving experience
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 dark:text-gray-300 md:text-base">
            Give your homepage a strong trust section with simple feature cards.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {whyChooseUs.map((item, index) => {
            const Icon = icons[index % icons.length];

            return (
              <div
                key={item.id}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-[#111827]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 dark:bg-[#0f172a]">
                  <Icon className="h-7 w-7 text-gray-900 dark:text-white" />
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}