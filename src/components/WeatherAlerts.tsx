import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface WeatherAlert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
  onDismiss: (alertId: string) => void;
}

const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ alerts, onDismiss }) => {
  if (alerts.length === 0) return null;

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-800 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-300';
      default:
        return 'bg-blue-100 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-300';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-3 animate-fade-in">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`border rounded-xl p-4 ${getSeverityStyles(alert.severity)}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">{alert.title}</h4>
                <p className="text-sm opacity-90">{alert.description}</p>
              </div>
            </div>
            <button
              onClick={() => onDismiss(alert.id)}
              className="p-1 hover:bg-black/10 rounded-lg transition-colors duration-200"
              aria-label="Dismiss alert"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherAlerts;