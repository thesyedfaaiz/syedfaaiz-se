import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

type CaseStudyPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  backHref: string;
  backLabel: string;
  children?: ReactNode;
};

export default function CaseStudyPageHeader({ eyebrow, title, description, backHref, backLabel, children }: CaseStudyPageHeaderProps) {
  return (
    <header>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <span className="text-sm font-semibold text-primary-text">{eyebrow}</span>
        <a
          href={backHref}
          className="inline-flex min-h-8 items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-fg-muted transition-colors hover:bg-card-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {backLabel}
        </a>
      </div>
      <h1 className="mt-3 max-w-5xl text-4xl font-semibold tracking-tight text-fg-strong sm:text-5xl">{title}</h1>
      <p className="mt-3 max-w-3xl text-base leading-7 text-fg-muted">{description}</p>
      {children}
    </header>
  );
}
