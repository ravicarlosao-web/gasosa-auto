import { Switch, Route, Router as WouterRouter, Link } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Search, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

const MotionLink = motion.create(Link);

const NAV_ITEMS = ["PRODUTOS", "SOBRE", "SUSTENTABILIDADE", "JORNAL"];

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
          <div className="flex items-center gap--3">
            {NAV_ITEMS.map((item, i) => (
              <NavPill key={item} item={item} overlap={i > 0} />
            ))}
          </div>
          <button className="flex items-center text-[11px] font-semibold tracking-widest text-foreground cursor-pointer">
            PT <ChevronDown className="w-3 h-3 ml-0.5" />
          </button>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground leading-[1.1] mb-2"
          >
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
