'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Rocket, Star, Orbit, Zap, Mail, Github, Linkedin, ChevronRight } from 'lucide-react';

const planets = [
  { name: "React", size: 80, color: "#61dafb", orbit: 150, speed: 20 },
  { name: "Next.js", size: 60, color: "#000", orbit: 250, speed: 30 },
  { name: "TypeScript", size: 70, color: "#3178c6", orbit: 350, speed: 40 },
];

const missions = [
  { id: 1, code: "APOLLO", title: "E-Commerce Platform", year: "2024", status: "COMPLETED" },
  { id: 2, code: "VOYAGER", title: "SaaS Dashboard", year: "2023", status: "COMPLETED" },
  { id: 3, code: "PIONEER", title: "Mobile App", year: "2023", status: "COMPLETED" },
];

export default function RetroFuturePortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  
  const springRotate = useSpring(rotate, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="retro-container">
      {/* Starfield Background */}
      <div className="starfield">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="retro-nav">
        <motion.div 
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
        >
          <Rocket size={24} />
          <span>KJ SPACE</span>
        </motion.div>
        <div className="nav-links">
          {['MISSIONS', 'TECH', 'CONTACT'].map((link) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="nav-link"
              whileHover={{ y: -3 }}
            >
              {link}
            </motion.a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="retro-hero">
        <div className="hero-sun">
          <motion.div
            className="sun-glow"
            animate={{
              boxShadow: [
                "0 0 60px #ff6b35, 0 0 120px #ff6b35",
                "0 0 80px #ff6b35, 0 0 160px #ff6b35",
                "0 0 60px #ff6b35, 0 0 120px #ff6b35",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="sun-core"></div>
          </motion.div>
        </div>

        <motion.div 
          className="hero-content"
          style={{
            x: mousePos.x,
            y: mousePos.y,
          }}
        >
          <motion.span
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            ★ FRONTEND ASTRONAUT ★
          </motion.span>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="title-line">Kabeer</span>
            <span className="title-line">Joshi</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Exploring the digital cosmos with React, Next.js & TypeScript
          </motion.p>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="stat-item">
              <span className="stat-value">5+</span>
              <span className="stat-label">Years in Orbit</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">50+</span>
              <span className="stat-label">Missions</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">20+</span>
              <span className="stat-label">Clients</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Orbiting Planets */}
        <div className="orbit-system">
          {planets.map((planet, index) => (
            <motion.div
              key={planet.name}
              className="orbit-ring"
              style={{
                width: planet.orbit * 2,
                height: planet.orbit * 2,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: planet.speed,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <motion.div
                className="planet"
                style={{
                  width: planet.size,
                  height: planet.size,
                  background: planet.color,
                  top: -planet.size / 2,
                  left: `calc(50% - ${planet.size / 2}px)`,
                }}
                whileHover={{ scale: 1.2 }}
              >
                <span className="planet-name">{planet.name}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Missions Section */}
      <section id="missions" className="missions-section">
        <motion.div 
          className="section-badge"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          MISSION CONTROL
        </motion.div>

        <div className="missions-list">
          {missions.map((mission, index) => (
            <motion.div
              key={mission.id}
              className="mission-card"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ x: 20 }}
            >
              <div className="mission-patch">
                <span>{mission.code}</span>
              </div>
              <div className="mission-info">
                <div className="mission-header">
                  <span className="mission-code">{mission.code}</span>
                  <span className="mission-year">{mission.year}</span>
                </div>
                <h3 className="mission-title">{mission.title}</h3>
                <div className="mission-status">
                  <span className="status-dot"></span>
                  {mission.status}
                </div>
              </div>
              <ChevronRight className="mission-arrow" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="tech-section">
        <div className="tech-container">
          <motion.div
            className="tech-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="tech-badge">PROPULSION SYSTEMS</span>
            <h2>Tech Stack</h2>
          </motion.div>

          <div className="tech-grid">
            {[
              { name: "React", level: 95, icon: "⚛️" },
              { name: "Next.js", level: 92, icon: "▲" },
              { name: "TypeScript", level: 90, icon: "📘" },
              { name: "Node.js", level: 85, icon: "🟢" },
              { name: "GraphQL", level: 80, icon: "◈" },
              { name: "Tailwind", level: 95, icon: "🎨" },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                className="tech-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <span className="tech-icon">{tech.icon}</span>
                <h4>{tech.name}</h4>
                <div className="tech-level">
                  <motion.div
                    className="level-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  />
                </div>
                <span className="level-text">{tech.level}%</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote-section">
        <motion.div
          className="quote-container"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Star className="quote-star" size={40} />
          <blockquote>
            "The future belongs to those who believe in the beauty of their dreams."
          </blockquote>
          <cite>— Eleanor Roosevelt</cite>
        </motion.div>
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
            <span className="contact-badge">TRANSMISSION</span>
            <h2>Establish Contact</h2>
            <p>Ready to launch your next project into orbit?</p>
          </motion.div>

          <div className="contact-channels">
            {[
              { icon: Mail, label: "EMAIL", value: "kabeerjoshi22@gmail.com", href: "mailto:kabeerjoshi22@gmail.com" },
              { icon: Github, label: "GITHUB", value: "@kabeerx9", href: "https://github.com/kabeerx9" },
              { icon: Linkedin, label: "LINKEDIN", value: "Kabeer Joshi", href: "https://linkedin.com/in/kabeerjoshi" },
            ].map((channel, index) => (
              <motion.a
                key={channel.label}
                href={channel.href}
                className="channel-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="channel-icon">
                  <channel.icon size={32} />
                </div>
                <div className="channel-info">
                  <span className="channel-label">{channel.label}</span>
                  <span className="channel-value">{channel.value}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="retro-footer">
        <div className="footer-orbit">
          <motion.div
            className="footer-planet"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <span>🪐</span>
          </motion.div>
        </div>
        <div className="footer-content">
          <p>KJ Space Program © 2024</p>
          <p className="footer-tagline">Exploring the digital frontier</p>
        </div>
      </footer>
    </div>
  );
}
