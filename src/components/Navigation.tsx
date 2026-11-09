import { AppLauncher, PLATFORM_PERSON_SOCIALS, ThemeChooser } from "@thesyedfaaiz/ui";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Menu, X } from "lucide-react";

const githubUrl = PLATFORM_PERSON_SOCIALS.find((social) => social.id === "github")!.url;
const linkedInUrl = PLATFORM_PERSON_SOCIALS.find((social) => social.id === "linkedin")!.url;
const links = [
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Case Studies"],
  ["skills", "Skills"],
  ["education", "Education"],
  ["contact", "Contact"],
];

const iconLink = "grid size-9 place-items-center rounded-lg border border-border bg-card text-fg-muted transition hover:bg-card-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => window.location.pathname === "/" ? "about" : "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); }),
      { rootMargin: "-35% 0px -55%" },
    );
    links.forEach(([id]) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const closeOnResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <a href="/#about" className="mr-auto flex min-w-0 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" aria-label="Syed Faizan, go to About">
          <img src="/logo.svg" className="h-10 w-9 shrink-0 object-contain" alt="" />
          <span className="hidden min-w-0 sm:block">
            <strong className="block truncate text-sm font-semibold tracking-tight text-fg-strong">Syed Faizan</strong>
            <span className="block truncate text-[11px] text-fg-muted">Software Engineer</span>
          </span>
        </a>

        <div className="hidden items-center gap-0.5 lg:flex">
          {links.map(([id, label]) => (
            <a href={`/#${id}`} key={id} aria-current={active === id ? "location" : undefined}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-primary ${active === id ? "bg-primary-subtle text-primary-text" : "text-fg-muted hover:bg-card-muted hover:text-fg"}`}>
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <ThemeChooser showActiveTheme={false} ariaLabel="Choose portfolio theme" className="!rounded-lg" />
          <AppLauncher />
          <a href={githubUrl} target="_blank" rel="noreferrer" className={`${iconLink} hidden sm:grid`} aria-label="GitHub"><Github className="size-4" /></a>
          <a href={linkedInUrl} target="_blank" rel="noreferrer" className={`${iconLink} hidden sm:grid`} aria-label="LinkedIn"><Linkedin className="size-4" /></a>
          <button type="button" className={`${iconLink} lg:hidden`} onClick={() => setOpen((value) => !value)} aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation">
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div className="fixed inset-x-0 bottom-0 top-16 z-40 lg:hidden" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
              <button type="button" className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" onClick={() => setOpen(false)} aria-label="Close navigation menu" tabIndex={-1} />
              <nav id="mobile-navigation" aria-label="Mobile navigation" className="relative max-h-full overflow-y-auto border-b border-border bg-card px-4 py-3 sm:px-6">
                <div className="mx-auto grid max-w-7xl gap-1">
                  {links.map(([id, label]) => (
                    <a href={`/#${id}`} onClick={() => setOpen(false)} className={`rounded-lg px-3 py-2.5 text-sm font-medium ${active === id ? "bg-primary-subtle text-primary-text" : "text-fg-muted hover:bg-card-muted hover:text-fg"}`} key={id}>{label}</a>
                  ))}
                  <div className="mt-2 flex gap-2 border-t border-border pt-3 sm:hidden">
                    <a href={githubUrl} target="_blank" rel="noreferrer" className={`${iconLink} flex-1`} aria-label="GitHub"><Github className="size-4" /></a>
                    <a href={linkedInUrl} target="_blank" rel="noreferrer" className={`${iconLink} flex-1`} aria-label="LinkedIn"><Linkedin className="size-4" /></a>
                  </div>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </header>
  );
}
