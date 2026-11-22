'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface SubjectItem {
  name: string;
  count: string;
  icon: string;
  href: string;
}

const subjects: SubjectItem[] = [
  { name: 'Mathematics', count: '45+ live classes', icon: '📐', href: '/tuitions?subject=Mathematics' },
  { name: 'Physics', count: '38+ live classes', icon: '⚡', href: '/tuitions?subject=Physics' },
  { name: 'Chemistry', count: '30+ live classes', icon: '🧪', href: '/tuitions?subject=Chemistry' },
  { name: 'Biology', count: '25+ live classes', icon: '🧬', href: '/tuitions?subject=Biology' },
  { name: 'Programming', count: '50+ live classes', icon: '💻', href: '/tuitions?subject=Programming' },
  { name: 'English & IELTS', count: '40+ live classes', icon: '🌐', href: '/tuitions?subject=English' },
];

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  suffix = '',
  duration = 1600,
  className = '',
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * target);
      setCount(current);
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted, target, duration]);

  return (
    <p ref={ref} className={className}>
      {count.toLocaleString()}
      {suffix}
    </p>
  );
};

export const SubjectsStats: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="default" className="mb-2">
            Browse Disciplines
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            Find Your Subject
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Pick a discipline to see focused batches and subject specialists.
          </p>
        </div>

        {/* 6 Subject Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {subjects.map((sub) => (
            <motion.div
              key={sub.name}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            >
              <Link
                href={sub.href}
                className="flex flex-col items-center text-center p-5 rounded-3xl border-2 border-border bg-card shadow-[0_4px_0_0_hsl(var(--border))] hover:border-primary transition-all group h-full justify-center"
              >
                <span className="text-3xl mb-2 group-hover:scale-115 transition-transform">
                  {sub.icon}
                </span>
                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  {sub.name}
                </span>
                <span className="text-[11px] font-semibold text-muted-foreground mt-0.5">
                  {sub.count}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Platform Counters in Elevated Flat Card with Animated Numbers */}
        <div className="mt-16 rounded-3xl bg-card border-2 border-border p-6 sm:p-10 shadow-[0_6px_0_0_hsl(var(--border))]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {/* Stat 1: 1,500+ */}
            <div>
              <AnimatedCounter
                target={1500}
                suffix="+"
                className="text-3xl sm:text-4xl font-black text-foreground"
              />
              <p className="text-xs sm:text-sm font-bold text-muted-foreground mt-1">
                Active Learners
              </p>
            </div>

            {/* Stat 2: 350+ */}
            <div>
              <AnimatedCounter
                target={350}
                suffix="+"
                className="text-3xl sm:text-4xl font-black text-primary"
              />
              <p className="text-xs sm:text-sm font-bold text-muted-foreground mt-1">
                Checked Mentors
              </p>
            </div>

            {/* Stat 3: 98% */}
            <div>
              <AnimatedCounter
                target={98}
                suffix="%"
                className="text-3xl sm:text-4xl font-black text-foreground"
              />
              <p className="text-xs sm:text-sm font-bold text-muted-foreground mt-1">
                Acceptance Rate
              </p>
            </div>

            {/* Stat 4: 64 */}
            <div>
              <AnimatedCounter
                target={64}
                className="text-3xl sm:text-4xl font-black text-secondary"
              />
              <p className="text-xs sm:text-sm font-bold text-muted-foreground mt-1">
                Districts Reached
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubjectsStats;
