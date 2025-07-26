import { Ionicons } from "@expo/vector-icons";
import Foundation from "@expo/vector-icons/Foundation";
import { Tabs } from "expo-router";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FF6B6B",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          backgroundColor: "#1a1a1a",
          borderTopColor: "#374151",
        },
        headerStyle: {
          backgroundColor: "#1a1a1a",
        },
        headerTintColor: "#fff",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "VibeQuote",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Foundation name="quote" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
