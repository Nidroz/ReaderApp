import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import SiteSelector from './components/SiteSelector';
import WebViewSelector from './components/WebViewSelector';

export default function App() {
  const [currentSite, setCurrentSite] = useState(null);

  const handleSiteSelect = (site) => {
    setCurrentSite(site);
  };

  const handleBackToHome = () => {
    setCurrentSite(null);
  };

  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>

    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {currentSite ? (
        <WebViewSelector site={currentSite} onBackToHome={handleBackToHome} />
      ) : (
        <SiteSelector onSiteSelect={handleSiteSelect} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
