import type { ReactNode } from "react";
import { Badge } from "@thesyedfaaiz/ui";
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
      className={`mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20 ${className}`}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-8 w-full max-w-3xl sm:mb-10">
        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary-text">
          {kicker}
        </span>
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-fg-strong sm:text-4xl">
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
      className="group inline-flex items-center gap-2 font-semibold text-fg transition hover:text-primary-text"
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
  return <Badge variant="soft" color="neutral" size="xs">{children}</Badge>;
}
