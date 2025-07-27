import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CityInputForm from './components/CityInputForm';
import WeatherDisplay from './components/WeatherDisplay';
import OutfitRecommendation from './components/OutfitRecommendation';
import WeatherForecast from './components/WeatherForecast';
import WeatherAlerts from './components/WeatherAlerts';
import ActivitySuggestions from './components/ActivitySuggestions';
import UserPreferences from './components/UserPreferences';
import Footer from './components/Footer';
import WardrobeManager from './components/WardrobeManager';
import { useWeatherAPI } from './hooks/useWeatherAPI';
import { useGeolocation } from './hooks/useGeolocation';
import { useUserPreferences } from './hooks/useUserPreferences';
import { useOfflineCache } from './hooks/useOfflineCache';
import { useWardrobe } from './hooks/useWardrobe';
import { Settings, WifiOff } from 'lucide-react';
import { useTranslation } from './hooks/useTranslation';

function App() {
  const [isCelsius, setIsCelsius] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);
  const [showWardrobeManager, setShowWardrobeManager] = useState(false);
  
  const { weather, forecast, alerts, isLoading, error, fetchWeather, fetchWeatherByLocation, dismissAlert } = useWeatherAPI();
  const { getCurrentLocation, isLoading: locationLoading, error: locationError } = useGeolocation();
  const { preferences, updatePreferences } = useUserPreferences();
  const { isOffline, cacheWeatherData, getCachedWeather } = useOfflineCache();
  const { wardrobeItems, updateWardrobeItems } = useWardrobe();
  const { t } = useTranslation();

  // Initialize PWA
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    // Load cached weather if offline
    if (isOffline) {
      const cached = getCachedWeather();
      if (cached) {
        console.log('Loaded cached weather data:', cached);
      }
    }
  }, [isOffline, getCachedWeather]);

  // Cache weather data when it's fetched
  useEffect(() => {
    if (weather && !isOffline) {
      cacheWeatherData(weather, weather.city);
    }
  }, [weather, isOffline, cacheWeatherData]);

  // Update temperature unit from preferences
  useEffect(() => {
    if (preferences.temperatureUnit) {
      setIsCelsius(preferences.temperatureUnit === 'celsius');
    }
  }, [preferences.temperatureUnit]);

  const handleCitySubmit = (city: string) => {
    fetchWeather(city);
  };

  const handleLocationRequest = async () => {
    try {
      const location = await getCurrentLocation();
      await fetchWeatherByLocation(location.lat, location.lon);
    } catch (err) {
      console.error('Location error:', err);
    }
  };

  const toggleTemperatureUnit = () => {
    const newUnit = isCelsius ? 'fahrenheit' : 'celsius';
    setIsCelsius(!isCelsius);
    updatePreferences({ temperatureUnit: newUnit });
  };

  const handlePreferencesSave = (newPreferences: any) => {
    updatePreferences(newPreferences);
  };

  const generateOutfitText = (weatherData: any, userPrefs: any) => {
    const temp = weatherData.temperature;
    const condition = weatherData.condition.toLowerCase();
    const styles = userPrefs?.clothingStyles || ['casual'];
    
    let outfit = '';
    
    if (temp <= 5) {
      outfit = 'Wear a heavy winter coat, warm layers, gloves, and a hat.';
    } else if (temp <= 15) {
      outfit = 'A warm jacket or hoodie with jeans would be perfect.';
    } else if (temp <= 25) {
      outfit = 'A light sweater or long-sleeve shirt with comfortable pants.';
    } else {
      outfit = 'Light clothing like a t-shirt and shorts would be comfortable.';
    }
    
    if (styles.includes('formal')) {
      outfit = outfit.replace('hoodie', 'blazer').replace('t-shirt', 'dress shirt');
    }
    
    return outfit;
  };

  const displayError = error || locationError;
  const outfitRecommendation = weather ? generateOutfitText(weather, preferences) : '';

  return (
    <div className={`min-h-screen transition-all duration-500 safe-area-padding ${
      preferences.theme === 'vibrant' 
        ? 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-400 dark:from-purple-900 dark:via-pink-800 dark:to-red-700'
        : preferences.theme === 'nature'
        ? 'bg-gradient-to-br from-green-400 via-teal-500 to-blue-400 dark:from-green-900 dark:via-teal-800 dark:to-blue-700'
        : preferences.theme === 'sunset'
        ? 'bg-gradient-to-br from-orange-400 via-red-500 to-pink-400 dark:from-orange-900 dark:via-red-800 dark:to-pink-700'
        : preferences.theme === 'minimal'
        ? 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 dark:from-gray-800 dark:via-gray-900 dark:to-black'
        : 'bg-gradient-to-br from-blue-400 via-blue-500 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700'
    }`}>
      <Header theme={preferences.theme} />
      
      {/* Offline Indicator */}
      {isOffline && (
        <div className="bg-yellow-500 text-white px-4 py-2 text-center text-sm flex items-center justify-center gap-2 no-print">
          <WifiOff className="w-4 h-4" />
          {t('offlineMessage')}
        </div>
      )}
      
      <main className="container mx-auto px-4 py-4 sm:py-8">
        <div className="space-y-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              Weather & Outfit Advisor
            </h2>
            <p className="text-blue-100 text-sm xs:text-base sm:text-lg px-4">
              Get personalized outfit recommendations based on current weather
            </p>
            <button
              onClick={() => setShowPreferences(true)}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 xs:px-5 xs:py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-200 touch-target text-sm xs:text-base"
            >
              <Settings className="w-4 h-4 xs:w-5 xs:h-5" />
              {t('preferences')}
            </button>
          </div>

          {/* Weather Alerts */}
          {alerts.length > 0 && (
            <div className="px-2 sm:px-0">
              <WeatherAlerts alerts={alerts} onDismiss={dismissAlert} />
            </div>
          )}

          <div className="px-2 sm:px-0">
            <CityInputForm
              onCitySubmit={handleCitySubmit}
              onLocationRequest={handleLocationRequest}
              isLoading={isLoading || locationLoading}
              error={displayError}
            />
          </div>

          {weather && (
            <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
              <div className="animate-fade-in">
                <WeatherDisplay
                  weather={weather}
                  isCelsius={isCelsius}
                  onToggleUnit={toggleTemperatureUnit}
                />
              </div>
              
              <div className="animate-fade-in">
                <OutfitRecommendation
                  weather={weather}
                  isCelsius={isCelsius}
                  preferences={preferences}
                  wardrobeItems={wardrobeItems}
                  onManageWardrobe={() => setShowWardrobeManager(true)}
                />
              </div>
              
              <div className="animate-fade-in">
                <ActivitySuggestions
                  weather={weather}
                  isCelsius={isCelsius}
                />
              </div>
              
              {forecast.length > 0 && (
                <div className="animate-fade-in">
                  <WeatherForecast
                    forecast={forecast}
                    isCelsius={isCelsius}
                    wardrobeItems={wardrobeItems}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer weather={weather} outfit={outfitRecommendation} isCelsius={isCelsius} />
      
      <UserPreferences
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
        preferences={preferences}
        onSave={handlePreferencesSave}
      />
      
      <WardrobeManager
        isOpen={showWardrobeManager}
        onClose={() => setShowWardrobeManager(false)}
        onWardrobeUpdate={updateWardrobeItems}
      />
    </div>
  );
}

export default App;