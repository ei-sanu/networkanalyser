import React, { useEffect, useState } from 'react';
import Logo from './Logo';

const Loader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + Math.random() * 15;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="w-32 h-32 relative">
          <Logo animated />
        </div>
        <div className="text-center">
          <h2 className="font-cyber text-accent-400 text-2xl mb-2 glitch" data-text="SYSTEM BOOTING">
            SYSTEM BOOTING
          </h2>
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent-500"
              style={{ width: `${progress}%`, transition: 'width 0.2s ease-out' }}
            />
          </div>
          <p className="text-gray-400 mt-2 font-cyber text-sm">
            {progress.toFixed(0)}% - INITIALIZING NETWORK ANALYSIS...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;