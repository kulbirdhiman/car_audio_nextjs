"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRef, useState } from "react";
import type {
  CreateOrderRequest,
  OrderItem,
} from "@/types/order";

type Props = {
  total: number;
  shippingCost: number; // ✅ NEW
  currency?: string;
  formData: any;
  cartItems: any[];
};

export default function PayPalButton({
  total,
  shippingCost,
  currency = "USD",
  formData,
  cartItems,
}: Props) {
  const orderIdRef = useRef<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full max-w-md">
      {loading && (
        <p className="mb-2 text-sm text-gray-500">
          Processing payment...
        </p>
      )}

      <PayPalButtons
        forceReRender={[total]}
        style={{
          layout: "vertical",
          shape: "rect",
          label: "paypal",
          height: 45,
        }}

        // ✅ CREATE ORDER
        createOrder={async () => {
          try {
            setLoading(true);

            if (!formData.firstName || !formData.email) {
              alert("Please fill required details");
              throw new Error("Missing form data");
            }

            // ✅ FIXED price logic (same as checkout)
            const items: OrderItem[] = cartItems.map((item) => {
              const finalPrice =
                item.salePrice &&
                item.salePrice > 0 &&
                item.salePrice < item.price
                  ? item.salePrice
                  : item.price;

              return {
                productId: item._id,
                name: item.name,
                price: finalPrice,
                quantity: item.quantity,
                image: item.image,
              };
            });

            const payload: CreateOrderRequest = {
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
              items,
              total,
              shippingCost, // ✅ FIXED
            };

            const res = await fetch(
              `${process.env.NEXT_PUBLIC_ADDRESS}/paypal/create-order`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
              }
            );

            if (!res.ok) {
              const err = await res.text();
              console.error("Backend Error:", err);
              throw new Error("Failed to create PayPal order");
            }

            const data = await res.json();

            if (!data?.paypalOrderId) {
              throw new Error("Invalid PayPal response");
            }

            orderIdRef.current = data.orderId;

            return data.paypalOrderId;
          } catch (error) {
            console.error("Create Order Error:", error);
            alert("Something went wrong while creating order");
            throw error;
          } finally {
            setLoading(false);
          }
        }}

        // ✅ CAPTURE ORDER
        onApprove={async (data) => {
          try {
            setLoading(true);

            const res = await fetch(
              `${process.env.NEXT_PUBLIC_ADDRESS}/paypal/capture-order`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  paypalOrderId: data.orderID,
                  orderId: orderIdRef.current,
                }),
              }
            );

            if (!res.ok) throw new Error("Capture failed");

            const result = await res.json();
            console.log("Capture Result:", result);

            alert("✅ Payment successful & order placed!");
          } catch (error) {
            console.error("Capture Error:", error);
            alert("Payment failed. Please try again.");
          } finally {
            setLoading(false);
          }
        }}

        onError={(err) => {
          console.error("PayPal Error:", err);
          alert("PayPal error occurred");
        }}

        onCancel={() => {
          alert("Payment cancelled");
        }}
      />
    </div>
  );
}