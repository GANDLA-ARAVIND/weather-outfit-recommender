import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { WardrobeItem } from '../hooks/useWardrobe';
import { useTranslation } from '../hooks/useTranslation';

interface ForecastDay {
  date: string;
  temperature: { min: number; max: number };
  condition: string;
  humidity: number;
  windSpeed: number;
}

interface WeatherForecastProps {
  forecast: ForecastDay[];
  isCelsius: boolean;
  wardrobeItems?: WardrobeItem[];
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast, isCelsius, wardrobeItems = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();

  const convertTemp = (temp: number) => {
    return isCelsius ? Math.round(temp) : Math.round((temp * 9/5) + 32);
  };

  const tempUnit = isCelsius ? '°C' : '°F';

  const generateDayOutfit = (temp: number, condition: string) => {
    if (temp <= 5) return 'Heavy coat, warm layers, boots';
    if (temp <= 15) return 'Jacket, long pants, closed shoes';
    if (temp <= 25) return 'Light sweater, jeans, sneakers';
    return 'T-shirt, shorts, sandals';
  };

  const generateWardrobeOutfitForDay = (temp: number, condition: string) => {
    if (wardrobeItems.length === 0) return null;

    const suitableItems = wardrobeItems.filter(item => {
      if (!item.weatherSuitability) return true;
      
      const suitability = item.weatherSuitability.toLowerCase();
      const weatherCondition = condition.toLowerCase();
      
      if (temp <= 5 && (suitability.includes('cold') || suitability.includes('all weather'))) return true;
      if (temp > 5 && temp <= 15 && (suitability.includes('cool') || suitability.includes('all weather'))) return true;
      if (temp > 15 && temp <= 25 && (suitability.includes('warm') || suitability.includes('all weather'))) return true;
      if (temp > 25 && (suitability.includes('hot') || suitability.includes('all weather'))) return true;
      
      if (weatherCondition.includes('rain') && (suitability.includes('rainy') || suitability.includes('all weather'))) return true;
      if (weatherCondition.includes('wind') && (suitability.includes('windy') || suitability.includes('all weather'))) return true;
      
      return false;
    });

    if (suitableItems.length === 0) return null;

    const categories = {
      top: suitableItems.filter(item => item.category === 'Top'),
      bottom: suitableItems.filter(item => item.category === 'Bottom'),
      outerwear: suitableItems.filter(item => item.category === 'Outerwear'),
      footwear: suitableItems.filter(item => item.category === 'Footwear')
    };

    const outfit = [];
    if (categories.top.length > 0) outfit.push(categories.top[0]);
    if (categories.bottom.length > 0) outfit.push(categories.bottom[0]);
    if (temp <= 20 && categories.outerwear.length > 0) outfit.push(categories.outerwear[0]);
    if (categories.footwear.length > 0) outfit.push(categories.footwear[0]);

    return outfit.map(item => `your ${item.color ? item.color.toLowerCase() + ' ' : ''}${item.name.toLowerCase()}`).join(', ');
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('dayForecast')}
            </h3>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>

        {isExpanded && (
          <div className="border-t border-gray-200 dark:border-gray-700">
            {forecast.map((day, index) => (
              <div
                key={index}
                className="p-4 border-b border-gray-100 dark:border-gray-600 last:border-b-0"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="scale-75">
                      <WeatherIcon condition={day.condition} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                        {day.condition}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">
                      {convertTemp(day.temperature.max)}{tempUnit}
                    </p>
                    <p className="text-sm text-gray-500">
                      {convertTemp(day.temperature.min)}{tempUnit}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">{t('general')}:</span> {generateDayOutfit(day.temperature.max, day.condition)}
                    </p>
                  </div>
                  
                  {(() => {
                    const wardrobeOutfit = generateWardrobeOutfitForDay(day.temperature.max, day.condition);
                    return wardrobeOutfit ? (
                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          <span className="font-medium">{t('myWardrobe')}:</span> {wardrobeOutfit}
                        </p>
                      </div>
                    ) : wardrobeItems.length > 0 ? (
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
                        <p className="text-xs text-yellow-700 dark:text-yellow-300">
                          {t('noSuitableWardrobe')}
                        </p>
                      </div>
                    ) : null;
                  })()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherForecast;