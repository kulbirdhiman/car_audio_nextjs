import { Suspense } from "react";
import ProductsPageClient from "@/components/admin/products/ProductListPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductsPageClient />
    </Suspense>
  );
}