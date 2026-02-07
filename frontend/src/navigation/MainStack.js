import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#1a1a2e" },
        headerTintColor: "#eee",
        headerTitleStyle: { fontWeight: "600" },
        contentStyle: { backgroundColor: "#16213e" },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
    </Stack.Navigator>
  );
}
