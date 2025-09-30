# ReaderApp 📱

A modern, feature-rich mobile app for reading manga and manhwa from various platforms. Built with React Native and Expo for seamless cross-platform compatibility, with a beautiful dark mode and persistent reading progress.

## ✨ Features

- **🌓 Dark Mode**: Toggle between light and dark themes with persistent preference
- **📚 Multi-platform support**: Browse multiple manga/manhwa reading sites in one place
- **🎯 Continue reading**: Pick up exactly where you left off with automatic progress saving
- **⭐ Favorites system**: Save your favorite manga/chapters with one tap
- **📖 Reading history**: Automatic tracking of all pages you've visited (last 50 entries)
- **⚡ Quick access**: Widget for instant access to your last read and recent favorites
- **🧭 Intuitive navigation**: Smooth back/forward controls and gestures
- **📱 Mobile optimized**: Pinch to zoom, responsive design, optimized performance
- **🚫 No external redirects**: All links open within the app
- **🎨 Modern UI**: Color-coded platforms with icons and smooth animations
- **💾 Local storage**: All your data stays on your device
- **🔄 Cross-platform**: Works on both Android and iOS

## 📱 Screenshots

### Home Screen
- Clean grid layout of available reading platforms
- "Continue Reading" widget for quick resume
- Recent favorites quick access
- Dark/Light mode toggle button (☀️/🌙)
- Library access button (📚)
- Color-coded site cards with unique icons

### Library Screen
- **Favorites tab**: All your bookmarked pages with remove option
- **History tab**: Recent reading activity (last 50 entries)
- **Clear All button**: Remove all favorites or history
- One-tap return to any saved page
- Adaptive to dark/light theme

### Reading Interface
- Full-screen webview for optimal reading
- Auto-hiding navigation controls (tap screen to show/hide)
- Floating navigation buttons (positioned above phone nav bar)
- Home button (🏠) - Return to platform selection
- Bookmark button (⭐) - Save current page to favorites
- Reload button (🔄) - Refresh current page
- Back/Forward buttons for page navigation
- Loading indicators with progress bar
- All external links stay within the app

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
   git clone <repository-url>
   cd ReaderApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

   Key dependencies:
   - `react-native-webview` - For displaying web content
   - `@react-native-async-storage/async-storage` - For local data storage (favorites, history, theme)
   - `expo` - Development framework

3. **Project structure**
   ```
   ReaderApp/
   ├── App.js                      # Main app with screen navigation & ThemeProvider
   ├── components/
   │   ├── SiteSelector.js         # Home screen with platform grid & theme toggle
   │   ├── WebViewReader.js        # Reading interface with webview
   │   ├── QuickActions.js         # Continue reading widget
   │   └── FavoritesScreen.js      # Library with favorites & history
   ├── data/
   │   └── sites.js                # Platform configurations
   ├── utils/
   │   ├── storage.js              # AsyncStorage helpers
   │   ├── tools.js                # Utility functions (formatTime)
   │   └── themeContext.js         # Dark/Light theme context
   └── assets/
       ├── icon.png                # App icon (1024x1024)
       ├── adaptive-icon-background.png   # Android background adaptive icon
       └── adaptive-icon.png       # Android adaptive icon
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

### Basic Navigation
1. **Launch the app** - Home screen with available platforms
2. **Toggle theme** - Tap ☀️/🌙 button (top left) to switch dark/light mode
3. **Access library** - Tap 📚 button (top right) to view favorites & history
4. **Quick continue** - Use "Continue Reading" widget to resume immediately
5. **Select a site** - Tap any platform card to start browsing

### While Reading
1. **Show/hide controls** - Tap anywhere on screen
2. **Navigate** - Use ← → buttons for back/forward
3. **Bookmark** - Tap ⭐ to save current page to favorites
4. **Refresh** - Tap 🔄 to reload current page
5. **Go home** - Tap 🏠 to return to platform selection

### Managing Your Library
1. **View all** - Tap "View All" in favorites section or 📚 button
2. **Switch tabs** - Toggle between Favorites and History
3. **Open saved page** - Tap any item to resume reading
4. **Remove favorite** - Tap X button on favorite items
5. **Clear all** - Tap "Clear" button to remove all items from current tab

## 🎨 Customization

### Dark Mode
Dark mode preference is automatically saved and persists between app sessions. Colors are optimized for both themes:
- **Light theme**: Clean white backgrounds, dark text
- **Dark theme**: Deep blue-black backgrounds (#1a1a2e), light text

### Adding New Sites

Edit `data/sites.js`:

```javascript
export const READING_SITES = [
  // ... existing sites
  {
    id: '8',
    name: 'New Reading Site',
    description: 'Description of the site',
    url: 'https://example.com',
    color: '#hexcolor',  // Border & icon background color
    icon: '📖',          // Emoji icon
  },
];
```

### Theme Colors

Edit `utils/themeContext.js` to customize colors:

```javascript
export const lightTheme = {
  background: '#f8f9fa',    // Main background
  card: '#ffffff',          // Card backgrounds
  text: '#2c3e50',          // Primary text
  textSecondary: '#7f8c8d', // Secondary text
  primary: '#3498db',       // Accent color (buttons)
  // ...
};

