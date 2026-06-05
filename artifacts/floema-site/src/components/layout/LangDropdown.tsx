import { useState, useRef, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { NavThemeCtx, LANGUAGES } from "../../lib/nav-theme";
import { useLang } from "../../i18n";

export function LangDropdown() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const light = useContext(NavThemeCtx);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-0.5 text-[11px] font-semibold tracking-widest cursor-pointer select-none"
        animate={{ color: light ? "#ffffff" : "#111111" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        data-testid="button-lang-selector"
      >
        {lang}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="inline-flex"
        >
          <ChevronDown className="w-3 h-3" />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 bg-white rounded-2xl shadow-lg overflow-hidden min-w-[72px] z-50"
            style={{ transformOrigin: "top center" }}
          >
            {LANGUAGES.map((l, i) => (
              <motion.button
                key={l.code}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, type: "spring", stiffness: 400, damping: 22 }}
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-[11px] font-semibold tracking-widest transition-colors cursor-pointer
                  ${lang === l.code ? "bg-neutral-100" : "hover:bg-neutral-50"}`}
                style={{ color: "#003591" }}
                data-testid={`button-lang-${l.code}`}
              >
                {l.label}
                {lang === l.code && (
                  <Check className="w-3 h-3 ml-3" style={{ color: "#003591" }} />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
