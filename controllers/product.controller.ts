import mongoose, { Types } from "mongoose";
import { connectDB } from "@/lib/dbConnect";
import { toSlug } from "@/lib/slugify";
import Product from "@/models/Product";
import Department from "@/models/Department";
import CarCompany from "@/models/CarCompany";
import CarModel from "@/models/CarModel";
import SubModel from "@/models/SubModel";
import { errorResponse, successResponse } from "@/lib/api-response";

function parseBoolean(value: string | null, defaultValue?: boolean) {
  if (value === null || value === undefined) return defaultValue;
  return value === "true";
}

function isValidObjectId(value: string) {
  return Types.ObjectId.isValid(value);
}

export async function createProductController(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    // ✅ helper
    const sanitizeObjectId = (value: any) => {
      if (!value || value === "") return undefined;
      return value;
    };

    // ✅ sanitize IDs
    const departmentId = sanitizeObjectId(body?.departmentId);
    const companyId = sanitizeObjectId(body?.companyId);
    const modelId = sanitizeObjectId(body?.modelId);
    const subModelId = sanitizeObjectId(body?.subModelId);

    // ✅ optional year
    let year: number | undefined;
    if (body?.year !== undefined && body?.year !== "") {
      const parsedYear = Number(body.year);
      if (!Number.isNaN(parsedYear)) {
        year = parsedYear;
      }
    }

    const name = body?.name?.trim();
    const sku = body?.sku?.trim()?.toUpperCase();
    const price = Number(body?.price);
    const salePrice = Number(body?.salePrice || 0);
    const stock = Number(body?.stock || 0);

    const images = Array.isArray(body?.images)
      ? body.images.filter((item: any) => typeof item === "string" && item.trim())
      : [];

    const shortDescription = body?.shortDescription?.trim() || "";
    const description = body?.description?.trim() || "";
    const isActive =
      typeof body?.isActive === "boolean" ? body.isActive : true;

    // ✅ REQUIRED validations
    if (!departmentId || !isValidObjectId(departmentId)) {
      return errorResponse("Valid department id is required", 400);
    }

    if (!companyId || !isValidObjectId(companyId)) {
      return errorResponse("Valid company id is required", 400);
    }

    // ✅ OPTIONAL validations
    if (modelId && !isValidObjectId(modelId)) {
      return errorResponse("Invalid model id", 400);
    }

    if (subModelId && !isValidObjectId(subModelId)) {
      return errorResponse("Invalid submodel id", 400);
    }

    if (!name) return errorResponse("Product name is required", 400);
    if (!sku) return errorResponse("SKU is required", 400);

    if (Number.isNaN(price)) {
      return errorResponse("Valid price is required", 400);
    }

    if (Number.isNaN(salePrice)) {
      return errorResponse("Valid salePrice is required", 400);
    }

    if (Number.isNaN(stock)) {
      return errorResponse("Valid stock is required", 400);
    }

    // ✅ fetch required relations
    const [department, company] = await Promise.all([
      Department.findById(departmentId),
      CarCompany.findById(companyId),
    ]);

    if (!department) return errorResponse("Department not found", 404);
    if (!company) return errorResponse("Car company not found", 404);

    // ✅ optional model fetch
    let model = null;
    if (modelId) {
      model = await CarModel.findById(modelId);
      if (!model) return errorResponse("Car model not found", 404);

      if (model.companyId.toString() !== companyId) {
        return errorResponse("Model does not belong to company", 400);
      }
    }

    // ✅ optional submodel fetch
    if (subModelId) {
      const subModel = await SubModel.findById(subModelId);
      if (!subModel) return errorResponse("Submodel not found", 404);

      if (modelId && subModel.modelId.toString() !== modelId) {
        return errorResponse("Submodel does not belong to model", 400);
      }
    }

    const slug = toSlug(name);

    const duplicateSlug = await Product.findOne({ slug });
    if (duplicateSlug) {
      return errorResponse("Product slug already exists", 409);
    }

    const duplicateSku = await Product.findOne({ sku });
    if (duplicateSku) {
      return errorResponse("Product SKU already exists", 409);
    }

    // ✅ build payload safely
    const productData: any = {
      departmentId,
      companyId,
      name,
      slug,
      sku,
      price,
      salePrice,
      stock,
      images,
      shortDescription,
      description,
      isActive,
    };

    if (modelId) productData.modelId = modelId;
    if (subModelId) productData.subModelId = subModelId;
    if (year !== undefined) productData.year = year;

    const product = await Product.create(productData);

    const populatedProduct = await Product.findById(product._id)
      .populate("departmentId", "name slug")
      .populate("companyId", "name slug")
      .populate("modelId", "name slug")
      .populate("subModelId", "name slug");

    return successResponse(populatedProduct, "Product created successfully", 201);
  } catch (error: any) {
    if (error instanceof mongoose.Error.ValidationError) {
      return errorResponse(error.message, 400);
    }
    return errorResponse(error?.message || "Failed to create product", 500);
  }
}

