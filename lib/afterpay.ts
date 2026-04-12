import axios from "axios";

const afterpayClient = axios.create({
  baseURL: process.env.AFTERPAY_BASE_URL,
  auth: {
    username: process.env.AFTERPAY_API_KEY!,
    password: process.env.AFTERPAY_SECRET_KEY!,
  },
  headers: {
    "Content-Type": "application/json",
  },
});

export default afterpayClient;