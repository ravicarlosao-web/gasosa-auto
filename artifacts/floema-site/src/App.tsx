import { Switch, Route, Router as WouterRouter, Link, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChevronDown, Check, Menu, X, Mail, Phone, MapPin } from "lucide-react";
import logoSrc from "@assets/ChatGPT_Image_21_de_mai._de_2026,_12_09_16_1_1779362713859.png";
import angolaMapRaw from "@assets/angola_1780611247454.svg?raw";
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
import infraHeroImg        from "@assets/20250903_123036_1780417176290.jpg";
import infraLubangoExt    from "@assets/20250903_123815_1780417632798.jpg";
import infraLubangoAerial from "@assets/20250903_124326_1780417637563.jpg";
import infraLubangoInside from "@assets/20250903_125127_1780417648038.jpg";
import infraLubangoWide   from "@assets/20250903_124357_1780417657961.jpg";
import infraHuamboExt     from "@assets/20250903_124447_1780417641736.jpg";
import infraLuandaBarrels from "@assets/WhatsApp_Image_2025-09-03_at_11.33.28_1780417689459.jpeg";
import infraLuandaFachada from "@assets/WhatsApp_Image_2025-09-05_at_17.29.30_(2)_1780420633119.jpeg";
import infraLuandaLoja1   from "@assets/WhatsApp_Image_2025-09-05_at_17.29.31_1780420592748.jpeg";
import infraLuandaLoja2   from "@assets/WhatsApp_Image_2025-09-05_at_17.29.32_(5)_1780420596544.jpeg";
import infraLuandaLoja3   from "@assets/WhatsApp_Image_2025-09-05_at_17.29.32_(6)_1780420599872.jpeg";
import infraLuandaLoja4   from "@assets/WhatsApp_Image_2025-09-05_at_17.29.32_(8)_1780420570261.jpeg";
import infraLuandaOfic1   from "@assets/WhatsApp_Image_2025-09-05_at_17.29.31_(6)_1780420686105.jpeg";
import infraLuandaOfic2   from "@assets/WhatsApp_Image_2025-09-05_at_17.29.31_(7)_1780420689121.jpeg";
import infraLuandaOfic3   from "@assets/WhatsApp_Image_2025-09-05_at_17.29.31_(8)_1780420692112.jpeg";
import infraFuturas       from "@assets/20250903_123030_1780417662829.jpg";
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
  const [location] = useLocation();
  const href = `/${item.toLowerCase().replace(/\s+/g, "-")}`;
  const isActive = location === href;

  return (
    <MotionLink
      href={href}
      className="text-[13px] font-semibold tracking-widest px-4 py-2 whitespace-nowrap inline-flex flex-col items-center justify-center relative gap-0"
      animate={{ color: light ? "#ffffff" : "#111111" }}
      whileHover={{ color: light ? "rgba(255,255,255,0.7)" : "#003591" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {item}
      <motion.span
        style={{
          display: "block",
          height: "2px",
          borderRadius: "2px",
          background: "#F5A000",
          width: "100%",
          marginTop: "3px",
        }}
        initial={false}
        animate={{ opacity: isActive ? 1 : 0, scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      />
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
          initial={{ opacity: 0, y: "-6%", scale: 0.98 }}
          animate={{ opacity: 1, y: "0%", scale: 1 }}
          exit={{ opacity: 0, y: "-4%", scale: 0.98 }}
          transition={{ type: "spring", stiffness: 340, damping: 32, mass: 0.85 }}
          className="fixed inset-0 z-[60] bg-background flex flex-col px-6 pt-6 pb-12"
          style={{ transformOrigin: "top center" }}
        >
          <div className="flex items-center justify-between mb-10">
            <Link href="/" onClick={onClose}>
              <img src={logoSrc} alt="Gasosa Auto Agro" className="h-11 w-auto object-contain" />
            </Link>
            <motion.button
              onClick={onClose}
              className="p-2 text-foreground"
              whileTap={{ scale: 0.88, rotate: 90 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>
          <nav className="flex flex-col gap-0">
            {t.nav.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.055, type: "spring", stiffness: 280, damping: 28 }}
              >
                <Link
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={onClose}
                  className="text-2xl font-medium tracking-tight text-foreground py-4 border-b border-foreground/8 flex items-center justify-between"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {item}
                  <motion.span
                    style={{ color: "#003591", display: "inline-block" }}
                    initial={{ x: -4, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.055 + 0.12, type: "spring", stiffness: 300, damping: 24 }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </nav>
          <motion.div
            className="mt-10 flex gap-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: t.nav.length * 0.055 + 0.08, type: "spring", stiffness: 240, damping: 26 }}
          >
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
          </motion.div>
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

const EASE_OUT: [number, number, number, number] = [0.0, 0, 0.18, 1];

const textVariants = {
  enter: (d: number) => ({ opacity: 0, y: d > 0 ? 30 : -30 }),
  center: {
    opacity: 1,
    y: 0,
    transition: {
      y:      { type: "spring" as const, stiffness: 120, damping: 24, restDelta: 0.001 },
      opacity:{ duration: 0.6, ease: EASE_OUT },
    },
  },
  exit: (d: number) => ({ opacity: 0, y: d > 0 ? 30 : -30, transition: { duration: 0.28, ease: [0.4, 0, 0.6, 1] as [number, number, number, number] } }),
};

function SectoresSection() {
  const { t } = useLang();
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const directionRef = useRef<number>(1);
  const activeIndexRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (isMobile) return;
    return scrollYProgress.on("change", (v) => {
      const next = v < 1 / 3 ? 0 : v < 2 / 3 ? 1 : 2;
      if (next !== activeIndexRef.current) {
        directionRef.current = next > activeIndexRef.current ? 1 : -1;
        activeIndexRef.current = next;
        setActiveIndex(next);
      }
    });
  }, [scrollYProgress, isMobile]);

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

  /* ── Mobile version — tabbed card layout (no sticky scroll) ──── */
  if (isMobile) {
    return (
      <div style={{ background: "#F5EFE9", fontFamily: "'Poppins', sans-serif", padding: "clamp(48px, 8vw, 80px) 0" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 32px)" }}>
          {/* Tab bar */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "clamp(28px, 6vw, 44px)", flexWrap: "wrap" }}>
            {sectorsT.map((s, i) => (
              <motion.button
                key={s.key}
                onClick={() => {
                  directionRef.current = i > activeIndex ? 1 : -1;
                  activeIndexRef.current = i;
                  setActiveIndex(i);
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  padding: "8px 18px",
                  borderRadius: "99px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Poppins', sans-serif",
                  transition: "background 0.25s, color 0.25s",
                  background: i === activeIndex ? "#111111" : "rgba(0,0,0,0.08)",
                  color: i === activeIndex ? "#ffffff" : "rgba(0,0,0,0.55)",
                }}
              >
                {s.name}
              </motion.button>
            ))}
          </div>

          {/* Active sector content */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={`mobile-sector-${activeIndex}`}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d > 0 ? 24 : -24 }),
                center: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 280, damping: 28, mass: 0.85 } },
                exit: (d: number) => ({ opacity: 0, x: d > 0 ? -24 : 24, transition: { duration: 0.22 } }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* Image */}
              <div style={{ width: "100%", aspectRatio: "4/3", borderRadius: "16px", overflow: "hidden", marginBottom: "24px" }}>
                <img
                  src={active.image}
                  alt={active.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              {/* Name */}
              <p style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", color: "#F5A000", marginBottom: "10px", textTransform: "uppercase" }}>
                {active.tagline}
              </p>
              <h2 style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", fontWeight: 400, color: "#111111", lineHeight: 1.18, letterSpacing: "-0.03em", margin: "0 0 16px" }}>
                {active.subtitle}
              </h2>
              <p style={{ fontSize: "0.92rem", color: "rgba(0,0,0,0.55)", lineHeight: 1.78, fontWeight: 400, margin: 0 }}>
                {active.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

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
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ type: "spring", stiffness: 200, damping: 28 }}
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
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      y:      { type: "spring" as const, stiffness: 90, damping: 22, restDelta: 0.001, delay },
      opacity:{ duration: 0.85, ease: EASE_OUT, delay },
      filter: { duration: 0.75, ease: EASE_OUT, delay: delay + 0.04 },
    },
  }),
};

const REVEAL_ROW = {
  hidden: { opacity: 0, y: 44, filter: "blur(6px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      y:      { type: "spring" as const, stiffness: 75, damping: 20, restDelta: 0.001, delay },
      opacity:{ duration: 0.95, ease: EASE_OUT, delay },
      filter: { duration: 0.85, ease: EASE_OUT, delay: delay + 0.06 },
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
              whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(0,0,0,0.14)" }}
              whileTap={{ scale: 0.99 }}
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
                    transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
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

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <div className="relative z-10">
        <Footer />
      </div>

    </div>
  );
}

// ─── InfraestrutrasPage ───────────────────────────────────────────────────────
function InfraestrutrasPage() {
  const { t } = useLang();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const inf = t.infraestruturas;

  // Parallax on hero title
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroTitleY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOverlayOpacity = useTransform(heroScroll, [0, 0.8], [0.68, 0.85]);

  const viewport = { once: false, amount: 0.18 } as const;

  return (
    <div className="w-full flex flex-col" style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* ── Header ── */}
      <NavThemeCtx.Provider value={true}>
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
              style={{ height: "clamp(42px, 6vw, 66px)", width: "auto", objectFit: "contain" }}
              animate={{ filter: "brightness(0) invert(1)" }}
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
            style={{ padding: "clamp(6px, 1.2vw, 10px)", color: "#ffffff" }}
            onClick={() => setMobileMenuOpen(true)}
            aria-label={t.mobile.openMenu}
          >
            <Menu style={{ width: "clamp(20px, 3vw, 26px)", height: "clamp(20px, 3vw, 26px)" }} />
          </motion.button>
        </header>
      </NavThemeCtx.Provider>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* ────────────────────────────────────────────────────────────────
          HERO — full viewport, left-bottom title
      ──────────────────────────────────────────────────────────────── */}
      <div
        ref={heroRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100dvh",
          minHeight: "560px",
          overflow: "hidden",
          background: "#0c1a2e",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
        }}
      >
        {/* Hero image */}
        <img
          src={infraHeroImg}
          alt="Infraestruturas Gasosa Auto Agro"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 40%",
          }}
        />
        {/* Dark overlay */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: "#000",
            opacity: heroOverlayOpacity,
          }}
        />

        {/* Bottom-left title block */}
        <motion.div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "left",
            y: heroTitleY,
            padding: "clamp(32px, 5vw, 80px) clamp(20px, 5vw, 80px)",
            paddingBottom: "clamp(60px, 9vh, 110px)",
            maxWidth: "860px",
          }}
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(0.65rem, 0.55rem + 0.4vw, 0.8rem)",
              fontWeight: 600,
              color: "#F5A000",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              margin: "0 0 14px",
            }}
          >
            — ESTRUTURA. CAPACIDADE. CONFIANÇA.
          </motion.p>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 22, delay: 0.15 }}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(3rem, 1.5rem + 7vw, 8.5rem)",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight: 0.93,
              margin: "0 0 28px",
            }}
          >
            {inf.hero.label}
          </motion.h1>

          {/* Subtitles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
          >
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(0.82rem, 0.68rem + 0.55vw, 1.05rem)",
                fontWeight: 400,
                color: "rgba(255,255,255,0.82)",
                letterSpacing: "0.01em",
                margin: "0 0 6px",
              }}
            >
              Infraestruturas ao serviço do crescimento de Angola.
            </p>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(0.82rem, 0.68rem + 0.55vw, 1.05rem)",
                fontWeight: 400,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.01em",
                margin: 0,
              }}
            >
              Logística inteligente. Operações eficientes.
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            position: "absolute",
            bottom: "clamp(28px, 4vh, 48px)",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "1px",
              height: "48px",
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.5))",
            }}
          />
        </motion.div>
      </div>

      {/* ────────────────────────────────────────────────────────────────
          FEATURED PANEL — Lubango (full-width tall)
      ──────────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(480px, 65vh, 800px)",
          overflow: "hidden",
          background: "#111c2b",
        }}
      >
        <motion.img
          src={infraLubangoExt}
          alt="Instalações Lubango"
          loading="lazy"
          decoding="async"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.28) 50%, transparent 100%)",
            zIndex: 1,
          }}
        />
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          custom={0}
          style={{
            position: "absolute",
            bottom: "clamp(32px, 5vh, 64px)",
            left: "clamp(20px, 5vw, 80px)",
            zIndex: 2,
            maxWidth: "560px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "12px",
            }}
          >
            {inf.featured.tag}
          </span>
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(1.6rem, 1rem + 2.5vw, 3rem)",
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              margin: "0 0 16px",
            }}
          >
            {inf.featured.titulo}
          </h2>
          <p
            style={{
              fontSize: "clamp(0.85rem, 0.75rem + 0.4vw, 1rem)",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.65,
              margin: "0 0 24px",
            }}
          >
            {inf.featured.descricao}
          </p>
        </motion.div>
      </div>

      {/* ────────────────────────────────────────────────────────────────
          PHOTO STRIP — 3 images Lubango
      ──────────────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
          width: "100%",
          gap: "2px",
        }}
      >
        {[infraLubangoAerial, infraLubangoInside, infraLubangoWide].map((src, i) => (
          <motion.div
            key={i}
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            custom={i * 0.08}
            style={{
              position: "relative",
              height: isMobile ? "clamp(180px, 55vw, 320px)" : "clamp(200px, 28vh, 380px)",
              overflow: "hidden",
              background: "#111",
            }}
          >
            <motion.img
              src={src}
              alt={`Lubango ${i + 1}`}
              loading="lazy"
              decoding="async"
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 120, damping: 22 }}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* ────────────────────────────────────────────────────────────────
          LUANDA — featured panel (fachada exterior)
      ──────────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(480px, 65vh, 800px)",
          overflow: "hidden",
          background: "#0d1520",
        }}
      >
        <motion.img
          src={infraLuandaFachada}
          alt="Loja Luanda — fachada"
          loading="lazy"
          decoding="async"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 60%",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.15) 100%)",
            zIndex: 1,
          }}
        />
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          custom={0}
          style={{
            position: "absolute",
            bottom: "clamp(32px, 5vh, 64px)",
            left: "clamp(20px, 5vw, 80px)",
            zIndex: 2,
            maxWidth: "560px",
          }}
        >
          <span style={{ display: "inline-block", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.5)", marginBottom: "12px" }}>
            {inf.paineis[0].tag}
          </span>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.6rem, 1rem + 2.5vw, 3rem)", fontWeight: 600, color: "#ffffff", letterSpacing: "-0.025em", lineHeight: 1.1, margin: "0 0 16px" }}>
            {inf.paineis[0].titulo}
          </h2>
          <p style={{ fontSize: "clamp(0.85rem, 0.75rem + 0.4vw, 1rem)", color: "rgba(255,255,255,0.65)", lineHeight: 1.65, margin: 0 }}>
            {inf.paineis[0].descricao}
          </p>
        </motion.div>
      </div>

      {/* ── Luanda — strip loja (4 fotos) ── */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr", width: "100%", gap: "2px" }}>
        {[infraLuandaLoja1, infraLuandaLoja2, infraLuandaLoja3, infraLuandaLoja4].map((src, i) => (
          <motion.div
            key={i}
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            custom={i * 0.07}
            style={{ position: "relative", height: isMobile ? "clamp(140px, 44vw, 240px)" : "clamp(180px, 24vh, 320px)", overflow: "hidden", background: "#111" }}
          >
            <motion.img
              src={src}
              alt={`Luanda loja ${i + 1}`}
              loading="lazy"
              decoding="async"
              whileHover={{ scale: 1.07 }}
              transition={{ type: "spring", stiffness: 120, damping: 22 }}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>
        ))}
      </div>

      {/* ── Luanda — strip oficina (3 fotos) ── */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", width: "100%", gap: "2px" }}>
        {[infraLuandaOfic1, infraLuandaOfic2, infraLuandaOfic3].map((src, i) => (
          <motion.div
            key={i}
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            custom={i * 0.09}
            style={{ position: "relative", height: isMobile ? "clamp(180px, 55vw, 320px)" : "clamp(200px, 28vh, 360px)", overflow: "hidden", background: "#111" }}
          >
            <motion.img
              src={src}
              alt={`Luanda oficina ${i + 1}`}
              loading="lazy"
              decoding="async"
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 120, damping: 22 }}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>
        ))}
      </div>

      {/* ────────────────────────────────────────────────────────────────
          HUAMBO — painel standalone
      ──────────────────────────────────────────────────────────────── */}
      <motion.div
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        custom={0}
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(400px, 55vh, 680px)",
          overflow: "hidden",
          background: "#111",
        }}
      >
        <motion.img
          src={infraHuamboExt}
          alt="Instalações Huambo"
          loading="lazy"
          decoding="async"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)",
            zIndex: 1,
          }}
        />
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          custom={0.1}
          style={{
            position: "absolute",
            bottom: "clamp(28px, 4.5vh, 52px)",
            left: "clamp(20px, 4vw, 52px)",
            zIndex: 2,
            maxWidth: "500px",
          }}
        >
          <span style={{ display: "inline-block", fontSize: "0.63rem", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)", marginBottom: "10px" }}>
            {inf.paineis[1].tag}
          </span>
          <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.4rem, 0.9rem + 2vw, 2.6rem)", fontWeight: 600, color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 14px" }}>
            {inf.paineis[1].titulo}
          </h3>
          <p style={{ fontSize: "clamp(0.82rem, 0.72rem + 0.38vw, 0.98rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: 0, maxWidth: "420px" }}>
            {inf.paineis[1].descricao}
          </p>
        </motion.div>
      </motion.div>

      {/* ────────────────────────────────────────────────────────────────
          FUTURAS INSTALAÇÕES — full-width dark panel
      ──────────────────────────────────────────────────────────────── */}
      <motion.div
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        custom={0}
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(420px, 55vh, 680px)",
          overflow: "hidden",
          background: "#0a1628",
        }}
      >
        <motion.img
          src={infraFuturas}
          alt="Futuras instalações"
          loading="lazy"
          decoding="async"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 40%",
            opacity: 0.65,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.5) 50%, rgba(10,22,40,0.3) 100%)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "clamp(40px, 6vh, 80px)",
            left: "clamp(20px, 5vw, 80px)",
            zIndex: 2,
            maxWidth: "600px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.45)",
              marginBottom: "14px",
            }}
          >
            {inf.futuras.tag}
          </span>
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(1.8rem, 1rem + 3vw, 3.5rem)",
              fontWeight: 500,
              color: "#ffffff",
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              margin: "0 0 20px",
            }}
          >
            {inf.futuras.titulo}
          </h2>
          <p
            style={{
              fontSize: "clamp(0.85rem, 0.75rem + 0.4vw, 1rem)",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {inf.futuras.descricao}
          </p>
        </div>
      </motion.div>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#0A1628",
        fontFamily: "'Poppins', sans-serif",
        color: "#ffffff",
      }}
    >
      {/* ── Main content ── */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "clamp(56px, 8vw, 100px) clamp(20px, 5vw, 64px) clamp(40px, 5vw, 60px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
          gap: "clamp(36px, 5vw, 64px)",
          alignItems: "start",
        }}
      >
        {/* ── Brand column ── */}
        <div style={{ gridColumn: "span 1" }}>
          <img
            src={logoSrc}
            alt="Gasosa Auto Agro"
            style={{ height: "44px", marginBottom: "20px", display: "block", filter: "brightness(0) invert(1)" }}
          />
          <p
            style={{
              fontSize: "0.88rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.65,
              margin: "0 0 28px",
              maxWidth: "240px",
            }}
          >
            {f.tagline}
          </p>
          {/* Social icons */}
          <div style={{ display: "flex", gap: "12px" }}>
            {[
              { label: "Facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
              { label: "Instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M6.5 2h11A4.5 4.5 0 0 1 22 6.5v11A4.5 4.5 0 0 1 17.5 22h-11A4.5 4.5 0 0 1 2 17.5v-11A4.5 4.5 0 0 1 6.5 2z" },
              { label: "LinkedIn", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
            ].map(({ label, path }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.6)",
                  transition: "all 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#003591";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
                  (e.currentTarget as HTMLAnchorElement).style.background = "#003591";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* ── Navigation column ── */}
        <div>
          <h4
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              color: "rgba(255,255,255,0.4)",
              marginBottom: "20px",
              textTransform: "uppercase",
            }}
          >
            {f.navLabel}
          </h4>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
            {f.navLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  style={{
                    fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.65)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                    display: "inline-block",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Contacts column ── */}
        <div>
          <h4
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              color: "rgba(255,255,255,0.4)",
              marginBottom: "20px",
              textTransform: "uppercase",
            }}
          >
            {f.contactLabel}
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <a
              href={`mailto:${f.email}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "0.88rem",
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
            >
              <Mail size={15} style={{ flexShrink: 0, color: "#003591" }} />
              {f.email}
            </a>
            <a
              href={`tel:${f.phone.replace(/\s/g, "")}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "0.88rem",
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
            >
              <Phone size={15} style={{ flexShrink: 0, color: "#003591" }} />
              {f.phone}
            </a>
          </div>
        </div>

        {/* ── Locations column ── */}
        <div>
          <h4
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              color: "rgba(255,255,255,0.4)",
              marginBottom: "20px",
              textTransform: "uppercase",
            }}
          >
            {f.locationsLabel}
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {f.locations.map(({ city, detail }) => (
              <div key={city} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <MapPin size={15} style={{ flexShrink: 0, color: "#003591", marginTop: "2px" }} />
                <div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#ffffff", lineHeight: 1.3 }}>{city}</div>
                  <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.4 }}>{detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "20px clamp(20px, 5vw, 64px)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)" }}>
          {f.copyright.replace("2025", String(year))}
        </span>
        <a
          href="#"
          style={{
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.35)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
        >
          {f.legal}
        </a>
      </div>
    </footer>
  );
}

