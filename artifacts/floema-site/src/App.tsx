import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LangProvider } from "./i18n";
import { HomePage } from "./pages/HomePage";
import { InfraestrutrasPage } from "./pages/InfraestrutrasPage";
import { NoticiasPage } from "./pages/NoticiasPage";
import { ContactosPage } from "./pages/ContactosPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/infraestruturas" component={InfraestrutrasPage} />
      <Route path="/notícias" component={NoticiasPage} />
      <Route path="/noticias" component={NoticiasPage} />
      <Route path="/contactos" component={ContactosPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LangProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </LangProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
