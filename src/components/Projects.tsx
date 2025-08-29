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
  category: "web" | "mobile" | "desktop" | "other";
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
      githubUrl: "https://github.com/Freddy252000",
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
      githubUrl: "https://github.com/Freddy252000",
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
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop",
      demoUrl: undefined,
      githubUrl: "https://github.com/Freddy252000",
      featured: true,
      category: "mobile",
    },
  ];

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Apps" },
    { id: "mobile", name: "Mobile Apps" },
    { id: "desktop", name: "Desktop Apps" },
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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
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
          <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills and
            creativity
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? "bg-primary-600 text-white shadow-lg"
                  : "bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-600"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter size={18} />
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="card overflow-hidden group cursor-pointer"
                variants={itemVariants}
                layout
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
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
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400 rounded-full text-sm">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
