import React, { useState } from 'react';
import { Bookmark, Menu, Search, X, BookOpen, Sparkles } from 'lucide-react';
import { ViewMode } from '../types';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode, category?: string) => void;
  savedCount: number;
  onOpenBookmarks: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  savedCount,
  onOpenBookmarks,
  searchQuery,
  onSearchChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleNavClick = (view: ViewMode) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      {/* Top micro bar with magazine publication date & academic project badge */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-600 text-white tracking-wide uppercase">
              Educational Journal
            </span>
            <span className="hidden sm:inline text-slate-400">Vol. IV • Curated Digital Insights</span>
            <span className="text-slate-500 hidden md:inline">•</span>
            <span className="hidden md:inline text-slate-400">10 Complete In-Depth Articles</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-300 font-medium">Daily Digital Magazine</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Updated for October 2026</span>
          </div>
        </div>
      </div>

      {/* Main Magazine Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => handleNavClick('home')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-blue-500/20 ring-1 ring-blue-500/30">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="font-serif-editorial text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 block leading-none">
                The Digital Lifestyle
              </span>
              <span className="text-[11px] tracking-wider uppercase text-blue-600 font-bold block mt-1">
                Tech • AI • Marketing • Business
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentView === 'home'
                  ? 'text-blue-600 bg-blue-50/80'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('articles')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentView === 'articles'
                  ? 'text-blue-600 bg-blue-50/80'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Articles
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentView === 'about'
                  ? 'text-blue-600 bg-blue-50/80'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentView === 'contact'
                  ? 'text-blue-600 bg-blue-50/80'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Action icons: Search & Bookmarks */}
          <div className="flex items-center gap-2">
            {/* Search toggler / bar */}
            <div className="relative hidden lg:block w-56">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-7 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-900 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Search button for medium/small screens */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Search articles"
              aria-label="Search articles"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Bookmarks Counter Button */}
            <button
              onClick={onOpenBookmarks}
              className="relative p-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1.5"
              title="Saved Articles"
              aria-label="Saved Articles"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Expandable Search row for mobile */}
        {searchOpen && (
          <div className="lg:hidden py-3 border-t border-slate-100">
            <div className="relative">
              <input
                type="text"
                autoFocus
                placeholder="Search across all 10 articles..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-9 py-2 text-sm bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-2.5 p-0.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-100 space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-lg ${
                currentView === 'home' ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('articles')}
              className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-lg ${
                currentView === 'articles' ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              All Articles (10)
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-lg ${
                currentView === 'about' ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              About The Journal
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-lg ${
                currentView === 'contact' ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Contact & Inquiries
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
