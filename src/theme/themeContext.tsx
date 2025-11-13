// ThemeContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextValue {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

let globalTheme = 'light';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const getSavedTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setTheme(savedTheme);
        globalTheme = savedTheme;
      }
    } catch (error) {
      console.error('Error retrieving theme from storage: ', error);
    }
  };

  const saveTheme = async (selectedTheme: string) => {
    try {
      await AsyncStorage.setItem('theme', selectedTheme);
      globalTheme = selectedTheme;
    } catch (error) {
      console.error('Error saving theme to storage: ', error);
    }
  };

  useEffect(() => {
    getSavedTheme();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  const contextValue: ThemeContextValue = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const isDark = () => globalTheme === 'dark';