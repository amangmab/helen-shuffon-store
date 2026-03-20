import { useEffect, useRef } from 'react';

/**
 * Hook that reveals elements when they enter the viewport.
 * Uses Intersection Observer for performance.
 *
 * @param {Object} options
 * @param {number} options.threshold - How much of the element must be visible (0-1)
 * @param {string} options.rootMargin - Margin around the root
 */
export function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -50px 0px' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}

/**
 * Hook that reveals multiple children with staggered delays.
 * Apply to a parent container — children with [data-reveal] get animated.
 */
export function useStaggerReveal({ threshold = 0.1, rootMargin = '0px 0px -30px 0px', stagger = 100 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = ref.current;
    if (!container) return;

    const children = container.querySelectorAll('[data-reveal]');
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * stagger}ms`;
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach(child => child.classList.add('revealed'));
          observer.unobserve(container);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [threshold, rootMargin, stagger]);

  return ref;
}
