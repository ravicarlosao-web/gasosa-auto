import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useLang } from "../../i18n";
import { MILESTONE_STATIC } from "../../data/constants";
import { LazyImage } from "../ui/lazy-image";

function MilestoneCard({
  year,
  image,
  label,
  subtitle,
  description,
  index,
  sectionProgress,
}: {
  year: string;
  image: string;
  label: string;
  subtitle: string;
  description: string;
  index: number;
  sectionProgress: ReturnType<typeof useSpring>;
}) {
  const imgRef = useRef(null);
  const { scrollYProgress: imgScroll } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgSmoothScroll = useSpring(imgScroll, { stiffness: 60, damping: 20, restDelta: 0.001 });
  const imageY = useTransform(imgSmoothScroll, [0, 1], ["-12%", "12%"]);

  const base = 0.06 + index * 0.09;
  const labelOpacity = useTransform(sectionProgress, [base, base + 0.14], [0, 1]);
  const labelX = useTransform(sectionProgress, [base, base + 0.14], [-18, 0]);
  const cardOpacity = useTransform(sectionProgress, [base + 0.03, base + 0.18], [0, 1]);
  const cardY = useTransform(sectionProgress, [base + 0.03, base + 0.18], [40, 0]);
  const descOpacity = useTransform(sectionProgress, [base + 0.08, base + 0.22], [0, 1]);
  const descY = useTransform(sectionProgress, [base + 0.08, base + 0.22], [20, 0]);

  return (
    <div
      className={`overflow-hidden ${
        index < MILESTONE_STATIC.length - 1
          ? "border-b border-white/15 md:border-b-0 md:border-r md:border-white/15"
          : ""
      }`}
    >
      <div
        className="px-0 md:px-8 pt-10 pb-10"
        style={{ paddingLeft: index === 0 ? 0 : undefined }}
      >
        <motion.div style={{ opacity: labelOpacity, x: labelX, marginBottom: "16px" }}>
          <span style={{
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.45)",
            display: "block",
            marginBottom: "4px",
          }}>
            {year} — {label}
          </span>
          <span style={{
            fontSize: "clamp(0.95rem, 0.7rem + 1vw, 1.15rem)",
            fontWeight: 700,
            color: "#ffffff",
            display: "block",
            lineHeight: 1.2,
          }}>
            {subtitle}
          </span>
        </motion.div>

        <motion.div
          style={{ opacity: cardOpacity, y: cardY }}
          className="w-full rounded-xl overflow-hidden mb-6"
          ref={imgRef}
        >
          <motion.div style={{ y: imageY, height: "clamp(160px, 28vw, 220px)", position: "relative" }}>
            <LazyImage
              fill
              src={image}
              alt={`Gasosa Auto Agro — ${year}`}
              loading="lazy"
              imgStyle={{ filter: "brightness(0.82) saturate(0.9)" }}
            />
          </motion.div>
        </motion.div>

        <motion.p
          style={{
            opacity: descOpacity,
            y: descY,
            color: "rgba(255,255,255,0.78)",
            fontSize: "clamp(0.78rem, 0.6rem + 0.6vw, 0.92rem)",
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}

function CurrentYearHighlight({
  sectionProgress,
}: {
  sectionProgress: ReturnType<typeof useSpring>;
}) {
  const { t } = useLang();

  const yearX = useTransform(sectionProgress, [0.38, 0.62], [-60, 0]);
  const yearOpacity = useTransform(sectionProgress, [0.38, 0.58], [0, 1]);
  const textY = useTransform(sectionProgress, [0.44, 0.66], [28, 0]);
  const textOpacity = useTransform(sectionProgress, [0.44, 0.62], [0, 1]);

  return (
    <div className="mt-0 pt-10 border-t border-white/20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
      <div className="overflow-hidden">
        <motion.span
          style={{
            x: yearX,
            opacity: yearOpacity,
            display: "block",
            fontWeight: 800,
            lineHeight: 0.85,
            letterSpacing: "-0.04em",
            color: "#ffffff",
            fontSize: "clamp(5rem, 4rem + 10vw, 14rem)",
          }}
        >
          2025
        </motion.span>
      </div>

      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="sm:max-w-[360px] pb-2"
      >
        <span style={{
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.45)",
          display: "block",
          marginBottom: "8px",
        }}>
          {t.historia.currentLabel}
        </span>
        <p style={{
          color: "rgba(255,255,255,0.85)",
          fontSize: "clamp(0.85rem, 0.6rem + 0.8vw, 1.05rem)",
          lineHeight: 1.65,
          fontWeight: 500,
        }}>
          {t.historia.currentText}
        </p>
      </motion.div>
    </div>
  );
}

export function HistoriaSection() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const sectionProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  const headingY = useTransform(sectionProgress, [0, 0.14], [55, 0]);
  const headingOpacity = useTransform(sectionProgress, [0, 0.11], [0, 1]);

  return (
    <section
      ref={sectionRef}
      data-nav-light
      className="w-full"
      style={{ background: "#003591", fontFamily: "'Poppins', sans-serif", position: "relative" }}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 pt-10 pb-16 sm:pt-14 sm:pb-24">
        <div className="overflow-hidden mb-16 sm:mb-20">
          <motion.h2
            style={{
              y: headingY,
              opacity: headingOpacity,
              color: "#ffffff",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "0.01em",
              fontSize: "clamp(1.25rem, 0.8rem + 2.8vw, 4rem)",
              maxWidth: "700px",
            }}
          >
            {t.historia.heading}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/20">
          {MILESTONE_STATIC.map((m, i) => {
            const tr = t.historia.milestones[i];
            return (
              <MilestoneCard
                key={m.year}
                year={m.year}
                image={m.image}
                label={tr.label}
                subtitle={tr.subtitle}
                description={tr.description}
                index={i}
                sectionProgress={sectionProgress}
              />
            );
          })}
        </div>

        <CurrentYearHighlight sectionProgress={sectionProgress} />
      </div>
    </section>
  );
}
