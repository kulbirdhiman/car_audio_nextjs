function ShippingCard({
  active,
  title,
  subtitle,
  price,
  onClick,
}: {
  active: boolean;
  title: string;
  subtitle: string;
  price: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-3xl border p-5 text-left transition ${
        active
          ? "border-black bg-black text-white shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className={`text-base font-bold ${active ? "text-white" : "text-gray-900"}`}>
            {title}
          </h3>
          <p className={`mt-1 text-sm ${active ? "text-gray-300" : "text-gray-500"}`}>
            {subtitle}
          </p>
        </div>

        <div
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            active ? "bg-white text-black" : "bg-gray-100 text-gray-700"
          }`}
        >
          {price}
        </div>
      </div>
    </button>
  );
}

export default ShippingCard