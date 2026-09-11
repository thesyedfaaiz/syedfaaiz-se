import type { Plugin } from "vite";

export type SeoPage = {
  path: string; title: string; description: string; heading: string;
  sections: { title: string; paragraphs?: string[]; links?: { label: string; href: string }[] }[];
  image?: string; imageAlt?: string; imageWidth?: number; imageHeight?: number;
  schema?: Record<string, unknown>[];
};
export type SeoSite = { origin: string; name: string; pages: SeoPage[]; dynamicSitemap?: boolean };

export const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]!));
const json = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");
export function pageHead(site: SeoSite, page: SeoPage, indexable = true) {
  const url = new URL(page.path, site.origin).href;
  const image = new URL(page.image || "/og-logo.png", site.origin).href;
  return `<!-- seo:start -->
<title>${escapeHtml(page.title)}</title>
<meta name="description" content="${escapeHtml(page.description)}">
<meta name="robots" content="${indexable ? "index,follow,max-image-preview:large" : "noindex,follow"}">
${indexable ? `<link rel="canonical" href="${escapeHtml(url)}">` : ""}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${escapeHtml(site.name)}">
<meta property="og:title" content="${escapeHtml(page.title)}">
<meta property="og:description" content="${escapeHtml(page.description)}">
<meta property="og:url" content="${escapeHtml(url)}">
<meta property="og:image" content="${escapeHtml(image)}">
<meta property="og:image:alt" content="${escapeHtml(page.imageAlt || page.heading)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(page.title)}">
<meta name="twitter:description" content="${escapeHtml(page.description)}">
<meta name="twitter:image" content="${escapeHtml(image)}">
${page.schema?.length ? `<script id="page-schema" type="application/ld+json">${json({ "@context": "https://schema.org", "@graph": page.schema })}</script>` : ""}
<!-- seo:end -->`;
}
export function pageBody(site: SeoSite, page: SeoPage) {
  return `<main style="max-width:72rem;margin:auto;padding:3rem 1.5rem;font:16px/1.7 system-ui">
<nav aria-label="Public pages">${site.pages.filter(p => ["/", "/about", "/photos", "/case-studies"].includes(p.path)).map(p => `<a style="margin-right:1rem" href="${escapeHtml(p.path)}">${escapeHtml(p.path === "/" ? site.name : p.heading)}</a>`).join("")}</nav>
<h1>${escapeHtml(page.heading)}</h1><p>${escapeHtml(page.description)}</p>
${page.image ? `<figure><img src="${escapeHtml(page.image)}" alt="${escapeHtml(page.imageAlt || page.heading)}" width="${page.imageWidth || 640}" height="${page.imageHeight || 800}" style="max-width:100%;height:auto;max-height:32rem;object-fit:contain"><figcaption>${escapeHtml(page.imageAlt || page.heading)}</figcaption></figure>` : ""}
${page.sections.map(section => `<section><h2>${escapeHtml(section.title)}</h2>${(section.paragraphs || []).map(p => `<p>${escapeHtml(p)}</p>`).join("")}${section.links?.length ? `<ul>${section.links.map(link => `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a></li>`).join("")}</ul>` : ""}</section>`).join("")}
</main>`;
}
export function prerenderSeo(site: SeoSite): Plugin {
  let production = false;
  const env = (globalThis as typeof globalThis & { process?: { env: Record<string, string | undefined> } }).process?.env || {};
  return {
    name: "public-page-html",
    enforce: "post",
    configResolved(config) { production = config.mode === "production" && (!env["VERCEL_ENV"] || env["VERCEL_ENV"] === "production") && (!env["CONTEXT"] || env["CONTEXT"] === "production") && env["SEO_NOINDEX"] !== "true"; },
    generateBundle(_options, bundle) {
      const asset = bundle["index.html"];
      if (!asset || asset.type !== "asset") throw new Error("Missing Vite HTML output");
      const base = String(asset.source)
        .replace(/<title>[\s\S]*?<\/title>/gi, "")
        .replace(/<meta\b(?=[^>]*(?:name=["'](?:description|robots|twitter:[^"']+)["']|property=["']og:[^"']+["']))[^>]*>/gi, "")
        .replace(/<link\b(?=[^>]*rel=["']canonical["'])[^>]*>/gi, "");
      const render = (page: SeoPage, indexable: boolean, body = true) => base
        .replace("</head>", `<meta name="site-indexing" content="${production ? "index" : "noindex"}">` + pageHead(site, page, indexable) + "</head>")
        .replace(/<div id="root"><\/div>/, `<div id="root"><!-- seo:body:start -->${body ? pageBody(site, page) : ""}<!-- seo:body:end --></div>`);
      for (const page of site.pages) {
        const html = render(page, production);
        if (page.path === "/") asset.source = html;
        else this.emitFile({ type: "asset", fileName: page.path.slice(1) + ".html", source: html });
      }
      const privatePage: SeoPage = { path: "/", title: `Account | ${site.name}`, description: "Sign in to manage your account.", heading: "Account", sections: [] };
      this.emitFile({ type: "asset", fileName: "app.html", source: render(privatePage, false, false) });
      this.emitFile({ type: "asset", fileName: "404.html", source: render({ ...privatePage, title: `Page not found | ${site.name}`, heading: "Page not found", description: "This page could not be found.", sections: [{ title: "Continue exploring", links: [{ label: "Home", href: "/" }] }] }, false) });
      this.emitFile({ type: "asset", fileName: "robots.txt", source: `User-agent: *\nAllow: /\nSitemap: ${site.origin}/sitemap.xml\n` });
      this.emitFile({ type: "asset", fileName: site.dynamicSitemap ? "sitemap-static.xml" : "sitemap.xml", source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${production ? site.pages.map(page => `<url><loc>${escapeHtml(new URL(page.path, site.origin).href)}</loc>${page.image ? `<image:image><image:loc>${escapeHtml(new URL(page.image, site.origin).href)}</image:loc></image:image>` : ""}</url>`).join("") : ""}</urlset>` });
    },
  };
}

