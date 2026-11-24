/**
 * Canvas-drawn content for the workspace scene. One shared timeline:
 *   0 → TYPE_END      code is typed in the editor, phone is idle
 *   TYPE_END → RUN_END  terminal runs the dev servers, phone builds
 *   RUN_END → LOOP     website shows on the monitor, app shows on the phone
 */

export const TYPE_END = 7;
export const RUN_END = 9.4;
export const LOOP = 19;

export type Phase = "type" | "run" | "live";
export const phaseAt = (t: number): { phase: Phase; local: number; time: number } => {
  const time = t % LOOP;
  if (time < TYPE_END) return { phase: "type", local: time / TYPE_END, time };
  if (time < RUN_END) return { phase: "run", local: (time - TYPE_END) / (RUN_END - TYPE_END), time };
  return { phase: "live", local: (time - RUN_END) / (LOOP - RUN_END), time };
};

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const ease = (v: number) => 1 - Math.pow(1 - clamp(v), 3);

const rr = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
};

const SANS = "'Plus Jakarta Sans', system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, monospace";

// ── Monitor ────────────────────────────────────────────────────────────────

export const MONITOR_W = 1280;
export const MONITOR_H = 800;

const CODE = `import { View, Text, Pressable } from "react-native";
import { useWorkouts } from "./hooks/useWorkouts";
import ProgressRing from "./ui/ProgressRing";

export default function Home() {
  const { today, streak } = useWorkouts();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Good morning, Freddy</Text>
      <ProgressRing value={today.progress} />
      <Text style={styles.streak}>{streak} day streak</Text>
      <Pressable style={styles.cta} onPress={start}>
        <Text>Start workout</Text>
      </Pressable>
    </View>
  );
}`;

const KEYWORDS = /^(import|from|export|default|function|const|return)$/;
const TOKEN = /(\s+|"[^"]*"?|<\/?[A-Za-z]+|\b[A-Za-z_]\w*\b|.)/g;

const colorFor = (tok: string, prev: string) => {
  if (KEYWORDS.test(tok)) return "#c792ea";
  if (tok.startsWith('"')) return "#c3e88d";
  if (tok.startsWith("<")) return "#82aaff";
  if (/^[A-Z]/.test(tok)) return "#ffcb6b";
  if (/^[a-z]\w*$/.test(tok) && prev === ".") return "#82aaff";
  if (/^[{}()[\]<>/=;.,]$/.test(tok)) return "#89ddff";
  return "#ececf0";
};

const terminalLines = [
  { at: 0.0, text: "$ npm run dev", color: "#ececf0" },
  { at: 0.18, text: "  VITE v7  ready in 312 ms", color: "#ffa04d" },
  { at: 0.28, text: "  ➜  Local:   http://localhost:5173/", color: "#38bdf8" },
  { at: 0.42, text: "$ npx expo start --ios", color: "#ececf0" },
  { at: 0.58, text: "  › Opening on iPhone 16…", color: "#a8a8b0" },
];

