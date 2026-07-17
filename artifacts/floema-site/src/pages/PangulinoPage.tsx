import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { Menu } from "lucide-react";
import { NavLogo }       from "../components/layout/NavLogo";
import heroImg           from "@assets/pangulino-hero-optimized.jpg";
import wheelbarrowImg    from "@assets/ChatGPT_Image_6_de_jun._de_2026,_01_23_38_1780705424458.png";
import nergyImg1         from "@assets/ChatGPT_Image_26_de_mai._de_2026,_14_26_17_2_1780147809888.png";
import nergyImg2         from "@assets/ChatGPT_Image_26_de_mai._de_2026,_14_26_17_3_1780147827214.png";
import nergyImg3         from "@assets/IMG_20250903_113401_1780387574299.jpg";
import nergyImg4         from "@assets/IMG_20250903_111532_1780387597136.jpg";
import nergyImg5         from "@assets/1000015282_1780387656692.jpg";
import ag55Hero          from "@assets/20250903_124224_1780417672672.jpg";
import ag55Img2          from "@assets/20250903_124326_1780417637563.jpg";
import { LazyImage }     from "../components/ui/lazy-image";
import { NavThemeCtx, NavAccentCtx } from "../lib/nav-theme";
import { NavPill }       from "../components/layout/NavPill";
import { LangDropdown }  from "../components/layout/LangDropdown";
import { MobileMenu }    from "../components/layout/MobileMenu";
import { Footer }        from "../components/layout/Footer";
import { FADE_UP }       from "../lib/motion-variants";
import { useLang }       from "../i18n";
import { useIsMobile }   from "@/hooks/use-mobile";
import { useSEO, PANGULINO_PRODUCT_SCHEMA } from "../lib/use-seo";

const GREEN  = "#2D7A22";
const AMBER  = "#F5A000";
const NAVY   = "#003591";
const DARK   = "#0a1628";
const GOLD   = "#C49A10";

type BrandId = "todas" | "ag55" | "pangulino" | "nergytech";

const BRAND_TABS: { id: BrandId; label: string; accent: string }[] = [
  { id: "todas",     label: "Todas as Marcas", accent: NAVY   },
  { id: "ag55",      label: "ag55",            accent: GOLD   },
  { id: "pangulino", label: "Pangulino",        accent: GREEN  },
  { id: "nergytech", label: "Nergytech",        accent: NAVY   },
];

const viewport = { once: false, amount: 0.18 } as const;

/* ── Pangulino product icons ── */
const PRODUCT_ICONS = [
  <svg key="a" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 22l10-10" /><path d="M16 8c1.5-1.5 4-1.5 5.5 0s1.5 4 0 5.5L12 23l-9-9 9.5-9.5c.5-.5 1.2-.7 1.9-.7" />
    <path d="M15 9l-6 6" />
  </svg>,
  <svg key="b" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  </svg>,
  <svg key="c" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 22 16 8" /><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z" />
    <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z" />
    <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z" />
    <path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4z" />
    <path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0z" />
  </svg>,
];

/* ══════════════════════════════════════════
   BRAND CONTENT SECTIONS
══════════════════════════════════════════ */

