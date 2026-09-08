export interface Project {
  id: string;
  name: string;
  company: string;
  website?: string;
  summary: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  categories: string[];
  featured: boolean;
  accent: string;
}
export interface ExperienceRole {
  title: string;
  period: string;
}
export interface Experience {
  company: string;
  companyUrl: string;
  location: string;
  roles: ExperienceRole[];
  projects: string[];
}
export interface SkillGroup {
  title: string;
  icon: string;
  skills: string[];
}
export interface Education {
  degree: string;
  school: string;
  period: string;
  detail?: string;
  description?: string;
}
