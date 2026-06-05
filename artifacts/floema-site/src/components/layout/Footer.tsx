import { motion } from "framer-motion";
import { Link } from "wouter";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import logoSrc from "@assets/ChatGPT_Image_21_de_mai._de_2026,_12_09_16_1_1779362713859.png";
import { useLang } from "../../i18n";
import { FADE_UP } from "../../lib/motion-variants";

const SOCIAL = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100064949262003",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/auto_gasosa/",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <path d="M17.5 6.5h.01M6.5 2h11A4.5 4.5 0 0 1 22 6.5v11A4.5 4.5 0 0 1 17.5 22h-11A4.5 4.5 0 0 1 2 17.5v-11A4.5 4.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://ao.linkedin.com/jobs/view/diretor-geral-at-gasosa-auto-agro-4404358618",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      </svg>
    ),
  },
];

const NAV_ROUTES: Record<string, string> = {
  "Quem Somos":      "/",
  "Pangulino":       "/pangulino",
  "PANGULINO":       "/pangulino",
  "Infraestruturas": "/infraestruturas",
  "Notícias":        "/notícias",
  "Contactos":       "/contactos",
};

function ScrollTopBtn() {
  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      whileHover={{ y: -3, backgroundColor: "#003591" }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.2 }}
      aria-label="Voltar ao topo"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "7px",
        fontSize: "0.72rem",
        fontWeight: 700,
        letterSpacing: "0.13em",
        color: "rgba(255,255,255,0.55)",
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "99px",
        padding: "8px 16px",
        cursor: "pointer",
        fontFamily: "'Poppins', sans-serif",
        transition: "color 0.2s",
      }}
    >
      TOPO
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </motion.button>
  );
}

