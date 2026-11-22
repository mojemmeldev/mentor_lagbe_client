'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'forest' | 'terracotta' | 'white';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
  variant = 'forest',
}) => {
  const sizeMap = {
    sm: { box: 'w-8 h-8', text: 'text-lg' },
    md: { box: 'w-10 h-10', text: 'text-xl' },
    lg: { box: 'w-12 h-12', text: 'text-2xl sm:text-3xl' },
  };

  const { box, text } = sizeMap[size];

  const boxBg =
    variant === 'terracotta'
      ? 'bg-brand-500'
      : variant === 'white'
      ? 'bg-white'
      : 'bg-forest-900 dark:bg-white';

  const textColor =
    variant === 'white' ? 'text-white' : 'text-forest-900 dark:text-white';

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group select-none transition-transform active:scale-95 ${className}`}
    >
      <div
        className={`${box} ${boxBg} rounded-full overflow-hidden flex items-center justify-center relative transition-transform duration-300 group-hover:scale-105 shadow-sm`}
      >
        <img
          src="/logo-icon-new.svg"
          alt="MentorLagbe logo"
          className="w-full h-full object-cover"
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-serif font-bold ${text} tracking-tight ${textColor} transition-colors`}>
            Mentor<span className="text-brand-500">Lagbe</span>
          </span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
