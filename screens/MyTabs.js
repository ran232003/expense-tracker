import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons"; // Import vector icons
import RecentExpenses from "./RecentExpenses";
import Expenses from "./Expenses";

const Tab = createBottomTabNavigator();

function MyTabs({ navigation }) {
  const handle = () => {
    console.log("handle");
  };
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <Icon name="time-outline" size={size} color={color} />
          ),
          headerRight: () => (
            <Icon
              name="add"
              size={30}
              color="white"
              style={{ marginRight: 15 }}
              onPress={() =>
                navigation.navigate("ManageExpense", { title: "add" })
              }
            />
          ),
          headerStyle: {
            backgroundColor: "#3e04c3",
          },
          headerTintColor: "#fff",
        })}
      />
      <Tab.Screen
        name="AllExpenses"
        component={Expenses}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="list-outline"
              size={size}
              color={color}
              onPress={handle}
            />
          ),
          headerRight: () => (
            <Icon
              name="add"
              size={30}
              color="white"
              style={{ marginRight: 15 }}
              onPress={() =>
                navigation.navigate("ManageExpense", { title: "add" })
              }
            />
          ),
          headerStyle: {
            backgroundColor: "#3e04c3",
          },
          headerTintColor: "#fff",
        })}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
