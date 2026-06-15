import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Cpu, Layers, Users, Zap } from 'lucide-react';

const pillars = [
  {
    icon: <Layers size={22} />,
    title: 'Full-Stack Depth',
    desc: 'From database schema to pixel-perfect UI — I own the entire vertical slice, reducing handoff friction and shipping faster.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: <Cpu size={22} />,
    title: 'Systems Thinking',
    desc: 'Kafka-driven event architectures, layered Spring Boot services, and horizontally scalable microservices that stay reliable under load.',
    color: 'from-purple-500 to-violet-500',
  },
  {
    icon: <Zap size={22} />,
    title: 'Quality Culture',
    desc: 'SOLID principles, 30% higher test coverage with JUnit & Jasmine, and consistent production-bug reduction through disciplined refactoring.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: <Users size={22} />,
    title: 'Engineering Leadership',
    desc: 'Mentored junior developers and drove a 20% improvement in team velocity by fostering best practices and clear technical communication.',
    color: 'from-green-500 to-emerald-500',
  },
];

const timeline = [
  { year: '2018', event: 'Started B.Tech in Information Technology at ABES Engineering College' },
  { year: '2022', event: 'Graduated with CGPA 8.17 — began career at DXC Technology' },
  { year: '2023', event: 'Joined Exsete Consulting, building tools for 10,000+ Google users' },
  { year: '2024', event: 'Led full-stack compliance platform with Kafka event-driven architecture' },
  { year: '2026', event: 'Continuing to architect scalable systems and mentor engineers' },
];

function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <FadeIn>
          <div className="text-center mb-16">
            {/* <p className="section-label mb-3">01 / About</p> */}
            <h2 className="text-4xl sm:text-5xl font-black text-text-primary leading-tight mb-4">
              The Engineer
              <br />
              <span className="gradient-text">Behind the Code</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto leading-relaxed">
              I don't just write code — I craft systems that perform, architectures that endure,
              and products that delight the people who use them.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Story */}
          <FadeIn delay={0.1}>
            <div className="space-y-5 text-text-secondary leading-relaxed">
              <p>
                My journey began with a single question:{' '}
                <em className="text-text-primary not-italic font-medium">
                  "How do I build something people actually use?"
                </em>{' '}
                That question drove me through my B.Tech in Information Technology and has guided
                every technical decision since.
              </p>
              <p>
                At{' '}
                <span className="text-accent-blue font-semibold">DXC Technology</span>, I cut my
                teeth on high-traffic enterprise UIs — learning that every millisecond and every
                defect matters. I reduced UI defects by 20% and shipped an MVP in just 6 weeks by
                building trust between design, backend, and frontend teams.
              </p>
              <p>
                Today, at{' '}
                <span className="text-accent-blue font-semibold">Exsete Consulting</span>, I build
                full-stack features for internal Google applications serving{' '}
                <span className="text-text-primary font-semibold">10,000+ users</span> daily. I
                design event-driven pipelines with Apache Kafka, enforce security with JWT and
                OAuth2, and continuously push code quality higher.
              </p>
              <p>
                Beyond technical skills, I believe great engineers are multipliers — so I invest in
                mentoring, code review culture, and documentation that outlasts any single developer.
              </p>
            </div>
          </FadeIn>

          {/* Career timeline */}
          <FadeIn delay={0.2}>
            <div className="relative pl-6">
              <div className="absolute left-0 top-0 bottom-0 w-px timeline-line opacity-30" />
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative mb-8 last:mb-0"
                >
                  <div className="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-accent-blue border-2 border-bg-primary shadow-[0_0_8px_rgba(79,142,247,0.6)]" />
                  <div className="glass rounded-xl px-4 py-3 border border-white/5 hover:border-accent-blue/20 transition-colors">
                    <span className="section-label text-accent-blue text-[11px]">{item.year}</span>
                    <p className="text-text-secondary text-sm mt-1 leading-snug">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="glass rounded-2xl p-5 border border-white/5 card-hover h-full">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white mb-4`}
                >
                  {pillar.icon}
                </div>
                <h3 className="text-text-primary font-semibold text-sm mb-2">{pillar.title}</h3>
                <p className="text-text-muted text-xs leading-relaxed">{pillar.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
