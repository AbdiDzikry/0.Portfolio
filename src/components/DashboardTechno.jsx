import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const DashboardTechno = () => {
    const { language } = useLanguage();
    const t = translations[language];

    // Techno Organic Card Styles - Olive Variant
    // Darker, "Tech" borders, "Mossy" glow
    const cardStyles = "bg-zinc-900/80 dark:bg-black/80 backdrop-blur-md rounded-xl border border-stone-600/50 shadow-[0_0_15px_rgba(0,0,0,0.2)] relative overflow-hidden group hover:border-accent-green/50 transition-all duration-300";

    return (
        <section className="bg-stone-900 text-stone-200 px-6 md:px-12 lg:px-16 pb-20 pt-10 min-h-screen relative">
            {/* Background Texture - Circuit Moss */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#5d6248 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-green/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-green/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-end mb-12 border-b border-stone-700 pb-4"
                >
                    <h2 className="text-4xl font-display font-bold text-accent-green tracking-tight">
                        {t.profile.title} <span className="text-sm font-mono text-stone-500 align-top ml-2">v2.1_OLIVE_TECH</span>
                    </h2>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-stone-600 rounded-full" />
                        <div className="w-2 h-2 bg-stone-600 rounded-full" />
                    </div>
                </motion.div>

                {/* Unified Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">

                    {/* 1. PROFILE (Top Left - 2x1) */}
                    <div className={`${cardStyles} col-span-1 md:col-span-2 lg:col-span-2 p-6 flex flex-col md:flex-row items-center md:items-start gap-6`}>
                        {/* Tech Corners */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent-green/50 rounded-tl-lg" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent-green/50 rounded-br-lg" />

                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <span className="text-8xl font-display font-bold text-stone-500">ID</span>
                        </div>

                        <div className="flex-shrink-0 z-10">
                            <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-accent-green/50 shadow-lg relative group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0">
                                <img src="/profile/abdi.jpg" alt="Sulthan Abdi" className="w-full h-full object-cover" />
                                {/* Scanline overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-green/10 to-transparent opacity-30 h-full w-full pointer-events-none" />
                            </div>
                            <div className="mt-4 flex justify-center gap-2">
                                <span className="px-3 py-1 text-[10px] bg-accent-green/10 text-accent-green border border-accent-green/20 font-mono tracking-wider w-full text-center">Open_To_Work</span>
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left z-10">
                            <h3 className="text-2xl font-bold text-stone-200 mb-1 tracking-wide">SULTHAN ABDI <span className="text-accent-green">DZIKRY</span></h3>
                            <p className="text-stone-400 font-mono text-xs mb-3 font-medium border-l-2 border-accent-green pl-2">{t.profile.role}</p>

                            <p className="text-stone-300 text-xs leading-relaxed mb-4 font-light">
                                {t.profile.bio}
                                <br /><br />
                                <span className="opacity-60 font-mono text-[10px]">
                                    // {t.profile.bioSub}
                                </span>
                            </p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                <a
                                    href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=sulthanabdi1@gmail.com&su=Job%20Opportunity%20from%20Portfolio&body=Hi%20Sulthan%2C%0A%0AI%20reviewed%20your%20portfolio%20and%20I'm%20impressed%20with%20your%20work.%20I'd%20like%20to%20discuss%20a%20potential%20job%20opportunity%20with%20you.%0A%0APlease%20let%20me%20know%20your%20availability.%0A%0ABest%20regards%2C%0A%5BName%5D"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-accent-green text-white rounded-sm text-xs font-bold hover:bg-opacity-80 transition-colors uppercase tracking-wider"
                                >
                                    Email_Me
                                </a>
                                <a href="https://www.linkedin.com/in/sulthan-abdi-dzikry/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-stone-600 text-stone-300 rounded-sm text-xs font-medium hover:border-accent-green hover:text-accent-green transition-colors flex items-center gap-2 uppercase tracking-wider bg-black/50">
                                    <Linkedin size={14} />
                                    LinkedIn
                                </a>
                                <a
                                    href="/profile/CV_Sulthan_Abdi_Dzikry_ATS.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 border border-stone-600 text-stone-300 rounded-sm text-xs font-medium hover:border-accent-green hover:text-accent-green transition-colors uppercase tracking-wider bg-black/50"
                                >
                                    Download_CV
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* 2. EXPERIENCE (Top Right - 2x2) */}
                    <div className={`${cardStyles} col-span-1 md:col-span-2 lg:col-span-2 row-span-2 p-6 flex flex-col`}>
                        <div className="absolute right-0 top-0 w-20 h-20 bg-gradient-to-bl from-accent-green/10 to-transparent pointer-events-none" />

                        <div className="flex justify-between items-start mb-6 relative z-10 border-b border-stone-800 pb-2">
                            <h3 className="text-sm font-mono text-accent-green font-bold uppercase tracking-widest">[ EXPERIENCE_LOG ]</h3>
                            <span className="text-xs text-stone-500 font-mono">6_ENTRIES_FOUND</span>
                        </div>

                        <div className="space-y-4 relative z-10 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            {[
                                { company: "PT Dharma Polimetal Tbk.", role: t.profile.role, desc: "Manufacturing Digitalization projects.", period: "Oct 2025 - Present" },
                                { company: "Codetag Studio", role: t.profile.role, desc: "Handling 5 projects end-to-end.", period: "Jul 2025 - Present" },
                                { company: "Telkom Digital Amoeba", role: "UX Researcher Intern", desc: "End-to-end research, quantitative & qualitative analysis.", period: "Dec 2023 - Jan 2024" },
                                { company: "Rakamin Academy", role: "UI/UX Designer Intern", desc: "Optimized travel app UX with 79% feasibility score.", period: "Aug 2023 - Jan 2024" },
                                { company: "Korea Orient Technology", role: "Internship", desc: "Assisted in technical operations.", period: "Oct 2019 - Mar 2020" },
                                { company: "Syntax Community", role: "UI/UX Mentor", desc: "Designed curriculum & executed mentoring sessions.", period: "Jun 2019 - Jun 2020" }
                            ].map((job, idx) => (
                                <div key={idx} className="flex justify-between items-start border-l-2 border-stone-700 hover:border-accent-green pl-4 py-1 transition-colors group/item">
                                    <div>
                                        <h4 className="text-stone-200 font-bold text-sm group-hover/item:text-accent-green transition-colors">{job.company}</h4>
                                        <p className="text-[10px] text-stone-500 uppercase tracking-wide mb-1">{job.role}</p>
                                        <p className="text-xs text-stone-400 font-mono">{job.desc}</p>
                                    </div>
                                    <span className="text-[10px] font-mono text-stone-600 text-right min-w-[80px] mt-1">{job.period}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. EDUCATION (Middle Left - 2x1) */}
                    <div className={`${cardStyles} col-span-1 md:col-span-2 lg:col-span-2 p-6 flex flex-col justify-between`}>
                        <div className="absolute top-4 right-4 text-stone-700 opacity-20 group-hover:opacity-50 transition-opacity">
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                        </div>

                        <div className="z-10 mt-2">
                            <h3 className="text-xs font-mono text-accent-green font-bold mb-2 uppercase tracking-widest">[ ACADEMIC_DATA ]</h3>
                            <h4 className="text-xl font-bold text-stone-200 leading-tight">Telkom University</h4>
                            <p className="text-stone-400 mt-1 text-sm font-mono">B.Eng Informatics</p>
                            <p className="text-xs text-stone-600 mt-1 font-mono">2021 :: 2025</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6 z-10">
                            <div className="bg-black/40 p-3 rounded-sm border border-stone-700 text-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-accent-green/50" />
                                <span className="block text-2xl font-mono font-bold text-accent-green">3.52</span>
                                <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">GPA_SCORE</span>
                            </div>
                            <div className="bg-black/40 p-3 rounded-sm border border-stone-700 text-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-stone-500/50" />
                                <span className="block text-2xl font-mono font-bold text-stone-300">4.0</span>
                                <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">YEARS</span>
                            </div>
                        </div>

                        <div className="flex gap-2 flex-wrap mt-4 z-10">
                            {['Web_Dev', 'Algo', 'Soft_Eng', 'UI/UX'].map((course, i) => (
                                <span key={i} className="text-[10px] px-2 py-1 bg-stone-800 rounded-sm text-stone-400 border border-stone-700 font-mono">
                                    {course}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* 4. ORGANIZATIONAL (Middle Right - 2x2) */}
                    <div className={`${cardStyles} col-span-1 md:col-span-2 lg:col-span-2 row-span-2 p-6 flex flex-col`}>
                        <div className="flex justify-between items-start mb-6 relative z-10 border-b border-stone-800 pb-2">
                            <h3 className="text-sm font-mono text-accent-green font-bold uppercase tracking-widest">[ ORG_ACTIVITIES ]</h3>
                        </div>

                        <div className="space-y-4 relative z-10 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            {[
                                { org: "Dies Natalis Informatics '24", role: "Staff", desc: "Logistics Coordinator", period: "Nov 23" },
                                { org: "PRECOM TELCOMNICA", role: "Staff", desc: "Budget Management", period: "Jun 23" },
                                { org: "KPR Fakultas Informatika", role: "Staff", desc: "Election Support", period: "Apr 23" },
                                { org: "Dies Natalis Informatics '23", role: "Staff", desc: "Security Ops", period: "Nov 22" },
                                { org: "UKM Catur ITTP", role: "PR Staff", desc: "External Comms", period: "Oct 22" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center border border-stone-800 bg-black/20 p-2 rounded-sm hover:border-accent-green/50 transition-colors">
                                    <div>
                                        <h4 className="text-stone-300 font-bold text-xs truncate max-w-[150px]">{item.org}</h4>
                                        <p className="text-[10px] text-stone-500">{item.role}</p>
                                    </div>
                                    <span className="text-[10px] font-mono text-accent-green/80">{item.period}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4. VALUE CARDS (Bottom Row - Option B) */}

                    {/* Card A: THE HYBRID */}
                    <TechCard
                        className="col-span-1 md:col-span-2 lg:col-span-2"
                        title="THE_HYBRID"
                        subtitle="DESIGN <-> LOGIC"
                        accentColor="border-accent-green"
                    >
                        <div className="flex items-center justify-center gap-4 mt-2 py-4 relative">
                            <div className="w-24 h-24 border border-accent-green/50 rounded-full flex items-center justify-center relative bg-accent-green/5">
                                <span className="text-[10px] font-mono text-accent-green">CREATIVE</span>
                            </div>
                            <div className="w-24 h-24 border border-stone-500/50 rounded-full flex items-center justify-center -ml-8 relative bg-stone-500/5 mix-blend-screen">
                                <span className="text-[10px] font-mono text-stone-400">LOGIC</span>
                            </div>
                            <div className="absolute font-mono text-[10px] bg-black border border-stone-500 px-2 py-0.5 z-10 text-white">
                                SYNCED
                            </div>
                        </div>
                    </TechCard>

                    {/* Card B: DATA DRIVEN */}
                    <TechCard
                        className="col-span-1"
                        title="DATA_DRIVEN"
                        subtitle="METRICS_FOCUS"
                        accentColor="border-stone-500"
                    >
                        <div className="mt-4 h-20 flex items-end justify-between gap-1 px-2 border-b border-stone-700 pb-1">
                            {[30, 45, 35, 60, 55, 75, 90].map((h, i) => (
                                <div
                                    key={i}
                                    className="w-full bg-stone-600 hover:bg-accent-green transition-colors"
                                    style={{ height: `${h}%` }}
                                />
                            ))}
                        </div>
                    </TechCard>

                    {/* Card C: TOOLKIT */}
                    <TechCard
                        className="col-span-1"
                        title="TOOLKIT"
                        subtitle="ARMORY"
                        accentColor="border-accent-green"
                    >
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            {['Figma', 'React', 'Tailwind', 'Notion'].map((tool, i) => (
                                <div key={i} className="bg-black/40 border border-stone-700 rounded-sm p-2 text-center text-[10px] font-mono text-stone-400 hover:text-accent-green hover:border-accent-green transition-colors cursor-crosshair">
                                    {tool}
                                </div>
                            ))}
                        </div>
                    </TechCard>

                </div>
            </div>
        </section >
    );
};

// Tech Card Component
const TechCard = ({ title, subtitle, children, accentColor = "border-stone-500", className }) => (
    <div className={`bg-zinc-900/80 backdrop-blur-md rounded-xl border border-stone-600/50 p-6 flex flex-col justify-between group h-full relative overflow-hidden ${className} hover:border-accent-green/50 transition-colors`}>
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-sm font-bold text-stone-200 mb-1 font-mono tracking-wider">{title}</h3>
                <p className="text-stone-500 text-[10px] font-mono">{subtitle}</p>
            </div>
            <div className={`w-1 h-1 ${accentColor} bg-current animate-ping`} />
        </div>
        <div>
            {children}
        </div>
    </div>
);

export default DashboardTechno;
