import React from 'react';
import Skeleton from './Skeleton';
import './ArticleCardSkeleton.css';

interface ArticleCardSkeletonProps {
  featured?: boolean;
  className?: string;
}

const ArticleCardSkeleton: React.FC<ArticleCardSkeletonProps> = ({ 
  featured = false, 
  className = '' 
}) => {
  return (
    <div className={`article-card-skeleton ${featured ? 'article-card-skeleton-featured' : ''} ${className}`}>
      <div className="article-card-skeleton-image-container">
        <Skeleton variant="rectangular" height={featured ? 300 : 200} className="article-card-skeleton-image" />
      </div>
      <div className="article-card-skeleton-content">
        <div className="article-card-skeleton-header">
          <Skeleton variant="text" height="1.5em" width="90%" className="article-card-skeleton-title" />
          <div className="article-card-skeleton-meta">
            <Skeleton variant="text" height="1em" width="100px" className="article-card-skeleton-date" />
            <Skeleton variant="text" height="1em" width="80px" className="article-card-skeleton-tag" />
          </div>
        </div>
        <div className="article-card-skeleton-excerpt">
          <Skeleton variant="text" lines={3} />
        </div>
        <div className="article-card-skeleton-footer">
          <Skeleton variant="text" height="1em" width="120px" />
        </div>
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;