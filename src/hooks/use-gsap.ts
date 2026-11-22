'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/animations/gsap-config';
import { isReducedMotion } from '@/lib/animations/presets';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export type GsapEffectCallback = (
  context: gsap.Context,
  isReduced: boolean
) => void | (() => void);

export interface UseGsapOptions {
  scope?: React.RefObject<Element | null | undefined> | Element | string | null;
  dependencies?: any[];
  revertOnUpdate?: boolean;
}

/**
 * Custom React hook for robust GSAP animation lifecycle management.
 * Wraps animation logic in `gsap.context()`, automatically scoping selector queries
 * and cleaning up all animations/ScrollTriggers via `ctx.revert()` when unmounting or re-running.
 *
 * Supports signatures:
 * 1. useGsap(effect, scopeRef, deps)
 * 2. useGsap(effect, deps)
 * 3. useGsap(effect, { scope, dependencies })
 */
export function useGsap(
  effect: GsapEffectCallback,
  scopeOrDepsOrOptions?:
    | React.RefObject<Element | null | undefined>
    | any[]
    | UseGsapOptions
    | null,
  depsOrNothing?: any[]
): void {
  let scopeRef: React.RefObject<Element | null | undefined> | undefined;
  let dependencies: any[] = [];

  if (Array.isArray(scopeOrDepsOrOptions)) {
    dependencies = scopeOrDepsOrOptions;
  } else if (scopeOrDepsOrOptions && 'current' in scopeOrDepsOrOptions) {
    scopeRef = scopeOrDepsOrOptions as React.RefObject<Element | null | undefined>;
    if (Array.isArray(depsOrNothing)) {
      dependencies = depsOrNothing;
    }
  } else if (scopeOrDepsOrOptions && typeof scopeOrDepsOrOptions === 'object') {
    const opts = scopeOrDepsOrOptions as UseGsapOptions;
    if (opts.scope && typeof opts.scope === 'object' && 'current' in opts.scope) {
      scopeRef = opts.scope as React.RefObject<Element | null | undefined>;
    }
    if (Array.isArray(opts.dependencies)) {
      dependencies = opts.dependencies;
    }
  }

  const effectRef = useRef(effect);
  effectRef.current = effect;

  useIsomorphicLayoutEffect(() => {
    const reduced = isReducedMotion();
    const scopeElement = scopeRef?.current || undefined;

    const ctx = gsap.context((context) => {
      return effectRef.current(context, reduced);
    }, scopeElement);

    return () => {
      ctx.revert();
    };
  }, dependencies);
}

export default useGsap;
