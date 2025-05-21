import { motion } from 'framer-motion';
import { AlertTriangle, Check, Clipboard, Computer, Film, Gamepad, Globe, MapPin, Smartphone, Video, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getNetworkInfo } from '../utils/network-utils';
import { getRecommendations } from '../utils/speed-utils';

const playSuccessSound = () => {
  const audio = new Audio('/sounds/success2.mp3');
  audio.volume = 0.5; // Set volume to 50%
  audio.play().catch(err => console.error('Error playing sound:', err));
};

interface SpeedDetailsProps {
  downloadSpeed: number;
  uploadSpeed: number;
  pingTime: number;
}

const GOOGLE_SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbyL4Gt01t4ZhjCW27vdq1pQdN9HNl97NIH3PPWyxU61UrC3Qf3GiOjABzKbK5GIjVhh/exec';

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

  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const fetchNetworkInfo = async () => {
      const info = await getNetworkInfo();
      setNetworkInfo(info);
    };

    fetchNetworkInfo();
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscriptionStatus('loading');

    try {
      // Create URL with parameters instead of JSON body
      const url = new URL(GOOGLE_SHEET_API_URL);
      url.searchParams.append('email', email.trim());

      const response = await fetch(url.toString(), {
        method: 'POST',
        mode: 'no-cors' // Keep this for CORS handling
      });

      setSubscriptionStatus('success');
      setEmail('');
      // Play success sound after successful subscription
      playSuccessSound();
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubscriptionStatus('error');
    }
  };

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

      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-col items-center">
        <h4 className="font-cyber text-lg mb-6 text-center">Stay Updated with Latest Tech Trends </h4>
        <form onSubmit={handleNewsletterSubmit} className="w-full max-w-md">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-accent-500 focus:border-accent-500
                       w-full"
              required
              disabled={subscriptionStatus === 'loading'}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Please enter a valid email address"
            />
            <button
              type="submit"
              disabled={subscriptionStatus === 'loading'}
              className="px-6 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-md
                       font-medium transition-colors disabled:opacity-50
                       w-full sm:w-auto whitespace-nowrap"
            >
              {subscriptionStatus === 'loading' ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Subscribing...
                </span>
              ) : 'Subscribe for Updates'}
            </button>
          </div>
          <div className="mt-3 text-center">
            {subscriptionStatus === 'success' && (
              <p className="text-sm text-green-600 dark:text-green-400 flex items-center justify-center">
                <Check size={16} className="mr-2" />
                Successfully subscribed! Thank you for joining.
              </p>
            )}
            {subscriptionStatus === 'error' && (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center justify-center">
                <AlertTriangle size={16} className="mr-2" />
                Unable to subscribe. Please try again later.
              </p>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default SpeedDetails;
