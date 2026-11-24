import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Html, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { drawMonitor, drawPhone, MONITOR_H, MONITOR_W, phaseAt, PHONE_H, PHONE_W } from "./screens";
import { scenePalette, useTheme } from "../../hooks/useTheme";
import { useInView } from "./useInView";

type Palette = ReturnType<typeof scenePalette>;

const pointer = { x: 0, y: 0 };
const DESK_Y = -1.2;

/** A plane whose texture is redrawn from a 2D canvas every other frame. */
function CanvasScreen({
  width,
  height,
  draw,
  size,
}: {
  width: number;
  height: number;
  draw: (ctx: CanvasRenderingContext2D, t: number) => void;
  size: [number, number];
}) {
  const { ctx, texture } = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    return { ctx, texture };
  }, [width, height]);
  const frame = useRef(0);
  useEffect(() => () => texture.dispose(), [texture]);

  useFrame(({ clock }) => {
    frame.current ^= 1;
    if (frame.current) return;
    draw(ctx, clock.elapsedTime);
    texture.needsUpdate = true;
  });

  return (
    <mesh>
      <planeGeometry args={size} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function Monitor({ palette }: { palette: Palette }) {
  const sw = 3.7;
  const sh = sw * (MONITOR_H / MONITOR_W);
  return (
    <group position={[-0.35, DESK_Y + 0.08, -0.55]}>
      {/* base + neck */}
      <RoundedBox args={[1.2, 0.06, 0.6]} radius={0.03} position={[0, 0.03, 0]}>
        <meshStandardMaterial color={palette.body} metalness={0.7} roughness={0.35} />
      </RoundedBox>
      <mesh position={[0, 0.38, -0.12]}>
        <boxGeometry args={[0.16, 0.7, 0.08]} />
        <meshStandardMaterial color={palette.body} metalness={0.7} roughness={0.35} />
      </mesh>
      <group position={[0, 0.62 + sh / 2, 0]}>
        <RoundedBox args={[sw + 0.14, sh + 0.14, 0.1]} radius={0.05}>
          <meshStandardMaterial color="#101020" metalness={0.5} roughness={0.4} />
        </RoundedBox>
        <group position={[0, 0, 0.052]}>
          <CanvasScreen width={MONITOR_W} height={MONITOR_H} draw={drawMonitor} size={[sw, sh]} />
        </group>
        {/* soft screen glow on the wall behind */}
        <mesh position={[0, 0, -0.3]}>
          <planeGeometry args={[sw * 1.9, sh * 1.9]} />
          <meshBasicMaterial map={glowTexture()} color={palette.accent} transparent opacity={0.55} depthWrite={false} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

function Phone({ palette }: { palette: Palette }) {
  const w = 0.66;
  const h = w * (PHONE_H / PHONE_W);
  return (
    <group position={[2.35, DESK_Y + 0.08, 0.05]} rotation={[0, -0.45, 0]}>
      {/* stand */}
      <mesh position={[0, 0.06, 0.05]} rotation={[-0.25, 0, 0]}>
        <boxGeometry args={[0.5, 0.12, 0.35]} />
        <meshStandardMaterial color={palette.body} metalness={0.6} roughness={0.4} />
      </mesh>
      <group position={[0, 0.12 + h / 2, -0.05]} rotation={[-0.22, 0, 0]}>
        <RoundedBox args={[w + 0.06, h + 0.06, 0.06]} radius={0.06} smoothness={5}>
          <meshPhysicalMaterial color="#1a1a2e" metalness={0.8} roughness={0.25} clearcoat={1} />
        </RoundedBox>
        <group position={[0, 0, 0.032]}>
          <CanvasScreen width={PHONE_W} height={PHONE_H} draw={drawPhone} size={[w, h]} />
        </group>
      </group>
    </group>
  );
}

/** Keyboard whose keys light up while code is being typed. */
function Keyboard({ palette }: { palette: Palette }) {
  const cols = 14;
  const rows = 5;
  const keys = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const base = useMemo(() => new THREE.Color(palette.body).multiplyScalar(1.6), [palette.body]);
  const lit = useMemo(() => new THREE.Color(palette.accent), [palette.accent]);
  const heat = useRef(new Float32Array(cols * rows));
  const tmp = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    const mesh = keys.current;
    if (!mesh) return;
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        dummy.position.set(-1.04 + c * 0.16, 0.06, -0.3 + r * 0.15);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        mesh.setColorAt(i, base);
      }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [dummy, base]);

  useFrame(({ clock }, delta) => {
    const mesh = keys.current;
    if (!mesh) return;
    const { phase } = phaseAt(clock.elapsedTime);
    if (phase === "type" && Math.random() < 0.55) heat.current[Math.floor(Math.random() * cols * rows)] = 1;
    for (let i = 0; i < cols * rows; i++) {
      heat.current[i] = Math.max(0, heat.current[i] - delta * 4);
      tmp.copy(base).lerp(lit, heat.current[i]);
      mesh.setColorAt(i, tmp);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <group position={[-0.35, DESK_Y + 0.08, 0.95]} rotation={[0.06, 0, 0]}>
      <RoundedBox args={[2.36, 0.08, 0.86]} radius={0.04} position={[0, 0.02, 0]}>
        <meshStandardMaterial color={palette.body} metalness={0.5} roughness={0.5} />
      </RoundedBox>
      <instancedMesh ref={keys} args={[undefined, undefined, cols * rows]}>
        <boxGeometry args={[0.13, 0.05, 0.12]} />
        <meshStandardMaterial roughness={0.6} toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

function Props({ palette }: { palette: Palette }) {
  return (
    <group>
      {/* mouse + pad */}
      <mesh position={[1.35, DESK_Y + 0.085, 0.95]}>
        <boxGeometry args={[0.9, 0.01, 0.75]} />
        <meshStandardMaterial color={palette.accent} roughness={0.9} transparent opacity={0.35} />
      </mesh>
      <mesh position={[1.35, DESK_Y + 0.13, 0.98]} scale={[0.13, 0.07, 0.2]}>
        <sphereGeometry args={[1, 24, 16]} />
        <meshStandardMaterial color="#e8e6f5" roughness={0.3} />
      </mesh>
      {/* mug */}
      <group position={[-2.75, DESK_Y + 0.08, 0.75]}>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.17, 0.15, 0.4, 24]} />
          <meshStandardMaterial color={palette.accent} roughness={0.4} />
        </mesh>
        <mesh position={[0.19, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.09, 0.025, 8, 16]} />
          <meshStandardMaterial color={palette.accent} roughness={0.4} />
        </mesh>
      </group>
      {/* plant */}
      <group position={[-3.0, DESK_Y + 0.08, -0.45]}>
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.24, 0.18, 0.44, 24]} />
          <meshStandardMaterial color="#efe9f9" roughness={0.6} />
        </mesh>
        {[
          [0, 0.75, 0, 0.26],
          [-0.18, 0.62, 0.08, 0.2],
          [0.2, 0.66, -0.05, 0.22],
          [0.05, 0.98, 0.05, 0.18],
          [-0.1, 0.88, -0.12, 0.17],
        ].map(([x, y, z, s], i) => (
          <mesh key={i} position={[x, y, z]} scale={[s, s * 1.3, s]}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color={i % 2 ? "#34d399" : "#10b981"} roughness={0.7} flatShading />
          </mesh>
        ))}
      </group>
      {/* book stack */}
      <group position={[1.75, DESK_Y + 0.08, -0.75]} rotation={[0, 0.3, 0]}>
        {["#38bdf8", "#f472b6", "#fbbf24"].map((c, i) => (
          <RoundedBox key={c} args={[0.8 - i * 0.06, 0.1, 0.55]} radius={0.02} position={[0, 0.05 + i * 0.1, 0]} rotation={[0, i * 0.12, 0]}>
            <meshStandardMaterial color={c} roughness={0.6} />
          </RoundedBox>
        ))}
      </group>
    </group>
  );
}

function Desk({ palette }: { palette: Palette }) {
  return (
    <group>
      <RoundedBox args={[7.4, 0.16, 3.0]} radius={0.06} position={[0, DESK_Y, 0.15]}>
        <meshStandardMaterial color={palette.desk} roughness={0.55} metalness={0.1} />
      </RoundedBox>
      {[-3.4, 3.4].map((x) => (
        <mesh key={x} position={[x, DESK_Y - 1.2, 0.15]}>
          <boxGeometry args={[0.12, 2.3, 2.6]} />
          <meshStandardMaterial color={palette.body} roughness={0.5} />
        </mesh>
      ))}
      <ContactShadows position={[0, DESK_Y + 0.085, 0.15]} scale={[7.4, 3]} opacity={0.45} blur={2.4} far={2} resolution={512} />
    </group>
  );
}

/** Small floating UI callouts that appear as the build progresses. */
function Callouts({ compact }: { compact: boolean }) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const items = [
    { pos: [-3.55, 1.25, -0.3], show: (p: string, l: number) => p === "type" && l > 0.15, text: "⌨️  Writing the app in React Native" },
    { pos: [-3.55, 0.75, -0.2], show: (p: string) => p === "run", text: "⚡  npm run dev · ready in 312 ms" },
    { pos: [-3.55, 1.25, -0.3], show: (p: string) => p === "live", text: "🌐  Live on the web" },
    { pos: [3.0, 1.35, 0.1], show: (p: string, l: number) => p === "live" && l > 0.08, text: "📱  Running on iOS & Android" },
  ] as const;

  useFrame(({ clock }) => {
    const { phase, local } = phaseAt(clock.elapsedTime);
    items.forEach((it, i) => {
      const el = refs.current[i];
      if (!el) return;
      const on = it.show(phase, local);
      el.style.opacity = on ? "1" : "0";
      el.style.transform = on ? "translateY(0) scale(1)" : "translateY(8px) scale(0.96)";
    });
  });

  if (compact) return null;
  return (
    <>
      {items.map((it, i) => (
        <Html key={i} position={it.pos as unknown as [number, number, number]} center zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
          <div
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="whitespace-nowrap rounded-2xl border border-line/10 bg-surface/85 px-4 py-2.5 text-sm font-semibold text-ink shadow-[0_12px_40px_-12px_rgb(var(--accent)/0.6)] backdrop-blur-md"
            style={{ opacity: 0, transition: "opacity .45s ease, transform .45s ease" }}
          >
            {it.text}
          </div>
        </Html>
      ))}
    </>
  );
}

