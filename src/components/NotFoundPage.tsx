import { ArrowRight, Home } from "lucide-react";

const linkClass = "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-5 py-16 text-center text-fg sm:px-8 sm:py-24">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-text">404 · Engineering</p>
      <h1 className="mt-4 max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">This route didn’t make the build.</h1>
      <p className="mt-5 max-w-lg text-base leading-7 text-fg-muted">The page may have moved or the address may be incomplete. Head back to the portfolio or browse the engineering case studies.</p>
      <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
        <a href="/" className={`${linkClass} bg-primary text-primary-fg hover:bg-primary-hover`}><Home aria-hidden="true" className="size-4" />Back to portfolio</a>
        <a href="/case-studies" className={`${linkClass} border border-border bg-card text-fg hover:bg-card-muted`}>View case studies<ArrowRight aria-hidden="true" className="size-4" /></a>
      </div>
    </main>
  );
}
