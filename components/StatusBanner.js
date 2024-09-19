import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Snackbar } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { bannerAction } from "../store/bannerSlice";

const StatusBanner = () => {
  const dispatch = useDispatch();
  const { visible, message, status } = useSelector((state) => state.banner);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setSnackbarVisible(true);
      const timer = setTimeout(() => {
        setSnackbarVisible(false);
        dispatch(bannerAction.hideBanner());
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setSnackbarVisible(false); // Ensure the Snackbar hides immediately
    }
  }, [visible, dispatch]);

  if (!snackbarVisible) {
    return null; // Do not render the component if snackbarVisible is false
  }

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
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10, // Adjust zIndex as needed
    padding: 16,
    alignItems: "center",
  },
  snackbar: {
    width: "95%",
    marginBottom: 50, // Ensure it doesn't overlap with tab bar
  },
  errorSnackbar: {
    backgroundColor: "red",
  },
  successSnackbar: {
    backgroundColor: "green",
  },
});
