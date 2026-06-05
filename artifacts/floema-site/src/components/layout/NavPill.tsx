import { useContext } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { NavThemeCtx, MotionLink } from "../../lib/nav-theme";

export function NavPill({ item }: { item: string }) {
  const light = useContext(NavThemeCtx);
  const [location] = useLocation();
  const href = `/${item.toLowerCase().replace(/\s+/g, "-")}`;
  const isActive = location === href;

  return (
    <MotionLink
      href={href}
      className="text-[13px] font-semibold tracking-widest px-4 py-2 whitespace-nowrap inline-flex flex-col items-center justify-center relative gap-0"
      animate={{ color: light ? "#ffffff" : "#111111" }}
      whileHover={{ color: light ? "rgba(255,255,255,0.7)" : "#003591" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {item}
      <motion.span
        style={{
          display: "block",
          height: "2px",
          borderRadius: "2px",
          background: "#F5A000",
          width: "100%",
          marginTop: "3px",
        }}
        initial={false}
        animate={{ opacity: isActive ? 1 : 0, scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      />
    </MotionLink>
  );
}
