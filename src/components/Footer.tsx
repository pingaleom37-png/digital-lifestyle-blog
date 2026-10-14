import React, { useState } from 'react';
import { BookOpen, Send, CheckCircle, ArrowRight, Heart } from 'lucide-react';
import { ViewMode } from '../types';
import { CATEGORIES } from '../data/articles';

interface FooterProps {
  onNavigate: (view: ViewMode, category?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 3000);
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900 mt-20">
      
      {/* Newsletter Magazine Callout */}
      <div className="border-b border-slate-900 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Weekly Educational Dispatch
            </span>
            <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white">
              Stay ahead in Tech, AI & Digital Business
            </h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Join students, educators, and technology enthusiasts who receive our weekly analytical digests without spam or advertisements.
            </p>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Thank you for subscribing! Your syllabus digest is on the way.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your university or personal email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-3 text-xs sm:text-sm bg-slate-800/90 text-white placeholder-slate-400 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-serif-editorial text-2xl font-bold tracking-tight text-white">
                The Digital Lifestyle
              </span>
            </div>
            
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              An educational journal dedicated to exploring artificial intelligence, digital marketing, social media dynamics, cybersecurity, and digital business in India.
            </p>

            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-800 text-blue-400 border border-slate-700">
                Academic Capstone Edition • 10 Deep Articles
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore Pages
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Home Edition
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('articles')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  All 10 Articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  About the Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Knowledge Tracks */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Core Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => onNavigate('articles', cat)}
                    className="hover:text-blue-400 transition-colors text-left block"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic Statement */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Project Credential
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Authored and developed as a complete college capstone project. Designed for academic review, GitHub publishing, and Vercel cloud deployment.
            </p>
            <p className="text-[11px] text-slate-500">
              Engineered with modern React, Tailwind CSS, TypeScript & Lucide icons.
            </p>
          </div>

        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-8 mt-12 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} The Digital Lifestyle. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('about')} className="hover:text-slate-300 transition-colors">
              Editorial Policy
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-slate-300 transition-colors">
              Academic Fair Use
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-300 transition-colors">
              Contact Desk
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
