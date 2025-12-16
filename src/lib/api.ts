import type { Post } from '../interfaces/post';
import matter from 'gray-matter';
import { processMarkdownContent } from './utils';

// 使用 Vite 的 import.meta.glob 动态导入 _posts 目录下的所有 MD 文件
const posts = import.meta.glob('../../_posts/*.md', { eager: true, query: '?raw', import: 'default' });

// 获取所有文章
const getAllPosts = (): Post[] => {
  const postEntries = Object.entries(posts);

  return postEntries
    .map(([path, module]) => {
      // 从路径中提取 slug
      const slug = path.replace(/^\.\.\/\.\.\/_posts\//, '').replace(/\.md$/, '');
      const fileContents = module as string;
      
      // 处理Markdown内容中的环境变量引用
      const processedContent = processMarkdownContent(fileContents);
      
      // 使用 gray-matter 解析 MD 文件的 frontmatter
      const { data, content } = matter(processedContent);

      return {
        slug,
        title: (data.title as string) || 'Untitled Post',
        date: (data.date as string) || new Date().toISOString(),
        coverImage: (data.coverImage as string) || '',
        author: (data.author as { name: string; picture: string }) || { name: 'Anonymous', picture: '' },
        excerpt: (data.excerpt as string) || '',
        ogImage: (data.ogImage as { url: string }) || { url: '' },
        content,
      };
    })
    // 按日期降序排序
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
};

// 根据 slug 获取单个文章
const getPostBySlug = (slug: string): Post | undefined => {
  const allPosts = getAllPosts();
  return allPosts.find(post => post.slug === slug);
};

export {
  getAllPosts,
  getPostBySlug,
};