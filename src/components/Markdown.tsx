import React, { useEffect, useRef } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

// 配置marked，添加highlight插件
marked.use({
  extensions: [],
  gfm: true,
  breaks: true,
  // 使用hooks来处理代码高亮和HTML转义
  hooks: {
    postprocess(html) {
      // 手动处理代码高亮和HTML转义
      return html.replace(/<pre><code class="language-(\w+)">(.*?)<\/code><\/pre>/gs, (_match, lang, code) => {
        // 首先反转义HTML字符，然后再进行高亮处理
        const unescapedCode = code
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&amp;/g, '&');
        
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        const highlightedCode = hljs.highlight(unescapedCode, { language }).value;
        return `<pre><code class="language-${language}">${highlightedCode}</code></pre>`;
      });
    }
  }
});

interface MarkdownProps {
  content: string;
}

const Markdown: React.FC<MarkdownProps> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderMarkdown = async () => {
      if (containerRef.current) {
        const html = await marked.parse(content);
        containerRef.current.innerHTML = html;
      }
    };

    renderMarkdown();
  }, [content]);

  return <div className="markdown-container" ref={containerRef} />;
};

const MarkdownStyles = `
.markdown-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0;
  font-size: 1.125rem;
  line-height: 1.625;
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

.markdown-container table {
  border-collapse: collapse;
  width: 100%;
  margin: 1.5rem 0;
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
