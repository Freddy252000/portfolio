import React from "react";
import { motion } from "framer-motion";
import { Code, Palette, Database, Globe } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "tools" | "other";
}

const About: React.FC = () => {
  const skills: Skill[] = [
    { name: "React Native", level: 95, category: "frontend" },
    { name: "React", level: 90, category: "frontend" },
    { name: "TypeScript", level: 90, category: "frontend" },
    { name: "JavaScript", level: 95, category: "frontend" },
    { name: "Node.js", level: 85, category: "backend" },
    { name: "Java", level: 80, category: "backend" },
    { name: "Spring Boot", level: 75, category: "backend" },
    { name: "Azure", level: 70, category: "backend" },
    { name: "PostgreSQL", level: 75, category: "backend" },
    { name: "MongoDB", level: 70, category: "backend" },
    { name: "End-to-End Encryption", level: 85, category: "other" },
    { name: "Git", level: 90, category: "tools" },
    { name: "Docker", level: 75, category: "tools" },
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
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <motion.div
                className="w-80 h-80 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center text-white text-6xl font-bold shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                YN
              </motion.div>
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-primary-400 to-secondary-500 rounded-full opacity-20 blur-xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
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
