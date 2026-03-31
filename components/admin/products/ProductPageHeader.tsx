type Props = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

const ProductPageHeader = ({
  title = "Products",
  description = "Manage products easily",
  actionLabel,
  onAction,
}: Props) => {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90 dark:bg-white dark:text-black"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default ProductPageHeader;