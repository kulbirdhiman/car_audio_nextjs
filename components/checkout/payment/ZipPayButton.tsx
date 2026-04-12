"use client";

import { useState } from "react";

type Props = {
  total: number;
  formData: any;
  cartItems: any[];
  shippingCost?: number;
};

export default function ZipPayButton({
  total,
  formData,
  cartItems,
  shippingCost = 0,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleZipPay = async () => {
    try {
      setLoading(true);

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

      const res = await fetch("/api/zippay/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("❌ ZipPay API Error:", text);
        alert("ZipPay failed");
        return;
      }

      const data = await res.json();

      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error("❌ ZipPay Error:", error);
      alert("ZipPay checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleZipPay}
      disabled={loading}
      className="w-full rounded-lg bg-black px-4 py-3 text-white hover:opacity-90"
    >
      {loading ? "Processing..." : "Pay with ZipPay"}
    </button>
  );
}