"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetDepartmentsQuery } from "@/store/api/departmentAPi";
import { useGetCarCompaniesQuery } from "@/store/api/carCompaniesAPi";
import { useGetCarModelsQuery } from "@/store/api/carModelAPi";
import { useGetSubModelsQuery } from "@/store/api/subModelsApi";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useBulkUpdateProductsMutation,
} from "@/store/api/productsApi";

import ProductFilters from "@/components/admin/products/ProductFilters";
import ProductPageHeader from "@/components/admin/products/ProductPageHeader";
import ProductPagination from "@/components/admin/products/ProductPagination";
import ProductTable from "@/components/admin/products/ProductTable";
import BulkEditModal from "@/components/admin/products/BulkEditModal";

import { ModelType, SubModelType } from "@/components/admin/products/types";

const ProductsPage = () => {
  const router = useRouter();

  // 🔍 Filters
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [subModelFilter, setSubModelFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  // 📄 Pagination
  const [page, setPage] = useState(1);
  const limit = 10;

  // ✅ Bulk selection
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showBulkEdit, setShowBulkEdit] = useState(false);

  const {
    data: productsData,
    isLoading,
    isFetching,
    refetch,
  } = useGetProductsQuery({
    page,
    limit,
    search,
    departmentId: departmentFilter || undefined,
    companyId: companyFilter || undefined,
    modelId: modelFilter || undefined,
    subModelId: subModelFilter || undefined,
    year: yearFilter || undefined,
  });

  const { data: departmentsData } = useGetDepartmentsQuery({
    page: 1,
    limit: 1000,
    search: "",
  });

  const { data: companiesData } = useGetCarCompaniesQuery({
    page: 1,
    limit: 1000,
    search: "",
  });

  const { data: modelsData } = useGetCarModelsQuery({
    page: 1,
    limit: 1000,
    search: "",
    companyId: companyFilter || undefined,
  });

  const { data: subModelsData } = useGetSubModelsQuery({
    page: 1,
    limit: 1000,
    search: "",
    modelId: modelFilter || undefined,
  });

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [bulkUpdateProducts] = useBulkUpdateProductsMutation();

  const products = productsData?.data?.result || [];
  const pagination = productsData?.data?.pagination;
  const departments = departmentsData?.data?.result || [];
  const companies = companiesData?.data?.result || [];
  const allModels = modelsData?.data?.result || [];
  const allSubModels = subModelsData?.data?.result || [];
  const totalPages = pagination?.totalPages || 1;

  // 🔁 Reset invalid model
  useEffect(() => {
    if (!companyFilter || !modelFilter) return;

    const exists = allModels.some((item: ModelType) => item._id === modelFilter);
    if (!exists) {
      setModelFilter("");
      setSubModelFilter("");
      setPage(1);
    }
  }, [companyFilter, modelFilter, allModels]);

  // 🔁 Reset invalid submodel
  useEffect(() => {
    if (!modelFilter || !subModelFilter) return;

    const exists = allSubModels.some(
      (item: SubModelType) => item._id === subModelFilter
    );
    if (!exists) {
      setSubModelFilter("");
      setPage(1);
    }
  }, [modelFilter, subModelFilter, allSubModels]);

  // ❌ Delete
  const handleDelete = async (id: string) => {
    const ok = window.confirm("Delete this product?");
    if (!ok) return;

    try {
      await deleteProduct(id).unwrap();
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Bulk update submit
  const handleBulkUpdate = async (form: any) => {
    const updateData: any = {};

    Object.entries(form).forEach(([key, value]) => {
      if (value !== "" && value !== null) {
        updateData[key] = value;
      }
    });

    if (Object.keys(updateData).length === 0) {
      alert("Nothing to update");
      return;
    }

    const ok = confirm(`Update ${selectedProducts.length} products?`);
    if (!ok) return;

    try {
      await bulkUpdateProducts({
        ids: selectedProducts,
        updateData,
      }).unwrap();

      setSelectedProducts([]);
      setShowBulkEdit(false);
      refetch();
    } catch (err) {
      console.error(err);
      alert("Bulk update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 text-gray-900 dark:bg-[#0b1120] dark:text-white md:p-6">
      <div className="mx-auto max-w-7xl">

        <ProductPageHeader
          title="Products"
          description="Manage products with clean separate pages"
          actionLabel="+ Create Product"
          onAction={() => router.push("/admin/products/create")}
        />

        {/* ✅ Bulk Action Bar */}
        {selectedProducts.length > 0 && (
          <div className="mb-4 flex items-center justify-between rounded-lg bg-blue-100 p-3 dark:bg-blue-900">
            <p>{selectedProducts.length} selected</p>
            <button
              onClick={() => setShowBulkEdit(true)}
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              Bulk Edit
            </button>
          </div>
        )}

        <ProductFilters
          search={search}
          setSearch={setSearch}
          departmentFilter={departmentFilter}
          setDepartmentFilter={setDepartmentFilter}
          companyFilter={companyFilter}
          setCompanyFilter={setCompanyFilter}
          modelFilter={modelFilter}
          setModelFilter={setModelFilter}
          subModelFilter={subModelFilter}
          setSubModelFilter={setSubModelFilter}
          yearFilter={yearFilter}
          setYearFilter={setYearFilter}
          departments={departments}
          companies={companies}
          models={allModels}
          subModels={allSubModels}
          onRefresh={refetch}
          setPage={setPage}
        />

        <ProductTable
          products={products}
          isLoading={isLoading}
          isFetching={isFetching}
          isDeleting={isDeleting}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          onEdit={(product) =>
            router.push(`/admin/products/edit/${product._id}`)
          }
          onDelete={handleDelete}
        />

        <ProductPagination
          page={pagination?.page || 1}
          totalPages={totalPages}
          onPrev={() => setPage((prev) => Math.max(prev - 1, 1))}
          onNext={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        />

        {/* ✅ Bulk Edit Modal */}
        {showBulkEdit && (
          <BulkEditModal
            onClose={() => setShowBulkEdit(false)}
            onSubmit={handleBulkUpdate}
            departments={departments}
            companies={companies}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;