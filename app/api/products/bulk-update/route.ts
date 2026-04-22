import { bulkUpdateProductsController } from "@/controllers/product.controller";

export async function PUT(req: Request) {
  return bulkUpdateProductsController(req);
}