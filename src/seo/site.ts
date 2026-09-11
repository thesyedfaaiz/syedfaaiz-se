import type { SeoSite } from "../../seo/prerender";
import { projects } from "../data/projects";
import { experiences, education } from "../data/content";
const person = { "@id": "https://syedfaaiz.com/#person" };
export const site: SeoSite = { origin: "https://se.syedfaaiz.com", name: "Syed Faaiz — Engineering", pages: [
  { path: "/", title: "Syed Faaiz — Software Engineer & AI Application Developer", heading: "Syed Faizan Hussain Hashmi",
    description: "Syed Faaiz builds AI-assisted web applications, workflows, dashboards, automation systems, and scalable SaaS products from interface to cloud delivery.",
    image: "/og-logo.png", imageAlt: "Syed Faaiz — Software Engineer & AI Application Developer", imageWidth: 1200, imageHeight: 630,
    schema: [{ "@type": "ProfilePage", url: "https://se.syedfaaiz.com/", mainEntity: person }],
    sections: [
      { title: "Experience", paragraphs: experiences.map(item => item.company + " — " + item.roles.map(role => role.title + ", " + role.period).join("; ")) },
      { title: "Selected case studies", links: projects.filter(p => p.featured).map(p => ({ label: p.name + " — " + p.summary, href: "/case-study/" + p.id })) },
      { title: "Education", paragraphs: education.map(item => item.degree + " — " + item.school) },
      { title: "About Syed Faaiz", links: [{ label: "Official website", href: "https://syedfaaiz.com" }, { label: "All case studies", href: "/case-studies" }, { label: "GitHub", href: "https://github.com/thesyedfaaiz" }, { label: "LinkedIn", href: "https://www.linkedin.com/in/thesyedfaaiz/" }] }
    ] },
  { path: "/case-studies", title: "Engineering Case Studies — Syed Faaiz", heading: "Engineering case studies", description: "Explore software engineering, AI, SaaS, integration, and automation work by Syed Faaiz.", sections: [{ title: "Projects", links: projects.map(p => ({ label: p.name + " — " + p.summary, href: "/case-study/" + p.id })) }] },
  ...projects.map(p => ({ path: "/case-study/" + p.id, title: p.name + " — Engineering Case Study | Syed Faaiz", heading: p.name, description: p.summary,
    schema: [{ "@type": "CreativeWork", name: p.name, description: p.summary, author: person, url: "https://se.syedfaaiz.com/case-study/" + p.id }],
    sections: [{ title: "Overview", paragraphs: [p.description] }, { title: "Engineering responsibilities", paragraphs: p.responsibilities }, { title: "Technologies", paragraphs: [p.technologies.join(", ")] }, { title: "Explore more", links: [{ label: "All case studies", href: "/case-studies" }, { label: "About Syed Faaiz", href: "https://syedfaaiz.com/about" }] }] }))
] };
