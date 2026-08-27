import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useLang } from "../../i18n";
import { MILESTONE_STATIC } from "../../data/constants";
import { LazyImage } from "../ui/lazy-image";
import teamPhoto from "@assets/WhatsApp_Image_2026-08-27_at_14.50.51_1787840686863.jpeg";

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
          ? "border-b border-black/10 md:border-b-0 md:border-r md:border-black/10"
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
            color: "rgba(0,0,0,0.4)",
            display: "block",
            marginBottom: "4px",
          }}>
            {year} — {label}
          </span>
          <span style={{
            fontSize: "clamp(0.95rem, 0.7rem + 1vw, 1.15rem)",
            fontWeight: 700,
            color: "#111111",
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
            color: "rgba(0,0,0,0.55)",
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
    <div className="mt-0 pt-10 border-t border-black/10 flex flex-col sm:flex-row items-start justify-between gap-10 lg:gap-16">
      <div className="overflow-hidden sm:flex-1 sm:min-w-0">
        <motion.span
          style={{
            x: yearX,
            opacity: yearOpacity,
            display: "block",
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            color: "#111111",
            fontSize: "clamp(3.8rem, 1.8rem + 6.2vw, 7.5rem)",
          }}
        >
          {t.historia.currentYear}
        </motion.span>
      </div>

      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="w-full sm:flex-[0_1_520px] sm:max-w-[520px] pb-2"
      >
        <span style={{
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          color: "rgba(0,0,0,0.4)",
          display: "block",
          marginBottom: "12px",
        }}>
          {t.historia.currentLabel}
        </span>
        <p style={{
          color: "rgba(0,0,0,0.76)",
          fontSize: "clamp(0.95rem, 0.7rem + 0.75vw, 1.2rem)",
          lineHeight: 1.7,
          fontWeight: 500,
          margin: 0,
        }}>
          {t.historia.currentText}
        </p>
        <div
          style={{
            width: "100%",
            aspectRatio: "4 / 3",
            marginTop: "clamp(24px, 3vw, 36px)",
            borderRadius: "14px",
            overflow: "hidden",
          }}
        >
          <img
            src={teamPhoto}
            alt="Equipa actual da Gasosa Auto Agro"
            loading="lazy"
            decoding="async"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 38%",
              display: "block",
            }}
          />
        </div>
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
      className="w-full"
      style={{ background: "#ffffff", fontFamily: "'Poppins', sans-serif", position: "relative" }}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 pt-10 pb-16 sm:pt-14 sm:pb-24">
        <div className="overflow-hidden mb-8 sm:mb-10">
          <motion.h2
            style={{
              y: headingY,
              opacity: headingOpacity,
              color: "#111111",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "0.01em",
              fontSize: "clamp(1.05rem, 0.75rem + 1.7vw, 2.25rem)",
              maxWidth: "680px",
            }}
          >
            {t.historia.heading}
          </motion.h2>
        </div>

        <div
          style={{
            maxWidth: "780px",
            marginBottom: "clamp(42px, 6vw, 72px)",
          }}
        >
          {t.historia.intro.map((paragraph, index) => (
            <p
              key={index}
              style={{
                color: "rgba(0,0,0,0.62)",
                fontSize: "clamp(0.9rem, 0.76rem + 0.45vw, 1.08rem)",
                lineHeight: 1.75,
                margin: index === t.historia.intro.length - 1 ? 0 : "0 0 16px",
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-black/10">
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
