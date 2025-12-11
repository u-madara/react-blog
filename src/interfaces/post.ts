export interface Author {
  name: string;
  picture: string;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: { url: string };
  content: string;
}