const drawEditor = (ctx: CanvasRenderingContext2D, typed: number, run: number, t: number) => {
  const W = MONITOR_W;
  const H = MONITOR_H;
  ctx.fillStyle = "#1b1b1f";
  ctx.fillRect(0, 0, W, H);

  // title bar
  ctx.fillStyle = "#131316";
  ctx.fillRect(0, 0, W, 40);
  ["#ff5f57", "#febc2e", "#28c840"].forEach((c, i) => {
    ctx.beginPath();
    ctx.arc(24 + i * 22, 20, 7, 0, Math.PI * 2);
    ctx.fillStyle = c;
    ctx.fill();
  });
  ctx.fillStyle = "#8f8f99";
  ctx.font = `500 16px ${SANS}`;
  ctx.textAlign = "center";
  ctx.fillText("fitpulse — Home.tsx", W / 2, 26);
  ctx.textAlign = "left";

  // activity bar + explorer
  ctx.fillStyle = "#16161a";
  ctx.fillRect(0, 40, 56, H - 40);
  for (let i = 0; i < 5; i++) {
    rr(ctx, 16, 64 + i * 52, 24, 24, 6);
    ctx.fillStyle = i === 0 ? "#fd6f00" : "#2c2c33";
    ctx.fill();
  }
  ctx.fillStyle = "#17171b";
  ctx.fillRect(56, 40, 230, H - 40);
  ctx.font = `600 13px ${SANS}`;
  ctx.fillStyle = "#7a7a85";
  ctx.fillText("EXPLORER", 76, 72);
  const files = ["▾ app", "   Home.tsx", "   Workouts.tsx", "▾ hooks", "   useWorkouts.ts", "▾ ui", "   ProgressRing.tsx", "▾ web", "   Landing.tsx", "package.json"];
  ctx.font = `500 15px ${SANS}`;
  files.forEach((f, i) => {
    if (i === 1) {
      ctx.fillStyle = "rgba(253,111,0,0.18)";
      ctx.fillRect(56, 88 + i * 30, 230, 28);
    }
    ctx.fillStyle = i === 1 ? "#ffffff" : "#a8a8b0";
    ctx.fillText(f, 76, 108 + i * 30);
  });

  // tabs
  ctx.fillStyle = "#16161a";
  ctx.fillRect(286, 40, W - 286, 42);
  ctx.fillStyle = "#1b1b1f";
  ctx.fillRect(286, 40, 150, 42);
  ctx.fillStyle = "#fd6f00";
  ctx.fillRect(286, 80, 150, 2);
  ctx.font = `500 15px ${SANS}`;
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Home.tsx", 312, 66);
  ctx.fillStyle = "#7a7a85";
  ctx.fillText("Landing.tsx", 466, 66);

  // code
  const chars = Math.floor(typed * CODE.length);
  const visible = CODE.slice(0, chars);
  const lines = visible.split("\n");
  const termTop = H - 220;
  const lineH = 25;
  const x0 = 350;
  const y0 = 116;
  ctx.font = `400 17px ${MONO}`;
  const maxLines = Math.floor((termTop - y0 - 10) / lineH);
  const offset = Math.max(0, lines.length - maxLines);
  lines.slice(offset).forEach((ln, li) => {
    const y = y0 + li * lineH;
    ctx.fillStyle = "#55555f";
    ctx.textAlign = "right";
    ctx.fillText(String(li + offset + 1), x0 - 22, y);
    ctx.textAlign = "left";
    let x = x0;
    let prev = "";
    for (const m of ln.matchAll(TOKEN)) {
      const tok = m[0];
      ctx.fillStyle = colorFor(tok, prev);
      ctx.fillText(tok, x, y);
      x += ctx.measureText(tok).width;
      if (tok.trim()) prev = tok;
    }
    // caret
    if (li === lines.length - 1 - offset && run === 0 && Math.floor(t * 2.5) % 2 === 0) {
      ctx.fillStyle = "#fdba74";
      ctx.fillRect(x + 1, y - 16, 2, 21);
    }
  });

  // terminal
  ctx.fillStyle = "#131316";
  ctx.fillRect(286, termTop, W - 286, 220);
  ctx.fillStyle = "#2a2a30";
  ctx.fillRect(286, termTop, W - 286, 1);
  ctx.font = `600 13px ${SANS}`;
  ctx.fillStyle = "#a8a8b0";
  ctx.fillText("TERMINAL", 312, termTop + 28);
  ctx.fillStyle = "#fd6f00";
  ctx.fillRect(312, termTop + 36, 66, 2);
  ctx.font = `400 16px ${MONO}`;
  if (run === 0) {
    ctx.fillStyle = "#7a7a85";
    ctx.fillText("$ ", 312, termTop + 72);
  }
  terminalLines.forEach((l, i) => {
    if (run < l.at) return;
    ctx.fillStyle = l.color;
    ctx.fillText(l.text, 312, termTop + 72 + i * 26);
  });
  if (run > 0.66) {
    const p = clamp((run - 0.66) / 0.3);
    const bx = 312;
    const by = termTop + 72 + 5 * 26 - 12;
    rr(ctx, bx, by, 360, 12, 6);
    ctx.fillStyle = "#2a2a30";
    ctx.fill();
    rr(ctx, bx, by, 360 * p, 12, 6);
    ctx.fillStyle = "#fd6f00";
    ctx.fill();
    ctx.fillStyle = p >= 1 ? "#4ade80" : "#a8a8b0";
    ctx.fillText(p >= 1 ? "✓ Bundled 100%" : `Bundling ${Math.round(p * 100)}%`, bx + 380, by + 11);
  }

  // status bar
  ctx.fillStyle = "#fd6f00";
  ctx.fillRect(0, H - 26, W, 26);
  ctx.font = `500 13px ${SANS}`;
  ctx.fillStyle = "#ffffff";
  ctx.fillText(run > 0 ? "● Running" : "TypeScript React", 16, H - 8);
};

