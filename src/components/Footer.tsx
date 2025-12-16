import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer w-full">
      <div className="container">
        <div className="footer-content">
          <h3 className="footer-title">
            个人笔记
          </h3>
          <div className="footer-links">
            <a
              href="https://u-madara.github.io"
              className="footer-button"
            >
              GO  HOME
            </a>
            <a
              href="https://github.com/u-madara"
              className="footer-link"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;