function TodasSection({ onSelect }: { onSelect: (id: BrandId) => void }) {
  const isMobile = useIsMobile();

  const CARDS = [
    {
      id: "ag55" as BrandId,
      accent: GOLD,
      label: "AG55",
      tagline: "Peças e acessórios de alta performance",
      desc: "A ag55 é a marca de referência da Gasosa Auto Agro para peças, acessórios e consumíveis automóveis. Desenvolvida para responder às exigências do mercado angolano com qualidade consistente e disponibilidade garantida.",
      img: ag55Hero,
    },
    {
      id: "pangulino" as BrandId,
      accent: GREEN,
      label: "Pangulino",
      tagline: "Ferramentas agrícolas para Angola",
      desc: "Marca própria da Gasosa Auto Agro, inspirada no pangolim. Uma linha completa de ferramentas agrícolas de alta durabilidade, desenvolvida especificamente para as condições do campo angolano.",
      img: wheelbarrowImg,
    },
    {
      id: "nergytech" as BrandId,
      accent: NAVY,
      label: "Nergytech",
      tagline: "Lubrificantes premium — representação exclusiva",
      desc: "A Gasosa Auto Agro detém a representação exclusiva da Nergytech em Angola. Lubrificantes de alto desempenho para veículos, máquinas agrícolas e equipamentos industriais.",
      img: nergyImg1,
    },
  ];

  return (
    <div style={{ background: "#ffffff", fontFamily: "'Poppins', sans-serif", padding: "clamp(48px,8vw,96px) clamp(20px,5vw,80px)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.h2
          variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0}
          style={{ fontSize: "clamp(1.6rem,1rem+2.5vw,3rem)", fontWeight: 700, color: "#111111", letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 clamp(40px,6vw,72px)" }}
        >
          As marcas que nos<br />definem.
        </motion.h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
          gap: "clamp(16px,2.5vw,32px)",
        }}>
          {CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }} custom={i * 0.1}
              onClick={() => onSelect(card.id)}
              style={{
                cursor: "pointer",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "16px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "box-shadow 0.25s ease, transform 0.25s ease",
              }}
              whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
            >
              {/* Image */}
              <div style={{ position: "relative", height: "clamp(180px,22vw,260px)", overflow: "hidden", background: "#f4f4f4" }}>
                <img src={card.img} alt={card.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.35) 100%)" }} />
              </div>

              {/* Body */}
              <div style={{ padding: "clamp(20px,3vw,32px)", flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ width: "28px", height: "3px", background: card.accent, borderRadius: "2px", display: "inline-block", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", color: card.accent }}>{card.label.toUpperCase()}</span>
                </div>
                <h3 style={{ fontSize: "clamp(1rem,0.85rem+0.6vw,1.2rem)", fontWeight: 600, color: "#111111", letterSpacing: "-0.02em", lineHeight: 1.25, margin: 0 }}>
                  {card.tagline}
                </h3>
                <p style={{ fontSize: "clamp(0.8rem,0.72rem+0.3vw,0.9rem)", color: "rgba(0,0,0,0.55)", lineHeight: 1.75, margin: 0, flex: 1 }}>
                  {card.desc}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", fontWeight: 700, color: card.accent, marginTop: "8px" }}>
                  Ver marca <span>→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Ag55Section() {
  const isMobile = useIsMobile();

  const PRODUCTS = [
    { name: "Peças Automóveis", desc: "Gama completa de peças de substituição para veículos ligeiros, pesados e industriais. Compatibilidade garantida com as principais marcas presentes no mercado angolano.", detalhe: "Motor • Travões • Suspensão • Transmissão" },
    { name: "Acessórios & Equipamento", desc: "Acessórios de interior e exterior, ferramentas de bordo e equipamento de manutenção rápida. Qualidade que se vê e se sente em cada detalhe.", detalhe: "Interior • Exterior • Ferramentas • Diagnóstico" },
    { name: "Consumíveis & Filtros", desc: "Filtros de óleo, ar e combustível, velas de ignição, correias e fluidos. Stock permanente nas três unidades para uma substituição sempre atempada.", detalhe: "Filtros • Velas • Correias • Fluidos" },
  ];

  const ICONS = [
    <svg key="a" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
    </svg>,
    <svg key="b" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>,
    <svg key="c" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
    </svg>,
  ];

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Manifesto */}
      <div style={{
        background: "#ffffff",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        minHeight: isMobile ? "auto" : "520px",
      }}>
        <motion.div
          variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0}
          style={{
            display: "flex", flexDirection: "column", justifyContent: "center",
            padding: isMobile ? "clamp(48px,10vw,72px) clamp(24px,6vw,48px)" : "clamp(64px,8vw,100px) clamp(40px,5.5vw,80px)",
          }}
        >
          <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", color: GOLD, display: "block", marginBottom: "16px" }}>
            A NOSSA MARCA
          </span>
          <h2 style={{ fontSize: "clamp(1.8rem,1rem+3vw,3.5rem)", fontWeight: 600, color: "#111111", letterSpacing: "-0.03em", lineHeight: 1.08, margin: "0 0 28px" }}>
            Performance.<br />Confiança.<br />Angola.
          </h2>
          <p style={{ fontSize: "clamp(0.88rem,0.78rem+0.38vw,1rem)", color: "rgba(0,0,0,0.62)", lineHeight: 1.78, margin: "0 0 18px" }}>
            A ag55 é a marca de peças e acessórios automóveis da Gasosa Auto Agro — criada para garantir ao mercado angolano acesso a componentes de qualidade, com disponibilidade permanente e preços competitivos.
          </p>
          <p style={{ fontSize: "clamp(0.88rem,0.78rem+0.38vw,1rem)", color: "rgba(0,0,0,0.62)", lineHeight: 1.78, margin: "0 0 32px" }}>
            Da manutenção preventiva à reparação de emergência, a ag55 cobre toda a cadeia de necessidades automóveis — com uma gama pensada para o parque automóvel presente em Angola.
          </p>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", color: GOLD }}>
            <span style={{ width: "28px", height: "2px", background: GOLD, display: "inline-block" }} />
            Marca 100% focada no automobilismo angolano
          </span>
        </motion.div>

        <motion.div
          variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0.12}
          style={{ position: "relative", overflow: "hidden", minHeight: isMobile ? "260px" : "auto", background: "#e8e4dc" }}
        >
          <LazyImage fill src={ag55Hero} alt="ag55 — peças automóveis" objectPosition="center 40%" />
        </motion.div>
      </div>

      {/* Stats strip */}
      <div style={{ background: DARK, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)" }}>
        {[
          { value: "500+", label: "Referências em stock" },
          { value: "3",    label: "Províncias cobertas" },
          { value: "100%", label: "Focada em Angola" },
        ].map((s, i) => (
          <motion.div
            key={i}
            variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} custom={i * 0.1}
            style={{
              padding: isMobile ? "clamp(20px,3.5vh,32px) clamp(20px,5vw,40px)" : "clamp(28px,5vh,52px) clamp(16px,3vw,40px)",
              borderRight: !isMobile && i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none",
              borderBottom: isMobile && i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none",
              textAlign: "center",
              display: "flex", alignItems: "center",
              gap: isMobile ? "16px" : "0",
              justifyContent: isMobile ? "flex-start" : "center",
              flexDirection: isMobile ? "row" : "column",
            }}
          >
            <div style={{ fontSize: isMobile ? "clamp(1.8rem,6vw,2.6rem)" : "clamp(2.2rem,1rem+4vw,4.5rem)", fontWeight: 700, color: GOLD, letterSpacing: "-0.04em", lineHeight: 1, margin: isMobile ? "0" : "0 0 8px", flexShrink: 0 }}>
              {s.value}
            </div>
            <div style={{ fontSize: "clamp(0.68rem,0.58rem+0.38vw,0.82rem)", fontWeight: 500, color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em", textTransform: "uppercase", textAlign: isMobile ? "left" : "center" }}>
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Product categories */}
      <div style={{ background: "#111111" }}>
        <div style={{ padding: "clamp(48px,7vh,80px) clamp(20px,5vw,80px) clamp(24px,4vh,48px)", maxWidth: "1200px", margin: "0 auto" }}>
          <motion.span variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0}
            style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", color: GOLD, marginBottom: "14px" }}>
            GAMA DE PRODUTOS
          </motion.span>
          <motion.h2 variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0.06}
            style={{ fontSize: "clamp(1.8rem,1rem+2.8vw,3.2rem)", fontWeight: 600, color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 48px" }}>
            Tudo o que o seu veículo precisa.
          </motion.h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: "2px", paddingBottom: "2px" }}>
          {PRODUCTS.map((item, i) => (
            <motion.div key={i} variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }} custom={i * 0.1}
              style={{
                background: i === 1 ? "#1a1a1a" : "#141414",
                padding: "clamp(36px,5vw,56px) clamp(24px,4vw,48px)",
                display: "flex", flexDirection: "column", gap: "20px",
                borderTop: `3px solid ${i === 0 ? GOLD : i === 1 ? "#888" : DARK}`,
              }}
            >
              <div style={{ color: i === 0 ? GOLD : i === 1 ? "#888" : "#5a8fd4" }}>{ICONS[i]}</div>
              <h3 style={{ fontSize: "clamp(1.2rem,0.9rem+1.2vw,1.7rem)", fontWeight: 600, color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1.15, margin: 0 }}>
                {item.name}
              </h3>
              <p style={{ fontSize: "clamp(0.82rem,0.72rem+0.35vw,0.95rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.78, margin: 0, flex: 1 }}>
                {item.desc}
              </p>
              <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", color: i === 0 ? GOLD : i === 1 ? "#888" : "#5a8fd4", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "18px" }}>
                {item.detalhe}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        background: `linear-gradient(135deg, ${GOLD} 0%, #8B6800 100%)`,
        padding: "clamp(64px,10vh,100px) clamp(20px,5vw,80px)",
        display: "flex", flexDirection: "column",
        alignItems: isMobile ? "flex-start" : "center",
        textAlign: isMobile ? "left" : "center",
      }}>
        <motion.h2 variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0}
          style={{ fontSize: "clamp(2rem,1rem+4vw,5rem)", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0 0 20px", maxWidth: "800px" }}>
          A peça certa.<br />Sempre disponível.
        </motion.h2>
        <motion.p variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0.1}
          style={{ fontSize: "clamp(0.88rem,0.78rem+0.38vw,1.05rem)", color: "rgba(255,255,255,0.72)", lineHeight: 1.75, margin: "0 0 36px", maxWidth: "520px" }}>
          Fale com a nossa equipa para saber mais sobre a gama ag55, disponibilidade de peças e condições comerciais.
        </motion.p>
        <motion.div variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0.18}>
          <Link href="/contactos" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "clamp(13px,2vh,18px) clamp(28px,4vw,44px)",
            background: "#ffffff", color: GOLD,
            fontWeight: 700, fontSize: "clamp(0.82rem,0.72rem+0.35vw,0.95rem)",
            letterSpacing: "0.06em", textDecoration: "none", borderRadius: "4px",
          }}>
            Contactar →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function PangulinoSection() {
  const isMobile = useIsMobile();
  const p = useLang().t.pangulino;

  const STATS = [
    { value: "3",    label: isMobile ? "Províncias" : "Províncias cobertas" },
    { value: "20+",  label: isMobile ? "Produtos" : "Produtos na gama" },
    { value: "100%", label: isMobile ? "Angola" : "Desenvolvido para Angola" },
  ];

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Manifesto */}
      <div style={{ background: "#ffffff", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", minHeight: isMobile ? "auto" : "540px" }}>
        <motion.div
          variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0}
          style={{ display: "flex", flexDirection: "column", justifyContent: "center",
            padding: isMobile ? "clamp(48px,10vw,72px) clamp(24px,6vw,48px)" : "clamp(64px,8vw,100px) clamp(40px,5.5vw,80px) clamp(64px,8vw,100px) clamp(28px,5vw,72px)" }}
        >
          <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", color: GREEN, display: "block", marginBottom: "16px" }}>{p.manifesto.tag}</span>
          <h2 style={{ fontSize: "clamp(1.8rem,1rem+3vw,3.5rem)", fontWeight: 600, color: "#111111", letterSpacing: "-0.03em", lineHeight: 1.08, margin: "0 0 28px", whiteSpace: "pre-line" }}>
            {p.manifesto.heading}
          </h2>
          <p style={{ fontSize: "clamp(0.88rem,0.78rem+0.38vw,1rem)", color: "rgba(0,0,0,0.62)", lineHeight: 1.78, margin: "0 0 18px" }}>{p.manifesto.body1}</p>
          <p style={{ fontSize: "clamp(0.88rem,0.78rem+0.38vw,1rem)", color: "rgba(0,0,0,0.62)", lineHeight: 1.78, margin: "0 0 32px" }}>{p.manifesto.body2}</p>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", color: GREEN }}>
            <span style={{ width: "28px", height: "2px", background: GREEN, display: "inline-block" }} />
            {p.manifesto.badge}
          </span>
        </motion.div>
        <motion.div
          variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0.12}
          style={{ position: "relative", overflow: "hidden", minHeight: isMobile ? "280px" : "auto", background: "#d4e8d0" }}
        >
          <LazyImage fill src={wheelbarrowImg} alt="Pangulino — ferramentas agrícolas" objectPosition="center 60%" />
        </motion.div>
      </div>

      {/* Stats */}
      <div style={{ background: NAVY, display: "grid", gridTemplateColumns: isMobile ? "1fr" : `repeat(${STATS.length},1fr)` }}>
        {STATS.map((s, i) => (
          <motion.div key={i} variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} custom={i * 0.1}
            style={{ padding: isMobile ? "clamp(20px,3.5vh,32px) clamp(20px,5vw,40px)" : "clamp(28px,5vh,52px) clamp(16px,3vw,40px)",
              borderRight: !isMobile && i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none",
              borderBottom: isMobile && i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none",
              textAlign: "center", display: "flex", alignItems: "center",
              gap: isMobile ? "16px" : "0", justifyContent: isMobile ? "flex-start" : "center", flexDirection: isMobile ? "row" : "column" }}
          >
            <div style={{ fontSize: isMobile ? "clamp(1.8rem,6vw,2.6rem)" : "clamp(2.2rem,1rem+4vw,4.5rem)", fontWeight: 700, color: AMBER, letterSpacing: "-0.04em", lineHeight: 1, margin: isMobile ? "0" : "0 0 8px", flexShrink: 0 }}>{s.value}</div>
            <div style={{ fontSize: "clamp(0.68rem,0.58rem+0.38vw,0.82rem)", fontWeight: 500, color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em", textTransform: "uppercase", textAlign: isMobile ? "left" : "center" }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Products */}
      <div style={{ background: "#111111" }}>
        <div style={{ padding: "clamp(48px,7vh,80px) clamp(20px,5vw,80px) clamp(24px,4vh,48px)", maxWidth: "1200px", margin: "0 auto" }}>
          <motion.span variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0}
            style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", color: GREEN, marginBottom: "14px" }}>{p.produtos.tag}</motion.span>
          <motion.h2 variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0.06}
            style={{ fontSize: "clamp(1.8rem,1rem+2.8vw,3.2rem)", fontWeight: 600, color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 48px" }}>{p.produtos.heading}</motion.h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: "2px", paddingBottom: "2px" }}>
          {p.produtos.items.map((item, i) => (
            <motion.div key={i} variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }} custom={i * 0.1}
              style={{ background: i === 1 ? "#1a1a1a" : "#141414", padding: "clamp(36px,5vw,56px) clamp(24px,4vw,48px)", display: "flex", flexDirection: "column", gap: "20px", borderTop: `3px solid ${i === 0 ? GREEN : i === 1 ? AMBER : NAVY}` }}>
              <div style={{ color: i === 0 ? GREEN : i === 1 ? AMBER : "#5a8fd4" }}>{PRODUCT_ICONS[i]}</div>
              <h3 style={{ fontSize: "clamp(1.2rem,0.9rem+1.2vw,1.7rem)", fontWeight: 600, color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1.15, margin: 0 }}>{item.name}</h3>
              <p style={{ fontSize: "clamp(0.82rem,0.72rem+0.35vw,0.95rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.78, margin: 0, flex: 1 }}>{item.desc}</p>
              <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", color: i === 0 ? GREEN : i === 1 ? AMBER : "#5a8fd4", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "18px" }}>{item.detalhe}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pillars */}
      <div style={{ background: "#ffffff", padding: "clamp(64px,10vh,100px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.span variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0}
            style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", color: GREEN, marginBottom: "14px" }}>{p.pilares.tag}</motion.span>
          <motion.h2 variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0.06}
            style={{ fontSize: "clamp(1.8rem,1rem+2.8vw,3.2rem)", fontWeight: 600, color: "#111111", letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 clamp(40px,7vh,68px)" }}>{p.pilares.heading}</motion.h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: isMobile ? "32px" : "clamp(32px,5vw,64px)" }}>
            {p.pilares.items.map((item, i) => (
              <motion.div key={i} variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} custom={i * 0.12}>
                <div style={{ fontSize: "clamp(3rem,1.5rem+4vw,5.5rem)", fontWeight: 700, color: "rgba(0,0,0,0.07)", letterSpacing: "-0.06em", lineHeight: 1, margin: "0 0 20px" }}>{item.num}</div>
                <div style={{ width: "36px", height: "3px", background: GREEN, marginBottom: "20px", borderRadius: "2px" }} />
                <h3 style={{ fontSize: "clamp(1.05rem,0.85rem+0.8vw,1.35rem)", fontWeight: 600, color: "#111111", letterSpacing: "-0.02em", lineHeight: 1.25, margin: "0 0 14px" }}>{item.title}</h3>
                <p style={{ fontSize: "clamp(0.82rem,0.72rem+0.32vw,0.93rem)", color: "rgba(0,0,0,0.55)", lineHeight: 1.78, margin: 0 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: `linear-gradient(135deg,${GREEN} 0%,#1a5212 100%)`, padding: "clamp(64px,10vh,100px) clamp(20px,5vw,80px)", display: "flex", flexDirection: "column", alignItems: isMobile ? "flex-start" : "center", textAlign: isMobile ? "left" : "center" }}>
        <motion.h2 variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0}
          style={{ fontSize: "clamp(2rem,1rem+4vw,5rem)", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0 0 20px", whiteSpace: "pre-line", maxWidth: "800px" }}>{p.cta.heading}</motion.h2>
        <motion.p variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0.1}
          style={{ fontSize: "clamp(0.88rem,0.78rem+0.38vw,1.05rem)", color: "rgba(255,255,255,0.72)", lineHeight: 1.75, margin: "0 0 36px", maxWidth: "520px" }}>{p.cta.body}</motion.p>
        <motion.div variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0.18}>
          <Link href="/contactos" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "clamp(13px,2vh,18px) clamp(28px,4vw,44px)", background: "#ffffff", color: GREEN, fontWeight: 700, fontSize: "clamp(0.82rem,0.72rem+0.35vw,0.95rem)", letterSpacing: "0.06em", textDecoration: "none", borderRadius: "4px" }}>
            {p.cta.btn}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function NergySection() {
  const isMobile = useIsMobile();

  const PRODUCTS = [
    { name: "Lubrificantes Automóvel", desc: "Óleos de motor, lubrificantes de transmissão e fluidos de travão para veículos ligeiros e pesados. Formulações de alto desempenho que protegem o motor em climas exigentes.", detalhe: "Motor • Transmissão • Direcção • Travões" },
    { name: "Lubrificantes Industriais", desc: "Óleos hidráulicos, lubrificantes de engrenagem e fluidos de corte para maquinaria industrial e equipamento de construção. Redução de desgaste e maior tempo entre manutenções.", detalhe: "Hidráulico • Engrenagem • Compressor • Corte" },
    { name: "Lubrificantes Agrícolas", desc: "Linha específica para tratores, colhedoras e equipamento agrícola. Desenvolvidos para operar em condições de campo — poeira, calor e cargas intermitentes.", detalhe: "Tractor • Agrícola • Caixa • Hidráulico" },
  ];

  const ICONS = [
    <svg key="a" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
    </svg>,
    <svg key="b" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>,
    <svg key="c" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 22 16 8"/><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z"/>
      <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z"/>
    </svg>,
  ];

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Manifesto */}
      <div style={{ background: "#ffffff", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", minHeight: isMobile ? "auto" : "540px" }}>
        <motion.div
          variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0}
          style={{ display: "flex", flexDirection: "column", justifyContent: "center",
            padding: isMobile ? "clamp(48px,10vw,72px) clamp(24px,6vw,48px)" : "clamp(64px,8vw,100px) clamp(40px,5.5vw,80px) clamp(64px,8vw,100px) clamp(28px,5vw,72px)" }}
        >
          <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", color: NAVY, display: "block", marginBottom: "16px" }}>
            REPRESENTAÇÃO EXCLUSIVA
          </span>
          <h2 style={{ fontSize: "clamp(1.8rem,1rem+3vw,3.5rem)", fontWeight: 600, color: "#111111", letterSpacing: "-0.03em", lineHeight: 1.08, margin: "0 0 28px" }}>
            Excelência internacional.<br />Presença angolana.
          </h2>
          <p style={{ fontSize: "clamp(0.88rem,0.78rem+0.38vw,1rem)", color: "rgba(0,0,0,0.62)", lineHeight: 1.78, margin: "0 0 18px" }}>
            A Nergytech é uma marca internacional de lubrificantes de alto desempenho. A Gasosa Auto Agro detém a representação exclusiva em Angola — garantindo ao mercado angolano acesso às formulações mais avançadas para cada aplicação.
          </p>
          <p style={{ fontSize: "clamp(0.88rem,0.78rem+0.38vw,1rem)", color: "rgba(0,0,0,0.62)", lineHeight: 1.78, margin: "0 0 32px" }}>
            Presente nas três unidades em Luanda, Lubango e Huambo, com stock permanente e assistência técnica especializada para selecção do produto certo para cada equipamento.
          </p>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", color: NAVY }}>
            <span style={{ width: "28px", height: "2px", background: NAVY, display: "inline-block" }} />
            Representante exclusivo Nergytech em Angola
          </span>
        </motion.div>

        <motion.div
          variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0.12}
          style={{ position: "relative", overflow: "hidden", minHeight: isMobile ? "280px" : "auto", background: "#1a2640" }}
        >
          <LazyImage fill src={nergyImg1} alt="Nergytech lubrificantes" objectPosition="center center" />
        </motion.div>
      </div>

      {/* Stats */}
      <div style={{ background: NAVY, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)" }}>
        {[
          { value: "3",    label: isMobile ? "Sectores" : "Sectores cobertos" },
          { value: "100%", label: isMobile ? "Exclusivo" : "Representação exclusiva" },
          { value: "3",    label: isMobile ? "Unidades" : "Unidades com stock" },
        ].map((s, i) => (
          <motion.div key={i} variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} custom={i * 0.1}
            style={{ padding: isMobile ? "clamp(20px,3.5vh,32px) clamp(20px,5vw,40px)" : "clamp(28px,5vh,52px) clamp(16px,3vw,40px)",
              borderRight: !isMobile && i < 2 ? "1px solid rgba(255,255,255,0.12)" : "none",
              borderBottom: isMobile && i < 2 ? "1px solid rgba(255,255,255,0.12)" : "none",
              textAlign: "center", display: "flex", alignItems: "center",
              gap: isMobile ? "16px" : "0", justifyContent: isMobile ? "flex-start" : "center", flexDirection: isMobile ? "row" : "column" }}
          >
            <div style={{ fontSize: isMobile ? "clamp(1.8rem,6vw,2.6rem)" : "clamp(2.2rem,1rem+4vw,4.5rem)", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.04em", lineHeight: 1, margin: isMobile ? "0" : "0 0 8px", flexShrink: 0 }}>{s.value}</div>
            <div style={{ fontSize: "clamp(0.68rem,0.58rem+0.38vw,0.82rem)", fontWeight: 500, color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em", textTransform: "uppercase", textAlign: isMobile ? "left" : "center" }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Gallery strip */}
      <div style={{ background: "#0a0a0a", display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: "2px" }}>
        {[nergyImg2, nergyImg3, nergyImg4, nergyImg5].map((src, i) => (
          <motion.div key={i} variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} custom={i * 0.08}
            style={{ aspectRatio: "3/4", overflow: "hidden", position: "relative" }}>
            <img src={src} alt={`Nergytech ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </motion.div>
        ))}
      </div>

      {/* Products */}
      <div style={{ background: "#111111" }}>
        <div style={{ padding: "clamp(48px,7vh,80px) clamp(20px,5vw,80px) clamp(24px,4vh,48px)", maxWidth: "1200px", margin: "0 auto" }}>
          <motion.span variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0}
            style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", color: "#5a8fd4", marginBottom: "14px" }}>
            GAMA DE PRODUTOS
          </motion.span>
          <motion.h2 variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0.06}
            style={{ fontSize: "clamp(1.8rem,1rem+2.8vw,3.2rem)", fontWeight: 600, color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 48px" }}>
            Lubrificação para cada aplicação.
          </motion.h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: "2px", paddingBottom: "2px" }}>
          {PRODUCTS.map((item, i) => (
            <motion.div key={i} variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }} custom={i * 0.1}
              style={{ background: i === 1 ? "#1a1a1a" : "#141414", padding: "clamp(36px,5vw,56px) clamp(24px,4vw,48px)", display: "flex", flexDirection: "column", gap: "20px", borderTop: `3px solid ${NAVY}` }}>
              <div style={{ color: "#5a8fd4" }}>{ICONS[i]}</div>
              <h3 style={{ fontSize: "clamp(1.2rem,0.9rem+1.2vw,1.7rem)", fontWeight: 600, color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1.15, margin: 0 }}>{item.name}</h3>
              <p style={{ fontSize: "clamp(0.82rem,0.72rem+0.35vw,0.95rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.78, margin: 0, flex: 1 }}>{item.desc}</p>
              <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", color: "#5a8fd4", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "18px" }}>{item.detalhe}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: `linear-gradient(135deg,${NAVY} 0%,#001f5c 100%)`, padding: "clamp(64px,10vh,100px) clamp(20px,5vw,80px)", display: "flex", flexDirection: "column", alignItems: isMobile ? "flex-start" : "center", textAlign: isMobile ? "left" : "center" }}>
        <motion.h2 variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0}
          style={{ fontSize: "clamp(2rem,1rem+4vw,5rem)", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0 0 20px", maxWidth: "800px" }}>
          O lubrificante certo.<br />Para cada motor.
        </motion.h2>
        <motion.p variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0.1}
          style={{ fontSize: "clamp(0.88rem,0.78rem+0.38vw,1.05rem)", color: "rgba(255,255,255,0.72)", lineHeight: 1.75, margin: "0 0 36px", maxWidth: "520px" }}>
          Fale com a nossa equipa para selecionar o produto Nergytech adequado ao seu veículo ou equipamento.
        </motion.p>
        <motion.div variants={FADE_UP} initial="hidden" whileInView="visible" viewport={viewport} custom={0.18}>
          <Link href="/contactos" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "clamp(13px,2vh,18px) clamp(28px,4vw,44px)", background: "#ffffff", color: NAVY, fontWeight: 700, fontSize: "clamp(0.82rem,0.72rem+0.35vw,0.95rem)", letterSpacing: "0.06em", textDecoration: "none", borderRadius: "4px" }}>
            Contactar →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   FILTER TAB BAR
══════════════════════════════════════════ */
function BrandFilterBar({ active, onChange }: { active: BrandId; onChange: (id: BrandId) => void }) {
  return (
    <div style={{
      position: "sticky",
      top: "clamp(72px,10vh,92px)",
      zIndex: 40,
      background: "#ffffff",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
    }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 clamp(16px,4vw,64px)",
          display: "flex",
          gap: "4px",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {BRAND_TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              style={{
                flexShrink: 0,
                padding: "clamp(12px,1.8vh,16px) clamp(14px,2vw,24px)",
                fontSize: "clamp(0.72rem,0.62rem+0.35vw,0.82rem)",
                fontWeight: 600,
                letterSpacing: "0.06em",
                fontFamily: "'Poppins', sans-serif",
                color: isActive ? "#ffffff" : "rgba(0,0,0,0.45)",
                background: isActive ? "#111111" : "transparent",
                border: "none",
                borderRadius: "0",
                cursor: "pointer",
                transition: "color 0.2s ease, background 0.2s ease",
                whiteSpace: "nowrap",
                position: "relative",
              }}
            >
              {tab.label}
              {isActive && (
                <motion.span
                  layoutId="brand-underline"
                  style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: tab.accent }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export function PangulinoPage() {
  const { t } = useLang();

  useSEO({
    title: "Nossas Marcas — Pangulino, Nergytech & ag55 | Gasosa Auto Agro",
    description: "Conheça as marcas da Gasosa Auto Agro: ag55 (peças automóveis), Pangulino (ferramentas agrícolas) e Nergytech (representação exclusiva de lubrificantes premium em Angola).",
    path: "/nossas-marcas",
    breadcrumb: { name: "Nossas Marcas", path: "/nossas-marcas" },
    schema: [PANGULINO_PRODUCT_SCHEMA],
  });

  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeBrand, setActiveBrand] = useState<BrandId>("todas");
  const [scrolledPast, setScrolledPast] = useState(false);
  const p = t.pangulino;

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroTitleY         = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOverlayOpacity = useTransform(heroScroll, [0, 0.8], [0.62, 0.88]);

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
      <NavAccentCtx.Provider value={GREEN}>
      <NavThemeCtx.Provider value={!scrolledPast}>
        <header
          className="fixed top-0 left-0 right-0 z-50"
          style={{
            background: scrolledPast ? "#ffffff" : "transparent",
            borderBottom: scrolledPast ? "1px solid rgba(0,0,0,0.1)" : "none",
            transition: "background 0.35s ease, border-color 0.35s ease",
          }}
        >
          <div className="w-full flex items-center justify-between"
            style={{ maxWidth: "1600px", margin: "0 auto", padding: "clamp(12px,2vh,22px) clamp(16px,2vw,32px)" }}>
            <Link href="/" className="flex items-center">
              <NavLogo style={{ height: "clamp(32px,4.5vw,48px)" }} />
            </Link>
            <nav className="hidden lg:flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {t.nav.map((item) => <NavPill key={item} item={item} />)}
              </div>
              <LangDropdown />
            </nav>
            <motion.button
              className="lg:hidden"
              style={{ padding: "clamp(6px,1.2vw,10px)" }}
              animate={{ color: scrolledPast ? "#111111" : "#ffffff" }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(true)}
              aria-label={t.mobile.openMenu}
            >
              <Menu style={{ width: "clamp(20px,3vw,26px)", height: "clamp(20px,3vw,26px)" }} />
            </motion.button>
          </div>
        </header>
      </NavThemeCtx.Provider>
      </NavAccentCtx.Provider>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* ── Hero ── */}
      <div ref={heroRef} style={{ position: "relative", width: "100%", height: "100dvh", minHeight: "560px", overflow: "hidden", background: DARK, display: "flex", alignItems: "flex-end", justifyContent: "flex-start" }}>
        <img src={heroImg} alt="Nossas Marcas — Gasosa Auto Agro" loading="eager" fetchPriority="high" decoding="async"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%", filter: "saturate(0.7)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(45,122,34,0.35) 0%,transparent 60%)", zIndex: 1 }} />
        <motion.div style={{ position: "absolute", inset: 0, background: "#000", opacity: heroOverlayOpacity, zIndex: 1 }} />
        {/* top vignette so header is always legible on the dark hero */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "180px", background: "linear-gradient(to bottom,rgba(0,0,0,0.55) 0%,transparent 100%)", zIndex: 2, pointerEvents: "none" }} />

        <motion.div style={{ position: "relative", zIndex: 2, y: heroTitleY, padding: "clamp(32px,5vw,80px) clamp(20px,5vw,80px)", paddingBottom: "clamp(60px,9vh,110px)", maxWidth: "900px" }}>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16,1,0.3,1], delay: 0.1 }}
            style={{ fontSize: "clamp(0.65rem,0.55rem+0.4vw,0.8rem)", fontWeight: 600, color: GREEN, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 14px" }}>
            {p.hero.supra}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 44 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 80, damping: 22, delay: 0.15 }}
            style={{ fontSize: "clamp(4.5rem, 2rem + 12vw, 14rem)", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.04em", lineHeight: 0.88, margin: "0 0 32px" }}>
            {p.hero.heading}
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, ease: [0.16,1,0.3,1], delay: 0.38 }}>
            <p style={{ fontSize: "clamp(0.88rem,0.72rem+0.6vw,1.1rem)", fontWeight: 500, color: "rgba(255,255,255,0.88)", letterSpacing: "0.01em", margin: "0 0 6px" }}>{p.hero.sub1}</p>
            <p style={{ fontSize: "clamp(0.82rem,0.68rem+0.5vw,1rem)", fontWeight: 400, color: "rgba(255,255,255,0.52)", letterSpacing: "0.01em", margin: 0 }}>{p.hero.sub2}</p>
          </motion.div>
        </motion.div>

        {/* scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.8 }}
          style={{ position: "absolute", bottom: "clamp(28px,4vh,48px)", left: "50%", transform: "translateX(-50%)", zIndex: 2 }}>
          <motion.div animate={{ y: [0,8,0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom,transparent,rgba(255,255,255,0.45))" }} />
        </motion.div>
      </div>

      {/* ── Brand Filter Tab Bar ── */}
      <BrandFilterBar active={activeBrand} onChange={setActiveBrand} />

      {/* ── Brand Content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeBrand}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
        >
          {activeBrand === "todas"     && <TodasSection onSelect={setActiveBrand} />}
          {activeBrand === "ag55"      && <Ag55Section />}
          {activeBrand === "pangulino" && <PangulinoSection />}
          {activeBrand === "nergytech" && <NergySection />}
        </motion.div>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
