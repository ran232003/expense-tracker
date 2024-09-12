import { createSlice } from "@reduxjs/toolkit";
const isRecent = (expense) => {
  const now = new Date();
  const expenseDate = new Date(expense.date);
  const differenceInDays = (now - expenseDate) / (1000 * 60 * 60 * 24);
  return differenceInDays <= 7;
};

const updateAmounts = (state) => {
  state.totalAmount = state.total
    .reduce((sum, expense) => sum + expense.amount, 0)
    .toFixed(2);
  state.recentAmount = state.recent
    .reduce((sum, expense) => sum + expense.amount, 0)
    .toFixed(2);
};
const ExpenseSlice = createSlice({
  name: "expense",
  initialState: { total: [], recent: [], recentAmount: 0, totalAmount: 0 },
  reducers: {
    setExpenses(state, action) {
      // Set all expenses in the total array
      state.total = action.payload;
      state.totalAmount = state.total
        .reduce((sum, expense) => sum + parseFloat(expense.amount), 0)
        .toFixed(2);
      // Filter recent expenses (e.g., last 7 days)
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);

      state.recent = action.payload.filter(
        (expense) => new Date(expense.date) >= sevenDaysAgo
      );
      state.recentAmount = state.recent
        .reduce((sum, expense) => sum + parseFloat(expense.amount), 0)
        .toFixed(2);
    },

    addExpense(state, action) {
      const expense = action.payload;
      state.total.push(expense);

      if (isRecent(expense)) {
        state.recent.push(expense);
      }

      updateAmounts(state); // Update the totalAmount and recentAmount
    },
    deleteExpense(state, action) {
      const expenseId = action.payload;
      state.total = state.total.filter((expense) => expense.id !== expenseId);
      state.recent = state.recent.filter((expense) => expense.id !== expenseId);

      updateAmounts(state); // Update the totalAmount and recentAmount
    },
  },
});

export default ExpenseSlice;

export const expenseActions = ExpenseSlice.actions;
