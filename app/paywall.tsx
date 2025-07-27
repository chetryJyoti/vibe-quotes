import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/ui/Button";
import { Colors } from "../constants/Colors";
import { useRevenueCat } from "../hooks/useRevenueCat";

const PRO_FEATURES = [
  {
    icon: "infinite-outline",
    title: "Unlimited Quotes",
    description: "Get as many quotes as you want, whenever you want",
  },
  {
    icon: "color-palette-outline",
    title: "All Vibe Categories",
    description: "Access Emotional, Calm, and all future vibe categories",
  },
  {
    icon: "image-outline",
    title: "Save as Wallpaper",
    description: "Turn your favorite quotes into beautiful wallpapers",
  },
  {
    icon: "eye-off-outline",
    title: "No Watermark",
    description: "Clean, professional-looking quotes without branding",
  },
];

export default function PaywallScreen() {
  const { subscriptionState, offerings, purchasePackage, restorePurchases } =
    useRevenueCat();
  const [isProcessing, setIsProcessing] = useState(false);

  // Get the monthly package from offerings
  const monthlyPackage =
    offerings?.monthly || offerings?.availablePackages?.[0];

  const handlePurchase = async () => {
    if (!monthlyPackage) {
      Alert.alert(
        "Error",
        "No subscription plans available. Please try again later."
      );
      return;
    }
    

    try {
      setIsProcessing(true);
      await purchasePackage(monthlyPackage);

      // Success! Close paywall
      Alert.alert(
        "Welcome to Pro! 🎉",
        "You now have access to all Pro features. Enjoy unlimited quotes!",
        [{ text: "Awesome!", onPress: () => router.back() }]
      );
    } catch (error: any) {
      console.error("Purchase error:", error);
      Alert.alert(
        "Purchase Failed",
        error.message || "Something went wrong. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRestore = async () => {
    try {
      setIsProcessing(true);
      await restorePurchases();

      if (subscriptionState.isPro) {
        Alert.alert(
          "Purchases Restored! ✅",
          "Your Pro subscription has been restored.",
          [{ text: "Great!", onPress: () => router.back() }]
        );
      } else {
        Alert.alert(
          "No Purchases Found",
          "We couldn't find any previous purchases to restore.",
          [{ text: "OK" }]
        );
      }
    } catch (error: any) {
      console.error("Restore error:", error);
      Alert.alert(
        "Restore Failed",
        error.message || "Failed to restore purchases. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (!offerings || !monthlyPackage) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>
            Loading subscription options...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Upgrade to Pro</Text>
          <Text style={styles.subtitle}>
            Unlock the full VibeQuote experience
          </Text>
        </View>
        <View style={styles.pricingContainer}>
          <View style={styles.singlePricingCard}>
            <View style={styles.popularBadge}>
              <Text style={styles.popularText}>MONTHLY PLAN</Text>
            </View>

            <View style={styles.pricingHeader}>
              <Text style={styles.planName}>Pro Monthly</Text>
              <Text style={styles.planPrice}>
                {monthlyPackage.product.priceString}
              </Text>
              <Text style={styles.planPeriod}>per month</Text>
            </View>

            <View style={styles.planFeatures}>
              <View style={styles.planFeature}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.success}
                />
                <Text style={styles.planFeatureText}>
                  Unlimited quotes daily
                </Text>
              </View>
              <View style={styles.planFeature}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.success}
                />
                <Text style={styles.planFeatureText}>All vibe categories</Text>
              </View>
              <View style={styles.planFeature}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.success}
                />
                <Text style={styles.planFeatureText}>Save as wallpaper</Text>
              </View>
              <View style={styles.planFeature}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.success}
                />
                <Text style={styles.planFeatureText}>No watermark</Text>
              </View>
            </View>

            <Text style={styles.priceBreakdown}>
              That's just {monthlyPackage.product.pricePerWeekString} per week!
            </Text>
          </View>
        </View>

        {/* Purchase Button */}
        <View style={styles.purchaseContainer}>
          <Button
            title={
              isProcessing
                ? "Processing..."
                : `Start Pro - ${monthlyPackage.product.priceString}/month`
            }
            onPress={handlePurchase}
            variant="primary"
            size="large"
            disabled={isProcessing}
            style={styles.purchaseButton}
          />

          <Button
            title="Restore Purchases"
            onPress={handleRestore}
            variant="ghost"
            size="medium"
            disabled={isProcessing}
            style={styles.restoreButton}
          />
        </View>

        {/* Terms */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By purchasing, you agree to our Terms of Service and Privacy Policy.
            Subscription automatically renews unless cancelled 24 hours before
            renewal. Cancel anytime in your device settings.
          </Text>
        </View>
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
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    color: "#9ca3af",
    fontSize: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#9ca3af",
    textAlign: "center",
  },
  featuresContainer: {
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: "#9ca3af",
    lineHeight: 20,
  },
  pricingContainer: {
    marginBottom: 32,
  },
  pricingTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  singlePricingCard: {
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: Colors.primary,
    position: "relative",
  },
  popularBadge: {
    position: "absolute",
    top: -12,
    alignSelf: "center",
    backgroundColor: Colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  popularText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  pricingHeader: {
    alignItems: "center",
    marginBottom: 24,
    marginTop: 8,
  },
  planName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 4,
  },
  planPeriod: {
    fontSize: 16,
    color: "#9ca3af",
  },
  planFeatures: {
    marginBottom: 16,
  },
  planFeature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  planFeatureText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 12,
  },
  priceBreakdown: {
    fontSize: 14,
    color: Colors.secondary,
    textAlign: "center",
    fontWeight: "500",
  },
  purchaseContainer: {
    marginBottom: 24,
    gap: 12,
  },
  purchaseButton: {
    backgroundColor: Colors.primary,
    minHeight: 56,
  },
  restoreButton: {
    alignSelf: "center",
  },
  termsContainer: {
    alignItems: "center",
  },
  termsText: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 18,
  },
});
