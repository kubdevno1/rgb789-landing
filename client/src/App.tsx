import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import LoadingScreen from "./components/LoadingScreen";
import { lazy, Suspense, useState, useCallback } from "react";

// Route-level code splitting: โหลดเฉพาะหน้าที่ผู้ใช้เปิด เพื่อลด initial bundle
const AdminDashboard = lazy(() => import("./pages/AdminRoute"));
const Promotions = lazy(() => import("./pages/Promotions"));
const Articles = lazy(() => import("./pages/Articles"));
const DemoSlot = lazy(() => import("./pages/DemoSlot"));
const FreeCreditPage = lazy(() => import("./pages/FreeCreditPage"));
const Slot789Page = lazy(() => import("./pages/Slot789Page"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const PromoPopup = lazy(() => import("./components/PromoPopup"));

function RouteFallback() {
  return <div className="min-h-screen" aria-busy="true" />;
}

function Router() {
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
        <Route path={"/slot789"} component={Slot789Page} />
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
        {/* Non-blocking loading overlay — shown only on first visit, not on /admin */}
        {!loadingDone && (
          <LoadingScreen onComplete={handleLoadingComplete} duration={1800} />
        )}

        {/* Promo popup — shown once after loading completes */}
        {showPromo && (
          <Suspense fallback={null}>
            <PromoPopup onClose={handlePromoClose} />
          </Suspense>
        )}

        {/* Render route content immediately so users and Lighthouse can record FCP */}
        <div>
          <Router />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
