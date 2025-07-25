import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRevenueCat } from "../../hooks/useRevenueCat";

export default function HomeScreen() {
  const { subscriptionState } = useRevenueCat();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>VibeQuote</Text>
        <Text style={styles.subtitle}>
          {subscriptionState.isPro ? "✨ Pro User" : "🎯 Free User"}
        </Text>

        {subscriptionState.isLoading ? (
          <Text style={styles.loading}>Loading...</Text>
        ) : (
          <Text style={styles.status}>
            App is ready! Time to build the quote viewer.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF6B6B",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#4ECDC4",
    marginBottom: 20,
  },
  loading: {
    fontSize: 16,
    color: "#9ca3af",
  },
  status: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});
