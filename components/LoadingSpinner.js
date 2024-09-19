import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useSelector } from "react-redux";

const LoadingSpinner = () => {
  const loading = useSelector((state) => {
    return state.loading.loading;
  });
  console.log(loading, "loading");
  if (!loading) {
    return null; // Do not render if loading is false
  }
  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator animating={true} color={MD2Colors.red800} />
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  spinnerContainer: {
    position: "absolute", // Overlay the spinner on top of everything
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Optional: darken the background while loading
    zIndex: 100, // Make sure it's on top of everything
  },
});
