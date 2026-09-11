// Production-only, explicitly configured analytics. No development tracker defaults.
import { site } from "./site";
const env = import.meta.env;
const production = env.PROD && document.querySelector('meta[name="site-indexing"]')?.getAttribute("content") === "index";
if (production && site.pages.some(page => page.path === window.location.pathname)) {
  const addScript = (id: string, src: string) => {
    if (document.getElementById(id)) return;
    const script = document.createElement("script"); script.id = id; script.async = true; script.src = src;
    document.head.append(script);
  };
  const ga = env["VITE_GA_MEASUREMENT_ID"];
  if (typeof ga === "string" && /^G-[A-Z0-9]+$/.test(ga)) {
    const analytics = window as typeof window & { dataLayer?: unknown[] };
    analytics.dataLayer = analytics.dataLayer || [];
    function gtag(..._args: unknown[]) { analytics.dataLayer!.push(arguments); }
    gtag("js", new Date()); gtag("config", ga);
    addScript("site-google-analytics", "https://www.googletagmanager.com/gtag/js?id=" + ga);
  }
  const tracker = env["VITE_TRACKING_SCRIPT_URL"];
  if (typeof tracker === "string" && tracker.startsWith("https://")) addScript("site-analytics", tracker);
}
