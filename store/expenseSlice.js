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
      // Convert the date string to a Date object for each expense
      const expensesWithDateObjects = action.payload.map((expense) => ({
        ...expense,
        date: new Date(expense.date), // Convert date string to Date object
      }));

      // Set all expenses in the total array
      state.total = expensesWithDateObjects;
      state.totalAmount = state.total
        .reduce((sum, expense) => sum + parseFloat(expense.amount), 0)
        .toFixed(2);

      // Filter recent expenses (e.g., last 7 days)
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);

      state.recent = expensesWithDateObjects.filter(
        (expense) => expense.date >= sevenDaysAgo
      );
      state.recentAmount = state.recent
        .reduce((sum, expense) => sum + parseFloat(expense.amount), 0)
        .toFixed(2);
    },
    editExpense(state, action) {
      const { id, description, amount, date } = action.payload;

      // Find the index of the expense in the total array
      const totalIndex = state.total.findIndex((expense) => expense.id === id);

      if (totalIndex !== -1) {
        // Update the expense in the total array
        state.total[totalIndex] = { id, description, amount, date };

        // Check if the updated expense is still recent
        const recentIndex = state.recent.findIndex(
          (expense) => expense.id === id
        );

        if (isRecent(state.total[totalIndex])) {
          if (recentIndex !== -1) {
            // Update in the recent array if already there
            state.recent[recentIndex] = { id, description, amount, date };
          } else {
            // Add to recent array if it's not already there
            state.recent.push({ id, description, amount, date });
          }
        } else if (recentIndex !== -1) {
          // Remove from recent array if it's no longer recent
          state.recent.splice(recentIndex, 1);
        }

        // Update amounts after editing
        updateAmounts(state);
      }
    },

    addExpense(state, action) {
      const expense = action.payload;
      console.log(expense, "addExpense");
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
