import { Switch, Route, Router as WouterRouter, Link } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChevronDown, Check, Menu, X, Mail } from "lucide-react";
import logoSrc from "@assets/ChatGPT_Image_21_de_mai._de_2026,_12_09_16_1_1779362713859.png";
import heroManSrc from "/hero-man.png";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

const MotionLink = motion.create(Link);

const NAV_ITEMS = ["QUEM SOMOS", "SECTORES", "INFRAESTRUTURAS", "PARCEIROS", "CONTACTOS"];

const LANGUAGES = [
  { code: "EN", label: "EN" },
  { code: "PT", label: "PT" },
  { code: "ES", label: "ES" },
];

function NavPill({ item, overlap }: { item: string; overlap?: boolean }) {
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const pillRef = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = pillRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <MotionLink
      ref={pillRef}
      href={`/${item.toLowerCase()}`}
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

function LangDropdown() {
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
        className="flex items-center gap-0.5 text-[11px] font-semibold tracking-widest text-foreground cursor-pointer select-none"
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
                onClick={() => { setSelected(lang.code); setOpen(false); }}
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

function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col overflow-hidden">
      {/* ── Header ───────────────────────────────────────── */}
      <header className="w-full flex items-center justify-between px-5 sm:px-8 py-5 max-w-[1400px] mx-auto relative z-20 w-full">
        <Link href="/" className="flex items-center">
          <img src={logoSrc} alt="Gasosa Auto Agro" className="h-10 sm:h-12 w-auto object-contain" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-4">
          <div className="flex items-center">
            {NAV_ITEMS.map((item, i) => (
              <NavPill key={item} item={item} overlap={i > 0} />
            ))}
          </div>
          <LangDropdown />
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* ── Hero ─────────────────────────────────────────── */}
      <main className="relative flex-1 w-full overflow-hidden">

        {/* Title — z-10, behind man */}
        <div className="absolute inset-x-0 top-0 z-10 w-full text-center px-4 sm:px-10 pt-4 sm:pt-6">
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

        {/* Man image — z-20, in FRONT of title */}
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
            transition={{
              delay: 0.55,
              duration: 2.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </div>

        {/* Bottom bar — z-30 */}
        {/* Desktop (sm+): subtitle left, card right, side by side */}
        {/* Mobile (<sm): subtitle bottom-left only, card hidden */}
        <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-10 right-4 sm:right-10 z-30 flex items-end justify-between gap-3">

          {/* Subtitle — wider on mobile since card is hidden */}
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
            transition={{ delay: 1.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Qualidade e confiança para quem impulsiona Angola — nos campos, nas estradas e nas indústrias.
          </motion.p>

          {/* Contact card — only on sm+ */}
          <motion.div
            className="relative overflow-hidden rounded-2xl flex-shrink-0 hidden sm:block"
            style={{
              width: "clamp(130px, 17vw, 210px)",
              height: "clamp(90px, 12vw, 150px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.24)",
            }}
            initial={{ opacity: 0, scale: 0.92, y: 60, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: 1.6,
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <img
              src="/contact-card.png"
              alt="Contacte-nos"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <div
                className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5"
                style={{
                  background: "#ffffff",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
                }}
              >
                <Mail className="w-3 h-3 flex-shrink-0" style={{ color: "#003591" }} />
                <span style={{ fontSize: "clamp(8px, 0.8vw, 10px)", fontWeight: 700, letterSpacing: "0.1em", color: "#111111" }}>
                  CONTACTE-NOS
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

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
