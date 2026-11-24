import { lazy, Suspense, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Briefcase, Gauge, GraduationCap, MapPin, Move3d, Sparkles, Zap } from "lucide-react";
import { profile, skillCategories, skills } from "../data/portfolio";
import type { SkillCategory } from "../data/portfolio";
import { Gradient, Reveal, SectionHeading, useMediaQuery } from "./ui";
import { hasWebGL } from "../utils/smoothScroll";

const SkillConstellation = lazy(() => import("./three/SkillConstellation"));

const dotColor: Record<SkillCategory, string> = {
  frontend: "bg-accent",
  backend: "bg-sky-400",
  design: "bg-[#ff6bd6]",
  tools: "bg-[#ffc857]",
};

const pillars = [
  { Icon: Zap, title: "Real-time & secure", text: "WebSocket messaging, offline-first data and end-to-end encryption." },
  { Icon: Gauge, title: "Performance-minded", text: "Improved app performance by 25% through optimised rendering and state." },
  { Icon: Sparkles, title: "Exploring AI", text: "Python automation, NLP and LLM integration, starting with Nova." },
];

const About = () => {
  const [active, setActive] = useState<SkillCategory | null>(null);
  const reduce = useReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const webgl = useMemo(hasWebGL, []);

  return (
    <section id="about" className="section">
      <div className="container-x">
        <SectionHeading
          label="About me"
          title={
            <>
              Building apps people{" "}
              <Gradient>love to use.</Gradient>
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="space-y-8">
            <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
              <p>
                I'm a React Native engineer with <span className="text-ink">3+ years of experience</span> building
                scalable mobile and web applications. At <span className="text-ink">{profile.companyShort}</span> I
                built and maintained production apps with React Native and React.js, real-time features over
                WebSocket, and a WhatsApp-style chat app with end-to-end encryption.
              </p>
              <p>
                Today I work at <span className="text-ink">{profile.currentCompany}</span> as a{" "}
                <span className="text-ink">{profile.currentRole}</span>. My strengths are real-time systems, API
                integration and frontend architecture, and I'm expanding into AI/ML with Python automation and
                LLM integration.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="panel flex flex-wrap items-center gap-x-6 gap-y-3 p-5 text-sm font-medium">
              <span className="flex items-center gap-2 text-ink">
                <Briefcase size={16} className="text-accent" /> {profile.currentRole} · {profile.currentCompany}
              </span>
              <span className="flex items-center gap-2 text-muted">
                <GraduationCap size={16} className="text-accent" /> BEng (Hons) Software Engineering
              </span>
              <span className="flex items-center gap-2 text-muted">
                <MapPin size={16} className="text-accent" /> {profile.location}
              </span>
            </Reveal>

            <div className="grid gap-3">
              {pillars.map(({ Icon, title, text }, i) => (
                <Reveal key={title} delay={0.1 + i * 0.08} className="panel flex items-start gap-4 p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent"><Icon size={20} /></span>
                  <div>
                  <h3 className="mb-1 text-base font-semibold">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Skill constellation */}
          <Reveal delay={0.15} className="panel relative flex min-h-[520px] flex-col overflow-hidden">
            <div className="relative z-10 flex items-center justify-between gap-4 border-b border-line/10 px-5 py-4">
              <p className="text-sm font-semibold text-ink">My tech stack</p>
              {finePointer && webgl && !reduce && (
                <span className="flex items-center gap-1.5 text-xs text-muted">
                  <Move3d size={14} className="text-accent" /> drag to rotate
                </span>
              )}
            </div>

            <div className="relative flex-1 dot-bg">
              {webgl && !reduce ? (
                <Suspense fallback={null}>
                  <SkillConstellation active={active} interactive={finePointer} />
                </Suspense>
              ) : (
                <ul className="flex flex-wrap gap-2 p-6">
                  {skills.map((s) => (
                    <li key={s.name} className="chip gap-2 !text-[12px] !text-ink">
                      <span className={`h-1.5 w-1.5 rounded-full ${dotColor[s.category]}`} />
                      {s.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="relative z-10 flex flex-wrap gap-2 border-t border-line/10 p-4" role="group" aria-label="Highlight a skill group">
              {skillCategories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={active === c.id}
                  onMouseEnter={() => finePointer && setActive(c.id)}
                  onMouseLeave={() => finePointer && setActive(null)}
                  onFocus={() => setActive(c.id)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive((a) => (a === c.id ? null : c.id))}
                  className={`chip gap-2 transition-colors hover:!text-ink ${active === c.id ? "!border-line/30 !text-ink" : ""}`}
                >
                  <span className={`h-2 w-2 rounded-full ${dotColor[c.id]}`} />
                  {c.label}
                </button>
              ))}
            </div>

            {/* Accessible list for screen readers */}
            <ul className="sr-only">
              {skills.map((s) => (
                <li key={s.name}>{s.name}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
