import { useState } from 'react';

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
}

interface ForecastDay {
  date: string;
  temperature: { min: number; max: number };
  condition: string;
  humidity: number;
  windSpeed: number;
}

interface WeatherAlert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL;

export const useWeatherAPI = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (city: string) => {
    if (!API_KEY) {
      setError('API key not configured. Please check your environment variables.');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      
      if (!weatherResponse.ok) {
        if (weatherResponse.status === 404) {
          throw new Error('City not found. Please check the spelling and try again.');
        } else if (weatherResponse.status === 401) {
          throw new Error('Invalid API key. Please check your configuration.');
        } else {
          throw new Error(`Weather service error: ${weatherResponse.status}`);
        }
      }
      
      const weatherData = await weatherResponse.json();
      
      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      
      if (!forecastResponse.ok) {
        throw new Error('Failed to fetch forecast data');
      }
      
      const forecastData = await forecastResponse.json();
      
      // Process current weather
      const processedWeather: WeatherData = {
        city: weatherData.name,
        country: weatherData.sys.country,
        temperature: Math.round(weatherData.main.temp),
        condition: weatherData.weather[0].main,
        humidity: weatherData.main.humidity,
        windSpeed: Math.round(weatherData.wind.speed * 3.6), // Convert m/s to km/h
        visibility: weatherData.visibility ? Math.round(weatherData.visibility / 1000) : 10 // Convert m to km
      };
      
      // Process 5-day forecast (take one reading per day at noon)
      const processedForecast: ForecastDay[] = [];
      const dailyData: { [key: string]: any } = {};
      
      forecastData.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();
        
        if (!dailyData[dateKey]) {
          dailyData[dateKey] = {
            temps: [],
            conditions: [],
            humidity: [],
            windSpeed: [],
            date: item.dt_txt
          };
        }
        
        dailyData[dateKey].temps.push(item.main.temp);
        dailyData[dateKey].conditions.push(item.weather[0].main);
        dailyData[dateKey].humidity.push(item.main.humidity);
        dailyData[dateKey].windSpeed.push(item.wind.speed * 3.6);
      });
      
      Object.values(dailyData).slice(0, 5).forEach((day: any) => {
        processedForecast.push({
          date: day.date,
          temperature: {
            min: Math.round(Math.min(...day.temps)),
            max: Math.round(Math.max(...day.temps))
          },
          condition: day.conditions[0], // Take first condition of the day
          humidity: Math.round(day.humidity.reduce((a: number, b: number) => a + b, 0) / day.humidity.length),
          windSpeed: Math.round(day.windSpeed.reduce((a: number, b: number) => a + b, 0) / day.windSpeed.length)
        });
      });

      // Generate weather alerts based on conditions
      const generatedAlerts: WeatherAlert[] = [];
      
      if (processedWeather.windSpeed > 50) {
        generatedAlerts.push({
          id: '1',
          title: 'High Wind Warning',
          description: `Strong winds expected with speeds up to ${processedWeather.windSpeed} km/h. Secure loose objects.`,
          severity: 'medium'
        });
      }
      
      if (processedWeather.temperature > 35) {
        generatedAlerts.push({
          id: '2',
          title: 'Heat Advisory',
          description: 'Extremely high temperatures. Stay hydrated and avoid prolonged sun exposure.',
          severity: 'high'
        });
      }
      
      if (processedWeather.temperature < -10) {
        generatedAlerts.push({
          id: '3',
          title: 'Cold Weather Warning',
          description: 'Extremely cold temperatures. Dress warmly and limit outdoor exposure.',
          severity: 'high'
        });
      }

      setWeather(processedWeather);
      setForecast(processedForecast);
      setAlerts(generatedAlerts);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data. Please try again.';
      setError(errorMessage);
      console.error('Weather API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherByLocation = async (lat: number, lon: number) => {
    if (!API_KEY) {
      setError('API key not configured. Please check your environment variables.');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Fetch current weather by coordinates
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      
      if (!weatherResponse.ok) {
        if (weatherResponse.status === 401) {
          throw new Error('Invalid API key. Please check your configuration.');
        } else {
          throw new Error(`Weather service error: ${weatherResponse.status}`);
        }
      }
      
      const weatherData = await weatherResponse.json();
      
      // Fetch 5-day forecast by coordinates
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      
      if (!forecastResponse.ok) {
        throw new Error('Failed to fetch forecast data');
      }
      
      const forecastData = await forecastResponse.json();
      
      // Process the data (same as above)
      const processedWeather: WeatherData = {
        city: weatherData.name || 'Current Location',
        country: weatherData.sys.country || 'Your Area',
        temperature: Math.round(weatherData.main.temp),
        condition: weatherData.weather[0].main,
        humidity: weatherData.main.humidity,
        windSpeed: Math.round(weatherData.wind.speed * 3.6),
        visibility: weatherData.visibility ? Math.round(weatherData.visibility / 1000) : 10
      };
      
      // Process forecast (same logic as above)
      const processedForecast: ForecastDay[] = [];
      const dailyData: { [key: string]: any } = {};
      
      forecastData.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();
        
        if (!dailyData[dateKey]) {
          dailyData[dateKey] = {
            temps: [],
            conditions: [],
            humidity: [],
            windSpeed: [],
            date: item.dt_txt
          };
        }
        
        dailyData[dateKey].temps.push(item.main.temp);
        dailyData[dateKey].conditions.push(item.weather[0].main);
        dailyData[dateKey].humidity.push(item.main.humidity);
        dailyData[dateKey].windSpeed.push(item.wind.speed * 3.6);
      });
      
      Object.values(dailyData).slice(0, 5).forEach((day: any) => {
        processedForecast.push({
          date: day.date,
          temperature: {
            min: Math.round(Math.min(...day.temps)),
            max: Math.round(Math.max(...day.temps))
          },
          condition: day.conditions[0],
          humidity: Math.round(day.humidity.reduce((a: number, b: number) => a + b, 0) / day.humidity.length),
          windSpeed: Math.round(day.windSpeed.reduce((a: number, b: number) => a + b, 0) / day.windSpeed.length)
        });
      });

      setWeather(processedWeather);
      setForecast(processedForecast);
      setAlerts([]);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data for your location.';
      setError(errorMessage);
      console.error('Weather API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  return {
    weather,
    forecast,
    alerts,
    isLoading,
    error,
    fetchWeather,
    fetchWeatherByLocation,
    dismissAlert
  };
};