import React, { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

// 配置marked，添加highlight插件
marked.use({
  gfm: true,
  breaks: true,
  // 确保不会执行代码块中的JavaScript
  sanitize: true,
  // 设置为false以避免自动链接
  smartLists: true,
  smartypants: true
});

// 使用marked的renderer来处理代码高亮
const renderer = new marked.Renderer();
renderer.code = function({ text, lang }: { text: string; lang?: string }) {
  // 处理代码块中的环境变量引用
  const processedText = text.replace(
    /process\.env\.NODE_ENV/g,
    "'development'"
  ).replace(
    /process\.env\.\w+/g,
    "undefined"
  );
  
  const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
  const highlightedCode = hljs.highlight(processedText, { language }).value;
  return `<pre><code class="hljs language-${language}">${highlightedCode}</code></pre>`;
};

marked.use({ renderer });

interface MarkdownProps {
  content: string;
  enableAnimations?: boolean;
}

const Markdown: React.FC<MarkdownProps> = ({ content, enableAnimations = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>('');

  // 设置滚动显示动画
  const setupScrollReveal = (container: HTMLElement) => {
    const elements = container.querySelectorAll('.scroll-reveal-element');
    if (elements.length === 0) return;

    // 为每个元素设置延迟
    elements.forEach((el, index) => {
      const element = el as HTMLElement;
      const delay = element.dataset.delay || (index * 100).toString();
      element.style.transitionDelay = `${delay}ms`;
    });

    // 使用requestAnimationFrame优化性能
    let rafId: number;
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      rafId = requestAnimationFrame(() => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      });
    };

    // 创建Intersection Observer
    const observer = new IntersectionObserver(
      observerCallback,
      { threshold: 0.1, rootMargin: '0px' }
    );

    // 观察所有元素
    elements.forEach((el) => observer.observe(el));

    // 清理函数
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      observer.disconnect();
    };
  };

  useEffect(() => {
    const renderMarkdown = async () => {
      try {
        const html = await marked.parse(content);
        setHtmlContent(html);
        setError(null);
      } catch (err) {
        console.error('Markdown渲染错误:', err);
        setError('文章内容渲染失败，请稍后重试');
      }
    };

    renderMarkdown();
  }, [content]);

  useEffect(() => {
    if (containerRef.current && htmlContent) {
      // 创建一个临时div来解析HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      
      // 查找所有的代码块
      const codeBlocks = tempDiv.querySelectorAll('pre code');
      codeBlocks.forEach(block => {
        const codeText = block.textContent || '';
        // 处理代码块中的环境变量引用
        const processedText = codeText.replace(
          /process\.env\.NODE_ENV/g,
          "'development'"
        ).replace(
          /process\.env\.\w+/g,
          "undefined"
        );
        block.textContent = processedText;
      });
      
      // 将处理后的HTML内容插入到容器中
      containerRef.current.innerHTML = tempDiv.innerHTML;
      
      // 如果启用动画，为元素添加滚动显示类
      if (enableAnimations) {
        const elements = containerRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6, p, ul, ol, blockquote, pre, img');
        elements.forEach((el, index) => {
          el.classList.add('scroll-reveal-element');
          el.setAttribute('data-delay', (index * 100).toString());
        });
        
        // 设置滚动显示动画
        const cleanup = setupScrollReveal(containerRef.current);
        
        // 返回清理函数
        return cleanup;
      }
    }
  }, [htmlContent, enableAnimations]);

  if (error) {
    return <div className="markdown-container">{error}</div>;
  }

  return <div className="markdown-container" ref={containerRef} />;
};

const MarkdownStyles = `
.markdown-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  font-size: 1.125rem;
  line-height: 1.625;
  overflow-x: hidden;
  word-break: break-word;
  hyphens: auto;
}

/* 移动端Markdown优化 */
@media (max-width: 768px) {
  .markdown-container {
    max-width: 100%;
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }
}

.markdown-container p,
.markdown-container ul,
.markdown-container ol,
.markdown-container blockquote {
  margin: 1.5rem 0;
}

.markdown-container h1 {
  font-size: 2.5rem;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
  line-height: 1.2;
  color: #111;
}

.markdown-container h2 {
  font-size: 2.25rem;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
  line-height: 1.2;
  color: #111;
}

.markdown-container h3 {
  font-size: 1.875rem;
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  font-weight: 700;
  line-height: 1.3;
  color: #111;
}

.markdown-container h4 {
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
  line-height: 1.4;
  color: #111;
}

.markdown-container code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
}

.markdown-container pre {
  background-color: #f6f8fa;
  border-radius: 6px;
  padding: 16px;
  overflow: auto;
  margin: 1.5rem 0;
  max-width: 100%;
  word-wrap: normal;
  white-space: pre;
}

.markdown-container pre code {
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: 0;
  font-size: 100%;
  display: block;
  line-height: 1.5;
}

.markdown-container blockquote {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
  margin: 1.5rem 0;
}

.markdown-container .table-wrapper {
  overflow-x: auto;
  margin: 1.5rem 0;
  border-radius: 6px;
}

.markdown-container table {
  border-collapse: collapse;
  width: 100%;
  margin: 0;
}

.markdown-container table th,
.markdown-container table td {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}

.markdown-container table th {
  font-weight: 600;
  background-color: #f6f8fa;
}

.markdown-container table tr {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}

.markdown-container table tr:nth-child(2n) {
  background-color: #f6f8fa;
}

.markdown-container img {
  max-width: 100%;
  height: auto;
  margin: 1.5rem 0;
  border-radius: 6px;
}

.markdown-container a {
  color: #0070f3;
  text-decoration: none;
  transition: color 0.2s;
}

.markdown-container a:hover {
  color: #0051d5;
  text-decoration: underline;
}

.markdown-container ul,
.markdown-container ol {
  padding-left: 1.5rem;
}

.markdown-container li {
  margin: 0.5rem 0;
}

/* 滚动显示动画样式 */
.markdown-container .scroll-reveal-element {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.markdown-container .scroll-reveal-element.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* 代码块特殊动画 */
.markdown-container pre.scroll-reveal-element {
  transform: translateY(10px) scale(0.98);
}

.markdown-container pre.scroll-reveal-element.revealed {
  transform: translateY(0) scale(1);
}

/* 图片特殊动画 */
.markdown-container img.scroll-reveal-element {
  transform: translateY(20px) scale(0.95);
}

.markdown-container img.scroll-reveal-element.revealed {
  transform: translateY(0) scale(1);
}
`;

const MarkdownStyleComponent = () => (
  <style>{MarkdownStyles}</style>
);

export { Markdown, MarkdownStyleComponent };
