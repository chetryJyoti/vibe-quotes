import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RevenueCatProvider } from "../hooks/useRevenueCat";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen after app loads
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <RevenueCatProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="paywall"
            options={{
              presentation: "modal",
              title: "Upgrade to Pro",
              headerStyle: { backgroundColor: "#1a1a1a" },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="settings"
            options={{
              title: "Settings",
              headerStyle: { backgroundColor: "#1a1a1a" },
              headerTintColor: "#fff",
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </RevenueCatProvider>
    </SafeAreaProvider>
  );
}
