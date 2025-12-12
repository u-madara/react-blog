import { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { getAllPosts, getPostBySlug } from './lib/api';
import type { Post } from './interfaces/post';
import './App.css';
import { Markdown, MarkdownStyleComponent } from './components/Markdown';
import Footer from './components/Footer';

// 首页组件
const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const allPosts = getAllPosts();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPosts(allPosts);
  }, []);

  const heroPost = posts[0];
  const morePosts = posts.slice(1);

  return (
    <>
      <MarkdownStyleComponent />
      <div className="app-container">
        <header>
          <div className="container">
            <h1>小羽的笔记</h1>
          </div>
        </header>
        
        <main>
          <div className="container">
            {/* Intro section */}
            <section className="intro-section mb-12 md:mb-20">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
                欢迎来到我的博客
              </h2>
              <p className="text-xl mt-4 text-gray-600">
                分享技术文章、学习笔记和生活感悟
              </p>
            </section>
            
            {heroPost && (
              <section className="hero-post mb-32">
                {heroPost.coverImage && (
                  <div className="cover-image-container mb-8 md:mb-16">
                    <img 
                      src={heroPost.coverImage.startsWith('/') ? `/react-blog${heroPost.coverImage}` : heroPost.coverImage} 
                      alt={heroPost.title} 
                      className="cover-image"
                    />
                  </div>
                )}
                <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
                  <div>
                    <h2 className="hero-title text-4xl lg:text-5xl font-bold tracking-tighter leading-tight">
                      <Link to={`/posts/${heroPost.slug}`} className="text-blue-600 hover:underline">
                        {heroPost.title}
                      </Link>
                    </h2>
                    <div className="mb-4 text-lg text-gray-600 mt-4">
                      <span className="post-date">{new Date(heroPost.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg leading-relaxed mb-4">{heroPost.excerpt}</p>
                    <div className="author-info text-gray-600">
                      <span className="post-author">{heroPost.author.name}</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {morePosts.length > 0 && (
              <section className="more-stories">
                <h2 className="section-title text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-16">More Stories</h2>
                <div className="more-stories-grid grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32">
                  {morePosts.map((post) => (
                    <div 
                      key={post.slug} 
                      className="post-preview"
                    >
                      {post.coverImage && (
                        <div className="cover-image-container mb-8">
                          <img 
                            src={post.coverImage.startsWith('/') ? `/react-blog${post.coverImage}` : post.coverImage} 
                            alt={post.title} 
                            className="cover-image"
                          />
                        </div>
                      )}
                      <h3 className="post-preview-title text-3xl font-bold leading-snug mb-4">
                        <Link to={`/posts/${post.slug}`} className="text-blue-600 hover:underline">
                          {post.title}
                        </Link>
                      </h3>
                      <div className="text-lg mb-4 text-gray-600">
                        <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-lg leading-relaxed mb-4">{post.excerpt}</p>
                      <div className="author-info text-gray-600">
                        <span className="post-author">{post.author.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

// 文章详情页组件
const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (slug) {
      const foundPost = getPostBySlug(slug);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPost(foundPost || null);
    }
  }, [slug]);

  const goBack = () => {
    navigate('/');
  };

  if (!post) {
    return (
      <div className="app-container">
        <header>
          <div className="container">
            <button className="back-button" onClick={goBack}>
              back
            </button>
            <h1>小羽的笔记</h1>
          </div>
        </header>
        <main>
          <div className="container post-detail">
            <p>文章未找到</p>
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
        <header>
          <div className="container">
            <button className="back-button" onClick={goBack}>
              back
            </button>
            <h1>小羽的笔记</h1>
          </div>
        </header>
        
        <main>
          <div className="container post-detail">
            <article>
              <h2 className="post-title">{post.title}</h2>
              <div className="post-meta">
                <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
                <span className="post-author">{post.author.name}</span>
              </div>
              {post.coverImage && (
                <div className="cover-image-container">
                  <img 
                    src={post.coverImage.startsWith('/') ? `/react-blog${post.coverImage}` : post.coverImage} 
                    alt={post.title} 
                    className="cover-image"
                  />
                </div>
              )}
              <div className="post-content">
                <Markdown content={post.content} />
              </div>
            </article>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

// 主应用组件，定义路由规则
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts/:slug" element={<PostDetail />} />
    </Routes>
  );
}

export default App;
