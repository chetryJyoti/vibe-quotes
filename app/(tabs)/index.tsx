import { router } from "expo-router";
import React from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { QuoteActions } from "../../components/QuoteActions";
import { QuoteCard } from "../../components/QuoteCard";
import { VibeSelector } from "../../components/VibeSelector";
import { useQuotes } from "../../hooks/useQuotes";
import { useRevenueCat } from "../../hooks/useRevenueCat";
import { StorageService } from "../../services/StorageService";

export default function HomeScreen() {
  const { subscriptionState } = useRevenueCat();
  const { userState, isLoading, error, getNewQuote, changeVibe, clearError } =
    useQuotes(subscriptionState.isPro);

  const handleNewQuote = async () => {
    const success = await getNewQuote();
    if (!success && error) {
      Alert.alert("Error", error);
    }
  };

  const handleSaveWallpaper = () => {
    // TODO: Implement wallpaper saving
    Alert.alert("Coming Soon", "Wallpaper saving will be implemented next!");
  };

  const handleUpgrade = () => {
    router.push("/paywall");
  };

  const checkCanGetNewQuote = async () => {
    if (subscriptionState.isPro) return true;
    return await StorageService.canGetNewQuote(false);
  };

  if (isLoading || subscriptionState.isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading your vibes...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!userState?.currentQuote) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>No quotes available</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <VibeSelector
          selectedVibe={userState.selectedVibe}
          onVibeChange={changeVibe}
          isPro={subscriptionState.isPro}
          onUpgradePress={handleUpgrade}
        />

        <View style={styles.quoteSection}>
          <QuoteCard
            quote={userState.currentQuote}
            showWatermark={!subscriptionState.isPro}
          />
        </View>

        <QuoteActions
          onNewQuote={handleNewQuote}
          onSaveWallpaper={handleSaveWallpaper}
          onUpgrade={handleUpgrade}
          isPro={subscriptionState.isPro}
          canGetNewQuote={true} // Will be properly checked
          isLoading={isLoading}
        />

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  scrollContent: {
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#4ECDC4",
  },
  quoteSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  errorContainer: {
    marginHorizontal: 20,
    padding: 16,
    backgroundColor: "rgba(255, 71, 87, 0.1)",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#FF4757",
  },
  errorText: {
    color: "#FF4757",
    fontSize: 14,
    textAlign: "center",
  },
});
