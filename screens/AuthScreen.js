import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { authAction } from "../store/authSlice";
import { TextInput, HelperText } from "react-native-paper";
import * as Yup from "yup";

// Validation schema with Yup
const validationSchema = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function AuthScreen() {
  console.log("AuthScreen");
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (value, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  // Handle form submission
  const handleSignIn = () => {
    validationSchema
      .validate(formData, { abortEarly: false })
      .then((validData) => {
        dispatch(authAction.setUser(validData));
        setErrors({});
      })
      .catch((validationErrors) => {
        const errorObject = {};
        validationErrors.inner.forEach((error) => {
          errorObject[error.path] = error.message;
        });
        setErrors(errorObject);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please sign in to continue</Text>

      <TextInput
        label="test"
        mode="outlined"
        value={formData.userName}
        onChangeText={(value) => handleChange(value, "userName")}
        error={!!errors.userName}
      />
      <HelperText type="error" visible={!!errors.userName}>
        {errors.userName}
      </HelperText>

      <TextInput
        label="Email"
        mode="outlined"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(value) => handleChange(value, "email")}
        error={!!errors.email}
      />
      <HelperText type="error" visible={!!errors.email}>
        {errors.email}
      </HelperText>

      <TextInput
        label="Passwords"
        mode="outlined"
        secureTextEntry
        value={formData.password}
        onChangeText={(value) => handleChange(value, "password")}
        error={!!errors.password}
      />
      <HelperText type="error" visible={!!errors.password}>
        {errors.password}
      </HelperText>

      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
});
