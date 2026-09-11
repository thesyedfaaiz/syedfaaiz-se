import { ArrowRight, Home } from "lucide-react";

const linkClass =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-ink-950 sm:px-6";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink-50 px-5 py-16 text-center text-ink-950 dark:bg-ink-950 dark:text-white sm:px-8 sm:py-24">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-600 dark:text-brand-300">404 · Engineering</p>
      <h1 className="mt-4 max-w-2xl text-balance text-4xl font-bold tracking-[-0.035em] sm:text-6xl">This route didn’t make the build.</h1>
      <p className="mt-5 max-w-lg text-base leading-7 text-ink-600 dark:text-ink-300 sm:text-lg">The page may have moved or the address may be incomplete. Head back to the portfolio or browse the engineering case studies.</p>
      <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
        <a href="/" className={`${linkClass} bg-ink-950 text-white shadow-lg hover:bg-brand-700 dark:bg-white dark:text-ink-950 dark:hover:bg-brand-200`}><Home aria-hidden="true" className="size-4" />Back to portfolio</a>
        <a href="/case-studies" className={`${linkClass} border border-ink-200 bg-white/80 text-ink-800 shadow-sm hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:hover:border-brand-400/40 dark:hover:text-brand-200`}>View case studies<ArrowRight aria-hidden="true" className="size-4" /></a>
      </div>
      <p className="mt-10 max-w-md text-sm leading-6 text-ink-500 dark:text-ink-400">If you followed a project link, check that its case-study address is complete.</p>
    </main>
  );
}
