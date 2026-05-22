import { Switch, Route, Router as WouterRouter, Link } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChevronDown, Check, Menu, X, Mail } from "lucide-react";
import logoSrc from "@assets/ChatGPT_Image_21_de_mai._de_2026,_12_09_16_1_1779362713859.png";
import heroManSrc from "/hero-man.png";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import NotFound from "@/pages/not-found";
import { LangProvider, useLang } from "./i18n";
import type { Lang } from "./translations";

const queryClient = new QueryClient();

const MotionLink = motion.create(Link) as React.ComponentType<
  React.ComponentPropsWithRef<typeof Link> &
    Parameters<typeof motion.create>[1] &
    Record<string, unknown>
>;

const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "PT", label: "PT" },
  { code: "EN", label: "EN" },
  { code: "ES", label: "ES" },
];

const MILESTONE_STATIC = [
  { year: "2016", image: "/historia-2016.png" },
  { year: "2019", image: "/historia-2019.png" },
  { year: "2020", image: "/historia-2020.png" },
];

const SECTORES_DATA = [
  {
    key: "automovel",
    name: "Automóvel",
    subtitle: "Soluções completas para o sector automóvel",
    description:
      "Fornecemos peças, acessórios e lubrificantes de alta performance para veículos ligeiros, pesados e industriais. Com marcas de referência internacional como Nergytech, Petronas, Castrol e Galp, garantimos qualidade e durabilidade em cada produto — para frotas empresariais e particulares.",
    tagline: "Alta performance para cada veículo",
    thumbnail: "/historia-2020.png",
    bg: "linear-gradient(145deg, #001534 0%, #002d6e 55%, #003591 100%)",
    pattern: "#0047c0",
  },
  {
    key: "agricola",
    name: "Agrícola",
    subtitle: "Equipamentos que trabalham tanto quanto o agricultor",
    description:
      "Apoiamos o desenvolvimento do sector rural angolano com máquinas, ferramentas e equipamentos agrícolas de alta durabilidade. Através da nossa marca própria Pangulino, oferecemos produtos desenvolvidos para as condições do campo angolano — robustos, fiáveis e acessíveis.",
    tagline: "Soluções para o campo angolano",
    thumbnail: "/historia-2016.png",
    bg: "linear-gradient(145deg, #0b2414 0%, #1a5230 55%, #1f6b3a 100%)",
    pattern: "#267a42",
  },
  {
    key: "industrial",
    name: "Industrial",
    subtitle: "Fornecimento industrial de confiança",
    description:
      "Servimos indústrias, unidades fabris e empresas de logística com lubrificantes, materiais de manutenção e ferramentas diversas. A nossa equipa experiente garante o produto certo para cada aplicação — com stock permanente e atendimento especializado nas três províncias onde operamos.",
    tagline: "Stock permanente, atendimento especializado",
    thumbnail: "/historia-2019.png",
    bg: "linear-gradient(145deg, #0d0d18 0%, #1a1a30 55%, #22223e 100%)",
    pattern: "#2d2d50",
  },
] as const;

// ─── NavPill ──────────────────────────────────────────────────────────────────
function NavPill({ item, overlap }: { item: string; overlap?: boolean }) {
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <MotionLink
      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
      className="text-[11px] font-semibold tracking-widest py-[7px] rounded-full whitespace-nowrap inline-flex items-center justify-center relative overflow-hidden"
      style={{
        background: "#ffffff",
        color: "#111111",
        paddingLeft: "1.25rem",
        paddingRight: "1.25rem",
        marginLeft: overlap ? "-4px" : "0",
      }}
      whileHover={{ paddingLeft: "1.75rem", paddingRight: "1.75rem", zIndex: 10 }}
      transition={{ type: "spring", stiffness: 110, damping: 22, mass: 1.4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouse(null)}
    >
      <AnimatePresence>
        {mouse && (
          <motion.span
            key="glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle 55px at ${mouse.x}px ${mouse.y}px, rgba(59,130,246,0.18) 0%, transparent 80%)`,
            }}
          />
        )}
      </AnimatePresence>
      <span className="relative z-10">{item}</span>
    </MotionLink>
  );
}

