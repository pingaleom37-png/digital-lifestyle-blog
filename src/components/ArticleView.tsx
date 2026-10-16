import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  Clock,
  Copy,
  Eye,
  Share2,
  Tag,
  BookOpen,
  Volume2,
  VolumeX,
  Type,
  ChevronRight
} from 'lucide-react';
import { Article } from '../types';
import { SafeImage } from './SafeImage';

interface ArticleViewProps {
  article: Article;
  allArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  allArticles,
  onSelectArticle,
  onBack,
  isBookmarked,
  onToggleBookmark
}) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Scroll to top when article opens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsSpeaking(false);
    window.speechSynthesis?.cancel();
  }, [article.slug]);

  // Track reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Text to speech simulation / browser speech synthesis
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${article.title}. ${article.subtitle}. By ${article.author.name}. ${article.excerpt}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleCopyLink = () => {
    const url = window.location.href.split('#')[0] + '#' + article.slug;
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Find currentIndex, next and previous articles for sequential reading
  const currentIndex = allArticles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : allArticles[allArticles.length - 1];
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : allArticles[0];

  // Related articles (same category or next ones)
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .sort((a, b) => (a.category === article.category ? -1 : 1))
    .slice(0, 3);

  // Font size classes
  const fontClass = {
    normal: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-relaxed',
    xlarge: 'text-xl sm:text-2xl leading-relaxed'
  }[fontSize];

  return (
    <article className="min-h-screen pb-20">
      {/* Sticky Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-100 z-50">
        <div
          className="h-full bg-blue-600 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Top Controls & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100 text-xs sm:text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 font-semibold text-slate-700 hover:text-blue-600 transition-colors px-2 py-1 -ml-2 rounded-lg hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Articles
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-blue-600 font-medium truncate max-w-[150px] sm:max-w-none">
              {article.category}
            </span>
          </div>

          {/* Reader Preferences Bar */}
          <div className="flex items-center gap-2">
            {/* Font Size Adjuster */}
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded-md font-bold ${fontSize === 'normal' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
                title="Normal text size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded-md font-bold ${fontSize === 'large' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
                title="Large text size"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-1 rounded-md font-bold ${fontSize === 'xlarge' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
                title="Extra large text size"
              >
                A++
              </button>
            </div>

            {/* Read Aloud button */}
            <button
              onClick={toggleSpeech}
              className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isSpeaking
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600'
              }`}
              title={isSpeaking ? 'Stop narration' : 'Listen to article audio summary'}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{isSpeaking ? 'Mute' : 'Listen'}</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isBookmarked
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              title="Save for later"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-blue-600 text-blue-600' : ''}`} />
              <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="p-2 bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Copy link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200">
              {article.category}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              {article.readTime}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              {article.views.toLocaleString()} views
            </span>
          </div>

          <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.18] mb-4">
            {article.title}
          </h1>

          <p className="text-slate-600 text-lg sm:text-xl font-normal leading-relaxed mb-6 font-serif-editorial italic">
            {article.subtitle}
          </p>

          {/* Author Card */}
          <div className="flex items-center justify-between py-4 border-y border-slate-100">
            <div className="flex items-center gap-3 sm:gap-4">
              <SafeImage
                src={article.author.avatar}
                alt={article.author.name}
                type="avatar"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100"
              />
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">{article.author.name}</h3>
                <p className="text-xs text-slate-500">{article.author.role}</p>
              </div>
            </div>

            <div className="text-right text-xs text-slate-500">
              <p className="font-medium text-slate-700">Published on</p>
              <p>{article.publishedAt}</p>
            </div>
          </div>
        </header>

        {/* Hero Visual Image */}
        <figure className="mb-10">
          <div className="rounded-3xl overflow-hidden aspect-16/9 bg-slate-100 shadow-xl shadow-slate-200/50">
            <SafeImage
              src={article.heroImage}
              alt={article.heroImageAlt}
              category={article.category}
              type="hero"
              priority={true}
              className="w-full h-full object-cover"
            />
          </div>
          <figcaption className="text-center text-xs text-slate-400 mt-3 italic">
            {article.heroImageAlt} — The Digital Lifestyle Editorial Archives
          </figcaption>
        </figure>

        {/* Quick Executive Abstract Callout */}
        <div className="p-6 sm:p-7 rounded-2xl bg-blue-50/70 border border-blue-100 text-slate-800 mb-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
            <BookOpen className="w-4 h-4" />
            Executive Summary
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
            {article.excerpt}
          </p>
        </div>

        {/* Table of Contents */}
        {article.sections.length > 2 && (
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 mb-10">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Table of Contents
            </p>
            <ul className="space-y-2 text-sm">
              {article.sections.map((section, idx) => (
                section.heading && (
                  <li key={idx}>
                    <a
                      href={`#section-${idx}`}
                      className="text-slate-700 hover:text-blue-600 font-medium flex items-center gap-2 transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
                      <span>{section.heading}</span>
                    </a>
                  </li>
                )
              ))}
            </ul>
          </div>
        )}

        {/* Article Body Sections */}
        <div className="space-y-10 text-slate-800">
          {article.sections.map((section, idx) => (
            <section key={idx} id={`section-${idx}`} className="scroll-mt-24 space-y-4">
              {section.heading && (
                <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-slate-950 pt-2 tracking-tight">
                  {section.heading}
                </h2>
              )}

              {/* Paragraphs */}
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className={`${fontClass} text-slate-700`}>
                  {p}
                </p>
              ))}

              {/* Callout Highlight box if present */}
              {section.highlightBox && (
                <div className="my-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white shadow-lg">
                  <h4 className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-1.5">
                    {section.highlightBox.title}
                  </h4>
                  <p className="text-slate-100 text-sm sm:text-base leading-relaxed">
                    {section.highlightBox.description}
                  </p>
                </div>
              )}

              {/* Pull quote if present */}
              {section.quote && (
                <blockquote className="my-8 border-l-4 border-blue-600 pl-6 py-2">
                  <p className="font-serif-editorial text-xl sm:text-2xl text-slate-900 italic leading-relaxed mb-2">
                    "{section.quote.text}"
                  </p>
                  {section.quote.author && (
                    <cite className="block text-xs uppercase tracking-wider font-bold text-blue-600 not-italic">
                      — {section.quote.author}
                    </cite>
                  )}
                </blockquote>
              )}

              {/* Key takeaways bullet list if present */}
              {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                <div className="my-6 p-5 sm:p-6 rounded-2xl bg-white border-2 border-blue-100 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    Key Strategic Takeaways
                  </h4>
                  <ul className="space-y-2.5">
                    {section.keyTakeaways.map((item, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-6 border-t border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-2">
              <Tag className="w-3.5 h-3.5" /> Filed under:
            </span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Bio Box */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <SafeImage
            src={article.author.avatar}
            alt={article.author.name}
            type="avatar"
            className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-md shrink-0"
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              Written by
            </p>
            <h3 className="text-lg font-bold text-slate-900">{article.author.name}</h3>
            <p className="text-xs text-slate-500 mb-2">{article.author.role}</p>
            <p className="text-sm text-slate-600 leading-relaxed">{article.author.bio}</p>
          </div>
        </div>

        {/* Sequential Next / Prev Article Navigation */}
        <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => onSelectArticle(prevArticle)}
            className="p-5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 text-left transition-all group"
          >
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1 group-hover:text-blue-600">
              <ArrowLeft className="w-3.5 h-3.5" /> Previous Article
            </span>
            <p className="font-serif-editorial text-base font-bold text-slate-900 group-hover:text-blue-600 line-clamp-1">
              {prevArticle.title}
            </p>
          </button>

          <button
            onClick={() => onSelectArticle(nextArticle)}
            className="p-5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 text-right transition-all group"
          >
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-end gap-1 mb-1 group-hover:text-blue-600">
              Next Article <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <p className="font-serif-editorial text-base font-bold text-slate-900 group-hover:text-blue-600 line-clamp-1">
              {nextArticle.title}
            </p>
          </button>
        </div>

        {/* Related Articles Section */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif-editorial text-2xl font-bold text-slate-900">
              Recommended Reads
            </h3>
            <button
              onClick={onBack}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              View all 10 articles →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectArticle(rel)}
                className="group cursor-pointer bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-400 hover:shadow-lg transition-all"
              >
                <div className="aspect-16/10 overflow-hidden bg-slate-100">
                  <SafeImage
                    src={rel.heroImage}
                    alt={rel.heroImageAlt}
                    category={rel.category}
                    type="thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                    {rel.category}
                  </span>
                  <h4 className="font-serif-editorial text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mt-1 mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{rel.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
};
