import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PageHeadline from "../components/PageHeadline";
import ExpenseList from "../components/ExpenseList";

const ExpenseOutput = (props) => {
  const { title, expenseList, amount } = props;
  console.log(amount);
  return (
    <View style={styles.container}>
      <PageHeadline title={title} amount={amount} />
      <ExpenseList expenseList={expenseList} />
    </View>
  );
};

export default ExpenseOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#200364",
  },
});
