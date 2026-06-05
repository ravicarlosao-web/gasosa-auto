import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { X } from "lucide-react";
import logoSrc from "@assets/ChatGPT_Image_21_de_mai._de_2026,_12_09_16_1_1779362713859.png";
import { LANGUAGES } from "../../lib/nav-theme";
import { useLang } from "../../i18n";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, lang, setLang } = useLang();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: "-6%", scale: 0.98 }}
          animate={{ opacity: 1, y: "0%", scale: 1 }}
          exit={{ opacity: 0, y: "-4%", scale: 0.98 }}
          transition={{ type: "spring", stiffness: 340, damping: 32, mass: 0.85 }}
          className="fixed inset-0 z-[60] bg-background flex flex-col px-6 pt-6 pb-12"
          style={{ transformOrigin: "top center" }}
        >
          <div className="flex items-center justify-between mb-10">
            <Link href="/" onClick={onClose}>
              <img src={logoSrc} alt="Gasosa Auto Agro" className="h-11 w-auto object-contain" />
            </Link>
            <motion.button
              onClick={onClose}
              className="p-2 text-foreground"
              whileTap={{ scale: 0.88, rotate: 90 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>
          <nav className="flex flex-col gap-0">
            {t.nav.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.055, type: "spring", stiffness: 280, damping: 28 }}
              >
                <Link
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={onClose}
                  className="text-2xl font-medium tracking-tight text-foreground py-4 border-b border-foreground/8 flex items-center justify-between"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {item}
                  <motion.span
                    style={{ color: "#003591", display: "inline-block" }}
                    initial={{ x: -4, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.055 + 0.12, type: "spring", stiffness: 300, damping: 24 }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </nav>
          <motion.div
            className="mt-10 flex gap-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: t.nav.length * 0.055 + 0.08, type: "spring", stiffness: 240, damping: 26 }}
          >
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`text-[11px] font-semibold tracking-widest px-4 py-2 rounded-full transition-colors ${
                  lang === l.code ? "text-white" : "bg-white text-foreground"
                }`}
                style={lang === l.code ? { background: "#003591" } : {}}
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
