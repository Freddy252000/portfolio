import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Award, Briefcase, Palette, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { profile } from "../data/portfolio";
import { Gradient, SectionHeading } from "./ui";

const steps: { when: string; title: string; place: string; text: string; Icon: LucideIcon; tags: string[] }[] = [
  {
    when: "Now",
    title: "Software Engineer",
    place: profile.company,
    text: "Building a chat application with end-to-end encryption in React Native: secure messaging, real-time communication, authentication and privacy controls.",
    Icon: Briefcase,
    tags: ["React Native", "TypeScript", "E2EE", "WebSocket"],
  },
  {
    when: "April 2026",
    title: "Certified twice",
    place: "WorkLoo · Copado",
    text: "Frontend Developer Certification at Professional level with a 100% score, and Copado AI Certified Professional for AI-powered DevOps and CI/CD.",
    Icon: Award,
    tags: ["Frontend", "DevOps", "CI/CD"],
  },
  {
    when: "Design",
    title: "Published UI kits",
    place: "Figma Community",
    text: "Designed and published a Social Media Dashboard and Auralyx, an 8-screen music streaming app UI kit, for other designers to use.",
    Icon: Palette,
    tags: ["Figma", "UI/UX", "Prototyping"],
  },
  {
    when: "Projects",
    title: "Shipped mobile & web apps",
    place: "Personal & open source",
    text: "Gym tracker, e-learning, food delivery and music streaming apps in React Native, web apps with React and Node.js, and Nova, a Python voice assistant.",
    Icon: Rocket,
    tags: ["React Native", "React", "Node.js", "Python"],
  },
];

/** Vertical timeline whose line fills in as you scroll through it. */
const Journey = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <section id="journey" className="section">
      <div className="container-x">
        <SectionHeading
          label="Experience"
          center
          title={
            <>
              My <Gradient>journey</Gradient>
            </>
          }
          intro="Where I am now, and what I've built and learned along the way."
        />

        <div ref={ref} className="relative mx-auto max-w-4xl">
          {/* track + animated fill */}
          <div className="absolute bottom-0 left-5 top-0 w-0.5 bg-line/10 md:left-1/2 md:-translate-x-1/2" />
          <motion.div className="absolute bottom-0 left-5 top-0 w-0.5 origin-top bg-gradient-to-b from-accent to-accent2 md:left-1/2 md:-translate-x-1/2" style={{ scaleY: fill }} />

          <ol className="space-y-10 md:space-y-14">
            {steps.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <li key={s.title} className={`relative grid md:grid-cols-2 md:gap-14 ${i > 0 ? "md:-mt-24" : ""}`}>
                  {/* node */}
                  <motion.span
                    className="absolute left-5 top-6 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border-4 border-bg bg-accent text-white shadow-[0_0_0_6px_rgb(var(--accent)/0.15)] md:left-1/2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-20% 0px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  >
                    <s.Icon size={16} />
                  </motion.span>

                  <motion.div
                    className={`ml-14 md:ml-0 ${right ? "md:col-start-2" : "md:text-right"}`}
                    initial={{ opacity: 0, x: right ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-15% 0px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="panel p-6 transition-colors hover:border-accent/40">
                      <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">{s.when}</span>
                      <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
                      <p className="text-sm font-medium text-accent">{s.place}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
                      <div className={`mt-4 flex flex-wrap gap-1.5 ${right ? "" : "md:justify-end"}`}>
                        {s.tags.map((t) => (
                          <span key={t} className="chip">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Journey;
