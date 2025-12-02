import { useEffect, useRef, useState } from 'react';

const ScrollProgress = () => {
  const [scrollWidth, setScrollWidth] = useState(0);
  const rafId = useRef(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / height) * 100;
      setScrollWidth(progress);
      rafId.current = null;
    };

    const handleScroll = () => {
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className='fixed top-0 left-0 w-full h-[3px] bg-transparent z-[9999]'>
      <div
        className='h-full rounded-sm transition-[width] duration-200 ease-[cubic-bezier(0.4,0.0,0.2,1)]'
        style={{
          width: `${scrollWidth}%`,
          background: 'linear-gradient(90deg, #B8860B, #FFD700, #DAA520, #FFC125, #B8860B)',
          backgroundSize: '200% 100%',
          backgroundPosition: `${scrollWidth}% 0%`,
        }}
      />
    </div>
  );
};

export default ScrollProgress;
