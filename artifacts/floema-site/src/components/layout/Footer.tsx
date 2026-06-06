import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "wouter";
import logoSrc      from "@assets/ChatGPT_Image_21_de_mai._de_2026,_12_09_16_1_1779362713859.png";
import brandGasosa  from "@assets/Design_sem_nome__4_-removebg-preview_1780702968603.png";
import brand55      from "@assets/Design_sem_nome__5_-removebg-preview_1780703041624.png";
import brandPang    from "@assets/Design_sem_nome__6_-removebg-preview_1780703107192.png";
import brandNergy   from "@assets/Design_sem_nome__7_-removebg-preview_1780703177496.png";
import { useLang } from "../../i18n";

/* ── Paleta do site ── */
const BG      = "#F5EFE9";
const NAVY    = "#003591";
const TEXT    = "#111111";
const MUTED   = "rgba(0,0,0,0.45)";
const FAINT   = "rgba(0,0,0,0.28)";
const DIVIDER = "rgba(0,0,0,0.08)";

const NAV_ROUTES = [
  "/#quem-somos",
  "/pangulino",
  "/infraestruturas",
  "/noticias",
  "/contactos",
];

const BRANDS = [
  { src: brand55,   alt: "55"       },
  { src: brandPang, alt: "Pangulino" },
  { src: brandNergy, alt: "NergyTech" },
];

const SOCIAL = [
  { label: "Facebook",  href: "https://www.facebook.com/profile.php?id=100064949262003", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
  { label: "Instagram", href: "https://www.instagram.com/auto_gasosa/",                  path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M6.5 2h11A4.5 4.5 0 0 1 22 6.5v11A4.5 4.5 0 0 1 17.5 22h-11A4.5 4.5 0 0 1 2 17.5v-11A4.5 4.5 0 0 1 6.5 2z" },
  { label: "LinkedIn",  href: "https://ao.linkedin.com/jobs/view/diretor-geral-at-gasosa-auto-agro-4404358618", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
];

export function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: BG, fontFamily: "'Poppins', sans-serif", color: TEXT, borderTop: "1.5px solid rgba(0,0,0,0.1)" }}>

      {/* ══ Main info grid ══ */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "clamp(56px, 8vw, 96px) clamp(24px, 5vw, 48px) clamp(40px, 5vw, 56px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
          gap: "clamp(36px, 5vw, 56px)",
          alignItems: "start",
        }}
      >
        {/* Brand column */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <img
            src={logoSrc}
            alt="Gasosa Auto Agro"
            style={{ height: "40px", marginBottom: "18px", display: "block" }}
          />
          <p style={{ fontSize: "0.85rem", color: MUTED, lineHeight: 1.65, margin: "0 0 24px", maxWidth: "200px" }}>
            {f.tagline}
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            {SOCIAL.map(({ label, href, path }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{ width: "34px", height: "34px", borderRadius: "8px", border: `1px solid ${DIVIDER}`, display: "flex", alignItems: "center", justifyContent: "center", color: MUTED, transition: "all 0.2s", textDecoration: "none" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = NAVY; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; (e.currentTarget as HTMLAnchorElement).style.background = NAVY; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = DIVIDER; (e.currentTarget as HTMLAnchorElement).style.color = MUTED; (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Navigation column */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <h4 style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", color: FAINT, marginBottom: "18px", textTransform: "uppercase" }}>
            {f.navLabel}
          </h4>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
            {f.navLinks.map((link, i) => (
              <li key={link}>
                <Link
                  href={NAV_ROUTES[i] ?? "/"}
                  style={{ fontSize: "0.88rem", color: MUTED, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = TEXT)}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = MUTED)}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacts column */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <h4 style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", color: FAINT, marginBottom: "18px", textTransform: "uppercase" }}>
            {f.contactLabel}
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
            <a
              href={`mailto:${f.email}`}
              style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem", color: MUTED, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
              onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
            >
              <Mail size={14} style={{ flexShrink: 0, color: NAVY }} />
              {f.email}
            </a>
            <a
              href={`tel:${f.phone.replace(/\s/g, "")}`}
              style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem", color: MUTED, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
              onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
            >
              <Phone size={14} style={{ flexShrink: 0, color: NAVY }} />
              {f.phone}
            </a>
          </div>
        </div>

        {/* Locations column */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <h4 style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", color: FAINT, marginBottom: "18px", textTransform: "uppercase" }}>
            {f.locationsLabel}
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
            {f.locations.map(({ city, detail }) => (
              <div key={city} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <MapPin size={13} style={{ flexShrink: 0, color: NAVY }} />
                  <span style={{ fontSize: "0.88rem", fontWeight: 600, color: TEXT, lineHeight: 1.3 }}>{city}</span>
                </div>
                <div style={{ fontSize: "0.75rem", color: FAINT, lineHeight: 1.4 }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ Brands strip ══ */}
      <div style={{ borderTop: `1px solid ${DIVIDER}` }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "clamp(36px, 5vw, 52px) clamp(24px, 5vw, 48px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(24px, 3vw, 36px)",
          }}
        >
          <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", color: FAINT, textTransform: "uppercase", margin: 0 }}>
            As Nossas Marcas
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "clamp(28px, 5vw, 60px)" }}>
            {BRANDS.map(({ src, alt }) => (
              <img
                key={alt}
                src={src}
                alt={alt}
                style={{ height: "clamp(36px, 4.5vw, 56px)", width: "auto", objectFit: "contain", opacity: 0.85, transition: "opacity 0.2s" }}
                onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.opacity = "1")}
                onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.opacity = "0.85")}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ══ Bottom bar ══ */}
      <div
        style={{
          borderTop: `1px solid ${DIVIDER}`,
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "18px clamp(24px, 5vw, 48px)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: "0.75rem", color: FAINT }}>
          {f.copyright.replace("2025", String(year))}
        </span>
        <span style={{ fontSize: "0.75rem", color: "rgba(0,0,0,0.15)" }}>·</span>
        <Link
          href="/privacidade"
          style={{ fontSize: "0.75rem", color: FAINT, textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = TEXT)}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = FAINT)}
        >
          {f.legal}
        </Link>
      </div>

    </footer>
  );
}
