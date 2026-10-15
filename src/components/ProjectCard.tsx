import { Badge, Card } from "@thesyedfaaiz/ui";
import type { Project } from "../types";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Card variant="bordered" size="sm" rounded="lg" className="h-full shadow-none transition-colors hover:bg-card-muted">
      <a
        href={`/case-study/${project.id}`}
        className="flex h-full min-h-48 flex-col gap-4 rounded-lg p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg sm:p-6"
        aria-label={`Read ${project.name} case study`}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="font-mono text-xs text-primary-text">{String(index + 1).padStart(2, "0")}</span>
          <span className="truncate text-xs text-fg-muted">{project.company}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold tracking-tight text-fg-strong sm:text-2xl">{project.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-fg-muted">{project.summary}</p>
        </div>
        <div className="flex flex-wrap gap-1.5" aria-label="Project technologies">
          {project.technologies.slice(0, 3).map((technology) => (
            <Badge key={technology} variant="soft" color="neutral" size="xs">{technology}</Badge>
          ))}
          {project.technologies.length > 3 && <span className="self-center text-[11px] text-fg-muted">+{project.technologies.length - 3}</span>}
        </div>
      </a>
    </Card>
  );
}
