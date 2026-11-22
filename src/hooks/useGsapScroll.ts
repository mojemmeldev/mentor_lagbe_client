'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export function useGsapScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // 1. Smooth Anchor Navigation via GSAP ScrollToPlugin
      const anchors = document.querySelectorAll('a[href^="#"]');
      anchors.forEach((anchor) => {
        const handleAnchorClick = (e: Event) => {
          const targetId = anchor.getAttribute('href');
          if (targetId && targetId.length > 1 && targetId.startsWith('#')) {
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
              e.preventDefault();
              gsap.to(window, {
                duration: 0.9,
                scrollTo: { y: targetEl as HTMLElement, offsetY: 88 },
                ease: 'power3.inOut',
              });
            }
          }
        };
        anchor.addEventListener('click', handleAnchorClick);
      });

      // 2. Interactive Scroll-Triggered Counters (.gsap-counter)
      const counters = document.querySelectorAll<HTMLElement>('.gsap-counter');
      counters.forEach((counterEl) => {
        ScrollTrigger.create({
          trigger: counterEl,
          start: 'top 92%',
          once: true,
          onEnter: () => {
            const rawTarget = counterEl.dataset.target || counterEl.innerText || '0';
            const target = parseFloat(rawTarget);
            const decimals = parseInt(counterEl.dataset.decimals || '0', 10);
            const suffix = counterEl.dataset.suffix || '';
            const separator = counterEl.dataset.separator || '';
            const proxy = { val: 0 };

            gsap.to(proxy, {
              val: target,
              duration: 1.85,
              ease: 'power3.out',
              onUpdate: () => {
                let formatted =
                  decimals > 0
                    ? proxy.val.toFixed(decimals)
                    : Math.round(proxy.val).toString();
                if (separator) {
                  formatted = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
                }
                counterEl.textContent = formatted + suffix;
              },
            });
          },
        });
      });

      // 3. Bidirectional Blur-Reveal with CRISP Hover Guarantee
      // clearProps: 'filter,transform' guarantees cards have NO residual blur on hover
      const blurReveals = [
        { selector: '.gsap-section-header', y: 24, stagger: 0 },
        { selector: '.gsap-why-card', y: 32, stagger: 0.12 },
        { selector: '.gsap-subject-card', y: 28, stagger: 0.08 },
        { selector: '.gsap-trust-point', y: 24, stagger: 0.1 },
        { selector: '.gsap-testimonial-card', y: 30, stagger: 0.12 },
        { selector: '.gsap-faq-item', y: 20, stagger: 0.08 },
        { selector: '.gsap-cta-card', y: 28, stagger: 0.14 },
      ];

      blurReveals.forEach(({ selector, y, stagger }) => {
        const els = gsap.utils.toArray<HTMLElement>(selector);
        if (els.length > 0) {
          gsap.fromTo(
            els,
            { y, opacity: 0, filter: 'blur(10px)', scale: 0.97 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.72,
              stagger,
              ease: 'power3.out',
              clearProps: 'filter,transform', // Crisp clean state for zero hover blur
              scrollTrigger: {
                trigger: els[0],
                start: 'top 88%',
                once: true,
              },
            }
          );
        }
      });

      // 4. Hero Section Line-by-Line Mask Reveal
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      const heroBadge = document.querySelector('.hero-badge');
      const heroLines = document.querySelectorAll('#heroHeadline .line-inner');
      const heroSubtitle = document.querySelector('.hero-subtitle');
      const heroCta = document.querySelector('.hero-cta-group');
      const heroSocial = document.querySelector('.hero-social');
      const heroChat = document.querySelector('#heroChatShowcase');

      if (heroBadge) {
        heroTl.from(heroBadge, {
          y: 16,
          opacity: 0,
          filter: 'blur(6px)',
          duration: 0.55,
          clearProps: 'all',
        });
      }
      if (heroLines.length > 0) {
        heroTl.from(
          heroLines,
          {
            yPercent: 105,
            opacity: 0,
            duration: 0.72,
            stagger: 0.1,
            clearProps: 'all',
          },
          '-=0.3'
        );
      }
      if (heroSubtitle) {
        heroTl.from(
          heroSubtitle,
          {
            y: 20,
            opacity: 0,
            filter: 'blur(6px)',
            duration: 0.6,
            clearProps: 'all',
          },
          '-=0.45'
        );
      }
      if (heroCta) {
        heroTl.from(
          heroCta,
          {
            y: 22,
            opacity: 0,
            filter: 'blur(6px)',
            duration: 0.6,
            clearProps: 'all',
          },
          '-=0.4'
        );
      }
      if (heroSocial) {
        heroTl.from(
          heroSocial,
          {
            y: 16,
            opacity: 0,
            duration: 0.5,
            clearProps: 'all',
          },
          '-=0.35'
        );
      }
      if (heroChat) {
        heroTl.fromTo(
          heroChat,
          { clipPath: 'inset(18% 0% 0% 0% round 2.25rem)', opacity: 0, y: 24 },
          {
            clipPath: 'inset(0% 0% 0% 0% round 2.25rem)',
            opacity: 1,
            y: 0,
            duration: 0.85,
            clearProps: 'all',
          },
          '-=0.7'
        );
      }

      // 5. Kinetic Ribbon Scrub
      const ribbon = document.querySelector('#kineticRibbonSection');
      const ribbonTrack = document.querySelector('#kineticRibbonTrack') as HTMLElement | null;
      if (ribbon && ribbonTrack) {
        gsap.to(ribbon, {
          scrollTrigger: {
            trigger: ribbon,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.4,
            onUpdate: (self) => {
              ribbonTrack.style.marginLeft = `${-self.progress * 110}px`;
            },
          },
        });
      }

      // 6. Trust Pillars Slide-In
      const pillars = gsap.utils.toArray<HTMLElement>('.gsap-pillar-item');
      const pillarsSection = document.querySelector('#trustPillarsSection');
      if (pillars.length > 0 && pillarsSection) {
        gsap.set(pillars, { x: -70, opacity: 0 });
        gsap.to(pillars, {
          x: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.2,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: pillarsSection,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 0.65,
          },
        });
      }

      // 7. Featured Tuition Batch Cards Entrance
      const batchCards = gsap.utils.toArray<HTMLElement>('.gsap-batch-card');
      const batchesContainer =
        document.querySelector('#batchesContainer') || document.querySelector('#batches');
      if (batchCards.length > 0) {
        gsap.fromTo(
          batchCards,
          { y: 36, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: batchesContainer || batchCards[0],
              start: 'top 88%',
              once: true,
            },
          }
        );
      }

      // 8. The Old Way vs MentorLagbe Perspective Shift Scrub
      const oldCard = document.querySelector('#compareOldCard');
      const newCard = document.querySelector('#compareNewCard');
      const compareSection = document.querySelector('#scrollCompareSection');
      if (oldCard && newCard && compareSection) {
        gsap.fromTo(
          oldCard,
          { opacity: 0.5, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            ease: 'none',
            clearProps: 'all',
            scrollTrigger: {
              trigger: compareSection,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 0.6,
            },
          }
        );
        gsap.fromTo(
          newCard,
          { y: 32, opacity: 0.5, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'none',
            clearProps: 'all',
            scrollTrigger: {
              trigger: compareSection,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 0.6,
            },
          }
        );
      }

      // 9. Learning Journey Progress Line & Steps Scrub
      const progressLine = document.querySelector('#journeyProgressLine');
      const journeySteps = gsap.utils.toArray<HTMLElement>('.journey-step');
      const journeyContainer = document.querySelector('#journeyContainer');

      if (journeySteps.length > 0 && journeyContainer) {
        gsap.set(journeySteps, { x: -50, opacity: 0, scale: 0.96 });
        const journeyTl = gsap.timeline({
          scrollTrigger: {
            trigger: journeyContainer,
            start: 'top 85%',
            end: 'top 25%',
            scrub: 1,
            onUpdate: (self) => {
              const activeIndex = Math.min(
                journeySteps.length - 1,
                Math.floor(self.progress * (journeySteps.length + 0.3))
              );
              journeySteps.forEach((step, idx) => {
                if (idx <= activeIndex && self.progress > 0.03) {
                  step.classList.add('border-terracotta-500', 'shadow-soft');
                  step.classList.remove('border-forest-900/10');
                } else {
                  step.classList.remove('border-terracotta-500', 'shadow-soft');
                  step.classList.add('border-forest-900/10');
                }
              });
            },
          },
        });

        if (progressLine) {
          journeyTl.to(progressLine, { scaleX: 1, duration: 1, ease: 'none' }, 0);
        }
        journeyTl.to(
          journeySteps,
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.2,
            ease: 'power2.out',
            clearProps: 'all',
          },
          0
        );
      }

      // 10. Pricing Cards Entrance
      const freeCard = document.querySelector('#pricingFreeCard');
      const proCard = document.querySelector('#pricingProCard');
      const pricingWrapper = document.querySelector('#pricingCardsWrapper');

      if (freeCard && proCard && pricingWrapper) {
        gsap.fromTo(
          freeCard,
          { x: -50, y: 24, opacity: 0, scale: 0.95 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: pricingWrapper,
              start: 'top 86%',
              once: true,
            },
          }
        );
        gsap.fromTo(
          proCard,
          { x: 50, y: 24, opacity: 0, scale: 0.95 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            delay: 0.12,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: pricingWrapper,
              start: 'top 86%',
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
}

/**
 * Lightweight hook to apply GSAP staggered card & header reveals to any page
 */
export function usePageGsapReveal() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // 1. Page Header Reveal
      const header = document.querySelector('.page-header-reveal');
      if (header) {
        gsap.fromTo(
          header,
          { y: 20, opacity: 0, filter: 'blur(8px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.6,
            ease: 'power3.out',
            clearProps: 'filter,transform',
          }
        );
      }

      // 2. Grid Cards Stagger Entrance
      const cards = gsap.utils.toArray<HTMLElement>('.page-card-reveal');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power3.out',
            clearProps: 'all', // Zero residual transform or filter on hover
            scrollTrigger: {
              trigger: cards[0],
              start: 'top 90%',
              once: true,
            },
          }
        );
      }

      // 3. Counters
      const counters = document.querySelectorAll<HTMLElement>('.gsap-counter');
      counters.forEach((counterEl) => {
        ScrollTrigger.create({
          trigger: counterEl,
          start: 'top 92%',
          once: true,
          onEnter: () => {
            const rawTarget = counterEl.dataset.target || counterEl.innerText || '0';
            const target = parseFloat(rawTarget);
            const decimals = parseInt(counterEl.dataset.decimals || '0', 10);
            const suffix = counterEl.dataset.suffix || '';
            const proxy = { val: 0 };

            gsap.to(proxy, {
              val: target,
              duration: 1.6,
              ease: 'power3.out',
              onUpdate: () => {
                const formatted =
                  decimals > 0
                    ? proxy.val.toFixed(decimals)
                    : Math.round(proxy.val).toString();
                counterEl.textContent = formatted + suffix;
              },
            });
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return pageRef;
}
