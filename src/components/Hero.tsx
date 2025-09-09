import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin } from "lucide-react";

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-primary-900"></div>

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 dark:bg-secondary-700 rounded-full opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Greeting */}
          <motion.p
            className="text-lg md:text-xl text-primary-600 dark:text-primary-400 font-medium mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-secondary-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Freddy Vincent
            </span>
          </motion.h1>

          {/* Title */}
          <motion.h2
            className="text-xl md:text-3xl lg:text-4xl font-semibold text-secondary-700 dark:text-secondary-300 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Software Engineer & Mobile App Developer
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            Currently working at Invicta Innovation on cutting-edge mobile
            applications with end-to-end encryption. Passionate about creating
            secure, scalable, and user-friendly mobile experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.button
              className="btn-primary flex items-center space-x-2 px-8 py-4 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span>View My Work</span>
            </motion.button>

            <motion.a
              href="/Freddy.pdf"
              download="Freddy_Vincent_CV.pdf"
              className="btn-secondary flex items-center space-x-2 px-8 py-4 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} />
              <span>Download CV</span>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center space-x-6 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            {[
              {
                name: "GitHub",
                icon: Github,
                url: "https://github.com/Freddy252000",
              },
              {
                name: "LinkedIn",
                icon: Linkedin,
                url: "https://www.linkedin.com/in/freddyvincent",
              },
            ].map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <p className="text-secondary-500 dark:text-secondary-400 text-sm mb-4">
              Scroll to explore
            </p>
            <motion.button
              onClick={scrollToAbout}
              className="p-2 rounded-full border-2 border-secondary-300 dark:border-secondary-600 text-secondary-500 dark:text-secondary-400 hover:border-primary-500 hover:text-primary-500 transition-all duration-200"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              whileHover={{ scale: 1.1 }}
            >
              <ArrowDown size={24} />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
