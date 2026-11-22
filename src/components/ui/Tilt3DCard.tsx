'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  tiltMaxAngle?: number;
  scaleOnHover?: number;
  glareOpacity?: number;
}

export const Tilt3DCard: React.FC<Tilt3DCardProps> = ({
  children,
  className = '',
  tiltMaxAngle = 10,
  scaleOnHover = 1.02,
  glareOpacity = 0.15,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch / non-hover pointer capabilities
    if (typeof window !== 'undefined') {
      const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      if (!hasHover) {
        setIsTouchDevice(true);
      }

      const mql = window.matchMedia('(hover: hover) and (pointer: fine)');
      const handler = (e: MediaQueryListEvent) => {
        setIsTouchDevice(!e.matches);
      };
      mql.addEventListener?.('change', handler);
      return () => {
        mql.removeEventListener?.('change', handler);
      };
    }
  }, []);

  // Raw mouse coordinates relative to center (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to avoid jerky movements
  const springConfig = { damping: 25, stiffness: 350 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  // Transformations
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [tiltMaxAngle, -tiltMaxAngle]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-tiltMaxAngle, tiltMaxAngle]);

  // Glare position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleTouchStart = () => {
    // Immediately disable tilt on touch contact for hybrid / touch screen devices
    if (!isTouchDevice) {
      setIsTouchDevice(true);
      setIsHovered(false);
      x.set(0);
      y.set(0);
    }
  };

  // On touch devices, render cleanly without 3D rotation transforms
  // so native vertical touch scrolling is 100% fluid and free of stutter.
  if (isTouchDevice) {
    return (
      <div
        ref={cardRef}
        onTouchStart={handleTouchStart}
        className={`relative ${className}`}
      >
        <div className="h-full w-full">{children}</div>
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      style={{
        rotateX,
        rotateY,
        transformOrigin: 'center center',
      }}
      animate={{
        scale: isHovered ? scaleOnHover : 1,
      }}
      transition={{
        scale: { type: 'spring', stiffness: 350, damping: 25 },
      }}
      className={`relative ${className}`}
    >
      {/* 3D Specular Sheen Layer */}
      {glareOpacity > 0 && isHovered && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] overflow-hidden mix-blend-overlay transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 350px at ${glareX} ${glareY}, rgba(255,255,255,${glareOpacity}), transparent 80%)`,
          }}
        />
      )}

      {/* Card Content with 100% crisp font rendering */}
      <div className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
};

export default Tilt3DCard;
