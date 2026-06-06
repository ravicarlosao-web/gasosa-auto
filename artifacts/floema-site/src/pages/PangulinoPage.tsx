import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { Menu, MapPin } from "lucide-react";
import { NavLogo } from "../components/layout/NavLogo";
import heroImg      from "@assets/pangulino-hero-optimized.jpg";
import pangLogoImg  from "@assets/image_1780664916930.png";
import { LazyImage } from "../components/ui/lazy-image";
import { NavThemeCtx, NavAccentCtx } from "../lib/nav-theme";
import { NavPill }    from "../components/layout/NavPill";
import { LangDropdown } from "../components/layout/LangDropdown";
import { MobileMenu }  from "../components/layout/MobileMenu";
import { Footer }      from "../components/layout/Footer";
import { FADE_UP }     from "../lib/motion-variants";
import { useLang }     from "../i18n";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSEO, PANGULINO_PRODUCT_SCHEMA } from "../lib/use-seo";

const GREEN  = "#2D7A22";
const AMBER  = "#F5A000";
const NAVY   = "#003591";
const CREAM  = "#F5EFE9";
const DARK   = "#0a1628";

const viewport = { once: false, amount: 0.18 } as const;

const PRODUCT_ICONS = [
  /* Lavoura — shovel */
  <svg key="a" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 22l10-10" /><path d="M16 8c1.5-1.5 4-1.5 5.5 0s1.5 4 0 5.5L12 23l-9-9 9.5-9.5c.5-.5 1.2-.7 1.9-.7" />
    <path d="M15 9l-6 6" />
  </svg>,
  /* Irrigação — droplet */
  <svg key="b" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  </svg>,
  /* Colheita — wheat */
  <svg key="c" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 22 16 8" /><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z" />
    <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z" />
    <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z" />
    <path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4z" />
    <path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0z" />
  </svg>,
];

