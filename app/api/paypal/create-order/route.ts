import { NextRequest, NextResponse } from "next/server";
import paypalClient from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";
import Order from "@/models/Order";
import { connectDB } from "@/lib/dbConnect";
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

    console.log("📦 API CALL:", {
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

    // ✅ SAFE CALCULATION
    const itemsTotal = items.reduce(
      (acc, item) =>
        acc + Number(item.price || 0) * Number(item.quantity || 0),
      0
    );

    const shipping = Number(shippingCost || 0);
    const calculatedTotal = itemsTotal + shipping;

    console.log("💰 SERVER TOTAL:", {
      itemsTotal,
      shipping,
      calculatedTotal,
    });

    // 💳 PAYPAL ORDER
    const request = new paypal.orders.OrdersCreateRequest();

    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: calculatedTotal.toFixed(2),

            // ✅ FULL BREAKDOWN (fixes TS + PayPal validation)
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: itemsTotal.toFixed(2),
              },
              shipping: {
                currency_code: "USD",
                value: shipping.toFixed(2),
              },
              tax_total: {
                currency_code: "USD",
                value: "0.00",
              },
              handling: {
                currency_code: "USD",
                value: "0.00",
              },
              insurance: {
                currency_code: "USD",
                value: "0.00",
              },
              shipping_discount: {
                currency_code: "USD",
                value: "0.00",
              },
              discount: {
                currency_code: "USD",
                value: "0.00",
              },
            },
          },
          description: "Order from your store",
        },
      ],
    });

    const paypalOrder = await paypalClient.execute(request);

    // 💾 SAVE ORDER
    const newOrder = await Order.create({
      customer,
      shippingAddress,
      items,
      total: calculatedTotal,
      paymentMethod: "paypal",
      paymentDetails: paypalOrder.result,
      status: "pending",
    });

    return NextResponse.json({
      success: true,
      paypalOrderId: paypalOrder.result.id,
      orderId: newOrder._id,
      backendTotal: calculatedTotal,
    });
  } catch (error: any) {
    console.error("❌ PayPal Create Order Error:", error);

    return NextResponse.json(
      {
        error: "Error creating PayPal order",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}