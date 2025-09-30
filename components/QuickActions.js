import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { getLastVisited, getFavorites } from '../utils/storage';
import { formatTime } from '../utils/tools';
import { useTheme } from '../utils/themeContext';

const QuickActions = ({ onSiteSelect, onShowFavorites }) => {
  const { theme } = useTheme();
  const [lastVisited, setLastVisited] = useState(null);
  const [recentFavorites, setRecentFavorites] = useState([]);

  useEffect(() => {
    loadQuickData();
  }, []);

  const loadQuickData = async () => {
    const lastSite = await getLastVisited();
    const favorites = await getFavorites();
    
    setLastVisited(lastSite);
    setRecentFavorites(favorites.slice(0, 3)); // show only 3 recent favorites
  };

  const handleContinueReading = () => {
    if (lastVisited) {
      onSiteSelect({
        ...lastVisited.site,
        continueFromUrl: lastVisited.url,
      });
    }
  };

  if (!lastVisited && recentFavorites.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {lastVisited && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            📖 Continue Reading
          </Text>
          <TouchableOpacity 
            style={[styles.continueCard, { backgroundColor: theme.card }]}
            onPress={handleContinueReading}
          >
            <View style={styles.cardContent}>
              <Text style={[styles.siteName, { color: theme.text }]}>
                {lastVisited.site.name}
              </Text>
              <Text style={[styles.timeText, { color: theme.textSecondary }]}>
                Last read {formatTime(lastVisited.timestamp)}
              </Text>
            </View>
            <Text style={styles.continueIcon}>▶️</Text>
          </TouchableOpacity>
        </View>
      )}

      {recentFavorites.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              ⭐ Recent Favorites
            </Text>
            <TouchableOpacity onPress={onShowFavorites}>
              <Text style={[styles.viewAllText, { color: theme.primary }]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          
          {recentFavorites.map((favorite) => (
            <TouchableOpacity 
              key={favorite.id}
              style={[styles.favoriteItem, { backgroundColor: theme.card }]}
              onPress={() => onSiteSelect({
                ...favorite.site,
                continueFromUrl: favorite.url,
              })}
            >
              <View style={styles.favoriteContent}>
                <Text 
                  style={[styles.favoriteTitle, { color: theme.text }]} 
                  numberOfLines={1}
                >
                  {favorite.title || favorite.site.name}
                </Text>
                <Text style={[styles.favoriteSite, { color: theme.textSecondary }]}>
                  {favorite.site.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  continueCard: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#27AE60',
  },
  cardContent: {
    flex: 1,
  },
  siteName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 12,
  },
  continueIcon: {
    fontSize: 20,
  },
  favoriteItem: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  favoriteContent: {
    flex: 1,
  },
  favoriteTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  favoriteSite: {
    fontSize: 12,
  },
});

export default QuickActions;