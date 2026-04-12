"use client";

import PayPalButton from "./payment/PayPalButton";
import AfterPayButton from "./payment/AfterPayButton";
import ZipPayButton from "./payment/ZipPayButton";
import PaymentCard from "./PaymentCard";

type Props = {
  paymentMethod: string;
  setPaymentMethod: (val: string) => void;
  total: number;
  formData: any;
  cartItems: any[];
};

export default function PaymentMethod({
  paymentMethod,
  setPaymentMethod,
  total,
  formData,
  cartItems,
}: Props) {
  return (
    <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-sm font-bold text-white">
          4
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Payment method
          </h2>
          <p className="text-sm text-gray-500">
            Choose your preferred payment option.
          </p>
        </div>
      </div>

      {/* Payment Options */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <PaymentCard
          value="card"
          selected={paymentMethod}
          onChange={setPaymentMethod}
          title="Debit / Credit Card"
          subtitle="Visa, Mastercard and more"
        />

        <PaymentCard
          value="paypal"
          selected={paymentMethod}
          onChange={setPaymentMethod}
          title="PayPal"
          subtitle="Pay securely using PayPal"
        />

        <PaymentCard
          value="afterpay"
          selected={paymentMethod}
          onChange={setPaymentMethod}
          title="Afterpay"
          subtitle="Pay in 4 installments"
        />

        {/* ✅ ZipPay */}
        <PaymentCard
          value="zippay"
          selected={paymentMethod}
          onChange={setPaymentMethod}
          title="ZipPay"
          subtitle="Buy now, pay later"
        />
      </div>

      {/* PayPal */}
      {paymentMethod === "paypal" && (
        <div className="mt-6">
          <PayPalButton
            shippingCost={0}
            total={total}
            formData={formData}
            cartItems={cartItems}
          />
        </div>
      )}

      {/* Afterpay */}
      {paymentMethod === "afterpay" && (
        <div className="mt-6">
          <AfterPayButton
            total={total}
            formData={formData}
            cartItems={cartItems}
          />
        </div>
      )}

      {/* ZipPay */}
      {paymentMethod === "zippay" && (
        <div className="mt-6">
          <ZipPayButton
            total={total}
            formData={formData}
            cartItems={cartItems}
          />
        </div>
      )}
    </section>
  );
}