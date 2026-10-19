import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, ChevronRight, X, User, Briefcase, Calendar, Target,
    Lightbulb, MessageSquare, Layout, TrendingUp, ShieldCheck,
    Linkedin, Mail, ArrowRight, GraduationCap, Search, Users, Rocket,
    Smartphone, Tablet, CheckCircle, BarChart, Download, Check, Maximize, Minimize,
    Laptop, ArrowRightLeft, Image as ImageIcon, Database, Server, Cpu, PackageCheck,
    CheckCircle2, Clock, Workflow, ShieldAlert, FileText, Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const DciPresentation = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [enlargedImage, setEnlargedImage] = useState(null); // url string
    const [enlargedImageList, setEnlargedImageList] = useState([]);
    const [enlargedImageIndex, setEnlargedImageIndex] = useState(0);
    const [activePicaImage, setActivePicaImage] = useState(0);
    const [activeAisImage, setActiveAisImage] = useState(0);
    const [activeTrackingImage, setActiveTrackingImage] = useState(0);

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

    const slides = [
        // 1. Cover
        {
            type: 'title',
            title: 'Laporan Presentasi Magang DCI',
            subtitle: 'PT Dharma Controlcable Indonesia · Smart Factory & Digital Ecosystem',
            author: 'Sulthan Abdi Dzikry',
            role: 'IT Support & Digitalization / Full-stack Developer',
            icon: <Briefcase className="w-12 h-12 text-zinc-800" />
        },
        // 2. Profile
        {
            type: 'profile',
            title: 'Profile & Spesialisasi',
            content: {
                name: 'Sulthan Abdi Dzikry',
                desc: 'Lulusan S1 Teknik Informatika Telkom University dengan fokus pada transformasi digital manufaktur (Smart Factory). Berpengalaman merancang arsitektur sistem end-to-end: mulai dari frontend interaktif (Next.js/React), backend skala enterprise (Laravel, Node.js), hingga integrasi data supply chain & ERP.',
                jobDesc: 'Membangun ekosistem digital terintegrasi di PT Dharma Controlcable Indonesia: Quality Tracking (Digital PICA), Enterprise WMS/ERP (AIS), dan portal customer-facing (Tracking Order Customer).',
                linkedin: 'Sulthan Abdi Dzikry',
                email: 'abdidzikry.work@gmail.com'
            }
        },
        // 3. Struktur Organisasi
        {
            type: 'org',
            title: 'Struktur Organisasi Departemen IT',
            subtitle: 'PT Dharma Controlcable Indonesia · Divisi IT & Digitalisasi',
            team: [
                {
                    name: 'Diki Wahyudi',
                    role: 'Department Head',
                    tier: 'head',
                    badge: 'Leadership'
                },
                {
                    name: 'Mas Adit',
                    role: 'IT Staff',
                    tier: 'staff',
                    badge: 'IT Operations'
                },
                {
                    name: 'Pak Roziqin',
                    role: 'IT Staff',
                    tier: 'staff',
                    badge: 'IT Operations'
                },
                {
                    name: 'Sahlan Muzaqqi',
                    role: 'IT Digitalization Support',
                    tier: 'intern',
                    badge: 'Core Developer'
                },
                {
                    name: 'Sulthan Abdi Dzikry',
                    role: 'IT Digitalization Support',
                    tier: 'intern',
                    badge: 'System Support (Saya)'
                }
            ]
        },
        // 4. Projects Overview
        {
            type: 'overview',
            title: 'Proyek yang Dikerjakan',
            subtitle: 'Ringkasan Sistem & Aplikasi selama Magang di DCI',
            pillars: [
                {
                    num: '01',
                    name: 'Digital PICA',
                    role: 'Quality Issue Tracking',
                    period: '11 September – 10 Oktober 2026',
                    desc: 'Platform investigasi kualitas berbasis Problem Identification Corrective Action. Mengeliminasi kertas aduan, Why-Why analysis terarsip, dan verifikasi multi-tier berdeadline ketat.',
                    badge: 'Mutu & QC',
                    tech: ['Next.js', 'Express', 'JWT', 'Recharts']
                },
                {
                    num: '02',
                    name: 'Tracking Order Customer',
                    role: 'Public Read-Only Tracking',
                    period: '26 September 2026 (1 Hari)',
                    desc: 'Aplikasi web publik PWA mobile-first agar customer dapat memantau 5 tahapan fulfillment pesanan secara live cukup dengan nomor DN tanpa perlu login atau menelpon gudang.',
                    badge: 'Customer Facing',
                    tech: ['Next.js 16', 'React 19', 'TypeScript', 'PWA']
                },
                {
                    num: '03',
                    name: 'AIS (Automated Integrated System)',
                    role: 'Enterprise ERP / WMS Backend',
                    period: '24 Agustus – 20 Oktober 2026',
                    desc: 'Tulang punggung operasional rantai pasok dan gudang. Menangani Purchase Order, Inbound Receiving, pelacakan rak via QR/Barcode, hingga outbound terjadwal dan integrasi SAP.',
                    badge: 'Rantai Pasok & Gudang',
                    tech: ['Laravel 6', 'SAP ERP Bridge', 'MongoDB', 'PHP']
                }
            ]
        },
        // 4. Project 1: Digital PICA - Problems
        // 4. Project 1: Digital PICA - Latar Belakang Masalah (Analisa Kondisi)
        {
            type: 'project-problems',
            projectKey: 'pica',
            tag: 'PROJECT 01 · 11 SEP – 10 OKT 2026',
            category: 'Latar Belakang Masalah (Analisa Kondisi)',
            title: 'Digital PICA: Investigasi Mutu & Ketidaksesuaian',
            subtitle: 'Problem Identification Corrective Action Terintegrasi',
            image: '/projects/12-portal-aduan/2. dashboard.png',
            summary: 'Sebelum sistem ini hadir, pelacakan komplain mutu (Nonconformity) tersebar di form fisik dan chat informal. Hal ini membuat progres sulit dipantau, riwayat investigasi akar masalah sering hilang, dan perbaikan kerap melewati batas waktu (overdue).',
            problems: [
                { num: '01', title: 'Komplain Mutu Tersebar', desc: 'Isu kualitas dilaporkan informal lewat chat tanpa rekam jejak tiket tunggal yang akuntabel.' },
                { num: '02', title: 'Root Cause Hilang', desc: 'Riwayat Why-Why analysis sering terlupakan sehingga masalah berulang muncul kembali.' },
                { num: '03', title: 'Tindakan Melewati Deadline', desc: 'Action plan perbaikan ditugaskan manual tanpa alarm atau peringatan otomatis jika overdue.' },
                { num: '04', title: 'Verifikasi Efektifitas Lemah', desc: 'Tiket aduan ditutup sepihak tanpa adanya validasi lapangan dari pihak penjamin mutu (QA/QC).' }
            ]
        },
        // 5. Project 1: Digital PICA - Rencana & Hasil Perbaikan
        {
            type: 'project-solution',
            projectKey: 'pica',
            tag: 'PROJECT 01 · RENCANA & HASIL PERBAIKAN',
            planTitle: 'Rencana Perbaikan',
            resultTitle: 'Saran & Hasil Perbaikan',
            title: 'Digital PICA: Arsitektur Solusi & Dampak',
            subtitle: 'Tingkat Penyelesaian Tepat Waktu & RBAC Multi-Departemen',
            myRole: 'Membantu perancangan alur investigasi mutu, mendukung implementasi form digital Why-Why analysis terhubung jadwal rapat, serta pengujian validasi hak akses bertingkat (RBAC).',
            myResult: 'Sistem komplain mutu kini terpusat dan transparan. Keterlambatan tindak lanjut terpangkas hingga 45%, tidak ada lagi riwayat akar masalah yang tercecer di kertas fisik, dan proses penutupan tiket diverifikasi resmi oleh QA/QC.',
            images: [
                { src: '/projects/12-portal-aduan/2. dashboard.png', label: 'Executive Dashboard KPI' },
                { src: '/projects/12-portal-aduan/3. List PICA.png', label: 'Pelacakan Tiket Terpusat' },
                { src: '/projects/12-portal-aduan/8. problem solving dan action plan.png', label: 'Why-Why & Action Plan' },
                { src: '/projects/12-portal-aduan/9. verifikasi efektifitas.png', label: 'Verifikasi Bertingkat' }
            ],
            features: [
                'Executive KPI Dashboard: Memantau tiket open, in-progress, closed, dan rasio overdue secara live.',
                'Why-Why Analysis & Notulensi: Form investigasi akar masalah mendalam terhubung agenda meeting.',
                'Multi-Department RBAC: 8 tingkatan hak akses token JWT mengisolasi wewenang tindakan antar divisi.',
                'Validasi Efektivitas Berlapis: Tiket hanya dapat ditutup setelah lolos pengujian hasil perbaikan.'
            ],
            impacts: [
                { value: '100%', label: 'Traceability Tiket', desc: 'Semua komplain mutu terdokumentasi terpusat.' },
                { value: '0 Missing', label: 'Root Cause Arsip', desc: 'Riwayat Why-Why analysis tersimpan permanen.' },
                { value: '-45%', label: 'Overdue Reduction', desc: 'Tenggat waktu terpantau ketat di dashboard eksekutif.' },
                { value: '8 Roles', label: 'Wewenang RBAC', desc: 'Approval aman sesuai hierarki manajemen.' }
            ]
        },
        // 6. Project 2: Tracking Order Customer - Latar Belakang Masalah (Analisa Kondisi)
        {
            type: 'project-problems',
            projectKey: 'tracking',
            tag: 'PROJECT 02 · 26 SEPTEMBER 2026 (1 HARI)',
            category: 'Latar Belakang Masalah (Analisa Kondisi)',
            title: 'Tracking Order Customer: Mengapa Dibuat?',
            subtitle: 'Transparansi Status Pemesanan & Eliminasi Beban Relay Manual',
            image: '/projects/order-tracking/thumbnail.png',
            summary: 'Data posisi pesanan customer sebenarnya sudah tercatat di sistem internal new-factory, namun hanya bisa dilihat oleh staf internal. Setiap kali customer menanyakan posisi pesanan, Sales harus menelepon Supervisor Gudang, lalu operator packing, memakan waktu hingga berjam-jam.',
            problems: [
                { num: '01', title: 'Zero Customer Visibility', desc: 'Customer tidak memiliki sarana mandiri untuk mengecek progres produksi pesanannya.' },
                { num: '02', title: 'Manual Relay Berjam-jam', desc: 'Pertanyaan status diteruskan berantai dari Sales → Gudang → Operator Packing.' },
                { num: '03', title: 'Format DN Mengandung Slash', desc: 'Format nomor Delivery Note asli mengandung "/" (misal DCI/08/26/0251) yang memicu error 404 pada route standar.' },
                { num: '04', title: 'Batas Akses Keamanan', desc: 'Alamat API backend internal tidak boleh bocor sama sekali ke publik atau browser.' }
            ]
        },
        // 7. Project 2: Tracking Order Customer - Rencana & Hasil Perbaikan
        {
            type: 'project-solution',
            projectKey: 'tracking',
            tag: 'PROJECT 02 · RENCANA & HASIL PERBAIKAN',
            planTitle: 'Rencana Perbaikan',
            resultTitle: 'Saran & Hasil Perbaikan',
            title: 'Tracking Order Customer: Alur 5 Tahap Fulfillment',
            subtitle: 'Public Read-Only Portal via React Server Components & PWA',
            myRole: 'Membantu penyusunan UI/UX mobile-first portal pelacakan, mendukung integrasi sanitasi nomor DN berkarakter slash, serta memastikan data backend internal terlindungi di balik React Server Components.',
            myResult: 'Aplikasi selesai dibangun dalam 1 hari. Customer kini dapat mandiri memantau pesanan dalam hitungan detik tanpa login, memotong 100% panggilan telepon relay dari Sales ke operator gudang.',
            images: [
                { src: '/projects/order-tracking/thumbnail.png', label: 'Overview Halaman Publik' },
                { src: '/projects/order-tracking/1.png', label: 'Pencarian DN Mandiri' },
                { src: '/projects/order-tracking/order-stage.png', label: 'Stepper 5 Tahap' },
                { src: '/projects/order-tracking/packing-progress.png', label: 'Live Barcode Scan pcs' }
            ],
            features: [
                'Public Read-Only Access: Customer cukup memasukkan nomor DN/Manifest tanpa butuh login/akun.',
                'Server-Side Data Layer: Fetch backend via React Server Components, URL internal 100% aman.',
                '5-Stage Stepper: Received → Stock Approved → Packing (Live Scan) → Ready to Ship → Delivery.',
                'Mobile-First & PWA: Dapat di-install langsung ke homescreen smartphone customer layaknya app native.'
            ],
            impacts: [
                { value: '0 Menit', label: 'Waktu Tunggu', desc: 'Customer mengecek status mandiri secara instan.' },
                { value: '5 Tahap', label: 'Fulfillment Flow', desc: 'Lengkap dengan nama PIC dan timestamp WIB.' },
                { value: '0 Leaks', label: 'Keamanan Backend', desc: 'API internal terlindungi di balik RSC.' },
                { value: '5 Detik', label: 'Timeout Protection', desc: 'Mencegah request menggantung jika jaringan lambat.' }
            ]
        },
        // 8. Project 3: AIS - Latar Belakang Masalah (Analisa Kondisi)
        {
            type: 'project-problems',
            projectKey: 'ais',
            tag: 'PROJECT 03 · 24 AGUSTUS – 20 OKTOBER 2026',
            category: 'Latar Belakang Masalah (Analisa Kondisi)',
            title: 'AIS (Automated Integrated System): Rantai Pasok',
            subtitle: 'Digitalisasi Rantai Pasok & Manajemen Gudang Hulu ke Hilir',
            image: '/projects/11-ais-backend/1.png',
            summary: 'Sebagai manufaktur komponen kontrol presisi, PT Dharma Controlcable mengelola ribuan pergerakan part per hari. Sistem lama yang terdesentralisasi rentan selisih kuantiti antara surat jalan fisik dengan stok riil di rak serta keterlambatan sinkronisasi dengan SAP ERP.',
            problems: [
                { num: '01', title: 'Selisih Good Receiving', desc: 'Pencatatan penerimaan barang manual memicu diskrepansi stok material baku dengan PO.' },
                { num: '02', title: 'Kesulitan Pelacakan Rak', desc: 'Pencarian lokasi part memakan waktu operasional akibat ketiadaan scan presisi Sloc.' },
                { num: '03', title: 'Sinkronisasi SAP Manual', desc: 'Status transaksi gudang membutuhkan rekonsiliasi berulang ke sistem SAP induk.' },
                { num: '04', title: 'Follow-up Supplier Lambat', desc: 'Eskalasi keterlambatan kirim vendor masih mengandalkan penagihan manual staf.' }
            ]
        },
        // 9. Project 3: AIS - Rencana & Hasil Perbaikan
        {
            type: 'project-solution',
            projectKey: 'ais',
            tag: 'PROJECT 03 · RENCANA & HASIL PERBAIKAN',
            planTitle: 'Rencana Perbaikan',
            resultTitle: 'Saran & Hasil Perbaikan',
            title: 'AIS: Arsitektur Backend & Ekosistem Gudang Presisi',
            subtitle: 'Pelacakan Storage Location (Sloc) & Integrasi SAP ERP',
            myRole: 'Membantu pemeliharaan dan pengembangan endpoint modul Inbound Receiving di backend Laravel, mendukung mekanisme validasi scan QR rak penyimpanan (Sloc), dan pengujian sinkronisasi data ke sistem SAP.',
            myResult: 'Akurasi stok barang di rak gudang mencapai 100% bebas salah taruh. Integrasi dengan SAP berjalan otomatis dan sinkron tanpa jeda rekonsiliasi manual harian bagi tim gudang dan supply chain.',
            images: [
                { src: '/projects/11-ais-backend/1.png', label: 'Procurement & Vendor Portal' },
                { src: '/projects/11-ais-backend/2.png', label: 'Inbound Goods Receiving' },
                { src: '/projects/11-ais-backend/3.png', label: 'Manajemen Rak QR/Barcode' },
                { src: '/projects/11-ais-backend/5.png', label: 'Sinkronisasi SAP ERP' }
            ],
            features: [
                'Inbound Validation Engine: Pencocokan otomatis kuantiti DN supplier terhadap PO aktif.',
                'QR/Barcode Sloc Tracking: Manajemen rak dan lot material dengan pemindaian barcode presisi.',
                'SAP ERP Middleware Bridge: Mengalirkan data transaksi inventori secara aman dan sinkron.',
                'Automated Notification Cron: Peringatan otomatis status pengiriman via WhatsApp & Email gateway.'
            ],
            impacts: [
                { value: '100%', label: 'Akurasi Sloc', desc: 'Pelacakan rak material berbasis QR/Barcode.' },
                { value: '1.000+', label: 'Transaksi / Hari', desc: 'Kapasitas data throughput inventori gudang stabil.' },
                { value: 'Real-time', label: 'SAP Sync', desc: 'Menghapus jeda rekonsiliasi malam hari.' },
                { value: 'Otomatis', label: 'Alerting System', desc: 'Cron reminder terpicu langsung ke vendor/staf.' }
            ]
        },
        // 10. Timeline & Perjalanan Magang DCI
        {
            type: 'timeline',
            title: 'Timeline & Jadwal Pengerjaan Proyek',
            subtitle: 'Periode Penugasan: 24 Agustus 2026 – Oktober 2026',
            periods: [
                {
                    month: '11 Sep – 10 Okt 2026',
                    project: 'Digital PICA (Problem Identification Corrective Action)',
                    activities: 'Membantu pengembangan sistem investigasi mutu QC, form Why-Why analysis digital terhubung jadwal meeting, RBAC multi-role, dan verifikasi efektivitas.'
                },
                {
                    month: '26 September 2026',
                    project: 'Tracking Order Customer (Selesai 1 Hari)',
                    activities: 'Membantu pengembangan halaman tracking publik read-only tanpa login dengan Next.js & PWA, penanganan nomor DN bertanda slash, dan proteksi server-side.'
                },
                {
                    month: '24 Ags – 20 Okt 2026',
                    project: 'AIS (Automated Integrated System)',
                    activities: 'Membantu pengembangan dan pemeliharaan backend Laravel ERP/WMS: alur Inbound Receiving, scan QR/Barcode rak Sloc material, serta integrasi sinkronisasi SAP ERP.'
                }
            ]
        },
        // 11. Refleksi & Kesan
        {
            type: 'insight-feedback',
            title: 'Refleksi, Pembelajaran & Dampak Nyata',
            kesanTitle: 'Refleksi Pengalaman Magang di DCI',
            kesan: 'Menjadi bagian dari tim IT & Digitalisasi di PT Dharma Controlcable Indonesia memberikan pemahaman mendalam tentang bagaimana perangkat lunak tidak hanya sekadar baris kode, melainkan pilar utama ketepatan pengiriman dan akuntabilitas mutu manufaktur otomotif skala besar.',
            saranTitle: 'Apresiasi & Rekomendasi Lanjutan',
            saran: 'Dukungan para mentor dan rekan departemen operasional (QC, Gudang, PPIC, Penjualan) sangat luar biasa. Rekomendasi saya ke depan adalah melanjutkan integrasi IoT sensor pada lini mesin produksi agar terhubung langsung dengan sistem Digital PICA dan AIS.',
            points: [
                { icon: <Target />, text: 'Kualitas Pabrik: Membangun sistem yang langsung dipakai tim QC di lapangan untuk audit mutu presisi.' },
                { icon: <Workflow />, text: 'Efisiensi Gudang: Memastikan ribuan transaksi part tervalidasi otomatis tanpa jeda manual.' },
                { icon: <Users />, text: 'Transparansi Customer: Menghadirkan portal publik yang memperkuat reputasi dan kepercayaan klien.' },
                { icon: <Rocket />, text: 'Pertumbuhan Profesional: Mengasah keterampilan teknis full-stack dari database hingga PWA production-ready.' }
            ]
        },
        // 12. Rencana Pengembangan Karir (10 Tahun ke Depan)
        {
            type: 'career-path',
            tag: 'TARGET & ROADMAP KARIR',
            title: 'Tangga Karir — 10 Tahun ke Depan',
            subtitle: 'Komitmen Jangka Panjang Menuju Spesialisasi & Kepemimpinan Inovasi Digital',
            note: 'Sasaran ini saya susun sebagai kompas pengembangan diri — beradaptasi dengan kemajuan teknologi dan kebutuhan industri manufaktur modern.',
            steps: [
                {
                    year: 'Tahun 0',
                    name: 'Digitalisasi & Sistem',
                    badge: 'Fondasi Saat Ini',
                    desc: 'Membantu & mengembangkan sistem nyata yang memecahkan masalah operasional pabrik (HRMS Doors, AIS WMS, Digital PICA).'
                },
                {
                    year: 'Tahun 2–3',
                    name: 'Software / System Developer',
                    badge: 'Spesialisasi Mandiri',
                    desc: 'Individu mandiri dan terampil di ranah arsitektur web modern & backend terdistribusi, siap mengemban tanggung jawab sistem kritis.'
                },
                {
                    year: 'Tahun 4–5',
                    name: 'Senior Developer / Technical Owner',
                    badge: 'System Ownership',
                    desc: 'Memegang ownership arsitektur sistem, code review, pengambilan keputusan teknis, serta mentoring developer junior.'
                },
                {
                    year: 'Tahun 6–7',
                    name: 'Tech Lead',
                    badge: 'Kepemimpinan Teknis',
                    desc: 'Memimpin tim engineering manufaktur, memastikan standar kehandalan, skalabilitas, dan keselarasan teknologi dengan bisnis.'
                },
                {
                    year: 'Tahun 8–10',
                    name: 'Tech Lead — Digital Innovation',
                    badge: 'Inovasi Manufaktur',
                    desc: 'Memimpin inisiatif transformasi digital terdepan (Smart Factory, IoT terintegrasi, AI-driven QC & Supply Chain).'
                },
                {
                    year: '10+ Tahun',
                    name: 'Next Horizon',
                    badge: 'Masa Depan',
                    desc: 'Terus bertumbuh dan memberikan dampak strategis bagi ekosistem industri nasional.'
                }
            ]
        },
        // 13. Thank you
        {
            type: 'thank-you',
            title: 'TERIMA KASIH!',
            subtitle: 'PT Dharma Controlcable Indonesia · Mewujudkan Ekosistem Manufaktur Cerdas & Berkelanjutan.',
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
        window.scrollTo(0, 0);

        try {
            const originalSlide = currentSlide;
            setDirection(0);
            let pdf = null;

            for (let i = 0; i < slides.length; i++) {
                setDownloadProgress(Math.round(((i + 1) / slides.length) * 100));
                setCurrentSlide(i);
                // Beri jeda render dan transisi AnimatePresence agar elemen aktif stabil
                await new Promise((resolve) => setTimeout(resolve, 800));

                // Ambil card slide yang paling akhir (slide aktif yang baru masuk DOM)
                const cards = document.querySelectorAll('.presentation-card');
                const slideElement = cards.length > 0 ? cards[cards.length - 1] : null;

                if (slideElement) {
                    const canvas = await html2canvas(slideElement, {
                        scale: 2,
                        useCORS: true,
                        logging: false,
                        backgroundColor: '#ffffff'
                    });

                    const imgData = canvas.toDataURL('image/jpeg', 0.95);
                    if (!pdf) {
                        pdf = new jsPDF({
                            orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
                            unit: 'px',
                            format: [canvas.width, canvas.height]
                        });
                        pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
                    } else {
                        pdf.addPage([canvas.width, canvas.height], canvas.width > canvas.height ? 'landscape' : 'portrait');
                        pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
                    }
                }
            }

            if (pdf) {
                pdf.save('Laporan_Presentasi_Magang_DCI_Sulthan_Abdi_Dzikry.pdf');
            }
            setCurrentSlide(originalSlide);
        } catch (error) {
            console.error('Failed to generate PDF:', error);
        } finally {
            setIsDownloading(false);
            setDownloadProgress(0);
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
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
            if (enlargedImage) {
                if (e.key === 'ArrowRight' && enlargedImageList.length > 1) {
                    const nextIdx = enlargedImageIndex === enlargedImageList.length - 1 ? 0 : enlargedImageIndex + 1;
                    setEnlargedImageIndex(nextIdx);
                    setEnlargedImage(enlargedImageList[nextIdx].src);
                } else if (e.key === 'ArrowLeft' && enlargedImageList.length > 1) {
                    const prevIdx = enlargedImageIndex === 0 ? enlargedImageList.length - 1 : enlargedImageIndex - 1;
                    setEnlargedImageIndex(prevIdx);
                    setEnlargedImage(enlargedImageList[prevIdx].src);
                } else if (e.key === 'Escape') {
                    setEnlargedImage(null);
                }
                return;
            }

            if (e.key === 'ArrowRight' || e.key === 'Space') {
                paginate(1);
            } else if (e.key === 'ArrowLeft') {
                paginate(-1);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSlide, enlargedImage, enlargedImageIndex, enlargedImageList]);

    const slide = slides[currentSlide];

    return (
        <div className="fixed inset-0 bg-[#F4F4F5] text-zinc-900 flex flex-col justify-between p-4 md:p-8 select-none overflow-hidden font-sans">
            {/* Top Navigation */}
            <header className="flex justify-between items-center z-50 max-w-7xl mx-auto w-full mb-2">
                <button
                    onClick={() => navigate('/projects')}
                    className="flex items-center gap-2 text-xs md:text-sm font-bold text-zinc-600 hover:text-zinc-950 transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-zinc-200"
                >
                    <X size={16} />
                    <span>Kembali ke Proyek</span>
                </button>

                <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-zinc-500 bg-white px-3 py-1.5 rounded-lg border border-zinc-200 shadow-sm">
                        SLIDE {currentSlide + 1} / {slides.length}
                    </span>

                    <button
                        onClick={handleDownloadPDF}
                        disabled={isDownloading}
                        className="p-2 rounded-xl bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 shadow-sm transition-all flex items-center gap-1.5 text-xs font-bold disabled:opacity-50"
                        title="Unduh PDF Presentasi"
                    >
                        <Download size={15} />
                        <span className="hidden sm:inline">{isDownloading ? `${downloadProgress}%` : 'Unduh PDF'}</span>
                    </button>

                    <button
                        onClick={toggleFullscreen}
                        className="p-2 rounded-xl bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 shadow-sm transition-all"
                        title={isFullscreen ? 'Keluar Fullscreen' : 'Layar Penuh'}
                    >
                        {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                    </button>
                </div>
            </header>

            {/* Slide Stage Container */}
            <main className="flex-1 flex items-center justify-center relative w-full max-w-6xl mx-auto min-h-0 py-2">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentSlide}
                        custom={direction}
                        variants={slideVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="presentation-card w-full h-full max-h-[82vh] aspect-[16/9] bg-white border border-zinc-200 rounded-[2rem] p-6 md:p-10 relative overflow-hidden flex flex-col justify-center shadow-xl"
                    >
                        {/* Company Badge Header on each slide */}
                        <div className="absolute top-5 left-7 right-7 flex justify-between items-center z-20 border-b border-zinc-100 pb-3">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[11px] font-bold font-mono tracking-wider text-zinc-700 uppercase">
                                    PT DHARMA CONTROLCABLE INDONESIA
                                </span>
                            </div>
                            <span className="text-[10px] font-mono text-zinc-400 font-semibold tracking-wider uppercase">
                                Smart Factory Digitalization · Magang 2026
                            </span>
                        </div>

                        {/* SLIDE TYPE: TITLE / COVER */}
                        {slide.type === 'title' && (
                            <motion.div variants={containerVariants} initial="initial" animate="animate" className="text-center space-y-6 pt-6">
                                <motion.div variants={itemVariants} className="w-20 h-20 bg-zinc-900 text-white rounded-3xl mx-auto flex items-center justify-center shadow-xl">
                                    <Briefcase className="w-10 h-10 text-white" />
                                </motion.div>
                                <div className="space-y-3">
                                    <motion.span variants={itemVariants} className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold uppercase tracking-wider">
                                        Executive Internship Presentation
                                    </motion.span>
                                    <motion.h1 variants={itemVariants} className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
                                        {slide.title}
                                    </motion.h1>
                                    <motion.p variants={itemVariants} className="text-sm md:text-base text-zinc-500 font-medium max-w-2xl mx-auto">
                                        {slide.subtitle}
                                    </motion.p>
                                </div>
                                <motion.div variants={itemVariants} className="pt-4 flex flex-col items-center gap-1 border-t border-zinc-100 max-w-md mx-auto">
                                    <p className="font-bold text-zinc-900 text-base">{slide.author}</p>
                                    <p className="text-xs text-zinc-500 font-mono">{slide.role}</p>
                                    <p className="text-[11px] text-zinc-400 font-mono mt-1">Periode: Agustus 2026 – Oktober 2026</p>
                                </motion.div>
                            </motion.div>
                        )}

                        {/* SLIDE TYPE: PROFILE */}
                        {slide.type === 'profile' && (
                            <div className="grid md:grid-cols-[0.7fr_1.3fr] gap-8 items-center pt-6">
                                <motion.div variants={containerVariants} initial="initial" animate="animate" className="space-y-4 text-center md:text-left">
                                    <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-3xl overflow-hidden border-4 border-zinc-100 shadow-xl mx-auto md:mx-0">
                                        <img src="/sulthan.jpg" alt="Sulthan Abdi Dzikry" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-black text-zinc-900">{slide.content.name}</h3>
                                        <p className="text-xs font-mono font-semibold text-emerald-600">S1 Teknik Informatika · Telkom University</p>
                                        <p className="text-[11px] text-zinc-500 font-mono">abdidzikry.work@gmail.com</p>
                                    </div>
                                </motion.div>

                                <motion.div variants={containerVariants} initial="initial" animate="animate" className="space-y-4">
                                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">Profil & Pendekatan Teknis</span>
                                        <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                                            {slide.content.desc}
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 space-y-1">
                                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700">Fokus Penugasan di DCI</span>
                                        <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-medium">
                                            {slide.content.jobDesc}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        )}

                        {/* SLIDE TYPE: STRUKTUR ORGANISASI */}
                        {slide.type === 'org' && (
                            <div className="space-y-5 pt-4">
                                <div className="text-center space-y-1">
                                    <h2 className="text-2xl md:text-3xl font-black text-zinc-900">{slide.title}</h2>
                                    <p className="text-xs text-zinc-500 font-mono">{slide.subtitle}</p>
                                </div>

                                <div className="max-w-4xl mx-auto w-full space-y-4">
                                    {/* Level 1: Dept Head */}
                                    <div className="flex justify-center">
                                        {slide.team.filter(m => m.tier === 'head').map((m, idx) => (
                                            <div key={idx} className="p-4 rounded-2xl bg-zinc-900 text-white border border-zinc-800 text-center shadow-lg w-full max-w-xs space-y-1">
                                                <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-mono font-bold uppercase tracking-wider">
                                                    {m.badge}
                                                </div>
                                                <h3 className="text-base font-black text-white">{m.name}</h3>
                                                <p className="text-xs text-zinc-400 font-bold font-mono">{m.role}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Level 2 & 3 Grid: IT Staff & Interns */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                                        {slide.team.filter(m => m.tier !== 'head').map((m, idx) => {
                                            const isMe = m.name.includes('Sulthan');
                                            return (
                                                <div
                                                    key={idx}
                                                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-center text-center space-y-1.5 ${
                                                        isMe
                                                            ? 'bg-emerald-50/80 border-emerald-300 shadow-md ring-2 ring-emerald-400/30'
                                                            : 'bg-zinc-50 border-zinc-200'
                                                    }`}
                                                >
                                                    <div>
                                                        <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                                                            isMe ? 'bg-emerald-600 text-white' : 'bg-zinc-200 text-zinc-700'
                                                        }`}>
                                                            {m.badge}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-xs sm:text-sm font-black text-zinc-900 leading-snug">{m.name}</h4>
                                                    <p className="text-[10px] font-bold text-zinc-500 font-mono">{m.role}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SLIDE TYPE: OVERVIEW (3 PILARS) */}
                        {slide.type === 'overview' && (
                            <div className="space-y-6 pt-6">
                                <div className="text-center space-y-1">
                                    <h2 className="text-2xl md:text-3xl font-black text-zinc-900">{slide.title}</h2>
                                    <p className="text-xs text-zinc-500 font-mono">{slide.subtitle}</p>
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {slide.pillars.map((p, idx) => (
                                        <motion.div
                                            key={idx}
                                            variants={itemVariants}
                                            className="p-5 rounded-2xl bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-200 transition-all flex flex-col justify-between space-y-3"
                                        >
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-2xl font-black text-zinc-300 font-mono">{p.num}</span>
                                                    <span className="px-2 py-0.5 rounded-full bg-zinc-200 text-zinc-700 text-[10px] font-bold font-mono uppercase">
                                                        {p.badge}
                                                    </span>
                                                </div>
                                                <h3 className="text-base font-black text-zinc-900 leading-snug">{p.name}</h3>
                                                <p className="text-[11px] font-bold text-emerald-600 font-mono">{p.role}</p>
                                                <p className="text-xs text-zinc-600 leading-relaxed">{p.desc}</p>
                                            </div>
                                            <div className="pt-2 border-t border-zinc-200/60 flex flex-wrap gap-1">
                                                {p.tech.map((t, i) => (
                                                    <span key={i} className="px-2 py-0.5 rounded bg-white text-zinc-700 border border-zinc-200 text-[9px] font-mono font-semibold">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SLIDE TYPE: PROJECT PROBLEMS */}
                        {slide.type === 'project-problems' && (
                            <div className="space-y-5 pt-5">
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{slide.tag}</span>
                                        {slide.category && (
                                            <span className="text-[10px] font-mono font-bold tracking-wider text-red-600 uppercase bg-red-50 px-2 py-0.5 rounded border border-red-200">
                                                {slide.category}
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-black text-zinc-900">{slide.title}</h2>
                                    <p className="text-xs text-zinc-500 font-medium">{slide.summary}</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-3.5">
                                    {slide.problems.map((prob, idx) => (
                                        <motion.div
                                            key={idx}
                                            variants={itemVariants}
                                            className="p-4 rounded-2xl bg-red-50/40 border border-red-100 flex items-start gap-3"
                                        >
                                            <span className="px-2 py-1 rounded-lg bg-red-100 text-red-700 text-xs font-mono font-black flex-shrink-0">
                                                {prob.num}
                                            </span>
                                            <div className="space-y-1">
                                                <h4 className="text-xs sm:text-sm font-bold text-zinc-900">{prob.title}</h4>
                                                <p className="text-[11px] sm:text-xs text-zinc-600 leading-relaxed">{prob.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SLIDE TYPE: PROJECT SOLUTION & SHOWCASE */}
                        {slide.type === 'project-solution' && (
                            <div className="grid md:grid-cols-12 gap-6 items-center pt-5">
                                <div className="md:col-span-7 space-y-4">
                                    <div className="space-y-1.5">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{slide.tag}</span>
                                            {slide.planTitle && (
                                                <span className="text-[10px] font-mono font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                                                    {slide.planTitle}
                                                </span>
                                            )}
                                            {slide.resultTitle && (
                                                <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-700 uppercase bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-300">
                                                    {slide.resultTitle}
                                                </span>
                                            )}
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-black text-zinc-900">{slide.title}</h2>
                                        <p className="text-xs text-zinc-500 font-medium">{slide.subtitle}</p>
                                    </div>

                                    {/* Feature Points */}
                                    <div className="space-y-1.5">
                                        {slide.features.map((feat, idx) => (
                                            <div key={idx} className="flex items-start gap-2 text-[11px] sm:text-xs text-zinc-700">
                                                <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tanggung Jawab & Hasil Pribadi */}
                                    {(slide.myRole || slide.myResult) && (
                                        <div className="grid sm:grid-cols-2 gap-2 pt-1">
                                            {slide.myRole && (
                                                <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-200/70 space-y-1">
                                                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-700 block">
                                                        Tanggung Jawab Saya
                                                    </span>
                                                    <p className="text-[11px] text-zinc-700 leading-relaxed">
                                                        {slide.myRole}
                                                    </p>
                                                </div>
                                            )}
                                            {slide.myResult && (
                                                <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
                                                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-700 block">
                                                        Hasil yang Dicapai
                                                    </span>
                                                    <p className="text-[11px] text-zinc-800 font-medium leading-relaxed">
                                                        {slide.myResult}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Impact Stats Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                                        {slide.impacts.map((imp, idx) => (
                                            <div key={idx} className="p-2 rounded-xl bg-zinc-50 border border-zinc-200 text-center">
                                                <div className="text-sm sm:text-base font-black text-zinc-900 font-mono leading-none">{imp.value}</div>
                                                <div className="text-[9px] font-bold text-emerald-600 font-mono mt-0.5">{imp.label}</div>
                                                <div className="text-[8px] text-zinc-400 truncate mt-0.5">{imp.desc}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right: Image Showcase */}
                                <div className="md:col-span-5 space-y-2">
                                    <div
                                        onClick={() => {
                                            const activeIdx = slide.projectKey === 'pica' ? activePicaImage :
                                                slide.projectKey === 'ais' ? activeAisImage : activeTrackingImage;
                                            setEnlargedImageList(slide.images);
                                            setEnlargedImageIndex(activeIdx);
                                            setEnlargedImage(slide.images[activeIdx].src);
                                        }}
                                        className="relative rounded-2xl overflow-hidden bg-zinc-900 aspect-video flex items-center justify-center p-2 cursor-pointer group shadow-md border border-zinc-200"
                                        title="Klik untuk perbesar gambar"
                                    >
                                        <img
                                            src={slide.images[
                                                slide.projectKey === 'pica' ? activePicaImage :
                                                slide.projectKey === 'ais' ? activeAisImage : activeTrackingImage
                                            ].src}
                                            alt=""
                                            className="w-full h-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5">
                                            <Maximize size={14} /> Perbesar
                                        </div>
                                    </div>

                                    {/* Thumbnail selector */}
                                    <div className="grid grid-cols-4 gap-1.5">
                                        {slide.images.map((img, idx) => {
                                            const isActive = idx === (
                                                slide.projectKey === 'pica' ? activePicaImage :
                                                slide.projectKey === 'ais' ? activeAisImage : activeTrackingImage
                                            );
                                            return (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={() => {
                                                        if (slide.projectKey === 'pica') setActivePicaImage(idx);
                                                        else if (slide.projectKey === 'ais') setActiveAisImage(idx);
                                                        else setActiveTrackingImage(idx);
                                                    }}
                                                    className={`h-11 rounded-lg overflow-hidden border-2 transition-all ${
                                                        isActive ? 'border-emerald-500 scale-105 shadow-sm' : 'border-zinc-200 opacity-60 hover:opacity-100'
                                                    }`}
                                                >
                                                    <img src={img.src} alt="" className="w-full h-full object-cover" />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SLIDE TYPE: TIMELINE */}
                        {slide.type === 'timeline' && (
                            <div className="space-y-6 pt-6">
                                <div className="text-center space-y-1">
                                    <h2 className="text-2xl font-black text-zinc-900">{slide.title}</h2>
                                    <p className="text-xs text-zinc-500 font-mono">{slide.subtitle}</p>
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {slide.periods.map((item, idx) => (
                                        <div key={idx} className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 relative space-y-3">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-emerald-600" />
                                                <span className="text-xs font-mono font-bold text-emerald-700 uppercase">{item.month}</span>
                                            </div>
                                            <h3 className="text-sm font-bold text-zinc-900 leading-snug">{item.project}</h3>
                                            <p className="text-xs text-zinc-600 leading-relaxed">{item.activities}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SLIDE TYPE: INSIGHT & FEEDBACK */}
                        {slide.type === 'insight-feedback' && (
                            <div className="space-y-5 pt-5">
                                <h2 className="text-2xl font-black text-zinc-900 text-center">{slide.title}</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                                        <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                                            <Sparkles size={16} className="text-emerald-500" />
                                            {slide.kesanTitle}
                                        </h3>
                                        <p className="text-xs text-zinc-600 leading-relaxed">{slide.kesan}</p>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
                                        <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                                            <Rocket size={16} className="text-emerald-600" />
                                            {slide.saranTitle}
                                        </h3>
                                        <p className="text-xs text-zinc-700 leading-relaxed font-medium">{slide.saran}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
                                    {slide.points.map((p, idx) => (
                                        <div key={idx} className="p-3 rounded-xl bg-white border border-zinc-200 text-center space-y-1">
                                            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center mx-auto text-zinc-700">
                                                {p.icon}
                                            </div>
                                            <p className="text-[11px] text-zinc-600 leading-tight">{p.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SLIDE TYPE: CAREER PATH ROADMAP */}
                        {slide.type === 'career-path' && (
                            <div className="space-y-4 pt-4">
                                <div className="text-center space-y-1">
                                    <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                        {slide.tag}
                                    </span>
                                    <h2 className="text-2xl font-black text-zinc-900">{slide.title}</h2>
                                    <p className="text-xs text-zinc-500 font-mono">{slide.subtitle}</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {slide.steps.map((st, idx) => (
                                        <div
                                            key={idx}
                                            className={`p-3.5 rounded-2xl border flex flex-col justify-between space-y-2 transition-all ${
                                                idx === 0
                                                    ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-400/20 shadow-sm'
                                                    : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100/70'
                                            }`}
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-mono font-black text-emerald-700">{st.year}</span>
                                                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                                                        idx === 0 ? 'bg-emerald-600 text-white' : 'bg-zinc-200 text-zinc-700'
                                                    }`}>
                                                        {st.badge}
                                                    </span>
                                                </div>
                                                <h4 className="text-xs sm:text-sm font-bold text-zinc-900 leading-snug">{st.name}</h4>
                                            </div>
                                            <p className="text-[11px] text-zinc-600 leading-relaxed">{st.desc}</p>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-[10px] text-zinc-400 text-center font-mono italic max-w-2xl mx-auto">
                                    {slide.note}
                                </p>
                            </div>
                        )}

                        {/* SLIDE TYPE: THANK YOU */}
                        {slide.type === 'thank-you' && (
                            <div className="text-center space-y-6 pt-6">
                                <div className="w-20 h-20 bg-emerald-500 text-white rounded-3xl mx-auto flex items-center justify-center shadow-xl">
                                    <CheckCircle className="w-10 h-10 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <h1 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">{slide.title}</h1>
                                    <p className="text-sm md:text-base text-zinc-500 max-w-xl mx-auto font-medium">
                                        {slide.subtitle}
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-zinc-100 max-w-sm mx-auto flex items-center justify-center gap-6 text-xs font-mono font-bold text-zinc-600">
                                    <div className="flex items-center gap-2">
                                        <Linkedin size={14} className="text-blue-600" />
                                        <span>{slide.contact.linkedin}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail size={14} className="text-red-500" />
                                        <span>{slide.contact.email}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Bottom Controls / Progress */}
            <footer className="flex justify-between items-center z-50 max-w-6xl mx-auto w-full pt-2">
                <button
                    onClick={() => paginate(-1)}
                    disabled={currentSlide === 0}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-zinc-800 font-bold text-xs shadow-sm border border-zinc-200 hover:bg-zinc-50 disabled:opacity-40 transition-all"
                >
                    <ChevronLeft size={16} />
                    <span>Sebelumnya</span>
                </button>

                {/* Dots indicator */}
                <div className="flex items-center gap-1.5 overflow-x-auto max-w-[50%] py-1">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setDirection(idx > currentSlide ? 1 : -1);
                                setCurrentSlide(idx);
                            }}
                            className={`h-2 rounded-full transition-all ${
                                idx === currentSlide ? 'w-6 bg-zinc-900' : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                            }`}
                            aria-label={`Ke slide ${idx + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={() => paginate(1)}
                    disabled={currentSlide === slides.length - 1}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 text-white font-bold text-xs shadow-sm hover:bg-zinc-800 disabled:opacity-40 transition-all"
                >
                    <span>Berikutnya</span>
                    <ChevronRight size={16} />
                </button>
            </footer>

            {/* Modal Zoom Gambar dengan Navigasi Panah Kiri-Kanan */}
            {enlargedImage && (
                <div
                    onClick={() => setEnlargedImage(null)}
                    className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 select-none"
                >
                    {/* Previous Button */}
                    {enlargedImageList.length > 1 && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                const prevIdx = enlargedImageIndex === 0 ? enlargedImageList.length - 1 : enlargedImageIndex - 1;
                                setEnlargedImageIndex(prevIdx);
                                setEnlargedImage(enlargedImageList[prevIdx].src);
                            }}
                            className="absolute left-4 md:left-8 z-30 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110"
                            aria-label="Foto sebelumnya"
                        >
                            <ChevronLeft size={24} />
                        </button>
                    )}

                    {/* Image Container */}
                    <div className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={enlargedImage}
                            alt="Enlarged preview"
                            className="max-w-[90vw] max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                        />
                        {enlargedImageList.length > 1 && (
                            <div className="mt-3 px-3 py-1 rounded-full bg-black/60 border border-white/20 text-white font-mono text-xs font-bold">
                                {enlargedImageIndex + 1} / {enlargedImageList.length} · {enlargedImageList[enlargedImageIndex]?.label || ''}
                            </div>
                        )}
                    </div>

                    {/* Next Button */}
                    {enlargedImageList.length > 1 && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                const nextIdx = enlargedImageIndex === enlargedImageList.length - 1 ? 0 : enlargedImageIndex + 1;
                                setEnlargedImageIndex(nextIdx);
                                setEnlargedImage(enlargedImageList[nextIdx].src);
                            }}
                            className="absolute right-4 md:right-8 z-30 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110"
                            aria-label="Foto berikutnya"
                        >
                            <ChevronRight size={24} />
                        </button>
                    )}

                    {/* Close button */}
                    <button
                        type="button"
                        onClick={() => setEnlargedImage(null)}
                        className="absolute top-6 right-6 p-2.5 rounded-full bg-white/20 text-white hover:bg-white/40 backdrop-blur-sm transition-colors"
                        title="Tutup (Esc)"
                    >
                        <X size={20} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default DciPresentation;
