import { BadgeCheck, Calendar, ExternalLink, Hash } from "lucide-react";
import { certificates } from "../data/portfolio";
import { Reveal, SectionHeading } from "./ui";
import TiltCard from "./TiltCard";

const Certifications = () => (
  <section id="certifications" className="section">
    <div className="container-x">
      <SectionHeading label="Certifications" title={<>Verified skills, <span className="text-muted">not just claims.</span></>} />

      <div className="grid gap-6 md:grid-cols-2">
        {certificates.map((c, i) => {
          const tone = c.hue === "accent" ? "var(--accent)" : "var(--accent2)";
          return (
            <Reveal key={c.id} delay={i * 0.1} className="h-full">
              <TiltCard max={7} className="h-full rounded-2xl">
                {/* animated holographic border */}
                <div
                  className="holo relative h-full rounded-2xl p-px"
                  style={{
                    background: `conic-gradient(from var(--angle, 0deg), rgb(${tone} / 0.7), transparent 25%, rgb(${tone} / 0.25) 50%, transparent 75%, rgb(${tone} / 0.7))`,
                  }}
                >
                  <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface p-7">
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl" style={{ background: `rgb(${tone} / 0.12)` }} />
                    <div className="relative flex items-start justify-between gap-4">
                      <div
                        className="grid h-14 w-14 place-items-center rounded-xl font-display text-lg font-bold [transform:translateZ(30px)]"
                        style={{ background: `rgb(${tone} / 0.12)`, color: `rgb(${tone})`, boxShadow: `inset 0 0 0 1px rgb(${tone} / 0.3)` }}
                      >
                        {c.issuerLogo}
                      </div>
                      <span className="chip gap-1.5" style={{ color: `rgb(${tone})` }}>
                        <BadgeCheck size={14} /> Verified
                      </span>
                    </div>

                    <p className="relative mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-muted">{c.issuer}</p>
                    <h3 className="relative mt-1 text-2xl font-semibold">{c.title}</h3>
                    <p className="relative mt-3 text-sm leading-relaxed text-muted">{c.description}</p>

                    <div className="relative mb-6 mt-5 flex flex-wrap gap-1.5">
                      {c.skills.map((s) => (
                        <span key={s} className="chip">{s}</span>
                      ))}
                    </div>

                    <div className="relative mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-line/10 pt-5 text-xs text-muted">
                      <div className="flex flex-wrap gap-4">
                        <span className="flex items-center gap-1.5"><Calendar size={13} /> {c.issuedDate}</span>
                        <span className="flex items-center gap-1.5"><Hash size={13} /> {c.credentialId}</span>
                      </div>
                      <a
                        href={c.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-ink transition-colors hover:text-accent"
                      >
                        Verify <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default Certifications;
