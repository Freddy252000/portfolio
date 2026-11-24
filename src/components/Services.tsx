import { Check, Globe, Palette, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { certificates, projects } from "../data/portfolio";
import { Gradient, Reveal, SectionHeading } from "./ui";
import TiltCard from "./TiltCard";

const MiniPhone = () => (
  <div className="relative mx-auto h-28 w-16 rounded-[14px] border-[3px] border-[#16162c] bg-white p-1.5 pt-3 shadow-lg transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-3">
    <div className="absolute left-1/2 top-1 h-1 w-5 -translate-x-1/2 rounded-full bg-[#16162c]" />
    <div className="mb-1 h-6 rounded-md bg-gradient-to-br from-[#ff9a3d] to-[#e85d04]" />
    {[0, 1, 2].map((i) => (
      <div key={i} className="mb-1 flex items-center gap-1">
        <div className="h-2.5 w-2.5 rounded bg-[#fed7aa]" />
        <div className="h-1 flex-1 rounded-full bg-[#e7e5f2]" />
      </div>
    ))}
  </div>
);

const MiniBrowser = () => (
  <div className="mx-auto w-40 overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105">
    <div className="flex gap-0.5 bg-[#ecebf5] px-1.5 py-1">
      {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
        <span key={c} className="h-1 w-1 rounded-full" style={{ background: c }} />
      ))}
    </div>
    <div className="space-y-1.5 p-2">
      <div className="h-2 w-2/3 rounded-full bg-[#16162c]" />
      <div className="h-1 w-1/2 rounded-full bg-[#e7e5f2]" />
      <div className="grid grid-cols-3 gap-1 pt-1">
        {["#bae6fd", "#fed7aa", "#fbcfe8"].map((c) => (
          <div key={c} className="h-7 rounded" style={{ background: c }} />
        ))}
      </div>
    </div>
  </div>
);

const MiniDesign = () => (
  <div className="relative mx-auto h-28 w-44 rounded-lg bg-[#2c2c2c] p-2 shadow-lg">
    <div className="absolute left-4 top-4 h-14 w-20 rounded bg-white ring-2 ring-pink-400 transition-transform duration-500 group-hover:-translate-y-1">
      <div className="m-1.5 h-2 w-10 rounded-full bg-pink-300" />
      <div className="mx-1.5 h-1 w-14 rounded-full bg-[#e7e5f2]" />
    </div>
    <div className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-gradient-to-br from-pink-400 to-orange-500 transition-transform duration-500 group-hover:translate-x-1" />
    <svg className="absolute bottom-6 left-24 h-5 w-5 text-white drop-shadow transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 2l16 9-7 2-3 7z" />
    </svg>
  </div>
);

const services: { Icon: LucideIcon; title: string; text: string; points: string[]; art: ReactNode; tint: string }[] = [
  {
    Icon: Smartphone,
    title: "Mobile apps",
    text: "Cross-platform iOS and Android apps with React Native that feel native, fast and secure.",
    points: ["React Native & TypeScript", "End-to-end encryption", "Offline-first & push notifications"],
    art: <MiniPhone />,
    tint: "from-orange-500/20",
  },
  {
    Icon: Globe,
    title: "Web applications",
    text: "Responsive, accessible web apps and sites, from dashboards to e-commerce.",
    points: ["React, Vite & Tailwind", "Node.js & REST APIs", "Animations & 3D with Three.js"],
    art: <MiniBrowser />,
    tint: "from-sky-500/20",
  },
  {
    Icon: Palette,
    title: "UI/UX design",
    text: "Clean, user-focused interfaces and prototypes, designed in Figma.",
    points: ["Wireframes & prototypes", "Design systems & UI kits", "Published on Figma Community"],
    art: <MiniDesign />,
    tint: "from-pink-500/20",
  },
];

const stats = [
  { value: `${projects.length}`, label: "Projects built & designed" },
  { value: "3", label: "Platforms: iOS, Android & Web" },
  { value: `${certificates.length}`, label: "Professional certifications" },
  { value: `${projects.filter((p) => p.category === "design").length}`, label: "Figma Community UI kits" },
];

const Services = () => (
  <section id="services" className="section">
    <div className="container-x">
      <SectionHeading
        label="What I do"
        center
        title={
          <>
            From idea to <Gradient>app store</Gradient>
          </>
        }
        intro="I take products from first sketch to working code: designing the experience, then building it for mobile and the web."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {services.map(({ Icon, title, text, points, art, tint }, i) => (
          <Reveal key={title} delay={i * 0.1} className="h-full">
            <TiltCard max={8} className="h-full rounded-3xl">
              <div className="panel flex h-full flex-col overflow-hidden !rounded-3xl">
                <div className={`relative flex h-44 items-center justify-center bg-gradient-to-b ${tint} to-transparent`}>{art}</div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
                      <Icon size={20} />
                    </span>
                    <h3 className="text-xl font-bold">{title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{text}</p>
                  <ul className="mt-5 space-y-2">
                    {points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-ink">
                        <Check size={15} className="shrink-0 text-emerald-500" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-10">
        <div className="panel grid grid-cols-2 divide-line/10 overflow-hidden !rounded-3xl md:grid-cols-4 md:divide-x">
          {stats.map((s) => (
            <div key={s.label} className="p-6 text-center">
              <div className="text-4xl font-extrabold">
                <Gradient>{s.value}</Gradient>
              </div>
              <div className="mt-1 text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

export default Services;
