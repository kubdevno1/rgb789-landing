import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import LoadingScreen from "./components/LoadingScreen";
import { useState, useCallback } from "react";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Show loading screen only on first visit (not on /admin route)
  const isAdminRoute = typeof window !== "undefined" && window.location.pathname.startsWith("/admin");
  const [loadingDone, setLoadingDone] = useState(isAdminRoute);

  const handleLoadingComplete = useCallback(() => {
    setLoadingDone(true);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          {!loadingDone && (
            <LoadingScreen onComplete={handleLoadingComplete} duration={2800} />
          )}
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
