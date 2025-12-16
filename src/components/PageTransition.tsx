import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

interface PageTransitionProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide' | 'scale';
  duration?: number;
}

const PageTransition: React.FC<PageTransitionProps> = React.memo(({ 
  children, 
  animation = 'fade',
  duration = 300
}) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [currentKey, setCurrentKey] = useState(location.key);

  useEffect(() => {
    // 当路由变化时，先隐藏当前内容
    if (location.key !== currentKey) {
      setIsVisible(false);
      
      // 短暂延迟后显示新内容
      const timer = setTimeout(() => {
        setCurrentKey(location.key);
        setIsVisible(true);
      }, duration / 2);

      return () => clearTimeout(timer);
    } else {
      // 初始加载时直接显示
      setIsVisible(true);
    }
  }, [location.key, currentKey, duration]);

  const getAnimationClass = () => {
    if (!isVisible) return `page-transition-${animation}-exit`;
    return `page-transition-${animation}-enter`;
  };

  return (
    <div 
      className={`page-transition ${getAnimationClass()}`}
      style={{ '--duration': `${duration}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
});

PageTransition.displayName = 'PageTransition';

export default PageTransition;