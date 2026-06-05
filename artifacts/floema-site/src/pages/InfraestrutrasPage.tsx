import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { Menu } from "lucide-react";
import logoSrc from "@assets/Design_sem_nome_1780699641133.png";
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
  const inf = t.infraestruturas;

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
            <img
              src={logoSrc}
              alt="Gasosa Auto Agro"
              style={{ height: "clamp(42px, 6vw, 66px)", width: "auto", objectFit: "contain" }}
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
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(0.65rem, 0.55rem + 0.4vw, 0.8rem)", fontWeight: 600, color: "#F5A000", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 14px" }}
          >
            — ESTRUTURA. CAPACIDADE. CONFIANÇA.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 22, delay: 0.15 }}
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(3rem, 1.5rem + 7vw, 8.5rem)", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 0.93, margin: "0 0 28px" }}
          >
            {inf.hero.label}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
          >
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(0.82rem, 0.68rem + 0.55vw, 1.05rem)", fontWeight: 400, color: "rgba(255,255,255,0.82)", letterSpacing: "0.01em", margin: "0 0 6px" }}>
              Infraestruturas ao serviço do crescimento de Angola.
            </p>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(0.82rem, 0.68rem + 0.55vw, 1.05rem)", fontWeight: 400, color: "rgba(255,255,255,0.55)", letterSpacing: "0.01em", margin: 0 }}>
              Logística inteligente. Operações eficientes.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{ position: "absolute", bottom: "clamp(28px, 4vh, 48px)", left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.5))" }}
          />
        </motion.div>
      </div>

      {/* ── Featured — Lubango ── */}
      <div style={{ position: "relative", width: "100%", height: "clamp(480px, 65vh, 800px)", overflow: "hidden", background: "#111c2b" }}>
        <LazyImage
          fill
          src={infraLubangoExt}
          alt="Instalações Lubango"
          objectPosition="center"
          whileHover={{ scale: 1.04 }}
          motionTransition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.28) 50%, transparent 100%)", zIndex: 1 }} />
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          custom={0}
          style={{ position: "absolute", bottom: "clamp(32px, 5vh, 64px)", left: "clamp(20px, 5vw, 80px)", zIndex: 2, maxWidth: "560px" }}
        >
          <span style={{ display: "inline-block", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.5)", marginBottom: "12px" }}>
            {inf.featured.tag}
          </span>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.6rem, 1rem + 2.5vw, 3rem)", fontWeight: 600, color: "#ffffff", letterSpacing: "-0.025em", lineHeight: 1.1, margin: "0 0 16px" }}>
            {inf.featured.titulo}
          </h2>
          <p style={{ fontSize: "clamp(0.85rem, 0.75rem + 0.4vw, 1rem)", color: "rgba(255,255,255,0.65)", lineHeight: 1.65, margin: "0 0 24px" }}>
            {inf.featured.descricao}
          </p>
        </motion.div>
      </div>

      {/* ── Strip Lubango (3 fotos) ── */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", width: "100%", gap: "2px" }}>
        {[infraLubangoAerial, infraLubangoInside, infraLubangoWide].map((src, i) => (
          <motion.div
            key={i}
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            custom={i * 0.08}
            style={{ position: "relative", height: isMobile ? "clamp(180px, 55vw, 320px)" : "clamp(200px, 28vh, 380px)", overflow: "hidden", background: "#111" }}
          >
            <LazyImage
              fill
              src={src}
              alt={`Lubango ${i + 1}`}
              whileHover={{ scale: 1.06 }}
              motionTransition={{ type: "spring", stiffness: 120, damping: 22 }}
            />
          </motion.div>
        ))}
      </div>

      {/* ── Featured — Luanda fachada ── */}
      <div style={{ position: "relative", width: "100%", height: "clamp(480px, 65vh, 800px)", overflow: "hidden", background: "#0d1520" }}>
        <LazyImage
          fill
          src={infraLuandaFachada}
          alt="Loja Luanda — fachada"
          objectPosition="center 60%"
          whileHover={{ scale: 1.04 }}
          motionTransition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.15) 100%)", zIndex: 1 }} />
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          custom={0}
          style={{ position: "absolute", bottom: "clamp(32px, 5vh, 64px)", left: "clamp(20px, 5vw, 80px)", zIndex: 2, maxWidth: "560px" }}
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

      {/* ── Strip Luanda loja (4 fotos) ── */}
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
            <LazyImage
              fill
              src={src}
              alt={`Luanda loja ${i + 1}`}
              whileHover={{ scale: 1.07 }}
              motionTransition={{ type: "spring", stiffness: 120, damping: 22 }}
            />
          </motion.div>
        ))}
      </div>

      {/* ── Strip Luanda oficina (3 fotos) ── */}
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
            <LazyImage
              fill
              src={src}
              alt={`Luanda oficina ${i + 1}`}
              whileHover={{ scale: 1.06 }}
              motionTransition={{ type: "spring", stiffness: 120, damping: 22 }}
            />
          </motion.div>
        ))}
      </div>

      {/* ── Huambo ── */}
      <motion.div
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        custom={0}
        style={{ position: "relative", width: "100%", height: "clamp(400px, 55vh, 680px)", overflow: "hidden", background: "#111" }}
      >
        <LazyImage
          fill
          src={infraHuamboExt}
          alt="Instalações Huambo"
          objectPosition="center"
          whileHover={{ scale: 1.04 }}
          motionTransition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)", zIndex: 1 }} />
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          custom={0.1}
          style={{ position: "absolute", bottom: "clamp(28px, 4.5vh, 52px)", left: "clamp(20px, 4vw, 52px)", zIndex: 2, maxWidth: "500px" }}
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

      {/* ── Futuras instalações ── */}
      <motion.div
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        custom={0}
        style={{ position: "relative", width: "100%", height: "clamp(420px, 55vh, 680px)", overflow: "hidden", background: "#0a1628" }}
      >
        <LazyImage
          fill
          src={infraFuturas}
          alt="Futuras instalações"
          objectPosition="center 40%"
          imgStyle={{ opacity: 0.65 }}
          whileHover={{ scale: 1.04 }}
          motionTransition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.5) 50%, rgba(10,22,40,0.3) 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", bottom: "clamp(40px, 6vh, 80px)", left: "clamp(20px, 5vw, 80px)", zIndex: 2, maxWidth: "600px" }}>
          <span style={{ display: "inline-block", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)", marginBottom: "14px" }}>
            {inf.futuras.tag}
          </span>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.8rem, 1rem + 3vw, 3.5rem)", fontWeight: 500, color: "#ffffff", letterSpacing: "-0.025em", lineHeight: 1.05, margin: "0 0 20px" }}>
            {inf.futuras.titulo}
          </h2>
          <p style={{ fontSize: "clamp(0.85rem, 0.75rem + 0.4vw, 1rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0 }}>
            {inf.futuras.descricao}
          </p>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}
