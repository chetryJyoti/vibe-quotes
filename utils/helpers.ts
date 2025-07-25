import { Platform } from 'react-native';

export const formatError = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  return 'An unexpected error occurred';
};

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

export const hapticFeedback = () => {
  // Add haptic feedback for better UX
  if (Platform.OS === 'ios') {
    // You can add expo-haptics for better feedback
    console.log('Haptic feedback');
  }
};

export const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};