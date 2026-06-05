import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import nergyImg1 from "@assets/ChatGPT_Image_26_de_mai._de_2026,_14_26_17_2_1780147809888.png";
import nergyImg2 from "@assets/ChatGPT_Image_26_de_mai._de_2026,_14_26_17_3_1780147827214.png";
import nergyImg3 from "@assets/IMG_20250903_113401_1780387574299.jpg";
import nergyImg4 from "@assets/IMG_20250903_111532_1780387597136.jpg";
import nergyImg5 from "@assets/1000015282_1780387656692.jpg";
import nergyImg6 from "@assets/WhatsApp_Image_2025-09-03_at_11.33.28_(2)_1780387695350.jpeg";

const MARCAS_DEFAULT = {
  title: "Marcas Representadas",
  body: "Trabalhamos com marcas internacionais de referência para garantir qualidade e confiança em cada produto que disponibilizamos.",
};

const MARCAS_NERGY = {
  title: "Nergytech",
  body: "A Nergytech é uma marca de excelência internacional em lubrificantes de alto desempenho. A Gasosa Auto Agro detém a representação exclusiva em Angola — levando ao mercado angolano produtos desenvolvidos para as mais exigentes condições de operação, nos sectores automóvel, industrial e agrícola.",
};

export function MarcasRepresentadasSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showBrand, setShowBrand] = useState(false);

  const [winWidth, setWinWidth] = useState(
    () => (typeof window !== "undefined" ? window.innerWidth : 1280)
  );
  useEffect(() => {
    const onResize = () => setWinWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = winWidth < 600;
  const isTablet = winWidth >= 600 && winWidth < 1024;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setShowBrand(v > 0.08);
  });

  const y1L = useTransform(scrollYProgress, [0, 0.08, 0.42, 1   ], ["110vh", "110vh", "-110vh", "-110vh"]);
  const y1R = useTransform(scrollYProgress, [0, 0.08, 0.48, 1   ], ["140vh", "140vh", "-110vh", "-110vh"]);
  const y2L = useTransform(scrollYProgress, [0, 0.38, 0.72, 1   ], ["110vh", "110vh", "-110vh", "-110vh"]);
  const y2R = useTransform(scrollYProgress, [0, 0.38, 0.78, 1   ], ["140vh", "140vh", "-110vh", "-110vh"]);
  const y3L = useTransform(scrollYProgress, [0, 0.68, 1.00      ], ["110vh", "110vh", "-110vh"]);
  const y3R = useTransform(scrollYProgress, [0, 0.68, 1.00      ], ["140vh", "140vh", "-110vh"]);

  const yMobL = useTransform(scrollYProgress, [0, 0.08, 0.55, 1 ], ["110vh", "110vh", "-110vh", "-110vh"]);
  const yMobR = useTransform(scrollYProgress, [0, 0.08, 0.65, 1 ], ["140vh", "140vh", "-110vh", "-110vh"]);

  const content = showBrand ? MARCAS_NERGY : MARCAS_DEFAULT;

  const imgStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center center",
    display: "block",
  };

  const desktopImgWidth = "min(22vw, 340px)";
  const desktopImgInset = "min(4vw, 64px)";
  const tabletImgWidth  = "min(18vw, 220px)";
  const tabletImgInset  = "2.5vw";
  const mobileImgWidth  = "43vw";

  const paraMaxWidth = isMobile
    ? "min(88vw, 400px)"
    : isTablet
    ? "min(56vw, 500px)"
    : "clamp(320px, 44vw, 600px)";

  const imgBox = (
    y: ReturnType<typeof useTransform>,
    src: string,
    alt: string,
    left?: string,
    right?: string,
    top: string | number = 0,
    width = desktopImgWidth,
  ) => (
    <motion.div
      style={{
        y,
        position: "absolute",
        top,
        ...(left  !== undefined ? { left  } : {}),
        ...(right !== undefined ? { right } : {}),
        width,
        aspectRatio: "3 / 4",
        overflow: "hidden",
        zIndex: 3,
      }}
    >
      <img src={src} alt={alt} style={imgStyle} />
    </motion.div>
  );

  return (
    <div
      ref={containerRef}
      style={{ height: "520vh", background: "#F5EFE9", position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* ── Centre text ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: isMobile ? "flex-start" : "center",
            textAlign: "center",
            zIndex: 2,
            pointerEvents: "none",
            padding: isMobile ? "8vh 24px 0" : "0 16px",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={showBrand ? "brand" : "default"}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ type: "spring", stiffness: 200, damping: 28 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}
            >
              <h2
                style={{
                  fontSize: isMobile
                    ? "clamp(2.2rem, 8vw, 3.2rem)"
                    : isTablet
                    ? "clamp(2.4rem, 5vw, 4rem)"
                    : "clamp(2.8rem, 3.5vw, 6rem)",
                  fontWeight: 300,
                  color: "#111111",
                  lineHeight: 1.08,
                  letterSpacing: "-0.03em",
                  margin: "0 0 clamp(16px, 2.4vw, 36px)",
                  textAlign: "center",
                  width: "100%",
                  padding: 0,
                }}
              >
                {content.title}
              </h2>
              <p
                style={{
                  fontSize: isMobile
                    ? "clamp(0.88rem, 3.5vw, 1rem)"
                    : "clamp(0.85rem, 0.74rem + 0.42vw, 1.02rem)",
                  color: "rgba(0,0,0,0.48)",
                  lineHeight: 1.85,
                  maxWidth: paraMaxWidth,
                  textAlign: "center",
                  margin: "0 auto",
                }}
              >
                {content.body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Images ── */}
        {isMobile ? (
          <>
            <motion.div style={{ y: yMobL, position: "absolute", top: "52vh", left: "4vw", width: mobileImgWidth, aspectRatio: "3 / 4", overflow: "hidden", zIndex: 3 }}>
              <img src={nergyImg1} alt="Nergytech lubrificantes" style={imgStyle} />
            </motion.div>
            <motion.div style={{ y: yMobR, position: "absolute", top: "52vh", right: "4vw", width: mobileImgWidth, aspectRatio: "3 / 4", overflow: "hidden", zIndex: 3 }}>
              <img src={nergyImg4} alt="Nergytech armazém" style={imgStyle} />
            </motion.div>
          </>
        ) : isTablet ? (
          <>
            {imgBox(y1L, nergyImg1, "Nergytech lubrificantes", tabletImgInset, undefined, 0, tabletImgWidth)}
            {imgBox(y1R, nergyImg2, "Nergytech loja",          undefined, tabletImgInset, 0, tabletImgWidth)}
            {imgBox(y2L, nergyImg3, "Nergytech armazém",       tabletImgInset, undefined, 0, tabletImgWidth)}
            {imgBox(y2R, nergyImg4, "Nergytech baterias",      undefined, tabletImgInset, 0, tabletImgWidth)}
            {imgBox(y3L, nergyImg5, "Nergytech stock",         tabletImgInset, undefined, 0, tabletImgWidth)}
            {imgBox(y3R, nergyImg6, "Nergytech empilhador",    undefined, tabletImgInset, 0, tabletImgWidth)}
          </>
        ) : (
          <>
            {imgBox(y1L, nergyImg1, "Nergytech lubrificantes", desktopImgInset, undefined, 0, desktopImgWidth)}
            {imgBox(y1R, nergyImg2, "Nergytech loja",          undefined, desktopImgInset, 0, desktopImgWidth)}
            {imgBox(y2L, nergyImg3, "Nergytech armazém",       desktopImgInset, undefined, 0, desktopImgWidth)}
            {imgBox(y2R, nergyImg4, "Nergytech baterias",      undefined, desktopImgInset, 0, desktopImgWidth)}
            {imgBox(y3L, nergyImg5, "Nergytech stock",         desktopImgInset, undefined, 0, desktopImgWidth)}
            {imgBox(y3R, nergyImg6, "Nergytech empilhador",    undefined, desktopImgInset, 0, desktopImgWidth)}
          </>
        )}
      </div>
    </div>
  );
}
