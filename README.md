# ReaderApp 📱

A modern mobile app for reading manga and manhwa from various platforms. Built with React Native and Expo for seamless cross-platform compatibility.

## ✨ Features

- **Multi-platform support**: Browse multiple manga/manhwa reading sites in one place
- **Immersive reading experience**: Auto-hiding navigation for distraction-free reading
- **Continue reading**: Pick up exactly where you left off with automatic progress saving
- **Favorites system**: Save your favorite manga/chapters with one tap
- **Reading history**: Automatic tracking of all pages you've visited (last 50 entries)
- **Quick access**: Widget for instant access to your last read and recent favorites
- **Intuitive navigation**: Smooth back/forward controls and gestures
- **Mobile optimized**: Pinch to zoom, responsive design, optimized performance
- **Cross-platform**: Works on both Android and iOS

## 📱 Screenshots

### Home Screen
- Clean grid layout of available reading platforms
- "Continue Reading" widget for quick resume
- Recent favorites quick access
- Color-coded site cards with icons

### Library Screen
- Favorites tab: All your saved pages
- History tab: Recent reading activity
- Easy removal from favorites
- One-tap return to any saved page

### Reading Interface
- Full-screen webview for optimal reading
- Auto-hiding navigation controls (tap to show)
- Floating back/forward buttons
- Bookmark button to save favorites
- Loading indicators for smooth experience

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Expo Go app** on your mobile device:
  - [Android - Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

### Installation

1. **Clone or download the project**
   ```bash
   # If using git
   git clone <repository-url>
   cd ReaderApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

   The project uses these key dependencies:
   - `react-native-webview` - For displaying web content
   - `@react-native-async-storage/async-storage` - For local data storage
   - `expo` - Development framework

3. **Project structure**
   ```
   ReaderApp/
   ├── App.js                      # Main app with screen navigation
   ├── components/
   │   ├── SiteSelector.js         # Home screen with platform grid
   │   ├── WebViewReader.js        # Reading interface with webview
   │   ├── QuickActions.js         # Continue reading widget
   │   └── FavoritesScreen.js      # Library with favorites & history
   ├── data/
   │   └── sites.js                # Platform configurations
   └── utils/
       ├── storage.js              # AsyncStorage helpers
       └── tools.js                # Utility functions
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
2. **Quick actions** - If you've read before, use "Continue Reading" to resume immediately
3. **Select a site** - Tap any platform card to start browsing
4. **Navigate** - Use back/forward buttons, or swipe on iOS
5. **Save favorites** - Tap the ⭐ button while reading to bookmark
6. **View library** - Tap "View All" in favorites to see your full library
7. **Reading history** - Switch to History tab to see recent pages
8. **Return home** - Use the 🏠 button anytime

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npx expo start

# Start with specific platform
npx expo start --android
npx expo start --ios
npx expo start --web

# Clear cache and restart
npx expo start --clear
```

### Key Components

**App.js**
- Manages screen navigation (home, reader, favorites)
- Handles state for current site and screen

**SiteSelector.js**
- Displays platform grid
- Integrates QuickActions widget
- Handles site selection

**WebViewReader.js**
- Full-screen webview component
- Auto-save reading progress
- Navigation controls with auto-hide
- Favorites bookmark functionality

**QuickActions.js**
- "Continue Reading" card
- Recent favorites preview
- Loads data from AsyncStorage

**FavoritesScreen.js**
- Tabbed interface (Favorites / History)
- Remove favorites functionality
- Navigate to saved pages

**Storage utilities (utils/storage.js)**
- `saveLastVisited()` - Save current reading position
- `getLastVisited()` - Retrieve last read site
- `addToFavorites()` - Bookmark current page
- `getFavorites()` - Get all favorites
- `removeFromFavorites()` - Delete bookmark
- `saveToHistory()` - Add to history (auto, last 50)
- `getHistory()` - Get reading history

### Adding New Sites

Edit `data/sites.js` to add more reading platforms:

```javascript
export const READING_SITES = [
  // ... existing sites
  {
    id: '8',
    name: 'New Reading Site',
    description: 'Description of the site',
    url: 'https://example.com',
    color: '#hexcolor',  // Border color
    icon: '📖',          // Emoji icon
  },
];
```

### Customization

**Themes and Colors**
- Modify `StyleSheet` objects in each component
- Main colors: `#3498db` (blue), `#27AE60` (green), `#e74c3c` (red)
- Background: `#f8f9fa` (light gray)

**Auto-hide Timer**
- Default: 3 seconds
- Change in `WebViewReader.js` line 33: `setTimeout(() => { ... }, 3000)`

**History Limit**
- Default: 50 entries
- Change in `storage.js` line 102: `.slice(0, 50)`

## 📦 Building for Production

### Android APK/AAB

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo account
eas login

# Configure build (first time only)
eas build:configure

# Build APK for direct installation
eas build --platform android --profile preview

# Build AAB for Google Play Store
eas build --platform android --profile production
```

### iOS IPA

```bash
# Build for iOS (requires Apple Developer account)
eas build --platform ios --profile preview
```

The build process generates installable files that work independently of Expo Go. You can:
- Install APK directly on Android devices
- Submit to Google Play Store / Apple App Store
- Distribute via internal channels

### Build Profiles

Create `eas.json` for custom build configurations:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

## 🔧 Troubleshooting

### Common Issues

**App won't load on device**
- Ensure phone and computer are on the same WiFi network
- Restart Expo development server: `npx expo start --clear`
- Update Expo Go to latest version

**WebView not displaying content**
- Some sites block webview access (check site's terms)
- Verify internet connection
- Try accessing the site in a regular browser first

**Continue Reading shows wrong site**
- This is now fixed - it saves immediately when you select a site
- Clear app data if issues persist: uninstall and reinstall

**Favorites not saving**
- Check AsyncStorage permissions
- Look for errors in console: `npx expo start`
- Verify the alert appears when adding favorites

**Build errors**
- Run diagnostics: `npx expo doctor`
- Clear cache: `npx expo start --clear`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Performance Tips

- WebView caching is enabled by default
- History limited to 50 entries to prevent slowdown
- Auto-hide navigation reduces UI overhead
- Lazy loading for favorites/history lists

### Getting Help

- **Expo Documentation**: https://docs.expo.dev/
- **React Native WebView**: https://github.com/react-native-webview/react-native-webview
- **AsyncStorage**: https://react-native-async-storage.github.io/async-storage/
- **Community Support**: https://forums.expo.dev/

## 🎯 Roadmap / Future Features

Potential enhancements:
- **Dark mode**: Night-friendly reading theme
- **Download chapters**: Offline reading support
- **Notifications**: Alerts for new chapter releases
- **Reading statistics**: Track reading time and chapters
- **Multiple bookmarks**: Save multiple pages per site
- **Search**: Find sites by name or category
- **Custom site addition**: Add your own URLs
- **Export/Import**: Backup favorites and history
- **Reading list**: Queue manga to read later

## 📄 License

This project is for educational purposes. Ensure you comply with the terms of service of any reading platforms accessed through this app.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs via issues
- Suggest new features
- Submit pull requests
- Improve documentation

## 🙏 Acknowledgments

Built with:
- React Native & Expo
- react-native-webview
- AsyncStorage
- Various manga/manhwa platforms for content

---

**Happy Reading!** 📚