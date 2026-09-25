import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");

describe("first-contentful-paint shell", () => {
  it("keeps the server-rendered app insertion point inside the root", () => {
    const indexHtml = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");

    expect(indexHtml).toContain('id="root"');
    expect(indexHtml).toContain("<!--app-head-->");
    expect(indexHtml).toContain("<!--app-html-->");
    expect(indexHtml).toContain('src="/src/entry-client.tsx"');
    expect(indexHtml).not.toContain('id="rgb789-app-shell"');
  });

  it("does not hide the router while the loading overlay is active", () => {
    const appSource = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");
    const overlaySource = readFileSync(
      resolve(projectRoot, "client/src/components/LoadingScreen.tsx"),
      "utf8",
    );

    expect(appSource).not.toContain("opacity: loadingDone ? 1 : 0");
    expect(overlaySource).toContain("pointer-events-none fixed inset-x-0");
    expect(overlaySource).toContain("duration = 1800");
    expect(overlaySource).toContain("prefers-reduced-motion: reduce");
    expect(overlaySource).toContain("transition-[opacity,transform]");
    expect(appSource).toContain("<LoadingScreen onComplete={handleLoadingComplete} duration={1800} />");
  });
});