export const darkTheme = {
  background: '#1a1a2e',    // Dark background
  card: '#16213e',          // Dark card backgrounds
  text: '#eaeaea',          // Light text
  // ...
};
```

### Other Settings

**Auto-hide timer** (navigation controls)
- Default: 3 seconds
- Location: `WebViewReader.js` line ~37

**History limit**
- Default: 50 entries
- Location: `storage.js` line ~102

**Navigation button position**
- Adjust `paddingBottom` in `WebViewReader.js` bottomNav style

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npx expo start

# Start with cache clear
npx expo start --clear

# Run diagnostics
npx expo doctor

# Update dependencies
npx expo install --fix
```

### Key Components

**App.js**
- Wraps app with ThemeProvider
- Manages screen navigation (home, reader, favorites)
- Handles state for current site and screen

**utils/themeContext.js**
- React Context for theme management
- Persists theme preference with AsyncStorage
- Provides `useTheme()` hook for components

**SiteSelector.js**
- Displays platform grid
- Theme toggle button (top left)
- Library button (top right)
- Integrates QuickActions widget
- Handles site selection

**WebViewReader.js**
- Full-screen webview component
- Auto-save reading progress on navigation
- Navigation controls with auto-hide
- Favorites bookmark functionality
- Prevents external tab opening
- Fixed button positioning above phone nav bar

**QuickActions.js**
- "Continue Reading" card
- Recent favorites preview (max 3)
- Loads data from AsyncStorage on mount

**FavoritesScreen.js**
- Tabbed interface (Favorites / History)
- Remove individual favorites
- Clear all functionality
- Navigate to saved pages
- Adaptive theme support

**Storage utilities** (`utils/storage.js`)
- `saveLastVisited(site, url)` - Save reading position
- `getLastVisited()` - Retrieve last read site
- `addToFavorites(site, url, title)` - Bookmark page
- `getFavorites()` - Get all favorites
- `removeFromFavorites(url)` - Delete bookmark
- `clearFavorites()` - Remove all favorites
- `saveToHistory(site, url, title)` - Add to history
- `getHistory()` - Get reading history (last 50)
- `clearHistory()` - Remove all history

## 📦 Building for Production

### Setup EAS Build

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure build (first time only)
eas build:configure
```

### Android Build

```bash
# Build APK for direct installation
eas build --platform android --profile preview

