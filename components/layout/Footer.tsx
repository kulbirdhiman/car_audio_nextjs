import Link from "next/link";
import {

  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const shopLinks = [
  { label: "All Products", href: "/products" },
  { label: "Android Head Units", href: "/products?department=android-head-units" },
  { label: "Car Speakers", href: "/products?department=car-speakers" },
  { label: "Accessories", href: "/products?department=accessories" },
  { label: "Digital Clusters", href: "/products?department=digital-clusters" },
];

const companyLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Terms and Conditions", href: "/return-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const accountLinks = [
  { label: "My Account", href: "/account" },
  { label: "My Orders", href: "/account/orders" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Cart", href: "/cart" },
  { label: "Login", href: "/login" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white text-gray-900 dark:border-gray-800 dark:bg-[#0b1120] dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-block text-2xl font-extrabold tracking-tight"
            >
              car audio
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-gray-600 dark:text-gray-300">
              Upgrade your driving experience with premium car audio systems,
              Android head units, digital clusters, and vehicle-specific
              accessories.
            </p>

            <div className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Australia</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:+61000000000" className="hover:underline">
                  +61 000 000 000
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:info@kayhanaudio.com.au" className="hover:underline">
                  info@kayhanaudio.com.au
                </a>
              </div>
            </div>

            {/* <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="rounded-full border border-gray-300 p-2.5 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="rounded-full border border-gray-300 p-2.5 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Youtube"
                className="rounded-full border border-gray-300 p-2.5 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div> */}
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
              Shop
            </h3>
            <ul className="mt-4 space-y-3">
              {shopLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 transition hover:text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 transition hover:text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
              Account
            </h3>
            <ul className="mt-4 space-y-3">
              {accountLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 transition hover:text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 rounded-3xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-[#111827]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-xl font-bold">Stay updated</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Get product updates, new arrivals, and special offers.
              </p>
            </div>

            <form className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-12 w-full rounded-2xl border border-gray-300 bg-white px-4 text-sm outline-none focus:border-black dark:border-gray-700 dark:bg-[#0f172a] dark:text-white dark:focus:border-white"
              />
              <button
                type="submit"
                className="h-12 rounded-2xl bg-black px-6 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-black"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-4 border-t border-gray-200 pt-6 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} car audio. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/terms-and-conditions" className="hover:text-black dark:hover:text-white">
              Terms
            </Link>
            <Link href="/privacy-policy" className="hover:text-black dark:hover:text-white">
              Privacy
            </Link>
            <Link href="/return-policy" className="hover:text-black dark:hover:text-white">
              Returns
            </Link>
            <Link href="/shipping-policy" className="hover:text-black dark:hover:text-white">
              Shipping
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}