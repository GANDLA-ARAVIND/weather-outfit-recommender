import React from 'react';
import { Activity } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface ActivitySuggestionsProps {
  weather: any;
  isCelsius: boolean;
}

const ActivitySuggestions: React.FC<ActivitySuggestionsProps> = ({ weather, isCelsius }) => {
  const { t } = useTranslation();

  const generateActivities = () => {
    const temp = weather.temperature;
    const condition = weather.condition.toLowerCase();
    
    let activities = [];
    
    if (condition.includes('rain')) {
      activities = [
        { name: 'Indoor Workout', icon: '🏋️' },
        { name: 'Museum Visit', icon: '🏛️' },
        { name: 'Coffee Shop Work', icon: '☕' },
        { name: 'Movie Theater', icon: '🎬' }
      ];
    } else if (temp >= 30) {
      activities = [
        { name: 'Outdoor Picnic', icon: '🧺' },
        { name: 'Swimming', icon: '🏊' },
        { name: 'Hiking', icon: '🥾' }
      ];
    } else if (temp >= 15) {
      activities = [
        { name: 'City Walking Tour', icon: '🚶' },
        { name: 'Outdoor Market', icon: '🛒' },
        { name: 'Photography Walk', icon: '📸' },
        { name: 'Bike Ride', icon: '🚴' }
      ];
    } else {
      activities = [
        { name: 'Hot Chocolate Café', icon: '☕' },
        { name: 'Indoor Shopping', icon: '🛍️' },
        { name: 'Cozy Reading', icon: '📚' }
      ];
    }
    
    return activities.slice(0, 3); // Show top 3 activities
  };

  const activities = generateActivities();

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Activity className="w-6 h-6 text-green-500" />
          {t('suggestedActivities')}
        </h3>

        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-xl border border-green-100 dark:border-gray-600"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{activity.icon}</span>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {activity.name}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-50 dark:bg-gray-700 rounded-xl">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            💡 <span className="font-medium">Tip:</span> {t('activitiesTip')} {weather.city}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivitySuggestions;