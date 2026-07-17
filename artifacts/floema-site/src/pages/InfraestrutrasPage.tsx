import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { Menu } from "lucide-react";
import { NavLogo } from "../components/layout/NavLogo";
import infraHeroImg        from "@assets/20250903_123036_1780417176290.jpg";
import infraLubangoExt    from "@assets/20250903_123815_1780417632798.jpg";
import infraLubangoAerial from "@assets/20250903_124326_1780417637563.jpg";
import infraLubangoInside from "@assets/20250903_125127_1780417648038.jpg";
import infraLubangoWide   from "@assets/20250903_124357_1780417657961.jpg";
import infraHuamboExt     from "@assets/20250903_124447_1780417641736.jpg";
import infraLuandaFachada from "@assets/WhatsApp_Image_2025-09-05_at_17.29.30_(2)_1780420633119.jpeg";
import infraLuandaLoja1   from "@assets/WhatsApp_Image_2025-09-05_at_17.29.31_1780420592748.jpeg";
import infraLuandaLoja2   from "@assets/WhatsApp_Image_2025-09-05_at_17.29.32_(5)_1780420596544.jpeg";
import infraLuandaLoja3   from "@assets/WhatsApp_Image_2025-09-05_at_17.29.32_(6)_1780420599872.jpeg";
import infraLuandaLoja4   from "@assets/WhatsApp_Image_2025-09-05_at_17.29.32_(8)_1780420570261.jpeg";
import infraLuandaOfic1   from "@assets/WhatsApp_Image_2025-09-05_at_17.29.31_(6)_1780420686105.jpeg";
import infraLuandaOfic2   from "@assets/WhatsApp_Image_2025-09-05_at_17.29.31_(7)_1780420689121.jpeg";
import infraLuandaOfic3   from "@assets/WhatsApp_Image_2025-09-05_at_17.29.31_(8)_1780420692112.jpeg";
import infraFuturas       from "@assets/20250903_123030_1780417662829.jpg";
import { LazyImage } from "../components/ui/lazy-image";
import { NavThemeCtx } from "../lib/nav-theme";
import { NavPill } from "../components/layout/NavPill";
import { LangDropdown } from "../components/layout/LangDropdown";
import { MobileMenu } from "../components/layout/MobileMenu";
import { Footer } from "../components/layout/Footer";
import { FADE_UP } from "../lib/motion-variants";
import { useLang } from "../i18n";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSEO, LOCAL_BUSINESS_LUANDA, LOCAL_BUSINESS_LUBANGO, LOCAL_BUSINESS_HUAMBO } from "../lib/use-seo";

const AMBER = "#F5A000";
const viewport = { once: false, amount: 0.15 } as const;

