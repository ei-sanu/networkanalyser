import React from 'react';
import { motion } from 'framer-motion';

interface SpeedGaugeProps {
  value: number;
  max: number;
  size?: number;
  label: string;
  color: string;
  unit: string;
}

const SpeedGauge: React.FC<SpeedGaugeProps> = ({ 
  value, 
  max, 
  size = 220, 
  label, 
  color,
  unit
}) => {
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const valuePercent = Math.min(value, max) / max;
  const dashOffset = circumference * (1 - valuePercent);
  
  return (
    <div className="flex flex-col items-center">
      <div className="speed-gauge-container" style={{ width: size, height: size }}>
        <svg className="speed-gauge" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            className="speed-gauge-bg"
            cx={size / 2}
            cy={size / 2}
            r={radius}
          />
          <motion.circle
            className="speed-gauge-value"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            style={{ 
              strokeDasharray: circumference, 
              strokeDashoffset: dashOffset,
              stroke: color
            }}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-cyber text-gray-500 dark:text-gray-400">{label}</p>
            <div className="flex items-end justify-center">
              <motion.p 
                className="text-3xl font-bold" 
                style={{ color }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {value.toFixed(1)}
              </motion.p>
              <motion.span 
                className="text-sm ml-1 mb-1 text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {unit}
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SpeedGauge;