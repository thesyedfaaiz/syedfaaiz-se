import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Menu, Moon, Sun, X } from "lucide-react";

const links = [
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Case Studies"],
  ["skills", "Skills"],
  ["education", "Education"],
  ["contact", "Contact"],
];

const controlClass =
  "grid size-10 place-items-center rounded-full border border-ink-200 bg-white/80 text-ink-700 shadow-sm backdrop-blur transition hover:border-brand-300 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/[0.06] dark:text-ink-200 dark:hover:border-brand-400/50 dark:hover:text-brand-200 dark:focus-visible:ring-offset-ink-950";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55%" },
    );

    links.forEach(([id]) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const close = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/80">
      <nav className="mx-auto flex h-[76px] w-full max-w-7xl items-center gap-3 px-4 sm:h-[84px] sm:px-6 lg:px-8">
        <a
          href="#about"
          className="group mr-auto flex min-w-0 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-ink-950"
          aria-label="Syed Faizan — go to about section"
        >
          <img
            src="/logo.svg"
            className="h-14 w-12 shrink-0 object-contain sm:h-16 sm:w-14"
            alt="Syed Faizan logo"
          />
          <span className="hidden min-w-0 sm:block">
            <strong className="block truncate text-sm font-bold tracking-tight text-ink-950 dark:text-white">
              Syed Faizan
            </strong>
            <span className="block truncate text-[11px] font-medium text-ink-500 dark:text-ink-400">
              Software Engineer
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map(([id, label]) => (
            <a
              className={`rounded-full px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                active === id
                  ? "bg-ink-950 text-white dark:bg-white dark:text-ink-950"
                  : "text-ink-600 hover:bg-ink-100 hover:text-ink-950 dark:text-ink-300 dark:hover:bg-white/10 dark:hover:text-white"
              }`}
              href={`#${id}`}
              key={id}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDark((current) => !current)}
            className={controlClass}
            aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
            title={`Switch to ${dark ? "light" : "dark"} mode`}
          >
            {dark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
          </button>
          <a
            href="https://github.com/thesyedfaaiz"
            target="_blank"
            rel="noreferrer"
            className={`${controlClass} hidden sm:grid`}
            aria-label="Faizan on GitHub"
            title="GitHub"
          >
            <Github className="size-[18px]" />
          </a>
          <a
            href="https://linkedin.com/in/thesyedfaaiz"
            target="_blank"
            rel="noreferrer"
            className={`${controlClass} hidden sm:grid`}
            aria-label="Faizan on LinkedIn"
            title="LinkedIn"
          >
            <Linkedin className="size-[18px]" />
          </a>
          <button
            type="button"
            className={`${controlClass} lg:hidden`}
            onClick={() => setOpen((current) => !current)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {createPortal(<AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 bottom-0 top-[77px] z-40 font-sans sm:top-[85px] lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/20"
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
              tabIndex={-1}
            />
            <nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              className="relative max-h-full overflow-y-auto overscroll-contain border-b border-ink-200/70 bg-white/95 px-4 py-4 shadow-xl backdrop-blur-xl sm:px-6 dark:border-white/10 dark:bg-ink-950/95"
            >
            <div className="mx-auto grid max-w-7xl gap-1">
              {links.map(([id, label]) => (
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    active === id
                      ? "bg-brand-50 text-brand-800 dark:bg-brand-500/15 dark:text-brand-200"
                      : "text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-white/10"
                  }`}
                  key={id}
                >
                  {label}
                </a>
              ))}
              <div className="mt-2 flex gap-2 border-t border-ink-200 pt-3 dark:border-white/10 sm:hidden">
                <a href="https://github.com/thesyedfaaiz" target="_blank" rel="noreferrer" className={`${controlClass} flex-1 rounded-2xl`}>
                  <Github className="size-[18px]" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a href="https://linkedin.com/in/thesyedfaaiz" target="_blank" rel="noreferrer" className={`${controlClass} flex-1 rounded-2xl`}>
                  <Linkedin className="size-[18px]" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>, document.body)}
    </header>
  );
}
