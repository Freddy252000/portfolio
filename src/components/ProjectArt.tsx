import type { CSSProperties, ReactNode } from "react";
import type { Project } from "../data/portfolio";

/**
 * Illustrated device mockups used as project images. Each one is drawn with
 * HTML/CSS so it stays sharp, themeable and tiny compared to screenshots.
 */

const brand: Record<string, string> = {
  "secure-chat": "#7c3aed",
  gym: "#f97316",
  elearn: "#3b82f6",
  food: "#ef4444",
  music: "#10b981",
  nova: "#06b6d4",
  portfolio: "#fd6f00",
  tasks: "#14b8a6",
  store: "#f59e0b",
  hrms: "#8b5cf6",
  hotel: "#0ea5e9",
  "social-dashboard": "#6366f1",
  auralyx: "#ec4899",
};

const Phone = ({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) => (
  <div
    className={`relative h-[230px] w-[114px] shrink-0 overflow-hidden rounded-[22px] border-[5px] border-[#16162c] bg-white shadow-[0_20px_40px_-12px_rgba(0,0,0,0.45)] ${className}`}
    style={style}
  >
    <div className="absolute left-1/2 top-1 z-10 h-[9px] w-[38px] -translate-x-1/2 rounded-full bg-[#16162c]" />
    <div className="h-full w-full pt-4 text-[#16162c]">{children}</div>
  </div>
);

const Browser = ({ children, url, className = "" }: { children: ReactNode; url: string; className?: string }) => (
  <div className={`w-[92%] max-w-[330px] overflow-hidden rounded-xl bg-white shadow-[0_20px_40px_-12px_rgba(0,0,0,0.45)] ${className}`}>
    <div className="flex items-center gap-1 bg-[#ecebf5] px-2.5 py-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
      <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
      <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
      <span className="ml-2 flex-1 truncate rounded bg-white px-2 py-0.5 text-[6px] text-[#6b6b85]">{url}</span>
    </div>
    <div className="h-[150px] text-[#16162c]">{children}</div>
  </div>
);

const Bar = ({ w, c = "#e7e5f2", h = 4 }: { w: string; c?: string; h?: number }) => (
  <div className="rounded-full" style={{ width: w, height: h, background: c }} />
);

// ── Mobile ─────────────────────────────────────────────────────────────────

const ChatApp = ({ c }: { c: string }) => (
  <div className="flex h-full flex-col">
    <div className="flex items-center gap-1.5 px-2 py-1.5" style={{ background: c }}>
      <div className="h-4 w-4 rounded-full bg-white/80" />
      <div className="flex-1">
        <div className="text-[7px] font-bold text-white">Sarah</div>
        <div className="text-[5px] text-white/80">🔒 end-to-end encrypted</div>
      </div>
    </div>
    <div className="flex flex-1 flex-col gap-1.5 bg-[#f5f3ff] p-2 text-[6px]">
      <div className="w-fit max-w-[75%] rounded-lg rounded-tl-sm bg-white px-1.5 py-1 shadow-sm">Are we still on for 6?</div>
      <div className="ml-auto w-fit max-w-[75%] rounded-lg rounded-tr-sm px-1.5 py-1 text-white" style={{ background: c }}>Yes! See you there 👋</div>
      <div className="w-fit max-w-[75%] rounded-lg rounded-tl-sm bg-white px-1.5 py-1 shadow-sm">Sending the doc now</div>
      <div className="flex w-fit items-center gap-1 rounded-lg rounded-tl-sm bg-white px-1.5 py-1 shadow-sm">📄 plan.pdf</div>
      <div className="ml-auto w-fit rounded-lg rounded-tr-sm px-1.5 py-1 text-white" style={{ background: c }}>Got it, thanks!</div>
    </div>
    <div className="flex items-center gap-1 border-t border-[#ede9fe] bg-white p-1.5">
      <div className="h-3.5 flex-1 rounded-full bg-[#f1f0f7]" />
      <div className="h-3.5 w-3.5 rounded-full" style={{ background: c }} />
    </div>
  </div>
);

const GymApp = ({ c }: { c: string }) => (
  <div className="flex h-full flex-col gap-2 bg-[#fff7ed] p-2">
    <div>
      <div className="text-[5px] text-[#9a8f86]">Good morning</div>
      <div className="text-[9px] font-extrabold">Let's train 💪</div>
    </div>
    <div className="flex items-center gap-2 rounded-xl p-2 text-white" style={{ background: c }}>
      <div className="relative h-9 w-9 rounded-full" style={{ background: `conic-gradient(#fff 0 72%, rgba(255,255,255,.3) 0)` }}>
        <div className="absolute inset-[4px] grid place-items-center rounded-full text-[6px] font-bold" style={{ background: c }}>72%</div>
      </div>
      <div className="text-[6px] leading-tight">
        <div className="opacity-80">Daily goal</div>
        <div className="text-[8px] font-bold">540 kcal</div>
        <div>🔥 12 days</div>
      </div>
    </div>
    <div className="flex h-10 items-end gap-1 rounded-xl bg-white p-1.5">
      {[40, 70, 50, 90, 65, 100, 55].map((h, i) => (
        <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 5 ? c : "#fed7aa" }} />
      ))}
    </div>
    {["Push day · 45m", "Cardio · 20m"].map((t) => (
      <div key={t} className="flex items-center gap-1.5 rounded-lg bg-white p-1.5 text-[6px] font-semibold">
        <div className="h-3.5 w-3.5 rounded" style={{ background: c }} />
        {t}
      </div>
    ))}
  </div>
);

