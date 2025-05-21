import { AnimatePresence, motion, useSpring } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import '../styles/SpeedGauge.css';

// Add this utility function at the top of the file, after imports
const getSpeedColor = (speed: number, type: 'upload' | 'download'): string => {
  if (type === 'download') {
    if (speed > 10) return '#22c55e'; // green
    if (speed > 5) return '#eab308';  // yellow
    if (speed > 2) return '#f97316';  // orange
    return '#ef4444';                 // red
  } else {
    if (speed > 5) return '#22c55e';  // green
    if (speed > 2) return '#f97316';  // orange
    return '#ef4444';                 // red
  }
};

interface SpeedGaugeProps {
  value: number;
  max: number;
  size?: number;
  label: string;
  unit: string;
  type: 'upload' | 'download'; // Add type prop to distinguish between upload and download
  onTestStart?: () => void; // Add onTestStart prop
}

const SpeedGauge: React.FC<SpeedGaugeProps> = ({
  value,
  max,
  size = 220,
  label,
  unit,
  type,
  onTestStart
}) => {
  const radius = size / 2 - 20;
  const circumference = 2 * Math.PI * radius;
  const [currentValue, setCurrentValue] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const hasPlayedSound = useRef(false);

  // Function to play sound
  const playSuccessSound = () => {
    const audio = new Audio('/sounds/success.mp3');
    audio.volume = 0.5; // Set volume to 50%
    audio.play().catch(err => console.error('Error playing sound:', err));
  };

  // Add this new useEffect
  useEffect(() => {
    if (onTestStart) {
      playSuccessSound();
    }
  }, [onTestStart]);

  // Get dynamic color based on current speed value
  const dynamicColor = getSpeedColor(currentValue, type);

  // Use springs for smooth animations
  const smoothValue = useSpring(0, {
    stiffness: type === 'download' ? 60 : 45,
    damping: type === 'download' ? 12 : 10,
    restSpeed: 0.1
  });

  // Update CSS variable when color changes
  useEffect(() => {
    document.documentElement.style.setProperty('--gauge-color', dynamicColor);
  }, [dynamicColor]);

  // Update spring value when input value changes
  useEffect(() => {
    const timeout = type === 'upload' ? setTimeout(() => {
      smoothValue.set(value);
    }, 500) : smoothValue.set(value);

    return () => {
      if (type === 'upload' && timeout) clearTimeout(timeout);
    };
  }, [value, smoothValue, type]);

  // Update current value from spring
  useEffect(() => {
    const unsubscribe = smoothValue.on("change", (latest) => {
      setCurrentValue(latest);
    });
    return () => unsubscribe();
  }, [smoothValue]);

  // Update the effect to handle sound and popup
  useEffect(() => {
    if (type === 'download' && currentValue > 50 && !hasPlayedSound.current) {
      hasPlayedSound.current = true;
      setShowPopup(true);
      playSuccessSound();

      // Hide popup after 5 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    } else if (currentValue <= 50) {
      hasPlayedSound.current = false;
    }
  }, [currentValue, type]);

  const valuePercent = Math.min(currentValue, max) / max;
  const dashOffset = circumference * (1 - valuePercent);
  const needleRotation = -90 + (valuePercent * 180);

  // Set unique IDs for gradients and filters
  const glowId = `glow-${type}`;

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: type === 'upload' ? 0.3 : 0 }}
    >
      <div
        className={`speed-gauge-container ${type}-gauge`}
        style={{
          width: size,
          height: size,
          boxShadow: `0 0 20px ${dynamicColor}40`
        }}
      >
        <svg className="speed-gauge" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <filter id={glowId}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background circle */}
          <circle
            className="speed-gauge-bg"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            style={{
              stroke: `${dynamicColor}20`
            }}
          />

          {/* Value circle */}
          <motion.circle
            className="speed-gauge-value"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: dashOffset,
              stroke: dynamicColor,
              filter: `url(#${glowId})`
            }}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: type === 'upload' ? 0.5 : 0
            }}
          />

          {/* Needle */}
          <motion.line
            x1={size / 2}
            y1={size / 2}
            x2={size / 2}
            y2={size / 2 - radius + 10}
            stroke={dynamicColor}
            strokeWidth="3"
            style={{
              transformOrigin: `${size / 2}px ${size / 2}px`,
              filter: `url(#${glowId})`
            }}
            initial={{ rotate: -90 }}
            animate={{ rotate: needleRotation }}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: type === 'upload' ? 0.5 : 0
            }}
          />

          {/* Center point */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r="8"
            fill={dynamicColor}
            style={{ filter: `url(#${glowId})` }}
          />
        </svg>

        {/* Labels */}
        <motion.div
          className="gauge-label"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: type === 'upload' ? 0.7 : 0.2
          }}
        >
          <motion.p className="text-sm font-cyber mb-2">
            {label}
          </motion.p>
          <motion.div
            className="gauge-value"
            style={{ color: dynamicColor }}
          >
            {currentValue.toFixed(1)}
            <span className="gauge-unit ml-1">{unit}</span>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 flex items-center space-x-3"
          >
            <div className="text-3xl">🎉</div>
            <div>
              <h3 className="font-bold text-lg">Congratulations! 🚀</h3>
              <p>Your internet is blazing fast! ({currentValue.toFixed(1)} Mbps)</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SpeedGauge;
