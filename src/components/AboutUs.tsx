import { motion } from 'framer-motion';
import React from 'react';
import Logo from './Logo';

const AboutUs: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-6 py-12 mb-20"
        >
            <div className="flex flex-col items-center mb-16">
                <Logo size="lg" animated={true} />
                <h1 className="text-4xl font-cyber mb-4 text-accent-500 mt-6">About NetAnalyser</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl">
                    Empowering users with precise network analytics and intelligent optimization solutions
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div className="space-y-6">
                    <h2 className="text-2xl font-cyber mb-4">Our Mission</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        NetAnalyser is dedicated to providing accurate and reliable network speed testing tools
                        for users worldwide. Our cutting-edge technology ensures precise measurements of your
                        internet connection's performance.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                        We believe in transparency and accuracy, providing you with real-time data that helps
                        you make informed decisions about your network connectivity.
                    </p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-cyber mb-4">What We Offer</h2>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-4">
                        <li className="flex flex-col space-y-1">
                            <span className="font-semibold">Real-time speed testing</span>
                            <span className="pl-5">Instant and accurate measurements of your download, upload speeds and latency</span>
                        </li>
                        <li className="flex flex-col space-y-1">
                            <span className="font-semibold">Detailed network analytics</span>
                            <span className="pl-5">Comprehensive insights into your network's performance metrics</span>
                        </li>
                        <li className="flex flex-col space-y-1">
                            <span className="font-semibold">Performance history tracking</span>
                            <span className="pl-5">Monitor your network performance over time with detailed historical data</span>
                        </li>
                        {/* <li className="flex flex-col space-y-1">
                            <span className="font-semibold">AI-powered recommendations</span>
                            <span className="pl-5">Smart suggestions to optimize your network performance</span>
                        </li> */}
                    </ul>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                >
                    <h3 className="text-xl font-cyber mb-3 text-accent-500">Innovation</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Leveraging cutting-edge technology to provide the most accurate network analysis tools
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                >
                    <h3 className="text-xl font-cyber mb-3 text-accent-500">Reliability</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Consistent and dependable testing infrastructure ensuring accurate results every time
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                >
                    <h3 className="text-xl font-cyber mb-3 text-accent-500">Security</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Your privacy and data security are our top priorities in every test we conduct
                    </p>
                </motion.div>
            </div>

            <div className="text-center">
                <h2 className="text-2xl font-cyber mb-6 text-accent-500">Our Technology Stack</h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Built with modern web technologies and advanced networking protocols,
                    NetAnalyser provides enterprise-grade speed testing capabilities right in your browser.
                    Our distributed server network ensures accurate results regardless of your location.
                </p>
            </div>
        </motion.div>
    );
};

export default AboutUs;
