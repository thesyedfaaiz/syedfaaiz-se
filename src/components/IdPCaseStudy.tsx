import { AppWindow, Fingerprint, KeyRound, ShieldCheck, Waypoints, type LucideIcon } from "lucide-react";
import type { Project } from "../types";
import { type ArchitectureEdge, type ArchitectureFlow, type ArchitectureNode } from "./ArchitectureDiagram";
import DetailedCaseStudy, { type CaseStudyContent } from "./DetailedCaseStudy";

const m = (x: number, y: number) => ({ x, y, width: 144, height: 64 });

const architectureNodes: ArchitectureNode[] = [
  { id: "person", title: "Person", detail: "Browser", x: 36, y: 64, width: 180, height: 78, mobile: m(18, 20) },
  { id: "ui", title: "Hosted UI", detail: "auth.syedfaaiz.com", x: 304, y: 64, width: 190, height: 78, mobile: m(198, 20) },
  { id: "api", title: "Auth API", detail: "OIDC issuer", x: 520, y: 258, width: 190, height: 84, mobile: m(108, 150) },
  { id: "mongo", title: "MongoDB", detail: "Identities and clients", x: 900, y: 258, width: 180, height: 84, mobile: m(18, 280) },
  { id: "mail", title: "Email", detail: "Verify, reset, OTP", x: 36, y: 258, width: 180, height: 84, mobile: m(198, 280) },
  { id: "product", title: "Product BFF", detail: "Confidential client", x: 304, y: 484, width: 190, height: 78, mobile: m(198, 410) },
  { id: "proof", title: "Domain proof", detail: "DNS, file, or meta", x: 900, y: 54, width: 180, height: 78, mobile: m(18, 410) },
];

const architectureEdges: ArchitectureEdge[] = [
  { id: "person-ui", from: "person", to: "ui", path: "M216 103 L304 103", mobilePath: "M162 52 L198 52" },
  { id: "ui-api", from: "ui", to: "api", path: "M494 103 C560 103 615 190 615 258", mobilePath: "M342 52 C300 60 180 105 180 150" },
  { id: "api-mongo", from: "api", to: "mongo", path: "M710 300 L900 300", mobilePath: "M142 214 C120 240 90 260 90 280" },
  { id: "api-mail", from: "api", to: "mail", path: "M520 300 L216 300", mobilePath: "M220 214 C250 240 270 260 270 280" },
  { id: "product-ui", from: "product", to: "ui", path: "M399 484 L399 142", mobilePath: "M270 410 L270 84" },
  { id: "product-api", from: "product", to: "api", path: "M494 523 C560 500 615 420 615 342", mobilePath: "M342 442 C300 390 180 300 180 214" },
  { id: "api-proof", from: "api", to: "proof", path: "M710 270 C820 220 840 110 900 93", mobilePath: "M180 214 C180 280 120 360 90 410" },
];

const architectureFlows: ArchitectureFlow[] = [
  {
    id: "account",
    label: "Create an account",
    summary: "Registration, email verification, and password recovery stay on the hosted UI and the issuer. The mailer delivers the message.",
    edgeIds: ["person-ui", "ui-api", "api-mongo", "api-mail"],
    nodeIds: ["person", "ui", "api", "mongo", "mail"],
  },
  {
    id: "app",
    label: "Sign in to an app",
    summary: "A product backend starts Authorization Code with PKCE. The person signs in on the hosted UI, and the product exchanges the code server-side.",
    edgeIds: ["product-ui", "person-ui", "ui-api", "product-api", "api-mongo"],
    nodeIds: ["product", "person", "ui", "api", "mongo"],
  },
  {
    id: "register",
    label: "Register an app",
    summary: "An organization proves a domain, then creates a public or confidential client. The secret is shown once and stored only as a hash.",
    edgeIds: ["person-ui", "ui-api", "api-proof", "api-mongo"],
    nodeIds: ["person", "ui", "api", "proof", "mongo"],
  },
  {
    id: "session",
    label: "MFA and sessions",
    summary: "TOTP, email OTP, backup codes, and trusted devices gate the account. Refresh tokens rotate, and reuse revokes the session family.",
    edgeIds: ["person-ui", "ui-api", "api-mongo", "api-mail"],
    nodeIds: ["person", "ui", "api", "mongo", "mail"],
  },
];

