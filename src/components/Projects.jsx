import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, ChevronRight, Shield, Database, Globe } from 'lucide-react';

const projects = [
  {
    id: 'compliance',
    title: 'Compliance & Risk Management System',
    subtitle: 'Enterprise Full-Stack Platform',
    company: 'Exsete Consulting',
    icon: <Shield size={24} />,
    color: 'from-blue-500 to-purple-600',
    accentColor: 'text-blue-400',
    bgAccent: 'bg-blue-500/10',
    borderAccent: 'border-blue-500/20',
    category: 'Enterprise',
    stack: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'JWT', 'Kafka', 'Docker', 'AWS'],
    overview:
      'A full-stack compliance platform that centralized compliance workflows, evidence management, and audit tracking for enterprise teams — replacing fragmented manual processes with a unified, secure system.',
    problem:
      'Teams were managing compliance data across spreadsheets and email threads, making audits time-consuming, error-prone, and impossible to trace systematically.',
    solution:
      'Designed a layered Spring Boot architecture with strict role-based authorization, an Evidence Locker for secure document storage, and Kafka-driven notifications to keep teams in sync asynchronously.',
    impact: [
      { icon: '🔐', text: 'JWT + OAuth2 auth securing all user roles and data access' },
      { icon: '📁', text: 'Evidence Locker system enabling structured document storage and retrieval' },
      { icon: '📋', text: 'Full audit logging (who did what, when) for compliance traceability' },
      { icon: '⚡', text: 'Kafka integration for real-time async notifications across workflow stages' },
      { icon: '📈', text: 'Database query optimization via indexing — measurably improved response times' },
      { icon: '📱', text: 'Responsive Angular UI with modular components and clean API contracts' },
    ],
    metrics: [
      { value: 'REST', label: 'API Architecture' },
      { value: 'JWT', label: 'Auth Strategy' },
      { value: 'Kafka', label: 'Event Bus' },
      { value: 'AWS S3', label: 'Document Store' },
    ],
  },
  {
    id: 'mean',
    title: 'MEAN Stack Application',
    subtitle: 'Full-Stack Web Application',
    company: 'Personal Project',
    icon: <Globe size={24} />,
    color: 'from-cyan-500 to-blue-500',
    accentColor: 'text-cyan-400',
    bgAccent: 'bg-cyan-500/10',
    borderAccent: 'border-cyan-500/20',
    category: 'Full-Stack',
    stack: ['MongoDB', 'Express.js', 'Angular', 'Node.js', 'JWT', 'TypeScript'],
    overview:
      'A complete CRUD web application demonstrating full-stack proficiency across the MongoDB, Express, Angular, and Node.js stack — with production-grade authentication and clean architecture.',
    problem:
      'A practical demonstration of end-to-end full-stack ownership, from database modelling through API design to interactive frontend — without relying on frameworks that abstract away the complexity.',
    solution:
      'Built a modular folder structure separating concerns cleanly: feature modules in Angular, service-layer Node.js routes, and JWT-protected endpoints with refresh token flow.',
    impact: [
      { icon: '🔑', text: 'JWT authentication with secure login, registration, and session management' },
      { icon: '📦', text: 'Modular Angular architecture with lazy-loaded feature modules' },
      { icon: '🗃️', text: 'MongoDB schemas with proper indexing and relationship design' },
      { icon: '🧪', text: 'Clean API contract between frontend and backend teams' },
    ],
    metrics: [
      { value: 'CRUD', label: 'Operations' },
      { value: 'JWT', label: 'Auth' },
      { value: 'NoSQL', label: 'Database' },
      { value: 'REST', label: 'API' },
    ],
  },
  {
    id: 'attendance',
    title: 'Attendance Management System',
    subtitle: 'Desktop Application',
    company: 'Academic Project',
    icon: <Database size={24} />,
    color: 'from-emerald-500 to-green-600',
    accentColor: 'text-emerald-400',
    bgAccent: 'bg-emerald-500/10',
    borderAccent: 'border-emerald-500/20',
    category: 'Desktop',
    stack: ['Java', 'JSP', 'Servlets', 'Oracle SQL', 'JDBC'],
    overview:
      'A desktop-based student attendance tracking system for academic institutions — built with Java server-side technologies, secure credential management, and automated reporting.',
    problem:
      'Manual paper-based attendance tracking was slow, prone to data loss, and offered no reporting visibility for administrators or faculty.',
    solution:
      'Designed a Java Servlet MVC architecture backed by Oracle SQL, with role-separated access for administrators and instructors, and built-in report generation to surface attendance patterns.',
    impact: [
      { icon: '📊', text: 'Built-in reporting for attendance analytics and pattern detection' },
      { icon: '🔒', text: 'Secure credential management with hashed passwords and session tokens' },
      { icon: '🏫', text: 'Supports multiple courses, batches, and instructor roles' },
      { icon: '📋', text: 'Export-ready reports for compliance and parent communication' },
    ],
    metrics: [
      { value: 'Java', label: 'Backend' },
      { value: 'Oracle', label: 'Database' },
      { value: 'MVC', label: 'Pattern' },
      { value: 'JDBC', label: 'Connector' },
    ],
  },
];

