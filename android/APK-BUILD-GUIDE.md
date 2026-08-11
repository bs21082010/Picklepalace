# 📱 APK BUILD GUIDE — Make the Android app (.apk file)

This folder (`android/`) contains a **complete, ready-to-build Android app**:
- The whole website is inside the app (works fully **offline**)
- WhatsApp / phone / email buttons open the real apps
- App icon: our pickle jar logo

## How to build the .apk (choose one)

### Way 1: Android Studio (easiest, recommended) — free
1. Install **Android Studio** (free, from developer.android.com) — this includes everything needed
2. Open Android Studio → **File → Open** → choose this folder (`android/`)
3. Wait while it downloads the build tools (one time)
4. Menu **Build → Build Bundle(s)/APK(s) → Build APK(s)**
5. Your app is ready: `android/app/build/outputs/apk/debug/app-debug.apk`
6. Send that file to any Android phone (via WhatsApp/Bluetooth). On the phone, tap the file → **Install** (allow "install unknown apps" if asked)

### Way 2: On any online APK builder
Services like "Appetize", "CandyBar" or cloud CI (GitHub Actions) can build this project for free.
The repo already contains everything — just point the builder to the `android/` folder.

### Way 3: On this computer (command line)
Needs: Java 17 (already installed) + Android SDK + Gradle.
Run in this folder:
```
gradle assembleDebug
```
Output: `app/build/outputs/apk/debug/app-debug.apk`

## After building

- **Share the .apk file** with customers via WhatsApp — they install it in 30 seconds
- **Version 2**: when you change prices/products on the website, copy the changed files
  (`index.html`, `styles.css`, `script.js`, `languages.js`, `products.js`) into
  `android/app/src/main/assets/www/` and rebuild — new APK version in minutes.

## Note for Play Store (much later, optional)
To publish on the Google Play Store you'd need a developer account (₹/$25 one time)
and a signed release APK. Ask me when you're ready.
