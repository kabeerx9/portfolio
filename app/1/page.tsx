'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, ArrowUpRight, Terminal, Cpu, Globe, Layers } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "React Explorer",
    description: "Advanced component visualization tool with real-time state inspection",
    tech: ["React", "TypeScript", "D3.js"],
    year: "2024"
  },
  {
    id: 2,
    title: "Code Sync",
    description: "Real-time collaborative coding platform with WebSocket integration",
    tech: ["Next.js", "Socket.io", "Redis"],
    year: "2024"
  },
  {
    id: 3,
    title: "Interactive Messaging",
    description: "AI-powered chat interface with natural language processing",
    tech: ["React", "OpenAI", "Tailwind"],
    year: "2023"
  }
];

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "UI/UX Design", level: 88 },
  { name: "System Architecture", level: 82 }
];

const experiences = [
  {
    company: "TechCorp",
    role: "Senior Frontend Engineer",
    period: "2022 - Present",
    description: "Leading frontend architecture decisions and mentoring team of 5 developers"
  },
  {
    company: "StartupXYZ",
    role: "Full Stack Developer",
    period: "2020 - 2022",
    description: "Built scalable web applications serving 100K+ daily active users"
  }
];

export default function BrutalistPortfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 200 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * -5;
      const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * 5;
      rotateX.set(rotateXValue);
      rotateY.set(rotateYValue);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rotateX, rotateY]);

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div ref={containerRef} className="brutalist-container">
      {/* Custom Cursor */}
      <motion.div
        className="custom-cursor"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 500 }}
      />

      {/* Navigation */}
      <nav className="brutalist-nav">
        <div className="nav-brand">KJ</div>
        <div className="nav-links">
          <a href="#work">WORK</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-grid">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="hero-title">
              <span className="glitch" data-text="KABEER">KABEER</span>
              <span className="glitch" data-text="JOSHI">JOSHI</span>
            </h1>
            <p className="hero-subtitle">
              FRONTEND ENGINEER &<br />
              CREATIVE DEVELOPER
            </p>
            <div className="hero-tags">
              <span className="tag">REACT</span>
              <span className="tag">NEXT.JS</span>
              <span className="tag">TYPESCRIPT</span>
            </div>
          </motion.div>

          <motion.div 
            className="hero-visual"
            style={{
              rotateX: rotateXSpring,
              rotateY: rotateYSpring,
              transformStyle: "preserve-3d"
            }}
          >
            <div className="hero-image-container">
              <div className="hero-image-frame">
                <div className="hero-image-placeholder">
                  <Terminal size={80} />
                </div>
              </div>
              <div className="corner-tl"></div>
              <div className="corner-tr"></div>
              <div className="corner-bl"></div>
              <div className="corner-br"></div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span>SCROLL</span>
          <div className="scroll-line"></div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="stats-section">
        <div className="stats-grid">
          <motion.div className="stat-item" style={{ y: y1 }}>
            <span className="stat-number">5+</span>
            <span className="stat-label">YEARS EXP</span>
          </motion.div>
          <motion.div className="stat-item" style={{ y: y2 }}>
            <span className="stat-number">50+</span>
            <span className="stat-label">PROJECTS</span>
          </motion.div>
          <motion.div className="stat-item" style={{ y: y3 }}>
            <span className="stat-number">20+</span>
            <span className="stat-label">CLIENTS</span>
          </motion.div>
          <motion.div className="stat-item" style={{ y: y1 }}>
            <span className="stat-number">∞</span>
            <span className="stat-label">COFFEE</span>
          </motion.div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="work-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-number">01</span>
            SELECTED WORK
          </h2>
          <div className="title-line"></div>
        </div>

        <div className="projects-list">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-item"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="project-number">0{project.id}</div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((t, i) => (
                    <span key={i} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
              <div className="project-year">{project.year}</div>
              <motion.div 
                className="project-arrow"
                whileHover={{ x: 10, y: -10 }}
              >
                <ArrowUpRight size={40} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-number">02</span>
            CAPABILITIES
          </h2>
          <div className="title-line"></div>
        </div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percent">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <motion.div 
                  className="skill-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="capabilities-grid">
          <div className="capability-card">
            <Globe size={48} />
            <h4>Web Development</h4>
            <p>Full-stack applications with modern frameworks</p>
          </div>
          <div className="capability-card">
            <Cpu size={48} />
            <h4>System Design</h4>
            <p>Scalable architecture and performance optimization</p>
          </div>
          <div className="capability-card">
            <Layers size={48} />
            <h4>UI Engineering</h4>
            <p>Component libraries and design systems</p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-number">03</span>
            EXPERIENCE
          </h2>
          <div className="title-line"></div>
        </div>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <span className="timeline-period">{exp.period}</span>
                <h3 className="timeline-role">{exp.role}</h3>
                <span className="timeline-company">{exp.company}</span>
                <p className="timeline-description">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-grid">
          <div className="contact-text">
            <h2 className="contact-title">
              LET'S BUILD<br />
              SOMETHING<br />
              <span className="highlight">GREAT</span>
            </h2>
            <p className="contact-subtitle">
              Open for freelance projects and full-time opportunities
            </p>
          </div>

          <div className="contact-links">
            <motion.a 
              href="mailto:kabeerjoshi22@gmail.com"
              className="contact-link"
              whileHover={{ x: 20 }}
            >
              <Mail size={32} />
              <span>kabeerjoshi22@gmail.com</span>
            </motion.a>
            <motion.a 
              href="https://github.com/kabeerx9"
              className="contact-link"
              whileHover={{ x: 20 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={32} />
              <span>github.com/kabeerx9</span>
            </motion.a>
            <motion.a 
              href="https://linkedin.com/in/kabeerjoshi"
              className="contact-link"
              whileHover={{ x: 20 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={32} />
              <span>linkedin.com/in/kabeerjoshi</span>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="brutalist-footer">
        <div className="footer-content">
          <span className="footer-text">© 2024 KABEER JOSHI</span>
          <span className="footer-text">DESIGNED & BUILT WITH INTENT</span>
        </div>
      </footer>
    </div>
  );
}
