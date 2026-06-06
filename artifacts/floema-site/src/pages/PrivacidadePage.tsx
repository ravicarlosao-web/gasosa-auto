import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Menu } from "lucide-react";
import { NavLogo } from "../components/layout/NavLogo";
import { NavThemeCtx } from "../lib/nav-theme";
import { NavPill } from "../components/layout/NavPill";
import { LangDropdown } from "../components/layout/LangDropdown";
import { MobileMenu } from "../components/layout/MobileMenu";
import { Footer } from "../components/layout/Footer";
import { FADE_UP } from "../lib/motion-variants";
import { useLang } from "../i18n";
import { useSEO } from "../lib/use-seo";

const BG   = "#F5EFE9";
const NAVY = "#003591";
const TEXT = "#111111";
const MUTED = "rgba(0,0,0,0.52)";
const DIVIDER = "rgba(0,0,0,0.08)";

const PAD  = { paddingLeft: "clamp(20px, 5vw, 80px)", paddingRight: "clamp(20px, 5vw, 80px)" } as const;
const WRAP = { maxWidth: "1400px", margin: "0 auto", ...PAD } as const;

const VIEWPORT = { once: true, amount: 0.12 } as const;

/* ── Secções da política ── */
const SECTIONS = [
  {
    id: "recolha",
    label: "01",
    title: "Dados que Recolhemos",
    body: [
      "A Gasosa Auto Agro recolhe apenas os dados estritamente necessários para prestar os nossos serviços com qualidade. Isto inclui informações que nos fornece directamente — como nome, endereço de e-mail e número de telefone — quando preenche o formulário de contacto ou solicita assistência.",
      "Também podemos recolher, de forma automática e anónima, dados técnicos sobre a visita ao nosso site: endereço IP, tipo de navegador, páginas visitadas e duração da sessão. Estes dados são usados exclusivamente para melhorar o desempenho e a experiência do site.",
    ],
  },
  {
    id: "utilizacao",
    label: "02",
    title: "Como Utilizamos os Dados",
    body: [
      "Os seus dados pessoais são utilizados para responder às suas questões e pedidos de informação, prestar suporte pós-venda, enviar comunicações que nos tenha solicitado e melhorar continuamente os nossos serviços e plataformas digitais.",
      "Não utilizamos os seus dados para fins de marketing sem o seu consentimento explícito, nem os cedemos a terceiros para uso comercial próprio.",
    ],
  },
  {
    id: "partilha",
    label: "03",
    title: "Partilha de Informação",
    body: [
      "A Gasosa Auto Agro não vende, aluga nem troca os seus dados pessoais com terceiros. Podemos partilhar informação com prestadores de serviços que nos apoiam na operação do site — como serviços de alojamento web — mas apenas na medida do estritamente necessário e sempre sob obrigação de confidencialidade.",
      "Poderemos divulgar dados caso seja exigido por lei ou por ordem judicial devidamente fundamentada emitida por autoridade competente angolana.",
    ],
  },
  {
    id: "cookies",
    label: "04",
    title: "Cookies e Tecnologias Similares",
    body: [
      "O nosso site pode utilizar cookies — pequenos ficheiros de texto guardados no seu dispositivo — para melhorar a experiência de navegação, memorizar as suas preferências e analisar o tráfego de forma agregada e anónima.",
      "Pode configurar o seu navegador para recusar cookies ou para ser alertado quando estes são enviados. Note que algumas funcionalidades do site podem não estar disponíveis se desactivar os cookies.",
    ],
  },
  {
    id: "seguranca",
    label: "05",
    title: "Segurança dos Dados",
    body: [
      "Adoptamos medidas técnicas e organizativas adequadas para proteger os seus dados pessoais contra acesso não autorizado, perda, destruição ou divulgação indevida. O acesso interno é restrito às pessoas com necessidade legítima de o fazer.",
      "Apesar dos nossos esforços, nenhum sistema de transmissão de dados pela internet é 100% seguro. Caso detecte qualquer actividade suspeita relacionada com os seus dados, pedimos que nos contacte imediatamente.",
    ],
  },
  {
    id: "direitos",
    label: "06",
    title: "Os Seus Direitos",
    body: [
      "Tem o direito de aceder, rectificar, apagar ou limitar o tratamento dos seus dados pessoais. Pode também opor-se ao tratamento dos seus dados para fins de marketing e, onde aplicável, solicitar a portabilidade dos mesmos.",
      "Para exercer qualquer um destes direitos, contacte-nos através do endereço geral@cfagasosa.com. Responderemos no prazo máximo de 30 dias úteis.",
    ],
  },
  {
    id: "alteracoes",
    label: "07",
    title: "Alterações a esta Política",
    body: [
      "A Gasosa Auto Agro reserva-se o direito de actualizar esta Política de Privacidade a qualquer momento, de forma a reflectir mudanças nas nossas práticas ou na legislação aplicável. A versão mais recente estará sempre disponível nesta página, com a respectiva data de revisão.",
      "Recomendamos que consulte esta página periodicamente. A continuação da utilização do site após qualquer alteração constitui aceitação das novas condições.",
    ],
  },
] as const;

