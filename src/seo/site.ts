import { PLATFORM_PERSON, PLATFORM_PERSON_SOCIALS, getCatalogEntry } from "@thesyedfaaiz/ui";
import type { SeoSite } from "../../seo/prerender";
import { projects } from "../data/projects";
import { experiences, education } from "../data/content";
const officialSite = getCatalogEntry("com").prodUrl;
const engineeringSite = getCatalogEntry("se").prodUrl;
const github = PLATFORM_PERSON_SOCIALS.find((social) => social.id === "github")!;
const linkedIn = PLATFORM_PERSON_SOCIALS.find((social) => social.id === "linkedin")!;
const person = {
  "@type": "Person",
  "@id": officialSite + "/#person",
  name: PLATFORM_PERSON.name,
  givenName: PLATFORM_PERSON.givenName,
  additionalName: PLATFORM_PERSON.additionalName,
  familyName: PLATFORM_PERSON.familyName,
  honorificPrefix: PLATFORM_PERSON.honorificPrefix,
  alternateName: [PLATFORM_PERSON.fullName, PLATFORM_PERSON.name, PLATFORM_PERSON.username],
  url: officialSite + "/",
  image: PLATFORM_PERSON.imageUrl,
  description: "Syed Faaiz, professionally known as Syed Faizan Hussain Hashmi, is a software engineer and Taekwondo black belt who practices arm wrestling and calisthenics.",
  jobTitle: "Software Engineer",
  homeLocation: { "@type": "Place", name: "Lahore, Punjab, Pakistan" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Punjab University College of Information Technology", alternateName: "PUCIT", url: "https://pucit.edu.pk/" },
    { "@type": "EducationalOrganization", name: "Punjab Group of Colleges", url: "https://pgc.edu/" },
  ],
  knowsAbout: ["Software engineering", "Full-stack web development", "AI-assisted applications", "SaaS product development", "Taekwondo", "Arm wrestling", "Calisthenics"],
  award: "Kukkiwon Taekwondo black belt, 1st Dan",
  mainEntityOfPage: officialSite + "/about",
  sameAs: PLATFORM_PERSON_SOCIALS.map((social) => social.url),
};
export const site: SeoSite = { origin: engineeringSite, name: "Syed Faaiz — Engineering", pages: [
  { path: "/", title: "Syed Faaiz — Software Engineer & AI Application Developer", heading: "Syed Faaiz — Software Engineer",
    description: "Syed Faaiz builds AI-assisted web applications, workflows, dashboards, automation systems, and scalable SaaS products from interface to cloud delivery.",
    image: "/images/syed-faaiz-engineering-portrait.webp", imageAlt: "Portrait of Syed Faaiz, software engineer", imageWidth: 640, imageHeight: 800,
    schema: [
      person,
      { "@type": "ProfilePage", "@id": engineeringSite + "/#profile", url: engineeringSite + "/", name: "Syed Faaiz — Software Engineer & AI Application Developer", description: "Engineering profile, experience, education, and case studies by Syed Faaiz.", image: engineeringSite + "/images/syed-faaiz-engineering-portrait.webp", dateModified: "2026-09-23", mainEntity: { "@id": person["@id"] } },
      { "@type": "WebSite", "@id": engineeringSite + "/#website", name: "Syed Faaiz — Engineering", url: engineeringSite + "/", creator: { "@id": person["@id"] }, publisher: { "@id": person["@id"] } },
    ],
    sections: [
      { title: "Experience", paragraphs: experiences.map(item => item.company + " — " + item.roles.map(role => role.title + ", " + role.period).join("; ")) },
      { title: "Selected case studies", links: projects.filter(p => p.featured).map(p => ({ label: p.name + " — " + p.summary, href: "/case-study/" + p.id })) },
      { title: "Education", paragraphs: education.map(item => item.degree + " — " + item.school) },
      { title: "About Syed Faaiz", links: [{ label: "Official website", href: officialSite }, { label: "All case studies", href: "/case-studies" }, { label: "GitHub", href: github.url }, { label: "LinkedIn", href: linkedIn.url }] }
    ] },
  { path: "/case-studies", title: "Engineering Case Studies — Syed Faaiz", heading: "Engineering case studies", description: "Explore software engineering, AI, SaaS, integration, and automation work by Syed Faaiz.",
    schema: [person, { "@type": "CollectionPage", name: "Engineering Case Studies — Syed Faaiz", url: engineeringSite + "/case-studies", author: { "@id": person["@id"] }, creator: { "@id": person["@id"] }, hasPart: projects.map(p => ({ "@type": "CreativeWork", name: p.name, url: engineeringSite + "/case-study/" + p.id })) }],
    sections: [{ title: "Projects", links: projects.map(p => ({ label: p.name + " — " + p.summary, href: "/case-study/" + p.id })) }] },
  ...projects.map(p => ({ path: "/case-study/" + p.id, title: p.name + " — Engineering Case Study | Syed Faaiz", heading: p.name, description: p.summary,
    schema: [person, { "@type": "CreativeWork", name: p.name, description: p.summary, author: { "@id": person["@id"] }, creator: { "@id": person["@id"] }, url: engineeringSite + "/case-study/" + p.id, isPartOf: { "@id": engineeringSite + "/#website" } }],
    sections: [{ title: "Overview", paragraphs: [p.description] }, { title: "Engineering responsibilities", paragraphs: p.responsibilities }, { title: "Technologies", paragraphs: [p.technologies.join(", ")] }, { title: "Explore more", links: [{ label: "All case studies", href: "/case-studies" }, { label: "About Syed Faaiz", href: officialSite + "/about" }] }] }))
] };