// ─── LangDropdown ─────────────────────────────────────────────────────────────
function LangDropdown() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-0.5 text-[11px] font-semibold tracking-widest cursor-pointer select-none"
        data-testid="button-lang-selector"
      >
        {lang}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="inline-flex"
        >
          <ChevronDown className="w-3 h-3" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 bg-white rounded-2xl shadow-lg overflow-hidden min-w-[72px] z-50"
            style={{ transformOrigin: "top center" }}
          >
            {LANGUAGES.map((l, i) => (
              <motion.button
                key={l.code}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, type: "spring", stiffness: 400, damping: 22 }}
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-[11px] font-semibold tracking-widest transition-colors cursor-pointer
                  ${lang === l.code ? "bg-neutral-100" : "hover:bg-neutral-50"}`}
                style={{ color: "#003591" }}
                data-testid={`button-lang-${l.code}`}
              >
                {l.label}
                {lang === l.code && (
                  <Check className="w-3 h-3 ml-3" style={{ color: "#003591" }} />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── MobileMenu ───────────────────────────────────────────────────────────────
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, lang, setLang } = useLang();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed inset-0 z-[60] bg-background flex flex-col px-6 pt-6 pb-12"
        >
          <div className="flex items-center justify-between mb-10">
            <Link href="/" onClick={onClose}>
              <img src={logoSrc} alt="Gasosa Auto Agro" className="h-11 w-auto object-contain" />
            </Link>
            <button onClick={onClose} className="p-2 text-foreground">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-2">
            {t.nav.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 400, damping: 28 }}
              >
                <Link
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={onClose}
                  className="text-xl font-semibold tracking-wide text-foreground py-3 border-b border-foreground/10 flex items-center justify-between"
                >
                  {item}
                  <span style={{ color: "#003591" }}>→</span>
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="mt-8 flex gap-2">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`text-[11px] font-semibold tracking-widest px-4 py-2 rounded-full transition-colors ${
                  lang === l.code ? "text-white" : "bg-white text-foreground"
                }`}
                style={lang === l.code ? { background: "#003591" } : {}}
              >
                {l.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── MilestoneCard ────────────────────────────────────────────────────────────
function MilestoneCard({
  year,
  image,
  label,
  subtitle,
  description,
  index,
  sectionProgress,
}: {
  year: string;
  image: string;
  label: string;
  subtitle: string;
  description: string;
  index: number;
  sectionProgress: ReturnType<typeof useSpring>;
}) {
  const imgRef = useRef(null);
  const { scrollYProgress: imgScroll } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgSmoothScroll = useSpring(imgScroll, { stiffness: 60, damping: 20, restDelta: 0.001 });
  const imageY = useTransform(imgSmoothScroll, [0, 1], ["-12%", "12%"]);

  const base = 0.06 + index * 0.09;
  const labelOpacity = useTransform(sectionProgress, [base, base + 0.14], [0, 1]);
  const labelX = useTransform(sectionProgress, [base, base + 0.14], [-18, 0]);
  const cardOpacity = useTransform(sectionProgress, [base + 0.03, base + 0.18], [0, 1]);
  const cardY = useTransform(sectionProgress, [base + 0.03, base + 0.18], [40, 0]);
  const descOpacity = useTransform(sectionProgress, [base + 0.08, base + 0.22], [0, 1]);
  const descY = useTransform(sectionProgress, [base + 0.08, base + 0.22], [20, 0]);

  return (
    <div
      className="overflow-hidden"
      style={{
        borderRight: index < MILESTONE_STATIC.length - 1 ? "1px solid rgba(255,255,255,0.15)" : "none",
      }}
    >
      <div
        className="px-0 md:px-8 pt-10 pb-10"
        style={{ paddingLeft: index === 0 ? 0 : undefined }}
      >
        <motion.div style={{ opacity: labelOpacity, x: labelX, marginBottom: "16px" }}>
          <span style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.45)",
            display: "block",
            marginBottom: "4px",
          }}>
            {year} — {label}
          </span>
          <span style={{
            fontSize: "clamp(0.95rem, 0.7rem + 1vw, 1.15rem)",
            fontWeight: 700,
            color: "#ffffff",
            display: "block",
            lineHeight: 1.2,
          }}>
            {subtitle}
          </span>
        </motion.div>

        <motion.div
          style={{ opacity: cardOpacity, y: cardY }}
          className="w-full rounded-xl overflow-hidden mb-6"
          ref={imgRef}
        >
          <motion.div style={{ y: imageY, height: "220px", position: "relative" }}>
            <img
              src={image}
              alt={`Gasosa Auto Agro — ${year}`}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.82) saturate(0.9)", display: "block" }}
            />
          </motion.div>
        </motion.div>

        <motion.p
          style={{
            opacity: descOpacity,
            y: descY,
            color: "rgba(255,255,255,0.78)",
            fontSize: "clamp(0.78rem, 0.6rem + 0.6vw, 0.92rem)",
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}

// ─── CurrentYearHighlight ─────────────────────────────────────────────────────
function CurrentYearHighlight({
  sectionProgress,
}: {
  sectionProgress: ReturnType<typeof useSpring>;
}) {
  const { t } = useLang();

  const yearX = useTransform(sectionProgress, [0.38, 0.62], [-60, 0]);
  const yearOpacity = useTransform(sectionProgress, [0.38, 0.58], [0, 1]);
  const textY = useTransform(sectionProgress, [0.44, 0.66], [28, 0]);
  const textOpacity = useTransform(sectionProgress, [0.44, 0.62], [0, 1]);

  return (
    <div className="mt-0 pt-10 border-t border-white/20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
      <div className="overflow-hidden">
        <motion.span
          style={{
            x: yearX,
            opacity: yearOpacity,
            display: "block",
            fontWeight: 800,
            lineHeight: 0.85,
            letterSpacing: "-0.04em",
            color: "#ffffff",
            fontSize: "clamp(5rem, 4rem + 10vw, 14rem)",
          }}
        >
          2025
        </motion.span>
      </div>

      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="sm:max-w-[360px] pb-2"
      >
        <span style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.45)",
          display: "block",
          marginBottom: "8px",
        }}>
          {t.historia.currentLabel}
        </span>
        <p style={{
          color: "rgba(255,255,255,0.85)",
          fontSize: "clamp(0.85rem, 0.6rem + 0.8vw, 1.05rem)",
          lineHeight: 1.65,
          fontWeight: 500,
        }}>
          {t.historia.currentText}
        </p>
      </motion.div>
    </div>
  );
}

// ─── HistoriaSection ──────────────────────────────────────────────────────────
function HistoriaSection() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const sectionProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  const headingY = useTransform(sectionProgress, [0, 0.14], [55, 0]);
  const headingOpacity = useTransform(sectionProgress, [0, 0.11], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="w-full"
      style={{ background: "#003591", fontFamily: "'Poppins', sans-serif", position: "relative" }}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 pt-10 pb-16 sm:pt-14 sm:pb-24">
        <div className="overflow-hidden mb-16 sm:mb-20">
          <motion.h2
            style={{
              y: headingY,
              opacity: headingOpacity,
              color: "#ffffff",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "0.01em",
              fontSize: "clamp(1.25rem, 0.8rem + 2.8vw, 4rem)",
              maxWidth: "700px",
            }}
          >
            {t.historia.heading}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/20">
          {MILESTONE_STATIC.map((m, i) => {
            const tr = t.historia.milestones[i];
            return (
              <MilestoneCard
                key={m.year}
                year={m.year}
                image={m.image}
                label={tr.label}
                subtitle={tr.subtitle}
                description={tr.description}
                index={i}
                sectionProgress={sectionProgress}
              />
            );
          })}
        </div>

        <CurrentYearHighlight sectionProgress={sectionProgress} />
      </div>
    </section>
  );
}

// ─── SectoresSection ──────────────────────────────────────────────────────────
function SectoresSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v < 1 / 3) setActiveIndex(0);
      else if (v < 2 / 3) setActiveIndex(1);
      else setActiveIndex(2);
    });
  }, [scrollYProgress]);

  const active = SECTORES_DATA[activeIndex];

  return (
    <div ref={containerRef} style={{ height: "300vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* ── Left panel: stacked sector names ─────────────── */}
        <div
          style={{
            width: "clamp(200px, 22%, 320px)",
            flexShrink: 0,
            paddingTop: "clamp(36px, 6vh, 80px)",
            paddingBottom: "clamp(32px, 6vh, 72px)",
            paddingLeft: "clamp(28px, 4.5vw, 64px)",
            paddingRight: "clamp(16px, 2.5vw, 36px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            background: "#F5EFE9",
          }}
        >
          {/* ── Sector names ── */}
          <div style={{ marginBottom: "clamp(24px, 4.5vh, 52px)" }}>
            {SECTORES_DATA.map((s, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={s.key}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    lineHeight: 1.08,
                    marginBottom: "0.02em",
                    overflow: "hidden",
                  }}
                >
                  {/* Reserved arrow slot — always takes space, only visible when active */}
                  <span
                    style={{
                      display: "inline-block",
                      width: "clamp(1.6rem, 1.4rem + 1.2vw, 2.8rem)",
                      flexShrink: 0,
                    }}
                  >
                    <motion.span
                      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -6 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        display: "inline-block",
                        fontSize: "clamp(2rem, 1.6rem + 2.4vw, 4.4rem)",
                        fontWeight: 700,
                        color: "#111111",
                        lineHeight: 1.06,
                      }}
                    >
                      →
                    </motion.span>
                  </span>

                  {/* Sector name */}
                  <motion.span
                    animate={{
                      color: isActive ? "#111111" : "rgba(0,0,0,0.3)",
                      fontWeight: isActive ? 700 : 400,
                    }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      fontSize: "clamp(2rem, 1.6rem + 2.4vw, 4.4rem)",
                      letterSpacing: "-0.035em",
                      lineHeight: 1.06,
                    }}
                  >
                    {s.name}
                  </motion.span>
                </div>
              );
            })}
          </div>

          {/* ── Separator ── */}
          <div
            style={{
              width: "clamp(48px, 30%, 100px)",
              height: 1,
              background: "rgba(0,0,0,0.18)",
              marginBottom: "clamp(14px, 2.5vh, 28px)",
            }}
          />

          {/* ── Tagline ── */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`tag-${activeIndex}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.18 } }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: "clamp(0.72rem, 0.6rem + 0.4vw, 0.88rem)",
                fontWeight: 500,
                color: "rgba(0,0,0,0.55)",
                lineHeight: 1.45,
                marginBottom: "clamp(14px, 2.5vh, 28px)",
              }}
            >
              {active.tagline} ↓
            </motion.p>
          </AnimatePresence>

          {/* ── Thumbnail ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`thumb-${activeIndex}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: "clamp(100px, 55%, 170px)",
                aspectRatio: "4 / 3",
                borderRadius: "6px",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <img
                src={active.thumbnail}
                alt={active.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Middle panel: subtitle + description ─────────── */}
        <div
          style={{
            width: "clamp(180px, 20%, 300px)",
            flexShrink: 0,
            paddingTop: "clamp(36px, 6vh, 80px)",
            paddingBottom: "clamp(36px, 6vh, 80px)",
            paddingLeft: "clamp(24px, 3.5vw, 52px)",
            paddingRight: "clamp(20px, 3vw, 44px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            background: "#F5EFE9",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.h3
              key={`sub-${activeIndex}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: "clamp(1.05rem, 0.85rem + 1vw, 1.65rem)",
                fontWeight: 700,
                lineHeight: 1.22,
                letterSpacing: "-0.01em",
                color: "#111111",
                margin: 0,
              }}
            >
              {active.subtitle}
            </motion.h3>
          </AnimatePresence>

          {/* spacer pushes description to lower portion */}
          <div style={{ flex: 1 }} />

          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${activeIndex}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
              style={{
                fontSize: "clamp(0.75rem, 0.6rem + 0.5vw, 0.93rem)",
                lineHeight: 1.82,
                color: "rgba(0,0,0,0.58)",
                fontWeight: 400,
                margin: 0,
              }}
            >
              {active.description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* ── Right panel: visual ───────────────────────────── */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: 0,
                background: active.bg,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                padding: "clamp(24px, 4vw, 64px)",
                overflow: "hidden",
              }}
            >
              {/* Large ghost name behind */}
              <span
                style={{
                  position: "absolute",
                  bottom: "-0.08em",
                  right: "-0.04em",
                  fontSize: "clamp(7rem, 14vw, 22rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.05em",
                  lineHeight: 0.85,
                  color: "rgba(255,255,255,0.06)",
                  userSelect: "none",
                  pointerEvents: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {active.name}
              </span>
              {/* Sector index overlay */}
              <div style={{ position: "relative", zIndex: 2 }}>
                <span
                  style={{
                    display: "block",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    color: "rgba(255,255,255,0.45)",
                    marginBottom: "10px",
                    textTransform: "uppercase",
                  }}
                >
                  Sector {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "clamp(1.4rem, 2vw, 2.2rem)",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.92)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                  }}
                >
                  {active.name}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────
function Home() {
  const { t } = useLang();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const progress = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      setScrollProgress(progress);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroBlur = scrollProgress * 3;
  const heroScale = 1 - scrollProgress * 0.028;
  const heroBrightness = 1 - scrollProgress * 0.09;

  return (
    <div className="w-full flex flex-col">

      {/* ── Header (fixed, floats over everything) ───────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between px-5 sm:px-8 py-5 max-w-[1400px] mx-auto">
        <Link href="/" className="flex items-center">
          <img src={logoSrc} alt="Gasosa Auto Agro" className="h-10 sm:h-12 w-auto object-contain" />
        </Link>

        <nav className="hidden lg:flex items-center gap-4">
          <div className="flex items-center">
            {t.nav.map((item, i) => (
              <NavPill key={item} item={item} overlap={i > 0} />
            ))}
          </div>
          <LangDropdown />
        </nav>

        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(true)}
          aria-label={t.mobile.openMenu}
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* ── Hero wrapper ─────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-0 min-h-[100dvh] w-full bg-background flex flex-col overflow-hidden"
        style={{
          filter: `blur(${heroBlur}px) brightness(${heroBrightness})`,
          transform: `scale(${heroScale})`,
          transformOrigin: "center center",
          willChange: "transform, filter",
          borderRadius: scrollProgress > 0 ? `${scrollProgress * 20}px` : "0px",
        }}
      >
        <main className="relative flex-1 w-full overflow-hidden">

          {/* Title */}
          <div className="absolute inset-x-0 top-0 z-10 w-full text-center px-4 sm:px-10 pt-20 sm:pt-24">
            <motion.h1
              style={{
                color: "#003591",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "0.02em",
                fontSize: "clamp(1.55rem, 1rem + 3.8vw, 5rem)",
              }}
              initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.2, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {t.hero.title1}<br />
              {t.hero.title2}
            </motion.h1>
          </div>

          {/* Man image */}
          <div className="absolute inset-0 flex items-end justify-center z-20 pointer-events-none select-none">
            <motion.img
              src={heroManSrc}
              alt={t.hero.technicianAlt}
              style={{
                height: "clamp(340px, 80vh, 780px)",
                width: "auto",
                objectFit: "contain",
                objectPosition: "bottom center",
                display: "block",
              }}
              initial={{ opacity: 0, scale: 0.9, y: "42%", filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, y: "18%", filter: "blur(0px)" }}
              transition={{ delay: 0.55, duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Bottom bar */}
          <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-10 right-4 sm:right-10 z-30 flex items-end justify-between gap-3">
            <motion.p
              style={{
                fontSize: "clamp(0.72rem, 0.5rem + 0.9vw, 0.95rem)",
                color: "#003591",
                lineHeight: 1.65,
                fontWeight: 500,
                maxWidth: "clamp(160px, 22vw, 240px)",
              }}
              initial={{ opacity: 0, y: 60, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              className="relative overflow-hidden rounded-2xl flex-shrink-0 hidden sm:block"
              style={{
                width: "clamp(170px, 22vw, 260px)",
                height: "clamp(110px, 13vw, 160px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.24)",
              }}
              initial={{ opacity: 0, scale: 0.92, y: 60, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src="/contact-card.png"
                alt={t.hero.contactAlt}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <p
                className="absolute top-3 left-3 right-3"
                style={{
                  color: "#ffffff",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(10px, 1.1vw, 13px)",
                  lineHeight: 1.35,
                  textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                }}
              >
                {t.hero.cardText1}<br />{t.hero.cardText2}
              </p>
              <div className="absolute bottom-3 left-3 flex items-center whitespace-nowrap">
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    background: "#ffffff",
                    width: "30px",
                    height: "30px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <Mail className="w-3.5 h-3.5" style={{ color: "#111111" }} />
                </div>
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    background: "#ffffff",
                    paddingLeft: "14px",
                    paddingRight: "14px",
                    height: "30px",
                    marginLeft: "-4px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "#111111",
                    }}
                  >
                    {t.hero.contactBtn}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* ── História Section ─────────────────────────────────────────── */}
      <div
        className="relative z-10"
        style={{
          borderRadius: "28px 28px 0 0",
          overflow: "hidden",
          boxShadow: "0 -12px 60px rgba(0,0,0,0.28)",
        }}
      >
        <HistoriaSection />
      </div>

      {/* ── Sectores Section ─────────────────────────────────────────── */}
      <div className="relative z-10">
        <SectoresSection />
      </div>

    </div>
  );
}

// ─── Router & App ─────────────────────────────────────────────────────────────
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LangProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </LangProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
