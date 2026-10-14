export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface ArticleSection {
  heading?: string;
  level?: 'h2' | 'h3';
  paragraphs: string[];
  keyTakeaways?: string[];
  quote?: {
    text: string;
    author?: string;
  };
  highlightBox?: {
    title: string;
    description: string;
  };
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Artificial Intelligence' | 'Social Media' | 'Digital Marketing' | 'Digital Business' | 'Cybersecurity' | 'Personal Branding';
  tags: string[];
  author: Author;
  publishedAt: string;
  readTime: string;
  featured?: boolean;
  trending?: boolean;
  views: number;
  heroImage: string;
  heroImageAlt: string;
  excerpt: string;
  sections: ArticleSection[];
}

export type ViewMode = 'home' | 'articles' | 'article-detail' | 'about' | 'contact';