/** The "FitPulse" landing page that appears once the dev server is running. */
const drawWebsite = (ctx: CanvasRenderingContext2D, p: number, t: number) => {
  const W = MONITOR_W;
  const H = MONITOR_H;
  ctx.fillStyle = "#fffaf5";
  ctx.fillRect(0, 0, W, H);

  // browser chrome
  ctx.fillStyle = "#efe9e2";
  ctx.fillRect(0, 0, W, 56);
  ["#ff5f57", "#febc2e", "#28c840"].forEach((c, i) => {
    ctx.beginPath();
    ctx.arc(24 + i * 22, 28, 7, 0, Math.PI * 2);
    ctx.fillStyle = c;
    ctx.fill();
  });
  rr(ctx, 120, 14, W - 240, 28, 14);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.font = `500 14px ${SANS}`;
  ctx.fillStyle = "#6b625a";
  ctx.fillText("🔒  localhost:5173", 140, 33);

  // page (scrolls slowly)
  const scroll = ease(clamp((p - 0.35) / 0.5)) * 300;
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 56, W, H - 56);
  ctx.clip();
  ctx.translate(0, 56 - scroll);

  // nav
  ctx.fillStyle = "#ea580c";
  rr(ctx, 60, 26, 30, 30, 9);
  ctx.fill();
  ctx.font = `800 22px ${SANS}`;
  ctx.fillStyle = "#1c1917";
  ctx.fillText("FitPulse", 100, 49);
  ctx.font = `500 16px ${SANS}`;
  ctx.fillStyle = "#6b625a";
  ["Features", "Pricing", "Download"].forEach((l, i) => ctx.fillText(l, 760 + i * 110, 47));
  rr(ctx, 1090, 22, 130, 40, 20);
  ctx.fillStyle = "#1c1917";
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.fillText("Get the app", 1112, 47);

  // hero
  const a = ease(p * 5);
  ctx.globalAlpha = a;
  rr(ctx, 60, 120, 210, 32, 16);
  ctx.fillStyle = "#ffedd5";
  ctx.fill();
  ctx.font = `600 14px ${SANS}`;
  ctx.fillStyle = "#ea580c";
  ctx.fillText("✦ New: smart streaks", 78, 141);
  ctx.font = `800 64px ${SANS}`;
  ctx.fillStyle = "#1c1917";
  ctx.fillText("Train smarter,", 60, 230 + (1 - a) * 20);
  const grad = ctx.createLinearGradient(60, 0, 520, 0);
  grad.addColorStop(0, "#ea580c");
  grad.addColorStop(1, "#fbbf24");
  ctx.fillStyle = grad;
  ctx.fillText("every single day.", 60, 304 + (1 - a) * 20);
  ctx.font = `400 20px ${SANS}`;
  ctx.fillStyle = "#6b625a";
  ctx.fillText("Plan workouts, track progress and keep your streak", 60, 358);
  ctx.fillText("alive, on the web and on your phone.", 60, 386);
  rr(ctx, 60, 420, 190, 54, 27);
  ctx.fillStyle = "#ea580c";
  ctx.fill();
  rr(ctx, 266, 420, 170, 54, 27);
  ctx.strokeStyle = "#f2d4bd";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.font = `600 17px ${SANS}`;
  ctx.fillStyle = "#fff";
  ctx.fillText("Start for free", 94, 453);
  ctx.fillStyle = "#1c1917";
  ctx.fillText("Watch demo", 302, 453);
  ctx.globalAlpha = 1;

  // hero visual: stat cards
  const b = ease(p * 5 - 0.4);
  ctx.globalAlpha = b;
  rr(ctx, 720, 110, 480, 380, 28);
  const hg = ctx.createLinearGradient(720, 110, 1200, 490);
  hg.addColorStop(0, "#f97316");
  hg.addColorStop(1, "#fbbf24");
  ctx.fillStyle = hg;
  ctx.fill();
  // ring
  const cx = 860;
  const cy = 300;
  ctx.lineWidth = 22;
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.beginPath();
  ctx.arc(cx, cy, 90, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = "#ffffff";
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(cx, cy, 90, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.72 * ease(p * 3));
  ctx.stroke();
  ctx.lineCap = "butt";
  ctx.font = `800 40px ${SANS}`;
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.fillText(`${Math.round(72 * ease(p * 3))}%`, cx, cy + 14);
  ctx.textAlign = "left";
  // mini bars
  for (let i = 0; i < 7; i++) {
    const h = [60, 90, 50, 120, 100, 140, 80][i] * ease(p * 3 - i * 0.05);
    rr(ctx, 1010 + i * 24, 420 - h, 14, h, 7);
    ctx.fillStyle = i === 5 ? "#ffffff" : "rgba(255,255,255,0.45)";
    ctx.fill();
  }
  ctx.font = `600 16px ${SANS}`;
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fillText("This week", 1010, 160);
  ctx.globalAlpha = 1;

  // features row
  const feats = [
    { c: "#f97316", t: "Workout plans", d: "Built around your goals" },
    { c: "#ea580c", t: "Live progress", d: "Rings, charts and streaks" },
    { c: "#fbbf24", t: "Sync everywhere", d: "Web, iOS and Android" },
  ];
  feats.forEach((f, i) => {
    const x = 60 + i * 390;
    const y = 560;
    rr(ctx, x, y, 360, 170, 22);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = "#f1e7dc";
    ctx.lineWidth = 2;
    ctx.stroke();
    rr(ctx, x + 26, y + 26, 48, 48, 14);
    ctx.fillStyle = f.c;
    ctx.fill();
    ctx.font = `700 22px ${SANS}`;
    ctx.fillStyle = "#1c1917";
    ctx.fillText(f.t, x + 26, y + 112);
    ctx.font = `400 17px ${SANS}`;
    ctx.fillStyle = "#6b625a";
    ctx.fillText(f.d, x + 26, y + 142);
  });
  // testimonial band
  rr(ctx, 60, 770, W - 120, 120, 24);
  ctx.fillStyle = "#1c1917";
  ctx.fill();
  ctx.font = `700 26px ${SANS}`;
  ctx.fillStyle = "#fff";
  ctx.fillText("Ready to start your streak?", 100, 838);
  rr(ctx, W - 300, 802, 180, 54, 27);
  ctx.fillStyle = "#ffa04d";
  ctx.fill();
  ctx.font = `600 17px ${SANS}`;
  ctx.fillStyle = "#1c1917";
  ctx.fillText("Download now", W - 268, 835);
  ctx.restore();

  // cursor
  const mx = 300 + Math.sin(t * 0.8) * 60 + p * 40;
  const my = 440 + Math.cos(t * 0.6) * 30 - scroll * 0.2;
  ctx.fillStyle = "#1c1917";
  ctx.beginPath();
  ctx.moveTo(mx, my);
  ctx.lineTo(mx, my + 24);
  ctx.lineTo(mx + 7, my + 18);
  ctx.lineTo(mx + 17, my + 18);
  ctx.closePath();
  ctx.fill();
};

