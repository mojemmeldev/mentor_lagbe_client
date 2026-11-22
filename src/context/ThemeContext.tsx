'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

export interface RippleState {
  active: boolean;
  targetTheme: Theme;
  origin: { x: number; y: number };
}

interface ThemeContextType {
  theme: Theme;
  rippleState: RippleState | null;
  toggleTheme: (e?: React.MouseEvent) => void;
  setTheme: (theme: Theme, origin?: { x: number; y: number }) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [rippleState, setRippleState] = useState<RippleState | null>(null);

  useEffect(() => {
    const isDarkAlready = document.documentElement.classList.contains('dark');
    const savedTheme = localStorage.getItem('mentorlagbe_theme') as Theme | null;
    const initialTheme: Theme = savedTheme || (isDarkAlready ? 'dark' : 'light');
    setThemeState(initialTheme);
  }, []);

  const setTheme = (newTheme: Theme, origin?: { x: number; y: number }) => {
    const x = origin?.x ?? 40;
    const y = origin?.y ?? (typeof window !== 'undefined' ? window.innerHeight - 40 : 800);

    // 1. Immediately apply theme to background DOM & storage with zero delay
    setThemeState(newTheme);
    localStorage.setItem('mentorlagbe_theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // 2. Concurrently run the high z-index circular expansion wave on top
    setRippleState({
      active: true,
      targetTheme: newTheme,
      origin: { x, y }
    });

    // 3. Remove overlay cleanly when the 1.25s GPU wave finishes
    setTimeout(() => {
      setRippleState(null);
    }, 1250);
  };

  const toggleTheme = (e?: React.MouseEvent | any) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const origin = (e && typeof e.clientX === 'number' && !isNaN(e.clientX) && e.clientX > 0)
      ? { x: Math.round(e.clientX), y: Math.round(e.clientY) }
      : { x: 40, y: typeof window !== 'undefined' ? window.innerHeight - 40 : 800 };
    setTheme(nextTheme, origin);
  };

  return (
    <ThemeContext.Provider value={{ theme, rippleState, toggleTheme, setTheme }}>
      {rippleState?.active && (
        <div
          className="theme-ripple-overlay"
          aria-hidden="true"
          style={{ zIndex: 2147483646 }}
        >
          {/* Layer 1: Expanding Radiant Shockwave Halo Ring */}
          <div
            className={`theme-ripple-shockwave ${
              rippleState.targetTheme === 'dark'
                ? 'theme-ripple-shockwave-dark'
                : 'theme-ripple-shockwave-light'
            }`}
            style={{
              ['--ripple-x' as any]: `${rippleState.origin.x}px`,
              ['--ripple-y' as any]: `${rippleState.origin.y}px`,
            }}
          />

          {/* Layer 2: Primary Celestial Radial Gradient Spherical Wave */}
          <div
            className={`theme-ripple-wave ${
              rippleState.targetTheme === 'dark'
                ? 'theme-ripple-wave-dark'
                : 'theme-ripple-wave-light'
            }`}
            style={{
              ['--ripple-x' as any]: `${rippleState.origin.x}px`,
              ['--ripple-y' as any]: `${rippleState.origin.y}px`,
            }}
          />

          {/* Layer 3: Origin Core Flare Burst */}
          <div
            className={`theme-ripple-core-burst ${
              rippleState.targetTheme === 'dark'
                ? 'theme-ripple-burst-dark'
                : 'theme-ripple-burst-light'
            }`}
            style={{
              ['--ripple-x' as any]: `${rippleState.origin.x}px`,
              ['--ripple-y' as any]: `${rippleState.origin.y}px`,
            }}
          />

          {/* Layer 4: Cinematic Brand Text Reveal (MentorLagbe) */}
          <div className="theme-ripple-text-container" aria-hidden="true">
            <div
              className={`theme-ripple-text-pill ${
                rippleState.targetTheme === 'dark'
                  ? 'theme-ripple-text-dark'
                  : 'theme-ripple-text-light'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500 animate-pulse" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] opacity-80">
                  {rippleState.targetTheme === 'dark' ? 'Nightfall Atmosphere' : 'Solar Dawn Atmosphere'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500 animate-pulse" />
              </div>
              <div className="theme-ripple-brand-title font-serif">
                MentorLagbe
              </div>
            </div>
          </div>
        </div>
      )}
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
