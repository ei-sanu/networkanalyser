import { NewsletterSubscription } from '../types/newsletter';

const SHEET_API_URL = process.env.REACT_APP_GOOGLE_SHEET_API_URL;

export const subscribeToNewsletter = async (email: string): Promise<boolean> => {
    try {
        const data: NewsletterSubscription = {
            email,
            timestamp: new Date().toISOString()
        };

        const response = await fetch(SHEET_API_URL!, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        return response.ok;
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return false;
    }
};
