import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { Button } from "./Button";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryText?: string;
}

export function ErrorMessage({
  title = "Oops!",
  message,
  onRetry,
  retryText = "Try Again",
}: ErrorMessageProps) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Ionicons name="alert-circle-outline" size={48} color={Colors.error} />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>

      {onRetry && (
        <Button
          title={retryText}
          onPress={onRetry}
          variant="outline"
          size="medium"
          style={styles.retryButton}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 32,
    gap: 16,
  },
  icon: {
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: Colors.gray[400],
    textAlign: "center",
    lineHeight: 22,
  },
  retryButton: {
    marginTop: 8,
  },
});
