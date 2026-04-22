import Product from "@/models/Product";
import { connectDB } from "@/lib/dbConnect";

// GET RANDOM PRODUCTS FOR HOMEPAGE
export const getRandomProducts = async (limit: number = 4) => {
  await connectDB();

  try {
    const products = await Product.aggregate([
      { $match: { isActive: true } }, // optional filter
      { $sample: { size: limit } },
    ]);

    return {
      success: true,
      data: products,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};