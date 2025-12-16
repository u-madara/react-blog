import { Link } from 'react-router-dom';
import './Construction.css';

const Construction = () => {
  return (
    <div className="construction-container">
      <div className="construction-content">
        <div className="construction-icon">
          <svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
          </svg>
        </div>
        
        <h1 className="construction-title">功能建设中</h1>
        
        <p className="construction-description">
          这个页面正在开发中，我们正在努力为您带来更好的体验。
          请稍后再来查看，或者返回首页浏览其他内容。
        </p>
        
        <div className="construction-features">
          <h2>即将推出</h2>
          <ul>
            <li>完整的用户个人中心</li>
            <li>文章评论与互动功能</li>
            <li>标签分类与筛选系统</li>
            <li>文章搜索功能</li>
            <li>订阅通知系统</li>
          </ul>
        </div>
        
        <div className="construction-actions">
          <Link to="/" className="btn btn-primary">
            返回首页
          </Link>
          <Link to="/archive" className="btn btn-secondary">
            浏览归档
          </Link>
        </div>
      </div>
      
      <div className="construction-illustration">
        <div className="construction-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '65%' }}></div>
          </div>
          <span className="progress-text">开发进度: 65%</span>
        </div>
      </div>
    </div>
  );
};

export default Construction;