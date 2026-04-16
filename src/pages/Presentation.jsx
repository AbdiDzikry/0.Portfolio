import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, ChevronRight, X, User, Briefcase, Calendar, Target,
    Lightbulb, MessageSquare, Layout, TrendingUp, ShieldCheck,
    Linkedin, Mail, ArrowRight, GraduationCap, Search, Users, Rocket,
    Smartphone, Tablet, CheckCircle, BarChart, Download, Check, Maximize, Minimize,
    Laptop, ArrowRightLeft, Image as ImageIcon
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
    const [enlargedImage, setEnlargedImage] = useState(null); // { url, images: [], index }
    const [activeBeforeImage, setActiveBeforeImage] = useState(0);
    const [activeAfterImage, setActiveAfterImage] = useState(0);

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
            type: 'doors-intro-problems',
            title: 'Project DOORS',
            subtitle: 'Latar Belakang & 8 Titik Masalah (Pain Points)',
            image: '/projects/doors/before/old-doors-icon.png',
            stat: { rooms: '14 Ruangan', freq: 'Pemesanan Masif', prev: 'Sistem Lama' },
            paragraphs: [
                'DOORS adalah sistem peminjaman ruangan yang tersedia di perusahaan untuk berbagai keperluan meeting maupun tamu.',
                'Namun keseluruhan layanannya saat ini sudah tidak relevan dengan kebutuhan pengguna.',
                'Dibuktikan melalui validasi analisis terhadap pengguna, ini adalah 8 Pain Point yang berhasil saya himpun dari pengguna.'
            ],
            problems: [
                { num: '01', tag: 'Banyak Langkah', desc: 'Langkah pemesanan ruang meeting di sistem terlalu banyak dan tidak efisien', image: '/doors_problem_01.png' },
                { num: '02', tag: 'Tidak Informatif', desc: 'Tampilan tidak memberikan informasi yang cukup untuk kebutuhan pengguna', image: '/doors_problem_02.png' },
                { num: '03', tag: 'sedang dipakai ?', desc: 'Mengecek ketersediaan ruangan harus melihat daftar meeting satu per satu', image: '/doors_problem_03.png' },
                { num: '04', tag: 'Fleksibilitas Device', desc: 'Hanya bisa diakses lewat laptop; tidak bisa dari handphone sama sekali', image: '/doors_problem_04.png' },
                { num: '05', tag: 'Absensi Manual', desc: 'Pencatatan daftar hadir masih menggunakan kertas, tidak terintegrasi dengan sistem', image: '/doors_problem_05.png' },
                { num: '06', tag: 'Ghost Meeting', desc: 'Ruangan dipesan namun tidak dipakai, menimbulkan konflik dengan pengguna lain', image: '/doors_problem_06.png' },
                { num: '07', tag: 'Pesan di tempat', desc: 'Tidak bisa memesan atau melihat ketersediaaan ruangan meeting secara langsung', image: '/doors_problem_07.png' },
                { num: '08', tag: 'Ganti jadwal', desc: 'Tidak ada fitur untuk mengubah jadwal meeting yang dipesan apabila ada urgensi', image: '/doors_problem_08.png' },
            ]
        },
        {
            type: 'doors-solution-impact',
            title: 'Project DOORS: Evaluasi Solusi Terpadu',
            subtitle: 'Implementasi PWA Mulus, Kepastian Jadwal Real-time',
            imagesBefore: ['/projects/doors/before/old-doors-icon.png', '/projects/doors/before/doors-dashboard.png'],
            imagesAfter: ['/projects/doors/after/Logo Doors Baru.png', '/projects/doors/after/gantt chart.png'],
            paragraphs: [
                'Redesain UX Efisien: Menyederhanakan alur pemesanan agar lebih cepat dan ringkas.',
                'Dashboard Informatif: Menyajikan transparansi detail meeting dalam satu pandangan.',
                'Visualisasi Gantt Chart: Deteksi ketersediaan ruangan secara instan via grafik interaktif.',
                'fleksibilitas Akses Sistem: Secara fungsional, akses sistem dapat melalui berbagai device.',
                'Digitalisasi Absensi: Migrasi total dari absensi kertas ke sistem check-in NPK terintegrasi.',
                'Sistem Anti-Ghost Meeting: Auto-cancelled ruang meeting jika tidak ada yang hadir.',
                'Pemesanan On-the-Spot: Device Tablet untuk memesan ruangan secara langsung di depan pintu.',
                'Modifikasi Jadwal Mandiri: Fitur ubah dan batalkan jadwal yang fleksibel bagi pemesan.'
            ],
            impact: [
                { label: 'Solusi Tercapai', value: '100%', desc: 'Semua target titik masalah (pain points) berhasil ditangani seluruhnya.' },
                { label: 'Meeting Terdata', value: '> 20/hari', desc: 'Aktivitas pemesanan harian melonjak drastis dibanding sebelumnya (~15).' },
                { label: 'Ghost Meeting', value: 'Menurun', desc: 'Masalah dominasi reservasi ruangan kosong berhasil ditekan signifikan.' },
                { label: 'Penjadwalan', value: 'Anti-Bentrok', desc: 'Gantt Chart memudahkan monitor ketersediaan jadwal sekilas mata.' }
            ]
        },
        {
            type: 'doors-intro-problems',
            title: 'LaporAC: Manajemen Aset',
            subtitle: 'Otomatisasi Operasional & Kolaborasi Vendor',
            stat: { aset: 'Ratusan Unit AC', status: 'Sistem dari Nol', klien: 'General Affair' },
            paragraphs: [
                'Sistem ini dikembangkan untuk meningkatkan validitas data operasional dalam pemeliharaan dan perbaikan unit AC.',
                'Aplikasi ini dibangun untuk menyederhanakan birokrasi serta memperkuat kolaborasi dan akuntabilitas kerja dengan vendor.',
                'Berikut adalah tantangan operasional yang dihadapi dalam pengelolaan aset AC secara konvensional (analog).'
            ],
            problems: [
                { num: '01', tag: 'Validitas Data', desc: 'Kebutuhan akan pelaporan perbaikan yang lebih transparan dan mudah diverifikasi validitasnya', image: '/projects/9. AC Monitoring/ac.1.png' },
                { num: '02', tag: 'Komunikasi Tersebar', desc: 'Laporan kerusakan masih melalui platform chat; data tidak terpusat dan sulit untuk dilacak kembali', image: '/projects/9. AC Monitoring/ac.10.png' },
                { num: '03', tag: 'Birokrasi Panjang', desc: 'Proses approval perbaikan yang manual memicu penundaan pengerjaan di lapangan', image: '/projects/9. AC Monitoring/ac.3.png' },
                { num: '04', tag: 'Administrasi Manual', desc: 'Dokumen legal seperti SPK dan Berita Acara (BA) masih memerlukan rekapitulasi manual yang memakan waktu', image: '/projects/9. AC Monitoring/ac.4.png' },
                { num: '05', tag: 'Visibilitas Vendor', desc: 'Tantangan dalam memantau progres kerja vendor secara real-time dan memastikan kualitas perbaikan', image: '/projects/9. AC Monitoring/ac.6.png' },
                { num: '06', tag: 'Analisis Histori', desc: 'Belum adanya riwayat perbaikan terintegrasi untuk menentukan strategi penggantian atau servis unit', image: '/projects/9. AC Monitoring/ac.7.png' },
                { num: '07', tag: 'Risiko Arsip Fisik', desc: 'Dokumen laporan dan lampiran fisik memiliki risiko rusak atau terselip dalam proses administrasi', image: '/projects/9. AC Monitoring/ac.8.png' },
                { num: '08', tag: 'Waktu Respons', desc: 'Proses perbaikan membutuhkan waktu lebih lama akibat alur koordinasi manual yang berjenjang', image: '/projects/9. AC Monitoring/ac.9.png' },
            ]
        },
        {
            type: 'doors-solution-impact',
            title: 'LaporAC: Evaluasi Ekosistem Digital GA',
            subtitle: 'Akuntabilitas Data, Multi-User Akses, & Otomasi Administrasi',
            imagesBefore: [], // Empty to show "Before" placeholder (because it's from scratch/manual)
            imagesAfter: ['/projects/9. AC Monitoring/ac.1.png', '/projects/9. AC Monitoring/ac.2.png', '/projects/9. AC Monitoring/ac.3.png', '/projects/9. AC Monitoring/ac.5.png'],
            paragraphs: [
                'Pendataan & Riwayat Terpusat: Basis data mencatat keseluruhan unit AC (baik sedang diperbaiki maupun normal) untuk melacak rekam jejak per unit secara historikal.',

                'Lingkungan Multi-User: Vendor dari pihak luar mendapatkan akses guna memantau tiket perbaikan dan memperbarui progres kerja (evidence upload).',
                'Digital Approval Instan: SPK dan BA langsung disetujui melalui sistem di manapun pimpinan manajemen berada.',
                'Auto-Generate Dokumen Legal (PDF): Dalam satu klik laporan dibuat dalamformat PDF',
                'Laporan Real-Time Data Driven: Transparansi pengeluaran, sebagai keputusan ganti unit ketimbang rugi servis total.'
            ],
            impact: [
                { label: 'Akurasi Data', value: '100% Terintegrasi', desc: 'Data sepenuhnya transparan dan akurat.' },
                { label: 'Approval Vendor', value: 'Downtime Berkurang', desc: 'Downtime AC rusak berkurang signifikan, karena tidak perlu membuat dokumen' },
                { label: 'Administrasi', value: '1-Click PDF', desc: 'Waktu pembuatan dan proses kompilasi rekap surat SPK/BA ke pihak luar dipangkas amat tajam.' },
                { label: 'Kinerja Pekerjaan', value: 'Akuntabel', desc: 'General Affair memiliki bukti untuk pembayaran Vendor yang sudah terintegrasi dengan sistems.' }
            ]
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
            type: 'insight-feedback',
            title: 'Key Insights & Feedback',
            points: [
                { icon: <Target />, text: 'Modernisasi Proses: Mengubah alur kerja konvensional menjadi ekosistem digital yang efisien.' },
                { icon: <MessageSquare />, text: 'Interpretasi Visi: Mahir dalam menerjemahkan kemauan klien menjadi solusi desain yang fungsional.' },
                { icon: <Layout />, text: 'Product Management: Mengelola siklus pengembangan produk dari riset hingga implementasi.' },
                { icon: <Users />, text: 'Sinergi Departemen: Kolaborasi lintas divisi (HRGA) untuk sinkronisasi data perusahaan.' }
            ],
            kesan: project.kesan,
            saran: project.saran
        },
        {
            type: 'target',
            title: 'Professional Roadmap',
            milestones: (project.futureTargets || []).map((ft, i) => {
                const icons = [<Search />, <Briefcase />, <TrendingUp />, <Users />, <Rocket />];
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
            subtitle: "For HRMS Dharma Polimetal, to collaborate and build something great together.",
            contact: {
                linkedin: 'Sulthan Abdi Dzikry',
                email: 'abdidzikry.work@gmail.com'
            }
        }
    ];

    const [direction, setDirection] = useState(0);
    const [hoveredSection, setHoveredSection] = useState(null);
    const [activeFeature, setActiveFeature] = useState(0);

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
            if (e.key === 'Escape') {
                if (enlargedImage) {
                    setEnlargedImage(null);
                } else {
                    navigate('/projects');
                }
            }
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

                            {slides[currentSlide].type === 'bridge' && (
                                <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex flex-col items-center justify-center h-full text-center space-y-6 sm:px-12 md:px-24">
                                    <motion.div variants={itemVariants} className="flex items-center gap-4 mb-4">
                                        <div className="h-px w-12 bg-zinc-200" />
                                        <p className="text-zinc-400 font-mono text-[10px] md:text-sm tracking-[0.4em] uppercase font-bold">{slides[currentSlide].subtext}</p>
                                        <div className="h-px w-12 bg-zinc-200" />
                                    </motion.div>
                                    <motion.div variants={itemVariants} className="relative z-10 px-8">
                                        <span className="text-zinc-100 absolute -top-8 -left-4 text-8xl font-serif leading-none select-none -z-10">"</span>
                                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-zinc-900 tracking-tighter leading-[1.3] max-w-4xl mx-auto italic">
                                            {slides[currentSlide].text}
                                        </h2>
                                    </motion.div>
                                    <motion.div variants={itemVariants} className="w-20 h-1.5 bg-zinc-900 mt-10 rounded-full" />
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

                            {slides[currentSlide].type === 'doors-intro-problems' && (
                                <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex h-full gap-5 pt-3 pb-2">
                                    {/* Left Side: Context */}
                                    <div className="w-[30%] shrink-0 flex flex-col justify-between py-1 border-r border-zinc-100 pr-5 relative">
                                        <div>
                                            {slides[currentSlide].image && (
                                                <motion.img variants={itemVariants} src={slides[currentSlide].image} alt="DOORS Logo" className="h-12 lg:h-16 w-auto object-contain mb-4 p-1.5 shadow-sm bg-white rounded-xl border border-zinc-100" />
                                            )}
                                            <motion.h2 variants={itemVariants} className="text-3xl lg:text-[34px] font-black text-zinc-900 uppercase tracking-tighter mb-2 leading-[1.1]">{slides[currentSlide].title}</motion.h2>
                                            <motion.p variants={itemVariants} className="text-zinc-500 font-mono text-[9px] tracking-[0.2em] uppercase leading-relaxed mb-6">{slides[currentSlide].subtitle}</motion.p>

                                            <motion.div variants={itemVariants} className="space-y-4">
                                                {slides[currentSlide].paragraphs.map((p, i) => (
                                                    <div key={i} className="flex gap-3 items-start">
                                                        <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-zinc-800 shrink-0" />
                                                        <p className={`text-[11px] lg:text-[12px] leading-[1.6] ${i === 2 ? 'text-zinc-800 font-bold' : 'text-zinc-600 font-medium'}`}>
                                                            {p}
                                                        </p>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        </div>

                                        <motion.div variants={itemVariants} className="flex gap-2.5 mt-8 flex-wrap">
                                            {Object.values(slides[currentSlide].stat).map((val, i) => (
                                                <div key={i} className="bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 shadow-sm">
                                                    <p className="text-[9px] lg:text-[10px] font-black text-zinc-800 uppercase tracking-tight">{val}</p>
                                                </div>
                                            ))}
                                        </motion.div>
                                    </div>

                                    {/* Right Side: Problems Grid (4x2) */}
                                    <div className="w-[70%] h-full flex flex-col min-h-0 pl-1">
                                        <div className="grid grid-cols-4 grid-rows-2 gap-3 pb-1 h-full">
                                            {slides[currentSlide].problems.map((p, i) => (
                                                <motion.div
                                                    key={i}
                                                    variants={itemVariants}
                                                    className="bg-white border border-zinc-200 rounded-[1.25rem] flex flex-col overflow-hidden shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-zinc-300 transition-all group relative"
                                                >
                                                    {/* Top Image / Illustration */}
                                                    <div className="h-[50%] relative bg-zinc-50 border-b border-zinc-100 flex items-center justify-center p-2.5 overflow-hidden">
                                                        <div className="absolute top-2 right-3 text-[10px] font-black font-mono text-zinc-400 tracking-widest z-10">{p.num}</div>
                                                        {p.image ? (
                                                            <img src={p.image} alt={p.tag} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                                                        ) : (
                                                            <span className="text-[40px] font-black text-zinc-200/50 absolute select-none">{p.num}</span>
                                                        )}
                                                    </div>

                                                    {/* Bottom Text */}
                                                    <div className="h-[50%] p-4 flex flex-col justify-start pt-3 bg-white relative z-10">
                                                        <h4 className="text-[11px] lg:text-[12px] font-black uppercase tracking-widest text-zinc-800 leading-tight mb-1.5">{p.tag}</h4>
                                                        <p className="text-[10px] lg:text-[11px] text-zinc-500 font-medium leading-snug line-clamp-3 md:line-clamp-4">{p.desc}</p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}



                            {slides[currentSlide].type === 'doors-solution-impact' && (
                                <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex flex-row h-full gap-6 pt-4 pb-2 items-stretch px-2 overflow-hidden">

                                    {/* Left Side: Photos */}
                                    <div className="w-[40%] flex flex-col gap-3 h-full">
                                        {/* Before Placeholder - Only show if imagesBefore exists */}
                                        {slides[currentSlide].imagesBefore && slides[currentSlide].imagesBefore.length > 0 && (
                                            <motion.div variants={itemVariants} className="flex-1 relative bg-zinc-50 border border-zinc-200 rounded-[1.5rem] overflow-hidden flex flex-col group shadow-sm min-h-0">
                                                <div className="absolute top-3 left-4 px-3 py-1 bg-red-100 text-red-600 rounded-lg text-[9px] font-black tracking-widest uppercase z-20">Before</div>

                                                {/* Main Image Display */}
                                                <div className="flex-1 w-full h-full bg-zinc-100 flex items-center justify-center p-6 pt-12 relative">
                                                    <div className="w-full h-full bg-zinc-50 rounded-xl overflow-hidden shadow-lg relative flex items-center justify-center">
                                                        <img
                                                            src={slides[currentSlide].imagesBefore[activeBeforeImage]}
                                                            alt="Before"
                                                            className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                                                            onClick={() => setEnlargedImage({
                                                                url: slides[currentSlide].imagesBefore[activeBeforeImage],
                                                                images: slides[currentSlide].imagesBefore,
                                                                index: activeBeforeImage
                                                            })}
                                                        />
                                                    </div>

                                                    {/* Navigation Arrows */}
                                                    {slides[currentSlide].imagesBefore.length > 1 && (
                                                        <>
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); setActiveBeforeImage(prev => prev > 0 ? prev - 1 : slides[currentSlide].imagesBefore.length - 1); }}
                                                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/60 hover:bg-white rounded-full flex items-center justify-center shadow-sm text-zinc-500 hover:text-zinc-900 transition-all z-10 opacity-40 hover:opacity-100"
                                                            >
                                                                <ChevronLeft size={16} />
                                                            </button>
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); setActiveBeforeImage(prev => prev < slides[currentSlide].imagesBefore.length - 1 ? prev + 1 : 0); }}
                                                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/60 hover:bg-white rounded-full flex items-center justify-center shadow-sm text-zinc-500 hover:text-zinc-900 transition-all z-10 opacity-40 hover:opacity-100"
                                                            >
                                                                <ChevronRight size={16} />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>

                                                {/* Thumbnail Strip */}
                                                {slides[currentSlide].imagesBefore.length > 1 && (
                                                    <div className="px-4 pb-4 pt-2 flex gap-2 overflow-x-auto">
                                                        {slides[currentSlide].imagesBefore.map((img, i) => (
                                                            <button
                                                                key={i}
                                                                onClick={() => setActiveBeforeImage(i)}
                                                                className={`w-10 h-10 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${activeBeforeImage === i ? 'border-red-500 scale-110' : 'border-zinc-200 hover:border-zinc-400'}`}
                                                            >
                                                                <img src={img} alt={`Before ${i + 1}`} className="w-full h-full object-cover" />
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}

                                        {/* After Placeholder / App Preview */}
                                        <motion.div variants={itemVariants} className="flex-1 relative bg-zinc-50 border border-zinc-200 rounded-[1.5rem] overflow-hidden flex flex-col group shadow-sm min-h-0">
                                            {slides[currentSlide].imagesBefore && slides[currentSlide].imagesBefore.length > 0 && (
                                                <div className="absolute top-3 left-4 px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-[9px] font-black tracking-widest uppercase z-20">After</div>
                                            )}

                                            {/* Main Image Display */}
                                            <div className="flex-1 w-full h-full bg-zinc-100 flex items-center justify-center p-6 pt-12 relative">
                                                {slides[currentSlide].imagesAfter && slides[currentSlide].imagesAfter.length > 0 ? (
                                                    <>
                                                        <div className="w-full h-full bg-white rounded-xl overflow-hidden shadow-lg relative flex items-center justify-center">
                                                            {/* Dashboard Header (Top Bar) */}
                                                            <div className="absolute top-0 left-0 right-0 h-6 bg-zinc-50 border-b border-zinc-200 flex items-center px-3 gap-2 z-10">
                                                                <div className="flex gap-1.5">
                                                                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                                                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                                                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                                                </div>
                                                                <div className="flex-1 h-3 bg-zinc-200 rounded-full max-w-[120px]"></div>
                                                            </div>
                                                            <img
                                                                src={slides[currentSlide].imagesAfter[activeAfterImage]}
                                                                alt="After"
                                                                className="w-full h-[calc(100%-24px)] mt-6 object-contain cursor-pointer"
                                                                onClick={() => setEnlargedImage({
                                                                    url: slides[currentSlide].imagesAfter[activeAfterImage],
                                                                    images: slides[currentSlide].imagesAfter,
                                                                    index: activeAfterImage
                                                                })}
                                                            />
                                                        </div>

                                                        {/* Navigation Arrows */}
                                                        {slides[currentSlide].imagesAfter.length > 1 && (
                                                            <>
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); setActiveAfterImage(prev => prev > 0 ? prev - 1 : slides[currentSlide].imagesAfter.length - 1); }}
                                                                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/60 hover:bg-white rounded-full flex items-center justify-center shadow-sm text-zinc-500 hover:text-zinc-900 transition-all z-10 opacity-40 hover:opacity-100"
                                                                >
                                                                    <ChevronLeft size={16} />
                                                                </button>
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); setActiveAfterImage(prev => prev < slides[currentSlide].imagesAfter.length - 1 ? prev + 1 : 0); }}
                                                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/60 hover:bg-white rounded-full flex items-center justify-center shadow-sm text-zinc-500 hover:text-zinc-900 transition-all z-10 opacity-40 hover:opacity-100"
                                                                >
                                                                    <ChevronRight size={16} />
                                                                </button>
                                                            </>
                                                        )}
                                                    </>
                                                ) : (
                                                    <div className="flex flex-col items-center gap-2 opacity-30">
                                                        <ImageIcon size={28} className="text-zinc-500" />
                                                        <span className="text-[8px] font-mono font-black tracking-widest uppercase text-zinc-600">After</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Thumbnail Strip */}
                                            {slides[currentSlide].imagesAfter && slides[currentSlide].imagesAfter.length > 1 && (
                                                <div className="px-4 pb-4 pt-2 flex gap-2 overflow-x-auto">
                                                    {slides[currentSlide].imagesAfter.map((img, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => setActiveAfterImage(i)}
                                                            className={`w-10 h-10 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${activeAfterImage === i ? 'border-emerald-500 scale-110' : 'border-zinc-200 hover:border-zinc-400'}`}
                                                        >
                                                            <img src={img} alt={`After ${i + 1}`} className="w-full h-full object-cover" />
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </motion.div>
                                    </div>

                                    {/* Right Side: Textual Content & Impact */}
                                    <div className="w-[60%] flex flex-col h-full pl-4 overflow-y-auto pr-2 custom-scrollbar">
                                        <div className="mb-3">
                                            <motion.h2 variants={itemVariants} className="text-lg lg:text-xl font-black text-zinc-900 uppercase tracking-tighter mb-1 leading-none">{slides[currentSlide].title}</motion.h2>
                                            <motion.p variants={itemVariants} className="text-zinc-500 font-mono text-[11px] lg:text-[12px] tracking-widest uppercase font-bold">{slides[currentSlide].subtitle}</motion.p>
                                        </div>

                                        <div className="flex flex-col gap-2 mb-2">
                                            {slides[currentSlide].paragraphs.map((p, i) => (
                                                <motion.div variants={itemVariants} key={i} className="flex gap-3 items-start">
                                                    <div className="w-1 h-1 mt-1.5 rounded-full bg-emerald-500 shrink-0 shadow-sm" />
                                                    <p className="text-[12px] lg:text-[13px] leading-relaxed text-zinc-600 font-medium text-justify">
                                                        {p}
                                                    </p>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <div className="mt-6 border-t border-zinc-100 pt-2">
                                            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-2">
                                                <div className="p-0.5 bg-emerald-100 rounded text-emerald-600 shadow-sm"><TrendingUp size={12} /></div>
                                                <h3 className="text-[10px] font-black text-zinc-800 uppercase tracking-widest">Metrik Hasil Akhir</h3>
                                            </motion.div>                                            <div className="grid grid-cols-4 gap-x-5">
                                                {slides[currentSlide].impact.map((res, i) => (
                                                    <motion.div variants={itemVariants} key={i} className="group">
                                                        <div className="flex flex-row items-center gap-2 mb-2">
                                                            <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 group-hover:bg-emerald-50 transition-all duration-300 shadow-sm shrink-0">
                                                                {i === 0 ? <CheckCircle size={16} /> : i === 1 ? <TrendingUp size={16} /> : i === 2 ? <ShieldCheck size={16} /> : <BarChart size={16} />}
                                                            </div>
                                                            <h4 className="text-[18px] lg:text-[20px] font-black text-zinc-900 leading-none tracking-tight">{res.value}</h4>
                                                        </div>
                                                        <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1.5 px-1">{res.label}</p>
                                                        <p className="text-[10px] lg:text-[11px] text-zinc-400 font-medium leading-tight px-1 max-w-[150px]">{res.desc}</p>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {slides[currentSlide].type === 'case-study' && (
                                <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex flex-col h-full pt-2">
                                    <motion.div variants={itemVariants} className="text-center mb-4">
                                        <h2 className="text-2xl md:text-3xl font-black text-zinc-900 uppercase tracking-tighter mb-1">{slides[currentSlide].title}</h2>
                                        <p className="text-zinc-400 font-mono text-[9px] tracking-[0.3em] uppercase">{slides[currentSlide].subtitle}</p>
                                    </motion.div>

                                    <div className="grid grid-cols-2 grid-rows-2 gap-3 flex-1 pb-2">

                                        {/* Panel 01 — Context / Latar Belakang */}
                                        <motion.div variants={itemVariants} className="relative bg-zinc-50 border border-zinc-100 p-5 rounded-[1.5rem] flex flex-col gap-2.5 hover:border-zinc-200 transition-colors group overflow-hidden">
                                            <div className="absolute top-4 right-5 text-[9px] font-black font-mono text-zinc-200 tracking-[0.3em] group-hover:text-zinc-300 transition-colors select-none">01</div>
                                            <p className="text-[11px] font-black text-zinc-800 leading-snug pr-6 tracking-tight">{slides[currentSlide].context.headline}</p>
                                            <div className="space-y-1.5 mt-1">
                                                {slides[currentSlide].context.points.map((pt, i) => (
                                                    <div key={i} className="flex gap-2 text-[9.5px] text-zinc-500 leading-relaxed">
                                                        <div className="w-1 h-1 bg-zinc-300 rounded-full mt-[5px] shrink-0" />
                                                        {pt}
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>

                                        {/* Panel 02 — Solution / Rencana Perbaikan */}
                                        <motion.div variants={itemVariants} className="relative bg-zinc-900 p-5 rounded-[1.5rem] flex flex-col gap-2.5 overflow-hidden group">
                                            <div className="absolute top-4 right-5 text-[9px] font-black font-mono text-white/15 tracking-[0.3em] group-hover:text-white/30 transition-colors select-none">02</div>
                                            <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-white/[0.03] rounded-full blur-2xl" />
                                            <p className="text-[11px] font-black text-white leading-snug pr-6 tracking-tight relative z-10">{slides[currentSlide].plan.headline}</p>
                                            <div className="space-y-1.5 mt-1 relative z-10">
                                                {slides[currentSlide].plan.points.map((pt, i) => (
                                                    <div key={i} className="flex gap-2 text-[9.5px] text-zinc-400 leading-relaxed">
                                                        <div className="w-1 h-1 bg-white/25 rounded-full mt-[5px] shrink-0" />
                                                        {pt}
                                                    </div>
                                                ))}
                                            </div>
                                            {slides[currentSlide].title.includes('DOORS') && (
                                                <div className="mt-auto pt-3 flex gap-5 opacity-25 group-hover:opacity-60 transition-all duration-500 relative z-10">
                                                    <div className="flex items-center gap-1.5"><Smartphone size={13} className="text-zinc-500" /><span className="text-[7px] uppercase tracking-widest font-bold text-zinc-500">Mobile</span></div>
                                                    <div className="flex items-center gap-1.5"><Tablet size={13} className="text-zinc-500" /><span className="text-[7px] uppercase tracking-widest font-bold text-zinc-500">On-Spot</span></div>
                                                </div>
                                            )}
                                        </motion.div>

                                        {/* Panel 03 — Impact / Hasil */}
                                        <motion.div variants={itemVariants} className="relative bg-emerald-950 border border-emerald-900/20 p-5 rounded-[1.5rem] flex flex-col gap-2.5 overflow-hidden group">
                                            <div className="absolute top-4 right-5 text-[9px] font-black font-mono text-emerald-800 tracking-[0.3em] group-hover:text-emerald-600 transition-colors select-none">03</div>
                                            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
                                            <p className="text-[11px] font-black text-emerald-100 leading-snug pr-6 tracking-tight relative z-10">{slides[currentSlide].result.headline}</p>
                                            <div className="space-y-1.5 mt-1 relative z-10">
                                                {slides[currentSlide].result.points.map((pt, i) => (
                                                    <div key={i} className="flex gap-2 text-[9.5px] text-emerald-400/80 leading-relaxed font-medium">
                                                        <div className="p-0.5 rounded-sm bg-emerald-500/20 text-emerald-500 shrink-0 mt-0.5"><BarChart size={7} /></div>
                                                        {pt}
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>

                                        {/* Panel 04 — Future / Saran ke Depan */}
                                        <motion.div variants={itemVariants} className="relative bg-white border border-zinc-100 p-5 rounded-[1.5rem] flex flex-col gap-2.5 hover:border-zinc-200 transition-colors group overflow-hidden">
                                            <div className="absolute top-4 right-5 text-[9px] font-black font-mono text-zinc-200 tracking-[0.3em] group-hover:text-zinc-300 transition-colors select-none">04</div>
                                            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-50 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                                            <p className="text-[11px] font-black text-zinc-800 leading-snug pr-6 tracking-tight">{slides[currentSlide].future.headline}</p>
                                            <div className="space-y-1.5 mt-1">
                                                {slides[currentSlide].future.points.map((pt, i) => (
                                                    <div key={i} className="flex gap-2 text-[9.5px] text-zinc-400 leading-relaxed">
                                                        <div className="w-1 h-1 bg-blue-300 rounded-full mt-[5px] shrink-0" />
                                                        {pt}
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>

                                    </div>
                                </motion.div>
                            )}

                            {slides[currentSlide].type === 'insight-feedback' && (
                                <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex flex-col h-full pt-4">
                                    <motion.div variants={itemVariants} className="text-center mb-8">
                                        <h2 className="text-2xl md:text-3xl font-black text-zinc-900 uppercase tracking-tighter mb-1">{slides[currentSlide].title}</h2>
                                        <p className="text-zinc-400 font-mono text-[9px] tracking-[0.3em] uppercase">Learning Journey & Final Reflection</p>
                                    </motion.div>

                                    <div className="grid grid-cols-[1.2fr_0.8fr] gap-8 flex-1 h-full items-start px-2">
                                        {/* Left Side: Insights */}
                                        <div className="space-y-3">
                                            {slides[currentSlide].points.map((point, i) => (
                                                <motion.div key={i} variants={itemVariants} whileHover={{ x: 6, backgroundColor: "#fafafa" }} className="flex items-center gap-4 p-3.5 bg-white border border-zinc-100 rounded-[1.2rem] shadow-sm transition-all group">
                                                    <div className="w-9 h-9 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-800 shadow-sm border border-zinc-100 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-500 shrink-0">
                                                        {React.cloneElement(point.icon, { size: 13 })}
                                                    </div>
                                                    <p className="text-[12px] text-zinc-800 font-bold tracking-tight leading-snug">{point.text}</p>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Right Side: Kesan & Saran */}
                                        <div className="flex flex-col gap-4 h-full">
                                            <motion.div variants={itemVariants} className="bg-white/95 backdrop-blur-xl border border-zinc-100 p-6 rounded-[1.5rem] shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group">
                                                <div className="absolute top-0 left-0 w-full h-1 bg-zinc-900" />
                                                <MessageSquare className="w-6 h-6 text-zinc-200 mb-3 group-hover:scale-110 group-hover:text-zinc-900 transition-all duration-500" />
                                                <p className="text-xs md:text-sm text-zinc-800 font-black leading-[1.5] italic px-2">"{slides[currentSlide].kesan}"</p>
                                                <span className="mt-4 text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Kesan Magang</span>
                                            </motion.div>

                                            <motion.div variants={itemVariants} className="bg-zinc-900 p-6 rounded-[1.5rem] shadow-xl flex flex-col items-center justify-center text-center text-white relative group">
                                                <div className="absolute top-0 right-0 w-full h-1 bg-white/20" />
                                                <Lightbulb className="w-6 h-6 text-white/30 mb-3 group-hover:scale-110 group-hover:text-white transition-all duration-500" />
                                                <p className="text-xs md:text-sm text-zinc-100 font-bold leading-[1.5] px-2">"{slides[currentSlide].saran}"</p>
                                                <span className="mt-4 text-[8px] font-mono text-white/40 uppercase tracking-widest font-bold">Saran & Perbaikan</span>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {slides[currentSlide].type === 'target' && (
                                <div className="flex flex-col h-full pt-10 px-4">
                                    <motion.div variants={containerVariants} initial="initial" animate="animate" className="text-center mb-0"><motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-black text-zinc-900 uppercase tracking-tighter">{slides[currentSlide].title}</motion.h2><motion.p variants={itemVariants} className="text-zinc-400 font-mono text-[9px] tracking-[0.4em] uppercase">Digital Transformation 2026-2035</motion.p></motion.div>
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
                                <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex h-full items-center justify-between gap-12 pt-2 pb-6 px-10">
                                    {/* Left Side: Photo */}
                                    <motion.div variants={itemVariants} className="relative w-[45%] h-[90%] rounded-[2.5rem] overflow-hidden flex items-center justify-center">
                                        <img src="/foto-bersama.jpeg" alt="HRMS Team" className="w-full h-full object-contain" />
                                    </motion.div>

                                    {/* Right Side: Text & Contacts */}
                                    <div className="flex-1 flex flex-col items-start justify-center space-y-10 pl-16">
                                        <div className="space-y-3">
                                            <motion.h2
                                                variants={itemVariants}
                                                className="text-5xl md:text-6xl lg:text-7xl font-black text-zinc-900 tracking-tighter uppercase leading-[0.85]"
                                            >
                                                {slides[currentSlide].title}
                                            </motion.h2>
                                            <motion.p
                                                variants={itemVariants}
                                                className="text-zinc-400 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase max-w-sm"
                                            >
                                                {slides[currentSlide].subtitle}
                                            </motion.p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {!(slides[currentSlide].type === 'doors-solution-impact' && !enlargedImage) && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-3 md:px-5 no-print z-[90]">
                        <button onClick={() => paginate(-1)} disabled={currentSlide === 0} className={`p-2 rounded-full bg-white/20 backdrop-blur-md border border-zinc-200/30 text-zinc-500 hover:text-zinc-900 hover:bg-white pointer-events-auto transition-all shadow-sm ${currentSlide === 0 ? 'opacity-0 scale-50 cursor-default' : 'opacity-20 hover:opacity-100'}`}><ChevronLeft size={20} /></button>
                        <button onClick={() => paginate(1)} disabled={currentSlide === slides.length - 1} className={`p-2 rounded-full bg-white/20 backdrop-blur-md border border-zinc-200/30 text-zinc-500 hover:text-zinc-900 hover:bg-white pointer-events-auto transition-all shadow-sm ${currentSlide === slides.length - 1 ? 'opacity-0 scale-50 cursor-default' : 'opacity-20 hover:opacity-100'}`}><ChevronRight size={20} /></button>
                    </div>
                )}
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

            {/* Enlarged Image Modal (Lightbox) */}
            {enlargedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-8 no-print"
                    onClick={() => setEnlargedImage(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative max-w-full max-h-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setEnlargedImage(null)}
                            className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
                        >
                            <X size={20} />
                        </button>
                        {/* Enlarged Image */}
                        <img
                            src={enlargedImage.url}
                            alt="Enlarged view"
                            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                        />
                    </motion.div>
                </motion.div>
            )}

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