// ─── NoticiasPage ─────────────────────────────────────────────────────────────
type NoticiaBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; src: string; caption?: string };

const NOTICIAS_ARTICLES: {
  img: string;
  categoria: string;
  titulo: string;
  resumo: string;
  data: string;
  featured?: boolean;
  conteudo: NoticiaBlock[];
}[] = [
  {
    img: infraHeroImg,
    categoria: "Institucional",
    titulo: "Gasosa Auto Agro inaugura nova instalação no Huambo",
    resumo: "A nova estrutura no Huambo reforça a capacidade de resposta nas províncias do planalto central, com mais de 3 000 m² dedicados a armazém, loja e oficina.",
    data: "3 de Junho de 2026",
    featured: true,
    conteudo: [
      { type: "paragraph", text: "A inauguração das novas instalações no Huambo marca um passo decisivo na estratégia de expansão nacional da Gasosa Auto Agro. Com mais de 3 000 m² de área construída, a unidade integra um amplo armazém, uma loja equipada com toda a gama de produtos da empresa e uma oficina de serviços rápidos com equipamento de diagnóstico de última geração." },
      { type: "image", src: infraHuamboExt, caption: "Exterior das novas instalações no Huambo" },
      { type: "heading", text: "Investimento no coração de Angola" },
      { type: "paragraph", text: "O Huambo, cidade de referência do planalto central, representa um mercado estratégico para a Gasosa Auto Agro. A região concentra uma actividade agrícola e industrial crescente, e a nova unidade posiciona a empresa como parceiro de proximidade para cooperativas, empresas de construção, frotas e particulares." },
      { type: "paragraph", text: "A unidade passa a disponibilizar toda a gama de lubrificantes Nergytech, Petronas, Castrol e Galp, ferramentas agrícolas Pangulino e peças para veículos ligeiros, pesados e industriais — com stock permanente e atendimento especializado." },
    ],
  },
  {
    img: nergyImg3,
    categoria: "Automóvel",
    titulo: "Nova parceria Nergytech consolida liderança no sector energético",
    resumo: "Gasosa Auto Agro renova e amplia o acordo exclusivo com a Nergytech em Angola, trazendo novas referências de baterias e acessórios ao mercado nacional.",
    data: "26 de Maio de 2026",
    featured: false,
    conteudo: [
      { type: "paragraph", text: "A Gasosa Auto Agro renova e amplia o acordo de representação exclusiva com a Nergytech em Angola para o período 2025-2027. O novo contrato alarga o âmbito da parceria a toda a gama de produtos Nergytech, incluindo baterias de alto desempenho, sistemas de iluminação e acessórios para veículos ligeiros, pesados e industriais." },
      { type: "image", src: nergyImg4, caption: "Gama de baterias Nergytech disponíveis nas lojas Gasosa Auto Agro" },
      { type: "heading", text: "Uma parceria de referência" },
      { type: "paragraph", text: "A Nergytech é reconhecida internacionalmente pela qualidade e durabilidade dos seus produtos. Com a Gasosa Auto Agro como representante exclusivo em Angola, os clientes angolanos têm acesso garantido às mais recentes referências da marca em stock permanente nas três unidades da empresa: Luanda, Lubango e Huambo." },
      { type: "paragraph", text: "Para 2025, estão previstas acções de formação técnica para a equipa da Gasosa Auto Agro e campanhas de comunicação conjunta, reforçando o posicionamento das duas marcas no mercado angolano." },
    ],
  },
  {
    img: infraHuamboExt,
    categoria: "Agrícola",
    titulo: "Pangulino lança nova linha de ferramentas para o campo angolano",
    resumo: "A marca própria da Gasosa Auto Agro apresenta uma gama de ferramentas desenvolvidas especificamente para as condições do solo angolano.",
    data: "20 de Maio de 2026",
    featured: false,
    conteudo: [
      { type: "paragraph", text: "A Pangulino, marca própria da Gasosa Auto Agro, apresenta uma nova linha de ferramentas agrícolas desenvolvida especificamente para as condições do solo e do clima angolano. A gama inclui enxadas, saracotes, catanas, pás e utensílios de irrigação, produzidos com materiais resistentes ao desgaste e às temperaturas elevadas." },
      { type: "image", src: nergyImg5, caption: "Nova gama de ferramentas Pangulino para uso agrícola" },
      { type: "heading", text: "Desenvolvida para o campo angolano" },
      { type: "paragraph", text: "O desenvolvimento desta nova linha resultou de um processo de pesquisa junto de agricultores e cooperativas nas províncias do Cuando Cubango, Bié e Huambo. As ferramentas foram testadas em condições reais durante vários meses, antes de serem lançadas comercialmente." },
      { type: "paragraph", text: "A Pangulino está disponível nas três unidades da Gasosa Auto Agro e numa rede crescente de distribuidores parceiros, tornando estas ferramentas acessíveis a agricultores em todo o território nacional — com qualidade que rivaliza com marcas internacionais, a preços adaptados ao mercado angolano." },
    ],
  },
  {
    img: infraLuandaFachada,
    categoria: "Institucional",
    titulo: "Gasosa presente na FILDA 2025 com stand de 200 m²",
    resumo: "Com presença de destaque na Feira Internacional de Luanda, a Gasosa Auto Agro apresentou as suas marcas representadas e a gama Pangulino ao público angolano.",
    data: "12 de Maio de 2026",
    conteudo: [
      { type: "paragraph", text: "A Gasosa Auto Agro marcou presença na Feira Internacional de Luanda 2025 (FILDA) com um stand de mais de 200 m², onde apresentou ao público a sua vasta gama de produtos e serviços. O espaço, cuidadosamente desenhado para reflectir os valores da empresa, recebeu milhares de visitantes ao longo dos cinco dias de feira." },
      { type: "image", src: infraLuandaLoja1, caption: "Stand da Gasosa Auto Agro na FILDA 2025" },
      { type: "heading", text: "Apresentação das marcas representadas" },
      { type: "paragraph", text: "No stand, estiveram em destaque as marcas Nergytech, Petronas, Castrol e Galp, bem como a gama completa de produtos Pangulino. A participação na FILDA reforça o compromisso da Gasosa Auto Agro com o desenvolvimento económico de Angola e com a visibilidade das marcas internacionais que representa no país." },
    ],
  },
  {
    img: infraLubangoExt,
    categoria: "Institucional",
    titulo: "Expansão no Lubango: mais de 10 000 m² ao serviço do sul de Angola",
    resumo: "As novas instalações no Lubango representam o maior investimento em infraestrutura da história da empresa, servindo as províncias do sul e centro do país.",
    data: "5 de Abril de 2026",
    conteudo: [
      { type: "paragraph", text: "O Lubango consolida-se como o maior polo de distribuição da Gasosa Auto Agro fora de Luanda. As novas instalações, com mais de 10 000 m² de área construída, integram lojas, armazéns de grande capacidade e oficinas técnicas especializadas, posicionando a empresa como o principal fornecedor do sul e centro de Angola." },
      { type: "image", src: infraLubangoAerial, caption: "Vista aérea das instalações no Lubango" },
      { type: "heading", text: "Infra-estrutura ao serviço das províncias do sul" },
      { type: "paragraph", text: "A unidade do Lubango serve as províncias da Huíla, Namibe, Cunene e Cuando Cubango, garantindo proximidade e agilidade na resposta às necessidades de clientes empresariais e particulares. A oficina técnica está equipada com tecnologia de diagnóstico avançado para veículos ligeiros e pesados." },
      { type: "paragraph", text: "O investimento no Lubango reflecte a visão estratégica da Gasosa Auto Agro de descentralizar os seus serviços e estar presente onde os clientes estão — com a mesma qualidade e rigor de sempre." },
    ],
  },
  {
    img: infraLuandaLoja1,
    categoria: "Institucional",
    titulo: "30 anos de compromisso com Angola e o desenvolvimento nacional",
    resumo: "Três décadas de presença no mercado angolano, com uma trajetória marcada pelo crescimento, inovação e compromisso com os parceiros e clientes.",
    data: "20 de Março de 2026",
    conteudo: [
      { type: "paragraph", text: "Fundada em 2016 em Luanda com capital próprio, a Gasosa Auto Agro celebra uma trajetória de crescimento consistente assente na confiança dos seus clientes e na qualidade dos produtos e serviços que oferece. Ao longo destes anos, a empresa passou de uma pequena loja em Luanda a uma referência nacional com presença em três províncias." },
      { type: "image", src: infraLuandaLoja2, caption: "Loja de Luanda — a primeira unidade da Gasosa Auto Agro" },
      { type: "heading", text: "Uma empresa construída para durar" },
      { type: "paragraph", text: "O crescimento da Gasosa Auto Agro reflecte a diversificação da economia angolana e o desenvolvimento dos sectores automóvel, agrícola e industrial no país. A empresa apostou sempre na formação das suas equipas, na qualidade dos produtos e na proximidade com os clientes — valores que continuam a guiar cada decisão." },
      { type: "paragraph", text: "Com mais de 30 parceiros e clientes de referência, uma marca própria consolidada (Pangulino) e a representação exclusiva da Nergytech em Angola, a Gasosa Auto Agro olha para o futuro com ambição e solidez." },
    ],
  },
  {
    img: nergyImg4,
    categoria: "Automóvel",
    titulo: "Nova gama de baterias Nergytech disponível nas nossas lojas",
    resumo: "A Gasosa Auto Agro passa a disponibilizar a mais recente gama de baterias de alta performance da Nergytech em todas as suas unidades a nível nacional.",
    data: "15 de Fevereiro de 2026",
    conteudo: [
      { type: "paragraph", text: "A Gasosa Auto Agro anuncia a chegada da mais recente gama de baterias de alta performance da Nergytech a todas as suas unidades a nível nacional. A nova linha inclui baterias para veículos ligeiros, SUV, veículos comerciais e de utilização industrial, com tecnologias AGM e EFB para veículos com sistema start-stop." },
      { type: "image", src: nergyImg3, caption: "Nova gama de baterias Nergytech de alta performance" },
      { type: "heading", text: "Tecnologia para o exigente mercado angolano" },
      { type: "paragraph", text: "As novas baterias Nergytech foram desenvolvidas para resistir às condições climáticas exigentes de Angola, incluindo temperaturas elevadas e estradas de difícil acessibilidade. Com garantia alargada e suporte técnico especializado nas lojas da Gasosa Auto Agro, o cliente tem a segurança de um produto de topo com assistência local." },
    ],
  },
  {
    img: nergyImg5,
    categoria: "Automóvel",
    titulo: "Oficina Luanda reforça capacidade de serviços rápidos",
    resumo: "A unidade de Luanda amplia a sua capacidade de atendimento com novos equipamentos de diagnóstico e uma equipa técnica especializada.",
    data: "8 de Fevereiro de 2026",
    conteudo: [
      { type: "paragraph", text: "A oficina de serviços rápidos da loja de Luanda foi renovada e ampliada, passando a contar com novos equipamentos de diagnóstico electrónico compatíveis com as mais recentes plataformas de veículos. A equipa técnica foi reforçada com especialistas em sistemas de injecção, transmissão e electricidade automóvel." },
      { type: "image", src: infraLuandaOfic1, caption: "Nova área de oficina e diagnóstico em Luanda" },
      { type: "heading", text: "Serviço rápido, sem compromissos de qualidade" },
      { type: "paragraph", text: "O conceito de serviço rápido da Gasosa Auto Agro garante intervenções de rotina — mudanças de óleo, filtros, baterias e inspecção de travões — num prazo máximo de 60 minutos, sem necessidade de marcação prévia. Com uma equipa de técnicos certificados, a unidade de Luanda está preparada para servir frotas empresariais e clientes particulares." },
    ],
  },
  {
    img: nergyImg6,
    categoria: "Automóvel",
    titulo: "Gasosa firma parcerias com as maiores marcas do sector automóvel",
    resumo: "Novos acordos de representação reforçam o portefólio da Gasosa Auto Agro, garantindo aos clientes angolanos acesso às melhores marcas do sector.",
    data: "22 de Janeiro de 2026",
    conteudo: [
      { type: "paragraph", text: "A Gasosa Auto Agro anuncia a assinatura de novos acordos de representação e distribuição com marcas de referência do sector automóvel internacional. Os contratos abrangem lubrificantes, filtros, acessórios e componentes de manutenção — alargando significativamente a oferta disponível nas lojas da empresa." },
      { type: "heading", text: "Portefólio reforçado para responder a todas as necessidades" },
      { type: "paragraph", text: "Com este reforço do portefólio, a Gasosa Auto Agro passa a cobrir praticamente todas as necessidades de manutenção e reparação de veículos presentes no mercado angolano. Os novos produtos estarão disponíveis em stock permanente nas unidades de Luanda, Lubango e Huambo." },
    ],
  },
  {
    img: infraLuandaLoja2,
    categoria: "Agrícola",
    titulo: "Equipamentos agrícolas Pangulino chegam ao interior do país",
    resumo: "A rede de distribuição da gama Pangulino expande-se para novas províncias, aproximando o agricultor angolano das ferramentas que precisa.",
    data: "10 de Janeiro de 2026",
    conteudo: [
      { type: "paragraph", text: "A marca Pangulino expande a sua rede de distribuição para novas províncias de Angola, tornando os seus equipamentos agrícolas acessíveis a agricultores e cooperativas em regiões anteriormente dependentes de importações irregulares ou de longa distância. A expansão faz parte da estratégia de democratização do acesso a ferramentas de qualidade no sector primário angolano." },
      { type: "image", src: infraFuturas, caption: "Distribuição de equipamentos Pangulino no interior do país" },
      { type: "heading", text: "Mais perto do agricultor angolano" },
      { type: "paragraph", text: "A Gasosa Auto Agro estabeleceu parcerias com distribuidores locais nas províncias do Malanje, Lunda Norte, Lunda Sul e Moxico para assegurar a disponibilidade regular dos produtos Pangulino. Cada distribuidor recebe formação técnica sobre os produtos e acesso a suporte pós-venda da empresa." },
    ],
  },
  {
    img: infraLuandaOfic1,
    categoria: "Industrial",
    titulo: "Sector industrial: Gasosa reforça oferta de equipamentos pesados",
    resumo: "A nova gama de equipamentos industriais consolida a presença da empresa nos sectores de construção, mineração e agro-indústria.",
    data: "5 de Janeiro de 2026",
    conteudo: [
      { type: "paragraph", text: "A Gasosa Auto Agro reforça a sua presença no sector industrial com a introdução de uma nova gama de lubrificantes e fluidos de alta performance para equipamentos pesados, compressores, geradores e maquinaria agroindustrial. A oferta responde a uma necessidade crescente de clientes nos sectores de construção, mineração e transformação agro-alimentar." },
      { type: "heading", text: "Soluções para a indústria angolana" },
      { type: "paragraph", text: "Com stock permanente e atendimento especializado nas unidades de Luanda, Lubango e Huambo, a Gasosa Auto Agro garante tempos de resposta rápidos e apoio técnico qualificado para clientes industriais. A equipa técnica está capacitada para recomendar os produtos mais adequados para cada aplicação específica." },
    ],
  },
  {
    img: infraFuturas,
    categoria: "Press",
    titulo: "Jornal de Angola destaca crescimento da Gasosa Auto Agro",
    resumo: "O Jornal de Angola dedica reportagem especial ao percurso e visão estratégica da Gasosa Auto Agro no contexto da diversificação económica angolana.",
    data: "28 de Dezembro de 2025",
    conteudo: [
      { type: "paragraph", text: "O Jornal de Angola publicou uma extensa reportagem sobre a trajectória e visão estratégica da Gasosa Auto Agro, destacando o papel da empresa como um caso de sucesso empresarial angolano no contexto da diversificação económica do país. A peça jornalística, publicada na edição de fim de ano, sublinha o crescimento consistente da empresa desde a sua fundação em 2016." },
      { type: "heading", text: "Reconhecimento nacional" },
      { type: "paragraph", text: "A reportagem destaca a criação da marca própria Pangulino, a parceria exclusiva com a Nergytech e a expansão nacional como marcos que distinguem a Gasosa Auto Agro no panorama empresarial angolano. A administração da empresa falou sobre a visão para os próximos anos, incluindo planos de expansão para novas províncias e o desenvolvimento de novas linhas de produto." },
    ],
  },
];

