import {
  Bot,
  Boxes,
  CircleDollarSign,
  Code2,
  Database,
  Fingerprint,
  Gauge,
  MonitorCheck,
  Radar,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import type { Project } from "../types";
import { type ArchitectureEdge, type ArchitectureFlow, type ArchitectureNode } from "./ArchitectureDiagram";
import DetailedCaseStudy, { type CaseStudyContent } from "./DetailedCaseStudy";

const architectureNodes: ArchitectureNode[] = [
  { id: "visitor", title: "Visitor browser", detail: "Customer website", x: 36, y: 64, width: 180, height: 78, mobile: { x: 18, y: 20, width: 144, height: 64 } },
  { id: "tracker", title: "Tracker + CDN", detail: "Vanilla JS snippet", x: 304, y: 64, width: 180, height: 78, mobile: { x: 198, y: 20, width: 144, height: 64 } },
  { id: "api", title: "Application API", detail: "Node + Express", x: 510, y: 258, width: 192, height: 84, mobile: { x: 108, y: 170, width: 144, height: 64 } },
  { id: "database", title: "MongoDB", detail: "Traffic + account data", x: 900, y: 258, width: 184, height: 84, mobile: { x: 18, y: 310, width: 144, height: 64 } },
  { id: "intel", title: "Network intelligence", detail: "Open feeds + local indexes", x: 900, y: 54, width: 184, height: 84, mobile: { x: 198, y: 310, width: 144, height: 64 } },
  { id: "frontend", title: "Web application", detail: "React + Vite", x: 304, y: 484, width: 180, height: 78, mobile: { x: 18, y: 450, width: 144, height: 64 } },
  { id: "firebase", title: "Firebase Auth", detail: "Identity provider", x: 36, y: 484, width: 180, height: 78, mobile: { x: 18, y: 570, width: 144, height: 64 } },
  { id: "stripe", title: "Stripe", detail: "Checkout + webhooks", x: 620, y: 500, width: 180, height: 78, mobile: { x: 198, y: 450, width: 144, height: 64 } },
  { id: "delivery", title: "Delivery layer", detail: "GitHub Actions + VPS", x: 900, y: 500, width: 184, height: 78, mobile: { x: 198, y: 570, width: 144, height: 64 } },
];

const architectureEdges: ArchitectureEdge[] = [
  { id: "visitor-tracker", from: "visitor", to: "tracker", path: "M216 103 L304 103", mobilePath: "M162 52 L198 52" },
  { id: "tracker-api", from: "tracker", to: "api", path: "M484 103 C548 103 466 277 510 290", mobilePath: "M270 84 C270 125 218 148 198 170" },
  { id: "api-database", from: "api", to: "database", path: "M702 300 L900 300", mobilePath: "M142 234 C128 264 104 280 90 310" },
  { id: "api-intel", from: "api", to: "intel", path: "M702 278 C810 258 804 96 900 96", mobilePath: "M218 234 C232 264 256 280 270 310" },
  { id: "frontend-api", from: "frontend", to: "api", path: "M484 523 C550 510 468 342 510 316", mobilePath: "M90 450 C5 420 12 210 108 202" },
  { id: "frontend-firebase", from: "frontend", to: "firebase", path: "M304 523 L216 523", mobilePath: "M90 514 L90 570" },
  { id: "frontend-stripe", from: "frontend", to: "stripe", path: "M484 535 C536 554 570 539 620 539", mobilePath: "M162 482 L198 482" },
  { id: "stripe-webhook", from: "stripe", to: "api", path: "M710 500 C710 425 668 382 636 342", mobilePath: "M270 450 C352 410 348 218 252 202" },
  { id: "delivery-api", from: "delivery", to: "api", path: "M900 531 C824 506 800 370 702 320", mobilePath: "M270 570 C356 492 354 236 252 218" },
  { id: "delivery-tracker", from: "delivery", to: "tracker", path: "M958 500 C876 346 708 115 484 115", mobilePath: "M342 602 C356 380 356 92 342 52" },
];

const architectureFlows: ArchitectureFlow[] = [
  {
    id: "traffic",
    label: "Traffic detection",
    summary: "The snippet reports a visit. The API scores it with local network intelligence and stores the session for the dashboard.",
    edgeIds: ["visitor-tracker", "tracker-api", "api-intel", "api-database", "frontend-api"],
    nodeIds: ["visitor", "tracker", "api", "intel", "database", "frontend"],
  },
  {
    id: "auth",
    label: "Secure sign-in",
    summary: "Firebase identifies the person. The API resolves the matching account in MongoDB.",
    edgeIds: ["frontend-firebase", "frontend-api", "api-database"],
    nodeIds: ["frontend", "firebase", "api", "database"],
  },
  {
    id: "billing",
    label: "Subscription",
    summary: "Checkout and webhooks update subscription state in MongoDB.",
    edgeIds: ["frontend-api", "frontend-stripe", "stripe-webhook", "api-database"],
    nodeIds: ["frontend", "stripe", "api", "database"],
  },
  {
    id: "delivery",
    label: "Delivery",
    summary: "GitHub Actions publishes the API and the tracker onto the VPS.",
    edgeIds: ["delivery-api", "delivery-tracker", "api-database"],
    nodeIds: ["delivery", "tracker", "api", "database"],
  },
];

const capabilities: { icon: LucideIcon; title: string; copy: string }[] = [
  { icon: Code2, title: "Install once", copy: "A property-specific script works with a site head, WordPress, Shopify, or a tag manager without moving the site's hosting." },
  { icon: Radar, title: "Classify each session", copy: "Server-side scoring combines browser, behavior, traffic-pattern, IP, and network signals instead of trusting one flag." },
  { icon: ShieldCheck, title: "Monitor before blocking", copy: "Owners can review traffic first, then enforce rules by IP, country, device, browser, OS, or network policy." },
  { icon: Gauge, title: "Make traffic legible", copy: "Dashboards separate human, suspicious, bot, VPN, Tor, and datacenter traffic across time, device, and geography views." },
  { icon: CircleDollarSign, title: "Connect access to billing", copy: "Stripe subscriptions, usage limits, trials, and audited complimentary access resolve into one entitlement model." },
];

const challenges = [
  {
    number: "01",
    title: "One vocabulary across every screen",
    copy: "Traffic quality becomes misleading when dashboards use suspicious, risky, threat, and blocked as interchangeable labels. Classification was moved toward server-owned definitions so each surface can speak the same language.",
    outcome: "A shared 0-100 scoring model and explicit traffic categories.",
  },
  {
    number: "02",
    title: "Detection without punishing real users",
    copy: "Aggressive automation can turn uncertain signals into false positives. New properties therefore begin in monitor mode, keeping observation separate from enforcement until an owner chooses to block.",
    outcome: "A safer monitor-first operating posture.",
  },
  {
    number: "03",
    title: "Network identity without vendor lock-in",
    copy: "Scheduled jobs normalize public Tor, cloud-provider, VPN, and optional ASN data into local indexes. Failed refreshes retain the last known-good data instead of clearing classification state.",
    outcome: "Fast local lookups with explicit coverage limits.",
  },
  {
    number: "04",
    title: "Entitlements beyond payment state",
    copy: "Paid subscriptions and complimentary access need different owners. Signed, idempotent Stripe events update billing state while protected admin grants remain independent and auditable.",
    outcome: "A subscription model that survives retries and manual grants.",
  },
];

const study: CaseStudyContent = {
  theme: "amber",
  badge: "Traffic intelligence",
  headline: "Scoring website traffic before you block it.",
  lede: "MiniRipple helps site owners separate human traffic from bots, suspicious behavior, VPNs, Tor, and datacenter visits—then decide what to monitor and what to stop.",
  websiteLabel: "Visit MiniRipple",
  snapshots: [
    { icon: Gauge, value: "0-100", label: "Session risk scoring" },
    { icon: Database, value: "30 days", label: "Raw traffic lifecycle" },
    { icon: MonitorCheck, value: "Monitor first", label: "Default protection posture" },
    { icon: Boxes, value: "3 surfaces", label: "App, API, and tracker" },
  ],
  problem: {
    icon: Bot,
    title: "Raw traffic hides intent.",
    copy: "Site owners can see visits, but not necessarily whether those visits came from people, automation, privacy networks, or cloud infrastructure. Invalid clicks can distort campaign decisions while blunt blocking creates false positives.",
  },
  solution: {
    icon: Fingerprint,
    title: "Score first. Enforce second.",
    copy: "A lightweight tracker captures session signals, the API applies shared classification rules, and the dashboard gives the owner evidence before they activate targeted block policies.",
  },
  product: {
    title: "One loop from page view to decision.",
    copy: "The product connects collection, classification, explanation, enforcement, and entitlement instead of treating each as a separate utility.",
  },
  capabilities,
  architecture: {
    title: "How a page view becomes a classified session.",
    copy: "Choose a workflow to isolate its path. The highlighted connections show what moves, where it is processed, and which system owns the result.",
    nodes: architectureNodes,
    edges: architectureEdges,
    flows: architectureFlows,
    defaultFlowId: "traffic",
    ariaLabel: "MiniRipple system architecture",
    description: "Selectable flows connecting the browser tracker, application API, database, identity, billing, network intelligence, and delivery services.",
  },
  challengesIntro: {
    title: "The difficult parts were about trust.",
    copy: "A security analytics product has to be technically useful without overstating the confidence of its signals.",
  },
  challenges,
  closer: {
    title: "Traffic intelligence is only useful when its uncertainty is visible.",
    copy: "MiniRipple connects observation, classification, policy, and delivery while keeping the product boundary clear: monitor what the browser reports, explain the evidence, then let the owner decide how to act.",
  },
};

export default function MiniRippleCaseStudy({ project }: { project: Project }) {
  return <DetailedCaseStudy project={project} study={study} />;
}
