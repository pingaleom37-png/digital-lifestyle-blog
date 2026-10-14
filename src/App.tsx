import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Sparkles,
  SlidersHorizontal,
  LayoutGrid,
  List,
  BookOpen,
  ArrowRight,
  TrendingUp,
  BookmarkCheck,
  GraduationCap
} from 'lucide-react';

import { Article, ViewMode } from './types';
import { ARTICLES, CATEGORIES } from './data/articles';
import { Navbar } from './components/Navbar';
import { HeroFeatured } from './components/HeroFeatured';
import { ArticleCard } from './components/ArticleCard';
import { ArticleView } from './components/ArticleView';
import { CategoryFilter } from './components/CategoryFilter';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { BookmarkDrawer } from './components/BookmarkDrawer';
import { Footer } from './components/Footer';

const STORAGE_KEY = 'the_digital_lifestyle_bookmarks';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : ['art-1', 'art-6']; // default 2 sample saves
    } catch {
      return ['art-1', 'art-6'];
    }
  });
  const [isBookmarkDrawerOpen, setIsBookmarkDrawerOpen] = useState(false);
  const [articlesLayout, setArticlesLayout] = useState<'grid' | 'horizontal'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'time'>('date');

  // Sync bookmarks with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedArticleIds));
    } catch (e) {
      console.error('Failed to sync bookmarks to localStorage', e);
    }
  }, [savedArticleIds]);

  // Handle URL hash changes for direct linking & browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === 'home') {
        setCurrentView('home');
        setSelectedArticle(null);
      } else if (hash === 'articles') {
        setCurrentView('articles');
        setSelectedArticle(null);
      } else if (hash === 'about') {
        setCurrentView('about');
        setSelectedArticle(null);
      } else if (hash === 'contact') {
        setCurrentView('contact');
        setSelectedArticle(null);
      } else {
        const found = ARTICLES.find((a) => a.slug === hash);
        if (found) {
          setSelectedArticle(found);
          setCurrentView('article-detail');
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Set URL hash when view changes
  const navigateTo = (view: ViewMode, category?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    setCurrentView(view);
    setSelectedArticle(null);

    if (view === 'home') {
      window.location.hash = 'home';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'articles') {
      window.location.hash = 'articles';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'about') {
      window.location.hash = 'about';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'contact') {
      window.location.hash = 'contact';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentView('article-detail');
    window.location.hash = article.slug;
  };

  const toggleBookmark = (e?: React.MouseEvent, articleId?: string) => {
    if (e) e.stopPropagation();
    if (!articleId) return;

    setSavedArticleIds((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId]
    );
  };

  const clearAllBookmarks = () => {
    setSavedArticleIds([]);
  };

  // Filter and search computation
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;

      // Search match
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        article.title.toLowerCase().includes(query) ||
        article.subtitle.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.author.name.toLowerCase().includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        article.sections.some((s) =>
          s.paragraphs.some((p) => p.toLowerCase().includes(query))
        );

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'views') return b.views - a.views;
      if (sortBy === 'time') return parseInt(b.readTime) - parseInt(a.readTime);
      return 0; // Default order in articles.ts
    });
  }, [selectedCategory, searchQuery, sortBy]);

  // Compute counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: ARTICLES.length };
    for (const cat of CATEGORIES) {
      if (cat !== 'All') {
        counts[cat] = ARTICLES.filter((a) => a.category === cat).length;
      }
    }
    return counts;
  }, []);

  const featuredArticle = ARTICLES[0]; // "How Artificial Intelligence Is Changing Everyday Life"
  const trendingArticles = ARTICLES.filter((a) => a.trending);
  const savedArticlesList = ARTICLES.filter((a) => savedArticleIds.includes(a.id));

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans-editorial">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={navigateTo}
        savedCount={savedArticleIds.length}
        onOpenBookmarks={() => setIsBookmarkDrawerOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          if (query && currentView !== 'articles' && currentView !== 'home') {
            setCurrentView('articles');
          }
        }}
      />

      {/* Main Content Areas based on currentView */}
      <main className="flex-1">
        {/* VIEW 1: SINGLE ARTICLE DETAIL PAGE */}
        {currentView === 'article-detail' && selectedArticle && (
          <ArticleView
            article={selectedArticle}
            allArticles={ARTICLES}
            onSelectArticle={handleSelectArticle}
            onBack={() => navigateTo('articles')}
            isBookmarked={savedArticleIds.includes(selectedArticle.id)}
            onToggleBookmark={(id) => toggleBookmark(undefined, id)}
          />
        )}

        {/* VIEW 2: ABOUT SECTION */}
        {currentView === 'about' && <AboutSection />}

        {/* VIEW 3: CONTACT SECTION */}
        {currentView === 'contact' && <ContactSection />}

        {/* VIEW 4: HOMEPAGE */}
        {currentView === 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            
            {/* If user searched while on home, show search banner */}
            {searchQuery ? (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif-editorial text-2xl font-bold text-slate-900">
                    Search Results for "{searchQuery}"
                  </h2>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    Clear Search
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onSelect={handleSelectArticle}
                      isBookmarked={savedArticleIds.includes(article.id)}
                      onToggleBookmark={toggleBookmark}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Hero Featured & Trending Grid */}
                <HeroFeatured
                  featuredArticle={featuredArticle}
                  trendingArticles={trendingArticles}
                  onSelectArticle={handleSelectArticle}
                  isBookmarked={(id) => savedArticleIds.includes(id)}
                  onToggleBookmark={toggleBookmark}
                />

                {/* Categories & Filter Bar */}
                <div className="mb-8 pt-4 border-t border-slate-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-slate-950">
                        Explore Topics
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Select a domain to filter articles across technology, business, and digital culture
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <CategoryFilter
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                        categoryCounts={categoryCounts}
                      />
                    </div>
                  </div>

                  {/* Articles Grid - All 10 accessible */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArticles.map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        onSelect={handleSelectArticle}
                        isBookmarked={savedArticleIds.includes(article.id)}
                        onToggleBookmark={toggleBookmark}
                      />
                    ))}
                  </div>

                  {filteredArticles.length === 0 && (
                    <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200">
                      <p className="text-slate-600 font-medium">No articles found matching this filter.</p>
                      <button
                        onClick={() => {
                          setSelectedCategory('All');
                          setSearchQuery('');
                        }}
                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
                      >
                        Reset Filters
                      </button>
                    </div>
                  )}
                </div>

                {/* College Project Showcase Callout Banner */}
                <section className="my-16 p-8 sm:p-10 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-xl">
                  <div className="max-w-2xl relative z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-3">
                      <GraduationCap className="w-4 h-4" /> Academic Capstone Project
                    </span>
                    <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold mb-3 text-white">
                      Original Research Meets Modern Magazine Architecture
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                      "The Digital Lifestyle" was engineered to demonstrate a complete digital publishing suite: full responsive layouts, category indexing, bookmarking state, search indexing, and 10 complete educational guides.
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => navigateTo('articles')}
                        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors inline-flex items-center gap-2"
                      >
                        Explore All 10 Deep Dives <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigateTo('about')}
                        className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
                      >
                        Read Editorial Mission
                      </button>
                    </div>
                  </div>
                </section>
              </>
            )}

          </div>
        )}

        {/* VIEW 5: ALL ARTICLES PAGE */}
        {currentView === 'articles' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">
                The Complete Journal Archive
              </span>
              <h1 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-3">
                All 10 Educational Articles
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Browse our complete collection of in-depth guides covering Artificial Intelligence, Social Media Marketing, Small Business Growth, Personal Branding, Cybersecurity, and India's Digital Business.
              </p>
            </div>

            {/* Filter and Control Bar */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 mb-8 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Category Pills */}
                <CategoryFilter
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  categoryCounts={categoryCounts}
                />

                {/* View Layout Toggle & Sort */}
                <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                  <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 text-xs">
                    <button
                      onClick={() => setArticlesLayout('grid')}
                      className={`p-1.5 rounded-lg transition-colors ${
                        articlesLayout === 'grid'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title="Grid Layout"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setArticlesLayout('horizontal')}
                      className={`p-1.5 rounded-lg transition-colors ${
                        articlesLayout === 'horizontal'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title="Magazine List Layout"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                  >
                    <option value="date">Default Sequence</option>
                    <option value="views">Most Read</option>
                    <option value="time">Reading Length</option>
                  </select>
                </div>
              </div>

              {/* Search Bar inside Articles View */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by topic, keyword, or author (e.g. AI, ONDC, Instagram, Cybersecurity)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-3 text-xs font-semibold text-slate-400 hover:text-slate-700"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Articles List / Grid */}
            <div className="mb-6 flex items-center justify-between text-xs text-slate-500">
              <p>
                Showing <span className="font-bold text-slate-900">{filteredArticles.length}</span> of {ARTICLES.length} complete articles
              </p>
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Clear Category Filter
                </button>
              )}
            </div>

            {articlesLayout === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onSelect={handleSelectArticle}
                    isBookmarked={savedArticleIds.includes(article.id)}
                    onToggleBookmark={toggleBookmark}
                    layout="grid"
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onSelect={handleSelectArticle}
                    isBookmarked={savedArticleIds.includes(article.id)}
                    onToggleBookmark={toggleBookmark}
                    layout="horizontal"
                  />
                ))}
              </div>
            )}

            {filteredArticles.length === 0 && (
              <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200">
                <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="font-serif-editorial text-xl font-bold text-slate-900 mb-1">
                  No Matching Articles Found
                </h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto mb-4">
                  We couldn't find any articles matching your search criteria. Try a different keyword or reset filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bookmarks Slide-Over Drawer */}
      <BookmarkDrawer
        isOpen={isBookmarkDrawerOpen}
        onClose={() => setIsBookmarkDrawerOpen(false)}
        savedArticles={savedArticlesList}
        onSelectArticle={handleSelectArticle}
        onRemoveBookmark={toggleBookmark}
        onClearAll={clearAllBookmarks}
      />

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
