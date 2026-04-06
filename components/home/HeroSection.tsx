"use client";

import Link from "next/link";
import { heroSlides } from "@/data/homeDummyData";

export default function HeroSection() {
  const hero = heroSlides[0];

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[420px] w-full md:h-[520px]">
        <img
          src={hero.image}
          alt={hero.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-7xl items-center px-4 md:px-6">
            <div className="max-w-2xl text-white">
              <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                Premium Car Audio
              </span>

              <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">
                {hero.title}
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-200 md:text-base">
                {hero.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={hero.buttonLink}
                  className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  {hero.buttonText}
                </Link>

                <Link
                  href="/contact-us"
                  className="rounded-2xl border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}