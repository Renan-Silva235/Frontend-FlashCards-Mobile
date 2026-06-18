import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Grid, PlusCircle, BookOpen } from "lucide-react-native";

import Dashboard from "../pages/Dashboard";
import DeckList from "../pages/CreateDeck";
import FlashCardStudy from "../pages/FlashCardStudy";

const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: {
          backgroundColor: "#020617",
          borderTopColor: "#334155",
          paddingBottom: 5,
          height: 60,
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
        name="Estudar"
        component={FlashCardStudy}
        options={{
          tabBarLabel: "Estudar",
          tabBarIcon: ({ color, size }) => (
            <BookOpen color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}