// ─── NoticiaDrawer ────────────────────────────────────────────────────────────
function NoticiaDrawer({
  article,
  onClose,
}: {
  article: (typeof NOTICIAS_ARTICLES)[0] | null;
  onClose: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [winW, setWinW] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1280);
  const { t: drawerLang } = useLang();
  const drawerT = drawerLang.noticias;

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = winW < 768;

  useEffect(() => {
    if (article && scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [article]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = article ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [article]);

  return (
    <AnimatePresence>
      {article && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.52)",
              zIndex: 300,
              cursor: "pointer",
            }}
          />

          <motion.div
            ref={scrollRef}
            initial={isMobile ? { y: "100%" } : { x: "100%" }}
            animate={isMobile
              ? { y: 0, transition: { type: "tween", duration: 0.62, ease: [0.16, 1, 0.3, 1] } }
              : { x: 0, transition: { type: "tween", duration: 0.78, ease: [0.16, 1, 0.3, 1] } }
            }
            exit={isMobile
              ? { y: "100%", transition: { type: "tween", duration: 0.36, ease: [0.4, 0, 1, 1] } }
              : { x: "100%", transition: { type: "tween", duration: 0.42, ease: [0.4, 0, 1, 1] } }
            }
            style={isMobile ? {
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "92vh",
              borderRadius: "20px 20px 0 0",
              background: "#F5EFE9",
              zIndex: 301,
              overflowY: "auto",
              fontFamily: "'Poppins', sans-serif",
            } : {
              position: "fixed",
              top: 0,
              right: 0,
              width: "clamp(320px, 55vw, 860px)",
              height: "100vh",
              background: "#F5EFE9",
              zIndex: 301,
              overflowY: "auto",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {/* ── Mobile drag handle ── */}
            {isMobile && (
              <div style={{ display: "flex", justifyContent: "center", paddingTop: "14px", paddingBottom: "2px", flexShrink: 0 }}>
                <div style={{ width: "40px", height: "4px", borderRadius: "99px", background: "rgba(0,0,0,0.18)" }} />
              </div>
            )}

            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              style={{
                position: "sticky",
                top: isMobile ? "12px" : "20px",
                float: "right",
                marginRight: "20px",
                marginTop: isMobile ? "12px" : "20px",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "#111111",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                flexShrink: 0,
              }}
            >
              <X style={{ width: "16px", height: "16px" }} />
            </motion.button>

            <div
              style={{
                clear: "both",
                padding: "clamp(48px, 7vh, 80px) clamp(28px, 5vw, 64px) clamp(24px, 4vh, 40px)",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  color: "rgba(0,0,0,0.6)",
                  background: "rgba(0,0,0,0.08)",
                  padding: "5px 14px",
                  borderRadius: "99px",
                  marginBottom: "22px",
                  textTransform: "uppercase",
                }}
              >
                {article.categoria}
              </span>

              <h1
                style={{
                  fontSize: "clamp(1.45rem, 1.0rem + 2.2vw, 2.6rem)",
                  fontWeight: 500,
                  color: "#111111",
                  lineHeight: 1.18,
                  letterSpacing: "-0.025em",
                  margin: "0 auto 16px",
                  maxWidth: "600px",
                }}
              >
                {article.titulo}
              </h1>

              <p
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(0,0,0,0.38)",
                  marginBottom: "36px",
                  letterSpacing: "0.02em",
                }}
              >
                {article.data}
              </p>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.78rem",
                  color: "rgba(0,0,0,0.38)",
                  letterSpacing: "0.04em",
                }}
              >
                {drawerT.continuarLer}
              </div>
            </div>

            <div style={{ width: "100%", overflow: "hidden" }}>
              <img
                src={article.img}
                alt={article.titulo}
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>

            <div
              style={{
                padding: "clamp(28px, 5vw, 56px) clamp(28px, 5vw, 64px) clamp(56px, 9vw, 100px)",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(1rem, 0.88rem + 0.5vw, 1.2rem)",
                  color: "#111111",
                  lineHeight: 1.8,
                  marginBottom: "40px",
                  fontWeight: 400,
                }}
              >
                {article.resumo}
              </p>

              {article.conteudo.map((block, i) =>
                block.type === "heading" ? (
                  <h2
                    key={i}
                    style={{
                      fontSize: "clamp(1.05rem, 0.9rem + 0.75vw, 1.45rem)",
                      fontWeight: 500,
                      color: "#111111",
                      margin: "44px 0 18px",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.3,
                    }}
                  >
                    {block.text}
                  </h2>
                ) : block.type === "paragraph" ? (
                  <p
                    key={i}
                    style={{
                      fontSize: "clamp(0.88rem, 0.82rem + 0.28vw, 1rem)",
                      color: "rgba(0,0,0,0.68)",
                      lineHeight: 1.82,
                      marginBottom: "28px",
                    }}
                  >
                    {block.text}
                  </p>
                ) : block.type === "image" ? (
                  <div key={i} style={{ margin: "40px 0" }}>
                    <div style={{ borderRadius: "12px", overflow: "hidden" }}>
                      <img
                        src={block.src}
                        alt={block.caption ?? ""}
                        style={{ width: "100%", display: "block", objectFit: "cover" }}
                      />
                    </div>
                    {block.caption && (
                      <p
                        style={{
                          fontSize: "0.7rem",
                          color: "rgba(0,0,0,0.36)",
                          textAlign: "center",
                          marginTop: "10px",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {block.caption}
                      </p>
                    )}
                  </div>
                ) : null
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function NoticiasPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<(typeof NOTICIAS_ARTICLES)[0] | null>(null);
  const [winW, setWinW] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1280);
  const { t } = useLang();

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = winW < 640;
  const isTablet = winW >= 640 && winW < 1024;
  const tn = t.noticias;

  const filterDefs = [
    { value: "Todos",         label: tn.filterAll },
    { value: "Automóvel",     label: tn.filterAutomovel },
    { value: "Agrícola",      label: tn.filterAgricola },
    { value: "Industrial",    label: tn.filterIndustrial },
    { value: "Institucional", label: tn.filterInstitucional },
    { value: "Press",         label: tn.filterPress },
  ];

  const filtered = activeFilter === "Todos"
    ? NOTICIAS_ARTICLES
    : NOTICIAS_ARTICLES.filter(a => a.categoria === activeFilter);

  const latest = filtered.slice(0, 3);

  const institucional = NOTICIAS_ARTICLES.filter(a => a.categoria === "Institucional").slice(0, 3);
  const automovel    = NOTICIAS_ARTICLES.filter(a => a.categoria === "Automóvel").slice(0, 3);

  const viewport = { once: true, amount: 0.12 } as const;

  const PAD = { paddingLeft: "clamp(20px, 5vw, 80px)", paddingRight: "clamp(20px, 5vw, 80px)" };
  const WRAP = { maxWidth: "1400px", margin: "0 auto", ...PAD };

  return (
    <div className="w-full flex flex-col" style={{ fontFamily: "'Poppins', sans-serif", background: "#F5EFE9" }}>

      {/* ── Header (dark on light bg) ── */}
      <NavThemeCtx.Provider value={false}>
        <header
          className="fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between"
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "clamp(12px, 2vh, 22px) clamp(16px, 4vw, 64px)",
            background: "rgba(245,239,233,0.92)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <Link href="/" className="flex items-center">
            <img
              src={logoSrc}
              alt="Gasosa Auto Agro"
              style={{ height: "clamp(38px, 5.5vw, 58px)", width: "auto", objectFit: "contain" }}
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
          <button
            className="lg:hidden"
            style={{ padding: "clamp(6px, 1.2vw, 10px)", color: "#111111", background: "none", border: "none", cursor: "pointer" }}
            onClick={() => setMobileMenuOpen(true)}
            aria-label={t.mobile.openMenu}
          >
            <Menu style={{ width: "clamp(20px, 3vw, 26px)", height: "clamp(20px, 3vw, 26px)" }} />
          </button>
        </header>
      </NavThemeCtx.Provider>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* ── Intro ── */}
      <section
        style={{
          paddingTop: "clamp(130px, 18vh, 200px)",
          paddingBottom: "clamp(56px, 7vw, 96px)",
          textAlign: "center",
          ...PAD,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 28 }}
          style={{ fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.14em", color: "rgba(0,0,0,0.4)", marginBottom: "28px" }}
        >
          {tn.pageLabel}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 22, delay: 0.07 }}
          style={{
            fontSize: "clamp(1.55rem, 0.9rem + 2.8vw, 3.4rem)",
            fontWeight: 500,
            color: "#111111",
            lineHeight: 1.18,
            letterSpacing: "-0.025em",
            maxWidth: "1060px",
            margin: "0 auto 44px",
          }}
        >
          {tn.pageTitle}
        </motion.h1>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 26, delay: 0.18 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: isMobile ? "flex-start" : "center",
            overflowX: isMobile ? "auto" : "visible",
            flexWrap: isMobile ? "nowrap" : "wrap",
            gap: "0",
            paddingBottom: isMobile ? "4px" : "0",
            paddingLeft: isMobile ? "clamp(20px, 5vw, 80px)" : "0",
            paddingRight: isMobile ? "clamp(20px, 5vw, 80px)" : "0",
            marginLeft: isMobile ? "clamp(-20px, -5vw, -80px)" : "0",
            marginRight: isMobile ? "clamp(-20px, -5vw, -80px)" : "0",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          } as React.CSSProperties}
        >
          {filterDefs.map(({ value, label }, i) => {
            const isActive = value === activeFilter;
            return (
              <button
                key={value}
                onClick={() => setActiveFilter(value)}
                style={{
                  fontSize: "clamp(0.72rem, 0.65rem + 0.3vw, 0.88rem)",
                  fontWeight: isActive ? 600 : 400,
                  background: isActive ? "#111111" : "transparent",
                  color: isActive ? "#ffffff" : "rgba(0,0,0,0.55)",
                  border: isActive ? "1.5px solid #111111" : "1.5px solid transparent",
                  borderRadius: "99px",
                  padding: "5px 18px",
                  cursor: "pointer",
                  marginRight: i < filterDefs.length - 1 ? "10px" : "0",
                  marginBottom: isMobile ? "0" : "8px",
                  transition: "all 0.2s ease",
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "0.01em",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {label}
              </button>
            );
          })}
        </motion.div>
      </section>

      {/* ── Últimos Artigos ── */}
      <section style={{ ...WRAP, marginBottom: "clamp(64px, 9vw, 120px)" }}>
        {/* Section label */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "clamp(24px, 3vw, 40px)" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "rgba(0,0,0,0.5)", letterSpacing: "0.04em" }}>
            {tn.ultimosArtigos}
          </span>
          <span style={{ fontSize: "0.85rem", color: "rgba(0,0,0,0.35)" }}>↓</span>
        </div>

        {latest.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
              gridTemplateRows: "auto",
              gap: "clamp(12px, 2vw, 24px)",
            }}
          >
            {/* Featured large card */}
            {latest[0] && (
              <motion.article
                onClick={() => setSelectedArticle(latest[0])}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ type: "spring", stiffness: 85, damping: 22 }}
                style={{
                  gridColumn: isMobile ? "1" : "span 2",
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "#EDE6DF",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.99 }}
              >
                <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", flexShrink: 0 }}>
                  <img
                    src={latest[0].img}
                    alt={latest[0].titulo}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
                <div style={{ padding: "clamp(20px, 2.5vw, 32px)", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.14em", color: "#F5A000", textTransform: "uppercase" }}>
                    {latest[0].categoria}
                  </span>
                  <h2 style={{ fontSize: "clamp(1.15rem, 0.9rem + 1.2vw, 1.9rem)", fontWeight: 600, color: "#111111", lineHeight: 1.25, letterSpacing: "-0.02em", margin: 0 }}>
                    {latest[0].titulo}
                  </h2>
                  <p style={{ fontSize: "clamp(0.82rem, 0.76rem + 0.2vw, 0.95rem)", color: "rgba(0,0,0,0.5)", lineHeight: 1.65, margin: 0 }}>
                    {latest[0].resumo}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
                    <span style={{ fontSize: "0.78rem", color: "rgba(0,0,0,0.4)" }}>{latest[0].data}</span>
                    <span style={{ fontSize: "1rem", color: "rgba(0,0,0,0.4)" }}>→</span>
                  </div>
                </div>
              </motion.article>
            )}

            {/* Two smaller cards */}
            {latest.slice(1).map((article, i) => (
              <motion.article
                key={i}
                onClick={() => setSelectedArticle(article)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ type: "spring", stiffness: 85, damping: 22, delay: (i + 1) * 0.07 }}
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "#EDE6DF",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.99 }}
              >
                <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden", flexShrink: 0 }}>
                  <img
                    src={article.img}
                    alt={article.titulo}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
                <div style={{ padding: "clamp(16px, 2vw, 24px)", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                  <span style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.14em", color: "#F5A000", textTransform: "uppercase" }}>
                    {article.categoria}
                  </span>
                  <h3 style={{ fontSize: "clamp(0.95rem, 0.82rem + 0.6vw, 1.2rem)", fontWeight: 600, color: "#111111", lineHeight: 1.3, letterSpacing: "-0.015em", margin: 0 }}>
                    {article.titulo}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "12px" }}>
                    <span style={{ fontSize: "0.76rem", color: "rgba(0,0,0,0.4)" }}>{article.data}</span>
                    <span style={{ fontSize: "1rem", color: "rgba(0,0,0,0.4)" }}>→</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* ── Category: Institucional ── */}
      <NoticiasCategorySection
        titulo={tn.categoriaInstitucional}
        articles={institucional}
        viewport={viewport}
        onSelect={setSelectedArticle}
      />

      {/* ── Category: Automóvel ── */}
      <NoticiasCategorySection
        titulo={tn.categoriaAutomovel}
        articles={automovel}
        viewport={viewport}
        onSelect={setSelectedArticle}
      />

      {/* ── Newsletter CTA ── */}
      <section
        style={{
          paddingTop: "clamp(80px, 12vw, 160px)",
          paddingBottom: "clamp(80px, 12vw, 160px)",
          textAlign: "center",
          ...PAD,
        }}
      >
        {/* Arrow icon */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "28px", color: "rgba(0,0,0,0.2)", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1 }}
        >
          ↖
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          style={{
            fontSize: "clamp(1.8rem, 1.2rem + 3vw, 4rem)",
            fontWeight: 500,
            color: "#111111",
            lineHeight: 1.2,
            letterSpacing: "-0.025em",
            maxWidth: "680px",
            margin: "0 auto 40px",
          }}
        >
          {tn.newsletterTitle}
        </motion.h2>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={e => { e.preventDefault(); if (email.trim()) setSubscribed(true); }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}
        >
          {subscribed ? (
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ fontSize: "1rem", fontWeight: 500, color: "#003591" }}
            >
              {tn.newsletterSuccess}
            </motion.p>
          ) : (
            <>
              <div style={{ position: "relative", width: "100%", maxWidth: "480px" }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={tn.emailPlaceholder}
                  required
                  style={{
                    width: "100%",
                    padding: "16px 24px",
                    borderRadius: "99px",
                    border: "1.5px solid rgba(0,0,0,0.15)",
                    background: "transparent",
                    fontSize: "0.93rem",
                    color: "#111111",
                    fontFamily: "'Poppins', sans-serif",
                    outline: "none",
                    transition: "border-color 0.2s",
                    boxSizing: "border-box",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#111111")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)")}
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: "14px 36px",
                  borderRadius: "99px",
                  background: "#111111",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Poppins', sans-serif",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#003591")}
                onMouseLeave={e => (e.currentTarget.style.background = "#111111")}
              >
                {tn.subscribeBtn}
              </button>
            </>
          )}
          <p style={{ fontSize: "0.72rem", color: "rgba(0,0,0,0.4)", maxWidth: "400px", lineHeight: 1.6, margin: 0 }}>
            {tn.privacyText}{" "}
            <a href="#" style={{ color: "rgba(0,0,0,0.55)", textDecoration: "underline" }}>{tn.privacyLink}</a>.
          </p>
        </motion.form>
      </section>

      <Footer />
      <NoticiaDrawer article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  );
}