# Build AAB for Google Play Store
eas build --platform android --profile production
```

### iOS Build

```bash
# Build IPA (requires Apple Developer account)
eas build --platform ios --profile preview
```

### Build Configuration

`eas.json`:
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

### App Icon Setup

Place these files in `assets/`:
- `icon.png` (1024x1024) - Main app icon
- `adaptive-icon.png` (1024x1024) - Android adaptive foreground
- `adaptive-icon-background.png` (1024x1024) - Android adaptive background

Configure in `app.json`:
```json
{
  "expo": {
    "icon": "./assets/icon.png",
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundImage": "./assets/adaptive-icon-background.png"
      }
    }
  }
}
```

## 🔧 Troubleshooting

### Common Issues

**Dark mode not persisting**
- AsyncStorage permission issue
- Clear app data and restart
- Check console for storage errors

**Navigation buttons not clickable**
- Fixed with `paddingBottom: 25` in bottomNav
- Adjust value if needed for your device

**Links opening external browser**
- Fixed with `setSupportMultipleWindows={false}`
- Update `WebViewReader.js` with latest code

**Theme toggle not working**
- Ensure ThemeProvider wraps entire app
- Check `useTheme()` is called in components
- Verify AsyncStorage is installed

**App won't load on device**
- Ensure phone and computer on same WiFi
- Restart dev server: `npx expo start --clear`
- Update Expo Go to latest version

**WebView not displaying content**
- Some sites may block webview access
- Check internet connection
- Try in regular browser first

**Build errors**
- Run: `npx expo doctor`
- Clear cache: `npx expo start --clear`
- Reinstall: `rm -rf node_modules && npm install`

**Icon not showing after build**
- Verify icon files exist in `assets/`
- Check `app.json` paths are correct
- Rebuild with `--clear` flag

## 🎯 Feature Roadmap

Potential future enhancements:
- ✅ **Dark mode** - COMPLETED
- ✅ **Continue reading** - COMPLETED
- ✅ **Favorites & History** - COMPLETED
- ✅ **No external redirects** - COMPLETED
- **Tablet optimization**: Better layouts for larger screens
- **Download chapters**: Offline reading support
- **Push notifications**: Alerts for new chapters (if sites support)
- **Reading statistics**: Track time spent, chapters read
- **Multiple bookmarks per site**: Save multiple positions
- **Search functionality**: Find sites by name or category
- **Custom site addition**: Add your own URLs
- **Export/Import**: Backup and restore favorites/history
- **Reading list**: Queue manga to read later
- **Language filter**: Filter sites by language
- **Night mode enhancements**: OLED black theme, color temperature

## 📊 Storage & Privacy

All data is stored locally on your device using AsyncStorage:
- **Last visited**: Current reading position
- **Favorites**: Bookmarked pages
- **History**: Last 50 visited pages
- **Theme preference**: Dark/light mode choice

No data is sent to third parties. Your reading activity is private.

## 📄 License

This project is for educational and personal use. Ensure you comply with the terms of service of any reading platforms accessed through this app.

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Use meaningful variable names
- Comment complex logic
- Follow existing component structure
- Test on both light and dark themes

## 🙏 Acknowledgments

Built with:
- **React Native & Expo** - Cross-platform framework
- **react-native-webview** - Web content display
- **AsyncStorage** - Local data persistence
- **React Context API** - Theme management
- Various manga/manhwa platforms for content

Special thanks to the open-source community for making this project possible.

## 📞 Support

If you encounter issues or have questions:

- **Documentation**: Read through this README thoroughly
- **Expo Docs**: https://docs.expo.dev/
- **WebView Docs**: https://github.com/react-native-webview/react-native-webview
- **Community**: https://forums.expo.dev/

## 🔄 Changelog

### Version 1.0.0
- Initial release
- Multi-platform support
- Continue reading feature
- Favorites and history
- Dark mode with persistence
- Quick actions widget
- Fixed navigation button positioning
- Prevented external browser redirects
- Library accessible without favorites

---

**Happy Reading!** 📚

Made with ❤️ for manga and manhwa enthusiasts