import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Layers3 } from "lucide-react";
import { projects } from "../data/projects";
import { Tag } from "./ui";

const cardClasses = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
];

export default function Projects() {
  const reduceMotion = useReducedMotion();
  const featured = projects.filter((project) => project.featured).slice(0, 4);

  return (
    <>
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-12">
        {featured.map((project, index) => (
          <motion.article
            key={project.id}
            className={`group relative isolate flex min-h-[330px] overflow-hidden rounded-[1.75rem] border border-ink-200 bg-white p-6 shadow-soft transition-colors sm:min-h-[360px] sm:p-8 dark:border-white/10 dark:bg-ink-900/80 ${cardClasses[index]}`}
            whileHover={reduceMotion ? undefined : { y: -5 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400 to-transparent opacity-70" />
            <div className="absolute -right-20 -top-24 size-64 rounded-full bg-brand-100/70 blur-3xl transition duration-500 group-hover:bg-brand-200/90 dark:bg-brand-500/10 dark:group-hover:bg-brand-500/20" />

            <div className="relative z-10 flex w-full flex-col">
              <div className="mb-10 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl border border-brand-200 bg-brand-50 text-sm font-black text-brand-700 dark:border-brand-400/20 dark:bg-brand-500/10 dark:text-brand-200">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-ink-400 dark:text-ink-500">
                      Case study
                    </span>
                    <span className="mt-0.5 block text-xs font-semibold text-ink-600 dark:text-ink-300">
                      {project.company}
                    </span>
                  </div>
                </div>
                <a
                  href={`/case-study/${project.id}`}
                  className="grid size-11 shrink-0 place-items-center rounded-full border border-ink-200 bg-white text-ink-700 transition group-hover:border-brand-300 group-hover:bg-brand-50 group-hover:text-brand-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-200 dark:group-hover:border-brand-400/30 dark:group-hover:bg-brand-500/10 dark:group-hover:text-brand-200"
                  aria-label={`Open ${project.name} case study`}
                >
                  <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              <div className="max-w-2xl">
                <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-300">
                  <Layers3 className="size-4" />
                  {project.categories.slice(0, 2).join(" · ")}
                </div>
                <h3 className="text-3xl font-semibold tracking-[-0.04em] text-ink-950 sm:text-4xl dark:text-white">
                  {project.name}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-ink-600 sm:text-base dark:text-ink-300">
                  {project.summary}
                </p>
              </div>

              <div className="mt-auto pt-10">
                <div className="mb-5 flex flex-wrap gap-2">
                  {project.technologies.slice(0, index === 0 ? 6 : 4).map((technology) => (
                    <Tag key={technology}>{technology}</Tag>
                  ))}
                </div>
                <a
                  className="inline-flex items-center gap-2 text-sm font-bold text-ink-950 transition hover:text-brand-700 dark:text-white dark:hover:text-brand-200"
                  href={`/case-study/${project.id}`}
                >
                  Read case study
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-8 flex justify-center sm:mt-10">
        <a
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink-950 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:bg-white dark:text-ink-950 dark:hover:bg-brand-200 dark:focus-visible:ring-offset-ink-950"
          href="/case-studies"
        >
          View all case studies
          <ArrowRight className="size-4" />
        </a>
      </div>
    </>
  );
}
