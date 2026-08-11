export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  author?: string;
  category?: string;
  tags?: string[];
  draft?: boolean;
  featured?: boolean;
  cover?: string;
  updated?: string;
  readTime: number;
}
