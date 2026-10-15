import { BookOpenText, KeyRound, LibraryBig, ScrollText, type LucideIcon } from "lucide-react";
import type { Project } from "../types";
import { type ArchitectureEdge, type ArchitectureFlow, type ArchitectureNode } from "./ArchitectureDiagram";
import DetailedCaseStudy, { type CaseStudyContent } from "./DetailedCaseStudy";

const m = (x: number, y: number) => ({ x, y, width: 144, height: 64 });

const architectureNodes: ArchitectureNode[] = [
  { id: "reader", title: "Reader", detail: "No account required", x: 36, y: 64, width: 190, height: 78, mobile: m(18, 20) },
  { id: "web", title: "For Muslim", detail: "React reader", x: 320, y: 64, width: 180, height: 78, mobile: m(198, 20) },
  { id: "api", title: "Content API", detail: "Quran and Hadith", x: 520, y: 258, width: 190, height: 84, mobile: m(108, 150) },
  { id: "mongo", title: "MongoDB", detail: "Editions and narrations", x: 900, y: 248, width: 180, height: 84, mobile: m(18, 280) },
  { id: "idp", title: "Syed Faaiz IdP", detail: "Admin sign-in", x: 900, y: 48, width: 180, height: 78, mobile: m(198, 280) },
  { id: "admin", title: "Administrator", detail: "Role ADMIN", x: 36, y: 484, width: 180, height: 78, mobile: m(18, 410) },
  { id: "source", title: "QuranEnc", detail: "Optional import", x: 700, y: 484, width: 170, height: 78, mobile: m(198, 410) },
];

const architectureEdges: ArchitectureEdge[] = [
  { id: "reader-web", from: "reader", to: "web", path: "M226 103 L320 103", mobilePath: "M162 52 L198 52" },
  { id: "web-api", from: "web", to: "api", path: "M500 103 C540 140 500 250 520 290", mobilePath: "M270 84 C270 116 220 136 198 150" },
  { id: "api-mongo", from: "api", to: "mongo", path: "M710 300 L900 290", mobilePath: "M142 214 C110 240 80 260 90 280" },
  { id: "api-idp", from: "api", to: "idp", path: "M710 270 C820 180 840 100 900 87", mobilePath: "M220 214 C260 240 280 260 270 280" },
  { id: "admin-web", from: "admin", to: "web", path: "M126 484 C160 300 240 180 320 142", mobilePath: "M90 410 C30 300 40 120 90 84" },
  { id: "source-api", from: "source", to: "api", path: "M760 484 C700 420 660 360 640 342", mobilePath: "M180 474 C180 400 180 250 180 214" },
];

const architectureFlows: ArchitectureFlow[] = [
  {
    id: "read",
    label: "Read",
    summary: "Quran and Hadith pages load without a session. The API resolves the current published text, translation, tafsir, or narration edition.",
    edgeIds: ["reader-web", "web-api", "api-mongo"],
    nodeIds: ["reader", "web", "api", "mongo"],
  },
  {
    id: "admin",
    label: "Administer",
    summary: "An administrator signs in through the IdP. Only a user with role ADMIN can manage the catalog or publish a release.",
    edgeIds: ["admin-web", "web-api", "api-idp", "api-mongo"],
    nodeIds: ["admin", "web", "api", "idp", "mongo"],
  },
  {
    id: "import",
    label: "Import",
    summary: "Administrators import Quran text, annotations, and Hadith bundles. QuranEnc is one provider, and a large import can outlive a short serverless limit.",
    edgeIds: ["admin-web", "web-api", "source-api", "api-mongo"],
    nodeIds: ["admin", "web", "api", "source", "mongo"],
  },
];

const capabilities: { icon: LucideIcon; title: string; copy: string }[] = [
  { icon: BookOpenText, title: "Read a surah", copy: "Readers open a surah and ayah with a published text edition, and can request translation and tafsir editions that have a current release." },
  { icon: LibraryBig, title: "Browse a collection", copy: "Hadith is organized as collections, nodes, and narrations. Public routes do not ask for a session." },
  { icon: ScrollText, title: "Publish an edition", copy: "The catalog tracks editions and releases. Publishing the current release is an administrator action." },
  { icon: KeyRound, title: "Protect the desk", copy: "Admin sign-in uses the Syed Faaiz IdP BFF. The API then requires the local role ADMIN." },
];

const challenges = [
  {
    number: "01",
    title: "A reader should only see a published release",
    copy: "Text, translation, and tafsir are editions. The API resolves the current published release and rejects a slug that has no release or the wrong edition kind.",
    outcome: "An imported draft does not become the public Quran by accident.",
  },
  {
    number: "02",
    title: "Public reading and administration share one API",
    copy: "Surah and Hadith reads are open, with a rate limit. Catalog changes, imports, and publish require a session whose user role is ADMIN.",
    outcome: "Knowing the content URL is not enough to change it.",
  },
  {
    number: "03",
    title: "Imports are larger than a page view",
    copy: "Quran text, annotations, Hadith bundles, and QuranEnc translations are operational imports. A huge QuranEnc import can exceed a 60-second serverless limit.",
    outcome: "Large imports are treated as an operations job, not as a casual button press.",
  },
];

const study: CaseStudyContent = {
  theme: "emerald",
  badge: "Quran and Hadith",
  headline: "A public reader, with a locked publishing desk.",
  lede: "For Muslim is a Quran and Hadith library. Anyone can read published editions. Administrators sign in through Syed Faaiz IdP to import sources and publish releases.",
  websiteLabel: "Visit For Muslim",
  snapshots: [
    { icon: BookOpenText, value: "Public", label: "Reads need no account" },
    { icon: ScrollText, value: "Editions", label: "Current published release" },
    { icon: KeyRound, value: "ADMIN", label: "IdP session plus local role" },
    { icon: LibraryBig, value: "Two texts", label: "Quran and Hadith collections" },
  ],
  problem: {
    icon: BookOpenText,
    title: "Scripture on the web is often a file dump.",
    copy: "Readers need a surah or a narration they can open, with a named edition. Editors need a way to import and publish that edition without making the library itself a login wall.",
  },
  solution: {
    icon: LibraryBig,
    title: "Read the current release. Publish it as an administrator.",
    copy: "The public app resolves Quran and Hadith from published editions. Imports, catalog edits, and release publishing stay behind an IdP session and the ADMIN role.",
  },
  product: {
    title: "From a source text to a page a reader can cite.",
    copy: "The catalog and reader both resolve the same named, published release.",
  },
  capabilities,
  architecture: {
    title: "How a published edition reaches a reader.",
    copy: "Choose a flow to follow public reading, administration, or source import.",
    nodes: architectureNodes,
    edges: architectureEdges,
    flows: architectureFlows,
    defaultFlowId: "read",
    ariaLabel: "For Muslim system architecture",
    description: "Selectable flows connecting the public reader, content API, MongoDB, Syed Faaiz IdP, administrator, and QuranEnc import.",
    mobileViewBox: "0 0 360 500",
  },
  challengesIntro: {
    title: "The edition has to be explicit, or the reader cannot trust the page.",
    copy: "The product is not a single Quran file. It is a catalog of releases, with a public path and a much smaller set of people allowed to change it.",
  },
  challenges,
  closer: {
    title: "Open reading is a publishing decision, not an accident.",
    copy: "For Muslim keeps the library public, names the edition a page is using, and puts import and publish behind the platform account plus a local administrator role.",
  },
};

export default function ForMuslimCaseStudy({ project }: { project: Project }) {
  return <DetailedCaseStudy project={project} study={study} />;
}
