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