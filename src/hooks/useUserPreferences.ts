import { useState, useEffect } from 'react';

interface UserPreferences {
  clothingStyles: string[];
  theme: string;
  language: string;
  wardrobeItems: string;
  temperatureUnit: 'celsius' | 'fahrenheit';
}

const defaultPreferences: UserPreferences = {
  clothingStyles: ['casual'],
  theme: 'default',
  language: 'en',
  wardrobeItems: '',
  temperatureUnit: 'celsius'
};

export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  useEffect(() => {
    const savedPrefs = localStorage.getItem('userPreferences');
    if (savedPrefs) {
      try {
        const parsed = JSON.parse(savedPrefs);
        setPreferences({ ...defaultPreferences, ...parsed });
      } catch (error) {
        console.error('Error parsing saved preferences:', error);
      }
    }
  }, []);

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    const updated = { ...preferences, ...newPreferences };
    setPreferences(updated);
    localStorage.setItem('userPreferences', JSON.stringify(updated));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
    localStorage.removeItem('userPreferences');
  };

  return {
    preferences,
    updatePreferences,
    resetPreferences
  };
};