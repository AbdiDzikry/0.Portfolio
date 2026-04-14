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
            type: 'intro-doors',
            title: 'Project DOORS — Latar Belakang',
            subtitle: 'Sistem Manajemen Reservasi Ruang Rapat',
            image: '/old-doors-icon.png',
            paragraphs: [
                'DOORS merupakan sistem manajemen pemesanan ruang meeting yang berguna untuk meminjam ruangan yang tersedia di perusahaan untuk berbagai keperluan meeting atau bertemu dengan tamu.',
                'Namun fitur pada sistem DOORS saat ini sudah tidak relevan dengan kebutuhan pengguna saat ini.',
                'Ini dibuktikan dengan analisis serta validasi saya selama satu bulan terhadap sistem DOORS yang sudah ada, ditemukan 8 pain point atau kesulitan yang dialami oleh pengguna pada sistem lama sebagai berikut.'
            ]
        },
        {
            type: 'doors-problems',
            title: 'Project DOORS',
            subtitle: 'Aplikasi lama sudah ada — tapi tidak cukup untuk hari ini',
            stat: { rooms: '14 Ruangan', freq: '~25 Booking/Hari', prev: 'Sistem Lama' },
            problems: [
                { num: '01', tag: 'Proses Lambat', desc: 'Alur pemesanan di aplikasi lama terlalu panjang dan tidak efisien', image: '/doors_problem_01.png' },
                { num: '02', tag: 'UI Tidak Informatif', desc: 'Tampilan lama tidak memberikan informasi yang cukup bagi pengguna', image: '/doors_problem_02.png' },
                { num: '03', tag: 'Tanpa Visualisasi', desc: 'Tidak ada cara visual melihat ketersediaan ruang — harus cek satu per satu dari daftar meeting', image: '/doors_problem_03.png' },
                { num: '04', tag: 'Laptop Only', desc: 'Hanya bisa diakses lewat laptop; tidak bisa dari handphone sama sekali', image: '/doors_problem_04.png' },
                { num: '05', tag: 'Absensi Manual', desc: 'Pencatatan daftar hadir masih menggunakan kertas, tidak terintegrasi', image: '/doors_problem_05.png' },
                { num: '06', tag: 'Ghost Meeting', desc: 'Ruangan dipesan namun tidak dipakai, menimbulkan konflik dengan pengguna lain yang membutuhkan', image: '/doors_problem_06.png' },
                { num: '07', tag: 'Tanpa On-the-Spot', desc: 'Tidak bisa memesan atau melihat status ruangan langsung di depan pintu', image: '/doors_problem_07.png' },
                { num: '08', tag: 'Tidak Bisa Edit', desc: 'Tidak ada fitur untuk mengubah jadwal meeting yang sudah dibuat', image: '/doors_problem_08.png' },
            ]
        },
        {
            type: 'before-after-detail',
            title: 'Solusi #1: Pemesanan Cepat & Ringkas',
            subtitle: 'Mengatasi Alur "Proses Lambat"',
            before: {
                label: 'Proses Lambat (Pain Point)',
                desc: 'Alur pemesanan di aplikasi lama terlalu panjang dan tidak efisien, memaksa pengguna melewati banyak layar input.',
                image: ''
            },
            after: {
                label: 'Alur Ringkas (Fitur Baru)',
                desc: 'Kami merombak alur pemesanan menjadi 4 langkah sederhana. Proses reservasi tertuntaskan dalam waktu kurang dari 2 menit.',
                image: ''
            }
        },
        {
            type: 'before-after-detail',
            title: 'Solusi #2: Antarmuka Terpusat',
            subtitle: 'Mengatasi Kendala "UI Tidak Informatif"',
            before: {
                label: 'UI Tidak Informatif (Pain Point)',
                desc: 'Tampilan lama sangat berantakan dan tidak memberikan cukup informasi sekilas bagi pengguna yang membutuhkan keputusan cepat.',
                image: ''
            },
            after: {
                label: 'Dashboard Intuitif (Fitur Baru)',
                desc: 'Menyajikan Dashboard yang kaya, memusatkan status ketersediaan, peminjam, serta kapasitas fasilitas ruangan di dalam satu layar yang bersih.',
                image: ''
            }
        },
        {
            type: 'before-after-detail',
            title: 'Solusi #3: Visualisasi Jadwal Real-time',
            subtitle: 'Mengatasi Kondisi "Tanpa Visualisasi"',
            before: {
                label: 'Tanpa Visualisasi (Pain Point)',
                desc: 'Sistem hanya menampilkan daftar baris teks jadwal. Pengguna harus mengecek satu per satu ke bawah untuk menemukan jam ruangan kosong.',
                image: ''
            },
            after: {
                label: 'Timeline Interaktif (Fitur Baru)',
                desc: 'Menyediakan grafik Timeline (Gantt Chart) yang memetakan aktivitas jam pemakaian seluruh ruangan secara sebaran memanjang.',
                image: ''
            }
        },
        {
            type: 'before-after-detail',
            title: 'Solusi #4: Aksesibilitas Lintas Perangkat',
            subtitle: 'Mengatasi Keterbatasan "Laptop Only"',
            before: {
                label: 'Laptop Only (Pain Point)',
                desc: 'Sistem cuma bisa dibuka dengan lancar dari laptop/komputer. Sama sekali tidak bisa diakses dari perangkat genggam mobile.',
                image: ''
            },
            after: {
                label: 'Mobile Responsive (Fitur Baru)',
                desc: 'Dibangun dengan pendekatan antarmuka modern (Progressive Web App). Dapat diakses sangat mulus langsung dari Browser Handphone.',
                image: ''
            }
        },
        {
            type: 'before-after-detail',
            title: 'Solusi #5: Digitalisasi Kehadiran Mulus',
            subtitle: 'Mengatasi Proses "Absensi Manual" Kertas',
            before: {
                label: 'Absensi Manual (Pain Point)',
                desc: 'Proses pencatatan daftar hadir peserta rapat masih menggunakan kertas berjalan, menyulitkan arsip dan membuang sumber daya.',
                image: ''
            },
            after: {
                label: 'Absensi Terintegrasi (Fitur Baru)',
                desc: 'Fitur daftar hadir digital dengan tombol Check-In mandiri yang terkoneksi langsung ke sistem rekapitulasi (export laporan PDF).',
                image: ''
            }
        },
        {
            type: 'before-after-detail',
            title: 'Solusi #6: Limitasi Hadir Otomatis',
            subtitle: 'Mengatasi Budaya "Ghost Meeting"',
            before: {
                label: 'Ghost Meeting (Pain Point)',
                desc: 'Sering terjadi kondisi di mana ruangan sudah dipesan namun sama sekali tidak ada yang memakai karena sifatnya "booking sedia payung".',
                image: ''
            },
            after: {
                label: 'Auto-Release Pinalti (Fitur Baru)',
                desc: 'Mengimplementasi aturan batas waktu (Check-in Limit) 15 menit. Jadwal akan tergugurkan otomatis jika peminjam urung hadir.',
                image: ''
            }
        },
        {
            type: 'before-after-detail',
            title: 'Solusi #7: Digital Signage di Pintu',
            subtitle: 'Mengatasi Minimnya Pesan "On The Spot"',
            before: {
                label: 'Tanpa On-The-Spot (Pain Point)',
                desc: 'Tidak bisa melihat peruntukan status maupun memesan ruangan langsung saat sedang berdiri diam di depan kamar ruang meeting besangkutan.',
                image: ''
            },
            after: {
                label: 'Layar Tablet Display (Fitur Baru)',
                desc: 'Kami menyediakan dan menempelkan perangkat Layar Tablet Interaktif (Signage) tepat di lorong tembok luar masing-masing pintu.',
                image: ''
            }
        },
        {
            type: 'before-after-detail',
            title: 'Solusi #8: Modifikasi Jadwal Fleksibel',
            subtitle: 'Mengatasi Fitur "Tidak Bisa Edit"',
            before: {
                label: 'Sistem Kaku (Pain Point)',
                desc: 'Setelah pemesanan selesai, sistem tidak mengakomodasi perubahan durasi jam dadakan. Anda harus me-reservasi ulang dari awal.',
                image: ''
            },
            after: {
                label: 'Fleksibilitas Bebas Bentrok (Fitur Baru)',
                desc: 'Memberikan panel agar pengguna dapat memodifikasi form jadwalnya langsung, didukung keamanan algoritma deteksi tabrakan waktu antar-karyawan.',
                image: ''
            }
        },
        {
            type: 'doors-impact',
            title: 'Project DOORS: Hasil Validasi',
            subtitle: 'Dampak & Perbandingan Metrik Nyata di Lapangan',
            result: [
                { label: 'Efisiensi Booking', value: '> 80%', desc: 'Proses manual 10 menit turun dramatis menjadi kurang dari 2 menit.' },
                { label: 'Double Booking', value: '0 Kasus', desc: 'Validasi cross-time pada sistem menghilangkan bentrokan jadwal 100%.' },
                { label: 'Usability (SUS)', value: '72.5', desc: 'Melampaui skor rata-rata (70), tervalidasi sangat mudah digunakan oleh karyawan.' }
            ]
        },
        {
            type: 'case-study',
            title: 'AC Monitoring Management',
            subtitle: 'Sistem Pemantauan Perawatan Aset Gedung',
            context: {
                headline: 'Perawatan ratusan unit AC dikelola secara manual lintas departemen',
                points: [
                    'Tidak ada jadwal maintenance yang sistematis dan terdokumentasi',
                    'Tim GA baru mengetahui kerusakan setelah terjadi — bukan sebelumnya',
                    'Data kondisi aset tersebar di spreadsheet dan catatan manual'
                ]
            },
            plan: {
                headline: 'Dashboard terpusat untuk pemantauan preventif seluruh unit AC',
                points: [
                    'Status setiap unit AC tercatat real-time dalam satu platform',
                    'Jadwal maintenance ter-generate otomatis berdasarkan interval waktu',
                    'Riwayat perbaikan tersimpan dan bisa diaudit lintas departemen'
                ]
            },
            result: {
                headline: 'Maintenance bergeser dari reaktif menjadi preventif terencana',
                points: [
                    'Tidak ada lagi maintenance dadakan yang mengganggu operasional',
                    'Sinkronisasi data aset antar departemen berjalan tanpa hambatan',
                    'Integritas catatan teknis terjamin dan dapat diaudit kapan saja'
                ]
            },
            future: {
                headline: 'Potensi skalabilitas sistem ke level yang lebih cerdas',
                points: [
                    'Integrasi sensor IoT untuk monitoring suhu & konsumsi daya real-time',
                    'Prediktif maintenance berbasis pola kerusakan historis',
                    'Konsolidasi dashboard untuk seluruh aset gedung, bukan hanya AC'
                ]
            }
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
            subtitle: "For HRMS Dharma Polimetal, to collaborate and build something great together.",
            contact: {
                linkedin: 'Sulthan Abdi Dzikry',
                email: 'abdidzikry.work@gmail.com'
            }
        }
    ];

    const [direction, setDirection] = useState(0);
    const [hoveredProblem, setHoveredProblem] = useState(0);

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

                            {slides[currentSlide].type === 'intro-doors' && (
                                <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex h-full items-center justify-between gap-12 pt-2 pb-6 px-4">
                                    {/* Left Side: Text */}
                                    <div className="flex-1 flex flex-col justify-center space-y-8 pr-4">
                                        <div className="space-y-3">
                                            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tighter uppercase leading-[0.85]">{slides[currentSlide].title}</motion.h2>
                                            <motion.p variants={itemVariants} className="text-zinc-400 font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase">{slides[currentSlide].subtitle}</motion.p>
                                        </div>
                                        <motion.div variants={itemVariants} className="space-y-6">
                                            {slides[currentSlide].paragraphs.map((p, i) => (
                                                <div key={i} className="flex gap-4 items-start">
                                                    <div className="w-1.5 h-1.5 mt-2.5 rounded-full bg-zinc-900 shrink-0" />
                                                    <p className={`text-[13px] md:text-sm leading-relaxed ${i === 0 ? 'text-zinc-600 font-bold' : 'text-zinc-500 font-medium'}`}>
                                                        {p}
                                                    </p>
                                                </div>
                                            ))}
                                        </motion.div>
                                    </div>
                                    {/* Right Side: Image */}
                                    <motion.div variants={itemVariants} className="relative w-[45%] h-[80%] rounded-[2rem] overflow-hidden shadow-xl border-4 border-white bg-zinc-50 flex items-center justify-center group">
                                        <img src={slides[currentSlide].image} alt="DOORS Concept" className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                                    </motion.div>
                                </motion.div>
                            )}

                            {slides[currentSlide].type === 'doors-problems' && (
                                <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex flex-col h-full pt-2">
                                    <motion.div variants={itemVariants} className="flex items-end justify-between mb-4">
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-black text-zinc-900 uppercase tracking-tighter">{slides[currentSlide].title}</h2>
                                            <p className="text-zinc-400 font-mono text-[9px] tracking-[0.3em] uppercase mt-0.5">{slides[currentSlide].subtitle}</p>
                                        </div>
                                        <div className="flex gap-3 shrink-0">
                                            {Object.values(slides[currentSlide].stat).map((val, i) => (
                                                <div key={i} className="text-center bg-zinc-50 border border-zinc-100 rounded-xl px-3 py-2">
                                                    <p className="text-[10px] font-black text-zinc-900 leading-none">{val}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    <div className="flex flex-1 gap-8 pb-2 min-h-0 items-stretch">
                                        {/* Left Side: List */}
                                        <div className="w-[45%] flex flex-col gap-2.5 overflow-y-auto pr-2 scrollbar-none pb-4">
                                            {slides[currentSlide].problems.map((p, i) => (
                                                <div 
                                                    key={i} 
                                                    onMouseEnter={() => setHoveredProblem(i)}
                                                    className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${hoveredProblem === i ? 'bg-zinc-900 border-zinc-900 shadow-md' : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'}`}
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <span className={`text-[10px] mt-0.5 font-black font-mono tracking-[0.2em] transition-colors duration-300 ${hoveredProblem === i ? 'text-zinc-500' : 'text-zinc-400'}`}>{p.num}</span>
                                                        <div className="flex-1">
                                                            <h4 className={`text-[12px] md:text-[13px] font-black uppercase tracking-widest leading-tight transition-colors duration-300 ${hoveredProblem === i ? 'text-white' : 'text-zinc-700'}`}>{p.tag}</h4>
                                                            <AnimatePresence>
                                                                {hoveredProblem === i && (
                                                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                                                                        <p className="text-[11px] md:text-[12px] text-zinc-300 mt-2 font-medium leading-snug">
                                                                            {p.desc}
                                                                        </p>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        {/* Right Side: Image / Visualizer */}
                                        <div className="w-[55%] relative rounded-[2rem] border-2 border-zinc-100 flex items-center justify-center overflow-hidden bg-zinc-50 shadow-inner">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={hoveredProblem}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute inset-0 p-4 flex flex-col items-center justify-center text-center"
                                                >
                                                    {slides[currentSlide].problems[hoveredProblem].image ? (
                                                        <img src={slides[currentSlide].problems[hoveredProblem].image} alt="" className="w-full h-full object-contain" />
                                                    ) : (
                                                        <div className="w-full h-full rounded-[1.5rem] bg-[#1a1a1a] flex flex-col items-center justify-center p-10 relative overflow-hidden shadow-xl border border-zinc-800">
                                                            {/* Background Number Pattern */}
                                                            <span className="absolute -bottom-16 -right-12 text-[280px] font-black text-zinc-800/40 leading-none select-none tracking-tighter">{slides[currentSlide].problems[hoveredProblem].num}</span>
                                                            
                                                            <div className="relative z-10 flex flex-col items-center">
                                                                <div className="w-16 h-16 rounded-2xl bg-zinc-800 mb-8 border border-zinc-700 flex items-center justify-center shadow-lg">
                                                                    <span className="text-2xl font-black text-zinc-400">{slides[currentSlide].problems[hoveredProblem].num}</span>
                                                                </div>
                                                                <h3 className="text-3xl md:text-4xl font-black uppercase text-white tracking-widest leading-none mb-6">{slides[currentSlide].problems[hoveredProblem].tag}</h3>
                                                                <p className="text-zinc-400 text-sm md:text-base font-medium max-w-sm leading-relaxed">{slides[currentSlide].problems[hoveredProblem].desc}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </motion.div>
                            )}



                            {slides[currentSlide].type === 'before-after-detail' && (
                                <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex flex-col h-full pt-2">
                                    <motion.div variants={itemVariants} className="text-center mb-6">
                                        <h2 className="text-2xl md:text-3xl font-black text-zinc-900 uppercase tracking-tighter mb-1">{slides[currentSlide].title}</h2>
                                        <p className="text-zinc-500 font-mono text-[9px] tracking-[0.3em] uppercase">{slides[currentSlide].subtitle}</p>
                                    </motion.div>

                                    <div className="flex-1 flex items-stretch gap-6 pb-2">
                                        {/* Left Side: Before */}
                                        <motion.div variants={itemVariants} className="w-1/2 flex flex-col gap-4 bg-zinc-50 border border-zinc-200 rounded-[2rem] p-6 shadow-sm relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 bg-red-100 text-red-600 px-4 py-1.5 rounded-bl-[1.5rem] text-[10px] font-black tracking-widest uppercase">Before</div>
                                            <div className="mb-2 pr-20">
                                                <h3 className="text-[13px] font-black text-zinc-800 uppercase tracking-tight leading-none mb-2">{slides[currentSlide].before.label}</h3>
                                                <p className="text-[12px] font-medium text-zinc-500 leading-relaxed">{slides[currentSlide].before.desc}</p>
                                            </div>
                                            {/* Placeholder Image Box */}
                                            <div className="flex-1 rounded-[1.5rem] border-2 border-dashed border-red-200 bg-white flex flex-col items-center justify-center p-6 mt-2 relative overflow-hidden transition-colors group-hover:border-red-300">
                                                {slides[currentSlide].before.image ? (
                                                    <img src={slides[currentSlide].before.image} alt="Before" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="flex flex-col items-center gap-3 text-red-300 opacity-60">
                                                        <ImageIcon size={40} strokeWidth={1} />
                                                        <span className="text-[10px] font-mono tracking-widest text-center max-w-[200px]">PLACEHOLDER FOTO SISTEM LAMA</span>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>

                                        {/* Center Arrow */}
                                        <div className="w-10 shrink-0 flex items-center justify-center">
                                            <div className="w-10 h-10 rounded-full bg-white shadow-md border border-zinc-100 flex items-center justify-center text-zinc-400 z-10">
                                                <ArrowRight size={18} />
                                            </div>
                                        </div>

                                        {/* Right Side: After */}
                                        <motion.div variants={itemVariants} className="w-1/2 flex flex-col gap-4 bg-white border border-blue-100 rounded-[2rem] p-6 shadow-md relative overflow-hidden group">
                                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
                                            <div className="absolute top-0 right-0 bg-blue-100 text-blue-600 px-4 py-1.5 rounded-bl-[1.5rem] text-[10px] font-black tracking-widest uppercase z-10">After</div>
                                            <div className="mb-2 pr-20 relative z-10">
                                                <h3 className="text-[13px] font-black text-blue-800 uppercase tracking-tight leading-none mb-2">{slides[currentSlide].after.label}</h3>
                                                <p className="text-[12px] font-medium text-zinc-600 leading-relaxed">{slides[currentSlide].after.desc}</p>
                                            </div>
                                            {/* Placeholder Image Box */}
                                            <div className="flex-1 rounded-[1.5rem] border-2 border-dashed border-blue-200 bg-blue-50/30 flex flex-col items-center justify-center p-6 mt-2 relative overflow-hidden transition-colors group-hover:border-blue-300 z-10">
                                                {slides[currentSlide].after.image ? (
                                                    <img src={slides[currentSlide].after.image} alt="After" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="flex flex-col items-center gap-3 text-blue-300 opacity-60">
                                                        <ImageIcon size={40} strokeWidth={1} />
                                                        <span className="text-[10px] font-mono tracking-widest text-center max-w-[200px]">PLACEHOLDER FOTO SISTEM BARU (DOORS)</span>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}

                            {slides[currentSlide].type === 'doors-impact' && (
                                <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex flex-col h-full pt-6">
                                    <motion.div variants={itemVariants} className="text-center mb-10">
                                        <h2 className="text-3xl md:text-4xl font-black text-zinc-900 uppercase tracking-tighter mb-2">{slides[currentSlide].title}</h2>
                                        <p className="text-zinc-500 font-mono text-[10px] tracking-[0.3em] uppercase">{slides[currentSlide].subtitle}</p>
                                    </motion.div>

                                    <div className="flex-1 flex justify-center pb-8 px-4">
                                        <motion.div variants={itemVariants} className="w-full max-w-4xl bg-zinc-900 rounded-[2.5rem] p-10 lg:p-14 flex flex-col justify-center relative overflow-hidden shadow-2xl">
                                            <div className="absolute -top-20 -right-20 w-80 h-80 bg-zinc-800 rounded-full blur-[80px] opacity-60 pointer-events-none" />
                                            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-900/30 rounded-full blur-[80px] opacity-60 pointer-events-none" />
                                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-emerald-400 to-emerald-500" />
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative z-10">
                                                {slides[currentSlide].result.map((res, i) => (
                                                    <div key={i} className="flex flex-col items-center text-center gap-4 group">
                                                        <div className="w-16 h-16 rounded-3xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-zinc-800/80 transition-all duration-300 shadow-xl">
                                                            {i === 0 ? <TrendingUp size={28} /> : i === 1 ? <ShieldCheck size={28} /> : <Target size={28} />}
                                                        </div>
                                                        <div>
                                                            <h3 className="text-4xl lg:text-5xl font-black text-white leading-none tracking-tighter mb-3">{res.value}</h3>
                                                            <p className="text-[12px] lg:text-[13px] font-bold text-zinc-300 uppercase tracking-widest mb-2">{res.label}</p>
                                                            <p className="text-[11px] lg:text-[12px] text-zinc-500 font-medium leading-relaxed max-w-[200px] mx-auto">{res.desc}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
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
                                        <motion.div variants={itemVariants} className="flex flex-col gap-3 w-full max-w-xs">
                                            <div
                                                onClick={() => window.open('https://www.linkedin.com/in/sulthan-abdi-dzikry/', '_blank')}
                                                className="flex items-center gap-3 px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-100 group hover:shadow-sm hover:border-blue-200 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
                                            >
                                                <div className="p-2 bg-blue-100/50 rounded-lg group-hover:bg-blue-200/50 transition-colors text-blue-600">
                                                    <Linkedin size={18} />
                                                </div>
                                                <span className="font-bold text-[13px] tracking-tight text-zinc-700 group-hover:text-blue-900 transition-colors uppercase">{slides[currentSlide].contact.linkedin}</span>
                                            </div>
                                            <div className="flex items-center gap-3 px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-100 group hover:shadow-sm hover:border-red-200 hover:bg-red-50 transition-all duration-300 cursor-pointer">
                                                <div className="p-2 bg-red-100/50 rounded-lg group-hover:bg-red-200/50 transition-colors text-red-600">
                                                    <Mail size={18} />
                                                </div>
                                                <span className="font-bold text-[13px] tracking-tight text-zinc-700 group-hover:text-red-900 transition-colors">{slides[currentSlide].contact.email}</span>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-10 no-print">
                    <button onClick={() => paginate(-1)} className={`p-2 rounded-full bg-white/10 backdrop-blur-md border border-zinc-200/20 text-zinc-400 hover:text-zinc-900 hover:bg-white pointer-events-auto transition-all shadow-xl ${currentSlide === 0 ? 'opacity-0 scale-50' : 'opacity-100'}`}><ChevronLeft size={16} /></button>
                    <button onClick={() => paginate(1)} className={`p-2 rounded-full bg-white/10 backdrop-blur-md border border-zinc-200/20 text-zinc-400 hover:text-zinc-900 hover:bg-white pointer-events-auto transition-all shadow-xl ${currentSlide === slides.length - 1 ? 'opacity-0 scale-50' : 'opacity-100'}`}><ChevronRight size={16} /></button>
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
