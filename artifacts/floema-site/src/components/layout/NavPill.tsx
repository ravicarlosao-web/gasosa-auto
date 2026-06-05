import { useContext } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { NavThemeCtx, NavAccentCtx, MotionLink } from "../../lib/nav-theme";
import { setPendingAnchor } from "../../lib/scroll-anchor";

const SCROLL_MAP: Record<string, string> = {
  "/quem-somos":     "quem-somos",
  "/about-us":       "quem-somos",
  "/quiénes-somos":  "quem-somos",
};

export function NavPill({ item }: { item: string }) {
  const light = useContext(NavThemeCtx);
  const accent = useContext(NavAccentCtx);
  const [location, navigate] = useLocation();
  const href = `/${item.toLowerCase().replace(/\s+/g, "-")}`;
  const anchorId = SCROLL_MAP[href];
  const isActive = anchorId ? location === "/" : location === href;

  function handleScrollClick(e: React.MouseEvent) {
    e.preventDefault();
    const el = document.getElementById(anchorId!);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      setPendingAnchor(anchorId!);
      navigate("/");
    }
  }

  const pillClass =
    "text-[13px] font-semibold tracking-widest px-4 py-2 whitespace-nowrap inline-flex flex-col items-center justify-center relative gap-0";

  const underline = (
    <motion.span
      style={{
        display: "block",
        height: "2px",
        borderRadius: "2px",
        background: accent,
        width: "100%",
        marginTop: "3px",
      }}
      initial={false}
      animate={{ opacity: isActive ? 1 : 0, scaleX: isActive ? 1 : 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    />
  );

  if (anchorId) {
    return (
      <motion.a
        href={`/#${anchorId}`}
        onClick={handleScrollClick}
        className={pillClass}
        animate={{ color: light ? "#ffffff" : "#111111" }}
        whileHover={{ color: light ? "rgba(255,255,255,0.7)" : "#003591" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {item}
        {underline}
      </motion.a>
    );
  }

  return (
    <MotionLink
      href={href}
      className={pillClass}
      animate={{ color: light ? "#ffffff" : "#111111" }}
      whileHover={{ color: light ? "rgba(255,255,255,0.7)" : "#003591" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {item}
      {underline}
    </MotionLink>
  );
}