export function PrivacidadePage() {
  const { t } = useLang();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useSEO({
    title: "Política de Privacidade — Gasosa Auto Agro",
    description: "Saiba como a Gasosa Auto Agro recolhe, usa e protege os seus dados pessoais. Transparência e respeito pela sua privacidade.",
    path: "/privacidade",
    breadcrumb: { name: "Política de Privacidade", path: "/privacidade" },
    schema: [],
  });

  return (
    <div className="w-full flex flex-col" style={{ fontFamily: "'Poppins', sans-serif", background: BG }}>

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
            style={{ padding: "clamp(6px, 1.2vw, 10px)", color: TEXT, background: "none", border: "none", cursor: "pointer" }}
            onClick={() => setMobileMenuOpen(true)}
            aria-label={t.mobile.openMenu}
          >
            <Menu style={{ width: "clamp(20px, 3vw, 26px)", height: "clamp(20px, 3vw, 26px)" }} />
          </button>
        </header>
      </NavThemeCtx.Provider>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* ── Hero ── */}
      <section
        style={{
          paddingTop: "clamp(140px, 20vh, 220px)",
          paddingBottom: "clamp(72px, 10vw, 120px)",
          ...WRAP,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 28 }}
          style={{
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            color: NAVY,
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          — TRANSPARÊNCIA. CONFIANÇA. RESPEITO.
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.08 }}
          style={{
            fontSize: "clamp(2.8rem, 1.4rem + 5.5vw, 7rem)",
            fontWeight: 700,
            color: TEXT,
            lineHeight: 0.96,
            letterSpacing: "-0.035em",
            margin: "0 0 clamp(28px, 4vw, 48px)",
            maxWidth: "800px",
          }}
        >
          Política de<br />Privacidade
        </motion.h1>

        {/* Divider + meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(16px, 3vw, 32px)" }}
        >
          <div style={{ width: "48px", height: "2px", background: NAVY, flexShrink: 0 }} />
          <p style={{ fontSize: "clamp(0.85rem, 0.75rem + 0.4vw, 1rem)", color: MUTED, margin: 0, lineHeight: 1.6, maxWidth: "540px" }}>
            A Gasosa Auto Agro respeita a sua privacidade. Esta política explica de forma clara e simples como recolhemos, utilizamos e protegemos os seus dados pessoais.
          </p>
          <span
            style={{
              marginLeft: "auto",
              fontSize: "0.72rem",
              fontWeight: 500,
              color: "rgba(0,0,0,0.3)",
              letterSpacing: "0.08em",
              whiteSpace: "nowrap",
            }}
          >
            Última revisão: Junho 2026
          </span>
        </motion.div>
      </section>

      {/* ── Índice rápido ── */}
      <section style={{ borderTop: `1.5px solid ${DIVIDER}`, borderBottom: `1.5px solid ${DIVIDER}` }}>
        <div
          style={{
            ...WRAP,
            paddingTop: "clamp(28px, 4vw, 44px)",
            paddingBottom: "clamp(28px, 4vw, 44px)",
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(10px, 2vw, 20px)",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", color: "rgba(0,0,0,0.3)", textTransform: "uppercase", marginRight: "8px" }}>
            Conteúdo
          </span>
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              style={{
                fontSize: "0.8rem",
                color: MUTED,
                textDecoration: "none",
                padding: "6px 14px",
                borderRadius: "100px",
                border: `1px solid ${DIVIDER}`,
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = NAVY;
                (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = NAVY;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color = MUTED;
                (e.currentTarget as HTMLAnchorElement).style.borderColor = DIVIDER;
              }}
            >
              {s.title}
            </a>
          ))}
        </div>
      </section>

      {/* ── Secções do conteúdo ── */}
      <section style={{ paddingTop: "clamp(64px, 9vw, 120px)", paddingBottom: "clamp(80px, 11vw, 160px)" }}>
        <div style={{ ...WRAP, display: "flex", flexDirection: "column", gap: "0" }}>
          {SECTIONS.map((s, i) => (
            <motion.div
              key={s.id}
              id={s.id}
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              custom={0}
              style={{
                display: "grid",
                gridTemplateColumns: "clamp(52px, 8vw, 100px) 1fr",
                gap: "clamp(20px, 4vw, 56px)",
                paddingTop: i === 0 ? "0" : "clamp(40px, 6vw, 72px)",
                paddingBottom: "clamp(40px, 6vw, 72px)",
                borderBottom: i < SECTIONS.length - 1 ? `1px solid ${DIVIDER}` : "none",
                alignItems: "start",
              }}
            >
              {/* Número */}
              <div style={{ paddingTop: "4px" }}>
                <span
                  style={{
                    fontSize: "clamp(0.65rem, 0.55rem + 0.4vw, 0.8rem)",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: NAVY,
                    display: "block",
                    lineHeight: 1,
                  }}
                >
                  {s.label}
                </span>
              </div>

              {/* Conteúdo */}
              <div>
                <h2
                  style={{
                    fontSize: "clamp(1.3rem, 0.9rem + 1.8vw, 2.2rem)",
                    fontWeight: 600,
                    color: TEXT,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.1,
                    margin: "0 0 clamp(18px, 2.5vw, 28px)",
                  }}
                >
                  {s.title}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "720px" }}>
                  {s.body.map((para, j) => (
                    <p
                      key={j}
                      style={{
                        fontSize: "clamp(0.88rem, 0.78rem + 0.4vw, 1.02rem)",
                        color: MUTED,
                        lineHeight: 1.75,
                        margin: 0,
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA Contacto ── */}
      <section style={{ background: TEXT }}>
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          custom={0}
          style={{
            ...WRAP,
            paddingTop: "clamp(64px, 9vw, 100px)",
            paddingBottom: "clamp(64px, 9vw, 100px)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "clamp(28px, 4vw, 48px)",
          }}
        >
          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.18em", color: "rgba(255,255,255,0.4)", marginBottom: "14px", textTransform: "uppercase" }}>
              Dúvidas ou pedidos
            </p>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 1rem + 3vw, 3.5rem)",
                fontWeight: 600,
                color: "#ffffff",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              Fale connosco<br />sobre a sua privacidade.
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "flex-start" }}>
            <motion.a
              href="mailto:geral@cfagasosa.com"
              whileHover={{ scale: 1.03 }}
              style={{
                display: "inline-block",
                padding: "clamp(14px, 2vw, 18px) clamp(28px, 4vw, 44px)",
                background: NAVY,
                color: "#ffffff",
                fontSize: "clamp(0.85rem, 0.75rem + 0.4vw, 1rem)",
                fontWeight: 600,
                borderRadius: "100px",
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "background 0.2s",
                fontFamily: "'Poppins', sans-serif",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#002570")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = NAVY)}
            >
              geral@cfagasosa.com
            </motion.a>
            <Link
              href="/contactos"
              style={{
                display: "inline-block",
                padding: "clamp(12px, 1.8vw, 16px) clamp(28px, 4vw, 44px)",
                background: "transparent",
                color: "rgba(255,255,255,0.55)",
                fontSize: "clamp(0.82rem, 0.72rem + 0.38vw, 0.95rem)",
                fontWeight: 500,
                borderRadius: "100px",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.15)",
                letterSpacing: "0.01em",
                transition: "all 0.2s",
                fontFamily: "'Poppins', sans-serif",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)"; }}
            >
              Página de contactos →
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
