"use client";

import Image from "next/image";

export default function OrderSummary({
  cartItems,
  subtotal,
  shippingCost,
  total,
  agreed,
  setAgreed,
  handlePlaceOrder,
}: any) {
  return (
    <div className="sticky top-24 rounded-[32px] border bg-white p-6">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      {cartItems.map((item: any) => (
        <div key={item.id} className="flex gap-4 mb-4">
          <Image src={item.image} alt="" width={60} height={60} />
          <div>
            <p>{item.name}</p>
            <p>Qty: {item.quantity}</p>
          </div>
        </div>
      ))}

      <div className="mt-4">
        <p>Subtotal: ${subtotal}</p>
        <p>Shipping: {shippingCost}</p>
        <p className="font-bold">Total: ${total}</p>
      </div>

      <label className="flex gap-2 mt-4">
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
        Agree terms
      </label>

      <button onClick={handlePlaceOrder} className="mt-4 w-full bg-black text-white p-3 rounded-xl">
        Place Order
      </button>
    </div>
  );
}