import { useContext } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { NavThemeCtx } from "../../lib/nav-theme";
import defaultLogoSrc from "@assets/ChatGPT_Image_21_de_mai._de_2026,_12_09_16_1_1779362713859.png";
import pangLogoSrc    from "@assets/Design_sem_nome__3_-removebg-preview_1780700241547.png";
import infraLogoSrc   from "@assets/Design_sem_nome__2_-removebg-preview_1780700075899.png";

const ROUTE_LOGOS: Record<string, string> = {
  "/pangulino":       pangLogoSrc,
  "/infraestruturas": infraLogoSrc,
};

interface NavLogoProps {
  style?: React.CSSProperties;
}

export function NavLogo({ style }: NavLogoProps) {
  const [location] = useLocation();
  const navLight = useContext(NavThemeCtx);

  const isCustom = location in ROUTE_LOGOS;
  const src = ROUTE_LOGOS[location] ?? defaultLogoSrc;
  const filter = isCustom
    ? "none"
    : navLight
    ? "brightness(0) invert(1)"
    : "brightness(1) invert(0)";

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.img
        key={src}
        src={src}
        alt="Gasosa Auto Agro"
        fetchPriority="high"
        decoding="sync"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, filter }}
        exit={{ opacity: 0 }}
        transition={{
          opacity: { duration: 0.22, ease: "easeInOut" },
          filter:  { duration: 0.35, ease: "easeOut" },
        }}
        style={{
          height: "clamp(36px, 5vw, 54px)",
          width: "auto",
          objectFit: "contain",
          ...style,
        }}
      />
    </AnimatePresence>
  );
}
