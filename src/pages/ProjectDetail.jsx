import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Download, ChevronRight, Lightbulb, Target,
    Wrench, TrendingUp, Clock, Users, CheckCircle, ArrowRight, ExternalLink
} from 'lucide-react';
import { projectsData } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { generatePrdPdf } from '../utils/generatePrdPdf';
import SEO from '../components/SEO';

/* ─────────── helpers ─────────── */
const Tag = ({ children }) => (
    <span className="px-2.5 py-1 rounded-full border border-border text-[10px] font-bold font-mono uppercase tracking-wider text-text-muted bg-bg-secondary">
        {children}
    </span>
);

const SectionBlock = ({ label, icon: Icon, children }) => (
    <div>
        <div className="flex items-center gap-2 mb-3">
            {Icon && <Icon size={14} className="text-accent-pink flex-shrink-0" />}
            <span className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-text-muted">{label}</span>
        </div>
        {children}
    </div>
);

const StepBadge = ({ num, label }) => (
    <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-black dark:bg-white text-white dark:text-black text-[10px] font-black flex items-center justify-center flex-shrink-0">
            {num}
        </div>
        <span className="text-xs font-bold text-text-muted uppercase tracking-widest">{label}</span>
    </div>
);

/* ─────────── main ─────────── */
const ProjectDetail = () => {
    const { id } = useParams();
    const { language } = useLanguage();
    const rawProject = projectsData.find(p => p.id === id);

    const project = rawProject && language === 'id' && rawProject.translations?.id
        ? { ...rawProject, ...rawProject.translations.id }
        : rawProject;

    const t = translations[language].projectDetail;
    const [selectedImage, setSelectedImage] = useState(0);

    // Auto-slideshow disabled on detail page to prevent performance lag with many large images

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center text-text-primary gap-4">
                <h2>{t.notFound}</h2>
                <Link to="/projects" className="text-accent-pink underline">← {t.back}</Link>
            </div>
        );
    }

    const showcaseImages = project.showcaseImages || [project.image];
    const isUiUx = project.category?.toLowerCase().includes('ui') || project.category?.toLowerCase().includes('design');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-bg-primary min-h-screen pt-28 pb-24 px-6 md:px-12 lg:px-16 transition-colors"
        >
            <SEO title={project.title} description={project.description} ogImage={project.image} />

            <div className="max-w-6xl mx-auto">

                {/* ── Back ── */}
                <Link
                    to="/projects"
                    className="inline-flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors mb-8 group text-xs font-mono"
                >
                    <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                    {t.allProjects}
                </Link>

                {/* ══════════════════════════════════════════
                    HERO SECTION — Left: Meta | Right: Image
                ══════════════════════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-start">

                    {/* Left: Title + Meta */}
                    <div className="flex flex-col justify-between h-full">
                        <div>
                            <div className="flex flex-wrap gap-2 mb-5">
                                <span className="px-3 py-1 rounded-full border border-accent-pink/30 text-accent-pink text-[10px] font-black font-mono uppercase tracking-widest bg-accent-pink/5">
                                    {project.category}
                                </span>
                                {project.status && (
                                    <span className="px-3 py-1 rounded-full border border-emerald-400/30 text-emerald-600 text-[10px] font-black font-mono uppercase tracking-widest bg-emerald-400/5">
                                        {project.status}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-text-primary mb-4">
                                {project.title}
                            </h1>

                            {project.tagline && (
                                <p className="text-base text-accent-pink font-medium mb-4 italic">
                                    "{project.tagline}"
                                </p>
                            )}

                            <p className="text-sm text-text-secondary leading-relaxed max-w-lg">
                                {project.description}
                            </p>
                        </div>

                        {/* Meta row */}
                        {/* Meta row */}
                        <div className="flex flex-col gap-6 mt-8 pt-6 border-t border-border/50">
                            {/* Row 1: Timeline */}
                            {project.timeline && (
                                <div>
                                    <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-text-muted mb-1 flex items-center gap-1">
                                        <Clock size={10} /> {t.timeline}
                                    </div>
                                    <p className="text-sm font-bold text-text-primary">
                                        {project.timeline[0]?.period} — {project.timeline[project.timeline.length - 1]?.period}
                                    </p>
                                </div>
                            )}

                            {/* Row 2: Status & Benefits & Team */}
                            <div className="flex flex-col gap-4">
                                {(project.translations?.[language]?.benefits || project.benefits) && (
                                    <div>
                                        <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-text-muted mb-1 flex items-center gap-1">
                                            <Users size={10} /> {t.lblBenefits}
                                        </div>
                                        <p className="text-sm font-bold text-text-primary underline decoration-accent-pink/30 decoration-2 underline-offset-4 tracking-tight">
                                            {project.translations?.[language]?.benefits || project.benefits}
                                        </p>
                                    </div>
                                )}

                                <div className="flex justify-between items-start gap-4">
                                    {project.status && (
                                        <div className="flex-1">
                                            <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-text-muted mb-1">
                                                {t.lblStatus}
                                            </div>
                                            <p className="text-xs font-bold text-accent-pink mt-0.5">
                                                {project.translations?.[language]?.status || project.status}
                                            </p>
                                        </div>
                                    )}
                                    {project.team && (
                                        <div className="flex-1 text-right">
                                            <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-text-muted mb-1 flex items-center gap-1 justify-end">
                                                <Users size={10} /> {t.teamTitle}
                                            </div>
                                            <div className="flex flex-col gap-1 mt-1 items-end">
                                                {Array.isArray(project.team) ? project.team.map((member, i) => (
                                                    <div key={i} className="text-xs flex flex-col items-end">
                                                        {member.link ? (
                                                            <a href={member.link} target="_blank" rel="noopener noreferrer" className="font-bold text-text-primary hover:text-accent-pink transition-colors underline decoration-border underline-offset-2">
                                                                {member.name}
                                                            </a>
                                                        ) : (
                                                            <span className="font-bold text-text-primary">{member.name}</span>
                                                        )}
                                                        {member.role && <span className="text-[10px] text-text-muted italic">({member.role})</span>}
                                                    </div>
                                                )) : (
                                                    <p className="text-xs font-bold text-text-primary">{project.team}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-4">
                            {project.tags?.map(tag => <Tag key={tag}>{tag}</Tag>)}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 mt-6">
                            {/* Download PRD */}
                            <button
                                onClick={() => generatePrdPdf(project)}
                                className="flex items-center gap-2 px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs font-bold hover:opacity-80 transition-all shadow-md"
                            >
                                <Download size={13} /> {t.downloadPrd}
                            </button>

                            {/* Live Link */}
                            {project.liveLink && (
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 bg-accent-pink text-white rounded-full text-xs font-bold hover:bg-accent-pink/80 transition-all shadow-md"
                                >
                                    <ExternalLink size={13} /> {t.livePreview}
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Right: Image Showcase */}
                    <div className="flex flex-col gap-3">
                        <div className="relative rounded-3xl overflow-hidden bg-bg-card border border-border/50 aspect-video flex items-center justify-center p-4">
                            {/* Reduced GPU strain: removed blur-2xl background layer */}
                            <AnimatePresence mode="popLayout" initial={false}>
                                <motion.img
                                    key={selectedImage}
                                    src={showcaseImages[selectedImage]}
                                    alt={project.title}
                                    className="relative z-10 w-full h-full object-contain shadow-xl rounded-xl"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </AnimatePresence>
                        </div>

                        {/* Thumbnails */}
                        {showcaseImages.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {showcaseImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`flex-shrink-0 h-14 w-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === idx
                                            ? 'border-accent-pink scale-105 shadow-md'
                                            : 'border-border/30 opacity-50 hover:opacity-80'}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* ══════════════════════════════════════════
                    CASE STUDY NARRATIVE
                ══════════════════════════════════════════ */}
                <div className="space-y-6">

                    {/* ── STEP 1 & 2: Problem + Thinking — side by side ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Problem */}
                        <div className="bg-bg-card border border-border rounded-2xl p-6">
                            <StepBadge num="01" label={t.probTitle} />
                            <div className="mt-4 pl-10">
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    {project.background || project.problem}
                                </p>

                                {/* Pain points */}
                                {project.personas && (
                                    <div className="mt-5 space-y-3">
                                        {project.personas.map((p, i) => (
                                            <div key={i} className="flex gap-3">
                                                <div className="w-1 flex-shrink-0 rounded-full bg-red-400/60" />
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">{p.role}</p>
                                                    <p className="text-xs text-text-secondary mt-0.5">{p.pain}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Design Thinking */}
                        <div className="bg-bg-card border border-border rounded-2xl p-6">
                            <StepBadge num="02" label={isUiUx ? t.thinkingTitle : t.techTitle} />
                            <div className="mt-4 pl-10">
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    {project.strategicAlignment || project.solution}
                                </p>

                                {/* Process timeline */}
                                {project.timeline && (
                                    <div className="mt-5 space-y-2">
                                        {project.timeline.map((t, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <span className="text-[9px] font-mono text-text-muted pt-0.5 w-20 flex-shrink-0">{t.period}</span>
                                                <div className="flex items-start gap-1.5 flex-1">
                                                    <ChevronRight size={11} className="text-accent-pink mt-0.5 flex-shrink-0" />
                                                    <div>
                                                        <span className="text-[10px] font-black text-text-primary">{t.phase}</span>
                                                        <span className="text-[9px] text-text-muted ml-2">{t.activities?.join(', ')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ── STEP 3: Solution — Problem/Solution mapping ── */}
                    <div className="bg-bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                            <StepBadge num="03" label={t.solTitle} />
                            <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">{t.solSub}</span>
                        </div>
                        <div className="divide-y divide-border">
                            {project.problemMap?.map((pm, i) => (
                                <div key={i} className="px-6 py-4 flex flex-col md:flex-row gap-4 md:gap-6 items-start group hover:bg-bg-secondary/20 transition-colors">
                                    {/* Problem side */}
                                    <div className="md:w-[38%]">
                                        <p className="text-xs font-bold text-red-500 dark:text-red-400 mb-0.5">{pm.problem}</p>
                                        <p className="text-[11px] text-text-muted italic">{pm.context}</p>
                                    </div>
                                    {/* Arrow */}
                                    <div className="hidden md:flex items-center pt-1">
                                        <ArrowRight size={14} className="text-text-muted/40" />
                                    </div>
                                    {/* Solution side */}
                                    <div className="flex-1 flex gap-2 items-start">
                                        <CheckCircle size={13} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs font-bold text-text-primary mb-0.5">{pm.solution}</p>
                                            <p className="text-[11px] text-text-secondary">{pm.mitigation}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── STEP 4: Impact & Metrics ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Metrics Grid */}
                        <div className={`bg-bg-card border border-border rounded-2xl p-6 ${project.researchImage ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                            <StepBadge num="04" label={t.impactTitle} />
                            <div className="mt-5 pl-10">
                                {project.impact && (
                                    <p className="text-sm text-text-secondary leading-relaxed mb-5">{project.translations?.[language]?.impact || project.impact}</p>
                                )}
                                <div className={`grid gap-px bg-border rounded-xl overflow-hidden border border-border ${project.researchImage ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-4'}`}>
                                    {project.stats?.map((s, i) => (
                                        <div key={i} className="bg-bg-card p-5 text-center hover:bg-bg-secondary/30 transition-colors">
                                            <div className="text-2xl font-black text-text-primary font-mono mb-1">{s.value}</div>
                                            <div className="text-[9px] font-bold uppercase tracking-widest text-text-muted mb-1.5">{s.label}</div>
                                            <div className="text-[10px] text-text-secondary leading-snug">{s.description}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Research Results Image */}
                        {project.researchImage && (
                            <div className="bg-bg-card border border-border rounded-2xl p-6 flex flex-col">
                                <SectionBlock label={t.researchTitle} icon={TrendingUp} />
                                <div className="mt-4 flex-1 rounded-xl overflow-hidden border border-border/50 bg-bg-secondary/10 p-2 flex items-center justify-center">
                                    <img 
                                        src={project.researchImage} 
                                        alt="Research Results" 
                                        className="max-w-full max-h-48 object-contain rounded-lg shadow-sm"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── TOOLS & METHODS (conditional by type) ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Tools / Tech */}
                        <div className="bg-bg-card border border-border rounded-2xl p-6">
                            <SectionBlock label={isUiUx ? t.toolsTitle : t.stackTitle} icon={Wrench}>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {(isUiUx
                                        ? [...(project.designTools || []), ...(project.researchMethods || [])]
                                        : project.tags
                                    )?.map((item, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-bg-secondary border border-border rounded-xl text-[10px] font-bold text-text-secondary hover:border-accent-pink/40 transition-colors cursor-default">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </SectionBlock>
                        </div>

                        {/* Features */}
                        {project.coreFeatures && (
                            <div className="bg-bg-card border border-border rounded-2xl p-6">
                                <SectionBlock label={isUiUx ? t.uxFeaturesTitle : t.coreFeaturesTitle} icon={Lightbulb}>
                                    <ul className="mt-3 space-y-3">
                                        {project.coreFeatures.map((f, i) => (
                                            <li key={i} className="flex gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-accent-pink mt-1.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-xs font-bold text-text-primary">{f.name}</p>
                                                    <p className="text-[11px] text-text-secondary mt-0.5">{f.desc}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </SectionBlock>
                            </div>
                        )}
                    </div>

                    {/* ── Before / After (UI/UX only) ── */}
                    {isUiUx && project.beforeAfter && project.beforeAfter.length > 0 && (
                        <div className="bg-bg-card border border-border rounded-2xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-border">
                                <SectionBlock label={t.beforeAfterTitle || "Before & After"} icon={TrendingUp}><></></SectionBlock>
                            </div>
                            <div className="divide-y divide-border">
                                {/* Header Row */}
                                <div className="grid grid-cols-3 divide-x divide-border bg-bg-secondary/30 border-b border-border text-[10px] font-black uppercase tracking-widest text-text-muted">
                                    <div className="px-5 py-3">{t.lblAspect || "ASPECT"}</div>
                                    <div className="px-5 py-3 text-red-400/80">{t.before || "BEFORE"}</div>
                                    <div className="px-5 py-3 text-emerald-600">{t.after || "AFTER"}</div>
                                </div>
                                {project.beforeAfter.map((ba, i) => (
                                    <div key={i} className="grid grid-cols-3 divide-x divide-border text-sm">
                                        <div className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center">{ba.aspect}</div>
                                        <div className="px-5 py-4 text-[11px] text-red-400/80 flex items-start gap-2">
                                            <span className="mt-0.5 text-red-400">✕</span> {ba.before}
                                        </div>
                                        <div className="px-5 py-4 text-[11px] text-emerald-600 flex items-start gap-2">
                                            <span className="mt-0.5">✓</span> {ba.after}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── Figma Embed (if provided) ── */}
                    {project.figmaEmbed && (
                        <div className="bg-bg-card border border-border rounded-2xl p-6 mt-6">
                            <SectionBlock label="Interactive Prototype" icon={LayoutGrid}>
                                <div className="mt-4 rounded-xl overflow-hidden border border-border/50 bg-bg-secondary/30">
                                    <div 
                                        dangerouslySetInnerHTML={{ __html: project.figmaEmbed.includes('<iframe') ? project.figmaEmbed : `<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="600" src="${project.figmaEmbed}" allowfullscreen></iframe>` }}
                                    />
                                </div>
                            </SectionBlock>
                        </div>
                    )}

                </div>
            </div>
        </motion.div>
    );
};

export default ProjectDetail;
