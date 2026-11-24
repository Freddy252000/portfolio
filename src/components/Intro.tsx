import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { lockScroll } from "../utils/smoothScroll";

/** "Hello" in a few languages, including Tamil for home. */
const words = ["Hello", "வணக்கம்", "Hola", "Bonjour", "Ciao", "こんにちは", "Hallo", "Hello"];

const seen = () => {
  try {
    return sessionStorage.getItem("intro-seen") === "1";
  } catch {
    return false;
  }
};

/**
 * Full-screen greeting shown once per visit. Cycles through greetings, then
 * slides up with a curved bottom edge to reveal the page.
 */
const Intro = () => {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => !reduce && !seen());
  const [index, setIndex] = useState(0);
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    if (!show) return;
    lockScroll(true);
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => {
      lockScroll(false);
      window.removeEventListener("resize", onResize);
    };
  }, [show]);

  useEffect(() => {
    if (!show) return;
    if (index === words.length - 1) {
      const t = setTimeout(() => {
        setShow(false);
        try {
          sessionStorage.setItem("intro-seen", "1");
        } catch {
          /* ignore */
        }
      }, 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), index === 0 ? 900 : 170);
    return () => clearTimeout(t);
  }, [index, show]);

  const { w, h } = size;
  const curved = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + 260} 0 ${h} L0 0`;
  const flat = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} L0 0`;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ y: 0 }}
          exit={{ y: "-100vh", transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.1 } }}
          aria-hidden="true"
        >
          <svg className="pointer-events-none absolute left-0 top-0 h-[calc(100%+300px)] w-full" aria-hidden="true">
            <motion.path
              className="fill-[#141416]"
              initial={{ d: curved }}
              exit={{ d: flat, transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
              d={curved}
            />
          </svg>
          <motion.p
            key={index}
            className="relative flex items-center gap-3 text-4xl font-bold text-white md:text-6xl"
            initial={{ opacity: index === 0 ? 0 : 0.6, y: index === 0 ? 12 : 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: index === 0 ? 0.6 : 0.12 }}
          >
            <span className="h-3 w-3 rounded-full bg-[#fd6f00] md:h-4 md:w-4" />
            {words[index]}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Intro;
