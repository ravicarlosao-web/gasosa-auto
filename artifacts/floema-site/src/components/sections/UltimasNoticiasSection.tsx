import { motion } from "framer-motion";
import { useLang } from "../../i18n";
import { FADE_UP } from "../../lib/motion-variants";
import { NOTICIAS_IMGS } from "../../data/constants";
import { LazyImage } from "../ui/lazy-image";

export function UltimasNoticiasSection() {
  const { t } = useLang();
  const viewport = { once: false, amount: 0.15 } as const;

  return (
    <section
      style={{
        background: "#F5EFE9",
        fontFamily: "'Poppins', sans-serif",
        paddingTop: "clamp(64px, 9vw, 120px)",
        paddingBottom: "clamp(72px, 10vw, 140px)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          paddingLeft: "clamp(20px, 5vw, 64px)",
          paddingRight: "clamp(20px, 5vw, 64px)",
        }}
      >
        {/* ── Heading ── */}
        <div style={{ marginBottom: "clamp(44px, 6vw, 72px)" }}>
          <div style={{ overflow: "hidden" }}>
            <motion.span
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              custom={0}
              style={{ display: "inline-block", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.16em", color: "#003591", marginBottom: "18px" }}
            >
              {t.noticias.tag}
            </motion.span>
          </div>
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              custom={0.1}
              style={{ fontSize: "clamp(2rem, 1.4rem + 2.8vw, 4rem)", fontWeight: 700, color: "#111111", lineHeight: 1.08, letterSpacing: "-0.035em", margin: "0 0 18px" }}
            >
              {t.noticias.heading}
            </motion.h2>
          </div>
          <div style={{ overflow: "hidden" }}>
            <motion.p
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              custom={0.22}
              style={{ fontSize: "clamp(0.93rem, 0.8rem + 0.5vw, 1.15rem)", color: "rgba(0,0,0,0.55)", lineHeight: 1.65, maxWidth: "560px", margin: 0 }}
            >
              {t.noticias.subheading}
            </motion.p>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            gap: "clamp(16px, 2.5vw, 32px)",
          }}
        >
          {t.noticias.items.map((item, i) => (
            <motion.article
              key={i}
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              custom={i * 0.1}
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                overflow: "hidden",
                background: "#F5EFE9",
                boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                transition: "box-shadow 0.25s",
                cursor: "pointer",
              }}
              whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(0,0,0,0.14)" }}
              whileTap={{ scale: 0.99 }}
            >
              <LazyImage
                src={NOTICIAS_IMGS[i % NOTICIAS_IMGS.length]}
                alt={item.titulo}
                aspectRatio="16/9"
                loading="lazy"
                shimmerColor="#e8e0d8"
                wrapperStyle={{ flexShrink: 0 }}
                imgStyle={{ transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              />

              <div style={{ padding: "clamp(18px, 2.5vw, 28px)", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                <h3 style={{ fontSize: "clamp(0.95rem, 0.85rem + 0.4vw, 1.15rem)", fontWeight: 700, color: "#111111", lineHeight: 1.3, margin: 0, letterSpacing: "-0.01em" }}>
                  {item.titulo}
                </h3>
                <p style={{ fontSize: "clamp(0.82rem, 0.76rem + 0.25vw, 0.95rem)", color: "rgba(0,0,0,0.55)", lineHeight: 1.6, margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {item.resumo}
                </p>
                <div style={{ marginTop: "auto", paddingTop: "12px" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", color: "#003591", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    {t.noticias.lerMais} →
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
