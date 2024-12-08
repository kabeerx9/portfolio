"use client";

import { motion } from "framer-motion";

export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-purple-500/20 dark:bg-purple-500/10 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-blue-500/20 dark:bg-blue-500/10 blur-3xl"
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-30 dark:opacity-20" />
    </div>
  );
} 