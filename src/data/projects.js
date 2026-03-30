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
        benefits: 'Employees of PT. Dharma Polimetal Tbk.',
        researchImage: '/projects/doors/hasil_sus_doors.png',
        tags: ['Agile', 'PWA', 'Paper Prototyping', 'SUS Testing', 'UI/UX Design'],
        size: 'large',
        liveLink: 'https://doors2.dharmap.com/',
        designTools: ['Figma', 'Paper & Pen', 'FigJam'],
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
            { phase: 'Discovery', period: '29 Oct - 14 Jan', activities: ['Agile Methodology setup', 'Current state analysis', 'User pain point mapping'] },
            { phase: 'Design', period: '29 Oct - 14 Jan', activities: ['Information Architecture', 'Paper Prototyping', 'Rapid Wireframing'] },
            { phase: 'Iterating', period: '29 Oct - 14 Jan', activities: ['SUS Usability Testing', 'Refining UI/UX', 'Final Handoff'] }
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
                    { phase: 'Discovery', period: '29 Okt - 14 Jan', activities: ['Setup Metodologi Agile', 'Analisis kondisi saat ini', 'Pemetaan pain point'] },
                    { phase: 'Design', period: '29 Okt - 14 Jan', activities: ['Arsitektur Informasi', 'Paper Prototyping', 'Wireframing Cepat'] },
                    { phase: 'Iterating', period: '29 Okt - 14 Jan', activities: ['Usability Testing (SUS)', 'Penyempurnaan UI/UX', 'Handoff Final'] }
                ]
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

];
