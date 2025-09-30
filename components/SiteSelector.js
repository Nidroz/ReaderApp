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
import { useTheme } from '../utils/themeContext';

const SiteSelector = ({ onSiteSelect, onShowFavorites }) => {
  const { theme, isDark, toggleTheme } = useTheme();

  const renderSiteCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.siteCard, { 
        backgroundColor: theme.card,
        borderLeftColor: item.color 
      }]}
      onPress={() => onSiteSelect(item)}
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
          <Text style={styles.cardIcon}>{item.icon}</Text>
        </View>
        <Text style={[styles.siteName, { color: theme.text }]}>{item.name}</Text>
        <Text style={[styles.siteDescription, { color: theme.textSecondary }]}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]} 
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <View style={styles.headerContent}>
          <Text style={[styles.title, { color: theme.text }]}>📱 ReaderApp</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Choose your reading platform
          </Text>
        </View>
        
        {/* theme button - left */}
        <TouchableOpacity 
          style={[styles.themeButton, { backgroundColor: theme.primary }]}
          onPress={toggleTheme}
        >
          <Text style={styles.iconButtonText}>{isDark ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>
        
        {/* library button - right */}
        <TouchableOpacity 
          style={[styles.libraryButton, { backgroundColor: theme.primary }]}
          onPress={onShowFavorites}
        >
          <Text style={styles.iconButtonText}>📚</Text>
        </TouchableOpacity>
      </View>
      
      <QuickActions 
        onSiteSelect={onSiteSelect}
        onShowFavorites={onShowFavorites}
      />
      
      <View style={styles.allSitesSection}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          🌐 All Platforms
        </Text>
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
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  themeButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  libraryButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  iconButtonText: {
    fontSize: 22,
  },
  allSitesSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  listContainer: {
    paddingBottom: 50,
  },
  siteCard: {
    flex: 1,
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
    marginBottom: 8,
    textAlign: 'center',
  },
  siteDescription: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default SiteSelector;