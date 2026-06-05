import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Menu, MapPin } from "lucide-react";
import logoSrc from "@assets/ChatGPT_Image_21_de_mai._de_2026,_12_09_16_1_1779362713859.png";
import { NavThemeCtx } from "../lib/nav-theme";
import { NavPill } from "../components/layout/NavPill";
import { LangDropdown } from "../components/layout/LangDropdown";
import { MobileMenu } from "../components/layout/MobileMenu";
import { Footer } from "../components/layout/Footer";
import { AngolaMap } from "../components/AngolaMap";
import { useLang } from "../i18n";

export function ContactosPage() {
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
  const [mapHeight, setMapHeight] = useState(0);
  const [cardScale, setCardScale] = useState(1);

  const MAP_SVG_W = 612.3866;
  const MAP_SVG_H = 684.8916;
  const MAP_CITIES = [
    { cx: 81,  cy: 228 },
    { cx: 199, cy: 408 },
    { cx: 163, cy: 522 },
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
      setMapHeight(mapRect.height);

      // Dynamic card scale: grow cards when vertical gap between provinces is larger
      const minGapFrac = Math.min(
        (MAP_CITIES[1].cy - MAP_CITIES[0].cy) / MAP_SVG_H,
        (MAP_CITIES[2].cy - MAP_CITIES[1].cy) / MAP_SVG_H,
      );
      const minGapPx = minGapFrac * mapRect.height;
      const scale = Math.max(0.72, Math.min(1.75, minGapPx / 95));
      setCardScale(scale);

      const newLines = MAP_CITIES.map((city, i) => {
        const entry = entryRefs.current[i];
        if (!entry) return null;
        const r = entry.getBoundingClientRect();
        const provinceX = mapRect.left - gridRect.left + (city.cx / MAP_SVG_W) * mapRect.width;
        const provinceY = mapRect.top  - gridRect.top  + (city.cy / MAP_SVG_H) * mapRect.height;
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
  const isDesktop = winW >= 1024;
  const useLines = !isMobile;

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
            <img src={logoSrc} alt="Gasosa Auto Agro" style={{ height: "clamp(38px, 5.5vw, 58px)", width: "auto", objectFit: "contain" }} />
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
      <section style={{ paddingTop: "clamp(140px, 20vh, 220px)", paddingBottom: "clamp(64px, 8vw, 112px)", textAlign: "center", ...PAD }}>
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
          style={{ fontSize: "clamp(2.4rem, 1.4rem + 4.2vw, 5.5rem)", fontWeight: 500, color: "#111111", lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 auto 28px", maxWidth: "900px" }}
        >
          {tc.pageTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 24, delay: 0.16 }}
          style={{ fontSize: "clamp(0.88rem, 0.76rem + 0.5vw, 1.08rem)", color: "rgba(0,0,0,0.52)", lineHeight: 1.65, maxWidth: "540px", margin: "0 auto" }}
        >
          {tc.pageSubtitle}
        </motion.p>
      </section>

      {/* ── Direct contact bar ── */}
      <div style={{ ...WRAP, marginBottom: "clamp(72px, 10vw, 140px)" }}>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{ fontSize: "0.73rem", fontWeight: 500, letterSpacing: "0.13em", color: "rgba(0,0,0,0.36)", textTransform: "uppercase", marginBottom: "20px" }}
        >
          {tc.directLabel}
        </motion.p>

        <div style={{ borderTop: "1.5px solid rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "stretch" }}>
            <motion.a
              href="mailto:geral@cfagasosa.com"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
              style={{
                flex: 1, display: "block", padding: "clamp(24px, 3.5vw, 44px) 0",
                fontSize: "clamp(1.05rem, 0.7rem + 2vw, 2rem)", fontWeight: 500,
                color: "#111111", textDecoration: "none", letterSpacing: "-0.025em",
                borderBottom: isMobile ? "1px solid rgba(0,0,0,0.08)" : "none",
                borderRight: isMobile ? "none" : "1px solid rgba(0,0,0,0.1)",
                transition: "color 0.2s",
              }}
              whileHover={{ color: "#003591" }}
            >
              geral@cfagasosa.com
            </motion.a>

            <motion.a
              href="tel:+244951025435"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              style={{
                flex: isMobile ? "none" : "0 0 auto", display: "block",
                padding: isMobile ? "clamp(20px, 3vw, 36px) 0" : "clamp(24px, 3.5vw, 44px) 0 clamp(24px, 3.5vw, 44px) clamp(28px, 4vw, 56px)",
                fontSize: "clamp(1.05rem, 0.7rem + 2vw, 2rem)", fontWeight: 500,
                color: "#111111", textDecoration: "none", letterSpacing: "-0.025em", transition: "color 0.2s",
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

        {/* ─ Mobile: map full-width at top, then title + contact list ─ */}
        {isMobile && (
          <div style={{ paddingLeft: "clamp(20px, 5vw, 40px)", paddingRight: "clamp(20px, 5vw, 40px)", maxWidth: "1400px", margin: "0 auto" }}>
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginBottom: "clamp(32px, 6vw, 52px)" }}
            >
              <AngolaMap />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ marginBottom: "clamp(24px, 4vw, 36px)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "rgba(0,0,0,0.45)", letterSpacing: "0.04em" }}>{tc.locationsLabel}</span>
                <span style={{ fontSize: "0.8rem", color: "rgba(0,0,0,0.3)" }}>↓</span>
              </div>
              <h2 style={{ fontSize: "clamp(1.7rem, 7vw, 2.6rem)", fontWeight: 500, lineHeight: 1.1, color: "#1a1a2e", margin: 0, whiteSpace: "pre-line" }}>
                {tc.locationsTitle}
              </h2>
            </motion.div>

            {/* Contacts list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(22px, 5vw, 32px)" }}>
              {tc.locations.map((loc, i) => (
                <motion.div
                  key={loc.city}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewport}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                  style={{ display: "flex", alignItems: "flex-start", gap: "10px", paddingBottom: "clamp(20px, 5vw, 28px)", borderBottom: i < tc.locations.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none" }}
                >
                  <div style={{ flexShrink: 0, marginTop: "3px" }}>
                    <MapPin size={18} style={{ color: "#F5A000", display: "block" }} fill="#F5A000" strokeWidth={1} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "clamp(1.1rem, 5vw, 1.4rem)", fontWeight: 700, color: "#111111", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 5px" }}>
                      {loc.city.toUpperCase()}
                    </h3>
                    <p style={{ fontSize: "0.8rem", color: "rgba(0,0,0,0.42)", margin: "0 0 4px", display: "flex", alignItems: "center", gap: "5px" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#F5A000", display: "inline-block", flexShrink: 0 }} />
                      {loc.address}
                    </p>
                    {(loc.phones as readonly string[]).map((phone) => (
                      <p key={phone} style={{ fontSize: "0.85rem", color: "#111111", margin: "2px 0", fontWeight: 500 }}>{phone}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ─ Tablet & Desktop: contacts + map side-by-side with lines ─ */}
        {!isMobile && (
          <div style={{ maxWidth: "1400px", margin: "0 auto", paddingLeft: "clamp(20px, 5vw, 80px)", paddingRight: "clamp(20px, 5vw, 80px)" }}>

            {/* Title above grid on tablet; inline on desktop */}
            {isTablet && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ marginBottom: "clamp(28px, 4vw, 44px)" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 500, color: "rgba(0,0,0,0.45)", letterSpacing: "0.04em" }}>{tc.locationsLabel}</span>
                  <span style={{ fontSize: "0.82rem", color: "rgba(0,0,0,0.3)" }}>↓</span>
                </div>
                <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 500, lineHeight: 1.1, color: "#1a1a2e", margin: 0, whiteSpace: "pre-line" }}>
                  {tc.locationsTitle}
                </h2>
              </motion.div>
            )}

            {/* Grid: [title col on desktop] [contacts col] [map col] */}
            <div
              ref={locationsGridRef}
              style={{
                display: "grid",
                gridTemplateColumns: isDesktop
                  ? "clamp(160px, 18vw, 260px) clamp(180px, 22vw, 300px) 1fr"
                  : "clamp(160px, 30vw, 280px) 1fr",
                gap: isDesktop ? "clamp(20px, 2.5vw, 36px)" : "clamp(16px, 2.5vw, 32px)",
                alignItems: "start",
                position: "relative",
              }}
            >
              {/* Desktop title column */}
              {isDesktop && (
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewport}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "clamp(14px, 1.8vw, 24px)" }}
                  >
                    <span style={{ fontSize: "0.78rem", fontWeight: 500, color: "rgba(0,0,0,0.5)", letterSpacing: "0.04em" }}>{tc.locationsLabel}</span>
                    <span style={{ fontSize: "0.82rem", color: "rgba(0,0,0,0.35)" }}>↓</span>
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewport}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ fontSize: "clamp(1.8rem, 2.4vw, 3rem)", fontWeight: 500, lineHeight: 1.1, color: "#1a1a2e", margin: 0, whiteSpace: "pre-line" }}
                  >
                    {tc.locationsTitle}
                  </motion.h2>
                </div>
              )}

              {/* Contacts column — absolutely positioned, font scales with available gap */}
              <div style={{
                position: "relative",
                height: mapHeight > 0 ? `${mapHeight}px` : "auto",
              }}>
                {tc.locations.map((loc, i) => {
                  const topPct = MAP_CITIES[i].cy / MAP_SVG_H * 100;
                  const isAbsolute = mapHeight > 0;

                  // Base sizes × cardScale so content grows with available space
                  const baseCity    = isTablet ? 13   : 16;
                  const baseAddress = isTablet ? 10.5 : 12;
                  const basePhone   = isTablet ? 11   : 13;
                  const baseIcon    = isTablet ? 14   : 18;
                  const baseGap     = isTablet ? 8    : 10;
                  const baseDot     = isTablet ? 4    : 5;

                  const sz = (base: number) => `${(base * cardScale).toFixed(1)}px`;

                  return (
                    <motion.div
                      key={loc.city}
                      ref={(el: HTMLDivElement | null) => { entryRefs.current[i] = el; }}
                      initial={{ opacity: 0, x: -24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={viewport}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
                      style={{
                        position: isAbsolute ? "absolute" : "relative",
                        top: isAbsolute ? `${topPct}%` : "auto",
                        transform: isAbsolute ? "translateY(-50%)" : "none",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: sz(baseGap),
                      }}
                    >
                      <div style={{ flexShrink: 0, marginTop: "3px" }}>
                        <MapPin
                          size={Math.round(baseIcon * cardScale)}
                          style={{ color: "#F5A000", display: "block" }}
                          fill="#F5A000"
                          strokeWidth={1}
                        />
                      </div>
                      <div>
                        <h3 style={{
                          fontSize: sz(baseCity),
                          fontWeight: 700,
                          color: "#111111",
                          letterSpacing: "-0.02em",
                          lineHeight: 1.1,
                          margin: `0 0 ${sz(baseGap * 0.5)}`,
                        }}>
                          {loc.city.toUpperCase()}
                        </h3>
                        <p style={{
                          fontSize: sz(baseAddress),
                          color: "rgba(0,0,0,0.42)",
                          margin: `0 0 ${sz(baseDot)}`,
                          display: "flex",
                          alignItems: "center",
                          gap: sz(baseDot),
                        }}>
                          <span style={{
                            width: sz(baseDot),
                            height: sz(baseDot),
                            borderRadius: "50%",
                            background: "#F5A000",
                            display: "inline-block",
                            flexShrink: 0,
                          }} />
                          {loc.address}
                        </p>
                        {(loc.phones as readonly string[]).map((phone) => (
                          <p key={phone} style={{
                            fontSize: sz(basePhone),
                            color: "#111111",
                            margin: `${sz(2)} 0`,
                            fontWeight: 500,
                          }}>
                            {phone}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Map column */}
              <div ref={mapDivRef}>
                <AngolaMap />
              </div>

              {/* Connector lines — horizontal dashed */}
              {connectorLines.length > 0 && (
                <svg
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}
                  aria-hidden="true"
                >
                  {connectorLines.map((line, i) => (
                    <line
                      key={i}
                      x1={line.x1} y1={line.y1}
                      x2={line.x2} y2={line.y2}
                      stroke="#F5A000"
                      strokeWidth={isTablet ? "1.2" : "1.5"}
                      strokeDasharray="5 4"
                      strokeOpacity="0.7"
                    />
                  ))}
                </svg>
              )}
            </div>
          </div>
        )}
      </section>

      {/* ── Contact form ── */}
      <section style={{ background: "#111111", paddingTop: "clamp(64px, 9vw, 120px)", paddingBottom: "clamp(64px, 9vw, 120px)" }}>
        <div
          style={{
            ...WRAP,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "clamp(40px, 8vw, 64px)" : "clamp(40px, 6vw, 96px)",
            alignItems: "start",
          }}
        >
          {/* Left */}
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
              style={{ fontSize: "clamp(1.6rem, 1rem + 2.8vw, 3.2rem)", fontWeight: 500, color: "#ffffff", lineHeight: 1.12, letterSpacing: "-0.03em", margin: "0 0 clamp(24px, 3vw, 40px)" }}
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
                href="mailto:geral@cfagasosa.com"
                style={{ display: "flex", alignItems: "center", gap: "12px", color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: "clamp(0.82rem, 0.75rem + 0.3vw, 0.95rem)", transition: "color 0.2s" }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#ffffff")}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)")}
              >
                <span style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✉</span>
                geral@cfagasosa.com
              </a>
              <a
                href="tel:+244951025435"
                style={{ display: "flex", alignItems: "center", gap: "12px", color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: "clamp(0.82rem, 0.75rem + 0.3vw, 0.95rem)", transition: "color 0.2s" }}
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
              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "16px", padding: "clamp(32px, 5vw, 64px)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", minHeight: "320px", justifyContent: "center" }}>
                <span style={{ fontSize: "2.4rem" }}>✓</span>
                <p style={{ color: "#ffffff", fontWeight: 500, fontSize: "clamp(1rem, 0.85rem + 0.6vw, 1.2rem)", margin: 0, lineHeight: 1.5 }}>
                  {tc.formSuccess}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "14px" }}>
                  <input
                    type="text" required placeholder={tc.namePlaceholder}
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={{ ...inputStyle, background: "rgba(255,255,255,0.92)", color: "#111111" }}
                    onFocus={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.background = "rgba(255,255,255,0.98)"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.background = "rgba(255,255,255,0.92)"; }}
                  />
                  <input
                    type="email" required placeholder={tc.emailPlaceholder}
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={{ ...inputStyle, background: "rgba(255,255,255,0.92)", color: "#111111" }}
                    onFocus={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.background = "rgba(255,255,255,0.98)"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.background = "rgba(255,255,255,0.92)"; }}
                  />
                </div>

                <input
                  type="text" required placeholder={tc.subjectPlaceholder}
                  value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  style={{ ...inputStyle, background: "rgba(255,255,255,0.92)", color: "#111111" }}
                  onFocus={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.background = "rgba(255,255,255,0.98)"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.background = "rgba(255,255,255,0.92)"; }}
                />

                <textarea
                  required rows={5} placeholder={tc.messagePlaceholder}
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ ...inputStyle, background: "rgba(255,255,255,0.92)", color: "#111111", resize: "vertical", minHeight: "120px" }}
                  onFocus={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.background = "rgba(255,255,255,0.98)"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.background = "rgba(255,255,255,0.92)"; }}
                />

                <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", margin: "0" }}>
                  {tc.privacyText}{" "}
                  <a href="#" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "underline" }}>{tc.privacyLink}</a>.
                </p>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  style={{
                    width: "100%", padding: "clamp(14px, 2vw, 18px) 0",
                    borderRadius: "10px", background: "#003591",
                    color: "#ffffff", fontSize: "clamp(0.85rem, 0.78rem + 0.3vw, 0.98rem)",
                    fontWeight: 600, letterSpacing: "0.04em", border: "none", cursor: "pointer",
                    fontFamily: "'Poppins', sans-serif", marginTop: "4px",
                  }}
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
