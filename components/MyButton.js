import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

const MyButton = (props) => {
  const { title, buttonMode, func, buttonStyle, color } = props;

  return (
    <Button
      style={buttonStyle}
      mode={buttonMode}
      textColor={color}
      onPress={func} // Triggers the click effect and the provided function
      rippleColor="rgba(0, 0, 0, 0.2)"
    >
      {title}
    </Button>
  );
};

export default MyButton;

const styles = StyleSheet.create({});
