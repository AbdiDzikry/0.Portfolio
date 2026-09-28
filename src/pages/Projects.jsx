import { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../data/projects';
import { experiences, getExperience } from '../data/experiences';
import { translations } from '../utils/translations';
import SEO from '../components/SEO';
import { LayoutGrid, List, ArrowRight, Briefcase, ChevronDown, Check } from 'lucide-react';
import './Projects.css';

/* ─────────────────────────────────────────────────────────
   SMALL VIEWPORT HELPER — lets the filter panel pick a
   different axis/anchor per breakpoint.
   ───────────────────────────────────────────────────────── */
const useIsDesktop = () => {
    const [isDesktop, setIsDesktop] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(min-width: 640px)').matches
    );
    useEffect(() => {
        const mq = window.matchMedia('(min-width: 640px)');
        const onChange = (e) => setIsDesktop(e.matches);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);
    return isDesktop;
};

/* ─────────────────────────────────────────────────────────
   EXPERIENCE FILTER — custom dropdown
   Trigger stays compact (short code + count); the panel
   carries the full company / role / period so the header
   never blows out on narrow screens.
   `layout` + `layoutId` make the button and the active
   pill animate whenever the selection — and thus the
   trigger's size — changes.
   ───────────────────────────────────────────────────────── */
const ExperienceFilter = ({ filters, activeId, onChange, label }) => {
    const [open, setOpen] = useState(false);
    const [cursor, setCursor] = useState(0);
    const wrapRef = useRef(null);
    const listRef = useRef(null);
    const isDesktop = useIsDesktop();

    const activeIndex = Math.max(0, filters.findIndex(f => f.id === activeId));
    const active = filters[activeIndex] ?? filters[0];

    // Close on outside click
    useEffect(() => {
        if (!open) return;
        const onPointerDown = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', onPointerDown);
        return () => document.removeEventListener('mousedown', onPointerDown);
    }, [open]);

    const select = useCallback((id) => {
        onChange(id);
        setOpen(false);
    }, [onChange]);

    const onKeyDown = (e) => {
        if (e.key === 'Escape') { setOpen(false); return; }
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            if (!open) { setOpen(true); setCursor(activeIndex); return; }
            const dir = e.key === 'ArrowDown' ? 1 : -1;
            setCursor((c) => (c + dir + filters.length) % filters.length);
            return;
        }
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (open) select(filters[cursor].id);
            else { setOpen(true); setCursor(activeIndex); }
        }
    };

    // Keep the highlighted option scrolled into view
    useEffect(() => {
        if (!open || !listRef.current) return;
        const el = listRef.current.querySelector(`[data-idx="${cursor}"]`);
        el?.scrollIntoView({ block: 'nearest' });
    }, [cursor, open]);

    return (
        <div ref={wrapRef} className="relative w-full sm:w-auto">
            {/* ── Trigger ── */}
            <motion.button
                type="button"
                layout
                layoutId="exp-filter-trigger"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                onClick={() => { setOpen(o => !o); setCursor(activeIndex); }}
                onKeyDown={onKeyDown}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label={label}
                className={`flex w-full sm:w-auto items-center gap-2 h-8 px-2.5 sm:px-3 rounded-lg border text-[11px] font-bold transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 ${
                    open
                        ? 'bg-white dark:bg-zinc-700 border-zinc-400 dark:border-zinc-500 text-zinc-900 dark:text-zinc-50'
                        : 'bg-zinc-100 dark:bg-zinc-800 border-border/50 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
            >
                <Briefcase size={12} className="flex-shrink-0" />
                <span className="truncate max-w-[70px] sm:max-w-[110px]">{active?.short}</span>
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 flex-shrink-0">
                    {active?.count}
                </span>
                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="flex-shrink-0"
                >
                    <ChevronDown size={12} />
                </motion.span>
            </motion.button>

            {/* ── Panel — slides out sideways on desktop, drops down on mobile ── */}
            <AnimatePresence>
                {open && (
                    <div
                        className={`absolute z-50 w-[min(300px,calc(100vw-3rem))] ${
                            isDesktop
                                ? 'right-full mr-2 top-1/2 -translate-y-1/2'
                                : 'left-0 top-full mt-2'
                        }`}
                    >
                        <motion.div
                            key="panel"
                            initial={{ opacity: 0, scale: 0.94, x: isDesktop ? 14 : 0 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.94, x: isDesktop ? 14 : 0 }}
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            style={{ originX: isDesktop ? 1 : 0.5, originY: isDesktop ? 0.5 : 0 }}
                            className="rounded-2xl bg-white dark:bg-zinc-900 border border-border shadow-2xl overflow-hidden"
                        >
                            <ul ref={listRef} role="listbox" className="p-1.5 max-h-[min(320px,60vh)] overflow-y-auto">
                                {filters.map((f, i) => {
                                    const isActive = f.id === activeId;
                                    const isCursor = i === cursor;
                                    return (
                                        <li key={f.id} data-idx={i} role="option" aria-selected={isActive}>
                                            <button
                                                type="button"
                                                onMouseEnter={() => setCursor(i)}
                                                onClick={() => select(f.id)}
                                                className="relative w-full text-left px-3 py-2.5 rounded-xl transition-colors duration-150"
                                            >
                                                {/* Sliding active pill — animates position + size */}
                                                {isActive && (
                                                    <motion.span
                                                        layoutId="exp-filter-pill"
                                                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                                                        className="absolute inset-0 rounded-xl bg-zinc-100 dark:bg-zinc-800"
                                                    />
                                                )}
                                                <span
                                                    className={`relative flex items-center gap-2 transition-colors duration-150 ${
                                                        isActive
                                                            ? 'text-zinc-900 dark:text-zinc-50'
                                                            : isCursor
                                                                ? 'text-zinc-800 dark:text-zinc-100'
                                                                : 'text-zinc-500 dark:text-zinc-400'
                                                    }`}
                                                >
                                                    <span className="flex-1 min-w-0">
                                                        <span className="block text-[11px] font-bold truncate">
                                                            {f.label}
                                                        </span>
                                                        {(f.role || f.period) && (
                                                            <span className="block text-[9px] font-mono opacity-60 truncate mt-0.5">
                                                                {[f.role, f.period].filter(Boolean).join(' · ')}
                                                            </span>
                                                        )}
                                                    </span>
                                                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex-shrink-0">
                                                        {f.count}
                                                    </span>
                                                    <span className="w-3 flex-shrink-0">
                                                        {isActive && <Check size={12} />}
                                                    </span>
                                                </span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────
   LIST VIEW ROW — interactive, weareflow-style
───────────────────────────────────────────────────────── */
const ListRow = ({ proj, index, onHover, isActive }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            className="relative group cursor-pointer"
            onHoverStart={() => onHover(proj)}
            onHoverEnd={() => onHover(null)}
            onClick={() => navigate(proj.path || `/projects/${proj.id}`)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.35 }}
        >
            {/* Separator line */}
            <div className="h-px bg-border group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100 transition-colors duration-300" />

            <div className="flex items-center justify-between py-5 md:py-6 px-1 gap-6">
                {/* Index number */}
                <span className="text-[10px] font-mono text-text-muted w-8 flex-shrink-0 opacity-50">
                    {String(index + 1).padStart(2, '0')}
                </span>

                {/* Project name — large & bold */}
                <div className="flex-1 min-w-0">
                    <motion.h2
                        className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-none text-text-primary transition-colors duration-200"
                        animate={{ x: isActive ? 12 : 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                        {proj.title}
                    </motion.h2>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {proj.category}
                    </p>
                </div>

                {/* Tags (desktop only) */}
                <div className="hidden md:flex gap-2 flex-shrink-0">
                    {(proj.tags || []).slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[9px] font-bold border border-border rounded-full px-3 py-1 text-text-muted group-hover:border-zinc-400 transition-colors whitespace-nowrap">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Arrow — slides in on hover */}
                <motion.div
                    className="flex-shrink-0 w-10 h-10 rounded-full border border-border flex items-center justify-center overflow-hidden"
                    animate={{
                        backgroundColor: isActive ? '#18181b' : 'rgba(0,0,0,0)',
                        borderColor: isActive ? '#18181b' : undefined,
                    }}
                    transition={{ duration: 0.25 }}
                >
                    <motion.div
                        animate={{ x: isActive ? 0 : -20, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ArrowRight size={16} className="text-white" />
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};


/* ─────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────── */
const Projects = () => {
    const { language } = useLanguage();
    const t = translations[language];

    const [viewMode, setViewMode] = useState('list');
    const [hoveredProject, setHoveredProject] = useState(null);
    const [activeExperience, setActiveExperience] = useState('all');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
    };

    // ── Experience filter ──
    const isId = language === 'id';
    const activeExp = getExperience(activeExperience);

    // Projects kept accessible via direct URL only (hidden from listing)
    const hiddenProjectIds = ['anti-fraud-doors', 'internship-detail'];
    const listedProjects = projectsData.filter(p => !hiddenProjectIds.includes(p.id));

    // Map translations if ID is selected
    const withTranslations = listedProjects.map(p => {
        if (isId && p.translations?.id) {
            return { ...p, ...p.translations.id };
        }
        return p;
    });

    // Only keep filters that actually have projects
    const filters = experiences
        .filter(exp => exp.id === 'all' || listedProjects.some(p => (p.experience ?? 'other') === exp.id))
        .map(exp => ({
            ...exp,
            short: isId ? exp.shortId : exp.short,
            label: exp.id === 'all'
                ? (isId ? exp.shortId : exp.short)
                : (isId ? exp.companyId : exp.company),
            role: isId ? exp.roleId : exp.role,
            period: isId ? exp.periodId : exp.period,
            count: exp.id === 'all'
                ? listedProjects.length
                : listedProjects.filter(p => (p.experience ?? 'other') === exp.id).length
        }));

    const projects = activeExperience === 'all'
        ? withTranslations
        : withTranslations.filter(p => (p.experience ?? 'other') === activeExperience);

    // Default thumbnail for list view when nothing is hovered
    const activeThumbnail = hoveredProject?.image ?? projects[0]?.image;

    return (
        <>
            <SEO
                title="Projects"
                description="Explore Sulthan Abdi Dzikry's portfolio of design and development projects."
            />

            <div className="container relative mx-auto px-6 md:px-12 lg:px-16 pt-32 min-h-screen">

                {/* ── Japanese ornaments — visible only in the Japanese theme ── */}
                <div aria-hidden="true" className="jp-ornament-layer jp-only">
                    <div className="jp-dotgrid" />
                    <div className="jp-sun" />
                    <span className="jp-kanji-side jp-kanji-left">実績</span>
                    <span className="jp-kanji-side jp-kanji-right">作品</span>
                    <div className="jp-hanko">印</div>
                </div>

                {/* ── Header ── */}
                <motion.header
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="page-header relative z-30 mb-12"
                >
                    {/* Corner registration marks */}
                    <span className="jp-corner jp-corner-tl jp-only" />
                    <span className="jp-corner jp-corner-tr jp-only" />
                    <span className="jp-corner jp-corner-bl jp-only" />
                    <span className="jp-corner jp-corner-br jp-only" />

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="text-center md:text-left">
                            {/* Kanji eyebrow */}
                            <div className="jp-only mb-5">
                                <div className="flex items-center justify-center md:justify-start gap-3">
                                    <span className="h-px w-8" style={{ backgroundColor: 'var(--accent-green)' }} />
                                    <span className="text-[10px] font-mono font-black uppercase tracking-[0.6em]" style={{ color: 'var(--accent-green)' }}>作 品 一 覧</span>
                                    <span className="h-px w-8" style={{ backgroundColor: 'var(--accent-pink)' }} />
                                </div>
                            </div>
                            <h1 className="page-title">{t.nav.projectsTitle}</h1>
                            <p className="page-subtitle">{t.nav.projectsSubtitle}</p>
                        </div>

                        {/* Experience filter + view toggle */}
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <ExperienceFilter
                                filters={filters}
                                activeId={activeExperience}
                                onChange={(id) => { setActiveExperience(id); setHoveredProject(null); }}
                                label={t.nav.filterByExperience}
                            />

                            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-border/50 flex-shrink-0">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-zinc-700 shadow text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-800'}`}
                                    aria-label={t.nav.ariaGrid}
                                >
                                    <LayoutGrid size={14} /> {t.nav.gridView}
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${viewMode === 'list' ? 'bg-white dark:bg-zinc-700 shadow text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-800'}`}
                                    aria-label={t.nav.ariaList}
                                >
                                    <List size={14} /> {t.nav.listView}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.header>

                {/* Active filter context line */}
                <AnimatePresence mode="wait">
                    {activeExperience !== 'all' && (activeExp.role || activeExp.period) && (
                        <motion.p
                            key={activeExperience}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="relative z-10 mb-6 text-right text-[11px] font-mono text-text-muted"
                        >
                            {activeExp.role}{activeExp.role && activeExp.period ? ' · ' : ''}{activeExp.period}
                        </motion.p>
                    )}
                </AnimatePresence>

                {/* ── GRID VIEW ── */}
                <AnimatePresence mode="wait">
                    {viewMode === 'grid' && (
                        <motion.div
                            key="grid"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                            className="projects-grid relative z-10"
                        >
                            {projects.map((proj, index) => (
                                <motion.div key={proj.id ?? index} variants={itemVariants} layout>
                                    <ProjectCard {...proj} viewMode="grid" />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* ── LIST VIEW ── */}
                    {viewMode === 'list' && (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                            transition={{ duration: 0.3 }}
                            className="flex gap-8 items-start relative z-10"
                        >
                            {/* Left: project list */}
                            <div className="flex-1 min-w-0 pb-20">
                                {projects.map((proj, index) => (
                                    <ListRow
                                        key={proj.id ?? index}
                                        proj={proj}
                                        index={index}
                                        onHover={setHoveredProject}
                                        isActive={hoveredProject?.id === proj.id}
                                    />
                                ))}
                                {/* Final bottom line */}
                                <div className="h-px bg-border" />
                            </div>

                            {/* Right: sticky thumbnail panel */}
                            <div className="hidden lg:block sticky top-28 flex-shrink-0 w-[42%] rounded-[2rem] overflow-hidden aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 relative">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeThumbnail}
                                        className="absolute inset-0 w-full h-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.35, ease: 'easeOut' }}
                                    >
                                        {/* Blurred backdrop */}
                                        <img
                                            src={activeThumbnail}
                                            alt=""
                                            aria-hidden="true"
                                            className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl brightness-75 saturate-125"
                                        />
                                        {/* Actual image - contain so it's never cropped */}
                                        <img
                                            src={activeThumbnail}
                                            alt="Project thumbnail"
                                            className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                                        />
                                    </motion.div>
                                </AnimatePresence>
                                {/* Category label overlay */}
                                <div className="absolute bottom-5 left-5">
                                    <AnimatePresence mode="wait">
                                        {hoveredProject && (
                                            <motion.div
                                                key={hoveredProject.id}
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -4 }}
                                                transition={{ duration: 0.2 }}
                                                className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm px-4 py-2 rounded-full border border-border"
                                            >
                                                <p className="text-[10px] font-bold font-mono uppercase tracking-widest text-zinc-700 dark:text-zinc-200">
                                                    {hoveredProject.category}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </>
    );
};

export default Projects;