export async function getProductsController(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const search = searchParams.get("search") || "";
    const departmentId = searchParams.get("departmentId") || "";
    const companyId = searchParams.get("companyId") || "";
    const modelId = searchParams.get("modelId") || "";
    const subModelId = searchParams.get("subModelId") || "";
    const year = searchParams.get("year") || "";
    const isActive = parseBoolean(searchParams.get("isActive"));
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;

    const skip = (page - 1) * limit;
    const query: Record<string, any> = {};

    if (departmentId) {
      if (!isValidObjectId(departmentId)) {
        return errorResponse("Invalid department id", 400);
      }
      query.departmentId = departmentId;
    }

    if (companyId) {
      if (!isValidObjectId(companyId)) {
        return errorResponse("Invalid company id", 400);
      }
      query.companyId = companyId;
    }

    if (modelId) {
      if (!isValidObjectId(modelId)) {
        return errorResponse("Invalid model id", 400);
      }
      query.modelId = modelId;
    }

    if (subModelId) {
      if (!isValidObjectId(subModelId)) {
        return errorResponse("Invalid submodel id", 400);
      }
      query.subModelId = subModelId;
    }

    if (year) {
      query.year = Number(year);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (typeof isActive === "boolean") {
      query.isActive = isActive;
    }

    const [products, total] = await Promise.all([
      Product.find(query)
        .populate("departmentId", "name slug")
        .populate("companyId", "name slug")
        .populate("modelId", "name slug")
        .populate("subModelId", "name slug")
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit),
      Product.countDocuments(query),
    ]);

    return successResponse(
      {
        result: products,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      "Products fetched successfully"
    );
  } catch (error: any) {
    return errorResponse(error?.message || "Failed to fetch products", 500);
  }
}

export async function getProductByIdController(_req: Request, id: string) {
  try {
    await connectDB();

    if (!Types.ObjectId.isValid(id)) {
      return errorResponse("Invalid product id", 400);
    }

    const product = await Product.findById(id)
      .populate("departmentId", "name slug")
      .populate("companyId", "name slug")
      .populate("modelId", "name slug")
      .populate("subModelId", "name slug");

    if (!product) {
      return errorResponse("Product not found", 404);
    }

    return successResponse(product, "Product fetched successfully");
  } catch (error: any) {
    return errorResponse(error?.message || "Failed to fetch product", 500);
  }
}

