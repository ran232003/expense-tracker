import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import MyButton from "../components/MyButton";
import Icon from "react-native-vector-icons/Ionicons"; // Import the Ionicons library
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { expenseActions } from "../store/expenseSlice";
import ExpenseForm from "../components/ExpenseForm";

const ManageExpense = ({ route }) => {
  expense = route.params?.expense;
  const { title } = route.params;
  const [isDeleted, setIsDeleted] = useState(false); // Control flag
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // Convert the date string back to a Date object if needed
  let expenseDate;
  let expense;
  let buttonTitle = "Add";
  if (title === "edit") {
    expenseDate = new Date(expense.date);
    buttonTitle = "Edit";
  }
  const cancelFunc = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };
  const addFunc = () => {
    dispatch(
      expenseActions.addExpense({
        id: "e2" + new Date().toISOString,
        description: "mt Test",
        amount: 89.29,
        date: new Date(),
      })
    );
    setIsDeleted(true);
    // Navigate back to the previous screen
  };
  const deleteFunc = () => {
    console.log(expense, expenseDate, title, buttonTitle);
    dispatch(expenseActions.deleteExpense(expense.id));
    // Navigate back to the previous screen
    setIsDeleted(true); // Set flag to true after deletion
  };
  useEffect(() => {
    if (isDeleted) {
      navigation.goBack(); // Navigate back only after deletion
    }
  }, [isDeleted, navigation]);
  return (
    <View style={styles.container}>
      <View>
        <Text>title</Text>
      </View>

      <ExpenseForm
        buttonTitle={buttonTitle}
        expense={expense}
        cancelFunc={cancelFunc}
        addFunc={addFunc}
        setIsDeleted={setIsDeleted}
        title={title}
      />

      {title === "edit" ? (
        <TouchableOpacity style={styles.iconContainer} onPress={deleteFunc}>
          <Icon
            name="trash-outline" // Ionicons trash can icon
            size={40}
            color="red"
            // Add functionality on press
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#200364",
    alignItems: "center", // Center horizontally
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row", // Align buttons in a row
    justifyContent: "center", // Space between the buttons
    width: "80%", // Set a width for the button container
  },
  button: {
    marginHorizontal: 10, // Reduce the space between the buttons
  },
  iconContainer: {
    marginTop: 20, // Space between buttons and icon
    alignItems: "center", // Center the icon
  },
});