function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef  = useRef(null);
  const glareRef = useRef(null);

  const handleTilt = (e) => {
    const card  = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;
    const rect    = card.getBoundingClientRect();
    const cx      = rect.left + rect.width  / 2;
    const cy      = rect.top  + rect.height / 2;
    const rotY    =  (e.clientX - cx) / rect.width  * 10;
    const rotX    = -(e.clientY - cy) / rect.height * 10;
    const gx      = ((e.clientX - rect.left) / rect.width)  * 100;
    const gy      = ((e.clientY - rect.top)  / rect.height) * 100;
    card.style.transition  = 'transform 0.05s linear, box-shadow 0.05s linear';
    card.style.transform   = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.015,1.015,1.015)`;
    card.style.boxShadow   = `0 24px 60px rgba(0,0,0,0.4), 0 0 40px rgba(79,142,247,0.12)`;
    glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.07) 0%, transparent 65%)`;
    glare.style.opacity    = '1';
  };

  const resetTilt = () => {
    const card  = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;
    card.style.transition = 'transform 0.5s cubic-bezier(0.03,0.98,0.52,0.99), box-shadow 0.4s ease';
    card.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    card.style.boxShadow  = '';
    glare.style.opacity   = '0';
  };

  return (
    <FadeIn delay={index * 0.1}>
      <div
        ref={cardRef}
        onMouseMove={handleTilt}
        onMouseLeave={resetTilt}
        className={`glass rounded-2xl border ${
          expanded ? project.borderAccent : 'border-white/5'
        } overflow-hidden transition-colors duration-300 relative`}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        <div
          ref={glareRef}
          className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-opacity duration-200"
          style={{ opacity: 0 }}
        />
        {/* Top section */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}
              >
                {project.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${project.bgAccent} ${project.accentColor} border ${project.borderAccent}`}
                  >
                    {project.category}
                  </span>
                  <span className="text-text-muted text-[10px]">{project.company}</span>
                </div>
                <h3 className="text-text-primary font-bold text-lg leading-tight">
                  {project.title}
                </h3>
                <p className="text-text-muted text-sm">{project.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Overview */}
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            {project.overview}
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {project.metrics.map((m, i) => (
              <div
                key={i}
                className={`rounded-xl ${project.bgAccent} border ${project.borderAccent} px-2 py-2 text-center`}
              >
                <div className={`text-sm font-bold ${project.accentColor}`}>{m.value}</div>
                <div className="text-[10px] text-text-muted leading-tight mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.stack.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-white/5 border border-white/8 text-text-muted"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
              expanded ? project.accentColor : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            {expanded ? 'Show Less' : 'Deep Dive'}
            <motion.span animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronRight size={14} />
            </motion.span>
          </button>
        </div>

        {/* Expanded detail */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="expanded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div className="px-6 pb-6 border-t border-white/5 pt-5 space-y-5">
                {/* Problem */}
                <div>
                  <h4 className="text-text-muted text-xs font-mono uppercase tracking-wider mb-2">
                    → The Problem
                  </h4>
                  <p className="text-text-secondary text-sm leading-relaxed">{project.problem}</p>
                </div>
                {/* Solution */}
                <div>
                  <h4 className="text-text-muted text-xs font-mono uppercase tracking-wider mb-2">
                    → The Solution
                  </h4>
                  <p className="text-text-secondary text-sm leading-relaxed">{project.solution}</p>
                </div>
                {/* Impact */}
                <div>
                  <h4 className="text-text-muted text-xs font-mono uppercase tracking-wider mb-3">
                    → Key Deliverables
                  </h4>
                  <ul className="space-y-2">
                    {project.impact.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-2.5 text-sm text-text-secondary"
                      >
                        <span className="flex-shrink-0 mt-0.5">{item.icon}</span>
                        <span>{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            {/* <p className="section-label mb-3">04 / Projects</p> */}
            <h2 className="text-4xl sm:text-5xl font-black text-text-primary leading-tight mb-4">
              Systems I've
              <br />
              <span className="gradient-text">Architected</span>
            </h2>
            <p className="text-text-secondary max-w-md mx-auto">
              Each project tells a story of a problem solved, a system built, and an impact delivered.
              Click "Deep Dive" for the full case study.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-5 lg:grid-cols-1 max-w-3xl mx-auto">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <FadeIn delay={0.3}>
          <div className="mt-12 text-center">
            <p className="text-text-muted text-sm mb-4">Explore more on GitHub</p>
            <a
              href="https://github.com/AdityaKha"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2 text-sm py-2.5 px-6"
            >
              <ExternalLink size={15} />
              github.com/AdityaKha
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
