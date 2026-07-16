import React from "react";
import { Provider } from "react-redux";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Navigation from "./navigation";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }} edges={['top', 'left', 'right']}>
          <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
          <Navigation />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}
