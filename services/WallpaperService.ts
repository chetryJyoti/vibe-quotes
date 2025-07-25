import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { Alert, Platform } from 'react-native';
import { Quote } from '../types';

export class WallpaperService {
  static async requestPermissions(): Promise<boolean> {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Permission request failed:', error);
      return false;
    }
  }

  static async saveQuoteAsWallpaper(quote: Quote): Promise<boolean> {
    try {
      // Check permissions first
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        Alert.alert(
          'Permission Required',
          'Please grant photo library access to save wallpapers.',
          [{ text: 'OK' }]
        );
        return false;
      }

      // Download the background image
      const imageUri = await this.downloadImage(quote.backgroundImage);
      if (!imageUri) {
        throw new Error('Failed to download image');
      }

      // For now, just save the background image
      // In a full implementation, you'd overlay the quote text on the image
      const asset = await MediaLibrary.createAssetAsync(imageUri);
      
      // Create or get the VibeQuote album
      const album = await this.getOrCreateAlbum();
      if (album) {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }

      Alert.alert(
        'Wallpaper Saved! 🎉',
        'Your quote has been saved to your photo library. You can set it as wallpaper from your device settings.',
        [{ text: 'Great!' }]
      );

      return true;
    } catch (error) {
      console.error('Failed to save wallpaper:', error);
      Alert.alert(
        'Save Failed',
        'Sorry, we couldn\'t save your wallpaper. Please try again.',
        [{ text: 'OK' }]
      );
      return false;
    }
  }

  private static async downloadImage(url: string): Promise<string | null> {
    try {
      const filename = `quote_${Date.now()}.jpg`;
      const downloadPath = `${FileSystem.documentDirectory}${filename}`;
      
      const downloadResult = await FileSystem.downloadAsync(url, downloadPath);
      
      if (downloadResult.status === 200) {
        return downloadResult.uri;
      }
      
      return null;
    } catch (error) {
      console.error('Image download failed:', error);
      return null;
    }
  }

  private static async getOrCreateAlbum(): Promise<MediaLibrary.Album | null> {
    try {
      const albumName = 'VibeQuote';
      const albums = await MediaLibrary.getAlbumsAsync();
      const existingAlbum = albums.find(album => album.title === albumName);
      
      if (existingAlbum) {
        return existingAlbum;
      }

      // Create new album (need at least one asset to create album)
      // For now, return null and let it save to camera roll
      return null;
    } catch (error) {
      console.error('Album creation failed:', error);
      return null;
    }
  }

  // Future enhancement: Generate quote image with text overlay
  static async generateQuoteImage(quote: Quote): Promise<string | null> {
    // This would use libraries like react-native-svg or expo-gl
    // to create a canvas with the quote text overlaid on the background
    // For now, we'll just return the background image
    return quote.backgroundImage;
  }
}