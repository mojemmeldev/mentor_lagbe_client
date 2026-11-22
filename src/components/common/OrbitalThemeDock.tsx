'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, ArrowUp } from 'lucide-react';

export const OrbitalThemeDock: React.FC = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    toggleTheme(e);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!mounted) {
    return null;
  }

  // Hide floating dock in all dashboard routes (sidebar already has a dedicated theme toggle)
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

  const isDark = theme === 'dark';

  return (
    <div
      id="orbitalThemeDock"
      className="fixed left-4 sm:left-6 bottom-5 z-50 flex items-center gap-2.5 bg-white/95 dark:bg-[#0F241E]/95 backdrop-blur-md border border-forest-900/15 dark:border-white/15 px-2.5 py-2 rounded-full shadow-soft transition-all select-none"
    >
      <button
        id="themeToggleBtn"
        onClick={handleToggle}
        aria-label="Toggle Dark and Light Mode"
        title="Switch Day / Night Atmosphere"
        className="w-9 h-9 rounded-full bg-forest-900 text-brand-500 flex items-center justify-center shadow-sm hover:scale-110 active:scale-90 transition-all duration-300 relative overflow-hidden group focus:outline-none"
      >
        {isDark ? (
          <Sun id="themeSunIcon" className="w-4 h-4 text-brand-500 transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110" />
        ) : (
          <Moon id="themeMoonIcon" className="w-4 h-4 text-brand-500 transition-transform duration-500 group-hover:-rotate-45 group-hover:scale-110" />
        )}
      </button>

      <div className="flex flex-col pr-1">
        <span
          id="themeModeTag"
          className="text-[10px] font-extrabold uppercase tracking-wider text-forest-900 dark:text-[#F5F2EB] leading-none"
        >
          {isDark ? 'NIGHT' : 'DAY'}
        </span>
        <div
          className="w-12 h-1 rounded-full bg-forest-900/15 dark:bg-white/15 overflow-hidden mt-1.5 relative"
          title="Scroll Progress"
        >
          <div
            id="orbitalScrollBar"
            className="w-full h-full bg-terracotta-500 origin-left transition-transform duration-75"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>
      </div>

      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Back to top"
        className="w-7 h-7 rounded-full bg-cream dark:bg-forest-900 hover:bg-terracotta-500 dark:hover:bg-terracotta-500 text-forest-900 dark:text-[#F5F2EB] hover:text-white dark:hover:text-white flex items-center justify-center transition-colors"
      >
        <ArrowUp className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default OrbitalThemeDock;
