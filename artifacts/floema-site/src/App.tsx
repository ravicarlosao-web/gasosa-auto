import { Switch, Route, Router as WouterRouter, Link } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChevronDown, Check, Menu, X, Mail } from "lucide-react";
import logoSrc from "@assets/ChatGPT_Image_21_de_mai._de_2026,_12_09_16_1_1779362713859.png";
import heroManSrc from "/hero-man.png";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

const MotionLink = motion.create(Link) as React.ComponentType<React.ComponentPropsWithRef<typeof Link> & Parameters<typeof motion.create>[1] & Record<string, unknown>>;

const NAV_ITEMS = ["QUEM SOMOS", "SECTORES", "INFRAESTRUTURAS", "PARCEIROS", "CONTACTOS"];

const LANGUAGES = [
  { code: "EN", label: "EN" },
  { code: "PT", label: "PT" },
  { code: "ES", label: "ES" },
];

const MILESTONES = [
  {
    year: "2005",
    image: "/hero.png",
    description:
      "Fundação da Gasosa Auto Agro em Luanda, com foco na importação e distribuição de equipamentos agrícolas e veículos de alta performance.",
  },
  {
    year: "2015",
    image: "/contact-card.png",
    description:
      "Expansão para o sector de infraestruturas, tornando-nos parceiros estratégicos em projetos de desenvolvimento nacional.",
  },
  {
    year: "2020",
    image: "/hero.png",
    description:
      "Consolidação de parcerias com as principais marcas internacionais dos sectores automóvel e agrícola.",
  },
];

// ─── NavPill ─────────────────────────────────────────────────────────────────
function NavPill({
  item,
  overlap,
  isDark,
}: {
  item: string;
  overlap?: boolean;
  isDark?: boolean;
}) {
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <MotionLink
      href={`/${item.toLowerCase()}`}
      className="text-[11px] font-semibold tracking-widest py-[7px] rounded-full whitespace-nowrap inline-flex items-center justify-center relative overflow-hidden"
      style={{
        background: isDark ? "rgba(255,255,255,0.18)" : "#ffffff",
        color: isDark ? "#ffffff" : "#111111",
        paddingLeft: "1.25rem",
        paddingRight: "1.25rem",
        marginLeft: overlap ? "-4px" : "0",
        transition: "background 0.4s, color 0.4s",
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
              background: `radial-gradient(circle 55px at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.22) 0%, transparent 80%)`,
            }}
          />
        )}
      </AnimatePresence>
      <span className="relative z-10">{item}</span>
    </MotionLink>
  );
}

