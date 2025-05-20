import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ animated = false, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
  };

  if (animated) {
    return (
      <motion.div
        className={`font-cyber font-bold ${sizeClasses[size]} text-accent-400 glow-text flex items-center justify-center`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          duration: 0.6
        }}
      >
        <motion.span
          animate={{ 
            x: [0, -2, 2, -1, 0],
            y: [0, 1, -1, 0]
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            repeatDelay: 2
          }}
          className="inline-block relative mr-1"
        >
          N
        </motion.span>
        <motion.span
          animate={{ 
            x: [0, 2, -2, 1, 0],
            y: [0, -1, 1, 0]
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            repeatDelay: 2.2,
            delay: 0.1
          }}
          className="inline-block relative"
        >
          A
        </motion.span>
      </motion.div>
    );
  }

  return (
    <div className={`font-cyber font-bold ${sizeClasses[size]} text-accent-400 glow-text`}>
      <span>N</span>
      <span>A</span>
    </div>
  );
};

export default Logo;