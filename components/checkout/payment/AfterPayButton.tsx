"use client";

import { useState } from "react";

type Props = {
  total: number;
  formData: any;
  cartItems: any[];
  shippingCost?: number;
};

export default function AfterPayButton({
  total,
  formData,
  cartItems,
  shippingCost = 0,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);

      // ✅ Basic validation
      if (!formData?.email || !formData?.firstName) {
        alert("Please fill required details");
        return;
      }

      const payload = {
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          country: formData.country,
          state: formData.state,
          city: formData.city,
          streetAddress: formData.streetAddress,
          postcode: formData.postcode,
        },
        items: cartItems.map((item) => ({
          productId: item._id,
          name: item.name,
          price:
            item.salePrice &&
            item.salePrice > 0 &&
            item.salePrice < item.price
              ? item.salePrice
              : item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        total,
        shippingCost,
      };

      // ✅ FIXED URL (no double /api)
      const res = await fetch("/api/afterpay/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // ✅ SAFE ERROR HANDLING (no JSON crash)
      if (!res.ok) {
        const text = await res.text();
        console.error("❌ API Error:", text);
        alert("Failed to create Afterpay session");
        return;
      }

      const data = await res.json();

      if (!data?.checkoutUrl) {
        throw new Error("Invalid response from server");
      }

      // 🔁 Redirect to Afterpay
      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error("❌ Afterpay Error:", error);
      alert("Afterpay checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full rounded-lg bg-black px-4 py-3 text-white hover:opacity-90"
    >
      {loading ? "Processing..." : "Pay with Afterpay"}
    </button>
  );
}