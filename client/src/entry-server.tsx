import { renderToString } from "react-dom/server";
import { Router as WouterRouter } from "wouter";
import App from "./App";

function splitUrl(url: string) {
  const queryIndex = url.indexOf("?");
  if (queryIndex === -1) {
    return { ssrPath: url || "/", ssrSearch: "" };
  }
  return {
    ssrPath: url.slice(0, queryIndex) || "/",
    ssrSearch: url.slice(queryIndex + 1),
  };
}

export function render(url: string) {
  const { ssrPath, ssrSearch } = splitUrl(url);
  const html = renderToString(
    <WouterRouter ssrPath={ssrPath} ssrSearch={ssrSearch}>
      <App />
    </WouterRouter>,
  );
  return { html };
}

export {
  CANONICAL_ORIGIN,
  DEFAULT_ROUTE_SEO,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  OG_LOCALE,
  PRERENDER_ROUTES,
  ROUTE_SEO,
  SITE_NAME,
  getRouteSeo,
} from "./ssr/routeManifest";
