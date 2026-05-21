import { Switch, Route, Router as WouterRouter, Link } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Search, ChevronDown } from "lucide-react";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-6 py-6 max-w-[1400px] mx-auto relative z-10">
        <div className="flex items-center gap-1">
          <Link href="/" className="flex items-start">
            <span className="text-xl font-medium tracking-tight text-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>Floema</span>
            <span className="text-[10px] leading-none ml-[2px] mt-[4px] font-sans">®</span>
          </Link>
          <button className="p-2 ml-1 text-foreground/80 hover:text-foreground transition-colors cursor-pointer" aria-label="Search">
            <Search className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-[-8px]">
          {["PRODUTOS", "SOBRE", "SUSTENTABILIDADE", "JORNAL"].map((item, index) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className={[
                "text-[11px] font-semibold tracking-widest px-5 py-[7px]",
                "border border-neutral-400 bg-[#f5f0eb]",
                "hover:bg-neutral-200 transition-colors text-foreground whitespace-nowrap",
                "rounded-full relative",
                index !== 0 ? "-ml-2" : "",
              ].join(" ")}
              style={{ 
                zIndex: index === 0 ? 4 : index === 1 ? 3 : index === 2 ? 2 : 1,
                boxShadow: index !== 0 ? "-4px 0 0 2px #f5f0eb" : "none"
              }}
            >
              {item}
            </Link>
          ))}
          <button className="flex items-center text-[11px] font-semibold tracking-widest text-foreground cursor-pointer ml-3">
            PT <ChevronDown className="w-3 h-3 ml-0.5" />
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-2"
            style={{ fontFamily: 'Playfair Display, serif' }}
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