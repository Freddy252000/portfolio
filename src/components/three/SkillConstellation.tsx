import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { skills } from "../../data/portfolio";
import type { SkillCategory } from "../../data/portfolio";
import { scenePalette, useTheme } from "../../hooks/useTheme";
import { useInView } from "./useInView";

type Palette = ReturnType<typeof scenePalette>;

// eslint-disable-next-line react-refresh/only-export-components
export const categoryColor = (p: Palette, c: SkillCategory) =>
  ({ frontend: p.accent, backend: p.sky, design: p.pink, tools: p.amber })[c];

const RADIUS = 3;

function Constellation({ palette, active, interactive }: { palette: Palette; active: SkillCategory | null; interactive: boolean }) {
  const group = useRef<THREE.Group>(null);

  const { points, segments } = useMemo(() => {
    // Fibonacci sphere, ordered by category so each group forms a region.
    const n = skills.length;
    const points = skills.map((s, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = i * Math.PI * (3 - Math.sqrt(5));
      return { ...s, pos: new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(RADIUS) };
    });
    // Per category: links between nearby skills, and spokes towards the core.
    const segments = new Map<SkillCategory, { links: Float32Array; spokes: Float32Array }>();
    const cats = [...new Set(points.map((p) => p.category))];
    cats.forEach((cat) => {
      const links: number[] = [];
      const spokes: number[] = [];
      const own = points.filter((p) => p.category === cat);
      own.forEach((p, i) => {
        own
          .map((q, j) => ({ q, j, d: p.pos.distanceTo(q.pos) }))
          .filter(({ j }) => j > i)
          .sort((x, y) => x.d - y.d)
          .slice(0, 2)
          .forEach(({ q }) => links.push(...p.pos.toArray(), ...q.pos.toArray()));
        spokes.push(0, 0, 0, ...p.pos.clone().multiplyScalar(0.8).toArray());
      });
      segments.set(cat, { links: new Float32Array(links), spokes: new Float32Array(spokes) });
    });
    return { points, segments };
  }, []);

  const labels = useRef<(HTMLSpanElement | null)[]>([]);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera }, delta) => {
    const g = group.current;
    if (!g) return;
    if (!interactive) g.rotation.y += delta * 0.12;
    // Fade and shrink labels on the far side so the front ones stay readable.
    const camDist = camera.position.length();
    points.forEach((p, i) => {
      const el = labels.current[i];
      if (!el) return;
      tmp.copy(p.pos).applyMatrix4(g.matrixWorld);
      const depth = (camDist - camera.position.distanceTo(tmp)) / RADIUS; // -1 back .. 1 front
      const f = Math.min(1, Math.max(0, (depth + 1) / 2));
      el.style.setProperty("--depth", (0.12 + f * 0.88).toFixed(3));
      el.style.transform = `scale(${(0.75 + f * 0.25).toFixed(3)})`;
      const wrapper = el.parentElement?.parentElement;
      if (wrapper) wrapper.style.zIndex = String(Math.round(f * 100));
    });
  });

  return (
    <group ref={group}>
      {/* core */}
      <mesh>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshBasicMaterial color={palette.accent} wireframe transparent opacity={0.35} />
      </mesh>
      <mesh>
        <sphereGeometry args={[RADIUS, 32, 32]} />
        <meshBasicMaterial color={palette.line} wireframe transparent opacity={0.025} />
      </mesh>

      {[...segments.entries()].map(([cat, { links, spokes }]) => {
        const dim = !!active && active !== cat;
        const color = categoryColor(palette, cat);
        return (
          <group key={cat}>
            <lineSegments>
              <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[links, 3]} />
              </bufferGeometry>
              <lineBasicMaterial color={color} transparent opacity={dim ? 0.05 : 0.5} />
            </lineSegments>
            <lineSegments>
              <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[spokes, 3]} />
              </bufferGeometry>
              <lineBasicMaterial color={color} transparent opacity={dim ? 0.02 : 0.1} />
            </lineSegments>
          </group>
        );
      })}

      {points.map((p, i) => {
        const color = categoryColor(palette, p.category);
        const dim = !!active && active !== p.category;
        return (
          <group key={p.name} position={p.pos}>
            <mesh>
              <sphereGeometry args={[dim ? 0.05 : 0.09, 16, 16]} />
              <meshBasicMaterial color={color} transparent opacity={dim ? 0.3 : 1} toneMapped={false} />
            </mesh>
            <Html center distanceFactor={7} zIndexRange={[100, 0]} style={{ pointerEvents: "none" }}>
              <span
                ref={(el) => {
                  labels.current[i] = el;
                }}
                className="block whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-semibold"
                style={{
                  color,
                  borderColor: `${color}55`,
                  background: "rgb(var(--bg) / 0.75)",
                  opacity: `calc(var(--depth, 1) * ${dim ? 0.15 : 1})`,
                  transition: "opacity 0.3s",
                }}
              >
                {p.name}
              </span>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export default function SkillConstellation({ active, interactive }: { active: SkillCategory | null; interactive: boolean }) {
  const { isDark } = useTheme();
  const palette = scenePalette(isDark);
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="absolute inset-0" aria-hidden="true">
      <Canvas frameloop={inView ? "always" : "never"} dpr={[1, 2]} camera={{ position: [0, 0, 11.5], fov: 42 }} gl={{ alpha: true, antialias: true }}>
        <Constellation palette={palette} active={active} interactive={interactive} />
        {interactive && (
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.7} rotateSpeed={0.5} />
        )}
      </Canvas>
    </div>
  );
}
