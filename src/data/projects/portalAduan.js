export const portalAduanProject = {
    id: 'portal-aduan',
    title: 'Nonconfirmity Integrated System',
    isTrialData: true,
    category: 'Quality Management',
    image: '/projects/12-portal-aduan/12.png',
    showcaseImages: [
        '/projects/12-portal-aduan/12.png',
        '/projects/12-portal-aduan/1.png',
        '/projects/12-portal-aduan/2.png',
        '/projects/12-portal-aduan/3.png',
        '/projects/12-portal-aduan/4.png',
        '/projects/12-portal-aduan/5.png',
        '/projects/12-portal-aduan/6.png',
        '/projects/12-portal-aduan/7.png',
        '/projects/12-portal-aduan/8.png',
        '/projects/12-portal-aduan/9.png',
        '/projects/12-portal-aduan/11.png'
    ],
    tagline: 'Quality Issue Tracking and Resolution System.',
    description: 'Web-based issue tracker digitizing quality management: cross-department collaboration to report, analyze, and resolve product quality issues.',
    problem: 'Quality issue tracking lacked inter-department transparency: hard to monitor handling progress, lost root-cause history, and many fixes missing deadlines.',
    solution: 'Centralized platform where every ticket follows a structured resolution flow: investigation, assignment with deadlines, and effectiveness verification before closure.',
    impact: 'Real-time KPI dashboard helps management monitor performance and reduce overdue resolutions.',
    status: 'COMPLETED',
    benefits: 'Production, QC, Engineering & Management Teams',
    vision: 'Transparent accountable quality management across departments.',
    strategicAlignment: 'Supports Smart Factory quality digitalization with a centralized auditable issue-resolution workflow.',
    team: 'Sulthan Abdi Dzikry (Full-stack Web Developer)',
    tags: ['Next.js', 'TypeScript', 'Express', 'MongoDB', 'Recharts'],
    size: 'large',
    problemMap: [
        { problem: 'No Handling Visibility', context: 'Hard to monitor how far an issue was being handled.', solution: 'Ticket Tracking Flow', mitigation: 'Every report moves through report, meeting, root cause, and action plan stages.' },
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
        { role: 'QC Staff', pain: 'Issues reported informally with no tracking.', goal: 'Structured ticket with clear ownership.' },
        { role: 'Management', pain: 'No KPI visibility on quality performance.', goal: 'Real-time dashboard with overdue alerts.' }
    ],
    businessModel: [
        { type: 'Quality Transparency', value: 'Centralized tickets make every issue auditable.' },
        { type: 'On-time Resolution', value: 'Deadline monitoring reduces overdue fixes.' }
    ],
    beforeAfter: [
        { aspect: 'Reporting', before: 'Informal, scattered reports', after: 'Centralized ticket system' },
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
    background: 'Before this system, quality tracking lacked transparency. I translated operational flows into an intuitive web platform with full frontend development and complex API integration.',
    translations: {
        id: {
            tagline: 'Sistem Pelacakan dan Penyelesaian Masalah Kualitas.',
            description: 'Issue tracker berbasis web untuk digitalisasi manajemen kualitas: kolaborasi lintas departemen untuk melaporkan, menganalisis, dan menyelesaikan masalah kualitas produk.',
            problem: 'Pelacakan masalah kualitas minim transparansi: sulit memantau progres, riwayat root cause hilang, dan banyak perbaikan melewati deadline.',
            solution: 'Platform terpusat dengan alur penyelesaian terstruktur: investigasi, penugasan berdeadline, dan verifikasi efektivitas sebelum penutupan.',
            impact: 'Dashboard KPI real-time membantu manajemen memantau performa dan menekan overdue.',
            status: 'SELESAI',
            benefits: 'Tim Produksi, QC, Engineering dan Manajemen',
            vision: 'Manajemen kualitas yang transparan dan akuntabel lintas departemen.',
            strategicAlignment: 'Mendukung digitalisasi kualitas Smart Factory dengan alur penyelesaian yang terpusat dan teraudit.',
            background: 'Sebelum sistem ini, pelacakan kualitas minim transparansi. Saya menerjemahkan alur operasional menjadi platform web yang intuitif dengan development frontend penuh dan integrasi API kompleks.',
            investmentRequired: '7 Minggu Desain dan Development / 1 Full-stack Developer',
            assumptions: `1. Alur terstruktur meningkatkan akuntabilitas lintas departemen.
2. KPI real-time menekan penyelesaian overdue.`,
            productArchitecture: 'Next.js App Router (Frontend), Express (Backend), MongoDB (Database), Recharts'
        }
    }
};