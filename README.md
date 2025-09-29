# ReaderApp 📱

A simple and elegant mobile app for reading manga and manhwa from various legal platforms. Built with React Native and Expo for cross-platform compatibility.

## ✨ Features

- **Multi-platform support**: Browse multiple manga/manhwa reading sites
- **Immersive reading experience**: Auto-hiding navigation for distraction-free reading
- **Intuitive navigation**: Smooth back/forward controls and gestures
- **Mobile optimized**: Pinch to zoom, responsive design
- **Cross-platform**: Works on both Android and iOS

## 📱 Screenshots

### Home Screen
- Clean grid layout of available reading sites
- Easy-to-access platform selection
- Modern card-based design

### Reading Interface
- Full-screen webview for optimal reading
- Auto-hiding navigation controls
- Floating back/forward buttons
- Loading indicators for smooth experience

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- **Expo CLI** (will be installed automatically)
- **Expo Go app** on your mobile device:
  - [Android - Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

### Installation

1. **Clone or download the project**
   ```bash
   # If using git
   git clone <repository-url>
   cd ReaderApp
   
   # Or create from scratch
   npx create-expo-app ReaderApp --template blank
   cd ReaderApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   
   # Install required Expo packages
   npx expo install react-native-webview react-native-safe-area-context @react-native-async-storage/async-storage
   ```

3. **Set up project structure**
   ```
   ReaderApp/
   ├── App.js
   ├── components/
   │   ├── SiteSelector.js
   │   └── WebViewReader.js
   └── data/
       └── sites.js
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```

5. **Run on your device**
   - Open **Expo Go** app on your mobile device
   - Scan the QR code displayed in your terminal
   - The app will load automatically

## 📖 How to Use

1. **Launch the app** - You'll see the home screen with available reading platforms
2. **Select a site** - Tap on any card to open that platform's website
3. **Read comfortably** - The interface will auto-hide for immersive reading
4. **Navigate** - Tap the screen to show controls, use back/forward buttons
5. **Return home** - Use the home button (🏠) to go back to site selection

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npx expo start

# Start with specific platform
npx expo start --android
npx expo start --ios
npx expo start --web

# Build for production
npx expo build:android
npx expo build:ios
```

### Project Structure

```
├── App.js                 # Main app component and navigation logic
├── components/
│   ├── SiteSelector.js    # Home screen with site grid
│   └── WebViewReader.js   # Reading interface with webview
├── data/
│   └── sites.js          # Configuration of reading platforms
└── package.json          # Dependencies and scripts
```

### Adding New Sites

Edit `data/sites.js` to add more reading platforms:

```javascript
export const MANGA_SITES = [
  // ... existing sites
  {
    id: 'new_site',
    name: 'New Reading Site',
    description: 'Description of the site',
    url: 'https://example.com',
  },
];
```

## 📦 Building for Production

### Android APK
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure build
eas build:configure

# Build APK
eas build --platform android --profile preview
```

### iOS IPA
```bash
# Build for iOS (requires Apple Developer account)
eas build --platform ios --profile preview
```

The build process will generate installable files that work independently of Expo Go.

## 🎨 Customization

### Themes and Colors
Modify the `StyleSheet` objects in each component to customize:
- Colors and themes
- Typography and fonts
- Layout and spacing
- Animation timings

### Site Configuration
- Add/remove reading platforms in `data/sites.js`
- Customize site descriptions and URLs
- Add logos or icons for each platform

### Features to Add
- **Favorites system**: Save preferred manga/chapters
- **Reading history**: Track reading progress
- **Dark mode**: Night-friendly reading
- **Offline reading**: Download chapters for offline access
- **Notifications**: Alerts for new chapter releases

## 🔧 Troubleshooting

### Common Issues

**App won't load on device:**
- Ensure your phone and computer are on the same WiFi network
- Try restarting the Expo development server
- Check that Expo Go is updated to the latest version

**WebView not displaying content:**
- Some sites may block webview access
- Check your internet connection
- Try accessing the site in a regular browser first

**Build errors:**
- Run `npx expo doctor` to check for common issues
- Clear Expo cache: `npx expo start --clear`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Getting Help

- **Expo Documentation**: https://docs.expo.dev/
- **React Native WebView**: https://github.com/react-native-webview/react-native-webview
- **Community Support**: https://forums.expo.dev/

## 📄 License

This project is for educational purposes. Ensure you comply with the terms of service of any reading platforms you access through this app.

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve the app!

---

**Happy Reading!** 📚✨