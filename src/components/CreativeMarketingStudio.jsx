import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Camera, Instagram, Palette, ShoppingBag,
    Sparkles, CheckCircle2, ArrowUpRight, Maximize2, Download,
    Layers, Eye, Layout, Briefcase, GraduationCap, Award,
    Calendar, MapPin, UserCheck, ExternalLink, Mail, Phone
} from 'lucide-react';
import SEO from './SEO';
import { ShowcaseModal } from './InteractiveShowcase';

const CreativeMarketingStudio = ({ project, language = 'id' }) => {
    const isId = language === 'id';

    // State for gallery filter & modal
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedModalIndex, setSelectedModalIndex] = useState(0);

    const galleryItems = useMemo(() => project.galleryItems || [], [project.galleryItems]);

    // Categories for filter tabs
    const filterTabs = [
        { id: 'ALL', label: isId ? 'Semua Desain (17)' : 'All Designs (17)' },
        { id: 'Property', label: isId ? 'Property & Real Estate (7)' : 'Property (7)' },
        { id: 'Social Media', label: isId ? 'Sosial Media & Feed (3)' : 'Social Media (3)' },
        { id: 'Lifestyle', label: isId ? 'Parfum & Lifestyle (3)' : 'Lifestyle (3)' },
        { id: 'Mobile & UI', label: isId ? 'Aplikasi Travel (3)' : 'Mobile App (3)' },
        { id: 'E-Commerce', label: isId ? 'Katalog Marketplace (2)' : 'E-Commerce (2)' },
    ];

    const filteredGallery = useMemo(() => {
        if (activeFilter === 'ALL') return galleryItems;
        return galleryItems.filter(item => item.category === activeFilter);
    }, [galleryItems, activeFilter]);

    const handleOpenModal = (item) => {
        const idx = galleryItems.findIndex(g => g.id === item.id || g.image === item.image);
        setSelectedModalIndex(idx >= 0 ? idx : 0);
        setIsModalOpen(true);
    };

    const certifications = useMemo(() => [
        {
            title: isId ? 'Conversion Optimization Certification' : 'Conversion Optimization Certification',
            issuer: 'Google Skillshop',
            badge: 'Google Certified',
            desc: isId ? 'Analisis konversi kampanye digital & optimasi performa konten' : 'Digital campaign conversion analysis & content optimization'
        },
        {
            title: isId ? 'UI/UX Intensive Bootcamp' : 'UI/UX Intensive Bootcamp',
            issuer: 'Rakamin Academy',
            badge: 'Distinction',
            desc: isId ? 'Desain antarmuka, user persona, wireframing & visual hierarchy' : 'Interface design, user personas, wireframing & visual hierarchy'
        },
        {
            title: isId ? 'UX Researcher Intern Certificate' : 'UX Researcher Intern Certificate',
            issuer: 'Digital Amoeba',
            badge: 'Certified',
            desc: isId ? 'Riset tren perilaku audiens & analisis preferensi pengguna' : 'Audience behavioral trend research & user preference analysis'
        },
        {
            title: isId ? 'Sertifikat Kompetensi BNSP' : 'BNSP Competency Certification',
            issuer: 'Badan Nasional Sertifikasi Profesi',
            badge: 'Junior Web Dev',
            desc: isId ? 'Standar kompetensi nasional teknologi web & aset digital' : 'National competency standard in web tech & digital assets'
        }
    ], [isId]);

    const workExperiences = useMemo(() => [
        {
            role: isId ? 'IT Support & Digitalisasi' : 'IT Support & Digitalization Specialist',
            company: 'PT Dharma Controlcable Ind',
            period: isId ? 'Agu 2026 – Saat ini' : 'Aug 2026 – Present',
            location: 'Bekasi, Jawa Barat',
            type: isId ? 'Full-time · Aktif' : 'Full-time · Active',
            typeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
            highlights: [
                {
                    title: isId ? 'Desain Antarmuka & Visual Branding' : 'UI/UX Design & Corporate Branding',
                    desc: isId
                        ? 'Merancang antarmuka visual (UI/UX) sistem digital perusahaan dengan standar visual korporat yang konsisten, modern, dan mudah dipahami pengguna operasional.'
                        : 'Designed enterprise UI/UX interfaces with consistent visual guidelines for operational workflows.'
                },
                {
                    title: isId ? 'Presentasi Eksekutif & Infografis Sistem' : 'Executive Presentations & Smart Factory Infographics',
                    desc: isId
                        ? 'Mengembangkan materi visual presentasi manajemen eksekutif dan infografis alur Smart Factory guna mendukung efektivitas komunikasi lintas divisi.'
                        : 'Authored executive-level visual decks and Smart Factory infographics to streamline inter-departmental communications.'
                },
                {
                    title: isId ? 'Digitalisasi Sistem Operasional' : 'Operational System Digitalization',
                    desc: isId
                        ? 'Mengembangkan platform web Digital PICA dan sistem integrasi pergudangan terpadu untuk efisiensi monitoring proses kerja pabrik.'
                        : 'Engineered web-based Digital PICA and warehouse tracking tools for operational monitoring.'
                }
            ],
            tags: ['UI/UX Design', 'Corporate Visuals', 'Smart Factory Infographics', 'System Digitalization']
        },
        {
            role: isId ? 'Admin Marketplace (Freelance)' : 'Marketplace Specialist & Content Creator (Freelance)',
            company: 'Katalog Produk & Toko Online',
            period: isId ? 'Apr 2026 – Saat ini' : 'Apr 2026 – Present',
            location: 'Freelance · Bekasi / Remote',
            type: isId ? 'Freelance · Aktif' : 'Freelance · Active',
            typeColor: 'bg-accent-pink/10 text-accent-pink border-accent-pink/20',
            highlights: [
                {
                    title: isId ? 'Pengambilan Foto & Retouching Produk' : 'Product Photography & Photo Retouching',
                    desc: isId
                        ? 'Mengambil foto produk fisik secara mandiri, melakukan isolasi objek (masking cutout), penataan lighting, dan retouching bayangan realistis di Adobe Photoshop & Canva guna menghasilkan visual etalase bernilai jual tinggi.'
                        : 'Executed independent product photography, commercial lighting, precision cutout masking, and realistic shadow generation via Photoshop & Canva.'
                },
                {
                    title: isId ? 'Desain Thumbnail & Infografis Spesifikasi' : 'Thumbnail Design & Spec Infographics',
                    desc: isId
                        ? 'Merancang puluhan thumbnail etalase marketplace (Shopee, Tokopedia, TikTok Shop) dengan visual callout fitur, infografis dimensi/kapasitas, dan copy promosi berorientasi konversi (CRO) yang berhasil menekan retur pembeli.'
                        : 'Designed high-converting marketplace thumbnails (Shopee, Tokopedia, TikTok Shop) featuring spec callouts and sizing charts that reduce return rates.'
                },
                {
                    title: isId ? 'Konten Video & Media Sosial' : 'Video Editing & Social Media Trends',
                    desc: isId
                        ? 'Memproduksi video vertikal kreatif (Instagram Reels & TikTok) berbasis tren audio via CapCut, merancang layout feed Instagram yang konsisten, serta menyiapkan materi merchandise promosi.'
                        : 'Produced vertical Reels and TikTok videos synced to trending audios in CapCut, designed cohesive Instagram feeds, and drafted promotional merchandise.'
                },
                {
                    title: isId ? 'Pengelolaan Etalase & Optimasi Toko' : 'Storefront Management & AI Workflows',
                    desc: isId
                        ? 'Mengatur display produk, memperbarui banner kampanye diskon berkala, serta memanfaatkan AI Creative tools (Google Flow) untuk percepatan produksi materi promosi.'
                        : 'Maintained store displays, periodic promo banners, and implemented generative AI workflows (Google Flow) for accelerated asset turnover.'
                }
            ],
            tags: ['Product Photography', 'Adobe Photoshop', 'Canva Pro', 'Marketplace CRO', 'CapCut Video', 'Google Flow AI']
        },
        {
            role: isId ? 'IT Support & Digitalisasi' : 'IT Support & Digitalization Specialist',
            company: 'PT Dharma Polimetal Tbk.',
            period: isId ? 'Okt 2025 – Apr 2026' : 'Oct 2025 – Apr 2026',
            location: 'Bekasi, Jawa Barat',
            type: isId ? 'Full-time' : 'Full-time',
            typeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
            highlights: [
                {
                    title: isId ? 'Kampanye Sosialisasi & Adopsi Digital' : 'Internal Campaign & Digital Adoption (+50%)',
                    desc: isId
                        ? 'Merancang seluruh materi visual kampanye internal dan poster sosialisasi aplikasi meeting room, sukses mendongkrak adopsi pengguna sebesar 50% untuk 1.000+ karyawan.'
                        : 'Created corporate internal marketing campaigns and promotional collateral for a new meeting room app, boosting adoption by 50% across 1,000+ employees.'
                },
                {
                    title: isId ? 'Materi Edukasi Visual K3' : 'K3 Safety Visuals & Hazard Infographics',
                    desc: isId
                        ? 'Mengembangkan grafis edukasi dan infografis Sistem Duga Bahaya guna mempermudah pemahaman keselamatan kerja karyawan di area pabrik.'
                        : 'Authored educational infographics and visual safety guidance for the factory floor hazard prevention system.'
                }
            ],
            tags: ['Internal Visual Campaign', 'Adopsi Pengguna +50%', 'Infografis K3', 'Corporate Comms']
        },
        {
            role: isId ? 'Social Media Specialist' : 'Social Media Specialist',
            company: 'Codetag Studio',
            period: isId ? 'Jul 2025 – Okt 2025' : 'Jul 2025 – Oct 2025',
            location: 'Remote · Bekasi, Jawa Barat',
            type: isId ? 'Specialist' : 'Specialist',
            typeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
            highlights: [
                {
                    title: isId ? 'Desain Konten Instagram & LinkedIn' : 'Instagram & LinkedIn Content Design',
                    desc: isId
                        ? 'Merancang konsep visual, tata letak carousel feed, dan materi promosi siap tayang untuk publikasi resmi media sosial Instagram dan LinkedIn perusahaan menggunakan Figma, Photoshop, dan Canva.'
                        : 'Crafted visual concepts, carousel posts, and ready-to-publish social graphics for Instagram and LinkedIn using Figma, Photoshop, and Canva.'
                },
                {
                    title: isId ? 'Brand Identity & Mockup Showcase' : 'Brand Identity & Client Mockups',
                    desc: isId
                        ? 'Mengembangkan template feed tematik, layout editorial, dan visual mockup produk digital/klien (mockup smartphone, laptop, billboard) dengan penyelesaian 100% tepat waktu sesuai kalender konten.'
                        : 'Created thematic feed templates, editorial styling, and realistic product mockups with a 100% on-time delivery record against content schedules.'
                }
            ],
            tags: ['Social Media Specialist', 'Instagram Feed & Carousel', 'Figma Design', 'Photoshop Mockup']
        }
    ], [isId]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-bg-primary min-h-screen pt-28 pb-24 px-4 sm:px-6 md:px-12 lg:px-16 transition-colors"
        >
            <SEO
                title="Creative Marketing & Visual Production Portfolio | Sulthan Abdi Dzikry"
                description={project.description}
                ogImage={project.image}
            />

            <div className="max-w-6xl mx-auto space-y-16">

                {/* ── Navigation Breadcrumb ── */}
                <div className="flex items-center justify-between">
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors text-xs font-mono uppercase tracking-wider group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        {isId ? 'Kembali ke Semua Proyek' : 'Back to All Projects'}
                    </Link>

                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-[11px] font-bold">
                            <Sparkles size={12} />
                            {isId ? 'Keahlian Desain & Fotografi Komersial' : 'Commercial Design & Photography'}
                        </span>
                    </div>
                </div>

                {/* ── 1. Hero Studio Section ── */}
                <div className="relative rounded-[2.5rem] bg-gradient-to-br from-bg-card via-bg-card/90 to-bg-secondary/40 border border-border p-6 sm:p-10 md:p-14 overflow-hidden shadow-sm">
                    <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-72 h-72 bg-accent-blue/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        {/* Left Details */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="flex flex-wrap items-center gap-2.5">
                                <span className="px-3 py-1 rounded-full bg-accent-pink/10 border border-accent-pink/20 text-accent-pink text-[10px] font-black font-mono uppercase tracking-widest">
                                    Creative Marketing &amp; Visual Studio
                                </span>
                                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black font-mono uppercase tracking-widest">
                                    Conversion-Driven Visuals
                                </span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
                                {isId
                                    ? 'Desain Thumbnail Produk, Fotografi Komersial, & Konten Media Sosial'
                                    : 'Product Thumbnail Design, Commercial Photography & Social Media'}
                            </h1>

                            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
                                {isId
                                    ? 'Menjembatani latar belakang disiplin IT & keahlian UI/UX dengan penguasaan desain grafis mandiri (Canva, Photoshop, Illustrator), teknik pengambilan foto produk, video kreatif CapCut (Reels & TikTok), dan optimasi konversi penjualan bersertifikat Google.'
                                    : 'Bridging an IT & UI/UX engineering foundation with commercial graphic design (Canva, Photoshop, Illustrator), product photography, short-form video editing (Reels & TikTok), and Google-certified conversion rate optimization.'}
                            </p>

                            {/* Core Badges Row */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                {[
                                    'E-Commerce Thumbnail Expert',
                                    'Foto Produk & Retouching',
                                    'Aktif di Instagram & Tren Reels',
                                    'Canva & Adobe Suite',
                                    'UI/UX Design Synergy',
                                    'Google CRO Certified'
                                ].map((badge, idx) => (
                                    <span
                                        key={idx}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-secondary border border-border/80 text-xs font-semibold text-text-primary"
                                    >
                                        <CheckCircle2 size={13} className="text-accent-pink flex-shrink-0" />
                                        {badge}
                                    </span>
                                ))}
                            </div>

                            {/* Quick Action Buttons */}
                            <div className="pt-4 flex flex-wrap items-center gap-3">
                                <a
                                    href="#gallery-section"
                                    className="px-6 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold shadow-lg hover:opacity-90 transition-all flex items-center gap-2"
                                >
                                    <Eye size={14} />
                                    {isId ? 'Lihat 17 Karya Desain' : 'Explore 17 Design Works'}
                                </a>

                                <Link
                                    to="/projects/doors"
                                    className="px-6 py-3 rounded-full border border-border hover:border-accent-pink text-text-primary text-xs font-bold hover:bg-accent-pink/5 transition-all flex items-center gap-2"
                                >
                                    <Layout size={14} className="text-accent-pink" />
                                    {isId ? 'Sinergi Projek UI/UX (Doors)' : 'UI/UX Synergy (Doors)'}
                                    <ArrowUpRight size={13} />
                                </Link>
                            </div>
                        </div>

                        {/* Right Preview Card Showcase */}
                        <div className="lg:col-span-5 relative">
                            <div className="relative group cursor-pointer" onClick={() => handleOpenModal({
                                id: 'cm-main-thumbnail',
                                image: '/projects/creative-marketing/thumbnail.jpg',
                                title: isId ? 'Creative Marketing & Visual Content Showcase' : 'Creative Marketing & Visual Content Showcase',
                                subtitle: 'Digital Marketing & Content Production Thumbnail',
                                category: 'Cover Showcase',
                                tech: ['Figma', 'Photoshop', 'Canva', 'AI Tools', 'Google Flow'],
                                description: isId
                                    ? 'Thumbnail resmi Creative Marketing yang memadukan mockup konten vertikal Instagram Reels & TikTok, fotografi produk komersial, color palette branding, dan aesthetic digital marketing.'
                                    : 'Official Creative Marketing thumbnail blending vertical Instagram/TikTok mockup, commercial product photography, color palette branding, and digital marketing aesthetics.'
                            })}>
                                <div className="absolute -inset-2 bg-gradient-to-r from-accent-pink to-accent-blue rounded-3xl opacity-20 blur-xl group-hover:opacity-40 transition-all duration-500" />
                                <div className="relative bg-bg-card border border-border rounded-2xl p-3 shadow-2xl overflow-hidden">
                                    <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                                        <img
                                            src={project.image}
                                            alt="Creative Marketing Thumbnail"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                            <span className="text-xs font-bold text-white flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
                                                <Maximize2 size={13} /> {isId ? 'Klik untuk Pratinjau Fullscreen' : 'Click for Fullscreen Preview'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <span className="text-[10px] font-mono font-bold text-accent-pink uppercase tracking-widest">
                                            {isId ? 'Thumbnail Portofolio Kreatif' : 'Creative Portfolio Thumbnail'}
                                        </span>
                                        <h3 className="text-sm font-bold text-text-primary truncate mt-0.5">
                                            Digital Marketing &amp; Visual Content Showcase
                                        </h3>
                                        <p className="text-xs text-text-muted mt-1">
                                            {isId ? 'Sinergi visual: Instagram Reels/TikTok mockup, foto produk komersial, & branding palette.' : 'Visual synergy: Instagram Reels/TikTok mockup, commercial product photo, & branding palette.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── 2. Profil Profesional & Rekam Jejak Pengalaman (Setelah Section Pertama) ── */}
                <div className="space-y-8 pt-2">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-pink/10 border border-accent-pink/20 text-accent-pink text-[11px] font-mono font-bold uppercase tracking-wider">
                            <UserCheck size={13} />
                            {isId ? 'Profil Singkat & Rekam Jejak Pengalaman' : 'Professional Profile & Work Experience'}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
                            {isId ? 'Profil Profesional & Pengalaman Terverifikasi' : 'Professional Profile & Verified Career Track'}
                        </h2>
                        <p className="text-xs sm:text-sm text-text-muted">
                            {isId
                                ? 'Memadukan latar belakang IT (S1 Teknik Informatika Telkom University), metodologi UI/UX, dan eksekusi visual kreatif untuk mendorong pertumbuhan bisnis dan konversi.'
                                : 'Bridging computer science IT rigor, UI/UX methodologies, and creative multimedia execution to drive conversions.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* Left Column: Brief Profile Card (Sticky-ready) */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="bg-bg-card border border-border hover:border-accent-pink/40 rounded-[2rem] p-6 sm:p-7 space-y-6 shadow-sm transition-all duration-300">
                                
                                {/* Avatar & Primary Info */}
                                <div className="flex items-center gap-4">
                                    <div className="relative flex-shrink-0">
                                        <img
                                            src="/sulthan.jpg"
                                            alt="Sulthan Abdi Dzikry"
                                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-accent-pink/40 shadow-md"
                                        />
                                        <span
                                            className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-bg-card rounded-full"
                                            title="Active Status"
                                        />
                                    </div>
                                    <div className="space-y-1 min-w-0">
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            {isId ? 'Siap Berkontribusi' : 'Available for Roles'}
                                        </div>
                                        <h3 className="text-xl font-extrabold text-text-primary tracking-tight truncate">
                                            Sulthan Abdi Dzikry
                                        </h3>
                                        <p className="text-xs font-mono text-accent-pink font-semibold uppercase tracking-wider leading-snug">
                                            {isId ? 'IT Support & Digital Multimedia Specialist' : 'IT Support & Digital Multimedia Specialist'}
                                        </p>
                                    </div>
                                </div>

                                {/* Contact & Location Links */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-secondary pt-1 border-t border-border/60">
                                    <div className="flex items-center gap-2 py-1">
                                        <MapPin size={13} className="text-text-muted flex-shrink-0" />
                                        <span>Bekasi / Jakarta, ID</span>
                                    </div>
                                    <a
                                        href="mailto:sulthanabdi1@gmail.com"
                                        className="flex items-center gap-2 py-1 hover:text-accent-pink transition-colors truncate"
                                    >
                                        <Mail size={13} className="text-text-muted flex-shrink-0" />
                                        <span className="truncate">sulthanabdi1@gmail.com</span>
                                    </a>
                                    <a
                                        href="https://wa.me/6288291449821"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 py-1 hover:text-accent-pink transition-colors"
                                    >
                                        <Phone size={13} className="text-text-muted flex-shrink-0" />
                                        <span>+62 882-9144-9821</span>
                                    </a>
                                    <a
                                        href="https://linkedin.com/in/sulthan-abdi-dzikry"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 py-1 hover:text-accent-pink transition-colors"
                                    >
                                        <ExternalLink size={13} className="text-text-muted flex-shrink-0" />
                                        <span>LinkedIn Profile</span>
                                    </a>
                                </div>

                                {/* Summary Bio */}
                                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-border/60 pt-4">
                                    {isId
                                        ? 'Profesional IT lulusan S1 Teknik Informatika Telkom University (IPK 3.52) dengan keahlian komprehensif yang memadukan logika sistem IT, desain antarmuka (UI/UX), dan produksi materi creative multimedia marketing. Memiliki portofolio desain visual multi-industri: properti hunian, kampanye media sosial, visual produk gaya hidup, dan etalase marketplace dengan orientasi optimasi konversi penjualan (CRO).'
                                        : 'IT Professional graduated in Informatics Engineering from Telkom University (GPA 3.52/4.00) bridging systems engineering, UI/UX design, and creative multimedia marketing. Proven portfolio spanning real estate branding, social media campaigns, lifestyle products, and conversion-optimized e-commerce storefronts.'}
                                </p>

                                {/* Formal Education */}
                                <div className="p-4 rounded-xl bg-bg-secondary/70 border border-border/80 space-y-2">
                                    <div className="flex items-center gap-2 text-accent-pink text-xs font-bold uppercase tracking-wider font-mono">
                                        <GraduationCap size={15} />
                                        <span>{isId ? 'Pendidikan Formal' : 'Formal Education'}</span>
                                    </div>
                                    <div className="flex items-baseline justify-between flex-wrap gap-1">
                                        <h4 className="text-xs sm:text-sm font-bold text-text-primary">
                                            S1 Teknik Informatika
                                        </h4>
                                        <span className="text-[11px] font-mono text-text-muted">
                                            2021 – 2025
                                        </span>
                                    </div>
                                    <p className="text-xs text-text-secondary font-medium">
                                        Telkom University · IPK 3.52 / 4.00
                                    </p>
                                    <p className="text-[11px] text-text-muted leading-relaxed">
                                        {isId
                                            ? 'Fokus: Software Engineering, Human-Computer Interaction (HCI), UI/UX Design, dan Digital Business Analysis.'
                                            : 'Focus: Software Engineering, Human-Computer Interaction (HCI), UI/UX Design, and Digital Business Analysis.'}
                                    </p>
                                </div>

                                {/* Certifications */}
                                <div className="space-y-2.5">
                                    <div className="flex items-center gap-2 text-text-muted text-[11px] font-mono font-bold uppercase tracking-wider">
                                        <Award size={14} className="text-accent-pink" />
                                        <span>{isId ? 'Sertifikasi Relevan' : 'Relevant Certifications'}</span>
                                    </div>
                                    <div className="space-y-2">
                                        {certifications.map((cert, idx) => (
                                            <div
                                                key={idx}
                                                className="p-3 rounded-xl bg-bg-secondary/40 border border-border/60 hover:border-accent-pink/30 transition-colors"
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <span className="text-xs font-bold text-text-primary leading-snug">
                                                        {cert.title}
                                                    </span>
                                                    <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-accent-pink/10 text-accent-pink border border-accent-pink/20 whitespace-nowrap flex-shrink-0">
                                                        {cert.badge}
                                                    </span>
                                                </div>
                                                <p className="text-[11px] text-accent-pink/90 font-medium mt-0.5">
                                                    {cert.issuer}
                                                </p>
                                                <p className="text-[10px] text-text-muted mt-0.5 leading-snug">
                                                    {cert.desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Download Action on Profile Card */}
                                <div className="pt-2">
                                    <a
                                        href="/profile/CV_Sulthan_Abdi_Dzikry_Creative_Marketing.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-2.5 px-4 rounded-xl bg-accent-pink text-white text-xs font-bold shadow hover:bg-accent-pink/90 transition-all inline-flex items-center justify-center gap-2 text-center"
                                    >
                                        <Download size={13} />
                                        <span>{isId ? 'Unduh CV Spesialis (PDF)' : 'Download Specialist CV (PDF)'}</span>
                                    </a>
                                </div>

                            </div>
                        </div>

                        {/* Right Column: Work Experience Timeline */}
                        <div className="lg:col-span-7 space-y-4">
                            <div className="flex items-center justify-between pb-1">
                                <div className="flex items-center gap-2 text-text-muted font-mono text-xs uppercase tracking-wider">
                                    <Briefcase size={14} className="text-accent-pink" />
                                    <span>{isId ? 'Riwayat Pengalaman Kerja' : 'Work Experience History'}</span>
                                </div>
                                <span className="text-[10px] font-mono text-text-muted">
                                    {isId ? '4 Posisi Profesional' : '4 Professional Roles'}
                                </span>
                            </div>

                            <div className="space-y-4">
                                {workExperiences.map((exp, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-bg-card border border-border hover:border-accent-pink/40 p-5 sm:p-6 rounded-[1.75rem] transition-all duration-200 space-y-3.5 group shadow-sm"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-border/60 pb-3">
                                            <div>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h4 className="text-base font-extrabold text-text-primary group-hover:text-accent-pink transition-colors">
                                                        {exp.role}
                                                    </h4>
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${exp.typeColor}`}>
                                                        {exp.type}
                                                    </span>
                                                </div>
                                                <p className="text-xs font-semibold text-text-secondary mt-0.5">
                                                    {exp.company}
                                                </p>
                                            </div>

                                            <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-1 text-[11px] font-mono text-text-muted flex-shrink-0">
                                                <span className="flex items-center gap-1.5 font-bold text-text-primary">
                                                    <Calendar size={11} className="text-accent-pink" />
                                                    {exp.period}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MapPin size={10} />
                                                    {exp.location}
                                                </span>
                                            </div>
                                        </div>

                                        <ul className="space-y-2 text-xs text-text-secondary leading-relaxed">
                                            {exp.highlights.map((item, hIdx) => (
                                                <li key={hIdx} className="flex items-start gap-2.5">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-pink mt-1.5 flex-shrink-0" />
                                                    <div>
                                                        <strong className="text-text-primary font-semibold">{item.title}: </strong>
                                                        <span>{item.desc}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                            {exp.tags.map((tag, tIdx) => (
                                                <span
                                                    key={tIdx}
                                                    className="px-2 py-0.5 rounded-md bg-bg-secondary text-[10px] font-mono text-text-muted border border-border/80"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* ── 3. Authentic Social Media Evidence: Codetag Studio in Figma ── */}
                <div className="bg-bg-card border border-border rounded-[2.5rem] p-6 sm:p-10 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-accent-pink flex items-center gap-1.5">
                                <Instagram size={13} />
                                {isId ? 'Bukti Desain Nyata · Codetag Studio' : 'Authentic Design Work · Codetag Studio'}
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
                                {isId
                                    ? 'Perancangan Konten Instagram & LinkedIn di Figma'
                                    : 'Instagram & LinkedIn Content Production in Figma'}
                            </h3>
                            <p className="text-xs sm:text-sm text-text-muted max-w-2xl">
                                {isId
                                    ? 'Sebagai Social Media Specialist di Codetag Studio, memproduksi template feed tematik, layout carousel, visual identity, dan mockup display untuk kampanye media sosial klien.'
                                    : 'As a Social Media Specialist at Codetag Studio, designing thematic feed templates, carousels, brand identities, and promotional mockups in Figma.'}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-mono font-semibold">
                                Figma Workspace
                            </span>
                            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono font-semibold">
                                Instagram &amp; LinkedIn
                            </span>
                        </div>
                    </div>

                    <div
                        className="relative rounded-2xl overflow-hidden border border-border bg-bg-secondary/40 group cursor-pointer"
                        onClick={() => handleOpenModal({
                            id: 'codetag-figma',
                            image: '/projects/creative-marketing/codetag-figma-social-media.png',
                            title: isId ? 'Codetag Studio: Konten Instagram & LinkedIn di Figma' : 'Codetag Studio: Instagram & LinkedIn in Figma',
                            subtitle: 'Figma Social Media Production Canvas',
                            category: 'Social Media',
                            tech: ['Figma', 'Instagram', 'LinkedIn', 'Canva', 'Photoshop'],
                            description: isId
                                ? 'Dokumentasi workspace Figma nyata: perancangan feed Instagram, carousel LinkedIn, mockup smartphone/laptop/billboard, dan kampanye visual klien seperti Grand Telar Residence dan CBL Property.'
                                : 'Authentic Figma workspace: designing Instagram feeds, LinkedIn carousels, gadget/billboard mockups, and client visual campaigns.'
                        })}
                    >
                        <img
                            src="/projects/creative-marketing/codetag-figma-social-media.png"
                            alt="Codetag Studio Figma Workspace"
                            className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500 rounded-xl"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="px-4 py-2 rounded-full bg-black/75 backdrop-blur-sm text-white text-xs font-bold flex items-center gap-2 shadow-xl">
                                <Maximize2 size={14} /> {isId ? 'Perbesar Workspace Figma' : 'Inspect Figma Workspace'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── 4. Interactive Catalog & Multi-Project Gallery Section ── */}
                <div id="gallery-section" className="space-y-8 pt-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="space-y-2">
                            <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-accent-pink">
                                {isId ? 'Galeri Visual Multi-Industri' : 'Multi-Industry Visual Gallery'}
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
                                {isId ? 'Katalog Promosi & Karya Desain Lintas Sektor' : 'Promotional Catalog & Multi-Sector Designs'}
                            </h2>
                            <p className="text-xs sm:text-sm text-text-muted">
                                {isId
                                    ? 'Menampilkan karya desain properti, kampanye media sosial, produk gaya hidup, aplikasi mobile, dan katalog e-commerce.'
                                    : 'Showcasing real estate branding, social media campaigns, lifestyle products, mobile travel apps, and e-commerce.'}
                            </p>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-bg-card border border-border">
                            {filterTabs.map(tab => {
                                const isActive = activeFilter === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveFilter(tab.id)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                            isActive
                                                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                                                : 'text-text-muted hover:text-text-primary hover:bg-bg-secondary'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredGallery.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.25 }}
                                    onClick={() => handleOpenModal(item)}
                                    className="group cursor-pointer rounded-2xl bg-bg-card border border-border hover:border-accent-pink/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                                >
                                    {/* Thumbnail Image Container */}
                                    <div className="relative aspect-video w-full overflow-hidden bg-bg-secondary/40 flex items-center justify-center p-2">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-lg"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transform group-hover:scale-105 transition-transform">
                                                <Maximize2 size={13} /> {isId ? 'Perbesar' : 'Inspect'}
                                            </span>
                                        </div>
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-[9px] font-mono font-bold uppercase tracking-wider">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                                        <div>
                                            <h4 className="text-sm font-bold text-text-primary group-hover:text-accent-pink transition-colors line-clamp-1">
                                                {item.title}
                                            </h4>
                                            {item.subtitle && (
                                                <p className="text-[11px] font-mono text-text-muted mt-0.5 line-clamp-1">
                                                    {item.subtitle}
                                                </p>
                                            )}
                                            <p className="text-xs text-text-secondary leading-relaxed mt-2 line-clamp-2">
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* Tech Badges */}
                                        {item.tech && item.tech.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/60">
                                                {item.tech.map((t, tidx) => (
                                                    <span
                                                        key={tidx}
                                                        className="px-2 py-0.5 rounded bg-bg-secondary border border-border/80 text-[10px] font-mono font-medium text-text-muted"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* ── 5. Creative Technology Stack & Workflow Breakdown ── */}
                <div className="space-y-6 pt-4">
                    <div className="text-center max-w-xl mx-auto space-y-2">
                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-accent-pink">
                            Creative Technology Stack
                        </span>
                        <h2 className="text-2xl font-bold text-text-primary">
                            {isId ? 'Alat Kerja & Workflow Kreatif' : 'Creative Workflow & Toolset'}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {project.techStackDetails?.map((tech, idx) => (
                            <div
                                key={idx}
                                className="p-5 rounded-2xl bg-bg-card border border-border hover:border-accent-pink/30 transition-colors space-y-3"
                            >
                                <div className="flex items-center justify-between">
                                    <h4 className="font-bold text-sm text-text-primary">{tech.name}</h4>
                                    <span className="text-[9px] font-mono text-accent-pink uppercase font-semibold">
                                        {tech.category}
                                    </span>
                                </div>
                                <p className="text-xs text-text-secondary leading-relaxed">
                                    {tech.role}
                                </p>
                                {tech.highlights && (
                                    <ul className="space-y-1 pt-1 border-t border-border/60">
                                        {tech.highlights.map((h, hidx) => (
                                            <li key={hidx} className="text-[11px] text-text-muted flex items-start gap-1.5">
                                                <div className="w-1 h-1 rounded-full bg-accent-pink mt-1.5 flex-shrink-0" />
                                                <span>{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── 6. The 4 Skill Pillars (Skills Tailored to Creative Marketing) ── */}
                <div className="space-y-6 pt-4">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-accent-pink">
                            Core Capabilities
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
                            {isId ? 'Keahlian yang Menjawab Kebutuhan Lowongan' : 'Skills Tailored to Creative Marketing'}
                        </h2>
                        <p className="text-xs sm:text-sm text-text-muted">
                            {isId
                                ? 'Penyelarasan komprehensif antara latar belakang teknis IT dengan kebutuhan visual marketing modern.'
                                : 'Comprehensive alignment between IT engineering and modern visual marketing requirements.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Pillar 1: Photography & Retouching */}
                        <div className="bg-bg-card border border-border hover:border-accent-pink/40 p-6 sm:p-8 rounded-[2rem] space-y-4 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <Camera size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-text-primary">
                                {isId ? '1. Pengambilan Foto Produk & Photo Retouching' : '1. Product Photography & Photo Retouching'}
                            </h3>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                {isId
                                    ? 'Mampu mengambil foto produk fisik mandiri dengan penataan tata cahaya dan komposisi angle komersial. Dilanjutkan proses isolasi objek (masking cutout), manipulasi bayangan realistis, dan perbaikan tone warna menggunakan Adobe Photoshop & Canva untuk menghasilkan visual hero etalase bernilai jual tinggi.'
                                    : 'Capable of capturing original product photos with commercial lighting and angles. Executing background cutout masking, realistic drop-shadow generation, and high-contrast color grading via Photoshop and Canva.'}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {['Foto Produk Asli', 'Photoshop Masking', 'Lighting & Shadows', 'Color Grading'].map((tag, i) => (
                                    <span key={i} className="px-2.5 py-1 rounded-md bg-bg-secondary text-[11px] font-mono text-text-muted border border-border">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Pillar 2: E-Commerce Thumbnail & Canva/Adobe */}
                        <div className="bg-bg-card border border-border hover:border-accent-pink/40 p-6 sm:p-8 rounded-[2rem] space-y-4 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <ShoppingBag size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-text-primary">
                                {isId ? '2. Desain Thumbnail Produk E-Commerce & Canva Mastery' : '2. E-Commerce Thumbnail Design & Canva Mastery'}
                            </h3>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                {isId
                                    ? 'Spesialisasi merancang thumbnail marketplace (Shopee, Tokopedia, TikTok Shop) dengan visual hierarchy yang terstruktur: callout benefit utama, diagram spesifikasi dimensi, dan copywriting persuasif yang terbukti menaikkan rasio klik dan menekan retur pesanan.'
                                    : 'Specialized in crafting marketplace product thumbnails (Shopee, Tokopedia, TikTok Shop) with structured visual hierarchy: benefit callouts, dimension sizing guides, and persuasive copy that boosts CTR and reduces returns.'}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {['Canva Pro Suite', 'Adobe Illustrator', 'Thumbnail Marketplace', 'CTR Optimization'].map((tag, i) => (
                                    <span key={i} className="px-2.5 py-1 rounded-md bg-bg-secondary text-[11px] font-mono text-text-muted border border-border">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Pillar 3: Active Instagram & Reels/TikTok Video */}
                        <div className="bg-bg-card border border-border hover:border-accent-pink/40 p-6 sm:p-8 rounded-[2rem] space-y-4 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <Instagram size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-text-primary">
                                {isId ? '3. Pengguna Aktif Instagram & Video Tren (Reels/TikTok)' : '3. Active Instagram User & Trending Video (Reels/TikTok)'}
                            </h3>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                {isId
                                    ? 'Aktif di platform Instagram sehingga memiliki intuisi tajam terhadap tren audio viral, ritme pacing video pendek (9:16 vertical), estetika kurasi feed grid, dan formula hook 3 detik pertama untuk memaksimalkan retensi audiens di Reels dan TikTok via CapCut.'
                                    : 'Active on Instagram with keen intuition for viral audio trends, short-form video pacing (9:16 vertical), feed grid aesthetics, and 3-second hook strategies to maximize audience retention across Reels and TikTok using CapCut.'}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {['Aktif di Instagram', 'CapCut Video Editing', 'Trending Audio Sync', 'Hook 3 Detik'].map((tag, i) => (
                                    <span key={i} className="px-2.5 py-1 rounded-md bg-bg-secondary text-[11px] font-mono text-text-muted border border-border">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Pillar 4: Versatile Visuals & Merchandise */}
                        <div className="bg-bg-card border border-border hover:border-accent-pink/40 p-6 sm:p-8 rounded-[2rem] space-y-4 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <Palette size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-text-primary">
                                {isId ? '4. Kebutuhan Visual Serba Bisa & Merchandise Korporat' : '4. Versatile Visual Needs & Corporate Merchandise'}
                            </h3>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                {isId
                                    ? 'Kemampuan desain menyeluruh yang fleksibel untuk beragam media fisik maupun digital: perancangan seragam kerja/wearpack korporat, merchandise promosi, banner event/industrial B2B, pamflet layanan, hingga packaging siap cetak.'
                                    : 'Comprehensive, multi-format design versatility across physical and digital media: corporate uniform/wearpack design, promotional merchandise, B2B industrial banners, service pamphlets, and print-ready packaging.'}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {['Desain Seragam', 'Merchandise Promosi', 'Banner Industrial B2B', 'Branding Identitas'].map((tag, i) => (
                                    <span key={i} className="px-2.5 py-1 rounded-md bg-bg-secondary text-[11px] font-mono text-text-muted border border-border">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* ── 7. Design Craftsmanship: UI/UX Foundation Card ── */}
                <div className="bg-gradient-to-r from-bg-card via-bg-secondary/60 to-bg-card border border-accent-pink/30 rounded-[2.5rem] p-6 sm:p-10 relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-8 space-y-4">
                            <div className="flex items-center gap-2 text-accent-pink font-mono text-xs font-bold uppercase tracking-widest">
                                <Layers size={14} />
                                {isId ? 'Sinergi Latar Belakang IT & UI/UX' : 'IT & UI/UX Engineering Synergy'}
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
                                {isId
                                    ? 'Keahlian Desain Berakar dari Disiplin UI/UX Enterprise'
                                    : 'Design Craftsmanship Rooted in Enterprise UI/UX Rigor'}
                            </h3>
                            <p className="text-sm text-text-secondary leading-relaxed max-w-2xl">
                                {isId
                                    ? 'Desain marketing visual ini bukan sekadar dekorasi, melainkan menerapkan disiplin User Experience (UX): pemahaman hirarki informasi, design system konsisten, tipografi berskala, dan psikologi audiens yang telah dipraktikkan pada proyek UI/UX sebelumnya seperti Doors Nonconformity Management System dan AIS Backend.'
                                    : 'Visual marketing design grounded in user experience discipline: information architecture, scalable typography, design systems, and behavioral psychology previously honed in enterprise systems like the Doors Nonconformity System and AIS Backend.'}
                            </p>
                            <div className="flex flex-wrap gap-3 pt-2">
                                <Link
                                    to="/projects/doors"
                                    className="px-5 py-2.5 rounded-full bg-accent-pink text-white text-xs font-bold shadow-md hover:bg-accent-pink/90 transition-all inline-flex items-center gap-2"
                                >
                                    {isId ? 'Buka Proyek UI/UX Doors' : 'Explore Doors UI/UX Project'}
                                    <ArrowUpRight size={13} />
                                </Link>
                                <Link
                                    to="/projects/ais-backend"
                                    className="px-5 py-2.5 rounded-full border border-border hover:border-accent-pink text-text-primary text-xs font-bold transition-all inline-flex items-center gap-2"
                                >
                                    {isId ? 'Lihat Proyek AIS Backend' : 'Explore AIS Backend'}
                                    <ArrowUpRight size={13} />
                                </Link>
                            </div>
                        </div>

                        <div className="lg:col-span-4 bg-bg-card/80 border border-border p-6 rounded-2xl space-y-3">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted">
                                {isId ? 'Nilai Tambah untuk Perusahaan' : 'Business Value Added'}
                            </span>
                            <ul className="space-y-2 text-xs text-text-secondary">
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-pink flex-shrink-0" />
                                    <span>{isId ? 'Standarisasi aset visual lintas departemen' : 'Cross-department visual standardization'}</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-pink flex-shrink-0" />
                                    <span>{isId ? 'Kecepatan produksi aset dengan alur kerja AI' : 'Rapid asset generation with AI workflows'}</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-pink flex-shrink-0" />
                                    <span>{isId ? 'Orientasi data: A/B testing & Google CRO' : 'Data-driven: A/B testing & Google CRO'}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ── 8. Footer Call-to-Action ── */}
                <div className="text-center py-12 border-t border-border/80 space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
                        {isId ? 'Tertarik Meninjau Portofolio Lebih Lengkap?' : 'Interested in Reviewing Full Portfolio?'}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-muted max-w-lg mx-auto">
                        {isId
                            ? 'Dokumen CV spesialis dan draft lamaran telah disiapkan khusus untuk posisi Creative Marketing Staff di PT Atrindo Asia Global.'
                            : 'Tailored CV and application documents are prepared specifically for the Creative Marketing role.'}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 pt-2">
                        <a
                            href="/profile/CV_Sulthan_Abdi_Dzikry_Creative_Marketing.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2.5 rounded-full bg-accent-pink text-white text-xs font-bold shadow-md hover:bg-accent-pink/90 transition-all inline-flex items-center gap-2"
                        >
                            <Download size={13} /> {isId ? 'Unduh CV Spesialis (PDF)' : 'Download Specialist CV (PDF)'}
                        </a>
                        <Link
                            to="/projects"
                            className="px-6 py-2.5 rounded-full border border-border text-text-primary text-xs font-bold hover:bg-bg-secondary transition-all inline-flex items-center gap-2"
                        >
                            <ArrowLeft size={13} /> {isId ? 'Semua Proyek' : 'All Projects'}
                        </Link>
                    </div>
                </div>

            </div>

            {/* ── Fullscreen Modal Preview ── */}
            <ShowcaseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                items={galleryItems}
                initialIndex={selectedModalIndex}
                projectTitle={project.title}
            />
        </motion.div>
    );
};

export default CreativeMarketingStudio;
