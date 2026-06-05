import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Menu, Mail } from "lucide-react";
import logoSrc         from "@assets/ChatGPT_Image_21_de_mai._de_2026,_12_09_16_1_1779362713859.png";
import _pangHero       from "@assets/pangulino-hero-optimized.jpg";
import _infraHero      from "@assets/20250903_123036_1780417176290.jpg";
import { NavThemeCtx } from "../lib/nav-theme";
import { NavPill } from "../components/layout/NavPill";
import { LangDropdown } from "../components/layout/LangDropdown";
import { MobileMenu } from "../components/layout/MobileMenu";
import { Footer } from "../components/layout/Footer";
import { HistoriaSection } from "../components/sections/HistoriaSection";
import { SectoresSection } from "../components/sections/SectoresSection";
import { MarcasRepresentadasSection } from "../components/sections/MarcasRepresentadasSection";
import { ParceirosSection } from "../components/sections/ParceirosSection";
import { UltimasNoticiasSection } from "../components/sections/UltimasNoticiasSection";
import { useLang } from "../i18n";
import { useSEO, FAQ_SCHEMA } from "../lib/use-seo";

const FAQ_ITEMS = [
  { q: "O que é a Pangulino?", a: "A Pangulino é uma marca angolana de ferramentas agrícolas criada em 2019 pela Gasosa Auto Agro. Oferece enxadas, pás, ancas, carrinhos de mão e outros equipamentos para o campo, reconhecida pela durabilidade e qualidade no mercado angolano." },
  { q: "A Nergytech está disponível em Angola?", a: "Sim. A Gasosa Auto Agro é o representante exclusivo da Nergytech em Angola, oferecendo lubrificantes premium para veículos, máquinas agrícolas e equipamentos industriais." },
  { q: "A Gasosa tem loja fora de Luanda?", a: "Sim. A Gasosa Auto Agro tem instalações em três cidades: Luanda (Av. 21 de Janeiro), Lubango (Rua Aníbal de Melo) e Huambo (Cidade Baixa), cobrindo o norte, centro e sul de Angola." },
  { q: "Que lubrificantes a Gasosa vende?", a: "A Gasosa vende lubrificantes das marcas Nergytech (representação exclusiva em Angola), Petronas, Castrol, Galp e Puma, para automóveis, tractores, máquinas agrícolas e equipamentos industriais." },
  { q: "A Gasosa trabalha com empresas e fazendas?", a: "Sim. A Gasosa é parceira estratégica de mais de 30 empresas e fazendas em Angola, incluindo Sonangol, Governo de Angola, Fazenda Tchissola, Fazenda Boi Verde, entre muitas outras." },
];

