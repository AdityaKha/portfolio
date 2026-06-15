import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, MapPin, Calendar, TrendingUp } from 'lucide-react';

const experiences = [
  {
    role: 'Full-Stack Developer',
    company: 'Exsete Consulting Pvt. Ltd.',
    period: 'Apr 2023 – Present',
    location: 'Gurugram, India',
    type: 'Full-time',
    color: 'from-blue-500 to-purple-600',
    tag: 'Current',
    highlights: [
      { icon: '🚀', text: 'Built scalable full-stack features for internal Google applications used by 10,000+ daily active users' },
      { icon: '⚡', text: 'Enhanced REST APIs using Spring Boot with clean layered architecture (Controller → Service → Repository)' },
      { icon: '🔧', text: 'Developed modular Angular modules leveraging RxJS observables and reactive patterns' },
      { icon: '✅', text: 'Improved test coverage by 30% using JUnit, Mockito (backend) and Jasmine, Karma (frontend)' },
      { icon: '🐛', text: 'Reduced production bugs by 30% through systematic refactoring and strict SOLID principle adherence' },
      { icon: '📨', text: 'Implemented event-driven notification workflows using Apache Kafka for asynchronous processing' },
      { icon: '👥', text: 'Mentored junior developers, driving a 20% improvement in overall team delivery velocity' },
    ],
    stack: ['Java 17+', 'Spring Boot', 'Angular', 'Kafka', 'PostgreSQL', 'JWT', 'AWS', 'Docker'],
    impact: [
      { metric: '10K+', label: 'Users Served' },
      { metric: '30%', label: 'Fewer Bugs' },
      { metric: '30%', label: 'More Test Coverage' },
      { metric: '20%', label: 'Team Velocity' },
    ],
  },
  {
    role: 'Associate Software Engineer',
    company: 'DXC Technology',
    period: 'Jun 2022 – Mar 2023',
    location: 'India',
    type: 'Full-time',
    color: 'from-cyan-500 to-blue-500',
    tag: 'Previous',
    highlights: [
      { icon: '🎨', text: 'Created enterprise UI components using Angular, JavaScript, HTML, CSS, and GraphQL for high-traffic applications' },
      { icon: '🔍', text: 'Reduced UI defects by 20% through systematic code reviews and targeted refactoring' },
      { icon: '🎯', text: 'Improved UX consistency and reduced bounce rate by 15% through design system alignment' },
      { icon: '⏱️', text: 'Delivered a production MVP in just 6 weeks through tight cross-functional collaboration with backend and design' },
    ],
    stack: ['Angular', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'GraphQL'],
    impact: [
      { metric: '20%', label: 'Fewer UI Defects' },
      { metric: '15%', label: 'Lower Bounce Rate' },
      { metric: '6 Weeks', label: 'MVP Delivery' },
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

function ExperienceCard({ exp, index }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <FadeIn delay={index * 0.12}>
      <div className="glass rounded-2xl border border-white/5 overflow-hidden card-hover">
        {/* Card header */}
        <button
          className="w-full text-left p-6 flex items-start justify-between gap-4 group"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          <div className="flex items-start gap-4">
            {/* Company initial badge */}
            <div
              className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center text-white font-black text-sm shadow-lg`}
            >
              {exp.company.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="text-text-primary font-bold text-lg leading-tight">
                  {exp.role}
                </h3>
                {exp.tag === 'Current' && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-green-500/15 text-green-400 border border-green-500/30">
                    Current
                  </span>
                )}
              </div>
              <p className="text-accent-blue font-semibold text-sm mb-2">{exp.company}</p>
              <div className="flex flex-wrap items-center gap-3 text-text-muted text-xs">
                <span className="flex items-center gap-1">
                  <Calendar size={11} />
                  {exp.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={11} />
                  {exp.location}
                </span>
              </div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 text-text-muted group-hover:text-text-secondary transition-colors mt-1"
          >
            <ChevronDown size={20} />
          </motion.div>
        </button>

        {/* Expandable content */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div className="px-6 pb-6 border-t border-white/5 pt-5">
                {/* Impact metrics */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {exp.impact.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/5"
                    >
                      <TrendingUp size={12} className="text-green-400" />
                      <span className="text-text-primary font-bold text-sm">{item.metric}</span>
                      <span className="text-text-muted text-xs">{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <ul className="space-y-2.5 mb-6">
                  {exp.highlights.map((h, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed"
                    >
                      <span className="text-base flex-shrink-0 mt-0.5">{h.icon}</span>
                      <span>{h.text}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {exp.stack.map((tech) => (
                    <span key={tech} className="skill-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            {/* <p className="section-label mb-3">02 / Experience</p> */}
            <h2 className="text-4xl sm:text-5xl font-black text-text-primary leading-tight mb-4">
              Where I've
              <br />
              <span className="gradient-text">Made an Impact</span>
            </h2>
            <p className="text-text-secondary max-w-md mx-auto">
              Every role has sharpened a different edge — click each to explore the full story.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
