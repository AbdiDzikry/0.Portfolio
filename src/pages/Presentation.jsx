import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, ChevronRight, X, User, Briefcase, Calendar, Target,
    Lightbulb, MessageSquare, Layout, TrendingUp, ShieldCheck,
    Linkedin, Mail, ArrowRight, GraduationCap, Search, Users, Rocket,
    Smartphone, Tablet, CheckCircle, BarChart, Download, Check, Maximize, Minimize
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projectsData } from '../data/projects';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const Presentation = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);

    const project = projectsData.find(p => p.id === 'internship-detail') || {};

    // Simplified Animation Variants for Better Performance
    const slideVariants = {
        initial: (direction) => ({
            opacity: 0,
            x: direction > 0 ? 100 : -100,
        }),
        animate: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
        },
        exit: (direction) => ({
            opacity: 0,
            x: direction > 0 ? -100 : 100,
            transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
        })
    };

    const containerVariants = {
        animate: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
    };

    const itemVariants = {
        initial: { opacity: 0, y: 30, scale: 0.95 },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const slides = [
        {
            type: 'title',
            title: 'Laporan Akhir Magang Nasional',
            subtitle: 'Sulthan Abdi Dzikry',
            icon: <Briefcase className="w-12 h-12 text-zinc-800" />
        },
        {
            type: 'profile',
            title: 'Profile',
            content: {
                name: 'Sulthan Abdi Dzikry',
                desc: 'Pribadi adaptif berlatar belakang Teknik Informatika dari Telkom University yang menjembatani desain strategis dengan keunggulan teknis. Memiliki spesialisasi dalam mengoptimasi proses konvensional menjadi ekosistem digital yang efisien, serta mahir dalam menerjemahkan visi klien menjadi solusi desain yang integratif dan fungsional.',
                jobDesc: 'Berfokus pada digitalisasi proses konvensional dan melakukan gap analysis dari suatu proses bisnis di Dharma Polimetal.',
                linkedin: 'Sulthan Abdi Dzikry',
                email: 'abdidzikry.work@gmail.com'
            }
        },
        {
            type: 'org',
            title: 'Struktur Organisasi',
            subtitle: 'HRGA Division - HRMS Department',
            team: project.team || []
        },
        {
            type: 'timeline',
            title: 'Timeline Magang',
            periods: (project.journey || []).map(j => ({
                month: j.month,
                project: j.title,
                activities: j.desc
            }))
        },
        {
            type: 'case-study',
            title: 'Project DOORS: Room Booking',
            subtitle: 'Penyederhanaan Alur Reservasi Ruang Rapat',
            analysis: {
                title: 'Analisa Kondisi',
                points: ['Prosedur manual 6-langkah (Email/Chat)', 'Risiko konflik jadwal tinggi', 'Data booking terfragmentasi']
            },
            plan: {
                title: 'Rencana Perbaikan',
                points: ['Penyederhanaan alur (4 langkah instan)', 'Akses fleksibel melalui Handphone', 'On-the-spot booking via Tablet ruangan']
            },
            result: {
                title: 'Saran & Hasil Perbaikan',
                points: ['Efisiensi waktu booking +33%', 'Resolusi konflik jadwal 100%', 'Skor SUS 72.5 (High Usability)']
            }
        },
        {
            type: 'case-study',
            title: 'AC Monitoring Management',
            subtitle: 'Sistem Pemantauan Perawatan Aset Gedung',
            analysis: {
                title: 'Analisa Kondisi',
                points: ['Monitoring aset lintas departemen manual', 'Maintenance tidak terjadwal secara sistematis', 'Risiko kerusakan aset tinggi']
            },
            plan: {
                title: 'Rencana Perbaikan',
                points: ['Dashboard Monitoring AC Terpusat', 'Penjadwalan maintenance otomatis', 'Database status aset real-time']
            },
            result: {
                title: 'Saran & Hasil Perbaikan',
                points: ['Efisiensi perawatan aset optimal', 'Sinkronisasi data antar departemen', 'Integritas data teknis terjamin']
            }
        },
        {
            type: 'insight',
            title: 'Key Insights: Learning Journey',
            points: [
                { icon: <Target />, text: 'Modernisasi Proses: Mengubah alur kerja konvensional menjadi ekosistem digital yang efisien.' },
                { icon: <MessageSquare />, text: 'Interpretasi Visi: Mahir dalam menerjemahkan kemauan klien menjadi solusi desain yang fungsional.' },
                { icon: <Layout />, text: 'Product Management: Mengelola siklus pengembangan produk dari riset hingga implementasi.' },
                { icon: <Users />, text: 'Sinergi Departemen: Kolaborasi lintas divisi (HR, GA, QC) untuk sinkronisasi data perusahaan.' }
            ]
        },
        {
            type: 'feedback',
            title: 'Kesan & Saran',
            content: project.kesan,
            suggestion: project.saran
        },
        {
            type: 'target',
            title: 'Professional Roadmap',
            milestones: (project.futureTargets || []).map((ft, i) => {
                const icons = [<Search />, <Layout />, <Briefcase />, <ShieldCheck />, <Users />, <TrendingUp />, <Rocket />];
                return {
                    category: ft.category,
                    items: ft.items,
                    icon: icons[i] || <Target />
                };
            })
        },
        {
            type: 'thank-you',
            title: 'TERIMA KASIH!',
            subtitle: "Let's collaborate and build something great together.",
            contact: {
                linkedin: 'Sulthan Abdi Dzikry',
                email: 'abdidzikry.work@gmail.com'
            }
        }
    ];

    const [direction, setDirection] = useState(0);

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
        
        // Reset scroll to top to ensure canvas coordinate reliability
        window.scrollTo(0, 0);

        try {
            const originalSlide = currentSlide;
            let pdf = null;

            for (let i = 0; i < slides.length; i++) {
                setDownloadProgress(Math.round(((i + 1) / slides.length) * 100));
                setCurrentSlide(i);
                
                // Wait longer for full stabilization of content and heavy svgs
                await new Promise(resolve => setTimeout(resolve, 1500));

                const slideElement = document.querySelector('.presentation-card');
                if (slideElement) {
                    const rect = slideElement.getBoundingClientRect();
                    const canvas = await html2canvas(slideElement, {
                        scale: 3, // Extra crisp quality
                        useCORS: true,
                        allowTaint: true,
                        backgroundColor: '#ffffff',
                        logging: false,
                        // Fix for vertical/horizontal offset issues
                        width: rect.width,
                        height: rect.height,
                        scrollX: 0,
                        scrollY: 0,
                        x: 0,
                        y: 0,
                        onclone: (clonedDoc) => {
                            const clonedCard = clonedDoc.querySelector('.presentation-card');
                            if (clonedCard) {
                                // Clean up the card for the PDF (no shadows or transforms)
                                clonedCard.style.transform = 'none';
                                clonedCard.style.boxShadow = 'none';
                                
                                // Direct visibility force for all nested elements
                                const elements = clonedCard.getElementsByTagName('*');
                                for (let j = 0; j < elements.length; j++) {
                                    const el = elements[j];
                                    el.style.opacity = '1';
                                    el.style.visibility = 'visible';
                                    
                                    // Ensure SVGs used in Timeline are fully visible
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

                    // Initialize PDF on the first page to get correct dynamic size
                    if (!pdf) {
                        pdf = new jsPDF('landscape', 'px', [pdfWidth, pdfHeight]);
                    } else {
                        pdf.addPage([pdfWidth, pdfHeight], 'landscape');
                    }
                    
                    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
                }
            }

            pdf.save(`Portfolio_Sulthan_Abdi_Dzikry.pdf`);
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
            if (e.key === 'Escape') navigate('/projects');
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSlide]);

    return (
        <div className="fixed inset-0 z-[100] bg-white text-zinc-900 flex flex-col font-sans overflow-hidden select-none">
            <style>
                {`
                    @media print {
                        @page { size: landscape; margin: 0; }
                        body { background: white; }
                        * { -webkit-print-color-adjust: exact !important; }
                        .no-print { display: none !important; }
                        .print-slide { 
                            page-break-after: always; 
                            height: 100vh; 
                            display: flex; 
                            flex-direction: column;
                            align-items: center; 
                            justify-content: center;
                            padding: 2rem;
                        }
                    }
                `}
            </style>

            <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-100 z-[110] no-print">
                <motion.div
                    className="h-full bg-zinc-900 origin-left"
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
                            className="presentation-card w-full h-auto max-h-full aspect-[16/9] bg-white border border-zinc-100 rounded-[2rem] p-8 md:p-10 relative overflow-hidden flex flex-col justify-center shadow-[0_40px_60px_-15px_rgba(0,0,0,0.08)]"
                        >
                        <div className="absolute top-6 left-8 right-8 flex justify-between items-center z-50">
                            <img src="/logo-maganghub.jpg" alt="MagangHub" className="h-5 md:h-7 object-contain" />
                            <img src="/logo-dharma.png" alt="Dharma MagangHub" className="h-5 md:h-7 object-contain" />
                        </div>

                        <div className="absolute bottom-6 right-8 flex items-end gap-2 z-[60]">
                            <span className="text-4xl font-black text-zinc-900 leading-none">{(currentSlide + 1).toString().padStart(2, '0')}</span>
                            <div className="flex flex-col mb-1">
                                <div className="h-px w-6 bg-zinc-200 mb-1" />
                                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest">{slides.length.toString().padStart(2, '0')}</span>
                            </div>
                        </div>

                        {slides[currentSlide].type === 'title' && (
                            <motion.div variants={containerVariants} initial="initial" animate="animate" className="text-center space-y-8">
                                <motion.div variants={itemVariants} className="w-20 h-20 bg-zinc-50 rounded-[1.5rem] mx-auto flex items-center justify-center mb-6 border border-zinc-100 shadow-md ring-1 ring-black/5">
                                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
                                        {slides[currentSlide].icon}
                                    </motion.div>
                                </motion.div>
                                <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-black text-zinc-900 leading-tight tracking-tighter">
                                    {slides[currentSlide].title}
                                </motion.h1>
                                <motion.div variants={itemVariants} className="flex items-center justify-center gap-3">
                                    <div className="h-px w-8 bg-zinc-200" />
                                    <p className="text-base text-zinc-400 font-mono tracking-[0.3em] uppercase">
                                        {slides[currentSlide].subtitle}
                                    </p>
                                    <div className="h-px w-8 bg-zinc-200" />
                                </motion.div>
                            </motion.div>
                        )}

                        {slides[currentSlide].type === 'profile' && (
                            <div className="grid md:grid-cols-[0.7fr_1.3fr] gap-12 items-center">
                                <motion.div variants={containerVariants} initial="initial" animate="animate" className="space-y-4">
                                    <motion.div
                                        variants={itemVariants}
                                        className="relative w-36 h-36 md:w-44 md:h-44 rounded-[2rem] overflow-hidden border-[3px] border-zinc-50 shadow-lg group mx-auto md:mx-0"
                                    >
                                        <img src="/sulthan.jpg" alt="Sulthan Abdi Dzikry" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                                    </motion.div>
                                    <motion.div variants={itemVariants} className="space-y-4 pt-4">
                                        <div 
                                            onClick={() => window.open('https://www.linkedin.com/in/sulthan-abdi-dzikry/', '_blank')}
                                            className="flex items-center gap-3 text-zinc-900 group cursor-pointer hover:translate-x-1 transition-transform"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600 shadow-sm transition-transform group-hover:scale-105">
                                                <Linkedin size={14} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">LinkedIn</p>
                                                <p className="font-extrabold text-[11px] tracking-tight">{slides[currentSlide].content.linkedin}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-zinc-900 group">
                                            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center border border-red-100 text-red-600 shadow-sm transition-transform hover:scale-105">
                                                <Mail size={14} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">Email Address</p>
                                                <p className="font-extrabold text-[11px] tracking-tight">{slides[currentSlide].content.email}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                                <motion.div variants={containerVariants} initial="initial" animate="animate" className="space-y-6">
                                    <div className="space-y-2">
                                        <motion.div variants={itemVariants} className="flex items-center gap-2">
                                            <span className="p-1.5 bg-zinc-900 text-white rounded-md"><User size={12} /></span>
                                            <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Product Designer</span>
                                        </motion.div>
                                        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black text-zinc-900 leading-[0.85] tracking-tighter">Profile</motion.h2>
                                        <motion.div variants={itemVariants} className="h-1 w-12 bg-zinc-900 rounded-full" />
                                    </div>
                                    <motion.div variants={itemVariants} className="space-y-6">
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-bold text-zinc-800 tracking-tight">{slides[currentSlide].content.name}</h3>
                                            <p className="text-base text-zinc-500 leading-relaxed font-light italic border-l-4 border-zinc-100 pl-6 max-w-lg">
                                                "{slides[currentSlide].content.desc}"
                                            </p>
                                        </div>
                                        <div className="space-y-1 pt-2">
                                            <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.3em]">Jobdesc:</p>
                                            <p className="text-xs md:text-sm text-zinc-800 font-bold leading-relaxed max-w-lg">
                                                {slides[currentSlide].content.jobDesc}
                                            </p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        )}

                        {slides[currentSlide].type === 'org' && (
                            <motion.div variants={containerVariants} initial="initial" animate="animate" className="space-y-8">
                                <div className="text-center space-y-2">
                                    <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-black text-zinc-900">{slides[currentSlide].title}</motion.h2>
                                    <motion.p variants={itemVariants} className="text-zinc-400 font-mono text-[10px] tracking-[0.25em] uppercase">{slides[currentSlide].subtitle}</motion.p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {(slides[currentSlide].team || []).map((member, i) => (
                                        <motion.div key={i} variants={itemVariants} className="group bg-white border border-zinc-100 rounded-[1.5rem] overflow-hidden flex flex-col shadow-[0_10px_25px_-12px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.12)] transition-all duration-700 max-w-[220px] mx-auto w-full">
                                            <div className="relative h-56 w-full overflow-hidden bg-zinc-50">
                                                {member.image ? <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} /> : null}
                                                <div className={`flex items-center justify-center w-full h-full bg-zinc-900 text-white ${member.image ? 'hidden' : ''}`}>
                                                    <span className="text-3xl font-black tracking-tighter">{member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}</span>
                                                </div>
                                            </div>
                                            <div className="p-4 md:p-5 flex flex-col items-center justify-center bg-white border-t border-zinc-50 relative text-center">
                                                <div className="space-y-0.5 mb-3">
                                                    <h3 className="text-sm md:text-base font-black text-zinc-900 uppercase tracking-tighter leading-tight group-hover:text-zinc-600 transition-colors">{member.name}</h3>
                                                    <p className="text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mt-1">{member.role}</p>
                                                </div>
                                                <div className="pt-3 border-t border-zinc-50 w-full flex items-center justify-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                                                    <Mail size={10} className="text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                                                    <span className="text-[8px] font-mono text-zinc-500 font-semibold lowercase">{member.email}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {slides[currentSlide].type === 'timeline' && (
                            <div className="flex flex-col h-full relative pt-24 pb-12">
                                <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-3xl font-black text-center text-zinc-900 uppercase tracking-tighter mb-12">{slides[currentSlide].title}</motion.h2>
                                <div className="relative flex-1 px-10 flex items-center">
                                    <svg className="absolute top-1/2 left-0 right-0 w-full h-[2px] -translate-y-1/2 overflow-visible pointer-events-none">
                                        <motion.line x1="0" y1="0" x2="100%" y2="0" stroke="#f4f4f5" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }} />
                                    </svg>
                                    <div className="relative z-10 w-full flex justify-between items-center h-64">
                                        {slides[currentSlide].periods.map((item, i) => (
                                            <motion.div key={i} initial={{ opacity: 0, y: i % 2 === 0 ? -30 : 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + (i * 0.1), type: "spring", stiffness: 100 }} className="flex-1 flex flex-col items-center group relative h-full">
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                                    <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 3, delay: i * 0.4 }} className="absolute w-3 h-3 rounded-full bg-zinc-900/5" />
                                                    <div className="w-3 h-3 rounded-full bg-white border-[3px] border-zinc-900 z-20 shadow-md group-hover:scale-150 transition-all duration-500" />
                                                </div>
                                                <motion.div initial={{ height: 0 }} animate={{ height: 60 }} transition={{ delay: 1, duration: 0.8 }} className={`absolute left-1/2 -translate-x-1/2 w-px bg-zinc-100 group-hover:bg-zinc-900 transition-colors duration-500 ${i % 2 === 0 ? 'bottom-1/2 mb-1.5' : 'top-1/2 mt-1.5'}`} />
                                                <div className={`absolute w-44 text-center space-y-2 px-2 transform ${i % 2 === 0 ? 'bottom-[62%]' : 'top-[62%]'}`}>
                                                    <div className="flex flex-col items-center gap-1.5">
                                                        <span className="px-2.5 py-0.5 bg-white border-2 border-zinc-900 rounded-full text-[8px] font-black text-zinc-900 uppercase tracking-widest shadow-sm inline-block group-hover:bg-zinc-900 group-hover:text-white transition-all duration-300">{item.month}</span>
                                                        <div className="space-y-0.5">
                                                            <h4 className="text-[10px] font-black text-zinc-900 leading-tight uppercase tracking-tighter">{item.project}</h4>
                                                            <p className="text-[9px] text-zinc-400 leading-snug font-bold group-hover:text-zinc-500 transition-colors">{item.activities}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {slides[currentSlide].type === 'case-study' && (
                            <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex flex-col h-full pt-4">
                                <motion.div variants={itemVariants} className="text-center mb-6">
                                    <h2 className="text-2xl md:text-3xl font-black text-zinc-900 uppercase tracking-tighter mb-1">{slides[currentSlide].title}</h2>
                                    <p className="text-zinc-400 font-mono text-[9px] tracking-[0.3em] uppercase">{slides[currentSlide].subtitle}</p>
                                </motion.div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 h-full items-start pb-4">
                                    <motion.div variants={itemVariants} className="bg-white/95 backdrop-blur-xl border border-zinc-100 p-5 rounded-[2rem] shadow-sm flex flex-col h-full hover:border-amber-200 transition-colors">
                                        <div className="flex items-center gap-2 mb-5">
                                            <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg border border-amber-100"><Search size={14} /></div>
                                            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-900">{slides[currentSlide].analysis.title}</h3>
                                        </div>
                                        <div className="space-y-4">
                                            {slides[currentSlide].analysis.points.map((pt, i) => (
                                                <div key={i} className="flex gap-3 text-[10.5px] text-zinc-600 leading-relaxed font-medium"><div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 shrink-0" />{pt}</div>
                                            ))}
                                        </div>
                                    </motion.div>
                                    <motion.div variants={itemVariants} className="bg-zinc-900 p-5 rounded-[2rem] shadow-2xl flex flex-col h-full text-white ring-8 ring-zinc-50/50 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-16 -mt-16 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700" />
                                        <div className="flex items-center gap-2 mb-5 relative z-10"><div className="p-1.5 bg-white/10 text-white rounded-lg border border-white/5"><Lightbulb size={14} /></div><h3 className="text-[10px] font-black uppercase tracking-widest text-white">{slides[currentSlide].plan.title}</h3></div>
                                        <div className="space-y-4 relative z-10 flex-1">
                                            {slides[currentSlide].plan.points.map((pt, i) => (
                                                <div key={i} className="flex gap-3 text-[10.5px] text-zinc-400 leading-relaxed"><div className="w-1.5 h-1.5 bg-white/40 rounded-full mt-1.5 shrink-0" /><span className={`${(pt.includes('Handphone') || pt.includes('Tablet')) ? 'text-white font-black' : ''}`}>{pt}</span></div>
                                            ))}
                                        </div>
                                        {slides[currentSlide].title.includes('DOORS') && (
                                            <div className="mt-auto pt-8 flex justify-center gap-8 opacity-40 group-hover:opacity-100 transition-all duration-700 relative z-10">
                                                <div className="flex flex-col items-center gap-2"><Smartphone size={28} className="text-zinc-500" /><span className="text-[7px] uppercase tracking-widest font-bold">Mobile</span></div>
                                                <div className="flex flex-col items-center gap-2"><Tablet size={28} className="text-zinc-500" /><span className="text-[7px] uppercase tracking-widest font-bold">On-Spot</span></div>
                                            </div>
                                        )}
                                    </motion.div>
                                    <motion.div variants={itemVariants} className="bg-white/95 backdrop-blur-xl border border-zinc-100 p-5 rounded-[2rem] shadow-sm flex flex-col h-full hover:border-emerald-200 transition-colors">
                                        <div className="flex items-center gap-2 mb-5">
                                            <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100"><CheckCircle size={14} /></div>
                                            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-900">{slides[currentSlide].result.title}</h3>
                                        </div>
                                        <div className="space-y-4">
                                            {slides[currentSlide].result.points.map((pt, i) => (
                                                <div key={i} className="flex gap-3 text-[10.5px] text-zinc-600 leading-relaxed font-semibold"><div className="p-0.5 bg-emerald-100/50 rounded text-emerald-600 shrink-0 mt-0.5"><BarChart size={10} /></div>{pt}</div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}

                        {slides[currentSlide].type === 'insight' && (
                            <motion.div variants={containerVariants} initial="initial" animate="animate" className="max-w-xl mx-auto space-y-6">
                                <div className="text-center space-y-1"><motion.h2 variants={itemVariants} className="text-xl md:text-2xl font-black text-zinc-900 uppercase tracking-tighter">{slides[currentSlide].title}</motion.h2><motion.div variants={itemVariants} className="h-0.5 w-12 bg-zinc-900 mx-auto rounded-full" /></div>
                                <div className="grid gap-3">
                                    {slides[currentSlide].points.map((point, i) => (
                                        <motion.div key={i} variants={itemVariants} whileHover={{ x: 6, backgroundColor: "#fafafa" }} className="flex items-center gap-4 p-4 bg-white border border-zinc-100 rounded-[1.5rem] shadow-sm transition-all group">
                                            <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-800 shadow-sm border border-zinc-100 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-500 shrink-0">{React.cloneElement(point.icon, { size: 14 })}</div>
                                            <p className="text-xs md:text-[13px] text-zinc-800 font-bold tracking-tight leading-snug">{point.text}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {slides[currentSlide].type === 'feedback' && (
                            <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex flex-col h-full pt-8">
                                <motion.div variants={itemVariants} className="text-center mb-10"><h2 className="text-2xl md:text-3xl font-black text-zinc-900 uppercase tracking-tighter mb-1">{slides[currentSlide].title}</h2><p className="text-zinc-400 font-mono text-[9px] tracking-[0.3em] uppercase">Final Reflection & Improvements</p></motion.div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 h-full items-start">
                                    <motion.div variants={itemVariants} className="bg-white/95 backdrop-blur-xl border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden h-full group"><div className="absolute top-0 left-0 w-full h-1 bg-zinc-900" /><MessageSquare className="w-10 h-10 text-zinc-200 mb-6 group-hover:scale-110 group-hover:text-zinc-900 transition-all duration-500" /><p className="text-lg md:text-xl text-zinc-800 font-black leading-[1.4] italic px-4">"{slides[currentSlide].content}"</p><div className="mt-8 flex items-center gap-3"><div className="h-px w-6 bg-zinc-100" /><span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Kesan Magang</span><div className="h-px w-6 bg-zinc-100" /></div></motion.div>
                                    <motion.div variants={itemVariants} className="bg-zinc-900 p-8 rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center text-center text-white h-full relative group"><div className="absolute top-0 right-0 w-full h-1 bg-white/20" /><Lightbulb className="w-10 h-10 text-white/30 mb-6 group-hover:scale-110 group-hover:text-white transition-all duration-500" /><p className="text-lg md:text-xl text-zinc-100 font-bold leading-[1.4] px-4">"{slides[currentSlide].suggestion}"</p><div className="mt-8 flex items-center gap-3"><div className="h-px w-6 bg-white/10" /><span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Saran & Perbaikan</span><div className="h-px w-6 bg-white/10" /></div></motion.div>
                                </div>
                            </motion.div>
                        )}

                        {slides[currentSlide].type === 'target' && (
                            <div className="flex flex-col h-full pt-10 px-4">
                                <motion.div variants={containerVariants} initial="initial" animate="animate" className="text-center mb-0"><motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-black text-zinc-900 uppercase tracking-tighter">{slides[currentSlide].title}</motion.h2><motion.p variants={itemVariants} className="text-zinc-400 font-mono text-[9px] tracking-[0.4em] uppercase">The UI/UX Progression 2026 - 2032</motion.p></motion.div>
                                <div className="relative flex-1 flex items-center mt-6 h-full">
                                    <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-50 -translate-y-1/2 z-0 opacity-50" />
                                    <div className="flex justify-around w-full relative z-10 px-12 lg:px-24">
                                        {slides[currentSlide].milestones.map((target, i) => (
                                            <motion.div key={i} initial={{ opacity: 0, y: i % 2 === 0 ? -30 : 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + (i * 0.1), type: "spring", stiffness: 100 }} className="flex flex-col items-center relative">
                                                <div className={`absolute w-44 md:w-56 ${i % 2 === 0 ? '-top-32 md:-top-36' : 'top-8 md:top-12'} transition-all duration-700 ease-[0.23,1,0.32,1]`}>
                                                    <div className="bg-white/95 backdrop-blur-xl border border-zinc-100 p-3 rounded-[1.2rem] shadow-[0_12px_28px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] hover:border-zinc-300 transition-all group group-hover:-translate-y-1">
                                                        <div className="flex items-center gap-2 mb-2"><div className="p-1 px-2 bg-zinc-900 text-white rounded-md text-[7px] font-black tracking-widest leading-none whitespace-nowrap">{target.category}</div></div>
                                                        <div className="space-y-2">{target.items.map((item, j) => (<div key={j} className="group/item"><div className="flex items-start gap-1.5 text-[8.5px] text-zinc-600 leading-tight"><div className="mt-0.5 p-0.5 rounded-full bg-zinc-50 border border-zinc-100 text-zinc-400 group-hover/item:text-zinc-900 group-hover/item:bg-zinc-100 transition-colors shrink-0">{item.toLowerCase().includes('professional') || item.toLowerCase().includes('career') ? <Briefcase size={8} /> : <GraduationCap size={8} />}</div><span className="flex-1 group-hover/item:text-zinc-900 transition-all">{item.includes(': ') ? <><span className="font-bold text-zinc-400 mr-1 text-[7px] uppercase tracking-wider">{item.split(': ')[0]}:</span>{item.split(': ')[1]}</> : item}</span></div></div>))}</div>
                                                    </div>
                                                </div>
                                                <div className="relative group cursor-pointer"><motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 4, delay: i * 0.5 }} className="absolute inset-0 bg-zinc-900 rounded-full blur-[6px]" /><div className="w-10 h-10 rounded-full bg-white border-[3px] border-zinc-900 shadow-xl relative z-10 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-all transform duration-500">{React.cloneElement(target.icon, { size: 16 })}</div></div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {slides[currentSlide].type === 'thank-you' && (
                            <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex flex-col h-full items-center justify-center text-center space-y-10">
                                <div className="space-y-4">
                                    <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-black text-zinc-900 tracking-tighter uppercase leading-none">{slides[currentSlide].title}</motion.h2>
                                    <motion.p variants={itemVariants} className="text-zinc-400 font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase max-w-sm mx-auto">{slides[currentSlide].subtitle}</motion.p>
                                </div>
                                <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6 pt-6">
                                    <div 
                                        onClick={() => window.open('https://www.linkedin.com/in/sulthan-abdi-dzikry/', '_blank')}
                                        className="flex items-center gap-3 px-6 py-3 bg-zinc-50 rounded-2xl border border-zinc-100 group hover:bg-zinc-900 hover:text-white transition-all duration-500 cursor-pointer"
                                    >
                                        <Linkedin size={18} className="text-blue-600 group-hover:text-white" />
                                        <span className="font-bold text-sm tracking-tight">{slides[currentSlide].contact.linkedin}</span>
                                    </div>
                                    <div className="flex items-center gap-3 px-6 py-3 bg-zinc-50 rounded-2xl border border-zinc-100 group hover:bg-zinc-900 hover:text-white transition-all duration-500 cursor-pointer"><Mail size={18} className="text-red-600 group-hover:text-white" /><span className="font-bold text-sm tracking-tight">{slides[currentSlide].contact.email}</span></div>
                                </motion.div>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

                <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-10 no-print">
                    <button onClick={() => paginate(-1)} className={`p-5 rounded-full bg-white/10 backdrop-blur-md border border-zinc-200/20 text-zinc-400 hover:text-zinc-900 hover:bg-white pointer-events-auto transition-all shadow-xl ${currentSlide === 0 ? 'opacity-0 scale-50' : 'opacity-100'}`}><ChevronLeft size={32} /></button>
                    <button onClick={() => paginate(1)} className={`p-5 rounded-full bg-white/10 backdrop-blur-md border border-zinc-200/20 text-zinc-400 hover:text-zinc-900 hover:bg-white pointer-events-auto transition-all shadow-xl ${currentSlide === slides.length - 1 ? 'opacity-0 scale-50' : 'opacity-100'}`}><ChevronRight size={32} /></button>
                </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="h-12 px-6 flex justify-between items-center bg-zinc-50/50 backdrop-blur-xl border-t border-zinc-100 z-50 no-print">
                <div className="flex items-center gap-3">
                    {slides.map((s, i) => (
                        <button key={i} onClick={() => { setDirection(i > currentSlide ? 1 : -1); setCurrentSlide(i); }} className="group relative py-2 focus:outline-none"><motion.div animate={{ width: i === currentSlide ? 32 : 4, backgroundColor: i === currentSlide ? "#18181b" : "#e4e4e7" }} className="h-1 rounded-full transition-all group-hover:bg-zinc-400" /><div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-zinc-900 text-white text-[7px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">{s.type.replace('_', ' ')}</div></button>
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/projects')}
                        className="flex items-center gap-1.5 px-3 py-1 bg-zinc-100 text-zinc-900 rounded-lg font-bold text-[8px] uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95"
                    >
                        <X size={10} />
                        Exit
                    </button>

                    <button
                        onClick={toggleFullscreen}
                        className="flex items-center gap-1.5 px-3 py-1 bg-zinc-100 text-zinc-900 rounded-lg font-bold text-[8px] uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95"
                    >
                        {isFullscreen ? <Minimize size={10} /> : <Maximize size={10} />}
                        {isFullscreen ? 'Exit' : 'Full Screen'}
                    </button>

                    <button 
                        onClick={handleDownloadPDF} 
                        disabled={isDownloading}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-[8px] uppercase tracking-widest transition-all active:scale-95 ${isDownloading ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed' : 'bg-zinc-900 text-white hover:bg-zinc-800'}`}
                    >
                        <Download size={10} className={isDownloading ? 'animate-bounce' : ''} />
                        {isDownloading ? `Processing ${downloadProgress}%` : 'Download PDF'}
                    </button>
                    <div className="flex items-center gap-2 text-zinc-400"><div className="w-1 h-1 rounded-full bg-emerald-500" /><span className="font-mono text-[8px] font-black text-zinc-900 uppercase">Slide {currentSlide + 1} / {slides.length}</span></div>
                </div>
            </motion.div>

            <div className="hidden print:block absolute inset-0 bg-white z-0 overflow-visible">
                {slides.map((slide, index) => (
                    <div key={index} className="print-slide relative border-b border-zinc-100">
                        <div className="text-center max-w-2xl px-12">
                            <h2 className="text-4xl font-black uppercase tracking-widest mb-6 text-zinc-900">{slide.title}</h2>
                            <p className="text-zinc-400 font-mono text-xs uppercase tracking-[0.4em] mb-12">Slide {index + 1} — {slide.type.replace('-', ' ')}</p>
                            <div className="w-16 h-1 bg-zinc-900 mx-auto mb-12" />
                            <div className="text-zinc-400 font-bold italic text-sm border-2 border-dashed border-zinc-100 p-8 rounded-3xl">[ Konten Multimedia & Interaktif - Silakan buka versi Web untuk pengalaman penuh ]</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Presentation;
