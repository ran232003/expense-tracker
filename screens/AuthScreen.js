import React from "react";
import { View, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import { authActions } from "./store/authSlice";

export default function AuthScreen() {
  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(authActions.signIn());
  };

  return (
    <View>
      <Text>Please sign in to continue</Text>
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
}
