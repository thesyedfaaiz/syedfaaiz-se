import { RouteMetadata } from "./seo/RouteMetadata";
import AIWorkflows from "./components/AIWorkflows";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  MapPin,
  Phone,
  Plug,
  Sparkles,
  Workflow,
} from "lucide-react";
import Navigation from "./components/Navigation";
import Projects from "./components/Projects";
import AllCaseStudies from "./components/AllCaseStudies";
import ProjectCaseStudy from "./components/ProjectCaseStudy";
import CopyEmail from "./components/CopyEmail";
import { Section, Tag } from "./components/ui";
import { certifications, education, experiences, skillGroups } from "./data/content";
import { projects } from "./data/projects";

import SystemScene from "./components/SystemScene";
import NotFoundPage from "./components/NotFoundPage";
import AboutSyedFaaiz from "./components/AboutSyedFaaiz";

const iconMap = {
  layers: Layers3,
  server: Database,
  sparkles: Sparkles,
  plug: Plug,
  cloud: Cloud,
};

const primaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink-950 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:px-6 dark:bg-white dark:text-ink-950 dark:hover:bg-brand-200 dark:focus-visible:ring-offset-ink-950";

const secondaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink-200 bg-white/80 px-5 py-3 text-sm font-bold text-ink-800 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:px-6 dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:hover:border-brand-400/40 dark:hover:text-brand-200 dark:focus-visible:ring-offset-ink-950";

