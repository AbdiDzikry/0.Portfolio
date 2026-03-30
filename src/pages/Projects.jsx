import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../data/projects';
import { translations } from '../utils/translations';
import SEO from '../components/SEO';
import { LayoutGrid, List, ArrowRight } from 'lucide-react';
import './Projects.css';

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
            onClick={() => navigate(`/projects/${proj.id}`)}
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
                    {(proj.tags || []).slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-[9px] font-bold border border-border rounded-full px-3 py-1 text-text-muted group-hover:border-zinc-400 transition-colors">
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
    const rawProjects = projectsData;

    // Map translations if ID is selected
    const projects = rawProjects.map(p => {
        if (language === 'id' && p.translations?.id) {
            return { ...p, ...p.translations.id };
        }
        return p;
    });

    const [viewMode, setViewMode] = useState('list');
    const [hoveredProject, setHoveredProject] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
    };

    // Default thumbnail for list view when nothing is hovered
    const activeThumbnail = hoveredProject?.image ?? projects[0]?.image;

    return (
        <>
            <SEO
                title="Projects"
                description="Explore Sulthan Abdi Dzikry's portfolio of design and development projects."
            />

            <div className="container mx-auto px-6 md:px-12 lg:px-16 pt-32 min-h-screen">

                {/* ── Header ── */}
                <motion.header
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="page-header mb-12"
                >
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h1 className="page-title">{t.nav.projectsTitle}</h1>
                            <p className="page-subtitle">{t.nav.projectsSubtitle}</p>
                        </div>

                        {/* View toggle */}
                        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-border/50 mx-auto md:mx-0">
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
                </motion.header>

                {/* ── GRID VIEW ── */}
                <AnimatePresence mode="wait">
                    {viewMode === 'grid' && (
                        <motion.div
                            key="grid"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                            className="projects-grid"
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
                            className="flex gap-8 items-start"
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
