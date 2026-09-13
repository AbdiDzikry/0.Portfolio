import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, ChevronRight, X, Target, BarChart, Users, Search, Clock,
    ShieldCheck, CheckCircle, TrendingUp, AlertTriangle, Lightbulb,
    Workflow, ArrowRight, Download, Maximize, Minimize
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projectsData } from '../data/projects';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const NonconformityPresentation = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [enlargedImage, setEnlargedImage] = useState(null);
    const [activeAfterImage, setActiveAfterImage] = useState(0);

    const project = projectsData.find(p => p.id === 'portal-aduan') || {};

    const slideVariants = {
        initial: (dir) => ({ opacity: 0, x: dir > 0 ? 100 : -100 }),
        animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
        exit: (dir) => ({ opacity: 0, x: dir > 0 ? -100 : 100, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } })
    };

    const containerVariants = {
        animate: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
    };

    const itemVariants = {
        initial: { opacity: 0, y: 30, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
    };

    /* ── Japanese Manufacturing Palette ──
       ink      #16181D  (sumi)
       paper    #F6F3EB  (washi)
       card     #FBF9F3
       vermilion#C9413B  (shu / akaji)
       gold     #A8823C  (kin)
       steel    #6E6A5C  (muted kogei)                                   */

    const slides = [
        {
            type: 'title',
            label: 'Cover',
            title: 'Nonconformity Integrated System',
            kanji: '統合品質管理システム',
            subtitle: 'Quality Issue Tracking & Resolution System',
            author: 'Sulthan Abdi Dzikry',
            role: 'Full-stack Web Developer',
            icon: <Target className="w-12 h-12 text-[#C9413B]" />
        },
        {
            type: 'pain',
            label: '現状の問題',
            title: 'Tantangan Kualitas',
            subtitle: 'Latar Belakang & 3 Titik Masalah (Pain Points)',
            context: project.problem || 'Quality issue tracking lacked inter-department transparency.',
            problems: [
                { num: '01', tag: 'No Handling Visibility', desc: 'Hard to monitor how far an issue was being handled.' },
                { num: '02', tag: 'Lost Root-Cause History', desc: 'Analysis history disappeared across departments.' },
                { num: '03', tag: 'Overdue Action Plans', desc: 'Many fixes passed their deadlines unnoticed.' }
            ],
            stat: ['Quality Management', 'Cross-Department', '8 RBAC Roles']
        },
        {
            type: 'flow',
            label: '解決への道のり',
            title: 'Solusi Terpadu',
            subtitle: 'Alur Penanganan Terstruktur',
            intro: project.solution || '',
            steps: [
                { title: 'Report', desc: 'Setiap ketidaksesuaian terpusat dalam satu tiket.' },
                { title: 'Meeting', desc: 'Klarifikasi lintas departemen dengan notulen.' },
                { title: 'Root Cause', desc: 'Investigasi Why-Why untuk akar masalah.' },
                { title: 'Action Plan', desc: 'Penugasan otomatis dengan deadline jelas.' },
                { title: 'Verification', desc: 'Verifikasi efektivitas sebelum ditutup.' }
            ]
        },
        {
            type: 'features',
            label: '主要機能',
            title: 'Fitur Utama',
            subtitle: 'Core Features',
            features: [
                { icon: BarChart, name: 'Executive Dashboard', desc: 'Real-time KPI: open, closed, and overdue cases.' },
                { icon: Users, name: 'RBAC 8 Roles', desc: 'Menus and buttons adapted per authority.' },
                { icon: Search, name: 'Why-Why Analysis', desc: 'Root-cause investigation with meeting minutes.' },
                { icon: Clock, name: 'Action Monitoring', desc: 'Auto-assigned tasks with deadline tracking.' }
            ]
        },
        {
            type: 'ba',
            label: '改善の前と後',
            title: 'Sebelum vs Setelah',
            subtitle: 'Before & After Improvement',
            imagesAfter: project.showcaseImages || [],
            rows: (project.beforeAfter || [
                { aspect: 'Reporting', before: '', after: '' },
                { aspect: 'Root Cause', before: '', after: '' },
                { aspect: 'Action Plans', before: '', after: '' },
                { aspect: 'Verification', before: '', after: '' }
            ]),
            impact: project.stats || []
        },
        {
            type: 'impact',
            label: '効果',
            title: 'Dampak & KPI',
            subtitle: 'Result & Effectiveness',
            impact: project.stats || [],
            paragraph: project.impact || '',
            vision: project.strategicAlignment || ''
        },
        {
            type: 'timeline',
            label: '実施期間',
            title: 'Timeline Pengerjaan',
            subtitle: '7 Minggu Design & Development',
            periods: (project.timeline || []).map(t => ({
                month: t.period,
                project: t.phase,
                activities: (t.activities || []).join(' · ')
            }))
        },
        {
            type: 'risk',
            label: '課題と対策',
            title: 'Tantangan & Mitigasi',
            subtitle: 'Challenges & Countermeasures',
            challenges: (project.mitigationPlans || []).map(m => ({ risk: m.risk, action: m.action })),
            recommendations: (project.assumptions || '').split('\n').map(s => s.replace(/^\d+\.\s*/, '')).filter(Boolean),
            impact: project.impact || ''
        },
        {
            type: 'next',
            label: '次の目標',
            title: 'Next Target',
            subtitle: 'Fokus Pengembangan Berikutnya',
            targets: [
                { icon: Workflow, title: 'Closed-Loop Audit', desc: 'Integrasi dengan temuan audit internal & eksternal untuk preventive action.' },
                { icon: Clock, title: 'Mobile Reporting', desc: 'Pelaporan ketidaksesuaian langsung dari lapangan, real-time.' },
                { icon: TrendingUp, title: 'Why-Why Analytics', desc: 'Deteksi pola ketidaksesuaian lintas departemen.' },
                { icon: ShieldCheck, title: 'Compliance Reporting', desc: 'Dukungan laporan kepatuhan SNI / IATF 16949.' },
                { icon: Users, title: 'Multi-Site Adoption', desc: 'Benchmark & adopsi ke sub-entity dalam group.' }
            ]
        },
        {
            type: 'closing',
            label: '御礼',
            title: 'TERIMA KASIH!',
            kanji: 'ありがとうございました',
            subtitle: 'Nonconformity Integrated System — Transparent, Accountable, Smart Factory Quality Management.',
            contact: {
                linkedin: 'Sulthan Abdi Dzikry',
                email: 'abdidzikry.work@gmail.com'
            }
        }
    ];

    const paginate = (newDirection) => {
        if (newDirection > 0 && currentSlide < slides.length - 1) {
            setDirection(1);
            setCurrentSlide(currentSlide + 1);
        } else if (newDirection < 0 && currentSlide > 0) {
            setDirection(-1);
            setCurrentSlide(currentSlide - 1);
        }
    };

    const handleDownloadPDF = async () => {
        setIsDownloading(true);
        setDownloadProgress(0);
        const originalScrollY = window.scrollY;
        window.scrollTo(0, 0);

        try {
            const originalSlide = currentSlide;
            let pdf = null;

            for (let i = 0; i < slides.length; i++) {
                setDownloadProgress(Math.round(((i + 1) / slides.length) * 100));
                setCurrentSlide(i);
                await new Promise(resolve => setTimeout(resolve, 1500));

                const slideElement = document.querySelector('.presentation-card');
                if (slideElement) {
                    const rect = slideElement.getBoundingClientRect();
                    const canvas = await html2canvas(slideElement, {
                        scale: 3,
                        useCORS: true,
                        allowTaint: true,
                        backgroundColor: '#FBF9F3',
                        logging: false,
                        width: rect.width,
                        height: rect.height,
                        scrollX: 0,
                        scrollY: 0,
                        x: 0,
                        y: 0,
                        onclone: (clonedDoc) => {
                            const clonedCard = clonedDoc.querySelector('.presentation-card');
                            if (clonedCard) {
                                clonedCard.style.transform = 'none';
                                clonedCard.style.boxShadow = 'none';
                                const elements = clonedCard.getElementsByTagName('*');
                                for (let j = 0; j < elements.length; j++) {
                                    const el = elements[j];
                                    el.style.opacity = '1';
                                    el.style.visibility = 'visible';
                                    if (el.tagName === 'svg' || el.tagName === 'line' || el.tagName === 'path') {
                                        el.style.display = 'block';
                                        el.style.strokeOpacity = '1';
                                        el.style.opacity = '1';
                                    }
                                }
                            }
                        }
                    });

                    const imgData = canvas.toDataURL('image/jpeg', 0.95);
                    const pdfWidth = 1920;
                    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                    if (!pdf) {
                        pdf = new jsPDF('landscape', 'px', [pdfWidth, pdfHeight]);
                    } else {
                        pdf.addPage([pdfWidth, pdfHeight], 'landscape');
                    }

                    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
                }
            }

            pdf.save('Nonconformity_Integrated_System_Presentation.pdf');
            setCurrentSlide(originalSlide);
        } catch (error) {
            console.error('PDF Generation failed:', error);
            alert('Gagal membuat PDF. Silakan coba lagi.');
        } finally {
            window.scrollTo(0, originalScrollY);
            setIsDownloading(false);
            setDownloadProgress(0);
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') paginate(1);
            if (e.key === 'ArrowLeft') paginate(-1);
            if (e.key === 'Escape') {
                if (enlargedImage) setEnlargedImage(null);
                else navigate('/projects');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSlide, enlargedImage]);

    const current = slides[currentSlide];
    const C = {
        ink: '#16181D',
        paper: '#F6F3EB',
        card: '#FBF9F3',
        line: '#E4DDCB',
        red: '#C9413B',
        redSoft: '#F4E4E0',
        gold: '#A8823C',
        steel: '#6E6A5C'
    };

    return (
        <div className="fixed inset-0 z-[100] bg-[#F1EEE4] text-[#16181D] flex flex-col font-sans overflow-hidden select-none">
            <style>
                {`
                    @media print {
                        @page { size: landscape; margin: 0; }
                        body { background: white; }
                        * { -webkit-print-color-adjust: exact !important; }
                        .no-print { display: none !important; }
                    }
                `}
            </style>

            {/* Sun disc scaffold behind the card */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#C9413B] z-[110] no-print">
                <motion.div
                    className="h-full bg-[#16181D] origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: (currentSlide + 1) / slides.length }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <div className="flex-1 flex items-center justify-center p-2 md:p-6 lg:p-8 relative no-print overflow-hidden">
                <div className="w-full h-full max-w-7xl flex items-center justify-center">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentSlide}
                            custom={direction}
                            variants={slideVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="presentation-card w-full h-auto max-h-full aspect-[16/9] bg-[#FBF9F3] border border-[#E4DDCB] rounded-[2rem] p-8 md:p-10 relative overflow-hidden flex flex-col justify-center shadow-[0_40px_60px_-15px_rgba(22,24,29,0.18)]"
                        >
                            {/* Watermark kanji */}
                            <div className="absolute -right-6 -top-4 text-[180px] md:text-[220px] font-black leading-none text-[#16181D] opacity-[0.035] select-none pointer-events-none">品質</div>

                            {/* Header bar */}
                            <div className="absolute top-6 left-8 right-8 flex items-center justify-between z-50">
                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-1.5 bg-[#C9413B]" />
                                    <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#6E6A5C] font-bold">品質管理 • Manufacturing Quality System</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#C9413B]" />
                                    <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#6E6A5C] font-bold">第 {String(currentSlide + 1).padStart(2, '0')} 章 / {String(slides.length).padStart(2, '0')}</span>
                                </div>
                            </div>

                            {current.type === 'title' && (
                                <motion.div variants={containerVariants} initial="initial" animate="animate" className="relative text-center space-y-5 pt-4">
                                    {/* Sun disc */}
                                    <motion.div variants={itemVariants} className="relative flex items-center justify-center mb-3">
                                        <div className="w-20 h-20 rounded-full bg-[#C9413B] flex items-center justify-center shadow-[0_0_0_6px_#C9413B22,0_0_0_12px_#C9413B11]">
                                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
                                                {current.icon}
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                    <motion.p variants={itemVariants} className="text-[10px] font-mono uppercase tracking-[0.45em] text-[#A8823C] font-black flex items-center justify-center gap-3">
                                        <span className="h-px w-10 bg-[#A8823C]" /> MONOZUKURI · KAIZEN · QUALITY FIRST <span className="h-px w-10 bg-[#A8823C]" />
                                    </motion.p>
                                    <motion.div variants={itemVariants} className="flex items-start justify-center gap-5">
                                        <h1 className="text-4xl md:text-5xl font-black text-[#16181D] leading-tight tracking-tighter">
                                            {current.title}
                                        </h1>
                                        <span className="hidden md:block text-[13px] font-black text-[#C9413B] [writing-mode:vertical-rl] tracking-[0.2em] leading-relaxed mt-1">{current.kanji}</span>
                                    </motion.div>
                                    <motion.div variants={itemVariants} className="flex items-center justify-center gap-3">
                                        <div className="h-px w-8 bg-[#16181D]/30" />
                                        <p className="text-sm text-[#6E6A5C] font-mono tracking-[0.3em] uppercase">
                                            {current.subtitle}
                                        </p>
                                        <div className="h-px w-8 bg-[#16181D]/30" />
                                    </motion.div>
                                    <motion.div variants={itemVariants} className="flex items-center justify-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-[#C9413B]" />
                                        <p className="text-xs text-[#6E6A5C] font-bold tracking-tight">{current.author} — {current.role}</p>
                                    </motion.div>
                                    <motion.div variants={itemVariants} className="flex justify-center gap-2 mt-1">
                                        <span className="px-3 py-1 border border-[#16181D]/20 rounded-full text-[9px] font-black uppercase tracking-widest text-[#6E6A5C]">現地現物 <span className="text-[#C9413B]">•</span> 3-Gen</span>
                                        <span className="px-3 py-1 border border-[#16181D]/20 rounded-full text-[9px] font-black uppercase tracking-widest text-[#6E6A5C]">PDCA <span className="text-[#C9413B]">•</span> Kaizen</span>
                                        <span className="px-3 py-1 border border-[#16181D]/20 rounded-full text-[9px] font-black uppercase tracking-widest text-[#6E6A5C]">Zero Defect</span>
                                    </motion.div>
                                </motion.div>
                            )}

                            {current.type === 'pain' && (
                                <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex h-full gap-6 pt-12 pb-1">
                                    <div className="w-[34%] shrink-0 flex flex-col justify-between py-1 border-r border-[#E4DDCB] pr-6">
                                        <div>
                                            <div className="flex items-center gap-2.5 mb-2">
                                                <span className="px-2.5 py-1 bg-[#C9413B] text-white rounded-md text-[9px] font-black tracking-widest uppercase">現状の問題</span>
                                                <motion.p variants={itemVariants} className="text-[#6E6A5C] font-mono text-[9px] tracking-[0.2em] uppercase leading-relaxed">Current Problems</motion.p>
                                            </div>
                                            <motion.h2 variants={itemVariants} className="text-3xl lg:text-[32px] font-black text-[#16181D] uppercase tracking-tighter mb-2 leading-[1.1]">{current.title}</motion.h2>
                                            <motion.p variants={itemVariants} className="text-[#6E6A5C] font-mono text-[9px] tracking-[0.2em] uppercase leading-relaxed mb-5">{current.subtitle}</motion.p>
                                            <motion.div variants={itemVariants} className="space-y-4">
                                                <div className="flex gap-3 items-start">
                                                    <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#C9413B] shrink-0" />
                                                    <p className="text-[11px] lg:text-[12px] leading-[1.6] text-[#6E6A5C] font-medium">
                                                        {current.context}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        </div>
                                        <motion.div variants={itemVariants} className="space-y-2.5 mt-6">
                                            {current.stat.map((val, i) => (
                                                <div key={i} className="flex items-center gap-2.5 border border-[#E4DDCB] rounded-lg px-3 py-2">
                                                    <div className={`w-1.5 h-6 ${i === 0 ? 'bg-[#C9413B]' : 'bg-[#A8823C]'}`} />
                                                    <p className="text-[9px] lg:text-[10px] font-black text-[#16181D] uppercase tracking-tight">{val}</p>
                                                </div>
                                            ))}
                                        </motion.div>
                                    </div>
                                    <div className="w-[66%] min-h-0 flex flex-col pl-1">
                                        <div className="grid grid-cols-3 gap-3 h-full">
                                            {current.problems.map((p, i) => (
                                                <motion.div key={i} variants={itemVariants} className="bg-white border border-[#E4DDCB] rounded-[1.25rem] flex flex-col overflow-hidden hover:shadow-lg hover:border-[#C9413B]/50 transition-all group relative">
                                                    <div className="h-1 w-full bg-[#C9413B]" />
                                                    <div className="relative bg-[#F6F3EB] border-b border-[#E4DDCB] flex items-center justify-center p-3 overflow-hidden" style={{ flex: '1 1 0' }}>
                                                        <div className="absolute top-2 right-3 text-[11px] font-black font-mono text-[#C9413B] tracking-widest z-10">{p.num}</div>
                                                        <span className="text-[48px] font-black text-[#16181D]/[0.06] absolute select-none group-hover:text-[#C9413B]/[0.08] transition-colors">{p.num}</span>
                                                        <AlertTriangle size={20} className="text-[#C9413B] group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                                                    </div>
                                                    <div className="flex-1 p-4 flex flex-col pt-3 bg-[#FBF9F3] relative z-10">
                                                        <h4 className="text-[12px] lg:text-[13px] font-black uppercase tracking-widest text-[#16181D] leading-tight mb-1.5">{p.tag}</h4>
                                                        <p className="text-[10px] lg:text-[11px] text-[#6E6A5C] font-medium leading-snug">{p.desc}</p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {current.type === 'flow' && (
                                <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex flex-col h-full pt-12 justify-center">
                                    <motion.div variants={itemVariants} className="text-center mb-4">
                                        <div className="flex items-center justify-center gap-2.5 mb-2">
                                            <span className="px-2.5 py-1 bg-[#C9413B] text-white rounded-md text-[9px] font-black tracking-widest uppercase">解決への道のり</span>
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-black text-[#16181D] uppercase tracking-tighter mb-1">{current.title}</h2>
                                        <p className="text-[#6E6A5C] font-mono text-[9px] tracking-[0.3em] uppercase">{current.subtitle}</p>
                                    </motion.div>
                                    <motion.p variants={itemVariants} className="max-w-3xl mx-auto text-center text-[12px] text-[#6E6A5C] font-medium leading-relaxed mb-8">
                                        {current.intro}
                                    </motion.p>
                                    <div className="flex items-stretch justify-center gap-2 px-2">
                                        {current.steps.map((s, i) => (
                                            <React.Fragment key={i}>
                                                {i > 0 && (
                                                    <div className="flex items-center px-1 shrink-0">
                                                        <div className="w-6 h-px bg-[#A8823C]" />
                                                        <ArrowRight size={12} className="text-[#C9413B] -ml-1" />
                                                    </div>
                                                )}
                                                <motion.div variants={itemVariants} className="flex-1 bg-[#F6F3EB] border border-[#E4DDCB] rounded-2xl p-4 flex flex-col items-center text-center gap-2 hover:border-[#C9413B]/60 hover:bg-white hover:shadow-md transition-all group min-w-0">
                                                    <div className="w-8 h-8 rounded-full bg-[#C9413B] text-white text-[11px] font-black flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                                        {String(i + 1).padStart(2, '0')}
                                                    </div>
                                                    <h4 className="text-[11px] lg:text-[12px] font-black uppercase tracking-widest text-[#16181D] leading-tight">{s.title}</h4>
                                                    <p className="text-[9px] lg:text-[10px] text-[#6E6A5C] font-medium leading-snug">{s.desc}</p>
                                                </motion.div>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    <motion.div variants={itemVariants} className="flex justify-center gap-2.5 mt-8">
                                        {(project.tags || []).slice(0, 5).map((tag, i) => (
                                            <div key={i} className="border border-[#16181D]/20 rounded-lg px-2.5 py-1.5">
                                                <p className="text-[9px] font-black text-[#6E6A5C] uppercase tracking-tight">{tag}</p>
                                            </div>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            )}

                            {current.type === 'features' && (
                                <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex flex-col h-full pt-12">
                                    <motion.div variants={itemVariants} className="text-center mb-6">
                                        <div className="flex items-center justify-center gap-2.5 mb-2">
                                            <span className="px-2.5 py-1 bg-[#C9413B] text-white rounded-md text-[9px] font-black tracking-widest uppercase">主要機能</span>
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-black text-[#16181D] uppercase tracking-tighter mb-1">{current.title}</h2>
                                        <p className="text-[#6E6A5C] font-mono text-[9px] tracking-[0.3em] uppercase">{current.subtitle}</p>
                                    </motion.div>
                                    <div className="grid grid-cols-2 grid-rows-2 gap-4 flex-1 pb-1">
                                        {current.features.map((f, i) => (
                                            <motion.div key={i} variants={itemVariants} className="relative bg-white border border-[#E4DDCB] p-5 rounded-[1.5rem] flex items-center gap-4 hover:drop-shadow-xl hover:-translate-y-0.5 hover:border-[#C9413B]/40 transition-all group overflow-hidden">
                                                <div className="absolute top-0 left-0 w-1 h-full bg-[#C9413B]" />
                                                <div className="absolute top-4 right-5 text-[9px] font-black font-mono text-[#C9413B] tracking-[0.3em] select-none">{String(i + 1).padStart(2, '0')}</div>
                                                <div className="w-12 h-12 rounded-full bg-[#16181D] text-[#F6F3EB] flex items-center justify-center shrink-0 group-hover:bg-[#C9413B] group-hover:text-white transition-colors duration-500">
                                                    <f.icon size={20} strokeWidth={1.75} />
                                                </div>
                                                <div>
                                                    <h4 className="text-[12px] lg:text-[14px] font-black uppercase tracking-widest text-[#16181D] leading-tight mb-1.5">{f.name}</h4>
                                                    <p className="text-[10px] lg:text-[11px] text-[#6E6A5C] font-medium leading-snug max-w-sm">{f.desc}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {current.type === 'ba' && (
                                <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex flex-row h-full gap-6 pt-12 pb-1 items-stretch px-1 overflow-hidden">
                                    <div className="w-[40%] flex flex-col gap-3 h-full">
                                        <motion.div variants={itemVariants} className="flex-1 relative bg-[#F4E4E0] border border-[#C9413B]/30 rounded-[1.5rem] overflow-hidden flex flex-col items-center justify-center min-h-0 shadow-sm">
                                            <div className="absolute top-3 left-4 px-3 py-1 bg-[#C9413B] text-white rounded-lg text-[9px] font-black tracking-widest uppercase z-20">改善前 Before</div>
                                            <div className="flex flex-col items-center gap-2 opacity-50">
                                                <X size={24} className="text-[#C9413B]" />
                                                <span className="text-[9px] font-mono font-black tracking-widest uppercase text-[#16181D] text-center">Proses Manual & Laporan Tersebar</span>
                                            </div>
                                        </motion.div>
                                        <motion.div variants={itemVariants} className="flex-1 relative bg-[#16181D] border border-[#16181D] rounded-[1.5rem] overflow-hidden flex flex-col group shadow-sm min-h-0">
                                            <div className="absolute top-3 left-4 px-3 py-1 bg-[#F6F3EB] text-[#16181D] rounded-lg text-[9px] font-black tracking-widest uppercase z-20">改善後 After</div>
                                            {/* Sun accent */}
                                            <div className="absolute top-3 right-4 w-7 h-7 rounded-full bg-[#C9413B] opacity-80 z-10" />
                                            <div className="flex-1 w-full h-full bg-white flex items-center justify-center p-6 pt-10 relative">
                                                <div className="w-full h-full bg-[#FBF9F3] rounded-xl overflow-hidden shadow-lg relative flex items-center justify-center">
                                                    {current.imagesAfter.length > 0 && (
                                                        <img
                                                            src={current.imagesAfter[activeAfterImage % current.imagesAfter.length]}
                                                            alt="After"
                                                            className="max-w-full max-h-full object-contain cursor-pointer"
                                                            onClick={() => setEnlargedImage(current.imagesAfter[activeAfterImage % current.imagesAfter.length])}
                                                        />
                                                    )}
                                                </div>
                                                {current.imagesAfter.length > 1 && (
                                                    <>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); setActiveAfterImage(prev => prev > 0 ? prev - 1 : current.imagesAfter.length - 1); }}
                                                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/70 hover:bg-white rounded-full flex items-center justify-center shadow-sm text-[#6E6A5C] hover:text-[#C9413B] transition-all z-10 opacity-40 hover:opacity-100"
                                                        >
                                                            <ChevronLeft size={16} />
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); setActiveAfterImage(prev => prev < current.imagesAfter.length - 1 ? prev + 1 : 0); }}
                                                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/70 hover:bg-white rounded-full flex items-center justify-center shadow-sm text-[#6E6A5C] hover:text-[#C9413B] transition-all z-10 opacity-40 hover:opacity-100"
                                                        >
                                                            <ChevronRight size={16} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                            <div className="px-4 pb-2 pt-1 flex items-center justify-center">
                                                <span className="text-[8px] font-mono font-black uppercase tracking-widest text-[#F6F3EB]/70">
                                                    Preview {(activeAfterImage % current.imagesAfter.length) + 1} / {current.imagesAfter.length}
                                                </span>
                                            </div>
                                        </motion.div>
                                    </div>
                                    <div className="w-[60%] flex flex-col h-full pl-4 overflow-y-auto pr-2 custom-scrollbar">
                                        <div className="mb-3">
                                            <div className="flex items-center gap-2.5 mb-1.5">
                                                <span className="px-2.5 py-1 bg-[#C9413B] text-white rounded-md text-[9px] font-black tracking-widest uppercase">改善の前と後</span>
                                            </div>
                                            <motion.h2 variants={itemVariants} className="text-lg lg:text-xl font-black text-[#16181D] uppercase tracking-tighter mb-1 leading-none">{current.title}</motion.h2>
                                            <motion.p variants={itemVariants} className="text-[#6E6A5C] font-mono text-[11px] lg:text-[12px] tracking-widest uppercase font-bold">{current.subtitle}</motion.p>
                                        </div>
                                        <div className="flex flex-col gap-2 mb-2">
                                            {current.rows.map((r, i) => (
                                                <motion.div variants={itemVariants} key={i} className="bg-white border border-[#E4DDCB] rounded-xl px-4 py-2.5 flex items-center gap-3">
                                                    <span className="text-[9px] font-black font-mono uppercase tracking-widest text-[#C9413B] w-24 shrink-0">{r.aspect}</span>
                                                    <div className="flex-1 flex items-center gap-2 min-w-0">
                                                        <span className="text-[11px] font-semibold text-[#6E6A5C] line-through decoration-[#C9413B]/60 decoration-2 flex-1 min-w-0">{r.before}</span>
                                                        <div className="w-5 h-5 rounded-full bg-[#16181D] text-[#F6F3EB] flex items-center justify-center shrink-0"><ArrowRight size={11} /></div>
                                                        <span className="text-[11px] font-bold text-[#16181D] flex-1 min-w-0">{r.after}</span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                        {current.impact.length > 0 && (
                                            <div className="mt-3 border-t border-[#E4DDCB] pt-2">
                                                <motion.div variants={itemVariants} className="flex items-center gap-2 mb-2">
                                                    <div className="p-0.5 bg-[#C9413B] rounded text-white shadow-sm"><TrendingUp size={12} /></div>
                                                    <h3 className="text-[10px] font-black text-[#16181D] uppercase tracking-widest">Metrik Sistem</h3>
                                                </motion.div>
                                                <div className="grid grid-cols-4 gap-x-5">
                                                    {current.impact.map((res, i) => (
                                                        <motion.div variants={itemVariants} key={i} className="group">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <div className="w-6 h-6 rounded-lg bg-[#F6F3EB] border border-[#E4DDCB] flex items-center justify-center text-[#C9413B] group-hover:scale-110 transition-all duration-300 shadow-sm shrink-0">
                                                                    {i === 0 ? <Users size={12} /> : i === 1 ? <TrendingUp size={12} /> : i === 2 ? <Workflow size={12} /> : <ShieldCheck size={12} />}
                                                                </div>
                                                                <h4 className="text-base font-black text-[#16181D] leading-none tracking-tight">{res.value}</h4>
                                                            </div>
                                                            <p className="text-[8px] font-black text-[#C9413B] uppercase tracking-widest mb-1 px-1">{res.label}</p>
                                                            <p className="text-[9px] lg:text-[10px] text-[#6E6A5C] font-medium leading-tight px-1 max-w-[130px]">{res.description}</p>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {current.type === 'impact' && (
                                <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex flex-col h-full pt-12">
                                    <motion.div variants={itemVariants} className="text-center mb-6">
                                        <div className="flex items-center justify-center gap-2.5 mb-2">
                                            <span className="px-2.5 py-1 bg-[#C9413B] text-white rounded-md text-[9px] font-black tracking-widest uppercase">効果</span>
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-black text-[#16181D] uppercase tracking-tighter mb-1">{current.title}</h2>
                                        <p className="text-[#6E6A5C] font-mono text-[9px] tracking-[0.3em] uppercase">{current.subtitle}</p>
                                    </motion.div>
                                    <div className="grid grid-cols-4 gap-4 mb-5">
                                        {current.impact.map((res, i) => (
                                            <motion.div key={i} variants={itemVariants} className="bg-white border border-[#E4DDCB] border-t-2 border-t-[#C9413B] rounded-[1.5rem] p-5 text-center hover:drop-shadow-xl hover:-translate-y-0.5 hover:border-[#C9413B]/40 transition-all group">
                                                <div className="w-10 h-10 mx-auto rounded-full bg-[#16181D] text-[#F6F3EB] flex items-center justify-center mb-3 group-hover:bg-[#C9413B] group-hover:text-white transition-colors duration-500">
                                                    {i === 0 ? <Users size={16} /> : i === 1 ? <TrendingUp size={16} /> : i === 2 ? <Workflow size={16} /> : <ShieldCheck size={16} />}
                                                </div>
                                                <div className="text-2xl font-black text-[#16181D] mb-1 tracking-tight">{res.value}</div>
                                                <p className="text-[9px] font-black text-[#C9413B] uppercase tracking-widest mb-1.5">{res.label}</p>
                                                <p className="text-[9.5px] text-[#6E6A5C] font-medium leading-tight">{res.description}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <motion.div variants={itemVariants} className="flex-1 bg-[#16181D] rounded-[1.5rem] p-6 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
                                        <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-[#C9413B] opacity-[0.12]" />
                                        <div className="absolute right-10 top-8 w-3 h-3 rounded-full bg-[#C9413B]" />
                                        <div className="absolute right-16 top-12 w-1.5 h-1.5 rounded-full bg-[#A8823C]" />
                                        <div className="flex items-center gap-4 relative z-10">
                                            <div className="w-10 h-10 rounded-full bg-[#C9413B] text-white flex items-center justify-center shrink-0"><CheckCircle size={18} /></div>
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#A8823C] font-bold">Impact</span>
                                                <p className="text-white font-bold text-sm leading-snug max-w-xl">{current.paragraph}</p>
                                            </div>
                                        </div>
                                        <div className="px-4 py-2 rounded-xl bg-white/[0.06] border border-white/10 text-[#F6F3EB] text-[10px] font-black uppercase tracking-widest text-center relative z-10 max-w-md">
                                            {current.vision}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}

                            {current.type === 'timeline' && (
                                <div className="flex flex-col h-full relative pt-16 pb-12">
                                    <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-3xl font-black text-center text-[#16181D] uppercase tracking-tighter mb-2">{current.title}</motion.h2>
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#6E6A5C] font-mono text-[9px] tracking-[0.3em] uppercase text-center mb-8">{current.subtitle}</motion.p>
                                    <div className="relative flex-1 px-10 flex items-center">
                                        <svg className="absolute top-1/2 left-0 right-0 w-full h-[2px] -translate-y-1/2 overflow-visible pointer-events-none">
                                            <motion.line x1="0" y1="0" x2="100%" y2="0" stroke="#E4DDCB" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }} />
                                        </svg>
                                        <div className="relative z-10 w-full flex justify-between items-center h-60">
                                            {current.periods.map((item, i) => (
                                                <motion.div key={i} initial={{ opacity: 0, y: i % 2 === 0 ? -30 : 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + (i * 0.1), type: "spring", stiffness: 100 }} className="flex-1 flex flex-col items-center group relative h-full">
                                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                                        <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 3, delay: i * 0.4 }} className="absolute w-3 h-3 rounded-full bg-[#C9413B]/10" />
                                                        <div className="w-3 h-3 rounded-full bg-[#FBF9F3] border-[3px] border-[#C9413B] z-20 shadow-md group-hover:scale-150 transition-all duration-500" />
                                                    </div>
                                                    <motion.div initial={{ height: 0 }} animate={{ height: 60 }} transition={{ delay: 1, duration: 0.8 }} className={`absolute left-1/2 -translate-x-1/2 w-px bg-[#E4DDCB] group-hover:bg-[#C9413B] transition-colors duration-500 ${i % 2 === 0 ? 'bottom-1/2 mb-1.5' : 'top-1/2 mt-1.5'}`} />
                                                    <div className={`absolute w-full px-4 text-center space-y-2 transform ${i % 2 === 0 ? 'bottom-[58%]' : 'top-[58%]'}`}>
                                                        <div className="flex flex-col items-center gap-1.5">
                                                            <span className="px-3 py-1 bg-white border-2 border-[#C9413B] rounded-full text-[10px] font-black text-[#C9413B] uppercase tracking-widest shadow-sm inline-block group-hover:bg-[#C9413B] group-hover:text-white transition-all duration-300">{item.month}</span>
                                                            <div className="space-y-1">
                                                                <h4 className="text-xs font-black text-[#16181D] leading-tight uppercase tracking-tighter">{item.project}</h4>
                                                                <p className="text-[10px] md:text-[11px] text-[#6E6A5C] leading-snug font-bold group-hover:text-[#16181D] transition-colors">{item.activities}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {current.type === 'risk' && (
                                <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex flex-col h-full pt-14">
                                    <motion.div variants={itemVariants} className="text-center mb-5">
                                        <div className="flex items-center justify-center gap-2.5 mb-2">
                                            <span className="px-2.5 py-1 bg-[#C9413B] text-white rounded-md text-[9px] font-black tracking-widest uppercase">課題と対策</span>
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-black text-[#16181D] uppercase tracking-tighter mb-1">{current.title}</h2>
                                        <p className="text-[#6E6A5C] font-mono text-[9px] tracking-[0.3em] uppercase">{current.subtitle}</p>
                                    </motion.div>
                                    <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
                                        <motion.div variants={itemVariants} className="flex flex-col gap-3 min-h-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <AlertTriangle size={14} className="text-[#C9413B]" />
                                                <h3 className="text-[10px] font-black text-[#16181D] uppercase tracking-widest">課題 (Challenges)</h3>
                                            </div>
                                            {current.challenges.map((c, i) => (
                                                <div key={i} className="bg-[#16181D] rounded-[1.25rem] p-4 flex-1 overflow-hidden group relative">
                                                    <div className="absolute -right-3 -top-3 w-16 h-16 rounded-full bg-[#C9413B] opacity-[0.12]" />
                                                    <div className="absolute top-4 right-5 text-[9px] font-black font-mono text-[#F6F3EB]/25 tracking-[0.3em] select-none">0{i + 1}</div>
                                                    <h4 className="text-[12px] font-black text-white uppercase tracking-widest mb-1.5 relative z-10">{c.risk}</h4>
                                                    <p className="text-[10.5px] text-[#E4DDCB] font-medium leading-relaxed relative z-10">{c.action}</p>
                                                </div>
                                            ))}
                                        </motion.div>
                                        <motion.div variants={itemVariants} className="flex flex-col gap-3 min-h-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Lightbulb size={14} className="text-[#A8823C]" />
                                                <h3 className="text-[10px] font-black text-[#16181D] uppercase tracking-widest">対策 (Recommendations)</h3>
                                            </div>
                                            {current.recommendations.map((r, i) => (
                                                <div key={i} className="bg-white border border-[#E4DDCB] rounded-[1.25rem] p-4 flex-1 overflow-hidden group relative hover:border-[#C9413B]/40 hover:shadow-md transition-all">
                                                    <div className="absolute top-0 left-0 w-1 h-full bg-[#A8823C]" />
                                                    <div className="absolute top-4 right-5 text-[9px] font-black font-mono text-[#C9413B] tracking-[0.3em] select-none">0{i + 1}</div>
                                                    <h4 className="text-[12px] font-black text-[#16181D] uppercase tracking-widest mb-1.5">Key Assumption</h4>
                                                    <p className="text-[10.5px] text-[#6E6A5C] font-medium leading-relaxed">{r}</p>
                                                </div>
                                            ))}
                                        </motion.div>
                                    </div>
                                    <motion.div variants={itemVariants} className="mt-4 px-5 py-3 bg-[#F4E4E0] border border-[#C9413B]/30 rounded-2xl flex items-center gap-3">
                                        <div className="p-1 bg-[#C9413B] rounded text-white"><TrendingUp size={13} /></div>
                                        <p className="text-[10px] lg:text-[11px] text-[#7C2A26] font-bold leading-snug">{current.impact}</p>
                                    </motion.div>
                                </motion.div>
                            )}

                            {current.type === 'next' && (
                                <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex flex-col h-full pt-14">
                                    <motion.div variants={itemVariants} className="text-center mb-6">
                                        <div className="flex items-center justify-center gap-2.5 mb-2">
                                            <span className="px-2.5 py-1 bg-[#C9413B] text-white rounded-md text-[9px] font-black tracking-widest uppercase">次の目標</span>
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-black text-[#16181D] uppercase tracking-tighter mb-1">{current.title}</h2>
                                        <p className="text-[#6E6A5C] font-mono text-[9px] tracking-[0.3em] uppercase">{current.subtitle}</p>
                                    </motion.div>
                                    <div className="grid grid-cols-3 grid-rows-2 gap-3 flex-1 pb-1">
                                        {current.targets.map((t, i) => (
                                            <motion.div key={i} variants={itemVariants} className="relative bg-white border border-[#E4DDCB] rounded-[1.5rem] p-4 flex items-center gap-3.5 hover:drop-shadow-xl hover:-translate-y-0.5 hover:border-[#C9413B]/40 transition-all group overflow-hidden">
                                                <div className="absolute top-3.5 right-4 text-[9px] font-black font-mono text-[#C9413B]/40 group-hover:text-[#C9413B] transition-colors select-none">{String(i + 1).padStart(2, '0')}</div>
                                                <div className="w-11 h-11 rounded-full bg-[#F6F3EB] border border-[#E4DDCB] text-[#C9413B] flex items-center justify-center shadow-sm shrink-0 group-hover:bg-[#C9413B] group-hover:text-white group-hover:border-[#C9413B] transition-all duration-500">
                                                    <t.icon size={18} strokeWidth={1.75} />
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="text-[12px] font-black uppercase tracking-widest text-[#16181D] leading-tight mb-1">{t.title}</h4>
                                                    <p className="text-[9.5px] lg:text-[10px] text-[#6E6A5C] font-medium leading-snug">{t.desc}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <motion.div variants={itemVariants} className="mt-3 flex items-center justify-center gap-2.5">
                                        <div className="w-2 h-2 rounded-full bg-[#C9413B]" />
                                        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6E6A5C] font-bold">改善は継続する • Kaizen wa keizoku suru (Improvement Continues)</p>
                                        <div className="w-2 h-2 rounded-full bg-[#C9413B]" />
                                    </motion.div>
                                </motion.div>
                            )}

                            {current.type === 'closing' && (
                                <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex flex-col items-center justify-center text-center h-full pt-10 space-y-5 px-8 relative">
                                    <motion.div variants={itemVariants} className="relative flex items-center justify-center">
                                        <div className="w-20 h-20 rounded-full bg-[#C9413B] flex items-center justify-center shadow-[0_0_0_6px_#C9413B22,0_0_0_12px_#C9413B11]">
                                            <CheckCircle className="w-10 h-10 text-white" strokeWidth={1.5} />
                                        </div>
                                    </motion.div>
                                    <motion.div variants={itemVariants}>
                                        <h2 className="text-5xl md:text-6xl font-black text-[#16181D] tracking-tighter uppercase leading-[0.9]">
                                            {current.title}
                                        </h2>
                                        <p className="mt-2 text-[20px] font-black text-[#C9413B] [writing-mode:horizontal-tb] tracking-[0.2em]">{current.kanji}</p>
                                    </motion.div>
                                    <motion.p variants={itemVariants} className="text-[#6E6A5C] font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase max-w-2xl mx-auto leading-relaxed">
                                        {current.subtitle}
                                    </motion.p>
                                    <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 pt-1">
                                        <div className="h-px w-8 bg-[#16181D]/30" />
                                        <div className="w-1.5 h-1.5 bg-[#C9413B]" />
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#6E6A5C]">{current.contact.linkedin} • {current.contact.email}</p>
                                        <div className="w-1.5 h-1.5 bg-[#C9413B]" />
                                        <div className="h-px w-8 bg-[#16181D]/30" />
                                    </motion.div>
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-3 md:px-5 no-print z-[90]">
                    <button onClick={() => paginate(-1)} disabled={currentSlide === 0} className={`p-2 rounded-full bg-white/20 backdrop-blur-md border border-[#E4DDCB]/40 text-[#6E6A5C] hover:text-[#C9413B] hover:bg-white pointer-events-auto transition-all shadow-sm ${currentSlide === 0 ? 'opacity-0 scale-50 cursor-default' : 'opacity-20 hover:opacity-100'}`}><ChevronLeft size={20} /></button>
                    <button onClick={() => paginate(1)} disabled={currentSlide === slides.length - 1} className={`p-2 rounded-full bg-white/20 backdrop-blur-md border border-[#E4DDCB]/40 text-[#6E6A5C] hover:text-[#C9413B] hover:bg-white pointer-events-auto transition-all shadow-sm ${currentSlide === slides.length - 1 ? 'opacity-0 scale-50 cursor-default' : 'opacity-20 hover:opacity-100'}`}><ChevronRight size={20} /></button>
                </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="h-12 px-6 flex justify-between items-center bg-[#F1EEE4]/70 backdrop-blur-xl border-t border-[#E4DDCB] z-50 no-print">
                <div className="flex items-center gap-3">
                    {slides.map((s, i) => (
                        <button key={i} onClick={() => { setDirection(i > currentSlide ? 1 : -1); setCurrentSlide(i); }} className="group relative py-2 focus:outline-none">
                            {i === currentSlide && <div className="absolute -top-[13px] left-1/2 -translate-x-1/2 text-[8px] font-black font-mono opacity-0 group-hover:opacity-0 whitespace-nowrap" />}
                            <motion.div animate={{ width: i === currentSlide ? 32 : 4, backgroundColor: i === currentSlide ? "#C9413B" : "#D8CFBA" }} className="h-1.5 rounded-full transition-colors group-hover:bg-[#C9413B]/70" />
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#16181D] text-white text-[7px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">{s.label}</div>
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/projects')}
                        className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E4DDCB] text-[#16181D] rounded-lg font-bold text-[8px] uppercase tracking-widest hover:border-[#C9413B] hover:text-[#C9413B] transition-all active:scale-95"
                    >
                        <X size={10} />
                        Exit
                    </button>
                    <button
                        onClick={toggleFullscreen}
                        className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E4DDCB] text-[#16181D] rounded-lg font-bold text-[8px] uppercase tracking-widest hover:border-[#C9413B] hover:text-[#C9413B] transition-all active:scale-95"
                    >
                        {isFullscreen ? <Minimize size={10} /> : <Maximize size={10} />}
                        {isFullscreen ? 'Exit' : 'Full Screen'}
                    </button>
                    <button
                        onClick={handleDownloadPDF}
                        disabled={isDownloading}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-[8px] uppercase tracking-widest transition-all active:scale-95 ${isDownloading ? 'bg-white text-[#B9B09A] cursor-not-allowed border border-[#E4DDCB]' : 'bg-[#C9413B] text-white hover:bg-[#A9352F]'}`}
                    >
                        <Download size={10} className={isDownloading ? 'animate-bounce' : ''} />
                        {isDownloading ? `Processing ${downloadProgress}%` : 'Download PDF'}
                    </button>
                    <div className="flex items-center gap-2 text-[#6E6A5C]"><div className="w-1 h-1 rounded-full bg-[#C9413B]" /><span className="font-mono text-[8px] font-black text-[#16181D] uppercase">第 {currentSlide + 1} 章 / {slides.length}</span></div>
                </div>
            </motion.div>

            {enlargedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] bg-[#16181D]/95 backdrop-blur-sm flex items-center justify-center p-8 no-print"
                    onClick={() => setEnlargedImage(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative max-w-full max-h-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setEnlargedImage(null)}
                            className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
                        >
                            <X size={20} />
                        </button>
                        <img
                            src={enlargedImage}
                            alt="Enlarged view"
                            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                        />
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default NonconformityPresentation;