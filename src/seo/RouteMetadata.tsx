import { useEffect } from "react";
import type { SeoPage } from "../../seo/prerender";
import { site } from "./site";

export function applyPageMetadata(page: SeoPage, indexable = true) {
  document.title = page.title;
  const setMeta = (attribute: "name" | "property", key: string, content: string) => {
    const matches = document.head.querySelectorAll<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
    const element = matches[0] || document.createElement("meta");
    matches.forEach((match, index) => { if (index) match.remove(); });
    element.setAttribute(attribute, key); element.content = content;
    if (!element.isConnected) document.head.append(element);
  };
  const allowed = indexable && document.querySelector('meta[name="site-indexing"]')?.getAttribute("content") !== "noindex";
  const url = new URL(page.path, site.origin).href;
  setMeta("name", "description", page.description);
  setMeta("name", "robots", allowed ? "index,follow,max-image-preview:large" : "noindex,follow");
  document.querySelectorAll('link[rel="canonical"]').forEach(element => element.remove());
  if (allowed) {
    const canonical = document.createElement("link"); canonical.rel = "canonical"; canonical.href = url; document.head.append(canonical);
  }
  for (const [key, value] of Object.entries({ title: page.title, description: page.description, url, image: new URL(page.image || "/og-logo.png", site.origin).href })) {
    setMeta("property", "og:" + key, value);
    if (key !== "url") setMeta("name", "twitter:" + key, value);
  }
  setMeta("property", "og:image:alt", page.imageAlt || page.heading);
  setMeta("name", "twitter:image:alt", page.imageAlt || page.heading);
  document.getElementById("page-schema")?.remove();
  if (page.schema?.length) {
    const script = document.createElement("script"); script.id = "page-schema"; script.type = "application/ld+json";
    script.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": page.schema }); document.head.append(script);
  }
}
export function RouteMetadata({ path }: { path: string }) {
  useEffect(() => {
    const cleanPath = path.replace(/\/+$/, "") || "/";
    const page = site.pages.find(item => item.path === cleanPath);
    if (page) applyPageMetadata(page);
    else applyPageMetadata({ path: cleanPath, title: "Page not found | " + site.name, description: "This page could not be found.", heading: "Page not found", sections: [] }, false);
  }, [path]);
  return null;
}

