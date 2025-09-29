import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  Animated,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { saveLastVisited, saveToHistory, addToFavorites } from '../utils/storage';

const WebViewReader = ({ site, onBackToHome }) => {
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showNavigation, setShowNavigation] = useState(true);
  const [currentUrl, setCurrentUrl] = useState(site.continueFromUrl || site.url);
  const [pageTitle, setPageTitle] = useState('');
  const webViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const hideTimeoutRef = useRef(null);

  // save immediately when component mounts
  useEffect(() => {
    saveLastVisited(site, currentUrl);
    saveToHistory(site, currentUrl, site.name);
  }, []);

  // auto-hide navigation after 3 seconds
  const startHideTimer = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      hideNavigation();
    }, 3000);
  };

  const hideNavigation = () => {
    setShowNavigation(false);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const showNavigationControls = () => {
    setShowNavigation(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    startHideTimer();
  };

  useEffect(() => {
    startHideTimer();
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const handleNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    setCurrentUrl(navState.url);
    setPageTitle(navState.title || '');

    // save progress automatically when navigating
    saveLastVisited(site, navState.url);
    saveToHistory(site, navState.url, navState.title || site.name);
  };

  const goBack = () => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
    }
  };

  const goForward = () => {
    if (canGoForward && webViewRef.current) {
      webViewRef.current.goForward();
    }
  };

  const reload = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const handleAddToFavorites = () => {
    addToFavorites(site, currentUrl, pageTitle || site.name);
    Alert.alert('✨', 'Added to favorites!', [{ text: 'OK' }]);
  };

  const handleWebViewTouch = () => {
    if (!showNavigation) {
      showNavigationControls();
    } else {
      startHideTimer();
    }
  };

  const handleError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    Alert.alert(
      'Connection Error',
      'Could not load the website. Please check your internet connection.',
      [
        { text: 'Retry', onPress: reload },
        { text: 'Back to Home', onPress: onBackToHome }
      ]
    );
  };

  // handle opening new windows/tabs - keep in app
  const handleShouldStartLoadWithRequest = (request) => {
    // allow all navigation within the webview
    return true;
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      
      {/* top navigation header */}
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.navButton} onPress={onBackToHome}>
          <Text style={styles.navButtonText}>🏠</Text>
        </TouchableOpacity>
        <Text style={styles.siteTitle} numberOfLines={1}>
          {site.name}
        </Text>
        <TouchableOpacity style={styles.navButton} onPress={handleAddToFavorites}>
          <Text style={styles.navButtonText}>⭐</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={reload}>
          <Text style={styles.navButtonText}>🔄</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* main webview */}
      <WebView
        ref={webViewRef}
        source={{ uri: currentUrl }}
        style={styles.webview}
        onNavigationStateChange={handleNavigationStateChange}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onTouchStart={handleWebViewTouch}
        onError={handleError}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        scrollEnabled={true}
        bounces={false}
        allowsBackForwardNavigationGestures={true}
        cacheEnabled={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        setSupportMultipleWindows={false} // prevents opening new tabs
        onOpenWindow={(syntheticEvent) => { // permits popups but opens them in the same webview
          const { nativeEvent } = syntheticEvent;
          if (nativeEvent.targetUrl && webViewRef.current) {
            webViewRef.current.injectJavaScript(`window.location.href = '${nativeEvent.targetUrl}';`);
          }
        }}
      />

      {/* bottom navigation controls */}
      <Animated.View style={[styles.bottomNav, { opacity: fadeAnim }]}>
        <TouchableOpacity 
          style={[styles.navButton, !canGoBack && styles.disabled]} 
          onPress={goBack}
          disabled={!canGoBack}
        >
          <Text style={styles.navButtonText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navButton, !canGoForward && styles.disabled]} 
          onPress={goForward}
          disabled={!canGoForward}
        >
          <Text style={styles.navButtonText}>→</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* loading overlay */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContent}>
            <Text style={styles.loadingText}>Loading {site.name}...</Text>
            <View style={styles.loadingBar}>
              <View style={styles.loadingProgress} />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  siteTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
    paddingVertical: 12,
    paddingBottom: 40,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  navButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 10,
    marginHorizontal: 4,
  },
  disabled: {
    opacity: 0.3,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  loadingContent: {
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  loadingBar: {
    width: 200,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingProgress: {
    height: '100%',
    backgroundColor: '#3498db',
    width: '60%',
  },
});

export default WebViewReader;