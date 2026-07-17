import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LangProvider } from "./i18n";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { HomePage } from "./pages/HomePage";
import { InfraestrutrasPage } from "./pages/InfraestrutrasPage";
import { NoticiasPage } from "./pages/NoticiasPage";
import { ContactosPage } from "./pages/ContactosPage";
import { PangulinoPage } from "./pages/PangulinoPage";
import { PrivacidadePage } from "./pages/PrivacidadePage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/infraestruturas" component={InfraestrutrasPage} />
      <Route path="/notícias" component={NoticiasPage} />
      <Route path="/noticias" component={NoticiasPage} />
      <Route path="/pangulino" component={PangulinoPage} />
      <Route path="/nossas-marcas" component={PangulinoPage} />
      <Route path="/our-brands" component={PangulinoPage} />
      <Route path="/nuestras-marcas" component={PangulinoPage} />
      <Route path="/contactos" component={ContactosPage} />
      <Route path="/privacidade" component={PrivacidadePage} />
      <Route component={NotFound} />
    </Switch>
    </>
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
