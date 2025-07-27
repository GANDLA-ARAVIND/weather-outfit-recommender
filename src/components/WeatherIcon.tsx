import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Cloudy } from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  size?: number;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, size = 64 }) => {
  const getIcon = () => {
    const normalizedCondition = condition.toLowerCase();
    
    if (normalizedCondition.includes('sun') || normalizedCondition.includes('clear')) {
      return <Sun className={`w-16 h-16 text-yellow-500 animate-pulse`} />;
    }
    if (normalizedCondition.includes('rain') || normalizedCondition.includes('drizzle')) {
      return <CloudRain className={`w-16 h-16 text-blue-500 animate-bounce`} />;
    }
    if (normalizedCondition.includes('snow')) {
      return <CloudSnow className={`w-16 h-16 text-gray-300 animate-pulse`} />;
    }
    if (normalizedCondition.includes('storm') || normalizedCondition.includes('thunder')) {
      return <CloudLightning className={`w-16 h-16 text-purple-500 animate-bounce`} />;
    }
    if (normalizedCondition.includes('cloud')) {
      return <Cloudy className={`w-16 h-16 text-gray-500 animate-float`} />;
    }
    
    return <Cloud className={`w-16 h-16 text-gray-400 animate-float`} />;
  };

  return (
    <div className="flex items-center justify-center">
      {getIcon()}
    </div>
  );
};

export default WeatherIcon;