import { NextRequest, NextResponse } from "next/server";
import paypalClient from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";
import Order from "@/models/Order";
import { connectDB } from "@/lib/dbConnect";

interface CaptureRequestBody {
  paypalOrderId: string;
  orderId: string;
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { paypalOrderId, orderId }: CaptureRequestBody =
      await req.json();

    // ❌ Validate input
    if (!paypalOrderId || !orderId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🔍 Find order
    const existingOrder = await Order.findById(orderId);

    if (!existingOrder) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // ❌ Prevent duplicate payment
    if (existingOrder.status === "paid") {
      return NextResponse.json(
        { error: "Order already paid" },
        { status: 400 }
      );
    }

    // 💳 Capture PayPal payment
    const request = new paypal.orders.OrdersCaptureRequest(
      paypalOrderId
    );

    const capture = await paypalClient.execute(request);

    const result = capture.result;

    // ❌ Validate PayPal response
    if (result.status !== "COMPLETED") {
      return NextResponse.json(
        {
          error: "Payment not completed",
          paypalStatus: result.status,
        },
        { status: 400 }
      );
    }

    // 💾 Update order
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        status: "paid",
        paymentDetails: result,
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Payment captured successfully",
      data: updatedOrder,
    });
  } catch (error: any) {
    console.error("❌ Capture Error:", error);

    return NextResponse.json(
      {
        error: "Payment capture failed",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}