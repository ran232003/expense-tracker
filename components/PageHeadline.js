import { StyleSheet, Text, View } from "react-native";
import React from "react";

const PageHeadline = (props) => {
  const { title, amount } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.amount}>${amount}</Text>
    </View>
  );
};

export default PageHeadline;

const styles = StyleSheet.create({
  container: {
    marginTop: 20, // Margin applied at the top
    width: "90%",
    backgroundColor: "#f0f0f0", // Between white and grey
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignSelf: "center", // Centers the view horizontally
    // borderRadius: 5, // Optional, for rounded corners
    // borderWidth: 5, // Debugging: Add border to visualize the container
    // borderColor: "black", // Debugging: Set border color for better visibility
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