const capabilities: { icon: LucideIcon; title: string; copy: string }[] = [
  { icon: Fingerprint, title: "Host the account", copy: "People register, verify email, reset a password, choose a remembered account, and sign in on the hosted UI." },
  { icon: ShieldCheck, title: "Step up the session", copy: "TOTP, email one-time codes, backup codes, and trusted devices are implemented. SMS challenges exist only as a mock provider." },
  { icon: KeyRound, title: "Issue OIDC tokens", copy: "Discovery, JWKS, Authorization Code with PKCE, refresh, userinfo, and revocation. Access tokens are RS256." },
  { icon: AppWindow, title: "Register product apps", copy: "After a domain is verified, an organization can create a public or confidential client with exact redirect URIs." },
  { icon: Waypoints, title: "Keep app authz local", copy: "The IdP owns identity. Each product maps the stable subject to its own roles, workspaces, or admin flag." },
];

const challenges = [
  {
    number: "01",
    title: "The login page and the issuer are different origins",
    copy: "People use auth.syedfaaiz.com. Tokens, discovery, and JWKS live on auth-api.syedfaaiz.com. Product backends must use the API origin as the issuer.",
    outcome: "The hosted UI is not treated as the authority that signs tokens.",
  },
  {
    number: "02",
    title: "A product login must not replace the IdP session",
    copy: "The browser session with the provider uses an HttpOnly refresh cookie. Exchanging a code for a relying party does not overwrite that cookie.",
    outcome: "Signing in to Nodes or Zaffixx does not silently become a new IdP session.",
  },
  {
    number: "03",
    title: "Apps are not registered on trust alone",
    copy: "Creating a client requires a verified domain: DNS TXT, DNS CNAME, an HTML file, or a meta tag. Consent applies to clients that are not first-party.",
    outcome: "Redirect URIs and client secrets belong to an organization that proved the domain.",
  },
  {
    number: "04",
    title: "Refresh tokens have to survive reuse",
    copy: "Sessions are stored, refresh tokens rotate, and a reused refresh token revokes the family. Logout in the UI ends the IdP browser session.",
    outcome: "A copied refresh token does not keep working beside the real one.",
  },
];

const study: CaseStudyContent = {
  theme: "violet",
  badge: "Identity provider",
  headline: "One account for the platform. Each product keeps its own authority.",
  lede: "Syed Faaiz IdP is the hosted account system and OpenID Connect issuer for the platform. It handles registration, MFA, sessions, and application registration. It does not own product permissions.",
  websiteLabel: "Visit the IdP",
  snapshots: [
    { icon: KeyRound, value: "RS256", label: "Signed access tokens" },
    { icon: Waypoints, value: "Auth code", label: "PKCE, public or confidential" },
    { icon: ShieldCheck, value: "MFA", label: "TOTP, email OTP, backup codes" },
    { icon: AppWindow, value: "Two origins", label: "UI and issuer stay apart" },
  ],
  problem: {
    icon: Fingerprint,
    title: "Every product was about to invent its own account system.",
    copy: "Nodes, Zaffixx, and For Muslim need the same person, with MFA and durable sessions, without sharing one database of business roles or putting tokens in the browser.",
  },
  solution: {
    icon: KeyRound,
    title: "Issue identity. Leave authorization in the product.",
    copy: "The IdP proves who the person is. Confidential product backends complete the code exchange, store their own session, and map the subject onto local roles.",
  },
  product: {
    title: "From a hosted account to a registered application.",
    copy: "The same issuer serves people managing their security and organizations registering the apps those people can sign in to.",
  },
  capabilities,
  architecture: {
    title: "How a person, a product, and a registered app meet.",
    copy: "Choose a flow to follow account recovery, a product sign-in, application registration, or MFA and sessions.",
    nodes: architectureNodes,
    edges: architectureEdges,
    flows: architectureFlows,
    defaultFlowId: "app",
    ariaLabel: "Syed Faaiz IdP system architecture",
    description: "Selectable flows connecting the hosted login UI, OIDC API, MongoDB, email delivery, domain verification, and product backends.",
    mobileViewBox: "0 0 360 500",
  },
  challengesIntro: {
    title: "Identity is only useful if products cannot accidentally become the provider.",
    copy: "The issuer, the login UI, the product session, and the client registry each have a job. Mixing them is how redirect and session bugs start.",
  },
  challenges,
  closer: {
    title: "The platform has one subject. It does not have one permission model.",
    copy: "Syed Faaiz IdP keeps registration, MFA, token signing, and application onboarding in one place, then lets each product decide what that person is allowed to do.",
  },
};

export default function IdPCaseStudy({ project }: { project: Project }) {
  return <DetailedCaseStudy project={project} study={study} />;
}
