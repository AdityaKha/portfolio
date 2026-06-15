import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink } from 'lucide-react';

const categories = [
  {
    id: 'backend',
    label: 'Backend',
    emoji: '⚙️',
    color: 'from-blue-500 to-cyan-500',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/10',
    skills: [
      { name: 'Java 17+', level: 95 },
      { name: 'Spring Boot', level: 92 },
      { name: 'Spring Security', level: 85 },
      { name: 'Spring MVC', level: 88 },
      { name: 'JPA / Hibernate', level: 87 },
      { name: 'Microservices', level: 84 },
      { name: 'Apache Kafka', level: 82 },
      { name: 'REST APIs', level: 95 },
      { name: 'Maven', level: 85 },
      { name: 'Golang', level: 60 },
      { name: 'Dart', level: 55 },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    emoji: '🎨',
    color: 'from-pink-500 to-rose-500',
    borderColor: 'border-pink-500/30',
    bgColor: 'bg-pink-500/10',
    skills: [
      { name: 'Angular', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'RxJS', level: 82 },
      { name: 'JavaScript (ES6)', level: 87 },
      { name: 'HTML5 / CSS3', level: 90 },
      { name: 'SCSS / SASS', level: 80 },
      { name: 'Redux', level: 72 },
      { name: 'Bootstrap', level: 82 },
      { name: 'Vue.js', level: 65 },
      { name: 'NPM', level: 85 },
    ],
  },
  {
    id: 'database',
    label: 'Databases',
    emoji: '🗄️',
    color: 'from-emerald-500 to-green-500',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/10',
    skills: [
      { name: 'PostgreSQL', level: 88 },
      { name: 'MySQL', level: 85 },
      { name: 'MongoDB', level: 75 },
      { name: 'SQL', level: 90 },
      { name: 'NoSQL', level: 72 },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Cloud',
    emoji: '☁️',
    color: 'from-orange-500 to-amber-500',
    borderColor: 'border-orange-500/30',
    bgColor: 'bg-orange-500/10',
    skills: [
      { name: 'Docker', level: 82 },
      { name: 'Kubernetes', level: 70 },
      { name: 'AWS (EC2, S3, CF)', level: 75 },
      { name: 'Git / GitHub', level: 92 },
      { name: 'CI/CD Pipelines', level: 78 },
      { name: 'Linux', level: 80 },
      { name: 'Postman', level: 90 },
    ],
  },
  {
    id: 'concepts',
    label: 'Principles',
    emoji: '🧠',
    color: 'from-purple-500 to-violet-500',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-500/10',
    skills: [
      { name: 'OOP', level: 95 },
      { name: 'SOLID Principles', level: 90 },
      { name: 'DSA', level: 85 },
      { name: 'System Design', level: 82 },
      { name: 'Design Patterns', level: 83 },
      { name: 'HLD / LLD', level: 80 },
      { name: 'TDD', level: 78 },
    ],
  },
];

const allTech = [
  'Java', 'Spring Boot', 'Angular', 'TypeScript', 'Kafka', 'PostgreSQL',
  'Docker', 'Kubernetes', 'AWS', 'Microservices', 'REST APIs', 'JWT',
  'OAuth2', 'JUnit', 'Mockito', 'Jasmine', 'Karma', 'GraphQL', 'MongoDB',
  'Redis', 'Maven', 'Git', 'Linux', 'RxJS', 'SCSS',
];

const LEETCODE_USERNAME = 'adityakha';
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DIFF = [
  { key: 'easy',   total: 880,  label: 'Easy',   color: '#22c55e', bar: 'bg-green-500' },
  { key: 'medium', total: 1850, label: 'Medium',  color: '#f59e0b', bar: 'bg-amber-500' },
  { key: 'hard',   total: 830,  label: 'Hard',    color: '#ef4444', bar: 'bg-red-500'   },
];

const cellColor = (count, isFuture) => {
  if (isFuture || count === 0) return 'rgba(255,255,255,0.04)';
  if (count <= 2) return 'rgba(79,142,247,0.3)';
  if (count <= 4) return 'rgba(79,142,247,0.58)';
  if (count <= 7) return 'rgba(79,142,247,0.82)';
  return '#4F8EF7';
};

const buildGrid = (cal) => {
  const today = new Date();
  const start = new Date(today);
  start.setUTCDate(today.getUTCDate() - 364);
  start.setUTCDate(start.getUTCDate() - start.getUTCDay()); // align to Sunday

  const weeks = [];
  const cur = new Date(start);

  while (cur <= today || cur.getUTCDay() !== 0) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const ts = String(
        Math.floor(Date.UTC(cur.getUTCFullYear(), cur.getUTCMonth(), cur.getUTCDate()) / 1000)
      );
      week.push({ date: new Date(cur), count: cal[ts] ?? 0, isFuture: cur > today });
      cur.setUTCDate(cur.getUTCDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
};

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

function SkillBar({ name, level, color, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-text-secondary text-xs font-medium">{name}</span>
        <span className="text-text-muted text-[10px] font-mono">{level}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 0.9, delay: index * 0.05, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

function DiffBar({ label, solved, total, color, bar, inView }) {
  const pct = total > 0 ? Math.min((solved / total) * 100, 100) : 0;
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span style={{ color }} className="font-semibold">{label}</span>
        <span className="text-text-muted font-mono">{solved} / {total}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${bar}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
    </div>
  );
}

function LeetCodeStats() {
  const [stats, setStats] = useState(null);
  const [calData, setCalData] = useState(null);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  useEffect(() => {
    Promise.all([
      fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}`).then(r => { if (!r.ok) throw new Error(); return r.json(); }),
      fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`).then(r => { if (!r.ok) throw new Error(); return r.json(); }),
      fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/calendar`).then(r => { if (!r.ok) throw new Error(); return r.json(); }),
      fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/badges`).then(r => { if (!r.ok) throw new Error(); return r.json(); }),
    ])
      .then(([profile, solved, cal, badgeData]) => {
        let calendar = {};
        try {
          const raw = cal.submissionCalendar;
          calendar = typeof raw === 'string' ? JSON.parse(raw) : (raw ?? {});
        } catch { /* keep empty */ }
        setStats({
          total: solved.solvedProblem ?? 0,
          easy: solved.easySolved ?? 0,
          medium: solved.mediumSolved ?? 0,
          hard: solved.hardSolved ?? 0,
          ranking: profile.ranking,
        });
        setCalData(calendar);
        setBadges(badgeData?.badges ?? []);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const weeks = useMemo(() => (calData ? buildGrid(calData) : []), [calData]);
  const totalPct = stats ? ((stats.total / 3560) * 100).toFixed(1) : 0;
  const circum = 97.4;

  return (
    <div ref={ref} className="mt-12 glass rounded-2xl border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-lg">
            🏆
          </div>
          <div>
            <h3 className="text-text-primary font-bold text-sm leading-none">LeetCode Progress</h3>
            <p className="text-text-muted text-[11px] mt-0.5">Live stats · {LEETCODE_USERNAME}</p>
          </div>
        </div>
        <a
          href={`https://leetcode.com/u/${LEETCODE_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-text-muted hover:text-accent-blue transition-colors"
        >
          View Profile <ExternalLink size={11} />
        </a>
      </div>

      {/* Stats row */}
      <div className="grid sm:grid-cols-2 gap-6 p-6 pb-5">
        {/* Donut */}
        {loading ? (
          <div className="flex items-center gap-5">
            <div className="w-24 h-24 rounded-full bg-white/5 animate-pulse shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-3 bg-white/5 rounded w-24 animate-pulse" />
              <div className="h-3 bg-white/5 rounded w-16 animate-pulse" />
            </div>
          </div>
        ) : error ? (
          <p className="text-text-muted text-sm self-center">Could not load stats.</p>
        ) : (
          <div className="flex items-center gap-5">
            <div className="relative w-24 h-24 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                <motion.circle
                  cx="18" cy="18" r="15.5"
                  fill="none"
                  stroke="url(#lcGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={circum}
                  initial={{ strokeDashoffset: circum }}
                  animate={inView ? { strokeDashoffset: circum - (totalPct / 100) * circum } : {}}
                  transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
                />
                <defs>
                  <linearGradient id="lcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4F8EF7" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black text-text-primary leading-none">{stats.total}</span>
                <span className="text-[9px] text-text-muted mt-0.5">solved</span>
              </div>
            </div>
            <div>
              {stats.ranking && (
                <>
                  <p className="text-text-muted text-xs">Rank</p>
                  <p className="text-text-primary font-bold font-mono text-lg">{stats.ranking.toLocaleString()}</p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Difficulty bars */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="flex justify-between mb-1.5">
                  <div className="h-3 bg-white/5 rounded w-12" />
                  <div className="h-3 bg-white/5 rounded w-16" />
                </div>
                <div className="h-1.5 bg-white/5 rounded-full" />
              </div>
            ))}
          </div>
        ) : !error && (
          <div className="space-y-4 self-center">
            {DIFF.map(d => (
              <DiffBar
                key={d.key}
                label={d.label}
                solved={stats[d.key]}
                total={d.total}
                color={d.color}
                bar={d.bar}
                inView={inView}
              />
            ))}
          </div>
        )}
      </div>

      {/* Badges + Heatmap — same row on desktop, badges-only on mobile */}
      <div className="px-6 pb-6 border-t border-white/5 pt-5 flex flex-col sm:flex-row gap-5 sm:gap-16 items-start sm:justify-between">

        {/* Badges: 3 visible, horizontal scroll for more */}
        {!loading && !error && badges.length > 0 && (
          <div className="shrink-0">
            <p className="text-text-muted text-[11px] font-mono uppercase tracking-widest mb-3">
              Badges
            </p>
            {/* w-48 = exactly 3 × 56px badges + 2 × 12px gaps = 192px */}
            <div className="w-48 overflow-x-auto pb-1">
              <div className="flex gap-3 min-w-max">
                {badges.map((badge) => (
                  <div key={badge.id} className="flex flex-col items-center gap-1.5 shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 p-1.5 flex items-center justify-center">
                      <img
                        src={badge.iconGif || badge.icon}
                        alt={badge.displayName}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-[10px] text-text-muted text-center w-14 leading-tight line-clamp-2">
                      {badge.displayName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Heatmap */}
        <div className="flex-1 min-w-0">
          <p className="text-text-muted text-[11px] font-mono uppercase tracking-widest mb-3">
            Submission Activity
          </p>
          {loading ? (
            <div className="h-24 bg-white/[0.02] rounded-lg animate-pulse" />
          ) : error ? (
            <p className="text-text-muted text-xs">Heatmap unavailable.</p>
          ) : (
            <>
              <div className="overflow-x-auto pb-1">
                <div className="flex gap-0.5 min-w-max">
                  <div className="flex flex-col gap-0.5 mr-1">
                    <div className="h-3" />
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
                      <div key={d} className="h-2.5 flex items-center">
                        <span className="text-[9px] text-text-muted w-5">
                          {i % 2 === 1 ? d.slice(0, 3) : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                  {weeks.map((week, wi) => {
                    const showMonth =
                      wi === 0 ||
                      week[0].date.getUTCMonth() !== weeks[wi - 1][0].date.getUTCMonth();
                    return (
                      <div key={wi} className="flex flex-col gap-0.5">
                        <div className="h-3 flex items-center">
                          <span className="text-[9px] text-text-muted whitespace-nowrap">
                            {showMonth ? MONTHS[week[0].date.getUTCMonth()] : ''}
                          </span>
                        </div>
                        {week.map((day, di) => (
                          <div
                            key={di}
                            title={
                              day.isFuture
                                ? ''
                                : `${day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}: ${day.count} submission${day.count !== 1 ? 's' : ''}`
                            }
                            className="w-2.5 h-2.5 rounded-sm transition-all duration-150 hover:ring-1 hover:ring-white/20"
                            style={{ background: cellColor(day.count, day.isFuture) }}
                          />
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-3 justify-end">
                <span className="text-[10px] text-text-muted">Less</span>
                {[0, 1, 3, 5, 8].map(n => (
                  <div key={n} className="w-2.5 h-2.5 rounded-sm" style={{ background: cellColor(n, false) }} />
                ))}
                <span className="text-[10px] text-text-muted">More</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('backend');
  const active = categories.find((c) => c.id === activeCategory);

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            {/* <p className="section-label mb-3">03 / Skills</p> */}
            <h2 className="text-4xl sm:text-5xl font-black text-text-primary leading-tight mb-4">
              Tools of the
              <br />
              <span className="gradient-text">Craft</span>
            </h2>
            <p className="text-text-secondary max-w-md mx-auto">
              A breadth of expertise across the full stack, with deep roots in Java and Angular.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                  activeCategory === cat.id
                    ? `${cat.bgColor} ${cat.borderColor} text-text-primary`
                    : 'bg-transparent border-white/5 text-text-muted hover:text-text-secondary hover:bg-white/5'
                }`}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="glass rounded-2xl p-6 sm:p-8 border border-white/5 mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{active.emoji}</span>
                <h3 className="text-text-primary font-bold text-lg">{active.label}</h3>
                <span className="ml-auto text-text-muted text-xs font-mono">
                  {active.skills.length} technologies
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                {active.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={active.color}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div>
            <p className="text-center text-text-muted text-xs font-mono uppercase tracking-widest mb-5">
              Full Technology Repertoire
            </p>
            <div className="overflow-hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />
              <div className="marquee-track">
                {[...allTech, ...allTech].map((tech, i) => (
                  <span key={i} className="skill-tag flex-shrink-0">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <LeetCodeStats />
        </FadeIn>
      </div>
    </section>
  );
}