const LearnApp = ({ c }: { c: string }) => (
  <div className="flex h-full flex-col gap-1.5 bg-[#eff6ff] p-2">
    <div className="text-[9px] font-extrabold">My courses</div>
    <div className="h-4 rounded-full bg-white px-1.5 text-[5px] leading-4 text-[#94a3b8]">🔍 Search courses</div>
    {[
      { t: "React Native Basics", p: 80, e: "📱" },
      { t: "UI Design 101", p: 45, e: "🎨" },
      { t: "TypeScript Deep Dive", p: 20, e: "🧠" },
    ].map((k) => (
      <div key={k.t} className="rounded-lg bg-white p-1.5">
        <div className="mb-1 flex items-center gap-1 text-[6px] font-bold">
          <span className="grid h-4 w-4 place-items-center rounded text-[7px]" style={{ background: `${c}22` }}>{k.e}</span>
          {k.t}
        </div>
        <div className="h-1 rounded-full bg-[#dbeafe]">
          <div className="h-1 rounded-full" style={{ width: `${k.p}%`, background: c }} />
        </div>
      </div>
    ))}
    <div className="mt-auto rounded-lg p-1.5 text-center text-[6px] font-bold text-white" style={{ background: c }}>▶ Continue learning</div>
  </div>
);

const FoodApp = ({ c }: { c: string }) => (
  <div className="flex h-full flex-col gap-1.5 bg-[#fff5f5] p-2">
    <div className="text-[5px] text-[#9a8f86]">📍 Deliver to Jaffna</div>
    <div className="text-[9px] font-extrabold leading-tight">What would you like to eat?</div>
    <div className="flex gap-1">
      {["🍔", "🍕", "🥗", "🍜"].map((e, i) => (
        <div key={e} className="grid h-5 flex-1 place-items-center rounded-md text-[8px]" style={{ background: i === 0 ? c : "#fff" }}>{e}</div>
      ))}
    </div>
    {[
      { n: "Classic Burger", p: "Rs 1,250", e: "🍔" },
      { n: "Pepperoni Pizza", p: "Rs 2,100", e: "🍕" },
    ].map((f) => (
      <div key={f.n} className="flex items-center gap-1.5 rounded-lg bg-white p-1.5">
        <div className="grid h-7 w-7 place-items-center rounded-md bg-[#fee2e2] text-[12px]">{f.e}</div>
        <div className="flex-1 text-[6px]">
          <div className="font-bold">{f.n}</div>
          <div style={{ color: c }}>{f.p}</div>
        </div>
        <div className="grid h-3.5 w-3.5 place-items-center rounded-full text-[7px] font-bold text-white" style={{ background: c }}>+</div>
      </div>
    ))}
    <div className="mt-auto flex justify-between rounded-lg p-1.5 text-[6px] font-bold text-white" style={{ background: c }}>
      <span>View cart · 2</span>
      <span>Rs 3,350</span>
    </div>
  </div>
);

