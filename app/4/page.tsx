'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Mail, Github, Linkedin } from 'lucide-react';

const articles = [
  {
    id: 1,
    category: "FEATURE",
    title: "The Art of Component Architecture",
    subtitle: "Building scalable design systems",
    readTime: "8 min read",
    image: "architecture"
  },
  {
    id: 2,
    category: "CASE STUDY",
    title: "React Performance Optimization",
    subtitle: "Advanced techniques for speed",
    readTime: "12 min read",
    image: "performance"
  },
  {
    id: 3,
    category: "ESSAY",
    title: "The Future of Frontend",
    subtitle: "Where web development is heading",
    readTime: "6 min read",
    image: "future"
  }
];

const issues = [
  { number: "01", title: "Getting Started", items: ["About", "Experience", "Skills"] },
  { number: "02", title: "Deep Dive", items: ["Projects", "Case Studies", "Writing"] },
  { number: "03", title: "Connect", items: ["Contact", "Social", "Collaborate"] }
];

export default function EditorialPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="editorial-container">
      {/* Navigation */}
      <nav className="editorial-nav">
        <div className="nav-brand">
          <span className="brand-initial">K</span>
          <span className="brand-full">Kabeer Joshi</span>
        </div>
        <div className="nav-menu">
          <span className="menu-label">Menu</span>
          <div className="menu-lines">
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="editorial-hero">
        <motion.div className="hero-content" style={{ opacity }}>
          <div className="hero-meta">
            <span className="meta-date">EST. 2019</span>
            <span className="meta-divider"></span>
            <span className="meta-type">Digital Craftsman</span>
          </div>

          <h1 className="hero-headline">
            <motion.span 
              className="headline-word"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Frontend
            </motion.span>
            <motion.span 
              className="headline-word"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Engineer
            </motion.span>
          </h1>

          <motion.p 
            className="hero-lead"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Specializing in React, Next.js, and TypeScript. 
            Building digital experiences with precision and purpose.
          </motion.p>

          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a href="#work" className="cta-link">
              View Selected Work
              <ArrowUpRight size={20} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div className="hero-image" style={{ y: y1 }}>
          <div className="image-frame">
            <div className="image-placeholder">
              <span className="placeholder-text">KJ</span>
            </div>
          </div>
          <div className="image-caption">
            <span>Issue No. 01</span>
            <span>Portfolio 2024</span>
          </div>
        </motion.div>
      </section>

      {/* Table of Contents */}
      <section className="toc-section">
        <div className="toc-header">
          <span className="toc-label">Contents</span>
          <div className="toc-line"></div>
        </div>

        <div className="toc-grid">
          {issues.map((issue, index) => (
            <motion.div
              key={issue.number}
              className="toc-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="toc-number">{issue.number}</span>
              <h3 className="toc-title">{issue.title}</h3>
              <ul className="toc-list">
                {issue.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Articles */}
      <section id="work" className="articles-section">
        <div className="section-header">
          <span className="section-label">Selected Work</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        <div className="articles-list">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              className="article-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <div className="article-number">0{article.id}</div>
              <div className="article-content">
                <span className="article-category">{article.category}</span>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-subtitle">{article.subtitle}</p>
                <div className="article-meta">
                  <span>{article.readTime}</span>
                  <ArrowUpRight size={16} />
                </div>
              </div>
              <div className="article-image">
                <div className="image-box"></div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote-section">
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <span className="quote-mark">"</span>
          <p className="quote-text">
            Good design is as little design as possible. 
            Less, but better — because it concentrates 
            on the essential aspects.
          </p>
          <cite className="quote-author">— Dieter Rams</cite>
        </motion.blockquote>
      </section>

      {/* Stats Grid */}
      <section className="stats-section">
        <div className="stats-grid">
          {[
            { value: "5+", label: "Years Experience" },
            { value: "50+", label: "Projects Completed" },
            { value: "20+", label: "Happy Clients" },
            { value: "100%", label: "Commitment" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-header">
          <span className="contact-label">Get in Touch</span>
          <h2 className="contact-title">Let's Create Together</h2>
        </div>

        <div className="contact-grid">
          <motion.a
            href="mailto:kabeerjoshi22@gmail.com"
            className="contact-item"
            whileHover={{ x: 10 }}
          >
            <Mail size={24} />
            <div className="contact-info">
              <span className="contact-type">Email</span>
              <span className="contact-value">kabeerjoshi22@gmail.com</span>
            </div>
          </motion.a>

          <motion.a
            href="https://github.com/kabeerx9"
            className="contact-item"
            whileHover={{ x: 10 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={24} />
            <div className="contact-info">
              <span className="contact-type">GitHub</span>
              <span className="contact-value">@kabeerx9</span>
            </div>
          </motion.a>

          <motion.a
            href="https://linkedin.com/in/kabeerjoshi"
            className="contact-item"
            whileHover={{ x: 10 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={24} />
            <div className="contact-info">
              <span className="contact-type">LinkedIn</span>
              <span className="contact-value">Kabeer Joshi</span>
            </div>
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="editorial-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-initial">K</span>
            <span>Kabeer Joshi</span>
          </div>
          <div className="footer-meta">
            <span>© 2024</span>
            <span className="footer-divider">•</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
