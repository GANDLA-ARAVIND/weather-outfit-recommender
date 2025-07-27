import { useState, useEffect } from 'react';

interface CachedData {
  weather: any;
  timestamp: number;
  city: string;
}

export const useOfflineCache = () => {
  const [cachedWeather, setCachedWeather] = useState<CachedData | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load cached data on mount
    const cached = localStorage.getItem('cachedWeatherData');
    if (cached) {
      try {
        const parsedCache = JSON.parse(cached);
        // Check if cache is less than 1 hour old
        if (Date.now() - parsedCache.timestamp < 3600000) {
          setCachedWeather(parsedCache);
        } else {
          localStorage.removeItem('cachedWeatherData');
        }
      } catch (error) {
        console.error('Error parsing cached weather data:', error);
        localStorage.removeItem('cachedWeatherData');
      }
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const cacheWeatherData = (weather: any, city: string) => {
    const cacheData: CachedData = {
      weather,
      timestamp: Date.now(),
      city
    };
    
    setCachedWeather(cacheData);
    localStorage.setItem('cachedWeatherData', JSON.stringify(cacheData));
  };

  const getCachedWeather = () => {
    return cachedWeather;
  };

  const clearCache = () => {
    setCachedWeather(null);
    localStorage.removeItem('cachedWeatherData');
  };

  return {
    cachedWeather,
    isOffline,
    cacheWeatherData,
    getCachedWeather,
    clearCache
  };
};