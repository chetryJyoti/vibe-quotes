import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/ui/Button";
import { Colors } from "../constants/Colors";
import { useRevenueCat } from "../hooks/useRevenueCat";
import { StorageService } from "../services/StorageService";

interface SettingItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showChevron?: boolean;
}

function SettingItem({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
  showChevron = true,
}: SettingItemProps) {
  return (
    <View style={styles.settingItem}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon as any} size={24} color={Colors.primary} />
      </View>

      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>

      {rightElement ||
        (showChevron && onPress && (
          <Ionicons name="chevron-forward" size={20} color={Colors.gray[400]} />
        ))}
    </View>
  );
}

export default function SettingsScreen() {
  const { subscriptionState, restorePurchases } = useRevenueCat();
  const [isResetting, setIsResetting] = useState(false);

  const handleRestorePurchases = async () => {
    try {
      await restorePurchases();
      Alert.alert(
        "Restore Complete",
        subscriptionState.isPro
          ? "Your Pro subscription has been restored!"
          : "No active subscriptions found.",
        [{ text: "OK" }]
      );
    } catch (error) {
      Alert.alert("Restore Failed", "Please try again later.", [
        { text: "OK" },
      ]);
    }
  };

  const handleResetData = () => {
    Alert.alert(
      "Reset App Data",
      "This will clear all your preferences and quote history. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            setIsResetting(true);
            try {
              await StorageService.clearUserData();
              Alert.alert("Reset Complete", "App data has been cleared.", [
                { text: "OK" },
              ]);
            } catch (error) {
              Alert.alert("Reset Failed", "Please try again.", [
                { text: "OK" },
              ]);
            } finally {
              setIsResetting(false);
            }
          },
        },
      ]
    );
  };

  const handleContactSupport = () => {
    Linking.openURL("mailto:support@vibequote.app?subject=VibeQuote Support");
  };

  const handleRateApp = () => {
    // Replace with your app store URL
    const appStoreUrl =
      Platform.OS === "android"
        ? "https://play.google.com/store/apps/details?id=com.yourcompany.vibequote"
        : "https://apps.apple.com/app/idYOUR_APP_ID";

    Linking.openURL(appStoreUrl);
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL("https://your-website.com/privacy");
  };

  const handleTermsOfService = () => {
    Linking.openURL("https://your-website.com/terms");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Subscription Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subscription</Text>

          <View style={styles.subscriptionCard}>
            <View style={styles.subscriptionStatus}>
              <Ionicons
                name={
                  subscriptionState.isPro ? "checkmark-circle" : "close-circle"
                }
                size={24}
                color={
                  subscriptionState.isPro ? Colors.success : Colors.gray[400]
                }
              />
              <Text style={styles.subscriptionText}>
                {subscriptionState.isPro ? "Pro Subscriber" : "Free User"}
              </Text>
            </View>

            {subscriptionState.isPro ? (
              <Text style={styles.subscriptionSubtext}>
                Enjoy unlimited quotes and all Pro features!
              </Text>
            ) : (
              <Button
                title="Upgrade to Pro"
                onPress={() => {
                  /* Navigate to paywall */
                }}
                variant="primary"
                size="small"
                style={styles.upgradeButton}
              />
            )}
          </View>

          <SettingItem
            icon="refresh-circle-outline"
            title="Restore Purchases"
            subtitle="Restore your Pro subscription"
            onPress={handleRestorePurchases}
          />
        </View>

        {/* App Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App</Text>

          <SettingItem
            icon="star-outline"
            title="Rate VibeQuote"
            subtitle="Help us improve with your feedback"
            onPress={handleRateApp}
          />

          <SettingItem
            icon="mail-outline"
            title="Contact Support"
            subtitle="Get help or share feedback"
            onPress={handleContactSupport}
          />

          <SettingItem
            icon="trash-outline"
            title="Reset App Data"
            subtitle="Clear all preferences and history"
            onPress={handleResetData}
            rightElement={
              isResetting ? (
                <Text style={styles.loadingText}>Resetting...</Text>
              ) : undefined
            }
          />
        </View>

        {/* Legal Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>

          <SettingItem
            icon="document-text-outline"
            title="Privacy Policy"
            onPress={handlePrivacyPolicy}
          />

          <SettingItem
            icon="document-outline"
            title="Terms of Service"
            onPress={handleTermsOfService}
          />
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appName}>VibeQuote</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appDescription}>
            Beautiful quotes for every mood
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 16,
  },
  subscriptionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  subscriptionStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  subscriptionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 12,
  },
  subscriptionSubtext: {
    fontSize: 14,
    color: Colors.gray[400],
  },
  upgradeButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  settingSubtitle: {
    fontSize: 14,
    color: Colors.gray[400],
    marginTop: 2,
  },
  loadingText: {
    color: Colors.gray[400],
    fontSize: 14,
  },
  appInfo: {
    alignItems: "center",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    color: Colors.gray[400],
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 16,
    color: Colors.gray[300],
    textAlign: "center",
  },
});
