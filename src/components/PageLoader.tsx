import React from 'react';
import Spinner from './Spinner';
import './PageLoader.css';

interface PageLoaderProps {
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  message = '加载中...',
  fullScreen = true,
  className = ''
}) => {
  const classes = [
    'page-loader',
    fullScreen && 'page-loader-fullscreen',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="page-loader-content">
        <Spinner size="lg" />
        {message && <p className="page-loader-message">{message}</p>}
      </div>
    </div>
  );
};

export default PageLoader;