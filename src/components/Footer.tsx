import React from 'react';
import { Github } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface FooterProps {
  weather: any;
  outfit: string;
  isCelsius: boolean;
}

const Footer: React.FC<FooterProps> = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="w-full bg-white/90 dark:bg-gray-800/90 border-t border-gray-200 dark:border-gray-700 py-4 sm:py-6 mt-8">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <p className="text-sm xs:text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4">
          Developed by ARAVIND GANDLA
        </p>
        <div className="flex justify-center">
          <a
            href="https://github.com/GANDLA-ARAVIND"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors duration-200 group touch-target"
          >
            <Github className="w-5 h-5 text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200" />
            {t('github')}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;