import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Filter } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: "web" | "mobile" | "desktop" | "design" | "other";
}

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const projects: Project[] = [
    {
      id: "1",
      title: "Secure Chat Application",
      description: "End-to-end encrypted chat app at Invicta Innovation",
      longDescription:
        "Currently developing a cutting-edge chat application with end-to-end encryption using React Native. Features include secure messaging, real-time communication, user authentication, and advanced privacy controls.",
      technologies: [
        "React Native",
        "TypeScript",
        "End-to-End Encryption",
        "Node.js",
        "WebSocket",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=600&h=400&fit=crop",
      demoUrl: undefined,
      githubUrl: undefined,
      featured: true,
      category: "mobile",
    },
    {
      id: "2",
      title: "Gym Mobile App",
      description: "Personal fitness tracking and workout management app",
      longDescription:
        "A comprehensive fitness tracking mobile application built with React Native. Features include workout planning, progress tracking, exercise library, and personal fitness analytics.",
      technologies: [
        "React Native",
        "TypeScript",
        "SQLite",
        "Redux",
        "React Navigation",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      demoUrl: undefined,
      githubUrl: "https://github.com/Freddy252000/GymApp",
      featured: true,
      category: "mobile",
    },
    {
      id: "3",
      title: "E-Learning Mobile App",
      description: "Educational platform for mobile learning",
      longDescription:
        "An interactive e-learning mobile application that provides courses, quizzes, progress tracking, and offline content access. Built with modern mobile development practices.",
      technologies: [
        "React Native",
        "TypeScript",
        "Firebase",
        "Video Streaming",
        "Offline Storage",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
      demoUrl: undefined,
      githubUrl: "https://github.com/Freddy252000/ELearnApp",
      featured: true,
      category: "mobile",
    },
    {
      id: "4",
      title: "Food Order Mobile App",
      description: "Food delivery and ordering mobile application",
      longDescription:
        "A complete food ordering and delivery mobile app with restaurant listings, menu browsing, cart management, order tracking, and payment integration.",
      technologies: [
        "React Native",
        "TypeScript",
        "Payment Gateway",
        "Maps API",
        "Push Notifications",
      ],
      imageUrl:
        "https://orders.co/static/432080c16d84bfce291c511ccb7fff74/80e91/Top-20-Food-Delivery-App-Advantages-for-Your-Restaurant-Business.webp",
      demoUrl: undefined,
      githubUrl: "https://github.com/Freddy252000/Restaurant-Mobile-App",
      featured: true,
      category: "mobile",
    },
    {
      id: "5",
      title: "Portfolio Website",
      description: "Personal portfolio website built with React and TypeScript",
      longDescription:
        "A modern, responsive portfolio website showcasing my projects and skills. Built with React, TypeScript, Tailwind CSS, and Framer Motion for smooth animations.",
      technologies: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Vite",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
      demoUrl: "https://portfolio-freddy-vincent.vercel.app",
      githubUrl: "https://github.com/Freddy252000/portfolio",
      featured: true,
      category: "web",
    },
    {
      id: "6",
      title: "Task Management System",
      description:
        "Full-stack task management application with real-time updates",
      longDescription:
        "A comprehensive task management system with user authentication, real-time updates, project collaboration, and advanced filtering. Built with React frontend and Node.js backend.",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Socket.io",
        "JWT",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      demoUrl: undefined,
      githubUrl: "https://github.com/Freddy252000/Task-Management-System",
      featured: false,
      category: "web",
    },
    {
      id: "7",
      title: "E-Commerce Platform",
      description: "Modern e-commerce solution with payment integration",
      longDescription:
        "A full-featured e-commerce platform with product catalog, shopping cart, user authentication, payment processing, and admin dashboard. Built with React and Spring Boot.",
      technologies: [
        "React",
        "Spring Boot",
        "Java",
        "PostgreSQL",
        "Stripe API",
        "Redux",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      demoUrl: undefined,
      githubUrl: "https://github.com/Freddy252000/Store",
      featured: false,
      category: "web",
    },
    {
      id: "14",
      title: "Music Streaming Mobile App",
      description: "Spotify-like music streaming application",
      longDescription:
        "A full-featured music streaming mobile application with playlist management, offline downloads, social features, and personalized recommendations. Built with React Native and integrated with music APIs.",
      technologies: [
        "React Native",
        "TypeScript",
        "Audio APIs",
        "Redux",
        "Firebase",
        "Push Notifications",
        "Spotify API",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
      demoUrl: undefined,
      githubUrl: "https://github.com/Freddy252000/MusicStreaming",
      featured: true,
      category: "mobile",
    },
    // ── NEW: Nova AI Voice Assistant ───────────────────────────────────────────
    {
      id: "15",
      title: "Nova — AI Voice Assistant",
      description: "Python-powered voice assistant with wake-word detection",
      longDescription:
        "Built Nova from scratch using pure Python — no AI frameworks. Features include voice-controlled YouTube music playback, Wikipedia Q&A, reminders, system volume control, screenshots, and smart wake-word detection that listens for 'Nova' continuously without blocking command input.",
      technologies: [
        "Python",
        "SpeechRecognition",
        "pyttsx3",
        "pywhatkit",
        "PyAudio",
        "pyautogui",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&h=400&fit=crop",
      demoUrl: undefined,
      githubUrl: "https://github.com/Freddy252000/Nova-Voice-Assistant",
      featured: true,
      category: "other",
    },
    // ── NEW: Social Media Dashboard UI (Figma) ────────────────────────────────
    {
      id: "16",
      title: "Social Media Dashboard UI",
      description: "SaaS-style analytics dashboard published on Figma Community",
      longDescription:
        "A modern social media analytics dashboard concept designed for businesses and content creators. Includes engagement metrics, post performance charts, reach analytics, and a clean minimal SaaS layout. Published on Figma Community and available for duplication.",
      technologies: [
        "Figma",
        "UI/UX Design",
        "Dashboard Design",
        "Data Visualization",
        "Responsive Design",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      demoUrl: "https://www.figma.com/design/fXIBuEEUG4U4AexGQbJdAH/Social-Media-Dashboard--Community-?m=auto&t=Y4dWJP6eA62A1lFq-6",
      githubUrl: undefined,
      featured: true,
      category: "design",
    },
    // ── NEW: Auralyx Music Streaming UI (Figma) ───────────────────────────────
    {
      id: "17",
      title: "Auralyx — Music Streaming App UI",
      description: "Spotify-inspired mobile UI design with 8 screens on Figma Community",
      longDescription:
        "Designed Auralyx, a modern music streaming mobile app UI inspired by Spotify. Covers playlist management, music discovery, and a seamless audio player interface across 8 polished screens. Published on Figma Community.",
      technologies: [
        "Figma",
        "Mobile UI Design",
        "UI/UX Design",
        "Prototyping",
        "Wireframing",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop",
      demoUrl: "https://www.figma.com/design/TwjirtkM7kCkfmPzg47lge/Auralyx-%E2%80%93-Music-Streaming-Mobile-App-UI-Kit--Community-?m=auto&t=Y4dWJP6eA62A1lFq-6",
      githubUrl: undefined,
      featured: true,
      category: "design",
    },
  ];

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Apps" },
    { id: "mobile", name: "Mobile Apps" },
    { id: "design", name: "UI/UX Design" },
    { id: "other", name: "Other" },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };


  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.9,
    },
  };

  return (
    <section
      id="projects"
      className="section-padding bg-white dark:bg-secondary-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
            My Projects
          </h2>
          <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto mb-4">
            Here are some of my recent projects that showcase my skills and
            creativity
          </p>
          <motion.div
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span>{filteredProjects.length} Projects</span>
            {selectedCategory !== "all" && (
              <span className="text-primary-500">• {selectedCategory}</span>
            )}
          </motion.div>
        </motion.div>

        {/* Skills & Technologies Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-8 text-center">
            Skills & Technologies
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Frontend Technologies */}
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <h4 className="text-lg font-semibold text-secondary-900 dark:text-white">
                  Frontend
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "React Native",
                  "TypeScript",
                  "JavaScript",
                  "HTML5",
                  "CSS3",
                  "Tailwind CSS",
                  "Material-UI",
                  "Framer Motion",
                ].map((tech) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Backend Technologies */}
            <motion.div
              className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <h4 className="text-lg font-semibold text-secondary-900 dark:text-white">
                  Backend
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Node.js", "Python", "PostgreSQL", "MongoDB"].map((tech) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Tools & Platforms */}
            <motion.div
              className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <h4 className="text-lg font-semibold text-secondary-900 dark:text-white">
                  Tools & Platforms
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Git",
                  "Docker",
                  "Azure",
                  "Firebase",
                  "Vite",
                  "Webpack",
                  "WebRTC",
                  "VS Code",
                ].map((tech) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Design & UI/UX */}
            <motion.div
              className="bg-gradient-to-br from-pink-50 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20 p-6 rounded-xl border border-pink-200 dark:border-pink-800"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                <h4 className="text-lg font-semibold text-secondary-900 dark:text-white">
                  Design & UI/UX
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Figma",
                  "Adobe XD",
                  "Photoshop",
                  "Illustrator",
                  "Responsive Design",
                  "User Experience",
                  "Prototyping",
                  "Wireframing",
                ].map((tech) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 rounded-full text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Project Statistics */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-800"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                20+
              </motion.div>
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                Total Projects
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/30 rounded-xl border border-green-200 dark:border-green-800"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                25+
              </motion.div>
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                Technologies
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/30 rounded-xl border border-purple-200 dark:border-purple-800"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                3+
              </motion.div>
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                Years Experience
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-900/30 rounded-xl border border-orange-200 dark:border-orange-800"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                100%
              </motion.div>
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                Client Satisfaction
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`relative flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 overflow-hidden ${selectedCategory === category.id
                ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-600/25"
                : "bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-700 border border-secondary-200 dark:border-secondary-600 hover:border-primary-300 dark:hover:border-primary-600"
                }`}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  selectedCategory === category.id
                    ? "0 10px 30px rgba(59, 130, 246, 0.3)"
                    : "0 5px 20px rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {selectedCategory === category.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700"
                  layoutId="activeCategory"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className="relative z-10 flex items-center space-x-2">
                <Filter size={18} />
                <span>{category.name}</span>
                {selectedCategory === category.id && (
                  <motion.span
                    className="ml-2 w-2 h-2 bg-white rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                )}
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={`${selectedCategory}-${project.id}`}
                  className="card overflow-hidden group cursor-pointer transform-gpu"
                  variants={itemVariants}
                  custom={index}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-4">
                      {project.demoUrl && (
                        <motion.a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white rounded-full text-secondary-900 hover:bg-primary-100 transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink size={20} />
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white rounded-full text-secondary-900 hover:bg-primary-100 transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github size={20} />
                        </motion.a>
                      )}
                    </div>
                    {project.featured && (
                      <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </div>
                    )}
                    {/* Design badge */}
                    {project.category === "design" && (
                      <div className="absolute top-4 right-4 bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Figma
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-6 bg-gradient-to-br from-white to-secondary-50 dark:from-secondary-800 dark:to-secondary-900">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      {project.category && (
                        <span className="px-2 py-1 bg-secondary-200 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400 rounded text-xs font-medium uppercase tracking-wide">
                          {project.category}
                        </span>
                      )}
                    </div>
                    <p className="text-secondary-600 dark:text-secondary-400 mb-4 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium border border-primary-200 dark:border-primary-800"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-3 py-1 bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400 rounded-full text-sm border border-secondary-200 dark:border-secondary-600">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Project Links */}
                    <div className="flex items-center justify-between pt-2 border-t border-secondary-200 dark:border-secondary-700">
                      <div className="flex space-x-2">
                        {project.demoUrl && (
                          <span className="text-xs text-secondary-500 dark:text-secondary-400">
                            {project.category === "design"
                              ? "Figma Community"
                              : "Live Demo"}
                          </span>
                        )}
                        {project.githubUrl && (
                          <span className="text-xs text-secondary-500 dark:text-secondary-400">
                            Source Code
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-secondary-400 dark:text-secondary-500">
                        {project.featured
                          ? "Featured Project"
                          : "Personal Project"}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                key={`empty-${selectedCategory}`}
                className="col-span-full flex flex-col items-center justify-center py-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-24 h-24 bg-secondary-100 dark:bg-secondary-800 rounded-full flex items-center justify-center mb-6">
                  <Filter
                    size={32}
                    className="text-secondary-400 dark:text-secondary-600"
                  />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                  No projects found
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 max-w-md">
                  No projects match the selected category. Try selecting a
                  different category or check back later for new projects.
                </p>
                <motion.button
                  onClick={() => setSelectedCategory("all")}
                  className="mt-6 px-6 py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Projects
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
