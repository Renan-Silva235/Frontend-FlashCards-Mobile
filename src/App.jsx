import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { Provider } from "react-redux";
import store from "./store";
import Navigation from "./navigation";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
        <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
        <Navigation />
      </SafeAreaView>
    </Provider>
  );
}
