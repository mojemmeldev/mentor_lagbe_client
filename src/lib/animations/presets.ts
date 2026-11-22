import { gsap, ScrollTrigger } from './gsap-config';

/**
 * Utility to check if the user has requested reduced motion in their OS / browser settings.
 */
export const isReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Standard Motion Presets (TweenVars)
 */
export const motionPresets = {
  fadeUp: {
    y: 35,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  },
  fadeIn: {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
  },
  stagger: {
    y: 25,
    opacity: 0,
    stagger: 0.1,
    duration: 0.7,
    ease: 'power2.out',
  },
  scaleIn: {
    scale: 0.94,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.4)',
  },
} as const;

/**
 * FadeUp animation preset
 */
export const fadeUp = (
  target: gsap.DOMTarget,
  vars?: gsap.TweenVars
): gsap.core.Tween => {
  if (isReducedMotion()) {
    return gsap.fromTo(
      target,
      { opacity: 0 },
      { opacity: 1, duration: 0.05, ...vars }
    );
  }

  return gsap.from(target, {
    y: 35,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    ...vars,
  });
};

/**
 * Stagger Reveal animation preset for lists and card grids
 */
export const staggerReveal = (
  targets: gsap.DOMTarget,
  vars?: gsap.TweenVars,
  staggerAmount: number = 0.1
): gsap.core.Tween => {
  if (isReducedMotion()) {
    return gsap.fromTo(
      targets,
      { opacity: 0 },
      { opacity: 1, duration: 0.05, stagger: 0, ...vars }
    );
  }

  return gsap.from(targets, {
    y: 30,
    opacity: 0,
    stagger: staggerAmount,
    duration: 0.7,
    ease: 'power2.out',
    ...vars,
  });
};

/**
 * Text reveal animation preset (for headlines, subheadings)
 */
export const textReveal = (
  target: gsap.DOMTarget,
  vars?: gsap.TweenVars
): gsap.core.Tween => {
  if (isReducedMotion()) {
    return gsap.fromTo(
      target,
      { opacity: 0 },
      { opacity: 1, duration: 0.05, ...vars }
    );
  }

  return gsap.from(target, {
    y: 25,
    opacity: 0,
    duration: 0.9,
    ease: 'power4.out',
    ...vars,
  });
};

export interface CounterOptions {
  endValue: number;
  startValue?: number;
  duration?: number;
  ease?: string;
  decimals?: number;
  scrollTrigger?: ScrollTrigger.Vars | string | Element;
  onUpdate?: (currentValue: number) => void;
}

/**
 * Counter animation for statistics & numeric metrics
 */
export const counterAnimation = (
  target: gsap.DOMTarget | { value: number },
  options: CounterOptions
): gsap.core.Tween => {
  const {
    endValue,
    startValue = 0,
    duration = 2,
    ease = 'power2.out',
    decimals = 0,
    scrollTrigger,
    onUpdate,
  } = options;

  const counterState = { value: startValue };

  if (isReducedMotion()) {
    counterState.value = endValue;
    if (onUpdate) onUpdate(endValue);
    if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) el.textContent = decimals > 0 ? endValue.toFixed(decimals) : Math.round(endValue).toLocaleString();
    } else if (target && typeof target === 'object' && 'nodeType' in target && (target as any).nodeType === 1) {
      (target as HTMLElement).textContent = decimals > 0 ? endValue.toFixed(decimals) : Math.round(endValue).toLocaleString();
    }
    return gsap.to(counterState, { value: endValue, duration: 0.01 });
  }

  return gsap.to(counterState, {
    value: endValue,
    duration,
    ease,
    scrollTrigger,
    onUpdate: () => {
      const current =
        decimals > 0
          ? parseFloat(counterState.value.toFixed(decimals))
          : Math.round(counterState.value);

      if (onUpdate) {
        onUpdate(current);
      }

      if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (el) el.textContent = decimals > 0 ? current.toFixed(decimals) : current.toLocaleString();
      } else if (target && typeof target === 'object' && 'nodeType' in target && (target as any).nodeType === 1) {
        (target as HTMLElement).textContent = decimals > 0 ? current.toFixed(decimals) : current.toLocaleString();
      }
    },
  });
};

/**
 * Scroll Progress bar or fill indicator animation
 */
export const scrollProgress = (
  target: gsap.DOMTarget,
  triggerElement?: gsap.DOMTarget,
  vars?: gsap.TweenVars
): gsap.core.Tween => {
  return gsap.fromTo(
    target,
    { scaleX: 0, transformOrigin: 'left center' },
    {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: triggerElement || (typeof document !== 'undefined' ? document.body : undefined),
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
        ...(vars?.scrollTrigger as object),
      },
      ...vars,
    }
  );
};
