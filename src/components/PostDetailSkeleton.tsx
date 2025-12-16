import React from 'react';
import Skeleton from './Skeleton';
import './PostDetailSkeleton.css';

const PostDetailSkeleton: React.FC = () => {
  return (
    <div className="post-detail-skeleton">
      <div className="post-detail-skeleton-header">
        <Skeleton variant="text" height="2.5em" width="85%" className="post-detail-skeleton-title" />
        <div className="post-detail-skeleton-meta">
          <Skeleton variant="text" height="1em" width="120px" className="post-detail-skeleton-date" />
          <Skeleton variant="text" height="1em" width="100px" className="post-detail-skeleton-author" />
          <Skeleton variant="text" height="1em" width="80px" className="post-detail-skeleton-category" />
        </div>
      </div>
      
      <div className="post-detail-skeleton-content">
        <div className="post-detail-skeleton-paragraph">
          <Skeleton variant="text" lines={4} />
        </div>
        
        <div className="post-detail-skeleton-image">
          <Skeleton variant="rectangular" height="300" />
        </div>
        
        <div className="post-detail-skeleton-paragraph">
          <Skeleton variant="text" lines={5} />
        </div>
        
        <div className="post-detail-skeleton-subtitle">
          <Skeleton variant="text" height="1.5em" width="60%" />
        </div>
        
        <div className="post-detail-skeleton-paragraph">
          <Skeleton variant="text" lines={3} />
        </div>
        
        <div className="post-detail-skeleton-code">
          <Skeleton variant="rectangular" height="150" />
        </div>
        
        <div className="post-detail-skeleton-paragraph">
          <Skeleton variant="text" lines={4} />
        </div>
        
        <div className="post-detail-skeleton-list">
          <Skeleton variant="text" lines={3} />
        </div>
        
        <div className="post-detail-skeleton-paragraph">
          <Skeleton variant="text" lines={3} />
        </div>
      </div>
    </div>
  );
};

export default PostDetailSkeleton;