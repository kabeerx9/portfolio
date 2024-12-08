"use client";

import { motion } from "framer-motion";
import { Building2, Calendar } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const experiences = [
  {
    title: "Frontend Developer",
    company: "Goreeva",
    period: "2022 - Present",
    description: [
      "Developed and maintained a comprehensive school management system using React and Next.js",
      "Implemented Redux Toolkit for efficient state management across the application",
      "Built cross-platform mobile applications using React Native",
      "Integrated payment gateways and implemented secure authentication systems",
      "Set up CI/CD pipelines using GitHub Actions for automated deployment",
      "Improved SEO metrics by migrating the application to Next.js",
    ],
  },
  // Add more experiences here if needed
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
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};

export default function Experience() {
  return (
    <section className="py-24 px-4 max-w-5xl mx-auto" id="experience">
      <SectionHeader
        title="Work Experience"
        subtitle="My professional journey"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative mt-16"
      >
        {/* Timeline line */}
        <div className="absolute left-8 top-3 bottom-3 w-px bg-zinc-200 dark:bg-zinc-800 md:left-1/2" />

        {experiences.map((experience, index) => (
          <motion.div
            key={experience.company}
            variants={itemVariants}
            className={cn(
              "relative grid grid-cols-1 gap-6 md:grid-cols-2",
              "mb-12 last:mb-0"
            )}
          >
            {/* Timeline dot */}
            <div className="absolute left-8 w-3 h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full transform -translate-x-1.5 md:left-1/2">
              <div className="absolute inset-0 rounded-full animate-ping bg-zinc-400 dark:bg-zinc-600 opacity-75" />
            </div>

            {/* Content */}
            <div className={cn(
              "ml-16 md:ml-0",
              index % 2 === 0 ? "md:text-right md:pr-16" : "md:pl-16 md:col-start-2"
            )}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{experience.title}</h3>
                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-sm md:justify-end">
                    <Building2 className="w-4 h-4" />
                    <span>{experience.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-sm md:justify-end">
                    <Calendar className="w-4 h-4" />
                    <span>{experience.period}</span>
                  </div>
                </div>
                <ul className={cn(
                  "space-y-2 text-zinc-600 dark:text-zinc-400",
                  "list-disc list-outside ml-4",
                  index % 2 === 0 ? "md:ml-auto md:text-right md:list-inside" : ""
                )}>
                  {experience.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
} 