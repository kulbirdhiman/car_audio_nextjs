import { bulkUpdateProductsController } from "@/controllers/product.controller";

export async function POST(req: Request) {
  return bulkUpdateProductsController(req);
}