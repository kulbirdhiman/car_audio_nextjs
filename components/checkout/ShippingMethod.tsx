"use client";

import ShippingCard from "./ShippingCard";

type Props = {
  shippingMethod: string;
  setShippingMethod: (val: string) => void;
};

export default function ShippingMethod({
  shippingMethod,
  setShippingMethod,
}: Props) {
  return (
    <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-sm font-bold text-white">
          3
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Shipping method
          </h2>
          <p className="text-sm text-gray-500">
            Select how you want to receive your order.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ShippingCard
          active={shippingMethod === "standard"}
          title="Standard Delivery"
          subtitle="Estimated 4-7 business days"
          price="Free"
          onClick={() => setShippingMethod("standard")}
        />

        {/* <ShippingCard
          active={shippingMethod === "pickup"}
          title="Local Pickup"
          subtitle="Ready within 1-2 business days"
          price="Free"
          onClick={() => setShippingMethod("pickup")}
        /> */}
      </div>
    </section>
  );
}