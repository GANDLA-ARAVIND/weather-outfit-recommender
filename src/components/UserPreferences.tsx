import React, { useState, useEffect } from 'react';
import { Settings, X, Save, Shirt, Palette, Globe } from 'lucide-react';

interface UserPreferencesProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: any;
  onSave: (preferences: any) => void;
}

const UserPreferences: React.FC<UserPreferencesProps> = ({
  isOpen,
  onClose,
  preferences,
  onSave
}) => {
  const [localPrefs, setLocalPrefs] = useState(preferences);

  useEffect(() => {
    setLocalPrefs(preferences);
  }, [preferences]);

  const handleSave = () => {
    onSave(localPrefs);
    onClose();
  };

  const clothingStyles = [
    { id: 'casual', label: 'Casual', description: 'Comfortable everyday wear' },
    { id: 'formal', label: 'Formal', description: 'Business and professional attire' },
    { id: 'athletic', label: 'Athletic', description: 'Sportswear and activewear' },
    { id: 'trendy', label: 'Trendy', description: 'Fashion-forward styles' },
    { id: 'minimalist', label: 'Minimalist', description: 'Simple, clean aesthetics' }
  ];

  const themes = [
    { id: 'default', label: 'Default', colors: 'bg-blue-500' },
    { id: 'vibrant', label: 'Vibrant', colors: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'nature', label: 'Nature', colors: 'bg-gradient-to-r from-green-500 to-teal-500' },
    { id: 'sunset', label: 'Sunset', colors: 'bg-gradient-to-r from-orange-500 to-red-500' },
    { id: 'minimal', label: 'Minimal', colors: 'bg-gray-500' }
  ];

  const languages = [
    { id: 'en', label: 'English', flag: '🇺🇸' },
    { id: 'es', label: 'Español', flag: '🇪🇸' },
    { id: 'fr', label: 'Français', flag: '🇫🇷' },
    { id: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { id: 'it', label: 'Italiano', flag: '🇮🇹' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-500" />
            Preferences
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Clothing Style Preferences */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Shirt className="w-5 h-5 text-blue-500" />
              Clothing Style
            </h3>
            <div className="space-y-2">
              {clothingStyles.map((style) => (
                <label key={style.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localPrefs.clothingStyles?.includes(style.id) || false}
                    onChange={(e) => {
                      const styles = localPrefs.clothingStyles || [];
                      if (e.target.checked) {
                        setLocalPrefs({
                          ...localPrefs,
                          clothingStyles: [...styles, style.id]
                        });
                      } else {
                        setLocalPrefs({
                          ...localPrefs,
                          clothingStyles: styles.filter((s: string) => s !== style.id)
                        });
                      }
                    }}
                    className="mt-1 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{style.label}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{style.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Theme Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Palette className="w-5 h-5 text-blue-500" />
              Theme
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {themes.map((theme) => (
                <label key={theme.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value={theme.id}
                    checked={localPrefs.theme === theme.id}
                    onChange={(e) => setLocalPrefs({ ...localPrefs, theme: e.target.value })}
                    className="sr-only"
                  />
                  <div className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    localPrefs.theme === theme.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                  }`}>
                    <div className={`w-full h-8 rounded-lg mb-2 ${theme.colors}`}></div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white text-center">
                      {theme.label}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Language Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-500" />
              Language
            </h3>
            <div className="space-y-2">
              {languages.map((lang) => (
                <label key={lang.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name="language"
                    value={lang.id}
                    checked={localPrefs.language === lang.id}
                    onChange={(e) => setLocalPrefs({ ...localPrefs, language: e.target.value })}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-xl">{lang.flag}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{lang.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Wardrobe Items */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              My Wardrobe
            </h3>
            <textarea
              value={localPrefs.wardrobeItems || ''}
              onChange={(e) => setLocalPrefs({ ...localPrefs, wardrobeItems: e.target.value })}
              placeholder="List your clothing items (e.g., red jacket, black sneakers, blue jeans...)"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Add your clothing items to get personalized outfit suggestions
            </p>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 rounded-b-2xl">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-200"
            >
              <Save className="w-5 h-5" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreferences;