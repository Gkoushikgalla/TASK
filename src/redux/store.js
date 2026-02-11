import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { fakestoreApi } from "../api/fakestoreApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [fakestoreApi.reducerPath]: fakestoreApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fakestoreApi.middleware),
});
