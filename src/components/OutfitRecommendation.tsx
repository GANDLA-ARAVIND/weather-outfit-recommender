import React, { useState } from 'react';
import { Volume2, VolumeX, Shirt, Sparkles } from 'lucide-react';
import { WardrobeItem } from '../hooks/useWardrobe';
import { useTranslation } from '../hooks/useTranslation';

interface OutfitRecommendationProps {
  weather: any;
  isCelsius: boolean;
  preferences?: any;
  wardrobeItems?: WardrobeItem[];
  onManageWardrobe?: () => void;
}

const OutfitRecommendation: React.FC<OutfitRecommendationProps> = ({
  weather,
  isCelsius,
  preferences,
  wardrobeItems = [],
  onManageWardrobe
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { t } = useTranslation();

  const generateGenericOutfit = () => {
    const temp = weather.temperature;
    const condition = weather.condition.toLowerCase();
    const styles = preferences?.clothingStyles || ['casual'];
    
    let outfit = '';
    
    // Base outfit recommendation
    if (temp <= 5) {
      outfit = 'Wear a heavy winter coat, warm layers, gloves, and a hat. Consider thermal underwear for extra warmth.';
    } else if (temp <= 15) {
      outfit = 'A warm jacket or hoodie with jeans would be perfect. Don\'t forget a scarf!';
    } else if (temp <= 25) {
      outfit = 'A light sweater or long-sleeve shirt with comfortable pants would be ideal.';
    } else {
      outfit = 'Light clothing like a t-shirt and shorts would be comfortable. Consider breathable fabrics.';
    }
    
    // Add style preferences
    if (styles.includes('formal')) {
      outfit = outfit.replace('hoodie', 'blazer').replace('t-shirt', 'dress shirt');
    } else if (styles.includes('athletic')) {
      outfit += ' Consider moisture-wicking athletic wear for comfort.';
    }
    
    if (condition.includes('rain')) {
      outfit += ' Bring an umbrella or wear a waterproof jacket!';
    }
    if (condition.includes('wind')) {
      outfit += ' Consider a windproof layer.';
    }
    
    return outfit;
  };

  const generateWardrobeOutfit = () => {
    if (wardrobeItems.length === 0) return null;

    const temp = weather.temperature;
    const condition = weather.condition.toLowerCase();
    
    // Filter items by weather suitability
    const suitableItems = wardrobeItems.filter(item => {
      if (!item.weatherSuitability) return true;
      
      const suitability = item.weatherSuitability.toLowerCase();
      
      if (temp <= 5 && (suitability.includes('cold') || suitability.includes('all weather'))) return true;
      if (temp > 5 && temp <= 15 && (suitability.includes('cool') || suitability.includes('all weather'))) return true;
      if (temp > 15 && temp <= 25 && (suitability.includes('warm') || suitability.includes('all weather'))) return true;
      if (temp > 25 && (suitability.includes('hot') || suitability.includes('all weather'))) return true;
      
      if (condition.includes('rain') && (suitability.includes('rainy') || suitability.includes('all weather'))) return true;
      if (condition.includes('wind') && (suitability.includes('windy') || suitability.includes('all weather'))) return true;
      
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

    return outfit.map(item => 
      `Your ${item.color ? item.color.toLowerCase() + ' ' : ''}${item.name.toLowerCase()}`
    ).join(', ');
  };

  const handleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const displayTemp = isCelsius 
        ? `${Math.round(weather.temperature)} degrees Celsius`
        : `${Math.round((weather.temperature * 9/5) + 32)} degrees Fahrenheit`;
      
      const genericOutfit = generateGenericOutfit();
      const text = `Current weather in ${weather.city}: ${displayTemp}, ${weather.condition}. ${genericOutfit}`;
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const wardrobeOutfit = generateWardrobeOutfit();

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Shirt className="w-6 h-6 text-blue-500" />
            {t('outfitRecommendation')}
          </h3>
          {onManageWardrobe && (
            <button
              onClick={onManageWardrobe}
              className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
            >
              {t('manageWardrobe')}
            </button>
          )}
        </div>

        {/* Generic Outfit Recommendation */}
        <div className="space-y-4 mb-4">
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              {t('generalSuggestion')}
            </h4>
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
              {generateGenericOutfit()}
            </p>
          </div>

          {/* MyWardrobe Outfit Recommendation */}
          {wardrobeOutfit ? (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <Shirt className="w-4 h-4 text-purple-500" />
                {t('fromWardrobe')}
              </h4>
              <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                {wardrobeOutfit}
              </p>
            </div>
          ) : wardrobeItems.length > 0 ? (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                {t('noSuitableItems')}
              </p>
            </div>
          ) : null}
        </div>

        <div>
          <button
            onClick={handleSpeech}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
              isSpeaking
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-5 h-5" />
                Stop Speaking
              </>
            ) : (
              <>
                <Volume2 className="w-5 h-5" />
                {t('speakRecommendation')}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutfitRecommendation;