import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native-paper";
import * as Yup from "yup";
import MyButton from "./MyButton";
import { useDispatch } from "react-redux";
import { expenseActions } from "../store/expenseSlice";
import { ADD_EXPENSE, EDIT_EXPENSE, GET_EXPENSES } from "../URLS";
import { apiCall } from "../apiCall";
import { useApiHelper } from "../apiHelper";

const generateUniqueId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const ExpenseForm = (props) => {
  const { handleApiCall } = useApiHelper();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const { expense, cancelFunc, addFunc, buttonTitle, setIsDeleted, title } =
    props;
  const expenseSchema = Yup.object().shape({
    amount: Yup.number()
      .min(0.01, "Amount must be greater than 0")
      .required("Amount is required"),
    description: Yup.string().required("Description is required"),
    date: Yup.date().required("Date is required"),
  });
  const validateInputs = async () => {
    try {
      const res = await expenseSchema.validate(inputs, { abortEarly: false });
      console.log(res, "validateInputs");
      setErrors({}); // Clear errors if validation passes
      return res;
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors); // Set validation errors
      return false;
    }
  };
  const handleSubmit = async () => {
    //const data = await apiCall("GET", GET_EXPENSES, {});
    const exp = await validateInputs(); // Validate on submit

    try {
      if (title === "edit") {
        const newExpense = { ...exp, id: expense.id };
        handleApiCall(
          "POST",
          EDIT_EXPENSE,
          newExpense,
          (data) => {
            dispatch(expenseActions.setExpenses(data.data));
          },
          () => {}
        );
        // dispatch(expenseActions.editExpense(newExpense));
        // console.log(newExpense, "after");
      } else {
        if (exp) {
          handleApiCall(
            "POST",
            ADD_EXPENSE,
            exp,
            (data) => {
              dispatch(expenseActions.setExpenses(data.data));
            },
            () => {}
          );
          // const newExpense = {
          //   id: "e2" + new Date().toISOString(),
          //   description: exp.description,
          //   amount: exp.amount,
          //   date: exp.date,
          // };

          // dispatch(expenseActions.addExpense(newExpense));
        }
      }
      setIsDeleted(true);
    } catch (error) {
      console.log(error, "after");
    }
  };
  const [inputs, setInputs] = useState({
    description: "",
    amount: "0", // Initialize as a string
    date: new Date(),
  });
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);

    if (selectedDate) {
      setInputs((prevState) => ({
        ...prevState,
        date: selectedDate,
      }));
    }
  };
  useEffect(() => {
    if (expense) {
      let date = new Date(expense.date);
      setInputs({
        description: expense.description || "",
        amount: expense.amount.toString() || "0", // Convert amount to string
        date: date || new Date(),
      });
    } else {
      setInputs({
        description: "",
        amount: "0", // Initialize as a string
        date: new Date(),
      });
    }
  }, [expense]);

  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "";
    }
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleChange = (value, fieldName) => {
    if (fieldName === "amount") {
      value = value.replace(/[^0-9.]/g, ""); // Remove any non-numeric characters except period
    }
    setInputs((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handlePicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowInputs}>
        <Input
          fieldName="amount"
          label="Amount"
          value={inputs.amount}
          keyboardType="numeric"
          handleChange={handleChange}
          style={styles.input}
          placeholder="Amount"
          numberOfLines={1}
          error={errors.amount}
        />
        <View style={styles.input}>
          <Text style={styles.customLabel}>Date</Text>
          <TextInput
            value={formatDate(inputs.date)}
            onFocus={handlePicker}
            numberOfLines={1}
            textColor="purple"
            mode="outlined"
            onPressIn={() => setShowPicker(true)}
          />
        </View>
        {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
        {/* Display date error */}
        {showPicker && (
          <DateTimePicker
            value={inputs.date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      <Input
        fieldName="description"
        label="Description"
        value={inputs.description}
        keyboardType="text"
        handleChange={handleChange}
        numberOfLines={4}
        multiline={true}
        placeholder="Description"
        error={errors.description}
      />
      <View style={styles.buttonContainer}>
        <MyButton
          buttonStyle={styles.button}
          title={"Cancel"}
          buttonMode={"outlined"}
          color={"purple"}
          func={cancelFunc}
        />
        <MyButton
          buttonStyle={styles.button}
          title={buttonTitle}
          buttonMode={"contained-tonal"}
          color={"purple"}
          func={handleSubmit}
        />
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    borderColor: "white",
    padding: 10,
  },
  rowInputs: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  input: {
    marginHorizontal: 5,
    width: "48%",
    marginBottom: 30,
  },
  customLabel: {
    color: "#C8A2C8", // A shade between white and purple
    fontSize: 16,
    marginBottom: 5, // Adds some spacing between label and input
  },
  textInput: {
    backgroundColor: "transparent", // Keep input background clear
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row", // Align buttons in a row
    justifyContent: "center", // Space between the buttons
    width: "98%", // Set a width for the button container
  },
  button: {
    marginHorizontal: 10, // Reduce the space between the buttons
  },
});
