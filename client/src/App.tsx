import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import LoadingScreen from "./components/LoadingScreen";
import Head from "./components/Head";
import AdminRoute from "./pages/AdminRoute";
import NotFound from "./pages/NotFound";
import Promotions from "./pages/Promotions";
import Articles from "./pages/Articles";
import DemoSlot from "./pages/DemoSlot";
import FreeCreditPage from "./pages/FreeCreditPage";
import Slot789Page from "./pages/Slot789Page";
import { lazy, Suspense, useState, useCallback } from "react";

// Public routes are statically imported so renderToString emits real page HTML
// instead of a Suspense fallback. Admin remains lazy-loaded below.
const AdminDashboard = lazy(() => import("./pages/AdminRoute"));

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
  // Skip the loading overlay for the admin route.
  const isAdminRoute =
    typeof window !== "undefined" && window.location.pathname.startsWith("/admin");

  const [loadingDone, setLoadingDone] = useState(isAdminRoute);

  const handleLoadingComplete = useCallback(() => {
    setLoadingDone(true);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <Head />
        {/* Non-blocking loading overlay — shown only on first visit, not on /admin */}
        {!loadingDone && (
          <LoadingScreen onComplete={handleLoadingComplete} duration={1800} />
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
