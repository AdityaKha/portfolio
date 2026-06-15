import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, ArrowDown, ExternalLink } from 'lucide-react';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const roles = [
  'Senior Full-Stack Developer',
  'Java & Spring Boot Expert',
  'Angular Architect',
  'Distributed Systems Builder',
  'Kafka & Event-Driven Dev',
];

const stats = [
  { value: '4+', label: 'Years Experience' },
  { value: '350+', label: 'LeetCode Problems' },
  { value: '10K+', label: 'Users Impacted' },
  { value: '30%', label: 'Bug Reduction' },
];

const floatingBadges = [
  { label: 'Java 17+', color: 'from-orange-500 to-red-500', delay: 0 },
  { label: 'Spring Boot', color: 'from-green-500 to-emerald-600', delay: 0.4 },
  { label: 'Angular', color: 'from-red-500 to-pink-500', delay: 0.8 },
  { label: 'Apache Kafka', color: 'from-gray-600 to-slate-700', delay: 1.2 },
  { label: 'PostgreSQL', color: 'from-blue-500 to-cyan-600', delay: 1.6 },
  { label: 'Docker', color: 'from-blue-400 to-sky-600', delay: 2.0 },
  { label: 'AWS', color: 'from-yellow-500 to-orange-500', delay: 2.4 },
  { label: 'Kubernetes', color: 'from-blue-600 to-indigo-600', delay: 2.8 },
];

function TypewriterText({ words }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [wait, setWait] = useState(false);

  useEffect(() => {
    if (wait) {
      const t = setTimeout(() => setWait(false), 1800);
      return () => clearTimeout(t);
    }
    const word = words[index];
    if (!deleting) {
      if (displayed.length < word.length) {
        const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setDeleting(true), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
        return () => clearTimeout(t);
      } else {
        setDeleting(false);
        setWait(true);
        setIndex((i) => (i + 1) % words.length);
      }
    }
  }, [displayed, deleting, index, words, wait]);

  return (
    <span className="gradient-text">
      {displayed}
      <span className="animate-pulse text-accent-blue">|</span>
    </span>
  );
}

export default function Hero() {
  const canvasRef = useRef(null);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 142, 247, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(79, 142, 247, ${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg">
      {/* Background glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-text-secondary font-medium">
                Available for new opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-text-primary leading-[1.05] tracking-tight mb-4"
            >
              Aditya
              <br />
              <span className="gradient-text">Khandelwal</span>
            </motion.h1>

            {/* Role typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl sm:text-2xl font-semibold text-text-secondary mb-6 h-8"
            >
              <TypewriterText words={roles} />
            </motion.div>

            {/* Summary */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="text-text-secondary leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Full-Stack Developer with{' '}
              <span className="text-text-primary font-semibold">~4 years</span> of experience
              crafting enterprise-grade applications. I specialize in{' '}
              <span className="text-accent-blue font-medium">Java, Spring Boot</span>, and{' '}
              <span className="text-accent-blue font-medium">Angular</span> — building systems
              that scale to{' '}
              <span className="text-text-primary font-semibold">10,000+ users</span>.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8"
            >
              <button
                className="btn-primary text-sm py-3 px-6"
                onClick={() =>
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <span className="flex items-center gap-2">
                  View My Work <ExternalLink size={14} />
                </span>
              </button>
              <button
                className="btn-outline text-sm py-3 px-6"
                onClick={() =>
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Get In Touch
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              {[
                {
                  icon: <GithubIcon />,
                  href: 'https://github.com/AdityaKha',
                  label: 'GitHub',
                },
                {
                  icon: <LinkedinIcon />,
                  href: 'https://linkedin.com/in/aditya-kha',
                  label: 'LinkedIn',
                },
                {
                  icon: <Code2 size={18} />,
                  href: 'https://leetcode.com/u/adityakha',
                  label: 'LeetCode',
                },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center text-text-secondary hover:text-accent-blue hover:border-accent-blue/30 border border-transparent transition-all duration-200 hover:-translate-y-0.5"
                >
                  {icon}
                </a>
              ))}
              <span className="text-text-muted text-xs font-mono ml-1">
                @AdityaKha
              </span>
            </motion.div>
          </div>

          {/* Right: floating tech orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative w-72 h-72 md:w-96 md:h-96 flex-shrink-0 hidden lg:block"
          >
            {/* Center circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-28 h-28 rounded-2xl glass border border-white/10 flex items-center justify-center shadow-lg">
                <span className="text-4xl font-black gradient-text">AK</span>
              </div>
            </div>

            {/* Orbit ring 1 */}
            <div className="absolute inset-8 rounded-full border border-white/5 animate-spin-slow" />
            {/* Orbit ring 2 */}
            <div
              className="absolute inset-4 rounded-full border border-white/5"
              style={{ animation: 'spin 30s linear infinite reverse' }}
            />

            {/* Orbiting badges */}
            {floatingBadges.map((badge, i) => {
              const angle = (i / floatingBadges.length) * 2 * Math.PI - Math.PI / 2;
              const radius = 155;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + badge.delay * 0.15, type: 'spring', stiffness: 200 }}
                  className="absolute"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className={`px-2.5 py-1 rounded-full bg-gradient-to-r ${badge.color} text-white text-[10px] font-bold shadow-lg whitespace-nowrap`}
                  >
                    {badge.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-bg-primary/80 px-6 py-5 text-center hover:bg-white/5 transition-colors"
            >
              <div className="text-3xl font-black gradient-text-cyan mb-1">{stat.value}</div>
              <div className="text-xs text-text-muted font-medium uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
      >
        {/* <span className="text-xs font-mono tracking-widest uppercase">Scroll</span> */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
