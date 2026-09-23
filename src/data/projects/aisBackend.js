export const aisBackendProject = {
    id: 'ais-backend',
    title: 'Automated Integrated System',
    isTrialData: true,
    category: 'Smart Factory',
    image: '/projects/11-ais-backend/1.png',
    showcaseImages: [
        '/projects/11-ais-backend/1.png',
        '/projects/11-ais-backend/2.png',
        '/projects/11-ais-backend/3.png',
        '/projects/11-ais-backend/4.png',
        '/projects/11-ais-backend/5.png',
        '/projects/11-ais-backend/6.png'
    ],
    // ── Interactive Showcase Pilot Metadata ──
    galleryItems: [
        {
            id: 'procurement-portal',
            image: '/projects/11-ais-backend/1.png',
            title: 'Portal Procurement & Sinkronisasi Vendor',
            subtitle: 'Automated Purchase Order Lifecycle',
            category: 'Procurement',
            tech: ['Laravel 6', 'SAP ERP', 'PHP'],
            description: 'Manajemen siklus hidup Purchase Order (PO), verifikasi data vendor terintegrasi, dan sinkronisasi otomatis status pemesanan barang dengan sistem SAP ERP.'
        },
        {
            id: 'inbound-receiving',
            image: '/projects/11-ais-backend/2.png',
            title: 'Inbound Receiving & Validasi Surat Jalan',
            subtitle: 'Accurate Goods Receiving Workflow',
            category: 'Inbound',
            tech: ['Laravel 6', 'MongoDB', 'Backend'],
            description: 'Pencatatan penerimaan barang masuk (Good Receiving & Incoming Lotbook) dengan pencocokan otomatis terhadap Delivery Note untuk mencegah selisih stok awal.'
        },
        {
            id: 'rack-management',
            image: '/projects/11-ais-backend/3.png',
            title: 'Manajemen Rak & Pelacakan QR/Barcode',
            subtitle: 'Storage Location (Sloc) Traceability',
            category: 'Warehouse',
            tech: ['PHP', 'MongoDB', 'Backend'],
            description: 'Pelacakan stok material berbasis pemindaian QR/Barcode di tingkat Storage Location (Sloc), memastikan akurasi lokasi penyimpanan part hingga 100% real-time.'
        },
        {
            id: 'scheduled-outbound',
            image: '/projects/11-ais-backend/4.png',
            title: 'Pengiriman Terjadwal & Dokumen Jalan',
            subtitle: 'Controlled Outbound Delivery',
            category: 'Outbound',
            tech: ['Laravel 6', 'PHP'],
            description: 'Penjadwalan pengiriman material ke lini produksi atau customer, pembuatan Travel Document otomatis, dan rilis barang gudang yang terkontrol ketat.'
        },
        {
            id: 'erp-bridge',
            image: '/projects/11-ais-backend/5.png',
            title: 'Jembatan Integrasi SAP ERP',
            subtitle: 'Enterprise System Data Bridge',
            category: 'Integration',
            tech: ['SAP ERP', 'Backend', 'Laravel 6'],
            description: 'Pipeline integrasi data dua arah yang menjembatani transaksi mutasi inventaris pabrik harian dengan sistem inti SAP ERP enterprise secara konsisten.'
        },
        {
            id: 'auto-notifications',
            image: '/projects/11-ais-backend/6.png',
            title: 'Notifikasi Otomatis WhatsApp & Email',
            subtitle: 'Twilio API & Cron Job Scheduler',
            category: 'Automation',
            tech: ['Twilio API', 'PHP', 'Backend'],
            description: 'Layanan cron job scheduler yang memicu pengingat otomatis via WhatsApp (Twilio API) dan Email untuk stok kritis, approval pending, serta jadwal pengiriman.'
        }
    ],
    techStackDetails: [
        {
            name: 'Laravel 6',
            category: 'Backend Framework',
            role: 'Framework backend MVC utama untuk business logic ERP/WMS, manajemen routing API, autentikasi JWT, dan orkestrasi alur supply chain.',
            highlights: [
                'Arsitektur Service-Repository Pattern',
                'Task scheduling & cron background workers',
                'Eloquent & Jenssegers MongoDB driver'
            ]
        },
        {
            name: 'PHP',
            category: 'Core Language',
            role: 'Bahasa pemrograman inti yang menjalankan pemrosesan transaksi inventaris bervolume ribuan per hari dengan efisiensi memori teruji.',
            highlights: [
                'Pemrosesan stream data transaksi bervolume tinggi',
                'Integrasi API gateway pihak ketiga',
                'Modular business rules engine'
            ]
        },
        {
            name: 'MongoDB',
            category: 'NoSQL Database',
            role: 'Database bervolume tinggi untuk mencatat mutasi stok per detik, log pemindaian QR/Barcode, dan audit trail pergerakan part di gudang.',
            highlights: [
                'Skema transaksi inventaris berkecepatan tinggi',
                'Compound index untuk pencarian lokasi rak cepat',
                'Aggregation pipeline untuk rekap mutasi harian'
            ]
        },
        {
            name: 'SAP ERP',
            category: 'Enterprise ERP',
            role: 'Sistem ERP sentral perusahaan yang disinkronkan secara periodik untuk data master supplier, purchase orders, dan inventory valuation.',
            highlights: [
                'Two-way data synchronization',
                'Reconciliation logger untuk mencegah selisih buku',
                'Standardized data interchange format'
            ]
        },
        {
            name: 'Twilio API',
            category: 'Messaging Gateway',
            role: 'Gateway otomasi pengiriman pesan WhatsApp untuk eskalasi stok kritis dan konfirmasi pengiriman material langsung ke nomor operasional PIC.',
            highlights: [
                'Webhook delivery receipt verification',
                'Template pesan dinamis multi-bahasa',
                'Rate limiting & queue dispatching'
            ]
        },
        {
            name: 'Backend',
            category: 'Architecture',
            role: 'Pondasi arsitektur micro-service & REST API yang andal, scalable, dan mematuhi standar manufaktur Smart Factory Industry 4.0.',
            highlights: [
                'Spatie RBAC permission mapping',
                'Audit logging di setiap endpoint',
                'High availability & fault-tolerant design'
            ]
        }
    ],
    tagline: 'Enterprise ERP/WMS Backbone for Smart Factory Operations.',
    description: 'Automated Information System (AIS): enterprise-scale ERP/WMS digitizing the full supply chain and warehouse operation at PT Dharma Controlcable Indonesia.',
    problem: 'Manual disconnected processes caused stock discrepancies and slow material traceability.',
    solution: 'Centralized Laravel + MongoDB backend: procurement portal, automated inbound, QR/Barcode rack tracking, scheduled outbound, SAP bridge, auto WA/Email reminders.',
    impact: 'Handles thousands of inventory transactions daily with accurate real-time QR-tracked stock.',
    status: 'IN PROGRESS',
    benefits: 'Warehouse & Supply Chain Teams of PT Dharma Controlcable Indonesia',
    vision: 'Reliable integrated ERP/WMS backbone for Smart Factory.',
    strategicAlignment: 'Supports manufacturing digitalization by automating supply chain and bridging factory data with SAP ERP.',
    team: [
        { name: 'Sulthan Abdi Dzikry' },
        { name: 'Sahlan Muzaqi' }
    ],
    tags: ['Laravel 6', 'PHP', 'MongoDB', 'SAP ERP', 'Twilio API', 'Backend'],
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
    investmentRequired: 'Ongoing Backend Development / 1 Backend Developer',
    assumptions: `1. Scan-based tracking will eliminate most stock variances.
2. SAP bridging keeps supplier and part data synchronized.`,
    productArchitecture: 'Laravel 6 (Backend), MongoDB (Database), SAP ERP, Twilio + SMTP',
    coreFeatures: [
        { name: 'Procurement Portal', desc: 'PO lifecycle, vendor data, supplier sync, PO analytics.' },
        { name: 'Inbound Receiving', desc: 'Good Receiving, Lotbook, Compare Delivery Note.' },
        { name: 'Warehouse Tracking', desc: 'Storage/Rack QR/Barcode scan at Sloc level.' },
        { name: 'Outbound Delivery', desc: 'Scheduling, Travel Documents, warehouse release.' }
    ],
    background: 'At PT Dharma Controlcable Indonesia, supply chain and warehouse needed full digitalization. I developed and maintained the AIS backend modules.',
    translations: {
        id: {
            tagline: 'Tulang Punggung ERP/WMS untuk Operasi Smart Factory.',
            description: 'Automated Information System (AIS): aplikasi ERP/WMS skala enterprise untuk digitalisasi rantai pasok dan gudang di PT Dharma Controlcable Indonesia.',
            problem: 'Proses manual yang terpisah menimbulkan selisih stok dan ketertelusuran lambat.',
            solution: 'Backend terpusat Laravel + MongoDB: portal procurement, inbound otomatis, tracking rak QR/Barcode, outbound terjadwal, jembatan SAP, pengingat WA/Email otomatis.',
            impact: 'Menangani ribuan transaksi harian dengan stok akurat real-time terlacak QR.',
            status: 'DALAM PENGERJAAN',
            benefits: 'Tim Gudang dan Rantai Pasok PT Dharma Controlcable Indonesia',
            vision: 'Tulang punggung ERP/WMS terintegrasi untuk Smart Factory.',
            strategicAlignment: 'Mendukung digitalisasi manufaktur dan bridging data dengan SAP ERP.',
            background: 'Di PT Dharma Controlcable Indonesia, rantai pasok dan gudang butuh digitalisasi penuh. Saya mengembangkan dan memelihara modul backend AIS.',
            investmentRequired: 'Pengembangan Backend Berjalan / 1 Backend Developer',
            assumptions: `1. Tracking scan menghilangkan sebagian besar selisih stok.
2. Bridging SAP menjaga sinkronisasi data.`,
            productArchitecture: 'Laravel 6 (Backend), MongoDB (Database), SAP ERP, Twilio + SMTP'
        }
    }
};