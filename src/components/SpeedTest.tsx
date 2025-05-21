import { motion } from 'framer-motion';
import { Download, Loader2, Play, RefreshCw, Upload, Wifi } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { playClickSound } from '../utils/sound-utils';
import SpeedDetails from './SpeedDetails';
import SpeedGauge from './SpeedGauge';

const SpeedTest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [pingTime, setPingTime] = useState(0);
  const [hasTestedOnce, setHasTestedOnce] = useState(false);

  const runSpeedTest = async () => {
    if (isLoading) return;

    // Play sound when test starts
    if (hasTestedOnce) {
      playClickSound();
    }

    setIsLoading(true);
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setPingTime(0);

    // Simulate ping test
    await new Promise(resolve => setTimeout(resolve, 800));
    setPingTime(Math.floor(Math.random() * 80) + 10); // Random ping between 10-90ms

    // Simulate download speed test
    let progress = 0;
    const downloadInterval = setInterval(() => {
      progress += Math.random() * 5;
      if (progress >= 100) {
        clearInterval(downloadInterval);
        // Random download speed between 5-150 Mbps
        const finalSpeed = Math.floor(Math.random() * 145) + 5;
        setDownloadSpeed(finalSpeed);
        simulateUploadTest();
      } else {
        setDownloadSpeed(Math.min(progress * 1.5, 150));
      }
    }, 200);

    const simulateUploadTest = () => {
      // Simulate upload speed test
      let uploadProgress = 0;
      const uploadInterval = setInterval(() => {
        uploadProgress += Math.random() * 4;
        if (uploadProgress >= 100) {
          clearInterval(uploadInterval);
          // Random upload speed between 2-50 Mbps
          const finalUploadSpeed = Math.floor(Math.random() * 48) + 2;
          setUploadSpeed(finalUploadSpeed);
          setIsLoading(false);
          setHasTestedOnce(true);
        } else {
          setUploadSpeed(Math.min(uploadProgress * 0.5, 50));
        }
      }, 200);
    };
  };

  // Get random initial values for demo purposes
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setDownloadSpeed(Math.floor(Math.random() * 145) + 5);
      setUploadSpeed(Math.floor(Math.random() * 48) + 2);
      setPingTime(Math.floor(Math.random() * 80) + 10);
      setHasTestedOnce(true);
    }
  }, []);

  return (
    <section id="test" className="py-8 md:py-16">
      <div className="container mx-auto">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Test Your <span className="text-accent-500 glow-text">Network Speed</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Measure your connection's performance and discover what online activities it can handle.
          </p>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-6 md:p-10">
            <div className="flex flex-col items-center">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <SpeedGauge
                  value={downloadSpeed}
                  max={150}
                  label="DOWNLOAD"
                  color="#0ea5e9"
                  unit="Mbps"
                />
                <SpeedGauge
                  value={uploadSpeed}
                  max={50}
                  label="UPLOAD"
                  color="#14b8a6"
                  unit="Mbps"
                />
                <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <Wifi size={32} className="text-primary-500 mb-2" />
                  <p className="text-sm font-cyber text-gray-500 dark:text-gray-400">PING</p>
                  <p className="text-3xl font-bold text-primary-600 dark:text-primary-500">
                    {pingTime}
                    <span className="text-sm ml-1 mb-1 text-gray-500 dark:text-gray-400">ms</span>
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 w-full text-center">
                    <div className="flex gap-4 justify-center">
                      <div className="flex items-center">
                        <Download size={16} className="text-primary-500 mr-1" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{downloadSpeed.toFixed(1)} Mbps</span>
                      </div>
                      <div className="flex items-center">
                        <Upload size={16} className="text-accent-500 mr-1" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{uploadSpeed.toFixed(1)} Mbps</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.button
                className="cyber-btn group mb-8"
                onClick={runSpeedTest}
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    TESTING...
                  </span>
                ) : hasTestedOnce ? (
                  <span className="flex items-center">
                    <RefreshCw size={16} className="mr-2 group-hover:rotate-180 transition-transform duration-500" />
                    TEST AGAIN
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Play size={16} className="mr-2" />
                    START TEST
                  </span>
                )}
              </motion.button>

              {hasTestedOnce && (
                <SpeedDetails
                  downloadSpeed={downloadSpeed}
                  uploadSpeed={uploadSpeed}
                  pingTime={pingTime}
                />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpeedTest;
