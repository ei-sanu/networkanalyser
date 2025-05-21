import chatbotData from '../data/chatbot-data.json';

interface ChatbotData {
  responses: {
    [key: string]: {
      patterns: string[];
      responses: string[];
    };
  };
  fallback: string[];
}

export const findBestMatch = (input: string): string => {
  const data = chatbotData as ChatbotData;
  const normalizedInput = input.toLowerCase().trim();

  // Check each category for matching patterns
  for (const category of Object.values(data.responses)) {
    const matches = category.patterns.some(pattern =>
      normalizedInput.includes(pattern)
    );

    if (matches) {
      // Return random response from matching category
      return category.responses[
        Math.floor(Math.random() * category.responses.length)
      ];
    }
  }

  // Return random fallback response if no match found
  return data.fallback[
    Math.floor(Math.random() * data.fallback.length)
  ];
};
