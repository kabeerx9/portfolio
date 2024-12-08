"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  name: string;
  icon: React.ReactNode;
  level: number;
  className?: string;
}

export default function SkillCard({ name, icon, level, className }: SkillCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        "p-6 rounded-lg bg-zinc-50 dark:bg-zinc-900/50",
        "border border-zinc-200 dark:border-zinc-800",
        "transition-colors",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="text-zinc-600 dark:text-zinc-400">
          {icon}
        </div>
        <h3 className="font-medium">{name}</h3>
      </div>
      
      <div className="space-y-2">
        <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${level}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-zinc-900 dark:bg-zinc-50"
          />
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 text-right">
          {level}%
        </p>
      </div>
    </motion.div>
  );
} 