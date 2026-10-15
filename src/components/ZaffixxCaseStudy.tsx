import {
  Activity,
  Building2,
  Eye,
  KeyRound,
  Radio,
  Share2,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { Project } from "../types";
import { type ArchitectureEdge, type ArchitectureFlow, type ArchitectureNode } from "./ArchitectureDiagram";
import DetailedCaseStudy, { type CaseStudyContent } from "./DetailedCaseStudy";

const m = (x: number, y: number) => ({ x, y, width: 148, height: 62 });

const architectureNodes: ArchitectureNode[] = [
  { id: "visitor", title: "Visitor site", detail: "Customer page", x: 24, y: 54, width: 180, height: 74, mobile: m(16, 12) },
  { id: "cdn", title: "Tracker CDN", detail: "tracker.js", x: 240, y: 54, width: 180, height: 74, mobile: m(196, 12) },
  { id: "dashboard", title: "Dashboard", detail: "React workspace", x: 24, y: 196, width: 180, height: 74, mobile: m(16, 100) },
  { id: "idp", title: "Syed Faaiz IdP", detail: "OIDC issuer", x: 740, y: 54, width: 190, height: 74, mobile: m(196, 100) },
  { id: "api", title: "Collector API", detail: "Ingest, BFF, and SSE", x: 470, y: 196, width: 190, height: 84, mobile: m(106, 188) },
  { id: "stripe", title: "Stripe", detail: "Growth and Business", x: 740, y: 318, width: 190, height: 74, mobile: m(196, 276) },
  { id: "mongo", title: "MongoDB", detail: "Tenants and events", x: 480, y: 520, width: 190, height: 72, mobile: m(16, 540) },
  { id: "rabbit", title: "RabbitMQ", detail: "traffic.events", x: 245, y: 354, width: 180, height: 74, mobile: m(16, 276) },
  { id: "analytics", title: "Analytics worker", detail: "Visitors and events", x: 10, y: 520, width: 180, height: 72, mobile: m(16, 364) },
  { id: "intel", title: "Intelligence", detail: "Assess, then project", x: 245, y: 520, width: 180, height: 72, mobile: m(196, 364) },
  { id: "live", title: "Live worker", detail: "Presence only", x: 715, y: 520, width: 180, height: 72, mobile: m(196, 452) },
  { id: "valkey", title: "Valkey", detail: "Ephemeral live state", x: 950, y: 520, width: 180, height: 72, mobile: m(196, 540) },
];

const architectureEdges: ArchitectureEdge[] = [
  { id: "visitor-cdn", from: "visitor", to: "cdn", path: "M204 91 L240 91", mobilePath: "M164 43 L196 43" },
  { id: "cdn-api", from: "cdn", to: "api", path: "M420 91 C490 110 565 150 565 196", mobilePath: "M270 74 C270 118 220 154 180 188" },
  { id: "dashboard-api", from: "dashboard", to: "api", path: "M204 233 L470 233", mobilePath: "M164 132 C112 148 92 180 106 220" },
  { id: "api-idp", from: "api", to: "idp", path: "M650 220 C700 170 700 100 740 91", mobilePath: "M220 188 C282 168 302 130 270 132" },
  { id: "api-stripe", from: "api", to: "stripe", path: "M650 252 C700 280 720 325 740 355", mobilePath: "M220 230 C250 246 260 262 270 276" },
  { id: "api-mongo", from: "api", to: "mongo", path: "M565 280 L565 520", mobilePath: "M108 230 C26 302 28 472 90 540" },
  { id: "api-rabbit", from: "api", to: "rabbit", path: "M470 238 C420 270 335 320 335 354", mobilePath: "M106 219 C80 240 90 260 90 276" },
  { id: "rabbit-analytics", from: "rabbit", to: "analytics", path: "M245 391 C190 420 100 470 100 520", mobilePath: "M16 307 C36 320 90 332 90 364" },
  { id: "rabbit-intel", from: "rabbit", to: "intel", path: "M335 428 L335 520", mobilePath: "M164 307 C180 338 220 360 270 364" },
  { id: "rabbit-live", from: "rabbit", to: "live", path: "M425 390 C560 405 680 474 715 556", mobilePath: "M164 307 C220 350 255 400 270 452" },
  { id: "live-valkey", from: "live", to: "valkey", path: "M895 556 L950 556", mobilePath: "M270 516 L270 540" },
  { id: "analytics-mongo", from: "analytics", to: "mongo", path: "M190 556 L480 556", mobilePath: "M90 428 L90 540" },
  { id: "intel-mongo", from: "intel", to: "mongo", path: "M425 556 L480 556", mobilePath: "M196 428 C132 470 102 504 90 540" },
  { id: "stripe-webhook", from: "stripe", to: "api", path: "M740 370 C680 430 650 350 650 280", mobilePath: "M196 307 C340 350 340 245 252 230" },
  { id: "valkey-api", from: "valkey", to: "api", path: "M950 520 C1050 420 840 350 660 280", mobilePath: "M270 540 C350 450 330 260 252 230" },
];

const architectureFlows: ArchitectureFlow[] = [
  {
    id: "ingest",
    label: "Collect",
    summary: "The tracker loads from the CDN. The collector validates the key, publishes one observed event, and the analytics worker writes visitors, sessions, and events.",
    edgeIds: ["visitor-cdn", "cdn-api", "api-rabbit", "rabbit-analytics", "analytics-mongo"],
    nodeIds: ["visitor", "cdn", "api", "rabbit", "analytics", "mongo"],
  },
  {
    id: "intelligence",
    label: "Intelligence",
    summary: "The same observed event fans out to Traffic Intelligence. Detection stores an assessment, then projection copies a small classification onto analytics records.",
    edgeIds: ["visitor-cdn", "cdn-api", "api-rabbit", "rabbit-intel", "intel-mongo"],
    nodeIds: ["visitor", "cdn", "api", "rabbit", "intel", "mongo"],
  },
  {
    id: "live",
    label: "Live presence",
    summary: "Presence beacons use a separate queue. The live worker writes Valkey, and the dashboard reads a snapshot plus an SSE stream through the API.",
    edgeIds: ["visitor-cdn", "cdn-api", "api-rabbit", "rabbit-live", "live-valkey", "valkey-api", "dashboard-api"],
    nodeIds: ["visitor", "cdn", "api", "rabbit", "live", "valkey", "dashboard"],
  },
  {
    id: "access",
    label: "Sign-in and billing",
    summary: "The dashboard signs in through the collector's OIDC backend. Stripe webhooks are the only writer of paid Growth and Business subscription state.",
    edgeIds: ["dashboard-api", "api-idp", "api-stripe", "stripe-webhook", "api-mongo"],
    nodeIds: ["dashboard", "api", "idp", "stripe", "mongo"],
  },
];

const capabilities: { icon: LucideIcon; title: string; copy: string }[] = [
  { icon: Radio, title: "Install a tracker", copy: "A project tracking key and a verified domain let a site load tracker.js and send page views plus configured interaction events." },
  { icon: Share2, title: "Fan out one event", copy: "The collector publishes a single versioned observation. Analytics and Traffic Intelligence consume it independently and do not call each other." },
  { icon: Eye, title: "Read the workspace", copy: "Organizations get overview, audience, acquisition, behavior, sessions, visitors, technology, and geography, with plan gates on live, explore, and export." },
  { icon: ShieldCheck, title: "Classify, don't block", copy: "Quality, bots, networks, investigate, and detector settings show evidence. Classification is not an access decision." },
  { icon: Activity, title: "Watch who is here", copy: "A dedicated presence worker keeps short-lived state in Valkey. The dashboard uses a REST snapshot and a server-sent event stream." },
];

const challenges = [
  {
    number: "01",
    title: "One event, several consumers",
    copy: "Analytics has to keep accepting traffic when intelligence, projection, or live presence is absent or slow. Optional queues are provisioned without making collection depend on them.",
    outcome: "A failed detector cannot reject a valid page view.",
  },
  {
    number: "02",
    title: "Durable history beside ephemeral presence",
    copy: "Visitors, sessions, and events are written to MongoDB. Live presence uses expiring queues and Valkey, then reaches the browser through a snapshot and an SSE stream.",
    outcome: "The live view can expire without deleting analytics history.",
  },
  {
    number: "03",
    title: "Network identity without keeping the address",
    copy: "The collector sees the request IP only at trusted ingress. What enters the queue is a tenant-scoped hash plus optional provider traits, not the raw address.",
    outcome: "Traffic Intelligence pages query assessments, not stored IP addresses.",
  },
  {
    number: "04",
    title: "Plans that outlive a checkout click",
    copy: "The shared plan catalog decides features. A missing subscription is Starter. Growth and Business are self-serve, Enterprise is assigned, and webhooks alone write paid state.",
    outcome: "Entitlements stay explainable when a webhook is retried.",
  },
];

const study: CaseStudyContent = {
  theme: "sky",
  badge: "Product analytics",
  headline: "One observed event, then let each consumer do its own job.",
  lede: "Zaffixx is a multi-tenant analytics platform: verified domains, a browser tracker, durable event history, a separate live presence path, and detect-only traffic intelligence.",
  websiteLabel: "Visit Zaffixx",
  snapshots: [
    { icon: Share2, value: "One event", label: "Then independent consumers" },
    { icon: Building2, value: "Organization", label: "Tenant and role boundary" },
    { icon: Activity, value: "Live", label: "Valkey, snapshot, and SSE" },
    { icon: KeyRound, value: "BFF session", label: "Browser never holds OIDC tokens" },
  ],
  problem: {
    icon: Eye,
    title: "A page view is not yet a product decision.",
    copy: "Teams need history, a live view, and a way to inspect automation or network traffic. Folding those jobs into one request makes collection fragile and turns a classifier into a gate.",
  },
  solution: {
    icon: Workflow,
    title: "Collect once. Project, classify, and expire separately.",
    copy: "The collector validates the hit and publishes it. Analytics persists it, intelligence assesses it, live presence keeps a short-lived view, and the plan catalog decides who can see which surface.",
  },
  product: {
    title: "From a tracking key to an organization workspace.",
    copy: "Domain proof, roles, billing, and analytics stay in one product, while the workers behind them do not share a single failure domain.",
  },
  capabilities,
  architecture: {
    title: "How a page view becomes history, evidence, and presence.",
    copy: "Choose a flow. Only the services and connectors for that flow are emphasized, so each path stays readable.",
    nodes: architectureNodes,
    edges: architectureEdges,
    flows: architectureFlows,
    defaultFlowId: "ingest",
    ariaLabel: "Zaffixx system architecture",
    description: "Selectable flows for collection, traffic intelligence, live presence, and sign-in with billing across the tracker, collector, queue, workers, MongoDB, Valkey, IdP, and Stripe.",
    viewBox: "0 0 1180 640",
    mobileViewBox: "0 0 360 620",
  },
  challengesIntro: {
    title: "The hard part is keeping the paths independent.",
    copy: "Collection, classification, live presence, and billing each have a different lifetime. The product has to show them as one workspace without coupling their failures.",
  },
  challenges,
  closer: {
    title: "Analytics stays useful when the optional paths are quiet.",
    copy: "Zaffixx keeps the observed event small, the tenant boundary on every business record, and the paid plan in a catalog that webhooks update rather than the browser.",
  },
};

export default function ZaffixxCaseStudy({ project }: { project: Project }) {
  return <DetailedCaseStudy project={project} study={study} />;
}
