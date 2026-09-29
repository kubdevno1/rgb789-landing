import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { getCanonicalRedirect } from "./canonicalRoutes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const server = createServer(app);

const staticPath =
  process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "public")
    : path.resolve(__dirname, "..", "dist", "public");

const prerenderedRoutes = [
  "/",
  "/demo-slot",
  "/free-credit",
  "/slot789",
  "/promotions",
  "/articles",
] as const;

type PrerenderedRoute = (typeof prerenderedRoutes)[number];

const pagePath = (route: PrerenderedRoute) =>
  route === "/"
    ? path.resolve(staticPath, "index.html")
    : path.resolve(staticPath, route.slice(1), "index.html");

const sendPrerenderedPage = (route: PrerenderedRoute) =>
  (_req: express.Request, res: express.Response, next: express.NextFunction) => {
    const filePath = pagePath(route);
    if (!path.isAbsolute(filePath)) {
      next();
      return;
    }
    res.set({
      "Cache-Control":
        "public, max-age=60, s-maxage=300, stale-while-revalidate=86400",
      "Content-Type": "text/html; charset=utf-8",
    });
    res.sendFile(filePath, error => {
      if (error) next(error);
    });
  };

app.use((req, res, next) => {
  const canonicalUrl = getCanonicalRedirect(req.originalUrl);
  if (canonicalUrl) {
    res.redirect(301, canonicalUrl);
    return;
  }
  next();
});

const assetPath = path.resolve(staticPath, "assets");
const notFoundPath = path.resolve(staticPath, "404.html");

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

app.use(
  express.static(staticPath, {
    index: false,
    maxAge: "1h",
  }),
);

app.use("*", (_req, res) => {
  res.status(404).set({
    "Cache-Control":
      "public, max-age=60, s-maxage=300, stale-while-revalidate=86400",
    "Content-Type": "text/html; charset=utf-8",
  });
  if (path.isAbsolute(notFoundPath)) {
    res.sendFile(notFoundPath);
    return;
  }
  res.end("Not Found");
});

const port = Number(process.env.PORT || 3000);
server.listen(port, () => {
  console.log(`Static server running on http://localhost:${port}/`);
});
