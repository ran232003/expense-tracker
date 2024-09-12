import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import * as Yup from "yup";

const Input = (props) => {
  const {
    label,
    handleChange,
    value,
    fieldName,
    keyboardType,
    style,
    placeholder,
    numberOfLines,
    multiline,
    error,
  } = props;

  return (
    <View style={style}>
      <Text style={styles.customLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={(text) => handleChange(text, fieldName)}
        mode="outlined"
        keyboardType={keyboardType}
        placeholder={placeholder}
        textColor="purple"
        numberOfLines={numberOfLines}
        multiline={multiline}
        theme={{ colors: { primary: "red" } }}
        error={!!error}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      {/* Display error message */}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  customLabel: {
    color: "#C8A2C8", // A shade between white and purple
    fontSize: 16,
    marginBottom: 5, // Adds some spacing between label and input
  },
  textInput: {
    backgroundColor: "transparent", // Keep input background clear
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
