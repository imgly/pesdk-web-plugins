import React from 'react';

type ObserverOptions = {
  root?: React.RefObject<Element>;
  target: React.RefObject<Element>;
  enabled?: boolean;
  rootMargin?: string;
  threshold?: number | number[];
  onIntersect(): void;
};

export function useIntersectionObserver({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
  enabled = true,
}: ObserverOptions): void {
  React.useEffect(() => {
    const el = target.current;
    if (!enabled || !el) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      },
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [target.current, enabled, onIntersect]);
}
