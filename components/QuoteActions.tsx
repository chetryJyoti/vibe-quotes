import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from './ui/Button';
import { Colors } from '../constants/Colors';

interface QuoteActionsProps {
  onNewQuote: () => void;
  onSaveWallpaper: () => void;
  onUpgrade: () => void;
  isPro: boolean;
  canGetNewQuote: boolean;
  isLoading?: boolean;
}

export function QuoteActions({
  onNewQuote,
  onSaveWallpaper,
  onUpgrade,
  isPro,
  canGetNewQuote,
  isLoading = false,
}: QuoteActionsProps) {
  
  const handleNewQuote = () => {
    if (!canGetNewQuote && !isPro) {
      Alert.alert(
        'Daily Limit Reached',
        'You\'ve reached your daily quote limit. Upgrade to Pro for unlimited quotes!',
        [
          { text: 'Maybe Later', style: 'cancel' },
          { text: 'Upgrade to Pro', onPress: onUpgrade },
        ]
      );
      return;
    }
    onNewQuote();
  };

  const handleSaveWallpaper = () => {
    if (!isPro) {
      Alert.alert(
        'Pro Feature',
        'Save as wallpaper is a Pro feature. Upgrade to unlock this and more!',
        [
          { text: 'Maybe Later', style: 'cancel' },
          { text: 'Upgrade to Pro', onPress: onUpgrade },
        ]
      );
      return;
    }
    onSaveWallpaper();
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainActions}>
        <Button
          title={isLoading ? "Loading..." : "New Quote"}
          onPress={handleNewQuote}
          variant="primary"
          size="large"
          disabled={isLoading || (!canGetNewQuote && !isPro)}
          style={[styles.newQuoteButton, (!canGetNewQuote && !isPro) && styles.disabledButton]}
        />
        
        <Button
          title={isPro ? "Save Wallpaper" : "Save Wallpaper 🔒"}
          onPress={handleSaveWallpaper}
          variant={isPro ? "secondary" : "outline"}
          size="large"
          style={styles.wallpaperButton}
        />
      </View>
      
      {!isPro && (
        <Button
          title="✨ Upgrade to Pro"
          onPress={onUpgrade}
          variant="outline"
          size="medium"
          style={styles.upgradeButton}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
  },
  mainActions: {
    flexDirection: 'row',
    gap: 12,
  },
  newQuoteButton: {
    flex: 1,
  },
  wallpaperButton: {
    flex: 1,
  },
  upgradeButton: {
    alignSelf: 'center',
    paddingHorizontal: 32,
  },
  disabledButton: {
    backgroundColor: Colors.gray[600],
  },
});