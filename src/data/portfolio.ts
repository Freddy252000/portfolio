import type { LucideIcon } from "lucide-react";
import {
  ShieldCheck,
  Dumbbell,
  GraduationCap,
  UtensilsCrossed,
  Globe,
  KanbanSquare,
  ShoppingBag,
  Music,
  Mic,
  LayoutDashboard,
  Headphones,
} from "lucide-react";

export const profile = {
  name: "Freddy Vincent",
  firstName: "Freddy",
  lastName: "Vincent",
  role: "Software Engineer & Mobile App Developer",
  roles: ["Software Engineer", "Mobile Developer", "Frontend Developer"],
  photo: "/profile.webp",
  company: "Invicta Innovation",
  location: "Jaffna, Sri Lanka",
  email: "Freddyvfreddy@gmail.com",
  phone: "0774322659",
  cv: "/Freddy.pdf",
  github: "https://github.com/Freddy252000",
  linkedin: "https://www.linkedin.com/in/freddyvincent",
  tagline:
    "I build secure, end-to-end encrypted mobile experiences that feel effortless to use.",
};

export type SkillCategory = "frontend" | "backend" | "design" | "tools";

export const skillCategories: { id: SkillCategory; label: string }[] = [
  { id: "frontend", label: "Frontend & Mobile" },
  { id: "backend", label: "Backend & Security" },
  { id: "design", label: "Design" },
  { id: "tools", label: "Tools & Cloud" },
];

export const skills: { name: string; category: SkillCategory }[] = [
  { name: "React Native", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "HTML/CSS", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "Secure Communication", category: "backend" },
  { name: "End-to-End Encryption", category: "backend" },
  { name: "Figma", category: "design" },
  { name: "UI/UX Design", category: "design" },
  { name: "Mobile App Design", category: "design" },
  { name: "Adobe XD", category: "design" },
  { name: "Responsive Design", category: "design" },
  { name: "Git", category: "tools" },
  { name: "Docker", category: "tools" },
  { name: "Firebase", category: "tools" },
  { name: "AWS", category: "tools" },
  { name: "Azure", category: "tools" },
  { name: "Linux", category: "tools" },
  { name: "VS Code", category: "tools" },
];

export type ProjectCategory = "web" | "mobile" | "design" | "other";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  icon: LucideIcon;
  /** Optional real screenshot, e.g. "/projects/gym.png" placed in /public. */
  screenshot?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: ProjectCategory;
}

export const projectFilters: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "mobile", label: "Mobile" },
  { id: "web", label: "Web" },
  { id: "design", label: "UI/UX" },
  { id: "other", label: "Other" },
];

