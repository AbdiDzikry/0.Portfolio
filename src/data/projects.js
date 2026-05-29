export const projectsData = [
    {
        id: 'doors',
        title: 'Doors',
        category: 'UI/UX Design',
        image: '/projects/doors/Presentasi Doors-1.webp',
        showcaseImages: [
            '/projects/doors/Presentasi Doors-1.webp',
            '/projects/doors/Presentasi Doors-2.webp',
            '/projects/doors/tabletdoors.png',
            '/projects/doors/Presentasi Doors-8.webp',
            '/projects/doors/Presentasi Doors-10.webp',
            '/projects/doors/Presentasi Doors-11.webp'
        ],
        tagline: 'Booking Meeting Rooms Made Simpler and More Efficient.',
        description: 'A robust meeting room booking ecosystem for PT Dharma Polimetal Tbk. currently handling 1,000+ users and 14 meeting rooms with zero scheduling conflicts.',
        problem: 'Employees struggled with a complex 6-step booking process that required opening a laptop or manual requests, creating significant friction for immediate on-the-spot scheduling.',
        solution: 'Introduced an on-the-spot booking system and a fully responsive web interface (tablet-friendly), simplifying the flow into 4 intuitive steps to ensure rooms can be booked anytime, anywhere.',
        impact: 'Successfully managed 623+ completed meetings and 374+ scheduled sessions. Maintained smooth operations for over 752 long-duration meetings (>2 hours) without a single overlap.',
        status: 'Completed (3 Months Development)',
        benefits: 'Staff of Dharma Polimetal',
        vision: 'To simplify the usage of the previous system.',
        strategicAlignment: 'Supporting the operational digitalization of PT Dharma Polimetal Tbk. by optimizing the utility of corporate assets (meeting rooms) and increasing employee time efficiency through a responsive and integrated system.',
        personas: [
            { role: 'Dharma Polimetal Staff', goal: 'Gain ease in booking meeting rooms on-the-spot without complex bureaucracy.' }
        ],
        researchImage: '/projects/doors/hasil_sus_doors.png',
        tags: ['Agile', 'PWA', 'Paper Prototyping', 'SUS Testing', 'UI/UX Design'],
        size: 'large',
        liveLink: 'https://doors2.dharmap.com/',
        designTools: ['Figma', 'Paper & Pen', 'FigJam', 'Postman', 'Notion'],
        researchMethods: ['System Usability Scale (SUS)', 'Agile Methodology', 'User Flow Mapping', 'Contextual Inquiry'],
        figmaEmbed: '', // PASTE FIGMA EMBED URL HERE
        problemMap: [
            {
                problem: 'Inefficient Booking Flow',
                context: "The previous system required 6 separate input steps to reserve a single room.",
                solution: 'Process Optimization',
                mitigation: 'Grouped related inputs to reduce the flow to only 4 efficient steps.'
            },
            {
                problem: 'Manual Attendance Tracking',
                context: "Recording meeting participants was manual and prone to data loss.",
                solution: 'Digital NPK Check-in',
                mitigation: 'Introduced a PIN-based check-in using Employee ID (NPK) for instant digital attendance.'
            },
            {
                problem: 'Limited Schedule Visibility',
                context: "Users had to check each room's calendar one by one to find an open slot.",
                solution: 'Gantt Chart Visualization',
                mitigation: 'Implemented an "Available Room" view using a Gantt Chart to see all rooms at once.'
            }
        ],
        stats: [
            { label: 'SUS Score', value: '72.5', description: 'Usability Grade: B (Good).' },
            { label: 'Active Users', value: '1.000+', description: 'Handling enterprise-scale user base.' },
            { label: 'Completed', value: '623', description: 'Total successful meetings conducted.' },
            { label: 'Conflicts', value: '0', description: 'Zero scheduling overlaps achieved.' }
        ],
        timeline: [
            { phase: 'Research', period: '29 Oct - 12 Nov (2 Weeks)', activities: ['Agile Methodology setup', 'Current state analysis', 'User pain point mapping'] },
            { phase: 'System Development', period: '12 Nov - 24 Dec (6 Weeks)', activities: ['Information Architecture', 'Prototyping', 'Full-stack Development'] },
            { phase: 'Testing & Documentation', period: '24 Dec - 14 Jan (3 Weeks)', activities: ['SUS Usability Testing', 'User Handoff', 'Project Documentation'] }
        ],
        coreFeatures: [
            { name: 'Available Room', desc: 'Gantt Chart visualization for overviewing room schedules in one view.' },
            { name: 'Analytic', desc: 'Statistical dashboard to track meeting frequency, maintenance, and employee KPIs.' },
            { name: 'Absensi', desc: 'Secure attendance tracking using Employee ID (NPK) PIN system.' },
            { name: 'PWA Support', desc: 'Installable on mobile and tablet devices for native app-like experience.' }
        ],
        beforeAfter: [
            { aspect: 'Process Flow', before: '6 complex manual steps (Type, Date x2, Time x2, Topic)', after: '4 consolidated/intuitive steps (Topic, Date, Duration, Time)' },
            { aspect: 'Mobility', before: 'Laptop-only or manual request required', after: 'Responsive PWA (Installable on Mobile/Tablet)' },
            { aspect: 'UX Core', before: 'Fragmented and process-heavy interface', after: 'Informative & Intuitive (Visual-first design)' },
            { aspect: 'Booking Method', before: 'Remote booking or asking admin', after: 'Immediate on-the-spot booking via Tablet' }
        ],
        translations: {
            id: {
                tagline: 'Pemesanan Ruang Rapat Menjadi Lebih Sederhana dan Efisien.',
                description: 'Ekosistem pemesanan ruang rapat yang kokoh untuk PT Dharma Polimetal Tbk. yang saat ini menangani 1.000+ pengguna dan 14 ruang rapat dengan nol konflik penjadwalan.',
                problem: 'Karyawan kesulitan dengan proses pemesanan 6 langkah yang rumit dan harus membuka laptop atau meminta bantuan orang lain, menciptakan hambatan besar untuk penjadwalan mendadak di tempat.',
                solution: 'Memperkenalkan sistem pemesanan langsung di tempat (on-the-spot) dan antarmuka web yang sepenuhnya responsif (tablet-friendly), menyederhanakan alur menjadi 4 langkah intuitif untuk memastikan ruangan dapat dipesan kapan saja, di mana saja.',
                impact: 'Berhasil mengelola 623+ rapat selesai dan 374+ sesi terjadwal. Menjaga kelancaran operasional untuk lebih dari 752 rapat durasi panjang (>2 jam) tanpa ada bentrokan sama sekali.',
                status: 'Selesai (3 Bulan Pengembangan)',
                benefits: 'Karyawan PT. Dharma Polimetal Tbk.',
                problemMap: [
                    {
                        problem: 'Alur Pemesanan Tidak Efisien',
                        context: "Sistem lama memerlukan 6 langkah input terpisah untuk memesan satu ruangan.",
                        solution: 'Optimasi Proses',
                        mitigation: 'Mengelompokkan input terkait untuk mengurangi alur menjadi hanya 4 langkah efisien.'
                    },
                    {
                        problem: 'Pelacakan Kehadiran Manual',
                        context: "Mencatat peserta rapat bersifat manual dan rentan terhadap kehilangan data.",
                        solution: 'Check-in NPK Digital',
                        mitigation: 'Memperkenalkan check-in berbasis PIN menggunakan ID Karyawan (NPK) untuk absensi digital instan.'
                    }
                ],
                stats: [
                    { label: 'Skor SUS', value: '72.5', description: 'Grade Usability: B (Good).' },
                    { label: 'Pengguna Aktif', value: '1.000+', description: 'Menangani basis pengguna skala besar.' },
                    { label: 'Rapat Selesai', value: '623', description: 'Total rapat yang berhasil dilaksanakan.' },
                    { label: 'Bentrokan', value: '0', description: 'Nol tumpang tindih jadwal tercapai.' }
                ],
                coreFeatures: [
                    { name: 'Available Room', desc: 'Visualisasi Gantt Chart untuk melihat seluruh jadwal ruangan dalam satu tampilan.' },
                    { name: 'Analytic', desc: 'Dashboard statistik untuk melacak frekuensi rapat, maintenance, dan KPI karyawan.' },
                    { name: 'Absensi', desc: 'Pelacakan kehadiran aman menggunakan sistem PIN ID Karyawan (NPK).' },
                    { name: 'Dukungan PWA', desc: 'Dapat diinstal di perangkat seluler untuk pengalaman aplikasi native.' }
                ],
                beforeAfter: [
                    { aspect: 'Alur Proses', before: '6 langkah manual rumit (Tipe, Tanggal x2, Jam x2, Topik)', after: '4 langkah ringkas & intuitif' },
                    { aspect: 'Mobilitas', before: 'Hanya bisa via laptop/permintaan manual', after: 'PWA Responsif (Bisa di-install di HP/Tablet)' },
                    { aspect: 'Core UX', before: 'Antarmuka terfragmentasi & membingungkan', after: 'Informatif & Intuitif (Visual-first)' },
                    { aspect: 'Metode Booking', before: 'Remote saja (harus di meja)', after: 'Booking langsung di tempat via Tablet' }
                ],
                researchMethods: ['Skala Usability Sistem (SUS)', 'Metodologi Agile', 'Pemetaan Alur Pengguna', 'Inkuiri Kontekstual'],
                timeline: [
                    { phase: 'Riset', period: '29 Okt - 12 Nov (2 Minggu)', activities: ['Setup Metodologi Agile', 'Analisis kondisi saat ini', 'Pemetaan pain point'] },
                    { phase: 'Pengembangan Sistem', period: '12 Nov - 24 Des (6 Minggu)', activities: ['Arsitektur Informasi', 'Prototyping', 'Full-stack Development'] },
                    { phase: 'Testing & Dokumentasi', period: '24 Des - 14 Jan (3 Minggu)', activities: ['Usability Testing (SUS)', 'Handoff Pengguna', 'Dokumentasi Pengerjaan'] }
                ]
            }
        }
    },
    {
        id: 'ac-monitoring',
        title: 'LaporAC',
        category: 'UI/UX Design',
        image: '/projects/9. AC Monitoring/ac.1.png',
        showcaseImages: [
            '/projects/9. AC Monitoring/ac.1.png',
            '/projects/9. AC Monitoring/ac.2.png',
            '/projects/9. AC Monitoring/ac.3.png',
            '/projects/9. AC Monitoring/ac.4.png',
            '/projects/9. AC Monitoring/ac.5.png',
            '/projects/9. AC Monitoring/ac.6.png',
            '/projects/9. AC Monitoring/ac.7.png',
            '/projects/9. AC Monitoring/ac.8.png',
            '/projects/9. AC Monitoring/ac.9.png',
            '/projects/9. AC Monitoring/ac.10.png'
        ],
        tagline: 'Digital Facility Asset Monitoring System.',
        description: 'A centralized monitoring system for AC maintenance across departments at PT Dharma Polimetal Tbk., transitioning from manual paper-based tracking to a cloud-based digital dashboard.',
        problem: 'Facility staff struggled to monitor AC unit conditions across multiple departments manually. Maintenance was unscheduled, leading to higher risk of asset damage and inefficient upkeep.',
        solution: 'Developed a comprehensive AC monitoring dashboard with automatic maintenance scheduling and real-time asset status tracking, enabling cross-department visibility and proactive facility management.',
        impact: 'Streamlined asset maintenance processes, improved cross-department data synchronization, and ensured technical data integrity for all AC units.',
        tags: ['UI/UX Design', 'Dashboard', 'Facility Management', 'Figma', 'Digitalization'],
        size: 'medium',
        problemMap: [
            {
                problem: 'Manual Asset Tracking',
                context: "AC unit conditions were tracked manually on paper, prone to data loss and delays.",
                solution: 'Digital Dashboard',
                mitigation: 'Centralized cloud-based system with real-time updates and notifications.'
            },
            {
                problem: 'Unscheduled Maintenance',
                context: "Maintenance was reactive, only done when AC units broke down.",
                solution: 'Proactive Scheduling',
                mitigation: 'Automated maintenance calendar with reminders and history tracking.'
            },
            {
                problem: 'Limited Cross-Department Visibility',
                context: "Each department tracked their own AC units independently.",
                solution: 'Unified Monitoring System',
                mitigation: 'Single dashboard showing all AC units across all departments.'
            }
        ],
        stats: [
            { label: 'Asset Coverage', value: '100%', description: 'All AC units monitored digitally.' },
            { label: 'Sync Frequency', value: 'Daily', description: 'Real-time data updates.' },
            { label: 'Departments', value: 'Multi', description: 'Cross-department visibility.' },
            { label: 'Efficiency', value: '+40%', description: 'Maintenance scheduling improvement.' }
        ],
        timeline: [
            { phase: 'Research', period: 'Week 1-2', activities: ['Stakeholder interviews', 'Current process analysis', 'Pain point mapping'] },
            { phase: 'Design', period: 'Week 3-4', activities: ['Information architecture', 'Wireframing', 'UI design'] },
            { phase: 'Development', period: 'Week 5-6', activities: ['Dashboard implementation', 'Data integration', 'Testing & iteration'] }
        ],
        mitigationPlans: [
            { risk: 'Data Inaccuracy', action: 'Implement real-time database validation and automatic synchronization.' },
            { risk: 'User Adoption', action: 'Conduct training sessions and create user-friendly onboarding flow.' }
        ],
        personas: [
            { role: 'Facility Staff', pain: 'Difficult to monitor office asset conditions manually.', goal: 'Comprehensive monitoring dashboard that is easy to access.' },
            { role: 'Department Head', pain: 'No visibility across departments.', goal: 'Centralized system for monitoring all facilities.' }
        ],
        businessModel: [
            { type: 'Operational Efficiency', value: 'Reduction in administrative time up to 40% through automated scheduling.' },
            { type: 'Asset Longevity', value: 'Proactive maintenance extends AC unit lifespan and reduces replacement costs.' }
        ],
        beforeAfter: [
            { aspect: 'Monitoring Method', before: 'Manual paper-based tracking', after: 'Digital cloud-based dashboard' },
            { aspect: 'Scheduling', before: 'Unscheduled/reactive maintenance', after: 'Proactive automatic scheduling' },
            { aspect: 'Data Visibility', before: 'Limited to individual departments', after: 'Cross-department centralized view' },
            { aspect: 'Asset Management', before: 'High risk of unnoticed damage', after: 'Proactive condition monitoring' }
        ],
        vision: 'To optimize facility maintenance efficiency through adaptive and user-centric digital asset monitoring.',
        status: 'COMPLETED',
        team: 'Sulthan Abdi Dzikry (Product Designer)',
        background: 'During my internship at PT Dharma Polimetal Tbk., I was tasked to digitize the AC maintenance monitoring process that was previously still using a manual paper-based system. This project became an expansion of the HRGA digital ecosystem after the success of the Doors project.',
        strategicAlignment: 'Demonstrates ability to digitize manual processes into efficient and integrated systems.',
        investmentRequired: '6 Weeks Design & Development / 1 Product Designer',
        assumptions: '1. Staff will prefer digital dashboard over paper for daily monitoring.\n2. Cross-department data sharing will improve maintenance coordination.',
        productArchitecture: 'React (Frontend), Supabase (Database & Auth), Node.js (API)',
        coreFeatures: [
            { name: 'Centralized Dashboard', desc: 'Single view for all AC unit statuses across departments.' },
            { name: 'Maintenance Scheduling', desc: 'Automatic scheduling for routine maintenance and servicing.' },
            { name: 'Asset Database', desc: 'Comprehensive database of all AC units with technical specifications.' },
            { name: 'Status Tracking', desc: 'Real-time monitoring of AC conditions and maintenance history.' }
        ],
        designSystem: 'Corporate dashboard design with focus on data readability and efficient navigation for internal use. Clean layout with clear visual hierarchy.',
        designTools: ['Figma (UI/Prototyping)', 'FigJam (Process Mapping)', 'Paper & Pen (Wireframing)'],
        researchMethods: ['Contextual Inquiry', 'Process Mapping', 'User Flow Design'],
        uxOverview: 'Dashboard-first interface with real-time data visualization. Focus on clarity and quick decision-making for facility staff.',
        translations: {
            id: {
                tagline: 'Sistem Monitoring Aset Fasilitas Digital.',
                description: 'Sistem monitoring terpusat untuk perawatan AC lintas departemen di PT Dharma Polimetal Tbk., transisi dari pencatatan manual berbasis kertas ke dashboard digital berbasis cloud.',
                problem: 'Staff GA kesulitan memantau kondisi unit AC antar departemen secara manual. Perawatan tidak terjadwal, menyebabkan risiko kerusakan aset lebih tinggi dan perawatan yang tidak efisien.',
                solution: 'Mengembangkan dashboard monitoring AC yang komprehensif dengan penjadwalan perawatan otomatis dan pelacakan status aset real-time, memungkinkan visibilitas lintas departemen dan manajemen fasilitas yang proaktif.',
                impact: 'Merampingkan proses perawatan aset, meningkatkan sinkronisasi data lintas departemen, dan memastikan integritas data teknis untuk semua unit AC.',
                problemMap: [
                    {
                        problem: 'Pelacakan Aset Manual',
                        context: "Kondisi unit AC dicatat manual di kertas, rentan terhadap kehilangan data dan keterlambatan.",
                        solution: 'Dashboard Digital',
                        mitigation: 'Sistem berbasis cloud terpusat dengan update dan notifikasi real-time.'
                    },
                    {
                        problem: 'Perawatan Tidak Terjadwal',
                        context: "Perawatan hanya dilakukan saat AC sudah rusak.",
                        solution: 'Penjadwalan Proaktif',
                        mitigation: 'Kalender perawatan otomatis dengan pengingat dan pelacakan riwayat.'
                    },
                    {
                        problem: 'Visibilitas Lintas Departemen Terbatas',
                        context: "Setiap departemen melacak unit AC mereka sendiri-sendiri.",
                        solution: 'Sistem Monitoring Terpadu',
                        mitigation: 'Dashboard tunggal menampilkan semua unit AC di semua departemen.'
                    }
                ],
                stats: [
                    { label: 'Cakupan Aset', value: '100%', description: 'Semua unit AC terpantau secara digital.' },
                    { label: 'Frekuensi Sync', value: 'Harian', description: 'Update data real-time.' },
                    { label: 'Departemen', value: 'Multi', description: 'Visibilitas lintas departemen.' },
                    { label: 'Efisiensi', value: '+40%', description: 'Peningkatan penjadwalan perawatan.' }
                ],
                timeline: [
                    { phase: 'Riset', period: 'Minggu 1-2', activities: ['Wawancara stakeholder', 'Analisis proses saat ini', 'Pemetaan pain point'] },
                    { phase: 'Desain', period: 'Minggu 3-4', activities: ['Arsitektur informasi', 'Wireframing', 'Desain UI'] },
                    { phase: 'Pengembangan', period: 'Minggu 5-6', activities: ['Implementasi dashboard', 'Integrasi data', 'Testing & iterasi'] }
                ],
                mitigationPlans: [
                    { risk: 'Akurasi Data', action: 'Menerapkan validasi database real-time dan sinkronisasi otomatis.' },
                    { risk: 'Adopsi User', action: 'Mengadakan sesi pelatihan dan membuat alur onboarding yang user-friendly.' }
                ],
                personas: [
                    { role: 'Staff Fasilitas', pain: 'Sulit memantau kondisi aset kantor secara manual.', goal: 'Dashboard monitoring yang komprehensif dan mudah diakses.' },
                    { role: 'Kepala Departemen', pain: 'Tidak ada visibilitas lintas departemen.', goal: 'Sistem terpusat untuk monitoring semua fasilitas.' }
                ],
                businessModel: [
                    { type: 'Efisiensi Operasional', value: 'Pengurangan waktu administratif hingga 40% melalui penjadwalan otomatis.' },
                    { type: 'Umur Aset', value: 'Perawatan proaktif memperpanjang umur unit AC dan mengurangi biaya penggantian.' }
                ],
                beforeAfter: [
                    { aspect: 'Metode Monitoring', before: 'Pencatatan manual berbasis kertas', after: 'Dashboard digital berbasis cloud' },
                    { aspect: 'Penjadwalan', before: 'Perawatan reaktif/tidak terjadwal', after: 'Penjadwalan otomatis proaktif' },
                    { aspect: 'Visibilitas Data', before: 'Terbatas per departemen', after: 'Tampilan terpusat lintas departemen' },
                    { aspect: 'Manajemen Aset', before: 'Risiko tinggi kerusakan tidak terdeteksi', after: 'Monitoring kondisi proaktif' }
                ],
                vision: 'Mengoptimalkan efisiensi perawatan fasilitas melalui digitalisasi monitoring aset yang adaptif dan user-centric.',
                background: 'Selama magang di PT Dharma Polimetal Tbk., saya ditugaskan untuk mendigitalisasi proses monitoring perawatan AC yang sebelumnya masih menggunakan sistem manual berbasis kertas. Proyek ini menjadi ekspansi dari ekosistem digital HRGA setelah keberhasilan proyek Doors.',
                strategicAlignment: 'Menunjukkan kemampuan dalam mendigitalisasi proses manual menjadi sistem yang efisien dan terintegrasi.',
                investmentRequired: '6 Minggu Desain & Pengembangan',
                assumptions: '1. Staff lebih memilih dashboard digital daripada kertas untuk monitoring harian.\n2. Berbagi data lintas departemen akan meningkatkan koordinasi perawatan.',
                productArchitecture: 'React (Frontend), Supabase (Database & Auth), Node.js (API)',
                coreFeatures: [
                    { name: 'Dashboard Terpusat', desc: 'Tampilan tunggal untuk semua status unit AC lintas departemen.' },
                    { name: 'Penjadwalan Perawatan', desc: 'Penjadwalan otomatis untuk perawatan dan servicing rutin.' },
                    { name: 'Database Aset', desc: 'Database komprehensif semua unit AC dengan spesifikasi teknis.' },
                    { name: 'Pelacakan Status', desc: 'Monitoring real-time kondisi dan riwayat perawatan AC.' }
                ],
                designSystem: 'Desain dashboard korporat dengan fokus pada keterbacaan data dan navigasi efisien untuk penggunaan internal. Layout bersih dengan hierarki visual yang jelas.',
                designTools: ['Figma (UI/Prototyping)', 'FigJam (Pemetaan Proses)', 'Paper & Pen (Wireframing)'],
                researchMethods: ['Contextual Inquiry', 'Process Mapping', 'User Flow Design'],
                uxOverview: 'Interface berbasis dashboard dengan visualisasi data real-time. Fokus pada kejelasan dan pengambilan keputusan cepat untuk staff fasilitas.'
            }
        }
    },
    {
        id: 'lmk-qc-report',
        title: 'LMK QC',
        category: 'Quality Control',
        image: '/projects/10. LMK QC Report/1.qc.png',
        showcaseImages: [
            '/projects/10. LMK QC Report/1.qc.png',
            '/projects/10. LMK QC Report/2.qc.png',
            '/projects/10. LMK QC Report/3.qc.png',
            '/projects/10. LMK QC Report/4.qc.png',
            '/projects/10. LMK QC Report/5.qc.png'
        ],
        tagline: 'Quality Control Reporting & Documentation System.',
        description: 'A structured quality control reporting system for LMK (Lembaga Masyarakat Kecamatan) to streamline inspection processes and ensure consistent quality documentation across projects.',
        problem: 'QC reporting was fragmented and inconsistent, making it difficult to track quality metrics and maintain standardized documentation across different project sites.',
        solution: 'Designed a unified QC reporting template with standardized metrics, visual documentation workflow, and centralized tracking for quality assurance compliance.',
        impact: 'Improved QC documentation consistency, reduced reporting time, and enabled better quality tracking across all LMK project sites.',
        tags: ['Quality Control', 'Documentation', 'Process Optimization', 'Figma', 'Standardization'],
        size: 'medium',
        problemMap: [
            {
                problem: 'Inconsistent Reporting',
                context: "QC reports varied across sites with no standardized format.",
                solution: 'Unified Template',
                mitigation: 'Created standardized QC report template with mandatory fields and consistent structure.'
            },
            {
                problem: 'Manual Documentation',
                context: "Photo documentation and metrics were scattered across multiple channels.",
                solution: 'Centralized System',
                mitigation: 'Single source of truth for all QC documentation with version control.'
            },
            {
                problem: 'Tracking Difficulty',
                context: "Hard to track quality trends and identify recurring issues.",
                solution: 'Visual Dashboard',
                mitigation: 'Dashboard view for quick quality overview and issue identification.'
            }
        ],
        stats: [
            { label: 'Reports Standardized', value: '100%', description: 'All sites using unified template.' },
            { label: 'Reporting Time', value: '-30%', description: 'Faster QC documentation process.' },
            { label: 'Issue Tracking', value: 'Real-time', description: 'Immediate visibility of quality issues.' },
            { label: 'Compliance', value: 'Improved', description: 'Better quality assurance compliance.' }
        ],
        timeline: [
            { phase: 'Analysis', period: 'Week 1', activities: ['Current process audit', 'Stakeholder interviews', 'Gap analysis'] },
            { phase: 'Design', period: 'Week 2-3', activities: ['Template design', 'Workflow mapping', 'Review cycle'] },
            { phase: 'Implementation', period: 'Week 4', activities: ['Template rollout', 'Training', 'Feedback iteration'] }
        ],
        mitigationPlans: [
            { risk: 'Adoption Resistance', action: 'Conduct training sessions and provide hands-on support during transition.' },
            { risk: 'Data Consistency', action: 'Implement validation rules and mandatory fields in reporting template.' }
        ],
        personas: [
            { role: 'QC Inspector', pain: 'Inconsistent templates make reporting tedious and error-prone.', goal: 'Streamlined process with clear guidelines.' },
            { role: 'Project Manager', pain: 'Difficulty tracking quality across multiple sites.', goal: 'Centralized view of all QC metrics and issues.' }
        ],
        businessModel: [
            { type: 'Process Efficiency', value: 'Reduced reporting time allows inspectors to focus on actual quality checks.' },
            { type: 'Quality Assurance', value: 'Standardized reporting improves compliance and audit readiness.' }
        ],
        beforeAfter: [
            { aspect: 'Reporting Format', before: 'Varied templates across sites', after: 'Unified standardized template' },
            { aspect: 'Documentation', before: 'Scattered photos and notes', after: 'Centralized structured documentation' },
            { aspect: 'Issue Tracking', before: 'Manual follow-up required', after: 'Real-time visibility and alerts' },
            { aspect: 'Compliance', before: 'Inconsistent quality records', after: 'Standardized audit-ready documentation' }
        ],
        vision: 'To establish a culture of consistent quality control through standardized documentation and transparent reporting across all LMK project sites.',
        status: 'COMPLETED',
        team: 'Sulthan Abdi Dzikry (Product Designer)',
        background: 'During my work with LMK projects, I identified that quality control reporting lacked standardization across different sites. This inconsistency made it challenging to maintain quality standards and track improvement areas. I designed a unified QC reporting system to address these gaps.',
        strategicAlignment: 'Demonstrates ability to optimize operational processes through thoughtful documentation design and standardization.',
        investmentRequired: '4 Weeks Design & Implementation / 1 Product Designer',
        assumptions: '1. Inspectors will benefit from structured templates over free-form reporting.\n2. Centralized documentation will improve cross-site quality visibility.',
        productArchitecture: 'Figma (Template Design), Google Workspace (Documentation & Sharing)',
        coreFeatures: [
            { name: 'Standardized Template', desc: 'Unified QC report format with mandatory fields and visual guidelines.' },
            { name: 'Photo Documentation', desc: 'Structured photo evidence with metadata and timestamp.' },
            { name: 'Issue Tracker', desc: 'Categorized issue logging with severity levels and status tracking.' },
            { name: 'Summary Dashboard', desc: 'Quick overview of quality metrics across all sites.' }
        ],
        designSystem: 'Clean, professional layout with clear visual hierarchy. Uses tables and structured grids for data readability. Color-coded severity indicators for quick issue identification.',
        designTools: ['Figma (Template Design)', 'Google Sheets (Data Structure)', 'FigJam (Process Mapping)'],
        researchMethods: ['Process Observation', 'Stakeholder Interviews', 'Template Iteration'],
        uxOverview: 'Form-based reporting interface with clear sections for different QC aspects. Emphasis on quick data entry and visual documentation attachment.',
        translations: {
            id: {
                tagline: 'Sistem Pelaporan & Dokumentasi Quality Control.',
                description: 'Sistem pelaporan quality control terstruktur untuk LMK (Lembaga Masyarakat Kecamatan) untuk merampingkan proses inspeksi dan memastikan dokumentasi kualitas yang konsisten di seluruh proyek.',
                problem: 'Pelaporan QC terfragmentasi dan tidak konsisten, menyulitkan pelacakan metrik kualitas dan menjaga dokumentasi standar di berbagai lokasi proyek.',
                solution: 'Mendesain template pelaporan QC terpadu dengan metrik standar, alur kerja dokumentasi visual, dan pelacakan terpusat untuk kepatuhan jaminan kualitas.',
                impact: 'Meningkatkan konsistensi dokumentasi QC, mengurangi waktu pelaporan, dan memungkinkan pelacakan kualitas yang lebih baik di seluruh lokasi proyek LMK.',
                problemMap: [
                    {
                        problem: 'Pelaporan Tidak Konsisten',
                        context: "Laporan QC berbeda-beda di tiap lokasi tanpa format standar.",
                        solution: 'Template Terpadu',
                        mitigation: 'Membuat template laporan QC standar dengan field wajib dan struktur konsisten.'
                    },
                    {
                        problem: 'Dokumentasi Manual',
                        context: "Dokumentasi foto dan metrik tersebar di berbagai channel.",
                        solution: 'Sistem Terpusat',
                        mitigation: 'Single source of truth untuk semua dokumentasi QC dengan version control.'
                    },
                    {
                        problem: 'Kesulitan Pelacakan',
                        context: "Sulit melacak tren kualitas dan mengidentifikasi masalah berulang.",
                        solution: 'Dashboard Visual',
                        mitigation: 'Tampilan dashboard untuk overview kualitas cepat dan identifikasi masalah.'
                    }
                ],
                stats: [
                    { label: 'Laporan Terstandarisasi', value: '100%', description: 'Semua lokasi menggunakan template terpadu.' },
                    { label: 'Waktu Pelaporan', value: '-30%', description: 'Proses dokumentasi QC lebih cepat.' },
                    { label: 'Pelacakan Masalah', value: 'Real-time', description: 'Visibilitas langsung masalah kualitas.' },
                    { label: 'Kepatuhan', value: 'Meningkat', description: 'Kepatuhan jaminan kualitas lebih baik.' }
                ],
                timeline: [
                    { phase: 'Analisis', period: 'Minggu 1', activities: ['Audit proses saat ini', 'Wawancara stakeholder', 'Analisis gap'] },
                    { phase: 'Desain', period: 'Minggu 2-3', activities: ['Desain template', 'Pemetaan alur kerja', 'Siklus review'] },
                    { phase: 'Implementasi', period: 'Minggu 4', activities: ['Rollout template', 'Pelatihan', 'Iterasi feedback'] }
                ],
                mitigationPlans: [
                    { risk: 'Penolakan Adopsi', action: 'Mengadakan sesi pelatihan dan memberikan dukungan hands-on selama transisi.' },
                    { risk: 'Konsistensi Data', action: 'Menerapkan aturan validasi dan field wajib di template pelaporan.' }
                ],
                personas: [
                    { role: 'Inspektur QC', pain: 'Template tidak konsisten membuat pelaporan melelahkan dan rawan error.', goal: 'Proses yang efisien dengan panduan jelas.' },
                    { role: 'Manajer Proyek', pain: 'Kesulitan melacak kualitas di banyak lokasi.', goal: 'Tampilan terpusat semua metrik QC dan masalah.' }
                ],
                businessModel: [
                    { type: 'Efisiensi Proses', value: 'Pengurangan waktu pelaporan memungkinkan inspektur fokus pada pengecekan kualitas aktual.' },
                    { type: 'Jaminan Kualitas', value: 'Pelaporan terstandarisasi meningkatkan kepatuhan dan kesiapan audit.' }
                ],
                beforeAfter: [
                    { aspect: 'Format Pelaporan', before: 'Template berbeda-beda di tiap lokasi', after: 'Template terstandarisasi terpadu' },
                    { aspect: 'Dokumentasi', before: 'Foto dan catatan tersebar', after: 'Dokumentasi terstruktur terpusat' },
                    { aspect: 'Pelacakan Masalah', before: 'Follow-up manual diperlukan', after: 'Visibilitas real-time dan alert' },
                    { aspect: 'Kepatuhan', before: 'Rekaman kualitas tidak konsisten', after: 'Dokumentasi standar siap audit' }
                ],
                vision: 'Membangun budaya quality control yang konsisten melalui dokumentasi standar dan pelaporan transparan di seluruh lokasi proyek LMK.',
                background: 'Selama bekerja dengan proyek LMK, saya mengidentifikasi bahwa pelaporan quality control kurang standarisasi di berbagai lokasi. Inkonsistensi ini menyulitkan menjaga standar kualitas dan melacak area perbaikan. Saya mendesain sistem pelaporan QC terpadu untuk mengatasi celah-celah ini.',
                strategicAlignment: 'Menunjukkan kemampuan mengoptimasi proses operasional melalui desain dokumentasi yang thoughtfull dan standarisasi.',
                investmentRequired: '4 Minggu Desain & Implementasi',
                assumptions: '1. Inspektur akan mendapat manfaat dari template terstruktur dibanding pelaporan bebas.\n2. Dokumentasi terpusat akan meningkatkan visibilitas kualitas lintas lokasi.',
                productArchitecture: 'Figma (Desain Template), Google Workspace (Dokumentasi & Sharing)',
                coreFeatures: [
                    { name: 'Template Terstandarisasi', desc: 'Format laporan QC terpadu dengan field wajib dan panduan visual.' },
                    { name: 'Dokumentasi Foto', desc: 'Bukti foto terstruktur dengan metadata dan timestamp.' },
                    { name: 'Pelacak Masalah', desc: 'Pencatatan masalah terkategori dengan level severity dan tracking status.' },
                    { name: 'Dashboard Ringkasan', desc: 'Overview cepat metrik kualitas di seluruh lokasi.' }
                ],
                designSystem: 'Layout bersih dan profesional dengan hierarki visual jelas. Menggunakan tabel dan grid terstruktur untuk keterbacaan data. Indikator severity berwarna untuk identifikasi masalah cepat.',
                designTools: ['Figma (Desain Template)', 'Google Sheets (Struktur Data)', 'FigJam (Pemetaan Proses)'],
                researchMethods: ['Observasi Proses', 'Wawancara Stakeholder', 'Iterasi Template'],
                uxOverview: 'Interface pelaporan berbasis form dengan section jelas untuk aspek QC berbeda. Penekanan pada entry data cepat dan attachment dokumentasi visual.'
            }
        }
    },
    {
        id: 'cbl-property',
        title: 'CBL Property',
        category: 'UI/UX Design',
        image: '/projects/cbl_new_thumb_v2.png',
        showcaseImages: [
            '/projects/cbl_new_thumb_v2.png',
            '/projects/cbl_cover.png',
            '/projects/cbl_2.png',
            '/projects/cbl_3.png'
        ],
        tagline: 'Trustworthy Property Trading at Your Fingertips.',
        description: 'A streamlined property marketplace app focusing on user trust and direct engagement.',
        problem: 'Potential homebuyers struggled with cluttered interfaces and lack of direct agent communication, while agents faced low lead quality due to poor filtering.',
        solution: 'Designed a clean, minimalist UI focusing on advanced filtering, immersive property previews, and a direct "Chat with Agent" feature to build trust and simplify navigation.',
        impact: 'Streamlined the property search process (Conceptual), aiming to increase user retention and lead generation quality by reducing friction in the contact loop.',
        tags: ['Figma', 'Website Design', 'Prototyping'],
        size: 'large',
        problemMap: [
            {
                problem: 'Information Overload',
                context: "Users are bombarded with irrelevant listings and messy data.",
                solution: 'Smart Filtering',
                mitigation: 'Context-aware filters reduce noise by 60%, showing only relevant properties.'
            },
            {
                problem: 'Trust Deficit',
                context: "Fear of fake listings or unresponsive agents.",
                solution: 'Verified Agent Badges',
                mitigation: 'Visual trust indicators and direct chat features bridge the trust gap.'
            },
            {
                problem: 'Navigation Fatigue',
                context: "Too many clicks to find essential details.",
                solution: 'Immersive Previews',
                mitigation: 'Key details and gallery view available directly from the card list.'
            }
        ],
        stats: [
            { label: 'Search Efficiency', value: '+40%', description: 'Faster property discovery via smart filters.' },
            { label: 'Lead Quality', value: 'High', description: 'Direct chat pre-qualifies interest.' },
            { label: 'User Retention', value: '+15%', description: 'Estimated increase due to better UX.' }
        ],
        timeline: [
            { phase: 'Discovery', period: 'Week 1-2', activities: ['Competitor Analysis', 'User Persona Creation', 'Pain Point Mapping'] },
            { phase: 'Ideation', period: 'Week 3-4', activities: ['Wireframing', 'User Flow Design', 'Low-fidelity Prototypes'] },
            { phase: 'Design', period: 'Week 5-6', activities: ['High-fidelity UI', 'Interaction Design', 'Prototyping in Figma'] }
        ],
        mitigationPlans: [
            { risk: 'Fake Listings', action: 'Implement mandatory "Verified" badge system for agents and properties.' },
            { risk: 'User Drop-off', action: 'Simplified login with social auth and guest mode browsing.' }
        ],
        personas: [
            { role: 'First-time Buyer', pain: 'Overwhelmed by confusing data and fear of scams.', goal: 'Find a trusted property quickly without technical jargon.' },
            { role: 'Property Agent', pain: 'Wasting time on unqualified leads.', goal: 'Connect with serious buyers and close deals faster.' }
        ],
        businessModel: [
            { type: 'Lead Generation', value: 'High-quality, verified leads justify premium agent subscription fees.' },
            { type: 'Trust Economy', value: 'Verified badge system creates a barrier to entry, increasing platform value.' }
        ],
        beforeAfter: [
            { aspect: 'Search Experience', before: 'Endless scrolling through irrelevant listings.', after: 'Filtered results in < 3 clicks.' },
            { aspect: 'Agent Trust', before: 'Skepticism and fear of "ghosting".', after: 'Verified badges and instant chat build confidence.' }
        ],
        // New PRD Specific Fields
        vision: 'To become the most trusted property marketplace in Indonesia by bridging the gap between digital convenience and human reliability.',
        status: 'ON TRACK',
        team: 'Sulthan Abdi Dzikry (Product Designer)',
        background: 'The Indonesian property market is fragmented. Existing platforms focus on quantity of listings over quality of interactions, leading to low trust and high frustration for both buyers and serious agents.',
        strategicAlignment: 'Aligns with the portfolio goal of demonstrating ability to solve "Trust" and "Communication" problems in high-stake markets.',
        investmentRequired: '2 Months Design & Development / 1 Product Designer',
        assumptions: '1. Users prefer in-app chat over direct phone calls for initial inquiries.\n2. Agents will undergo verification if it guarantees higher quality leads.',
        productArchitecture: 'React Native (Mobile App), Firebase (Real-time Chat & Auth), Node.js (Backend API)',
        coreFeatures: [
            { name: 'Verified Agent System', desc: 'Badge system based on license verification.' },
            { name: 'Direct In-App Chat', desc: 'Real-time messaging with "Offer" and "Share" capability.' },
            { name: 'Smart Filters', desc: 'Filter by "Non-flood zone", "Wide road access", etc.' }
        ],
        // New Product Designer Specific Fields
        designSystem: 'Atomic Design methodology with 8pt Grid System. Primary color #10B981 (Trust/Green) used for CTA to induce calm and safety.',
        designTools: ['Figma (UI/Prototyping)', 'Maze (Usability Testing)', 'Adobe Illustrator (Icons)'],
        researchMethods: ['User Interviews (5 Buyers, 3 Agents)', 'Competitor Benchmarking (Rumah123, Traveloka)', 'Usability Testing (Moderated)'],
        uxOverview: 'Clean, minimalist mobile-first interface with bottom navigation. "Dark Mode" support for night-time browsing.',
        translations: {
            id: {
                tagline: 'Cari Properti Jadi Lebih Aman & Terpercaya.',
                description: 'Aplikasi marketplace properti yang didesain untuk mempermudah pencarian rumah impian dengan transparansi penuh antara agen dan pembeli.',
                problem: 'Calon pembeli seringkali merasa bingung dengan banyaknya data properti yang tidak terorganisir dan kekhawatiran akan agen yang tidak responsif atau tidak terpercaya.',
                solution: 'Menghadirkan UI yang bersih dan minimalis dengan fitur smart filtering, pratinjau properti yang imersif, serta fitur chat langsung dengan agen untuk membangun kepercayaan secara instan.',
                impact: 'Menyederhanakan proses pencarian properti secara signifikan, sekaligus meningkatkan kualitas interaksi antara pembeli dan agen.',
                problemMap: [
                    {
                        problem: 'Informasi Terlalu Padat',
                        context: "Pengguna sering merasa kewalahan dengan banyaknya iklan properti yang tidak relevan.",
                        solution: 'Filter Cerdas (Smart Filtering)',
                        mitigation: 'Mengurangi distraksi data hingga 60%, memastikan hanya properti yang sesuai kriteria yang muncul.'
                    },
                    {
                        problem: 'Krisis Kepercayaan',
                        context: "Rasa takut akan iklan palsu atau agen yang sulit dihubungi.",
                        solution: 'Lencana Agen Terverifikasi',
                        mitigation: 'Indikator visual agen resmi dan fitur chat real-time untuk menjamin keamanan transaksi.'
                    },
                    {
                        problem: 'Navigasi Melelahkan',
                        context: "Terlalu banyak langkah/klik hanya untuk melihat detail dasar properti.",
                        solution: 'Preview Imersif',
                        mitigation: 'Detail utama dan galeri foto dapat diakses langsung dari halaman pencarian tanpa perlu pindah tab.'
                    }
                ],
                stats: [
                    { label: 'Efisiensi Pencarian', value: '+40%', description: 'Penemuan properti jadi jauh lebih cepat.' },
                    { label: 'Kualitas Lead', value: 'Tinggi', description: 'Chat langsung memfilter pembeli yang serius.' },
                    { label: 'Retensi Pengguna', value: '+15%', description: 'Pengalaman aplikasi yang nyaman membuat user betah.' }
                ],
                timeline: [
                    { phase: 'Riset & Penemuan', period: 'Minggu 1-2', activities: ['Analisis Kompetitor', 'Pemetaan Profil User', 'Audit Pain Points'] },
                    { phase: 'Ideasi & Alur', period: 'Minggu 3-4', activities: ['Wireframing', 'Desain Alur Pengguna', 'Prototipe Rendah (Lo-fi)'] },
                    { phase: 'Desain Visual', period: 'Minggu 5-6', activities: ['UI High-fidelity', 'Desain Interaksi', 'Prototyping di Figma'] }
                ],
                mitigationPlans: [
                    { risk: 'Iklan Palsu', action: 'Menerapkan sistem verifikasi wajib bagi semua agen dan listing properti.' },
                    { risk: 'User Drop-off', action: 'Mempermudah proses login dan menyediakan mode "Simpan Dulu" tanpa akun.' }
                ],
                personas: [
                    { role: 'Pembeli Pertama', pain: 'Bingung dengan istilah teknis dan takut tertipu.', goal: 'Menemukan rumah pertama dengan proses yang aman dan simpel.' },
                    { role: 'Agen Properti', pain: 'Lelah melayani pertanyaan dari pembeli yang tidak serius.', goal: 'Terhubung dengan calon pembeli berkualitas dan closing lebih cepat.' }
                ],
                businessModel: [
                    { type: 'Lead Generation', value: 'Sistem filter memastikan agen mendapatkan prospek pembeli yang benar-benar tertarik.' },
                    { type: 'Trust Economy', value: 'Kepercayaan menjadi nilai jual utama platform dibanding marketplace konvensional.' }
                ],
                beforeAfter: [
                    { aspect: 'Pengalaman Cari', before: 'Scroll tanpa henti di daftar yang berantakan.', after: 'Dapatkan hasil yang relevan dalam kurang dari 3 klik.' },
                    { aspect: 'Kepercayaan', before: 'Ragu dan takut kena "ghosting" agen.', after: 'Lencana verifikasi dan chat instan memberikan rasa aman.' }
                ],
                vision: 'Menjadi marketplace properti paling terpercaya di Indonesia dengan mengedepankan keamanan informasi dan kemudahan komunikasi.',
                background: 'Pasar properti digital di Indonesia saat ini masih didominasi oleh platform yang hanya fokus pada kuantitas iklan, bukan kualitas interaksi. Hal ini seringkali menimbulkan frustrasi bagi kedua belah pihak.',
                strategicAlignment: 'Menunjukkan kemampuan dalam memecahkan masalah kompleks seperti "Kepercayaan" lewat pendekatan desain yang strategis.',
                investmentRequired: '2 Bulan (Fase Desain & Pengembangan)',
                assumptions: '1. Pengguna lebih suka chat langsung daripada telepon untuk tanya-tanya awal.\n2. Agen bersedia diverifikasi demi mendapatkan kualitas pembeli yang lebih baik.',
                productArchitecture: 'React Native (Mobile), Firebase (Chat), Node.js (API)',
                coreFeatures: [
                    { name: 'Sistem Agen Terverifikasi', desc: 'Validasi lisensi agen untuk menjamin listing asli.' },
                    { name: 'Chat Real-time', desc: 'Fitur negosiasi dan kirim lokasi langsung di dalam aplikasi.' },
                    { name: 'Filter Hunian Strategis', desc: 'Filter khusus seperti "Bebas Banjir" atau "Akses Jalan Lebar".' }
                ],
                uxOverview: 'Desain mobile-first dengan navigasi yang intuitif. Menggunakan skema warna yang menenangkan untuk memunculkan aura profesionalisme.',
                designSystem: 'Metodologi Atomic Design dengan skala grid 8pt. Warna primer #10B981 digunakan untuk memberikan kesan aman dan terpercaya.',
                designTools: ['Figma', 'Maze (Testing)', 'Adobe Illustrator'],
                researchMethods: ['Wawancara Mendalam (User Interviews)', 'Benchmarking Kompetitor', 'Usability Testing']
            }
        }
    },
    {
        id: 'grand-telar',
        title: 'Grand Telar Residence',
        category: 'Web Development',
        image: '/projects/gtr_new_thumb_v2.png',
        showcaseImages: [
            '/projects/gtr_new_thumb_v2.png',
            '/projects/gtl_cover.png',
            '/projects/gtl_2.png',
            '/projects/gtl_3.png',
            '/projects/gtl_4.png'
        ],
        tagline: 'Unifying Sales and Inventory in One Ecosystem.',
        description: 'Dual-interface system for housing marketing and internal administration.',
        problem: 'Manual management of housing unit inventory and sales data was inefficient, prone to error, and lacked a professional customer-facing showcase.',
        solution: 'Developed a dual-interface system: a responsive public website for unit showcases and a secure admin dashboard for inventory/sales management.',
        impact: 'Centralized data management, reduced manual administrative errors by ~40%, and provided a professional digital presence for the residence.',
        team: [
            { name: 'Rifan Nurfakhri', role: 'Fullstack Developer', link: 'https://www.linkedin.com/in/rifanfakhri/' },
            { name: 'Sulthan Abdi Dzikry', role: 'UI/UX Designer', link: '' }
        ],
        tags: ['React', 'Laravel', 'Dashboard'],
        size: 'medium',
        problemMap: [
            {
                problem: 'Inventory Synchronization',
                context: "Sales team selling units that were already booked.",
                solution: 'Real-time Database',
                mitigation: 'Instant updates prevent double-booking across all channels.'
            },
            {
                problem: 'Manual Reporting',
                context: "Hours spent compiling spreadsheets.",
                solution: 'Automated Dashboard',
                mitigation: 'One-click generated PDF reports for management.'
            }
        ],
        stats: [
            { label: 'Admin Errors', value: '-40%', description: 'Significant reduction in manual entry mistakes.' },
            { label: 'Data Accuracy', value: '99%', description: 'Single source of truth for inventory.' },
            { label: 'Sales Process', value: 'Faster', description: 'Digital catalog accelerates customer decision.' }
        ],
        timeline: [
            { phase: 'Backend Setup', period: 'Month 1', activities: ['Database Design', 'Laravel API Development'] },
            { phase: 'Frontend Dev', period: 'Month 2', activities: ['Public Site UI', 'Admin Dashboard Implementation'] },
            { phase: 'Deployment', period: 'Week 9', activities: ['Server Setup', 'User Training'] }
        ],
        mitigationPlans: [
            { risk: 'Data Loss', action: 'Automated daily cloud backups with 30-day retention.' },
            { risk: 'Security Breaches', action: 'Strict Role-Based Access Control (RBAC) for admin staff.' }
        ],
        personas: [
            { role: 'Marketing Manager', pain: 'Chaos from manual spreadsheets and double bookings.', goal: 'Streamlined sales process and accurate real-time reports.' },
            { role: 'Home Buyer', pain: 'Unsure about unit availability and specs.', goal: 'Clear visual information and instant availability confirmation.' }
        ],
        businessModel: [
            { type: 'Operational Efficiency', value: 'Reducing admin errors by 40% directly saves ~20 man-hours/week.' },
            { type: 'Sales Acceleration', value: 'Digital showcase reduces sales cycle duration by providing instant info.' }
        ],
        beforeAfter: [
            { aspect: 'Inventory Status', before: 'Check spreadsheet manually (prone to sync errors).', after: 'Real-time database sync prevents double bookings.' },
            { aspect: 'Sales Reporting', before: 'Weekly manual compilation (Hours of work).', after: 'Instant 1-click PDF generation.' }
        ],
        // New PRD Fields
        vision: 'To create a seamless property management ecosystem that bridges digital marketing with operational efficiency.',
        status: 'COMPLETED',
        team: 'Sulthan Abdi Dzikry (Full Stack Developer)',
        background: 'Marketing housing units involves complex data synchronization. Manual methods led to double bookings and slow reporting, necessitating a digital transformation.',
        strategicAlignment: 'Demonstrates Full Stack capabilities (Laravel + React) and ability to build complex internal tools.',
        investmentRequired: '2 Months / 1 Full Stack Developer',
        assumptions: '1. Admin staff have basic computer literacy.\n2. Real-time availability is the primary conversion driver for buyers.',
        productArchitecture: 'Laravel (Backend API), React (Frontend), MySQL (Database), JWT (Auth)',
        coreFeatures: [
            { name: 'Unified Inventory', desc: 'Single database source for both public site and admin dashboard.' },
            { name: 'Automated Reporting', desc: 'One-click PDF generation for weekly sales reports.' },
            { name: 'Role-Based Access', desc: 'Secure login for Admin, Sales, and Manager roles.' }
        ],
        designSystem: 'Corporate Clean style. Dashboard uses a dense data-grid layout for efficiency. Public site uses large imagery for emotional appeal.',
        designTools: ['Figma (UI)', 'Postman (API Testing)', 'VS Code'],
        researchMethods: ['Internal Stakeholder Interviews', 'Workflow Analysis'],
        uxOverview: 'Dual-persona UX: "Efficiency First" for Admins (Dashboard) vs "Visual First" for Buyers (Public Site).',
        translations: {
            id: {
                tagline: 'Digitalisasi Manajemen Stok & Penjualan Real-time.',
                description: 'Platform manajemen properti terpadu untuk tim internal dan katalog unit untuk calon pembeli.',
                problem: 'Pengelolaan inventaris perumahan yang masih manual sering menyebabkan data tidak sinkron, stok ganda, dan proses pemasaran yang lambat.',
                solution: 'Membangun aplikasi dengan dua sisi: Panel Admin untuk manajemen stok dan situs Marketing sebagai katalog interaktif bagi pembeli.',
                impact: 'Meningkatkan akurasi data stok hingga 100% dan mempercepat proses reservasi unit oleh tim sales.',
                problemMap: [
                    {
                        problem: 'Data Tidak Sinkron',
                        context: "Sales menjual unit yang sebenarnya sudah laku.",
                        solution: 'Dashboard Inventaris Live',
                        mitigation: 'Setiap reservasi langsung memotong stok secara real-time.'
                    },
                    {
                        problem: 'Katalog Berantakan',
                        context: "Pembeli sulit melihat posisi unit yang tersedia.",
                        solution: 'Peta Plot Interaktif',
                        mitigation: 'Visualisasi status unit (Tersedia/Sold/Booked) yang mudah dipahami.'
                    }
                ],
                stats: [
                    { label: 'Akurasi Stok', value: '100%', description: 'Tidak ada lagi penjualan ganda.' },
                    { label: 'Kecepatan Sales', value: '+50%', description: 'Cek stok dan booking bisa dilakukan di tempat.' },
                    { label: 'Proses Penjualan', value: 'Efisien', description: 'Katalog digital mempercepat keputusan pelanggan.' }
                ],
                timeline: [
                    { phase: 'Persiapan Backend', period: 'Bulan 1', activities: ['Desain Database', 'Pengembangan API Laravel'] },
                    { phase: 'Dev Frontend', period: 'Bulan 2', activities: ['UI Situs Publik', 'Implementasi Dasbor Admin'] },
                    { phase: 'Peluncuran', period: 'Minggu 9', activities: ['Setup Server', 'Pelatihan Staf'] }
                ],
                mitigationPlans: [
                    { risk: 'Kehilangan Data', action: 'Backup cloud harian otomatis dengan retensi 30 hari.' },
                    { risk: 'Pelanggaran Keamanan', action: 'Kontrol Akses Berbasis Peran (RBAC) ketat untuk staf admin.' }
                ],
                personas: [
                    { role: 'Manajer Pemasaran', pain: 'Bingung mengelola data manual dan sering terjadi double booking.', goal: 'Proses penjualan yang rapi dan laporan real-time yang akurat.' },
                    { role: 'Pembeli Rumah', pain: 'Ragu dengan ketersediaan unit dan spesifikasi teknis.', goal: 'Informasi visual yang jelas dan kepastian stok unit secara instan.' }
                ],
                businessModel: [
                    { type: 'Efisiensi Operasional', value: 'Mengurangi kesalahan admin sebesar 40%, menghemat waktu tim hingga 20 jam/minggu.' },
                    { type: 'Kecepatan Penjualan', value: 'Katalog digital memangkas siklus penjualan karena informasi tersedia instan.' }
                ],
                beforeAfter: [
                    { aspect: 'Status Stok', before: 'Cek manual di spreadsheet yang sering telat update.', after: 'Sinkronisasi live mencegah risiko double booking.' },
                    { aspect: 'Laporan Sales', before: 'Rekap manual mingguan yang memakan waktu berjam-jam.', after: 'Satu klik untuk generate laporan PDF instan.' }
                ],
                // PRD ID
                vision: 'Menciptakan ekosistem manajemen properti yang menghubungkan pemasaran digital dengan efisiensi operasional.',
                status: 'SELESAI',
                team: 'Sulthan Abdi Dzikry (Full Stack Developer)',
                background: 'Pemasaran perumahan membutuhkan sinkronisasi data yang ketat. Metode manual sering memicu masalah stok dan pelaporan yang lambat.',
                strategicAlignment: 'Menunjukkan kemampuan Full Stack (Laravel + React) dalam membangun alat internal yang kompleks.',
                investmentRequired: '2 Bulan (Fase Desain & Pengembangan)',
                assumptions: '1. Staf admin memiliki kemampuan dasar komputer.\n2. Kepastian stok secara real-time adalah faktor utama pembeli untuk booking.',
                productArchitecture: 'Laravel (Backend API), React (Frontend), MySQL (Database), JWT (Auth)',
                coreFeatures: [
                    { name: 'Inventaris Terpusat', desc: 'Satu sumber data untuk situs publik dan dashboard admin.' },
                    { name: 'Laporan Otomatis', desc: 'Generate laporan penjualan mingguan dalam bentuk PDF sekali klik.' },
                    { name: 'Akses Berbasis Peran', desc: 'Login aman untuk tiap fungsi: Admin, Sales, dan Manajer.' }
                ],
                designSystem: 'Corporate Clean. Dashboard dengan grid padat untuk efisiensi data, Situs Publik dengan visual besar untuk daya tarik emosional.',
                designTools: ['Figma', 'Postman (API Testing)', 'VS Code'],
                researchMethods: ['Wawancara Pemangku Kepentingan', 'Analisis Alur Kerja Tim'],
                uxOverview: 'Pendekatan UX Ganda: "Mengutamakan Efisiensi" untuk Admin dan "Mengutamakan Visual" untuk Pembeli.'
            }
        }
    },
    {
        id: 'joki-in-rush',
        title: 'Joki In Rush',
        category: 'Service Platform',
        image: '/projects/jir_new_thumb_v2.png',
        showcaseImages: [
            '/projects/jir_new_thumb_v2.png',
            '/projects/joki_cover.png',
            '/projects/joki_2.png',
            '/projects/joki_3.png'
        ],
        tagline: 'Professionalizing Academic Assistance Services.',
        description: 'Professional "Company Profile" for an academic assistance service.',
        problem: 'Students seeking academic assistance faced a market full of scams and slow responses, lacking a centralized, trustworthy platform.',
        solution: 'Built a transparent "Company Profile" style website that professionalizes the service, offering clear pricing, service catalogs, and testimonials to build credibility.',
        impact: 'Established a professional brand identity, significantly increasing user trust and simplifying the order inquiry process.',
        tags: ['Web Design', 'Branding', 'Frontend'],
        size: 'medium',
        problemMap: [
            { problem: 'Trust Issues', context: 'Market full of scams.', solution: 'Transparent Pricing & Testimonials', mitigation: 'Social proof and clear catalogs build immediate credibility.' },
            { problem: 'Slow Inquiries', context: 'Manual WhatsApp ping pong.', solution: 'Structured Order Flow', mitigation: 'Direct "Order Now" links with pre-filled messages.' }
        ],
        stats: [
            { label: 'Trust Factor', value: 'High', description: 'Professional web presence vs competitors.' },
            { label: 'Inquiry Rate', value: '+30%', description: 'Streamlined flow reduces hesitation.' }
        ],
        timeline: [
            { phase: 'Branding', period: 'Week 1', activities: ['Logo Design', 'Color Palette Selection'] },
            { phase: 'Web Dev', period: 'Week 2-3', activities: ['Landing Page', 'Service Catalog', 'Mobile Optimisation'] }
        ],
        mitigationPlans: [
            { risk: 'Brand Misuse', action: 'Watermarked portfolio images and strict copyright notices.' }
        ],
        personas: [
            { role: 'Stressed Student', pain: 'Fear of scams and missed deadlines.', goal: 'Reliable help with clear pricing and fast turnaround.' },
            { role: 'Service Provider', pain: 'Handling repetitive "how much?" chats.', goal: 'Automated inquiry filter to focus on execution.' }
        ],
        businessModel: [
            { type: 'Service Arbitrage', value: 'Standardized pricing removes negotiation friction, increasing conversion.' },
            { type: 'Trust Branding', value: 'Professional appearance allows for higher margins compared to generic competitors.' }
        ],
        beforeAfter: [
            { aspect: 'Ordering Process', before: 'Chaotic WhatsApp negotiation.', after: 'Structured catalog with clear pricing tiers.' },
            { aspect: 'Credibility', before: 'Just another anonymous account.', after: 'Professional brand with verifiable reviews.' }
        ],
        // New PRD Fields
        vision: 'To professionalize the academic assistance market by creating a transparent, trustworthy, and efficient service platform.',
        status: 'LIVE',
        team: 'Sulthan Abdi Dzikry (Frontend Developer & Designer)',
        background: 'The academic service market is informal and prone to scams. Students lack a safe way to transact, and legitimate providers struggle to stand out from fraudsters.',
        strategicAlignment: 'Showcases the power of "Design for Trust" - using professional branding to solve market hesitation.',
        investmentRequired: '3 Weeks / 1 Designer-Developer',
        assumptions: '1. Students are willing to pay a premium for guaranteed safety.\n2. Visual professionalism is the strongest signal of legitimacy in this market.',
        productArchitecture: 'Single Page Application (SPA), React, TailwindCSS, WhatsApp API Integration',
        coreFeatures: [
            { name: 'Service Catalog', desc: 'Transparent pricing tiers to eliminate negotiation fatigue.' },
            { name: 'Direct Order Link', desc: 'WhatsApp API integration with pre-filled order templates.' },
            { name: 'Social Proof Section', desc: 'Curated testimonials to build immediate trust.' }
        ],
        designSystem: 'Youthful & Energetic. Vibrant color palette (Orange/Blue) to appeal to students, but with a structured grid to maintain professionalism.',
        designTools: ['Figma (Brand Identity)', 'Canva (Social Media Assets)', 'VS Code'],
        researchMethods: ['Social Media Sentiment Analysis', 'Competitor Observation (Instagram/Twitter)'],
        uxOverview: 'Conversion-focused landing page. Minimal clicks to "Order", with credibility signals (Reviews, Pricing) placed strategically along the scroll path.',
        translations: {
            id: {
                tagline: 'Membangun Brand Terpercaya untuk Layanan Akademik.',
                description: 'Landing page profesional yang mengedepankan transparansi harga dan bukti sosial untuk jasa bantuan akademik.',
                problem: 'Banyak mahasiswa ragu menggunakan jasa bantuan akademik karena branding yang terlihat amatir dan risiko penipuan.',
                solution: 'Menciptakan identitas visual yang profesional dengan alur pesanan yang terintegrasi langsung ke WhatsApp untuk kenyamanan maksimal.',
                impact: 'Meningkatkan kredibilitas jasa dan memudahkan konversi pengunjung menjadi pelanggan lewat navigasi yang to-the-point.',
                problemMap: [
                    { problem: 'Kesan Kurang Profesional', context: 'Terlihat seperti jasa borongan biasa.', solution: 'Branding Korporat', mitigation: 'Desain website yang bersih dan berstandar agensi.' },
                    { problem: 'Alur Pesan Ribet', context: 'Pembeli harus tanya-tanya manual berulang kali.', solution: 'Order Template WhatsApp', mitigation: 'Tombol pesan langsung mengisi form detail pesanan secara otomatis.' }
                ],
                stats: [
                    { label: 'Tingkat Kepercayaan', value: 'Meningkat', description: 'Visual profesional mengurangi keraguan pembeli.' },
                    { label: 'Konversi Chat', value: '+25%', description: 'Template otomatis mempercepat closing.' }
                ],
                timeline: [
                    { phase: 'Branding', period: 'Minggu 1', activities: ['Desain Logo', 'Pemilihan Palet Warna'] },
                    { phase: 'Web Dev', period: 'Minggu 2-3', activities: ['Landing Page', 'Katalog Layanan', 'Optimasi Mobile'] }
                ],
                mitigationPlans: [
                    { risk: 'Penyalahgunaan Merek', action: 'Pemberian watermark pada portofolio dan nota hak cipta yang jelas.' }
                ],
                personas: [
                    { role: 'Mahasiswa Stress', pain: 'Takut tertipu dan khawatir tenggat waktu lewat.', goal: 'Bantuan yang andal dengan harga transparan dan pengerjaan cepat.' },
                    { role: 'Penyedia Layanan', pain: 'Lelah menjawab pertanyaan harga yang berulang-ulang.', goal: 'Filter pertanyaan otomatis agar bisa fokus pada pengerjaan tugas.' }
                ],
                businessModel: [
                    { type: 'Arbitrase Layanan', value: 'Harga standar menghilangkan proses negosiasi yang melelahkan.' },
                    { type: 'Branding Premium', value: 'Tampilan profesional memungkinkan margin harga yang lebih baik dibanding kompetitor.' }
                ],
                beforeAfter: [
                    { aspect: 'Proses Pesanan', before: 'Negosiasi via chat yang berbelit-belit.', after: 'Katalog terstruktur dengan pilihan harga yang jelas.' },
                    { aspect: 'Kredibilitas', before: 'Hanya dianggap sebagai akun anonim biasa.', after: 'Brand profesional dengan ulasan yang kredibel.' }
                ],
                // PRD ID
                vision: 'Memprofesionalkan pasar bantuan akademik melalui platform yang transparan, aman, dan efisien.',
                status: 'LIVE',
                team: 'Sulthan Abdi Dzikry (Frontend Developer & Designer)',
                background: 'Pasar layanan akademik seringkali informal dan rentan penipuan. Dibutuhkan sebuah platform yang menjamin keamanan transaksi.',
                strategicAlignment: 'Menunjukkan kekuatan "Desain Berbasis Kepercayaan" untuk mengatasi keraguan pasar.',
                investmentRequired: '3 Minggu (Desain & Pengembangan)',
                assumptions: '1. Mahasiswa bersedia membayar lebih demi jaminan keamanan.\n2. Profesionalisme visual adalah sinyal kepercayaan terkuat di pasar digital.',
                productArchitecture: 'Single Page Application (SPA), React, TailwindCSS, Integrasi WhatsApp API',
                coreFeatures: [
                    { name: 'Katalog Layanan', desc: 'Pilihan harga transparan untuk menghilangkan rasa lelah saat negosiasi.' },
                    { name: 'Order Template WhatsApp', desc: 'Integrasi WhatsApp API dengan format pesanan otomatis.' },
                    { name: 'Bukti Sosial', desc: 'Testimoni terkurasi untuk membangun kepercayaan instan.' }
                ],
                designSystem: 'Muda & Energik. Palet warna cerah namun tetap rapi untuk menjaga kesan profesional.',
                designTools: ['Figma', 'Canva', 'VS Code'],
                researchMethods: ['Analisis Media Sosial', 'Studi Kompetitor'],
                uxOverview: 'Landing page fokus konversi. Navigasi singkat untuk langsung memesan jasa.'
            }
        }
    },
    {
        id: 'lanyard-design',
        title: 'Event Lanyard',
        category: 'Graphic Design',
        image: '/projects/lanyard_cover.png',
        showcaseImages: [
            '/projects/lanyard_cover.png',
            '/projects/lanyard_black.png',
            '/projects/lanyard_white.png',
            '/projects/lanyard_navy.png',
            '/projects/lanyard_asset_logo1.png',
            '/projects/lanyard_asset_logo2.png'
        ],
        tagline: 'Identity Design: From Assets to Implementation.',
        description: 'A comprehensive visual identity project focusing on event branding consistency across physical assets.',
        problem: 'Designing a cohesive event identity requires careful asset selection and color theory application to ensure legibility and brand recognition across various print materials.',
        solution: 'Developed a unified design system starting from core logo assets and expanding into physical applications (lanyards, ID cards), ensuring high contrast and clear hierarchy.',
        impact: 'Delivered a professional and scalable identity system that maintains visual integrity across different mediums and background colors.',
        tags: ['Adobe Illustrator', 'Print Design', 'Branding'],
        size: 'small',
        problemMap: [
            { problem: 'Crowd Visibility', context: 'Staff hard to identify.', solution: 'High Contrast Colors', mitigation: 'Distinct color coding for Staff vs Participants.' }
        ],
        stats: [
            { label: 'Visibility', value: 'Instant', description: 'Recognizable from distance.' }
        ],
        timeline: [
            { phase: 'Design', period: '3 Days', activities: ['Concept', 'Mockups', 'Print Prep'] }
        ],
        mitigationPlans: [
            { risk: 'Print Errors', action: 'CMYK proofing and test prints before mass production.' }
        ],
        personas: [
            { role: 'Event Organizer', pain: 'Staff blending in with guests.', goal: 'Clearly distinguishable staff for security and logistics.' },
            { role: 'Attendee', pain: 'Confusing venue navigation.', goal: 'Easily spot staff for assistance.' }
        ],
        businessModel: [
            { type: 'Brand Visibility', value: 'High-contrast design ensures brand is visible in every event photo.' },
            { type: 'Cost Efficiency', value: 'Vector-based design allows scalable printing without quality loss.' }
        ],
        beforeAfter: [
            { aspect: 'Staff ID', before: 'Generic badges hard to see in crowds.', after: 'Bold color-coded lanyards visible from 20m.' },
            { aspect: 'Visual Identity', before: 'Mismatched attire.', after: 'Unified, professional team appearance.' }
        ],
        // New PRD Fields
        vision: 'To create a functional visual identification system that enhances event security and brand visibility in crowded spaces.',
        status: 'COMPLETED',
        team: 'Sulthan Abdi Dzikry (Graphic Designer)',
        background: 'At large events, staff members often blend in with attendees, causing confusion for guests seeking help and security risks. A clear visual distinction was needed.',
        strategicAlignment: 'Demonstrates understanding of "Functional Design" - prioritizing legibility and utility in physical product design.',
        investmentRequired: '3 Days / 1 Graphic Designer',
        assumptions: '1. Color coding is recognized faster than reading text labels in a crowd.\n2. Lanyards are the primary ID method visible at eye/chest level.',
        productArchitecture: 'Vector Graphics (CMYK Color Space), Dye-Sublimation Printing Specs',
        coreFeatures: [
            { name: 'Color Coding System', desc: 'Distinct colors for Staff, Partners, and Attendees.' },
            { name: 'Legible Typography', desc: 'Sans-serif fonts readable from 2 meters away.' },
            { name: 'Brand Pattern', desc: 'Repeatable pattern ensuring brand visibility even when lanyard twists.' }
        ],
        designSystem: 'High Contrast & Swiss Style. Prioritizing bold typography and distinct color blocks (Navy/White/Red) for instant recognition.',
        designTools: ['Adobe Illustrator (Vector Design)', 'Adobe Photoshop (Mockups)'],
        researchMethods: ['Visual Ergonomics Study (Reading distance in crowds)', 'Material Sampling'],
        uxOverview: 'Physical UX focus: ensuring the text remains visible regardless of how the lanyard hangs or twists.',
        translations: {
            id: {
                tagline: 'Desain Identitas: Dari Konsep hingga Produk Fisik.',
                description: 'Proyek identitas visual yang berfokus pada konsistensi branding di seluruh aset fisik acara.',
                problem: 'Staf seringkali sulit dibedakan dari peserta di tengah keramaian karena kurangnya penanda identitas yang mencolok.',
                solution: 'Mengembangkan sistem kode warna yang kontras pada lanyard dan ID Card untuk mempermudah identifikasi tim secara instan.',
                impact: 'Memperkuat citra profesional acara dan meningkatkan efisiensi koordinasi tim di lapangan.',
                problemMap: [
                    { problem: 'Staf Sulit Ditemukan', context: 'Peserta bingung harus bertanya ke siapa.', solution: 'Kode Warna Kontras', mitigation: 'Perbedaan warna mencolok antara Staf, Tamu, dan Peserta.' }
                ],
                stats: [
                    { label: 'Identifikasi', value: 'Instan', description: 'Terlihat jelas bahkan dari jarak jauh.' }
                ],
                timeline: [
                    { phase: 'Desain', period: '3 Hari', activities: ['Konsep', 'Mockup', 'Persiapan Cetak'] }
                ],
                mitigationPlans: [
                    { risk: 'Kesalahan Cetak', action: 'Proofing CMYK dan cetak uji sebelum produksi massal.' }
                ],
                personas: [
                    { role: 'Penyelenggara Acara', pain: 'Staf berbaur dengan tamu.', goal: 'Staf yang jelas dapat dibedakan untuk keamanan dan logistik.' },
                    { role: 'Peserta', pain: 'Navigasi tempat yang membingungkan.', goal: 'Mudah melihat staf untuk bantuan.' }
                ],
                businessModel: [
                    { type: 'Visibilitas Merek', value: 'Desain kontras tinggi memastikan merek terlihat di setiap foto acara.' },
                    { type: 'Efisiensi Biaya', value: 'Desain berbasis vektor memungkinkan pencetakan skala besar tanpa kehilangan kualitas.' }
                ],
                beforeAfter: [
                    { aspect: 'ID Staf', before: 'Tanda pengenal generik sulit dilihat di keramaian.', after: 'Lanyard berkode warna tebal terlihat dari 20m.' },
                    { aspect: 'Identitas Visual', before: 'Pakaian tidak serasi.', after: 'Tampilan tim yang seragam dan profesional.' }
                ],
                // PRD ID
                vision: 'Menciptakan sistem identifikasi visual fungsional yang meningkatkan keamanan acara dan visibilitas merek di ruang ramai.',
                status: 'SELESAI',
                team: 'Sulthan Abdi Dzikry (Graphic Designer)',
                background: 'Di acara besar, anggota staf sering berbaur dengan peserta, menyebabkan kebingungan bagi tamu yang mencari bantuan dan risiko keamanan. Diperlukan perbedaan visual yang jelas.',
                strategicAlignment: 'Menunjukkan pemahaman tentang "Desain Fungsional" - memprioritaskan keterbacaan dan kegunaan dalam desain produk fisik.',
                investmentRequired: '3 Hari / 1 Desainer Grafis',
                assumptions: '1. Kode warna dikenali lebih cepat daripada membaca label teks di keramaian.\n2. Lanyard adalah metode ID utama yang terlihat setinggi mata/dada.',
                productArchitecture: 'Grafis Vektor (Ruang Warna CMYK), Spesifikasi Pencetakan Dye-Sublimation',
                coreFeatures: [
                    { name: 'Sistem Kode Warna', desc: 'Warna berbeda untuk Staf, Mitra, dan Peserta.' },
                    { name: 'Tipografi Terbaca', desc: 'Font sans-serif terbaca dari jarak 2 meter.' },
                    { name: 'Pola Merek', desc: 'Pola berulang memastikan visibilitas merek bahkan saat lanyard terpelintir.' }
                ],
                designSystem: 'Kontras Tinggi & Gaya Swiss. Memprioritaskan tipografi tebal dan blok warna berbeda (Navy/Putih/Merah) untuk pengenalan instan.',
                designTools: ['Adobe Illustrator (Desain Vektor)', 'Adobe Photoshop (Mockup)'],
                researchMethods: ['Studi Ergonomi Visual (Jarak baca di keramaian)', 'Sampling Material'],
                uxOverview: 'Fokus UX Fisik: memastikan teks tetap terlihat terlepas dari bagaimana lanyard menggantung atau terpelintir.'
            }
        }
    },
    {
        id: 'telkommerce',
        title: 'Telkommerce',
        category: 'Web Application',
        image: '/projects/telkommerce_new_thumb_v2.png',
        showcaseImages: [
            '/projects/telkommerce_new_thumb_v2.png',
            '/projects/telkommerce_cover.png',
            '/projects/telkommerce_1.png',
            '/projects/telkommerce_2.png',
            '/projects/telkommerce_3.png',
            '/projects/telkommerce_products.png',
            '/projects/telkommerce_register.png',
            '/projects/telkommerce_profile.png',
            '/projects/telkommerce_flow.png'
        ],
        tagline: 'Scalable E-Commerce with Powerful Backend.',
        description: 'A comprehensive e-commerce platform with dashboard management.',
        problem: 'Managing complex product inventories and user profiles requires a robust, user-friendly interface to handle high transaction volumes.',
        solution: 'Built a scalable e-commerce solution with a dedicated admin dashboard, real-time product tracking, and intuitive user profile management.',
        impact: 'Enhanced operational efficiency for product management and improved user shopping experience with a 30% faster checkout flow (Conceptual).',
        tags: ['React', 'Dashboard', 'E-commerce'],
        size: 'medium',
        problemMap: [
            { problem: 'Inventory Chaos', context: 'Hard to track stock.', solution: 'Real-time Dashboard', mitigation: 'Live stock updates.' },
            { problem: 'Slow Checkout', context: 'Cart abandonment.', solution: 'Optimized Flow', mitigation: '3-click checkout process.' }
        ],
        stats: [
            { label: 'Checkout Speed', value: '+30%', description: 'Optimized user flow.' },
            { label: 'Management', value: 'Easy', description: 'Centralized admin panel.' }
        ],
        timeline: [
            { phase: 'Phase 1', period: 'Month 1', activities: ['DB Schema', 'API'] },
            { phase: 'Phase 2', period: 'Month 2', activities: ['Frontend', 'Integration'] }
        ],
        mitigationPlans: [
            { risk: 'Scalability', action: 'Modular architecture allows easy feature expansion.' }
        ],
        personas: [
            { role: 'Store Administrator', pain: 'Overselling stock due to sync lag.', goal: 'Real-time inventory view to prevent fulfillment issues.' },
            { role: 'Mobile Shopper', pain: 'Slow/complicated checkout process.', goal: 'Buy in under 30 seconds.' }
        ],
        businessModel: [
            { type: 'B2C Commerce', value: 'Streamlined checkout aims to reduce cart abandonment by 15%.' },
            { type: 'Inventory Optimization', value: 'Real-time tracking prevents deadstock and overselling losses.' }
        ],
        beforeAfter: [
            { aspect: 'Stock Management', before: 'Wait for nightly reconciliation.', after: 'Live updates on every transaction.' },
            { aspect: 'Checkout Flow', before: '5+ pages (High drop-off).', after: 'Single-page checkout wizard.' }
        ],
        // New PRD Fields
        vision: 'To provide a robust, scalable e-commerce infrastructure that empowers data-driven retail management.',
        status: 'PROTOTYPE',
        team: 'Sulthan Abdi Dzikry (Frontend Developer)',
        background: 'Retailers often need custom solutions that blend public-facing storefronts with powerful back-end inventory management. Off-the-shelf tools can be too rigid.',
        strategicAlignment: 'Demonstrates capability in building "System-Heavy" applications with complex logic (Redux state management, Auth, CRUD).',
        investmentRequired: '2 Months / 1 Frontend Developer',
        assumptions: '1. Improving checkout speed directly correlates to higher conversion rates.\n2. Admins prefer desktop dashboards for bulk management tasks.',
        productArchitecture: 'React.js, Redux (Global State), Node.js (Mock API), JWT Authentication',
        coreFeatures: [
            { name: 'Redux State Management', desc: 'Seamless cart updates and persistent user sessions.' },
            { name: 'Admin Dashboard', desc: 'CRUD operations for Products and Users with visual charts.' },
            { name: 'Optimized Checkout', desc: '3-Step Wizard: Address -> Payment -> Confirm.' }
        ],
        designSystem: 'Clean & Informative. White-dominated UI for product clarity, with distinct sidebar navigation for the Admin panel.',
        designTools: ['Figma (Wireframe)', 'React Developer Tools'],
        researchMethods: ['Analysis of Top E-commerce Flows (Tokopedia/Shopee)', 'Performance Profiling'],
        uxOverview: 'Focus on "Frictionless Purchase" for users and "Data at a Glance" for admins.',
        translations: {
            id: {
                tagline: 'Infrastruktur E-Commerce untuk Bisnis Skala Menengah.',
                description: 'Platform jual-beli lengkap dengan integrasi manajemen stok dan dasbor admin.',
                problem: 'Mengelola banyak transaksi dan stok produk secara manual sangat rentan kesalahan dan menghambat pertumbuhan bisnis.',
                solution: 'Membangun aplikasi web dengan arsitektur modern (React/Redux) yang memudahkan pengelolaan katalog dan profil pembeli.',
                impact: 'Mempercepat proses pengelolaan data produk dan memberikan pengalaman belanja yang lebih lancar.',
                problemMap: [
                    { problem: 'Manajemen Manual', context: 'Stok sering selisih karena lupa update.', solution: 'Dashboard Admin Terpusat', mitigation: 'Semua perubahan data dilakukan di satu tempat secara otomatis.' },
                    { problem: 'Proses Beli Lambat', context: 'Pembeli malas jika harus lewat banyak langkah.', solution: 'Optimasi Checkout', mitigation: 'Alur pembelian yang dipangkas menjadi lebih singkat.' }
                ],
                stats: [
                    { label: 'Kecepatan Proses', value: '+30%', description: 'Alur kerja admin jadi lebih efisien.' },
                    { label: 'User Experience', value: 'Mulus', description: 'Navigasi yang responsif dan cepat.' }
                ],
                timeline: [
                    { phase: 'Persiapan', period: 'Bulan 1', activities: ['Desain Database', 'Arsitektur API'] },
                    { phase: 'Pengembangan', period: 'Bulan 2', activities: ['Frontend', 'Integrasi Sistem'] }
                ],
                mitigationPlans: [
                    { risk: 'Skalabilitas', action: 'Gunakan arsitektur modular agar fitur mudah ditambah nantinya.' }
                ],
                personas: [
                    { role: 'Admin Toko', pain: 'Stok sering selisih karena jeda update data.', goal: 'Pantauan inventaris real-time untuk memperlancar pesanan.' },
                    { role: 'Pembeli Mobile', pain: 'Alur pembelian yang ribet dan lambat.', goal: 'Bisa beli produk dalam waktu kurang dari 1 menit.' }
                ],
                businessModel: [
                    { type: 'Ritel Digital', value: 'Alur yang lancar diprediksi mengurangi keranjang yang ditinggalkan hingga 15%.' },
                    { type: 'Efisiensi Stok', value: 'Pelacakan real-time mencegah kerugian akibat overselling.' }
                ],
                beforeAfter: [
                    { aspect: 'Cek Stok', before: 'Baru ketahuan setelah cek gudang manual.', after: 'Sistem otomatis mengunci stok saat ada pesanan.' },
                    { aspect: 'Alur Checkout', before: 'Terlalu banyak halaman (User malas).', after: 'Checkout ringkas dalam satu alur yang jelas.' }
                ],
                // PRD ID
                vision: 'Menyediakan infrastruktur e-commerce yang tangguh untuk ritel berbasis data.',
                status: 'PROTOTIPE',
                team: 'Sulthan Abdi Dzikry (Frontend Developer)',
                background: 'Banyak bisnis ritel membutuhkan solusi kustom yang tidak sekadar jualan, tapi juga manajemen data di balik layar.',
                strategicAlignment: 'Menunjukkan penguasaan aplikasi berbasis sistem (Complex Logic, State Management).',
                investmentRequired: '2 Bulan (Fase Pengembangan)',
                assumptions: '1. Checkout lebih cepat berbanding lurus dengan kenaikan omzet.\n2. Tim admin lebih nyaman bekerja di dashboard desktop.',
                productArchitecture: 'React.js, Redux, Node.js, JWT Auth',
                coreFeatures: [
                    { name: 'Redux State Management', desc: 'Sinkronisasi keranjang belanja yang mulus.' },
                    { name: 'Admin Dashboard', desc: 'Manajemen produk dan user dengan grafik visual.' },
                    { name: 'Checkout 3-Langkah', desc: 'Alamat -> Pembayaran -> Konfirmasi.' }
                ],
                designSystem: 'Bersih & Informatif. Fokus pada kejelasan visual produk dengan sidebar navigasi yang jelas.',
                designTools: ['Figma', 'React Developer Tools'],
                researchMethods: ['Analisis Kompetitor (Tokopedia, Shopee)', 'Profiling Performa'],
                uxOverview: 'Fokus pada "Kemudahan Transaksi" bagi user dan "Kejelasan Data" bagi admin.'
            }
        }
    },
    {
        id: 'jalan-app',
        title: 'Jalan',
        category: 'Mobile App',
        image: '/projects/jalan_new_thumb_v2.png',
        showcaseImages: [
            '/projects/jalan_new_thumb_v2.png',
            '/projects/jalan_cover.webp',
            '/projects/jalan_1.webp',
            '/projects/jalan_2.webp',
            '/projects/jalan_3.webp',
            '/projects/jalan_4.webp'
        ],
        tagline: 'Your Personalized Pocket Travel Guide.',
        description: 'A mobile application concept for seamless travel planning.',
        problem: 'Travelers often struggle to organize itineraries and find local gems in one unified app, leading to fragmented travel experiences.',
        solution: 'Designed a mobile experience that consolidates trip planning, destination discovery, and itinerary management into a single cohesive interface.',
        impact: 'Simplified the travel planning process, encouraging more spontaneous and organized trips with a user-centric design.',
        tags: ['Mobile Design', 'Figma', 'Travel'],
        size: 'small',
        problemMap: [
            { problem: 'Fragmented Info', context: 'Switching apps to plan.', solution: 'All-in-One App', mitigation: 'Maps, guides, and booking in one place.' }
        ],
        stats: [
            { label: 'Planning Time', value: '-50%', description: 'Consolidated tools speed up research.' }
        ],
        timeline: [
            { phase: 'UX Research', period: 'Week 1-2', activities: ['Traveler Interviews', 'Persona Building'] },
            { phase: 'UI Design', period: 'Week 3-4', activities: ['Visual Design', 'Interaction'] }
        ],
        mitigationPlans: [
            { risk: 'User Overwhelm', action: 'Minimalist interface with progressive disclosure.' }
        ],
        personas: [
            { role: 'The Planner', pain: 'Using 5 different apps to plan one trip.', goal: 'One master itinerary with maps and bookings attached.' },
            { role: 'The Explorer', pain: 'Missing out on hidden local gems.', goal: 'Curated local recommendations based on interest.' }
        ],
        businessModel: [
            { type: 'Affiliate Revenue', value: 'Monetization via seamless hotel/tour booking integration.' },
            { type: 'Data Insight', value: 'Aggregated travel preference data for tourism partners.' }
        ],
        beforeAfter: [
            { aspect: 'Trip Planning', before: 'Spreadsheets + Map App + Notes.', after: 'Unified drag-and-drop itinerary builder.' },
            { aspect: 'Discovery', before: 'Random Google searches.', after: 'Curated, AI-driven local recommendations.' }
        ],
        // New PRD Fields
        vision: 'To become the ultimate pocket companion that empowers travelers to explore with confidence and ease.',
        status: 'CONCEPT',
        team: 'Sulthan Abdi Dzikry (UI/UX Designer)',
        background: 'Travel planning is fragmented. Users juggle Google Maps, Notes, Booking sites, and Blogs. This app solves the "App Switching Fatigue" by unifying them.',
        strategicAlignment: 'Showcases Mobile-First Design Thinking and ability to create "Lifestyle" products.',
        investmentRequired: '2 Months / 1 Designer',
        assumptions: '1. Travelers prefer a visual itinerary over a text list.\n2. Offline access is a critical feature for travelers.',
        productArchitecture: 'Mobile App (Flutter/React Native Concept), Google Maps API',
        coreFeatures: [
            { name: 'Unified ItineraryBuilder', desc: 'Drag-and-drop interface to organize days.' },
            { name: 'Smart Map Exploration', desc: 'Discover nearby gems based on interests.' },
            { name: 'Social Travel', desc: 'Share itineraries with friends.' }
        ],
        designSystem: 'Adventure & Clarity. High-quality imagery for inspiration, paired with clean sans-serif typography for legibility on the go.',
        designTools: ['Figma (UI/UX)', 'Adobe Photoshop (Image Editing)'],
        researchMethods: ['Traveler Interviews (Backpackers vs Luxury)', 'User Journey Mapping'],
        uxOverview: 'Gesture-driven interface. Swipe to delete, Drag to reorder. Focus on one-handed use for travelers on the move.',
        translations: {
            id: {
                tagline: 'Teman Perjalanan dalam Saku Anda.',
                description: 'Konsep aplikasi travel planner untuk memudahkan penyusunan jadwal liburan secara visual.',
                problem: 'Wisatawan sering lelah karena harus berpindah-pindah aplikasi antara Maps, Catatan, dan situs Booking saat merencanakan trip.',
                solution: 'Menyatukan semua kebutuhan riset destinasi dan penyusunan itinerary ke dalam satu aplikasi mobile yang intuitif.',
                impact: 'Menjadikan perencanaan liburan lebih santai dan terorganisir dengan fitur visual yang membantu pengambilan keputusan.',
                problemMap: [
                    { problem: 'Aplikasi Terpencar', context: 'Informasi tercecer di banyak tempat.', solution: 'Aplikasi All-in-One', mitigation: 'Peta, panduan, dan jadwal ada dalam satu layar.' }
                ],
                stats: [
                    { label: 'Waktu Riset', value: '-50%', description: 'Semua informasi sudah teragregasi.' }
                ],
                timeline: [
                    { phase: 'Riset UX', period: 'Minggu 1-2', activities: ['Wawancara Wisatawan', 'Pembuatan Persona'] },
                    { phase: 'Desain UI', period: 'Minggu 3-4', activities: ['Desain Visual', 'Alur Interaksi'] }
                ],
                mitigationPlans: [
                    { risk: 'User Overwhelm', action: 'Desain minimalis dengan informasi yang muncul secara bertahap.' }
                ],
                personas: [
                    { role: 'Si Planner', pain: 'Ganti-ganti 5 aplikasi hanya untuk merencanakan satu trip.', goal: 'Satu jadwal induk yang sudah terhubung dengan peta dan reservasi.' },
                    { role: 'Si Explorer', pain: 'Sering melewatkan tempat lokal yang menarik.', goal: 'Rekomendasi tempat tersembunyi yang sesuai dengan minat pribadi.' }
                ],
                businessModel: [
                    { type: 'Afiliasi Travel', value: 'Potensi pendapatan lewat booking hotel atau tur di dalam aplikasi.' },
                    { type: 'Wawasan Data', value: 'Data preferensi perjalanan untuk membantu mitra pariwisata lokal.' }
                ],
                beforeAfter: [
                    { aspect: 'Proses Rencana', before: 'Pecah-pecah di Spreadsheet, Gmaps, dan Catatan.', after: 'Penyusun jadwal drag-and-drop yang intuitif.' },
                    { aspect: 'Pencarian Lokal', before: 'Hanya mengandalkan hasil pencarian Google acak.', after: 'Rekomendasi cerdas berbasis minat dan lokasi.' }
                ],
                // PRD ID
                vision: 'Menjadi teman perjalanan paling andal yang memberikan rasa percaya diri saat mengeksplorasi tempat baru.',
                status: 'KONSEP',
                team: 'Sulthan Abdi Dzikry (UI/UX Designer)',
                background: 'Proses merencanakan liburan seringkali melelahkan karena informasi yang tidak terpusat.',
                strategicAlignment: 'Menunjukkan kemampuan Desain Mobile-First untuk produk gaya hidup.',
                investmentRequired: '2 Bulan (Fase Konsep & Desain)',
                assumptions: '1. User lebih menyukai jadwal visual daripada sekadar daftar teks.\n2. Akses luring (offline) sangat penting bagi pelancong di luar negeri.',
                productArchitecture: 'Mobile App (Flutter/React Native), Google Maps API',
                coreFeatures: [
                    { name: 'Itinerary Builder', desc: 'Antarmuka geser-tempel (drag-drop) untuk mengatur jadwal harian.' },
                    { name: 'Eksplorasi Peta Cerdas', desc: 'Temukan spot menarik di sekitar berdasarkan filter minat.' },
                    { name: 'Travel Sosial', desc: 'Bagikan dan edit rencana perjalanan bersama teman.' }
                ],
                designSystem: 'Adventure & Clarity. Menggunakan foto berkualitas tinggi untuk inspirasi dan tipografi modern yang mudah dibaca.',
                designTools: ['Figma', 'Adobe Photoshop'],
                researchMethods: ['Wawancara Solo Traveler & Keluarga', 'User Journey Mapping'],
                uxOverview: 'Antarmuka berbasis gestur (swipe/drag). Fokus pada kemudahan penggunaan satu tangan.'
            }
        }
    },
    {
        id: 'pheromone-perfume',
        title: 'Pheromone',
        category: 'Web Design',
        image: '/projects/pheromone_thumb_v2.webp',
        showcaseImages: [
            '/projects/pheromone_cover.webp',
            '/projects/pheromone_1.webp',
            '/projects/pheromone_2.webp',
            '/projects/pheromone_4.webp'
        ],
        tagline: 'Scent. Sensation. Story.',
        description: 'An elegant company profile website for a premium perfume brand.',
        problem: 'The brand needed a digital presence that reflected its luxury and sensory appeal to differentiate itself in a competitive market.',
        solution: 'Created a visually rich website focusing on aesthetic product presentation, smooth scrolling animations, and brand storytelling.',
        impact: 'Established a strong online brand identity, attracting a more sophisticated clientele and increasing brand perceived value.',
        tags: ['Web Design', 'Branding', 'Luxury'],
        size: 'small',
        problemMap: [
            { problem: 'Generic Vibe', context: 'Standard templates.', solution: 'Bespoke Design', mitigation: 'Custom animations and typography.' }
        ],
        stats: [
            { label: 'Brand Value', value: 'Premium', description: 'Elevated visual perception.' }
        ],
        timeline: [
            { phase: 'Art Direction', period: 'Week 1', activities: ['Moodboarding', 'Asset Selection'] },
            { phase: 'Development', period: 'Week 2', activities: ['Frontend Animation', 'Responsive Layout'] }
        ],
        mitigationPlans: [
            { risk: 'Slow Load', action: 'Optimized image assets and lazy loading.' }
        ],
        personas: [
            { role: 'Luxury Consumer', pain: 'Generic online shopping feels cheap.', goal: 'An immersive digital experience that matches the product price.' },
            { role: 'Brand Manager', pain: 'Inconsistent brand storytelling.', goal: 'Pixel-perfect control over how the brand narrative unfolds.' }
        ],
        businessModel: [
            { type: 'D2C Brand Equity', value: 'Elevated aesthetic justifies premium pricing strategy.' },
            { type: 'Storytelling Conversion', value: 'Emotional connection increases "Add to Cart" probability.' }
        ],
        beforeAfter: [
            { aspect: 'Brand Perception', before: 'Just another perfume bottle.', after: 'An emotional sensory experience.' },
            { aspect: 'User Engagement', before: 'Static product images.', after: 'Interactive scroll-telling and motion design.' }
        ],
        // New PRD Fields
        vision: 'To translate the olfactory experience of luxury perfume into an immersive digital sensory journey.',
        status: 'COMPLETED',
        team: 'Sulthan Abdi Dzikry (Web Designer)',
        background: 'Selling specialized fragrances online is challenging due to the inability to smell. The digital experience must compensate by evoking the mood and scent notes visually.',
        strategicAlignment: 'Demonstrates "Emotional Design" capabilities - using motion and aesthetics to convey intangible product qualities.',
        investmentRequired: '2 Weeks / 1 Web Designer',
        assumptions: '1. Visual storytelling can effectively substitute the lack of physical scent testing.\n2. Luxury consumers expect smooth, "heavy" feeling animations.',
        productArchitecture: 'Frontend Website (React), Framer Motion (Animations), WebGL Effects',
        coreFeatures: [
            { name: 'Parallax Storytelling', desc: 'Scroll-triggered animations that reveal scent notes.' },
            { name: 'Interactive Notes', desc: 'Hover effects explaining ingredients (Top, Middle, Base notes).' },
            { name: 'Mood Matching', desc: 'Visual "Personality" quiz to recommend perfumes.' }
        ],
        designSystem: 'Elegant & Minimalist. Serif typography (Playfair Display) for headlines, generous whitespace, and pastel/gold color accents.',
        designTools: ['Figma (UI Desgin)', 'After Effects (Motion Prototyping)'],
        researchMethods: ['Luxury Brand Benchmarking (Dior, Chanel)', 'Moodboarding'],
        uxOverview: 'Slow, deliberate scrolling experience. Unlike e-commerce which rushes checkout, this site encourages lingering and exploration.',
        translations: {
            id: {
                tagline: 'Aroma. Sensasi. Cerita.',
                description: 'Website profil perusahaan elegan yang dirancang khusus untuk brand parfum mewah.',
                problem: 'Dunia parfum sangat bergantung pada indra penciuman, hal yang sulit disampaikan lewat media digital tanpa visual yang kuat.',
                solution: 'Menggunakan teknik storytelling visual dengan animasi halus dan tipografi serif untuk membangun aura kemewahan.',
                impact: 'Meningkatkan nilai jual brand secara digital dan menciptakan pengalaman eksplorasi yang imersif bagi pengunjung.',
                problemMap: [
                    { problem: 'Kurang Aura Mewah', context: 'Website parfum biasa terlihat membosankan.', solution: 'Desain Eksklusif', mitigation: 'Penggunaan motion design dan visual berkualitas tinggi.' }
                ],
                stats: [
                    { label: 'Persepsi Brand', value: 'Eksklusif', description: 'Desain yang mencerminkan kualitas produk.' }
                ],
                timeline: [
                    { phase: 'Art Direction', period: 'Minggu 1', activities: ['Moodboarding', 'Seleksi Aset'] },
                    { phase: 'Pengembangan', period: 'Minggu 2', activities: ['Animasi Frontend', 'Layout Responsif'] }
                ],
                mitigationPlans: [
                    { risk: 'Akses Lambat', action: 'Optimasi aset gambar dan penggunaan lazy loading.' }
                ],
                personas: [
                    { role: 'Konsumen Premium', pain: 'Belanja online yang terasa "biasa" untuk barang mewah.', goal: 'Pengalaman digital yang sebanding dengan harga produk.' },
                    { role: 'Brand Manager', pain: 'Penyampaian cerita brand yang tidak konsisten.', goal: 'Kontrol penuh atas bagaimana narasi produk disampaikan.' }
                ],
                businessModel: [
                    { type: 'Brand Equity', value: 'Estetika yang elegan menjustifikasi harga produk premium.' },
                    { type: 'Koneksi Emosional', value: 'Storytelling meningkatkan ketertarikan pembeli secara psikologis.' }
                ],
                beforeAfter: [
                    { aspect: 'Persepsi Brand', before: 'Hanya botol parfum biasa di etalase.', after: 'Pengalaman sensorik yang emosional.' },
                    { aspect: 'Engagement', before: 'Gambar produk statis.', after: 'Scroll-telling interaktif yang memikat.' }
                ],
                // PRD ID
                vision: 'Menerjemahkan sensasi wewangian mewah ke dalam perjalanan digital yang imersif.',
                status: 'SELESAI',
                team: 'Sulthan Abdi Dzikry (Web Designer)',
                background: 'Menjual parfum secara online menantang karena aroma tidak bisa dirasakan langsung. Website harus mampu membangkitkan imajinasi user.',
                strategicAlignment: 'Menunjukkan kemampuan "Emotional Design" menggunakan gerak dan estetika visual.',
                investmentRequired: '2 Minggu (Desain & Launch)',
                assumptions: '1. Narasi visual bisa menggantikan uji fisik wewangian.\n2. Target pasar mewah mengharapkan animasi yang halus dan premium.',
                productArchitecture: 'React, Framer Motion, WebGL Effects',
                coreFeatures: [
                    { name: 'Storytelling Parallax', desc: 'Animasi saat scroll yang mengungkap komposisi aroma.' },
                    { name: 'Catatan Aroma Interaktif', desc: 'Efek hover untuk menjelaskan bahan utama (Top, Middle, Base).' },
                    { name: 'Mood Matching', desc: 'Rekomendasi parfum berdasarkan suasana hati.' }
                ],
                designSystem: 'Elegant & Minimalist. Tipografi Serif kelas dunia, ruang putih yang lega, dan aksen emas.',
                designTools: ['Figma', 'After Effects'],
                researchMethods: ['Benchmarking Brand Mewah (Dior, Chanel)', 'Moodboarding'],
                uxOverview: 'Pengalaman scroll yang tenang dan mendalam.'
            }
        }
    },
    {
        id: 'internship-report',
        title: 'Laporan Akhir Magang',
        category: 'Presentation',
        image: '/projects/doors/Presentasi Doors-1.webp', // Using Doors thumb as requested
        tagline: 'Laporan Akhir Magang Nasional - Sulthan Abdi Dzikry',
        description: 'Sebuah presentasi interaktif mengenai perjalanan magang nasional, mencakup profil, struktur organisasi, hingga insight dan target karir.',
        tags: ['Presentation', 'Internship', 'Report'],
        size: 'large',
        path: '/presentation', // Custom path for presentation mode
        translations: {
            id: {
                title: 'Laporan Akhir Magang',
                category: 'Presentasi',
                tagline: 'Laporan Akhir Magang Nasional - Sulthan Abdi Dzikry',
                description: 'Sebuah presentasi interaktif mengenai perjalanan magang nasional, mencakup profil, struktur organisasi, hingga insight dan target karir.'
            }
        }
    },
    {
        id: 'internship-detail',
        title: 'Case Study: Magang Nasional',
        category: 'UI/UX & System Dev',
        image: '/projects/doors/Presentasi Doors-1.webp',
        showcaseImages: [
            '/projects/doors/Presentasi Doors-1.webp',
            '/projects/doors/Presentasi Doors-2.webp',
            '/projects/doors/Presentasi Doors-3.webp',
            '/projects/doors/Presentasi Doors-4.webp',
            '/projects/doors/Presentasi Doors-5.webp',
            '/projects/doors/Presentasi Doors-8.webp',
            '/projects/doors/Presentasi Doors-10.webp',
            '/projects/doors/Presentasi Doors-11.webp',
            '/projects/doors/tabletdoors.png',
            '/projects/doors/hasil_sus_doors.png'
        ],
        tagline: 'Membangun Ekosistem Digital HR & GA selama 6 Bulan.',
        description: 'Detail teknis dan manajerial dari perjalanan magang 6 bulan, fokus pada optimasi sistem internal dan digitalisasi manajemen fasilitas.',
        problem: 'Sistem operasional internal yang terfragmentasi menyebabkan inefisiensi dalam manajemen fasilitas dan alur koordinasi antar departemen.',
        solution: 'Mengembangkan suite aplikasi terintegrasi (Doors, Monitoring AC) dengan fokus pada kemudahan penggunaan dan akurasi data real-time.',
        impact: 'Menyederhanakan 6 langkah booking menjadi 4 langkah instan, mengelola 600+ meeting tanpa konflik, dan mengotomasi monitoring aset GA.',
        tags: ['Product Management', 'UI/UX Design', 'Full-stack Dev'],
        size: 'medium',
        uxTemplate: 'internship', // Custom UX template identification
        team: [
            { name: 'Lukman Hawari Pratama', role: 'Department Head', id: '99122022' },
            { name: 'Listia Ningtias', role: 'Staff', id: '11240196' },
            { name: 'Bagas Ardhi Pratama', role: 'Staff', id: '11195854' },
            { name: 'Abdul Rohim', role: 'Staff', id: '11185354' }
        ],
        journey: [
            { month: 'Bulan 1', title: 'Adaptasi & Research', desc: 'Memahami proses bisnis HRGA Dharma Polimetal dan melakukan observasi terhadap sistem yang sedang berjalan.' },
            { month: 'Bulan 2', title: 'Doors Improvement', desc: 'Mendesain konsep perancangan ulang sistem Doors berdasarkan kesulitan pengguna ' },
            { month: 'Bulan 3', title: 'Doors Launching', desc: 'Membangun fungsionalitas utama (Check-in NPK, Gantt Chart) dan peluncuran produk pertama (Doors v2.0).' },
            { month: 'Bulan 4', title: 'Monitoring AC System', desc: 'Mulai merancang konsep dan membuat prototype atau konsep awal sistem aplikasi' },
            { month: 'Bulan 5', title: 'Improvement', desc: 'Menyempurnakan fitur dari Prototype sistem AC Monitoring sehingga menjadi satu aplikasi utuh' },
            { month: 'Bulan 6', title: 'Documentation', desc: 'Pembuatan dan Penyerahan Dokumentasi Teknis dan General terkait projek yang telah dibuat selama magang.' }
        ],
        pillars: [
            { id: 'doors', name: 'DOORS Project', icon: 'door', desc: 'Sistem booking 14 ruang rapat dengan 1.000+ pengguna aktif.', metric: '0% Conflicts', tag: 'UI/UX' },
            { id: 'ac', name: 'Facility Monitoring', icon: 'fan', desc: 'Pemantauan berkala unit AC gedung untuk efisiensi perawatan.', metric: 'Daily Sync', tag: 'Dashboard' }
        ],
        problemMap: [
            { problem: 'Booking Kompleks', context: '6 langkah manual yang memakan waktu.', solution: 'Alur 4 Langkah', mitigation: 'Implementasi Tablet Booking di depan ruangan.' }
        ],
        stats: [
            { label: 'Booking Speed', value: '+33%', description: 'Penyederhanakan alur kerja.' },
            { label: 'Conflicts', value: 'Zero', description: 'Manajemen jadwal 600+ rapat.' }
        ],
        timeline: [
            { phase: 'Project Doors', period: 'Bulan 1-3', activities: ['Research & UI Design', 'System Development', 'Iteration & Launch'] },
            { phase: 'Facility Systems', period: 'Bulan 4-6', activities: ['Monitoring AC Dev', 'System Integration', 'Final Handoff'] }
        ],
        mitigationPlans: [
            { risk: 'Data Inaccuracy', action: 'Validasi database real-time dan sinkronisasi otomatis.' }
        ],
        personas: [
            { role: 'Meeting Organizer', pain: 'Sering terjadi double booking.', goal: 'Sistem yang transparan dan mudah diakses.' },
            { role: 'Staff GA', pain: 'Sulit memantau kondisi aset kantor.', goal: 'Dashboard monitoring yang komprehensif.' }
        ],
        businessModel: [
            { type: 'Operational Efficiency', value: 'Pengurangan waktu administratif hingga 20%.' },
            { type: 'Data Integrity', value: 'Pelaporan yang 100% digital dan terverifikasi.' }
        ],
        beforeAfter: [
            { aspect: 'Booking Process', before: 'Email/Manual log (6 steps).', after: 'Instant tablet/web booking (4 steps).' }
        ],
        vision: 'Meningkatkan efisiensi korporasi melalui ekosistem digital yang adaptif dan user-centric.',
        status: 'COMPLETED',
        uxOverview: 'Fokus pada "Zero Learning Curve" agar staff dapat beralih ke sistem digital tanpa hambatan.',
        background: 'Selama 6 bulan di PT Dharma Polimetal Tbk, saya berkesempatan untuk terlibat langsung dalam inisiasi transformasi digital di departemen HR & GA. Fokus utama saya adalah membantu mengintegrasikan proses operasional yang sebelumnya terfragmentasi dan manual menjadi sebuah ekosistem digital yang kohesif, mencakup manajemen fasilitas hingga pelaporan kualitas secara real-time.',
        keyHighlights: [
            'Proyek "Doors": Optimasi alur booking ruang rapat dari 6 langkah menjadi 4 langkah instan.',
            'Digitalisasi GA: Implementasi sistem monitoring perawatan AC beralih dari kertas ke cloud.',
            'User-Centric Design: Mencapai skor SUS 72.5 melalui iterasi desain yang berfokus pada kemudahan penggunaan internal.',
            'Efficiency Boost: Mengelola 600+ jadwal pertemuan tanpa konflik.'
        ],
        strategicAlignment: 'Menunjukkan kemampuan Product Management terintegrasi dengan Full-stack development.',
        coreFeatures: [
            { name: 'Doors Booking', desc: 'Sistem booking ruang rapat 4 langkah.' },
            { name: 'AC Monitoring', desc: 'Pemantauan perawatan aset GA secara digital.' }
        ],
        designSystem: 'Corporate Tech. Fokus pada keterbacaan tinggi dan alur navigasi yang efisien untuk penggunaan internal.',
        designTools: ['Figma', 'React', 'Supabase'],
        researchMethods: ['User Interviews', 'Process Mapping', 'A/B Testing'],
        team: [
            { id: '99122022', name: 'Lukman Hawari Pratama', role: 'Department Head', email: 'lukman.pratama@dp.dharmap.com', dept: 'HRGA', subDept: 'HRMS', image: '/lukmanprofil.png' },
            { id: '11240196', name: 'Listia Ningtias', role: 'Staff', email: 'listia.ningtias@dp.dharmap.com', dept: 'HRGA', subDept: 'HRMS', image: '/listiaprofil.png' },
            { id: '11195854', name: 'Bagas Ardhi Pratama', role: 'Staff', email: 'bagas.pratama@dp.dharmap.com', dept: 'HRGA', subDept: 'HRMS', image: '/bagasprofil.png' },
            { id: '11185354', name: 'Abdul Rohim', role: 'Staff', email: 'abdul.rohim@dp.dharmap.com', dept: 'HRGA', subDept: 'HRMS', image: '/rohimprofil.png' }
        ],
        futureTargets: [
            { category: 'Year 1: Foundation', items: ['Career: Junior UI/UX Designer (Visual & Interaction Focus)', 'Side: Basic Hydroponic Practice (Wick System)'] },
            { category: 'Years 2-3: Design Growth', items: ['Career: Mid-Level UI/UX Designer (UX Research & Prototyping)', 'Mandarin: HSK 1-2 (Basic Conversation)', 'Side: IoT Integration for Automated Hydroponics'] },
            { category: 'Years 4-5: Design Expert', items: ['Career: Senior UI/UX Designer (Design Systems & Strategy)', 'Mandarin: HSK 3-4 (Business & Technical)', 'Side: Profitable Microgreens & Farming Exploration'] },
            { category: 'Years 6-8: Expert', items: ['Career: Senior Digital BA (Expert & Mentorship)', 'Mandarin: HSK 5 (Global Tech Vendors focus)', 'Side: Scaling Modern Agribusiness Operations'] },
            { category: 'Years 9-10: Senior Strategic', items: ['Career: Senior Digital BA (Enterprise Strategy & Architecture)', 'Strategy: Driving Cross-functional Digitalization', 'Goal: Successful Transition to Professional Farming'] }
        ],
        kesan: 'Lingkungan kerja yang sangat mendukung pembelajaran teknis dan manajerial.',
        saran: 'Terus meningkatkan sinkronisasi data antar departemen agar ekosistem digital semakin solid.',
        translations: {
            id: {
                title: 'Studi Kasus: Magang Nasional',
                category: 'UI/UX & System Dev',
                tagline: 'Membangun Ekosistem Digital HR & GA selama 6 Bulan.',
                description: 'Detail teknis dan manajerial dari perjalanan magang 6 bulan, mencakup optimasi sistem booking ruangan hingga kontrol kualitas laporan.'
            }
        }
    },
    {
        id: 'anti-fraud-doors',
        title: 'Case Study: Anti-Fraud & Vendor Audit System',
        category: 'Risk Management',
        image: '/projects/doors/Presentasi Doors-1.webp',
        showcaseImages: [
            '/projects/doors/Presentasi Doors-1.webp',
            '/projects/doors/Presentasi Doors-4.webp',
            '/projects/doors/Presentasi Doors-10.webp'
        ],
                tagline: 'Mencegah Penyalahgunaan Aset & Integritas Data Booking DOORS.',
        description: 'Pendekatan evaluasi dan manajemen risiko menggunakan platform DOORS untuk pelacakan penggunaan ruang rapat dan pencegahan pemesanan fiktif (resource hoarding).',
        problem: 'Proses manual rentan terhadap penyalahgunaan fasilitas, pemesanan fiktif yang merugikan operasional, dan ketiadaan rekam jejak (audit trail) siapa yang memonopoli ruang meeting VIP.',
        solution: 'Mengimplementasikan pengamanan identifikasi berbasis Nomor Induk Karyawan (NPK) dan fitur On-Spot Check-In untuk membatalkan pertemuan "fiktif" otomatis.',
        impact: 'Membasmi kebocoran utilisasi ruang, memastikan akuntabilitas pemakaian aset perusahaan, dan menyajikan laporan valid untuk keperluan audit operasional HRGA.',
        tags: ['Anti-Fraud', 'Process Audit', 'Risk Management', 'Investigasi'],
        size: 'large',
        uxTemplate: 'standard',
        journey: [
            { month: 'Pilar 1', title: 'Pencegahan (Prevention)', desc: 'Membangun tata kelola (GCG) dan memotong Peluang (Opportunity) fraud lewat SOP wajib Check-In fisik.' },
            { month: 'Pilar 2', title: 'Deteksi (Detection)', desc: 'Mengintegrasikan audit internal dan analisis data untuk mengidentifikasi anomali pemesanan fiktif.' },
            { month: 'Pilar 3', title: 'Investigasi & Sanksi', desc: 'Menyediakan Audit Trail tak terbantahkan berbasis NPK untuk menggali modus operandi pelaku.' },
            { month: 'Pilar 4', title: 'Pemantauan & Evaluasi', desc: 'Meninjau efektivitas strategi secara berkala lewat laporan utilisasi aset HRGA yang bebas manipulasi.' }
        ],
        pillars: [
            { id: 'preventive', name: 'Pencegahan', icon: 'shield', desc: 'Sistem Auto-Cancel untuk memblokir niat kecurangan sesuai fraud triangle.', metric: 'Zero Loopholes', tag: 'Prevention' },
            { id: 'detective', name: 'Deteksi', icon: 'search', desc: 'Dashboard analitik live untuk mengidentifikasi anomali (Ghost Meetings).', metric: 'Live Audit', tag: 'Detection' },
            { id: 'investigative', name: 'Investigasi & Pelaporan', icon: 'file-text', desc: 'Rekam jejak NPK mutlak untuk bukti forensik dan sanksi.', metric: '100% Trace', tag: 'Investigation' },
            { id: 'monitoring', name: 'Pemantauan', icon: 'eye', desc: 'Evaluasi berkala pemanfaatan aset HRGA berdasar data murni.', metric: 'SOP Compliant', tag: 'Monitoring' }
        ],
        problemMap: [
            { problem: 'Resource Hoarding', context: 'Oknum memonopoli ruang rapat di sistem namun praktiknya tidak pernah hadir.', solution: 'On-Spot Validation', mitigation: 'Sistem otomatis menggugurkan booking jika dalam 15 menit awal tak ada validasi tablet rungan.' }
        ],
        stats: [
            { label: 'Data Integrity', value: '100%', description: 'Log log-in divalidasi keaktifannya.' },
            { label: 'Asset Utilization', value: '+40%', description: 'Penurunan angka "Ghost Meetings".' }
        ],
        mitigationPlans: [
            { risk: 'Identity Spoofing', action: 'Mengunci hak akses pemesanan pada sistem hanya melalui autentikasi NPK milik karyawan yang sah.' }
        ],
        personas: [
            { role: 'Anti Fraud Officer', pain: 'Kehilangan kendali pelacakan pada oknum internal yang menyalahgunakan pemesanan.', goal: 'Dasbor pemantauan anti manipulasi.' },
            { role: 'GA Manager', pain: 'Konflik departemen akibat bentrok fasilitas karena jejak kertas tak valid.', goal: 'Budaya tertib penggunaan aset perusahaan.' }
        ],
        businessModel: [
            { type: 'Operational Efficiency', value: 'Mencegah inefisiensi jam meeting dan memaksimalkan ruang.' }
        ],
        beforeAfter: [
            { aspect: 'Audit Trail', before: 'Logbook kertas rentan ditulis asal tanpa verifikasi pasti.', after: 'Autentikasi mutlak merekam identitas digital konstan.' }
        ],
        vision: 'Mewujudkan praktik Good Corporate Governance melindungi fasilitas perusahaan.',
        status: 'COMPLETED',
        uxOverview: 'Sistem dirancang dengan orientasi rekam jejak penuh (audit trail) murni utuk investigasi oknum penyalahguna.',
        background: 'Mendasari konsep Fraud Triangle (Tekanan, Peluang, Rasionalisasi), mayoritas celah fraud di bidang operasional lahir dari besarnya sebuah "Peluang" pada sistem terdesentralisasi—seperti buku absen kertas yang disalahgunakan untuk monopoli pemesanan VIP. Menjawab kualifikasi Anti-Fraud Officer di PT Dharma Polimetal Tbk, saya membuktikan diri dalam mengimplementasikan "Fraud Control Plan" (Pencegahan, Deteksi, Investigasi, Pemantauan) ke dalam simulasi nyata via ekosistem DOORS. Lewat kontrol autentikasi berlapis (Tablet NPK), saya secara harafiah "menekan habis peluang" bagi oknum, memastikan budaya sadar tata kelola terbangun sempurna dan data audit bebas dari campur tangan oknum.',
        keyHighlights: [
            'Risk Identification: Menganalisa tabiat "Ghost Meetings" dan penimbunan wewenang.',
            'Digital Control: Autentikasi NPK & Auto-Cancel via tablet fisik (On-Spot).',
            'Reporting & Fact Verification: Log Audit Trail transparan dan tidak dapat diubah.',
            'Policy Enforcement: Memaksa pegawai patuh SOP peminjaman melalui sistem blokir.'
        ],
        strategicAlignment: 'Menunjukkan Investigasi Fraud, Pemetaan Risiko Internal, & Verifikasi Data Logikal.',
        coreFeatures: [
            { name: 'Hardware Validation (Tablet)', desc: 'Validasi on-spot mengeliminasi tindakan fiktif oknum.' },
            { name: 'Irreversible NPK Log', desc: 'Audit Trail rekam aktivitas konstan tertaut Nomor Induk Karyawan utuh.' }
        ],
        designSystem: 'Analytical, Immutable Traceability (Jejak Terkunci), & Transparent.',
        designTools: ['Risk Register Map', 'Actor Use-Case Modeling', 'Control Procedure Flowchart'],
        researchMethods: ['User Pattern Identification', 'Data Flow Fraud Simulation'],
        translations: {
            id: {
                title: 'Studi Kasus: DOORS - Integritas & Audit Forensik',
                category: 'Manajemen Risiko',
                tagline: 'Memutus Monopoli Fasilitas Lewat Kontrol Log Digital.',
                description: 'Penerapan kemampuan analitik untuk membatalkan taktik manipulasi pemesanan sistem DOORS HRGA.'
            }
        }
    }
];
