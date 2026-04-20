import { getProductBySlugController } from "@/controllers/product.controller";

interface Params {
  params: {
    slug: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  try {

    const { slug } =await params; // ✅ NO await

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