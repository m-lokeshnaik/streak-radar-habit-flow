# Streak Radar - Android App

A powerful habit tracking Android app built with React and Capacitor.

## 🚀 Features

- ✅ **Habit Tracking**: Create and monitor daily habits with streak counters
- 📱 **Native Android App**: Full mobile experience with native performance
- 🔔 **Push Notifications**: Local notifications for habit reminders
- 🌙 **Dark/Light Theme**: Automatic theme switching support
- 📊 **Progress Insights**: Visual charts and statistics
- 🏆 **Achievements System**: Unlock badges for milestones
- 📅 **Schedule Management**: Time-based routine planning
- 🔄 **Offline Support**: Works without internet connection
- 🎨 **Modern UI**: Responsive design with smooth animations

## 📋 Prerequisites

Before building the Android app, ensure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Android Studio** (latest version)
- **Android SDK** (API level 21+)
- **Java JDK** (v11 or higher)

## 🛠️ Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone [your-repo-url]
cd streak-radar-habit-flow
npm install
```

### 2. Build the Web App

```bash
npm run build
```

### 3. Add Android Platform

```bash
npx cap add android
```

### 4. Sync Capacitor

```bash
npx cap sync android
```

### 5. Open in Android Studio

```bash
npx cap open android
```

## 📱 Building the APK

### Debug APK (for testing)

1. In Android Studio, select **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. The APK will be generated in: `android/app/build/outputs/apk/debug/`

### Release APK (for distribution)

1. Generate a signing key:
```bash
keytool -genkey -v -keystore streak-radar-release-key.keystore -alias streak-radar -keyalg RSA -keysize 2048 -validity 10000
```

2. Create `android/app/gradle.properties`:
```properties
MYAPP_RELEASE_STORE_FILE=streak-radar-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=streak-radar
MYAPP_RELEASE_STORE_PASSWORD=your_store_password
MYAPP_RELEASE_KEY_PASSWORD=your_key_password
```

3. Update `android/app/build.gradle` signing configs:
```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

4. Build release APK:
```bash
cd android
./gradlew assembleRelease
```

## 📱 Running on Device/Emulator

### Using Android Studio
1. Open the project: `npx cap open android`
2. Connect your device or start an emulator
3. Click the **Run** button

### Using Command Line
```bash
npx cap run android
```

## 🔧 Development Workflow

### Making Changes
1. Modify React code in `src/`
2. Build: `npm run build`
3. Sync: `npx cap sync android`
4. Run: `npx cap run android`

### Adding Capacitor Plugins
```bash
npm install @capacitor/[plugin-name]
npx cap sync android
```

## 📦 App Store Preparation

### Google Play Store Requirements

1. **App Icons**: Located in `android/app/src/main/res/mipmap-*/`
2. **Splash Screen**: Configured in `capacitor.config.ts`
3. **Permissions**: Auto-generated based on plugins used
4. **Signing**: Use release signing configuration
5. **App Bundle**: For Play Store submission:
```bash
cd android
./gradlew bundleRelease
```

### Key Files for Store Submission

- **App Bundle**: `android/app/build/outputs/bundle/release/app-release.aab`
- **APK**: `android/app/build/outputs/apk/release/app-release.apk`
- **Manifest**: `android/app/src/main/AndroidManifest.xml`

## 🎨 Customization

### App Icon
Replace files in `android/app/src/main/res/mipmap-*/ic_launcher.png`

### Splash Screen
Modify `capacitor.config.ts`:
```typescript
SplashScreen: {
  launchShowDuration: 3000,
  backgroundColor: "#7C3AED",
  // ... other options
}
```

### App Name
Update `android/app/src/main/res/values/strings.xml`:
```xml
<string name="app_name">Your App Name</string>
```

## 🔍 Troubleshooting

### Common Issues

1. **Build Errors**: Clear cache with `npx cap sync android --clean`
2. **Plugin Issues**: Check plugin compatibility with Capacitor version
3. **Android SDK**: Ensure proper SDK and build tools are installed
4. **Permissions**: Check `AndroidManifest.xml` for required permissions

### Logs and Debugging

- **Android Logs**: `adb logcat`
- **Chrome DevTools**: Available for web views in debug builds
- **Console Logs**: Check browser developer tools when running `npx cap serve`

## 📞 Support

For issues and support:
- Check [Capacitor Documentation](https://capacitorjs.com/docs)
- Review [Android Developer Guide](https://developer.android.com/)
- Open issues in the project repository

## 📄 License

This project is licensed under the MIT License.
