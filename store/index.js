import { configureStore } from "@reduxjs/toolkit";
import ExpenseSlice from "./expenseSlice";

const store = configureStore({
  reducer: {
    expense: ExpenseSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check
    }),
});
export default store;
