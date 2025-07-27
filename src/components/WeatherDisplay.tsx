import React from 'react';
import { Thermometer, Droplets, Wind, Eye } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { useTranslation } from '../hooks/useTranslation';

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
}

interface WeatherDisplayProps {
  weather: WeatherData;
  isCelsius: boolean;
  onToggleUnit: () => void;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weather,
  isCelsius,
  onToggleUnit
}) => {
  const displayTemp = isCelsius 
    ? Math.round(weather.temperature)
    : Math.round((weather.temperature * 9/5) + 32);
  
  const tempUnit = isCelsius ? '°C' : '°F';
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 break-words">
            {weather.city}, {weather.country}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 capitalize">
            {weather.condition}
          </p>
        </div>

        <div className="flex items-center justify-center mb-4 sm:mb-6">
          <WeatherIcon condition={weather.condition} />
          <div className="ml-4">
            <div className="flex items-baseline">
              <span className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
                {displayTemp}
              </span>
              <button
                onClick={onToggleUnit}
                className="ml-2 text-xl sm:text-2xl text-blue-500 hover:text-blue-600 transition-colors duration-200 font-medium touch-target"
              >
                {tempUnit}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div className="text-center p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <Droplets className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{t('humidity')}</p>
            <p className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">{weather.humidity}%</p>
          </div>
          
          <div className="text-center p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <Wind className="w-5 h-5 text-teal-500 mx-auto mb-1" />
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{t('wind')}</p>
            <p className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">{weather.windSpeed} km/h</p>
          </div>
          
          <div className="text-center p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <Eye className="w-5 h-5 text-purple-500 mx-auto mb-1" />
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{t('visibility')}</p>
            <p className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">{weather.visibility} km</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;