export function PangulinoPage() {
  const { t } = useLang();

  useSEO({
    title: "Ferramentas Agrícolas Pangulino — Força e Precisão no Campo Angolano",
    description: "Pangulino — a principal marca angolana de ferramentas agrícolas. Enxadas, pás, ancas, carrinhos de mão e mais. Disponível nas lojas Gasosa em Luanda, Lubango e Huambo.",
    path: "/pangulino",
    breadcrumb: { name: "Pangulino", path: "/pangulino" },
    schema: [PANGULINO_PRODUCT_SCHEMA],
  });
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const p = t.pangulino;

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroTitleY         = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOverlayOpacity = useTransform(heroScroll, [0, 0.8], [0.62, 0.88]);

  const STATS = [
    { value: "3", label: isMobile ? "Províncias" : "Províncias cobertas" },
    { value: "20+", label: isMobile ? "Produtos" : "Produtos na gama" },
    { value: "100%", label: isMobile ? "Angola" : "Desenvolvido para Angola" },
  ];

  return (
    <div className="w-full flex flex-col" style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* ── Header ── */}
      <NavAccentCtx.Provider value="#2D7A22">
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
            <NavLogo style={{ height: "clamp(42px, 6vw, 66px)" }} />
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
      </NavAccentCtx.Provider>

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
          background: DARK,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
        }}
      >
        <img
          src={heroImg}
          alt="Pangulino — campo angolano"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 35%",
            filter: "saturate(0.7)",
          }}
        />
        {/* Green tint overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(45,122,34,0.35) 0%, transparent 60%)", zIndex: 1 }} />
        <motion.div style={{ position: "absolute", inset: 0, background: "#000", opacity: heroOverlayOpacity, zIndex: 1 }} />

        <motion.div
          style={{
            position: "relative",
            zIndex: 2,
            y: heroTitleY,
            padding: "clamp(32px, 5vw, 80px) clamp(20px, 5vw, 80px)",
            paddingBottom: "clamp(60px, 9vh, 110px)",
            maxWidth: "900px",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              fontSize: "clamp(0.65rem, 0.55rem + 0.4vw, 0.8rem)",
              fontWeight: 600, color: GREEN, letterSpacing: "0.18em",
              textTransform: "uppercase", margin: "0 0 14px",
            }}
          >
            {p.hero.supra}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 22, delay: 0.15 }}
            style={{
              fontSize: "clamp(4.5rem, 2rem + 12vw, 14rem)",
              fontWeight: 700, color: "#ffffff",
              letterSpacing: "-0.04em", lineHeight: 0.88,
              margin: "0 0 32px",
            }}
          >
            {p.hero.heading}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
          >
            <p style={{ fontSize: "clamp(0.88rem, 0.72rem + 0.6vw, 1.1rem)", fontWeight: 500, color: "rgba(255,255,255,0.88)", letterSpacing: "0.01em", margin: "0 0 6px" }}>
              {p.hero.sub1}
            </p>
            <p style={{ fontSize: "clamp(0.82rem, 0.68rem + 0.5vw, 1rem)", fontWeight: 400, color: "rgba(255,255,255,0.52)", letterSpacing: "0.01em", margin: 0 }}>
              {p.hero.sub2}
            </p>
          </motion.div>
        </motion.div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          style={{ position: "absolute", bottom: "clamp(28px, 4vh, 48px)", left: "50%", transform: "translateX(-50%)", zIndex: 2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.45))" }}
          />
        </motion.div>
      </div>

      {/* ── Manifesto — split layout ── */}
      <div style={{
        background: CREAM,
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        minHeight: isMobile ? "auto" : "540px",
      }}>
        {/* Text */}
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          custom={0}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: isMobile
              ? "clamp(48px, 10vw, 72px) clamp(24px, 6vw, 48px)"
              : "clamp(64px, 8vw, 100px) clamp(40px, 5.5vw, 80px) clamp(64px, 8vw, 100px) clamp(28px, 5vw, 72px)",
          }}
        >
          <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", color: GREEN, display: "block", marginBottom: "16px" }}>
            {p.manifesto.tag}
          </span>
          <h2 style={{
            fontSize: "clamp(1.8rem, 1rem + 3vw, 3.5rem)",
            fontWeight: 600, color: "#111111",
            letterSpacing: "-0.03em", lineHeight: 1.08,
            margin: "0 0 28px",
            whiteSpace: "pre-line",
          }}>
            {p.manifesto.heading}
          </h2>
          <p style={{ fontSize: "clamp(0.88rem, 0.78rem + 0.38vw, 1rem)", color: "rgba(0,0,0,0.62)", lineHeight: 1.78, margin: "0 0 18px" }}>
            {p.manifesto.body1}
          </p>
          <p style={{ fontSize: "clamp(0.88rem, 0.78rem + 0.38vw, 1rem)", color: "rgba(0,0,0,0.62)", lineHeight: 1.78, margin: "0 0 32px" }}>
            {p.manifesto.body2}
          </p>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em",
            color: GREEN,
          }}>
            <span style={{ width: "28px", height: "2px", background: GREEN, display: "inline-block" }} />
            {p.manifesto.badge}
          </span>
        </motion.div>

        {/* Image */}
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          custom={0.12}
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: isMobile ? "280px" : "auto",
            background: "#d4e8d0",
          }}
        >
          <LazyImage
            fill
            src={pangLogoImg}
            alt="Pangulino — marca própria"
            objectPosition="center"
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to left, transparent 50%, rgba(245,239,233,0.18) 100%)",
          }} />
        </motion.div>
      </div>

      {/* ── Stats strip ── */}
      <div style={{
        background: NAVY,
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : `repeat(${STATS.length}, 1fr)`,
      }}>
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            custom={i * 0.1}
            style={{
              padding: isMobile
                ? `clamp(20px, 3.5vh, 32px) clamp(20px, 5vw, 40px)`
                : `clamp(28px, 5vh, 52px) clamp(16px, 3vw, 40px)`,
              borderRight: !isMobile && i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none",
              borderBottom: isMobile && i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "16px" : "0",
              justifyContent: isMobile ? "flex-start" : "center",
              flexDirection: isMobile ? "row" : "column",
            }}
          >
            <div style={{
              fontSize: isMobile ? "clamp(1.8rem, 6vw, 2.6rem)" : "clamp(2.2rem, 1rem + 4vw, 4.5rem)",
              fontWeight: 700, color: AMBER,
              letterSpacing: "-0.04em", lineHeight: 1,
              margin: isMobile ? "0" : "0 0 8px",
              flexShrink: 0,
            }}>
              {s.value}
            </div>
            <div style={{
              fontSize: "clamp(0.68rem, 0.58rem + 0.38vw, 0.82rem)",
              fontWeight: 500, color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.08em", textTransform: "uppercase",
              textAlign: isMobile ? "left" : "center",
            }}>
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Produto categories ── */}
      <div style={{ background: "#111111" }}>
        <div style={{ padding: "clamp(48px, 7vh, 80px) clamp(20px, 5vw, 80px) clamp(24px, 4vh, 48px)", maxWidth: "1200px", margin: "0 auto" }}>
          <motion.span
            variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0}
            style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", color: GREEN, marginBottom: "14px" }}
          >
            {p.produtos.tag}
          </motion.span>
          <motion.h2
            variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0.06}
            style={{ fontSize: "clamp(1.8rem, 1rem + 2.8vw, 3.2rem)", fontWeight: 600, color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 48px" }}
          >
            {p.produtos.heading}
          </motion.h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: "2px",
          paddingBottom: "2px",
        }}>
          {p.produtos.items.map((item, i) => (
            <motion.div
              key={i}
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              custom={i * 0.1}
              style={{
                background: i === 1 ? "#1a1a1a" : "#141414",
                padding: "clamp(36px, 5vw, 56px) clamp(24px, 4vw, 48px)",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                borderTop: `3px solid ${i === 0 ? GREEN : i === 1 ? AMBER : NAVY}`,
              }}
            >
              <div style={{ color: i === 0 ? GREEN : i === 1 ? AMBER : "#5a8fd4" }}>
                {PRODUCT_ICONS[i]}
              </div>
              <h3 style={{
                fontSize: "clamp(1.2rem, 0.9rem + 1.2vw, 1.7rem)",
                fontWeight: 600, color: "#ffffff",
                letterSpacing: "-0.02em", lineHeight: 1.15, margin: 0,
              }}>
                {item.name}
              </h3>
              <p style={{
                fontSize: "clamp(0.82rem, 0.72rem + 0.35vw, 0.95rem)",
                color: "rgba(255,255,255,0.6)", lineHeight: 1.78, margin: 0,
                flex: 1,
              }}>
                {item.desc}
              </p>
              <div style={{
                fontSize: "0.7rem", fontWeight: 600,
                letterSpacing: "0.06em",
                color: i === 0 ? GREEN : i === 1 ? AMBER : "#5a8fd4",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                paddingTop: "18px",
              }}>
                {item.detalhe}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Pilares ── */}
      <div style={{ background: CREAM, padding: "clamp(64px, 10vh, 100px) clamp(20px, 5vw, 80px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.span
            variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0}
            style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", color: GREEN, marginBottom: "14px" }}
          >
            {p.pilares.tag}
          </motion.span>
          <motion.h2
            variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0.06}
            style={{ fontSize: "clamp(1.8rem, 1rem + 2.8vw, 3.2rem)", fontWeight: 600, color: "#111111", letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 clamp(40px, 7vh, 68px)" }}
          >
            {p.pilares.heading}
          </motion.h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? "32px" : "clamp(32px, 5vw, 64px)",
          }}>
            {p.pilares.items.map((item, i) => (
              <motion.div
                key={i}
                variants={FADE_UP}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                custom={i * 0.12}
              >
                <div style={{
                  fontSize: "clamp(3rem, 1.5rem + 4vw, 5.5rem)",
                  fontWeight: 700, color: "rgba(0,0,0,0.07)",
                  letterSpacing: "-0.06em", lineHeight: 1,
                  margin: "0 0 20px",
                }}>
                  {item.num}
                </div>
                <div style={{ width: "36px", height: "3px", background: GREEN, marginBottom: "20px", borderRadius: "2px" }} />
                <h3 style={{
                  fontSize: "clamp(1.05rem, 0.85rem + 0.8vw, 1.35rem)",
                  fontWeight: 600, color: "#111111",
                  letterSpacing: "-0.02em", lineHeight: 1.25, margin: "0 0 14px",
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: "clamp(0.82rem, 0.72rem + 0.32vw, 0.93rem)",
                  color: "rgba(0,0,0,0.55)", lineHeight: 1.78, margin: 0,
                }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Presença nacional ── */}
      <div style={{
        background: DARK,
        padding: "clamp(56px, 8vh, 90px) clamp(20px, 5vw, 80px)",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? "36px" : "clamp(40px, 6vw, 80px)",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
      }}>
        <motion.div
          variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0}
        >
          <span style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", color: GREEN, marginBottom: "16px" }}>
            {p.presenca.tag}
          </span>
          <h2 style={{
            fontSize: "clamp(1.6rem, 0.9rem + 2.5vw, 3rem)",
            fontWeight: 600, color: "#ffffff",
            letterSpacing: "-0.025em", lineHeight: 1.1, margin: "0 0 20px",
          }}>
            {p.presenca.heading}
          </h2>
          <p style={{
            fontSize: "clamp(0.84rem, 0.74rem + 0.36vw, 0.97rem)",
            color: "rgba(255,255,255,0.58)", lineHeight: 1.78, margin: 0,
          }}>
            {p.presenca.desc}
          </p>
        </motion.div>

        <motion.div
          variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0.12}
          style={{ display: "flex", flexDirection: "column", gap: "18px", justifyContent: "center" }}
        >
          {p.presenca.pontos.map((pt, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{
                width: "36px", height: "36px",
                borderRadius: "50%",
                background: "rgba(45,122,34,0.18)",
                border: "1px solid rgba(45,122,34,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <MapPin size={16} style={{ color: GREEN }} fill="none" strokeWidth={2} />
              </div>
              <span style={{
                fontSize: "clamp(0.88rem, 0.78rem + 0.36vw, 1rem)",
                fontWeight: 500, color: "rgba(255,255,255,0.82)",
              }}>
                {pt}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
      <div style={{ background: DARK, height: "1px" }} />

      {/* ── CTA ── */}
      <div style={{
        background: `linear-gradient(135deg, ${GREEN} 0%, #1a5212 100%)`,
        padding: "clamp(64px, 10vh, 100px) clamp(20px, 5vw, 80px)",
        display: "flex",
        flexDirection: "column",
        alignItems: isMobile ? "flex-start" : "center",
        textAlign: isMobile ? "left" : "center",
      }}>
        <motion.h2
          variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0}
          style={{
            fontSize: "clamp(2rem, 1rem + 4vw, 5rem)",
            fontWeight: 700, color: "#ffffff",
            letterSpacing: "-0.04em", lineHeight: 1.05,
            margin: "0 0 20px",
            whiteSpace: "pre-line",
            maxWidth: "800px",
          }}
        >
          {p.cta.heading}
        </motion.h2>
        <motion.p
          variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0.1}
          style={{
            fontSize: "clamp(0.88rem, 0.78rem + 0.38vw, 1.05rem)",
            color: "rgba(255,255,255,0.72)", lineHeight: 1.75,
            margin: "0 0 36px", maxWidth: "520px",
          }}
        >
          {p.cta.body}
        </motion.p>
        <motion.div
          variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0.18}
        >
          <Link
            href="/contactos"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "clamp(13px, 2vh, 18px) clamp(28px, 4vw, 44px)",
              background: "#ffffff",
              color: GREEN,
              fontWeight: 700,
              fontSize: "clamp(0.82rem, 0.72rem + 0.35vw, 0.95rem)",
              letterSpacing: "0.06em",
              textDecoration: "none",
              borderRadius: "4px",
              transition: "opacity 0.2s",
            }}
          >
            {p.cta.btn}
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
