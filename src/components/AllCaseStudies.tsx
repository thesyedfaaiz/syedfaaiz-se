import { useState } from "react";
import { projects } from "../data/projects";
import CaseStudyPageHeader from "./CaseStudyPageHeader";
import ProjectCard from "./ProjectCard";

const filters = ["All", "Platform", "AI", "SaaS", "Full Stack", "Automation", "Dashboards", "Integrations"];

export default function AllCaseStudies() {
  const [filter, setFilter] = useState("All");
  const shown = projects.filter((project) => filter === "All" || project.categories.includes(filter));

  return (
    <main className="min-h-screen bg-bg text-fg">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <CaseStudyPageHeader
          eyebrow="Case study archive"
          title="All case studies"
          description="Product engineering across the platform, AI products, SaaS, automation, and dashboards."
          backHref="/#projects"
          backLabel="Portfolio"
        />

        <div className="mt-8 flex gap-1.5 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible" role="group" aria-label="Filter case studies">
          {filters.map((item) => (
            <button key={item} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item}
              className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg ${filter === item ? "border-border bg-primary-subtle text-primary-text" : "border-border bg-card text-fg-muted hover:bg-card-muted hover:text-fg"}`}>
              {item}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((project) => <ProjectCard key={project.id} project={project} index={projects.indexOf(project)} />)}
        </div>
        <p className="mt-5 text-xs text-fg-muted" role="status">{shown.length} {shown.length === 1 ? "case study" : "case studies"}</p>
      </div>
    </main>
  );
}
