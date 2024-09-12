import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { Provider, useDispatch } from "react-redux";
import store from "./store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Expenses from "./screens/Expenses";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddExpense from "./screens/AddExpense";
import Icon from "react-native-vector-icons/Ionicons"; // Import vector icons
import RecentExpenses from "./screens/RecentExpenses";
import { useEffect } from "react";
import { expenseActions } from "./store/expenseSlice";
import { DUMMY_EXPENSES } from "./dummy";
import ManageExpense from "./screens/ManageExpense";

function App({ navigation }) {
  console.log(navigation, "here");

  const Tab = createBottomTabNavigator();
  const dispatch = useDispatch();
  const setList = () => {
    dispatch(expenseActions.setExpenses(DUMMY_EXPENSES));
  };
  useEffect(() => {
    setList();
  }, []);
  function MyTabs() {
    console.log(navigation, "here");

    const handlePress = (navigation) => {
      console.log(navigation, "here");
      navigation.navigate("ManageExpense", { title: "add" });
    };
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Recent Expenses"
          options={({ navigation }) => ({
            tabBarIcon: ({ color, size }) => (
              <Icon name="time-outline" size={size} color={color} />
            ),
            headerRight: () => (
              <Icon
                name="add" // Use an "add" icon
                size={30}
                color="white"
                style={{ marginRight: 15 }} // Styling for the icon
                onPress={() => handlePress(navigation)} // Passing navigation to handlePress
              />
            ),
            headerStyle: {
              backgroundColor: "#3e04c3", // Set the header background color 9966ff
            },
            headerTintColor: "#fff",
          })} // Hide header for Expenses tab
          component={RecentExpenses}
        />
        <Tab.Screen
          name="All Expenses"
          options={({ navigation }) => ({
            tabBarIcon: ({ color, size }) => (
              <Icon name="list-outline" size={size} color={color} />
            ),
            headerRight: () => (
              <Icon
                name="add" // Use an "add" icon
                size={30}
                color="white"
                style={{ marginRight: 15 }} // Styling for the icon
                onPress={() => handlePress(navigation)} // Passing navigation to handlePress
              />
            ),
            headerStyle: {
              backgroundColor: "#3e04c3", // Set the header background color 9966ff
            },
            headerTintColor: "#fff",
          })} // Hide header for Expenses tab
          component={Expenses}
        />
      </Tab.Navigator>
    );
  }

  const Stack = createNativeStackNavigator();
  return (
    <View style={styles.container}>
      <SafeAreaProvider style={styles.container}>
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              {/* <Stack.Screen name="Home" component={Categories} /> */}
              {/* nested nav */}
              <Stack.Screen
                name="Home"
                component={MyTabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Add Expense" component={AddExpense} />
              <Stack.Screen name="ManageExpense" component={ManageExpense} />
              {/* <Stack.Screen
                name="MealDetails"
                component={MealDetails}
                options={{
                  headerRight: () => {
                    return <Text>test</Text>;
                  },
                }}
              /> */}
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </SafeAreaProvider>
    </View>
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
