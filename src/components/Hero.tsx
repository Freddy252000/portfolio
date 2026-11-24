import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Download, Github, Linkedin, Mail, Send } from "lucide-react";
import { certificates, profile, projects } from "../data/portfolio";
import { scrollToSection } from "../utils/smoothScroll";
import RoleRotator from "./RoleRotator";

const ease = [0.22, 1, 0.36, 1] as const;
const INTRO_DELAY = (() => {
  try {
    return sessionStorage.getItem("intro-seen") === "1" ? 0 : 2.3;
  } catch {
    return 0;
  }
})();

const socials = [
  { label: "GitHub", href: profile.github, Icon: Github },
  { label: "LinkedIn", href: profile.linkedin, Icon: Linkedin },
  { label: "Email", href: `mailto:${profile.email}`, Icon: Mail },
];

const stats = [
  { value: profile.yearsExperience, label: "Years experience" },
  { value: `${projects.length}+`, label: "Projects done" },
  { value: `${certificates.length}`, label: "Certifications" },
];

const badges = [
  { text: "React Native", className: "left-[-4%] top-[30%]", delay: 0 },
  { text: "TypeScript", className: "right-[-2%] top-[18%]", delay: 0.8 },
  { text: "UI/UX · Figma", className: "right-[2%] bottom-[22%]", delay: 1.6 },
];

const Portrait = () => {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });
  const photoX = useTransform(sx, (v) => v * 14);
  const photoY = useTransform(sy, (v) => v * 10);
  const ringX = useTransform(sx, (v) => v * -10);
  const ringY = useTransform(sy, (v) => v * -8);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[420px] lg:max-w-[520px]"
      onPointerMove={onMove}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: INTRO_DELAY + 0.2, ease }}
    >
      {/* glow + circle */}
      <div className="absolute inset-[8%] rounded-full bg-accent/25 blur-3xl" />
      <motion.div className="absolute inset-[6%] rounded-full bg-gradient-to-b from-elevated to-surface ring-1 ring-line/10" style={{ x: ringX, y: ringY }} />
      <motion.svg className="absolute inset-[2%] h-[96%] w-[96%] animate-[spin_40s_linear_infinite]" viewBox="0 0 100 100" aria-hidden="true" style={{ x: ringX, y: ringY }}>
        <circle cx="50" cy="50" r="49" fill="none" stroke="rgb(var(--accent))" strokeOpacity="0.5" strokeWidth="0.35" strokeDasharray="1.5 2.5" />
      </motion.svg>
      <motion.div className="absolute inset-[6%] rounded-full" style={{ x: ringX, y: ringY }}>
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_16px_rgb(var(--accent))]" />
      </motion.div>

      {/* photo: clipped to the circle at the bottom, free at the top so the head pops out */}
      <motion.div
        className="absolute inset-x-[6%] bottom-[6%] top-[-6%] overflow-hidden"
        style={{ x: photoX, y: photoY, borderRadius: "0 0 999px 999px" }}
      >
        <img
          src={profile.photo}
          alt={`Portrait of ${profile.name}`}
          className="absolute bottom-0 left-1/2 h-[104%] w-auto max-w-none -translate-x-1/2 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* floating skill badges */}
      {badges.map((b) => (
        <motion.span
          key={b.text}
          className={`absolute z-10 rounded-full border border-line/10 bg-surface/90 px-3.5 py-2 text-xs font-semibold text-ink shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur md:text-sm ${b.className}`}
          initial={{ opacity: 0, y: 10 }}
          animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: INTRO_DELAY + 0.8 + b.delay * 0.3, duration: 0.5 },
            y: { delay: INTRO_DELAY + b.delay, duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-accent" />
          {b.text}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Hero = () => {
  const item = (i: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: INTRO_DELAY + 0.1 * i, ease },
  });

  return (
    <section id="home" className="relative overflow-hidden">
      {/* warm glow behind the text, like a spotlight */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-accent/10 blur-[140px]" />

      <div className="container-x relative grid min-h-[100svh] items-center gap-10 pb-16 pt-28 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pt-24">
        <div className="order-2 lg:order-1">
          <motion.p className="text-lg font-medium text-muted md:text-xl" {...item(0)}>
            Hi, I am
          </motion.p>
          <motion.p className="mt-1 text-2xl font-bold text-ink md:text-3xl" {...item(1)}>
            {profile.name}
          </motion.p>
          <motion.h1 className="mt-3 min-h-[2.2em] sm:min-h-[1.15em] text-[clamp(2.4rem,6.2vw,4.6rem)] font-extrabold leading-[1.08] tracking-[-0.02em]" {...item(2)}>
            <RoleRotator roles={profile.roles} className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent" />
          </motion.h1>
          <motion.p className="mt-5 max-w-lg text-base leading-relaxed text-muted md:text-lg" {...item(3)}>
            I design and build secure mobile apps and fast, modern web applications, from the first sketch in Figma to production.
          </motion.p>

          <motion.div className="mt-7 flex gap-3" {...item(4)}>
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-line/15 text-muted transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>

          <motion.div className="mt-8 flex flex-wrap gap-3" {...item(5)}>
            <button className="btn-accent px-7" onClick={() => scrollToSection("#contact")}>
              <Send size={16} /> Hire Me
            </button>
            <a className="btn-ghost px-7" href={profile.cv} download="Freddy_Vincent_CV.pdf">
              <Download size={16} /> Download CV
            </a>
          </motion.div>

          <motion.div className="mt-10 inline-grid grid-cols-3 divide-x divide-line/10 rounded-xl border border-line/10 bg-surface/70 backdrop-blur" {...item(6)}>
            {stats.map((s) => (
              <div key={s.label} className="px-5 py-4 md:px-7">
                <div className="text-2xl font-extrabold text-accent md:text-3xl">{s.value}</div>
                <div className="mt-0.5 text-xs font-medium text-ink md:text-sm">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <Portrait />
        </div>
      </div>
    </section>
  );
};

export default Hero;
