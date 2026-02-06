import type { Metadata } from "next";
import "./cyberpunk.css";

export const metadata: Metadata = {
  title: "Kabeer Joshi - Frontend Developer",
  description: "Frontend Developer specializing in React, Next.js, and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
