import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Workflow, Building2, Mail, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import NowPlayingWidget from './NowPlayingWidget';
import GitHubWidget from './GitHubWidget';

const Dashboard = () => {
    const { language } = useLanguage();
    const t = translations[language];

    // Ultra Glass / Icy Glass Style
    // Features: High transparency, strong top inner-highlight (thickness), crisp borders, gradient fill
    const cardStyles = "bg-gradient-to-br from-white/50 via-white/20 to-transparent dark:from-zinc-900/50 dark:via-zinc-900/20 dark:to-transparent backdrop-blur-xl rounded-[2rem] border border-white/60 dark:border-white/10 shadow-[inset_0_1px_4px_rgba(255,255,255,0.9),0_8px_32px_rgba(0,0,0,0.1)] relative overflow-hidden group hover:shadow-[inset_0_1px_4px_rgba(255,255,255,1),0_12px_40px_rgba(var(--accent-green-rgb),0.2)] hover:border-accent-green/40 transition-all duration-500";

    return (
        <section className="bg-stone-200 dark:bg-bg-primary text-text-primary px-6 md:px-12 lg:px-16 pt-10 pb-20 transition-colors duration-300 relative overflow-hidden min-h-screen">
            {/* Static Olive Background Wash (Requested: No animation, Olive color) */}
            <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-accent-green/20 rounded-full blur-[150px] pointer-events-none mix-blend-multiply dark:mix-blend-normal" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent-green/15 rounded-full blur-[150px] pointer-events-none mix-blend-multiply dark:mix-blend-normal" />

            <div className="container mx-auto relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl font-display font-bold mb-12 text-text-primary"
                >
                    {t.profile.title}
                </motion.h2>

                {/* Unified Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

                    {/* 1. PROFILE (Top Left - 2x1) */}
                    <div className={`${cardStyles} col-span-1 md:col-span-2 lg:col-span-2 p-6 flex flex-col md:flex-row items-center md:items-start gap-6`}>
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <span className="text-8xl font-display font-bold text-accent-green">SD</span>
                        </div>

                        <div className="flex-shrink-0 z-10">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-stone-300 dark:border-stone-600 shadow-lg relative group-hover:scale-105 transition-transform duration-500">
                                <img src="/profile/abdi.jpg" alt="Sulthan Abdi" className="w-full h-full object-cover" />
                            </div>
                            <div className="mt-3 flex justify-center">
                                <span className="px-3 py-1.5 text-[10px] rounded-full bg-[#5f9b41] text-white font-bold flex items-center gap-1.5 shadow-md">
                                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                    #OpenToWork
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left z-10 w-full md:w-auto">
                            <h3 className="text-2xl font-display font-bold text-text-primary mb-1">Sulthan Abdi Dzikry</h3>
                            <p className="text-accent-green font-mono text-xs mb-3 font-medium bg-accent-green/5 inline-block px-2 py-0.5 rounded">{t.profile.role}</p>

                            <p className="text-text-secondary text-xs leading-relaxed mb-4 font-medium max-w-full md:max-w-[90%] md:pr-4">
                                {t.profile.bio}
                                <br /><br />
                                <span className="opacity-80 text-text-muted">
                                    {t.profile.bioSub}
                                </span>
                            </p>

                            <div className="flex gap-3 mt-6 flex-wrap items-center justify-center md:justify-start z-10 relative">
                                <a
                                    href="mailto:sulthanabdi1@gmail.com?subject=Job%20Offer%20-%20[Your%20Company]&body=Hi%20Sulthan,%0A%0AWe%20reviewed%20your%20profile%20and%20are%20impressed%20with%20your%20experience.%0A%0AWe%20would%20like%20to%20discuss%20a%20potential%20opportunity..."
                                    className="px-5 py-2 bg-text-primary text-bg-primary rounded-full text-xs font-medium hover:scale-110 active:scale-95 transition-all shadow-lg hover:shadow-accent-green/50 whitespace-nowrap flex-shrink-0 flex items-center gap-2"
                                >
                                    <Mail size={14} />
                                    {t.profile.contact}
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/sulthan-abdi-dzikry/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-white/50 dark:bg-black/30 border border-stone-300 dark:border-white/20 text-text-primary rounded-full text-xs font-medium hover:bg-white/70 dark:hover:bg-white/10 transition-all hover:scale-110 active:scale-95 flex items-center backdrop-blur-md"
                                >
                                    <Linkedin size={14} className="mr-2" />
                                    LinkedIn
                                </a>
                                <a
                                    href="/profile/CV_Sulthan_Abdi_Dzikry_ATS.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 border border-stone-300 dark:border-accent-green/30 text-text-primary rounded-full text-xs font-medium hover:bg-accent-green/10 transition-all hover:scale-110 active:scale-95 backdrop-blur-md whitespace-nowrap flex items-center gap-2"
                                >
                                    <Download size={14} />
                                    {t.profile.downloadCv}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* 2. EXPERIENCE (Top Right - 2x2) */}
                    <div className={`${cardStyles} col-span-1 md:col-span-2 lg:col-span-2 row-span-2 p-6 flex flex-col`}>
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <h3 className="text-sm font-mono text-accent-green font-bold uppercase tracking-wider">{t.profile.experienceTitle}</h3>
                            <span className="text-xs text-stone-400 font-mono">● {t.profile.jobs.length} Positions</span>
                        </div>

                        <div className="space-y-6 relative z-10 flex-1 overflow-y-auto pr-2 custom-scrollbar p-2">
                            {t.profile.jobs.map((job, idx) => (
                                <div key={idx} className="flex justify-between items-start border-l-2 border-accent-green/30 pl-4 hover:border-accent-green transition-all duration-300 group/job">
                                    <div className="space-y-1">
                                        <h4 className="text-text-primary font-bold text-sm group-hover/job:text-accent-green transition-colors">{job.company}</h4>
                                        <p className="text-xs text-stone-700 dark:text-accent-green/90 font-bold">{job.role}</p>
                                        <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 max-w-sm font-medium leading-relaxed">{job.desc}</p>
                                    </div>
                                    <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 text-right min-w-[80px] mt-0.5 font-semibold whitespace-nowrap">{job.period}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. EDUCATION (Middle Left - 2x1) */}
                    <div className={`${cardStyles} col-span-1 md:col-span-2 lg:col-span-2 p-6 flex flex-col justify-between`}>
                        <div className="absolute top-4 right-4 w-24 opacity-80 pointer-events-none transition-transform group-hover:scale-105 mix-blend-multiply dark:mix-blend-screen">
                            <img src="/profile/telkom_logo.png" alt="Telkom University" className="w-full h-auto object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                        </div>

                        <div className="z-10 mt-2">
                            <h3 className="text-xs font-mono text-accent-green font-bold mb-2 uppercase tracking-wider">{t.profile.educationTitle}</h3>
                            <h4 className="text-xl font-bold text-text-primary leading-tight">Telkom University</h4>
                            <p className="text-text-secondary mt-1 text-sm font-medium">Bachelor of Informatics Engineering</p>
                            <p className="text-xs text-stone-400 mt-1 font-mono">Sep 2021 - Aug 2025</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6 z-10">
                            <div className="bg-white/30 dark:bg-black/20 p-3 rounded-2xl border border-accent-green/20 text-center backdrop-blur-sm">
                                <span className="block text-2xl font-display font-bold text-text-primary">4</span>
                                <span className="text-[10px] text-accent-green font-bold uppercase tracking-wider">Years</span>
                            </div>
                            <div className="bg-white/30 dark:bg-black/20 p-3 rounded-2xl border border-accent-green/20 text-center backdrop-blur-sm">
                                <span className="block text-2xl font-display font-bold text-text-primary">3.52</span>
                                <span className="text-[10px] text-accent-green font-bold uppercase tracking-wider">{t.profile.gpa}</span>
                            </div>
                        </div>

                        <div className="flex gap-2 flex-wrap mt-4 z-10">
                            {['Web Development', 'Algorithms', 'Software Eng', 'UI/UX Design'].map((course, i) => (
                                <span key={i} className="text-[10px] px-2 py-1 bg-accent-green/5 rounded text-text-secondary border border-accent-green/20 font-medium">
                                    {course}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* 5. CERTIFICATIONS (Bottom Left - 2x1) */}
                    <div className={`${cardStyles} col-span-1 md:col-span-2 lg:col-span-2 p-6 flex flex-col justify-center`}>
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <h3 className="text-sm font-mono text-accent-green font-bold uppercase tracking-wider">{t.profile.certTitle}</h3>
                        </div>
                        <div className="space-y-4 relative z-10">
                            {t.profile.certs.map((cert, idx) => (
                                <div key={idx} className="flex flex-col gap-1 border-l-2 border-accent-green/30 pl-3 hover:border-accent-green transition-colors group/cert">
                                    <h4 className="text-text-primary font-bold text-sm group-hover/cert:text-accent-green transition-colors">{cert.name}</h4>
                                    <p className="text-xs text-stone-600 dark:text-stone-400 font-bold font-mono">{cert.issuer} • {cert.date}</p>
                                    <p className="text-xs text-stone-700 dark:text-stone-300 font-medium">{cert.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4. ORGANIZATIONAL EXPERIENCE (Middle Right - 2x2) */}
                    <div className={`${cardStyles} col-span-1 md:col-span-2 lg:col-span-2 row-span-2 p-6 flex flex-col`}>
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <h3 className="text-sm font-mono text-accent-green font-bold uppercase tracking-wider">{t.profile.orgTitle}</h3>
                            <span className="text-xs text-stone-400/80 animate-pulse">● {t.profile.orgs.length} Activities</span>
                        </div>

                        <div className="space-y-4 relative z-10 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            {t.profile.orgs.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-start border-l-2 border-accent-green/30 pl-4 hover:border-accent-green transition-all duration-300 group/org">
                                    <div className="space-y-1">
                                        <h4 className="text-text-primary font-bold text-sm group-hover/org:text-accent-green transition-colors">{item.org}</h4>
                                        <p className="text-xs text-stone-700 dark:text-accent-green/90 font-bold">{item.role}</p>
                                        <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 max-w-sm font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                    <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 text-right min-w-[70px] mt-0.5 font-semibold whitespace-nowrap">{item.period}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4. VALUE CARDS (Bottom Row) */}

                    {/* Card A: TECH ARSENAL (2 cols) */}
                    <FeatureCard
                        className="col-span-1 md:col-span-2 lg:col-span-2"
                        icon={<Workflow size={24} className="text-accent-green" />}
                        title="Tech Arsenal"
                        subtitle="Design & Code Weaponry"
                        accentColor="bg-accent-green"
                    >
                        <div className="flex flex-wrap gap-2">
                            {['React', 'Tailwind', 'Figma', 'Angular', 'UX Research', 'Prototyping'].map((item, i) => (
                                <span key={i} className="px-3 py-1.5 rounded-lg bg-accent-green/10 text-accent-green border border-stone-300 dark:border-accent-green/30 text-xs font-bold hover:bg-accent-green/20 transition-colors">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </FeatureCard>

                    {/* Card B: PRODUCT FRAMEWORKS (1 col) */}
                    <FeatureCard
                        className="col-span-1"
                        icon={<Workflow size={24} className="text-accent-green" />}
                        title="Frameworks"
                        subtitle="Methodologies"
                        accentColor="bg-accent-green"
                    >
                        <div className="flex flex-wrap gap-2">
                            {['Agile', 'Scrum', 'Design Thinking', 'PRD', 'Jira'].map((item, i) => (
                                <span key={i} className="px-3 py-1.5 rounded-lg bg-accent-green/10 text-accent-green border border-stone-300 dark:border-accent-green/30 text-xs font-bold">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </FeatureCard>

                    {/* Card C: INDUSTRY FOCUS (1 col) */}
                    <FeatureCard
                        className="col-span-1"
                        icon={<Building2 size={24} className="text-accent-green" />}
                        title="Industries"
                        subtitle="Domain Expertise"
                        accentColor="bg-accent-green"
                    >
                        <div className="grid grid-cols-2 gap-2">
                            {['Manuf.', 'SaaS / B2B', 'EdTech', 'Telco'].map((domain, i) => (
                                <div key={i} className="flex items-center justify-center p-2.5 rounded-lg bg-accent-green/5 border border-stone-300 dark:border-accent-green/20 hover:bg-accent-green/10 transition-colors">
                                    <span className="text-xs font-bold text-accent-green">{domain}</span>
                                </div>
                            ))}
                        </div>
                    </FeatureCard>

                    {/* WIDGETS ROW */}
                    {/* Now Playing Widget (1 col) */}
                    <div className="col-span-1">
                        <NowPlayingWidget username="testis3131" />
                    </div>

                    {/* GitHub Widget (1 col) */}
                    <div className="col-span-1">
                        <GitHubWidget username="AbdiDzikry" />
                    </div>

                </div>
            </div>
        </section >
    );
};

// FeatureCard Component (Updated for Liquid Glass)
const FeatureCard = ({ icon, title, subtitle, children, accentColor = "bg-accent-green", className }) => (
    <div className={`bg-gradient-to-br from-white/50 via-white/20 to-transparent dark:from-zinc-900/50 dark:via-zinc-900/20 dark:to-transparent backdrop-blur-xl rounded-[2rem] border border-white/60 dark:border-white/10 shadow-[inset_0_1px_4px_rgba(255,255,255,0.9),0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[inset_0_1px_4px_rgba(255,255,255,1),0_12px_40px_rgba(var(--accent-green-rgb),0.2)] hover:border-accent-green/40 transition-all duration-500 flex flex-col justify-between group h-full relative overflow-hidden p-6 ${className}`}>

        {/* Glow effect on hover */}
        <div className={`absolute -top-10 -right-10 w-20 h-20 ${accentColor} blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

        <div>
            <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-white/50 dark:bg-black/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform text-text-primary border border-accent-green/20 shadow-sm backdrop-blur-md">
                    {icon}
                </div>
                <div className={`w-2 h-2 rounded-full ${accentColor} opacity-50`} />
            </div>

            <h3 className="text-lg font-bold text-text-primary mb-1">{title}</h3>
            <p className="text-stone-600 dark:text-stone-400 text-xs mb-3 font-mono opacity-90">{subtitle}</p>
        </div>

        {/* Dynamic Visual Content */}
        <div className="bg-white/30 dark:bg-black/10 rounded-2xl p-4 border border-accent-green/10 group-hover:bg-white/50 dark:group-hover:bg-white/5 transition-colors">
            {children}
        </div>
    </div>
);

export default Dashboard;
