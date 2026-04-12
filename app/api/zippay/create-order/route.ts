import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Order from "@/models/Order";
import { CreateOrderRequest } from "@/types/order";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body: CreateOrderRequest = await req.json();

    const {
      customer,
      shippingAddress,
      items,
      shippingCost = 0,
    } = body;

    console.log("📦 ZIPPAY API CALL:", {
      customer,
      shippingAddress,
      items,
      shippingCost,
    });

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items provided" },
        { status: 400 }
      );
    }

    // ✅ SAME CALCULATION (like PayPal)
    const itemsTotal = items.reduce(
      (acc, item) =>
        acc + Number(item.price || 0) * Number(item.quantity || 0),
      0
    );

    const shipping = Number(shippingCost || 0);
    const calculatedTotal = itemsTotal + shipping;

    console.log("💰 ZIPPAY TOTAL:", {
      itemsTotal,
      shipping,
      calculatedTotal,
    });

    // 💾 SAVE ORDER (same schema workaround)
    const newOrder = await Order.create({
      customer,
      shippingAddress,
      items,
      total: calculatedTotal,

      // ⚠️ since schema doesn't allow "zippay"
      paymentMethod: "paypal",

      status: "pending",
      paymentDetails: {
        provider: "zippay",
      },
    });

    // 🔗 MOCK ZIP CHECKOUT URL
    const checkoutUrl = `https://zip-sandbox-checkout.com/session/${newOrder._id}`;

    return NextResponse.json({
      success: true,
      orderId: newOrder._id,
      checkoutUrl,
      backendTotal: calculatedTotal,
    });
  } catch (error: any) {
    console.error("❌ ZipPay Create Error:", error);

    return NextResponse.json(
      {
        error: "ZipPay order failed",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}