export async function updateProductController(req: Request, id: string) {
  try {
    await connectDB();

    if (!Types.ObjectId.isValid(id)) {
      return errorResponse("Invalid product id", 400);
    }

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return errorResponse("Product not found", 404);
    }

    const body = await req.json();
    const updateData: Record<string, any> = {};

    // ✅ safe converter
    const toStr = (val: any) => (val ? val.toString() : undefined);

    const nextDepartmentId =
      body?.departmentId?.trim?.() ||
      body?.departmentId ||
      toStr(existingProduct.departmentId);

    const nextCompanyId =
      body?.companyId?.trim?.() ||
      body?.companyId ||
      toStr(existingProduct.companyId);

    // ✅ MODEL ID is OPTIONAL now
    const nextModelId =
      body?.modelId !== undefined
        ? body?.modelId?.trim?.() || body?.modelId || null
        : toStr(existingProduct.modelId) || null;

    const nextSubModelId =
      body?.subModelId !== undefined
        ? body?.subModelId?.trim?.() || body?.subModelId || null
        : toStr(existingProduct.subModelId) || null;

    // =========================
    // VALIDATION
    // =========================

    if (!isValidObjectId(nextDepartmentId)) {
      return errorResponse("Valid department id is required", 400);
    }

    if (!isValidObjectId(nextCompanyId)) {
      return errorResponse("Valid company id is required", 400);
    }

    // ✅ OPTIONAL modelId validation
    if (nextModelId && !isValidObjectId(nextModelId)) {
      return errorResponse("Invalid model id", 400);
    }

    if (nextSubModelId && !isValidObjectId(nextSubModelId)) {
      return errorResponse("Invalid submodel id", 400);
    }

    // =========================
    // FETCH DATA
    // =========================

    const [department, company, model] = await Promise.all([
      Department.findById(nextDepartmentId),
      CarCompany.findById(nextCompanyId),
      nextModelId ? CarModel.findById(nextModelId) : null,
    ]);

    if (!department) {
      return errorResponse("Department not found", 404);
    }

    if (!company) {
      return errorResponse("Car company not found", 404);
    }

    // ✅ model optional check
    if (nextModelId && !model) {
      return errorResponse("Car model not found", 404);
    }

    // =========================
    // BUSINESS RULES
    // =========================

    if (nextModelId && model?.companyId?.toString() !== nextCompanyId) {
      return errorResponse(
        "Selected model does not belong to selected company",
        400
      );
    }

    if (nextSubModelId) {
      const subModel = await SubModel.findById(nextSubModelId);

      if (!subModel) {
        return errorResponse("Submodel not found", 404);
      }

      if (nextModelId && subModel.modelId.toString() !== nextModelId) {
        return errorResponse(
          "Selected submodel does not belong to selected model",
          400
        );
      }
    }

    // =========================
    // ASSIGN DATA
    // =========================

    updateData.departmentId = nextDepartmentId;
    updateData.companyId = nextCompanyId;
    updateData.modelId = nextModelId; // can be null
    updateData.subModelId = nextSubModelId;

    // =========================
    // OPTIONAL FIELDS
    // =========================

    if (body?.year !== undefined) {
      const year = Number(body.year);
      if (Number.isNaN(year)) {
        return errorResponse("Valid year is required", 400);
      }
      updateData.year = year;
    }

    if (typeof body?.name === "string" && body.name.trim()) {
      const nextName = body.name.trim();
      const nextSlug = toSlug(nextName);

      const duplicateSlug = await Product.findOne({
        _id: { $ne: id },
        slug: nextSlug,
      });

      if (duplicateSlug) {
        return errorResponse(
          "Another product with this slug already exists",
          409
        );
      }

      updateData.name = nextName;
      updateData.slug = nextSlug;
    }

    if (typeof body?.sku === "string" && body.sku.trim()) {
      const nextSku = body.sku.trim().toUpperCase();

      const duplicateSku = await Product.findOne({
        _id: { $ne: id },
        sku: nextSku,
      });

      if (duplicateSku) {
        return errorResponse(
          "Another product with this SKU already exists",
          409
        );
      }

      updateData.sku = nextSku;
    }

    if (body?.price !== undefined) {
      const price = Number(body.price);
      if (Number.isNaN(price)) {
        return errorResponse("Valid price is required", 400);
      }
      updateData.price = price;
    }

    if (body?.salePrice !== undefined) {
      const salePrice = Number(body.salePrice);
      if (Number.isNaN(salePrice)) {
        return errorResponse("Valid salePrice is required", 400);
      }
      updateData.salePrice = salePrice;
    }

    if (body?.stock !== undefined) {
      const stock = Number(body.stock);
      if (Number.isNaN(stock)) {
        return errorResponse("Valid stock is required", 400);
      }
      updateData.stock = stock;
    }

    if (Array.isArray(body?.images)) {
      updateData.images = body.images.filter(
        (item: unknown) => typeof item === "string" && item.trim()
      );
    }

    if (typeof body?.shortDescription === "string") {
      updateData.shortDescription = body.shortDescription.trim();
    }

    if (typeof body?.description === "string") {
      updateData.description = body.description.trim();
    }

    if (typeof body?.isActive === "boolean") {
      updateData.isActive = body.isActive;
    }

    // =========================
    // UPDATE PRODUCT
    // =========================

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("departmentId", "name slug")
      .populate("companyId", "name slug")
      .populate("modelId", "name slug")
      .populate("subModelId", "name slug");

    return successResponse(updatedProduct, "Product updated successfully");
  } catch (error: any) {
    if (error instanceof mongoose.Error.ValidationError) {
      return errorResponse(error.message, 400);
    }

    return errorResponse(
      error?.message || "Failed to update product",
      500
    );
  }
}
export async function deleteProductController(_req: Request, id: string) {
  try {
    await connectDB();

    if (!Types.ObjectId.isValid(id)) {
      return errorResponse("Invalid product id", 400);
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return errorResponse("Product not found", 404);
    }

    return successResponse(deletedProduct, "Product deleted successfully");
  } catch (error: any) {
    return errorResponse(error?.message || "Failed to delete product", 500);
  }
}

