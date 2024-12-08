"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Target, Award } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const achievements = [
  {
    platform: "HackerRank",
    icon: <Star className="w-6 h-6" />,
    achievements: [
      "5 Stars in C++",
      "5 Stars in MySQL",
      "Problem Solving (Advanced) Certificate",
    ],
    color: "text-yellow-500",
  },
  {
    platform: "LeetCode",
    icon: <Target className="w-6 h-6" />,
    achievements: [
      "500+ Problems Solved",
      "Global Rank: Top 5% in Contests",
      "Knight Badge (2023)",
    ],
    color: "text-orange-500",
  },
  {
    platform: "CodeChef",
    icon: <Trophy className="w-6 h-6" />,
    achievements: [
      "4⭐ Coder (Max Rating: 1905)",
      "50+ Contest Participations",
      "Global Rank 119 in Starters 47",
    ],
    color: "text-blue-500",
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
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function Achievements() {
  return (
    <section className="py-24 px-4 max-w-6xl mx-auto" id="achievements">
      <SectionHeader
        title="Problem-Solving Achievements"
        subtitle="Competitive programming & coding challenges"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
      >
        {achievements.map((item) => (
          <motion.div
            key={item.platform}
            variants={itemVariants}
            className={cn(
              "p-6 rounded-xl",
              "bg-zinc-50 dark:bg-zinc-900/50",
              "border border-zinc-200 dark:border-zinc-800",
              "hover:border-zinc-300 dark:hover:border-zinc-700",
              "transition-colors"
            )}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={cn("transition-colors", item.color)}>
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold">{item.platform}</h3>
            </div>

            <ul className="space-y-3">
              {item.achievements.map((achievement, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400"
                >
                  <Award className="w-4 h-4 flex-shrink-0" />
                  <span>{achievement}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
} 