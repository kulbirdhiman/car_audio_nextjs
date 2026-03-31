"use client";

import { useRouter } from "next/navigation";
import { useCreateProductMutation } from "@/store/api/productsApi";
import ProductForm from "@/components/admin/products/ProductForm";
import ProductPageHeader from "@/components/admin/products/ProductPageHeader";

const CreateProductPage = () => {
  const router = useRouter();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const CLOUD_FRONT_URL = "https://d198m4c88a0fux.cloudfront.net/";

  const handleCreate = async (payload: any) => {
    const updatedPayload = {
      ...payload,
      images: Array.isArray(payload.images)
        ? payload.images
          .map((item: any) => {
            const imagePath =
              typeof item === "string" ? item : item?.image || "";

            if (!imagePath) return "";

            return imagePath.startsWith("http")
              ? imagePath
              : `${CLOUD_FRONT_URL}${imagePath}`;
          })
          .filter(Boolean)
        : [],
    };

    console.log(updatedPayload, "this is updated payload");
    await createProduct(updatedPayload).unwrap();
    router.push("/admin/products");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 text-gray-900 dark:bg-[#0b1120] dark:text-white md:p-6">
      <div className="mx-auto max-w-7xl">
        <ProductPageHeader
          title="Create Product"
          description="Add a new product with all required information"
        />

        <ProductForm
          mode="create"
          onSubmit={handleCreate}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CreateProductPage;