"use client";

import Image from "next/image";
import Link from "next/link";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/store/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce((total, item) => {
    const finalPrice =
      item.salePrice && item.salePrice > 0 && item.salePrice < item.price
        ? item.salePrice
        : item.price;

    return total + finalPrice * item.quantity;
  }, 0);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="mt-2 text-sm text-gray-500">
              {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Continue Shopping
            </Link>

            {cartItems.length > 0 && (
              <button
                onClick={() => dispatch(clearCart())}
                className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Your cart is empty
            </h2>
            <p className="mt-2 text-gray-500">
              Add products to your cart to see them here.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => {
                const finalPrice =
                  item.salePrice && item.salePrice > 0 && item.salePrice < item.price
                    ? item.salePrice
                    : item.price;

                return (
                  <div
                    key={item.id}
                    className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="relative h-28 w-full overflow-hidden rounded-2xl bg-gray-100 sm:h-28 sm:w-28">
                        <Image
                          src={item.image || "/placeholder.png"}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between gap-4">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900">
                            {item.name}
                          </h2>

                          {item.slug && (
                            <p className="mt-1 text-sm text-gray-500">{item.slug}</p>
                          )}

                          <div className="mt-2 flex flex-wrap items-center gap-3">
                            <span className="text-lg font-bold text-gray-900">
                              ${Number(finalPrice).toFixed(2)}
                            </span>

                            {item.salePrice &&
                              item.salePrice > 0 &&
                              item.salePrice < item.price && (
                                <span className="text-sm text-gray-400 line-through">
                                  ${Number(item.price).toFixed(2)}
                                </span>
                              )}

                            {typeof item.stock === "number" && (
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                  item.stock > 0
                                    ? "bg-green-50 text-green-700"
                                    : "bg-red-50 text-red-700"
                                }`}
                              >
                                {item.stock > 0 ? `In Stock (${item.stock})` : "Out of Stock"}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center overflow-hidden rounded-xl border border-gray-200 w-fit">
                            <button
                              onClick={() => dispatch(decreaseQuantity(item.id))}
                              className="px-4 py-2 text-lg hover:bg-gray-50"
                            >
                              -
                            </button>

                            <span className="min-w-[50px] text-center text-sm font-medium">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => dispatch(increaseQuantity(item.id))}
                              className="px-4 py-2 text-lg hover:bg-gray-50"
                            >
                              +
                            </button>
                          </div>

                          <div className="flex items-center gap-4">
                            <p className="text-base font-semibold text-gray-900">
                              ${(finalPrice * item.quantity).toFixed(2)}
                            </p>

                            <button
                              onClick={() => dispatch(removeFromCart(item.id))}
                              className="text-sm font-medium text-red-600 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right */}
            <div className="lg:col-span-4">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Items</span>
                    <span>{totalItems}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-gray-900">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-black px-6 py-3.5 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  Go to Checkout
                </Link>

                <Link
                  href="/products"
                  className="mt-4 block text-center text-sm font-medium text-blue-600 hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}