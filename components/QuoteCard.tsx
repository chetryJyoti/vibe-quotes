import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Quote } from "../types";

interface QuoteCardProps {
  quote: Quote;
  showWatermark?: boolean;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function QuoteCard({ quote, showWatermark = false }: QuoteCardProps) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: quote.backgroundImage }}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.7)"]}
          style={styles.overlay}
        />

        <View style={styles.content}>
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>{quote.text}</Text>
            <Text style={styles.author}>— {quote.author}</Text>
          </View>

          {showWatermark && (
            <View style={styles.watermark}>
              <Text style={styles.watermarkText}>VibeQuote</Text>
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 40,
    height: screenHeight * 0.6,
    borderRadius: 20,
    overflow: "hidden",
    marginHorizontal: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  imageStyle: {
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  quoteContainer: {
    alignItems: "center",
  },
  quoteText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    lineHeight: 32,
    marginBottom: 20,
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  author: {
    fontSize: 18,
    color: "#e5e7eb",
    fontStyle: "italic",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  watermark: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  watermarkText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
    opacity: 0.8,
  },
});