/* ── Reusable: location header text block ── */
function LocationBlock({
  index,
  tag,
  title,
  description,
  stats,
  delay = 0,
}: {
  index: string;
  tag: string;
  title: string;
  description: string;
  stats?: { value: string; label: string }[];
  delay?: number;
}) {
  const isMobile = useIsMobile();
  return (
    <div style={{
      background: "#ffffff",
      padding: `clamp(64px,10vw,120px) clamp(24px,6vw,96px)`,
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* number + tag row */}
        <motion.div
          variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={delay}
          style={{ display: "flex", alignItems: "baseline", gap: "24px", marginBottom: "32px" }}
        >
          <span style={{
            fontSize: "clamp(4rem,8vw,8rem)",
            fontWeight: 800,
            color: "rgba(0,0,0,0.06)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            flexShrink: 0,
            fontFamily: "'Poppins', sans-serif",
          }}>{index}</span>
          <span style={{
            display: "inline-block",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: AMBER,
            textTransform: "uppercase" as const,
            paddingBottom: "4px",
            borderBottom: `2px solid ${AMBER}`,
          }}>{tag}</span>
        </motion.div>

        {/* title */}
        <motion.h2
          variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={delay + 0.07}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(2rem,1rem+3.5vw,4.5rem)",
            fontWeight: 700,
            color: "#0a1628",
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
            margin: "0 0 clamp(20px,3vw,32px)",
            maxWidth: "800px",
          }}
        >
          {title}
        </motion.h2>

        {/* description */}
        <motion.p
          variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={delay + 0.13}
          style={{
            fontSize: "clamp(0.9rem,0.78rem+0.5vw,1.1rem)",
            color: "rgba(0,0,0,0.55)",
            lineHeight: 1.75,
            margin: 0,
            maxWidth: "640px",
          }}
        >
          {description}
        </motion.p>

        {/* stats row */}
        {stats && (
          <motion.div
            variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={delay + 0.2}
            style={{
              display: "flex",
              flexWrap: "wrap" as const,
              gap: isMobile ? "24px 40px" : "0",
              marginTop: "clamp(36px,5vw,56px)",
              borderTop: "1px solid rgba(0,0,0,0.08)",
              paddingTop: "clamp(28px,4vw,44px)",
            }}
          >
            {stats.map((s, i) => (
              <div key={i} style={{
                flex: "1 1 auto",
                minWidth: "140px",
                paddingRight: isMobile ? "0" : "clamp(32px,4vw,64px)",
                borderRight: !isMobile && i < stats.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
                paddingLeft: !isMobile && i > 0 ? "clamp(32px,4vw,64px)" : "0",
              }}>
                <div style={{
                  fontSize: "clamp(1.8rem,1rem+2.5vw,3rem)",
                  fontWeight: 700,
                  color: "#0a1628",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  marginBottom: "6px",
                  fontFamily: "'Poppins', sans-serif",
                }}>{s.value}</div>
                <div style={{
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  color: "rgba(0,0,0,0.4)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ── Reusable: photo strip ── */
function PhotoStrip({ srcs, cols, height }: {
  srcs: string[];
  cols: number;
  height: string;
}) {
  const isMobile = useIsMobile();
  const colsMobile = cols === 4 ? 2 : 1;
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: isMobile ? `repeat(${colsMobile}, 1fr)` : `repeat(${cols}, 1fr)`,
      gap: "3px",
      width: "100%",
    }}>
      {srcs.map((src, i) => (
        <motion.div
          key={i}
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          custom={i * 0.07}
          style={{ position: "relative", height, overflow: "hidden", background: "#111" }}
        >
          <LazyImage
            fill
            src={src}
            alt={`Foto ${i + 1}`}
            whileHover={{ scale: 1.05 }}
            motionTransition={{ type: "spring", stiffness: 120, damping: 22 }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ── Location divider ── */
function LocationDivider() {
  return (
    <div style={{
      height: "2px",
      background: "linear-gradient(to right, transparent, rgba(0,0,0,0.07) 20%, rgba(0,0,0,0.07) 80%, transparent)",
      margin: "0",
    }} />
  );
}

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
export function InfraestrutrasPage() {
  const { t } = useLang();

  useSEO({
    title: "As Nossas Instalações em Angola",
    description: "Conheça as instalações da Gasosa Auto Agro: loja principal em Luanda (Av. 21 de Janeiro), Lubango (Rua Aníbal de Melo) e Huambo (Cidade Baixa). Mais de 13.000 m² em Angola.",
    path: "/infraestruturas",
    breadcrumb: { name: "Infraestruturas", path: "/infraestruturas" },
    schema: [LOCAL_BUSINESS_LUANDA, LOCAL_BUSINESS_LUBANGO, LOCAL_BUSINESS_HUAMBO],
  });

  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);
  const inf = t.infraestruturas;

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroTitleY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOverlayOpacity = useTransform(heroScroll, [0, 0.8], [0.62, 0.82]);

  useEffect(() => {
    function onScroll() {
      setScrolledPast(window.scrollY > window.innerHeight * 0.75);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="w-full flex flex-col" style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* ── Header ── */}
      <NavThemeCtx.Provider value={!scrolledPast}>
        <header
          className="fixed top-0 left-0 right-0 z-50"
          style={{
            background: scrolledPast ? "#ffffff" : "transparent",
            borderBottom: scrolledPast ? "1px solid rgba(0,0,0,0.1)" : "none",
            transition: "background 0.35s ease, border-color 0.35s ease",
          }}
        >
          <div
            className="w-full flex items-center justify-between"
            style={{
              maxWidth: "1600px",
              margin: "0 auto",
              padding: "clamp(12px, 2vh, 22px) clamp(16px, 2vw, 32px)",
            }}
          >
            <Link href="/" className="flex items-center">
              <NavLogo style={{ height: "clamp(32px, 4.5vw, 48px)" }} />
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
              animate={{ color: scrolledPast ? "#111111" : "#ffffff" }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(true)}
              aria-label={t.mobile.openMenu}
            >
              <Menu style={{ width: "clamp(20px, 3vw, 26px)", height: "clamp(20px, 3vw, 26px)" }} />
            </motion.button>
          </div>
        </header>
      </NavThemeCtx.Provider>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* ── Hero ── */}
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
        <img
          src={infraHeroImg}
          alt="Infraestruturas Gasosa Auto Agro"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
        />
        <motion.div style={{ position: "absolute", inset: 0, background: "#000", opacity: heroOverlayOpacity }} />
        {/* top vignette */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "180px", background: "linear-gradient(to bottom,rgba(0,0,0,0.5) 0%,transparent 100%)", zIndex: 2, pointerEvents: "none" }} />

        <motion.div
          style={{
            position: "relative",
            zIndex: 2,
            y: heroTitleY,
            padding: "clamp(32px,5vw,80px) clamp(24px,5vw,80px)",
            paddingBottom: "clamp(60px,9vh,110px)",
            maxWidth: "860px",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ fontSize: "clamp(0.65rem,0.55rem+0.4vw,0.8rem)", fontWeight: 600, color: AMBER, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 14px" }}
          >
            — ESTRUTURA. CAPACIDADE. CONFIANÇA.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 22, delay: 0.15 }}
            style={{ fontSize: "clamp(3rem,1.5rem+7vw,8.5rem)", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 0.93, margin: "0 0 28px" }}
          >
            {inf.hero.label}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
          >
            <p style={{ fontSize: "clamp(0.82rem,0.68rem+0.55vw,1.05rem)", color: "rgba(255,255,255,0.82)", margin: "0 0 6px" }}>
              Infraestruturas ao serviço do crescimento de Angola.
            </p>
            <p style={{ fontSize: "clamp(0.82rem,0.68rem+0.55vw,1.05rem)", color: "rgba(255,255,255,0.5)", margin: 0 }}>
              Logística inteligente. Operações eficientes.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{ position: "absolute", bottom: "clamp(28px,4vh,48px)", left: "50%", transform: "translateX(-50%)", zIndex: 2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom,transparent,rgba(255,255,255,0.5))" }}
          />
        </motion.div>
      </div>

      {/* ══════════════════════════════════════
          01 — LUBANGO
      ══════════════════════════════════════ */}
      <LocationBlock
        index="01"
        tag={inf.featured.tag}
        title={inf.featured.titulo}
        description={inf.featured.descricao}
        stats={[
          { value: "10 000 m²", label: "Área construída" },
          { value: "3", label: "Espaços operacionais" },
          { value: "Huíla", label: "Província" },
        ]}
        delay={0}
      />

      {/* main photo — wide */}
      <motion.div
        variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0}
        style={{ position: "relative", width: "100%", height: isMobile ? "clamp(260px,60vw,420px)" : "clamp(480px,58vh,720px)", overflow: "hidden", background: "#111" }}
      >
        <LazyImage
          fill
          src={infraLubangoExt}
          alt="Instalações Lubango — exterior"
          objectPosition="center"
          whileHover={{ scale: 1.04 }}
          motionTransition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </motion.div>

      {/* 3-photo strip */}
      <PhotoStrip
        srcs={[infraLubangoAerial, infraLubangoInside, infraLubangoWide]}
        cols={3}
        height={isMobile ? "clamp(160px,45vw,260px)" : "clamp(220px,26vh,360px)"}
      />

      <LocationDivider />

      {/* ══════════════════════════════════════
          02 — LUANDA
      ══════════════════════════════════════ */}
      <LocationBlock
        index="02"
        tag={inf.paineis[0].tag}
        title={inf.paineis[0].titulo}
        description={inf.paineis[0].descricao}
        stats={[
          { value: "2 000 m²", label: "Área da loja" },
          { value: "Loja + Oficina", label: "Serviços" },
          { value: "Luanda", label: "Capital" },
        ]}
        delay={0}
      />

      {/* fachada principal — large */}
      <motion.div
        variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0}
        style={{ position: "relative", width: "100%", height: isMobile ? "clamp(260px,60vw,420px)" : "clamp(480px,58vh,720px)", overflow: "hidden", background: "#111" }}
      >
        <LazyImage
          fill
          src={infraLuandaFachada}
          alt="Loja Luanda — fachada"
          objectPosition="center 60%"
          whileHover={{ scale: 1.04 }}
          motionTransition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </motion.div>

      {/* 4-photo loja strip */}
      <PhotoStrip
        srcs={[infraLuandaLoja1, infraLuandaLoja2, infraLuandaLoja3, infraLuandaLoja4]}
        cols={4}
        height={isMobile ? "clamp(150px,42vw,240px)" : "clamp(200px,22vh,300px)"}
      />

      {/* oficina sub-label */}
      <div style={{ background: "#f7f7f7", padding: "clamp(32px,5vw,56px) clamp(24px,6vw,96px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", gap: "20px" }}>
          <span style={{ width: "36px", height: "2px", background: AMBER, display: "inline-block", flexShrink: 0 }} />
          <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.16em", color: "rgba(0,0,0,0.4)", textTransform: "uppercase" as const }}>
            LUANDA · OFICINA DE SERVIÇOS RÁPIDOS
          </span>
        </div>
      </div>

      {/* 3-photo oficina strip */}
      <PhotoStrip
        srcs={[infraLuandaOfic1, infraLuandaOfic2, infraLuandaOfic3]}
        cols={3}
        height={isMobile ? "clamp(180px,50vw,300px)" : "clamp(220px,28vh,380px)"}
      />

      <LocationDivider />

      {/* ══════════════════════════════════════
          03 — HUAMBO
      ══════════════════════════════════════ */}
      <LocationBlock
        index="03"
        tag={inf.paineis[1].tag}
        title={inf.paineis[1].titulo}
        description={inf.paineis[1].descricao}
        stats={[
          { value: "1 200 m²", label: "Área construída" },
          { value: "Loja + Armazém", label: "Espaços" },
          { value: "Planalto Central", label: "Região" },
        ]}
        delay={0}
      />

      {/* Huambo single photo */}
      <motion.div
        variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0}
        style={{ position: "relative", width: "100%", height: isMobile ? "clamp(260px,60vw,420px)" : "clamp(440px,52vh,640px)", overflow: "hidden", background: "#111" }}
      >
        <LazyImage
          fill
          src={infraHuamboExt}
          alt="Instalações Huambo"
          objectPosition="center"
          whileHover={{ scale: 1.04 }}
          motionTransition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </motion.div>

      <LocationDivider />

      {/* ══════════════════════════════════════
          FUTURAS INSTALAÇÕES
      ══════════════════════════════════════ */}
      {/* text block — dark */}
      <div style={{
        background: "#0a1628",
        padding: `clamp(64px,10vw,120px) clamp(24px,6vw,96px)`,
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.span
            variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0}
            style={{ display: "inline-block", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", color: AMBER, textTransform: "uppercase" as const, borderBottom: `2px solid ${AMBER}`, paddingBottom: "4px", marginBottom: "28px" }}
          >
            {inf.futuras.tag}
          </motion.span>
          <motion.h2
            variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0.07}
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(2rem,1rem+3.5vw,4.5rem)", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.035em", lineHeight: 1.05, margin: "0 0 clamp(20px,3vw,32px)", maxWidth: "800px" }}
          >
            {inf.futuras.titulo}
          </motion.h2>
          <motion.p
            variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0.13}
            style={{ fontSize: "clamp(0.9rem,0.78rem+0.5vw,1.1rem)", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: 0, maxWidth: "620px" }}
          >
            {inf.futuras.descricao}
          </motion.p>
        </div>
      </div>

      {/* future photo */}
      <motion.div
        variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0}
        style={{ position: "relative", width: "100%", height: isMobile ? "clamp(240px,55vw,380px)" : "clamp(380px,46vh,560px)", overflow: "hidden", background: "#0a1628" }}
      >
        <LazyImage
          fill
          src={infraFuturas}
          alt="Futuras instalações"
          objectPosition="center 40%"
          imgStyle={{ opacity: 0.7 }}
          whileHover={{ scale: 1.04 }}
          motionTransition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </motion.div>

      <Footer />
    </div>
  );
}
