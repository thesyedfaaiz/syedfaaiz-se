import { Compass, Globe, Mail, Newspaper, Server, type LucideIcon } from "lucide-react";
import type { Project } from "../types";
import DetailedCaseStudy, { type CaseStudyContent } from "./DetailedCaseStudy";

const capabilities: { icon: LucideIcon; title: string; copy: string }[] = [
  { icon: Globe, title: "Introduce the person", copy: "Home, about, press, and contact present the biography, career, education, martial arts, and official profiles." },
  { icon: Compass, title: "Point at live products", copy: "Names, URLs, and availability come from the shared platform catalog. A product without a live flag stays unlinked." },
  { icon: Newspaper, title: "Prerender the public routes", copy: "The production build emits HTML, a sitemap, robots.txt, and JSON-LD. Client navigation updates the same metadata." },
  { icon: Server, title: "Serve it as static files", copy: "The image builds with Node 22 and serves from an unprivileged Nginx process on port 8080." },
  { icon: Mail, title: "Take a message without an API", copy: "The contact form opens a mailto draft. There is no inquiry database and no sign-in on this origin." },
];

const challenges = [
  {
    number: "01",
    title: "Three delivery contracts for one route",
    copy: "The React router, the prerendered HTML files, and the Nginx or Vercel route table all have to agree, including the 404 page.",
    outcome: "A crawler and a person land on the same public URL.",
  },
  {
    number: "02",
    title: "The catalog is not copy on the page",
    copy: "Product names and production URLs live in the shared UI package. Page blurbs have to follow that list instead of inventing a product.",
    outcome: "Coming-soon entries stay out of the public links.",
  },
  {
    number: "03",
    title: "The old API stays retired",
    copy: "This origin used to sit in front of an Express and MongoDB app. The current site has no server, no session, and no OIDC client.",
    outcome: "syedfaaiz.com introduces the platform without becoming an account system again.",
  },
  {
    number: "04",
    title: "Analytics without hiding a secret in the bundle",
    copy: "Measurement IDs are optional public build values. The page still renders when they are empty, which is the production default for GA.",
    outcome: "Tracking is a switch, not a dependency.",
  },
];

const study: CaseStudyContent = {
  theme: "ink",
  badge: "Public front door",
  headline: "A static front door for the person and the platform.",
  lede: "syedfaaiz.com is the public site: biography, press, contact, and links to the live products. It is a prerendered React app served by Nginx. It does not sign people in.",
  websiteLabel: "Visit syedfaaiz.com",
  snapshots: [
    { icon: Server, value: "Static", label: "No API on this origin" },
    { icon: Compass, value: "Catalog", label: "Live products only" },
    { icon: Globe, value: "5 routes", label: "Home, about, products, press, contact" },
    { icon: Newspaper, value: "Prerender", label: "HTML, sitemap, and JSON-LD" },
  ],
  problem: {
    icon: Globe,
    title: "The products needed a front door that was not another product.",
    copy: "A personal site that also tries to host accounts, content, and analytics becomes a second platform. The public introduction should stay small enough to remain accurate.",
  },
  solution: {
    icon: Compass,
    title: "Publish the person. Link the systems that are actually live.",
    copy: "The site prerenders a handful of routes, reads product availability from one catalog, and sends visitors onward. Identity stays on the IdP.",
  },
  product: {
    title: "From a biography to the right product origin.",
    copy: "The pages explain who Syed Faaiz is, then hand off to Nodes, For Muslim, Zaffixx, the IdP, or the engineering portfolio.",
  },
  capabilities,
  challengesIntro: {
    title: "The constraint is refusing to grow a backend back.",
    copy: "A public identity site fails when its routes, its product list, or its analytics story drift from what is actually deployed.",
  },
  challenges,
  closer: {
    title: "The front door is a catalog with a biography, not a second account system.",
    copy: "syedfaaiz.com stays static, prerendered, and explicit about which products are live, so the authenticated systems can keep their own boundaries.",
  },
};

export default function SyedFaaizCaseStudy({ project }: { project: Project }) {
  return <DetailedCaseStudy project={project} study={study} />;
}
