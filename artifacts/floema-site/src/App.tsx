import { Switch, Route, Router as WouterRouter, Link } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Search, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

const MotionLink = motion.create(Link);

const NAV_ITEMS = ["PRODUTOS", "SOBRE", "SUSTENTABILIDADE", "JORNAL"];

const LANGUAGES = [
  { code: "EN", label: "EN" },
  { code: "PT", label: "PT" },
  { code: "ES", label: "ES" },
];

function NavPill({ item, overlap }: { item: string; overlap?: boolean }) {
  return (
    <MotionLink
      href={`/${item.toLowerCase()}`}
      className="text-[11px] font-semibold tracking-widest py-[7px] rounded-full bg-white text-foreground whitespace-nowrap inline-flex items-center justify-center relative"
      style={{
        paddingLeft: "1.25rem",
        paddingRight: "1.25rem",
        marginLeft: overlap ? "-4px" : "0",
      }}
      whileHover={{ paddingLeft: "1.75rem", paddingRight: "1.75rem", zIndex: 10 }}
      transition={{ type: "spring", stiffness: 350, damping: 18 }}
    >
      {item}
    </MotionLink>
  );
}

function LangDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("PT");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-0.5 text-[11px] font-semibold tracking-widest text-foreground cursor-pointer select-none"
        data-testid="button-lang-selector"
      >
        {selected}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="inline-flex"
        >
          <ChevronDown className="w-3 h-3" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-md overflow-hidden min-w-[72px] z-50"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setSelected(lang.code); setOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-[11px] font-semibold tracking-widest transition-colors cursor-pointer
                  ${selected === lang.code ? "bg-neutral-100 text-foreground" : "text-foreground hover:bg-neutral-50"}`}
                data-testid={`button-lang-${lang.code}`}
              >
                {lang.label}
                {selected === lang.code && (
                  <Check className="w-3 h-3 ml-2 text-foreground" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Home() {
  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col">
      <header className="w-full flex items-center justify-between px-6 py-6 max-w-[1400px] mx-auto relative z-10">
        <div className="flex items-center gap-1">
          <Link href="/" className="flex items-start">
            <span className="text-xl font-medium tracking-tight text-foreground">Floema</span>
            <span className="text-[10px] leading-none ml-[2px] mt-[4px] font-sans">®</span>
          </Link>
          <button className="p-2 ml-1 text-foreground/80 hover:text-foreground transition-colors cursor-pointer" aria-label="Search">
            <Search className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <div className="flex items-center">
            {NAV_ITEMS.map((item, i) => (
              <NavPill key={item} item={item} overlap={i > 0} />
            ))}
          </div>
          <LangDropdown />
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground leading-[1.1] mb-2">
            Espaços pensados para viver<br />
            e durar uma vida.
          </h1>
        </div>
      </main>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
