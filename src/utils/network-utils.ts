interface NetworkInfo {
    provider: string;
    location: {
        city: string;
        country: string;
    };
}

export const getNetworkInfo = async (): Promise<NetworkInfo> => {
    try {
        const response = await fetch('http://ip-api.com/json');
        const data = await response.json();

        return {
            provider: data.isp,
            location: {
                city: data.city,
                country: data.country
            }
        };
    } catch (error) {
        console.error('Failed to fetch network info:', error);
        return {
            provider: 'Unknown',
            location: {
                city: 'Unknown',
                country: 'Unknown'
            }
        };
    }
};
