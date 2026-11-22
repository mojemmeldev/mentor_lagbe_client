'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Sigma,
  Atom,
  FlaskConical,
  Dna,
  Code2,
  Languages,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

interface SubjectCard {
  name: string;
  count: string;
  filter: string;
  iconBg: string;
  iconColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SUBJECT_CARDS: SubjectCard[] = [
  {
    name: 'Mathematics',
    count: '60+ classes',
    filter: 'mathematics',
    iconBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    icon: Sigma,
  },
  {
    name: 'Physics',
    count: '38+ classes',
    filter: 'physics',
    iconBg: 'bg-amber-50 dark:bg-amber-950/40',
    iconColor: 'text-amber-600 dark:text-amber-400',
    icon: Atom,
  },
  {
    name: 'Chemistry',
    count: '30+ classes',
    filter: 'chemistry',
    iconBg: 'bg-brand-50 dark:bg-brand-500/20',
    iconColor: 'text-brand-600 dark:text-brand-100',
    icon: FlaskConical,
  },
  {
    name: 'Biology',
    count: '25+ classes',
    filter: 'biology',
    iconBg: 'bg-rose-50 dark:bg-rose-950/40',
    iconColor: 'text-rose-600 dark:text-rose-400',
    icon: Dna,
  },
  {
    name: 'Programming',
    count: '50+ classes',
    filter: 'coding',
    iconBg: 'bg-sky-50 dark:bg-sky-950/40',
    iconColor: 'text-sky-600 dark:text-sky-400',
    icon: Code2,
  },
  {
    name: 'English & IELTS',
    count: '40+ classes',
    filter: 'ielts',
    iconBg: 'bg-purple-50 dark:bg-purple-950/40',
    iconColor: 'text-purple-600 dark:text-purple-400',
    icon: Languages,
  },
];

interface OrbSpec {
  title: string;
  sub: string;
  filter: string;
  r: number;
  c1: string;
  c2: string;
  text: string;
}

const ORB_SPECS: OrbSpec[] = [
  { title: 'BUET', sub: 'Mentors', filter: 'buet', r: 44, c1: '#FAF8F5', c2: '#E4DFD5', text: '#0F2922' },
  { title: 'Physics', sub: '38+ classes', filter: 'physics', r: 58, c1: '#F28B7D', c2: '#E05A47', text: '#FFFFFF' },
  { title: 'Programming', sub: '50+ classes', filter: 'coding', r: 64, c1: '#48A98E', c2: '#276655', text: '#FFFFFF' },
  { title: 'Mathematics', sub: '60+ classes', filter: 'mathematics', r: 64, c1: '#FCD34D', c2: '#F59E0B', text: '#0F2922' },
  { title: 'DMC', sub: 'Medical', filter: 'dmc', r: 44, c1: '#FAF8F5', c2: '#E4DFD5', text: '#0F2922' },
  { title: 'Chemistry', sub: '30+ classes', filter: 'chemistry', r: 58, c1: '#FCA58E', c2: '#C94836', text: '#FFFFFF' },
  { title: 'DU', sub: 'Mentors', filter: 'du', r: 42, c1: '#FAF8F5', c2: '#E4DFD5', text: '#0F2922' },
  { title: 'IELTS', sub: '40+ classes', filter: 'ielts', r: 56, c1: '#6EE7B7', c2: '#10B981', text: '#0F2922' },
  { title: 'Biology', sub: '25+ classes', filter: 'biology', r: 56, c1: '#FDE68A', c2: '#D97706', text: '#0F2922' },
];

interface ActiveOrb extends OrbSpec {
  radius: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const SubjectsPhysicsSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<ActiveOrb[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Counter state
  const [activeLearners, setActiveLearners] = useState(1500);
  const [verifiedMentors, setVerifiedMentors] = useState(350);
  const [satisfaction, setSatisfaction] = useState(98);
  const [districts, setDistricts] = useState(64);
  const [isCounterBouncing, setIsCounterBouncing] = useState(false);

  const dispatchBatchFilter = (filterKey: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('mentorlagbe:filter-batches', {
          detail: { filter: filterKey },
        })
      );
      const batchesEl = document.getElementById('batches');
      if (batchesEl) {
        batchesEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleShake = () => {
    orbsRef.current.forEach((o) => {
      o.vy = -12 - Math.random() * 8;
      o.vx = (Math.random() - 0.5) * 18;
    });
  };

  const replayCounters = () => {
    setIsCounterBouncing(true);
    setTimeout(() => setIsCounterBouncing(false), 500);

    const startTime = performance.now();
    const duration = 1200;

    const step = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setActiveLearners(Math.floor(ease * 1500));
      setVerifiedMentors(Math.floor(ease * 350));
      setSatisfaction(Math.floor(ease * 98));
      setDistricts(Math.floor(ease * 64));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setActiveLearners(1500);
        setVerifiedMentors(350);
        setSatisfaction(98);
        setDistricts(64);
      }
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let canvasW = 0;
    let canvasH = 0;
    let draggedOrb: ActiveOrb | null = null;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let pointerDownX = 0;
    let pointerDownY = 0;
    let pointerMoved = false;
    let hoveredOrb: ActiveOrb | null = null;

    const resizePhysicsCanvas = () => {
      const rect = wrapper.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasW = rect.width;
      canvasH = rect.height;
      canvas.width = Math.round(canvasW * dpr);
      canvas.height = Math.round(canvasH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const scaleFactor = canvasW < 640 ? 0.72 : 1;
      if (orbsRef.current.length === 0) {
        orbsRef.current = ORB_SPECS.map((spec, idx) => {
          const radius = Math.round(spec.r * scaleFactor);
          const spacing = canvasW / (ORB_SPECS.length + 1);
          return {
            ...spec,
            radius,
            x: spacing * (idx + 1),
            y: -radius - idx * 42,
            vx: (Math.random() - 0.5) * 4,
            vy: Math.random() * 2,
          };
        });
      } else {
        orbsRef.current.forEach((orb) => {
          orb.radius = Math.round(orb.r * scaleFactor);
          orb.x = Math.max(orb.radius, Math.min(canvasW - orb.radius, orb.x));
          orb.y = Math.max(orb.radius, Math.min(canvasH - orb.radius, orb.y));
        });
      }
    };

    resizePhysicsCanvas();
    const ro = new ResizeObserver(resizePhysicsCanvas);
    ro.observe(wrapper);

    const getPointerPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const isTouch = 'touches' in e && e.touches.length > 0;
      const clientX = isTouch ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = isTouch ? e.touches[0].clientY : (e as MouseEvent).clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const findOrbAt = (x: number, y: number) => {
      for (let i = orbsRef.current.length - 1; i >= 0; i--) {
        const o = orbsRef.current[i];
        const dx = x - o.x;
        const dy = y - o.y;
        if (dx * dx + dy * dy <= o.radius * o.radius) {
          return o;
        }
      }
      return null;
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const pos = getPointerPos(e);
      pointerDownX = pos.x;
      pointerDownY = pos.y;
      lastPointerX = pos.x;
      lastPointerY = pos.y;
      pointerMoved = false;

      const hit = findOrbAt(pos.x, pos.y);
      if (hit) {
        draggedOrb = hit;
        dragOffsetX = pos.x - hit.x;
        dragOffsetY = pos.y - hit.y;
        hit.vx = 0;
        hit.vy = 0;
      }
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const pos = getPointerPos(e);
      if (Math.hypot(pos.x - pointerDownX, pos.y - pointerDownY) > 6) {
        pointerMoved = true;
      }

      if (draggedOrb) {
        if ('cancelable' in e && e.cancelable) e.preventDefault();
        draggedOrb.vx = (pos.x - lastPointerX) * 0.55;
        draggedOrb.vy = (pos.y - lastPointerY) * 0.55;
        draggedOrb.x = Math.max(draggedOrb.radius, Math.min(canvasW - draggedOrb.radius, pos.x - dragOffsetX));
        draggedOrb.y = Math.max(draggedOrb.radius, Math.min(canvasH - draggedOrb.radius, pos.y - dragOffsetY));
      } else {
        const hit = findOrbAt(pos.x, pos.y);
        hoveredOrb = hit;
        canvas.style.cursor = hit ? 'pointer' : 'grab';
      }

      lastPointerX = pos.x;
      lastPointerY = pos.y;
    };

    const onPointerUp = () => {
      if (draggedOrb && !pointerMoved) {
        const selected = draggedOrb;
        draggedOrb = null;
        dispatchBatchFilter(selected.filter);
        return;
      }
      draggedOrb = null;
    };

    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    canvas.addEventListener('touchstart', onPointerDown, { passive: false });
    canvas.addEventListener('touchmove', onPointerMove, { passive: false });
    canvas.addEventListener('touchend', onPointerUp);

    const stepPhysics = () => {
      const gravity = 0.42;
      const bounce = 0.72;
      const friction = 0.992;
      const orbs = orbsRef.current;

      // Integrate positions & wall bounds
      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i];
        if (o === draggedOrb) continue;

        o.vy += gravity;
        o.vx *= friction;
        o.vy *= friction;
        o.x += o.vx;
        o.y += o.vy;

        // Floor & Ceiling
        if (o.y + o.radius > canvasH - 6) {
          o.y = canvasH - 6 - o.radius;
          o.vy *= -bounce;
          o.vx *= 0.96;
          if (Math.abs(o.vy) < 0.8) o.vy = 0;
        } else if (o.y - o.radius < 4 && o.vy < 0) {
          o.y = 4 + o.radius;
          o.vy *= -bounce;
        }

        // Left & Right walls
        if (o.x - o.radius < 6) {
          o.x = 6 + o.radius;
          o.vx *= -bounce;
        } else if (o.x + o.radius > canvasW - 6) {
          o.x = canvasW - 6 - o.radius;
          o.vx *= -bounce;
        }
      }

      // Circle-to-Circle elastic collisions (2 iterations)
      for (let iter = 0; iter < 2; iter++) {
        for (let i = 0; i < orbs.length; i++) {
          for (let j = i + 1; j < orbs.length; j++) {
            const a = orbs[i];
            const b = orbs[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.hypot(dx, dy);
            const minDist = a.radius + b.radius;

            if (dist > 0 && dist < minDist) {
              const overlap = (minDist - dist) * 0.5;
              const nx = dx / dist;
              const ny = dy / dist;

              if (a !== draggedOrb) {
                a.x -= nx * overlap;
                a.y -= ny * overlap;
              }
              if (b !== draggedOrb) {
                b.x += nx * overlap;
                b.y += ny * overlap;
              }

              const rvx = b.vx - a.vx;
              const rvy = b.vy - a.vy;
              const velAlongNormal = rvx * nx + rvy * ny;

              if (velAlongNormal < 0) {
                const restitution = 0.68;
                const impulse = -(1 + restitution) * velAlongNormal * 0.5;
                if (a !== draggedOrb) {
                  a.vx -= impulse * nx;
                  a.vy -= impulse * ny;
                }
                if (b !== draggedOrb) {
                  b.vx += impulse * nx;
                  b.vy += impulse * ny;
                }
              }
            }
          }
        }
      }

      // Render Orbs
      ctx.clearRect(0, 0, canvasW, canvasH);

      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i];
        const isHovered = o === hoveredOrb || o === draggedOrb;

        ctx.save();

        // Drop shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
        ctx.shadowBlur = isHovered ? 22 : 14;
        ctx.shadowOffsetY = 6;

        // 3D Spherical Radial Gradient
        const grad = ctx.createRadialGradient(
          o.x - o.radius * 0.32,
          o.y - o.radius * 0.35,
          o.radius * 0.1,
          o.x,
          o.y,
          o.radius
        );
        grad.addColorStop(0, o.c1);
        grad.addColorStop(1, o.c2);

        ctx.beginPath();
        ctx.arc(o.x, o.y, o.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Reset shadow for rim stroke
        ctx.shadowColor = 'transparent';
        ctx.lineWidth = isHovered ? 2.5 : 1.2;
        ctx.strokeStyle = isHovered ? '#FAF8F5' : 'rgba(255, 255, 255, 0.35)';
        ctx.stroke();

        // Glossy Specular Highlight
        const gloss = ctx.createRadialGradient(
          o.x - o.radius * 0.35,
          o.y - o.radius * 0.38,
          1,
          o.x - o.radius * 0.35,
          o.y - o.radius * 0.38,
          o.radius * 0.45
        );
        gloss.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
        gloss.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gloss;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.radius, 0, Math.PI * 2);
        ctx.fill();

        // Typography
        ctx.fillStyle = o.text;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const titleSize = Math.max(11, Math.round(o.radius * 0.24));
        const subSize = Math.max(9, Math.round(o.radius * 0.17));

        ctx.font = `800 ${titleSize}px "Plus Jakarta Sans", sans-serif`;
        ctx.fillText(o.title, o.x, o.y - subSize * 0.65);

        ctx.font = `600 ${subSize}px "Plus Jakarta Sans", sans-serif`;
        ctx.globalAlpha = 0.85;
        ctx.fillText(o.sub, o.x, o.y + titleSize * 0.72);

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(stepPhysics);
    };

    animFrameRef.current = requestAnimationFrame(stepPhysics);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
      canvas.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      canvas.removeEventListener('touchstart', onPointerDown);
      canvas.removeEventListener('touchmove', onPointerMove);
      canvas.removeEventListener('touchend', onPointerUp);
    };
  }, []);

  return (
    <section id="subjects" className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-brand-500 font-bold text-xs uppercase tracking-widest">
            Pick a Field
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-[#F5F2EB] mt-2">
            Where Do You Want to Grow?
          </h2>
        </div>

        {/* 6 Discipline Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
          {SUBJECT_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => dispatchBatchFilter(card.filter)}
                className="bg-white dark:bg-[#0F241E] p-5 rounded-3xl border border-forest-900/10 dark:border-white/10 text-center hover:border-brand-500 hover:-translate-y-1 transition-all shadow-card group cursor-pointer"
              >
                <div
                  className={`w-12 h-12 mx-auto rounded-2xl ${card.iconBg} ${card.iconColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-forest-900 dark:text-white">{card.name}</h3>
                <p className="text-xs text-forest-800/60 dark:text-white/60 mt-1 font-semibold">{card.count}</p>
              </button>
            );
          })}
        </div>

        {/* Interactive 2D Physics Gravity Orbs Card */}
        <div
          id="physicsPlaygroundCard"
          className="mb-14 rounded-[2.5rem] border-4 border-white dark:border-[#1F2C34] shadow-soft overflow-hidden relative"
          style={{
            backgroundColor: '#0F2922',
            backgroundImage: 'radial-gradient(rgba(250, 248, 245, 0.14) 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
          }}
        >
          {/* Playground Top Bar */}
          <div className="px-6 sm:px-8 pt-6 pb-2 flex flex-wrap items-center justify-between gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-500 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Explore the Mentorship Galaxy
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1.5">
                Drag an Orb to Discover Matching Batches
              </h3>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="hidden sm:inline-block text-xs font-medium text-white/70 bg-white/10 px-3.5 py-2 rounded-full">
                Toss the orbs, then click one to filter
              </span>
              <button
                type="button"
                onClick={handleShake}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-[0_12px_30px_-6px_rgba(20,175,81,0.35)] transition-all active:scale-95 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Shuffle the Orbs</span>
              </button>
            </div>
          </div>

          {/* Physics Canvas Wrapper */}
          <div ref={wrapperRef} id="gravityOrbsWrapper" className="w-full h-[330px] sm:h-[370px] relative">
            <canvas ref={canvasRef} id="gravityOrbsCanvas" className="w-full h-full block" />
          </div>
        </div>

        {/* Interactive Community Counter Banner */}
        <div
          id="communityStatsCard"
          onClick={replayCounters}
          title="Click to replay the counters"
          className={`cursor-pointer bg-forest-900 dark:bg-[#0F241E] rounded-[2.5rem] p-8 sm:p-12 text-white grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative overflow-hidden group transition-transform ${
            isCounterBouncing ? 'scale-95 duration-150' : 'scale-100 duration-300'
          }`}
        >
          <div className="p-3 rounded-2xl transition-colors group-hover:bg-white/5">
            <p className="font-serif text-4xl sm:text-5xl font-bold text-brand-500">
              {activeLearners.toLocaleString()}+
            </p>
            <p className="text-sm font-semibold text-white/80 mt-2">Learners Active</p>
          </div>

          <div className="p-3 rounded-2xl transition-colors group-hover:bg-white/5">
            <p className="font-serif text-4xl sm:text-5xl font-bold text-brand-500">
              {verifiedMentors.toLocaleString()}+
            </p>
            <p className="text-sm font-semibold text-white/80 mt-2">Mentors Verified</p>
          </div>

          <div className="p-3 rounded-2xl transition-colors group-hover:bg-white/5">
            <p className="font-serif text-4xl sm:text-5xl font-bold text-emerald-400">
              {satisfaction}%
            </p>
            <p className="text-sm font-semibold text-white/80 mt-2">Satisfaction Rate</p>
          </div>

          <div className="p-3 rounded-2xl transition-colors group-hover:bg-white/5">
            <p className="font-serif text-4xl sm:text-5xl font-bold text-sky-400">
              {districts}
            </p>
            <p className="text-sm font-semibold text-white/80 mt-2">Districts Served</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubjectsPhysicsSection;
