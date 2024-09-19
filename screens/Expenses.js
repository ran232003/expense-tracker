import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpenseOutput from "./ExpenseOutput";
import { useSelector } from "react-redux";

const Expenses = () => {
  const expenseList = useSelector((state) => {
    return state.expense;
  });
  console.log("Expenses Total");

  return (
    <ExpenseOutput
      title="Total"
      expenseList={expenseList.total}
      amount={expenseList.totalAmount}
    />
  );
};

export default Expenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#200364",
  },
});