export const drawMonitor = (ctx: CanvasRenderingContext2D, t: number) => {
  const { phase, local, time } = phaseAt(t);
  if (phase === "type") drawEditor(ctx, local, 0, t);
  else if (phase === "run") drawEditor(ctx, 1, local, t);
  else {
    const reveal = ease(local * 8);
    if (reveal < 1) drawEditor(ctx, 1, 1, t);
    ctx.save();
    ctx.globalAlpha = reveal;
    const s = 0.94 + 0.06 * reveal;
    ctx.translate((MONITOR_W * (1 - s)) / 2, (MONITOR_H * (1 - s)) / 2);
    ctx.scale(s, s);
    drawWebsite(ctx, local, t);
    ctx.restore();
  }
  // fade out at loop end
  const fade = clamp((time - (LOOP - 0.5)) / 0.5);
  if (fade > 0) {
    ctx.fillStyle = `rgba(19,19,22,${fade})`;
    ctx.fillRect(0, 0, MONITOR_W, MONITOR_H);
  }
};

// ── Phone ──────────────────────────────────────────────────────────────────

export const PHONE_W = 390;
export const PHONE_H = 844;

const statusBar = (ctx: CanvasRenderingContext2D, dark: boolean) => {
  ctx.font = `600 16px ${SANS}`;
  ctx.fillStyle = dark ? "#ffffff" : "#1c1917";
  ctx.fillText("9:41", 34, 38);
  ctx.textAlign = "right";
  ctx.fillText("5G  100%", PHONE_W - 28, 38);
  ctx.textAlign = "left";
  rr(ctx, PHONE_W / 2 - 60, 14, 120, 32, 16);
  ctx.fillStyle = "#000";
  ctx.fill();
};

