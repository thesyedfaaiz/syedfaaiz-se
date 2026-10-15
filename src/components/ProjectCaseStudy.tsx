import { BriefcaseBusiness, Code2, Layers3, Sparkles, Workflow, type LucideIcon } from "lucide-react";
import type { Project } from "../types";
import DetailedCaseStudy, { type CaseStudyContent } from "./DetailedCaseStudy";
import AdalAICaseStudy from "./AdalAICaseStudy";
import ForMuslimCaseStudy from "./ForMuslimCaseStudy";
import IdPCaseStudy from "./IdPCaseStudy";
import MiniRippleCaseStudy from "./MiniRippleCaseStudy";
import MortgageCRMCaseStudy from "./MortgageCRMCaseStudy";
import NodesCaseStudy from "./NodesCaseStudy";
import SyedFaaizCaseStudy from "./SyedFaaizCaseStudy";
import ZaffixxCaseStudy from "./ZaffixxCaseStudy";

const fallbackIcons: LucideIcon[] = [Workflow, Code2, Sparkles, Layers3, BriefcaseBusiness];

function fallbackTheme(project: Project): CaseStudyContent["theme"] {
  if (project.categories.includes("AI")) return "violet";
  if (project.categories.includes("Automation") || project.categories.includes("Integrations")) return "teal";
  if (project.categories.includes("Dashboards")) return "sky";
  return "amber";
}

function createProjectStudy(project: Project): CaseStudyContent {
  const capabilities = project.responsibilities.map((responsibility, index) => ({
    icon: fallbackIcons[index % fallbackIcons.length],
    title: "Implementation focus " + String(index + 1).padStart(2, "0"),
    copy: responsibility,
  }));

  const challenges = project.responsibilities.slice(0, 4).map((responsibility, index) => ({
    number: String(index + 1).padStart(2, "0"),
    title: "Delivery focus " + String(index + 1).padStart(2, "0"),
    copy: responsibility,
    outcome: "A documented part of the delivered product scope.",
  }));

  return {
    theme: fallbackTheme(project),
    badge: project.categories[0] ?? "Product engineering",
    headline: project.summary,
    lede: project.description,
    websiteLabel: "Visit " + project.name,
    snapshots: [
      { icon: Code2, value: String(project.technologies.length), label: "Core technologies" },
      { icon: BriefcaseBusiness, value: project.company, label: "Project context" },
      { icon: Layers3, value: String(project.responsibilities.length), label: "Documented responsibilities" },
      { icon: Workflow, value: project.categories.join(" · "), label: "Product focus" },
    ],
    problem: {
      icon: BriefcaseBusiness,
      title: "A focused product delivery needed a cohesive implementation.",
      copy: project.description,
    },
    solution: {
      icon: Workflow,
      title: "The work was organized around the core user workflow.",
      copy: project.summary,
    },
    product: {
      title: "The documented delivery scope.",
      copy: "This project has implementation details, but not enough confirmed system information to present an architecture diagram responsibly.",
    },
    capabilities,
    challengesIntro: {
      title: "The implementation priorities behind the delivery.",
      copy: "Each point below is drawn directly from the documented responsibilities for this project.",
    },
    challenges,
    closer: {
      title: "A focused record of the product work delivered.",
      copy: "This case study uses the same current presentation system as the fully documented projects while keeping its claims limited to the available project record.",
    },
  };
}

export default function ProjectCaseStudy({ project }: { project: Project }) {
  if (project.id === "mortgage-crm") return <MortgageCRMCaseStudy project={project} />;
  if (project.id === "adal-ai") return <AdalAICaseStudy project={project} />;
  if (project.id === "miniripple") return <MiniRippleCaseStudy project={project} />;
  if (project.id === "zaffixx") return <ZaffixxCaseStudy project={project} />;
  if (project.id === "syedfaaiz-idp") return <IdPCaseStudy project={project} />;
  if (project.id === "nodes") return <NodesCaseStudy project={project} />;
  if (project.id === "syedfaaiz") return <SyedFaaizCaseStudy project={project} />;
  if (project.id === "for-muslim") return <ForMuslimCaseStudy project={project} />;

  return <DetailedCaseStudy project={project} study={createProjectStudy(project)} />;
}
