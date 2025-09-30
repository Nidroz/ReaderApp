import React, { createContext, useState, useContext, useEffect, Children } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const lightTheme = {
  background: '#f8f9fa',
  card: '#ffffff',
  text: '#2c3e50',
  textSecondary: '#7f8c8d',
  textTertiary: '#95a5a6',
  primary: '#3498db',
  danger: '#e74c3c',
  success: '#27AE60',
  border: '#e0e0e0',
  shadow: 'rgba(0,0,0,0.1)',
};

export const darkTheme = {
  background: '#1a1a2e',
  card: '#16213e',
  text: '#eaeaea',
  textSecondary: '#a0a0a0',
  textTertiary: '#7f8c8d',
  primary: '#3498db',
  danger: '#e74c3c',
  success: '#27AE60',
  border: '#2d2d44',
  shadow: 'rgba(0,0,0,0.3)',
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setIsDark(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  }

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }

  const theme = isDark ? darkTheme : lightTheme;
  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {Children.only(children)}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}