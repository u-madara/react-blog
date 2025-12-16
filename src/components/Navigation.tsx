import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

interface NavigationProps {
  logo?: string;
  title?: string;
  links?: Array<{
    name: string;
    href: string;
    external?: boolean;
  }>;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  logo = '',
  title = '小羽的笔记',
  links = [],
  showSearch = false,
  searchPlaceholder = '搜索文章...',
  onSearch
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 处理滚动事件，添加阴影效果
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 处理搜索
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  // 切换搜索框
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  // 关闭移动端菜单
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  // 路由变化时关闭菜单
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  return (
    <header className={`navigation ${isScrolled ? 'navigation-scrolled' : ''}`}>
      <div className="container">
        <div className="navigation-inner">
          {/* Logo和标题 */}
          <Link to="/" className="navigation-brand">
            {logo && <img src={logo} alt={title} className="navigation-logo" />}
            <span className="navigation-title">{title}</span>
          </Link>

          {/* 桌面端导航链接 */}
          <nav className="navigation-menu navigation-menu-desktop">
            {links.map((link, index) => (
              link.external ? (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navigation-link"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={index}
                  to={link.href}
                  className={`navigation-link ${location.pathname === link.href ? 'navigation-link-active' : ''}`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>

          {/* 搜索和移动端菜单按钮 */}
          <div className="navigation-actions">
            {/* 搜索按钮 */}
            {showSearch && (
              <button
                className="navigation-search-btn"
                onClick={toggleSearch}
                aria-label="搜索"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            )}

            {/* 移动端菜单按钮 */}
            <button
              className={`navigation-menu-btn ${isMenuOpen ? 'navigation-menu-btn-open' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="切换菜单"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* 搜索框 */}
        {showSearch && (
          <div className={`navigation-search ${isSearchOpen ? 'navigation-search-open' : ''}`}>
            <form onSubmit={handleSearch} className="navigation-search-form">
              <input
                ref={searchInputRef}
                type="text"
                className="navigation-search-input"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="navigation-search-submit" aria-label="提交搜索">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            </form>
          </div>
        )}

        {/* 移动端导航菜单 */}
        <div className={`navigation-mobile ${isMenuOpen ? 'navigation-mobile-open' : ''}`}>
          <nav className="navigation-menu navigation-menu-mobile">
            {links.map((link, index) => (
              link.external ? (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navigation-link"
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={index}
                  to={link.href}
                  className={`navigation-link ${location.pathname === link.href ? 'navigation-link-active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;