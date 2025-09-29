import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { READING_SITES } from '../data/sites';
import QuickActions from './QuickActions';


const SiteSelector = ({ onSiteSelect, onShowFavorites }) => {
  const renderSiteCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.siteCard, { borderLeftColor: item.color }]}
      onPress={() => onSiteSelect(item)}
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
          <Text style={styles.cardIcon}>{item.icon}</Text>
        </View>
        <Text style={styles.siteName}>{item.name}</Text>
        <Text style={styles.siteDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleShowFavorites = () => {
    onShowFavorites();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>📱 ReaderApp</Text>
        <Text style={styles.subtitle}>Choose your reading platform</Text>
      </View>
      
      {/* quick actions widget */}
      <QuickActions 
        onSiteSelect={onSiteSelect}
        onShowFavorites={handleShowFavorites}
      />
      
      {/* all sites grid */}
      <View style={styles.allSitesSection}>
        <Text style={styles.sectionTitle}>🌐 All Platforms</Text>
        <FlatList
          data={READING_SITES}
          renderItem={renderSiteCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7f8c8d',
    fontWeight: '500',
  },
  allSitesSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  listContainer: {
    paddingBottom: 20,
  },
  siteCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 8,
    borderRadius: 16,
    borderLeftWidth: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  cardContent: {
    padding: 20,
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 24,
  },
  siteName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  siteDescription: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default SiteSelector;