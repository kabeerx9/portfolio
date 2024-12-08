"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ui/ProjectCard";

const projects = [
  {
    title: "Interactive Messaging Platform",
    description: "Real-time chat application with features like authentication, file sharing, and responsive design.",
    image: "/projects/messaging-app.jpg", // Add your project image
    technologies: ["React", "Socket.io", "Node.js", "MongoDB"],
    liveUrl: "https://messaging-platform.demo",
    githubUrl: "https://github.com/username/messaging-platform",
  },
  {
    title: "React Explorer",
    description: "A comprehensive React components library featuring dynamic form builders and internationalization.",
    image: "/projects/react-explorer.jpg", // Add your project image
    technologies: ["React", "TypeScript", "i18n", "Storybook"],
    liveUrl: "https://react-explorer.demo",
    githubUrl: "https://github.com/username/react-explorer",
  },
  {
    title: "CodeSync",
    description: "Real-time collaborative code editor with syntax highlighting and WebSocket integration.",
    image: "/projects/code-sync.jpg", // Add your project image
    technologies: ["Next.js", "WebSocket", "CodeMirror", "PostgreSQL"],
    liveUrl: "https://code-sync.demo",
    githubUrl: "https://github.com/username/code-sync",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Projects() {
  return (
    <section className="py-24 px-4 max-w-6xl mx-auto" id="projects">
      <SectionHeader
        title="Featured Projects"
        subtitle="Some of my recent work"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
      >
        {projects.map((project) => (
          <motion.div key={project.title} variants={itemVariants}>
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
} 