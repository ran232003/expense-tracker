import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ExpenseItem = (props) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("ManageExpense", {
      expense: {
        ...expense,
        date: expense.date.toISOString(), // Convert date to a string
      },
      title: "edit",
    });
  };
  const { expense } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.leftContainer}>
        <Text style={styles.description}>{expense.description}</Text>
        <Text style={styles.date}>{expense.date.toLocaleDateString()}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.amount}>${expense.amount.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    backgroundColor: "#a281f0",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    alignSelf: "center", // Centers the item in the view
  },
  leftContainer: {
    flexDirection: "column",
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
  rightContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
