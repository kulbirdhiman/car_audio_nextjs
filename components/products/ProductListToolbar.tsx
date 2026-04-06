"use client";

type Props = {
  total: number;
  sortBy: string;
  setSortBy: (value: string) => void;
  isFetching?: boolean;
};

const ProductListToolbar = ({
  total,
  sortBy,
  setSortBy,
  isFetching,
}: Props) => {
  return (
    <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-lg font-semibold">Products</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {isFetching ? "Updating products..." : `${total} products found`}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm font-medium">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="latest">Latest</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="nameAsc">Name: A-Z</option>
          <option value="nameDesc">Name: Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default ProductListToolbar;