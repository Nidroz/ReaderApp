import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKeys = {
    LAST_VISITED: 'lastVisited',
    FAVORITES: 'favorites',
    READING_HISTORY: 'readingHistory',
}


// save last visited site and URL
export const saveLastVisited = async (site, url) => {
  try {
    const data = {
      site,
      url,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(StorageKeys.LAST_VISITED, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving last visited:', error);
  }
};


// get last visited site
export const getLastVisited = async () => {
  try {
    const data = await AsyncStorage.getItem(StorageKeys.LAST_VISITED);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting last visited:', error);
    return null;
  }
};


// save to favorites
export const addToFavorites = async (site, url, title) => {
  try {
    const existing = await getFavorites();
    const newFavorite = {
      id: Date.now().toString(),
      site,
      url,
      title,
      timestamp: Date.now(),
    };
    
    const updated = [newFavorite, ...existing.filter(fav => fav.url !== url)];
    await AsyncStorage.setItem(StorageKeys.FAVORITES, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return [];
  }
};


// get favorites
export const getFavorites = async () => {
  try {
    const data = await AsyncStorage.getItem(StorageKeys.FAVORITES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};


// remove from favorites
export const removeFromFavorites = async (url) => {
  try {
    const existing = await getFavorites();
    const updated = existing.filter(fav => fav.url !== url);
    await AsyncStorage.setItem(StorageKeys.FAVORITES, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return [];
  }
};


// save reading history
export const saveToHistory = async (site, url, title) => {
  try {
    const existing = await getHistory();
    const newEntry = {
      id: Date.now().toString(),
      site,
      url,
      title,
      timestamp: Date.now(),
    };
    
    // keep only last 50 entries, remove duplicates
    const filtered = existing.filter(entry => entry.url !== url);
    const updated = [newEntry, ...filtered].slice(0, 50);
    
    await AsyncStorage.setItem(StorageKeys.READING_HISTORY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error saving to history:', error);
    return [];
  }
};

// get reading history
export const getHistory = async () => {
  try {
    const data = await AsyncStorage.getItem(StorageKeys.READING_HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting history:', error);
    return [];
  }
};