import React, { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

// 配置marked，添加highlight插件
marked.use({
  extensions: [],
  gfm: true,
  breaks: true
});

// 使用marked的renderer来处理代码高亮
const renderer = new marked.Renderer();
renderer.code = function({ text, lang }: { text: string; lang?: string }) {
  const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
  const highlightedCode = hljs.highlight(text, { language }).value;
  return `<pre><code class="hljs language-${language}">${highlightedCode}</code></pre>`;
};

marked.use({ renderer });

interface MarkdownProps {
  content: string;
}

const Markdown: React.FC<MarkdownProps> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderMarkdown = async () => {
      if (containerRef.current) {
        try {
          const html = await marked.parse(content);
          containerRef.current.innerHTML = html;
          setError(null);
        } catch (err) {
          console.error('Markdown渲染错误:', err);
          setError('文章内容渲染失败，请稍后重试');
        }
      }
    };

    renderMarkdown();
  }, [content]);

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
`;

const MarkdownStyleComponent = () => (
  <style>{MarkdownStyles}</style>
);

export { Markdown, MarkdownStyleComponent };
