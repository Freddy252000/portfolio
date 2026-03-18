import React from "react";
import { motion } from "framer-motion";
import { Code, Palette, Database, Globe } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "tools" | "design";
}

const About: React.FC = () => {
  const skills: Skill[] = [
    { name: "React Native", level: 95, category: "frontend" },
    { name: "React", level: 90, category: "frontend" },
    { name: "TypeScript", level: 90, category: "frontend" },
    { name: "JavaScript", level: 95, category: "frontend" },
    { name: "HTML/CSS", level: 85, category: "frontend" },
    { name: "Node.js", level: 60, category: "backend" },
    { name: "PostgreSQL", level: 60, category: "backend" },
    { name: "Python", level: 65, category: "backend" },
    { name: "Figma", level: 80, category: "design" },
    { name: "UI/UX Design", level: 75, category: "design" },
    { name: "Mobile App Design", level: 80, category: "design" },
    { name: "Secure Communication", level: 70, category: "backend" },
    { name: "End-to-End Encryption", level: 70, category: "backend" },
    { name: "Adobe XD", level: 75, category: "design" },
    { name: "Responsive Design", level: 85, category: "design" },
    { name: "Git", level: 90, category: "tools" },
    { name: "Docker", level: 75, category: "tools" },
    { name: "Firebase", level: 70, category: "tools" },
    { name: "AWS", level: 65, category: "tools" },
    { name: "Azure", level: 60, category: "tools" },
    { name: "Linux", level: 80, category: "tools" },
    { name: "VS Code", level: 90, category: "tools" },


  ];

  const skillCategories = [
    { name: "Frontend", icon: Code, color: "text-blue-500" },
    { name: "Backend", icon: Database, color: "text-green-500" },
    { name: "Design", icon: Palette, color: "text-purple-500" },
    { name: "Tools", icon: Globe, color: "text-orange-500" },
  ];

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
      id="about"
      className="section-padding bg-secondary-50 dark:bg-secondary-800"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
            Passionate developer with a love for creating innovative solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* About Text */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-secondary-900 dark:text-white">
              Hi, I'm Freddy Vincent
            </h3>
            <div className="space-y-4 text-secondary-700 dark:text-secondary-300 leading-relaxed">
              <p>
                Currently working as a Software Engineer at Invicta Innovation,
                where I'm developing a cutting-edge chat application with
                end-to-end encryption using React Native. I specialize in
                creating secure, scalable mobile applications that prioritize
                user privacy and seamless user experiences.
              </p>
              <p>
                My expertise spans across mobile app development, web
                technologies, and secure communication systems. I'm passionate
                about building innovative solutions that solve real-world
                problems, from fitness tracking apps to e-learning platforms and
                food delivery systems.
              </p>
              <p>
                I believe in writing clean, maintainable code and staying
                up-to-date with the latest technologies in mobile development
                and cybersecurity. When I'm not coding, you can find me working
                on personal projects or exploring new frameworks and tools.
              </p>
            </div>
          </motion.div>

          {/* Profile Image Placeholder */}
          {/* Profile Image */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative w-80 h-80">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 280 280"
                style={{ overflow: "visible" }}
              >
                <defs>
                  <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>

                {/* Static faint outer ring */}
                <circle
                  cx="140" cy="140" r="128"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="0.5"
                  opacity="0.12"
                />

                {/* Spinning ring 1 — clockwise, amber dot */}
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "140px 140px" }}
                >
                  <circle
                    cx="140" cy="140" r="105"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="1.5"
                    strokeDasharray="8 5"
                    opacity="0.45"
                  />
                  {/* Amber dot at the right edge of ring (cx = 140+105) */}
                  <circle cx="245" cy="140" r="6" fill="#f59e0b" />
                  {/* Small purple dot on opposite side */}
                  <circle cx="35" cy="140" r="3" fill="#6366f1" opacity="0.6" />
                </motion.g>

                {/* Spinning ring 2 — counter-clockwise, green dot */}
                <motion.g
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "140px 140px" }}
                >
                  <circle
                    cx="140" cy="140" r="128"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="1"
                    strokeDasharray="4 8"
                    opacity="0.3"
                  />
                  {/* Green dot at top of ring (cy = 140-128) */}
                  <circle cx="140" cy="12" r="5" fill="#10b981" />
                  {/* Small purple dot at bottom */}
                  <circle cx="140" cy="268" r="3" fill="#8b5cf6" opacity="0.5" />
                </motion.g>

                {/* Core circle */}
                <circle cx="140" cy="140" r="72" fill="url(#cg)" />
                <circle
                  cx="140" cy="140" r="72"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                  opacity="0.25"
                />

                {/* Floating FV */}
                <motion.text
                  x="140"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="system-ui, sans-serif"
                  fontSize="46"
                  fontWeight="800"
                  fill="white"
                  letterSpacing="4"
                  animate={{ y: [140, 134, 140] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  FV
                </motion.text>
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-3xl font-bold text-center text-secondary-900 dark:text-white mb-12"
            variants={itemVariants}
          >
            Skills & Technologies
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category) => (
              <motion.div
                key={category.name}
                className="card p-6 text-center"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`inline-flex p-4 rounded-full bg-secondary-100 dark:bg-secondary-700 mb-4 ${category.color}`}
                >
                  <category.icon size={32} />
                </div>
                <h4 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                  {category.name}
                </h4>
                <div className="space-y-3">
                  {skills
                    .filter(
                      (skill) => skill.category === category.name.toLowerCase()
                    )
                    .map((skill) => (
                      <div key={skill.name} className="text-left">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                            {skill.name}
                          </span>
                          <span className="text-sm text-secondary-500 dark:text-secondary-400">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-secondary-200 dark:bg-secondary-600 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
