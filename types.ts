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

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  details: string[];
}

export interface AwardItem {
  year: string;
  title: string;
  rank?: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  link: string;
  repo: string;
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}
