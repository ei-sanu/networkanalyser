import { motion } from 'framer-motion';
import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-6 py-12"
        >
            <h1 className="text-4xl font-cyber mb-8 text-accent-500">Privacy Policy</h1>
            <div className="prose dark:prose-invert max-w-none">
                <section className="mb-8">
                    <h2 className="text-2xl font-cyber mb-4">Information We Collect</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        We collect information about your network performance when you use our speed test tool.
                        This includes your IP address, network metrics, and device information.
                    </p>
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-cyber mb-4">How We Use Your Data</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Your data is used to provide accurate speed test results and improve our services.
                        We never sell your personal information to third parties.
                    </p>
                </section>
            </div>
        </motion.div>
    );
};

export default PrivacyPolicy;
