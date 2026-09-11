import { ArrowUpRight } from "lucide-react";

export default function AboutSyedFaaiz() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28" aria-labelledby="about-syed-faaiz-title">
      <div className="flex flex-col overflow-hidden rounded-[2rem] border border-ink-200 bg-white shadow-sm md:flex-row md:items-center dark:border-white/10 dark:bg-ink-900/70">
        <div className="relative mx-auto aspect-[433/577] w-full max-w-[21rem] shrink-0 self-end md:mx-0 md:w-[21rem]">
          <div aria-hidden="true" className="absolute inset-x-8 bottom-8 top-16 rounded-full bg-brand-300/30 blur-3xl dark:bg-brand-500/20" />
          <img src="/images/about-syed-faaiz.webp" alt="Syed Faaiz" width="433" height="577" loading="lazy" className="relative h-full w-full object-contain object-bottom" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white to-transparent dark:from-ink-900" />
        </div>
        <div className="relative flex-1 p-7 pt-3 sm:p-10 sm:pt-4 md:py-10 md:pl-7 lg:p-14 lg:pl-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-600 dark:text-brand-300">About the engineer</p>
          <h2 id="about-syed-faaiz-title" className="mt-3 text-balance text-3xl font-semibold tracking-[-0.035em] text-ink-950 sm:text-4xl dark:text-white">I’m Syed Faaiz.</h2>
          <p className="mt-5 max-w-xl leading-8 text-ink-600 dark:text-ink-300">I’m a software engineer building AI-assisted applications, SaaS products, dashboards, integrations, and automation. My work spans the full product journey—from a clear interface to the services and cloud systems behind it.</p>
          <a href="https://syedfaaiz.com/about" className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink-950 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:bg-white dark:text-ink-950 dark:hover:bg-brand-200 dark:focus-visible:ring-offset-ink-950">Read my full story<ArrowUpRight aria-hidden="true" className="size-4" /></a>
        </div>
      </div>
    </section>
  );
}
