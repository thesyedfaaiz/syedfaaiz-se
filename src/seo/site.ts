import type { SeoSite } from "../../seo/prerender";
import { projects } from "../data/projects";
import { experiences, education } from "../data/content";
const person = {
  "@type": "Person",
  "@id": "https://syedfaaiz.com/#person",
  name: "Syed Faaiz",
  givenName: "Faizan",
  additionalName: "Hussain",
  familyName: "Hashmi",
  honorificPrefix: "Syed",
  alternateName: ["Syed Faizan Hussain Hashmi", "Syed Faaiz", "thesyedfaaiz"],
  url: "https://syedfaaiz.com/",
  image: "https://syedfaaiz.com/images/syed-faaiz-portrait.webp",
  description: "Syed Faaiz, professionally known as Syed Faizan Hussain Hashmi, is a software engineer and Taekwondo black belt who practices arm wrestling and calisthenics.",
  jobTitle: "Software Engineer",
  homeLocation: { "@type": "Place", name: "Lahore, Punjab, Pakistan" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Punjab University College of Information Technology", alternateName: "PUCIT", url: "https://pucit.edu.pk/" },
    { "@type": "EducationalOrganization", name: "Punjab Group of Colleges", url: "https://pgc.edu/" },
  ],
  knowsAbout: ["Software engineering", "Full-stack web development", "AI-assisted applications", "SaaS product development", "Taekwondo", "Arm wrestling", "Calisthenics"],
  award: "Kukkiwon Taekwondo black belt, 1st Dan",
  mainEntityOfPage: "https://syedfaaiz.com/about",
  sameAs: [
    "https://github.com/thesyedfaaiz",
    "https://www.linkedin.com/in/thesyedfaaiz/",
    "https://www.youtube.com/@thesyedfaaiz",
    "https://www.instagram.com/thesyedfaaiz/",
    "https://www.facebook.com/thesyedfaaiz/",
    "https://www.tiktok.com/@thesyedfaaiz",
    "https://www.threads.net/@thesyedfaaiz",
  ],
};
export const site: SeoSite = { origin: "https://se.syedfaaiz.com", name: "Syed Faaiz — Engineering", pages: [
  { path: "/", title: "Syed Faaiz — Software Engineer & AI Application Developer", heading: "Syed Faaiz — Software Engineer",
    description: "Syed Faaiz builds AI-assisted web applications, workflows, dashboards, automation systems, and scalable SaaS products from interface to cloud delivery.",
    image: "/images/syed-faaiz-engineering-portrait.webp", imageAlt: "Portrait of Syed Faaiz, software engineer", imageWidth: 640, imageHeight: 800,
    schema: [
      person,
      { "@type": "ProfilePage", "@id": "https://se.syedfaaiz.com/#profile", url: "https://se.syedfaaiz.com/", name: "Syed Faaiz — Software Engineer & AI Application Developer", description: "Engineering profile, experience, education, and case studies by Syed Faaiz.", image: "https://se.syedfaaiz.com/images/syed-faaiz-engineering-portrait.webp", dateModified: "2026-09-23", mainEntity: { "@id": person["@id"] } },
      { "@type": "WebSite", "@id": "https://se.syedfaaiz.com/#website", name: "Syed Faaiz — Engineering", url: "https://se.syedfaaiz.com/", creator: { "@id": person["@id"] }, publisher: { "@id": person["@id"] } },
    ],
    sections: [
      { title: "Experience", paragraphs: experiences.map(item => item.company + " — " + item.roles.map(role => role.title + ", " + role.period).join("; ")) },
      { title: "Selected case studies", links: projects.filter(p => p.featured).map(p => ({ label: p.name + " — " + p.summary, href: "/case-study/" + p.id })) },
      { title: "Education", paragraphs: education.map(item => item.degree + " — " + item.school) },
      { title: "About Syed Faaiz", links: [{ label: "Official website", href: "https://syedfaaiz.com" }, { label: "All case studies", href: "/case-studies" }, { label: "GitHub", href: "https://github.com/thesyedfaaiz" }, { label: "LinkedIn", href: "https://www.linkedin.com/in/thesyedfaaiz/" }] }
    ] },
  { path: "/case-studies", title: "Engineering Case Studies — Syed Faaiz", heading: "Engineering case studies", description: "Explore software engineering, AI, SaaS, integration, and automation work by Syed Faaiz.",
    schema: [person, { "@type": "CollectionPage", name: "Engineering Case Studies — Syed Faaiz", url: "https://se.syedfaaiz.com/case-studies", author: { "@id": person["@id"] }, creator: { "@id": person["@id"] }, hasPart: projects.map(p => ({ "@type": "CreativeWork", name: p.name, url: "https://se.syedfaaiz.com/case-study/" + p.id })) }],
    sections: [{ title: "Projects", links: projects.map(p => ({ label: p.name + " — " + p.summary, href: "/case-study/" + p.id })) }] },
  ...projects.map(p => ({ path: "/case-study/" + p.id, title: p.name + " — Engineering Case Study | Syed Faaiz", heading: p.name, description: p.summary,
    schema: [person, { "@type": "CreativeWork", name: p.name, description: p.summary, author: { "@id": person["@id"] }, creator: { "@id": person["@id"] }, url: "https://se.syedfaaiz.com/case-study/" + p.id, isPartOf: { "@id": "https://se.syedfaaiz.com/#website" } }],
    sections: [{ title: "Overview", paragraphs: [p.description] }, { title: "Engineering responsibilities", paragraphs: p.responsibilities }, { title: "Technologies", paragraphs: [p.technologies.join(", ")] }, { title: "Explore more", links: [{ label: "All case studies", href: "/case-studies" }, { label: "About Syed Faaiz", href: "https://syedfaaiz.com/about" }] }] }))
] };
