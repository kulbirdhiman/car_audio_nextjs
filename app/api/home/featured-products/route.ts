import { getRandomProducts } from "@/controllers/homepage.controller";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const limit = Number(searchParams.get("limit")) || 4;

  const result = await getRandomProducts(limit);

  return Response.json(result);
}