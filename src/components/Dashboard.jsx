import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Download, Briefcase, Award, GraduationCap, Boxes } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import YouTubeWidget from './YouTubeWidget';
import GitHubWidget from './GitHubWidget';
import ScrollReveal from './ScrollReveal';

const Dashboard = () => {
    const { language } = useLanguage();
    const t = translations[language];

    const cardStyles = "bg-white dark:bg-zinc-900 border border-border rounded-[2.5rem] p-8 flex flex-col relative overflow-hidden group hover:border-zinc-400 dark:hover:border-zinc-500 transition-all duration-500 shadow-sm hover:shadow-lg";
    const innerCardStyles = "bg-zinc-50 dark:bg-zinc-800 border border-border rounded-[1.5rem] p-5 flex flex-col relative overflow-hidden";

    return (
        <section className="bg-white dark:bg-bg-primary text-text-primary px-6 md:px-12 lg:px-16 pt-32 pb-40 transition-colors duration-300 relative overflow-hidden min-h-screen">
            <div className="container mx-auto relative z-10">

                {/* Section Header */}
                <ScrollReveal>
                    <div className="mb-16">
                        <span className="text-accent-pink font-mono text-sm tracking-[0.3em] uppercase mb-4 block">{t.profile.info}</span>
                        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-2">{t.nav.profile}</h2>
                    </div>
                </ScrollReveal>

                {/* Explicit 2-Column Flex Bento Grid - gap-3 for consistent spacing */}
                <div className="flex flex-col md:flex-row gap-3 items-start">

                    {/* ═══════════ LEFT COLUMN ═══════════ */}
                    <div className="flex flex-col gap-3 flex-1 w-full">

                        {/* PROFILE + nested EDUCATION */}
                        <ScrollReveal>
                            <div className={`${cardStyles} justify-between p-6 md:p-8`}>
                                <div className="flex flex-col gap-5 items-start">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="w-20 h-20 md:w-24 md:h-24 rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 flex-shrink-0 border border-border shadow-sm"
                                    >
                                        <img src="/profile/abdi.jpg" alt="Sulthan Abdi" className="w-full h-full object-cover" />
                                    </motion.div>
                                    <div className="min-w-0">
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 leading-[0.9] tracking-tighter">
                                            Sulthan <br /> Abdi Dzikry
                                        </h3>
                                        <p className="text-accent-pink font-mono text-[10px] font-bold uppercase tracking-widest mb-3">{t.profile.role}</p>
                                        <p className="text-text-secondary text-[10px] md:text-xs font-medium leading-relaxed max-w-xs">
                                            {t.profile.bio}
                                        </p>
                                    </div>
                                </div>

                                {/* Nested Education Bento */}
                                <div className={`${innerCardStyles} mt-5`}>
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="text-[9px] font-mono text-text-muted font-bold uppercase tracking-widest">{t.profile.educationTitle}</h4>
                                        <GraduationCap className="text-accent-pink" size={14} />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 grayscale opacity-60 flex-shrink-0">
                                            <img src="/profile/telkom_logo.png" alt="Telkom" className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="text-sm font-bold leading-none mb-0.5">{t.profile.eduUniv}</h5>
                                            <p className="text-[9px] text-text-muted font-bold tracking-tight mb-1.5">{t.profile.eduDept}</p>
                                            <div className="flex gap-1.5 flex-wrap">
                                                <span className="text-[8px] font-mono font-bold text-accent-pink bg-accent-pink/5 px-2 py-0.5 rounded-full border border-accent-pink/20">2021 — 2025</span>
                                                <span className="text-[8px] font-bold text-text-primary px-2 py-0.5 rounded-full border border-border flex items-center gap-1">
                                                    <Award size={8} className="text-accent-pink" /> 3.52 {t.profile.gpa}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex gap-2 mt-4 flex-wrap">
                                    <a href="mailto:sulthanabdi1@gmail.com" className="flex items-center gap-1.5 px-5 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full text-[9px] font-bold hover:scale-105 transition-all shadow-md">
                                        <Mail size={9} /> {t.profile.contact}
                                    </a>
                                    <a href="https://linkedin.com/in/sulthan-abdi-dzikry" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-5 py-2 border border-border rounded-full text-[9px] font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
                                        <Linkedin size={9} /> LinkedIn
                                    </a>
                                    <a href="/profile/CV_Sulthan_Abdi_Dzikry_ATS.html" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-5 py-2 border border-border rounded-full text-[9px] font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
                                        <Download size={9} /> {t.profile.resume}
                                    </a>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* CERTIFICATIONS */}
                        <ScrollReveal>
                            <div className={`${cardStyles} p-6 md:p-8`}>
                                <div className="flex justify-between items-center mb-5">
                                    <h4 className="text-[9px] font-mono text-text-muted opacity-60 font-bold uppercase tracking-widest">{t.profile.certTitle}</h4>
                                    <Award className="text-accent-pink" size={14} />
                                </div>
                                <div className="space-y-4">
                                    {t.profile.certs.map((cert, i) => (
                                        <div key={i} className="group cursor-default">
                                            <h5 className="text-xs font-bold leading-tight group-hover:text-accent-pink transition-colors">{cert.name}</h5>
                                            <p className="text-[8px] text-text-muted opacity-60 font-bold uppercase mt-1 tracking-widest">{cert.issuer}</p>
                                            {cert.date && <p className="text-[8px] text-accent-pink/70 mt-0.5 font-mono">{cert.date}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* TECHNICAL ARSENAL */}
                        <ScrollReveal>
                            <div className={`${cardStyles} p-6 md:p-8`}>
                                <div className="flex justify-between items-center mb-5">
                                    <h4 className="text-[10px] font-mono text-text-muted font-bold uppercase tracking-widest">{t.profile.technicalArsenal}</h4>
                                    <Boxes className="text-accent-pink" size={16} />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {t.profile.skills.map((skill, i) => (
                                        <motion.span
                                            key={i}
                                            whileHover={{ scale: 1.05, y: -2, backgroundColor: '#18181b', color: '#fff' }}
                                            className="px-3.5 py-2 border border-border rounded-xl text-[9px] font-bold transition-all cursor-default shadow-sm"
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* YOUTUBE PLAYLIST WIDGET */}
                        <ScrollReveal>
                            <YouTubeWidget playlistUrl="https://music.youtube.com/playlist?list=PLIp8n4_3xp0ffGtM6pzcmGvNqzigNaWzY&si=Gyd-2FBr1xsHJacC" />
                        </ScrollReveal>

                    </div>{/* end left column */}

                    {/* ═══════════ RIGHT COLUMN ═══════════ */}
                    <div className="flex flex-col gap-3 flex-1 w-full">

                        {/* PROFESSIONAL EXPERIENCE */}
                        <ScrollReveal>
                            <div className={`${cardStyles} bg-zinc-50/50 dark:bg-zinc-900 p-6 md:p-8`}>
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="text-[10px] font-mono text-text-muted font-bold uppercase tracking-widest">{t.profile.experienceTitle}</h4>
                                    <Briefcase className="text-accent-pink" size={16} />
                                </div>
                                <div className="space-y-6">
                                    {t.profile.jobs.map((job, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ x: 6 }}
                                            className="group border-l-2 border-border/50 pl-5 hover:border-zinc-900 dark:hover:border-zinc-300 transition-all"
                                        >
                                            <h5 className="text-sm font-bold group-hover:text-zinc-900 dark:group-hover:text-white transition-colors leading-none mb-1">{job.company}</h5>
                                            <p className="text-[9px] text-text-muted font-bold mb-2">{job.role} • <span className="text-accent-pink">{job.period}</span></p>
                                            <p className="text-[9px] text-text-muted leading-relaxed font-semibold opacity-75 line-clamp-2">{job.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* ORG EXPERIENCE */}
                        <ScrollReveal>
                            <div className={`${cardStyles} bg-zinc-50/50 dark:bg-zinc-900 p-6 md:p-8`}>
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="text-[10px] font-mono text-text-muted font-bold uppercase tracking-widest">{t.profile.orgTitle}</h4>
                                    <Briefcase className="text-accent-pink" size={16} />
                                </div>
                                <div className="space-y-5">
                                    {t.profile.orgs.map((org, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ x: 6 }}
                                            className="group border-l-2 border-border/50 pl-5 hover:border-zinc-900 dark:hover:border-zinc-300 transition-all"
                                        >
                                            <h5 className="text-xs font-bold group-hover:text-zinc-900 dark:group-hover:text-white transition-colors leading-none mb-1">{org.org}</h5>
                                            <p className="text-[9px] text-text-muted font-bold mb-1.5">{org.role} • <span className="text-accent-pink">{org.period}</span></p>
                                            <p className="text-[9px] text-text-muted leading-relaxed font-semibold opacity-75 line-clamp-2">{org.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* INDUSTRIES */}
                        <ScrollReveal>
                            <div className={`${cardStyles} p-6 md:p-8`}>
                                <div className="flex justify-between items-center mb-5">
                                    <h4 className="text-[10px] font-mono text-text-muted font-bold uppercase tracking-widest">{t.profile.industries}</h4>
                                    <Boxes className="text-accent-pink" size={16} />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {t.profile.industriesList.map((industry, i) => (
                                        <motion.span
                                            key={i}
                                            whileHover={{ scale: 1.05, y: -2, borderColor: '#e45a75' }}
                                            className="px-3.5 py-2 border border-border rounded-xl text-[9px] font-bold transition-all cursor-default shadow-sm"
                                        >
                                            {industry}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* GITHUB WIDGET */}
                        <ScrollReveal>
                            <GitHubWidget username="AbdiDzikry" />
                        </ScrollReveal>

                    </div>{/* end right column */}

                </div>
            </div>

            {/* Background Accent */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-0">
                <div className="absolute left-[50%] top-0 w-px h-full bg-black" />
            </div>
        </section>
    );
};

export default Dashboard;
