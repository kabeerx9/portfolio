'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Leaf, Wind, Droplets, Sun, Mail, Github, Linkedin, ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "EcoTrack",
    description: "Sustainability dashboard for tracking carbon footprint",
    image: "🌿",
    color: "#7c9a6b"
  },
  {
    id: 2,
    title: "NatureFlow",
    description: "Meditation app with nature soundscapes",
    image: "🍃",
    color: "#9db4c0"
  },
  {
    id: 3,
    title: "GardenAI",
    description: "Smart gardening assistant with plant recognition",
    image: "🌸",
    color: "#d4a5a5"
  }
];

const skills = [
  { name: "React", icon: "⚛️", growth: 95 },
  { name: "Next.js", icon: "▲", growth: 92 },
  { name: "TypeScript", icon: "📘", growth: 88 },
  { name: "Node.js", icon: "🟢", growth: 85 },
  { name: "Design", icon: "🎨", growth: 90 }
];

export default function OrganicPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);
  
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className="organic-container">
      {/* Floating Background Elements */}
      <div className="floating-elements">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-leaf"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            <Leaf size={40 + i * 10} />
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="organic-nav">
        <motion.div 
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
        >
          <span className="logo-icon">🌱</span>
          <span className="logo-text">Kabeer</span>
        </motion.div>
        <div className="nav-links">
          {['Work', 'About', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-link"
              whileHover={{ y: -3 }}
            >
              {item}
            </motion.a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="organic-hero">
        <div className="hero-content">
          <motion.div
            className="hero-greeting"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="greeting-text">Hello, I'm</span>
          </motion.div>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="name-part">Kabeer</span>
            <span className="name-part accent">Joshi</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A frontend developer who crafts digital experiences 
            with the same care nature takes in growing a garden — 
            <span className="highlight">patient, intentional, and beautiful</span>.
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a
              href="#work"
              className="cta-button primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View My Work</span>
              <ArrowRight size={20} />
            </motion.a>
            <motion.a
              href="#contact"
              className="cta-button secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          style={{ y: springY }}
        >
          <motion.div
            className="hero-circle"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="circle-inner">
              <span className="circle-emoji">🌿</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="scroll-hint"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {[
            { icon: Sun, value: "5+", label: "Years Growing" },
            { icon: Droplets, value: "50+", label: "Projects Watered" },
            { icon: Wind, value: "20+", label: "Clients Nurtured" },
            { icon: Leaf, value: "∞", label: "Lines of Code" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <stat.icon size={32} className="stat-icon" />
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="work-section">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Selected Work</span>
          <h2 className="section-title">
            Projects that <span className="bloom">bloom</span>
          </h2>
        </motion.div>

        <div className="projects-showcase">
          <div className="projects-nav">
            {projects.map((project, index) => (
              <motion.button
                key={project.id}
                className={`project-nav-item ${activeProject === index ? 'active' : ''}`}
                onClick={() => setActiveProject(index)}
                whileHover={{ x: 10 }}
              >
                <span className="nav-number">0{index + 1}</span>
                <span className="nav-title">{project.title}</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject}
              className="project-display"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="project-card"
                style={{ backgroundColor: projects[activeProject].color }}
                whileHover={{ scale: 1.02 }}
              >
                <span className="project-emoji">{projects[activeProject].image}</span>
              </motion.div>
              <div className="project-info">
                <h3>{projects[activeProject].title}</h3>
                <p>{projects[activeProject].description}</p>
                <motion.button
                  className="project-link"
                  whileHover={{ x: 10 }}
                >
                  View Project <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <div className="skills-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Capabilities</span>
            <h2 className="section-title">
              Skills that keep <span className="grow">growing</span>
            </h2>
          </motion.div>

          <div className="skills-garden">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-plant"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  className="plant-stem"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${skill.growth}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                />
                <div className="plant-flower">
                  <span className="flower-icon">{skill.icon}</span>
                  <span className="flower-name">{skill.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-container">
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="about-image-wrapper">
              <motion.div
                className="about-image"
                animate={{
                  borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "70% 30% 30% 70% / 70% 70% 30% 30%", "30% 70% 70% 30% / 30% 30% 70% 70%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="about-emoji">👨‍💻</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">About Me</span>
            <h2>Rooted in code, reaching for the sky</h2>
            <p>
              Like a tree that grows stronger with each season, I've spent over 5 years 
              deepening my roots in frontend development while continuously reaching for 
              new heights in design and user experience.
            </p>
            <p>
              I believe the best digital products, like nature, should feel 
              <span className="highlight">intuitive, harmonious, and alive</span>. 
              Every line of code I write is a seed planted for future growth.
            </p>

            <div className="about-values">
              {['Patience', 'Growth', 'Balance', 'Harmony'].map((value, index) => (
                <motion.span
                  key={value}
                  className="value-tag"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {value}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <motion.div
            className="contact-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Get in Touch</span>
            <h2>Let's grow something together</h2>
            <p>
              Whether you have a project in mind or just want to chat about 
              the intersection of nature and technology, I'd love to hear from you.
            </p>
          </motion.div>

          <div className="contact-links">
            {[
              { icon: Mail, label: "Email", value: "kabeerjoshi22@gmail.com", href: "mailto:kabeerjoshi22@gmail.com" },
              { icon: Github, label: "GitHub", value: "@kabeerx9", href: "https://github.com/kabeerx9" },
              { icon: Linkedin, label: "LinkedIn", value: "Kabeer Joshi", href: "https://linkedin.com/in/kabeerjoshi" },
            ].map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="contact-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <link.icon size={32} />
                <div className="contact-info">
                  <span className="contact-label">{link.label}</span>
                  <span className="contact-value">{link.value}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="organic-footer">
        <div className="footer-content">
          <motion.div
            className="footer-plant"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🌱
          </motion.div>
          <p>Grown with care by Kabeer Joshi</p>
          <span className="footer-year">2024</span>
        </div>
      </footer>
    </div>
  );
}
