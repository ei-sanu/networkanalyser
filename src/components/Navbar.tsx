import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.header
      className={`py-4 px-6 transition-all duration-300 sticky top-0 z-30 ${isScrolled ? 'bg-white/90 dark:bg-cyberpunk-dark/90 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Logo size="sm" animated={false} />
          <span className="font-cyber font-bold text-xl">NETANALYSER</span>
        </div>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-cyber text-sm hover:text-accent-500 transition-colors">HOME</Link>
          {/* <Link to="/#test" className="font-cyber text-sm hover:text-accent-500 transition-colors">TEST SPEED</Link> */}
          <Link to="/about" className="font-cyber text-sm hover:text-accent-500 transition-colors">ABOUT</Link>
          <ThemeToggle />
        </nav>

        {/* Mobile menu button */}
        <div className="flex gap-4 items-center md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700 dark:text-gray-300 hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="container mx-auto py-4 flex flex-col gap-4">
              <Link
                to="/"
                className="font-cyber text-sm py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                HOME
              </Link>
              <Link
                to="/#test"
                className="font-cyber text-sm py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                TEST SPEED
              </Link>
              <Link
                to="/about"
                className="font-cyber text-sm py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                ABOUT
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
