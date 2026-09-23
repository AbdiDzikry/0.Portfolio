import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Maximize2, X, ChevronLeft, ChevronRight, Filter,
    Layers, Cpu, Sparkles, RotateCcw, Info, CheckCircle2,
    Eye, Monitor
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   FULLSCREEN / OVERLAY MODAL
   - Closes on 'Esc' key, close button, or backdrop click
   - Navigates via 'ArrowLeft' and 'ArrowRight' keys or buttons
   - Locks body scroll while open
   - Smooth slide / fade transitions
   - Bottom caption & thumbnail strip
───────────────────────────────────────────────────────────── */
export const ShowcaseModal = ({
    isOpen,
    onClose,
    items = [],
    initialIndex = 0,
    projectTitle = ''
}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [prevInitialIndex, setPrevInitialIndex] = useState(initialIndex);

    // Sync current index when modal opens with new initialIndex
    if (isOpen && initialIndex !== prevInitialIndex) {
        setPrevInitialIndex(initialIndex);
        setCurrentIndex(initialIndex);
    }

    const handlePrev = useCallback(() => {
        if (!items.length) return;
        setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    }, [items.length]);

    const handleNext = useCallback(() => {
        if (!items.length) return;
        setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, [items.length]);

    // Keyboard navigation: Escape, ArrowLeft, ArrowRight
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                handlePrev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                handleNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        // Lock body scroll
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen, onClose, handlePrev, handleNext]);

    if (!isOpen || !items.length) return null;

    const currentItem = items[currentIndex] || items[0];

    return (
        <AnimatePresence>
            <div
                className="fixed inset-0 z-50 flex flex-col justify-between bg-black/90 backdrop-blur-md text-white select-none transition-all duration-300"
                role="dialog"
                aria-modal="true"
                aria-label="Modal Preview Galeri Showcase"
            >
                {/* ── Top Bar ── */}
                <header className="flex items-center justify-between px-4 md:px-8 py-4 bg-gradient-to-b from-black/80 to-transparent z-10">
                    <div className="flex items-center gap-3 min-w-0">
                        <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-accent-pink/20 border border-accent-pink/40 text-accent-pink text-[10px] font-mono font-bold uppercase tracking-wider">
                            {currentItem.category || 'Preview'}
                        </span>
                        <div className="truncate">
                            <h3 className="text-sm md:text-base font-bold truncate">
                                {currentItem.title || projectTitle}
                            </h3>
                            {currentItem.subtitle && (
                                <p className="text-[11px] text-zinc-400 truncate hidden md:block">
                                    {currentItem.subtitle}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0">
                        {/* Slide counter */}
                        <div className="px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/60 text-xs font-mono text-zinc-300">
                            <span className="text-accent-pink font-bold">{currentIndex + 1}</span> / {items.length}
                        </div>

                        {/* Close button */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/70 text-zinc-200 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-accent-pink"
                            aria-label="Tutup modal preview (Esc)"
                            title="Tutup (Esc)"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </header>

                {/* ── Main Image Canvas & Navigation Controls ── */}
                <div className="relative flex-1 flex items-center justify-center p-2 sm:p-6 md:p-8 min-h-0 overflow-hidden">
                    {/* Previous Button */}
                    <button
                        type="button"
                        onClick={handlePrev}
                        className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white/80 hover:text-white transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-pink shadow-lg"
                        aria-label="Gambar sebelumnya (Panah Kiri)"
                        title="Sebelumnya (←)"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    {/* Active Image Display */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentItem.image || currentIndex}
                                src={currentItem.image}
                                alt={currentItem.title || `Preview ${currentIndex + 1}`}
                                className="max-h-[60vh] sm:max-h-[68vh] md:max-h-[72vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                            />
                        </AnimatePresence>
                    </div>

                    {/* Next Button */}
                    <button
                        type="button"
                        onClick={handleNext}
                        className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white/80 hover:text-white transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-pink shadow-lg"
                        aria-label="Gambar berikutnya (Panah Kanan)"
                        title="Berikutnya (→)"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* ── Bottom Overlay: Caption + Tech Tags + Thumbnail Strip ── */}
                <footer className="px-4 md:px-8 pb-4 pt-2 bg-gradient-to-t from-black/95 via-black/80 to-transparent space-y-3 z-10">
                    {/* Caption & Tech tags */}
                    <div className="max-w-4xl mx-auto text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-2">
                        <div className="space-y-1">
                            <h4 className="text-xs sm:text-sm font-bold text-zinc-100">
                                {currentItem.title}
                            </h4>
                            {currentItem.description && (
                                <p className="text-[11px] sm:text-xs text-zinc-300 max-w-2xl leading-relaxed">
                                    {currentItem.description}
                                </p>
                            )}
                        </div>

                        {currentItem.tech && currentItem.tech.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 justify-center sm:justify-end flex-shrink-0">
                                {currentItem.tech.map((t, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2 py-0.5 rounded-md bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-accent-pink font-semibold"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Thumbnail Filmstrip */}
                    <div className="flex justify-center items-center gap-2 overflow-x-auto py-2 scrollbar-none max-w-4xl mx-auto">
                        {items.map((item, idx) => {
                            const isSelected = idx === currentIndex;
                            return (
                                <button
                                    key={item.id || idx}
                                    type="button"
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`relative flex-shrink-0 h-11 w-16 sm:h-12 sm:w-20 rounded-lg overflow-hidden border-2 transition-all ${
                                        isSelected
                                            ? 'border-accent-pink scale-105 shadow-md shadow-accent-pink/30 opacity-100 ring-2 ring-accent-pink/50'
                                            : 'border-zinc-700/60 opacity-50 hover:opacity-85'
                                    }`}
                                    aria-label={`Pilih preview slide ${idx + 1}: ${item.title || ''}`}
                                >
                                    <img
                                        src={item.image}
                                        alt=""
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    <span className="absolute bottom-0.5 right-1 text-[8px] font-mono font-bold bg-black/70 px-1 rounded text-white">
                                        {idx + 1}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Keyboard Nav Hint */}
                    <div className="text-center text-[10px] font-mono text-zinc-500 hidden md:block">
                        Navigasi: <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700">←</kbd> Sebelumnya · <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700">→</kbd> Berikutnya · <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700">Esc</kbd> Tutup
                    </div>
                </footer>
            </div>
        </AnimatePresence>
    );
};

/* ─────────────────────────────────────────────────────────────
   MAIN INTERACTIVE SHOWCASE COMPONENT
───────────────────────────────────────────────────────────── */
const InteractiveShowcase = ({ project, language = 'id' }) => {
    // Normalise gallery items
    const galleryItems = useMemo(() => {
        if (project?.galleryItems && project.galleryItems.length > 0) {
            return project.galleryItems;
        }
        // Fallback to showcaseImages or single image
        const images = project?.showcaseImages || (project?.image ? [project.image] : []);
        return images.map((img, idx) => ({
            id: `img-${idx}`,
            image: img,
            title: `${project?.title || 'Screenshot'} #${idx + 1}`,
            subtitle: project?.tagline || '',
            category: project?.category || 'General',
            tech: project?.tags?.slice(0, 3) || [],
            description: project?.description || ''
        }));
    }, [project]);

    // Normalise tech stack details
    const techStackDetails = useMemo(() => {
        if (project?.techStackDetails && project.techStackDetails.length > 0) {
            return project.techStackDetails;
        }
        // Fallback from tags
        const tags = project?.tags || [];
        return tags.map(tag => ({
            name: tag,
            category: 'Tech Stack',
            role: `Komponen kunci dalam implementasi arsitektur proyek ${project?.title || ''}.`,
            highlights: ['Terintegrasi dalam arsitektur sistem inti']
        }));
    }, [project]);

    // Extract unique categories for filter
    const categories = useMemo(() => {
        const set = new Set();
        galleryItems.forEach(item => {
            if (item.category) set.add(item.category);
        });
        return ['Semua', ...Array.from(set)];
    }, [galleryItems]);

    // Component State
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [selectedTech, setSelectedTech] = useState(null);
    const [activeTechInfo, setActiveTechInfo] = useState(null);
    const [activeSpotlightIndex, setActiveSpotlightIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalInitialIndex, setModalInitialIndex] = useState(0);

    // Filter items based on category and tech
    const filteredItems = useMemo(() => {
        return galleryItems.filter(item => {
            const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
            const matchesTech = !selectedTech || (item.tech && item.tech.includes(selectedTech));
            return matchesCategory && matchesTech;
        });
    }, [galleryItems, selectedCategory, selectedTech]);

    // Ensure active spotlight index is within bounds of filtered items
    const safeSpotlightIndex =
        activeSpotlightIndex < filteredItems.length && activeSpotlightIndex >= 0
            ? activeSpotlightIndex
            : 0;

    const activeItem = filteredItems[safeSpotlightIndex] || filteredItems[0] || galleryItems[0];

    // Handlers for modal
    const openModalAtCurrentSpotlight = () => {
        const item = filteredItems[safeSpotlightIndex] || activeItem;
        const globalIndex = galleryItems.findIndex(g => g.id === item?.id || g.image === item?.image);
        setModalInitialIndex(globalIndex >= 0 ? globalIndex : 0);
        setIsModalOpen(true);
    };

    const openModalAtItem = (item) => {
        const globalIndex = galleryItems.findIndex(g => g.id === item.id || g.image === item.image);
        setModalInitialIndex(globalIndex >= 0 ? globalIndex : 0);
        setIsModalOpen(true);
    };

    // Toggle tech badge selection & info card
    const handleTechBadgeClick = (tech) => {
        if (activeTechInfo?.name === tech.name) {
            // Deselect
            setActiveTechInfo(null);
        } else {
            setActiveTechInfo(tech);
        }
    };

    const handleFilterByTech = (techName) => {
        if (selectedTech === techName) {
            setSelectedTech(null);
        } else {
            setSelectedTech(techName);
            setSelectedCategory('Semua'); // Reset category when specific tech filter is applied
        }
    };

    const handleResetFilters = () => {
        setSelectedCategory('Semua');
        setSelectedTech(null);
        setActiveTechInfo(null);
        setActiveSpotlightIndex(0);
    };

    if (!galleryItems.length) return null;

    const isIndonesian = language === 'id';

    return (
        <section
            id="interactive-showcase"
            className="w-full bg-bg-card border border-border rounded-[2.5rem] p-6 sm:p-8 md:p-12 space-y-10 shadow-sm relative overflow-hidden transition-colors"
        >
            {/* Background decorative glow */}
            <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-96 h-96 bg-accent-pink/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"
            />
            <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 w-80 h-80 bg-accent-blue/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"
            />

            {/* ── 1. SECTION HEADER ── */}
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/60 pb-6">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-pink/10 border border-accent-pink/30 text-accent-pink text-[10px] font-mono font-black uppercase tracking-[0.2em]">
                        <Sparkles size={12} className="animate-pulse" />
                        {isIndonesian ? 'Showcase Interaktif Percontohan' : 'Pilot Interactive Showcase'}
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
                        {isIndonesian ? 'Preview Media & Eksplorasi Arsitektur' : 'Media Preview & Architecture Explorer'}
                    </h2>
                    <p className="text-text-muted text-xs sm:text-sm max-w-2xl leading-relaxed">
                        {isIndonesian
                            ? 'Jelajahi screenshot alur sistem terintegrasi, uji coba navigasi galeri fullscreen, dan telusuri peran arsitektur teknologi pendukung proyek ini.'
                            : 'Explore integrated system flow screenshots, test the fullscreen preview modal, and inspect the specific technical role of each stack component.'}
                    </p>
                </div>

                {/* Open Fullscreen Button */}
                <button
                    type="button"
                    onClick={openModalAtCurrentSpotlight}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-xl text-xs font-bold hover:opacity-85 transition-all shadow-md self-start md:self-auto flex-shrink-0"
                    aria-label="Buka galeri preview fullscreen"
                >
                    <Maximize2 size={14} />
                    {isIndonesian ? 'Buka Galeri Fullscreen' : 'Open Fullscreen Gallery'}
                </button>
            </div>

            {/* ── 2. INTERACTIVE TECH STACK BADGES & ROLES ── */}
            <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Cpu size={15} className="text-accent-pink" />
                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-text-muted font-mono">
                            {isIndonesian ? 'Badge Tech Stack Interaktif' : 'Interactive Tech Stack Badges'}
                        </h3>
                    </div>
                    <span className="text-[10px] text-text-muted font-mono hidden sm:inline">
                        {isIndonesian ? 'Klik badge untuk melihat detail peran & filter preview' : 'Click badge to inspect role & filter previews'}
                    </span>
                </div>

                {/* Badge list */}
                <div className="flex flex-wrap gap-2.5">
                    {techStackDetails.map((tech) => {
                        const isExpanded = activeTechInfo?.name === tech.name;
                        const isFiltered = selectedTech === tech.name;

                        return (
                            <button
                                key={tech.name}
                                type="button"
                                onClick={() => handleTechBadgeClick(tech)}
                                className={`group flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                                    isExpanded || isFiltered
                                        ? 'bg-accent-pink text-white border-accent-pink shadow-md scale-105'
                                        : 'bg-bg-secondary text-text-primary border-border hover:border-accent-pink/40 hover:bg-bg-secondary/70'
                                }`}
                                aria-expanded={isExpanded}
                                aria-label={`Teknologi ${tech.name}, klik untuk peran`}
                            >
                                <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
                                <span>{tech.name}</span>
                                {tech.category && (
                                    <span
                                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                                            isExpanded || isFiltered
                                                ? 'bg-black/30 text-white'
                                                : 'bg-bg-primary text-text-muted border border-border/50'
                                        }`}
                                    >
                                        {tech.category}
                                    </span>
                                )}
                            </button>
                        );
                    })}

                    {selectedTech && (
                        <button
                            type="button"
                            onClick={() => setSelectedTech(null)}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-red-500 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 transition-colors"
                        >
                            <RotateCcw size={12} />
                            {isIndonesian ? 'Hapus Filter Tech' : 'Clear Tech Filter'}
                        </button>
                    )}
                </div>

                {/* Expanded Tech Stack Role Card */}
                <AnimatePresence>
                    {activeTechInfo && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                        >
                            <div className="p-5 sm:p-6 rounded-2xl bg-bg-secondary/80 border border-accent-pink/30 space-y-4 shadow-sm">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-accent-pink/20 flex items-center justify-center text-accent-pink font-mono font-bold text-xs">
                                            {activeTechInfo.name.slice(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="text-sm sm:text-base font-bold text-text-primary">
                                                {activeTechInfo.name}
                                            </h4>
                                            <p className="text-[11px] font-mono text-accent-pink">
                                                {activeTechInfo.category || 'Architecture Layer'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleFilterByTech(activeTechInfo.name)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                                                selectedTech === activeTechInfo.name
                                                    ? 'bg-accent-pink text-white shadow-sm'
                                                    : 'bg-bg-primary text-text-primary border border-border hover:border-accent-pink'
                                            }`}
                                        >
                                            <Filter size={12} />
                                            {selectedTech === activeTechInfo.name
                                                ? (isIndonesian ? 'Filter Aktif (Klik untuk Batalkan)' : 'Active Filter (Click to Reset)')
                                                : (isIndonesian ? `Filter Screenshot ${activeTechInfo.name}` : `Filter ${activeTechInfo.name} Screens`)}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setActiveTechInfo(null)}
                                            className="p-1.5 rounded-lg hover:bg-bg-primary text-text-muted hover:text-text-primary transition-colors"
                                            aria-label="Tutup detail teknologi"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <Info size={14} className="text-accent-pink mt-0.5 flex-shrink-0" />
                                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                                            <strong className="text-text-primary">
                                                {isIndonesian ? 'Peran dalam Proyek: ' : 'Role in Project: '}
                                            </strong>
                                            {activeTechInfo.role}
                                        </p>
                                    </div>

                                    {activeTechInfo.highlights && activeTechInfo.highlights.length > 0 && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-2">
                                            {activeTechInfo.highlights.map((hl, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-2 p-2.5 rounded-xl bg-bg-primary border border-border/50 text-[11px] text-text-secondary"
                                                >
                                                    <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0" />
                                                    <span className="truncate">{hl}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ── 3. INTERACTIVE PREVIEW GALLERY & SPOTLIGHT ── */}
            <div className="relative z-10 space-y-6">
                {/* Filter and stats row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                                    selectedCategory === cat && !selectedTech
                                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-transparent shadow-sm'
                                        : 'bg-bg-secondary text-text-muted border-border hover:border-zinc-400'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Active filter count & reset */}
                    <div className="flex items-center gap-3 text-xs text-text-muted flex-shrink-0">
                        <span>
                            {isIndonesian ? 'Menampilkan' : 'Showing'}{' '}
                            <strong className="text-text-primary">{filteredItems.length}</strong>{' '}
                            {isIndonesian ? 'preview' : 'previews'}
                        </span>
                        {(selectedCategory !== 'Semua' || selectedTech) && (
                            <button
                                type="button"
                                onClick={handleResetFilters}
                                className="text-accent-pink hover:underline font-bold text-[11px] flex items-center gap-1"
                            >
                                <RotateCcw size={10} />
                                {isIndonesian ? 'Reset Filter' : 'Reset'}
                            </button>
                        )}
                    </div>
                </div>

                {filteredItems.length === 0 ? (
                    <div className="text-center py-12 bg-bg-secondary/40 rounded-3xl border border-dashed border-border space-y-3">
                        <Monitor size={32} className="mx-auto text-text-muted opacity-50" />
                        <p className="text-sm font-bold text-text-primary">
                            {isIndonesian ? 'Tidak ada screenshot yang sesuai filter ini' : 'No screenshots match this filter'}
                        </p>
                        <button
                            type="button"
                            onClick={handleResetFilters}
                            className="px-4 py-2 bg-accent-pink text-white rounded-xl text-xs font-bold hover:opacity-90 transition-opacity"
                        >
                            {isIndonesian ? 'Lihat Semua Screenshot' : 'View All Screenshots'}
                        </button>
                    </div>
                ) : (
                    /* Spotlight Stage & Details */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Spotlight Image Viewer (8 cols) */}
                        <div className="lg:col-span-8 space-y-3">
                            <div
                                onClick={openModalAtCurrentSpotlight}
                                className="group relative rounded-3xl overflow-hidden bg-zinc-950 border border-border/80 aspect-video flex items-center justify-center p-2 cursor-pointer shadow-lg hover:border-accent-pink/60 transition-all"
                                title={isIndonesian ? 'Klik untuk Tampilan Penuh / Fullscreen' : 'Click for Fullscreen Preview'}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        openModalAtCurrentSpotlight();
                                    }
                                }}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={activeItem.image || safeSpotlightIndex}
                                        src={activeItem.image}
                                        alt={activeItem.title}
                                        className="w-full h-full object-contain rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.01 }}
                                        transition={{ duration: 0.25 }}
                                    />
                                </AnimatePresence>

                                {/* Hover Fullscreen Overlay Badge */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-3xl pointer-events-none">
                                    <div className="px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold flex items-center gap-2 shadow-xl transform group-hover:scale-105 transition-transform">
                                        <Maximize2 size={14} className="text-accent-pink" />
                                        <span>{isIndonesian ? 'Klik untuk Fullscreen Modal' : 'Click for Fullscreen Modal'}</span>
                                    </div>
                                </div>

                                {/* Slide navigation overlay buttons */}
                                <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveSpotlightIndex((prev) =>
                                                prev === 0 ? filteredItems.length - 1 : prev - 1
                                            )
                                        }
                                        className="p-2 rounded-full bg-black/70 hover:bg-black border border-white/20 text-white transition-transform hover:scale-105"
                                        aria-label="Slide sebelumnya"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    <span className="px-2.5 py-1 rounded-full bg-black/70 border border-white/20 text-[10px] font-mono text-white font-bold">
                                        {safeSpotlightIndex + 1} / {filteredItems.length}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveSpotlightIndex((prev) =>
                                                prev === filteredItems.length - 1 ? 0 : prev + 1
                                            )
                                        }
                                        className="p-2 rounded-full bg-black/70 hover:bg-black border border-white/20 text-white transition-transform hover:scale-105"
                                        aria-label="Slide berikutnya"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Filmstrip / Thumbnail Row below spotlight */}
                            <div className="flex gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
                                {filteredItems.map((item, idx) => (
                                    <button
                                        key={item.id || idx}
                                        type="button"
                                        onClick={() => setActiveSpotlightIndex(idx)}
                                        className={`flex-shrink-0 h-14 w-20 sm:h-16 sm:w-24 rounded-xl overflow-hidden border-2 transition-all ${
                                            safeSpotlightIndex === idx
                                                ? 'border-accent-pink scale-105 shadow-md ring-2 ring-accent-pink/30'
                                                : 'border-border/60 opacity-60 hover:opacity-100'
                                        }`}
                                        aria-label={`Pilih preview ${idx + 1}`}
                                    >
                                        <img
                                            src={item.image}
                                            alt=""
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Spotlight Meta / Feature Details (4 cols) */}
                        <div className="lg:col-span-4 bg-bg-secondary p-6 sm:p-7 rounded-3xl border border-border space-y-6 flex flex-col justify-between h-full">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="px-2.5 py-1 rounded-full bg-accent-pink/10 border border-accent-pink/30 text-accent-pink text-[10px] font-mono font-bold uppercase tracking-wider">
                                        {activeItem.category || 'Module Feature'}
                                    </span>
                                    <span className="text-[10px] font-mono text-text-muted">
                                        Index {safeSpotlightIndex + 1} of {filteredItems.length}
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-lg sm:text-xl font-bold text-text-primary leading-snug">
                                        {activeItem.title}
                                    </h3>
                                    {activeItem.subtitle && (
                                        <p className="text-xs font-medium text-accent-pink italic">
                                            "{activeItem.subtitle}"
                                        </p>
                                    )}
                                </div>

                                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                                    {activeItem.description}
                                </p>

                                {/* Tech stack tags for this feature */}
                                {activeItem.tech && activeItem.tech.length > 0 && (
                                    <div className="pt-3 border-t border-border/50 space-y-2">
                                        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted">
                                            {isIndonesian ? 'Teknologi Terkait:' : 'Stack Components:'}
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {activeItem.tech.map((t) => (
                                                <button
                                                    key={t}
                                                    type="button"
                                                    onClick={() => handleFilterByTech(t)}
                                                    className={`px-2 py-1 rounded-md text-[10px] font-mono font-bold border transition-colors ${
                                                        selectedTech === t
                                                            ? 'bg-accent-pink text-white border-accent-pink'
                                                            : 'bg-bg-primary text-text-secondary border-border hover:border-accent-pink/50'
                                                    }`}
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-4 border-t border-border/50 flex flex-col gap-2">
                                <button
                                    type="button"
                                    onClick={() => openModalAtItem(activeItem)}
                                    className="w-full py-2.5 px-4 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs flex items-center justify-center gap-2 hover:opacity-85 transition-opacity shadow-md"
                                >
                                    <Eye size={14} />
                                    {isIndonesian ? 'Buka Detail Fullscreen' : 'Open Fullscreen Modal'}
                                </button>
                                <p className="text-center text-[10px] text-text-muted font-mono">
                                    {isIndonesian ? 'Mendukung kontrol tombol Esc & navigasi panah' : 'Supports Esc key & arrow navigation'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ── 4. FULLSCREEN OVERLAY MODAL INSTANCE ── */}
            <ShowcaseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                items={galleryItems}
                initialIndex={modalInitialIndex}
                projectTitle={project?.title}
            />
        </section>
    );
};

export default InteractiveShowcase;
