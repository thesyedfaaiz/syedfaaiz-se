import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, ExternalLink, Sparkles, type LucideIcon } from "lucide-react";
import type { Project } from "../types";
import ArchitectureDiagram, { type ArchitectureEdge, type ArchitectureFlow, type ArchitectureNode } from "./ArchitectureDiagram";
import CaseStudyPageHeader from "./CaseStudyPageHeader";
import { Tag } from "./ui";

export type CaseStudyTheme = { diagramAccent: string; diagramText: string };

// Keep the existing case-study keys without assigning a fixed palette to each
// diagram. CSS variables update the architecture colors with the active theme.
const diagramTheme = { diagramAccent: "var(--color-primary)", diagramText: "var(--color-fg-strong)" };
export const caseStudyThemes = {
  teal: diagramTheme,
  orange: diagramTheme,
  amber: diagramTheme,
  sky: diagramTheme,
  violet: diagramTheme,
  ink: diagramTheme,
  emerald: diagramTheme,
} satisfies Record<string, CaseStudyTheme>;

export type CaseStudyContent = {
  theme: keyof typeof caseStudyThemes;
  badge: string;
  headline: string;
  lede: string;
  websiteLabel?: string;
  snapshots: { icon: LucideIcon; value: string; label: string }[];
  problem: { icon: LucideIcon; title: string; copy: string };
  solution: { icon: LucideIcon; title: string; copy: string };
  product: { title: string; copy: string };
  capabilities: { icon: LucideIcon; title: string; copy: string }[];
  architecture?: {
    title: string;
    copy: string;
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
    flows: ArchitectureFlow[];
    defaultFlowId: string;
    ariaLabel: string;
    description: string;
    viewBox?: string;
    mobileViewBox?: string;
  };
  challengesIntro: { title: string; copy: string };
  challenges: { number: string; title: string; copy: string; outcome: string }[];
  closer: { title: string; copy: string };
};

