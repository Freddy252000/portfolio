import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Moon, Send, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useActiveSection, useScrolledPast } from "../hooks/useActiveSection";
import { scrollToSection } from "../utils/smoothScroll";

// eslint-disable-next-line react-refresh/only-export-components
export const navItems = [
  { name: "Home", id: "home" },
  { name: "Services", id: "services" },
  { name: "About me", id: "about" },
  { name: "Portfolio", id: "projects" },
  { name: "Contact me", id: "contact" },
];

const Header = () => {
  const scrolled = useScrolledPast(40);
  // Watch every section so the highlight clears in ones the header doesn't list.
  const active = useActiveSection(["home", "services", "workspace", "about", "projects", "journey", "certifications", "contact"]);
  const { isDark, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-line/10 bg-bg/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <motion.div className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent" style={{ scaleX: progress }} />
      <nav className={`container-x flex items-center justify-between transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`} aria-label="Main">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#home");
          }}
          className="flex items-center gap-2.5 text-lg font-extrabold"
          aria-label="Freddy Vincent, back to top"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[#ff9a3d] to-[#e85d04] text-sm font-extrabold text-white">FV</span>
          <span>
            Freddy<span className="text-accent">.</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(`#${item.id}`);
              }}
              aria-current={active === item.id ? "true" : undefined}
              className={`relative py-1 text-[15px] font-medium transition-colors ${active === item.id ? "text-accent" : "text-muted hover:text-ink"}`}
            >
              {item.name}
              {active === item.id && (
                <motion.span layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-accent" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className="grid h-10 w-10 place-items-center rounded-lg text-muted transition-colors hover:bg-elevated hover:text-ink"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={isDark ? "moon" : "sun"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                {isDark ? <Moon size={18} /> : <Sun size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
          <button onClick={() => scrollToSection("#contact")} className="btn-accent !px-5 !py-2.5">
            <Send size={15} /> Hire Me
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
