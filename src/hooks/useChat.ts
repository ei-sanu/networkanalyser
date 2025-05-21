import { useState } from 'react';
import chatData from '../data/chatbot-data.json';

export const useChat = () => {
  const [messages, setMessages] = useState<Array<{
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
  }>>([]);

  const findResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    const entry = chatData.find(item =>
      item.user.toLowerCase().includes(input) ||
      item.category.toLowerCase().includes(input)
    );
    return entry?.bot || "I'm not sure about that. Could you please rephrase your question?";
  };

  const sendMessage = (text: string) => {
    const userMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user' as const,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: findResponse(text),
        sender: 'bot' as const,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return {
    messages,
    sendMessage,
  };
};
