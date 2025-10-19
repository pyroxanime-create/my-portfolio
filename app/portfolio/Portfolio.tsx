"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Linkedin,
  Github,
  X,
  CheckCircle2,
  Info,
  Sparkles,
  MonitorSmartphone,
  SunMedium,
  Moon,
} from "lucide-react";
// 3D
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import PaySplitEmbedPhone from "./PaySplitEmbedPhone";


/*
  Adam Calliste Portfolio — High-Contrast, Ultra-Visual, Interactive (Restored, Stable v8)
  Crash-proof notes:
  - No async assets (no GLB/HDR/texture) → no Suspense needed.
  - <hemisphereLight> uses constructor args to avoid prop confusion.
  - WebGL detection + error boundary fallback to static poster.
*/

// ---- Utility tokens ----
const TOKENS = {
  brand: {
    iris: "#5B5FEF",
    fuchsia: "#ED4BD6",
    sky: "#3BC9F5",
    emerald: "#34D399",
    amber: "#F59E0B",
  },
};

function getTextTokens(theme: "dark" | "dim" | "light") {
  if (theme === "light") {
    return { primary: "#0B0D13", body: "#253046", mist: "#495672" };
  }
  return { primary: "#F3F5FA", body: "#DFE4F0", mist: "#BAC2D6" };
}

const THEME_BACKGROUND: Record<"dark" | "dim" | "light", { page: string; base: string }> = {
  dark: {
    page:
      "radial-gradient(1200px 800px at 20% -10%, rgba(93,97,240,0.24), transparent 60%),radial-gradient(1000px 700px at 120% 10%, rgba(237,75,214,0.14), transparent 50%),#0b0d13",
    base: "#0b0d13",
  },
  dim: {
    page:
      "radial-gradient(1200px 800px at 10% -10%, rgba(93,97,240,0.18), transparent 60%),radial-gradient(1000px 700px at 120% 12%, rgba(237,75,214,0.12), transparent 52%),#11131a",
    base: "#11131a",
  },
  light: {
    page: "linear-gradient(180deg, #ffffff, #f3f6ff)",
    base: "#ffffff",
  },
};

// ---- Cursor ----
function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!dot.current || !ring.current) return;
      dot.current.style.left = e.clientX + "px";
      dot.current.style.top = e.clientY + "px";
      ring.current.style.left = e.clientX + "px";
      ring.current.style.top = e.clientY + "px";
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const wantsLink = target?.closest(
        "[data-cursor='link'],a,button,label,input,textarea,select"
      );
      document.body.classList.toggle("cursor--link", !!wantsLink);
    };
    const down = () => document.body.classList.add("cursor--press");
    const up = () => document.body.classList.remove("cursor--press");
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none z-50" aria-hidden>
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
      <style>{`
        .cursor-dot,.cursor-ring{position:absolute;border-radius:9999px;transform:translate(-50%,-50%);transition:width .18s,height .18s,background .18s,border-color .18s,opacity .18s}
        .cursor-dot{width:6px;height:6px;background:var(--fg);mix-blend-mode:difference}
        .cursor-ring{width:30px;height:30px;border:1px solid rgba(255,255,255,.35);backdrop-filter:blur(2px)}
        .cursor--link .cursor-ring{width:44px;height:44px;border-color:${TOKENS.brand.sky}}
        .cursor--press .cursor-ring{width:22px;height:22px;border-color:${TOKENS.brand.fuchsia}}
        @media (pointer:coarse){.cursor-dot,.cursor-ring{display:none}}
      `}</style>
    </div>
  );
}

// ---- Buttons ----
function Button({
  children,
  onClick,
  variant = "primary",
  accentColor,
  theme,
  className = "",
  href,
  type,
  ...rest
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  accentColor: string;
  theme: "dark" | "dim" | "light";
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  [key: string]: any;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-5 py-3 focus:outline-none focus-visible:ring focus-visible:ring-[rgba(91,95,239,0.45)] transition";
  const stylePrimary =
    theme === "light"
      ? { background: accentColor, color: "#fff", boxShadow: "0 10px 26px rgba(0,0,0,0.12)" }
      : { backgroundImage: `linear-gradient(90deg, ${accentColor}, ${TOKENS.brand.amber})`, color: "#0b0d13" };
  const styleSecondary =
    theme === "light"
      ? { background: "#fff", border: "1px solid rgba(0,0,0,0.10)", color: "#0b0d13" }
      : { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" };
  const styleGhost =
    theme === "light" ? { background: "transparent", color: "#0b0d13" } : { background: "transparent", color: "#fff" };
  const styles: any = { primary: stylePrimary, secondary: styleSecondary, ghost: styleGhost };
  const Comp: any = href ? "a" : "button";
  return (
    <Comp
      href={href}
      onClick={onClick}
      className={`${base} ${className}`}
      style={styles[variant]}
      type={Comp === "button" ? type || "button" : undefined}
      data-cursor="link"
      {...rest}
    >
      {children}
    </Comp>
  );
}

// ---- Section ----
function Section({
  id,
  eyebrow,
  title,
  children,
  theme,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  theme: "dark" | "dim" | "light";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-18% 0px -18% 0px" });
  return (
    <section id={id} ref={ref} className="scroll-mt-24 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="space-y-3 mb-8"
      >
        {eyebrow && <p className="text-xs tracking-[0.26em] uppercase text-iris">{eyebrow}</p>}
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: "var(--fg)" }}>
          {title}
        </h2>
      </motion.div>
      {children}
    </section>
  );
}

// ---- 3D primitives (safe & visible) ----
function AccentModel({ color = "#5B5FEF" }) {
  const ref = useRef<any>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.4;
    ref.current.rotation.x += dt * 0.12;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.9}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshStandardMaterial color={color} metalness={0.55} roughness={0.3} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.152, 0]} />
        <meshBasicMaterial wireframe color={"#ffffff"} opacity={0.22} transparent />
      </mesh>
    </Float>
  );
}

