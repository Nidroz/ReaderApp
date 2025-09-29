import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import SiteSelector from './components/SiteSelector';
import WebViewReader from './components/WebViewReader';
import FavoritesScreen from './components/FavoritesScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home', 'reader', 'favorites'
  const [currentSite, setCurrentSite] = useState(null);

  const handleSiteSelect = (site) => {
    setCurrentSite(site);
    setCurrentScreen('reader');
  };

  const handleBackToHome = () => {
    setCurrentSite(null);
    setCurrentScreen('home');
  };

   const handleShowFavorites = () => {
    setCurrentScreen('favorites');
  };

  const handleCloseFavorites = () => {
    setCurrentScreen('home');
  };

  const handleSelectFromFavorites = (site, url) => {
    setCurrentSite({ ...site, continueFromUrl: url });
    setCurrentScreen('reader');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {currentScreen === 'reader' && currentSite && (
        <WebViewReader 
          site={currentSite} 
          onBackToHome={handleBackToHome} 
        />
      )}
      {currentScreen === 'home' && (
        <SiteSelector 
          onSiteSelect={handleSiteSelect}
          onShowFavorites={handleShowFavorites}
        />
      )}
      {currentScreen === 'favorites' && (
        <FavoritesScreen
          onClose={handleCloseFavorites}
          onSelectUrl={handleSelectFromFavorites}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
