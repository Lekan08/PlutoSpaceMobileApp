import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/header";
import Dashboard from "../screens/dashboard";
import Products from "../screens/products";
import Profile from "../screens/profile";
import History from "../screens/transactionHistory";
import Sales from "../screens/sales";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarActiveBackgroundColor: "#F96D02",
        // tabBarBackground: "#0F0F0F",
        tabBarInactiveTintColor: "#fff",
        tabBarStyle: { backgroundColor: "#0F0F0F" },
        tabBarLabelStyle: { fontSize: 11 },
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#F96D02", height: 80 },
      }}
    >
      <Tab.Screen
        name="Sales"
        component={Sales}
        options={{
          // title: "Sales",
          headerTitle: () => <Header title="Sales" navigation={navigation} />,
          tabBarLabel: "Sales",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="sale" color={color} size={size} />
          ),
          //   tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          title: "Dashboard",
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          // title: "Profile",
          headerTitle: () => <Header title="Profile" navigation={navigation} />,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          headerTitle: () => (
            <Header title="Transaction History" navigation={navigation} />
          ),
          // title: "History",
          tabBarLabel: "History",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
