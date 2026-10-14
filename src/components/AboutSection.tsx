import React from 'react';
import { BookOpen, GraduationCap, Award, Compass, Users, CheckCircle2 } from 'lucide-react';
import { EDITORIAL_TEAM } from '../data/articles';

export const AboutSection: React.FC = () => {
  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Hero Badge & Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wide uppercase mb-3 border border-blue-200">
          <GraduationCap className="w-3.5 h-3.5" />
          Academic & Educational Initiative
        </div>
        <h1 className="font-serif-editorial text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4">
          Demystifying the <span className="text-blue-600 italic">Digital Landscape</span> for Tomorrow's Leaders
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          "The Digital Lifestyle" is a dedicated educational publication created to bridge the divide between rapid technological breakthroughs and everyday human comprehension.
        </p>
      </div>

      {/* College Project Statement Card */}
      <div className="mb-16 p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-blue-950 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-400/30">
              <Award className="w-3.5 h-3.5" /> College Project Showcase
            </div>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold mb-3 text-white">
              An Academic Capstone in Modern Digital Journalism
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Developed as a rigorous college curriculum project, this platform demonstrates full-stack web engineering, accessible responsive UI design, and 10 thoroughly researched, original educational articles on technology, artificial intelligence, digital marketing, social media, and Indian digital business.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 shrink-0 text-center w-full md:w-auto">
            <span className="block text-3xl font-extrabold text-blue-400">10 / 10</span>
            <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold block mt-1">
              Curated Articles
            </span>
            <span className="text-[11px] text-blue-200 block mt-0.5">Zero Lorem Ipsum</span>
          </div>
        </div>
      </div>

      {/* Editorial Mission & Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-serif-editorial text-xl font-bold text-slate-900 mb-2">Original Rigor</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Every article is crafted from verified foundational concepts, real market dynamics, and clear pedagogical explanations rather than clickbait sensationalism.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-serif-editorial text-xl font-bold text-slate-900 mb-2">Practical Utility</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            From password managers and local SEO audits to understanding ONDC protocols, each guide provides actionable frameworks readers can implement today.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-serif-editorial text-xl font-bold text-slate-900 mb-2">Universal Access</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Designed to be lightweight, responsive across all mobile devices, legible with dynamic font scaling, and accompanied by built-in text narration.
          </p>
        </div>
      </div>

      {/* Five Core Knowledge Tracks Covered */}
      <div className="mb-16 p-8 rounded-3xl bg-slate-50 border border-slate-200">
        <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-slate-900 mb-6 text-center">
          Our Five Educational Pillars
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Artificial Intelligence</h4>
              <p className="text-xs text-slate-500 mt-1">Impact on daily lifestyle routines, neural nets, and workplace augmentation.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Social Media & Creators</h4>
              <p className="text-xs text-slate-500 mt-1">Influencer economics, nano-creator trust, and brand community storytelling.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Digital Marketing</h4>
              <p className="text-xs text-slate-500 mt-1">Small business growth playbooks, local search SEO, and short-form video hooks.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Indian Digital Business</h4>
              <p className="text-xs text-slate-500 mt-1">ONDC open commerce, quick commerce logistics, and the India Stack revolution.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Cybersecurity & Identity</h4>
              <p className="text-xs text-slate-500 mt-1">Digital hygiene, MFA authentication, phishing protection, and personal branding.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Team */}
      <div>
        <div className="text-center mb-10">
          <h2 className="font-serif-editorial text-3xl font-bold text-slate-950">
            The Editorial Board
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            The passionate minds and researchers behind The Digital Lifestyle articles
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EDITORIAL_TEAM.map((member) => (
            <div key={member.name} className="p-6 rounded-2xl bg-white border border-slate-200 text-center hover:shadow-lg transition-all">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-4 ring-blue-50"
              />
              <h3 className="font-serif-editorial text-lg font-bold text-slate-900">{member.name}</h3>
              <p className="text-xs text-blue-600 font-semibold mb-3">{member.role}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
