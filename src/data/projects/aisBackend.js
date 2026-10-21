export const aisBackendProject = {
    id: 'ais-backend',
    title: 'Automated Integrated System',
    experience: 'dharma-controlcable',
    isTrialData: true,
    category: 'Smart Factory',
    image: '/projects/11-ais-backend/thumbnail-ais.jpeg',
    showcaseImages: [
        '/projects/11-ais-backend/thumbnail-ais.jpeg',
        '/projects/11-ais-backend/Fitur Scan In Label Incoming Material.png',
        '/projects/11-ais-backend/Fitur Assign Bin dan Alokasi Rak .png',
        '/projects/11-ais-backend/menu Stock On Rack Management.png',
        '/projects/11-ais-backend/Fitur Scan rack Information.png',
        '/projects/11-ais-backend/Fitur Outgoing goods BKB.png',
        '/projects/11-ais-backend/2. Meeting Mingguan Digitalisasi AIS.jpeg',
        '/projects/11-ais-backend/5. Sosialisasi dan UAT Finish Good.jpeg',
        '/projects/11-ais-backend/1. Proses Pengerjaan Projek Tracking Order.jpeg',
        '/projects/11-ais-backend/3. Sosialisasi Tracking Order Bersama User.jpeg',
        '/projects/11-ais-backend/4. Report Pengembangan Projek Digital PICA.jpeg',
        '/projects/11-ais-backend/1.png',
        '/projects/11-ais-backend/2.png',
        '/projects/11-ais-backend/3.png',
        '/projects/11-ais-backend/4.png',
        '/projects/11-ais-backend/5.png',
        '/projects/11-ais-backend/6.png'
    ],
    // ── Interactive Showcase Pilot Metadata ──
    galleryItems: [
        // ── FITUR PROJEK AIS ──
        {
            id: 'scan-in-incoming',
            image: '/projects/11-ais-backend/Fitur Scan In Label Incoming Material.png',
            title: 'Scan In Label Incoming Material',
            subtitle: 'Fitur Projek AIS · Validasi Label Vendor',
            category: 'Fitur Projek',
            tech: ['React 18', 'Laravel 8', 'MongoDB 7.0'],
            description: 'Pencatatan dan verifikasi barcode label incoming material dari vendor terhadap surat jalan fisik dan Purchase Order aktif.'
        },
        {
            id: 'assign-bin-alokasi',
            image: '/projects/11-ais-backend/Fitur Assign Bin dan Alokasi Rak .png',
            title: 'Assign Bin & Alokasi Rak Fisik',
            subtitle: 'Fitur Projek AIS · Rekomendasi Rak Bertingkat',
            category: 'Fitur Projek',
            tech: ['Laravel 8', 'MongoDB 7.0', 'SAP RFC 101'],
            description: 'Penarikan antrean material status GR SAP Posted dan algoritma rekomendasi alokasi box ke rak penyimpanan (Sloc) gudang.'
        },
        {
            id: 'stock-on-rack',
            image: '/projects/11-ais-backend/menu Stock On Rack Management.png',
            title: 'Stock On Rack Management',
            subtitle: 'Fitur Projek AIS · Monitoring Saldo Rak',
            category: 'Fitur Projek',
            tech: ['React 18', 'Express.js', 'Socket.IO'],
            description: 'Dashboard pemantauan ketersediaan saldo part per slot rak gudang dengan filter lot, status inspeksi, dan kapasitas tampung.'
        },
        {
            id: 'scan-rack-info',
            image: '/projects/11-ais-backend/Fitur Scan rack Information.png',
            title: 'Scan Rack Information Audit',
            subtitle: 'Fitur Projek AIS · Audit Fisik Lapangan',
            category: 'Fitur Projek',
            tech: ['React 18', 'Laravel 8', 'Debounce Guard'],
            description: 'Fitur audit bergerak bagi operator: scan barcode rak fisik untuk menampilkan persentase keterisian dan rincian seluruh lot tersimpan.'
        },
        {
            id: 'outgoing-bkb',
            image: '/projects/11-ais-backend/Fitur Outgoing goods BKB.png',
            title: 'Outgoing Goods BKB (Bukti Keluar Barang)',
            subtitle: 'Fitur Projek AIS · Rilis Perakitan & Dispatch',
            category: 'Fitur Projek',
            tech: ['React 18', 'Node.js', 'SAP RFC 311'],
            description: 'Verifikasi pemindahan material ke lini perakitan (BKB) terhubung kalkulator BOM dan sinkronisasi mutasi ke sistem SAP.'
        },

        // ── AKTIVITAS & KOLABORASI MAGANG AIS & DIGITALISASI DCI ──
        {
            id: 'activity-weekly-meeting',
            image: '/projects/11-ais-backend/2. Meeting Mingguan Digitalisasi AIS.jpeg',
            title: 'Meeting Mingguan Digitalisasi AIS',
            subtitle: 'Aktivitas Magang · Koordinasi Lintas Departemen',
            category: 'Aktivitas Magang',
            tech: ['Cross Department', 'Weekly Sync', 'IT Team'],
            description: 'Sesi rapat koordinasi mingguan bersama tim IT dan perwakilan departemen operasional untuk evaluasi modul pergudangan dan integrasi SAP.'
        },
        {
            id: 'activity-uat-fg',
            image: '/projects/11-ais-backend/5. Sosialisasi dan UAT Finish Good.jpeg',
            title: 'Sosialisasi & UAT Finish Good AIS',
            subtitle: 'Aktivitas Magang · Pengujian Lapangan Gudang FG',
            category: 'Aktivitas Magang',
            tech: ['UAT Testing', 'Warehouse Team', 'PPIC'],
            description: 'Simulasi alur penerimaan box kabel jadi (FG Put-Away) dan pengujian pemindaian barcode packing bersama tim operasional gudang Finish Good.'
        },
        {
            id: 'activity-dev-tracking',
            image: '/projects/11-ais-backend/1. Proses Pengerjaan Projek Tracking Order.jpeg',
            title: 'Proses Pengerjaan Projek Tracking Order',
            subtitle: 'Aktivitas Magang · Fast-Track Development',
            category: 'Aktivitas Magang',
            tech: ['Next.js PWA', 'Live Coding', 'Fast Delivery'],
            description: 'Dokumentasi intensif pengembangan sistem pelacakan pesanan publik (TOC) yang diselesaikan dalam waktu 1 hari kerja.'
        },
        {
            id: 'activity-socialization-tracking',
            image: '/projects/11-ais-backend/3. Sosialisasi Tracking Order Bersama User.jpeg',
            title: 'Sosialisasi Tracking Order Bersama User',
            subtitle: 'Aktivitas Magang · Edukasi Pengguna Lapangan',
            category: 'Aktivitas Magang',
            tech: ['User Socialization', 'Operational Staff'],
            description: 'Pendampingan langsung kepada pengguna akhir di lapangan untuk memastikan kemudahan pencarian nomor DN di portal mandiri.'
        },
        {
            id: 'activity-report-pica',
            image: '/projects/11-ais-backend/4. Report Pengembangan Projek Digital PICA.jpeg',
            title: 'Report Pengembangan Digital PICA',
            subtitle: 'Aktivitas Magang · Presentasi Kemajuan Mutu QC',
            category: 'Aktivitas Magang',
            tech: ['Progress Report', 'Quality Assurance'],
            description: 'Pemaparan status arsitektur form digital Why-Why analysis dan sistem notulensi rapat penjaminan mutu bersama mentor IT.'
        },

        // ── SISTEM MASTER & INTEGRASI AIS ──
        {
            id: 'procurement-portal',
            image: '/projects/11-ais-backend/1.png',
            title: 'Portal Procurement & Sinkronisasi Vendor',
            subtitle: 'Arsitektur Sistem · Automated PO Lifecycle',
            category: 'Fitur Projek',
            tech: ['React 18', 'Laravel 8', 'SAP ERP'],
            description: 'Manajemen siklus hidup Purchase Order (PO), verifikasi data vendor terintegrasi, dan sinkronisasi otomatis status pemesanan barang dengan sistem SAP ERP.'
        },
        {
            id: 'inbound-receiving',
            image: '/projects/11-ais-backend/2.png',
            title: 'Inbound Receiving & Validasi Surat Jalan',
            subtitle: 'Arsitektur Sistem · Accurate Goods Receiving',
            category: 'Fitur Projek',
            tech: ['Laravel 8', 'MongoDB 7.0', 'Backend'],
            description: 'Pencatatan penerimaan barang masuk (Good Receiving & Incoming Lotbook) dengan pencocokan otomatis terhadap Delivery Note untuk mencegah selisih stok awal.'
        },
        {
            id: 'erp-bridge',
            image: '/projects/11-ais-backend/5.png',
            title: 'Jembatan Integrasi SAP ERP (RFC / BAPI)',
            subtitle: 'Arsitektur Sistem · Enterprise Data Bridge',
            category: 'Fitur Projek',
            tech: ['SAP RFC 311/101', 'Laravel 8', 'Port 8001'],
            description: 'Pipeline integrasi data dua arah yang menjembatani transaksi mutasi inventaris pabrik harian dengan sistem inti SAP ERP enterprise secara konsisten.'
        }
    ],
    techStackDetails: [
        {
            name: 'React 18 + Vite',
            category: 'Frontend SPA',
            role: 'Single Page Application modern berbasis React 18, Vite bundler, dan Tailwind CSS untuk antarmuka responsif operasional pabrik.',
            highlights: [
                'State Management & Optimistic UI',
                'Tailwind CSS Manufacturing Theme',
                'Proxy Routing Port 8000 & 5559'
            ]
        },
        {
            name: 'Laravel 8 (PHP 7.4)',
            category: 'Backend 1 (Port 8000)',
            role: 'Backend inti untuk modul Master Data, alur rekomendasi Bin gudang, transaksi pengeluaran BKB, struktur BOM, dan SAP RFC Connector.',
            highlights: [
                'Master Data & Rekomendasi Bin Gudang',
                'Transaksi BKB & Kalkulator BOM',
                'SAP RFC 311 / 101 Connector'
            ]
        },
        {
            name: 'Express.js (Node.js)',
            category: 'Backend 2 (Port 5559)',
            role: 'Microservice backend bervolume tinggi untuk WMS Finish Good (FG), logika pemecahan box (Stock Split), Dispatch, dan komunikasi live.',
            highlights: [
                'WMS Finish Good (FG) Engine',
                'FG Stock Split & Scan Dispatch',
                'Real-Time WebSocket (Socket.IO)'
            ]
        },
        {
            name: 'MongoDB 7.0',
            category: 'Distributed NoSQL Database',
            role: 'Database multi-koleksi berkecepatan tinggi yang memisahkan transaksi operasional pabrik dan portal pemasok.',
            highlights: [
                'Database dci_factory_ais (Transaksi Pabrik)',
                'Database portal_supplier_dcci (Data Vendor)',
                'Compound index untuk pencarian instan lot & rak'
            ]
        },
        {
            name: 'SAP ERP Dharma Enterprise',
            category: 'Enterprise Core System',
            role: 'Sistem sentral grup Dharma yang terhubung via RFC / BAPI (Port 8001) untuk Movement Type 101 (GR) dan 311 (Transfer Sloc).',
            highlights: [
                'SAP RFC / BAPI Port 8001 Integration',
                'Movement Type 101 & 311 Automated Posting',
                'Reconciliation Logger pencegah selisih saldo'
            ]
        },
        {
            name: 'Webhook & Anti-Collision Engine',
            category: 'Connectivity & Safety Layer',
            role: 'Lapisan middleware penerima semburan data dari sistem QC Traceability dan pelindung penulisan ganda dari scanner gun.',
            highlights: [
                'Inbound Webhook Listener x-api-key',
                'Idempotensi Lot updateOrCreate',
                'Debounce Safety (<300ms) anti-double scan'
            ]
        }
    ],
    tagline: 'Enterprise ERP/WMS Backbone for Smart Factory Operations.',
    description: 'Automated Information System (AIS): arsitektur multi-backend (Laravel 8 + Node.js) dan SPA React 18 yang mendigitalisasi rantai pasok, manajemen gudang bahan baku hingga Finish Good, dan integrasi SAP ERP di PT Dharma Controlcable Indonesia.',
    problem: 'Proses pergudangan manual memicu salah taruh di rak, ketidaksinkronan PO SAP, dan kesulitan tracking mutasi part bervolume tinggi.',
    solution: 'Arsitektur modern: Frontend React 18 + Vite, Backend Laravel 8 (Master Data, Bin, BKB, SAP RFC) & Express.js (WMS FG, Stock Split, Socket.IO), MongoDB 7.0, dan integrasi Webhook QC.',
    impact: 'Menjamin akurasi saldo rak material 100%, otomatisasi mutasi SAP RFC, dan eliminasi rekap manual antar departemen.',
    status: 'READY FOR UAT',
    benefits: 'Warehouse, PPIC, QC, & Supply Chain PT Dharma Controlcable Indonesia',
    vision: 'Pondasi ekosistem Smart Factory manufaktur kontrol presisi berskala enterprise.',
    strategicAlignment: 'Mendukung transformasi digitalisasi industri manufaktur otomotif terhubung ERP sentral.',
    team: [
        { name: 'Sulthan Abdi Dzikry' },
        { name: 'Sahlan Muzaqi' }
    ],
    tags: ['React 18', 'Laravel 8', 'Express.js', 'MongoDB 7.0', 'SAP RFC', 'Socket.IO'],
    size: 'large',
    problemMap: [
        { problem: 'Manual Inbound Receiving', context: 'Incoming goods recorded manually, risking invalid stock entries.', solution: 'Automated Inbound Module', mitigation: 'Good Receiving, Incoming Lotbook, and Compare Delivery Note validate every inbound transaction.' },
        { problem: 'Untraceable Warehouse Stock', context: 'Locating materials across racks was slow and error-prone.', solution: 'QR/Barcode Rack Management', mitigation: 'Scan-based tracking keeps every part 100% traceable by Sloc/Storage Location.' },
        { problem: 'Chaotic Outbound Delivery', context: 'Deliveries lacked scheduling discipline and standard documents.', solution: 'Scheduled Outbound Flow', mitigation: 'Delivery scheduling, Travel Document generation, and controlled warehouse release.' },
        { problem: 'Disconnected Systems', context: 'SAP data and reminders lived in silos with no automation.', solution: 'ERP Bridge + Auto Notifications', mitigation: 'SAP bridging plus auto reminders via WhatsApp (Twilio) and Email through cron jobs.' }
    ],
    stats: [
        { label: 'Coverage', value: 'End-to-end', description: 'PO to outbound delivery in one system.' },
        { label: 'Traceability', value: '100%', description: 'QR/Barcode-tracked materials and parts.' },
        { label: 'Transactions', value: '1000s/day', description: 'Daily inventory transaction volume.' },
        { label: 'Notifications', value: 'Auto', description: 'WhatsApp + Email reminders via cron.' }
    ],
    timeline: [
        { phase: 'Analysis', period: 'Jun 2026', activities: ['Business process mapping', 'SAP bridging design', 'Role planning'] },
        { phase: 'Backend Development', period: 'Jul 2026 - Present', activities: ['Procurement and inbound', 'Warehouse rack tracking', 'Outbound delivery flow'] },
        { phase: 'Integration', period: 'Ongoing', activities: ['SAP ERP bridging', 'Twilio/Email gateway', 'JWT + Spatie RBAC'] }
    ],
    personas: [
        { role: 'Warehouse Staff', pain: 'Manual recording makes stock unreliable.', goal: 'Scan-based real-time tracking.' },
        { role: 'Plant Management', pain: 'No single view of inventory status.', goal: 'Integrated ERP/WMS with auto reminders.' }
    ],
    businessModel: [
        { type: 'Operational Efficiency', value: 'Automated flows cut manual effort and stock variances.' },
        { type: 'Supply Chain Visibility', value: 'End-to-end traceability from PO to customer delivery.' }
    ],
    beforeAfter: [
        { aspect: 'Goods Receiving', before: 'Manual recording, invalid stock risk', after: 'Automated inbound with note comparison' },
        { aspect: 'Stock Location', before: 'Hard to find materials', after: 'QR/Barcode scan Sloc accuracy' },
        { aspect: 'Delivery Docs', before: 'Unscheduled documents', after: 'Scheduled outbound with travel docs' },
        { aspect: 'Notifications', before: 'Manual follow-ups', after: 'Auto WA/Email + SAP bridge' }
    ],
    mitigationPlans: [
        { risk: 'Stock Discrepancy', action: 'Validated endpoints with QR checkpoints at every movement.' },
        { risk: 'Complex Authorization', action: 'Granular Spatie permissions per department.' }
    ],
    investmentRequired: 'Full-Stack & Backend Integration Maintenance',
    assumptions: `1. Pemindaian QR/Barcode presisi mengeliminasi risiko salah alokasi Bin dan ketidaksesuaian stok.
2. SAP RFC Connector memastikan sinkronisasi data mutasi Movement Type 101 dan 311 secara konsisten.`,
    productArchitecture: 'Frontend React 18 + Vite, Backend Laravel 8 (Master/BKB/SAP RFC), Backend Express.js (WMS FG), MongoDB 7.0, SAP ERP Port 8001',
    coreFeatures: [
        { name: 'Scan In Label & Good Receipt', desc: 'Validasi label incoming material supplier terhadap PO SAP dan proteksi Poka-Yoke.' },
        { name: 'Assign Bin & Scan Rack Sloc', desc: 'Rekomendasi otomatis penempatan rak bertingkat dan audit kapasitas fisik rak.' },
        { name: 'Stock On Rack Management', desc: 'Monitoring saldo part per slot rak gudang dengan filter lot, status QC, dan audit trail.' },
        { name: 'WMS Finish Good & Stock Split', desc: 'Logika pemecahan box besar untuk rilis parsial dan pemindaian barcode packing dispatch.' },
        { name: 'SAP RFC Connector & Webhook QC', desc: 'Integrasi dua arah Movement Type 101 & 311 serta jembatan semburan data inspeksi QC.' }
    ],
    background: 'Di PT Dharma Controlcable Indonesia, digitalisasi rantai pasok dan pergudangan diwujudkan melalui arsitektur multi-backend terintegrasi (Laravel 8 + Node.js) dan SPA React 18 yang terhubung ke SAP ERP.',
    translations: {
        id: {
            tagline: 'Arsitektur Multi-Backend ERP/WMS untuk Ekosistem Smart Factory.',
            description: 'Automated Information System (AIS): sistem ERP/WMS manufaktur terintegrasi berbasis SPA React 18, Backend Laravel 8 (Master Data, Bin, BKB, SAP RFC) dan Express.js (WMS Finish Good) dengan basis data MongoDB 7.0 di PT Dharma Controlcable Indonesia.',
            problem: 'Proses pergudangan manual memicu salah taruh di rak, ketidaksinkronan PO SAP, dan kesulitan tracking mutasi part bervolume tinggi.',
            solution: 'Frontend SPA React 18 + Vite, Backend Laravel 8 (Port 8000), Backend Node.js Express (Port 5559), MongoDB 7.0, dan SAP RFC Connector (Port 8001).',
            impact: 'Menjamin akurasi saldo rak material 100%, otomatisasi mutasi SAP RFC, dan eliminasi rekap manual antar departemen.',
            status: 'READY FOR UAT',
            benefits: 'Tim Gudang, PPIC, QC, dan Supply Chain PT Dharma Controlcable Indonesia',
            vision: 'Pondasi ekosistem Smart Factory manufaktur kontrol presisi berskala enterprise.',
            strategicAlignment: 'Mendukung transformasi digitalisasi industri manufaktur otomotif terhubung ERP sentral.',
            background: 'Di PT Dharma Controlcable Indonesia, digitalisasi rantai pasok dan pergudangan diwujudkan melalui arsitektur multi-backend terintegrasi (Laravel 8 + Node.js) dan SPA React 18 yang terhubung ke SAP ERP.',
            investmentRequired: 'Pemeliharaan Integrasi Full-Stack & Backend',
            assumptions: `1. Pemindaian QR/Barcode presisi mengeliminasi risiko salah alokasi Bin dan ketidaksesuaian stok.
2. SAP RFC Connector memastikan sinkronisasi data mutasi Movement Type 101 dan 311 secara konsisten.`,
            productArchitecture: 'Frontend React 18 + Vite, Backend Laravel 8 (Master/BKB/SAP RFC), Backend Express.js (WMS FG), MongoDB 7.0, SAP ERP Port 8001'
        }
    }
};