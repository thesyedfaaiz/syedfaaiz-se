import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import { Tag } from "./ui";

const filters = ["All", "AI", "SaaS", "Full Stack", "Automation", "Dashboards", "Integrations"];

export default function AllCaseStudies() {
  const [filter, setFilter] = useState("All");
  const shown = projects.filter(
    (project) => filter === "All" || project.categories.includes(filter),
  );

  return (
    <main className="min-h-screen bg-ink-50 text-ink-950 dark:bg-ink-950 dark:text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <a
          className="mb-12 inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-700 shadow-sm transition hover:border-brand-300 hover:text-brand-700 sm:mb-16 dark:border-white/10 dark:bg-white/[0.05] dark:text-ink-200 dark:hover:border-brand-400/40 dark:hover:text-brand-200"
          href="#projects"
        >
          <ArrowLeft className="size-4" />
          Portfolio
        </a>

        <header className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-600 dark:text-brand-300">
            Case study archive
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            All case studies.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-ink-600 sm:text-lg dark:text-ink-300">
            Product engineering work across AI, SaaS, automation, dashboards and integrations.
          </p>
        </header>

        <div
          className="mt-10 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible"
          role="group"
          aria-label="Filter case studies"
        >
          {filters.map((item) => (
            <button
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                filter === item
                  ? "border-ink-950 bg-ink-950 text-white dark:border-white dark:bg-white dark:text-ink-950"
                  : "border-ink-200 bg-white text-ink-600 hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-300 dark:hover:border-brand-400/40 dark:hover:text-brand-200"
              }`}
              onClick={() => setFilter(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((project, index) => (
              <motion.a
                href={`#/case-study/${project.id}`}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="group flex min-h-[310px] flex-col rounded-[1.5rem] border border-ink-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-300 dark:border-white/10 dark:bg-ink-900/80 dark:hover:border-brand-400/40"
                key={project.id}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-400 dark:text-ink-500">
                    {String(index + 1).padStart(2, "0")} · {project.company}
                  </span>
                  <ArrowUpRight className="size-5 text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-600 dark:group-hover:text-brand-300" />
                </div>
                <h2 className="mt-10 text-2xl font-semibold tracking-[-0.035em] text-ink-950 dark:text-white">
                  {project.name}
                </h2>
                <p className="mt-4 text-sm leading-7 text-ink-600 dark:text-ink-300">
                  {project.summary}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-8">
                  {project.technologies.slice(0, 4).map((technology) => (
                    <Tag key={technology}>{technology}</Tag>
                  ))}
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
