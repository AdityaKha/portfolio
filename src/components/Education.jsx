import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Award } from 'lucide-react';

const certs = [
  { name: 'Spring Boot & Microservices', issuer: 'Udemy', icon: '⚙️', color: 'from-green-500 to-emerald-600' },
  { name: 'MEAN Stack Development', issuer: 'Udemy', icon: '🌐', color: 'from-cyan-500 to-blue-500' },
  { name: 'Angular Framework', issuer: 'Udemy', icon: '🔴', color: 'from-red-500 to-pink-600' },
  { name: 'HTML, CSS & JavaScript', issuer: 'Johns Hopkins University', icon: '🎓', color: 'from-blue-600 to-indigo-600' },
  { name: 'C Programming', issuer: 'NPTEL', icon: '💻', color: 'from-amber-500 to-orange-500' },
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

export default function Education() {
  return (
    <section id="education" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            {/* <p className="section-label mb-3">05 / Education</p> */}
            <h2 className="text-4xl sm:text-5xl font-black text-text-primary leading-tight mb-4">
              Knowledge
              <br />
              <span className="gradient-text">Foundation</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Education card */}
          <FadeIn delay={0.1}>
            <div>
              <div className="flex items-center gap-2 mb-5">
                <GraduationCap size={18} className="text-accent-blue" />
                <h3 className="text-text-primary font-bold text-base">Academic Background</h3>
              </div>
              <div className="glass rounded-2xl p-6 border border-white/5 card-hover relative overflow-hidden">
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-3xl" />

                <div className="relative">
                  {/* Degree badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-accent-blue mb-4">
                    🎓 Bachelor of Technology
                  </span>

                  <h4 className="text-text-primary font-bold text-xl leading-tight mb-1">
                    Information Technology
                  </h4>
                  <p className="text-accent-blue font-semibold text-sm mb-3">
                    ABES Engineering College
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mb-5">
                    <div className="flex items-center gap-1.5 text-text-muted text-sm">
                      <span>📅</span>
                      <span>2018 – 2022</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">🏅</span>
                      <span className="text-text-primary font-bold text-sm">CGPA: 8.17</span>
                      <span className="text-text-muted text-xs">/ 10</span>
                    </div>
                  </div>

                  {/* CGPA visual */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-text-muted">
                      <span>Academic Performance</span>
                      <span className="font-semibold text-accent-blue">81.7%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: '81.7%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                  <div className="mt-5 pt-5 border-t border-white/5">
                    <p className="text-text-muted text-xs leading-relaxed">
                      Four years of rigorous study in software engineering, algorithms, database systems,
                      operating systems, and computer networks — forming the technical bedrock for
                      building enterprise-grade applications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Certifications */}
          <FadeIn delay={0.15}>
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Award size={18} className="text-accent-violet" />
                <h3 className="text-text-primary font-bold text-base">Certifications</h3>
              </div>
              <div className="space-y-3">
                {certs.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="glass rounded-xl px-4 py-3.5 border border-white/5 card-hover flex items-center gap-4"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center text-lg flex-shrink-0`}
                    >
                      {cert.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-text-primary font-semibold text-sm leading-tight truncate">
                        {cert.name}
                      </p>
                      <p className="text-text-muted text-xs mt-0.5">{cert.issuer}</p>
                    </div>
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                      <span className="text-green-400 text-[10px]">✓</span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Continuous learning note */}
        <FadeIn delay={0.3}>
          <div className="mt-10 glass rounded-2xl p-5 border border-white/5 flex items-center gap-4">
            <span className="text-2xl">📚</span>
            <p className="text-text-muted text-sm leading-relaxed">
              <span className="text-text-primary font-semibold">Continuously learning — </span>
              staying current with Spring ecosystem updates, cloud-native patterns, and front-end
              performance techniques through documentation, open-source, and hands-on experimentation.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
