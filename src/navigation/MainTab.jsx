import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Grid, PlusCircle, User } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Dashboard from "../pages/Dashboard";
import DeckList from "../pages/CreateDeck";
import Profile from "../pages/Profile";
const Tab = createBottomTabNavigator();

export default function MainTab() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: {
          backgroundColor: "#020617",
          borderTopColor: "#334155",
          paddingBottom: Math.max(5, insets.bottom),
          height: 60 + insets.bottom,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color, size }) => <Grid color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Novo"
        component={DeckList}
        options={{
          tabBarLabel: "Novo",
          tabBarIcon: ({ color, size }) => (
            <PlusCircle color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
