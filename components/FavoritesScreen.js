import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { 
  getFavorites, 
  removeFromFavorites, 
  getHistory, 
  clearHistory,
  clearFavorites,
  removeFromHistory,
} from '../utils/storage';
import { formatTime } from '../utils/tools';
import { useTheme } from '../utils/themeContext';

const FavoritesScreen = ({ onClose, onSelectUrl }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('favorites'); // 'favorites' or 'history'
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const favs = await getFavorites();
    const hist = await getHistory();
    setFavorites(favs);
    setHistory(hist);
  };

  const handleRemoveFavorite = async (url) => {
    Alert.alert(
      'Remove Favorite',
      'Are you sure you want to remove this from favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            await removeFromFavorites(url);
            loadData();
          },
        },
      ]
    )
  };

  const handleRemoveHistory = async (url) => { // direct removal without confirmation
    // Alert.alert(
    //   'Remove from History',
    //   'Are you sure you want to remove this entry from history?',
    //   [
    //     { text: 'Cancel', style: 'cancel' },
    //     {
    //       text: 'Remove',
    //       style: 'destructive',
    //       onPress: async () => {
    //         await handleRemoveHistory(url);
    //         loadData();
    //       },
    //     },
    //   ]
    // );
    console.log('Removing from history:', url);
    await removeFromHistory(url);
    loadData();
  };

  const handleClearAll = () => {
    const isHistory = activeTab === 'history';
    Alert.alert(
      `Clear All ${isHistory ? 'History' : 'Favorites'}`,
      `Are you sure you want to clear all ${isHistory ? 'history' : 'favorites'}? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            if (isHistory) {
              await clearHistory();
            } else {
              await clearFavorites();
            }
            loadData();
          },
        },
      ]
    );
  };

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.listItem, { backgroundColor: theme.card }]}
      onPress={() => onSelectUrl(item.site, item.url)}
    >
      <View style={styles.itemContent}>
        <View style={[styles.itemIcon, { backgroundColor: item.site.color || theme.primary }]}>
          <Text style={styles.itemIconText}>{item.site.icon || '📖'}</Text>
        </View>
        <View style={styles.itemText}>
          <Text style={[styles.itemTitle, { color: theme.text }]} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={[styles.itemSite, { color: theme.textSecondary }]}>
            {item.site.name}
          </Text>
          <Text style={[styles.itemTime, { color: theme.textTertiary }]}>
            {formatTime(item.timestamp)}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.removeButton, { backgroundColor: theme.danger }]}
          onPress={() => handleRemoveFavorite(item.url)}
        >
          <Text style={styles.removeButtonText}>×</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderHistoryItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.listItem, { backgroundColor: theme.card }]}
      onPress={() => onSelectUrl(item.site, item.url)}
    >
      <View style={styles.itemContent}>
        <View style={[styles.itemIcon, { backgroundColor: item.site.color || theme.primary }]}>
          <Text style={styles.itemIconText}>{item.site.icon || '📖'}</Text>
        </View>
        <View style={styles.itemText}>
          <Text style={[styles.itemTitle, { color: theme.text }]} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={[styles.itemSite, { color: theme.textSecondary }]}>
            {item.site.name}
          </Text>
          <Text style={[styles.itemTime, { color: theme.textTertiary }]}>
            {formatTime(item.timestamp)}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.removeButton, { backgroundColor: theme.danger }]}
          onPress={() => handleRemoveHistory(item.url)}
        >
          <Text style={styles.removeButtonText}>×</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>
        {activeTab === 'favorites' ? '⭐' : '📚'}
      </Text>
      <Text style={[styles.emptyTitle, { color: theme.text }]}>
        {activeTab === 'favorites' ? 'No favorites yet' : 'No reading history'}
      </Text>
      <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
        {activeTab === 'favorites'
          ? 'Tap the ⭐ button while reading to save your favorites'
          : 'Your reading history will appear here'}
      </Text>
    </View>
  );

  const currentData = activeTab === 'favorites' ? favorites : history;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: theme.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Library</Text>
        {currentData.length > 0 && (
          <TouchableOpacity onPress={handleClearAll} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        )}
        {currentData.length === 0 && <View style={styles.backButton} />}
      </View>

      {/* tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab, 
            { backgroundColor: theme.card },
            activeTab === 'favorites' && { backgroundColor: theme.primary }
          ]}
          onPress={() => setActiveTab('favorites')}
        >
          <Text style={[
            styles.tabText, 
            { color: theme.textSecondary },
            activeTab === 'favorites' && styles.activeTabText
          ]}>
            ⭐ Favorites
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            { backgroundColor: theme.card },
            activeTab === 'history' && { backgroundColor: theme.primary }
          ]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[
            styles.tabText,
            { color: theme.textSecondary },
            activeTab === 'history' && styles.activeTabText
          ]}>
            📚 History
          </Text>
        </TouchableOpacity>
      </View>

      {/* list */}
      <FlatList
        data={currentData}
        renderItem={activeTab === 'favorites' ? renderFavoriteItem : renderHistoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 28,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#e74c3c',
    borderRadius: 6,
  },
  clearButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#ffffff',
  },
  listContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  listItem: {
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  itemIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemIconText: {
    fontSize: 20,
  },
  itemText: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemSite: {
    fontSize: 13,
    marginBottom: 2,
  },
  itemTime: {
    fontSize: 11,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  removeButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 20,
  },
});

export default FavoritesScreen;