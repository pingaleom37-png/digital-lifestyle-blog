import React from 'react';
import { Bookmark, Clock, Eye, ArrowRight, Share2, Check } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (e: React.MouseEvent, articleId: string) => void;
  layout?: 'grid' | 'horizontal' | 'compact';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  isBookmarked,
  onToggleBookmark,
  layout = 'grid'
}) => {
  const [copied, setCopied] = React.useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Artificial Intelligence':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Social Media':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Digital Marketing':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'Digital Business':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Cybersecurity':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      case 'Personal Branding':
        return 'bg-cyan-50 text-cyan-800 border-cyan-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.origin + '#' + article.slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (layout === 'horizontal') {
    return (
      <article
        onClick={() => onSelect(article)}
        className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-950/5 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col md:flex-row"
      >
        <div className="md:w-5/12 relative overflow-hidden bg-slate-100 aspect-16/10 md:aspect-auto">
          <img
            src={article.heroImage}
            alt={article.heroImageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md bg-white/90 shadow-xs ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
          </div>
        </div>

        <div className="md:w-7/12 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
              <span className="flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                {article.readTime}
              </span>
              <span>•</span>
              <span>{article.publishedAt}</span>
            </div>

            <h3 className="font-serif-editorial text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-3">
              {article.title}
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">
              {article.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-2">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100"
              />
              <div>
                <p className="text-xs font-bold text-slate-800">{article.author.name}</p>
                <p className="text-[11px] text-slate-500 truncate max-w-[140px] sm:max-w-none">{article.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleShare}
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Copy article link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              </button>

              <button
                onClick={(e) => onToggleBookmark(e, article.id)}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-400 hover:text-blue-600 hover:bg-slate-50'
                }`}
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-blue-600' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Standard Grid Card
  return (
    <article
      onClick={() => onSelect(article)}
      className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
        <img
          src={article.heroImage}
          alt={article.heroImageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md bg-white/95 shadow-xs ${getCategoryColor(article.category)}`}>
            {article.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <button
            onClick={(e) => onToggleBookmark(e, article.id)}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-xs ${
              isBookmarked
                ? 'bg-blue-600 text-white'
                : 'bg-white/90 text-slate-600 hover:bg-white hover:text-blue-600'
            }`}
            title={isBookmarked ? 'Saved' : 'Save for later'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
            <span className="flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              {article.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              {article.views.toLocaleString()} reads
            </span>
          </div>

          <h3 className="font-serif-editorial text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-2.5">
            {article.title}
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">
            {article.excerpt}
          </p>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2.5">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-7 h-7 rounded-full object-cover ring-2 ring-slate-100"
            />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-800 truncate">{article.author.name}</p>
              <p className="text-[10px] text-slate-500">{article.publishedAt}</p>
            </div>
          </div>

          <span className="text-xs font-semibold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            Read <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
};
