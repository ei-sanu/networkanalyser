import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import Chatbot from './components/Chatbot';
import ContactUs from './components/ContactUs';
import CursorEffect from './components/CursorEffect';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import PrivacyPolicy from './components/PrivacyPolicy';
import SpeedTest from './components/SpeedTest';
import TermsOfService from './components/TermsOfService';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <div className="min-h-screen flex flex-col cursor-glow">
            <CursorEffect />
            <Navbar />
            <Routes>
              <Route path="/" element={
                <main className="flex-grow container mx-auto px-4 py-8">
                  <SpeedTest />
                </main>
              } />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/contact" element={<ContactUs />} />
            </Routes>

            {/* Chatbot section before footer */}
            <div className="relative">
              {showChat ? (
                <div className="fixed bottom-20 right-6 z-20">
                  <Chatbot onClose={() => setShowChat(false)} />
                </div>
              ) : (
                <button
                  onClick={() => setShowChat(true)}
                  className="fixed bottom-20 right-6 bg-accent-500 text-white p-4 rounded-full shadow-lg hover:bg-accent-600 transition-all duration-300 z-20"
                  aria-label="Open chat with Aura"
                >
                  <span className="sr-only">Chat with Aura</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </button>
              )}
            </div>

            <Footer />
          </div>
        </Router>
      )}
    </>
  );
};

export default App;
