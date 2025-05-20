interface SpeedRecommendation {
  activity: string;
  suitable: boolean;
  marginal?: boolean;
}

interface DeviceSuitability {
  desktop: string;
  mobile: string;
  videoCalls: string;
}

interface Recommendations {
  gaming: SpeedRecommendation[];
  streaming: SpeedRecommendation[];
  productivity: SpeedRecommendation[];
  deviceSuitability: DeviceSuitability;
  summary: string;
}

/**
 * Generates recommendations based on network speed metrics
 */
export const getRecommendations = (
  downloadSpeed: number,
  uploadSpeed: number,
  pingTime: number
): Recommendations => {
  // Gaming recommendations
  const gaming = [
    {
      activity: 'Casual online games',
      suitable: downloadSpeed >= 3 && uploadSpeed >= 1 && pingTime < 100,
    },
    {
      activity: 'Competitive/FPS games',
      suitable: downloadSpeed >= 15 && uploadSpeed >= 3 && pingTime < 50,
    },
    {
      activity: 'Cloud gaming services',
      suitable: downloadSpeed >= 35 && uploadSpeed >= 5 && pingTime < 40,
    },
    {
      activity: 'Game downloads',
      suitable: downloadSpeed >= 50,
      marginal: downloadSpeed >= 20 && downloadSpeed < 50,
    },
  ];

  // Streaming recommendations
  const streaming = [
    {
      activity: 'Standard definition (480p)',
      suitable: downloadSpeed >= 3,
    },
    {
      activity: 'High definition (720p-1080p)',
      suitable: downloadSpeed >= 5,
      marginal: downloadSpeed >= 3 && downloadSpeed < 5,
    },
    {
      activity: '4K/UHD streaming',
      suitable: downloadSpeed >= 25,
      marginal: downloadSpeed >= 15 && downloadSpeed < 25,
    },
    {
      activity: 'Multiple simultaneous streams',
      suitable: downloadSpeed >= 25,
      marginal: downloadSpeed >= 15 && downloadSpeed < 25,
    },
  ];

  // Productivity recommendations
  const productivity = [
    {
      activity: 'Web browsing & email',
      suitable: downloadSpeed >= 1 && uploadSpeed >= 0.5,
    },
    {
      activity: 'Video conferencing',
      suitable: downloadSpeed >= 3 && uploadSpeed >= 3 && pingTime < 150,
      marginal: (downloadSpeed >= 1.5 && downloadSpeed < 3) || (uploadSpeed >= 1.5 && uploadSpeed < 3) || (pingTime >= 150 && pingTime < 300),
    },
    {
      activity: 'File sharing & cloud syncing',
      suitable: downloadSpeed >= 10 && uploadSpeed >= 5,
      marginal: (downloadSpeed >= 5 && downloadSpeed < 10) || (uploadSpeed >= 2 && uploadSpeed < 5),
    },
    {
      activity: 'Remote work with multiple applications',
      suitable: downloadSpeed >= 25 && uploadSpeed >= 5 && pingTime < 100,
      marginal: (downloadSpeed >= 10 && downloadSpeed < 25) || (uploadSpeed >= 2 && uploadSpeed < 5) || (pingTime >= 100 && pingTime < 150),
    },
  ];

  // Device suitability
  let deviceSuitability: DeviceSuitability;
  
  if (downloadSpeed >= 50 && uploadSpeed >= 10 && pingTime < 30) {
    deviceSuitability = {
      desktop: 'Excellent for all uses',
      mobile: 'Perfect for all mobile activities',
      videoCalls: 'High-quality video calls with multiple participants'
    };
  } else if (downloadSpeed >= 25 && uploadSpeed >= 5 && pingTime < 50) {
    deviceSuitability = {
      desktop: 'Great for most uses',
      mobile: 'Great for all mobile activities',
      videoCalls: 'Good quality video calls'
    };
  } else if (downloadSpeed >= 10 && uploadSpeed >= 3 && pingTime < 100) {
    deviceSuitability = {
      desktop: 'Good for basic productivity and streaming',
      mobile: 'Good for most mobile activities',
      videoCalls: 'Adequate for video calls'
    };
  } else if (downloadSpeed >= 5 && uploadSpeed >= 1 && pingTime < 150) {
    deviceSuitability = {
      desktop: 'Basic web browsing and email',
      mobile: 'Basic mobile browsing',
      videoCalls: 'Audio calls and low-quality video'
    };
  } else {
    deviceSuitability = {
      desktop: 'Limited functionality',
      mobile: 'Very basic browsing',
      videoCalls: 'Audio only recommended'
    };
  }

  // Generate overall summary
  let summary = '';
  if (downloadSpeed >= 100 && uploadSpeed >= 20 && pingTime < 20) {
    summary = 'Your connection is excellent! It should handle any online activity with ease, including 4K streaming, competitive gaming, large file transfers, and multiple simultaneous users.';
  } else if (downloadSpeed >= 50 && uploadSpeed >= 10 && pingTime < 40) {
    summary = 'Your connection is very good. It should handle most demanding activities like 4K streaming, online gaming, and video conferencing without issues.';
  } else if (downloadSpeed >= 25 && uploadSpeed >= 5 && pingTime < 60) {
    summary = 'Your connection is good for most online activities. You may experience occasional slowdowns with very demanding tasks or when multiple people are using the network.';
  } else if (downloadSpeed >= 10 && uploadSpeed >= 3 && pingTime < 100) {
    summary = 'Your connection is adequate for basic online activities. You may have difficulty with high-definition streaming, large downloads, or competitive gaming.';
  } else {
    summary = 'Your connection is limited. You may experience difficulties with streaming, online gaming, and video calls. Consider upgrading your internet plan if these activities are important to you.';
  }

  return {
    gaming,
    streaming,
    productivity,
    deviceSuitability,
    summary,
  };
};