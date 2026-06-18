import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MainTab from "./MainTab";
import FlashCards from "../pages/FlashCards";
import CreateCard from "../pages/CreateCard";
import EditCard from "../pages/EditCard";
const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="MainTab"
        component={MainTab}
      />

      <Stack.Screen
        name="FlashCards"
        component={FlashCards}
      />

      <Stack.Screen
        name="CreateCard"
        component={CreateCard}
      />

      <Stack.Screen
        name="EditCard"
        component={EditCard}
      />
    </Stack.Navigator>
  );
}