export function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const year = new Date().getFullYear();

  const vp = { once: true, amount: 0.12 } as const;

  return (
    <footer style={{ background: "#0A1628", fontFamily: "'Poppins', sans-serif", color: "#ffffff" }}>

      {/* ── CTA strip ── */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "clamp(72px, 10vw, 128px) clamp(20px, 5vw, 64px) clamp(64px, 8vw, 104px)",
        }}
      >
        {/* Eyebrow */}
        <div style={{ overflow: "hidden", marginBottom: "20px" }}>
          <motion.span
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            custom={0}
            style={{
              display: "inline-block",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "#F5A000",
              textTransform: "uppercase",
            }}
          >
            GASOSA AUTO AGRO
          </motion.span>
        </div>

        {/* Big heading */}
        <div style={{ overflow: "hidden", marginBottom: "clamp(32px, 4vw, 52px)" }}>
          <motion.h2
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            custom={0.07}
            style={{
              fontSize: "clamp(2.4rem, 2rem + 4vw, 6rem)",
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
              color: "#ffffff",
              margin: 0,
              maxWidth: "900px",
            }}
          >
            Qualidade e confiança<br />
            <span style={{ color: "rgba(255,255,255,0.32)" }}>para quem impulsiona</span><br />
            Angola.
          </motion.h2>
        </div>

        {/* CTA email */}
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          custom={0.18}
          style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}
        >
          <motion.a
            href="mailto:geral@cfagasosa.com"
            whileHover={{ backgroundColor: "#003591", borderColor: "#003591", color: "#ffffff" }}
            transition={{ duration: 0.22 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 28px",
              border: "1.5px solid rgba(255,255,255,0.22)",
              borderRadius: "99px",
              fontSize: "0.88rem",
              fontWeight: 600,
              color: "#ffffff",
              textDecoration: "none",
              letterSpacing: "0.02em",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <Mail size={15} />
            geral@cfagasosa.com
            <ArrowUpRight size={14} style={{ opacity: 0.6 }} />
          </motion.a>

          <motion.a
            href="tel:+244951025435"
            whileHover={{ color: "#F5A000" }}
            transition={{ duration: 0.2 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.88rem",
              fontWeight: 500,
              color: "rgba(255,255,255,0.52)",
              textDecoration: "none",
              letterSpacing: "0.01em",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <Phone size={14} />
            +244 951 025 435
          </motion.a>
        </motion.div>
      </div>

      {/* ── Divider ── */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 64px)",
        }}
      >
        <div style={{ height: "1px", background: "rgba(255,255,255,0.09)" }} />
      </div>

      {/* ── Main columns ── */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "clamp(48px, 6vw, 80px) clamp(20px, 5vw, 64px)",
          display: "grid",
          gridTemplateColumns: "minmax(0,1.6fr) repeat(3, minmax(0,1fr))",
          gap: "clamp(32px, 4vw, 64px)",
          alignItems: "start",
        }}
        className="footer-grid"
      >

        {/* ── Brand column ── */}
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          custom={0}
        >
          <Link href="/">
            <img
              src={logoSrc}
              alt="Gasosa Auto Agro"
              style={{ height: "42px", marginBottom: "22px", display: "block", filter: "brightness(0) invert(1)" }}
            />
          </Link>
          <p
            style={{
              fontSize: "clamp(0.82rem, 0.76rem + 0.2vw, 0.9rem)",
              color: "rgba(255,255,255,0.42)",
              lineHeight: 1.72,
              margin: "0 0 28px",
              maxWidth: "260px",
            }}
          >
            {f.tagline}
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            {SOCIAL.map(({ label, href, icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ borderColor: "#F5A000", color: "#F5A000", y: -2 }}
                transition={{ duration: 0.18 }}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.13)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ── Navigation column ── */}
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          custom={0.1}
        >
          <h4
            style={{
              fontSize: "0.67rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.32)",
              marginBottom: "22px",
              textTransform: "uppercase",
            }}
          >
            {f.navLabel}
          </h4>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "11px" }}>
            {f.navLinks.map((link, i) => {
              const route = NAV_ROUTES[link] ?? `/${link.toLowerCase()}`;
              return (
                <li key={link}>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={vp}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1], delay: 0.12 + i * 0.055 }}
                  >
                    <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.18 }}>
                      <Link
                        href={route}
                        style={{
                          fontSize: "0.9rem",
                          color: "rgba(255,255,255,0.58)",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          fontWeight: 400,
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.58)")}
                      >
                        {link}
                      </Link>
                    </motion.div>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </motion.div>

        {/* ── Contacts column ── */}
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          custom={0.18}
        >
          <h4
            style={{
              fontSize: "0.67rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.32)",
              marginBottom: "22px",
              textTransform: "uppercase",
            }}
          >
            {f.contactLabel}
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <motion.a
              href={`mailto:${f.email}`}
              whileHover={{ color: "#ffffff", x: 3 }}
              transition={{ duration: 0.18 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "0.87rem",
                color: "rgba(255,255,255,0.55)",
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Mail size={13} style={{ color: "#F5A000" }} />
              </span>
              {f.email}
            </motion.a>
            <motion.a
              href={`tel:${f.phone.replace(/\s/g, "")}`}
              whileHover={{ color: "#ffffff", x: 3 }}
              transition={{ duration: 0.18 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "0.87rem",
                color: "rgba(255,255,255,0.55)",
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Phone size={13} style={{ color: "#F5A000" }} />
              </span>
              {f.phone}
            </motion.a>
          </div>
        </motion.div>

        {/* ── Locations column ── */}
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          custom={0.26}
        >
          <h4
            style={{
              fontSize: "0.67rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.32)",
              marginBottom: "22px",
              textTransform: "uppercase",
            }}
          >
            {f.locationsLabel}
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {f.locations.map(({ city, detail }, i) => (
              <motion.div
                key={city}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={vp}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1], delay: 0.28 + i * 0.07 }}
                style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
              >
                <span
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "8px",
                    background: "rgba(245,160,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "1px",
                  }}
                >
                  <MapPin size={13} style={{ color: "#F5A000" }} />
                </span>
                <div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#ffffff", lineHeight: 1.3 }}>{city}</div>
                  <div style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.45, marginTop: "2px" }}>{detail}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "22px clamp(20px, 5vw, 64px)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "14px",
        }}
      >
        <span style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.28)", letterSpacing: "0.01em" }}>
          {f.copyright.replace("2025", String(year))}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <motion.a
            href="#"
            whileHover={{ color: "rgba(255,255,255,0.65)" }}
            transition={{ duration: 0.18 }}
            style={{
              fontSize: "0.76rem",
              color: "rgba(255,255,255,0.28)",
              textDecoration: "none",
              letterSpacing: "0.01em",
            }}
          >
            {f.legal}
          </motion.a>
          <ScrollTopBtn />
        </div>
      </div>

      {/* ── Responsive grid override ── */}
      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 540px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
