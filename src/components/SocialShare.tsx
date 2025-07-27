import React, { useState } from 'react';
import { Share2, Twitter, Facebook, Copy, Check } from 'lucide-react';

interface SocialShareProps {
  weather: any;
  outfit: string;
  isCelsius: boolean;
}

const SocialShare: React.FC<SocialShareProps> = ({ weather, outfit, isCelsius }) => {
  const [copied, setCopied] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const displayTemp = isCelsius 
    ? `${Math.round(weather.temperature)}°C`
    : `${Math.round((weather.temperature * 9/5) + 32)}°F`;

  const shareText = `Weather in ${weather.city}: ${displayTemp}, ${weather.condition}. ${outfit} #SmartWeather #OutfitRecommendation`;
  const shareUrl = window.location.href;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Smart Weather + Outfit Recommendation',
          text: shareText,
          url: shareUrl
        });
      } catch (error) {
        console.log('Error sharing:', error);
        setShowOptions(true);
      }
    } else {
      setShowOptions(true);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log('Error copying:', error);
    }
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
  };

  return (
    <div className="relative">
      <button
        onClick={handleNativeShare}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
      >
        <Share2 className="w-4 h-4" />
        Share Weather
      </button>

      {showOptions && (
        <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 min-w-[200px] z-10">
          <div className="space-y-1">
            <button
              onClick={handleTwitterShare}
              className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <Twitter className="w-4 h-4 text-blue-400" />
              <span className="text-gray-900 dark:text-white">Share on Twitter</span>
            </button>
            
            <button
              onClick={handleFacebookShare}
              className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <Facebook className="w-4 h-4 text-blue-600" />
              <span className="text-gray-900 dark:text-white">Share on Facebook</span>
            </button>
            
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-500" />
              )}
              <span className="text-gray-900 dark:text-white">
                {copied ? 'Copied!' : 'Copy Link'}
              </span>
            </button>
          </div>
          
          <button
            onClick={() => setShowOptions(false)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default SocialShare;