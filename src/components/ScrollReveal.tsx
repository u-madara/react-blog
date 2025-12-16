import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'fade-in-up' | 'fade-in-down' | 'slide-in-left' | 'slide-in-right' | 'scale-in';
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = React.memo(({
  children,
  animation = 'fade-in-up',
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
  className = ''
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold, triggerOnce });

  const style = delay > 0 ? { transitionDelay: `${delay}ms` } : {};

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`scroll-reveal scroll-reveal-${animation} ${isVisible ? 'revealed' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
});

ScrollReveal.displayName = 'ScrollReveal';

export default ScrollReveal;