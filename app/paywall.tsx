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
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  React.useEffect(() => {
    if (offerings?.availablePackages?.length > 0) {
      // Default to annual package if available, otherwise first package
      const annualPackage = offerings.availablePackages.find(
        (pkg) =>
          pkg.identifier.toLowerCase().includes("annual") ||
          pkg.identifier.toLowerCase().includes("yearly")
      );
      setSelectedPackage(annualPackage || offerings.availablePackages[0]);
    }
  }, [offerings]);

  const handlePurchase = async () => {
    if (!selectedPackage) return;

    try {
      setIsProcessing(true);
      await purchasePackage(selectedPackage);

      // Success! Close paywall
      Alert.alert(
        "Welcome to Pro! 🎉",
        "You now have access to all Pro features. Enjoy unlimited quotes!",
        [{ text: "Awesome!", onPress: () => router.back() }]
      );
    } catch (error: any) {
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
      Alert.alert(
        "Restore Failed",
        error.message || "Failed to restore purchases. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (!offerings) {
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

        {/* Features List */}
        <View style={styles.featuresContainer}>
          {PRO_FEATURES.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons
                  name={feature.icon as any}
                  size={24}
                  color={Colors.primary}
                />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Pricing Options */}
        <View style={styles.pricingContainer}>
          <Text style={styles.pricingTitle}>Choose Your Plan</Text>

          {offerings.availablePackages.map((pkg) => {
            const isSelected = selectedPackage?.identifier === pkg.identifier;
            const isAnnual =
              pkg.identifier.toLowerCase().includes("annual") ||
              pkg.identifier.toLowerCase().includes("yearly");

            return (
              <View
                key={pkg.identifier}
                style={[
                  styles.pricingOption,
                  isSelected && styles.selectedPricingOption,
                  isAnnual && styles.popularOption,
                ]}
              >
                {isAnnual && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>MOST POPULAR</Text>
                  </View>
                )}

                <View style={styles.pricingContent}>
                  <Text style={styles.pricingPeriod}>
                    {isAnnual ? "Annual" : "Monthly"}
                  </Text>
                  <Text style={styles.pricingPrice}>
                    {pkg.product.priceString}
                  </Text>
                  {isAnnual && (
                    <Text style={styles.pricingSubtext}>
                      Save 60% vs monthly
                    </Text>
                  )}
                </View>

                <Button
                  title={isSelected ? "Selected" : "Select"}
                  onPress={() => setSelectedPackage(pkg)}
                  variant={isSelected ? "primary" : "outline"}
                  size="small"
                />
              </View>
            );
          })}
        </View>

        {/* Purchase Button */}
        <View style={styles.purchaseContainer}>
          <Button
            title={
              isProcessing
                ? "Processing..."
                : `Start Pro - ${selectedPackage?.product.priceString || ""}`
            }
            onPress={handlePurchase}
            variant="primary"
            size="large"
            disabled={!selectedPackage || isProcessing}
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
            renewal.
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
  pricingOption: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
    position: "relative",
  },
  selectedPricingOption: {
    borderColor: Colors.primary,
    backgroundColor: "rgba(255, 107, 107, 0.1)",
  },
  popularOption: {
    borderColor: Colors.secondary,
  },
  popularBadge: {
    position: "absolute",
    top: -8,
    alignSelf: "center",
    backgroundColor: Colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  pricingContent: {
    flex: 1,
    marginRight: 16,
  },
  pricingPeriod: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  pricingPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginVertical: 4,
  },
  pricingSubtext: {
    fontSize: 12,
    color: Colors.secondary,
    fontWeight: "500",
  },
  purchaseContainer: {
    marginBottom: 24,
    gap: 12,
  },
  purchaseButton: {
    backgroundColor: Colors.primary,
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
    lineHeight: 16,
  },
});