// ---- WebGL detection ----
function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

function StaticHeroPoster({ theme }: { theme: "dark" | "dim" | "light" }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          theme === "light"
            ? "radial-gradient(120% 120% at 0% 100%, rgba(91,95,239,0.20), transparent 58%), radial-gradient(120% 120% at 100% 0%, rgba(237,75,214,0.16), transparent 60%), linear-gradient(180deg, #fff, #f7f9ff)"
            : "radial-gradient(120% 120% at 0% 100%, rgba(91,95,239,0.28), transparent 58%), radial-gradient(120% 120% at 100% 0%, rgba(237,75,214,0.22), transparent 60%), linear-gradient(180deg, #0c0f16, #0e1118)",
      }}
    />
  );
}

class R3FErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {}
  render() {
    return this.state.hasError ? (
      <div className="absolute inset-0 grid place-items-center text-xs" style={{ color: "#e11d48" }}>
        3D failed — static preview shown
      </div>
    ) : (
      this.props.children
    );
  }
}

function HeroCanvas({ accentColor, theme }: { accentColor: string; theme: "dark" | "dim" | "light" }) {
  const [mounted, setMounted] = useState(false);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  useEffect(() => {
    setMounted(true);
    setWebgl(supportsWebGL());
  }, []);
  if (!mounted) return <div style={{ width: "100%", height: "100%" }} />;

  if (webgl === false) {
    return (
      <div className="relative w-full h-full">
        <StaticHeroPoster theme={theme} />
        <div
          className="absolute bottom-3 left-4 text-xs"
          style={{ color: theme === "light" ? "#253046" : "#BAC2D6" }}
        >
          Static preview (WebGL unavailable)
        </div>
      </div>
    );
  }

  const bg = THEME_BACKGROUND[theme].base;
  return (
    <div className="relative w-full h-full">
      <R3FErrorBoundary>
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [2.8, 1.8, 3.4], fov: 40 }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          style={{ width: "100%", height: "100%" }}
        >
          <color attach="background" args={[bg]} />
          <ambientLight intensity={0.95} />
          <directionalLight position={[4, 5, 2]} intensity={1.05} />
          <hemisphereLight args={[0xffffff, theme === "light" ? 0xcfd8e3 : 0x0b0d13, 0.35]} />
          <spotLight position={[2, 6, 3]} angle={0.4} penumbra={0.5} intensity={0.85} />
          <AccentModel color={accentColor} />
          <OrbitControls
            target={[0, 0, 0]}
            enablePan={false}
            minDistance={2}
            maxDistance={6}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
      </R3FErrorBoundary>
    </div>
  );
}