const drawIdle = (ctx: CanvasRenderingContext2D, t: number) => {
  const g = ctx.createLinearGradient(0, 0, PHONE_W, PHONE_H);
  g.addColorStop(0, "#1c1917");
  g.addColorStop(0.6, "#9a3412");
  g.addColorStop(1, "#431407");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, PHONE_W, PHONE_H);
  statusBar(ctx, true);
  ctx.textAlign = "center";
  ctx.font = `300 96px ${SANS}`;
  ctx.fillStyle = "#ffffff";
  ctx.fillText("9:41", PHONE_W / 2, 200);
  ctx.font = `500 18px ${SANS}`;
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.fillText("Monday, 24 November", PHONE_W / 2, 236);
  ctx.textAlign = "left";
  // notification
  rr(ctx, 20, 300, PHONE_W - 40, 84, 22);
  ctx.fillStyle = "rgba(255,255,255,0.16)";
  ctx.fill();
  rr(ctx, 36, 318, 48, 48, 12);
  ctx.fillStyle = "#1c1917";
  ctx.fill();
  ctx.font = `700 15px ${SANS}`;
  ctx.fillStyle = "#fff";
  ctx.fillText("Expo Go", 98, 336);
  ctx.font = `400 14px ${SANS}`;
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  const dots = ".".repeat(1 + (Math.floor(t * 2) % 3));
  ctx.fillText(`Waiting for Metro${dots}`, 98, 358);
};

const drawBuilding = (ctx: CanvasRenderingContext2D, p: number) => {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, PHONE_W, PHONE_H);
  statusBar(ctx, false);
  const cx = PHONE_W / 2;
  rr(ctx, cx - 50, 300, 100, 100, 28);
  const g = ctx.createLinearGradient(cx - 50, 300, cx + 50, 400);
  g.addColorStop(0, "#f97316");
  g.addColorStop(1, "#fbbf24");
  ctx.fillStyle = g;
  ctx.fill();
  ctx.font = `800 44px ${SANS}`;
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.fillText("F", cx, 366);
  ctx.font = `700 22px ${SANS}`;
  ctx.fillStyle = "#1c1917";
  ctx.fillText("FitPulse", cx, 450);
  ctx.font = `500 15px ${SANS}`;
  ctx.fillStyle = "#6b625a";
  ctx.fillText(p < 1 ? "Downloading JavaScript bundle…" : "Ready", cx, 482);
  ctx.textAlign = "left";
  rr(ctx, 70, 510, PHONE_W - 140, 8, 4);
  ctx.fillStyle = "#ffedd5";
  ctx.fill();
  rr(ctx, 70, 510, (PHONE_W - 140) * clamp(p), 8, 4);
  ctx.fillStyle = "#ea580c";
  ctx.fill();
};