function Portfolio() {
  return (
    <div id="top" className="min-h-screen bg-ink-50 font-sans text-ink-950 selection:bg-brand-200 selection:text-brand-950 dark:bg-ink-950 dark:text-white dark:selection:bg-brand-600 dark:selection:text-white">
      <Navigation />
      <main>
        <section className="relative overflow-hidden border-b border-ink-200/80 dark:border-white/10">
          <div className="relative flex items-start justify-center pt-6 pb-8 sm:min-h-[92vh] sm:items-center sm:pt-8 sm:pb-0">
            <div className="relative z-10 mx-auto w-full max-w-5xl px-5 text-center sm:px-6">
              <SystemScene />

              <motion.h1
                className="mx-auto mt-5 max-w-3xl text-balance text-[1.65rem] font-extrabold leading-snug tracking-tight sm:mt-6 sm:text-3xl md:text-4xl"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.8 }}
              >
                Syed Faizan{" "}
                <span className="text-brand-600 dark:text-brand-300">Hussain Hashmi</span>
              </motion.h1>

              <motion.p
                className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-ink-600 sm:text-base dark:text-ink-300"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 }}
              >
                Building AI-assisted web applications, workflows, dashboards, automation systems, and scalable SaaS products from interface to cloud delivery.
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
                  <a className={secondaryButton} href="https://github.com/thesyedfaaiz" target="_blank" rel="noreferrer" aria-label="GitHub">
                    <Github className="size-[18px]" />
                  </a>
                  <a className={secondaryButton} href="https://linkedin.com/in/thesyedfaaiz" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <Linkedin className="size-[18px]" />
                  </a>
                </div>
              </motion.div>

              <div className="h-4 sm:h-14" />
            </div>
          </div>
        </section>

        <AboutSyedFaaiz />

        <section className="border-b border-ink-200/80 bg-white/70 dark:border-white/10 dark:bg-white/[0.02]" aria-label="Professional snapshot">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
            {[
              ["2+", "Years professional experience"],
              ["15+", "Products / major workflows delivered"],
              ["AI + SaaS", "Primary engineering focus"],
              ["Frontend → Cloud", "End-to-end product delivery"],
            ].map(([value, label], index) => (
              <motion.div
                key={value}
                className={`py-6 sm:py-8 ${index % 2 === 0 ? "pr-4" : "pl-4"} ${index > 0 ? "lg:border-l lg:border-ink-200 lg:pl-7 dark:lg:border-white/10" : ""}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
              >
                <strong className="block text-xl font-black tracking-tight text-ink-950 sm:text-2xl dark:text-white">{value}</strong>
                <span className="mt-1 block max-w-[180px] text-xs leading-5 text-ink-500 sm:text-sm dark:text-ink-400">{label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <Section id="about" kicker="01 / Profile" title="I build across the product stack.">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="space-y-6 text-xl leading-9 tracking-[-0.02em] text-ink-700 sm:text-2xl sm:leading-10 dark:text-ink-200">
              <p>
                Full-Stack Engineer with <em className="font-semibold not-italic text-brand-700 dark:text-brand-200">2+ years</em> of professional experience delivering SaaS applications, AI-assisted workflows, dashboards, integrations, and automation systems.
              </p>
              <p className="text-base leading-8 text-ink-500 sm:text-lg dark:text-ink-400">
                Hands-on from interface implementation and backend services through third-party integrations, deployment, and operational handover.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {["Multi-tenant SaaS architecture", "Role-based access control", "AI document pipelines", "RAG and embeddings", "CRM automation", "API integrations", "Dashboard development", "Cloud deployment"].map((item, index) => (
                <div key={item} className="flex min-h-20 items-start gap-3 rounded-2xl border border-ink-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
                  <span className="mt-0.5 text-[10px] font-black text-brand-600 dark:text-brand-300">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-semibold leading-6 text-ink-700 dark:text-ink-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <div className="border-y border-ink-200/80 bg-white/50 dark:border-white/10 dark:bg-white/[0.015]">
          <Section id="experience" kicker="02 / Experience" title="Progress shaped by real products.">
            <div className="mx-auto max-w-4xl">
              {experiences
                .flatMap((experience) => experience.roles.map((role, roleIndex) => ({ experience, role, roleIndex })))
                .map(({ experience, role, roleIndex }, index, allRoles) => {
                  const isLast = index === allRoles.length - 1;
                  return (
                    <article
                      key={`${experience.company}-${role.title}`}
                      className={`relative grid grid-cols-[48px_minmax(0,1fr)] gap-4 sm:grid-cols-[56px_minmax(0,1fr)] sm:gap-6 ${isLast ? "pb-0" : "pb-5"}`}
                    >
                      <div className="relative flex justify-center">
                        {!isLast && (
                          <span className="absolute bottom-[-1.25rem] top-12 w-px bg-ink-200 dark:bg-white/10 sm:top-14" aria-hidden="true" />
                        )}
                        <div className="relative z-10 grid size-12 place-items-center rounded-2xl border border-ink-200 bg-white text-brand-600 shadow-sm sm:size-14 dark:border-white/10 dark:bg-ink-900 dark:text-brand-300">
                          <Code2 className="size-5" />
                        </div>
                      </div>
                      <motion.div
                        className="rounded-[1.5rem] border border-ink-200 bg-white p-5 shadow-sm sm:p-7 dark:border-white/10 dark:bg-ink-900/70"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold text-ink-500 dark:text-ink-400">{role.period}</span>
                          {roleIndex === 0 && experience.roles.length > 1 && (
                            <b className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-brand-700 dark:bg-brand-500/10 dark:text-brand-200">Promoted</b>
                          )}
                        </div>
                        <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">{role.title}</h3>
                        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm">
                          <a className="font-bold text-brand-700 hover:underline dark:text-brand-200" href={experience.companyUrl} target="_blank" rel="noreferrer">{experience.company}</a>
                          <span className="text-ink-400">{experience.location}</span>
                        </div>
                      </motion.div>
                    </article>
                  );
                })}
            </div>
          </Section>
        </div>

        <Section id="projects" kicker="03 / Selected case studies" title="Systems, not just screens.">
          <Projects />
        </Section>
        <AIWorkflows />

        <div className="border-y border-ink-200/80 bg-white/50 dark:border-white/10 dark:bg-white/[0.015]">
          <Section id="skills" kicker="07 / Toolkit" title="A stack organized around outcomes.">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skillGroups.map((group) => {
                const Icon = iconMap[group.icon as keyof typeof iconMap];
                return (
                  <article key={group.title} className="rounded-[1.5rem] border border-ink-200 bg-white p-6 shadow-sm sm:p-7 dark:border-white/10 dark:bg-ink-900/70">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-200"><Icon className="size-5" /></span>
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

        <Section id="education" kicker="08 / Foundation" title="Education & continuous learning.">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div>
              {education.map((item, index) => {
                const isLast = index === education.length - 1;
                return (
                  <article
                    className={`relative grid grid-cols-[48px_minmax(0,1fr)] gap-4 sm:grid-cols-[56px_minmax(0,1fr)] sm:gap-6 ${isLast ? "pb-0" : "pb-5"}`}
                    key={item.degree}
                  >
                    <div className="relative flex justify-center">
                      {!isLast && (
                        <span className="absolute bottom-[-1.25rem] top-12 w-px bg-ink-200 dark:bg-white/10 sm:top-14" aria-hidden="true" />
                      )}
                      <div className="relative z-10 grid size-12 place-items-center rounded-2xl border border-ink-200 bg-white text-brand-600 shadow-sm sm:size-14 dark:border-white/10 dark:bg-ink-900 dark:text-brand-300">
                        <GraduationCap className="size-5" />
                      </div>
                    </div>
                    <motion.div
                      className="rounded-[1.5rem] border border-ink-200 bg-white p-5 shadow-sm sm:p-7 dark:border-white/10 dark:bg-ink-900/70"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <span className="text-xs font-semibold text-ink-500 dark:text-ink-400">{item.period}</span>
                      <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">{item.degree}</h3>
                      <h4 className="mt-2 text-sm font-bold text-brand-700 dark:text-brand-200">{item.school}</h4>
                      {item.detail && <b className="mt-2 block text-xs text-ink-500 dark:text-ink-400">{item.detail}</b>}
                      {item.description && <p className="mt-4 text-sm leading-7 text-ink-600 dark:text-ink-300">{item.description}</p>}
                      {index === 0 && <div className="mt-4 rounded-xl bg-ink-50 p-3 text-xs leading-6 text-ink-500 dark:bg-white/[0.04] dark:text-ink-400">OOP · Data Structures · Algorithms · Databases · Operating Systems · Networks · AI · Web Engineering</div>}
                    </motion.div>
                  </article>
                );
              })}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">Udemy coursework</span>
              <div className="mt-4 divide-y divide-ink-200 overflow-hidden rounded-[1.5rem] border border-ink-200 bg-white shadow-sm dark:divide-white/10 dark:border-white/10 dark:bg-ink-900/70">
                {certifications.map((course, index) => (
                  <article key={course} className="flex items-start gap-3 p-4 sm:p-5">
                    <span className="mt-0.5 text-[10px] font-black text-brand-600 dark:text-brand-300">0{index + 1}</span>
                    <p className="text-sm font-semibold leading-6 text-ink-700 dark:text-ink-200">{course}</p>
                    <ExternalLink className="ml-auto mt-0.5 size-4 shrink-0 text-ink-300 dark:text-ink-600" />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <div className="border-t border-ink-200/80 bg-white/50 dark:border-white/10 dark:bg-white/[0.015]">
          <Section id="contact" kicker="09 / Let’s connect" title="Let's build something that matters.">
            <div className="grid gap-8 rounded-[2rem] border border-ink-200 bg-white p-6 shadow-soft sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10 dark:border-white/10 dark:bg-ink-900/70">
              <div>
                <p className="max-w-2xl text-base leading-8 text-ink-600 sm:text-lg dark:text-ink-300">Open to software engineering opportunities, SaaS development, AI application development, product engineering and technical collaborations.</p>
                <a className="mt-7 block w-fit break-all text-xl font-semibold tracking-tight text-ink-950 transition hover:text-brand-700 sm:text-2xl dark:text-white dark:hover:text-brand-200" href="mailto:faaiz290302@gmail.com">
                  faaiz290302@gmail.com
                </a>
                <div className="mt-5">
                  <CopyEmail />
                </div>
              </div>
              <div className="grid content-start gap-2">
                <a href="tel:+923211170210" className="flex items-center gap-3 rounded-2xl border border-ink-200 p-4 text-sm font-semibold text-ink-700 transition hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:text-ink-200 dark:hover:border-brand-400/40 dark:hover:text-brand-200"><Phone className="size-4" />+92 321 1170210</a>
                <span className="flex items-center gap-3 rounded-2xl border border-ink-200 p-4 text-sm font-semibold text-ink-700 dark:border-white/10 dark:text-ink-200"><MapPin className="size-4" />Lahore, Pakistan</span>
                <a href="https://github.com/thesyedfaaiz" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-ink-200 p-4 text-sm font-semibold text-ink-700 transition hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:text-ink-200 dark:hover:border-brand-400/40 dark:hover:text-brand-200"><Github className="size-4" />github.com/thesyedfaaiz</a>
                <a href="https://linkedin.com/in/thesyedfaaiz" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-ink-200 p-4 text-sm font-semibold text-ink-700 transition hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:text-ink-200 dark:hover:border-brand-400/40 dark:hover:text-brand-200"><Linkedin className="size-4" />linkedin.com/in/thesyedfaaiz</a>
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
  return (
    <footer className="border-t border-ink-200 bg-white dark:border-white/10 dark:bg-black/20">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <a href="/#about" className="shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-ink-950" aria-label="Syed Faizan — go to about section">
              <img src="/logo.svg" className="h-24 w-20 object-contain sm:h-28 sm:w-24" alt="Syed Faizan logo" />
            </a>
            <div>
              <p className="text-2xl font-semibold tracking-[-0.035em] text-ink-950 dark:text-white">Syed Faizan Hussain Hashmi</p>
              <p className="mt-1 text-sm font-semibold text-brand-700 dark:text-brand-200">Software Engineer · AI & SaaS Builder</p>
              <p className="mt-3 max-w-xl text-sm leading-6 text-ink-500 dark:text-ink-400">Building reliable product systems across interfaces, APIs, AI workflows, automation and cloud delivery.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            <a href="https://github.com/thesyedfaaiz" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-700 transition hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:text-ink-200 dark:hover:border-brand-400/40 dark:hover:text-brand-200"><Github className="size-4" />GitHub</a>
            <a href="https://linkedin.com/in/thesyedfaaiz" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-700 transition hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:text-ink-200 dark:hover:border-brand-400/40 dark:hover:text-brand-200"><Linkedin className="size-4" />LinkedIn</a>
            <a href="/#top" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 dark:bg-white dark:text-ink-950 dark:hover:bg-brand-200">Back to top <ArrowRight className="size-4 -rotate-45" /></a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-ink-200 pt-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:text-ink-500">
          <span></span>
          <span><a href="https://syedfaaiz.com" className="hover:underline">Visit Syed Faaiz: personal website</a></span>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
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