// ─── NoticiasCategorySection ──────────────────────────────────────────────────
function NoticiasCategorySection({
  titulo,
  articles,
  viewport,
  onSelect,
}: {
  titulo: string;
  articles: typeof NOTICIAS_ARTICLES;
  viewport: { once: boolean; amount: number };
  onSelect?: (a: (typeof NOTICIAS_ARTICLES)[0]) => void;
}) {
  const PAD = { paddingLeft: "clamp(20px, 5vw, 80px)", paddingRight: "clamp(20px, 5vw, 80px)" };
  const WRAP = { maxWidth: "1400px", margin: "0 auto", ...PAD };
  const { t: catLang } = useLang();
  const [winW, setWinW] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1280));
  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section style={{ ...WRAP, marginBottom: "clamp(64px, 9vw, 120px)" }}>
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "20px",
          marginBottom: "clamp(24px, 3.5vw, 44px)",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(1.5rem, 1rem + 2.5vw, 3.2rem)",
            fontWeight: 500,
            color: "#111111",
            letterSpacing: "-0.025em",
            margin: 0,
            lineHeight: 1,
          }}
        >
          {titulo}
        </motion.h2>
        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            fontSize: "clamp(0.78rem, 0.7rem + 0.3vw, 0.92rem)",
            color: "rgba(0,0,0,0.45)",
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "color 0.2s",
            letterSpacing: "0.01em",
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#111111")}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(0,0,0,0.45)")}
        >
          {catLang.noticias.verTodos}
        </motion.a>
      </div>

      {/* responsive grid — 1 col mobile / 2 col tablet / 3 col desktop */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: winW < 580 ? "1fr" : winW < 900 ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
          gridTemplateRows: "auto",
          gap: "clamp(10px, 1.8vw, 20px)",
        }}
      >
        {articles.map((article, i) => (
          <motion.article
            key={i}
            onClick={() => onSelect?.(article)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: i * 0.07 }}
            style={{
              borderRadius: "14px",
              overflow: "hidden",
              background: "#EDE6DF",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gridRow: i === 0 && winW >= 900 ? "span 2" : undefined,
            }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: i === 0 ? "3/4" : "4/3",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <img
                src={article.img}
                alt={article.titulo}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>
            <div style={{ padding: "clamp(14px, 1.8vw, 22px)", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
              <h3
                style={{
                  fontSize: i === 0
                    ? "clamp(1rem, 0.85rem + 0.9vw, 1.45rem)"
                    : "clamp(0.88rem, 0.78rem + 0.5vw, 1.08rem)",
                  fontWeight: 600,
                  color: "#111111",
                  lineHeight: 1.28,
                  letterSpacing: "-0.015em",
                  margin: 0,
                }}
              >
                {article.titulo}
              </h3>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "10px" }}>
                <span style={{ fontSize: "0.74rem", color: "rgba(0,0,0,0.38)" }}>{article.data}</span>
                <span style={{ fontSize: "0.95rem", color: "rgba(0,0,0,0.35)" }}>→</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

// ─── Angola Map SVG ───────────────────────────────────────────────────────────
function AngolaMap() {
  const Y = "#F5A000";

  /* The source SVG has explicit width/height but NO viewBox.
     Without viewBox, CSS scaling clips instead of scaling.
     Fix: swap the pixel dimensions for viewBox + 100% width.  */
  const styledSvg = angolaMapRaw
    .replace(
      'width="612.3866" height="684.8916"',
      'viewBox="0 0 612.3866 684.8916" width="100%" style="display:block;height:auto;"'
    )
    .replace(
      /(<svg[^>]*>)/,
      '$1<style>' +
        'path{fill:#003591;stroke:rgba(255,255,255,0.18);stroke-width:0.6;stroke-linejoin:round;}' +
        'path#AO-LUA{fill:#F5A000;}' +
        'path#AO-HUA{fill:#F5A000;}' +
        'path#AO-HUI{fill:#F5A000;}' +
      '</style>'
    );

  /* City centres in the SVG's own viewBox (612.3866 × 684.8916)         */
  /* Calculated from real geo-coords using Angola bounding-box projection  */
  const cities = [
    { id: "Luanda",  cx: 77,  cy: 230, label: "LUANDA",  pillW: 74 },
    { id: "Huambo",  cx: 201, cy: 420, label: "HUAMBO",  pillW: 78 },
    { id: "Lubango", cx: 90,  cy: 528, label: "HUÍLA",   pillW: 66 },
  ] as const;

  return (
    <motion.div
      style={{ position: "relative", width: "100%" }}
      initial={{ opacity: 0, x: 28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Real Angola SVG — all provinces coloured via injected <style> */}
      <div dangerouslySetInnerHTML={{ __html: styledSvg }} />

      {/* Overlay SVG — same viewBox — for animated city markers & labels */}
      <svg
        viewBox="0 0 612.3866 684.8916"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {cities.map(({ id, cx, cy, label, pillW }, i) => (
          <g key={id}>
            <motion.g
              style={{ originX: `${cx}px`, originY: `${cy}px` }}
              animate={{ scale: [0.5, 2.8, 0.5], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.75 }}
            >
              <circle cx={cx} cy={cy} r={9} fill="none" stroke={Y} strokeWidth="1.5" />
            </motion.g>
            <circle cx={cx} cy={cy} r={6} fill={Y} />
            <circle cx={cx} cy={cy} r={2.5} fill="#111111" />
            {/* Pill label */}
            <rect
              x={cx - pillW / 2} y={cy + 11}
              width={pillW} height={21} rx={10.5}
              fill={Y}
            />
            <text
              x={cx} y={cy + 25.5}
              textAnchor="middle"
              fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="700"
              fill="#111111" letterSpacing="0.08em"
            >{label}</text>
          </g>
        ))}
      </svg>
    </motion.div>
  );
}

function ContactosPage() {
  const { t } = useLang();
  const tc = t.contactos;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [winW, setWinW] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1280));
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const entryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const locationsGridRef = useRef<HTMLDivElement | null>(null);
  const [connectorLines, setConnectorLines] = useState<{x1:number;y1:number;x2:number;y2:number}[]>([]);

  const MAP_SVG_W = 612.3866;
  const MAP_SVG_H = 684.8916;
  const MAP_CITIES = [
    { cx: 77,  cy: 230 },
    { cx: 201, cy: 420 },
    { cx: 90,  cy: 528 },
  ];

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const calculate = () => {
      if (!locationsGridRef.current || !mapDivRef.current) return;
      const gridRect = locationsGridRef.current.getBoundingClientRect();
      const mapRect  = mapDivRef.current.getBoundingClientRect();
      const newLines = MAP_CITIES.map((city, i) => {
        const entry = entryRefs.current[i];
        if (!entry) return null;
        const r = entry.getBoundingClientRect();
        // Province position on the map
        const provinceX = mapRect.left - gridRect.left + (city.cx / MAP_SVG_W) * mapRect.width;
        const provinceY = mapRect.top  - gridRect.top  + (city.cy / MAP_SVG_H) * mapRect.height;
        // Horizontal line: y1 = y2 = province height, x1 = right edge of entry
        return {
          x1: r.right - gridRect.left,
          y1: provinceY,
          x2: provinceX,
          y2: provinceY,
        };
      }).filter(Boolean) as {x1:number;y1:number;x2:number;y2:number}[];
      setConnectorLines(newLines);
    };
    calculate();
    window.addEventListener("resize", calculate);
    const ro = new ResizeObserver(calculate);
    if (locationsGridRef.current) ro.observe(locationsGridRef.current);
    return () => { window.removeEventListener("resize", calculate); ro.disconnect(); };
  }, []);

  const isMobile = winW < 640;
  const isTablet = winW >= 640 && winW < 1024;

  const viewport = { once: true, amount: 0.12 } as const;
  const PAD = { paddingLeft: "clamp(20px, 5vw, 80px)", paddingRight: "clamp(20px, 5vw, 80px)" };
  const WRAP = { maxWidth: "1400px", margin: "0 auto", ...PAD };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(0,0,0,0.05)",
    border: "1.5px solid transparent",
    borderRadius: "10px",
    padding: "14px 18px",
    fontSize: "clamp(0.82rem, 0.75rem + 0.3vw, 0.95rem)",
    fontFamily: "'Poppins', sans-serif",
    color: "#111111",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  return (
    <div className="w-full flex flex-col" style={{ fontFamily: "'Poppins', sans-serif", background: "#F5EFE9" }}>

      {/* ── Header ── */}
      <NavThemeCtx.Provider value={false}>
        <header
          className="fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between"
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "clamp(12px, 2vh, 22px) clamp(16px, 4vw, 64px)",
            background: "rgba(245,239,233,0.92)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <Link href="/" className="flex items-center">
            <img
              src={logoSrc}
              alt="Gasosa Auto Agro"
              style={{ height: "clamp(38px, 5.5vw, 58px)", width: "auto", objectFit: "contain" }}
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
          <button
            className="lg:hidden"
            style={{ padding: "clamp(6px, 1.2vw, 10px)", color: "#111111", background: "none", border: "none", cursor: "pointer" }}
            onClick={() => setMobileMenuOpen(true)}
            aria-label={t.mobile.openMenu}
          >
            <Menu style={{ width: "clamp(20px, 3vw, 26px)", height: "clamp(20px, 3vw, 26px)" }} />
          </button>
        </header>
      </NavThemeCtx.Provider>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* ── Hero ── */}
      <section
        style={{
          paddingTop: "clamp(140px, 20vh, 220px)",
          paddingBottom: "clamp(64px, 8vw, 112px)",
          textAlign: "center",
          ...PAD,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 28 }}
          style={{ fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.14em", color: "rgba(0,0,0,0.4)", marginBottom: "28px" }}
        >
          {tc.pageLabel}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 22, delay: 0.07 }}
          style={{
            fontSize: "clamp(2.4rem, 1.4rem + 4.2vw, 5.5rem)",
            fontWeight: 500,
            color: "#111111",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            margin: "0 auto 28px",
            maxWidth: "900px",
          }}
        >
          {tc.pageTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 24, delay: 0.16 }}
          style={{
            fontSize: "clamp(0.88rem, 0.76rem + 0.5vw, 1.08rem)",
            color: "rgba(0,0,0,0.52)",
            lineHeight: 1.65,
            maxWidth: "540px",
            margin: "0 auto",
          }}
        >
          {tc.pageSubtitle}
        </motion.p>
      </section>

      {/* ── Direct contact bar ── */}
      <div style={{ ...WRAP, marginBottom: "clamp(72px, 10vw, 140px)" }}>
        {/* Label row */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{
            fontSize: "0.73rem",
            fontWeight: 500,
            letterSpacing: "0.13em",
            color: "rgba(0,0,0,0.36)",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          {tc.directLabel}
        </motion.p>

        {/* Divider + contacts */}
        <div style={{ borderTop: "1.5px solid rgba(0,0,0,0.1)" }}>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "0" : "0",
              alignItems: "stretch",
            }}
          >
            {/* Email */}
            <motion.a
              href="mailto:geral@gasosaautoagro.ao"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
              style={{
                flex: 1,
                display: "block",
                padding: "clamp(24px, 3.5vw, 44px) 0",
                fontSize: "clamp(1.05rem, 0.7rem + 2vw, 2rem)",
                fontWeight: 500,
                color: "#111111",
                textDecoration: "none",
                letterSpacing: "-0.025em",
                borderBottom: isMobile ? "1px solid rgba(0,0,0,0.08)" : "none",
                borderRight: isMobile ? "none" : "1px solid rgba(0,0,0,0.1)",
                transition: "color 0.2s",
              }}
              whileHover={{ color: "#003591" }}
            >
              geral@gasosaautoagro.ao
            </motion.a>

            {/* Phone */}
            <motion.a
              href="tel:+244951025435"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              style={{
                flex: isMobile ? "none" : "0 0 auto",
                display: "block",
                padding: isMobile
                  ? "clamp(20px, 3vw, 36px) 0"
                  : "clamp(24px, 3.5vw, 44px) 0 clamp(24px, 3.5vw, 44px) clamp(28px, 4vw, 56px)",
                fontSize: "clamp(1.05rem, 0.7rem + 2vw, 2rem)",
                fontWeight: 500,
                color: "#111111",
                textDecoration: "none",
                letterSpacing: "-0.025em",
                transition: "color 0.2s",
              }}
              whileHover={{ color: "#003591" }}
            >
              +244 951 025 435
            </motion.a>
          </div>
          <div style={{ borderTop: "1.5px solid rgba(0,0,0,0.1)" }} />
        </div>
      </div>

      {/* ── Locations ── */}
      <section style={{ marginBottom: "clamp(80px, 11vw, 160px)" }}>
        <div
          ref={locationsGridRef}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
              ? "1fr 1fr"
              : "clamp(180px, 22vw, 320px) clamp(220px, 28vw, 380px) clamp(260px, 32vw, 460px)",
            gap: isMobile ? "clamp(36px, 6vw, 56px)" : isTablet ? "clamp(28px, 4vw, 48px)" : "clamp(24px, 3vw, 40px)",
            alignItems: "start",
            position: "relative",
            maxWidth: "1400px",
            margin: "0 auto",
            paddingLeft: "clamp(20px, 5vw, 80px)",
            paddingRight: "clamp(20px, 5vw, 80px)",
          }}
        >
          {/* ── Column 1: Label + Title (bottom-aligned) ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "clamp(16px, 2vw, 28px)" }}
            >
              <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "rgba(0,0,0,0.5)", letterSpacing: "0.04em" }}>
                {tc.locationsLabel}
              </span>
              <span style={{ fontSize: "0.85rem", color: "rgba(0,0,0,0.35)" }}>↓</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: "clamp(2rem, 2.8vw, 3.5rem)",
                fontWeight: 500,
                lineHeight: 1.1,
                color: "#1a1a2e",
                margin: 0,
                whiteSpace: "pre-line",
              }}
            >
              {tc.locationsTitle}
            </motion.h2>
          </div>

          {/* ── Column 2: City list ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(24px, 3.5vw, 44px)" }}>
            {tc.locations.map((loc, i) => (
              <motion.div
                key={loc.city}
                ref={(el: HTMLDivElement | null) => { entryRefs.current[i] = el; }}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewport}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
                style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}
              >
                {/* Luanda (i===0) has no pin icon; others do */}
                {i > 0 && (
                  <div style={{ flexShrink: 0, marginTop: "4px" }}>
                    <MapPin size={22} style={{ color: "#F5A000", display: "block" }} fill="#F5A000" strokeWidth={1} />
                  </div>
                )}
                <div>
                  <h3 style={{
                    fontSize: "clamp(1.3rem, 0.9rem + 1.8vw, 2rem)",
                    fontWeight: 700,
                    color: "#111111",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05,
                    margin: "0 0 6px",
                  }}>
                    {loc.city.toUpperCase()}
                  </h3>
                  <p style={{ fontSize: "clamp(0.74rem, 0.66rem + 0.28vw, 0.84rem)", color: "rgba(0,0,0,0.42)", margin: "0 0 5px", display: "flex", alignItems: "center", gap: "5px" }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#F5A000", display: "inline-block", flexShrink: 0 }} />
                    {loc.address}
                  </p>
                  {(loc.phones as readonly string[]).map((phone) => (
                    <p key={phone} style={{ fontSize: "clamp(0.82rem, 0.74rem + 0.28vw, 0.94rem)", color: "#111111", margin: "2px 0", fontWeight: 500 }}>
                      {phone}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Column 3: Angola Map ── */}
          <div ref={mapDivRef}>
            <AngolaMap />
          </div>

          {/* Connector dashed lines */}
          {!isMobile && !isTablet && connectorLines.length > 0 && (
            <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }} aria-hidden="true">
              {connectorLines.map((line, i) => (
                <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="#F5A000" strokeWidth="1.5" strokeDasharray="5 4" strokeOpacity="0.7" />
              ))}
            </svg>
          )}
        </div>
      </section>

      {/* ── Contact form section ── */}
      <section
        style={{
          background: "#111111",
          paddingTop: "clamp(64px, 9vw, 120px)",
          paddingBottom: "clamp(64px, 9vw, 120px)",
        }}
      >
        <div
          style={{
            ...WRAP,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "clamp(40px, 8vw, 64px)" : "clamp(40px, 6vw, 96px)",
            alignItems: "start",
          }}
        >
          {/* Left — tagline */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.12em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: "24px" }}
            >
              {tc.formLabel}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
              style={{
                fontSize: "clamp(1.6rem, 1rem + 2.8vw, 3.2rem)",
                fontWeight: 500,
                color: "#ffffff",
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                margin: "0 0 clamp(24px, 3vw, 40px)",
              }}
            >
              A Gasosa está<br />sempre disponível.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.14 }}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <a
                href="mailto:geral@gasosaautoagro.ao"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                  fontSize: "clamp(0.82rem, 0.75rem + 0.3vw, 0.95rem)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#ffffff")}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)")}
              >
                <span style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✉</span>
                geral@gasosaautoagro.ao
              </a>
              <a
                href="tel:+244951025435"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                  fontSize: "clamp(0.82rem, 0.75rem + 0.3vw, 0.95rem)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#ffffff")}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)")}
              >
                <span style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✆</span>
                +244 951 025 435
              </a>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          >
            {sent ? (
              <div
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "16px",
                  padding: "clamp(32px, 5vw, 64px)",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                  minHeight: "320px",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "2.4rem" }}>✓</span>
                <p style={{ color: "#ffffff", fontWeight: 500, fontSize: "clamp(1rem, 0.85rem + 0.6vw, 1.2rem)", margin: 0, lineHeight: 1.5 }}>
                  {tc.formSuccess}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "14px" }}
              >
                {/* Name + Email row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: "14px",
                  }}
                >
                  <input
                    type="text"
                    required
                    placeholder={tc.namePlaceholder}
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={{ ...inputStyle, color: "#111111" }}
                    onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.4)"; (e.currentTarget as HTMLInputElement).style.background = "rgba(255,255,255,0.98)"; }}
                    onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = "transparent"; (e.currentTarget as HTMLInputElement).style.background = "rgba(255,255,255,0.92)"; }}
                  />
                  <input
                    type="email"
                    required
                    placeholder={tc.emailPlaceholder}
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={{ ...inputStyle, background: "rgba(255,255,255,0.92)", color: "#111111" }}
                    onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.4)"; (e.currentTarget as HTMLInputElement).style.background = "rgba(255,255,255,0.98)"; }}
                    onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = "transparent"; (e.currentTarget as HTMLInputElement).style.background = "rgba(255,255,255,0.92)"; }}
                  />
                </div>

                {/* Subject */}
                <input
                  type="text"
                  required
                  placeholder={tc.subjectPlaceholder}
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  style={{ ...inputStyle, background: "rgba(255,255,255,0.92)", color: "#111111" }}
                  onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.4)"; (e.currentTarget as HTMLInputElement).style.background = "rgba(255,255,255,0.98)"; }}
                  onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = "transparent"; (e.currentTarget as HTMLInputElement).style.background = "rgba(255,255,255,0.92)"; }}
                />

                {/* Message */}
                <textarea
                  required
                  rows={5}
                  placeholder={tc.messagePlaceholder}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{
                    ...inputStyle,
                    background: "rgba(255,255,255,0.92)",
                    color: "#111111",
                    resize: "vertical",
                    minHeight: "120px",
                  }}
                  onFocus={e => { (e.currentTarget as HTMLTextAreaElement).style.borderColor = "rgba(255,255,255,0.4)"; (e.currentTarget as HTMLTextAreaElement).style.background = "rgba(255,255,255,0.98)"; }}
                  onBlur={e => { (e.currentTarget as HTMLTextAreaElement).style.borderColor = "transparent"; (e.currentTarget as HTMLTextAreaElement).style.background = "rgba(255,255,255,0.92)"; }}
                />

                {/* Privacy */}
                <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", margin: "0" }}>
                  {tc.privacyText}{" "}
                  <a href="#" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "underline" }}>
                    {tc.privacyLink}
                  </a>
                  .
                </p>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  style={{
                    background: "#F5A000",
                    color: "#111111",
                    border: "none",
                    borderRadius: "99px",
                    padding: "15px 36px",
                    fontSize: "clamp(0.82rem, 0.75rem + 0.3vw, 0.95rem)",
                    fontWeight: 600,
                    fontFamily: "'Poppins', sans-serif",
                    cursor: "pointer",
                    alignSelf: "flex-start",
                    letterSpacing: "0.01em",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "#e69600")}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "#F5A000")}
                >
                  {tc.submitBtn}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ─── Router & App ─────────────────────────────────────────────────────────────
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/infraestruturas" component={InfraestrutrasPage} />
      <Route path="/notícias" component={NoticiasPage} />
      <Route path="/noticias" component={NoticiasPage} />
      <Route path="/contactos" component={ContactosPage} />
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
