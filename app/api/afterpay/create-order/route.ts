import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Order from "@/models/Order";
import afterpayClient from "@/lib/afterpay";
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

    console.log("📦 AFTERPAY API CALL:", {
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

    // ✅ SAME SAFE CALCULATION (like PayPal)
    const itemsTotal = items.reduce(
      (acc, item) =>
        acc + Number(item.price || 0) * Number(item.quantity || 0),
      0
    );

    const shipping = Number(shippingCost || 0);
    const calculatedTotal = itemsTotal + shipping;

    console.log("💰 AFTERPAY SERVER TOTAL:", {
      itemsTotal,
      shipping,
      calculatedTotal,
    });

    // 🔗 AFTERPAY API CALL
    const response = await afterpayClient.post("/v2/checkouts", {
      amount: {
        amount: calculatedTotal.toFixed(2),
        currency: "USD",
      },

      consumer: {
        givenNames: customer.firstName,
        surname: customer.lastName,
        email: customer.email,
      },

      billing: {
        name: `${customer.firstName} ${customer.lastName}`,
        line1: shippingAddress.streetAddress,
        area1: shippingAddress.city,
        region: shippingAddress.state,
        postcode: shippingAddress.postcode,
        countryCode: "AU"
      },

      shipping: {
        name: `${customer.firstName} ${customer.lastName}`,
        line1: shippingAddress.streetAddress,
        area1: shippingAddress.city,
        region: shippingAddress.state,
        postcode: shippingAddress.postcode,
        countryCode: "AU",
      },

      items: items.map((item) => ({
        name: item.name,
        sku: item.productId,
        quantity: item.quantity,
        price: {
          amount: Number(item.price).toFixed(2),
          currency: "USD",
        },
      })),

      merchant: {
        redirectConfirmUrl: `${process.env.NEXT_PUBLIC_ADDRESS}/success?orderId=TEMP`,
        redirectCancelUrl: `${process.env.NEXT_PUBLIC_ADDRESS}/checkout`,
      },
    });

    const afterpayData = response.data;

    // 💾 SAVE ORDER (⚠️ IMPORTANT FIX HERE)
    const newOrder = await Order.create({
      customer,
      shippingAddress,
      items,
      total: calculatedTotal,

      // ❗ since schema doesn't allow "afterpay"
      paymentMethod: "paypal", // ✅ TEMP workaround

      paymentDetails: afterpayData, // ✅ store Afterpay response
      status: "pending",
    });

    // ✅ Fix redirect URL with real orderId
    const checkoutUrl = afterpayData.redirectCheckoutUrl.replace(
      "TEMP",
      newOrder._id.toString()
    );

    return NextResponse.json({
      success: true,
      orderId: newOrder._id,
      checkoutUrl,
      backendTotal: calculatedTotal,
    });
  } catch (error: any) {
    console.error("❌ Afterpay Create Error:", error?.response?.data || error);

    return NextResponse.json(
      {
        error: "Afterpay session creation failed",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}