"use client";

import { useRouter } from "next/navigation";
import { addToCart } from "@/store/features/cartSlice";
import { useAppDispatch } from "@/store/hooks";

type ProductActionButtonsProps = {
  product: {
    _id: string;
    name: string;
    slug?: string;
    price: number;
    salePrice?: number;
    stock?: number;
    images?: string[];
  };
};

export default function ProductActionButtons({
  product,
}: ProductActionButtonsProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const cartItem = {
    id: product._id,
    name: product.name,
    slug: product.slug,
    price: Number(product.price) || 0,
    salePrice: Number(product.salePrice) || 0,
    image: product.images?.[0] || "/placeholder.png",
    stock: Number(product.stock) || 0,
    quantity: 1,
  };

  const handleAddToCart = () => {
    dispatch(addToCart(cartItem));
    router.push("/cart");
  };

  const handleBuyNow = () => {
    dispatch(addToCart(cartItem));
    router.push("/checkout");
  };

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        Add to Cart
      </button>

      <button
        onClick={handleBuyNow}
        disabled={product.stock === 0}
        className="inline-flex items-center justify-center rounded-2xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
      >
        Buy Now
      </button>
    </div>
  );
}