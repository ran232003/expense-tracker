import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View, Text } from "react-native";
import AuthScreen from "./screens/AuthScreen";
import MyTabs from "./screens/MyTabs";

const ProtectedRoute = () => {
  const user = useSelector((state) => state.auth.user); // Assuming you're managing user in Redux
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Perform user authentication logic here instead of during render
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return <MyTabs />;
};

export default ProtectedRoute;
