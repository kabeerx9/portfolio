import { Github, Mail, Linkedin } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/yourusername",
    icon: <Github className="w-5 h-5" />,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    name: "Email",
    href: "mailto:kabeerjoshi@gmail.com",
    icon: <Mail className="w-5 h-5" />,
  },
];

export default function Footer() {
  return (
    <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-8">
        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "p-2 rounded-lg",
                "text-zinc-600 dark:text-zinc-400",
                "hover:text-zinc-900 dark:hover:text-zinc-50",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                "transition-colors"
              )}
            >
              {link.icon}
              <span className="sr-only">{link.name}</span>
            </Link>
          ))}
        </div>

        <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} Kabeer Joshi. All rights reserved.</p>
          <p className="mt-1">
            Built with{" "}
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              Next.js
            </Link>{" "}
            and{" "}
            <Link
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              Tailwind CSS
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
} 