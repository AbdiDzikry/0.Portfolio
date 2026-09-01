import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, ArrowRight, CheckCircle, Clock, Target,
    Wrench, TrendingUp, Users, Lightbulb, BarChart, ExternalLink, Download
} from 'lucide-react';
import { projectsData } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import { downloadKaizenPdf } from '../utils/loadKaizenIcons';
import SEO from '../components/SEO';

/* ─────────── kaizen / industrial-themed building blocks ─────────── */

const Kanban = ({ children }) => (
    <span className="px-3 py-1 rounded border border-emerald-500/30 bg-emerald-500/5 text-emerald-600 text-[10px] font-black font-mono uppercase tracking-widest">
        {children}
    </span>
);

const SectionBlock = ({ label, icon: Icon }) => (
    <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon size={14} className="text-emerald-500 flex-shrink-0" />}
        <span className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-emerald-600">{label}</span>
    </div>
);

const MachineHeader = ({ num, label }) => (
    <div className="flex items-center gap-3">
        <div className="w-8 h-8 border-2 border-emerald-500 text-emerald-600 text-xs font-black flex items-center justify-center font-mono flex-shrink-0">
            {num}
        </div>
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{label}</span>
    </div>
);

/* Signal light — small industrial status dot */
const StatusLight = ({ color, label }) => (
    <div className="flex items-center gap-2">
        <span className={`relative flex h-2.5 w-2.5`}>
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${color}-400 opacity-75`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 bg-${color}-500`} />
        </span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted">{label}</span>
    </div>
);

