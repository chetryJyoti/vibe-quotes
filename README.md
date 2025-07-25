# 📄 Requirements Document – VibeQuote

## 🎯 Purpose

VibeQuote is a minimal Android-only mobile app that delivers aesthetically styled quotes based on the user’s selected “vibe” or mood category (e.g., motivational, emotional, feel-good). It will use **RevenueCat** to manage a Pro subscription for unlocking extra features and categories.

---

## 🖥️ Platform

* **Android only**
* **React Native + Expo** with `react-native-purchases` for RevenueCat integration

---

## 🧑‍💻 Users

* Free users: Limited access to vibes and features
* Pro users (via RevenueCat): Full access to all vibe categories and Pro features

---

## 🧱 Core Features

### 1. **Quote Viewer (Home Screen)**

* Select a **vibe** from dropdown / chip list:

  * e.g., *Motivational, Emotional, Calm, Feel-Good*
* Display:

  * A quote styled over an aesthetic background
  * Quote author
* Actions:

  * "Get New Quote" (1 per day for free users)
  * "Save as Wallpaper" (Pro only)
  * "Upgrade to Pro" button (if not subscribed)
  * “Remove Watermark” (Pro only)

---

### 2. **Paywall Screen**

* Shows Pro features:

  * Unlimited quotes per day
  * Unlock all vibe categories
  * Save quotes as wallpaper
  * No watermark
* Purchase options (RevenueCat):

  * Monthly
  * Yearly
* “Restore Purchases” option

---

### 3. **Entitlement Management**

* Uses RevenueCat entitlements:

  * `pro` – Unlocks all categories and features
* On app load, check entitlement and store in global state

---

## 📦 Data

* Local `quotes.json` file (organized by category/vibe)
* Background image URL per quote or category
* Optional: Quote history (locally stored if needed later)

---

## 🔐 Gated Features (Pro Only)

* Access to *all* vibe categories (free = 1–2 categories)
* Unlimited “New Quote” requests
* Save quote as wallpaper
* Remove watermark

---

## 🧪 MVP Scope (Only)

* No account system or login
* No cloud sync or history
* Quotes stored locally
* 2-4 vibe categories
* Subscription via RevenueCat only

---

## 🧩 Stretch Features (Future)

* Quote history viewer
* Custom quote creation
* Notifications for daily quote
* More themes or fonts
