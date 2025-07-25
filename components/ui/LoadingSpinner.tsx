import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "large";
  color?: string;
}

export function LoadingSpinner({
  message = "Loading...",
  size = "large",
  color = Colors.primary,
}: LoadingSpinnerProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 12,
  },
  message: {
    color: Colors.gray[400],
    fontSize: 16,
    textAlign: "center",
  },
});
