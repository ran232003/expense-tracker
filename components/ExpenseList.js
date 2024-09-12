import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = (props) => {
  const { expenseList } = props;
  return (
    <FlatList
      style={styles.list}
      data={expenseList}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <ExpenseItem expense={item} />}
    />
  );
};

export default ExpenseList;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 10,
  },
});
