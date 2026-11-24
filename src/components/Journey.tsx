import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Award, Briefcase, GraduationCap } from "lucide-react";
import { experience } from "../data/portfolio";
import type { ExperienceItem } from "../data/portfolio";
import { Gradient, SectionHeading } from "./ui";

const icons: Record<ExperienceItem["kind"], typeof Briefcase> = {
  work: Briefcase,
  cert: Award,
  education: GraduationCap,
};

/** Vertical timeline (work, certifications, education) whose line fills in as you scroll. */
const Journey = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <section id="journey" className="section">
      <div className="container-x">
        <SectionHeading
          label="Experience & education"
          center
          title={
            <>
              My <Gradient>journey</Gradient>
            </>
          }
          intro="3+ years of building mobile and web apps, and where I'm heading next."
        />

        <div ref={ref} className="relative mx-auto max-w-4xl">
          <div className="absolute bottom-0 left-5 top-0 w-0.5 bg-line/10 md:left-1/2 md:-translate-x-1/2" />
          <motion.div className="absolute bottom-0 left-5 top-0 w-0.5 origin-top bg-gradient-to-b from-accent to-accent2 md:left-1/2 md:-translate-x-1/2" style={{ scaleY: fill }} />

          <ol className="space-y-10 md:space-y-14">
            {experience.map((s, i) => {
              const right = i % 2 === 1;
              const Icon = icons[s.kind];
              return (
                <li key={s.title + s.when} className={`relative grid md:grid-cols-2 md:gap-14 ${i > 0 ? "md:-mt-24" : ""}`}>
                  <motion.span
                    className="absolute left-5 top-6 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border-4 border-bg bg-accent text-white shadow-[0_0_0_6px_rgb(var(--accent)/0.15)] md:left-1/2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-20% 0px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  >
                    {s.current && <span className="absolute inset-0 animate-ping rounded-full bg-accent/50" />}
                    <Icon size={16} className="relative" />
                  </motion.span>

                  <motion.div
                    className={`ml-14 md:ml-0 ${right ? "md:col-start-2" : "md:text-right"}`}
                    initial={{ opacity: 0, x: right ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-15% 0px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className={`panel p-6 transition-colors hover:border-accent/40 ${s.current ? "!border-accent/40" : ""}`}>
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${s.current ? "bg-accent text-white" : "bg-accent/10 text-accent"}`}>
                        {s.when}
                      </span>
                      <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
                      <p className="text-sm font-medium text-accent">{s.place}</p>
                      <ul className={`mt-3 space-y-1.5 text-sm leading-relaxed text-muted ${right ? "" : "md:[direction:rtl]"}`}>
                        {s.points.map((p) => (
                          <li key={p} className="[direction:ltr]">
                            {p}
                          </li>
                        ))}
                      </ul>
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
