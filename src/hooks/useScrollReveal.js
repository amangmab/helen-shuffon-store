import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook that reveals elements when they enter the viewport.
 * Uses Intersection Observer for performance.
 */
export function useScrollReveal({ threshold = 0.05, rootMargin = '0px 0px -20px 0px' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Immediately reveal if reduced motion
      if (ref.current) ref.current.classList.add('revealed');
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    // Small delay to ensure elements are rendered and positioned
    const timer = requestAnimationFrame(() => {
      observer.observe(el);
    });

    return () => {
      cancelAnimationFrame(timer);
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return ref;
}

/**
 * Hook that reveals multiple children with staggered delays.
 * Apply to a parent container — children with [data-reveal] get animated.
 */
export function useStaggerReveal({ threshold = 0.05, rootMargin = '0px 0px -20px 0px', stagger = 100 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = ref.current;
    if (!container) return;

    const children = container.querySelectorAll('[data-reveal]');

    if (prefersReducedMotion) {
      children.forEach(child => child.classList.add('revealed'));
      return;
    }

    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * stagger}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            children.forEach(child => child.classList.add('revealed'));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    const timer = requestAnimationFrame(() => {
      observer.observe(container);
    });

    return () => {
      cancelAnimationFrame(timer);
      observer.disconnect();
    };
  }, [threshold, rootMargin, stagger]);

  return ref;
}
