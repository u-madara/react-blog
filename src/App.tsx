import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { getAllPosts, getPostBySlug } from './lib/api';
import { processMarkdownContent } from './lib/utils';
import './lib/buffer-polyfill'; // Import Buffer polyfill
import type { Post } from './interfaces/post';
import './App.css';
import './styles/design-tokens.css';
import './styles/base.css';
import './styles/animations.css';
import { Markdown, MarkdownStyleComponent } from './components/Markdown';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import ArticleCard from './components/ArticleCard';
import ArticleCardSkeleton from './components/ArticleCardSkeleton';
import PostDetailSkeleton from './components/PostDetailSkeleton';
import PageTransition from './components/PageTransition';
import Button from './components/Button';
import { Card, CardBody } from './components/Card';
import { ToastProvider } from './components/ToastProvider';
import ScrollReveal from './components/ScrollReveal';
import LazyImage from './components/LazyImage';
import PreloadResources from './components/PreloadResources';
import Construction from './components/Construction';

// 导航链接配置
const navigationLinks = [
  { name: '首页', href: '/' },
  { name: '关于', href: '/about' },
  { name: '归档', href: '/archive' },
  { name: '标签', href: '/tags' },
];

// 首页组件
const Home = React.memo(() => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 模拟加载延迟，以便展示加载动画
    const timer = setTimeout(() => {
      const allPosts = getAllPosts();
      setPosts(allPosts);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const heroPost = posts[0];
  const morePosts = posts.slice(1);

  return (
    <>
      <MarkdownStyleComponent />
      <div className="app-container">
        <Navigation 
          title="小羽的笔记"
          links={navigationLinks}
          showSearch={true}
        />
        
        <main className="main-content">
          <div className="container">
            {/* 英雄区域 */}
            <ScrollReveal animation="fade-in-down" delay={100}>
              <section className="hero-section">
                <Card padding="lg" shadow="none" className="hero-card">
                  <CardBody>
                    <h1 className="hero-title">欢迎来到我的博客</h1>
                    <p className="hero-subtitle">分享技术文章、学习笔记和生活感悟</p>
                  </CardBody>
                </Card>
              </section>
            </ScrollReveal>
            
            {/* 精选文章 */}
            {loading ? (
              <section className="featured-post-section">
                <h2 className="section-title">精选文章</h2>
                <ArticleCardSkeleton featured={true} />
              </section>
            ) : heroPost ? (
              <ScrollReveal animation="fade-in-up" delay={200}>
                <section className="featured-post-section">
                  <h2 className="section-title">精选文章</h2>
                  <ArticleCard post={heroPost} featured={true} />
                </section>
              </ScrollReveal>
            ) : null}

            {/* 更多文章 */}
            {loading ? (
              <section className="more-posts-section">
                <h2 className="section-title">更多文章</h2>
                <div className="card-grid card-grid-cols-1 md:card-grid-cols-2 lg:card-grid-cols-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <ArticleCardSkeleton key={index} />
                  ))}
                </div>
              </section>
            ) : morePosts.length > 0 ? (
              <section className="more-posts-section">
                <ScrollReveal animation="fade-in-up" delay={300}>
                  <h2 className="section-title">更多文章</h2>
                </ScrollReveal>
                <div className="card-grid card-grid-cols-1 md:card-grid-cols-2 lg:card-grid-cols-3">
                  {morePosts.map((post, index) => (
                    <ScrollReveal 
                      key={post.slug} 
                      animation="fade-in-up" 
                      delay={400 + index * 100}
                      threshold={0.1}
                    >
                      <ArticleCard post={post} />
                    </ScrollReveal>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
});

Home.displayName = 'Home';

// 文章详情页组件
const PostDetail = React.memo(() => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (slug) {
      // 模拟加载延迟，以便展示加载动画
      const timer = setTimeout(() => {
        const foundPost = getPostBySlug(slug);
        setPost(foundPost || null);
        setLoading(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [slug]);

  const goBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <>
        <MarkdownStyleComponent />
        <div className="app-container">
          <Navigation 
            title="小羽的笔记"
            links={navigationLinks}
            showSearch={true}
          />
          <main className="main-content">
            <div className="container">
              <PostDetailSkeleton />
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  if (!post) {
    return (
      <div className="app-container">
        <Navigation 
          title="小羽的笔记"
          links={navigationLinks}
          showSearch={true}
        />
        <main className="main-content">
          <div className="container">
            <Card padding="lg">
              <CardBody>
                <h1>文章未找到</h1>
                <p>抱歉，您访问的文章不存在。</p>
                <Button onClick={goBack}>返回首页</Button>
              </CardBody>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <MarkdownStyleComponent />
      <div className="app-container">
        <Navigation 
          title="小羽的笔记"
          links={navigationLinks}
          showSearch={true}
        />
        
        <main className="main-content">
          <div className="container">
            <article className="post-detail">
                  <ScrollReveal animation="fade-in-down" delay={100}>
                    <header className="post-header">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={goBack}
                        icon={
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                          </svg>
                        }
                        iconPosition="left"
                      >
                        返回
                      </Button>
                      <h1 className="post-title">{post.title}</h1>
                      <div className="post-meta">
                        <time className="post-date">
                          {new Date(post.date).toLocaleDateString('zh-CN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                        <span className="post-author">{post.author.name}</span>
                      </div>
                    </header>
                  </ScrollReveal>
                  
                  {post.coverImage && (
                    <ScrollReveal animation="fade-in" delay={200}>
                      <div className="post-cover">
                        <LazyImage 
                          src={post.coverImage.startsWith('/') ? `/react-blog${post.coverImage}` : post.coverImage} 
                          alt={post.title} 
                        />
                      </div>
                    </ScrollReveal>
                  )}
                  
                  <ScrollReveal animation="fade-in-up" delay={300}>
                    <div className="post-content">
                      <Markdown content={processMarkdownContent(post.content)} />
                    </div>
                  </ScrollReveal>
                </article>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
});

PostDetail.displayName = 'PostDetail';

// 主应用组件，定义路由规则
function App() {
  // 预加载关键资源
  const criticalResources = [
    './src/styles/design-tokens.css',
    './src/styles/base.css',
    './src/styles/animations.css'
  ];

  return (
    <ToastProvider>
      <PreloadResources resources={criticalResources} />
      <Routes>
        <Route path="/" element={
          <PageTransition animation="fade" duration={300}>
            <Home />
          </PageTransition>
        } />
        <Route path="/posts/:slug" element={
          <PageTransition animation="slide" duration={300}>
            <PostDetail />
          </PageTransition>
        } />
        <Route path="/construction" element={
          <PageTransition animation="fade" duration={300}>
            <Construction />
          </PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition animation="fade" duration={300}>
            <Construction />
          </PageTransition>
        } />
        <Route path="/archive" element={
          <PageTransition animation="fade" duration={300}>
            <Construction />
          </PageTransition>
        } />
        <Route path="/tags" element={
          <PageTransition animation="fade" duration={300}>
            <Construction />
          </PageTransition>
        } />
      </Routes>
    </ToastProvider>
  );
}

export default App;