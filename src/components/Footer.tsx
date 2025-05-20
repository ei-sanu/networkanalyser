import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-12 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <Logo size="sm" />
              <span className="ml-2 font-cyber text-lg">NETANALYSER</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Providing accurate network speed analysis and recommendations since 2025.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent-500 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent-500 transition-colors">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent-500 transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <Link to="/contact" className="text-gray-500 hover:text-accent-500 transition-colors">
                <Mail size={20} />
                <span className="sr-only">Contact</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-cyber text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-accent-500 dark:hover:text-accent-400 transition-colors text-sm">
                  Speed Test
                </Link>
              </li>
              <li>
                <Link to="/guide" className="text-gray-600 dark:text-gray-400 hover:text-accent-500 dark:hover:text-accent-400 transition-colors text-sm">
                  Network Guide
                </Link>
              </li>
              <li>
                <Link to="/troubleshoot" className="text-gray-600 dark:text-gray-400 hover:text-accent-500 dark:hover:text-accent-400 transition-colors text-sm">
                  Troubleshooting
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-gray-600 dark:text-gray-400 hover:text-accent-500 dark:hover:text-accent-400 transition-colors text-sm">
                  Network Tools
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-cyber text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-accent-500 dark:hover:text-accent-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-accent-500 dark:hover:text-accent-400 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-accent-500 dark:hover:text-accent-400 transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-accent-500 dark:hover:text-accent-400 transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-cyber text-lg mb-4">Stay Connected</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and tips.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 text-sm rounded-l-md focus:outline-none focus:ring-1 focus:ring-accent-500 border border-gray-300 dark:border-gray-700"
              />
              <button
                type="submit"
                className="bg-accent-500 text-white px-4 py-2 rounded-r-md text-sm hover:bg-accent-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <motion.div
          className="border-t border-gray-200 dark:border-gray-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
            © 2025 NetAnalyser. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="https://www.somesh.social/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-accent-500 dark:hover:text-accent-400 transition-colors">
              Made with ❤️ by somesh.social
            </Link>
            {/* <Link to="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-accent-500 dark:hover:text-accent-400 transition-colors">
              Terms
            </Link>
            <Link to="/cookies" className="text-sm text-gray-500 dark:text-gray-400 hover:text-accent-500 dark:hover:text-accent-400 transition-colors">
              Cookies
            </Link> */}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
