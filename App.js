import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyTabs from "./screens/MyTabs";
import ManageExpense from "./screens/ManageExpense";
import AuthScreen from "./screens/AuthScreen";
import LoadingSpinner from "./components/LoadingSpinner";
import StatusBanner from "./components/StatusBanner";
import { useEffect } from "react";
import { expenseActions } from "./store/expenseSlice";
import { useApiHelper } from "./apiHelper";
import { GET_EXPENSES } from "./URLS";

function App() {
  const auth = useSelector((state) => state.auth);
  const { handleApiCall } = useApiHelper();
  const dispatch = useDispatch();

  useEffect(() => {
    const setList = async () => {
      handleApiCall(
        "GET",
        GET_EXPENSES,
        {},
        (data) => {
          dispatch(expenseActions.setExpenses(data.data));
        },
        () => {}
      );
    };
    setList();
  }, [dispatch, handleApiCall]);

  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.container}>
        <LoadingSpinner />
        <StatusBanner />
        <NavigationContainer>
          <Stack.Navigator>
            {auth.user ? (
              <>
                <Stack.Screen
                  name="Home"
                  component={MyTabs}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ManageExpense"
                  component={ManageExpense}
                  options={{ title: "Manage Expense" }}
                />
              </>
            ) : (
              <Stack.Screen
                name="Auth"
                component={AuthScreen}
                options={{ headerShown: false }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}

export default function AppContainer() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#200364",
  },
});
