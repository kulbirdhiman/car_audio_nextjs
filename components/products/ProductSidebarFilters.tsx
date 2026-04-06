"use client";

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
  departments: any[];
  companies: any[];
  models: any[];
  subModels: any[];
  onClear: () => void;
  activeFilterCount: number;
};

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-black dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-white";

const ProductSidebarFilters = ({
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
  onClear,
  activeFilterCount,
}: Props) => {
  return (
    <aside className="h-fit rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Filters</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {activeFilterCount} active filter{activeFilterCount === 1 ? "" : "s"}
          </p>
        </div>

        <button
          onClick={onClear}
          className="text-sm font-medium text-red-500 hover:underline"
        >
          Clear
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Search</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Department</label>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className={inputClass}
          >
            <option value="">All Departments</option>
            {departments.map((item: any) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Company</label>
          <select
            value={companyFilter}
            onChange={(e) => {
              setCompanyFilter(e.target.value);
              setModelFilter("");
              setSubModelFilter("");
            }}
            className={inputClass}
          >
            <option value="">All Companies</option>
            {companies.map((item: any) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Model</label>
          <select
            value={modelFilter}
            onChange={(e) => {
              setModelFilter(e.target.value);
              setSubModelFilter("");
            }}
            className={inputClass}
            disabled={!companyFilter}
          >
            <option value="">All Models</option>
            {models.map((item: any) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Sub Model</label>
          <select
            value={subModelFilter}
            onChange={(e) => setSubModelFilter(e.target.value)}
            className={inputClass}
            disabled={!modelFilter}
          >
            <option value="">All Sub Models</option>
            {subModels.map((item: any) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Year</label>
          <input
            type="number"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            placeholder="e.g. 2020"
            className={inputClass}
          />
        </div>
      </div>
    </aside>
  );
};

export default ProductSidebarFilters;