export const projects: Project[] = [
  {
    id: "secure-chat",
    title: "Secure Chat Application",
    description: "End-to-end encrypted chat app at Invicta Innovation",
    longDescription:
      "Currently developing a cutting-edge chat application with end-to-end encryption using React Native. Features include secure messaging, real-time communication, user authentication, and advanced privacy controls.",
    technologies: ["React Native", "TypeScript", "End-to-End Encryption", "Node.js", "WebSocket"],
    icon: ShieldCheck,
    featured: true,
    category: "mobile",
  },
  {
    id: "gym",
    title: "Gym Mobile App",
    description: "Personal fitness tracking and workout management app",
    longDescription:
      "A comprehensive fitness tracking mobile application built with React Native. Features include workout planning, progress tracking, exercise library, and personal fitness analytics.",
    technologies: ["React Native", "TypeScript", "SQLite", "Redux", "React Navigation"],
    icon: Dumbbell,
    githubUrl: "https://github.com/Freddy252000/GymApp",
    featured: true,
    category: "mobile",
  },
  {
    id: "elearn",
    title: "E-Learning Mobile App",
    description: "Educational platform for mobile learning",
    longDescription:
      "An interactive e-learning mobile application that provides courses, quizzes, progress tracking, and offline content access. Built with modern mobile development practices.",
    technologies: ["React Native", "TypeScript", "Firebase", "Video Streaming", "Offline Storage"],
    icon: GraduationCap,
    githubUrl: "https://github.com/Freddy252000/ELearnApp",
    featured: true,
    category: "mobile",
  },
  {
    id: "food",
    title: "Food Order Mobile App",
    description: "Food delivery and ordering mobile application",
    longDescription:
      "A complete food ordering and delivery mobile app with restaurant listings, menu browsing, cart management, order tracking, and payment integration.",
    technologies: ["React Native", "TypeScript", "Payment Gateway", "Maps API", "Push Notifications"],
    icon: UtensilsCrossed,
    githubUrl: "https://github.com/Freddy252000/Restaurant-Mobile-App",
    featured: true,
    category: "mobile",
  },
  {
    id: "music",
    title: "Music Streaming Mobile App",
    description: "Spotify-like music streaming application",
    longDescription:
      "A full-featured music streaming mobile application with playlist management, offline downloads, social features, and personalized recommendations. Built with React Native and integrated with music APIs.",
    technologies: ["React Native", "TypeScript", "Audio APIs", "Redux", "Firebase", "Push Notifications", "Spotify API"],
    icon: Music,
    githubUrl: "https://github.com/Freddy252000/MusicStreaming",
    featured: true,
    category: "mobile",
  },
  {
    id: "nova",
    title: "Nova — AI Voice Assistant",
    description: "Python-powered voice assistant with wake-word detection",
    longDescription:
      "Built Nova from scratch using pure Python — no AI frameworks. Features include voice-controlled YouTube music playback, Wikipedia Q&A, reminders, system volume control, screenshots, and smart wake-word detection that listens for 'Nova' continuously without blocking command input.",
    technologies: ["Python", "SpeechRecognition", "pyttsx3", "pywhatkit", "PyAudio", "pyautogui"],
    icon: Mic,
    githubUrl: "https://github.com/Freddy252000/Nova-Voice-Assistant",
    featured: true,
    category: "other",
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    description: "This site: React, Three.js and a 3D workspace that codes itself",
    longDescription:
      "A 3D portfolio built with React, TypeScript, Three.js (React Three Fiber), Tailwind CSS and Framer Motion. Features a 3D workspace where code is typed, run and turned into a live website and mobile app, an interactive skill constellation and smooth scroll-driven motion.",
    technologies: ["React", "TypeScript", "Three.js", "React Three Fiber", "Tailwind CSS", "Framer Motion"],
    icon: Globe,
    demoUrl: "https://portfolio-freddy-vincent.vercel.app",
    githubUrl: "https://github.com/Freddy252000/portfolio",
    featured: true,
    category: "web",
  },
  {
    id: "tasks",
    title: "Task Management System",
    description: "Full-stack task management application with real-time updates",
    longDescription:
      "A comprehensive task management system with user authentication, real-time updates, project collaboration, and advanced filtering. Built with React frontend and Node.js backend.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "JWT"],
    icon: KanbanSquare,
    githubUrl: "https://github.com/Freddy252000/Task-Management-System",
    featured: false,
    category: "web",
  },
  {
    id: "store",
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with payment integration",
    longDescription:
      "A full-featured e-commerce platform with product catalog, shopping cart, user authentication, payment processing, and admin dashboard. Built with React and Spring Boot.",
    technologies: ["React", "Spring Boot", "Java", "PostgreSQL", "Stripe API", "Redux"],
    icon: ShoppingBag,
    githubUrl: "https://github.com/Freddy252000/Store",
    featured: false,
    category: "web",
  },
  {
    id: "social-dashboard",
    title: "Social Media Dashboard UI",
    description: "SaaS-style analytics dashboard published on Figma Community",
    longDescription:
      "A modern social media analytics dashboard concept designed for businesses and content creators. Includes engagement metrics, post performance charts, reach analytics, and a clean minimal SaaS layout. Published on Figma Community and available for duplication.",
    technologies: ["Figma", "UI/UX Design", "Dashboard Design", "Data Visualization", "Responsive Design"],
    icon: LayoutDashboard,
    demoUrl:
      "https://www.figma.com/design/fXIBuEEUG4U4AexGQbJdAH/Social-Media-Dashboard--Community-?m=auto&t=Y4dWJP6eA62A1lFq-6",
    featured: true,
    category: "design",
  },
  {
    id: "auralyx",
    title: "Auralyx — Music Streaming App UI",
    description: "Spotify-inspired mobile UI design with 8 screens on Figma Community",
    longDescription:
      "Designed Auralyx, a modern music streaming mobile app UI inspired by Spotify. Covers playlist management, music discovery, and a seamless audio player interface across 8 polished screens. Published on Figma Community.",
    technologies: ["Figma", "Mobile UI Design", "UI/UX Design", "Prototyping", "Wireframing"],
    icon: Headphones,
    demoUrl:
      "https://www.figma.com/design/TwjirtkM7kCkfmPzg47lge/Auralyx-%E2%80%93-Music-Streaming-Mobile-App-UI-Kit--Community-?m=auto&t=Y4dWJP6eA62A1lFq-6",
    featured: true,
    category: "design",
  },
];

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuerLogo: string;
  issuedDate: string;
  credentialId: string;
  verifyUrl: string;
  description: string;
  skills: string[];
  hue: "accent" | "accent2";
}

export const certificates: Certificate[] = [
  {
    id: "workloo",
    title: "Frontend Developer Certification",
    issuer: "WorkLoo",
    issuerLogo: "WL",
    issuedDate: "April 2026",
    credentialId: "WL3A4MIL8K",
    verifyUrl: "https://workloo.com/verify/WL3A4MIL8K",
    description:
      "Earned with a 100% score at Professional level. Validates skills in modern frontend development including HTML, CSS, JavaScript, and responsive UI design principles.",
    skills: ["JavaScript", "CSS3", "HTML5", "Responsive Design", "UI Principles"],
    hue: "accent",
  },
  {
    id: "copado",
    title: "Copado AI Certified Professional",
    issuer: "Copado",
    issuerLogo: "CP",
    issuedDate: "April 2026",
    credentialId: "064422",
    verifyUrl:
      "https://drive.google.com/file/d/11zdbKMC9AdUDUCdVgKjxFTMBL6skTWDZ/view?usp=drive_link",
    description:
      "Certified in AI-powered DevOps workflows, Copado AI Agents (Plan, Build, Test, Release, Operate), Org Intelligence, CI/CD automation, and modern Salesforce DevOps practices.",
    skills: ["DevOps", "Salesforce", "CI/CD", "AI Agents", "Org Intelligence"],
    hue: "accent2",
  },
];
