import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { shouldServeRgb789MeSalePage } from "../hostRouting";

const rgb789MeSalePagePath = path.resolve(import.meta.dirname, "../..", "client", "public", "rgb789-me-sale.html");
const rgb789MeRobotsPath = path.resolve(import.meta.dirname, "../..", "client", "public", "robots-rgb789-me.txt");
const rgb789MeSitemapPath = path.resolve(import.meta.dirname, "../..", "client", "public", "sitemap-rgb789-me.xml");

function isRgb789MeHost(hostname: string): boolean {
  return hostname === "rgb789.me" || hostname === "www.rgb789.me";
}

function serveRgb789MeCrawlerFile(req: express.Request, res: express.Response): boolean {
  if (!isRgb789MeHost(req.hostname)) return false;

  if (req.path === "/robots.txt") {
    res.type("text/plain").sendFile(rgb789MeRobotsPath);
    return true;
  }

  if (req.path === "/sitemap.xml") {
    res.type("application/xml").sendFile(rgb789MeSitemapPath);
    return true;
  }

  return false;
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  // Intercept rgb789.me before Vite serves the shared React application.
  // The Vercel host never matches this middleware and remains on its existing routes.
  app.use((req, res, next) => {
    if (serveRgb789MeCrawlerFile(req, res)) return;
    if (shouldServeRgb789MeSalePage(req.hostname, req.path)) {
      res.status(200).set({ "Content-Type": "text/html; charset=utf-8" }).sendFile(rgb789MeSalePagePath);
      return;
    }
    next();
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  const assetPath = path.resolve(distPath, "assets");
  const rgb789MeSalePage = path.resolve(distPath, "rgb789-me-sale.html");
  const rgb789MeRobots = path.resolve(distPath, "robots-rgb789-me.txt");
  const rgb789MeSitemap = path.resolve(distPath, "sitemap-rgb789-me.xml");

  const serveRgb789MeCrawlerFileProduction = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!isRgb789MeHost(req.hostname)) {
      next();
      return;
    }

    if (req.path === "/robots.txt") {
      res.type("text/plain").sendFile(rgb789MeRobots);
      return;
    }

    if (req.path === "/sitemap.xml") {
      res.type("application/xml").sendFile(rgb789MeSitemap);
      return;
    }

    next();
  };

  const serveRgb789MeSalePageProduction = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!shouldServeRgb789MeSalePage(req.hostname, req.path)) {
      next();
      return;
    }

    res.set({
      "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=86400",
      "Content-Type": "text/html; charset=utf-8",
    });
    res.sendFile(rgb789MeSalePage);
  };

  const prerenderedRoutes = [
    "/",
    "/demo-slot",
    "/free-credit",
    "/slot789",
    "/promotions",
    "/articles",
  ] as const;

  const sendPrerenderedPage = (route: (typeof prerenderedRoutes)[number]) => {
    const filePath = route === "/"
      ? path.resolve(distPath, "index.html")
      : path.resolve(distPath, route.slice(1), "index.html");
    return (_req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (!fs.existsSync(filePath)) {
        next();
        return;
      }
      res.set({
        "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=86400",
        "Content-Type": "text/html; charset=utf-8",
      });
      res.sendFile(filePath);
    };
  };

  // Vite asset names are content-hashed, so browsers and CDNs can cache them safely for a year.
  app.use(
    "/assets",
    express.static(assetPath, {
      immutable: true,
      maxAge: "1y",
    }),
  );

  app.get(["/robots.txt", "/sitemap.xml"], serveRgb789MeCrawlerFileProduction);
  app.get("*", serveRgb789MeSalePageProduction);

  app.get("/", sendPrerenderedPage("/"));
  for (const route of prerenderedRoutes.slice(1)) {
    app.get([route, `${route}/`], sendPrerenderedPage(route));
  }

  // Public files such as robots.txt and favicons may be cached briefly, while index.html
  // is handled below with a short stale-while-revalidate policy.
  app.use(
    express.static(distPath, {
      index: false,
      maxAge: "1h",
    }),
  );

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.set(
      "Cache-Control",
      "public, max-age=60, s-maxage=300, stale-while-revalidate=86400",
    );
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
