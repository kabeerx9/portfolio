"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"]
  );
  const darkBackgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(24, 24, 27, 0)", "rgba(24, 24, 27, 0.8)"]
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        style={{
          backgroundColor: backgroundColor,
          ["--dark-bg" as string]: darkBackgroundColor,
          backdropFilter: "blur(12px)",
        }}
        className="fixed top-0 left-0 right-0 z-50 dark:[background-color:var(--dark-bg)]"
      >
        <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold hover:text-zinc-800 dark:text-zinc-100 dark:hover:text-white transition-colors"
          >
            KJ
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm",
                    "text-zinc-600 dark:text-zinc-400",
                    "hover:text-zinc-900 dark:hover:text-zinc-50",
                    "transition-colors"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="ml-2">
              <ThemeToggle />
            </li>
          </ul>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        items={navItems}
      />
    </>
  );
}