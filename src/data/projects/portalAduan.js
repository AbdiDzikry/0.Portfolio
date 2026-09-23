export const portalAduanProject = {
    id: 'portal-aduan',
    title: 'Digital PICA (Problem Identification Corrective Action)',
    isTrialData: true,
    category: 'Quality Management',
    image: '/projects/12-portal-aduan/1. login.png',
    showcaseImages: [
        '/projects/12-portal-aduan/1. login.png',
        '/projects/12-portal-aduan/2. dashboard.png',
        '/projects/12-portal-aduan/3. List PICA.png',
        '/projects/12-portal-aduan/4. input PICA.png',
        '/projects/12-portal-aduan/5. Core Team.png',
        '/projects/12-portal-aduan/6. Schedule Meeting.png',
        '/projects/12-portal-aduan/7. informasi pica.png',
        '/projects/12-portal-aduan/8. problem solving dan action plan.png',
        '/projects/12-portal-aduan/9. verifikasi efektifitas.png',
        '/projects/12-portal-aduan/10. role based access control.png',
        '/projects/12-portal-aduan/11. list meeting diskusi.png'
    ],
    // ── Interactive Showcase Metadata ──
    galleryItems: [
        {
            id: 'pica-login',
            image: '/projects/12-portal-aduan/1. login.png',
            title: 'Login & Autentikasi Pengguna Terintegrasi',
            subtitle: 'Secure Multi-Department Portal Access',
            category: 'Security',
            tech: ['Next.js', 'Express', 'JWT'],
            description: 'Gerbang masuk terenkripsi dengan autentikasi berbasis stateless token JWT untuk memastikan akses pengguna terisolasi sesuai divisi dan hierarki wewenangnya.'
        },
        {
            id: 'pica-dashboard',
            image: '/projects/12-portal-aduan/2. dashboard.png',
            title: 'Executive Dashboard & KPI PICA',
            subtitle: 'Real-time Quality Management Overview',
            category: 'Dashboard',
            tech: ['Next.js', 'Recharts', 'Express'],
            description: 'Tampilan eksekutif real-time yang memantau ringkasan tiket aktif PICA, status penanganan (open, in-progress, closed), rasio penyelesaian tepat waktu, serta peringatan tiket overdue lintas departemen.'
        },
        {
            id: 'pica-list',
            image: '/projects/12-portal-aduan/3. List PICA.png',
            title: 'Daftar & Pemantauan Tiket PICA Terpusat',
            subtitle: 'Centralized Issue Tracking Table',
            category: 'Workflow',
            tech: ['Next.js', 'MongoDB', 'Express'],
            description: 'Tabel kendali terpusat dengan filter pintar berdasarkan status alur PICA, nomor lot, klasifikasi cacat, departemen PIC, serta indikator visual deadline untuk mencegah keterlambatan.'
        },
        {
            id: 'pica-input',
            image: '/projects/12-portal-aduan/4. input PICA.png',
            title: 'Formulir Registrasi & Input Masalah PICA',
            subtitle: 'Standardized Incident Registration',
            category: 'Workflow',
            tech: ['Next.js', 'TypeScript'],
            description: 'Formulir input tiket temuan ketidaksesuaian produk yang terstandarisasi dengan data nomor lot, part number, klasifikasi tingkat keparahan, deskripsi cacat, dan lampiran foto bukti temuan.'
        },
        {
            id: 'pica-core-team',
            image: '/projects/12-portal-aduan/5. Core Team.png',
            title: 'Pembentukan Tim Khusus (Core Team)',
            subtitle: 'Cross-Functional Problem Solving Team',
            category: 'Kolaborasi',
            tech: ['Next.js', 'Express', 'MongoDB'],
            description: 'Penugasan struktur Core Team multidisiplin (Leader, Champion, Member dari QC, Produksi, dan Engineering) untuk memimpin investigasi dan eksekusi solusi penanganan masalah.'
        },
        {
            id: 'pica-schedule-meeting',
            image: '/projects/12-portal-aduan/6. Schedule Meeting.png',
            title: 'Penjadwalan Meeting & Koordinasi PICA',
            subtitle: 'Cross-Department Alignment Session',
            category: 'Kolaborasi',
            tech: ['Next.js', 'Express'],
            description: 'Modul penjadwalan meeting sinkron antar departemen untuk menyepakati investigasi ketidaksesuaian, dilengkapi integrasi kalender dan undangan otomatis kepada seluruh Core Team.'
        },
        {
            id: 'pica-info-detail',
            image: '/projects/12-portal-aduan/7. informasi pica.png',
            title: 'Informasi Detail & Identifikasi Masalah',
            subtitle: 'Detailed Problem Identification',
            category: 'Investigasi',
            tech: ['Next.js', 'TypeScript'],
            description: 'Ringkasan komprehensif profil kasus PICA yang merinci kronologi temuan, data teknis produk, batas toleransi cacat, dan dampak kualitas yang teridentifikasi di lini produksi.'
        },
        {
            id: 'pica-problem-solving',
            image: '/projects/12-portal-aduan/8. problem solving dan action plan.png',
            title: 'Problem Solving (Why-Why) & Action Plan',
            subtitle: 'Root Cause Deep Investigation & Corrective Actions',
            category: 'Investigasi',
            tech: ['TypeScript', 'MongoDB'],
            description: 'Investigasi bertingkat dengan metode 5-Why terstruktur untuk menemukan akar penyebab masalah, dilanjutkan dengan perumusan tindakan korektif dan preventif dengan tenggat waktu spesifik.'
        },
        {
            id: 'pica-verification',
            image: '/projects/12-portal-aduan/9. verifikasi efektifitas.png',
            title: 'Verifikasi Efektivitas Sebelum Penutupan',
            subtitle: 'Effectiveness Assessment & Sign-Off Flow',
            category: 'Verifikasi',
            tech: ['TypeScript', 'Express'],
            description: 'Tahap evaluasi berjenjang oleh tim Quality Assurance untuk menguji efektivitas perbaikan selama masa observasi sebelum tiket PICA diizinkan ditutup secara permanen.'
        },
        {
            id: 'pica-rbac',
            image: '/projects/12-portal-aduan/10. role based access control.png',
            title: 'Manajemen Hak Akses & RBAC',
            subtitle: 'Granular Role-Based Access Control',
            category: 'Security',
            tech: ['Express', 'TypeScript'],
            description: 'Konfigurasi otorisasi bertingkat yang menyesuaikan hak akses menu, persetujuan (approval), dan tombol tindakan untuk berbagai peran (QC Inspector, Dept Head, Plant Manager) dengan token JWT.'
        },
        {
            id: 'pica-meeting-list',
            image: '/projects/12-portal-aduan/11. list meeting diskusi.png',
            title: 'Daftar & Notulen Diskusi Koordinasi',
            subtitle: 'Meeting Minutes & Action Logs',
            category: 'Kolaborasi',
            tech: ['MongoDB', 'Express'],
            description: 'Pusat dokumentasi seluruh notulen diskusi klarifikasi PICA, mencakup absensi kehadiran tim, poin kesepakatan, dan log eskalasi perbaikan untuk transparansi audit.'
        }
    ],
    techStackDetails: [
        {
            name: 'Next.js',
            category: 'Frontend Framework',
            role: 'Server-Side Rendering (SSR) & App Router untuk performa render dashboard cepat, isolasi rute per departemen, dan optimasi gambar bukti ketidaksesuaian.',
            highlights: [
                'App Router Architecture dengan performa render cepat',
                'Modular layout untuk isolasi navigasi per role',
                'Optimasi gambar otomatis untuk screenshot bukti cacat'
            ]
        },
        {
            name: 'TypeScript',
            category: 'Programming Language',
            role: 'Type-safety menyeluruh untuk validasi alur investigasi Why-Why, integritas data tiket, dan meminimalisir runtime error pada proses operasional.',
            highlights: [
                'Strict Interface Typing untuk siklus hidup tiket PICA',
                'Validasi kontrak data antara frontend dan backend API',
                'Pencegahan inkonsistensi status tiket pada alur approval'
            ]
        },
        {
            name: 'Express',
            category: 'Backend REST API',
            role: 'RESTful API server berkecepatan tinggi yang mengelola otentikasi JWT, otorisasi 8 role RBAC, dan automasi monitoring tenggat waktu (deadline).',
            highlights: [
                'Arsitektur controller modular dan middleware RBAC',
                'Otentikasi aman berbasis stateless JWT',
                'Automasi deteksi tiket overdue dan scheduler notifikasi'
            ]
        },
        {
            name: 'MongoDB',
            category: 'NoSQL Database',
            role: 'Penyimpanan dokumen fleksibel untuk riwayat investigasi Why-Why berjenjang, notulen meeting dinamis, serta audit trail kepatuhan mutu.',
            highlights: [
                'Skema dokumen fleksibel untuk formulir investigasi dinamis',
                'Indexing pada ID tiket, tanggal, dan status penyelesaian',
                'Aggregation pipeline untuk kalkulasi metrik KPI dashboard'
            ]
        },
        {
            name: 'Recharts',
            category: 'Data Visualization',
            role: 'Visualisasi analitik interaktif untuk distribusi ketidaksesuaian produk, tren bulanan, dan rasio penyelesaian per departemen pada dashboard eksekutif.',
            highlights: [
                'Grafik interaktif dengan responsif SVG & custom tooltips',
                'Visualisasi Pareto & Pie chart untuk analisis jenis cacat',
                'Sinkronisasi real-time dengan status tiket terbaru'
            ]
        }
    ],
    tagline: 'Quality Issue Tracking & Problem Identification Corrective Action System.',
    description: 'Web-based issue tracker digitizing quality management: cross-department collaboration to report, analyze root cause, and resolve product quality issues through structured Problem Identification Corrective Action (PICA).',
    problem: 'Quality issue tracking lacked inter-department transparency: hard to monitor handling progress, lost root-cause history, and many fixes missing deadlines.',
    solution: 'Centralized platform where every PICA ticket follows a structured resolution flow: investigation, Core Team assignment with deadlines, and effectiveness verification before closure.',
    impact: 'Real-time KPI dashboard helps management monitor quality performance and reduce overdue resolutions.',
    status: 'COMPLETED',
    benefits: 'Production, QC, Engineering & Management Teams',
    vision: 'Transparent accountable quality management and PICA resolution across manufacturing divisions.',
    strategicAlignment: 'Supports Smart Factory quality digitalization with a centralized auditable issue-resolution and PICA workflow.',
    team: 'Sulthan Abdi Dzikry (Full-stack Web Developer)',
    tags: ['Next.js', 'TypeScript', 'Express', 'MongoDB', 'Recharts'],
    size: 'large',
    problemMap: [
        { problem: 'No Handling Visibility', context: 'Hard to monitor how far an issue was being handled.', solution: 'PICA Tracking Flow', mitigation: 'Every report moves through report, meeting, root cause, and action plan stages.' },
        { problem: 'Lost Root-Cause History', context: 'Analysis history disappeared across departments.', solution: 'Why-Why Analysis Module', mitigation: 'Deep investigation records preserved per ticket with meeting minutes.' },
        { problem: 'Overdue Action Plans', context: 'Many fixes passed their deadlines unnoticed.', solution: 'Automated Monitoring', mitigation: 'Action plans auto-assigned with deadline tracking and final verification.' }
    ],
    stats: [
        { label: 'Roles', value: '8', description: 'RBAC divisions covered.' },
        { label: 'KPI View', value: 'Real-time', description: 'Open, closed, overdue metrics.' },
        { label: 'Flow', value: 'End-to-end', description: 'Report to verified closure.' },
        { label: 'Auth', value: 'JWT', description: 'Secure role-based access.' }
    ],
    timeline: [
        { phase: 'Analysis', period: 'Week 1-2', activities: ['Business flow mapping', 'UI/UX architecture', 'RBAC design'] },
        { phase: 'Development', period: 'Week 3-6', activities: ['Next.js frontend', 'Express API integration', 'Dashboard and Recharts'] },
        { phase: 'QA', period: 'Week 7', activities: ['Logic audit', 'Flow testing', 'Handoff'] }
    ],
    personas: [
        { role: 'QC Staff', pain: 'Issues reported informally with no tracking.', goal: 'Structured PICA ticket with clear ownership.' },
        { role: 'Management', pain: 'No KPI visibility on quality performance.', goal: 'Real-time dashboard with overdue alerts.' }
    ],
    businessModel: [
        { type: 'Quality Transparency', value: 'Centralized tickets make every issue auditable.' },
        { type: 'On-time Resolution', value: 'Deadline monitoring reduces overdue fixes.' }
    ],
    beforeAfter: [
        { aspect: 'Reporting', before: 'Informal, scattered reports', after: 'Centralized PICA ticket system' },
        { aspect: 'Root Cause', before: 'History often lost', after: 'Why-Why analysis archived' },
        { aspect: 'Action Plans', before: 'Manual follow-up, missed deadlines', after: 'Auto-assigned with deadline tracking' },
        { aspect: 'Verification', before: 'Closed without validation', after: 'Tiered verification before closure' }
    ],
    mitigationPlans: [
        { risk: 'Logic Loopholes', action: 'QA audit of every operational flow edge case.' },
        { risk: 'Access Misuse', action: 'JWT auth with menu and button-level RBAC.' }
    ],
    investmentRequired: '7 Weeks Design and Development / 1 Full-stack Developer',
    assumptions: `1. Structured flow improves cross-department accountability.
2. Real-time KPI reduces overdue resolutions.`,
    productArchitecture: 'Next.js App Router (Frontend), Express (Backend), MongoDB (Database), Recharts',
    coreFeatures: [
        { name: 'Executive Dashboard', desc: 'Real-time KPI: open, closed, and overdue cases.' },
        { name: 'RBAC 8 Roles', desc: 'Menus and buttons adapted per authority.' },
        { name: 'Why-Why Analysis', desc: 'Root-cause investigation with meeting minutes.' },
        { name: 'Action Monitoring', desc: 'Auto-assigned tasks with deadline tracking.' }
    ],
    background: 'Before this system, quality tracking lacked transparency. I translated operational flows into an intuitive web platform with full frontend development and complex API integration to execute end-to-end Problem Identification Corrective Action (PICA).',
    translations: {
        id: {
            title: 'Digital PICA (Problem Identification Corrective Action)',
            tagline: 'Sistem Pelacakan Mutu & Problem Identification Corrective Action Terintegrasi.',
            description: 'Platform digitalisasi manajemen kualitas berbasis web untuk kolaborasi lintas departemen dalam melaporkan, menganalisis akar masalah, dan mengeksekusi tindakan korektif-preventif (PICA) secara transparan dan akuntabel.',
            problem: 'Pelacakan masalah kualitas minim transparansi: sulit memantau progres, riwayat root cause hilang, dan banyak perbaikan melewati deadline.',
            solution: 'Platform terpusat dengan alur penyelesaian terstruktur: registrasi masalah, investigasi Core Team berdeadline, dan verifikasi efektivitas sebelum penutupan.',
            impact: 'Dashboard KPI real-time membantu manajemen memantau performa kualitas dan menekan rasio overdue.',
            status: 'SELESAI',
            benefits: 'Tim Produksi, QC, Engineering dan Manajemen',
            vision: 'Manajemen kualitas yang transparan dan akuntabel lintas departemen melalui alur PICA digital.',
            strategicAlignment: 'Mendukung digitalisasi kualitas Smart Factory dengan alur penyelesaian PICA yang terpusat dan teraudit.',
            background: 'Sebelum sistem ini, pelacakan kualitas minim transparansi. Saya menerjemahkan alur operasional menjadi platform web yang intuitif dengan development frontend penuh dan integrasi API kompleks untuk alur Problem Identification Corrective Action.',
            investmentRequired: '7 Minggu Desain dan Development / 1 Full-stack Developer',
            assumptions: `1. Alur terstruktur meningkatkan akuntabilitas lintas departemen.
2. KPI real-time menekan penyelesaian overdue.`,
            productArchitecture: 'Next.js App Router (Frontend), Express (Backend), MongoDB (Database), Recharts'
        }
    }
};