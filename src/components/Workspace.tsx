import { lazy, Suspense, useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { hasWebGL } from "../utils/smoothScroll";
import { Gradient, SectionHeading, useMediaQuery } from "./ui";

const WorkspaceScene = lazy(() => import("./three/WorkspaceScene"));

/** Static fallback when WebGL is unavailable or motion is reduced. */
const StaticWorkspace = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-[min(560px,85vw)] overflow-hidden rounded-2xl border border-line/10 bg-[#1b1b1f] shadow-2xl">
      <div className="flex gap-1.5 bg-[#131316] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <pre className="p-5 font-mono text-xs leading-relaxed text-[#ececf0]">
        <span className="text-[#c792ea]">export default function</span> <span className="text-[#ffcb6b]">Home</span>() {"{"}
        {"\n  "}
        <span className="text-[#c792ea]">return</span> <span className="text-[#82aaff]">&lt;View&gt;</span>…<span className="text-[#82aaff]">&lt;/View&gt;</span>;{"\n}"}
      </pre>
    </div>
  </div>
);

/** "How I build" — the 3D desk where code is typed, run, and becomes a website and an app. */
const Workspace = () => {
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const webgl = useMemo(hasWebGL, []);

  return (
    <section id="workspace" className="section overflow-hidden !pb-0">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_60%_60%_at_50%_70%,rgb(var(--accent)/0.14),transparent_70%)]" />
      <div className="container-x relative">
        <SectionHeading
          label="How I build"
          center
          title={
            <>
              From a line of code to a <Gradient>live app</Gradient>
            </>
          }
          intro="Watch it happen: the code is written, the dev server starts, and the same product goes live on the web and on a phone."
        />
      </div>
      <div className={`relative w-full ${isDesktop ? "h-[min(72vh,680px)] min-h-[520px]" : "h-[420px]"}`}>
        {webgl && !reduce ? (
          <Suspense fallback={null}>
            <WorkspaceScene compact={!isDesktop} />
          </Suspense>
        ) : (
          <StaticWorkspace />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent" />
        <p className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-xs font-medium text-muted lg:flex">
          <MousePointer2 size={14} className="text-accent" /> Move your mouse to look around
        </p>
      </div>
    </section>
  );
};

export default Workspace;
