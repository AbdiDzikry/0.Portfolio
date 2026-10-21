import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, ChevronRight, X, User, Briefcase, Calendar, Target,
    Lightbulb, MessageSquare, Layout, TrendingUp, ShieldCheck,
    Linkedin, Mail, ArrowRight, GraduationCap, Search, Users, Rocket,
    Smartphone, Tablet, CheckCircle, BarChart, Download, Check, Maximize, Minimize,
    Laptop, ArrowRightLeft, Image as ImageIcon, Database, Server, Cpu, PackageCheck,
    CheckCircle2, Clock, Workflow, ShieldAlert, FileText, Sparkles, ExternalLink
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
                desc: 'Lulusan S1 Teknik Informatika Telkom University dengan fokus pada transformasi digital industri manufaktur. Terbiasa membangun solusi sistem secara menyeluruh: mulai dari perancangan tampilan interaktif yang mudah digunakan pengguna, pengelolaan background sistem yang andal, hingga integrasi alur data operasional pabrik.',
                jobDesc: 'Mendukung digitalisasi proses di PT Dharma Controlcable Indonesia melalui penanganan sistem pelacakan mutu (Digital PICA), sistem operasional gudang (AIS), serta portal informasi pesanan customer (Tracking Order Customer).',
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
            subtitle: 'Ringkasan Sistem, Akses Domain & Aplikasi selama Magang di DCI',
            pillars: [
                {
                    num: '01',
                    name: 'Digital PICA',
                    role: 'Quality Issue Tracking',
                    period: '11 September – 10 Oktober 2026',
                    image: '/projects/12-portal-aduan/1. login.png',
                    url: 'https://digital-pica.dharma-dcci.co.id/',
                    domainLabel: 'digital-pica.dharma-dcci.co.id',
                    desc: 'Platform investigasi kualitas berbasis Problem Identification Corrective Action. Mengeliminasi kertas aduan, Why-Why analysis terarsip, dan verifikasi multi-tier berdeadline ketat.',
                    badge: 'Mutu & QC',
                    tech: ['Next.js', 'Express', 'JWT', 'Recharts']
                },
                {
                    num: '02',
                    name: 'Tracking Order Customer',
                    role: 'Public Read-Only Tracking',
                    period: '26 September 2026 (1 Hari)',
                    image: '/projects/order-tracking/thumbnail.png',
                    url: 'https://toc.dharma-dcci.co.id/',
                    domainLabel: 'toc.dharma-dcci.co.id',
                    desc: 'Aplikasi web publik PWA mobile-first agar customer dapat memantau 5 tahapan fulfillment pesanan secara live cukup dengan nomor DN tanpa perlu login atau menelpon gudang.',
                    badge: 'Customer Facing',
                    tech: ['Next.js 16', 'React 19', 'TypeScript', 'PWA']
                },
                {
                    num: '03',
                    name: 'AIS (Automated Integrated System)',
                    role: 'Enterprise ERP / WMS (Multi-Backend)',
                    period: '24 Agustus – 20 Oktober 2026',
                    image: '/projects/11-ais-backend/thumbnail-ais.jpeg',
                    url: 'https://new-factory.dharma-dcci.co.id/',
                    domainLabel: 'new-factory.dharma-dcci.co.id',
                    desc: 'Sistem terpadu rantai pasok dan manajemen gudang. Arsitektur multi-backend (Laravel 8 + Node.js) dan SPA React 18: Inbound Receiving, alokasi rak Sloc, WMS Finish Good, hingga konektor SAP RFC 311/101.',
                    badge: 'Rantai Pasok & Gudang',
                    tech: ['React 18', 'Laravel 8', 'Node.js', 'MongoDB 7.0', 'SAP RFC']
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
            image: '/projects/12-portal-aduan/1. login.png',
            summary: 'Sebelum sistem ini hadir, pelacakan komplain mutu (Nonconformity) tersebar di form fisik, lembar MOM (Minutes of Meeting), dan chat informal. Hal ini membuat progres sulit dipantau, riwayat investigasi akar masalah sering hilang, dan perbaikan kerap melewati batas waktu (overdue).',
            problems: [
                { num: '01', title: 'Komplain Mutu Tersebar', desc: 'Isu kualitas dilaporkan terpisah via chat dan lembar fisik MOM (Minutes of Meeting) tanpa rekam jejak tiket tunggal yang akuntabel.' },
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
            resultTitle: 'Saran & Target Hasil',
            title: 'Digital PICA: Arsitektur Solusi & Target Dampak',
            subtitle: 'Tingkat Penyelesaian Tepat Waktu & RBAC Multi-Departemen',
            myRole: 'Membantu perancangan alur investigasi mutu, mendukung implementasi form digital Why-Why analysis terhubung jadwal rapat, serta pengujian validasi hak akses bertingkat (RBAC).',
            myResult: 'Sistem komplain mutu selesai dibangun dan teruji (UAT). Memungkinkan pemantauan progres dan penanganan tiket secara real-time, meniadakan riwayat akar masalah yang tercecer di kertas fisik, serta mengunci otorisasi penutupan tiket oleh QA/QC.',
            images: [
                { src: '/projects/12-portal-aduan/1. login.png', label: 'Gerbang Akses & Login' },
                { src: '/projects/12-portal-aduan/2. dashboard.png', label: 'Executive Dashboard KPI' },
                { src: '/projects/12-portal-aduan/3. List PICA.png', label: 'Pelacakan Tiket Terpusat' },
                { src: '/projects/12-portal-aduan/4. input PICA.png', label: 'Input Registrasi Masalah' },
                { src: '/projects/12-portal-aduan/5. Core Team.png', label: 'Penugasan Core Team' },
                { src: '/projects/12-portal-aduan/6. Schedule Meeting.png', label: 'Jadwal Meeting Investigasi' },
                { src: '/projects/12-portal-aduan/7. informasi pica.png', label: 'Detail & Identifikasi Kasus' },
                { src: '/projects/12-portal-aduan/8. problem solving dan action plan.png', label: 'Why-Why & Action Plan' },
                { src: '/projects/12-portal-aduan/9. verifikasi efektifitas.png', label: 'Verifikasi Bertingkat' },
                { src: '/projects/12-portal-aduan/10. role based access control.png', label: 'Konfigurasi Hak Akses RBAC' },
                { src: '/projects/12-portal-aduan/11. list meeting diskusi.png', label: 'Daftar Notulensi & Meeting' }
            ],
            features: [
                'Executive KPI Dashboard: Memantau tiket open, in-progress, closed, dan rasio overdue secara live.',
                'Why-Why Analysis & Notulensi: Form investigasi akar masalah mendalam terhubung agenda meeting.',
                'Multi-Department RBAC: 8 tingkatan hak akses token JWT mengisolasi wewenang tindakan antar divisi.',
                'Validasi Efektivitas Berlapis: Tiket hanya dapat ditutup setelah lolos pengujian hasil perbaikan.'
            ],
            impacts: [
                { value: '100%', label: 'Traceability Tiket', desc: 'Target pencatatan komplain terpusat.' },
                { value: '0 Missing', label: 'Root Cause Arsip', desc: 'Riwayat Why-Why tersimpan permanen.' },
                { value: 'Real-time', label: 'Monitoring Overdue', desc: 'Peringatan batas waktu otomatis.' },
                { value: '8 Roles', label: 'Wewenang RBAC', desc: 'Otorisasi sesuai hierarki manajemen.' }
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
            summary: 'Data posisi pesanan customer sebenarnya sudah tercatat di sistem internal pabrik, namun hanya bisa dilihat oleh staf internal. Setiap kali customer menanyakan posisi pesanan, Sales harus menelepon Supervisor Gudang, lalu operator packing, memakan waktu hingga berjam-jam.',
            problems: [
                { num: '01', title: 'Zero Customer Visibility', desc: 'Customer tidak memiliki sarana mandiri untuk mengecek progres produksi dan status pengiriman pesanannya secara langsung.' },
                { num: '02', title: 'Beban Komunikasi Relay', desc: 'Pertanyaan status diteruskan berantai dari Sales → Gudang → Operator Packing, mengganggu produktivitas operasional.' },
                { num: '03', title: 'Ketidakpastian Posisi Pesanan', desc: 'Tidak adanya kejelasan apakah pesanan masih diproduksi, proses scan packing, atau sudah dimuat ke armada ekspedisi.' },
                { num: '04', title: 'Ketergantungan Jam Kerja', desc: 'Customer hanya bisa mengetahui kabar pesanan di jam kerja staf kantor saat telepon atau pesan WhatsApp direspons.' }
            ]
        },
        // 7. Project 2: Tracking Order Customer - Rencana & Hasil Perbaikan
        {
            type: 'project-solution',
            projectKey: 'tracking',
            tag: 'PROJECT 02 · RENCANA & HASIL PERBAIKAN',
            planTitle: 'Rencana Perbaikan',
            resultTitle: 'Saran & Target Hasil',
            title: 'Tracking Order Customer: Alur 5 Tahap Fulfillment',
            subtitle: 'Public Read-Only Portal via React Server Components & PWA',
            myRole: 'Membantu menyiapkan aset tampilan front-end yang dibutuhkan, membuat fitur pengecekan daftar keseluruhan nomor DN bagi tiap customer, serta memastikan kemudahan akses mandiri informasi pesanan secara cepat.',
            myResult: 'Aplikasi selesai dibangun dan siap pakai dalam 1 hari kerja. Customer berpotensi memantau pesanan dalam hitungan detik tanpa login, menargetkan eliminasi panggilan telepon relay dari Sales ke operator gudang.',
            images: [
                { src: '/projects/order-tracking/thumbnail.png', label: 'Overview Halaman Publik' },
                { src: '/projects/order-tracking/1.png', label: 'Pencarian DN Mandiri' },
                { src: '/projects/order-tracking/2.png', label: 'Hasil Pelacakan & Validasi' },
                { src: '/projects/order-tracking/order-stage.png', label: 'Stepper 5 Tahap Fulfillment' },
                { src: '/projects/order-tracking/packing-progress.png', label: 'Live Barcode Scan pcs' },
                { src: '/projects/order-tracking/stage-detail.png', label: 'Detail PIC & Timestamp WIB' },
                { src: '/projects/order-tracking/shipment-status.png', label: 'Status Siap Kirim & Manifest' },
                { src: '/projects/order-tracking/mobile-view.png', label: 'Tampilan Mobile & PWA' }
            ],
            features: [
                'Public Read-Only Access: Customer cukup memasukkan nomor DN/Manifest tanpa butuh login/akun.',
                'Server-Side Data Layer: Fetch backend via React Server Components, URL internal 100% aman.',
                '5-Stage Stepper: Received → Stock Approved → Packing (Live Scan) → Ready to Ship → Delivery.',
                'Mobile-First & PWA: Dapat di-install langsung ke homescreen smartphone customer layaknya app native.'
            ],
            impacts: [
                { value: '0 Menit', label: 'Target Waktu Tunggu', desc: 'Akses pengecekan mandiri instan.' },
                { value: '5 Tahap', label: 'Fulfillment Flow', desc: 'Lengkap dengan PIC & timestamp WIB.' },
                { value: '0 Leaks', label: 'Keamanan Backend', desc: 'API internal terlindungi di balik RSC.' },
                { value: '5 Detik', label: 'Timeout Protection', desc: 'Mencegah request menggantung di jaringan.' }
            ]
        },
        // 8. Project 3: AIS - Latar Belakang Masalah (Analisa Kondisi)
        {
            type: 'project-problems',
            projectKey: 'ais',
            tag: 'PROJECT 03 · 24 AGUSTUS – 20 OKTOBER 2026',
            category: 'Latar Belakang Masalah (Analisa Kondisi)',
            title: 'AIS: Mengapa Modul Gudang & Integrasi SAP Dibutuhkan?',
            subtitle: 'Akurasi Saldo Rak, Pencegahan Salah Taruh & Otomasi Alur Data Pabrik',
            image: '/projects/11-ais-backend/thumbnail-ais.jpeg',
            summary: 'Aktivitas pergudangan material otomotif di DCI melibatkan ribuan part dan perpindahan box per hari. Tanpa sistem terpadu berbasis scan barcode, tim operasional rentan menghadapi salah taruh di rak, ketidaksinkronan data penerimaan supplier terhadap PO SAP, serta proses rekapitulasi data mutasi barang yang lambat.',
            problems: [
                { num: '01', title: 'Verifikasi Penerimaan Rentan Selisih', desc: 'Pencocokan kuantitas surat jalan vendor terhadap Purchase Order SAP masih manual, berisiko over-delivery tanpa proteksi toleransi.' },
                { num: '02', title: 'Part Hilang Jejak di Rak (Salah Taruh)', desc: 'Penempatan box ke rak gudang belum tersistematisasi (tanpa alokasi Bin otomatis), menyulitkan pencarian fisik saat material dibutuhkan.' },
                { num: '03', title: 'Material NG/Reject Masih Bisa Teralokasi', desc: 'Belum ada penguncian otomatis (lock status) antara hasil inspeksi QC Incoming dengan alokasi rak reguler di gudang.' },
                { num: '04', title: 'Pengeluaran Barang (BKB) Belum Real-time', desc: 'Pengeluaran material ke lini perakitan atau pesanan parsial membutuhkan verifikasi manual berulang yang menghambat proses produksi.' }
            ]
        },
        // 9. Project 3: AIS - Rencana & Hasil Perbaikan
        {
            type: 'project-solution',
            projectKey: 'ais',
            tag: 'PROJECT 03 · RENCANA & HASIL PERBAIKAN',
            planTitle: 'Rencana Perbaikan',
            resultTitle: 'Saran & Target Hasil',
            title: 'AIS: Solusi Digitalisasi Gudang & Integrasi SAP',
            subtitle: 'Eliminasi Salah Taruh Rak, Validasi PO Otomatis & Penguncian Mutu Terpadu',
            myRole: 'Membantu pengembangan fitur modul warehouse (inbound label & alokasi bin rak), pemeliharaan backend Laravel 8 & Express.js, integrasi jembatan data SAP RFC (Movement 101 & 311), serta pengamanan scanner debounce guard.',
            myResult: 'Modul warehouse dan pipeline data SAP selesai dikembangkan dan teruji (UAT-ready). Ditargetkan menjamin akurasi stok rak 100%, mencegah masuknya material reject ke rak, serta menghapus rekapitulasi data manual harian ke SAP ERP.',
            images: [
                { src: '/projects/11-ais-backend/thumbnail-ais.jpeg', label: 'Overview Sistem AIS' },
                { src: '/projects/11-ais-backend/Fitur Scan In Label Incoming Material.png', label: 'Scan In Label Incoming' },
                { src: '/projects/11-ais-backend/Fitur Assign Bin dan Alokasi Rak .png', label: 'Assign Bin & Alokasi Rak' },
                { src: '/projects/11-ais-backend/menu Stock On Rack Management.png', label: 'Stock On Rack Management' },
                { src: '/projects/11-ais-backend/Fitur Scan rack Information.png', label: 'Scan Rack Information Audit' },
                { src: '/projects/11-ais-backend/Fitur Outgoing goods BKB.png', label: 'Outgoing Goods BKB' },
                { src: '/projects/11-ais-backend/5.png', label: 'Sinkronisasi SAP ERP' }
            ],
            features: [
                'Poka-Yoke Inbound & PO SAP: Validasi otomatis label vendor terhadap PO aktif guna mencegah over-delivery.',
                'Sloc & Assign Bin Otomatis: Rekomendasi penempatan rak bertingkat digital untuk meniadakan salah taruh part.',
                'Lock Status QC Mutu: Mengunci material reject/hold agar tidak dapat dialokasikan ke rak penyimpanan reguler.',
                'Jembatan Data SAP RFC & BKB: Otomasi mutasi pengeluaran barang perakitan langsung terhubung sistem SAP sentral.'
            ],
            impacts: [
                { value: '100%', label: 'Target Akurasi Stok', desc: 'Pencatatan rak material berbasis QR/Barcode.' },
                { value: 'Terhubung', label: 'Konektivitas SAP', desc: 'Integrasi data transaksi langsung ke ERP.' },
                { value: 'Otomatis', label: 'Alur Data Mutasi', desc: 'Target menghapus rekap manual harian.' },
                { value: 'Terpusat', label: 'Modul Warehouse', desc: 'Semua pergerakan part tercatat di sistem.' }
            ]
        },
        // 10. Detail Fitur & Kesiapan Modul AIS (Ready for UAT)
        {
            type: 'ais-features-breakdown',
            tag: 'PROJECT 03 · DETAIL FITUR & TANGGUNG JAWAB TEKNIS',
            title: 'Fitur Selesai Dikembangkan pada Modul AIS',
            subtitle: 'Implementasi Selesai pada Kode & Basis Data · Status: Ready for UAT & Sosialisasi Lapangan',
            statusBadge: 'Development Complete · Ready for UAT',
            note: 'Fitur-fitur di bawah ini telah selesai dibangun dan teruji di lingkungan pengujian (development/staging), siap untuk tahapan User Acceptance Testing (UAT) dan sosialisasi pengguna akhir.',
            sections: [
                {
                    category: 'A. Inbound & Receiving Dock',
                    tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
                    items: [
                        { name: 'Good Receipt Purchase Order', desc: 'Penarikan data PO SAP otomatis & validasi toleransi kirim vendor (Poka-Yoke).' },
                        { name: 'Surat Jalan Supplier & Armada', desc: 'Pencatatan nomor SJ, nama supir, nopol truk, serta arsip foto fisik surat jalan.' },
                        { name: 'Assign Bin & Scan Rak Sloc', desc: 'Rekomendasi otomatis penempatan rak fisik gudang & pemindaian barcode bin audit.' },
                        { name: 'Rekonsiliasi GR vs QC Mutu', desc: 'Pencocokan kuantiti lolos (OK) vs tolak (NG) untuk mengunci material reject/hold.' }
                    ]
                },
                {
                    category: 'B. Warehouse Finish Good (FG)',
                    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    items: [
                        { name: 'Denah Layout Visual 2D Gudang', desc: 'Peta visual keterisian rak real-time berbasis zona pelanggan (AHM, TMMIN, OEM).' },
                        { name: 'Stock Overview & Safety Alert', desc: 'Monitoring saldo per part number, riwayat mutasi keluar-masuk, & peringatan stok limit.' },
                        { name: 'Stock Split & Opname Koreksi', desc: 'Logika pemecahan box besar untuk kirim parsial & pencocokan fisik berkala ber-audit trail.' },
                        { name: 'Scan Packing & Dispatch Armada', desc: 'Validasi barcode 100% sebelum muat truk & pemicu status ON DELIVERY ke customer.' }
                    ]
                },
                {
                    category: 'C. Konektivitas & Jembatan Data',
                    tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
                    items: [
                        { name: 'Inbound Webhook QC Traceability', desc: 'Endpoint penerima semburan data lot inspeksi dengan proteksi x-api-key.' },
                        { name: 'Idempotensi & Anti-Duplikasi Lot', desc: 'Pola updateOrCreate di Laravel untuk mencegah duplikasi data saat retry jaringan.' },
                        { name: 'Scanner Gun Anti-Double Scan', desc: 'Proteksi debounce (<300ms) mencegah race condition penulisan ganda ke database.' },
                        { name: 'BOM & Master Lini Produksi', desc: 'Kalkulator kebutuhan part per lini dan pemetaan target SLOC produksi pabrik.' }
                    ]
                }
            ]
        },
        // 11. Activity & Target Impact Summary Matrix
        {
            type: 'impact-matrix',
            tag: 'EXECUTIVE SUMMARY · DCI DIGITAL ECOSYSTEM',
            title: 'Activity & Target Impact Summary Matrix',
            subtitle: 'Rekapitulasi Aktivitas, Peran Teknis & Target Potensi Dampak Seluruh Proyek di DCI',
            summaryStats: [
                { label: 'Total Sistem Dikembangkan', value: '3 Proyek', sub: 'QC, WMS & Customer' },
                { label: 'Target Efisiensi Tracking', value: '100% Cepat', sub: 'Dari jam ke detik' },
                { label: 'Status Penanganan Overdue', value: 'Real-time', sub: 'Digital PICA system' },
                { label: 'Target Akurasi Stok Gudang', value: '100%', sub: 'Validasi QR & SAP sync' }
            ],
            projects: [
                {
                    key: 'pica',
                    name: 'Digital PICA',
                    period: '11 Sep – 10 Okt 2026',
                    role: 'Quality Issue Tracking',
                    badge: 'Mutu & QC',
                    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    activities: [
                        'Membantu perancangan alur investigasi mutu terstruktur',
                        'Mendukung implementasi form digital Why-Why analysis terhubung jadwal meeting',
                        'Pengujian validasi hak akses bertingkat (8 level JWT RBAC)'
                    ],
                    impacts: [
                        { label: 'Traceability Tiket', val: 'Target 100%' },
                        { label: 'Monitoring Overdue', val: 'Real-time' },
                        { label: 'Root Cause Loss', val: '0 Missing' }
                    ]
                },
                {
                    key: 'tracking',
                    name: 'Tracking Order Customer',
                    period: '26 Sep 2026 (1 Hari)',
                    role: 'Public Read-Only Portal',
                    badge: 'Customer Facing',
                    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
                    activities: [
                        'Membantu menyiapkan aset antarmuka (front-end) yang dibutuhkan',
                        'Membuat fitur pengecekan daftar keseluruhan nomor DN bagi tiap customer',
                        'Mendukung pengujian kemudahan akses mandiri agar pesanan terpantau secara instan'
                    ],
                    impacts: [
                        { label: 'Akses Mandiri', val: 'Cepat & Praktis' },
                        { label: 'Beban Telepon', val: 'Target Berkurang' },
                        { label: 'Kesiapan Pakai', val: '1 Hari Rilis' }
                    ]
                },
                {
                    key: 'ais',
                    name: 'AIS (Automated Integrated System)',
                    period: '24 Ags – 20 Okt 2026',
                    role: 'React SPA · Laravel 8 & Node.js',
                    badge: 'Multi-Backend ERP/WMS',
                    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
                    activities: [
                        'Pengembangan fitur modul warehouse (Scan In Label, Assign Bin rak, & Stock on Rack)',
                        'Integrasi dual-backend: Laravel 8 (Master Data/BKB/SAP RFC) & Express.js (WMS FG)',
                        'Konektivitas SAP RFC Connector (Movement 101/311) & Webhook QC Traceability'
                    ],
                    impacts: [
                        { label: 'Akurasi Stok Rak', val: 'Target 100%' },
                        { label: 'Konektor SAP RFC', val: 'RFC 101/311' },
                        { label: 'Dual Backend', val: 'PHP 7.4 & Node' }
                    ]
                }
            ]
        },
        // 11. Timeline & Perjalanan Magang DCI
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
                    activities: 'Membantu penyiapan aset antarmuka front-end, pembuatan fitur pengecekan daftar keseluruhan nomor DN per customer, dan kemudahan akses mandiri tanpa login.'
                },
                {
                    month: '24 Ags – 20 Okt 2026',
                    project: 'AIS (Automated Integrated System)',
                    activities: 'Pengembangan fitur modul warehouse (pencatatan barang & pelacakan rak QR/Barcode), pemeliharaan backend Laravel, serta pengujian konektivitas dan integrasi data ke SAP ERP.'
                }
            ]
        },
        // 13. Lampiran Dokumentasi Aktivitas Magang (Bento Grid)
        {
            type: 'activity-bento',
            tag: 'LAMPIRAN · DOKUMENTASI AKTIVITAS & KONTRIBUSI LAPANGAN',
            title: 'Lampiran: Dokumentasi Aktivitas di DCI',
            subtitle: 'Rekam Jejak Keterlibatan Langsung pada Pengembangan, Meeting, UAT, dan Sosialisasi Pengguna',
            activities: [
                {
                    title: 'Proses Pengerjaan Projek Tracking Order',
                    category: 'Development · Fast Track',
                    desc: 'Pengembangan coding dan penyelesaian fitur portal pelacakan mandiri customer berbasis web PWA.',
                    src: '/projects/dci-activities/1. Proses Pengerjaan Projek Tracking Order.jpeg',
                    colSpan: 'md:col-span-7',
                    rowSpan: 'md:row-span-1',
                    badge: 'Coding & Dev'
                },
                {
                    title: 'Sosialisasi Tracking Order Bersama User',
                    category: 'User Adoption · Customer Facing',
                    desc: 'Pendampingan langsung kepada pengguna akhir operasional untuk simulasi pencarian status order via nomor Surat Jalan.',
                    src: '/projects/dci-activities/3. Sosialisasi Tracking Order Bersama User.jpeg',
                    colSpan: 'md:col-span-5',
                    rowSpan: 'md:row-span-1',
                    badge: 'User Socialization'
                },
                {
                    title: 'Meeting Mingguan Digitalisasi AIS',
                    category: 'Coordination · Cross Department',
                    desc: 'Diskusi sinkronisasi mingguan progress modul gudang, integrasi backend SAP, dan evaluasi kendala data.',
                    src: '/projects/dci-activities/2. Meeting Mingguan Digitalisasi AIS.jpeg',
                    colSpan: 'md:col-span-4',
                    rowSpan: 'md:row-span-1',
                    badge: 'Weekly Sync'
                },
                {
                    title: 'Report Pengembangan Digital PICA',
                    category: 'Quality System · Presentation',
                    desc: 'Penyampaian status pengerjaan form Why-Why analysis digital dan manajemen notulensi rapat investigasi QC.',
                    src: '/projects/dci-activities/4. Report Pengembangan Projek Digital PICA.jpeg',
                    colSpan: 'md:col-span-4',
                    rowSpan: 'md:row-span-1',
                    badge: 'Progress Report'
                },
                {
                    title: 'Sosialisasi & UAT Finish Good AIS',
                    category: 'Warehouse · UAT Testing',
                    desc: 'Uji coba penerimaan box kabel jadi (FG Put-Away) dan simulasi pemindaian barcode bersama tim PPIC/Warehouse.',
                    src: '/projects/dci-activities/5. Sosialisasi dan UAT Finish Good.jpeg',
                    colSpan: 'md:col-span-4',
                    rowSpan: 'md:row-span-1',
                    badge: 'UAT & Field Test'
                }
            ]
        },
        // 14. Rencana Pengembangan Karir (10 Tahun ke Depan)
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
                    name: 'Software Engineer II / Mid-Senior Developer',
                    badge: 'Spesialisasi Tingkat Lanjut',
                    desc: 'Menguasai domain sistem manufaktur, menangani fitur kompleks, optimasi performa, dan pengambilan keputusan teknis skala modul.'
                },
                {
                    year: 'Tahun 6–10',
                    name: 'Senior Developer / Tech Lead',
                    badge: 'Kepemimpinan Teknis & Inovasi',
                    desc: 'Senior engineer yang memegang arsitektur sistem, memimpin tim engineering manufaktur, dan mengawal inisiatif Smart Factory & digitalisasi modern.'
                },
                {
                    year: 'Usia 44 Tahun',
                    name: 'Peternak Ayam & Petani Hidroponik',
                    badge: 'Agribisnis & Kemandirian',
                    desc: 'Membangun usaha mandiri berkelanjutan di sektor pangan dan peternakan, memanfaatkan otomatisasi sistem & IoT untuk efisiensi agribisnis modern.'
                }
            ]
        },
        // 15. Refleksi & Rekomendasi Masa Depan
        {
            type: 'insight-feedback',
            title: 'Refleksi & Rekomendasi Pengembangan Ekosistem DCI',
            kesanTitle: 'Refleksi Pengalaman Magang di DCI',
            kesan: 'Magang di PT Dharma Controlcable Indonesia memberikan wawasan berharga yang melampaui ranah teknis perangkat lunak. Saya memperoleh pemahaman nyata mengenai dinamika operasional di lantai pabrik (shop floor), mulai dari kompleksitas rantai pasok (supply chain), penjaminan mutu presisi (quality check), hingga manajemen pergudangan. Pengalaman ini menyadarkan saya bahwa solusi digital terbaik lahir dari pemahaman mendalam terhadap proses bisnis dan kebutuhan nyata pengguna di lapangan.',
            saranTitle: 'Rekomendasi Lanjutan untuk Projek & Perusahaan (Next Level Up)',
            saran: 'Digitalisasi yang telah dibangun saat ini sudah menjadi fondasi web & basis data yang sangat kokoh. Sebagai langkah naik kelas (level up) ke depan, sistem direkomendasikan tidak hanya berhenti di aplikasi website berbasis input/scan manual, melainkan mulai diintegrasikan dengan sensor otomatis (IoT) pada mesin produksi dan rak gudang, sehingga pencatatan komplain mutu di PICA maupun transaksi pergerakan part di AIS dapat terdeteksi secara otomatis (hands-free).',
            points: [
                { icon: <Target />, text: 'Sensor Mesin Otomatis: Integrasi IoT agar anomali kualitas di lini terdeteksi langsung ke Digital PICA.' },
                { icon: <Workflow />, text: 'Smart Warehouse IoT: Level up rak gudang AIS dengan sensor penimbangan dan sensor deteksi otomatis.' },
                { icon: <Users />, text: 'Transparansi Real-Time: Pelacakan pesanan customer bergerak otomatis berdasarkan sensor muat armada.' },
                { icon: <Rocket />, text: 'Smart Factory 4.0: Mengubah sistem berbasis web murni menjadi ekosistem manufaktur cerdas dan mandiri.' }
            ]
        },
        // 15. Thank you
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
                
                // Jeda 850ms agar animasi exit/enter framer-motion selesai 100% dan gambar terload
                await new Promise((resolve) => setTimeout(resolve, 850));

                const cards = document.querySelectorAll('.presentation-card');
                const slideElement = cards.length > 0 ? cards[cards.length - 1] : null;

                if (slideElement) {
                    const canvas = await html2canvas(slideElement, {
                        scale: 1.5,
                        useCORS: true,
                        allowTaint: true,
                        logging: false,
                        backgroundColor: '#ffffff'
                    });

                    const imgData = canvas.toDataURL('image/jpeg', 0.92);
                    
                    if (!pdf) {
                        pdf = new jsPDF({
                            orientation: canvas.width >= canvas.height ? 'landscape' : 'portrait',
                            unit: 'px',
                            format: [canvas.width, canvas.height]
                        });
                        pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
                    } else {
                        pdf.addPage([canvas.width, canvas.height], canvas.width >= canvas.height ? 'landscape' : 'portrait');
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
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-mono text-zinc-400 font-semibold tracking-wider uppercase hidden sm:inline-block">
                                    Smart Factory Digitalization · Magang 2026
                                </span>
                                <img
                                    src="/logo-dharma.png"
                                    alt="Dharma Group Logo"
                                    className="h-5 md:h-6 object-contain"
                                />
                            </div>
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
                            <div className="space-y-4 pt-3">
                                <div className="text-center space-y-1">
                                    <h2 className="text-2xl md:text-3xl font-black text-zinc-900">{slide.title}</h2>
                                    <p className="text-xs text-zinc-500 font-mono">{slide.subtitle}</p>
                                </div>
                                <div className="grid md:grid-cols-3 gap-3.5">
                                    {slide.pillars.map((p, idx) => (
                                        <motion.div
                                            key={idx}
                                            variants={itemVariants}
                                            className="p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-200 transition-all flex flex-col justify-between space-y-2.5 shadow-sm"
                                        >
                                            <div className="space-y-2">
                                                {/* Card Header & Badge */}
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xl font-black text-zinc-300 font-mono">{p.num}</span>
                                                    <span className="px-2 py-0.5 rounded-full bg-zinc-200 text-zinc-700 text-[10px] font-bold font-mono uppercase">
                                                        {p.badge}
                                                    </span>
                                                </div>

                                                {/* Project Thumbnail Preview with Blurred Background & Fit Foreground */}
                                                {p.image && (
                                                    <div className="w-full h-28 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-200 relative group flex items-center justify-center">
                                                        {/* Blurred ambient background */}
                                                        <img
                                                            src={p.image}
                                                            alt=""
                                                            aria-hidden="true"
                                                            className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-50"
                                                        />
                                                        {/* Crisp fit foreground image */}
                                                        <img
                                                            src={p.image}
                                                            alt={p.name}
                                                            className="relative z-10 max-h-full max-w-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>
                                                )}

                                                <div>
                                                    <h3 className="text-sm font-black text-zinc-900 leading-snug">{p.name}</h3>
                                                    <p className="text-[10px] font-bold text-emerald-600 font-mono mt-0.5">{p.role}</p>
                                                </div>

                                                <p className="text-[11px] text-zinc-600 leading-relaxed line-clamp-3">{p.desc}</p>
                                            </div>

                                            <div className="space-y-2 pt-2 border-t border-zinc-200/60">
                                                {/* Direct Domain Link */}
                                                {p.url && (
                                                    <a
                                                        href={p.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold transition-colors w-full justify-between"
                                                        title={`Buka ${p.url}`}
                                                    >
                                                        <span className="truncate">{p.domainLabel || p.url}</span>
                                                        <ExternalLink size={11} className="shrink-0" />
                                                    </a>
                                                )}

                                                {/* Tech Badges */}
                                                <div className="flex flex-wrap gap-1">
                                                    {p.tech.map((t, i) => (
                                                        <span key={i} className="px-1.5 py-0.5 rounded bg-white text-zinc-700 border border-zinc-200 text-[8px] font-mono font-semibold">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
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
                                                        Luaran Sistem & Kesiapan Rilis
                                                    </span>
                                                    <p className="text-[11px] text-zinc-800 font-medium leading-relaxed">
                                                        {slide.myResult}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Impact Stats Grid */}
                                    <div className="space-y-1 pt-1">
                                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                                            Target & Potensi Dampak:
                                        </span>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                            {slide.impacts.map((imp, idx) => (
                                                <div key={idx} className="p-2 rounded-xl bg-zinc-50 border border-zinc-200 text-center">
                                                    <div className="text-sm sm:text-base font-black text-zinc-900 font-mono leading-none">{imp.value}</div>
                                                    <div className="text-[9px] font-bold text-emerald-600 font-mono mt-0.5">{imp.label}</div>
                                                    <div className="text-[8px] text-zinc-400 truncate mt-0.5">{imp.desc}</div>
                                                </div>
                                            ))}
                                        </div>
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
                                    <div className={`grid gap-1.5 ${slide.images.length > 4 ? 'grid-cols-6' : 'grid-cols-4'}`}>
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

                        {/* SLIDE TYPE: AIS FEATURES BREAKDOWN (READY FOR UAT) */}
                        {slide.type === 'ais-features-breakdown' && (
                            <div className="space-y-3.5 pt-3">
                                <div className="space-y-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-[10px] font-mono font-bold tracking-wider text-purple-700 uppercase bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                                            {slide.tag}
                                        </span>
                                        <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 flex items-center gap-1">
                                            <Sparkles size={11} /> {slide.statusBadge}
                                        </span>
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-black text-zinc-900 leading-tight">{slide.title}</h2>
                                    <p className="text-xs text-zinc-500 font-medium">{slide.subtitle}</p>
                                </div>

                                {/* Feature Groups (3 Columns) */}
                                <div className="grid md:grid-cols-3 gap-3">
                                    {slide.sections.map((sec, sIdx) => (
                                        <motion.div
                                            key={sIdx}
                                            variants={itemVariants}
                                            className="p-3.5 rounded-2xl bg-zinc-50/70 border border-zinc-200 flex flex-col justify-between space-y-2.5 shadow-sm"
                                        >
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between pb-1.5 border-b border-zinc-200/80">
                                                    <h3 className="text-xs font-black text-zinc-900 leading-tight">{sec.category}</h3>
                                                    <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold border uppercase shrink-0 ${sec.tagColor}`}>
                                                        Built
                                                    </span>
                                                </div>

                                                <div className="space-y-2">
                                                    {sec.items.map((item, iIdx) => (
                                                        <div key={iIdx} className="p-2 rounded-xl bg-white border border-zinc-200/70 space-y-0.5">
                                                            <div className="flex items-start gap-1.5">
                                                                <CheckCircle2 size={12} className="text-emerald-500 shrink-0 mt-0.5" />
                                                                <h4 className="text-[11px] font-bold text-zinc-900 leading-snug">{item.name}</h4>
                                                            </div>
                                                            <p className="text-[10px] text-zinc-600 leading-relaxed pl-4">
                                                                {item.desc}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Bottom Clarification Banner */}
                                <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/90 flex items-center gap-2 text-[11px] text-amber-900">
                                    <Clock size={14} className="text-amber-600 shrink-0" />
                                    <span>
                                        <strong>Catatan Kesiapan:</strong> {slide.note}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* SLIDE TYPE: ACTIVITY & IMPACT SUMMARY MATRIX */}
                        {slide.type === 'impact-matrix' && (
                            <div className="space-y-3.5 pt-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                            {slide.tag}
                                        </span>
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-black text-zinc-900 leading-tight">{slide.title}</h2>
                                    <p className="text-xs text-zinc-500 font-medium">{slide.subtitle}</p>
                                </div>

                                {/* Top KPI Highlight Badges */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    {slide.summaryStats.map((stat, idx) => (
                                        <div key={idx} className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 flex flex-col justify-center">
                                            <span className="text-[10px] text-zinc-500 font-mono font-semibold uppercase">{stat.label}</span>
                                            <span className="text-base sm:text-lg font-black text-zinc-900 font-mono leading-tight mt-0.5">{stat.value}</span>
                                            <span className="text-[9px] text-emerald-600 font-medium truncate">{stat.sub}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Project Matrix Comparison Cards */}
                                <div className="grid md:grid-cols-3 gap-3">
                                    {slide.projects.map((proj, idx) => (
                                        <motion.div
                                            key={idx}
                                            variants={itemVariants}
                                            className="p-3.5 rounded-2xl bg-white border border-zinc-200 shadow-sm flex flex-col justify-between space-y-2.5 hover:border-zinc-300 transition-all"
                                        >
                                            <div className="space-y-2">
                                                <div className="flex items-start justify-between gap-1 border-b border-zinc-100 pb-2">
                                                    <div>
                                                        <h3 className="text-xs sm:text-sm font-black text-zinc-900 leading-tight">{proj.name}</h3>
                                                        <span className="text-[10px] font-mono font-bold text-zinc-500">{proj.period}</span>
                                                    </div>
                                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border uppercase shrink-0 ${proj.badgeColor}`}>
                                                        {proj.badge}
                                                    </span>
                                                </div>

                                                {/* Key Activities */}
                                                <div className="space-y-1">
                                                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                                                        Aktivitas Utama & Kontribusi:
                                                    </span>
                                                    <ul className="space-y-1">
                                                        {proj.activities.map((act, aIdx) => (
                                                            <li key={aIdx} className="flex items-start gap-1.5 text-[10px] sm:text-[11px] text-zinc-700 leading-tight">
                                                                <CheckCircle2 size={11} className="text-emerald-500 shrink-0 mt-0.5" />
                                                                <span>{act}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Quantifiable Impact Pills */}
                                            <div className="pt-2 border-t border-zinc-100">
                                                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                                                    Target & Potensi Dampak:
                                                </span>
                                                <div className="grid grid-cols-3 gap-1 text-center">
                                                    {proj.impacts.map((imp, iIdx) => (
                                                        <div key={iIdx} className="p-1 rounded-lg bg-zinc-50 border border-zinc-200/70">
                                                            <div className="text-[10px] sm:text-[11px] font-black text-zinc-900 font-mono leading-none">{imp.val}</div>
                                                            <div className="text-[8px] text-zinc-500 font-medium truncate mt-0.5">{imp.label}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
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

                        {/* SLIDE TYPE: ACTIVITY BENTO GRID (LAMPIRAN) */}
                        {slide.type === 'activity-bento' && (
                            <div className="space-y-3.5 pt-2">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                            {slide.tag}
                                        </span>
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-black text-zinc-900 leading-tight">{slide.title}</h2>
                                    <p className="text-xs text-zinc-500 font-medium">{slide.subtitle}</p>
                                </div>

                                {/* Bento Grid Gallery */}
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                                    {slide.activities.map((act, aIdx) => (
                                        <motion.div
                                            key={aIdx}
                                            variants={itemVariants}
                                            onClick={() => {
                                                const list = slide.activities.map(a => ({ src: a.src, label: a.title }));
                                                setEnlargedImageList(list);
                                                setEnlargedImageIndex(aIdx);
                                                setEnlargedImage(act.src);
                                            }}
                                            className={`${act.colSpan || 'md:col-span-4'} group relative rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-900 shadow-sm cursor-pointer hover:shadow-md transition-all flex flex-col justify-end min-h-[170px] sm:min-h-[190px]`}
                                            title="Klik untuk melihat foto lebih besar"
                                        >
                                            {/* Full Fill Image */}
                                            <img
                                                src={act.src}
                                                alt={act.title}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                                            />

                                            {/* Gradient Overlay for bottom text legibility */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent pointer-events-none" />

                                            {/* Top Badge */}
                                            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                                                <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[9px] font-mono font-bold border border-white/20">
                                                    {act.badge}
                                                </span>
                                                <span className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full bg-white/20 text-white backdrop-blur-md">
                                                    <Maximize size={12} />
                                                </span>
                                            </div>

                                            {/* Card Content Footer */}
                                            <div className="relative z-10 p-3 space-y-0.5">
                                                <span className="text-[9px] font-mono font-semibold text-emerald-400 block tracking-wide uppercase">
                                                    {act.category}
                                                </span>
                                                <h3 className="text-xs sm:text-sm font-black text-white leading-tight">
                                                    {act.title}
                                                </h3>
                                                <p className="text-[10px] text-zinc-300 line-clamp-2 leading-relaxed">
                                                    {act.desc}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
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