// ─── LangDropdown ─────────────────────────────────────────────────────────────
function LangDropdown({ isDark }: { isDark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("PT");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-0.5 text-[11px] font-semibold tracking-widest cursor-pointer select-none"
        style={{ color: isDark ? "#ffffff" : "inherit", transition: "color 0.4s" }}
        data-testid="button-lang-selector"
      >
        {selected}
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
            {LANGUAGES.map((lang, i) => (
              <motion.button
                key={lang.code}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, type: "spring", stiffness: 400, damping: 22 }}
                onClick={() => {
                  setSelected(lang.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-[11px] font-semibold tracking-widest transition-colors cursor-pointer
                  ${selected === lang.code ? "bg-neutral-100 hover:bg-neutral-100" : "hover:bg-neutral-50"}`}
                style={{ color: "#003591" }}
                data-testid={`button-lang-${lang.code}`}
              >
                {lang.label}
                {selected === lang.code && (
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
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed inset-0 z-50 bg-background flex flex-col px-6 pt-6 pb-12"
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
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 400, damping: 28 }}
              >
                <Link
                  href={`/${item.toLowerCase()}`}
                  onClick={onClose}
                  className="text-xl font-semibold tracking-wide text-foreground py-3 border-b border-foreground/10 flex items-center justify-between"
                >
                  {item}
                  <span style={{ color: "#003591" }}>→</span>
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="mt-8 flex gap-4">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                className="text-[11px] font-semibold tracking-widest px-4 py-2 rounded-full bg-white text-foreground"
              >
                {lang.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── HistoriaSection ──────────────────────────────────────────────────────────
function HistoriaSection({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px 0px 0px 0px" });

  return (
    <section
      ref={sectionRef}
      className="w-full relative"
      style={{ background: "#003591", fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 py-20 sm:py-28">

        {/* Section heading */}
        <div ref={headingRef} className="overflow-hidden mb-16 sm:mb-20">
          <motion.h2
            initial={{ y: -80, opacity: 0 }}
            animate={headingInView ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            style={{
              color: "#ffffff",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "0.01em",
              fontSize: "clamp(1.6rem, 1rem + 3.2vw, 4rem)",
              maxWidth: "700px",
            }}
          >
            Uma trajetória marcada pela dedicação, excelência e crescimento.
          </motion.h2>
        </div>

        {/* Milestones grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/20">
          {MILESTONES.map((milestone, i) => (
            <MilestoneCard key={milestone.year} milestone={milestone} index={i} />
          ))}
        </div>

        {/* Current year highlight */}
        <CurrentYearHighlight />

      </div>
    </section>
  );
}

// ─── MilestoneCard ────────────────────────────────────────────────────────────
function MilestoneCard({
  milestone,
  index,
}: {
  milestone: (typeof MILESTONES)[number];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px 0px 0px" });

  return (
    <div
      ref={ref}
      className="overflow-hidden"
      style={{
        borderRight: index < MILESTONES.length - 1 ? "1px solid rgba(255,255,255,0.15)" : "none",
      }}
    >
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }}
        transition={{
          duration: 0.9,
          delay: index * 0.12,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="px-0 md:px-8 pt-10 pb-10"
        style={{ paddingLeft: index === 0 ? 0 : undefined }}
      >
        {/* Year tag */}
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.55)",
            display: "block",
            marginBottom: "20px",
          }}
        >
          {milestone.year}
        </span>

        {/* Image */}
        <div
          className="w-full rounded-xl overflow-hidden mb-6"
          style={{ aspectRatio: "4/3" }}
        >
          <img
            src={milestone.image}
            alt={`Gasosa Auto Agro — ${milestone.year}`}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.82) saturate(0.9)" }}
          />
        </div>

        {/* Description */}
        <p
          style={{
            color: "rgba(255,255,255,0.78)",
            fontSize: "clamp(0.78rem, 0.6rem + 0.6vw, 0.92rem)",
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          {milestone.description}
        </p>
      </motion.div>
    </div>
  );
}

// ─── CurrentYearHighlight ─────────────────────────────────────────────────────
function CurrentYearHighlight() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px 0px 0px" });

  return (
    <div
      ref={ref}
      className="overflow-hidden mt-0 pt-10 border-t border-white/20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8"
    >
      <motion.div
        initial={{ y: -70, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: -70, opacity: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <span
          style={{
            display: "block",
            fontWeight: 800,
            lineHeight: 0.85,
            letterSpacing: "-0.04em",
            color: "#ffffff",
            fontSize: "clamp(5rem, 4rem + 10vw, 14rem)",
          }}
        >
          2024
        </span>
      </motion.div>

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
        transition={{ duration: 1.0, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="sm:max-w-[340px] pb-2"
      >
        <p
          style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: "clamp(0.85rem, 0.6rem + 0.8vw, 1.05rem)",
            lineHeight: 1.65,
            fontWeight: 500,
          }}
        >
          Consolidados como referência nacional no sector automóvel e agrícola, com projetos de impacto em todo o território angolano — e uma visão clara para o futuro.
        </p>
      </motion.div>
    </div>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────
function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerDark, setHeaderDark] = useState(false);
  const blueSectionRef = useRef<HTMLElement | null>(null);

  // Detect when the blue section scrolls under the header
  useEffect(() => {
    const section = blueSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeaderDark(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "-72px 0px 0px 0px",
        threshold: 0,
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full flex flex-col" style={{ background: "#F5EFE9" }}>

      {/* ── Header (fixed) ───────────────────────────────────────────── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-5 max-w-[1400px] mx-auto w-full pointer-events-none"
        style={{ left: 0, right: 0, margin: "0 auto" }}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        {/* Transparent backdrop blur when over blue section */}
        <AnimatePresence>
          {headerDark && (
            <motion.div
              key="header-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, rgba(0,53,145,0.72) 0%, rgba(0,53,145,0) 100%)",
                backdropFilter: "blur(0px)",
              }}
            />
          )}
        </AnimatePresence>

        <div className="relative z-10 flex items-center justify-between w-full pointer-events-auto">
          <Link href="/" className="flex items-center">
            <img
              src={logoSrc}
              alt="Gasosa Auto Agro"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-4">
            <div className="flex items-center">
              {NAV_ITEMS.map((item, i) => (
                <NavPill key={item} item={item} overlap={i > 0} isDark={headerDark} />
              ))}
            </div>
            <LangDropdown isDark={headerDark} />
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2"
            style={{ color: headerDark ? "#ffffff" : "inherit", transition: "color 0.4s" }}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <main
        className="relative w-full overflow-hidden"
        style={{ minHeight: "100dvh", background: "#F5EFE9" }}
      >
        {/* Title — z-10, behind man */}
        <div className="absolute inset-x-0 top-0 z-10 w-full text-center px-4 sm:px-10 pt-24 sm:pt-28">
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
            Referência angolana no<br />
            sector automóvel e agrícola.
          </motion.h1>
        </div>

        {/* Man image — z-20, in front of title */}
        <div className="absolute inset-0 flex items-end justify-center z-20 pointer-events-none select-none">
          <motion.img
            src={heroManSrc}
            alt="Técnico Gasosa Auto Agro"
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

        {/* Bottom bar — z-30 */}
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
            Qualidade e confiança para quem impulsiona Angola — nos campos, nas estradas e nas indústrias.
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
              alt="Contacte-nos"
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
              Uma empresa construída<br />para durar.
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
                  style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "#111111" }}
                >
                  CONTACTE-NOS
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* ── Historia Section ──────────────────────────────────────────── */}
      <HistoriaSection sectionRef={blueSectionRef} />

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
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