function Rig({ children, compact }: { children: React.ReactNode; compact: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const ty = pointer.x * 0.18;
    const tx = pointer.y * 0.06;
    g.rotation.y += (ty - g.rotation.y) * 0.05;
    g.rotation.x += (tx - g.rotation.x) * 0.05;
  });
  return (
    <group ref={ref} scale={compact ? 0.82 : 1}>
      {children}
    </group>
  );
}

let glow: THREE.Texture | null = null;
function glowTexture() {
  if (glow) return glow;
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, "rgba(255,255,255,0.9)");
  g.addColorStop(0.4, "rgba(255,255,255,0.25)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  glow = new THREE.CanvasTexture(c);
  return glow;
}

export default function WorkspaceScene({ compact = false }: { compact?: boolean }) {
  const { isDark } = useTheme();
  const palette = scenePalette(isDark);
  const [wrapRef, inView] = useInView<HTMLDivElement>();

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0" aria-hidden="true">
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={[1, compact ? 1.5 : 2]}
        camera={{ position: compact ? [0, 1.3, 8.2] : [0, 0.9, 6.5], fov: compact ? 40 : 36 }}
        onCreated={({ camera }) => camera.lookAt(0, -0.05, 0)}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={isDark ? 0.45 : 0.8} />
        <directionalLight position={[4, 6, 5]} intensity={isDark ? 1.1 : 1.6} color="#fff6ec" />
        <pointLight position={[-0.35, 1.2, 0.8]} intensity={isDark ? 10 : 4} color={palette.accent} />
        <pointLight position={[3.5, 1, 2]} intensity={isDark ? 6 : 3} color={palette.accent2} />
        <Environment resolution={128}>
          <Lightformer intensity={1.5} position={[0, 5, 3]} scale={[10, 2, 1]} />
          <Lightformer intensity={0.8} position={[-5, 1, 2]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} color={palette.accent} />
        </Environment>

        <Rig compact={compact}>
          <Desk palette={palette} />
          <Monitor palette={palette} />
          <Phone palette={palette} />
          <Keyboard palette={palette} />
          <Props palette={palette} />
          <Callouts compact={compact} />
        </Rig>
      </Canvas>
    </div>
  );
}
