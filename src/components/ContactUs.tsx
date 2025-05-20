import { motion } from 'framer-motion';
import React, { useState } from 'react';

const ContactUs: React.FC = () => {
    const [result, setResult] = useState<string>("");

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.currentTarget);

        formData.append("access_key", "9c4dbdf0-8c38-47a5-aab1-9e3b06b196db"); // Replace with your Web3Forms access key

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setResult("Message sent successfully!");
                (event.target as HTMLFormElement).reset();
            } else {
                console.log("Error", data);
                setResult(data.message || "Something went wrong!");
            }
        } catch (error) {
            console.error("Error:", error);
            setResult("Failed to send message. Please try again.");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-6 py-12 mb-20"
        >
            <h1 className="text-4xl font-cyber mb-8 text-accent-500">Contact Us</h1>
            <div className="max-w-2xl mx-auto">
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-cyber mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-cyber mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-cyber mb-2">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            required
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-accent-500 text-white py-3 px-6 rounded-md hover:bg-accent-600 transition-colors font-cyber"
                    >
                        Send Message
                    </button>

                    {result && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`text-center p-4 rounded-md ${result === "Sending...."
                                    ? "bg-gray-100 dark:bg-gray-800"
                                    : result.includes("successfully")
                                        ? "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200"
                                        : "bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200"
                                }`}
                        >
                            {result}
                        </motion.div>
                    )}
                </form>
            </div>
        </motion.div>
    );
};

export default ContactUs;
