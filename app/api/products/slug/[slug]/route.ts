import { NextRequest } from "next/server";
import { getProductBySlugController } from "@/controllers/product.controller";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params; // ✅ correct

    return getProductBySlugController(req, slug);
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error?.message || "Something went wrong",
      }),
      { status: 500 }
    );
  }
}