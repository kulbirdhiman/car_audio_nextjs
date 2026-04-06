"use client";

import { useEffect, useMemo, useState } from "react";
import { useGetDepartmentsQuery } from "@/store/api/departmentAPi";
import { useGetCarCompaniesQuery } from "@/store/api/carCompaniesAPi";
import { useGetCarModelsQuery } from "@/store/api/carModelAPi";
import { useGetSubModelsQuery } from "@/store/api/subModelsApi";
import { useGetProductsQuery } from "@/store/api/productsApi";
import ProductSidebarFilters from "@/components/products/ProductSidebarFilters";
import ProductCard from "@/components/products/ProductCard";
import ProductListToolbar from "@/components/products/ProductListToolbar";
import { ModelType, SubModelType } from "@/components/admin/products/types";

const ProductsListingPage = () => {
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [subModelFilter, setSubModelFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [page, setPage] = useState(1);
  const limit = 12;

  const {
    data: productsData,
    isLoading,
    isFetching,
  } = useGetProductsQuery({
    page,
    limit,
    search,
    departmentId: departmentFilter || undefined,
    companyId: companyFilter || undefined,
    modelId: modelFilter || undefined,
    subModelId: subModelFilter || undefined,
    year: yearFilter || undefined,
    sortBy: sortBy || undefined,
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

  const products = productsData?.data?.result || [];
  const pagination = productsData?.data?.pagination;
  const departments = departmentsData?.data?.result || [];
  const companies = companiesData?.data?.result || [];
  const models = modelsData?.data?.result || [];
  const subModels = subModelsData?.data?.result || [];
  const totalPages = pagination?.totalPages || 1;

  useEffect(() => {
    if (!companyFilter || !modelFilter) return;

    const exists = models.some((item: ModelType) => item._id === modelFilter);
    if (!exists) {
      setModelFilter("");
      setSubModelFilter("");
      setPage(1);
    }
  }, [companyFilter, modelFilter, models]);

  useEffect(() => {
    if (!modelFilter || !subModelFilter) return;

    const exists = subModels.some(
      (item: SubModelType) => item._id === subModelFilter
    );

    if (!exists) {
      setSubModelFilter("");
      setPage(1);
    }
  }, [modelFilter, subModelFilter, subModels]);

  useEffect(() => {
    setPage(1);
  }, [
    search,
    departmentFilter,
    companyFilter,
    modelFilter,
    subModelFilter,
    yearFilter,
    sortBy,
  ]);

  const activeFilterCount = useMemo(() => {
    return [
      departmentFilter,
      companyFilter,
      modelFilter,
      subModelFilter,
      yearFilter,
      search,
    ].filter(Boolean).length;
  }, [
    departmentFilter,
    companyFilter,
    modelFilter,
    subModelFilter,
    yearFilter,
    search,
  ]);

  const handleClearFilters = () => {
    setSearch("");
    setDepartmentFilter("");
    setCompanyFilter("");
    setModelFilter("");
    setSubModelFilter("");
    setYearFilter("");
    setSortBy("latest");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold md:text-3xl">Shop Products</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Find products by department, company, model, submodel, and year
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <ProductSidebarFilters
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
            models={models}
            subModels={subModels}
            onClear={handleClearFilters}
            activeFilterCount={activeFilterCount}
          />

          <div>
            <ProductListToolbar
              total={pagination?.totalItems || products.length || 0}
              sortBy={sortBy}
              setSortBy={setSortBy}
              isFetching={isFetching}
            />

            {isLoading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="aspect-[4/3] animate-pulse bg-slate-200 dark:bg-slate-800" />
                    <div className="space-y-3 p-4">
                      <div className="h-4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                      <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                      <div className="h-10 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
                <h3 className="text-lg font-semibold">No products found</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Try changing your filters or search keyword.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {products.map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-center gap-3">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700"
                  >
                    Previous
                  </button>

                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Page {pagination?.page || page} of {totalPages}
                  </span>

                  <button
                    disabled={page >= totalPages}
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsListingPage;