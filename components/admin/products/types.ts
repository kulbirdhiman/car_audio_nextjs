export type DepartmentType = {
  _id: string;
  name: string;
  slug: string;
};

export type CompanyType = {
  _id: string;
  name: string;
  slug: string;
};

export type ModelCompanyType = {
  _id: string;
  name: string;
  slug: string;
};

export type ModelType = {
  _id: string;
  name: string;
  slug: string;
  companyId: ModelCompanyType | string;
};

export type SubModelType = {
  _id: string;
  name: string;
  slug: string;
  modelId:
    | {
        _id: string;
        name: string;
        slug: string;
        companyId?: {
          _id: string;
          name: string;
          slug: string;
        };
      }
    | string;
};

export type ProductItemType = {
  _id: string;
  departmentId?: { _id: string; name: string; slug: string };
  companyId?: { _id: string; name: string; slug: string };
  modelId?: { _id: string; name: string; slug: string };
  subModelId?: { _id: string; name: string; slug: string } | null;
  year: number;
  name: string;
  slug: string;
  sku: string;
  price: number;
  salePrice: number;
  stock: number;
  images: string[];
  shortDescription?: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type FormDataType = {
  departmentId: string;
  companyId: string;
  modelId: string;
  subModelId: string;
  year: string;
  name: string;
  sku: string;
  price: string;
  salePrice: string;
  stock: string;
  images: string[];
  shortDescription: string;
  description: string;
  isActive: boolean;
};

export const initialFormData: FormDataType = {
  departmentId: "",
  companyId: "",
  modelId: "",
  subModelId: "",
  year: "",
  name: "",
  sku: "",
  price: "",
  salePrice: "0",
  stock: "0",
  images: [],
  shortDescription: "",
  description: "",
  isActive: true,
};