function SectionHeading({ kickerClass, kicker, title, copy }: { kickerClass: string; kicker: string; title: string; copy?: string }) {
  return (
    <div className="max-w-3xl">
      <span className={`text-xs font-black uppercase tracking-[0.2em] ${kickerClass}`}>{kicker}</span>
      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl lg:text-4xl">{title}</h2>
      {copy && <p className="mt-3 text-sm leading-7 text-fg-muted sm:text-base">{copy}</p>}
    </div>
  );
}
export default function DetailedCaseStudy({ project, study }: { project: Project; study: CaseStudyContent }) {
  const theme = {
    ...caseStudyThemes[study.theme],
    kicker: "text-primary-text",
    primary: "bg-primary text-primary-fg hover:bg-primary-hover",
    secondary: "hover:bg-card-muted",
    panel: "bg-card",
    solutionKicker: "text-primary-text",
    solutionIcon: "bg-primary-subtle text-primary-text",
    capabilityIcon: "bg-primary-subtle text-primary-text",
    challengeNumber: "text-primary-text",
    closer: "border border-primary/20 bg-primary-subtle",
    closerKicker: "text-primary-text",
    closerButton: "text-primary-text hover:bg-card",
  };
  const ProblemIcon = study.problem.icon;
  const SolutionIcon = study.solution.icon;
  const capabilityColumns = "lg:grid-cols-3";
  const challengesKicker = study.architecture ? "03 / Engineering challenges" : "02 / Engineering challenges";

  return (
    <main className="min-h-screen overflow-hidden bg-bg text-fg-strong">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <CaseStudyPageHeader
          eyebrow={`Case study / ${project.name} / ${study.badge}`}
          title={study.headline}
          description={study.lede}
          backHref="/case-studies"
          backLabel="All case studies"
        >
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-fg-muted">{project.company}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((technology) => <Tag key={technology}>{technology}</Tag>)}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.website && (
              <a className={`inline-flex min-h-10 items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${theme.primary}`} href={project.website} target="_blank" rel="noreferrer">
                {study.websiteLabel ?? `Visit ${project.name}`} <ExternalLink className="size-4" />
              </a>
            )}
            {study.architecture && (
              <a className={`inline-flex min-h-10 items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-fg transition ${theme.secondary}`} href="#architecture">
                Explore the architecture <ArrowRight className="size-4" />
              </a>
            )}
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {study.snapshots.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="min-w-0 rounded-lg border border-border bg-card p-3">
                  <dt className="flex items-start gap-1.5 text-xs leading-4 text-fg-muted sm:items-center sm:gap-2">
                    <Icon className="size-4 shrink-0 text-primary-text" aria-hidden="true" />
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 break-words text-xs font-semibold text-fg-strong sm:text-sm">{item.value}</dd>
                </div>
              );
            })}
          </dl>
        </CaseStudyPageHeader>
      </div>

      <section id="problem" className="mx-auto grid w-full max-w-6xl scroll-mt-28 gap-4 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-2 lg:px-8 lg:py-14">
        <article className="rounded-xl border border-border bg-card p-5 sm:p-6">
          <span className="grid size-10 place-items-center rounded-lg bg-danger-subtle text-danger-text">
            <ProblemIcon className="size-5" />
          </span>
          <span className="mt-4 block text-xs font-bold uppercase tracking-[0.14em] text-danger-text">The problem</span>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] sm:text-2xl">{study.problem.title}</h2>
          <p className="mt-3 text-sm leading-6 text-fg-muted">{study.problem.copy}</p>
        </article>
        <article className={`rounded-xl border border-border p-5 text-fg sm:p-6 ${theme.panel}`}>
          <span className={`grid size-10 place-items-center rounded-lg ${theme.solutionIcon}`}>
            <SolutionIcon className="size-5" />
          </span>
          <span className={`mt-4 block text-xs font-bold uppercase tracking-[0.14em] ${theme.solutionKicker}`}>The solution</span>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] sm:text-2xl">{study.solution.title}</h2>
          <p className="mt-3 text-sm leading-6 text-fg-muted">{study.solution.copy}</p>
        </article>
      </section>

      <section id="capabilities" className="scroll-mt-28 border-y border-border bg-bg-muted  ">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
          <SectionHeading kickerClass={theme.kicker} kicker="01 / Product system" title={study.product.title} copy={study.product.copy} />
          <div className={`mt-7 grid grid-cols-2 gap-2 sm:gap-3 ${capabilityColumns}`}>
            {study.capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <motion.article
                  key={capability.title}
                  className="min-w-0 rounded-lg border border-border bg-card p-3 sm:p-4"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className={`grid size-8 place-items-center rounded-lg sm:size-9 ${theme.capabilityIcon}`}>
                    <Icon className="size-4" />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold leading-5 tracking-tight sm:mt-4 sm:text-base">{capability.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-fg-muted sm:text-sm sm:leading-6">{capability.copy}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {study.architecture && (
        <section id="architecture" className="mx-auto w-full max-w-7xl scroll-mt-28 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
          <SectionHeading kickerClass={theme.kicker} kicker="02 / Interactive architecture" title={study.architecture.title} copy={study.architecture.copy} />
          <ArchitectureDiagram
            className="mt-8"
            nodes={study.architecture.nodes}
            edges={study.architecture.edges}
            flows={study.architecture.flows}
            defaultFlowId={study.architecture.defaultFlowId}
            ariaLabel={study.architecture.ariaLabel}
            description={study.architecture.description}
            accentColor={theme.diagramAccent}
            accentTextColor={theme.diagramText}
            viewBox={study.architecture.viewBox}
            mobileViewBox={study.architecture.mobileViewBox}
          />
        </section>
      )}

      <section id="challenges" className="scroll-mt-28 border-y border-border bg-bg-muted  ">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
          <SectionHeading kickerClass={theme.kicker} kicker={challengesKicker} title={study.challengesIntro.title} copy={study.challengesIntro.copy} />
          <div className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {study.challenges.map((challenge) => (
              <article key={challenge.number} className="grid grid-cols-[40px_minmax(0,1fr)] items-start gap-x-3 gap-y-2 p-4 sm:p-5 lg:grid-cols-[48px_0.85fr_1.3fr] lg:gap-x-5">
                <span className={`text-3xl font-black leading-none tracking-tight ${theme.challengeNumber}`}>{challenge.number}</span>
                <h3 className="text-base font-semibold tracking-tight sm:text-lg">{challenge.title}</h3>
                <div className="col-start-2 lg:col-auto">
                  <p className="text-sm leading-6 text-fg-muted">{challenge.copy}</p>
                  <p className="mt-2 flex items-start gap-2 text-sm font-semibold leading-6 text-fg">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-success text-success-fg" aria-hidden="true">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    {challenge.outcome}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className={`relative overflow-hidden rounded-xl p-5 text-fg sm:p-7 lg:p-8 ${theme.closer}`}>
          <Sparkles className="absolute -right-8 -top-10 size-40 text-fg/[0.07]" aria-hidden="true" />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className={`text-xs font-black uppercase tracking-[0.2em] ${theme.closerKicker}`}>Engineering lens</span>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">{study.closer.title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-fg-muted sm:text-base">{study.closer.copy}</p>
            </div>
            <a href="/case-studies" className={`inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-card px-4 py-2 text-sm font-semibold transition ${theme.closerButton}`}>
              Explore more work <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

