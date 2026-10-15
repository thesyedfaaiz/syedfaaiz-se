import { RouteMetadata } from "./seo/RouteMetadata";
import { PLATFORM_PERSON_SOCIALS, useTheme } from "@thesyedfaaiz/ui";
import AIWorkflows from "./components/AIWorkflows";
import { useEffect, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  Cloud,
  Database,
  GraduationCap,
  Github,
  Layers3,
  Linkedin,
  MapPin,
  Phone,
  Plug,
  School,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Navigation from "./components/Navigation";
import Projects from "./components/Projects";
import AllCaseStudies from "./components/AllCaseStudies";
import ProjectCaseStudy from "./components/ProjectCaseStudy";
import CopyEmail from "./components/CopyEmail";
import PublicFooter from "./components/PublicFooter";
import { Section, Tag } from "./components/ui";
import { education, experiences, skillGroups } from "./data/content";
import { projects } from "./data/projects";

import SystemScene from "./components/SystemScene";
import NotFoundPage from "./components/NotFoundPage";
import AboutSyedFaaiz from "./components/AboutSyedFaaiz";

const githubUrl = PLATFORM_PERSON_SOCIALS.find((social) => social.id === "github")!.url;
const linkedInUrl = PLATFORM_PERSON_SOCIALS.find((social) => social.id === "linkedin")!.url;

const iconMap = {
  layers: Layers3,
  server: Database,
  sparkles: Sparkles,
  plug: Plug,
  cloud: Cloud,
};

function TimelineCheckpoint({ Icon, isLast, mutedSurface = false }: { Icon: LucideIcon; isLast: boolean; mutedSurface?: boolean }) {
  return (
    <>
      {!isLast && <span className="absolute -bottom-4 left-[15px] top-4 w-px bg-border" aria-hidden="true" />}
      <span className={`absolute left-0 top-0 z-10 grid size-8 place-items-center rounded-full border border-border-strong text-primary-text ${mutedSurface ? "bg-bg-muted" : "bg-bg"}`} aria-hidden="true">
        <Icon className="size-4" strokeWidth={1.8} />
      </span>
    </>
  );
}

const primaryButton =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-fg transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const secondaryButton =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-fg transition hover:bg-card-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg";

function Portfolio() {
  return (
    <div id="top" className="min-h-screen bg-bg font-sans text-fg-strong">
      <Navigation />
      <main>
        <section className="relative overflow-hidden border-b border-border ">
          <div className="relative flex items-start justify-center pb-8 pt-6 sm:min-h-[76vh] sm:items-center sm:pb-0 sm:pt-8">
            <div className="relative z-10 mx-auto w-full max-w-5xl px-5 text-center sm:px-6">
              <SystemScene />

              <motion.h1
                className="mx-auto mt-5 max-w-3xl text-balance text-[1.65rem] font-extrabold leading-snug tracking-tight sm:mt-6 sm:text-3xl md:text-4xl"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.8 }}
              >
                Syed Faaiz{" "}
                <span className="text-primary-text ">— Software Engineer</span>
              </motion.h1>

              <motion.p
                className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-fg-muted sm:text-base "
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 }}
              >
                Syed Faizan Hussain Hashmi · Building AI-assisted web applications, workflows, dashboards, automation systems, and scalable SaaS products from interface to cloud delivery.
              </motion.p>

              <motion.div
                className="mx-auto mt-5 flex w-full max-w-xs flex-col items-stretch justify-center gap-2.5 sm:mt-8 sm:max-w-none sm:flex-row sm:items-center sm:gap-3"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36 }}
              >
                <a className={primaryButton} href="#projects">
                  Explore my work
                  <ArrowRight className="size-4" />
                </a>
                <a className={secondaryButton} href="#experience">
                  View experience
                  <ArrowDown className="size-4" />
                </a>
                <div className="grid grid-cols-2 gap-2.5 sm:flex sm:gap-3">
                  <a className={secondaryButton} href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub">
                    <Github className="size-[18px]" />
                  </a>
                  <a className={secondaryButton} href={linkedInUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <Linkedin className="size-[18px]" />
                  </a>
                </div>
              </motion.div>

              <div className="h-4 sm:h-14" />
            </div>
          </div>
        </section>

        <AboutSyedFaaiz />

        <section className="border-b border-border bg-card-muted" aria-label="Professional snapshot">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
            {[
              ["2+", "Years professional experience"],
              ["15+", "Products / major workflows delivered"],
              ["AI + SaaS", "Primary engineering focus"],
              ["Frontend → Cloud", "End-to-end product delivery"],
            ].map(([value, label], index) => (
              <motion.div
                key={value}
                className={`py-6 sm:py-8 ${index % 2 === 0 ? "pr-4" : "pl-4"} ${index > 0 ? "lg:border-l lg:border-border lg:pl-7 " : ""}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
              >
                <strong className="block text-xl font-black tracking-tight text-fg-strong sm:text-2xl ">{value}</strong>
                <span className="mt-1 block max-w-[180px] text-xs leading-5 text-fg-muted sm:text-sm ">{label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <Section id="about" kicker="01 / Profile" title="I build across the product stack.">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="space-y-6 text-xl leading-9 tracking-[-0.02em] text-fg sm:text-2xl sm:leading-10 ">
              <p>
                Full-Stack Engineer with <em className="font-semibold not-italic text-primary-text ">2+ years</em> of professional experience delivering SaaS applications, AI-assisted workflows, dashboards, integrations, and automation systems.
              </p>
              <p className="text-base leading-8 text-fg-muted sm:text-lg ">
                Hands-on from interface implementation and backend services through third-party integrations, deployment, and operational handover.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {["Multi-tenant SaaS architecture", "Role-based access control", "AI document pipelines", "RAG and embeddings", "CRM automation", "API integrations", "Dashboard development", "Cloud deployment"].map((item, index) => (
                <div key={item} className="flex min-h-20 items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <span className="mt-0.5 text-[10px] font-black text-primary-text ">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-semibold leading-6 text-fg ">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <div className="border-y border-border bg-bg-muted">
          <Section id="experience" kicker="02 / Experience" title="Progress shaped by real products.">
            <ol className="mx-auto max-w-4xl">
              {experiences
                .flatMap((experience) => experience.roles.map((role, roleIndex) => ({ experience, role, roleIndex })))
                .map(({ experience, role, roleIndex }, index, allRoles) => (
                    <li key={`${experience.company}-${role.title}`} className="relative pb-10 pl-12 last:pb-0">
                      <TimelineCheckpoint Icon={BriefcaseBusiness} isLast={index === allRoles.length - 1} mutedSurface />
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold text-fg-muted ">{role.period}</span>
                          {roleIndex === 0 && experience.roles.length > 1 && (
                            <b className="rounded-full bg-primary-subtle px-2.5 py-1 text-xs font-semibold text-primary-text">Promoted</b>
                          )}
                        </div>
                        <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{role.title}</h3>
                        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm">
                          <a className="font-semibold text-fg hover:underline" href={experience.companyUrl} target="_blank" rel="noreferrer">{experience.company}</a>
                          <span className="text-fg-muted">{experience.location}</span>
                        </div>
                      </motion.div>
                    </li>
                  ))}
            </ol>
          </Section>
        </div>

        <Section id="projects" kicker="03 / Selected case studies" title="Systems, not just screens.">
          <Projects />
        </Section>
        <AIWorkflows />

        <div className="border-y border-border bg-bg-muted">
          <Section id="skills" kicker="07 / Toolkit" title="A stack organized around outcomes.">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skillGroups.map((group) => {
                const Icon = iconMap[group.icon as keyof typeof iconMap];
                return (
                  <article key={group.title} className="rounded-lg border border-border bg-card p-6 sm:p-7">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-xl bg-primary-subtle text-primary-text"><Icon className="size-5" /></span>
                      <h3 className="text-lg font-semibold tracking-tight">{group.title}</h3>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {group.skills.map((skill) => <Tag key={skill}>{skill}</Tag>)}
                    </div>
                  </article>
                );
              })}
            </div>
          </Section>
        </div>

        <Section id="education" kicker="08 / Foundation" title="Education.">
          <ol className="mx-auto max-w-4xl">
              {education.map((item, index) => (
                  <li className="relative pb-10 pl-12 last:pb-0" key={item.school}>
                    <TimelineCheckpoint Icon={index === 0 ? GraduationCap : index === 1 ? BookOpen : School} isLast={index === education.length - 1} />
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <h3 className="text-xl font-semibold tracking-tight text-fg-strong sm:text-2xl">{item.school}</h3>
                      <p className="mt-1 text-sm font-medium text-fg">{item.degree}</p>
                      <span className="mt-1 block text-sm leading-6 text-fg-muted">{item.period}</span>
                      {item.detail && <p className="mt-3 text-sm leading-6 text-fg-muted">{item.detail}</p>}
                      {item.description && <p className="mt-2 text-sm leading-6 text-fg-muted">{item.description}</p>}
                      {item.courses && (
                        <div className="mt-5">
                          <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-muted">Coursework</h4>
                          <ul className="mt-2 grid max-w-2xl gap-x-6 gap-y-1 sm:grid-cols-2">
                            {item.courses.map((course) => (
                              <li key={course} className="flex items-start gap-2.5 py-1 text-sm font-medium leading-6 text-fg">
                                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary-subtle text-primary-text" aria-hidden="true">
                                  <BookOpen className="size-3" strokeWidth={1.8} />
                                </span>
                                {course}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  </li>
                ))}
          </ol>
        </Section>

        <div className="border-t border-border">
          <Section id="contact" kicker="09 / Let's connect" title="Let's build something that matters.">
            <div className="grid gap-8 rounded-xl border border-border bg-card p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
              <div>
                <p className="max-w-2xl text-base leading-8 text-fg-muted sm:text-lg ">Open to software engineering opportunities, SaaS development, AI application development, product engineering and technical collaborations.</p>
                <a className="mt-7 block w-fit break-all text-xl font-semibold tracking-tight text-fg-strong transition hover:text-primary-text sm:text-2xl" href="mailto:faaiz290302@gmail.com">
                  faaiz290302@gmail.com
                </a>
                <div className="mt-5">
                  <CopyEmail />
                </div>
              </div>
              <div className="grid content-start gap-2">
                <a href="tel:+923211170210" className="flex items-center gap-3 rounded-lg border border-border p-4 text-sm font-semibold text-fg transition hover:bg-card-muted"><Phone className="size-4" />+92 321 1170210</a>
                <span className="flex items-center gap-3 rounded-lg border border-border p-4 text-sm font-semibold text-fg"><MapPin className="size-4" />Lahore, Pakistan</span>
                <a href={githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg border border-border p-4 text-sm font-semibold text-fg transition hover:bg-card-muted"><Github className="size-4" />github.com/thesyedfaaiz</a>
                <a href={linkedInUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg border border-border p-4 text-sm font-semibold text-fg transition hover:bg-card-muted"><Linkedin className="size-4" />linkedin.com/in/thesyedfaaiz</a>
              </div>
            </div>
          </Section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Footer() {
  return <PublicFooter />;
}

function currentPath() {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

function App() {
  const { theme } = useTheme();
  const [path, setPath] = useState(currentPath);
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", theme.mode === "dark");
  }, [theme.mode]);

  useEffect(() => {
    const onPopState = () => setPath(currentPath());
    const onInternalClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;

      const next = new URL(anchor.href);
      if (next.origin !== window.location.origin || !/^\/$|^\/case-studies\/?$|^\/case-study\/[^/]+\/?$/.test(next.pathname)) return;
      if (next.pathname === window.location.pathname && next.search === window.location.search && next.hash) return;
      if (next.href === window.location.href) return;

      event.preventDefault();
      window.history.pushState(null, "", next);
      setPath(currentPath());
    };

    window.addEventListener("popstate", onPopState);
    document.addEventListener("click", onInternalClick);
    return () => {
      window.removeEventListener("popstate", onPopState);
      document.removeEventListener("click", onInternalClick);
    };
  }, []);

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      const hash = window.location.hash;
      const target = hash && !hash.startsWith("#/") ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      if (target) target.scrollIntoView();
      else if (!hash) window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(frame);
  }, [path]);

  useEffect(() => {
    if (location.hash.startsWith("#/case-stud")) location.replace(location.hash.slice(1));
  }, []);
  const id = path.match(/^\/case-study\/([^/]+)$/)?.[1];
  const project = projects.find(item => item.id === id);
  let content;
  if (project) content = <><Navigation /><ProjectCaseStudy project={project} /><Footer /></>;
  else if (path === "/case-studies") content = <><Navigation /><AllCaseStudies /><Footer /></>;
  else if (path === "/") content = <Portfolio />;
  else content = <NotFoundPage />;
  return <><RouteMetadata path={path} />{content}</>;
}
export default App;
