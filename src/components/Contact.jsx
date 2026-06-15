import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Code2, MapPin, Send, CheckCircle } from 'lucide-react';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const socials = [
  {
    icon: <GithubIcon />,
    label: 'GitHub',
    handle: '@AdityaKha',
    href: 'https://github.com/AdityaKha',
    color: 'hover:border-white/30',
    textColor: 'group-hover:text-white',
  },
  {
    icon: <LinkedinIcon />,
    label: 'LinkedIn',
    handle: 'aditya-kha',
    href: 'https://linkedin.com/in/aditya-kha',
    color: 'hover:border-blue-400/40',
    textColor: 'group-hover:text-blue-400',
  },
  {
    icon: <Code2 size={20} />,
    label: 'LeetCode',
    handle: 'adityakha',
    href: 'https://leetcode.com/u/adityakha',
    color: 'hover:border-orange-400/40',
    textColor: 'group-hover:text-orange-400',
  },
  {
    icon: <Mail size={20} />,
    label: 'Email',
    handle: 'khandelwal.aditya5@gmail.com',
    href: 'mailto:khandelwal.aditya5@gmail.com',
    color: 'hover:border-accent-blue/40',
    textColor: 'group-hover:text-accent-blue',
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

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Build mailto URL — works without a backend, composable on host
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:khandelwal.aditya5@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 800);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            {/* <p className="section-label mb-3">06 / Contact</p> */}
            <h2 className="text-4xl sm:text-5xl font-black text-text-primary leading-tight mb-4">
              Let's Build
              <br />
              <span className="gradient-text">Something Together</span>
            </h2>
            <p className="text-text-secondary max-w-md mx-auto">
              Whether you have a role in mind, a project to discuss, or just want to connect —
              my inbox is always open.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Left info panel */}
          <FadeIn delay={0.1} className="lg:col-span-2">
            <div className="space-y-6">
              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-accent-blue flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-text-primary font-semibold text-sm">Location</p>
                  <p className="text-text-muted text-sm">Gurugram, India</p>
                  <p className="text-text-muted text-xs">Open to remote opportunities</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-accent-violet flex-shrink-0">
                  <span className="text-base">📱</span>
                </div>
                <div>
                  <p className="text-text-primary font-semibold text-sm">Phone</p>
                  <p className="text-text-muted text-sm">+91-9997720565</p>
                </div>
              </div>

              {/* Response time */}
              <div className="glass rounded-2xl p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-semibold">Available Now</span>
                </div>
                <p className="text-text-muted text-xs leading-relaxed">
                  Actively seeking full-stack engineering roles. I typically respond within 24 hours.
                </p>
              </div>

              {/* Social links */}
              <div className="space-y-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-3 p-3 glass rounded-xl border border-white/5 ${s.color} transition-all duration-200 card-hover`}
                  >
                    <span className={`text-text-muted ${s.textColor} transition-colors`}>
                      {s.icon}
                    </span>
                    <div className="min-w-0">
                      <p className={`text-text-secondary text-xs font-semibold ${s.textColor} transition-colors`}>
                        {s.label}
                      </p>
                      <p className="text-text-muted text-[11px] truncate">{s.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right: contact form */}
          <FadeIn delay={0.15} className="lg:col-span-3">
            <div className="glass rounded-2xl p-6 sm:p-8 border border-white/5">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle size={48} className="text-green-400 mb-4" />
                  <h3 className="text-text-primary font-bold text-xl mb-2">Message Sent!</h3>
                  <p className="text-text-muted text-sm">
                    Your default mail app should have opened. Thanks for reaching out — I'll be in
                    touch soon.
                  </p>
                  <button
                    className="mt-6 btn-outline text-sm py-2 px-5"
                    onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-text-muted text-xs font-medium mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-blue/50 focus:bg-blue-500/5 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-text-muted text-xs font-medium mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@company.com"
                        className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-blue/50 focus:bg-blue-500/5 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-text-muted text-xs font-medium mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about the opportunity, project, or just say hi..."
                      className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-blue/50 focus:bg-blue-500/5 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-sm"
                  >
                    <span>{loading ? 'Opening Mail...' : 'Send Message'}</span>
                    <Send size={14} />
                  </button>
                  <p className="text-center text-text-muted text-xs">
                    Or email directly at{' '}
                    <a
                      href="mailto:khandelwal.aditya5@gmail.com"
                      className="text-accent-blue hover:underline"
                    >
                      khandelwal.aditya5@gmail.com
                    </a>
                  </p>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
