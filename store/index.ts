"use client";

import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./api/apiSlice";
import cartReducer from "./features/cartSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
     cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignore non-serializable values if needed
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

// Define RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;