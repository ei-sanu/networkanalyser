import { motion } from 'framer-motion';
import React from 'react';

const TermsOfService: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-6 py-12"
        >
            <h1 className="text-4xl font-cyber mb-8 text-accent-500">Terms of Service</h1>
            <div className="prose dark:prose-invert max-w-none">
                <section className="mb-8">
                    <h2 className="text-2xl font-cyber mb-4">Service Usage</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        By using NetAnalyser, you agree to these terms. Our service is provided "as is"
                        without any warranties, express or implied.
                    </p>
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-cyber mb-4">User Responsibilities</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Users must not attempt to manipulate test results or use our service
                        for any malicious purposes.
                    </p>
                </section>
            </div>
        </motion.div>
    );
};

export default TermsOfService;
