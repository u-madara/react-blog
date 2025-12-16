import { useEffect, useRef } from 'react';

interface UseMarkdownRevealOptions {
  containerSelector?: string;
  elementSelector?: string;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useMarkdownReveal = (options: UseMarkdownRevealOptions = {}) => {
  const {
    containerSelector = '.markdown-container',
    elementSelector = '.scroll-reveal-element',
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options;

  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 获取所有需要动画的元素
    const elements = container.querySelectorAll(elementSelector);
    if (elements.length === 0) return;

    // 为每个元素设置延迟
    elements.forEach((el, index) => {
      const element = el as HTMLElement;
      const delay = element.dataset.delay || (index * 100).toString();
      element.style.transitionDelay = `${delay}ms`;
    });

    // 创建Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            entry.target.classList.remove('revealed');
          }
        });
      },
      { threshold, rootMargin }
    );

    // 观察所有元素
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [containerSelector, elementSelector, threshold, rootMargin, triggerOnce]);

  return containerRef;
};