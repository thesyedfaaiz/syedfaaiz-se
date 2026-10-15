import { GitBranch, KeyRound, MessageSquareText, Share2, type LucideIcon } from "lucide-react";
import type { Project } from "../types";
import { type ArchitectureEdge, type ArchitectureFlow, type ArchitectureNode } from "./ArchitectureDiagram";
import DetailedCaseStudy, { type CaseStudyContent } from "./DetailedCaseStudy";

const m = (x: number, y: number) => ({ x, y, width: 144, height: 64 });

const architectureNodes: ArchitectureNode[] = [
  { id: "reader", title: "Reader", detail: "Public or owner", x: 36, y: 64, width: 180, height: 78, mobile: m(18, 20) },
  { id: "web", title: "Nodes", detail: "React + Vite", x: 304, y: 64, width: 180, height: 78, mobile: m(198, 20) },
  { id: "api", title: "Nodes API", detail: "Express BFF", x: 520, y: 258, width: 190, height: 84, mobile: m(108, 150) },
  { id: "mongo", title: "MongoDB", detail: "Trees and reactions", x: 900, y: 258, width: 180, height: 84, mobile: m(18, 280) },
  { id: "idp", title: "Syed Faaiz IdP", detail: "OIDC issuer", x: 900, y: 54, width: 180, height: 84, mobile: m(198, 280) },
];

const architectureEdges: ArchitectureEdge[] = [
  { id: "reader-web", from: "reader", to: "web", path: "M216 103 L304 103", mobilePath: "M162 52 L198 52" },
  { id: "web-api", from: "web", to: "api", path: "M484 103 C540 103 500 270 520 290", mobilePath: "M270 84 C270 116 220 136 198 150" },
  { id: "api-mongo", from: "api", to: "mongo", path: "M710 300 L900 300", mobilePath: "M142 214 C110 240 80 260 90 280" },
  { id: "api-idp", from: "api", to: "idp", path: "M710 270 C820 200 840 110 900 96", mobilePath: "M220 214 C260 240 280 260 270 280" },
];

const architectureFlows: ArchitectureFlow[] = [
  {
    id: "tree",
    label: "Read and edit",
    summary: "Anyone can read a username tree. Its owner can create, move, duplicate, or delete nodes; moves reject cycles, and deletion can promote children.",
    edgeIds: ["reader-web", "web-api", "api-mongo"],
    nodeIds: ["reader", "web", "api", "mongo"],
  },
  {
    id: "signin",
    label: "Sign in",
    summary: "Nodes starts Authorization Code with PKCE. The API exchanges the code, encrypts the refresh token, and sets an HttpOnly session cookie.",
    edgeIds: ["web-api", "api-idp", "api-mongo"],
    nodeIds: ["web", "api", "idp", "mongo"],
  },
];

const capabilities: { icon: LucideIcon; title: string; copy: string }[] = [
  { icon: GitBranch, title: "Nest the work", copy: "Notes, projects, and links sit in a parent-child tree with depth, order, status, descriptions, and custom fields." },
  { icon: Share2, title: "Publish by username", copy: "Each person has a public /username/nodes page. Visitors can open a node without an account." },
  { icon: MessageSquareText, title: "Comment and react", copy: "Comments are threaded. A person can leave one emoji reaction on a node or a comment." },
  { icon: KeyRound, title: "Sign in through the IdP", copy: "The browser holds a signed HttpOnly cookie. Access, ID, and refresh tokens stay on the API." },
];

const challenges = [
  {
    number: "01",
    title: "A tree that survives move and delete",
    copy: "Parent and children links, depth, and order have to stay consistent. A move checks for cycles. Delete can remove a subtree or promote the children.",
    outcome: "The public hierarchy and the editor describe the same structure.",
  },
  {
    number: "02",
    title: "A public page with a private session",
    copy: "Reads by username are open. Mutations require the owner. The OIDC client is confidential, the code verifier is encrypted, and the SPA never receives tokens.",
    outcome: "Signing in does not turn the public tree into a token in the browser.",
  },
  {
    number: "03",
    title: "Leaving the old com database behind",
    copy: "Nodes has its own MongoDB database. A one-time migration copies nodes, comments, reactions, emojis, and users, then links IdP subjects locally.",
    outcome: "The product no longer shares a database with the retired com API.",
  },
];

const study: CaseStudyContent = {
  theme: "emerald",
  badge: "Hierarchical publishing",
  headline: "A public tree for notes, projects, and links.",
  lede: "Nodes is a hierarchical publishing surface. People organize work into a nested tree, share it at a username URL, and discuss it with comments and reactions. Sign-in is Syed Faaiz IdP.",
  websiteLabel: "Visit Nodes",
  snapshots: [
    { icon: GitBranch, value: "One tree", label: "Parent, children, and depth" },
    { icon: Share2, value: "Username", label: "Public collection URL" },
    { icon: MessageSquareText, value: "Threads", label: "Comments and emoji reactions" },
    { icon: KeyRound, value: "BFF cookie", label: "Tokens stay on the API" },
  ],
  problem: {
    icon: GitBranch,
    title: "A profile is a list. The work is a tree.",
    copy: "Notes, projects, and links lose their relationship when they are flattened into posts. Sharing them should not require a second account system.",
  },
  solution: {
    icon: Share2,
    title: "Publish the hierarchy, and sign in only to change it.",
    copy: "Owners edit a tree. Everyone else can read a username page, comment, and react. The session belongs to the platform IdP, held by the Nodes API.",
  },
  product: {
    title: "From a nested note to a page someone can find.",
    copy: "Editing, public reading, and discussion are the same collection seen through different doors.",
  },
  capabilities,
  architecture: {
    title: "How a node becomes a public page.",
    copy: "Follow the shared public-and-owner tree path, or see how the owner signs in.",
    nodes: architectureNodes,
    edges: architectureEdges,
    flows: architectureFlows,
    defaultFlowId: "tree",
    ariaLabel: "Nodes system architecture",
    description: "Selectable flows connecting the Nodes web app, API, MongoDB, and Syed Faaiz IdP.",
    mobileViewBox: "0 0 360 380",
  },
  challengesIntro: {
    title: "The tree and the session cannot drift apart.",
    copy: "Most of the product is one collection. The work is keeping public reads, owner edits, and the account boundary in agreement.",
  },
  challenges,
  closer: {
    title: "Publishing is a hierarchy with a platform account behind it.",
    copy: "Nodes keeps the content model small, the public URL stable, and the identity boundary on the API so the browser can read a tree without holding a token.",
  },
};

export default function NodesCaseStudy({ project }: { project: Project }) {
  return <DetailedCaseStudy project={project} study={study} />;
}
