"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

import BillingForm from "@/components/checkout/BillingForm";
import ShippingForm from "@/components/checkout/ShippingForm";
import ShippingMethod from "@/components/checkout/ShippingMethod";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import OrderSummary from "@/components/checkout/OrderSummary";

type FormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  streetAddress: string;
  postcode: string;
  sameAsBilling: boolean;
  shippingFirstName: string;
  shippingLastName: string;
  shippingEmail: string;
  shippingPhone: string;
  shippingCountry: string;
  shippingState: string;
  shippingCity: string;
  shippingStreetAddress: string;
  shippingPostcode: string;
};

export default function CheckoutPage() {
  const cartItems = useAppSelector((state) => state.cart.items);

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [agreed, setAgreed] = useState(false);

  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    streetAddress: "",
    postcode: "",
    sameAsBilling: true,
    shippingFirstName: "",
    shippingLastName: "",
    shippingEmail: "",
    shippingPhone: "",
    shippingCountry: "",
    shippingState: "",
    shippingCity: "",
    shippingStreetAddress: "",
    shippingPostcode: "",
  });

  // 🧮 Subtotal
  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const finalPrice =
        item.salePrice && item.salePrice > 0 && item.salePrice < item.price
          ? item.salePrice
          : item.price;

      return total + finalPrice * item.quantity;
    }, 0);
  }, [cartItems]);

  // 🚚 Shipping cost
  const shippingCost = useMemo(() => {
    if (shippingMethod === "pickup") return 0;
    if (shippingMethod === "standard") return 5;
    return 0;
  }, [shippingMethod]);

  const total = subtotal + shippingCost;

  // 📝 Input handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🧾 Place order
  const handlePlaceOrder = () => {
    if (!agreed) {
      alert("Please accept terms and conditions.");
      return;
    }

    if (!formData.firstName || !formData.email || !formData.phone) {
      alert("Please fill all required billing details.");
      return;
    }

    alert("Checkout is ready. Now connect it with your order API.");
  };

  // 🛒 Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <Link href="/products" className="text-blue-600 underline">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Main UI
  return (
    <div className="min-h-screen text-black bg-[#f8fafc]">
      <div className="mx-auto max-w-7xl px-4 py-8">

        {/* Header */}
        <div className="mb-8 flex justify-between">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <Link href="/cart" className="text-blue-600">
            Back to cart
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

          {/* LEFT SIDE */}
          <div className="xl:col-span-7 space-y-6">
            <BillingForm
              formData={formData}
              handleInputChange={handleInputChange}
            />

            <ShippingForm
              formData={formData}
              handleInputChange={handleInputChange}
            />

            <ShippingMethod
              shippingMethod={shippingMethod}
              setShippingMethod={setShippingMethod}
            />

            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              total={total}
              formData={formData}
              cartItems={cartItems}
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="xl:col-span-5">
            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              shippingCost={shippingCost}
              total={total}
              agreed={agreed}
              setAgreed={setAgreed}
              handlePlaceOrder={handlePlaceOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}