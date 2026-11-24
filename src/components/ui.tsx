import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

// eslint-disable-next-line react-refresh/only-export-components
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return matches;
};

export const SectionHeading = ({
  label,
  title,
  intro,
  center,
}: {
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
}) => (
  <div className={`mb-14 max-w-3xl md:mb-16 ${center ? "mx-auto text-center" : ""}`}>
    <motion.p
      className={`mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {label}
    </motion.p>
    <motion.h2
      className="text-4xl font-extrabold leading-[1.1] md:text-5xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {title}
    </motion.h2>
    {intro && (
      <motion.p
        className="mt-5 text-lg leading-relaxed text-muted"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        {intro}
      </motion.p>
    )}
  </div>
);

export const Gradient = ({ children }: { children: ReactNode }) => (
  <span className="bg-gradient-to-r from-accent via-[#ff8a1f] to-accent2 bg-clip-text text-transparent">{children}</span>
);

export const Reveal = ({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-8% 0px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);
