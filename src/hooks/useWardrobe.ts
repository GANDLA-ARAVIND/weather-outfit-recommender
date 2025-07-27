import { useState, useEffect } from 'react';

export interface WardrobeItem {
  id: string;
  name: string;
  type: string;
  color: string;
  category: string;
  weatherSuitability?: string;
}

export const useWardrobe = () => {
  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>([]);

  useEffect(() => {
    loadWardrobeItems();
  }, []);

  const loadWardrobeItems = () => {
    const saved = localStorage.getItem('wardrobeItems');
    if (saved) {
      try {
        const items = JSON.parse(saved);
        setWardrobeItems(items);
      } catch (error) {
        console.error('Error loading wardrobe items:', error);
      }
    }
  };

  const updateWardrobeItems = (items: WardrobeItem[]) => {
    setWardrobeItems(items);
  };

  const getWardrobeForWeather = (temperature: number, condition: string) => {
    const weatherCondition = condition.toLowerCase();
    
    return wardrobeItems.filter(item => {
      if (!item.weatherSuitability) return true;
      
      const suitability = item.weatherSuitability.toLowerCase();
      
      // Temperature-based filtering
      if (temperature <= 5 && (suitability.includes('cold') || suitability.includes('all weather'))) return true;
      if (temperature > 5 && temperature <= 15 && (suitability.includes('cool') || suitability.includes('all weather'))) return true;
      if (temperature > 15 && temperature <= 25 && (suitability.includes('warm') || suitability.includes('all weather'))) return true;
      if (temperature > 25 && (suitability.includes('hot') || suitability.includes('all weather'))) return true;
      
      // Condition-based filtering
      if (weatherCondition.includes('rain') && (suitability.includes('rainy') || suitability.includes('all weather'))) return true;
      if (weatherCondition.includes('wind') && (suitability.includes('windy') || suitability.includes('all weather'))) return true;
      
      return false;
    });
  };

  const generateWardrobeOutfit = (temperature: number, condition: string) => {
    const suitableItems = getWardrobeForWeather(temperature, condition);
    
    if (suitableItems.length === 0) {
      return null;
    }

    const categories = {
      top: suitableItems.filter(item => item.category === 'Top'),
      bottom: suitableItems.filter(item => item.category === 'Bottom'),
      outerwear: suitableItems.filter(item => item.category === 'Outerwear'),
      footwear: suitableItems.filter(item => item.category === 'Footwear'),
      accessories: suitableItems.filter(item => item.category === 'Accessories')
    };

    const outfit = [];
    
    // Select one item from each category if available
    if (categories.top.length > 0) {
      const randomTop = categories.top[Math.floor(Math.random() * categories.top.length)];
      outfit.push(`Your ${randomTop.color ? randomTop.color.toLowerCase() + ' ' : ''}${randomTop.name.toLowerCase()}`);
    }
    
    if (categories.bottom.length > 0) {
      const randomBottom = categories.bottom[Math.floor(Math.random() * categories.bottom.length)];
      outfit.push(`your ${randomBottom.color ? randomBottom.color.toLowerCase() + ' ' : ''}${randomBottom.name.toLowerCase()}`);
    }
    
    // Add outerwear for cooler weather
    if (temperature <= 20 && categories.outerwear.length > 0) {
      const randomOuterwear = categories.outerwear[Math.floor(Math.random() * categories.outerwear.length)];
      outfit.push(`your ${randomOuterwear.color ? randomOuterwear.color.toLowerCase() + ' ' : ''}${randomOuterwear.name.toLowerCase()}`);
    }
    
    if (categories.footwear.length > 0) {
      const randomFootwear = categories.footwear[Math.floor(Math.random() * categories.footwear.length)];
      outfit.push(`your ${randomFootwear.color ? randomFootwear.color.toLowerCase() + ' ' : ''}${randomFootwear.name.toLowerCase()}`);
    }
    
    // Add accessories occasionally
    if (categories.accessories.length > 0 && Math.random() > 0.5) {
      const randomAccessory = categories.accessories[Math.floor(Math.random() * categories.accessories.length)];
      outfit.push(`your ${randomAccessory.color ? randomAccessory.color.toLowerCase() + ' ' : ''}${randomAccessory.name.toLowerCase()}`);
    }
    
    return outfit.length > 0 ? outfit.join(', ') : null;
  };

  return {
    wardrobeItems,
    updateWardrobeItems,
    getWardrobeForWeather,
    generateWardrobeOutfit,
    loadWardrobeItems
  };
};