import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      onClick={toggleTheme}
      className="relative overflow-hidden rounded-full w-12 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-800 p-1"
      whileTap={{ scale: 0.95 }}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div 
        className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white dark:bg-accent-500 shadow-md"
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        animate={{ x: theme === 'dark' ? 24 : 0 }}
      />
      <div className="flex items-center justify-between w-full">
        <Sun size={12} className="text-primary-600" />
        <Moon size={12} className="text-gray-100" />
      </div>
    </motion.button>
  );
};

export default ThemeToggle;