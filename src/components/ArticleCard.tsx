import React from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../interfaces/post';
import { Card, CardBody, CardFooter } from './Card';
import LazyImage from './LazyImage';
import './ArticleCard.css';

interface ArticleCardProps {
  post: Post;
  featured?: boolean;
  showExcerpt?: boolean;
  showAuthor?: boolean;
  className?: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const ArticleCard: React.FC<ArticleCardProps> = React.memo(({
  post,
  featured = false,
  showExcerpt = true,
  showAuthor = true,
  className = ''
}) => {

  return (
    <Card
      hover={true}
      padding={featured ? 'lg' : 'md'}
      shadow={featured ? 'lg' : 'md'}
      className={`article-card ${featured ? 'article-card-featured' : ''} fade-in-up ${className}`}
      as="article"
    >
      {/* 封面图片 */}
      {post.coverImage && (
        <div className="article-card-image-container">
          <Link to={`/posts/${post.slug}`}>
            <LazyImage
              src={post.coverImage.startsWith('/') ? `/react-blog${post.coverImage}` : post.coverImage}
              alt={post.title}
              className="article-card-image"
            />
          </Link>
        </div>
      )}

      <CardBody>
        {/* 文章标题 */}
        <h2 className={`article-card-title ${featured ? 'article-card-title-featured' : ''}`}>
          <Link to={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        {/* 文章摘要 */}
        {showExcerpt && post.excerpt && (
          <p className="article-card-excerpt">
            {post.excerpt}
          </p>
        )}
      </CardBody>

      <CardFooter>
        {/* 文章元信息 */}
        <div className="article-card-meta">
          <time className="article-card-date">
            {formatDate(post.date)}
          </time>
          {showAuthor && post.author && (
            <>
              <span className="article-card-separator">·</span>
              <span className="article-card-author">
                {post.author.name}
              </span>
            </>
          )}
        </div>

        {/* 阅读更多链接 */}
        <Link
          to={`/posts/${post.slug}`}
          className="article-card-read-more"
        >
          阅读更多
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </CardFooter>
    </Card>
  );
});

ArticleCard.displayName = 'ArticleCard';

export default ArticleCard;