// ---- Project Modal ----
function Modal({
  open,
  onClose,
  project,
  accentColor,
  theme,
}: {
  open: boolean;
  onClose: () => void;
  project: any | null;
  accentColor: string;
  theme: "dark" | "dim" | "light";
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const [slide, setSlide] = useState(0);
  const slides = React.useMemo(
    () => [
      { id: 0, label: "Overview", bg: project?.accentFrom || "rgba(91,95,239,0.45)" },
      { id: 1, label: "Flows", bg: project?.accentTo || "rgba(237,75,214,0.35)" },
      { id: 2, label: "Components", bg: "rgba(59,201,245,0.35)" },
    ],
    [project]
  );
  const modalPalette = THEME_BACKGROUND[theme];
  const modalBorder =
    theme === "light" ? "rgba(0,0,0,0.12)" : theme === "dim" ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.12)";

  return (
    <AnimatePresence>
      {open && project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-5xl rounded-t-3xl border p-0 overflow-hidden"
            style={{
              borderColor: modalBorder,
              background: modalPalette.base,
            }}
            initial={{ y: 64 }}
            animate={{ y: 0 }}
            exit={{ y: 64 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <div className="grid md:grid-cols-2">
              {/* 3D side */}
              <div className="relative min-h-[320px]">
                <HeroCanvas accentColor={accentColor} theme={theme} />
                <div
                  className="absolute top-3 left-3 text-xs px-2 py-1 rounded-full"
                  style={{
                    background: theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)",
                    color: theme === "light" ? "#0b0d13" : "#DFE4F0",
                  }}
                >
                  Interactive 3D
                </div>
              </div>

              {/* Content side */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold" style={{ color: "var(--fg)" }}>
                      {project.title}
                    </h3>
                    <p className="text-sm" style={{ color: "var(--mist)" }}>
                      {project.subtitle}
                    </p>
                  </div>
                  <button
                    aria-label="Close"
                    onClick={onClose}
                    className="p-2 rounded-lg border"
                    style={{
                      background: theme === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.06)",
                      borderColor: theme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)",
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Carousel */}
                <div className="mt-5">
                  <div
                    className="relative h-48 rounded-2xl overflow-hidden border"
                    style={{
                      borderColor: theme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)",
                    }}
                  >
                    <motion.div
                      key={slide}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full relative"
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(140% 100% at 10% 100%, ${slides[slide].bg}, transparent 60%),
                                       radial-gradient(140% 100% at 100% 0%, rgba(91,95,239,0.28), transparent 60%),
                                       linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))`,
                        }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            theme === "light"
                              ? "linear-gradient(180deg, rgba(255,255,255,0.0), rgba(0,0,0,0.06))"
                              : "linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.0))",
                        }}
                      />
                      <div className="absolute bottom-3 left-4 text-sm" style={{ color: "var(--mist)" }}>
                        {slides[slide].label}
                      </div>
                    </motion.div>
                    <div className="absolute inset-0 flex items-center justify-between p-3">
                      <button
                        onClick={() => setSlide((s) => (s - 1 + slides.length) % slides.length)}
                        className="px-3 py-2 rounded-lg border"
                        style={{
                          background: theme === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.06)",
                          borderColor: theme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)",
                        }}
                      >
                        ‹
                      </button>
                      <button
                        onClick={() => setSlide((s) => (s + 1) % slides.length)}
                        className="px-3 py-2 rounded-lg border"
                        style={{
                          background: theme === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.06)",
                          borderColor: theme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)",
                        }}
                      >
                        ›
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    {slides.map((s) => (
                      <span
                        key={s.id}
                        className={`h-1.5 rounded-full ${s.id === slide ? "w-6" : "w-2"}`}
                        style={{
                          background:
                            s.id === slide
                              ? `linear-gradient(90deg, ${accentColor}, #ED4BD6)`
                              : theme === "light"
                              ? "rgba(0,0,0,0.2)"
                              : "rgba(255,255,255,0.3)",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="mt-6 grid sm:grid-cols-3 gap-4 text-sm">
                  <div
                    className="rounded-xl p-4 border"
                    style={{
                      background: theme === "light" ? "#ffffff" : "rgba(255,255,255,0.05)",
                      borderColor: theme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)",
                    }}
                  >
                    <p className="mb-1" style={{ color: "var(--mist)" }}>
                      Problem
                    </p>
                    <p style={{ color: "var(--body)" }}>
                      Users face{" "}
                      {project.title === "StreamVibe"
                        ? "choice fatigue"
                        : project.title === "MindSpace"
                        ? "habit drop-offs"
                        : project.title === "PennyWise"
                        ? "overwhelming financial info"
                        : "fragmented planning"}{" "}
                      across tools.
                    </p>
                  </div>
                  <div
                    className="rounded-xl p-4 border sm:col-span-2"
                    style={{
                      background: theme === "light" ? "#ffffff" : "rgba(255,255,255,0.05)",
                      borderColor: theme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)",
                    }}
                  >
                    <p className="mb-1" style={{ color: "var(--mist)" }}>
                      Approach
                    </p>
                    <p style={{ color: "var(--body)" }}>
                      Information architecture with progressive disclosure; calm visuals; crisp
                      interactions; and clear affordances.
                    </p>
                  </div>
                  <div
                    className="rounded-xl p-4 border sm:col-span-3"
                    style={{
                      background: theme === "light" ? "#ffffff" : "rgba(255,255,255,0.05)",
                      borderColor: theme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)",
                    }}
                  >
                    <p className="mb-1" style={{ color: "var(--mist)" }}>
                      Outcome
                    </p>
                    <p className="inline-flex items-center gap-2" style={{ color: "var(--body)" }}>
                      <CheckCircle2 size={16} color="#34D399" /> Faster task completion · Higher trust ·
                      Better focus
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---- Project Card ----
function ProjectCard({
  data,
  onOpen,
  theme,
  accentColor,
}: {
  data: any;
  onOpen: (p: any) => void;
  theme: "dark" | "dim" | "light";
  accentColor: string;
}) {
  const { title, subtitle, tags, summary, accentFrom, accentTo, embedSrc } = data;
  const borderCol = theme === "light" ? "border-black/10" : "border-white/10";
  const baseBg = theme === "light" ? "bg-white" : "bg-white/5";
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className={`group overflow-hidden rounded-2xl border ${borderCol} ${baseBg} shadow-[0_8px_30px_rgba(0,0,0,0.15)] grid md:grid-cols-2`}
    >
      <div className="relative h-56 md:h-full">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120%_120% at 0% 100%, ${accentFrom}, transparent 60%),
                         radial-gradient(120%_120% at 100% 0%, ${accentTo}, transparent 60%),
                         linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              theme === "light"
                ? "linear-gradient(180deg, rgba(255,255,255,0.0), rgba(0,0,0,0.1))"
                : "linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.0))",
          }}
        />
      </div>
      <div className="p-6 sm:p-8 flex flex-col gap-4">
        <div>
          <h3 className="text-2xl font-semibold" style={{ color: "var(--fg)" }}>
            {title}
          </h3>
        </div>
        <p style={{ color: "var(--mist)" }}>{subtitle}</p>
        <p className="leading-relaxed" style={{ color: "var(--body)" }}>
          {summary}
        </p>
        {embedSrc && (
          <div
            className="mt-4 rounded-2xl overflow-hidden border"
            style={{
              borderColor: theme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.12)",
              background: theme === "light" ? "#f9fafb" : "rgba(255,255,255,0.03)",
            }}
          >
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                title={`${title} Figma Prototype`}
                src={embedSrc}
                allowFullScreen
                className="absolute inset-0 h-full w-full"
                style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
              />
            </div>
          </div>
        )}
        <div className="mt-auto flex flex-wrap gap-2">
          {tags.map((t: string) => (
            <span
              key={t}
              className="text-xs px-3 py-1 rounded-full"
              style={{
                background: theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.07)",
                color: "var(--body)",
                border:
                  theme === "light" ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-end">
          <Button
            theme={theme}
            accentColor={accentColor}
            variant="secondary"
            onClick={() => onOpen(data)}
          >
            View case study <ArrowUpRight size={16} />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

function FigmaEmbed({ title, src }: { title: string; src: string }) {
  return (
    <div className="flex justify-center py-8">
      <div className="w-full max-w-[800px]">
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            title={title}
            src={src}
            allowFullScreen
            className="absolute inset-0 h-full w-full rounded-2xl shadow-[0_12px_45px_rgba(0,0,0,0.3)]"
            style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
          />
        </div>
      </div>
    </div>
  );
}

// ---- Data ----
const heroData = {
  titleLines: ["Designing intuitive", "interfaces that feel", "like second nature."],
  blurb:
    "I’m Adam Calliste — a UI/UX student at the University of the Arts London. I explore the intersection of human psychology and interface design to craft clear, intentional products.",
};

const projects = [
  {
    key: "pennywise",
    title: "PennyWise",
    subtitle: "Personal finance coach",
    tags: ["Savings", "Behavioral Nudges", "AI Coach", "Mobile"],
    summary:
      "Automated saving rules, contextual spending insights, and gentle nudges that keep budgets on track without the stress.",
    accentFrom: "rgba(91,95,239,0.45)",
    accentTo: "rgba(59,201,245,0.32)",
    embedSrc:
      "https://embed.figma.com/design/SgZJcSvAPxc8WL5XSxOjwD/Penny-wise?node-id=0-1&embed-host=share",
  },
  {
    key: "streamvibe",
    title: "StreamVibe",
    subtitle: "Streaming service UI",
    tags: ["Personalization", "Discovery", "Media Player", "Accessibility"],
    summary:
      "Signals-based recommendations and a calmer, focused layout with elegant player controls.",
    accentFrom: "rgba(237,75,214,0.35)",
    accentTo: "rgba(91,95,239,0.35)",
    embedSrc:
      "https://embed.figma.com/design/MjRiItB7sjc1FyHvWCA9Cq/Stream-Vibe?node-id=0-1&embed-host=share",
  },
  {
    key: "mindspace",
    title: "MindSpace",
    subtitle: "Mental wellness dashboard",
    tags: ["Mood Tracking", "Data Viz", "Calming UI", "Wellbeing"],
    summary:
      "Log moods, visualize trends, and nudge healthy habits with supportive interactions.",
    accentFrom: "rgba(59,201,245,0.35)",
    accentTo: "rgba(237,75,214,0.35)",
    embedSrc:
      "https://embed.figma.com/design/G0t1JySY61M9XGD37L0eBc/mindspace?node-id=0-1&embed-host=share",
  },
  {
    key: "studyflow",
    title: "StudyFlow",
    subtitle: "AI-powered study planner",
    tags: ["Students", "Scheduling", "AI Assistance", "Productivity"],
    summary:
      "Assignment tracking, optimized study sessions, and progress visualization aligned with academic goals.",
    accentFrom: "rgba(91,95,239,0.35)",
    accentTo: "rgba(237,75,214,0.25)",
  },
];

const figmaProjects = [
  {
    key: "pennywise",
    title: "PennyWise Prototype",
    src: "https://embed.figma.com/design/SgZJcSvAPxc8WL5XSxOjwD/Penny-wise?node-id=0-1&embed-host=share",
  },
  {
    key: "shared-vault",
    title: "Shared Vault Prototype",
    src: "https://embed.figma.com/design/zyR6HXBTF4wPkti0MIlXcX/shared-vault?node-id=0-1&embed-host=share",
  },
  {
    key: "mindspace",
    title: "MindSpace Prototype",
    src: "https://embed.figma.com/design/G0t1JySY61M9XGD37L0eBc/mindspace?node-id=0-1&embed-host=share",
  },
  {
    key: "kid-revolut",
    title: "Kid Revolut Prototype",
    src: "https://embed.figma.com/design/E59cTlgHidvEjPLb7EqnwM/kid-revolut?node-id=0-1&embed-host=share",
  },
  {
    key: "bank-app",
    title: "Bank App Mock-up Prototype",
    src: "https://embed.figma.com/design/KDjg2eDF1FoCQTJ4i0pend/Bank-app-mock-up?embed-host=share",
  },
];

const skills = {
  core: [
    "User research & testing",
    "Wireframing & prototyping",
    "Visual design",
    "Interaction design",
    "Design systems",
  ],
  tech: [
    { label: "Sigma / Figma", percent: 90 },
    { label: "Clip Studio", percent: 85 },
    { label: "Blender", percent: 80 },
    { label: "Adobe Suite", percent: 70 },
  ],
};

const education = [
  {
    org: "University of the Arts London (UAL)",
    role: "B.A. (Hons) User Experience Design — Current",
    detail:
      "Exploring human-centered design, psychology-informed UX, and front-end prototyping.",
  },
];

const experience = [
  {
    org: "Freelance / Concept Work",
    role: "UI/UX Designer — 2024–2025",
    detail:
      "Concepts across finance, media, wellbeing, and education with research-driven decisions and polished interactions.",
  },
];


// ---- Main ----
export default function AdamCallistePortfolio() {
  const [sent, setSent] = useState(false);
  const [modalProject, setModalProject] = useState<any | null>(null);
  const [theme, setTheme] = useState<"dark" | "dim" | "light">("dark");
  const [typeScale, setTypeScale] = useState<"md" | "lg">("lg");
  const [accent, setAccent] =
    useState<"iris" | "fuchsia" | "sky" | "emerald" | "amber">("iris");

  // Apply page background + CSS vars
  useEffect(() => {
    const root = document.documentElement;
    const palette = THEME_BACKGROUND[theme];
    const tokens = getTextTokens(theme);

    root.style.background = palette.page;
    root.style.setProperty("--background", palette.page);
    root.style.setProperty("--fg", tokens.primary);
    root.style.setProperty("--body", tokens.body);
    root.style.setProperty("--mist", tokens.mist);
    root.style.setProperty("--foreground", tokens.primary);

    document.body.style.background = palette.page;
    document.body.style.color = tokens.body;
    document.body.style.setProperty("--background", palette.page);
    document.body.style.setProperty("--foreground", tokens.primary);
  }, [theme]);

  const accentColor = TOKENS.brand[accent];
  const headerBgClass =
    theme === "light" ? "bg-white/80" : theme === "dim" ? "bg-[#161926]/80" : "bg-[#101216]/75";
  const headerBorderClass =
    theme === "light" ? "border-black/10" : theme === "dim" ? "border-white/10" : "border-white/5";

  return (
    <div className={`min-h-screen`}>
      <Cursor />
      {/* Header */}
      <header
        className={`sticky top-0 z-40 backdrop-blur ${headerBgClass} border-b ${headerBorderClass}`}
      >
        <div className="mx-auto max-w-6xl px-6 sm:px-8 h-16 flex items-center justify-between">
          <a
            href="#"
            className={`font-extrabold tracking-tight ${
              typeScale === "lg" ? "text-xl" : "text-lg"
            }`}
            style={{ color: accentColor }}
          >
            Adam <span style={{ color: "var(--fg)" }}>Calliste</span>
          </a>
          <nav className="hidden sm:flex items-center gap-4" style={{ color: "var(--body)" }}>
            {[
              { href: "#projects", label: "Projects" },
              { href: "#about", label: "About" },
              { href: "#skills", label: "Skills" },
              { href: "#experience", label: "Experience" },
              { href: "#contact", label: "Contact" },
            ].map((n) => (
              <a
                key={n.href}
                href={n.href}
                data-cursor="link"
                className="hover:opacity-100 opacity-90 transition-opacity"
              >
                {n.label}
              </a>
            ))}
            {/* Controls */}
            <div className="ml-3 hidden md:flex items-center gap-2">
              <Button
                theme={theme}
                accentColor={accentColor}
                variant="secondary"
                onClick={() => setTypeScale((s) => (s === "lg" ? "md" : "lg"))}
              >
                <MonitorSmartphone size={16} /> {typeScale === "lg" ? "Larger" : "Regular"}
              </Button>
              <Button
                theme={theme}
                accentColor={accentColor}
                variant="secondary"
                onClick={() =>
                  setTheme((t) => (t === "dark" ? "dim" : t === "dim" ? "light" : "dark"))
                }
              >
                {theme === "light" ? <SunMedium size={16} /> : <Moon size={16} />} {theme}
              </Button>
              <div
                className={`flex items-center gap-1 px-2 py-1.5 rounded-full ${
                  theme === "light"
                    ? "border border-black/10 bg-black/5"
                    : "border border-white/10 bg-white/5"
                }`}
              >
                {(["iris", "fuchsia", "sky", "emerald", "amber"] as const).map((a) => (
                  <button
                    key={a}
                    onClick={() => setAccent(a)}
                    title={`Accent: ${a}`}
                    className={`w-4 h-4 rounded-full border ${
                      accent === a ? "ring-2 ring-[rgba(91,95,239,0.45)]" : ""
                    }`}
                    style={{
                      background: TOKENS.brand[a],
                      borderColor:
                        theme === "light" ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)",
                    }}
                  />
                ))}
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 sm:py-28 lg:py-32 mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`${
                typeScale === "lg"
                  ? "text-5xl sm:text-7xl lg:text-8xl"
                  : "text-4xl sm:text-6xl lg:text-7xl"
              } font-extrabold tracking-tight leading-[1.04]`}
              style={{ color: "var(--fg)" }}
            >
              {heroData.titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className={`mt-6 max-w-xl ${typeScale === "lg" ? "text-lg" : "text-base"} leading-relaxed`}
              style={{ color: "var(--body)" }}
            >
              {heroData.blurb}
            </motion.p>
            <div className="mt-8 flex gap-3">
              <Button theme={theme} accentColor={accentColor} variant="primary" href="#projects">
                View projects
              </Button>
              <Button theme={theme} accentColor={accentColor} variant="secondary" href="#contact">
                Get in touch
              </Button>
            </div>
            <p className="mt-4 inline-flex items-center gap-2 text-sm" style={{ color: "var(--mist)" }}>
              <Info size={16} /> Accessibility, performance, and polish baked in.
            </p>
          </div>
          {/* Visual: Figma prototype */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`relative aspect-[4/5] rounded-3xl overflow-hidden border shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_16px_60px_rgba(0,0,0,0.15)] ${
              theme === "light" ? "border-black/10 bg-white" : "border-white/8"
            }`}
          >
            <iframe
              title="PennyWise Prototype"
              src="https://embed.figma.com/design/SgZJcSvAPxc8WL5XSxOjwD/Penny-wise?node-id=0-1&embed-host=share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
              style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
            />
            <div className="absolute bottom-3 left-4 text-sm" style={{ color: "var(--mist)" }}>
              Live Figma prototype
            </div>
          </motion.div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 sm:px-8">
        {/* Projects */}
       {/* Selected Work */}
<Section
  id="projects"
  eyebrow="Selected Work"
  title="Projects that blend psychology and design."
  theme={theme}
>
  <div className="grid gap-6">
    {projects.map((p) => (
      <ProjectCard
        key={p.key}
        data={p}
        onOpen={setModalProject}
        theme={theme}
        accentColor={accentColor}
      />
    ))}

    {/* ✅ PaySplit Demo Embed */}
    <div className="flex justify-center py-8">
      <PaySplitEmbedPhone />
    </div>
    {/* ✅ Figma Prototype Embeds */}
    {figmaProjects.map((item) => (
      <FigmaEmbed key={item.key} title={item.title} src={item.src} />
    ))}
  </div>
</Section>


        {/* About */}
        <Section
          id="about"
          eyebrow="About"
          title="A designer focused on intuitive, human-centered experiences."
          theme={theme}
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div
              className={`md:col-span-2 rounded-2xl border p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.15)] ${
                theme === "light"
                  ? "border-black/10 bg-white"
                  : "border-white/10 bg-white/6 backdrop-blur"
              }`}
            >
              <p
                className={`${typeScale === "lg" ? "text-[17px]" : "text-base"} leading-relaxed`}
                style={{ color: "var(--body)" }}
              >
                I’m Adam, a UI/UX student at <strong>University of the Arts London</strong> studying
                User Experience Design. My work explores how cognitive patterns and emotion shape digital
                behavior. I love simplifying complex systems into interfaces that are clear, calm, and
                trustworthy.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "User Research",
                  "Wireframing",
                  "Prototyping",
                  "Visual Design",
                  "Interaction Design",
                  "Design Systems",
                  "Figma",
                  "Adobe CC",
                  "HTML",
                  "CSS",
                  "JavaScript",
                ].map((i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      background: theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)",
                      color: "var(--body)",
                      border:
                        theme === "light"
                          ? "1px solid rgba(0,0,0,0.08)"
                          : "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
            <div
              className={`rounded-2xl border p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.15)] ${
                theme === "light"
                  ? "border-black/10 bg-white"
                  : "border-white/10 bg-white/6 backdrop-blur"
              }`}
            >
              <h4 className="font-semibold mb-3" style={{ color: "var(--fg)" }}>
                Design philosophy
              </h4>
              <ul className="text-sm space-y-2" style={{ color: "var(--body)" }}>
                <li>• Clarity beats cleverness.</li>
                <li>• Emotion guides attention and memory.</li>
                <li>• Small interactions shape trust.</li>
                <li>• Accessibility isn’t extra — it’s essential.</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills" eyebrow="Capabilities" title="Craft, systems, and implementation." theme={theme}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkillCard title="Core competencies" items={skills.core} theme={theme} />
            <SkillCard title="Technical skills" items={skills.tech} theme={theme} />
            <SkillCard
              title="Toolbox highlights"
              items={["Design tokens", "Component libraries", "Framer Motion", "Usability testing", "WCAG checks"]}
              theme={theme}
            />
          </div>
        </Section>

        {/* Experience */}
        <Section id="experience" eyebrow="Journey" title="Education & experience." theme={theme}>
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className={`rounded-2xl border p-6 shadow-[0_8px_30px_rgba(0,0,0,0.15)] ${
                theme === "light" ? "border-black/10 bg-white" : "border-white/10 bg-white/6 backdrop-blur"
              }`}
            >
              <h4 className="font-semibold mb-3" style={{ color: "var(--fg)" }}>
                Education
              </h4>
              <ul className="space-y-4">
                {education.map((e) => (
                  <li key={e.org}>
                    <p className="font-medium" style={{ color: "var(--fg)" }}>
                      {e.org}
                    </p>
                    <p className="text-sm" style={{ color: "var(--body)" }}>
                      {e.role}
                    </p>
                    <p className="text-sm mt-1" style={{ color: "var(--mist)" }}>
                      {e.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`rounded-2xl border p-6 shadow-[0_8px_30px_rgba(0,0,0,0.15)] ${
                theme === "light" ? "border-black/10 bg-white" : "border-white/10 bg-white/6 backdrop-blur"
              }`}
            >
              <h4 className="font-semibold mb-3" style={{ color: "var(--fg)" }}>
                Experience
              </h4>
              <ul className="space-y-4">
                {experience.map((e) => (
                  <li key={e.org}>
                    <p className="font-medium" style={{ color: "var(--fg)" }}>
                      {e.org}
                    </p>
                    <p className="text-sm" style={{ color: "var(--body)" }}>
                      {e.role}
                    </p>
                    <p className="text-sm mt-1" style={{ color: "var(--mist)" }}>
                      {e.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" eyebrow="Say hello" title="Let’s build something thoughtful." theme={theme}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 2800);
            }}
            className={`rounded-2xl border p-6 sm:p-8 grid gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.15)] ${
              theme === "light" ? "border-black/10 bg-white" : "border-white/10 bg-white/6 backdrop-blur"
            }`}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2" style={{ color: "var(--body)" }}>
                  Name
                </label>
                <input
                  required
                  name="name"
                  className={`w-full rounded-xl px-4 py-3 outline-none ${
                    theme === "light" ? "bg-black/5 border border-black/10" : "bg-white/8 border border-white/12"
                  }`}
                  style={{ color: "var(--fg)" }}
                />
              </div>
              <div>
                <label className="block text-sm mb-2" style={{ color: "var(--body)" }}>
                  Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  className={`w-full rounded-xl px-4 py-3 outline-none ${
                    theme === "light" ? "bg-black/5 border border-black/10" : "bg-white/8 border border-white/12"
                  }`}
                  style={{ color: "var(--fg)" }}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2" style={{ color: "var(--body)" }}>
                Message
              </label>
              <textarea
                required
                name="message"
                rows={5}
                className={`w-full rounded-xl px-4 py-3 outline-none ${
                  theme === "light" ? "bg-black/5 border border-black/10" : "bg-white/8 border border-white/12"
                }`}
                style={{ color: "var(--fg)" }}
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs inline-flex items-center gap-1" style={{ color: "var(--mist)" }}>
                <Sparkles size={14} /> I’ll get back within 2–3 days.
              </p>
              <Button theme={theme} accentColor={accentColor} variant="primary" type="submit">
                Send message
              </Button>
            </div>
            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: TOKENS.brand.emerald }}
                >
                  <CheckCircle2 size={16} /> Thanks! Your message was captured for this demo.
                </motion.div>
              )}
            </AnimatePresence>
            <div className="mt-4 flex gap-3 text-sm" style={{ color: "var(--body)" }}>
              <a data-cursor="link" href="#" className="inline-flex items-center gap-2 hover:opacity-100 opacity-90">
                <Mail size={16} /> Email
              </a>
              <a data-cursor="link" href="#" className="inline-flex items-center gap-2 hover:opacity-100 opacity-90">
                <Linkedin size={16} /> LinkedIn
              </a>
              <a data-cursor="link" href="#" className="inline-flex items-center gap-2 hover:opacity-100 opacity-90">
                <Github size={16} /> GitHub
              </a>
            </div>
          </form>
        </Section>

        {/* DevTests: sanity */}
        <DevTests />
      </main>

      <footer className={`mt-20 border-t ${theme !== "light" ? "border-white/8" : "border-black/10"}`}>
        <div
          className="mx-auto max-w-6xl px-6 sm:px-8 py-10 text-sm flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ color: "var(--body)" }}
        >
          <p>© {new Date().getFullYear()} Adam Calliste</p>
          <p className="opacity-90 inline-flex items-center gap-2">
            Designed & built in React + Framer Motion + R3F
          </p>
        </div>
      </footer>

      {/* Global styles */}
      <style>{`
        :root { --fg:#F3F5FA; --body:#DFE4F0; --mist:#BAC2D6; }
        .text-iris{ color:${TOKENS.brand.iris}; }
        a:focus-visible, button:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(91,95,239,0.45); }
        ::selection { background: rgba(91,95,239,0.35); }
        * { scrollbar-width: thin; scrollbar-color: #3a3f55 transparent; }
        *::-webkit-scrollbar { width: 8px; height: 8px; }
        *::-webkit-scrollbar-thumb { background: #303548; border-radius: 999px; }
        @media (prefers-reduced-motion: reduce){ *,*::before,*::after{ animation:none!important; transition:none!important; } }
      `}</style>

      {/* Modal mount */}
      <Modal
        open={!!modalProject}
        onClose={() => setModalProject(null)}
        project={modalProject}
        accentColor={accentColor}
        theme={theme}
      />
    </div>
  );
}

// ---- Skill Card ----
type SkillItem = string | { label: string; percent?: number };

function SkillCard({
  title,
  items,
  theme,
}: {
  title: string;
  items: SkillItem[];
  theme: "dark" | "dim" | "light";
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`rounded-2xl border ${
        theme === "light" ? "border-black/10 bg-white" : "border-white/10 bg-white/5"
      } backdrop-blur p-6 flex flex-col gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.15)]`}
    >
      <h4 className="font-semibold" style={{ color: "var(--fg)" }}>
        {title}
      </h4>
      <ul className="space-y-3">
        {items.map((item, idx) => {
          const data = typeof item === "string" ? { label: item } : item;
          const label = data.label;
          const percent = data.percent ?? 70 + idx * 6;
          return (
            <li key={label} className="text-sm">
              <div className="flex items-center justify-between" style={{ color: "var(--body)" }}>
                <span>{label}</span>
                <span className="text-xs" style={{ color: "var(--mist)" }}>
                  {percent}%
                </span>
              </div>
              <div
                className="mt-2 h-2 rounded-full"
                style={{ background: theme === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.12)" }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${TOKENS.brand.iris}, ${TOKENS.brand.fuchsia}, ${TOKENS.brand.amber})`,
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

function DevTests() {
  const [results, setResults] = useState<{ name: string; pass: boolean }[]>([]);
  useEffect(() => {
    const out: { name: string; pass: boolean }[] = [];
    // Light tokens
    const tL = getTextTokens("light");
    out.push({ name: "tokens.light.primary", pass: tL.primary === "#0B0D13" });
    out.push({ name: "tokens.light.body", pass: tL.body === "#253046" });
    // Dark tokens
    const tD = getTextTokens("dark");
    out.push({ name: "tokens.dark.primary", pass: tD.primary === "#F3F5FA" });
    // 3D primitive smoke test
    try {
      const m = <AccentModel />;
      out.push({ name: "3d.accent.element", pass: !!m });
    } catch {
      out.push({ name: "3d.accent.element", pass: false });
    }
    // WebGL detect boolean
    const w = supportsWebGL();
    out.push({ name: "webgl.detect.boolean", pass: typeof w === "boolean" });
    // Section smoke test
    try {
      const s = (
        <Section id="t" title="x" theme="dark">
          y
        </Section>
      );
      out.push({ name: "section.element", pass: !!s });
    } catch {
      out.push({ name: "section.element", pass: false });
    }
    setResults(out);
  }, []);
  const all = results.length > 0 && results.every((r) => r.pass);
  return (
    <details className="mt-6 text-xs opacity-90" style={{ color: "var(--mist)" }}>
      <summary>DevTests {all ? "— all passing" : "— check"}</summary>
      <ul className="mt-1 list-disc pl-5 space-y-0.5">
        {results.map((r) => (
          <li key={r.name} className={r.pass ? "text-emerald-400" : "text-rose-400"}>
            {r.pass ? "✓" : "✗"} {r.name}
          </li>
        ))}
      </ul>
    </details>
  );
}
