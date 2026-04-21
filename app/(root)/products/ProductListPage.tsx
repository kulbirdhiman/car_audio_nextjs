"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [subModelFilter, setSubModelFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [page, setPage] = useState(1);

  const limit = 12;

  // ================= FETCH DATA =================

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

  const departments = departmentsData?.data?.result || [];
  const companies = companiesData?.data?.result || [];
  const models = modelsData?.data?.result || [];
  const subModels = subModelsData?.data?.result || [];

  // ================= URL → STATE =================

  useEffect(() => {
    if (!departments.length || !companies.length) return;

    const deptSlug = searchParams.get("department");
    const companySlug = searchParams.get("company");
    const modelSlug = searchParams.get("model");
    const subModelSlug = searchParams.get("subModel");
    const year = searchParams.get("year");
    const searchQuery = searchParams.get("search");

    // Department
    if (deptSlug) {
      const found = departments.find((d: any) => d.slug === deptSlug);
      if (found) setDepartmentFilter(found._id);
    }

    // Company
    if (companySlug) {
      const found = companies.find((c: any) => c.slug === companySlug);
      if (found) setCompanyFilter(found._id);
    }

    if (year) setYearFilter(year);
    if (searchQuery) setSearch(searchQuery);
  }, [searchParams, departments, companies]);

  // Model (depends on company)
  useEffect(() => {
    const modelSlug = searchParams.get("model");
    if (!modelSlug || !models.length) return;

    const found = models.find((m: any) => m.slug === modelSlug);
    if (found) setModelFilter(found._id);
  }, [models, searchParams]);

  // SubModel
  useEffect(() => {
    const subSlug = searchParams.get("subModel");
    if (!subSlug || !subModels.length) return;

    const found = subModels.find((s: any) => s.slug === subSlug);
    if (found) setSubModelFilter(found._id);
  }, [subModels, searchParams]);

  // ================= PRODUCTS =================

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

  const products = productsData?.data?.result || [];
  const pagination = productsData?.data?.pagination;
  const totalPages = pagination?.totalPages || 1;

  // ================= STATE VALIDATION =================

  useEffect(() => {
    if (!companyFilter || !modelFilter) return;

    const exists = models.some((m: ModelType) => m._id === modelFilter);
    if (!exists) {
      setModelFilter("");
      setSubModelFilter("");
    }
  }, [companyFilter, modelFilter, models]);

  useEffect(() => {
    if (!modelFilter || !subModelFilter) return;

    const exists = subModels.some((s: SubModelType) => s._id === subModelFilter);
    if (!exists) setSubModelFilter("");
  }, [modelFilter, subModelFilter, subModels]);

  // ================= RESET PAGE =================

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

  // ================= STATE → URL =================

  useEffect(() => {
    const params = new URLSearchParams();

    const dept = departments.find((d: any) => d._id === departmentFilter);
    const comp = companies.find((c: any) => c._id === companyFilter);
    const mod = models.find((m: any) => m._id === modelFilter);
    const sub = subModels.find((s: any) => s._id === subModelFilter);

    if (dept) params.set("department", dept.slug);
    if (comp) params.set("company", comp.slug);
    if (mod) params.set("model", mod.slug);
    if (sub) params.set("subModel", sub.slug);
    if (yearFilter) params.set("year", yearFilter);
    if (search) params.set("search", search);

    router.replace(`/products?${params.toString()}`);
  }, [
    departmentFilter,
    companyFilter,
    modelFilter,
    subModelFilter,
    yearFilter,
    search,
  ]);

  // ================= UI HELPERS =================

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

  // ================= UI =================

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-6">
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
              total={pagination?.totalItems || products.length}
              sortBy={sortBy}
              setSortBy={setSortBy}
              isFetching={isFetching}
            />

            {isLoading ? (
              <p>Loading...</p>
            ) : products.length === 0 ? (
              <p>No products found</p>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {products.map((p: any) => (
                    <ProductCard key={p._id} product={p} />
                  ))}
                </div>

                <div className="mt-6 flex justify-center gap-3">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    Prev
                  </button>

                  <span>
                    {page} / {totalPages}
                  </span>

                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
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