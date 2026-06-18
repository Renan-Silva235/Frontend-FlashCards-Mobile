import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

export default function Navigation() {
  const signed = useSelector((state) => state.auth.signed);

  return (
    <NavigationContainer>
      {signed ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
