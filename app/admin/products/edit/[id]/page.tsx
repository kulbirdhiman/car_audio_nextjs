"use client";

import { useParams, useRouter } from "next/navigation";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/store/api/productsApi";
import ProductForm from "@/components/admin/products/ProductForm";
import ProductPageHeader from "@/components/admin/products/ProductPageHeader";

const EditProductPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { data, isLoading: isProductLoading } = useGetProductByIdQuery(id, {
    skip: !id,
  });
  console.log(data, "this is data")

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const product = data?.data;
  const CLOUD_FRONT_URL = "https://d198m4c88a0fux.cloudfront.net/";

  const formatProductPayload = (payload: any) => {
    return {
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
  };

  const handleUpdate = async (payload: any) => {
    const updatedPayload = formatProductPayload(payload);

    console.log(updatedPayload, "this is update payload");
    await updateProduct({
      id,
      ...updatedPayload,
    }).unwrap();

    router.push("/admin/products");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 text-gray-900 dark:bg-[#0b1120] dark:text-white md:p-6">
      <div className="mx-auto max-w-7xl">
        <ProductPageHeader
          title="Update Product"
          description="Edit product details"
        />

        {isProductLoading ? (
          <div className="rounded-2xl bg-white p-6 dark:bg-[#111827]">
            Loading product...
          </div>
        ) : !product ? (
          <div className="rounded-2xl bg-white p-6 dark:bg-[#111827]">
            Product not found
          </div>
        ) : (
          <ProductForm
            mode="edit"
            initialValues={product}
            onSubmit={handleUpdate}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default EditProductPage;