type Props = {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

const ProductPagination = ({ page, totalPages, onPrev, onNext }: Props) => {
  return (
    <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-4 md:flex-row md:items-center md:justify-between dark:border-gray-800">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Page {page} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={page === 1}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          Previous
        </button>

        <button
          onClick={onNext}
          disabled={page === totalPages || totalPages === 0}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductPagination;