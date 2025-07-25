import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface ChipProps {
  label: string;
  emoji?: string;
  selected?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  color?: string;
  style?: ViewStyle;
}

export function Chip({
  label,
  emoji,
  selected = false,
  onPress,
  disabled = false,
  color = '#FF6B6B',
  style,
}: ChipProps) {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        selected && [styles.selected, { backgroundColor: color }],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || !onPress}
      activeOpacity={0.7}
    >
      {emoji && <Text style={styles.emoji}>{emoji}</Text>}
      <Text style={[
        styles.label,
        selected && styles.selectedLabel,
        disabled && styles.disabledLabel,
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginRight: 8,
    marginBottom: 8,
  },
  selected: {
    borderColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  emoji: {
    fontSize: 16,
    marginRight: 6,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedLabel: {
    color: '#fff',
    fontWeight: '600',
  },
  disabledLabel: {
    color: '#9ca3af',
  },
});