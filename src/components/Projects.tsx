import { ArrowRight } from "lucide-react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const featured = projects.filter((project) => project.featured).slice(0, 9);

  return (
    <>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {featured.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
      </div>
      <div className="mt-7 flex justify-center">
        <a href="/case-studies" className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-fg transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          View all case studies <ArrowRight className="size-4" />
        </a>
      </div>
    </>
  );
}
