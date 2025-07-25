import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { FREE_VIBES, VIBES } from "../constants/Vibes";
import { VibeCategory } from "../types";
import { Chip } from "./ui/Chip";

interface VibeSelectorProps {
  selectedVibe: VibeCategory;
  onVibeChange: (vibe: VibeCategory) => void;
  isPro: boolean;
  onUpgradePress: () => void;
}

export function VibeSelector({
  selectedVibe,
  onVibeChange,
  isPro,
  onUpgradePress,
}: VibeSelectorProps) {
  const availableVibes = isPro ? VIBES : FREE_VIBES;
  const lockedVibes = isPro ? [] : VIBES.filter((vibe) => vibe.isPro);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Vibe</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {availableVibes.map((vibe) => (
          <Chip
            key={vibe.id}
            label={vibe.name}
            emoji={vibe.emoji}
            selected={selectedVibe === vibe.id}
            onPress={() => onVibeChange(vibe.id)}
            color={vibe.color}
          />
        ))}

        {lockedVibes.map((vibe) => (
          <Chip
            key={vibe.id}
            label={`${vibe.name} 🔒`}
            emoji={vibe.emoji}
            disabled={true}
            onPress={onUpgradePress}
            style={styles.lockedChip}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  lockedChip: {
    borderStyle: "dashed",
    borderColor: "#9ca3af",
  },
});
