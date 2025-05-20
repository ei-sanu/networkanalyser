import { motion } from 'framer-motion';
import { AlertTriangle, Check, Clipboard, Computer, Film, Gamepad, Globe, MapPin, Smartphone, Video, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getNetworkInfo } from '../utils/network-utils';
import { getRecommendations } from '../utils/speed-utils';

interface SpeedDetailsProps {
  downloadSpeed: number;
  uploadSpeed: number;
  pingTime: number;
}

const SpeedDetails: React.FC<SpeedDetailsProps> = ({
  downloadSpeed,
  uploadSpeed,
  pingTime
}) => {
  const recommendations = getRecommendations(downloadSpeed, uploadSpeed, pingTime);

  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
    provider: 'Unknown',
    location: { city: 'Unknown', country: 'Unknown' }
  });

  useEffect(() => {
    const fetchNetworkInfo = async () => {
      const info = await getNetworkInfo();
      setNetworkInfo(info);
    };

    fetchNetworkInfo();
  }, []);

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-wrap gap-4 items-center justify-center">
        <div className="flex items-center space-x-2">
          <Globe size={20} className="text-accent-400" />
          <span className="text-sm">Provider: <span className="font-medium">{networkInfo.provider}</span></span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin size={20} className="text-accent-400" />
          <span className="text-sm">Location: <span className="font-medium">{networkInfo.location.city}, {networkInfo.location.country}</span></span>
        </div>
      </div>

      <h3 className="text-xl font-cyber mb-4 text-center">
        Connection <span className="text-accent-500">Analysis</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="cyberpunk-card p-5">
          <h4 className="font-cyber text-lg mb-3 flex items-center">
            <Gamepad size={20} className="mr-2 text-accent-400" />
            Gaming
          </h4>
          <ul className="space-y-2">
            {recommendations.gaming.map((item, index) => (
              <li key={index} className="flex items-start">
                {item.suitable ? (
                  <Check size={16} className="text-green-500 mr-2 mt-1 shrink-0" />
                ) : (
                  <X size={16} className="text-red-500 mr-2 mt-1 shrink-0" />
                )}
                <span className="text-sm">{item.activity}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="cyberpunk-card p-5">
          <h4 className="font-cyber text-lg mb-3 flex items-center">
            <Film size={20} className="mr-2 text-accent-400" />
            Streaming
          </h4>
          <ul className="space-y-2">
            {recommendations.streaming.map((item, index) => (
              <li key={index} className="flex items-start">
                {item.suitable ? (
                  <Check size={16} className="text-green-500 mr-2 mt-1 shrink-0" />
                ) : item.marginal ? (
                  <AlertTriangle size={16} className="text-yellow-500 mr-2 mt-1 shrink-0" />
                ) : (
                  <X size={16} className="text-red-500 mr-2 mt-1 shrink-0" />
                )}
                <span className="text-sm">{item.activity}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="cyberpunk-card p-5">
          <h4 className="font-cyber text-lg mb-3 flex items-center">
            <Clipboard size={20} className="mr-2 text-accent-400" />
            Productivity
          </h4>
          <ul className="space-y-2">
            {recommendations.productivity.map((item, index) => (
              <li key={index} className="flex items-start">
                {item.suitable ? (
                  <Check size={16} className="text-green-500 mr-2 mt-1 shrink-0" />
                ) : item.marginal ? (
                  <AlertTriangle size={16} className="text-yellow-500 mr-2 mt-1 shrink-0" />
                ) : (
                  <X size={16} className="text-red-500 mr-2 mt-1 shrink-0" />
                )}
                <span className="text-sm">{item.activity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h4 className="font-cyber text-lg mb-4">Speed Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-full">
              <Computer size={24} className="text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Desktop/Laptop</p>
              <p className="font-medium">{recommendations.deviceSuitability.desktop}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-accent-100 dark:bg-accent-900 p-3 rounded-full">
              <Smartphone size={24} className="text-accent-600 dark:text-accent-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Mobile Devices</p>
              <p className="font-medium">{recommendations.deviceSuitability.mobile}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-secondary-100 dark:bg-secondary-900 p-3 rounded-full">
              <Video size={24} className="text-secondary-600 dark:text-secondary-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Video Calls</p>
              <p className="font-medium">{recommendations.deviceSuitability.videoCalls}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {recommendations.summary}
          </p>
          <button
            className="mt-4 inline-flex items-center text-sm font-medium text-accent-500 hover:text-accent-600 dark:text-accent-400 dark:hover:text-accent-300"
            onClick={() => document.querySelector('button[aria-label="Open chat with Aura"]')?.dispatchEvent(new MouseEvent('click'))}
          >
            Get personalized recommendations from Aura
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SpeedDetails;
