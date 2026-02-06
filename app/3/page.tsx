'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Terminal, Cpu, Zap, Shield, Globe, Github, Linkedin, Mail, ChevronRight } from 'lucide-react';

const projects = [
  { id: 1, title: "NEON_PROTOCOL", type: "SYSTEM", status: "ONLINE" },
  { id: 2, title: "CYBER_VAULT", type: "SECURITY", status: "ACTIVE" },
  { id: 3, title: "NEURAL_LINK", type: "INTERFACE", status: "OPTIMAL" },
];

const skills = [
  { name: "React.js", level: 98, category: "FRAMEWORK" },
  { name: "TypeScript", level: 95, category: "LANGUAGE" },
  { name: "Node.js", level: 92, category: "RUNTIME" },
  { name: "WebGL", level: 88, category: "GRAPHICS" },
  { name: "Rust", level: 85, category: "SYSTEMS" },
];

const logs = [
  "> Initializing system...",
  "> Loading modules...",
  "> Connection established",
  "> User authenticated: KABEER_JOSHI",
  "> Access level: ADMIN",
  "> Welcome to the grid",
];

export default function CyberpunkPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentLog, setCurrentLog] = useState(0);
  const [glitchText, setGlitchText] = useState("KABEER");
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLog((prev) => (prev + 1) % logs.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    let iteration = 0;
    const interval = setInterval(() => {
      setGlitchText(
        "KABEER"
          .split("")
          .map((letter, index) => {
            if (index < iteration) return "KABEER"[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iteration >= 6) iteration = 0;
      iteration += 1/3;
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="cyberpunk-container">
      {/* Background Grid */}
      <div className="cyber-grid">
        <div className="grid-lines" />
        <div className="grid-fade" />
      </div>

      {/* Scanlines */}
      <div className="scanlines" />

      {/* Navigation */}
      <nav className="cyber-nav">
        <div className="nav-logo">
          <Terminal size={20} className="logo-icon" />
          <span className="logo-text">KJ_SYS</span>
        </div>
        <div className="nav-links">
          {['[WORK]', '[ABOUT]', '[CONTACT]'].map((link) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase().slice(1, -1)}`}
              className="nav-link"
              whileHover={{ color: "#00f0ff" }}
            >
              {link}
            </motion.a>
          ))}
        </div>
        <div className="nav-status">
          <span className="status-indicator" />
          <span>SYSTEM ONLINE</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="cyber-hero">
        <motion.div 
          className="hero-content"
          style={{ y, opacity, scale }}
        >
          <div className="hero-label">
            <span className="label-bracket">[</span>
            <span>FRONTEND_DEVELOPER</span>
            <span className="label-bracket">]</span>
          </div>

          <h1 className="hero-title">
            <motion.span 
              className="glitch-name"
              animate={{ 
                textShadow: [
                  "2px 0 #ff00ff, -2px 0 #00f0ff",
                  "-2px 0 #ff00ff, 2px 0 #00f0ff",
                  "2px 0 #ff00ff, -2px 0 #00f0ff"
                ]
              }}
              transition={{ duration: 0.2, repeat: Infinity }}
            >
              {glitchText}
            </motion.span>
            <span className="title-suffix">.EXE</span>
          </h1>

          <div className="hero-stats">
            <div className="stat-row">
              <span className="stat-label">LEVEL:</span>
              <div className="stat-bar">
                <motion.div 
                  className="stat-fill"
                  initial={{ width: 0 }}
                  animate={{ width: "95%" }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
              </div>
              <span className="stat-value">95</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">EXP:</span>
              <span className="stat-text">5+ YEARS</span>
            </div>
          </div>

          <div className="hero-terminal">
            <div className="terminal-header">
              <span>system.log</span>
              <div className="terminal-dots">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="terminal-body">
              {logs.slice(0, currentLog + 1).map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="log-line"
                >
                  {log}
                </motion.div>
              ))}
              <span className="cursor">_</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="hologram-ring ring-1" />
          <div className="hologram-ring ring-2" />
          <div className="hologram-ring ring-3" />
          <div className="hologram-core">
            <Cpu size={60} />
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="work" className="cyber-section">
        <div className="section-header">
          <div className="header-line" />
          <h2 className="section-title">
            <span className="title-icon">&gt;</span>
            PROJECTS_DATABASE
          </h2>
          <div className="header-line" />
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="card-header">
                <span className="card-id">ID: 0{project.id}</span>
                <span className={`card-status status-${project.status.toLowerCase()}`}>
                  {project.status}
                </span>
              </div>
              <h3 className="card-title">{project.title}</h3>
              <div className="card-meta">
                <span className="meta-type">{project.type}</span>
                <ChevronRight size={16} />
              </div>
              <div className="card-glitch" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="cyber-section alt">
        <div className="section-header">
          <div className="header-line" />
          <h2 className="section-title">
            <span className="title-icon">&gt;</span>
            SKILL_MATRIX
          </h2>
          <div className="header-line" />
        </div>

        <div className="skills-matrix">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-node"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring" }}
            >
              <div className="node-ring" />
              <div className="node-content">
                <span className="node-category">{skill.category}</span>
                <span className="node-name">{skill.name}</span>
                <div className="node-level">
                  <motion.div 
                    className="level-bar"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  />
                  <span className="level-value">{skill.level}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="cyber-section">
        <div className="section-header">
          <div className="header-line" />
          <h2 className="section-title">
            <span className="title-icon">&gt;</span>
            ESTABLISH_CONNECTION
          </h2>
          <div className="header-line" />
        </div>

        <div className="contact-grid">
          {[
            { icon: Mail, label: "EMAIL", value: "kabeerjoshi22@gmail.com", href: "mailto:kabeerjoshi22@gmail.com" },
            { icon: Github, label: "GITHUB", value: "github.com/kabeerx9", href: "https://github.com/kabeerx9" },
            { icon: Linkedin, label: "LINKEDIN", value: "linkedin.com/in/kabeerjoshi", href: "https://linkedin.com/in/kabeerjoshi" },
          ].map((contact, index) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              className="contact-node"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, borderColor: "#00f0ff" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <contact.icon size={32} />
              <div className="contact-info">
                <span className="contact-label">{contact.label}</span>
                <span className="contact-value">{contact.value}</span>
              </div>
              <div className="contact-arrow">&gt;&gt;</div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="cyber-footer">
        <div className="footer-content">
          <div className="footer-line" />
          <p className="footer-text">
            <span className="footer-icon">⚡</span>
            SYSTEM_VERSION_2024.1
            <span className="footer-icon">⚡</span>
          </p>
          <div className="footer-line" />
        </div>
      </footer>
    </div>
  );
}
