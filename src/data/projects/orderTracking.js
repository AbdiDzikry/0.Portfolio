export const orderTrackingProject = {
    id: 'order-tracking',
    title: 'Tracking Order Customer',
    isTrialData: true,
    experience: 'dharma-controlcable',
    category: 'Frontend Development',
    image: '/projects/order-tracking/thumbnail.png',
    showcaseImages: [
        '/projects/order-tracking/thumbnail.png',
        '/projects/order-tracking/1.png',
        '/projects/order-tracking/2.png',
        '/projects/order-tracking/order-stage.png',
        '/projects/order-tracking/packing-progress.png',
        '/projects/order-tracking/stage-detail.png',
        '/projects/order-tracking/shipment-status.png',
        '/projects/order-tracking/mobile-view.png'
    ],
    // ── Interactive Showcase Metadata ──
    galleryItems: [
        {
            id: 'track-thumbnail',
            image: '/projects/order-tracking/thumbnail.png',
            title: 'Overview Tracking Order Customer',
            subtitle: 'Customer Delivery Note & Supplier Manifest Tracking',
            category: 'Overview',
            tech: ['Next.js', 'React 19', 'Tailwind CSS'],
            description: 'Tampilan utama aplikasi pelacakan pengiriman customer PT Dharma Controlcable Indonesia.'
        },
        {
            id: 'track-search-1',
            image: '/projects/order-tracking/1.png',
            title: 'Halaman Pencarian Order Tracking',
            subtitle: 'Public Read-Only Tracking Portal',
            category: 'Pencarian',
            tech: ['Next.js', 'React 19', 'PWA'],
            description: 'Tampilan antarmuka pencarian nomor Delivery Note (DN) atau Supplier Manifest yang dapat diakses publik tanpa login.'
        },
        {
            id: 'track-search-2',
            image: '/projects/order-tracking/2.png',
            title: 'Tampilan Hasil Pelacakan & Validasi',
            subtitle: 'Real-time Tracking Result View',
            category: 'Pelacakan',
            tech: ['Next.js', 'React 19', 'Tailwind CSS'],
            description: 'Tampilan hasil pelacakan pesanan beserta status validasi nomor pengiriman customer.'
        },
        {
            id: 'order-stage',
            image: '/projects/order-tracking/order-stage.png',
            title: 'Stepper 5 Tahap Fulfillment',
            subtitle: 'Received to Delivery Progress',
            category: 'Alur Proses',
            tech: ['Next.js', 'TypeScript'],
            description: 'Visualisasi lima tahap operasional gudang finish good — Received, Stock Approved, Packing, Ready to Ship, dan Delivery — dengan tahap aktif ditandai cincin berputar dan badge "SEDANG BERJALAN".'
        },
        {
            id: 'packing-progress',
            image: '/projects/order-tracking/packing-progress.png',
            title: 'Progres Pemindaian Barcode per Part',
            subtitle: 'Live Packing Manifest Progress',
            category: 'Pelacakan',
            tech: ['Next.js', 'REST API'],
            description: 'Pada tahap Packing, aplikasi menampilkan progres pemindaian barcode per part dalam format "x / y pcs" lengkap dengan progress bar agar customer melihat dikerjakan secara nyata.'
        },
        {
            id: 'stage-detail',
            image: '/projects/order-tracking/stage-detail.png',
            title: 'Detail Tahap: PIC & Jam Waktu',
            subtitle: 'Operational Transparency',
            category: 'Informasi',
            tech: ['TypeScript', 'Intl API'],
            description: 'Setiap tahap yang telah dilalui menampilkan jam waktu dalam zona Asia/Jakarta (WIB) format 24 jam beserta nama petugas (PIC) yang menangani.'
        },
        {
            id: 'shipment-status',
            image: '/projects/order-tracking/shipment-status.png',
            title: 'Status Pengiriman & Manifest Part',
            subtitle: 'Ready to Ship and Delivery Stages',
            category: 'Pengiriman',
            tech: ['Next.js', 'Tailwind CSS'],
            description: 'Pada tahap Ready to Ship dan Delivery, customer melihat badge "Siap Kirim" beserta ringkasan manifest part yang akan dikirimkan.'
        },
        {
            id: 'mobile-view',
            image: '/projects/order-tracking/mobile-view.png',
            title: 'Mobile-First dengan Mode Gelap',
            subtitle: 'Installable PWA Experience',
            category: ['Antarmuka', 'PWA'],
            tech: ['Next.js', 'PWA', 'Dark Mode'],
            description: 'Layout responsif satu kolom di HP dengan dukungan mode gelap penuh, glassmorphism, dan kemampuan di-install ke layar utama perangkat seperti aplikasi biasa.'
        }
    ],
    techStackDetails: [
        {
            name: 'Next.js 16',
            category: 'Frontend Framework',
            role: 'App Router dengan React Server Component untuk fetch langsung ke backend internal di sisi server sehingga alamat API tidak pernah sampai ke browser.',
            highlights: [
                'React Server Component dengan cache: "no-store" agar status pesanan tidak pernah basi',
                'Catch-all route [...number] untuk menangani nomor DN yang mengandung tanda "/"',
                'App Router + Metadata API untuk SEO dan tampilan browser'
            ]
        },
        {
            name: 'TypeScript 5',
            category: 'Programming Language',
            role: 'Strict typing tanpa any untuk seluruh pipeline data pesanan, termasuk discriminated union yang memaksa penanganan kondisi gagal secara exhaustif.',
            highlights: [
                'Enum OrderStage 1 | 2 | 3 | 4 | 5 sehingga nomor tahap invalid mustahil lolos',
                'Discriminated union { found: true } | { found: false } untuk result pemanggilan API',
                'Tipe OrderStatus, OrderStatusItem, OrderStatusPic, dan OrderStatusPic didefinisikan sekali'
            ]
        },
        {
            name: 'Tailwind CSS v4',
            category: 'Styling',
            role: 'Sistem desain terpusat untuk stepper 5 tahap, animasi video per tahap, glassmorphism, dan blob gradient background.',
            highlights: [
                'Dark mode lengkap dengan varian warna pada setiap elemen',
                'Layout responsif satu kolom di HP, dua kolom di desktop',
                'Font Sora + Plus Jakarta Sans + JetBrains Mono'
            ]
        },
        {
            name: 'PWA',
            category: 'Progressive Web App',
            role: 'Web App Manifest dan dukungan install agar customer dapat mengcek pesanan tanpa membuka browser setiap kali.',
            highlights: [
                'manifest.json dengan mode standalone dan ikon aplikasi',
                'Penanganan event beforeinstallprompt plus deteksi mode standalone',
                'Modal panduan manual untuk Chrome/Edge, Android, dan iOS Safari'
            ]
        },
        {
            name: 'REST API',
            category: 'Backend Integration',
            role: 'Integrasi REST read-only ke backend internal new-factory (Node.js/Express + MongoDB) dengan batas waktu 5 detik dan sanitasi payload.',
            highlights: [
                'Timeout 5 detik menggunakan AbortSignal.timeout',
                'Penanganan 404, status non-2xx, dan request gagal',
                'Sanitasi data: array items dipaksa array, pic diberi nilai default bila null'
            ]
        }
    ],
    tagline: 'Public Order Tracking for Customer Delivery Note & Supplier Manifest.',
    description: 'A public web app letting customers of PT Dharma Controlcable Indonesia track their order position across 5 finish-good warehouse stages (Received, Stock Approved, Packing, Ready to Ship, Delivery) using only a Delivery Note or Supplier Manifest number — no login required.',
    problem: 'All order data already existed in the internal new-factory system, but it was staff-only. Every "where is my order?" question had to be relayed to the Warehouse Supervisor, then operators, then logistics, costing hours of staff time and sometimes resolving the next day.',
    solution: 'A public, read-only tracking page that fetches from the internal backend on the server side, renders the 5-stage fulfillment flow with timestamps, PIC names, and per-part barcode packing progress, and handles every failure mode with clear Indonesian-language messages instead of a blank page.',
    impact: 'Customers can self-check their order position instantly without any login. Internal API address stays on the server, a 5-second timeout prevents hanging requests, and the trigger documentation I wrote became a shared reference across frontend, backend, and operations teams.',
    status: 'COMPLETED',
    benefits: 'Customers & Sales/PPIC Division of PT Dharma Controlcable Indonesia',
    vision: 'Transparent, proactive order communication that removes manual status relay and builds customer trust.',
    strategicAlignment: 'Supports Smart Factory digitalization by exposing internal fulfillment data as a secure, customer-facing read-only experience.',
    team: 'Sulthan Abdi Dzikry (Developer)',
    tags: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'PWA', 'REST API'],
    size: 'large',
    problemMap: [
        { problem: 'Customer Has No Visibility', context: 'Customers had no way to see their own order position.', solution: 'Public Tracking Page', mitigation: 'Order status retrieved by DN or Supplier Manifest number without login.' },
        { problem: 'Manual Status Relay', context: 'Questions were passed from Sales to Warehouse Supervisor to Logistics, taking hours.', solution: 'Self-Service Lookup', mitigation: 'Customer directly retrieves current stage, timestamp, and PIC.' },
        { problem: 'Slash in DN Number', context: 'Real DN numbers contain "/" (e.g. DCI/08/26/0251) and always returned 404.', solution: 'Query String + Catch-all Route', mitigation: 'Switched to ?dn_number= and joined catch-all segments with "/".' }
    ],
    stats: [
        { label: 'Stages Tracked', value: '5', description: 'Received to Delivery fulfillment flow.' },
        { label: 'API Timeout', value: '5s', description: 'AbortSignal.timeout upper bound.' },
        { label: 'API Exposure', value: '0', description: 'Internal URL never reaches the browser.' },
        { label: 'Login Required', value: 'None', description: 'Fully public read-only access.' }
    ],
    timeline: [
        { phase: 'Research & Mapping', period: 'Week 1-2', activities: ['Floor observation', 'Trigger mapping with PPIC/Logistics', 'Mermaid state transition diagram'] },
        { phase: 'Architecture & Build', period: 'Week 3-6', activities: ['Server Component data layer', 'Query string + catch-all route', 'STAGE_CONFIG centralization'] },
        { phase: 'UI/UX & PWA', period: 'Week 7-8', activities: ['Mobile-first stepper design', 'Dark mode & animations', 'Install prompt + manual guide modal'] },
        { phase: 'Review & Merge', period: 'Week 9', activities: ['ESLint + tsc --noEmit', '/preview-stages demo page', 'Code review & PR to develop'] }
    ],
    personas: [
        { role: 'Customer (Sales Division)', pain: 'No way to check own order status.', goal: 'Type a number and instantly see the current stage.' },
        { role: 'Sales / PPIC Staff', pain: 'Relaying status questions manually took hours.', goal: 'Fewer inbound calls and proactive communication.' }
    ],
    businessModel: [
        { type: 'Operational Efficiency', value: 'Removes hours of manual status relay per order inquiry.' },
        { type: 'Customer Trust', value: 'Transparent progress visibility strengthens customer confidence.' }
    ],
    beforeAfter: [
        { aspect: 'Status Access', before: 'Customer must ask staff and wait hours', after: 'Self-service lookup, instant result' },
        { aspect: 'API Security', before: 'Internal system only reachable by staff', after: 'Server-side fetch, internal URL never exposed' },
        { aspect: 'Error Handling', risk: 'Risk of blank or hanging page', after: '5s timeout with two mapped error states' },
        { aspect: 'Device Experience', before: 'Desktop browser only', after: 'Mobile-first PWA, installable to home screen' }
    ],
    mitigationPlans: [
        { risk: 'Upstream Down / Timeout', action: 'AbortSignal.timeout(5000) with retry-friendly back button and clear Indonesian messages.' },
        { risk: 'Malformed Payload', action: 'Validate payload shape (timestamps presence) and sanitize items/pic before rendering.' }
    ],
    investmentRequired: '9 Weeks Design & Development / 1 Frontend Developer',
    assumptions: `1. Public read-only endpoint is safe to expose without API keys.
2. Customer-facing Bahasa Indonesia copy is understood by all customers.
3. Customer is willing to use the DN number they already have.`,
    productArchitecture: 'Next.js 16 App Router + React Server Component (Frontend), Node.js/Express + MongoDB new-factory (Backend)',
    coreFeatures: [
        { name: 'Public Order Lookup', desc: 'Search by Delivery Note or Supplier Manifest, no login required.' },
        { name: '5-Stage Stepper', desc: 'Visual Received, Stock Approved, Packing, Ready to Ship, Delivery flow.' },
        { name: 'Packing Progress', desc: 'Per-part barcode scan progress with x/y pcs and progress bar.' },
        { name: 'PWA Install', desc: 'Installable to home screen with manual guides for Chrome, Android, and iOS.' }
    ],
    designSystem: 'Mobile-first design with a 5-stage horizontal stepper, glassmorphism cards, blob gradient backdrop, per-stage gradient and icon from STAGE_CONFIG, and full dark mode support. Typography uses Sora for headings, Plus Jakarta Sans for body, and JetBrains Mono for data.',
    designTools: ['Figma', 'FigJam (Process Mapping)', 'Notion (Documentation)'],
    researchMethods: ['Contextual Inquiry', 'Process Mapping', 'State Transition Diagram (Mermaid)', 'Stakeholder Review'],
    uxOverview: 'Dashboard-less, content-first interface. One number input leads to a single result screen that answers three questions immediately: where is my order, what time did each step happen, and who handled it.',
    background: 'During my internship at PT Dharma Controlcable Indonesia, I noticed that order data was already fully recorded in the internal new-factory system, but only staff could access it. Customers asking "where is my order?" generated hours of manual relay work. I built a public read-only tracking page, mapping the 5-stage fulfillment flow with the operational team first, then implementing it with React Server Components so the internal API address could never leak to the browser.',
    translations: {
        id: {
            title: 'Tracking Order Customer',
            tagline: 'Pelacakan Publik Pesanan Customer based on Delivery Note & Supplier Manifest.',
            description: 'Aplikasi web publik untuk melacak status pemrosesan pesanan pelanggan PT Dharma Controlcable Indonesia. Customer cukup memasukkan nomor Delivery Note (DN) atau Supplier Manifest, lalu sistem menampilkan posisi pesanan dalam 5 tahapan operasional gudang finish good — Received, Stock Approved, Packing, Ready to Ship, dan Delivery — lengkap dengan jam waktu, nama petugas (PIC) yang menangani, serta progres pemindaian barcode per part. Aplikasi dapat di-install ke layar utama perangkat (PWA) dan dirancang mobile-first.',
            problem: 'Seluruh data pesanan sudah terekam di sistem internal new-factory, tetapi hanya bisa diakses staf internal. Setiap pertanyaan "pesanan saya sudah mana?" harus diteruskan ke Supervisor Gudang, lalu operator, lalu logistik, sehingga butuh berjam-jam — kadang sampai keesokan hari.',
            solution: 'Halaman tracking publik (read-only, tanpa login) yang melakukan fetch ke backend internal di sisi server, menampilkan alur 5 tahap beserta jam waktu, nama PIC, dan progres packing per part, serta menangani seluruh kondisi gagal dengan pesan Bahasa Indonesia yang jelas — tidak ada halaman putih kosong.',
            impact: 'Customer dapat melacak posisi pesanan sendiri secara instan tanpa login. Alamat API internal tetap aman di server, batas waktu 5 detik mencegah request menggantung, dan dokumentasi trigger 5 tahap yang saya tulis menjadi rujukan bersama antar tim frontend, backend, dan operasional.',
            status: 'SELESAI',
            benefits: 'Customer serta Divisi Penjualan & PPIC PT Dharma Controlcable Indonesia',
            vision: 'Komunikasi pesanan yang transparan dan proaktif, menghapus relay status manual serta membangun kepercayaan customer.',
            strategicAlignment: 'Mendukung digitalisasi Smart Factory dengan mengekspos data fulfillment internal sebagai pengalaman read-only yang aman untuk customer.',
            background: 'Selama magang di PT Dharma Controlcable Indonesia, saya menyadari bahwa data pesanan sudah terekam lengkap di sistem internal new-factory, namun hanya bisa diakses staf internal. Customer yang menanyakan "pesanan saya sudah mana?" menimbulkan beban relay manual berjam-jam. Saya membangun halaman tracking publik read-only, dengan memetakan alur 5 tahap bersama tim operasional terlebih dahulu, lalu mengimplementasikannya dengan React Server Component sehingga alamat API internal tidak mungkin bocor ke browser.',
            investmentRequired: '9 Minggu Desain dan Development / 1 Frontend Developer',
            assumptions: `1. Endpoint publik read-only aman untuk dibuka tanpa API key.
2. Copy Bahasa Indonesia dipahami oleh seluruh customer.
3. Customer bersedia memakai nomor DN yang sudah mereka miliki.`,
            productArchitecture: 'Next.js 16 App Router + React Server Component (Frontend), Node.js/Express + MongoDB new-factory (Backend)',
            problemMap: [
                { problem: 'Customer Tidak Punya Visibilitas', context: 'Customer tidak punya cara melihat posisi pesanan sendiri.', solution: 'Halaman Tracking Publik', mitigation: 'Status pesanan diambil berdasarkan nomor DN atau Supplier Manifest tanpa login.' },
                { problem: 'Relay Status Manual', context: 'Pertanyaan diteruskan dari Penjualan ke Supervisor Gudang ke Logistik, makan berjam-jam.', solution: 'Pencarian mandiri (Self-Service)', mitigation: 'Customer langsung melihat tahap, jam waktu, dan PIC yang menangani.' },
                { problem: 'Tanda Slash pada Nomor DN', context: 'Nomor DN asli mengandung "/" (contoh DCI/08/26/0251) dan selalu menghasilkan 404.', solution: 'Query String + Catch-all Route', mitigation: 'Berpindah ke ?dn_number= dan menggabungkan segmen catch-all dengan join("/").' }
            ],
            stats: [
                { label: 'Tahap Dilacak', value: '5', description: 'Alur fulfillment dari Received sampai Delivery.' },
                { label: 'Batas Waktu API', value: '5 detik', description: 'Batas atas AbortSignal.timeout.' },
                { label: 'Bocor Alamat API', value: '0', description: 'URL internal tidak pernah sampai ke browser.' },
                { label: 'Butuh Login', value: 'Tidak', description: 'Akses publik read-only sepenuhnya.' }
            ],
            timeline: [
                { phase: 'Riset & Pemetaan', period: 'Minggu 1-2', activities: ['Observasi lantai produksi', 'Pemetaan trigger bersama PPIC/Logistik', 'Diagram transisi status Mermaid'] },
                { phase: 'Arsitektur & Development', period: 'Minggu 3-6', activities: ['Layer data Server Component', 'Query string + catch-all route', 'Pemusatan STAGE_CONFIG'] },
                { phase: 'UI/UX & PWA', period: 'Minggu 7-8', activities: ['Desain stepper mobile-first', 'Dark mode & animasi', 'Install prompt + modal panduan manual'] },
                { phase: 'Review & Merge', period: 'Minggu 9', activities: ['ESLint + tsc --noEmit', 'Halaman demo /preview-stages', 'Code review & PR ke develop'] }
            ],
            personas: [
                { role: 'Customer (Divisi Penjualan)', pain: 'Tidak punya cara cek status pesanannya sendiri.', goal: 'Masukkan nomor dan langsung melihat tahap terkini.' },
                { role: 'Staf Penjualan / PPIC', pain: 'Menjawab pertanyaan status secara manual memakan waktu berjam-jam.', goal: 'Lebih sedikit telepon masuk dan komunikasi lebih proaktif.' }
            ],
            businessModel: [
                { type: 'Efisiensi Operasional', value: 'Menghilangkan jam-jam relay status manual untuk setiap pertanyaan pesanan.' },
                { type: 'Kepercayaan Customer', value: 'Visibilitas progres yang transparan memperkuat kepercayaan customer.' }
            ],
            beforeAfter: [
                { aspect: 'Akses Status', before: 'Customer harus bertanya ke staf dan menunggu berjam-jam', after: 'Cek mandiri, hasil instan' },
                { aspect: 'Keamanan API', before: 'Sistem internal hanya bisa diakses staf', after: 'Fetch di sisi server, URL internal tidak pernah terekspos' },
                { aspect: 'Penanganan Error', before: 'Berpotensi halaman kosong atau menggantung', after: 'Timeout 5 detik dengan dua kondisi error yang dipetakan' },
                { aspect: 'Pengalaman Perangkat', before: 'Hanya browser desktop', after: 'PWA mobile-first, bisa di-install ke layar utama' }
            ],
            mitigationPlans: [
                { risk: 'Backend Mati / Timeout', action: 'AbortSignal.timeout(5000) dengan tombol kembali ke pencarian dan pesan Bahasa Indonesia yang jelas.' },
                { risk: 'Payload Tidak Sesuai', action: 'Validasi bentuk payload (keberadaan timestamps) dan sanitasi items/pic sebelum dirender.' }
            ],
            designSystem: 'Desain mobile-first dengan stepper horizontal 5 tahap, kartu glassmorphism, latar blob gradient, gradien dan ikon per tahap dari STAGE_CONFIG, serta dukungan mode gelap penuh. Tipografi memakai Sora untuk heading, Plus Jakarta Sans untuk body, dan JetBrains Mono untuk data.',
            designTools: ['Figma', 'FigJam (Pemetaan Proses)', 'Notion (Dokumentasi)'],
            researchMethods: ['Inkuiri Kontekstual', 'Pemetaan Proses', 'Diagram Transisi Status (Mermaid)', 'Review Stakeholder'],
            uxOverview: 'Antarmuka tanpa dashboard, mengutamakan konten. Satu input nomor menuju satu layar hasil yang langsung menjawab tiga pertanyaan: pesanan saya di mana, jam berapa tiap tahapnya, dan siapa yang menanganinya.'
        }
    }
};
