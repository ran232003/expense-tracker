import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpenseOutput from "./ExpenseOutput";
import { useSelector } from "react-redux";

const RecentExpenses = () => {
  const expenseList = useSelector((state) => {
    return state.expense;
  });
  return (
    <ExpenseOutput
      title="Last 7 Days"
      expenseList={expenseList.recent}
      amount={expenseList.recentAmount}
    />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#200364",
  },
});
