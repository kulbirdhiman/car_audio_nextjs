import { Suspense } from "react";
import ProductsListingPage from "./ProductListPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductsListingPage />
    </Suspense>
  );
}