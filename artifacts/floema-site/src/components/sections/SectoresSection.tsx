import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useLang } from "../../i18n";
import { useIsMobile } from "@/hooks/use-mobile";
import { SECTORES_DATA } from "../../data/constants";
import { textVariants } from "../../lib/motion-variants";

export function SectoresSection() {
  const { t } = useLang();
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const directionRef = useRef<number>(1);
  const activeIndexRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (isMobile) return;
    return scrollYProgress.on("change", (v) => {
      const next = v < 1 / 3 ? 0 : v < 2 / 3 ? 1 : 2;
      if (next !== activeIndexRef.current) {
        directionRef.current = next > activeIndexRef.current ? 1 : -1;
        activeIndexRef.current = next;
        setActiveIndex(next);
      }
    });
  }, [scrollYProgress, isMobile]);

  const sectorsT = SECTORES_DATA.map((s, i) => ({
    ...s,
    name: t.sectores.items[i].name,
    subtitle: t.sectores.items[i].title,
    tagline: t.sectores.items[i].tagline,
    description: t.sectores.items[i].description,
  }));

  const active = sectorsT[activeIndex];
  const dir = directionRef.current;

  useEffect(() => {
    SECTORES_DATA.forEach((s) => {
      [s.image, s.thumbnail].forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }, []);

  if (isMobile) {
    return (
      <div style={{ background: "#F5EFE9", fontFamily: "'Poppins', sans-serif", padding: "clamp(48px, 8vw, 80px) 0" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 40px)" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "clamp(28px, 6vw, 44px)", flexWrap: "wrap" }}>
            {sectorsT.map((s, i) => (
              <motion.button
                key={s.key}
                onClick={() => {
                  directionRef.current = i > activeIndex ? 1 : -1;
                  activeIndexRef.current = i;
                  setActiveIndex(i);
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  padding: "8px 18px",
                  borderRadius: "99px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Poppins', sans-serif",
                  transition: "background 0.25s, color 0.25s",
                  background: i === activeIndex ? "#111111" : "rgba(0,0,0,0.08)",
                  color: i === activeIndex ? "#ffffff" : "rgba(0,0,0,0.55)",
                }}
              >
                {s.name}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={`mobile-sector-${activeIndex}`}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d > 0 ? 24 : -24 }),
                center: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 280, damping: 28, mass: 0.85 } },
                exit: (d: number) => ({ opacity: 0, x: d > 0 ? -24 : 24, transition: { duration: 0.22 } }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <div style={{ width: "100%", aspectRatio: "4/3", borderRadius: "16px", overflow: "hidden", marginBottom: "24px" }}>
                <img
                  src={active.image}
                  alt={active.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <p style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", color: "#F5A000", marginBottom: "10px", textTransform: "uppercase" }}>
                {active.tagline}
              </p>
              <h2 style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", fontWeight: 400, color: "#111111", lineHeight: 1.18, letterSpacing: "-0.03em", margin: "0 0 16px" }}>
                {active.subtitle}
              </h2>
              <p style={{ fontSize: "0.92rem", color: "rgba(0,0,0,0.55)", lineHeight: 1.78, fontWeight: 400, margin: 0 }}>
                {active.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ height: "200vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* ── Left panel ── */}
        <div
          style={{
            width: "clamp(220px, 28%, 420px)",
            flexShrink: 0,
            paddingTop: "clamp(88px, 12vh, 130px)",
            paddingBottom: "clamp(36px, 6vh, 80px)",
            paddingLeft: "clamp(28px, 4.5vw, 64px)",
            paddingRight: "clamp(20px, 3vw, 44px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            background: "#F5EFE9",
          }}
        >
          <div style={{ marginBottom: "clamp(28px, 5vh, 56px)" }}>
            {sectorsT.map((s, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={s.key}
                  style={{ display: "flex", alignItems: "baseline", lineHeight: 1.25, marginBottom: "0.04em" }}
                >
                  <span style={{ display: "inline-block", width: "1.1em", fontSize: "clamp(1.4rem, 2.8vw, 2.8rem)", flexShrink: 0, lineHeight: 1.06 }}>
                    <motion.span
                      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      style={{ display: "inline-flex", alignItems: "center", color: "#111111" }}
                    >
                      <svg width="0.72em" height="0.72em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="13 6 19 12 13 18" />
                      </svg>
                    </motion.span>
                  </span>
                  <motion.span
                    animate={{ color: isActive ? "#111111" : "rgba(0,0,0,0.3)" }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.8rem)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.06 }}
                  >
                    {s.name}
                  </motion.span>
                </div>
              );
            })}
          </div>

          <div style={{ flex: 1 }} />

          <div style={{ width: "clamp(48px, 30%, 100px)", height: 1, background: "rgba(0,0,0,0.18)", marginBottom: "clamp(14px, 2.5vh, 28px)" }} />

          <div style={{ overflow: "hidden", marginBottom: "clamp(14px, 2.5vh, 28px)" }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.p
                key={`tag-${activeIndex}`}
                custom={dir}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ fontSize: "clamp(0.72rem, 0.6rem + 0.4vw, 0.88rem)", fontWeight: 400, color: "rgba(0,0,0,0.55)", lineHeight: 1.45, margin: 0 }}
              >
                {active.tagline} ↓
              </motion.p>
            </AnimatePresence>
          </div>

          <div style={{ width: "clamp(130px, 74%, 230px)", aspectRatio: "3 / 4", overflow: "hidden", position: "relative", flexShrink: 0 }}>
            {sectorsT.map((s, i) => (
              <motion.div
                key={s.key}
                animate={{ y: `${(i - activeIndex) * 100}%` }}
                transition={{ type: "spring", stiffness: 340, damping: 34, mass: 0.7 }}
                style={{ position: "absolute", inset: 0, willChange: "transform" }}
              >
                <img src={s.thumbnail} alt={s.name} loading="eager" decoding="sync" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Middle panel ── */}
        <div
          style={{
            width: "clamp(190px, 22%, 320px)",
            flexShrink: 0,
            paddingTop: "clamp(88px, 12vh, 130px)",
            paddingBottom: "clamp(36px, 6vh, 80px)",
            paddingLeft: "clamp(24px, 3.5vw, 52px)",
            paddingRight: "clamp(20px, 3vw, 44px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            background: "#F5EFE9",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.h3
                key={`sub-${activeIndex}`}
                custom={dir}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ fontSize: "clamp(1.05rem, 0.85rem + 1vw, 1.5rem)", fontWeight: 400, lineHeight: 1.28, letterSpacing: "-0.01em", color: "#111111", margin: 0 }}
              >
                {active.subtitle}
              </motion.h3>
            </AnimatePresence>
          </div>

          <div style={{ flex: 1 }} />

          <div style={{ overflow: "hidden" }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.p
                key={`desc-${activeIndex}`}
                custom={dir}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ fontSize: "clamp(0.75rem, 0.6rem + 0.5vw, 0.93rem)", lineHeight: 1.82, color: "#111111", fontWeight: 400, margin: 0 }}
              >
                {active.description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div
          style={{
            flex: 1,
            background: "#F5EFE9",
            paddingTop: "clamp(88px, 12vh, 130px)",
            paddingBottom: "clamp(36px, 6vh, 80px)",
            paddingLeft: 0,
            paddingRight: "clamp(28px, 4.5vw, 64px)",
            display: "flex",
            minWidth: 0,
          }}
        >
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            {sectorsT.map((s, i) => (
              <motion.div
                key={s.key}
                animate={{ y: `${(i - activeIndex) * 100}%` }}
                transition={{ type: "spring", stiffness: 340, damping: 34, mass: 0.7 }}
                style={{ position: "absolute", inset: 0, willChange: "transform" }}
              >
                <img src={s.image} alt={s.name} loading="eager" decoding="sync" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