const MusicApp = ({ c }: { c: string }) => (
  <div className="flex h-full flex-col items-center gap-1.5 bg-[#0f1a17] p-2 text-white">
    <div className="text-[5px] uppercase tracking-widest text-white/60">Now playing</div>
    <div className="mt-1 h-[86px] w-[86px] rounded-xl shadow-lg" style={{ background: `linear-gradient(135deg, ${c}, #0ea5e9 60%, #1e1b4b)` }} />
    <div className="mt-1 text-center">
      <div className="text-[8px] font-bold">Midnight Drive</div>
      <div className="text-[5px] text-white/60">Neon Waves</div>
    </div>
    <div className="h-0.5 w-full rounded-full bg-white/20">
      <div className="h-0.5 w-2/5 rounded-full" style={{ background: c }} />
    </div>
    <div className="flex items-center gap-3 text-[8px]">
      <span>⏮</span>
      <span className="grid h-6 w-6 place-items-center rounded-full text-[8px] text-[#0f1a17]" style={{ background: c }}>▶</span>
      <span>⏭</span>
    </div>
  </div>
);

// ── Web ────────────────────────────────────────────────────────────────────

const TasksWeb = ({ c }: { c: string }) => (
  <div className="flex h-full">
    <div className="w-12 space-y-1.5 bg-[#f0fdfa] p-1.5">
      <div className="h-3 w-3 rounded" style={{ background: c }} />
      {[0, 1, 2, 3].map((i) => <Bar key={i} w="80%" c={i === 0 ? c : "#ccfbf1"} />)}
    </div>
    <div className="flex flex-1 gap-1.5 p-2">
      {[
        { t: "To do", n: 3 },
        { t: "In progress", n: 2 },
        { t: "Done", n: 3 },
      ].map((col, ci) => (
        <div key={col.t} className="flex-1 space-y-1 rounded-md bg-[#f8fafc] p-1">
          <div className="text-[6px] font-bold">{col.t}</div>
          {Array.from({ length: col.n }).map((_, i) => (
            <div key={i} className="space-y-0.5 rounded bg-white p-1 shadow-sm">
              <Bar w="85%" c="#e2e8f0" h={3} />
              <Bar w="50%" c={ci === 2 ? "#86efac" : ci === 1 ? c : "#fcd34d"} h={3} />
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const HrmsWeb = ({ c }: { c: string }) => (
  <div className="flex h-full">
    <div className="w-11 space-y-1.5 p-1.5" style={{ background: `${c}14` }}>
      <div className="h-3 w-3 rounded" style={{ background: c }} />
      {[0, 1, 2, 3].map((i) => <Bar key={i} w="80%" c={i === 1 ? c : `${c}40`} />)}
    </div>
    <div className="flex flex-1 flex-col gap-1.5 p-2">
      <div className="text-[7px] font-extrabold">Employees</div>
      <div className="grid grid-cols-3 gap-1">
        {[
          ["Headcount", "248"],
          ["On leave", "12"],
          ["New hires", "+9"],
        ].map(([l, v]) => (
          <div key={l} className="rounded bg-[#f8fafc] p-1">
            <div className="text-[4px] text-[#94a3b8]">{l}</div>
            <div className="text-[7px] font-extrabold" style={{ color: l === "New hires" ? c : undefined }}>{v}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-1 rounded bg-[#f8fafc] p-1">
        {["Engineering", "Design", "Support"].map((d, i) => (
          <div key={d} className="flex items-center gap-1 rounded bg-white p-0.5 shadow-sm">
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: [c, "#f59e0b", "#10b981"][i] }} />
            <div className="w-10 text-[5px] font-semibold">{d}</div>
            <div className="h-1 flex-1 rounded-full bg-[#e2e8f0]">
              <div className="h-1 rounded-full" style={{ width: `${[78, 45, 60][i]}%`, background: c }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const HotelWeb = ({ c }: { c: string }) => (
  <div className="flex h-full flex-col">
    <div className="relative h-14 p-2 text-white" style={{ background: `linear-gradient(120deg, ${c}, #1e3a8a)` }}>
      <div className="text-[8px] font-extrabold">Find your stay</div>
      <div className="text-[5px] opacity-80">3 properties · Jaffna · Colombo · Kandy</div>
    </div>
    <div className="-mt-3 mx-2 flex items-center gap-1 rounded-md bg-white p-1 text-[5px] shadow-md">
      <span className="flex-1 rounded bg-[#f1f5f9] px-1 py-0.5">📅 12 – 15 Dec</span>
      <span className="flex-1 rounded bg-[#f1f5f9] px-1 py-0.5">👤 2 guests</span>
      <span className="rounded px-1.5 py-0.5 font-bold text-white" style={{ background: c }}>Search</span>
    </div>
    <div className="grid flex-1 grid-cols-3 gap-1 p-2">
      {["🏨", "🏝️", "🏔️"].map((e, i) => (
        <div key={e} className="flex flex-col rounded-md bg-[#f0f9ff] p-1">
          <div className="grid flex-1 place-items-center text-[13px]">{e}</div>
          <div className="text-[5px] font-bold">{["City Hotel", "Beach Resort", "Hill Lodge"][i]}</div>
          <div className="text-[5px]" style={{ color: i === 1 ? "#ef4444" : "#10b981" }}>{i === 1 ? "1 room left" : "✓ Available"}</div>
        </div>
      ))}
    </div>
  </div>
);

const StoreWeb = ({ c }: { c: string }) => (
  <div className="flex h-full flex-col p-2">
    <div className="mb-1.5 flex items-center justify-between">
      <span className="text-[7px] font-extrabold">Store.</span>
      <span className="rounded-full px-1.5 py-0.5 text-[5px] font-bold text-white" style={{ background: c }}>🛒 Cart 3</span>
    </div>
    <div className="mb-1.5 rounded-md p-1.5 text-[7px] font-extrabold text-white" style={{ background: `linear-gradient(90deg, ${c}, #f97316)` }}>
      Summer sale · up to 40% off
    </div>
    <div className="grid flex-1 grid-cols-4 gap-1">
      {["👟", "⌚", "🎧", "🎒"].map((e, i) => (
        <div key={e} className="flex flex-col rounded-md bg-[#fffbeb] p-1">
          <div className="grid flex-1 place-items-center text-[14px]">{e}</div>
          <div className="text-[5px] font-bold">${[89, 199, 149, 59][i]}</div>
        </div>
      ))}
    </div>
  </div>
);

const PortfolioWeb = ({ c }: { c: string }) => (
  <div className="flex h-full flex-col bg-[#070818] p-2 text-white">
    <div className="mb-2 flex items-center justify-between">
      <span className="grid h-3 w-3 place-items-center rounded text-[4px] font-black" style={{ background: c }}>FV</span>
      <div className="flex gap-1.5">{[0, 1, 2].map((i) => <Bar key={i} w="14px" c="#ffffff33" h={2} />)}</div>
    </div>
    <div className="text-[10px] font-extrabold leading-tight">
      Hi, I'm <span style={{ color: c }}>Freddy</span>
    </div>
    <div className="mt-1 space-y-0.5">
      <Bar w="70%" c="#ffffff40" h={2} />
      <Bar w="50%" c="#ffffff40" h={2} />
    </div>
    <div className="relative mt-auto h-14 rounded-md" style={{ background: `radial-gradient(circle at 50% 100%, ${c}66, transparent 70%)` }}>
      <div className="absolute bottom-1 left-1/2 h-8 w-14 -translate-x-1/2 rounded-sm border border-white/30 bg-[#13132a]" />
      <div className="absolute bottom-1 right-[22%] h-7 w-3.5 rounded-sm border border-white/30 bg-white/90" />
    </div>
  </div>
);

// ── Design ─────────────────────────────────────────────────────────────────

const DesignCanvas = ({ children, c, file }: { children: ReactNode; c: string; file: string }) => (
  <div className="w-[92%] max-w-[340px] overflow-hidden rounded-xl bg-[#2c2c2c] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]">
    <div className="flex items-center gap-2 bg-[#1e1e1e] px-2.5 py-1.5 text-[6px] text-white/70">
      <span className="grid h-3 w-3 place-items-center rounded-sm text-[6px] font-black text-white" style={{ background: c }}>✦</span>
      {file}
      <span className="ml-auto rounded bg-white/10 px-1">100%</span>
    </div>
    <div className="flex h-[150px]">
      <div className="w-12 space-y-1 border-r border-white/10 p-1.5">
        {["Frame", "Header", "Cards", "Chart", "Nav"].map((l, i) => (
          <div key={l} className="truncate rounded px-0.5 text-[5px]" style={{ color: i === 3 ? "#fff" : "#ffffff80", background: i === 3 ? `${c}88` : "transparent" }}>
            # {l}
          </div>
        ))}
      </div>
      <div className="relative flex flex-1 items-center justify-center bg-[#e5e5e5] bg-[radial-gradient(#cfcfcf_1px,transparent_1px)] [background-size:8px_8px]">
        {children}
      </div>
    </div>
  </div>
);

const SocialDashboard = ({ c }: { c: string }) => (
  <DesignCanvas c={c} file="Social Dashboard">
    <div className="flex h-[118px] w-[85%] overflow-hidden rounded-md bg-white shadow-md ring-2 ring-offset-1" style={{ ["--tw-ring-color" as string]: c }}>
      <div className="w-6 space-y-1 p-1" style={{ background: "#eef2ff" }}>
        {[0, 1, 2, 3].map((i) => <div key={i} className="h-2 w-2 rounded-sm" style={{ background: i === 0 ? c : "#c7d2fe" }} />)}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-1.5">
        <div className="grid grid-cols-3 gap-1">
          {["12.4k", "3.2%", "+18%"].map((v, i) => (
            <div key={v} className="rounded bg-[#f8fafc] p-1">
              <div className="text-[4px] text-[#94a3b8]">{["Followers", "Engagement", "Reach"][i]}</div>
              <div className="text-[7px] font-extrabold">{v}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-0.5 rounded bg-[#f8fafc] p-1">
          {[30, 55, 40, 70, 60, 90, 75, 95].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i > 5 ? c : "#c7d2fe" }} />
          ))}
        </div>
      </div>
    </div>
  </DesignCanvas>
);

const AuralyxScreens = ({ c }: { c: string }) => (
  <DesignCanvas c={c} file="Auralyx – Music App UI Kit">
    <div className="flex items-end gap-1.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="flex h-[104px] w-[52px] flex-col gap-1 rounded-lg bg-[#120b18] p-1 shadow-md"
          style={{ transform: `translateY(${i === 1 ? -6 : 0}px)` }}
        >
          {i === 1 ? (
            <>
              <div className="aspect-square w-full rounded-md" style={{ background: `linear-gradient(135deg, ${c}, #8b5cf6)` }} />
              <Bar w="80%" c="#ffffff" h={2} />
              <Bar w="50%" c="#ffffff60" h={2} />
              <div className="mx-auto mt-auto h-3 w-3 rounded-full" style={{ background: c }} />
            </>
          ) : (
            Array.from({ length: 5 }).map((_, k) => (
              <div key={k} className="flex items-center gap-0.5">
                <div className="h-3 w-3 rounded-sm" style={{ background: k === 0 ? c : "#ffffff25" }} />
                <div className="flex-1 space-y-0.5">
                  <Bar w="90%" c="#ffffff70" h={1.5} />
                  <Bar w="60%" c="#ffffff30" h={1.5} />
                </div>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  </DesignCanvas>
);

// ── Other ──────────────────────────────────────────────────────────────────

const NovaAssistant = ({ c }: { c: string }) => (
  <div className="w-[88%] max-w-[300px] overflow-hidden rounded-xl bg-[#0b1220] p-3 text-white shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]">
    <div className="flex items-center gap-3">
      <div className="relative h-14 w-14 shrink-0">
        <div className="absolute inset-0 animate-ping rounded-full opacity-30" style={{ background: c }} />
        <div className="absolute inset-1 rounded-full" style={{ background: `radial-gradient(circle at 35% 30%, #fff, ${c} 45%, #1e3a8a)` }} />
      </div>
      <div className="flex h-8 flex-1 items-center gap-[3px]">
        {[30, 60, 90, 50, 80, 40, 100, 70, 45, 85, 55, 35, 65, 90, 40].map((h, i) => (
          <div key={i} className="flex-1 rounded-full" style={{ height: `${h}%`, background: c, opacity: 0.4 + (h / 100) * 0.6 }} />
        ))}
      </div>
    </div>
    <div className="mt-3 space-y-1.5 text-[7px]">
      <div className="w-fit rounded-lg bg-white/10 px-2 py-1">🎙️ "Nova, play some lo-fi music"</div>
      <div className="ml-auto w-fit rounded-lg px-2 py-1 text-[#0b1220]" style={{ background: c }}>Playing lo-fi beats on YouTube ▶</div>
      <div className="w-fit rounded-lg bg-white/10 px-2 py-1">🎙️ "Remind me at 5 pm"</div>
    </div>
  </div>
);

// ── Composition ────────────────────────────────────────────────────────────

const mobileScreens: Partial<Record<string, (p: { c: string }) => ReactNode>> = {
  "secure-chat": ChatApp,
  gym: GymApp,
  elearn: LearnApp,
  food: FoodApp,
  music: MusicApp,
};

export const ProjectArt = ({ project, large }: { project: Project; large?: boolean }) => {
  const c = brand[project.id] ?? "#fd6f00";
  const Screen = mobileScreens[project.id];

  let art: ReactNode;
  if (Screen) {
    art = large && project.id === "secure-chat" ? (
      <div className="flex items-end gap-4">
        <Phone className="-rotate-6 transition-transform duration-500 group-hover:-translate-y-2 group-hover:-rotate-3">
          <ChatApp c={c} />
        </Phone>
        <Phone className="mb-6 rotate-6 transition-transform duration-500 group-hover:-translate-y-3 group-hover:rotate-3" style={{ transitionDelay: "60ms" }}>
          <div className="flex h-full flex-col items-center justify-center gap-2 bg-[#faf8ff] p-3 text-center">
            <div className="grid h-12 w-12 place-items-center rounded-2xl text-xl text-white" style={{ background: c }}>🔒</div>
            <div className="text-[8px] font-extrabold">Messages are end-to-end encrypted</div>
            <div className="text-[6px] text-[#6b6b85]">Only you and Sarah can read them. Not even us.</div>
            <div className="mt-1 rounded-full px-2 py-1 text-[6px] font-bold text-white" style={{ background: c }}>Verify keys</div>
          </div>
        </Phone>
      </div>
    ) : (
      <Phone className={`transition-transform duration-500 ${large ? "translate-y-4 group-hover:translate-y-1" : "translate-y-10 group-hover:translate-y-6"}`}>
        <Screen c={c} />
      </Phone>
    );
  } else if (project.id === "tasks") {
    art = <Browser url="tasks.app/board"><TasksWeb c={c} /></Browser>;
  } else if (project.id === "hrms") {
    art = <Browser url="hrms.app/employees"><HrmsWeb c={c} /></Browser>;
  } else if (project.id === "hotel") {
    art = <Browser url="bookings.app/search"><HotelWeb c={c} /></Browser>;
  } else if (project.id === "store") {
    art = <Browser url="store.shop"><StoreWeb c={c} /></Browser>;
  } else if (project.id === "portfolio") {
    art = <Browser url="portfolio-freddy-vincent.vercel.app"><PortfolioWeb c={c} /></Browser>;
  } else if (project.id === "social-dashboard") {
    art = <SocialDashboard c={c} />;
  } else if (project.id === "auralyx") {
    art = <AuralyxScreens c={c} />;
  } else {
    art = <NovaAssistant c={c} />;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: `radial-gradient(120% 90% at 50% 110%, ${c}55, transparent 60%), linear-gradient(160deg, ${c}1f, transparent 55%)` }} />
      <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full blur-2xl" style={{ background: `${c}40` }} />
      <div
        className={`relative transition-transform duration-500 ${
          Screen ? "" : "flex w-full justify-center group-hover:-translate-y-1.5 group-hover:scale-[1.03]"
        } ${large ? "scale-110" : ""}`}
      >
        {art}
      </div>
    </div>
  );
};

export default ProjectArt;
