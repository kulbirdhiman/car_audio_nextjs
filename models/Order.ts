import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
    },

    shippingAddress: {
      country: String,
      state: String,
      city: String,
      streetAddress: String,
      postcode: String,
    },

    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],

    paymentMethod: {
      type: String,
      enum: ["card", "paypal"],
      required: true,
    },

    paymentDetails: {
      type: Object, // PayPal response
    },

    total: Number,

    status: {
      type: String,
      default: "pending", // pending | paid | failed
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);