import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface HeaderProps {
  theme: string;
}

const Header: React.FC<HeaderProps> = ({ theme }) => {
  const { t } = useTranslation();

  const themeClass = {
    vibrant: 'bg-purple-500/80 text-white border-purple-600',
    nature: 'bg-green-500/80 text-white border-green-600',
    sunset: 'bg-orange-500/80 text-white border-orange-600',
    minimal: 'bg-gray-500/80 text-white border-gray-600',
    default: 'bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700',
  }[theme] || 'bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700';

  return (
    <header className={`w-full ${themeClass} backdrop-blur-sm border-b transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-center">
        <h1 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold break-words text-center">
          {t('appTitle')}
        </h1>
      </div>
    </header>
  );
};

export default Header;