const drawApp = (ctx: CanvasRenderingContext2D, p: number) => {
  ctx.fillStyle = "#fffaf5";
  ctx.fillRect(0, 0, PHONE_W, PHONE_H);
  const scroll = ease(clamp((p - 0.45) / 0.4)) * 120;
  ctx.save();
  ctx.translate(0, -scroll);
  const a = (d: number) => ease(p * 6 - d);

  ctx.globalAlpha = a(0);
  ctx.font = `500 16px ${SANS}`;
  ctx.fillStyle = "#6b625a";
  ctx.fillText("Good morning,", 26, 104);
  ctx.font = `800 30px ${SANS}`;
  ctx.fillStyle = "#1c1917";
  ctx.fillText("Freddy 👋", 26, 140);
  ctx.beginPath();
  ctx.arc(PHONE_W - 50, 116, 24, 0, Math.PI * 2);
  ctx.fillStyle = "#fed7aa";
  ctx.fill();

  // hero card
  ctx.globalAlpha = a(0.3);
  const cy = 170 + (1 - a(0.3)) * 20;
  rr(ctx, 20, cy, PHONE_W - 40, 220, 28);
  const g = ctx.createLinearGradient(20, cy, PHONE_W - 20, cy + 220);
  g.addColorStop(0, "#f97316");
  g.addColorStop(1, "#fbbf24");
  ctx.fillStyle = g;
  ctx.fill();
  ctx.lineWidth = 16;
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.beginPath();
  ctx.arc(110, cy + 110, 62, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = "#fff";
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(110, cy + 110, 62, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.72 * ease(p * 3 - 0.3));
  ctx.stroke();
  ctx.lineCap = "butt";
  ctx.textAlign = "center";
  ctx.font = `800 26px ${SANS}`;
  ctx.fillStyle = "#fff";
  ctx.fillText(`${Math.round(72 * ease(p * 3 - 0.3))}%`, 110, cy + 120);
  ctx.textAlign = "left";
  ctx.font = `500 14px ${SANS}`;
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.fillText("Today's goal", 200, cy + 80);
  ctx.font = `800 24px ${SANS}`;
  ctx.fillStyle = "#fff";
  ctx.fillText("540 kcal", 200, cy + 112);
  ctx.font = `600 14px ${SANS}`;
  ctx.fillText("🔥 12 day streak", 200, cy + 148);

  // list
  const items = [
    { c: "#f97316", t: "Push day", d: "Chest · Shoulders · 45 min" },
    { c: "#ea580c", t: "Morning cardio", d: "Run · 20 min" },
    { c: "#fbbf24", t: "Mobility", d: "Stretch · 10 min" },
    { c: "#10b981", t: "Core finisher", d: "Abs · 8 min" },
  ];
  ctx.globalAlpha = a(0.6);
  ctx.font = `700 19px ${SANS}`;
  ctx.fillStyle = "#1c1917";
  ctx.fillText("Today's workouts", 26, 440);
  items.forEach((it, i) => {
    const al = a(0.8 + i * 0.25);
    ctx.globalAlpha = al;
    const y = 462 + i * 86 + (1 - al) * 24;
    rr(ctx, 20, y, PHONE_W - 40, 72, 20);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    rr(ctx, 34, y + 14, 44, 44, 13);
    ctx.fillStyle = it.c;
    ctx.fill();
    ctx.font = `700 16px ${SANS}`;
    ctx.fillStyle = "#1c1917";
    ctx.fillText(it.t, 92, y + 32);
    ctx.font = `400 13px ${SANS}`;
    ctx.fillStyle = "#6b625a";
    ctx.fillText(it.d, 92, y + 54);
    ctx.font = `700 20px ${SANS}`;
    ctx.fillStyle = "#fdba74";
    ctx.fillText("›", PHONE_W - 50, y + 44);
  });
  ctx.restore();
  ctx.globalAlpha = 1;

  // tab bar + status bar (fixed)
  ctx.fillStyle = "rgba(255,255,255,0.96)";
  ctx.fillRect(0, PHONE_H - 90, PHONE_W, 90);
  ["#ea580c", "#d6cfc7", "#d6cfc7", "#d6cfc7"].forEach((c, i) => {
    rr(ctx, 46 + i * 88, PHONE_H - 66, 26, 26, 8);
    ctx.fillStyle = c;
    ctx.fill();
  });
  ctx.fillStyle = "#fffaf5";
  ctx.fillRect(0, 0, PHONE_W, 56);
  statusBar(ctx, false);
};

export const drawPhone = (ctx: CanvasRenderingContext2D, t: number) => {
  const { phase, local, time } = phaseAt(t);
  if (phase === "type") drawIdle(ctx, t);
  else if (phase === "run") {
    if (local < 0.4) drawIdle(ctx, t);
    else drawBuilding(ctx, (local - 0.4) / 0.55);
  } else drawApp(ctx, local);
  // home indicator
  rr(ctx, PHONE_W / 2 - 66, PHONE_H - 16, 132, 5, 3);
  ctx.fillStyle = phase === "type" || (phase === "run" && local < 0.4) ? "rgba(255,255,255,0.7)" : "#1c1917";
  ctx.fill();
  const fade = clamp((time - (LOOP - 0.5)) / 0.5);
  if (fade > 0) {
    ctx.fillStyle = `rgba(19,19,22,${fade})`;
    ctx.fillRect(0, 0, PHONE_W, PHONE_H);
  }
};
