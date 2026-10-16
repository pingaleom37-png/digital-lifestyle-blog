import React from 'react';
import { ArrowRight, Clock, Eye, Sparkles, TrendingUp, Bookmark } from 'lucide-react';
import { Article } from '../types';
import { SafeImage } from './SafeImage';

interface HeroFeaturedProps {
  featuredArticle: Article;
  trendingArticles: Article[];
  onSelectArticle: (article: Article) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (e: React.MouseEvent, id: string) => void;
}

export const HeroFeatured: React.FC<HeroFeaturedProps> = ({
  featuredArticle,
  trendingArticles,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark
}) => {
  return (
    <section className="mb-14">
      {/* Editorial Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wide uppercase mb-3 border border-blue-200/60">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          The Digital Lifestyle Edition
        </div>
        <h1 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15] mb-4">
          Navigating the Frontiers of <span className="text-blue-600 italic">Technology</span>, AI & Business
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          A modern educational journal breaking down artificial intelligence, digital marketing, the creator economy, and India’s digital commerce evolution.
        </p>
      </div>

      {/* Main Magazine Lead Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left: Primary Hero Story (7 cols) */}
        <div
          onClick={() => onSelectArticle(featuredArticle)}
          className="lg:col-span-7 group bg-white rounded-3xl border border-slate-200/90 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
        >
          <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
            <SafeImage
              src={featuredArticle.heroImage}
              alt={featuredArticle.heroImageAlt}
              category={featuredArticle.category}
              type="hero"
              priority={true}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-95 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-blue-600 text-white shadow-md">
                Featured Lead Story
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-slate-800 shadow-sm">
                {featuredArticle.category}
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <button
                onClick={(e) => onToggleBookmark(e, featuredArticle.id)}
                className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
                  isBookmarked(featuredArticle.id)
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/90 text-slate-700 hover:bg-white hover:text-blue-600'
                }`}
                title="Save story"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked(featuredArticle.id) ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                <span className="flex items-center gap-1 font-semibold text-blue-600">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredArticle.readTime}
                </span>
                <span>•</span>
                <span>{featuredArticle.publishedAt}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  {featuredArticle.views.toLocaleString()} readers
                </span>
              </div>

              <h2 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-slate-950 group-hover:text-blue-600 transition-colors leading-tight mb-3">
                {featuredArticle.title}
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
                {featuredArticle.excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SafeImage
                  src={featuredArticle.author.avatar}
                  alt={featuredArticle.author.name}
                  type="avatar"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{featuredArticle.author.name}</h4>
                  <p className="text-xs text-slate-500">{featuredArticle.author.role}</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold group-hover:bg-blue-700 transition-colors shadow-sm">
                Read Complete Story <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>

        {/* Right: Trending Spotlights (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <h3 className="font-serif-editorial text-lg font-bold text-slate-900">
                Trending Dispatches
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">Curated for You</span>
          </div>

          <div className="space-y-4 flex-1 flex flex-col justify-between">
            {trendingArticles.slice(0, 3).map((article, idx) => (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="group/item bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-200 cursor-pointer flex gap-4 items-start"
              >
                <span className="font-serif-editorial text-2xl font-bold text-slate-300 group-hover/item:text-blue-600 transition-colors shrink-0 w-6">
                  0{idx + 1}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1.5">
                    <span className="text-blue-600 font-bold uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h4 className="font-serif-editorial text-base sm:text-lg font-bold text-slate-900 group-hover/item:text-blue-600 transition-colors leading-snug line-clamp-2 mb-1.5">
                    {article.title}
                  </h4>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100 hidden sm:block">
                  <SafeImage
                    src={article.heroImage}
                    alt={article.heroImageAlt}
                    category={article.category}
                    type="thumbnail"
                    className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Academic Magazine Stats */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/60 border border-blue-100 flex items-center justify-around text-center">
            <div>
              <p className="text-xl font-extrabold text-blue-700">10</p>
              <p className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Full Articles</p>
            </div>
            <div className="w-px h-8 bg-blue-200" />
            <div>
              <p className="text-xl font-extrabold text-blue-700">5</p>
              <p className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Core Tracks</p>
            </div>
            <div className="w-px h-8 bg-blue-200" />
            <div>
              <p className="text-xl font-extrabold text-blue-700">100%</p>
              <p className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Educational</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
