import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Menu, MapPin } from "lucide-react";
import { NavLogo } from "../components/layout/NavLogo";
import { NavThemeCtx } from "../lib/nav-theme";
import { NavPill } from "../components/layout/NavPill";
import { LangDropdown } from "../components/layout/LangDropdown";
import { MobileMenu } from "../components/layout/MobileMenu";
import { Footer } from "../components/layout/Footer";
import { AngolaMap } from "../components/AngolaMap";
import { useLang } from "../i18n";
import { useSEO, LOCAL_BUSINESS_LUANDA, LOCAL_BUSINESS_LUBANGO, LOCAL_BUSINESS_HUAMBO } from "../lib/use-seo";

export function ContactosPage() {
  const { t } = useLang();

  useSEO({
    title: "Fale Connosco — Estamos em Luanda, Lubango e Huambo",
    description: "Entre em contacto com a Gasosa Auto Agro. Luanda: 951 025 435 · Lubango: 926 445 508 · Huambo: 941 066 420. Email: geral@cfagasosa.com.",
    path: "/contactos",
    breadcrumb: { name: "Contactos", path: "/contactos" },
    schema: [LOCAL_BUSINESS_LUANDA, LOCAL_BUSINESS_LUBANGO, LOCAL_BUSINESS_HUAMBO],
  });

  const tc = t.contactos;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [winW, setWinW] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1280));
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = winW < 640;

  const viewport = { once: true, amount: 0.12 } as const;
  const PAD = { paddingLeft: "clamp(20px, 5vw, 80px)", paddingRight: "clamp(20px, 5vw, 80px)" };
  const WRAP = { maxWidth: "1400px", margin: "0 auto", ...PAD };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setFormError(false);
    try {
      const res = await fetch(
        `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message,
          }),
        }
      );
      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormError(true);
      }
    } catch {
      setFormError(true);
    } finally {
      setSending(false);
    }
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
            <NavLogo style={{ height: "clamp(38px, 5.5vw, 58px)" }} />
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
        <div style={{ maxWidth: "1400px", margin: "0 auto", paddingLeft: "clamp(20px, 5vw, 80px)", paddingRight: "clamp(20px, 5vw, 80px)" }}>

          {/* Mobile: map on top, title + cards below */}
          {isMobile ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ marginBottom: "clamp(32px, 6vw, 48px)" }}
              >
                <AngolaMap />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ marginBottom: "clamp(24px, 4vw, 36px)" }}
              >
                <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "rgba(0,0,0,0.45)", letterSpacing: "0.04em", display: "block", marginBottom: "10px" }}>{tc.locationsLabel}</span>
                <h2 style={{ fontSize: "clamp(1.7rem, 7vw, 2.6rem)", fontWeight: 500, lineHeight: 1.1, color: "#1a1a2e", margin: 0 }}>
                  {tc.locationsTitle}
                </h2>
              </motion.div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {tc.locations.map((loc, i) => (
                  <motion.div
                    key={loc.city}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewport}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      padding: "clamp(18px, 4vw, 24px) 0",
                      borderBottom: i < tc.locations.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
                    }}
                  >
                    <MapPin size={18} style={{ color: "#F5A000", flexShrink: 0, marginTop: "3px" }} fill="#F5A000" strokeWidth={1} />
                    <div>
                      <h3 style={{ fontSize: "clamp(1rem, 4.5vw, 1.25rem)", fontWeight: 700, color: "#111111", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 5px" }}>
                        {loc.city.toUpperCase()}
                      </h3>
                      <p style={{ fontSize: "0.78rem", color: "rgba(0,0,0,0.42)", margin: "0 0 5px", display: "flex", alignItems: "center", gap: "5px" }}>
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
            </>
          ) : (
            /* Tablet & Desktop: [title + cards] | [map] */
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(40px, 6vw, 96px)",
              alignItems: "start",
            }}>
              {/* Left: title + stacked location cards */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ marginBottom: "clamp(28px, 4vw, 44px)" }}
                >
                  <span style={{ fontSize: "0.78rem", fontWeight: 500, color: "rgba(0,0,0,0.45)", letterSpacing: "0.04em", display: "block", marginBottom: "12px" }}>{tc.locationsLabel}</span>
                  <h2 style={{ fontSize: "clamp(1.8rem, 2.6vw, 3.2rem)", fontWeight: 500, lineHeight: 1.1, color: "#1a1a2e", margin: 0 }}>
                    {tc.locationsTitle}
                  </h2>
                </motion.div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  {tc.locations.map((loc, i) => (
                    <motion.div
                      key={loc.city}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={viewport}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "14px",
                        padding: "clamp(20px, 3vw, 28px) 0",
                        borderBottom: i < tc.locations.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
                      }}
                    >
                      <MapPin size={20} style={{ color: "#F5A000", flexShrink: 0, marginTop: "3px" }} fill="#F5A000" strokeWidth={1} />
                      <div>
                        <h3 style={{ fontSize: "clamp(1rem, 1.3vw, 1.3rem)", fontWeight: 700, color: "#111111", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 6px" }}>
                          {loc.city.toUpperCase()}
                        </h3>
                        <p style={{ fontSize: "clamp(0.75rem, 0.85vw, 0.88rem)", color: "rgba(0,0,0,0.42)", margin: "0 0 6px", display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#F5A000", display: "inline-block", flexShrink: 0 }} />
                          {loc.address}
                        </p>
                        {(loc.phones as readonly string[]).map((phone) => (
                          <p key={phone} style={{ fontSize: "clamp(0.82rem, 0.92vw, 0.95rem)", color: "#111111", margin: "3px 0", fontWeight: 500 }}>{phone}</p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right: map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                <AngolaMap />
              </motion.div>
            </div>
          )}
        </div>
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

                {formError && (
                  <p style={{ fontSize: "0.82rem", color: "#ff6b6b", margin: "0", textAlign: "center" }}>
                    Ocorreu um erro ao enviar. Tente novamente ou contacte-nos directamente por email.
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={sending ? {} : { scale: 1.015 }}
                  whileTap={sending ? {} : { scale: 0.985 }}
                  style={{
                    width: "100%", padding: "clamp(14px, 2vw, 18px) 0",
                    borderRadius: "10px",
                    background: sending ? "rgba(0,53,145,0.55)" : "#003591",
                    color: "#ffffff", fontSize: "clamp(0.85rem, 0.78rem + 0.3vw, 0.98rem)",
                    fontWeight: 600, letterSpacing: "0.04em", border: "none",
                    cursor: sending ? "not-allowed" : "pointer",
                    fontFamily: "'Poppins', sans-serif", marginTop: "4px",
                    transition: "background 0.2s",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  }}
                >
                  {sending ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                        style={{ animation: "spin 0.8s linear infinite" }}>
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                      A enviar…
                    </>
                  ) : tc.submitBtn}
                </motion.button>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
