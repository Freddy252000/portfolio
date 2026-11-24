import { useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { Briefcase, Code2, Home, Layers, Mail, Route, User } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useActiveSection, useScrolledPast } from "../hooks/useActiveSection";
import { scrollToSection } from "../utils/smoothScroll";
import { useMediaQuery } from "./ui";

const items: { id: string; label: string; Icon: LucideIcon }[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "services", label: "Services", Icon: Layers },
  { id: "workspace", label: "How I build", Icon: Code2 },
  { id: "projects", label: "Portfolio", Icon: Briefcase },
  { id: "about", label: "About me", Icon: User },
  { id: "journey", label: "Journey", Icon: Route },
  { id: "contact", label: "Contact", Icon: Mail },
];

/** One icon in the dock; grows as the pointer gets closer (like a desktop dock). */
const DockIcon = ({
  item,
  mouseX,
  active,
  magnify,
}: {
  item: (typeof items)[number];
  mouseX: MotionValue<number>;
  active: boolean;
  magnify: boolean;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const distance = useTransform(mouseX, (x) => {
    const r = ref.current?.getBoundingClientRect();
    return r ? x - (r.left + r.width / 2) : Infinity;
  });
  const base = magnify ? 42 : 38;
  const sizeTarget = useTransform(distance, [-140, 0, 140], [base, magnify ? 64 : base, base]);
  const size = useSpring(sizeTarget, { mass: 0.1, stiffness: 180, damping: 14 });
  const Icon = item.Icon;

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => scrollToSection(`#${item.id}`)}
      aria-label={item.label}
      aria-current={active ? "true" : undefined}
      style={{ width: size, height: size }}
      className={`group relative grid shrink-0 place-items-center rounded-xl transition-colors ${
        active ? "bg-accent text-white" : "bg-elevated/80 text-muted hover:text-ink"
      }`}
    >
      <Icon className="h-[45%] w-[45%]" />
      <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-xs font-medium text-bg opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        {item.label}
      </span>
      {active && <span className="absolute -bottom-1.5 h-1 w-1 rounded-full bg-accent" />}
    </motion.button>
  );
};

/** Floating dock navigation that slides up once you scroll past the hero. */
const Dock = () => {
  const mouseX = useMotionValue(Infinity);
  const reduce = useReducedMotion();
  const fine = useMediaQuery("(pointer: fine)");
  const isLarge = useMediaQuery("(min-width: 1024px)");
  const scrolled = useScrolledPast(window.innerHeight * 0.6);
  const visible = scrolled || !isLarge;
  const active = useActiveSection(items.map((i) => i.id));

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Section navigation"
          className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-3"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
        >
          <div
            onMouseMove={(e) => mouseX.set(e.clientX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="flex h-[54px] items-end gap-1.5 rounded-2xl sm:h-[58px] sm:gap-2 border border-line/10 bg-surface/80 px-2.5 pb-2 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          >
            {items.map((item) => (
              <DockIcon key={item.id} item={item} mouseX={mouseX} active={active === item.id} magnify={fine && !reduce} />
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Dock;
