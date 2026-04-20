"use client";

import { useEffect, useState } from "react";
import { useGetProductsQuery } from "@/store/api/productsApi";

const DownloadProductsButton = () => {
  const [trigger, setTrigger] = useState(false);

  const { data, isFetching, isSuccess } = useGetProductsQuery(
    {
      page: 1,
      limit: 100000,
      search: "",
    },
    {
      skip: !trigger,
    }
  );

  const handleDownload = () => {
    setTrigger(true);
  };

  useEffect(() => {
    if (!isSuccess || !data) return;

    const products = data?.data?.result || [];

    if (!products.length) {
      alert("No products found");
      setTrigger(false);
      return;
    }

    // ✅ Only required fields
    const headers = ["name", "sku", "price", "link"];

    const csvRows = [
      headers.join(","),

      ...products.map((product: any) => {
        const row = [
          product.name || "",
          product.sku || "",
          product.price || "",
          `https://car-audio-nextjs.vercel.app/product/${product.slug || ""}`, // ✅ create link
        ];

        return row
          .map((field) =>
            `"${String(field).replace(/"/g, '""')}"`
          )
          .join(",");
      }),
    ];

    const csvString = csvRows.join("\n");

    const blob = new Blob([csvString], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "products.csv";
    link.click();

    URL.revokeObjectURL(url);

    setTrigger(false);
  }, [isSuccess, data]);

  return (
    <button
      onClick={handleDownload}
      disabled={isFetching}
      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
    >
      {isFetching ? "Downloading..." : "Download All Products"}
    </button>
  );
};

export default DownloadProductsButton;