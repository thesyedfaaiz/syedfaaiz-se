import {
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarCheck2,
  FileSearch,
  Gavel,
  KeyRound,
  Landmark,
  Layers3,
  Scale,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { Project } from "../types";
import { type ArchitectureEdge, type ArchitectureFlow, type ArchitectureNode } from "./ArchitectureDiagram";
import DetailedCaseStudy, { type CaseStudyContent } from "./DetailedCaseStudy";

const architectureNodes: ArchitectureNode[] = [
  { id: "browser", title: "Client or lawyer", detail: "Browser session", x: 36, y: 64, width: 180, height: 78, mobile: { x: 18, y: 20, width: 144, height: 64 } },
  { id: "frontend", title: "Adal web app", detail: "React + Vite", x: 304, y: 64, width: 180, height: 78, mobile: { x: 198, y: 20, width: 144, height: 64 } },
  { id: "api", title: "Application API", detail: "Node + Express", x: 510, y: 258, width: 192, height: 84, mobile: { x: 108, y: 150, width: 144, height: 64 } },
  { id: "mongo", title: "MongoDB", detail: "Product system of record", x: 900, y: 258, width: 184, height: 84, mobile: { x: 18, y: 280, width: 144, height: 64 } },
  { id: "realtime", title: "Realtime gateway", detail: "Socket.IO + WebRTC", x: 304, y: 484, width: 180, height: 78, mobile: { x: 198, y: 280, width: 144, height: 64 } },
  { id: "openai", title: "OpenAI", detail: "Chat + embeddings", x: 900, y: 54, width: 184, height: 84, mobile: { x: 18, y: 410, width: 144, height: 64 } },
  { id: "pinecone", title: "Vector search", detail: "Pinecone namespaces", x: 900, y: 484, width: 184, height: 78, mobile: { x: 198, y: 410, width: 144, height: 64 } },
  { id: "uploads", title: "Document storage", detail: "Uploaded files", x: 36, y: 484, width: 180, height: 78, mobile: { x: 18, y: 540, width: 144, height: 64 } },
  { id: "resend", title: "Email delivery", detail: "Resend notifications", x: 36, y: 258, width: 180, height: 84, mobile: { x: 198, y: 540, width: 144, height: 64 } },
  { id: "stripe", title: "Stripe", detail: "Workspace subscriptions", x: 620, y: 500, width: 180, height: 78, mobile: { x: 18, y: 660, width: 144, height: 64 } },
  { id: "jobs", title: "Scheduled jobs", detail: "Reminders + billing", x: 620, y: 40, width: 180, height: 78, mobile: { x: 198, y: 660, width: 144, height: 64 } },
];

const architectureEdges: ArchitectureEdge[] = [
  { id: "browser-frontend", from: "browser", to: "frontend", path: "M216 103 L304 103", mobilePath: "M162 52 L198 52" },
  { id: "frontend-api", from: "frontend", to: "api", path: "M484 103 C548 103 466 277 510 290", mobilePath: "M270 84 C270 116 218 136 198 150" },
  { id: "api-mongo", from: "api", to: "mongo", path: "M702 300 L900 300", mobilePath: "M142 214 C126 242 104 258 90 280" },
  { id: "frontend-realtime", from: "frontend", to: "realtime", path: "M394 142 C394 250 366 382 394 484", mobilePath: "M306 84 C350 132 350 260 342 312" },
  { id: "realtime-mongo", from: "realtime", to: "mongo", path: "M484 523 C648 523 760 354 900 320", mobilePath: "M198 312 L162 312" },
  { id: "api-resend", from: "api", to: "resend", path: "M510 300 L216 300", mobilePath: "M252 184 C350 230 352 500 342 572" },
  { id: "api-uploads", from: "api", to: "uploads", path: "M510 322 C410 378 320 508 216 523", mobilePath: "M108 198 C8 252 8 506 18 572" },
  { id: "api-openai", from: "api", to: "openai", path: "M702 278 C810 254 804 96 900 96", mobilePath: "M142 214 C124 270 102 350 90 410" },
  { id: "api-pinecone", from: "api", to: "pinecone", path: "M702 322 C812 350 804 523 900 523", mobilePath: "M218 214 C236 270 258 350 270 410" },
  { id: "api-stripe", from: "api", to: "stripe", path: "M606 342 C606 420 660 468 710 500", mobilePath: "M108 184 C4 266 6 610 18 692" },
  { id: "stripe-webhook", from: "stripe", to: "api", path: "M800 539 C854 500 826 370 702 322", mobilePath: "M90 660 C90 500 150 306 160 214" },
  { id: "jobs-api", from: "jobs", to: "api", path: "M710 118 C710 180 642 230 620 258", mobilePath: "M270 660 C356 504 356 194 252 182" },
];

const architectureFlows: ArchitectureFlow[] = [
  {
    id: "consultation",
    label: "Book consultation",
    summary: "A booking moves through the web app into MongoDB, with email notifications and a realtime channel limited to that consultation.",
    edgeIds: ["browser-frontend", "frontend-api", "api-mongo", "api-resend", "frontend-realtime", "realtime-mongo"],
    nodeIds: ["browser", "frontend", "api", "mongo", "resend", "realtime"],
  },
  {
    id: "research",
    label: "Legal research",
    summary: "Research retrieves workspace or shared context first, then asks the model to answer from those excerpts.",
    edgeIds: ["frontend-api", "api-pinecone", "api-mongo", "api-openai"],
    nodeIds: ["frontend", "api", "pinecone", "mongo", "openai"],
  },
  {
    id: "verification",
    label: "Lawyer verification",
    summary: "Verification stores documents, updates the application record, and sends the related email.",
    edgeIds: ["frontend-api", "api-uploads", "api-mongo", "api-resend"],
    nodeIds: ["frontend", "api", "uploads", "mongo", "resend"],
  },
  {
    id: "subscription",
    label: "Workspace billing",
    summary: "Checkout and webhooks update the workspace subscription, with scheduled jobs for billing follow-up.",
    edgeIds: ["frontend-api", "api-stripe", "stripe-webhook", "api-mongo", "jobs-api"],
    nodeIds: ["frontend", "api", "stripe", "mongo", "jobs"],
  },
];

const capabilities: { icon: LucideIcon; title: string; copy: string }[] = [
  { icon: BadgeCheck, title: "Verified discovery", copy: "Clients search lawyer profiles by specialization and city, while marketplace access is protected by an administrator-reviewed verification flow." },
  { icon: CalendarCheck2, title: "Book and meet", copy: "Availability, wallet credits, consultation types, reminders, realtime chat, and browser video stay attached to one booking lifecycle." },
  { icon: BriefcaseBusiness, title: "Run the practice", copy: "Personal and firm workspaces bring cases, hearings, planner events, documents, members, and visibility rules into one operating surface." },
  { icon: FileSearch, title: "Research with context", copy: "Shared case law and private workspace files are chunked, embedded, retrieved, and passed into a citation-aware legal research workflow." },
  { icon: UsersRound, title: "Control firm access", copy: "Owners, administrators, lawyers, paralegals, and custom roles receive explicit workspace permissions rather than sharing one broad account." },
];

const challenges = [
  {
    number: "01",
    title: "One product, two access models",
    copy: "Clients need to discover and book lawyers without purchasing SaaS access. Practice tools, meanwhile, are limited per workspace. The system separates marketplace credits from workspace subscriptions so one commercial model does not block the other.",
    outcome: "Marketplace access remains independent from practice entitlements.",
  },
  {
    number: "02",
    title: "Tenant isolation beyond the interface",
    copy: "Firm access has to remain consistent across membership, permissions, case visibility, documents, and retrieval. Private vectors use workspace-specific namespaces, while shared legal authorities stay in separate public collections.",
    outcome: "Workspace boundaries continue into the retrieval layer.",
  },
  {
    number: "03",
    title: "Grounding without decorative citations",
    copy: "Legal users can place too much trust in a plausible source. The research flow retrieves context first, asks the model to cite numbered excerpts, and removes any citation that the answer did not actually reference.",
    outcome: "The interface only retains sources explicitly used in the answer.",
  },
  {
    number: "04",
    title: "Realtime consultation as a booking state",
    copy: "Chat and video are not open rooms. Socket connections authenticate the user, confirm booking participation, and relay messages or WebRTC signaling only inside the active consultation context.",
    outcome: "Realtime access follows the same participant boundary as the booking.",
  },
];

const study: CaseStudyContent = {
  theme: "teal",
  badge: "Legal technology",
  headline: "A lawyer marketplace and practice workspace, built as one product.",
  lede: "Adal AI connects clients with verified lawyers while giving individual practitioners and firms one workspace for cases, calendars, documents, collaboration, and grounded legal research.",
  websiteLabel: "Visit Adal AI",
  snapshots: [
    { icon: Scale, value: "2-sided", label: "Marketplace + practice SaaS" },
    { icon: Layers3, value: "Workspace", label: "Tenant and billing boundary" },
    { icon: BookOpenCheck, value: "3 scopes", label: "Case law, public, and private RAG" },
    { icon: KeyRound, value: "JWT + OTP", label: "Application identity model" },
  ],
  problem: {
    icon: Gavel,
    title: "Legal work is split across disconnected tools.",
    copy: "Clients rely on informal discovery and uncertain verification. Lawyers manage bookings, matters, hearings, files, teams, and research in separate systems that do not share context.",
  },
  solution: {
    icon: Landmark,
    title: "Connect the consultation to the practice.",
    copy: "Adal combines verified lawyer discovery and booking with workspace-scoped cases, calendars, roles, documents, subscriptions, and retrieval-assisted legal research.",
  },
  product: {
    title: "From finding counsel to running the matter.",
    copy: "The marketplace and practice workspace share identity and infrastructure, but their access and commercial rules remain intentionally separate.",
  },
  capabilities,
  architecture: {
    title: "How marketplace and practice workflows share one platform.",
    copy: "Choose a flow to trace consultation, research, verification, or subscription activity through the system.",
    nodes: architectureNodes,
    edges: architectureEdges,
    flows: architectureFlows,
    defaultFlowId: "consultation",
    ariaLabel: "Adal AI system architecture",
    description: "Selectable flows connecting the Adal web application, API, database, realtime gateway, file storage, AI providers, notifications, billing, and scheduled jobs.",
    mobileViewBox: "0 0 360 744",
  },
  challengesIntro: {
    title: "Trust has to survive every boundary.",
    copy: "The difficult work is not one isolated feature; it is keeping marketplace, workspace, realtime, billing, and retrieval rules consistent as data crosses systems.",
  },
  challenges,
  closer: {
    title: "A legal platform has to make access, evidence, and ownership explicit.",
    copy: "Adal separates client bookings from practice entitlements, applies workspace boundaries to both records and vectors, and keeps realtime sessions attached to verified participants and bookings.",
  },
};

export default function AdalAICaseStudy({ project }: { project: Project }) {
  return <DetailedCaseStudy project={project} study={study} />;
}
