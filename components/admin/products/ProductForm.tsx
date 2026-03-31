"use client";

import { useMemo, useState } from "react";
import { useGetDepartmentsQuery } from "@/store/api/departmentAPi";
import { useGetCarCompaniesQuery } from "@/store/api/carCompaniesAPi";
import { useGetCarModelsQuery } from "@/store/api/carModelAPi";
import { useGetSubModelsQuery } from "@/store/api/subModelsApi";
import UploadImage from "./ProductImageUpload";
import {
  FormDataType,
  initialFormData,
  ModelType,
  ProductItemType,
  SubModelType,
} from "./types";

type UploadImageItem = {
  image?: string;
  color?: string;
};

type Props = {
  mode: "create" | "edit";
  initialValues?: ProductItemType | null;
  onSubmit: (payload: any) => Promise<void>;
  isLoading?: boolean;
};

const normalizeImages = (images: any[] = []): UploadImageItem[] => {
  if (!Array.isArray(images)) return [];

  return images.map((item) => {
    if (typeof item === "string") {
      return {
        image: item,
        color: "",
      };
    }

    return {
      image: item?.image || "",
      color: item?.color || "",
    };
  });
};

const ProductForm = ({ mode, initialValues, onSubmit, isLoading }: Props) => {
  const [formError, setFormError] = useState("");
  const [deleteFiles, setDeleteFiles] = useState<string[]>([]);

  const [formData, setFormData] = useState<any>(
    initialValues
      ? {
          departmentId: initialValues.departmentId?._id || "",
          companyId: initialValues.companyId?._id || "",
          modelId: initialValues.modelId?._id || "",
          subModelId: initialValues.subModelId?._id || "",
          year: initialValues.year ? String(initialValues.year) : "",
          name: initialValues.name || "",
          sku: initialValues.sku || "",
          price:
            initialValues.price !== undefined ? String(initialValues.price) : "",
          salePrice:
            initialValues.salePrice !== undefined
              ? String(initialValues.salePrice)
              : "0",
          stock:
            initialValues.stock !== undefined
              ? String(initialValues.stock)
              : "0",
          images: normalizeImages(initialValues.images),
          shortDescription: initialValues.shortDescription || "",
          description: initialValues.description || "",
          isActive:
            typeof initialValues.isActive === "boolean"
              ? initialValues.isActive
              : true,
        }
      : {
          ...initialFormData,
          images: [],
        }
  );

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
    companyId: formData.companyId || undefined,
  });

  const { data: subModelsData } = useGetSubModelsQuery({
    page: 1,
    limit: 1000,
    search: "",
    modelId: formData.modelId || undefined,
  });

  const departments = departmentsData?.data?.result || [];
  const companies = companiesData?.data?.result || [];
  const allModels = modelsData?.data?.result || [];
  const allSubModels = subModelsData?.data?.result || [];

  const filteredModelsForForm = useMemo(() => {
    if (!formData.companyId) return allModels;

    return allModels.filter((item: ModelType) => {
      const companyId =
        typeof item.companyId === "object" ? item.companyId?._id : item.companyId;
      return companyId === formData.companyId;
    });
  }, [allModels, formData.companyId]);

  const filteredSubModelsForForm = useMemo(() => {
    if (!formData.modelId) return allSubModels;

    return allSubModels.filter((item: SubModelType) => {
      const modelId =
        typeof item.modelId === "object" ? item.modelId?._id : item.modelId;
      return modelId === formData.modelId;
    });
  }, [allSubModels, formData.modelId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "companyId") {
      setFormData((prev:any) => ({
        ...prev,
        companyId: value,
        modelId: "",
        subModelId: "",
      }));
      return;
    }

    if (name === "modelId") {
      setFormData((prev:any) => ({
        ...prev,
        modelId: value,
        subModelId: "",
      }));
      return;
    }

    if (name === "isActive") {
      setFormData((prev:any) => ({
        ...prev,
        isActive: value === "true",
      }));
      return;
    }

    if (name === "sku") {
      setFormData((prev:any) => ({
        ...prev,
        sku: value.toUpperCase(),
      }));
      return;
    }

    setFormData((prev:any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.departmentId) return "Please select department";
    if (!formData.companyId) return "Please select company";
    if (!formData.modelId) return "Please select model";
    if (!formData.year.trim()) return "Year is required";
    if (!formData.name.trim()) return "Product name is required";
    if (!formData.sku.trim()) return "SKU is required";
    if (!formData.price.trim()) return "Price is required";
    if (!formData.stock.trim()) return "Stock is required";
    if (!formData.images || formData.images.length === 0) {
      return "Please upload at least one product image";
    }
    return "";
  };

  const buildPayload = () => ({
    departmentId: formData.departmentId,
    companyId: formData.companyId,
    modelId: formData.modelId,
    subModelId: formData.subModelId || null,
    year: Number(formData.year),
    name: formData.name.trim(),
    sku: formData.sku.trim().toUpperCase(),
    price: Number(formData.price),
    salePrice: Number(formData.salePrice || 0),
    stock: Number(formData.stock || 0),
    images: formData.images,
    shortDescription: formData.shortDescription.trim(),
    description: formData.description.trim(),
    isActive: formData.isActive,
    deleteFiles,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    try {
      await onSubmit(buildPayload());
    } catch (error: any) {
      setFormError(
        error?.data?.message || error?.message || "Something went wrong"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#111827]"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium">Department</label>
          <select
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black dark:border-gray-700 dark:bg-[#0f172a] dark:text-white dark:focus:border-white"
          >
            <option value="">Select Department</option>
            {departments.map((department: any) => (
              <option key={department._id} value={department._id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Company</label>
          <select
            name="companyId"
            value={formData.companyId}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black dark:border-gray-700 dark:bg-[#0f172a] dark:text-white dark:focus:border-white"
          >
            <option value="">Select Company</option>
            {companies.map((company: any) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Model</label>
          <select
            name="modelId"
            value={formData.modelId}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black dark:border-gray-700 dark:bg-[#0f172a] dark:text-white dark:focus:border-white"
          >
            <option value="">Select Model</option>
            {filteredModelsForForm.map((model: ModelType) => (
              <option key={model._id} value={model._id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Sub Model</label>
          <select
            name="subModelId"
            value={formData.subModelId}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black dark:border-gray-700 dark:bg-[#0f172a] dark:text-white dark:focus:border-white"
          >
            <option value="">Select Sub Model (Optional)</option>
            {filteredSubModelsForForm.map((subModel: SubModelType) => (
              <option key={subModel._id} value={subModel._id}>
                {subModel.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Enter year"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black dark:border-gray-700 dark:bg-[#0f172a] dark:text-white dark:focus:border-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">SKU</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="Enter SKU"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 uppercase outline-none focus:border-black dark:border-gray-700 dark:bg-[#0f172a] dark:text-white dark:focus:border-white"
          />
        </div>

        <div className="md:col-span-3">
          <label className="mb-2 block text-sm font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black dark:border-gray-700 dark:bg-[#0f172a] dark:text-white dark:focus:border-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black dark:border-gray-700 dark:bg-[#0f172a] dark:text-white dark:focus:border-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Sale Price</label>
          <input
            type="number"
            name="salePrice"
            value={formData.salePrice}
            onChange={handleChange}
            placeholder="Enter sale price"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black dark:border-gray-700 dark:bg-[#0f172a] dark:text-white dark:focus:border-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black dark:border-gray-700 dark:bg-[#0f172a] dark:text-white dark:focus:border-white"
          />
        </div>

        <div className="md:col-span-3">
          <label className="mb-2 block text-sm font-medium">Product Images</label>
          <UploadImage
            values={formData}
            setValues={setFormData}
            errors={{}}
            deleteFiles={deleteFiles}
            setDeleteFiles={setDeleteFiles}
            fieldName="images"
          />
        </div>

        <div className="md:col-span-3">
          <label className="mb-2 block text-sm font-medium">
            Short Description
          </label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black dark:border-gray-700 dark:bg-[#0f172a] dark:text-white dark:focus:border-white"
          />
        </div>

        <div className="md:col-span-3">
          <label className="mb-2 block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black dark:border-gray-700 dark:bg-[#0f172a] dark:text-white dark:focus:border-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Status</label>
          <select
            name="isActive"
            value={String(formData.isActive)}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black dark:border-gray-700 dark:bg-[#0f172a] dark:text-white dark:focus:border-white"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>

      {formError && (
        <div className="mt-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {formError}
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {isLoading
            ? "Please wait..."
            : mode === "edit"
            ? "Update Product"
            : "Create Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;