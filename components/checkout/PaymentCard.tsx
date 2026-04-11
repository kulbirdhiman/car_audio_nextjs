function PaymentCard({
  value,
  selected,
  onChange,
  title,
  subtitle,
}: {
  value: string;
  selected: string;
  onChange: (value: string) => void;
  title: string;
  subtitle: string;
}) {
  const active = selected === value;

  return (
    <label
      className={`cursor-pointer rounded-3xl border p-5 transition ${
        active
          ? "border-black bg-black text-white shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="radio"
          name="paymentMethod"
          checked={active}
          onChange={() => onChange(value)}
          className="mt-1"
        />

        <div>
          <h3 className={`text-base font-bold ${active ? "text-white" : "text-gray-900"}`}>
            {title}
          </h3>
          <p className={`mt-1 text-sm ${active ? "text-gray-300" : "text-gray-500"}`}>
            {subtitle}
          </p>
        </div>
      </div>
    </label>
  );
}

export default PaymentCard