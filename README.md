# VibeQuote – Aesthetic Quote App

VibeQuote is a minimal Android-only mobile app built with React Native + Expo. It delivers aesthetically styled quotes based on a user’s selected “vibe” (e.g., motivational, emotional, feel-good), with a clean UI and gated Pro features powered by RevenueCat.

---

## Features (MVP Completed)

### Quote Viewer (Home Screen)
- Mood selection via vibe chips (e.g., Motivational, Emotional, Feel-Good)
- Displays quote and author over a styled background image
- One quote per day limit for free users
- Buttons:
  - Get New Quote (with daily limit for free users)
  - Save as Wallpaper (Pro only)
  - Upgrade to Pro (navigates to paywall)
- Watermark shown for free users

### Paywall Screen
- Lists Pro benefits:
  - Unlimited quotes per day
  - Access to all vibe categories
  - Save quotes as wallpapers
  - No watermark
- Includes:
  - Monthly and Yearly purchase buttons (via RevenueCat)
  - Restore Purchases button

### Entitlement Management
- Uses RevenueCat entitlement key: `pro`
- Checks Pro status on app load and stores in app state
- Gating logic for all premium features

---

## Platform
- Android only
- React Native with Expo
- RevenueCat (`react-native-purchases`) for subscription management

---

## Data
- Static `quotes.json` file organized by vibe category
- Background image URLs sourced per quote (Unsplash-style)
- Local-only storage for MVP (no user accounts or cloud)

---

## Gated Features (Pro Only)
- Access to all vibe categories (free users get 1–2)
- Unlimited “New Quote” actions
- Save quote as wallpaper
- Remove watermark

---

## MVP Scope
- No account system or login
- No cloud sync or history
- 2–4 vibe categories
- Subscriptions via RevenueCat only
- All data bundled locally

---

## Future Scope (Stretch Goals)
- Quote history viewer
- Custom quote creation and saving
- Daily quote notifications
- Themes, fonts, and personalization options
