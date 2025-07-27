import React, { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface CityInputFormProps {
  onCitySubmit: (city: string) => void;
  onLocationRequest: () => void;
  isLoading: boolean;
  error: string;
}

const CityInputForm: React.FC<CityInputFormProps> = ({
  onCitySubmit,
  onLocationRequest,
  isLoading,
  error
}) => {
  const [city, setCity] = useState('');
  const { t } = useTranslation();

  const handleSubmit = () => {
    if (city.trim()) {
      onCitySubmit(city.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
        <div className="space-y-3 sm:space-y-4">
          <div className="relative">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('enterCity')}
              className="w-full px-4 py-3 pr-12 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
              disabled={isLoading}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={isLoading || !city.trim()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 disabled:scale-100 touch-target"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              <span className="hidden sm:inline">{t('getWeather')}</span>
              <span className="sm:hidden">Weather</span>
            </button>
            
            <button
              onClick={onLocationRequest}
              disabled={isLoading}
              className="px-4 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400 text-white rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 touch-target"
              aria-label={t('useLocation')}
            >
              <MapPin className="w-5 h-5" />
            </button>
          </div>
          
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl text-sm break-words">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityInputForm;