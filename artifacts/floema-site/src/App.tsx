import { Switch, Route, Router as WouterRouter, Link } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChevronDown, Check, Menu, X, Mail } from "lucide-react";
import logoSrc from "@assets/ChatGPT_Image_21_de_mai._de_2026,_12_09_16_1_1779362713859.png";
import nergyImg1 from "@assets/ChatGPT_Image_26_de_mai._de_2026,_14_26_17_2_1780147809888.png";
import nergyImg2 from "@assets/ChatGPT_Image_26_de_mai._de_2026,_14_26_17_3_1780147827214.png";
import nergyImg3 from "@assets/IMG_20250903_113401_1780387574299.jpg";
import nergyImg4 from "@assets/IMG_20250903_111532_1780387597136.jpg";
import nergyImg5 from "@assets/1000015282_1780387656692.jpg";
import nergyImg6 from "@assets/WhatsApp_Image_2025-09-03_at_11.33.28_(2)_1780387695350.jpeg";
import logoCarrinho  from "@assets/image_1780391470570.png";
import logoSucoma    from "@assets/image_1780391556771.png";
import logoNoble     from "@assets/image_1_1780391743801.png";
import logoAgt       from "@assets/image_2_1780391759740.png";
import logoCfm       from "@assets/image_3_1780391778427.png";
import logoJmas      from "@assets/image_4_1780391793814.png";
import logoBioprev   from "@assets/image_1780391882163.png";
import logoYoba      from "@assets/image_6_1780392078746.png";
import logoAldeia      from "@assets/image_1780392699971.png";
import logoHma         from "@assets/image_1780392954482.png";
import logoOcolil      from "@assets/image_1780393050404.png";
import logoTchissola   from "@assets/ChatGPT_Image_2_de_jun._de_2026,_10_37_44_1_1780393102918.png";
import logoSonangalp   from "@assets/image_8_1780393190380.png";
import logoGranisul    from "@assets/image_9_1780393311051.png";
import logoWix         from "@assets/image_1780393362613.png";
import logoLubafrica   from "@assets/image_10_1780393567039.png";
import logoJambo       from "@assets/image_11_1780393653615.png";
import logoGroup2      from "@assets/Group_2_1780393968510.png";
import logoAngostone   from "@assets/image_13_1780394045997.png";
import logoAndaimes    from "@assets/image_1780394305539.png";
import logoLiberatos   from "@assets/Gemini_Generated_Image_ddemvbddemvbddem_1_1780394376935.png";
import logoGirassol      from "@assets/image_1780394586799.png";
import logoPumangol      from "@assets/image_15_1780394660962.png";
import logoAngola        from "@assets/image_1780394698602.png";
import logoPlanasul      from "@assets/image_16_1780394769545.png";
import logoMetalosul     from "@assets/image_17_1780394882779.png";
import logoBoiVerde      from "@assets/image_18_1780395087642.png";
import logoOuroVerde     from "@assets/image_19_1780395214382.png";
import logoTchimbolelo   from "@assets/{A6CD87C3-8D82-402E-9926-B0F1BC28201C}_1_1780395413717.png";
import logoAdra          from "@assets/image_20_1780395539424.png";
import logoProTuning     from "@assets/image_22_1780395677753.png";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { useState, useRef, useEffect, useContext, createContext, useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
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
    thumbnail: "/automovel-sector.jpeg",
    image: "/automovel-sector.jpeg",
  },
  {
    key: "agricola",
    name: "Agrícola",
    subtitle: "Equipamentos que trabalham tanto quanto o agricultor",
    description:
      "Apoiamos o desenvolvimento do sector rural angolano com máquinas, ferramentas e equipamentos agrícolas de alta durabilidade. Através da nossa marca própria Pangulino, oferecemos produtos desenvolvidos para as condições do campo angolano — robustos, fiáveis e acessíveis.",
    tagline: "Soluções para o campo angolano",
    thumbnail: "/historia-2016.png",
    image: "/historia-2016.png",
  },
  {
    key: "industrial",
    name: "Industrial",
    subtitle: "Fornecimento industrial de confiança",
    description:
      "Servimos indústrias, unidades fabris e empresas de logística com lubrificantes, materiais de manutenção e ferramentas diversas. A nossa equipa experiente garante o produto certo para cada aplicação — com stock permanente e atendimento especializado nas três províncias onde operamos.",
    tagline: "Stock permanente, atendimento especializado",
    thumbnail: "/industrial-sector.jpeg",
    image: "/industrial-sector.jpeg",
  },
] as const;

// ─── NavTheme context ─────────────────────────────────────────────────────────
const NavThemeCtx = createContext(false);

// ─── NavPill ──────────────────────────────────────────────────────────────────
function NavPill({ item }: { item: string; overlap?: boolean }) {
  const light = useContext(NavThemeCtx);
  return (
    <MotionLink
      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
      className="text-[13px] font-semibold tracking-widest px-4 py-2 whitespace-nowrap inline-flex items-center justify-center relative"
      animate={{ color: light ? "#ffffff" : "#111111" }}
      whileHover={{ color: light ? "rgba(255,255,255,0.7)" : "#003591" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {item}
    </MotionLink>
  );
}

// ─── LangDropdown ─────────────────────────────────────────────────────────────
function LangDropdown() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const light = useContext(NavThemeCtx);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-0.5 text-[11px] font-semibold tracking-widest cursor-pointer select-none"
        animate={{ color: light ? "#ffffff" : "#111111" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
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
      </motion.button>

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
      data-nav-light
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

const textVariants = {
  enter: (d: number) => ({ opacity: 0, y: d > 0 ? 36 : -36 }),
  center: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } },
  exit: (d: number) => ({ opacity: 0, y: d > 0 ? 36 : -36, transition: { duration: 0.38, ease: [0.4, 0, 0.6, 1] } }),
};

function SectoresSection() {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const directionRef = useRef<number>(1);
  const activeIndexRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const next = v < 1 / 3 ? 0 : v < 2 / 3 ? 1 : 2;
      if (next !== activeIndexRef.current) {
        directionRef.current = next > activeIndexRef.current ? 1 : -1;
        activeIndexRef.current = next;
        setActiveIndex(next);
      }
    });
  }, [scrollYProgress]);

  const sectorsT = SECTORES_DATA.map((s, i) => ({
    ...s,
    name: t.sectores.items[i].name,
    subtitle: t.sectores.items[i].title,
    tagline: t.sectores.items[i].tagline,
    description: t.sectores.items[i].description,
  }));

  const active = sectorsT[activeIndex];
  const dir = directionRef.current;

  /* preload all images so they're decoded before the animation fires */
  useEffect(() => {
    SECTORES_DATA.forEach((s) => {
      [s.image, s.thumbnail].forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }, []);

  return (
    <div ref={containerRef} style={{ height: "200vh", position: "relative" }}>
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
            width: "clamp(220px, 28%, 420px)",
            flexShrink: 0,
            paddingTop: "clamp(88px, 12vh, 130px)",
            paddingBottom: "clamp(36px, 6vh, 80px)",
            paddingLeft: "clamp(28px, 4.5vw, 64px)",
            paddingRight: "clamp(20px, 3vw, 44px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            background: "#F5EFE9",
          }}
        >
          {/* ── Sector names ── */}
          <div style={{ marginBottom: "clamp(28px, 5vh, 56px)" }}>
            {sectorsT.map((s, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={s.key}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    lineHeight: 1.25,
                    marginBottom: "0.04em",
                  }}
                >
                  {/* Arrow icon slot — shows on active item only */}
                  <span
                    style={{
                      display: "inline-block",
                      width: "1.1em",
                      fontSize: "clamp(1.4rem, 2.8vw, 2.8rem)",
                      flexShrink: 0,
                      lineHeight: 1.06,
                    }}
                  >
                    <motion.span
                      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      style={{ display: "inline-flex", alignItems: "center", color: "#111111" }}
                    >
                      <svg
                        width="0.72em"
                        height="0.72em"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ display: "block" }}
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="13 6 19 12 13 18" />
                      </svg>
                    </motion.span>
                  </span>

                  {/* Sector name — colour only changes, no weight change */}
                  <motion.span
                    animate={{ color: isActive ? "#111111" : "rgba(0,0,0,0.3)" }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      fontSize: "clamp(1.4rem, 2.8vw, 2.8rem)",
                      fontWeight: 400,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.06,
                    }}
                  >
                    {s.name}
                  </motion.span>
                </div>
              );
            })}
          </div>

          {/* spacer — pushes separator + tagline + thumbnail to bottom */}
          <div style={{ flex: 1 }} />

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
          <div style={{ overflow: "hidden", marginBottom: "clamp(14px, 2.5vh, 28px)" }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.p
                key={`tag-${activeIndex}`}
                custom={dir}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  fontSize: "clamp(0.72rem, 0.6rem + 0.4vw, 0.88rem)",
                  fontWeight: 400,
                  color: "rgba(0,0,0,0.55)",
                  lineHeight: 1.45,
                  margin: 0,
                }}
              >
                {active.tagline} ↓
              </motion.p>
            </AnimatePresence>
          </div>

          {/* ── Thumbnail ── */}
          <div
            style={{
              width: "clamp(130px, 74%, 230px)",
              aspectRatio: "3 / 4",
              overflow: "hidden",
              position: "relative",
              flexShrink: 0,
            }}
          >
            {sectorsT.map((s, i) => (
              <motion.div
                key={s.key}
                animate={{ y: `${(i - activeIndex) * 100}%` }}
                transition={{ type: "spring", stiffness: 340, damping: 34, mass: 0.7 }}
                style={{ position: "absolute", inset: 0, willChange: "transform" }}
              >
                <img
                  src={s.thumbnail}
                  alt={s.name}
                  loading="eager"
                  decoding="sync"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Middle panel: subtitle + description ─────────── */}
        <div
          style={{
            width: "clamp(190px, 22%, 320px)",
            flexShrink: 0,
            paddingTop: "clamp(88px, 12vh, 130px)",
            paddingBottom: "clamp(36px, 6vh, 80px)",
            paddingLeft: "clamp(24px, 3.5vw, 52px)",
            paddingRight: "clamp(20px, 3vw, 44px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            background: "#F5EFE9",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.h3
                key={`sub-${activeIndex}`}
                custom={dir}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  fontSize: "clamp(1.05rem, 0.85rem + 1vw, 1.5rem)",
                  fontWeight: 400,
                  lineHeight: 1.28,
                  letterSpacing: "-0.01em",
                  color: "#111111",
                  margin: 0,
                }}
              >
                {active.subtitle}
              </motion.h3>
            </AnimatePresence>
          </div>

          {/* spacer pushes description to lower portion */}
          <div style={{ flex: 1 }} />

          <div style={{ overflow: "hidden" }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.p
                key={`desc-${activeIndex}`}
                custom={dir}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  fontSize: "clamp(0.75rem, 0.6rem + 0.5vw, 0.93rem)",
                  lineHeight: 1.82,
                  color: "#111111",
                  fontWeight: 400,
                  margin: 0,
                }}
              >
                {active.description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Right panel: contained photo with padding ────── */}
        <div
          style={{
            flex: 1,
            background: "#F5EFE9",
            paddingTop: "clamp(88px, 12vh, 130px)",
            paddingBottom: "clamp(36px, 6vh, 80px)",
            paddingLeft: 0,
            paddingRight: "clamp(28px, 4.5vw, 64px)",
            display: "flex",
            minWidth: 0,
          }}
        >
          {/* Inner frame — takes all available space inside padding */}
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            {sectorsT.map((s, i) => (
              <motion.div
                key={s.key}
                animate={{ y: `${(i - activeIndex) * 100}%` }}
                transition={{ type: "spring", stiffness: 340, damping: 34, mass: 0.7 }}
                style={{ position: "absolute", inset: 0, willChange: "transform" }}
              >
                <img
                  src={s.image}
                  alt={s.name}
                  loading="eager"
                  decoding="sync"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MarcasRepresentadasSection ───────────────────────────────────────────────
const MARCAS_DEFAULT = {
  title: "Marcas Representadas",
  body: "Trabalhamos com marcas internacionais de referência para garantir qualidade e confiança em cada produto que disponibilizamos.",
};

const MARCAS_NERGY = {
  title: "Nergytech",
  body: "A Nergytech é uma marca de excelência internacional em lubrificantes de alto desempenho. A Gasosa Auto Agro detém a representação exclusiva em Angola — levando ao mercado angolano produtos desenvolvidos para as mais exigentes condições de operação, nos sectores automóvel, industrial e agrícola.",
};

function MarcasRepresentadasSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showBrand, setShowBrand] = useState(false);

  const [winWidth, setWinWidth] = useState(
    () => (typeof window !== "undefined" ? window.innerWidth : 1280)
  );
  useEffect(() => {
    const onResize = () => setWinWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = winWidth < 600;
  const isTablet = winWidth >= 600 && winWidth < 1024;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setShowBrand(v > 0.08);
  });

  // ── 3 sequential pairs — all locked below screen until showBrand (scroll > 0.08) ──
  // Before 0.08: all images sit at +110/140vh (off-screen bottom) → invisible
  // After 0.08: pairs travel through one by one
  // Pair 1 travels: 0.08 → 0.42
  const y1L = useTransform(scrollYProgress, [0, 0.08, 0.42, 1   ], ["110vh", "110vh", "-110vh", "-110vh"]);
  const y1R = useTransform(scrollYProgress, [0, 0.08, 0.48, 1   ], ["140vh", "140vh", "-110vh", "-110vh"]);
  // Pair 2 travels: 0.38 → 0.72
  const y2L = useTransform(scrollYProgress, [0, 0.38, 0.72, 1   ], ["110vh", "110vh", "-110vh", "-110vh"]);
  const y2R = useTransform(scrollYProgress, [0, 0.38, 0.78, 1   ], ["140vh", "140vh", "-110vh", "-110vh"]);
  // Pair 3 travels: 0.68 → 1.00
  const y3L = useTransform(scrollYProgress, [0, 0.68, 1.00      ], ["110vh", "110vh", "-110vh"]);
  const y3R = useTransform(scrollYProgress, [0, 0.68, 1.00      ], ["140vh", "140vh", "-110vh"]);

  // Mobile: same rule — images only visible after showBrand
  const yMobL = useTransform(scrollYProgress, [0, 0.08, 0.55, 1 ], ["110vh", "110vh", "-110vh", "-110vh"]);
  const yMobR = useTransform(scrollYProgress, [0, 0.08, 0.65, 1 ], ["140vh", "140vh", "-110vh", "-110vh"]);

  const content = showBrand ? MARCAS_NERGY : MARCAS_DEFAULT;

  const imgStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center center",
    display: "block",
  };

  // Responsive image dimensions — same as original
  const desktopImgWidth = "min(22vw, 340px)";
  const desktopImgInset = "min(4vw, 64px)";
  const tabletImgWidth  = "min(18vw, 220px)";
  const tabletImgInset  = "2.5vw";
  const mobileImgWidth  = "43vw";

  const paraMaxWidth = isMobile
    ? "min(88vw, 400px)"
    : isTablet
    ? "min(56vw, 500px)"
    : "clamp(320px, 44vw, 600px)";

  const imgBox = (
    y: ReturnType<typeof useTransform>,
    src: string,
    alt: string,
    left?: string,
    right?: string,
    top: string | number = 0,
    width = desktopImgWidth,
  ) => (
    <motion.div
      style={{
        y,
        position: "absolute",
        top,
        ...(left  !== undefined ? { left  } : {}),
        ...(right !== undefined ? { right } : {}),
        width,
        aspectRatio: "3 / 4",
        overflow: "hidden",
        zIndex: 3,
      }}
    >
      <img src={src} alt={alt} style={imgStyle} />
    </motion.div>
  );

  return (
    <div
      ref={containerRef}
      // Taller section = more scroll time for 3 pairs to pass through
      style={{ height: "520vh", background: "#F5EFE9", position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* ── Centre text ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: isMobile ? "flex-start" : "center",
            textAlign: "center",
            zIndex: 2,
            pointerEvents: "none",
            padding: isMobile ? "8vh 24px 0" : "0 16px",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={showBrand ? "brand" : "default"}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}
            >
              <h2
                style={{
                  fontSize: isMobile
                    ? "clamp(2.2rem, 8vw, 3.2rem)"
                    : isTablet
                    ? "clamp(2.4rem, 5vw, 4rem)"
                    : "clamp(2.8rem, 3.5vw, 6rem)",
                  fontWeight: 300,
                  color: "#111111",
                  lineHeight: 1.08,
                  letterSpacing: "-0.03em",
                  margin: "0 0 clamp(16px, 2.4vw, 36px)",
                  textAlign: "center",
                  width: "100%",
                  padding: 0,
                }}
              >
                {content.title}
              </h2>
              <p
                style={{
                  fontSize: isMobile
                    ? "clamp(0.88rem, 3.5vw, 1rem)"
                    : "clamp(0.85rem, 0.74rem + 0.42vw, 1.02rem)",
                  color: "rgba(0,0,0,0.48)",
                  lineHeight: 1.85,
                  maxWidth: paraMaxWidth,
                  textAlign: "center",
                  margin: "0 auto",
                }}
              >
                {content.body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Images — 3 sequential pairs ── */}
        {isMobile ? (
          // Mobile: 2 images in the lower half (original behaviour)
          <>
            <motion.div style={{ y: yMobL, position: "absolute", top: "52vh", left: "4vw", width: mobileImgWidth, aspectRatio: "3 / 4", overflow: "hidden", zIndex: 3 }}>
              <img src={nergyImg1} alt="Nergytech lubrificantes" style={imgStyle} />
            </motion.div>
            <motion.div style={{ y: yMobR, position: "absolute", top: "52vh", right: "4vw", width: mobileImgWidth, aspectRatio: "3 / 4", overflow: "hidden", zIndex: 3 }}>
              <img src={nergyImg4} alt="Nergytech armazém" style={imgStyle} />
            </motion.div>
          </>
        ) : isTablet ? (
          // Tablet: same 2-column layout, 3 sequential pairs
          <>
            {imgBox(y1L, nergyImg1, "Nergytech lubrificantes", tabletImgInset, undefined, 0, tabletImgWidth)}
            {imgBox(y1R, nergyImg2, "Nergytech loja",          undefined, tabletImgInset, 0, tabletImgWidth)}
            {imgBox(y2L, nergyImg3, "Nergytech armazém",       tabletImgInset, undefined, 0, tabletImgWidth)}
            {imgBox(y2R, nergyImg4, "Nergytech baterias",      undefined, tabletImgInset, 0, tabletImgWidth)}
            {imgBox(y3L, nergyImg5, "Nergytech stock",         tabletImgInset, undefined, 0, tabletImgWidth)}
            {imgBox(y3R, nergyImg6, "Nergytech empilhador",    undefined, tabletImgInset, 0, tabletImgWidth)}
          </>
        ) : (
          // Desktop: same 2-column layout, 3 sequential pairs
          <>
            {imgBox(y1L, nergyImg1, "Nergytech lubrificantes", desktopImgInset, undefined, 0, desktopImgWidth)}
            {imgBox(y1R, nergyImg2, "Nergytech loja",          undefined, desktopImgInset, 0, desktopImgWidth)}
            {imgBox(y2L, nergyImg3, "Nergytech armazém",       desktopImgInset, undefined, 0, desktopImgWidth)}
            {imgBox(y2R, nergyImg4, "Nergytech baterias",      undefined, desktopImgInset, 0, desktopImgWidth)}
            {imgBox(y3L, nergyImg5, "Nergytech stock",         desktopImgInset, undefined, 0, desktopImgWidth)}
            {imgBox(y3R, nergyImg6, "Nergytech empilhador",    undefined, desktopImgInset, 0, desktopImgWidth)}
          </>
        )}
      </div>
    </div>
  );
}

// ─── ParceirosSection ─────────────────────────────────────────────────────────

type PartnerItem = { name: string; logo: string };

// Row 1 — logos exclusivos (11)
const PARCEIROS_ROW1: PartnerItem[] = [
  { name: "Carrinho",             logo: logoCarrinho   },
  { name: "Sonangalp",            logo: logoSonangalp  },
  { name: "Noble Group",          logo: logoNoble      },
  { name: "Lubafrica",            logo: logoLubafrica  },
  { name: "AGT",                  logo: logoAgt        },
  { name: "Aldeia Nova",          logo: logoAldeia     },
  { name: "JMAS",                 logo: logoJmas       },
  { name: "Jambo",                logo: logoJambo      },
  { name: "BioPrev",              logo: logoBioprev    },
  { name: "Fazenda Boi Verde",    logo: logoBoiVerde   },
  { name: "Fazenda Ouro Verde",   logo: logoOuroVerde  },
];

// Row 2 — logos exclusivos (11)
const PARCEIROS_ROW2: PartnerItem[] = [
  { name: "Hipermaquinas Angola", logo: logoHma        },
  { name: "CFM",                  logo: logoCfm        },
  { name: "Granisul",             logo: logoGranisul   },
  { name: "Angostone",            logo: logoAngostone  },
  { name: "Sucoma",               logo: logoSucoma     },
  { name: "WIX Filters",          logo: logoWix        },
  { name: "Andaimes Carvalho",    logo: logoAndaimes   },
  { name: "Jardins da Yoba",      logo: logoYoba       },
  { name: "OCOLIL",               logo: logoOcolil     },
  { name: "Fazenda Tchimbolelo",  logo: logoTchimbolelo},
  { name: "ADRA",                 logo: logoAdra       },
];

// Row 3 — logos exclusivos (9)
const PARCEIROS_ROW3: PartnerItem[] = [
  { name: "Grupo Liberatos",      logo: logoLiberatos  },
  { name: "Fazenda Tchissola",    logo: logoTchissola  },
  { name: "Group 2",              logo: logoGroup2     },
  { name: "Fazenda Girassol",     logo: logoGirassol   },
  { name: "Pumangol",             logo: logoPumangol   },
  { name: "Angola",               logo: logoAngola     },
  { name: "Planasul",             logo: logoPlanasul   },
  { name: "Metalosul",            logo: logoMetalosul  },
  { name: "ProTuning",            logo: logoProTuning  },
];

function LogoChip({ item }: { item: PartnerItem }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 18px",
        background: "#ffffff",
        borderRadius: "12px",
        flexShrink: 0,
        boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
        border: "1px solid rgba(0,0,0,0.06)",
        height: "56px",
        minWidth: "90px",
        maxWidth: "190px",
      }}
    >
      <img
        src={item.logo}
        alt={item.name}
        style={{
          height: "34px",
          width: "auto",
          maxWidth: "150px",
          objectFit: "contain",
          display: "block",
        }}
      />
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
  speed = "60s",
}: {
  items: PartnerItem[];
  direction: "rtl" | "ltr";
  speed?: string;
}) {
  // 4 copies → translate by exactly -25% (= 1 copy width) for a seamless loop
  const quad = [...items, ...items, ...items, ...items];
  const cls = direction === "rtl" ? "marquee-rtl" : "marquee-ltr";

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div
        className={cls}
        style={{
          display: "flex",
          gap: "14px",
          width: "max-content",
          animationDuration: speed,
        }}
      >
        {quad.map((item, i) => (
          <LogoChip key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

const FADE_UP = {
  hidden: { opacity: 0, y: 36, filter: "blur(10px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      y:      { type: "spring", stiffness: 52, damping: 18, restDelta: 0.001, delay },
      opacity:{ duration: 1.0, ease: [0.0, 0, 0.18, 1], delay },
      filter: { duration: 0.9, ease: [0.0, 0, 0.18, 1], delay: delay + 0.04 },
    },
  }),
};

const REVEAL_ROW = {
  hidden: { opacity: 0, y: 52, filter: "blur(8px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      y:      { type: "spring", stiffness: 44, damping: 16, restDelta: 0.001, delay },
      opacity:{ duration: 1.1, ease: [0.0, 0, 0.18, 1], delay },
      filter: { duration: 1.0, ease: [0.0, 0, 0.18, 1], delay: delay + 0.06 },
    },
  }),
};

function ParceirosSection() {
  const { t } = useLang();
  const viewport = { once: false, amount: 0.18 } as const;

  return (
    <section
      style={{
        background: "#F5EFE9",
        fontFamily: "'Poppins', sans-serif",
        paddingTop: "clamp(64px, 9vw, 120px)",
        paddingBottom: "clamp(72px, 10vw, 140px)",
        overflow: "hidden",
      }}
    >
      {/* ── Heading ── */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          paddingLeft: "clamp(20px, 5vw, 64px)",
          paddingRight: "clamp(20px, 5vw, 64px)",
          marginBottom: "clamp(44px, 6vw, 80px)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <motion.span
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            custom={0}
            style={{
              display: "inline-block",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.16em",
              color: "#003591",
              marginBottom: "18px",
            }}
          >
            {t.parceiros.tag}
          </motion.span>
        </div>

        <div style={{ overflow: "hidden" }}>
          <motion.h2
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            custom={0.1}
            style={{
              fontSize: "clamp(2rem, 1.4rem + 2.8vw, 4rem)",
              fontWeight: 700,
              color: "#111111",
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              margin: "0 0 18px",
            }}
          >
            {t.parceiros.heading}
          </motion.h2>
        </div>

        <div style={{ overflow: "hidden" }}>
          <motion.p
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            custom={0.22}
            style={{
              fontSize: "clamp(0.93rem, 0.8rem + 0.5vw, 1.15rem)",
              color: "rgba(0,0,0,0.55)",
              lineHeight: 1.65,
              maxWidth: "560px",
              margin: 0,
            }}
          >
            {t.parceiros.subheading}
          </motion.p>
        </div>
      </div>

      {/* ── Marquee rows ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {[
          { items: PARCEIROS_ROW1, dir: "rtl" as const, speed: "58s", delay: 0.0 },
          { items: PARCEIROS_ROW2, dir: "ltr" as const, speed: "48s", delay: 0.1 },
          { items: PARCEIROS_ROW3, dir: "rtl" as const, speed: "68s", delay: 0.2 },
        ].map(({ items, dir, speed, delay }, idx) => (
          <motion.div
            key={idx}
            variants={REVEAL_ROW}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            custom={delay}
          >
            <MarqueeRow items={items} direction={dir} speed={speed} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Últimas Notícias ─────────────────────────────────────────────────────────
const NOTICIAS_IMGS = [nergyImg3, nergyImg4, nergyImg5, nergyImg6];

function UltimasNoticiasSection() {
  const { t } = useLang();
  const viewport = { once: false, amount: 0.15 } as const;

  return (
    <section
      style={{
        background: "#F5EFE9",
        fontFamily: "'Poppins', sans-serif",
        paddingTop: "clamp(64px, 9vw, 120px)",
        paddingBottom: "clamp(72px, 10vw, 140px)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          paddingLeft: "clamp(20px, 5vw, 64px)",
          paddingRight: "clamp(20px, 5vw, 64px)",
        }}
      >
        {/* ── Heading ── */}
        <div style={{ marginBottom: "clamp(44px, 6vw, 72px)" }}>
          <div style={{ overflow: "hidden" }}>
            <motion.span
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              custom={0}
              style={{
                display: "inline-block",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.16em",
                color: "#003591",
                marginBottom: "18px",
              }}
            >
              {t.noticias.tag}
            </motion.span>
          </div>
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              custom={0.1}
              style={{
                fontSize: "clamp(2rem, 1.4rem + 2.8vw, 4rem)",
                fontWeight: 700,
                color: "#111111",
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
                margin: "0 0 18px",
              }}
            >
              {t.noticias.heading}
            </motion.h2>
          </div>
          <div style={{ overflow: "hidden" }}>
            <motion.p
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              custom={0.22}
              style={{
                fontSize: "clamp(0.93rem, 0.8rem + 0.5vw, 1.15rem)",
                color: "rgba(0,0,0,0.55)",
                lineHeight: 1.65,
                maxWidth: "560px",
                margin: 0,
              }}
            >
              {t.noticias.subheading}
            </motion.p>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            gap: "clamp(16px, 2.5vw, 32px)",
          }}
        >
          {t.noticias.items.map((item, i) => (
            <motion.article
              key={i}
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              custom={i * 0.1}
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                overflow: "hidden",
                background: "#F5EFE9",
                boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                transition: "box-shadow 0.25s",
                cursor: "pointer",
              }}
              whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.13)" }}
            >
              {/* Photo */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16 / 9",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src={NOTICIAS_IMGS[i % NOTICIAS_IMGS.length]}
                  alt={item.titulo}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.45s ease",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>

              {/* Content */}
              <div
                style={{
                  padding: "clamp(18px, 2.5vw, 28px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  flex: 1,
                }}
              >
                <h3
                  style={{
                    fontSize: "clamp(0.95rem, 0.85rem + 0.4vw, 1.15rem)",
                    fontWeight: 700,
                    color: "#111111",
                    lineHeight: 1.3,
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.titulo}
                </h3>
                <p
                  style={{
                    fontSize: "clamp(0.82rem, 0.76rem + 0.25vw, 0.95rem)",
                    color: "rgba(0,0,0,0.55)",
                    lineHeight: 1.6,
                    margin: 0,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.resumo}
                </p>
                <div style={{ marginTop: "auto", paddingTop: "12px" }}>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      color: "#003591",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    {t.noticias.lerMais} →
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────
function Home() {
  const { t } = useLang();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navLight, setNavLight] = useState(false);

  useEffect(() => {
    function onScroll() {
      const progress = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      setScrollProgress(progress);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* detect when a dark section overlaps the header (top 80px of viewport) */
  useEffect(() => {
    const HEADER_H = 80;
    function checkNavTheme() {
      const sections = document.querySelectorAll<HTMLElement>("[data-nav-light]");
      let active = false;
      sections.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= HEADER_H && r.bottom > 0) active = true;
      });
      setNavLight(active);
    }
    checkNavTheme();
    window.addEventListener("scroll", checkNavTheme, { passive: true });
    return () => window.removeEventListener("scroll", checkNavTheme);
  }, []);

  const heroBlur = scrollProgress * 3;
  const heroScale = 1 - scrollProgress * 0.028;
  const heroBrightness = 1 - scrollProgress * 0.09;

  return (
    <div className="w-full flex flex-col">

      {/* ── Header (fixed, floats over everything) ───────────────────── */}
      <NavThemeCtx.Provider value={navLight}>
        <header
          className="fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between"
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "clamp(12px, 2vh, 22px) clamp(16px, 4vw, 64px)",
          }}
        >
          <Link href="/" className="flex items-center">
            <motion.img
              src={logoSrc}
              alt="Gasosa Auto Agro"
              style={{ height: "clamp(32px, 4.5vw, 48px)", width: "auto", objectFit: "contain" }}
              animate={{ filter: navLight ? "brightness(0) invert(1)" : "brightness(1) invert(0)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {t.nav.map((item) => (
                <NavPill key={item} item={item} />
              ))}
            </div>
            <LangDropdown />
          </nav>

          <motion.button
            className="lg:hidden"
            style={{ padding: "clamp(6px, 1.2vw, 10px)" }}
            animate={{ color: navLight ? "#ffffff" : "#111111" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={() => setMobileMenuOpen(true)}
            aria-label={t.mobile.openMenu}
          >
            <Menu style={{ width: "clamp(20px, 3vw, 26px)", height: "clamp(20px, 3vw, 26px)" }} />
          </motion.button>
        </header>
      </NavThemeCtx.Provider>

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

          {/* Title — vertically centred, shifts up via bottom padding */}
          <div
            className="absolute inset-0 z-10 flex items-center justify-center text-center"
            style={{
              padding: `0 clamp(16px, 6vw, 80px)`,
              paddingBottom: "clamp(12vh, 20vh, 26vh)",
            }}
          >
            <motion.h1
              style={{
                color: "#003591",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "0.01em",
                fontSize: "clamp(2rem, 4vw + 1rem, 5.5rem)",
              }}
              initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.2, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {t.hero.title1}<br />
              {t.hero.title2}
            </motion.h1>
          </div>

          {/* Bottom bar */}
          <div
            className="absolute z-30 flex items-end justify-between"
            style={{
              bottom: "clamp(16px, 4vh, 48px)",
              left: "clamp(16px, 4vw, 64px)",
              right: "clamp(16px, 4vw, 64px)",
              gap: "clamp(10px, 2vw, 24px)",
            }}
          >
            <motion.p
              style={{
                fontSize: "clamp(0.72rem, 0.5vw + 0.6rem, 0.95rem)",
                color: "#003591",
                lineHeight: 1.65,
                fontWeight: 500,
                maxWidth: "clamp(200px, 40vw, 300px)",
              }}
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              className="relative overflow-hidden rounded-2xl flex-shrink-0 hidden sm:block"
              style={{
                width: "clamp(150px, 20vw, 260px)",
                height: "clamp(96px, 12vw, 160px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.24)",
              }}
              initial={{ opacity: 0, scale: 0.92, y: 40, filter: "blur(6px)" }}
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
                  fontSize: "clamp(9px, 0.9vw + 0.1rem, 13px)",
                  lineHeight: 1.35,
                  textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                }}
              >
                {t.hero.cardText1}<br />{t.hero.cardText2}
              </p>
              <div className="absolute bottom-3 left-3 flex items-center whitespace-nowrap">
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{
                    background: "#ffffff",
                    width: "clamp(24px, 2vw, 30px)",
                    height: "clamp(24px, 2vw, 30px)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <Mail style={{ width: "clamp(10px, 1vw, 14px)", height: "clamp(10px, 1vw, 14px)", color: "#111111" }} />
                </div>
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    background: "#ffffff",
                    paddingLeft: "clamp(10px, 1.2vw, 14px)",
                    paddingRight: "clamp(10px, 1.2vw, 14px)",
                    height: "clamp(24px, 2vw, 30px)",
                    marginLeft: "-4px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(8px, 0.7vw, 10px)",
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

      {/* ── Marcas Representadas Section ──────────────────────────────── */}
      <div className="relative z-10">
        <MarcasRepresentadasSection />
      </div>

      {/* ── Parceiros & Clientes Section ──────────────────────────────── */}
      <div className="relative z-10">
        <ParceirosSection />
      </div>

      {/* ── Últimas Notícias Section ───────────────────────────────────── */}
      <div className="relative z-10">
        <UltimasNoticiasSection />
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
