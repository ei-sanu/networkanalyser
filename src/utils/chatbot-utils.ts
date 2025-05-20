import chatbotData from '../data/chatbot-data.json';

/**
 * Gets a response from Aura based on user input
 */
export const getAuraResponse = async (input: string): Promise<string> => {
  const normalizedInput = input.toLowerCase().trim();

  // Check for greetings
  if (chatbotData.greetings.patterns.some(pattern => normalizedInput.includes(pattern))) {
    return getRandomItem(chatbotData.greetings.responses);
  }

  // Check knowledge base for relevant response
  const relevantResponses = chatbotData.knowledgeBase.filter(item =>
    item.keywords.some(keyword => normalizedInput.includes(keyword))
  );

  if (relevantResponses.length > 0) {
    return relevantResponses.sort((a, b) => {
      const aMatches = a.keywords.filter(keyword => normalizedInput.includes(keyword)).length;
      const bMatches = b.keywords.filter(keyword => normalizedInput.includes(keyword)).length;
      return bMatches - aMatches;
    })[0].response;
  }

  // If no match, check for specific speed-related questions
  if (normalizedInput.includes('mbps') ||
    normalizedInput.includes('speed') ||
    normalizedInput.includes('fast') ||
    normalizedInput.includes('slow')) {

    const numbers = normalizedInput.match(/\d+/g);
    if (numbers && numbers.length > 0) {
      const speed = parseInt(numbers[0]);
      const speedRange = chatbotData.speedRanges.find(
        range => speed >= range.range[0] && speed < range.range[1]
      );

      if (speedRange) {
        return speedRange.response.replace('{speed}', speed.toString());
      }
    }
  }

  return getRandomItem(chatbotData.fallback);
};

/**
 * Gets a random item from an array
 */
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};
