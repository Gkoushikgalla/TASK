import { configureStore } from "@reduxjs/toolkit";
import { fakestoreApi } from "../api/fakestoreApi";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [fakestoreApi.reducerPath]: fakestoreApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fakestoreApi.middleware),
});
