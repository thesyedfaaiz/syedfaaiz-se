import {
  Bot,
  Database,
  FileCheck2,
  FileOutput,
  Files,
  FileSearch,
  Layers3,
  ScanText,
  Stamp,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
import type { Project } from "../types";
import { type ArchitectureEdge, type ArchitectureFlow, type ArchitectureNode } from "./ArchitectureDiagram";
import DetailedCaseStudy, { type CaseStudyContent } from "./DetailedCaseStudy";

const architectureNodes: ArchitectureNode[] = [
  { id: "browser", title: "Workspace member", detail: "Browser session", x: 36, y: 64, width: 180, height: 78, mobile: { x: 18, y: 20, width: 144, height: 64 } },
  { id: "frontend", title: "Mortgage CRM", detail: "React + TypeScript", x: 304, y: 64, width: 180, height: 78, mobile: { x: 198, y: 20, width: 144, height: 64 } },
  { id: "api", title: "Application API", detail: "Node + Express", x: 510, y: 258, width: 192, height: 84, mobile: { x: 108, y: 150, width: 144, height: 64 } },
  { id: "mongo", title: "MongoDB", detail: "Tenants, fields + vectors", x: 900, y: 258, width: 184, height: 84, mobile: { x: 18, y: 280, width: 144, height: 64 } },
  { id: "s3", title: "Document storage", detail: "AWS S3 + signed URLs", x: 304, y: 484, width: 180, height: 78, mobile: { x: 198, y: 280, width: 144, height: 64 } },
  { id: "textract", title: "Document OCR", detail: "AWS Textract", x: 36, y: 484, width: 180, height: 78, mobile: { x: 18, y: 410, width: 144, height: 64 } },
  { id: "openai", title: "OpenAI", detail: "Extraction, chat + vectors", x: 900, y: 54, width: 184, height: 84, mobile: { x: 198, y: 410, width: 144, height: 64 } },
  { id: "bedrock", title: "Bedrock fallback", detail: "Optional extraction LLM", x: 620, y: 40, width: 180, height: 78, mobile: { x: 18, y: 540, width: 144, height: 64 } },
  { id: "stripe", title: "Stripe", detail: "Organization subscription", x: 620, y: 500, width: 180, height: 78, mobile: { x: 198, y: 540, width: 144, height: 64 } },
  { id: "smtp", title: "Email delivery", detail: "Verification + reset OTP", x: 36, y: 258, width: 180, height: 84, mobile: { x: 108, y: 660, width: 144, height: 64 } },
];

const architectureEdges: ArchitectureEdge[] = [
  { id: "browser-frontend", from: "browser", to: "frontend", path: "M216 103 L304 103", mobilePath: "M162 52 L198 52" },
  { id: "frontend-api", from: "frontend", to: "api", path: "M484 103 C548 103 606 188 606 258", mobilePath: "M270 84 C270 112 216 126 180 150" },
  { id: "api-mongo", from: "api", to: "mongo", path: "M702 300 L900 300", mobilePath: "M142 214 C126 242 104 258 90 280" },
  { id: "api-s3", from: "api", to: "s3", path: "M510 320 C464 366 438 444 408 484", mobilePath: "M218 214 C238 238 260 258 270 280" },
  { id: "api-textract", from: "api", to: "textract", path: "M510 328 C408 390 320 508 216 523", mobilePath: "M108 198 C8 250 8 378 18 442" },
  { id: "api-openai", from: "api", to: "openai", path: "M702 278 C810 254 804 96 900 96", mobilePath: "M218 214 C236 270 258 350 270 410" },
  { id: "api-bedrock", from: "api", to: "bedrock", path: "M606 258 C606 198 666 148 710 118", mobilePath: "M120 214 C62 302 56 468 90 540" },
  { id: "api-stripe", from: "api", to: "stripe", path: "M606 342 C606 420 660 468 710 500", mobilePath: "M240 214 C328 286 338 480 342 572" },
  { id: "stripe-webhook", from: "stripe", to: "api", path: "M800 539 C854 500 826 370 702 322", mobilePath: "M270 540 C270 410 224 282 192 214" },
  { id: "api-smtp", from: "api", to: "smtp", path: "M510 300 L216 300", mobilePath: "M150 214 C102 336 102 554 144 660" },
];

const architectureFlows: ArchitectureFlow[] = [
  {
    id: "pipeline",
    label: "Extract and fill",
    summary: "A member uploads a package. The API stores the file, reads or OCRs it, extracts schema fields, and saves the review record.",
    edgeIds: ["browser-frontend", "frontend-api", "api-s3", "api-textract", "api-openai", "api-mongo"],
    nodeIds: ["browser", "frontend", "api", "s3", "textract", "openai", "mongo"],
  },
  {
    id: "assistant",
    label: "Document assistant",
    summary: "Questions stay inside one client file: stored documents, embeddings, and the model.",
    edgeIds: ["frontend-api", "api-s3", "api-openai", "api-mongo"],
    nodeIds: ["frontend", "api", "s3", "openai", "mongo"],
  },
  {
    id: "billing",
    label: "Organization billing",
    summary: "Stripe checkout and webhooks update the organization subscription in MongoDB.",
    edgeIds: ["frontend-api", "api-stripe", "stripe-webhook", "api-mongo"],
    nodeIds: ["frontend", "api", "stripe", "mongo"],
  },
  {
    id: "auth",
    label: "Sign in",
    summary: "Sign-in and account email stay on the application API, MongoDB, and the mailer.",
    edgeIds: ["browser-frontend", "frontend-api", "api-mongo", "api-smtp"],
    nodeIds: ["browser", "frontend", "api", "mongo", "smtp"],
  },
];

const capabilities: { icon: LucideIcon; title: string; copy: string }[] = [
  { icon: Files, title: "Process mixed packages", copy: "Searchable PDFs, scans, images, DOCX files, spreadsheets, CSV, and text are normalized into one extraction-ready document flow." },
  { icon: WandSparkles, title: "Extract against a schema", copy: "A two-pass model first finds relevant schema keys, then returns only those values with snippets, confidence, conflicts, and validation signals." },
  { icon: FileCheck2, title: "Keep a person in control", copy: "Reviewers correct values, track required fields, and move the client file toward eligibility before any legal form is generated." },
  { icon: FileOutput, title: "Design and fill real PDFs", copy: "A visual designer maps master fields onto normalized page coordinates, then renders reviewed values onto the original flat legal form." },
  { icon: FileSearch, title: "Ask one client's files", copy: "Workspace- and submission-scoped retrieval answers questions from indexed documents and returns a fixed not-found response when evidence is missing." },
];

const challenges = [
  {
    number: "01",
    title: "Extracting a large, editable legal schema",
    copy: "A workspace can hold roughly one hundred mortgage fields. Sending the entire dictionary through one extraction pass increases prompt size and encourages irrelevant output. The pipeline first detects present keys, then extracts only that subset.",
    outcome: "Unknown keys are removed before extracted values enter the review model.",
  },
  {
    number: "02",
    title: "Treating mixed bank packages as one workflow",
    copy: "Digital PDFs can use their text layer, while scans and images require OCR. DOCX files may contain both paragraphs and embedded images, and spreadsheet formats need structural conversion before extraction.",
    outcome: "Each supported format becomes normalized Markdown before field extraction.",
  },
  {
    number: "03",
    title: "Filling flat legal PDFs",
    copy: "The target forms do not expose a consistent form-field standard. The template designer stores normalized rectangles, page numbers, alignment, and typography so the renderer can draw values directly onto the original PDF.",
    outcome: "The same master-field keys connect extraction, review, placement, and output.",
  },
  {
    number: "04",
    title: "Retrieval that works without an Atlas index",
    copy: "Production can use MongoDB Atlas Vector Search, but local or incomplete environments may not have the index. The API falls back to in-process cosine similarity after filtering chunks to the active workspace and client file.",
    outcome: "A missing vector index does not turn the document assistant into an empty feature.",
  },
];

const study: CaseStudyContent = {
  theme: "orange",
  badge: "Document intelligence",
  headline: "From bank packages to reviewed legal PDFs.",
  lede: "Mortgage CRM turns dense, mixed-format lending documents into structured fields, keeps a reviewer in control, and generates completed legal forms from workspace-designed templates.",
  snapshots: [
    { icon: Database, value: "~100 fields", label: "Starter mortgage schema" },
    { icon: WandSparkles, value: "2 passes", label: "Detect keys, then extract" },
    { icon: Stamp, value: "Human review", label: "Required before generation" },
    { icon: Layers3, value: "2 tenant levels", label: "Organization + workspace" },
  ],
  problem: {
    icon: ScanText,
    title: "Closing packages resist clean automation.",
    copy: "Mortgage files arrive as long PDFs, scans, Word documents, images, and spreadsheets. Staff must identify parties, loan terms, property details, and affidavit data before retyping them into flat legal forms.",
  },
  solution: {
    icon: Bot,
    title: "One schema from extraction to output.",
    copy: "A workspace-owned field dictionary guides AI extraction, powers the review queue, and connects reviewed values to placements on the original legal PDF.",
  },
  product: {
    title: "A controlled path from source file to final form.",
    copy: "Document conversion, structured extraction, human review, template placement, and generation are separate stages connected by one workspace schema.",
  },
  capabilities,
  architecture: {
    title: "How a lending package becomes a filled PDF.",
    copy: "Choose a workflow to follow the primary document pipeline, client-file assistant, organization billing, or authentication path.",
    nodes: architectureNodes,
    edges: architectureEdges,
    flows: architectureFlows,
    defaultFlowId: "pipeline",
    ariaLabel: "Mortgage CRM system architecture",
    description: "Selectable flows connecting the Mortgage CRM frontend, API, MongoDB, S3 storage, Textract, OpenAI, optional Bedrock extraction, Stripe, and email delivery.",
    mobileViewBox: "0 0 360 744",
  },
  challengesIntro: {
    title: "The hard part is preserving structure across imperfect documents.",
    copy: "Each stage has to keep tenant boundaries, schema keys, document evidence, and human corrections aligned before data reaches the final form.",
  },
  challenges,
  closer: {
    title: "Automation prepares the file. A person approves the record.",
    copy: "Mortgage CRM uses OCR and language models to reduce repetitive transcription, while the shared schema and review workflow keep the final PDF tied to visible, editable source values.",
  },
};

export default function MortgageCRMCaseStudy({ project }: { project: Project }) {
  return <DetailedCaseStudy project={project} study={study} />;
}
