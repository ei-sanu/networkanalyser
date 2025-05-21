export const playSound = (soundName: string) => {
    const audio = new Audio(`/sounds/${soundName}.mp3`);
    audio.play().catch(err => console.log('Audio playback failed:', err));
};

export const playClickSound = () => {
    const audio = new Audio('/sounds/success.mp3');
    audio.volume = 0.5;
    audio.play().catch(err => console.error('Error playing sound:', err));
};

export const playThemeSound = () => {
    const audio = new Audio('/sounds/success.mp3');
    audio.volume = 0.3; // Slightly lower volume for theme change
    audio.play().catch(err => console.error('Error playing sound:', err));
};