export async function getProductBySlugController(
  _req: Request,
  slug: string
) {
  try {
    await connectDB();

    console.log(slug, "this is slug");

    // ✅ Validation
    if (!slug || typeof slug !== "string") {
      return errorResponse("Invalid slug", 400);
    }

    // ✅ Query
    const product = await Product.findOne({
      slug: slug.toLowerCase(),
    })
      .populate("departmentId", "name slug")
      .populate("companyId", "name slug")
      .populate("modelId", "name slug")
      .populate("subModelId", "name slug")
      .lean();

    // ✅ Not found
    if (!product) {
      return errorResponse("Product not found", 404);
    }

    // ✅ Success
    return successResponse(product, "Product fetched successfully");
  } catch (error: any) {
    console.error("GET PRODUCT ERROR:", error);

    return errorResponse(
      error?.message || "Failed to fetch product",
      500
    );
  }
}


export async function bulkUpdateProductsController(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { ids, updateData } = body;
    console.log(ids, updateData, "this is ")
    // ✅ Validation
    if (!Array.isArray(ids) || ids.length === 0) {
      return errorResponse("Invalid product IDs", 400);
    }

    if (!updateData || typeof updateData !== "object") {
      return errorResponse("Invalid update data", 400);
    }

    // ❗ Prevent updating restricted fields
    const restrictedFields = ["slug", "sku", "_id"];
    for (const key of Object.keys(updateData)) {
      if (restrictedFields.includes(key)) {
        return errorResponse(`Cannot update field: ${key}`, 400);
      }
    }

    // ✅ Perform bulk update
    const result = await Product.updateMany(
      { _id: { $in: ids } },
      { $set: updateData }
    );

    return successResponse(
      {
        matched: result.matchedCount,
        modified: result.modifiedCount,
      },
      "Bulk update successful"
    );
  } catch (error: any) {
    console.error("BULK UPDATE ERROR:", error);

    return errorResponse(
      error?.message || "Bulk update failed",
      500
    );
  }
}