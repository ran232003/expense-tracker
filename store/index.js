import { configureStore } from "@reduxjs/toolkit";
import ExpenseSlice from "./expenseSlice";
import LoadingSlice from "./gameSlice";
import BannerSlice from "./bannerSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    expense: ExpenseSlice.reducer,
    loading: LoadingSlice.reducer,
    banner: BannerSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check
    }),
});
export default store;
