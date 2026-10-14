import React, { useState } from 'react';
import {
  Cpu,
  Share2,
  TrendingUp,
  Building2,
  ShieldCheck,
  User,
  Sparkles,
  ShoppingBag,
  Video,
  BookOpen
} from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  category?: string;
  type?: 'hero' | 'card' | 'avatar' | 'thumbnail';
  priority?: boolean;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  category = '',
  type = 'card',
  priority = false
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Choose appropriate fallback theme and icon based on category/type
  const getFallbackDetails = () => {
    switch (category) {
      case 'Artificial Intelligence':
        return {
          gradient: 'from-blue-600 via-indigo-700 to-slate-900',
          icon: <Cpu className="w-8 h-8 text-blue-200" />,
          label: 'Artificial Intelligence'
        };
      case 'Social Media':
        return {
          gradient: 'from-indigo-600 via-purple-700 to-slate-900',
          icon: <Share2 className="w-8 h-8 text-indigo-200" />,
          label: 'Social Media'
        };
      case 'Digital Marketing':
        return {
          gradient: 'from-sky-600 via-blue-700 to-slate-900',
          icon: <TrendingUp className="w-8 h-8 text-sky-200" />,
          label: 'Digital Marketing'
        };
      case 'Digital Business':
        return {
          gradient: 'from-blue-700 via-cyan-800 to-slate-950',
          icon: <Building2 className="w-8 h-8 text-cyan-200" />,
          label: 'Digital Business'
        };
      case 'Cybersecurity':
        return {
          gradient: 'from-slate-700 via-slate-800 to-slate-950',
          icon: <ShieldCheck className="w-8 h-8 text-slate-200" />,
          label: 'Cybersecurity'
        };
      case 'Personal Branding':
        return {
          gradient: 'from-cyan-700 via-blue-800 to-slate-950',
          icon: <User className="w-8 h-8 text-cyan-200" />,
          label: 'Personal Branding'
        };
      default:
        return {
          gradient: 'from-blue-600 via-slate-800 to-slate-950',
          icon: <BookOpen className="w-8 h-8 text-blue-200" />,
          label: 'The Digital Lifestyle'
        };
    }
  };

  const fallback = getFallbackDetails();

  if (hasError) {
    if (type === 'avatar') {
      return (
        <div
          className={`flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 text-white font-bold text-xs select-none ${className}`}
          title={alt}
        >
          {alt
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase() || <User className="w-4 h-4" />}
        </div>
      );
    }

    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-gradient-to-br ${fallback.gradient} text-white relative overflow-hidden ${className}`}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/20">
            {fallback.icon}
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-200/90 mt-1">
            {fallback.label}
          </span>
          {type === 'hero' && (
            <p className="text-xs text-slate-300 max-w-xs line-clamp-2 mt-1 font-medium">
              {alt}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-100">
      {/* Background skeleton gradient while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
