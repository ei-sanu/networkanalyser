import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

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
              <a href="https://x.com/SomeshR82674271" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent-500 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://github.com/ei-sanu" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent-500 transition-colors">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/somesh-biswal-b73576320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent-500 transition-colors">
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
            <h3 className="font-cyber text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Phone size={16} className="mr-2" />
                <a
                  href="tel:+917008450074"
                  className="hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
                >
                  +91 7008450074
                </a>
              </li>
              <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Mail size={16} className="mr-2" />
                <a
                  href="mailto:someshranjanbiswal13678@gmail.com"
                  className="hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
                >
                  someshranjanbiswal13678@gmail.com
                </a>
              </li>
              <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                <MapPin size={21} className="mr-2 mt-1" />
                <div>
                  <address className="not-italic mb-4">
                    Radha Krushna Bazar, Dhenkanal<br />
                    Odisha 759001<br />
                    India
                  </address>
                  <div className="rounded-lg overflow-hidden shadow-lg mt-2 w-full">

                  </div>
                </div>
              </li>
            </ul>
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
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
