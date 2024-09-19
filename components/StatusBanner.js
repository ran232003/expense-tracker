import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Banner, Button, Snackbar } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { bannerAction, hideBanner } from "../store/bannerSlice"; // Import the action

const StatusBanner = () => {
  const dispatch = useDispatch();
  const { visible, message, status } = useSelector((state) => state.banner); // Assuming you have a banner slice

  console.log(visible, message, status);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setSnackbarVisible(true);
      // Automatically hide the Snackbar after 2 seconds
      const timer = setTimeout(() => {
        setSnackbarVisible(false);
        dispatch(bannerAction.hideBanner()); // Dispatch action to hide the banner in the state
      }, 2000);

      return () => clearTimeout(timer); // Cleanup the timer if the component unmounts or visible changes
    }
  }, [visible, dispatch]);
  return (
    <View style={styles.container}>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        style={[
          styles.snackbar,
          status === "error" ? styles.errorSnackbar : styles.successSnackbar,
        ]}
      >
        {message ||
          (status === "error" ? "An error occurred!" : "Operation successful!")}
      </Snackbar>
    </View>
  );
};

export default StatusBanner;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0, // Position it at the bottom of the screen
    left: 0,
    right: 0,
    zIndex: 1000, // Ensure it's above other components
    padding: 16, // Add some padding for spacing from the bottom
    alignItems: "center", // Center the Snackbar horizontally
  },
  snackbar: {
    width: "95%", // Adjust width if needed
    // alignSelf: "center", // Center the Snackbar horizontally
  },
  errorSnackbar: {
    backgroundColor: "red",
  },
  successSnackbar: {
    backgroundColor: "green",
  },
});
