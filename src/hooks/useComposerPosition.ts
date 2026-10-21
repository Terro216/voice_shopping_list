import { useEffect, useRef, useState } from 'react';

/** Keep the composer above the mobile keyboard, and reserve its actual height. */
export const useComposerPosition = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(160);
  const [bottom, setBottom] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const measure = () => setHeight(node.getBoundingClientRect().height);
    const viewport = window.visualViewport;
    const resize = () => {
      setBottom(Math.max(0, window.innerHeight - (viewport?.height ?? window.innerHeight) - (viewport?.offsetTop ?? 0)));
      setViewportHeight(viewport?.height ?? window.innerHeight);
      measure();
    };
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    observer?.observe(node);
    viewport?.addEventListener('resize', resize);
    viewport?.addEventListener('scroll', resize);
    window.addEventListener('resize', resize);
    resize();
    return () => {
      observer?.disconnect();
      viewport?.removeEventListener('resize', resize);
      viewport?.removeEventListener('scroll', resize);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return { ref, height, bottom, viewportHeight };
};
