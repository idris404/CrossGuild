import { NextResponse } from "next/server";
import { getProductById } from "@/features/products/server/product.server";
import { handleApiError } from "@/shared/lib/handle-api-error";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await getProductById(id);
    return NextResponse.json(product);
  } catch (error) {
    return handleApiError(error);
  }
}
