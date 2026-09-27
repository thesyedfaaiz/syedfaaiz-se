// Production-only, explicitly configured analytics. SEO and route lists do not gate this.
export type AnalyticsScript = {
  id: string;
  src: string;
  attributes?: Record<string, string>;
};

type AnalyticsEnv = Record<string, unknown>;

function httpsUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed.startsWith("https://")) return null;
  try {
    const url = new URL(trimmed);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

function trackingKey(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function planAnalyticsScripts(input: {
  production: boolean;
  env: AnalyticsEnv;
}): AnalyticsScript[] {
  if (!input.production) return [];
  const scripts: AnalyticsScript[] = [];
  const ga = input.env["VITE_GA_MEASUREMENT_ID"];
  if (typeof ga === "string" && /^G-[A-Z0-9]+$/.test(ga)) {
    scripts.push({
      id: "site-google-analytics",
      src: "https://www.googletagmanager.com/gtag/js?id=" + ga
    });
  }
  const generic = httpsUrl(input.env["VITE_TRACKING_SCRIPT_URL"]);
  if (generic) scripts.push({ id: "site-analytics", src: generic });

  const key = trackingKey(input.env["VITE_ZAFFIXX_TRACKING_KEY"]);
  const trackerUrl = httpsUrl(input.env["VITE_ZAFFIXX_TRACKER_URL"]);
  const endpoint = httpsUrl(input.env["VITE_ZAFFIXX_COLLECT_ENDPOINT"]);
  if (key && trackerUrl && endpoint) {
    scripts.push({
      id: "site-zaffixx-analytics",
      src: trackerUrl,
      attributes: {
        "data-site": key,
        "data-endpoint": endpoint
      }
    });
  }
  return scripts;
}

function applyAttributes(script: HTMLScriptElement, attributes: Record<string, string> | undefined): void {
  if (!attributes) return;
  for (const [name, value] of Object.entries(attributes)) {
    if (name === "data-site") script.dataset["site"] = value;
    else if (name === "data-endpoint") script.dataset["endpoint"] = value;
    else script.setAttribute(name, value);
  }
}

export function installAnalyticsScripts(doc: Document, scripts: AnalyticsScript[]): void {
  for (const spec of scripts) {
    if (doc.getElementById(spec.id)) continue;
    const script = doc.createElement("script");
    script.id = spec.id;
    script.async = true;
    script.src = spec.src;
    applyAttributes(script, spec.attributes);
    doc.head.append(script);
  }
}

const env = import.meta.env;
if (env?.PROD && typeof document !== "undefined") {
  const ga = env["VITE_GA_MEASUREMENT_ID"];
  if (typeof ga === "string" && /^G-[A-Z0-9]+$/.test(ga)) {
    const analytics = window as typeof window & { dataLayer?: unknown[] };
    analytics.dataLayer = analytics.dataLayer || [];
    function gtag(..._args: unknown[]) { analytics.dataLayer!.push(arguments); }
    gtag("js", new Date());
    gtag("config", ga);
  }
  installAnalyticsScripts(document, planAnalyticsScripts({
    production: true,
    env
  }));
}
