import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function Section({
  id,
  kicker,
  title,
  children,
  className = "",
}: {
  id: string;
  kicker: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={`mx-auto w-full max-w-7xl scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28 ${className}`}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-10 max-w-3xl sm:mb-14 lg:mb-16">
        <span className="mb-3 block text-xs font-bold uppercase tracking-[0.22em] text-brand-600 dark:text-brand-300">
          {kicker}
        </span>
        <h2 className="text-balance text-3xl font-semibold tracking-[-0.035em] text-ink-950 sm:text-4xl lg:text-5xl dark:text-white">
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

export function ArrowLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      className="group inline-flex items-center gap-2 font-semibold text-ink-900 transition hover:text-brand-600 dark:text-white dark:hover:text-brand-300"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {children}
      <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden>
        ↗
      </span>
    </a>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-ink-200 bg-white/70 px-3 py-1 text-[11px] font-semibold tracking-wide text-ink-600 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-300">
      {children}
    </span>
  );
}
