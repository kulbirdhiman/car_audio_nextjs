import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Order from "@/models/Order";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Missing orderId" },
        { status: 400 }
      );
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    if (order.status === "paid") {
      return NextResponse.json({
        message: "Already paid",
      });
    }

    // ✅ Mark as paid (in real world use webhook verification)
    order.status = "paid";
    await order.save();

    return NextResponse.json({
      success: true,
      message: "Order confirmed",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Afterpay confirm failed",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}