export function HomePage() {
  const { t } = useLang();

  useSEO({
    title: "Gasosa Auto Agro — Peças, Lubrificantes e Ferramentas Agrícolas em Angola",
    description: "Empresa angolana especializada em peças automóveis, lubrificantes Nergytech e ferramentas agrícolas Pangulino. Lojas em Luanda, Lubango e Huambo.",
    path: "/",
    schema: [FAQ_SCHEMA],
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navLight, setNavLight] = useState(false);

  useEffect(() => {
    function onScroll() {
      const progress = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      setScrollProgress(progress);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const prefetch = () => {
      [_pangHero, _infraHero].forEach(src => { new Image().src = src; });
    };
    if ("requestIdleCallback" in window) {
      requestIdleCallback(prefetch, { timeout: 2000 });
    } else {
      setTimeout(prefetch, 1200);
    }
  }, []);

  useEffect(() => {
    const HEADER_H = 80;
    function checkNavTheme() {
      const sections = document.querySelectorAll<HTMLElement>("[data-nav-light]");
      let active = false;
      sections.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= HEADER_H && r.bottom > 0) active = true;
      });
      setNavLight(active);
    }
    checkNavTheme();
    window.addEventListener("scroll", checkNavTheme, { passive: true });
    return () => window.removeEventListener("scroll", checkNavTheme);
  }, []);

  const heroBlur = scrollProgress * 3;
  const heroScale = 1 - scrollProgress * 0.028;
  const heroBrightness = 1 - scrollProgress * 0.09;

  return (
    <div className="w-full flex flex-col">

      {/* ── Header ── */}
      <NavThemeCtx.Provider value={navLight}>
        <header
          className="fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between"
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "clamp(12px, 2vh, 22px) clamp(16px, 4vw, 64px)",
          }}
        >
          <Link href="/" className="flex items-center">
            <motion.img
              src={logoSrc}
              alt="Gasosa Auto Agro"
              style={{ height: "clamp(32px, 4.5vw, 48px)", width: "auto", objectFit: "contain" }}
              animate={{ filter: navLight ? "brightness(0) invert(1)" : "brightness(1) invert(0)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
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
            style={{ padding: "clamp(6px, 1.2vw, 10px)" }}
            animate={{ color: navLight ? "#ffffff" : "#111111" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={() => setMobileMenuOpen(true)}
            aria-label={t.mobile.openMenu}
          >
            <Menu style={{ width: "clamp(20px, 3vw, 26px)", height: "clamp(20px, 3vw, 26px)" }} />
          </motion.button>
        </header>
      </NavThemeCtx.Provider>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* ── Hero wrapper ── */}
      <div
        className="sticky top-0 z-0 min-h-[100dvh] w-full bg-background flex flex-col overflow-hidden"
        style={{
          filter: `blur(${heroBlur}px) brightness(${heroBrightness})`,
          transform: `scale(${heroScale})`,
          transformOrigin: "center center",
          willChange: "transform, filter",
          borderRadius: scrollProgress > 0 ? `${scrollProgress * 20}px` : "0px",
        }}
      >
        <main className="relative flex-1 w-full overflow-hidden">

          {/* Title */}
          <div
            className="absolute inset-0 z-10 flex items-center justify-center text-center"
            style={{
              padding: `0 clamp(16px, 6vw, 80px)`,
              paddingBottom: "clamp(12vh, 20vh, 26vh)",
            }}
          >
            <motion.h1
              style={{
                color: "#003591",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "0.01em",
                fontSize: "clamp(2rem, 4vw + 1rem, 5.5rem)",
              }}
              initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.2, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {t.hero.title1}<br />
              {t.hero.title2}
            </motion.h1>
          </div>

          {/* Bottom bar */}
          <div
            className="absolute z-30 flex items-end justify-between"
            style={{
              bottom: "clamp(16px, 4vh, 48px)",
              left: "clamp(16px, 4vw, 64px)",
              right: "clamp(16px, 4vw, 64px)",
              gap: "clamp(10px, 2vw, 24px)",
            }}
          >
            <motion.p
              style={{
                fontSize: "clamp(0.72rem, 0.5vw + 0.6rem, 0.95rem)",
                color: "#003591",
                lineHeight: 1.65,
                fontWeight: 500,
                maxWidth: "clamp(200px, 40vw, 300px)",
              }}
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              className="relative overflow-hidden rounded-2xl flex-shrink-0 hidden sm:block"
              style={{
                width: "clamp(150px, 20vw, 260px)",
                height: "clamp(96px, 12vw, 160px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.24)",
              }}
              initial={{ opacity: 0, scale: 0.92, y: 40, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src="/contact-card.png"
                alt={t.hero.contactAlt}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <p
                className="absolute top-3 left-3 right-3"
                style={{
                  color: "#ffffff",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(9px, 0.9vw + 0.1rem, 13px)",
                  lineHeight: 1.35,
                  textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                }}
              >
                {t.hero.cardText1}<br />{t.hero.cardText2}
              </p>
              <div className="absolute bottom-3 left-3 flex items-center whitespace-nowrap">
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{
                    background: "#ffffff",
                    width: "clamp(24px, 2vw, 30px)",
                    height: "clamp(24px, 2vw, 30px)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <Mail style={{ width: "clamp(10px, 1vw, 14px)", height: "clamp(10px, 1vw, 14px)", color: "#111111" }} />
                </div>
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    background: "#ffffff",
                    paddingLeft: "clamp(10px, 1.2vw, 14px)",
                    paddingRight: "clamp(10px, 1.2vw, 14px)",
                    height: "clamp(24px, 2vw, 30px)",
                    marginLeft: "-4px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <span style={{ fontSize: "clamp(8px, 0.7vw, 10px)", fontWeight: 700, letterSpacing: "0.1em", color: "#111111" }}>
                    {t.hero.contactBtn}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* ── Sections ── */}
      <div id="quem-somos" className="relative z-10" style={{ borderRadius: "28px 28px 0 0", overflow: "hidden", boxShadow: "0 -12px 60px rgba(0,0,0,0.28)" }}>
        <HistoriaSection />
      </div>

      <div className="relative z-10">
        <SectoresSection />
      </div>

      <div className="relative z-10">
        <MarcasRepresentadasSection />
      </div>

      <div className="relative z-10">
        <ParceirosSection />
      </div>

      <div className="relative z-10">
        <UltimasNoticiasSection />
      </div>

      {/* ── GEO + FAQ ── */}
      <div className="relative z-10">
        <section
          aria-label="Sobre a Gasosa Auto Agro e Perguntas Frequentes"
          style={{ background: "#F5EFE9", padding: "clamp(80px,12vw,144px) clamp(20px,6vw,80px)" }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <p style={{ fontSize: "clamp(0.78rem,0.3vw + 0.72rem,0.9rem)", color: "rgba(0,0,0,0.42)", lineHeight: 1.85, marginBottom: "clamp(60px,8vw,100px)", maxWidth: "780px", fontFamily: "'Poppins', sans-serif" }}>
              A Gasosa Auto Agro (CFA GASOSA SU LDA) é uma empresa angolana fundada em 2016,
              especializada no fornecimento de peças automóveis, lubrificantes, ferramentas agrícolas e
              serviços de manutenção. Com presença em Luanda, Lubango e Huambo, representa as marcas
              próprias Pangulino (ferramentas agrícolas) e Nergytech (lubrificantes premium —
              representação exclusiva em Angola). É parceira de empresas como Sonangol, Governo de Angola
              e mais de 30 organizações angolanas.
            </p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.6rem,1rem + 2.5vw,3rem)", fontWeight: 500, color: "#111111", letterSpacing: "-0.028em", lineHeight: 1.1, marginBottom: "clamp(32px,4vw,52px)" }}
            >
              Perguntas Frequentes
            </motion.h2>

            {FAQ_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.48, ease: "easeOut", delay: i * 0.055 }}
                style={{
                  borderTop: i === 0 ? "1px solid rgba(0,0,0,0.09)" : undefined,
                  borderBottom: "1px solid rgba(0,0,0,0.09)",
                  padding: "clamp(18px,2.5vw,26px) 0",
                }}
              >
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(0.88rem,0.3vw + 0.8rem,1.05rem)", fontWeight: 600, color: "#111111", margin: "0 0 9px", letterSpacing: "-0.01em", lineHeight: 1.4 }}>
                  {item.q}
                </h3>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(0.8rem,0.25vw + 0.75rem,0.9rem)", color: "rgba(0,0,0,0.55)", lineHeight: 1.75, margin: 0, maxWidth: "820px" }}>
                  {item.a}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <div className="relative z-10">
        <Footer />
      </div>

    </div>
  );
}
