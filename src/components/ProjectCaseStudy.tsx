import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, Layers3 } from "lucide-react";
import type { Project } from "../types";
import { Tag } from "./ui";

export default function ProjectCaseStudy({ project }: { project: Project }) {
  return (
    <main className="min-h-screen bg-ink-50 text-ink-950 dark:bg-ink-950 dark:text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <a
          className="mb-10 inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-700 shadow-sm transition hover:border-brand-300 hover:text-brand-700 sm:mb-14 dark:border-white/10 dark:bg-white/[0.05] dark:text-ink-200 dark:hover:border-brand-400/40 dark:hover:text-brand-200"
          href="#/case-studies"
        >
          <ArrowLeft className="size-4" />
          All case studies
        </a>

        <header className="grid overflow-hidden rounded-[2rem] border border-ink-200 bg-white shadow-soft lg:grid-cols-[1.45fr_0.75fr] dark:border-white/10 dark:bg-ink-900/80">
          <div className="p-6 sm:p-10 lg:p-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">
              Case study · {project.company}
            </span>
            <motion.h1
              className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {project.name}
            </motion.h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-ink-600 sm:text-lg dark:text-ink-300">
              {project.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <Tag key={technology}>{technology}</Tag>
              ))}
            </div>
            {project.website && (
              <a
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-700 dark:bg-white dark:text-ink-950 dark:hover:bg-brand-200"
                href={project.website}
                target="_blank"
                rel="noreferrer"
              >
                Visit live website
                <ExternalLink className="size-4" />
              </a>
            )}
          </div>

          <div className="border-t border-ink-200 bg-ink-950 p-6 text-white sm:p-10 lg:border-l lg:border-t-0 lg:p-12 dark:border-white/10 dark:bg-black/30">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-300">
              Product system
            </span>
            <strong className="mt-4 block text-2xl font-semibold tracking-tight">
              {project.name}
            </strong>
            <div className="mt-10 grid gap-3">
              {project.categories.map((category, index) => (
                <div key={category} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <span className="text-xs font-black text-brand-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold">{category}</span>
                  <ArrowRight className="ml-auto size-4 text-white/50" />
                </div>
              ))}
            </div>
          </div>
        </header>

        <section className="grid gap-10 py-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 lg:py-24">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">
              The brief
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              {project.summary}
            </h2>
            <p className="mt-5 text-sm leading-7 text-ink-600 sm:text-base dark:text-ink-300">
              My contribution covered the engineering work below, connecting product requirements with a maintainable technical implementation.
            </p>
          </aside>

          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">
              Key implementation
            </span>
            <div className="mt-5 grid gap-3">
              {project.responsibilities.map((responsibility, index) => (
                <motion.article
                  className="flex gap-4 rounded-[1.35rem] border border-ink-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-white/[0.04]"
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  key={responsibility}
                >
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-600 dark:text-brand-300" />
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-ink-400 dark:text-ink-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-1 text-sm leading-7 text-ink-700 sm:text-base dark:text-ink-200">
                      {responsibility}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6 rounded-[2rem] bg-brand-600 p-7 text-white shadow-brand sm:p-10 lg:flex-row lg:items-center lg:p-12">
          <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/15">
            <Layers3 className="size-7" />
          </div>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-100">
              Engineering lens
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
              A connected workflow, designed as one product.
            </h2>
            <p className="mt-3 text-sm leading-7 text-brand-50/90 sm:text-base">
              The implementation combines interface quality, service architecture, permissions, integrations and delivery rather than treating each as an isolated feature.
            </p>
          </div>
        </section>

        <div className="mt-10 flex justify-end">
          <a className="inline-flex items-center gap-2 text-sm font-bold text-ink-900 hover:text-brand-700 dark:text-white dark:hover:text-brand-200" href="#/case-studies">
            Explore all case studies
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </main>
  );
}
