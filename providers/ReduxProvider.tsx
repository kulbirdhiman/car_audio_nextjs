"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <Provider store={store}>
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
          currency: "USD",
          intent: "capture",
        }}
      >
        {children}
      </PayPalScriptProvider>
    </Provider>
  );
}