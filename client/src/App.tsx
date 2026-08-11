import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import LoadingScreen from "./components/LoadingScreen";
import PromoPopup from "./components/PromoPopup";
import { lazy, Suspense, useState, useCallback } from "react";

// Route-level code splitting: โหลดเฉพาะหน้าที่ผู้ใช้เปิด เพื่อลด initial bundle
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Promotions = lazy(() => import("./pages/Promotions"));
const Articles = lazy(() => import("./pages/Articles"));
const DemoSlot = lazy(() => import("./pages/DemoSlot"));
const FreeCreditPage = lazy(() => import("./pages/FreeCreditPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function RouteFallback() {
  return <div className="min-h-screen" aria-busy="true" />;
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Suspense fallback={<RouteFallback />}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/admin"} component={AdminDashboard} />
        <Route path={"/promotions"} component={Promotions} />
        <Route path={"/articles"} component={Articles} />
        <Route path={"/ทดลองเล่นสล็อต"} component={DemoSlot} />
        <Route path={"/demo-slot"} component={DemoSlot} />
        <Route path={"/free-credit"} component={FreeCreditPage} />
        <Route path={"/เครดิตฟรี"} component={FreeCreditPage} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  // Skip loading + popup for /admin route
  const isAdminRoute =
    typeof window !== "undefined" && window.location.pathname.startsWith("/admin");

  const [loadingDone, setLoadingDone] = useState(isAdminRoute);
  const [showPromo, setShowPromo] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setLoadingDone(true);
    // Show promo popup 400ms after loading screen fades out
    setTimeout(() => setShowPromo(true), 400);
  }, []);

  const handlePromoClose = useCallback(() => {
    setShowPromo(false);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />

          {/* Loading screen — shown only on first visit, not on /admin */}
          {!loadingDone && (
            <LoadingScreen onComplete={handleLoadingComplete} duration={2800} />
          )}

          {/* Promo popup — shown once after loading completes */}
          {showPromo && <PromoPopup onClose={handlePromoClose} />}

          {/* Main content fades in after loading */}
          <div
            style={{
              opacity: loadingDone ? 1 : 0,
              transition: "opacity 0.5s ease-in",
            }}
          >
            <Router />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