const ProjectKaizen = () => {
    const { language } = useLanguage();
    const id = 'doors';
    const rawProject = projectsData.find(p => p.id === id);
    const project = rawProject && language === 'id' && rawProject.translations?.id
        ? { ...rawProject, ...rawProject.translations.id }
        : rawProject;

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center text-text-primary gap-4">
                <h2>Project not found</h2>
                <Link to="/projects" className="text-emerald-600 underline">← Back</Link>
            </div>
        );
    }

    const isUiUx = project.id === 'doors' || project.category?.toLowerCase().includes('ui') || project.category?.toLowerCase().includes('design');
    const tools = isUiUx
        ? [...(project.designTools || []), ...(project.researchMethods || [])]
        : project.tags;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-bg-primary min-h-screen pt-28 pb-24 px-6 md:px-12 lg:px-16 transition-colors"
        >
            <SEO title={`Kaizen · ${project.title}`} description={project.description} ogImage={project.image} />

            <div className="max-w-6xl mx-auto">

                {/* ── Back / template switcher ── */}
                <div className="flex items-center justify-between mb-8">
                    <Link
                        to={`/projects/${id}`}
                        className="inline-flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors group text-xs font-mono"
                    >
                        <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                        View Original case study
                    </Link>
                    <div className="flex items-center gap-2 flex-wrap justify-end">
                        <button
                                onClick={() => downloadKaizenPdf(project)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-600 text-emerald-700 dark:text-emerald-500 text-[10px] font-bold font-mono uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-colors"
                        >
                            <Download size={11} /> PDF
                        </button>
                        <Kanban>Kaizen</Kanban>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted">Improvement Report</span>
                    </div>
                </div>

                {/* ═══════════════ 1. ENGINEERING PLATE ═══════════════ */}
                <div className="border-2 border-emerald-600/40 rounded-2xl overflow-hidden mb-10 bg-bg-card">
                    {/* top rail */}
                    <div className="bg-emerald-600/10 px-5 py-3 flex items-center justify-between border-b border-emerald-600/20">
                        <div className="flex items-center gap-2">
                            <StatusLight color="emerald" label="RUNNING" />
                            <StatusLight color="yellow" label="MONITOR" />
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 font-bold">{project.status}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Left: identification */}
                        <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-emerald-600/15">
                            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-600 mb-3">改善 ・ Product Order</p>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary mb-3">
                                {project.title}
                            </h1>
                            <p className="text-emerald-600 font-medium italic mb-6">"{project.tagline}"</p>
                            <p className="text-text-secondary leading-relaxed max-w-xl">
                                {project.description}
                            </p>

                            <div className="mt-8 pt-6 border-t border-emerald-600/15 space-y-3">
                                <div className="flex gap-2 flex-wrap">
                                    {project.tags?.map(tag => (
                                        <span key={tag} className="px-2.5 py-1 rounded-full border border-border text-[10px] font-bold font-mono uppercase tracking-wider text-text-muted bg-bg-secondary">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: image */}
                        <div className="relative p-8 lg:p-10 flex items-center justify-center bg-bg-secondary/30">
                            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                                style={{
                                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 24px, currentColor 25px), repeating-linear-gradient(90deg, transparent, transparent 24px, currentColor 25px)`
                                }} />
                            <img
                                src={project.image}
                                alt={project.title}
                                className="relative z-10 w-full max-w-md rounded-xl shadow-2xl border border-emerald-600/20"
                            />
                        </div>
                    </div>

                    {/* bottom kotatsu rail */}
                    <div className="flex flex-wrap gap-x-8 gap-y-3 px-8 py-4 border-t border-emerald-600/20 bg-bg-secondary/40 text-[10px] font-mono uppercase tracking-widest text-text-muted">
                        <span className="flex items-center gap-1.5"><Users size={12} className="text-emerald-600" /> {project.benefits}</span>
                        <span className="flex items-center gap-1.5"><Target size={12} className="text-emerald-600" /> {project.timeline?.[0]?.period} — {project.timeline?.[project.timeline.length-1]?.period}</span>
                    </div>
                </div>

                {/* ═══════════════ 2. VISION · 志 ═══════════════ */}
                <div className="bg-emerald-600 text-white rounded-2xl p-8 md:p-10 mb-10 relative overflow-hidden">
                    <div className="absolute right-0 top-0 h-full w-1/3 opacity-10"
                        style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.4) 10px, rgba(255,255,255,0.4) 11px)` }} />
                    <div className="relative z-10">
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-70 mb-2">Company Directive ・ 経営理念</p>
                        <p className="text-xl md:text-2xl font-bold italic leading-relaxed">"{project.vision}"</p>
                        <p className="text-sm opacity-90 mt-3 font-light leading-relaxed">{project.strategicAlignment}</p>
                    </div>
                </div>

                {/* ═══════════════ 3. PROCESS LINE · 工程表 ═══════════════ */}
                <div className="mb-10">
                    <SectionBlock label="Process Line · 工程表" icon={Wrench} />
                    <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">From pain point to signed-off production.</h2>

                    <div className="grid md:grid-cols-3 gap-4">
                        {project.timeline?.map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative bg-bg-card border-2 border-emerald-600/25 rounded-2xl p-6"
                            >
                                <div className="absolute -top-3 left-6 px-2 bg-emerald-600 text-white text-[9px] font-mono font-black uppercase tracking-widest rounded">
                                    Phase {i + 1}
                                </div>
                                <MachineHeader num={String(i + 1).padStart(2, '0')} label={t.phase} />
                                <p className="text-[10px] font-mono text-emerald-600 uppercase tracking-widest mt-1 mb-4">{t.period}</p>
                                <ul className="space-y-2">
                                    {t.activities?.map((a, j) => (
                                        <li key={j} className="text-xs text-text-secondary flex items-start gap-2">
                                            <CheckCircle size={12} className="text-emerald-500 mt-0.5 flex-shrink-0" /> {a}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ═══════════════ 4. WORK ORDER · 工程指示 ═══════════════ */}
                <div className="mb-10">
                    <SectionBlock label="Work Order · 工程指示" icon={Lightbulb} />
                    <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">Improvement directives issued and resolved.</h2>

                    <div className="bg-bg-card border-2 border-emerald-600/25 rounded-2xl overflow-hidden">
                        <div className="px-6 py-3 border-b border-emerald-600/15 bg-bg-secondary/40 grid grid-cols-1 md:grid-cols-2 text-[10px] font-black font-mono uppercase tracking-widest text-text-muted">
                            <span className="text-red-400/90">▮ Defect found · Problem</span>
                            <span className="text-emerald-600">✓ Countermeasure · Solution</span>
                        </div>
                        <div className="divide-y divide-border">
                            {project.problemMap?.map((pm, i) => (
                                <div key={i} className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start group hover:bg-bg-secondary/20 transition-colors">
                                    <div>
                                        <p className="text-sm font-bold text-red-500 dark:text-red-400 mb-1">{pm.problem}</p>
                                        <p className="text-[11px] text-text-muted italic">{pm.context}</p>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <ArrowRight size={16} className="hidden md:block text-emerald-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-bold text-emerald-600 mb-1">{pm.solution}</p>
                                            <p className="text-[11px] text-text-secondary">{pm.mitigation}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ═══════════════ 5. QC · GAGUGE PANEL ═══════════════ */}
                <div className="mb-10">
                    <SectionBlock label="QC Gauge Panel · 検査" icon={BarChart} />
                    <div className="bg-bg-card border-2 border-emerald-600/25 rounded-2xl overflow-hidden">
                        <div className="px-6 py-3 border-b border-emerald-600/15 bg-bg-secondary/40 text-[10px] font-black font-mono uppercase tracking-widest text-text-muted">
                            Final inspection results · 最終検査結果
                        </div>
                        {project.impact && (
                            <div className="px-6 py-4 border-b border-emerald-600/15">
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    <span className="text-emerald-600 font-bold font-mono mr-2">▮</span>
                                    {project.translations?.[language]?.impact || project.impact}
                                </p>
                            </div>
                        )}
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
                            {project.stats?.map((s, i) => (
                                <div key={i} className="p-6 text-center group">
                                    <div className="text-3xl font-black text-text-primary font-mono mb-2 transition-colors group-hover:text-emerald-600">{s.value}</div>
                                    <div className="text-[9px] font-black uppercase tracking-widest text-emerald-600 mb-1">{s.label}</div>
                                    <div className="text-[10px] text-text-secondary leading-snug">{s.description}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ═══════════════ 6. VISUAL LOG · ログ ═══════════════ */}
                {project.showcaseImages && project.showcaseImages.length > 0 && (
                    <div className="mb-10">
                        <SectionBlock label="Visual Inspection Log · 記録" icon={TrendingUp} />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {project.showcaseImages.slice(0, 4).map((img, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.06 }}
                                    className="rounded-xl overflow-hidden border border-emerald-600/20 bg-bg-secondary aspect-video"
                                >
                                    <img src={img} alt={`Log ${i}`} className="w-full h-full object-cover hover:opacity-80 transition-opacity cursor-pointer" loading="lazy" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ═══════════════ 7. 5S CHECKLIST · 5ステップ ═══════════════ */}
                <div className="mb-10">
                    <SectionBlock label="5S Discipline · 5ステップ" icon={CheckCircle} />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                        {[
                            { kanji: '整理', latin: 'Seiri', en: 'Sort / Simplify' },
                            { kanji: '整頓', latin: 'Seiton', en: 'Set in Order' },
                            { kanji: '清掃', latin: 'Seiso', en: 'Shine / Care' },
                            { kanji: '清潔', latin: 'Seiketsu', en: 'Standardize' },
                            { kanji: 'しつけ', latin: 'Shitsuke', en: 'Sustain / Discipline' },
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-bg-card border-2 border-emerald-600/20 rounded-xl p-5 text-center hover:bg-bg-secondary transition-colors"
                            >
                                <div className="text-3xl font-black text-emerald-600">{s.kanji}</div>
                                <div className="text-xs font-black text-text-primary mt-1 uppercase tracking-widest">{s.latin}</div>
                                <div className="text-[10px] text-text-muted mt-1">{s.en}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ═══════════════ 8. BEFORE / AFTER · 改善効果 ═══════════════ */}
                {project.beforeAfter && project.beforeAfter.length > 0 && (
                    <div className="mb-10">
                        <SectionBlock label="Kaizen Effect · 改善効果" icon={TrendingUp} />
                        <div className="bg-bg-card border-2 border-emerald-600/25 rounded-2xl overflow-hidden">
                            <div className="grid grid-cols-3 divide-x divide-border bg-bg-secondary/40 border-b border-emerald-600/15 text-[10px] font-black uppercase tracking-widest text-text-muted">
                                <div className="px-5 py-3">Aspect · 項目</div>
                                <div className="px-5 py-3 text-red-400/90">Before · 改善前</div>
                                <div className="px-5 py-3 text-emerald-600">After · 改善後</div>
                            </div>
                            <div className="divide-y divide-border">
                                {project.beforeAfter.map((ba, i) => (
                                    <div key={i} className="grid grid-cols-3 divide-x divide-border text-sm">
                                        <div className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center">{ba.aspect}</div>
                                        <div className="px-5 py-4 text-[11px] text-red-400/90 flex items-start gap-2">
                                            <span className="mt-0.5">✕</span> {ba.before}
                                        </div>
                                        <div className="px-5 py-4 text-[11px] text-emerald-600 flex items-start gap-2">
                                            <span className="mt-0.5">✓</span> {ba.after}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ═══════════════ 9. TOOLS & FEATURES ═══════════════ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    <div className="bg-bg-card border-2 border-emerald-600/25 rounded-2xl p-6">
                        <SectionBlock label="Factory Tools · 工具" icon={Wrench} />
                        <div className="flex flex-wrap gap-2 mt-1">
                            {tools?.map((item, i) => (
                                <span key={i} className="px-3 py-1.5 bg-emerald-600/5 border border-emerald-600/25 rounded text-[10px] font-bold text-emerald-700">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="bg-bg-card border-2 border-emerald-600/25 rounded-2xl p-6">
                        <SectionBlock label="Equipment · 設備" icon={Lightbulb} />
                        <ul className="mt-1 space-y-3">
                            {project.coreFeatures?.map((f, i) => (
                                <li key={i} className="flex gap-3">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-xs font-bold text-text-primary">{f.name}</p>
                                        <p className="text-[11px] text-text-secondary mt-0.5">{f.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ═══════════════ 10. CLOSING · 終わりに ═══════════════ */}
                <div className="border-2 border-emerald-600/30 rounded-2xl p-8 md:p-10 bg-bg-card text-center overflow-hidden relative">
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                        style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, currentColor 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, currentColor 21px)` }} />
                    <div className="relative z-10">
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-600 mb-3">改善は終わらない · kaizen never ends</p>
                        <p className="text-lg md:text-xl font-light italic text-text-secondary leading-relaxed max-w-2xl mx-auto">
                            "{project.kesanSaran || project.impact}"
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            <button
                            onClick={() => downloadKaizenPdf(project)}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full text-xs font-bold hover:opacity-80 transition-colors shadow-md"
                            >
                                <Download size={13} /> Download Kaizen PDF
                            </button>
                            {project.liveLink && (
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-full text-xs font-bold hover:bg-emerald-700 transition-colors shadow-md"
                                >
                                    <ExternalLink size={13} /> Live System
                                </a>
                            )}
                            <Link
                                to={`/projects/${id}`}
                                className="inline-flex items-center gap-2 px-5 py-2.5 border border-emerald-600 text-emerald-700 rounded-full text-xs font-bold hover:bg-emerald-600 hover:text-white transition-colors"
                            >
                                <ArrowLeft size={13} /> Original Case Study
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default ProjectKaizen;
