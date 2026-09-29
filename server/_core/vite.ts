import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

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
  const notFoundPath = path.resolve(distPath, "404.html");

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

  // Unknown routes must remain real 404s instead of becoming indexable SPA soft-404s.
  app.use("*", (_req, res) => {
    res.status(404).set({
      "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=86400",
      "Content-Type": "text/html; charset=utf-8",
    });
    if (fs.existsSync(notFoundPath)) {
      res.sendFile(notFoundPath);
      return;
    }
    res.end("Not Found");
  });
}
