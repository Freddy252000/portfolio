import { useEffect, useRef, useState } from "react";

/** Tracks whether an element is near the viewport, so off-screen scenes can stop rendering. */
export const useInView = <T extends Element>(rootMargin = "100px") => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, inView] as const;
};
