import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, X } from "lucide-react";
import { projectFilters, projects } from "../data/portfolio";
import type { Project, ProjectCategory } from "../data/portfolio";
import { Gradient, SectionHeading } from "./ui";
import TiltCard from "./TiltCard";
import ProjectArt from "./ProjectArt";
import { lockScroll } from "../utils/smoothScroll";

const categoryLabel: Record<ProjectCategory, string> = {
  mobile: "Mobile",
  web: "Web",
  design: "UI/UX",
  other: "Python",
};

/** Designed mockup art, or the real screenshot when one is provided. */
const Cover = ({ project, large, hideTag }: { project: Project; large?: boolean; hideTag?: boolean }) => {
  const Icon = project.icon;
  return (
    <div className={`relative overflow-hidden rounded-xl border border-line/10 bg-elevated/50 ${large ? "h-72 md:h-full md:min-h-[380px]" : "h-56"}`}>
      {project.screenshot ? (
        <img src={project.screenshot} alt={`${project.title} screenshot`} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <ProjectArt project={project} large={large} />
      )}
      {!hideTag && (
        <span className="chip absolute left-3 top-3 gap-1.5 !bg-surface/85 !text-ink backdrop-blur">
          <Icon size={12} className="text-accent" /> {categoryLabel[project.category]}
        </span>
      )}
    </div>
  );
};

const ProjectCard = ({ project, onOpen, large }: { project: Project; onOpen: () => void; large?: boolean }) => (
  <TiltCard max={large ? 5 : 9} className="h-full rounded-2xl">
    <button
      type="button"
      onClick={onOpen}
      className={`panel flex h-full w-full flex-col gap-5 p-3 text-left transition-colors hover:border-accent/40 ${large ? "md:grid md:grid-cols-[1.1fr_1fr] md:items-stretch" : ""}`}
    >
      <Cover project={project} large={large} />
      <div className={`flex flex-1 flex-col px-2 pb-2 ${large ? "md:justify-center md:p-6" : ""}`}>
        {project.id === "secure-chat" && large && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">Currently building</p>}
        <h3 className={`flex items-start justify-between gap-3 font-bold ${large ? "text-3xl md:text-4xl" : "text-xl"}`}>
          {project.title}
          <ArrowUpRight size={20} className="mt-1 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </h3>
        <p className={`mt-2 leading-relaxed text-muted ${large ? "text-lg" : "text-sm"}`}>
          {large ? project.longDescription : project.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {project.technologies.slice(0, large ? 6 : 3).map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
          {!large && project.technologies.length > 3 && <span className="chip">+{project.technologies.length - 3}</span>}
        </div>
      </div>
    </button>
  </TiltCard>
);

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    lockScroll(true);
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-bg/70 p-0 backdrop-blur-md sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        className="panel relative max-h-[90svh] w-full max-w-2xl overflow-y-auto !bg-surface p-3 sm:rounded-2xl"
        data-lenis-prevent
        initial={{ y: 40, opacity: 0, rotateX: 8 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Cover project={project} hideTag />
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute right-6 top-6 grid h-9 w-9 place-items-center rounded-full bg-bg/80 text-muted hover:text-ink"
        >
          <X size={18} />
        </button>
        <div className="p-4 sm:p-6">
          <h3 id="project-title" className="text-3xl font-semibold">{project.title}</h3>
          <p className="mt-4 leading-relaxed text-muted">{project.longDescription}</p>
          <p className="mt-8 mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Built with</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span key={t} className="chip !text-ink">{t}</span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-accent">
                <ExternalLink size={16} /> {project.category === "design" ? "View on Figma" : "Live demo"}
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <Github size={16} /> Source code
              </a>
            )}
            {!project.demoUrl && !project.githubUrl && (
              <p className="text-sm text-muted">🔒 Private client project, so the code isn't public.</p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const [open, setOpen] = useState<Project | null>(null);
  const close = useCallback(() => setOpen(null), []);

  const [hero, ...rest] = projects;
  const showHero = filter === "all" || filter === hero.category;
  const list = (filter === "all" ? rest : projects.filter((p) => p.category === filter && p !== hero));

  return (
    <section id="projects" className="section">
      <div className="container-x">
        <SectionHeading
          label="Portfolio"
          title={
            <>
              Projects I've <Gradient>designed &amp; built</Gradient>
            </>
          }
        />

        <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
          {projectFilters.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${filter === f.id ? "text-white" : "text-muted hover:text-ink"}`}
            >
              {filter === f.id && (
                <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
              )}
              <span className="relative">{f.label}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {showHero && (
              <motion.div
                key={hero.id}
                layout
                className="md:col-span-2 lg:col-span-3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5 }}
              >
                <ProjectCard project={hero} large onOpen={() => setOpen(hero)} />
              </motion.div>
            )}
            {list.map((p, i) => {
              const last = i === list.length - 1;
              const lgAlone = last && list.length % 3 === 1; // alone on the last 3-column row
              const mdAlone = last && list.length % 2 === 1; // alone on the last 2-column row
              return (
              <motion.div
                key={p.id}
                layout
                className={`h-full ${mdAlone ? "md:col-span-2" : ""} ${lgAlone ? "lg:col-span-3" : mdAlone ? "lg:col-span-1" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: Math.min(i, 6) * 0.04 }}
              >
                <ProjectCard project={p} large={lgAlone} onOpen={() => setOpen(p)} />
              </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>{open && <ProjectModal project={open} onClose={close} />}</AnimatePresence>
    </section>
  );
};

export default Projects;
