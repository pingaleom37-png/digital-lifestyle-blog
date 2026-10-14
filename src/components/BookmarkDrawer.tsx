import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, BookOpen } from 'lucide-react';
import { Article } from '../types';

interface BookmarkDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (e: React.MouseEvent, articleId: string) => void;
  onClearAll: () => void;
}

export const BookmarkDrawer: React.FC<BookmarkDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Bookmark className="w-4 h-4 fill-blue-600" />
              </div>
              <div>
                <h3 className="font-serif-editorial text-xl font-bold text-slate-900">
                  Saved Reading List
                </h3>
                <p className="text-xs text-slate-500">
                  {savedArticles.length} {savedArticles.length === 1 ? 'article' : 'articles'} bookmarked
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedArticles.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h4 className="font-serif-editorial text-lg font-bold text-slate-900 mb-1">
                  No Saved Articles Yet
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Click the bookmark icon on any article card to build your personalized reading list for later study.
                </p>
              </div>
            ) : (
              savedArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                  className="group p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex gap-3.5 items-start"
                >
                  <img
                    src={article.heroImage}
                    alt={article.heroImageAlt}
                    className="w-18 h-18 rounded-lg object-cover shrink-0 bg-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                      {article.category}
                    </span>
                    <h5 className="font-serif-editorial text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mt-0.5">
                      {article.title}
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-1">{article.readTime}</p>
                  </div>
                  <button
                    onClick={(e) => onRemoveBookmark(e, article.id)}
                    className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors shrink-0"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer actions */}
          {savedArticles.length > 0 && (
            <div className="p-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={onClearAll}
                className="text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors"
              >
                Clear All Bookmarks
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
              >
                Continue Reading
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
