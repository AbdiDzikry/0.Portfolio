import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Linkedin, Mail, Download, Briefcase, Award, GraduationCap, ArrowRight, BadgeCheck, Users, Zap, Target, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../utils/translations';
import GitHubWidget from '../components/GitHubWidget';

const BentoCard = ({ children, className = '', delay = 0, glow = false }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        setMousePos({
            x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
            y: ((e.clientY - rect.top) / rect.height - 0.5) * 20
        });
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40, rotateX: -5 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
            style={{
                transform: isHovered
                    ? `perspective(1000px) rotateY(${mousePos.x * 0.3}deg) rotateX(${-mousePos.y * 0.3}deg) translateZ(10px)`
                    : 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)',
                transition: 'transform 0.15s ease-out',
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.75)',
                borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(17,17,17,0.08)',
                backdropFilter: 'blur(2rem)',
                boxShadow: isDark
                    ? '0 8px 32px rgba(0,0,0,0.3)'
                    : '0 8px 32px rgba(17,17,17,0.06)'
            }}
            className={`relative rounded-3xl border backdrop-blur-2xl overflow-hidden group ${glow ? (isDark ? 'hover:shadow-[0_0_60px_-12px_rgba(52,211,153,0.3)]' : 'hover:shadow-[0_0_50px_-12px_rgba(52,211,153,0.25)]') : ''} ${className}`}
        >
            {glow && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl ${isDark ? 'bg-emerald-400/15' : 'bg-emerald-400/20'}`} />
                    <div className={`absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl ${isDark ? 'bg-violet-500/15' : 'bg-violet-500/20'}`} />
                </div>
            )}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

const KineticText = ({ text, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    return (
        <span ref={ref} className={`inline-flex overflow-hidden ${className}`}>
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ y: 80, opacity: 0, rotateX: -90 }}
                    animate={inView ? { y: 0, opacity: 1, rotateX: 0 } : {}}
                    transition={{ duration: 0.5, delay: delay + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                    style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
};

const SkillPill = ({ skill, index }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [isHovered, setIsHovered] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.03 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative"
        >
            <div
                className="px-4 py-2.5 rounded-full text-xs font-bold cursor-default transition-all duration-300 border"
                style={{
                    background: isHovered
                        ? `linear-gradient(135deg, rgba(52,211,153,${isDark ? 0.15 : 0.25 + index * 0.02}), rgba(139,92,246,${isDark ? 0.15 : 0.25 + index * 0.02}))`
                        : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(17,17,17,0.04)',
                    borderColor: isHovered ? 'rgba(52,211,153,0.4)' : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(17,17,17,0.1)',
                    color: isHovered ? '#10b981' : 'var(--text-primary)',
                    transform: isHovered ? 'translateY(-3px) scale(1.05)' : 'translateY(0) scale(1)',
                    boxShadow: isHovered ? '0 10px 40px -12px rgba(52,211,153,0.3)' : 'none'
                }}
            >
                {skill}
            </div>
        </motion.div>
    );
};

const TimelineItem = ({ job, index }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const colors = ['emerald', 'violet', 'pink', 'amber', 'sky', 'rose'];
    const color = colors[index % colors.length];
    const colorMap = {
        emerald: { dot: '#34d399', line: 'rgba(52,211,153,0.3)', bg: 'rgba(52,211,153,0.08)' },
        violet: { dot: '#a78bfa', line: 'rgba(167,139,250,0.3)', bg: 'rgba(167,139,250,0.08)' },
        pink: { dot: '#f472b6', line: 'rgba(244,114,182,0.3)', bg: 'rgba(244,114,182,0.08)' },
        amber: { dot: '#fbbf24', line: 'rgba(251,191,36,0.3)', bg: 'rgba(251,191,36,0.08)' },
        sky: { dot: '#38bdf8', line: 'rgba(56,189,248,0.3)', bg: 'rgba(56,189,248,0.08)' },
        rose: { dot: '#fb7185', line: 'rgba(251,113,133,0.3)', bg: 'rgba(251,113,133,0.08)' }
    };
    const c = colorMap[color];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative group"
        >
            <div className="flex gap-4">
                <div className="flex flex-col items-center flex-shrink-0">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.2, type: 'spring' }}
                        className="w-3 h-3 rounded-full mt-1.5"
                        style={{ backgroundColor: c.dot, boxShadow: `0 0 20px ${c.dot}50` }}
                    />
                    {index < 5 && <div className="w-px flex-1 min-h-[40px]" style={{ background: `linear-gradient(to bottom, ${c.line}, transparent)` }} />}
                </div>
                <div className="flex-1 pb-6">
                    <div
                        className="rounded-2xl p-5 border transition-all duration-300 group-hover:-translate-y-1"
                        style={{ background: c.bg, borderColor: `${c.dot}20`, backdropFilter: 'blur(1rem)' }}
                    >
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                            <h3 className={`font-bold text-text-primary transition-colors ${isDark ? 'group-hover:text-emerald-400' : 'group-hover:text-emerald-600'}`} style={{ fontVariationSettings: '"wght" 700' }}>
                                {job.company}
                            </h3>
                            <span
                                className="text-[10px] font-mono px-3 py-1 rounded-full font-bold"
                                style={{ color: c.dot, background: `${c.dot}15` }}
                            >
                                {job.period}
                            </span>
                        </div>
                        <p className="text-xs text-text-secondary font-semibold mb-1.5">{job.role}</p>
                        <p className="text-[11px] text-text-muted leading-relaxed">{job.desc}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const ProfileV2 = () => {
    const { language } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const t = translations[language];
    const p = t.profile;
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
    const springProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });

    return (
        <section className={`relative min-h-screen text-text-primary overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#0a0a0f]' : 'bg-[#f6f7f4]'}`}>

            {/* ═══════════ AMBIENT BACKGROUND ═══════════ */}
            <div className="pointer-events-none fixed inset-0 z-0">
                <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] animate-pulse ${isDark ? 'bg-emerald-500/8' : 'bg-emerald-400/15'}`} style={{ animationDuration: '8s' }} />
                <div className={`absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] animate-pulse ${isDark ? 'bg-violet-500/8' : 'bg-violet-400/15'}`} style={{ animationDuration: '12s' }} />
                <div className={`absolute bottom-0 left-1/2 w-[600px] h-[600px] rounded-full blur-[150px] animate-pulse ${isDark ? 'bg-pink-500/5' : 'bg-pink-400/12'}`} style={{ animationDuration: '15s' }} />
                {/* Grid pattern */}
                <div className={`absolute inset-0 ${isDark ? 'opacity-[0.02]' : 'opacity-[0.03]'}`} style={{
                    backgroundImage: `linear-gradient(rgba(${isDark ? '255,255,255' : '0,0,0'},0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(${isDark ? '255,255,255' : '0,0,0'},0.1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }} />
            </div>

            {/* ═══════════ SCROLL PROGRESS ═══════════ */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left"
                style={{
                    scaleX: springProgress,
                    background: 'linear-gradient(90deg, #34d399, #a78bfa, #f472b6)'
                }}
            />

            {/* ═══════════ HERO ═══════════ */}
            <motion.div
                ref={heroRef}
                style={{ y: heroY, opacity: heroOpacity }}
                className="relative z-10 pt-32 pb-16 px-6 md:px-12 lg:px-16"
            >
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">

                        {/* Avatar + Identity */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="relative"
                        >
                            <div className={`w-40 h-40 md:w-52 md:h-52 rounded-3xl overflow-hidden border-2 shadow-2xl shadow-emerald-500/20 relative ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                                <img src="/profile/abdi.jpg" alt="Sulthan Abdi" className="w-full h-full object-cover" />
                                <div className={`absolute inset-0 bg-gradient-to-t to-transparent ${isDark ? 'from-black/40' : 'from-black/20'}`} />
                            </div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5, type: 'spring' }}
                                className="absolute -bottom-3 -right-3 w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/40"
                            >
                                <BadgeCheck size={24} className="text-white" />
                            </motion.div>
                        </motion.div>

                        {/* Text */}
                        <div className="flex-1 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-mono uppercase tracking-widest mb-6 ${isDark ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600'}`}
                            >
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                {p.openToWork}
                            </motion.div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-6" style={{ fontVariationSettings: '"wght" 800' }}>
                                <KineticText text="Sulthan" className="block" />
                                <KineticText text="Abdi" className={`block ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} delay={0.3} />
                                <KineticText text="Dzikry" className="block" delay={0.6} />
                            </h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.5 }}
                                className={`text-sm md:text-base leading-relaxed max-w-lg mb-8 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}
                                style={{ fontVariationSettings: '"wght" 400' }}
                            >
                                {p.bio}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2, duration: 0.5 }}
                                className="flex flex-wrap gap-3 justify-center lg:justify-start"
                            >
                                <a href="mailto:sulthanabdi1@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 text-black text-sm font-bold hover:bg-emerald-400 transition-colors hover:scale-105 active:scale-95 transform">
                                    <Mail size={16} /> {p.contact}
                                </a>
                                <a href="https://linkedin.com/in/sulthan-abdi-dzikry" target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl border text-sm font-bold transition-colors ${isDark ? 'border-white/10 text-white hover:bg-white/5' : 'border-black/10 text-zinc-900 hover:bg-black/5'}`}>
                                    <Linkedin size={16} /> LinkedIn
                                </a>
                                <a href="/profile/CV_Sulthan_Abdi_Dzikry_ATS.html" target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl border text-sm font-bold transition-colors ${isDark ? 'border-white/10 text-white hover:bg-white/5' : 'border-black/10 text-zinc-900 hover:bg-black/5'}`}>
                                    <Download size={16} /> {p.resume}
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ═══════════ MAIN CONTENT ═══════════ */}
            <div className="relative z-10 px-6 md:px-12 lg:px-16 pb-32">
                <div className="container mx-auto max-w-6xl">

                    {/* ═══════ BENTO GRID: STATS ═══════ */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        {[
                            { num: p.jobs.length, label: p.experienceTitle.split(' ')[0], icon: Briefcase, color: '#10b981' },
                            { num: p.certs.length, label: p.certTitle.split(' ')[0], icon: Award, color: '#8b5cf6' },
                            { num: p.industriesList.length, label: p.industries, icon: Layers, color: '#ec4899' },
                            { num: p.skills.length, label: p.technicalArsenal.split(' ')[0], icon: Zap, color: '#f59e0b' }
                        ].map((stat, i) => (
                            <BentoCard key={i} delay={i * 0.08} glow>
                                <div className="p-5 text-center">
                                    <stat.icon size={18} className="mx-auto mb-3 opacity-50" style={{ color: stat.color }} />
                                    <div className="text-3xl font-bold mb-1" style={{ color: stat.color, fontVariationSettings: '"wght" 800' }}>
                                        {stat.num}
                                    </div>
                                    <div className={`text-[9px] uppercase tracking-[0.2em] font-bold ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>{stat.label}</div>
                                </div>
                            </BentoCard>
                        ))}
                    </div>

                    {/* ═══════ TWO COLUMN BENTO ═══════ */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-12">

                        {/* LEFT COLUMN */}
                        <div className="lg:col-span-7 flex flex-col gap-4">

                            {/* Education */}
                            <BentoCard delay={0.1} glow>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-5">
                                        <GraduationCap size={18} className="text-emerald-400" />
                                        <h3 className={`text-[11px] font-mono uppercase tracking-[0.2em] font-bold ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>{p.educationTitle}</h3>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center overflow-hidden ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                                            <img src="/profile/telkom_logo.png" alt="Telkom" className="w-full h-full object-contain p-2 grayscale opacity-70" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-text-primary" style={{ fontVariationSettings: '"wght" 700' }}>{p.eduUniv}</h4>
                                            <p className={`text-[11px] mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{p.eduDept}</p>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <span className={`text-[9px] font-mono px-2.5 py-1 rounded-full border font-bold ${isDark ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : 'text-emerald-600 bg-emerald-400/10 border-emerald-400/30'}`}>2021 — 2025</span>
                                                <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 ${isDark ? 'text-zinc-300 border-white/10' : 'text-zinc-700 border-black/10'}`}>
                                                    <Award size={9} className="text-emerald-400" /> {p.gpa} 3.52
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </BentoCard>

                            {/* Experience Timeline */}
                            <BentoCard delay={0.2}>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Briefcase size={18} className="text-emerald-400" />
                                        <h3 className={`text-[11px] font-mono uppercase tracking-[0.2em] font-bold ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>{p.experienceTitle}</h3>
                                    </div>
                                    <div className="space-y-0">
                                        {p.jobs.map((job, i) => (
                                            <TimelineItem key={i} job={job} index={i} />
                                        ))}
                                    </div>
                                </div>
                            </BentoCard>

                            {/* Organizations */}
                            <BentoCard delay={0.3}>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-5">
                                        <Users size={18} className="text-violet-400" />
                                        <h3 className={`text-[11px] font-mono uppercase tracking-[0.2em] font-bold ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>{p.orgTitle}</h3>
                                    </div>
                                    <div className="space-y-3">
                                        {p.orgs.map((org, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.05 }}
                                                className={`flex items-center gap-4 rounded-xl border px-4 py-3 transition-all group ${isDark
                                                    ? 'bg-white/[0.03] border-white/[0.06] hover:border-violet-400/30 hover:bg-violet-400/5'
                                                    : 'bg-black/[0.02] border-black/[0.06] hover:border-violet-500/40 hover:bg-violet-500/5'}`}
                                            >
                                                <span className="w-9 h-9 rounded-xl bg-violet-400/10 text-violet-400 flex items-center justify-center flex-shrink-0 font-bold text-[10px]">
                                                    {org.role.slice(0, 2).toUpperCase()}
                                                </span>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className={`text-xs font-bold transition-colors ${isDark ? 'text-text-primary group-hover:text-violet-400' : 'text-text-primary group-hover:text-violet-600'}`}>{org.org}</h4>
                                                    <p className={`text-[10px] ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>{org.role} • <span className="text-violet-400 font-mono">{org.period}</span></p>
                                                </div>
                                                <ArrowRight size={12} className={`opacity-0 group-hover:opacity-100 group-hover:text-violet-400 transition-all ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`} />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </BentoCard>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="lg:col-span-5 flex flex-col gap-4">

                            {/* Skills Bento Grid */}
                            <BentoCard delay={0.15} glow>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-5">
                                        <Zap size={18} className="text-amber-400" />
                                        <h3 className={`text-[11px] font-mono uppercase tracking-[0.2em] font-bold ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>{p.technicalArsenal}</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2.5">
                                        {p.skills.map((skill, i) => (
                                            <SkillPill key={i} skill={skill} index={i} />
                                        ))}
                                    </div>
                                </div>
                            </BentoCard>

                            {/* Certifications */}
                            <BentoCard delay={0.25}>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-5">
                                        <Award size={18} className="text-pink-400" />
                                        <h3 className={`text-[11px] font-mono uppercase tracking-[0.2em] font-bold ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>{p.certTitle}</h3>
                                    </div>
                                    <div className="space-y-3">
                                        {p.certs.map((cert, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.05 }}
                                                className={`rounded-xl border p-4 transition-all group ${isDark
                                                    ? 'bg-white/[0.03] border-white/[0.06] hover:border-pink-400/30 hover:bg-pink-400/5'
                                                    : 'bg-black/[0.02] border-black/[0.06] hover:border-pink-500/40 hover:bg-pink-500/5'}`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <BadgeCheck size={16} className="text-pink-400 mt-0.5 flex-shrink-0" />
                                                    <div>
                                                        <h4 className={`text-xs font-bold leading-tight transition-colors ${isDark ? 'text-text-primary group-hover:text-pink-400' : 'text-text-primary group-hover:text-pink-600'}`}>{cert.name}</h4>
                                                        <p className={`text-[9px] uppercase tracking-widest mt-1 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>{cert.issuer}</p>
                                                        {cert.date && <p className="text-[9px] text-pink-400 font-mono mt-1">{cert.date}</p>}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </BentoCard>

                            {/* Industries */}
                            <BentoCard delay={0.35}>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-5">
                                        <Target size={18} className="text-sky-400" />
                                        <h3 className={`text-[11px] font-mono uppercase tracking-[0.2em] font-bold ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>{p.industries}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {p.industriesList.map((ind, i) => {
                                            const colors = ['from-emerald-500/20 to-emerald-500/5 border-emerald-500/20', 'from-violet-500/20 to-violet-500/5 border-violet-500/20', 'from-pink-500/20 to-pink-500/5 border-pink-500/20', 'from-amber-500/20 to-amber-500/5 border-amber-500/20', 'from-sky-500/20 to-sky-500/5 border-sky-500/20', 'from-rose-500/20 to-rose-500/5 border-rose-500/20'];
                                            return (
                                                <motion.span
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className={`px-3.5 py-2 rounded-full bg-gradient-to-r border text-[10px] font-bold ${colors[i % colors.length]} ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}
                                                >
                                                    {ind}
                                                </motion.span>
                                            );
                                        })}
                                    </div>
                                </div>
                            </BentoCard>

                            {/* GitHub Widget */}
                            <BentoCard delay={0.4}>
                                <div className="p-1">
                                    <GitHubWidget username="AbdiDzikry" followers={873} />
                                </div>
                            </BentoCard>
                        </div>
                    </div>

                    {/* ═══════ FOOTER CTA ═══════ */}
                    <BentoCard delay={0.5} glow>
                        <div className="p-8 md:p-12 text-center relative overflow-hidden">
                            <div className={`absolute inset-0 bg-gradient-to-br via-transparent ${isDark ? 'from-emerald-500/10 to-violet-500/10' : 'from-emerald-400/10 to-violet-400/10'}`} />
                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-text-primary" style={{ fontVariationSettings: '"wght" 800' }}>
                                    <KineticText text={p.role} />
                                </h2>
                                <p className={`text-sm max-w-md mx-auto mb-8 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{p.bioSub}</p>
                                <a href="mailto:sulthanabdi1@gmail.com" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 text-black text-sm font-bold hover:bg-emerald-400 transition-colors hover:scale-105 active:scale-95 transform">
                                    <Mail size={18} /> {p.contact}
                                </a>
                            </div>
                        </div>
                    </BentoCard>
                </div>
            </div>
        </section>
    );
};

export default ProfileV2;
