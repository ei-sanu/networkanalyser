import React, { useEffect, useState } from 'react';

const CursorEffect: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    // Only add cursor effect on desktop
    if (window.innerWidth > 768) {
      const updatePosition = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
  
        // Update CSS variables for the glow effect
        document.documentElement.style.setProperty('--x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--y', `${e.clientY}px`);
      };
  
      const handleMouseDown = () => setClicked(true);
      const handleMouseUp = () => setClicked(false);
      const handleMouseLeave = () => setHidden(true);
      const handleMouseEnter = () => setHidden(false);
  
      window.addEventListener('mousemove', updatePosition);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.addEventListener('mouseleave', handleMouseLeave);
      document.body.addEventListener('mouseenter', handleMouseEnter);
  
      return () => {
        window.removeEventListener('mousemove', updatePosition);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        document.body.removeEventListener('mouseleave', handleMouseLeave);
        document.body.removeEventListener('mouseenter', handleMouseEnter);
      };
    }
  }, []);

  // Only render cursor effect on larger screens
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  return (
    <>
      <div
        className={`cursor-dot ${hidden ? 'opacity-0' : 'opacity-70'} ${
          clicked ? 'scale-75' : 'scale-100'
        }`}
        style={{
          transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
        }}
      />
      <div
        className={`cursor-ring ${hidden ? 'opacity-0' : 'opacity-70'} ${
          clicked ? 'scale-75' : 'scale-100'
        }`}
        style={{
          transform: `translate(${position.x - 24}px, ${position.y - 24}px)`,
        }}
      />
    </>
  );
};

export default CursorEffect;