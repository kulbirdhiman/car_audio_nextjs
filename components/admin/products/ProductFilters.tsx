"use client";

import {
  CompanyType,
  DepartmentType,
  ModelType,
  SubModelType,
} from "./types";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (value: string) => void;
  companyFilter: string;
  setCompanyFilter: (value: string) => void;
  modelFilter: string;
  setModelFilter: (value: string) => void;
  subModelFilter: string;
  setSubModelFilter: (value: string) => void;
  yearFilter: string;
  setYearFilter: (value: string) => void;
  departments: DepartmentType[];
  companies: CompanyType[];
  models: ModelType[];
  subModels: SubModelType[];
  onRefresh: () => void;
  setPage: (value: number) => void;
};

const ProductFilters = ({
  search,
  setSearch,
  departmentFilter,
  setDepartmentFilter,
  companyFilter,
  setCompanyFilter,
  modelFilter,
  setModelFilter,
  subModelFilter,
  setSubModelFilter,
  yearFilter,
  setYearFilter,
  departments,
  companies,
  models,
  subModels,
  onRefresh,
  setPage,
}: Props) => {
  return (
    <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-[#111827]">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
        <input
          type="text"
          placeholder="Search name, sku, slug..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black dark:border-gray-700 dark:bg-[#0f172a] dark:text-white dark:focus:border-white"
        />

        <select
          value={departmentFilter}
          onChange={(e) => {
            setDepartmentFilter(e.target.value);
            setPage(1);
          }}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black dark:border-gray-700 dark:bg-[#0f172a] dark:text-white dark:focus:border-white"
        >
          <option value="">All Departments</option>
          {departments.map((department) => (
            <option key={department._id} value={department._id}>
              {department.name}
            </option>
          ))}
        </select>

        <select
          value={companyFilter}
          onChange={(e) => {
            setCompanyFilter(e.target.value);
            setModelFilter("");
            setSubModelFilter("");
            setPage(1);
          }}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black dark:border-gray-700 dark:bg-[#0f172a] dark:text-white dark:focus:border-white"
        >
          <option value="">All Companies</option>
          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.name}
            </option>
          ))}
        </select>

        <select
          value={modelFilter}
          onChange={(e) => {
            setModelFilter(e.target.value);
            setSubModelFilter("");
            setPage(1);
          }}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black dark:border-gray-700 dark:bg-[#0f172a] dark:text-white dark:focus:border-white"
        >
          <option value="">All Models</option>
          {models.map((model) => (
            <option key={model._id} value={model._id}>
              {model.name}
            </option>
          ))}
        </select>

        <select
          value={subModelFilter}
          onChange={(e) => {
            setSubModelFilter(e.target.value);
            setPage(1);
          }}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black dark:border-gray-700 dark:bg-[#0f172a] dark:text-white dark:focus:border-white"
        >
          <option value="">All Sub Models</option>
          {subModels.map((subModel) => (
            <option key={subModel._id} value={subModel._id}>
              {subModel.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Year"
          value={yearFilter}
          onChange={(e) => {
            setYearFilter(e.target.value);
            setPage(1);
          }}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black dark:border-gray-700 dark:bg-[#0f172a] dark:text-white dark:focus:border-white"
        />
      </div>

      <div className="mt-3 flex justify-end">
        <button
          onClick={onRefresh}
          className="rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;