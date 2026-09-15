import React, { useState, useEffect } from 'react';
import {
    ChevronLeft, ChevronRight, Maximize, Minimize,
    Target, Search, Hammer, FileText, Users,
    Boxes, TrendingUp, ArrowRight, HeartHandshake,
    GraduationCap, Rocket, Info, Code2, HelpCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ── Paper & Ink Palette ──
   ink #16181D · paper #F6F3EB · card #FBF9F3
   vermilion #C9413B · gold #A8823C · steel #6E6A5C · line #E4DDCB */

const RED = '#C9413B';
const GOLD = '#A8823C';
const STEEL = '#6E6A5C';

const Blossom = ({ size = 40, opacity = 1, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} style={{ opacity }} aria-hidden="true">
        {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="20" cy="9" rx="6.5" ry="9.5" fill={RED} transform={`rotate(${a} 20 20)`} />
        ))}
        <circle cx="20" cy="20" r="4.5" fill={GOLD} />
    </svg>
);

const BlossomGold = ({ size = 28, opacity = 1, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} style={{ opacity }} aria-hidden="true">
        {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="20" cy="10" rx="6" ry="8.5" fill={GOLD} transform={`rotate(${a} 20 20)`} />
        ))}
        <circle cx="20" cy="20" r="4" fill={RED} />
    </svg>
);

const StoryPresentation = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const slides = [
        {
            type: 'title',
            label: 'Identity & Purpose',
            title: 'I Am Known As?',
            subtitle: 'Di masa depan, saya ingin dikenal sebagai?',
            author: 'S. Abdi Dzikry',

        },
        {
            type: 'question',
            label: 'Di 5 Tahun Ke Depan',
            title: 'Perkenalan',
            prompt: '"Silakan perkenalkan diri Anda, dan ceritakan pengalaman anda."',
            quote: '"Perkenalkan nama saya Sulthan Abdi Dzikry. Saya sudah ...  tahun di bidang digitalisasi manufaktur. Selama itu, saya telah banyak melakukan improvement digitalisasi dan membuat sistem yang membantu operasional perusahaan."',
            answer: 'Saya bangga dan bahagia ketika mengucapkan ini'
        },
        {
            type: 'identity',
            label: 'Identity',
            title: 'Identitas yang Saya Bangun',
            quote: 'Ketika perusahaan punya proses yang berantakan, saya ingin menjadi orang yang datang, memahami masalahnya, lalu membangun sistem untuk memperbaikinya.',
            selected: 'Pembangun Sistem Digital',
            rows: [
                { label: 'Pandangan Saya', value: 'Saya suka proses yang berantakan — itu alasan untuk mencipta.' },
                { label: 'Energi Saya', value: 'creation → improvement → impact, bukan execution → repetition.' },
                { label: 'Validasi Saya', value: 'keberadaan saya menghasilkan sesuatu yang berarti.' }
            ]
        },
        {
            type: 'artifacts',
            label: 'Proof',
            title: 'Artefak yang Bisa Saya Tunjukkan',
            intro: 'Ini sistem yang saya buat. Ini user-nya. Ini impact-nya.',
items: [
                { path: '/projects/doors', image: '/projects/doors/Presentasi Doors-1.webp', icon: Boxes, name: 'DOORS', org: 'Dharma Polimetal', desc: 'Booking ruang rapat 4 langkah, 0 konflik' },
                { path: '/projects/ac-monitoring', image: '/projects/9. AC Monitoring/ac.1.png', icon: Hammer, name: 'LaporAC', org: 'Dharma Polimetal', desc: 'Monitoring & perbaikan aset AC terpusat' },
                { path: '/projects/portal-aduan', image: '/projects/12-portal-aduan/12.png', icon: Search, name: 'Nonconformity', org: 'Dharma Controlcable', desc: 'Alur penyelesaian masalah kualitas' },
                { path: '/projects/ais-backend', image: '/projects/11-ais-backend/1.png', icon: FileText, name: 'AIS', org: 'Dharma Controlcable', desc: 'ERP/WMS tulang punggung Smart Factory' },
                { path: '/projects/lmk-qc-report', image: '/projects/10. LMK QC Report/1.qc.png', icon: TrendingUp, name: 'LMK QC', org: 'Quality Control', desc: 'Pelaporan & dokumentasi QC terstandar' }
            ]
        },
        {
            type: 'create',
            label: 'Create',
            title: 'Akhirnya Jadi — bukan Akhirnya Selesai',
            intro: 'Jam 20.00, masih bekerja. Dua dunia yang berbeda.',
            pairs: [
                { title: 'Digitalisasi', tone: RED, steps: ['“Bang, sistemnya error.”', 'Buka laptop · debug · deploy', '“Sekarang tidak perlu Excel manual lagi.”', 'Capek, tapi: AKHIRNYA JADI.'] },
                { title: 'Purchasing', tone: STEEL, steps: ['PO, supplier, material ID, Excel.', 'Follow up · dokumen · urgent request.', 'Besok pagi harus selesai.', 'Setelah selesai: AKHIRNYA SELESAI.'] }
            ]
        },
        {
            type: 'loss',
            label: 'Loss',
            title: 'Yang Tidak Ingin Saya Kehilangan',
            intro: 'Jika saya jauh dari IT, inilah yang sesungguhnya hilang.',
            items: [
                { icon: Hammer, name: 'Menciptakan', desc: 'Dari ide menjadi sistem.' },
                { icon: Boxes, name: 'Bukti Konkret', desc: 'Aplikasi, workflow, dashboard.' },
                { icon: TrendingUp, name: 'Sense of Impact', desc: 'Orang lain memakai sesuatu yang saya buat.' },
                { icon: Target, name: 'Continuous Learning', desc: 'Teknologi berubah, cara berpikir berkembang.' },
                { icon: Search, name: 'Autonomy', desc: 'Ruang untuk bertanya: “bagaimana kalau dibuat seperti ini?”' }
            ]
        },
        {
            type: 'path',
            label: 'Career Path',
            title: 'Tangga Karir — 10 Tahun ke Depan',
            intro: 'Dari hari ini, menuju tim yang fokus pada inovasi.',
            note: 'Sasaran ini saya susun hari ini — dan saya sadar tujuannya akan berbeda di kemudian hari, karena tenaga, teknologi, dan arah industri terus beradaptasi mengikuti zaman.',
            steps: [
                { year: 'Tahun 0', name: 'Digitalisasi & Sistem', icon: GraduationCap, color: STEEL, desc: 'Membuat sistem nyata — memahami masalah operasional dan mengembangkan sistem. HRMS Doors • AIS • Nonconformity' },
                { year: 'Tahun 2-3', name: 'Software / System Developer', icon: Code2, color: GOLD, desc: 'Individu yang mandiri dan terampil di bidang nya, mempersiapkan skill untuk memiliki tanggung jawab yang lebih besar ' },
                { year: 'Tahun 4-5', name: 'Senior Developer / Technical Owner', icon: Target, color: RED, desc: 'Memiliki ownership terhadap sistem — Architecture • Code Review • Technical Decision • Mentoring' },
                { year: 'Tahun 6-7', name: 'Tech Lead', icon: Users, color: '#6E6A5C', desc: 'Memimpin developer — technical direction, kualitas dan reliability.' },
                { year: 'Tahun 8-10', name: 'Tech Lead — Digital Innovation', icon: Rocket, color: GOLD, desc: 'Memimpin tim yang menciptakan solusi baru untuk bisnis / manufaktur.' },
                { year: '10+ Tahun', name: '?', icon: HelpCircle, color: RED, desc: 'Diisi saat waktunya tiba.' }
            ]
        },
        {
            type: 'regret',
            label: 'Choice',
            title: 'Pengandaian di Umur 35',
            intro: 'Regret minimization — mana yang lebih berat untuk saya terima?',
            columns: [
                { tag: 'Penyesalan A', tone: STEEL, text: '“Umur 24 saya takut menganggur, ambil posisi apa saja. Kini 10 tahun, saya semakin jauh dari tujuan akhir saya  .”' },
                { tag: 'Penyesalan B', tone: RED, text: '“Umur 24 saya mengejar IT. Sulit, sempat 1-2 tahun mencari peluang di perusahaan sembari up skill, cari sertifikasi, dan kerja sampingan di bidang IT. Kini 10 tahun di bidang transformasi digitalisasi.”' }
            ],
            verdict: 'Saya lebih bisa menerima Penyesalan B — karena keterlambatan mengejar yang sudah direncanakan lebih ringan dibanding menjauh dari tujuan saya.'
        },
        {
            type: 'closing',
            label: 'Next Step',
            title: 'Lihat Projek Lainnya',
            subtitle: 'dari Sulthan Abdi Dzikry',
            path: 'HR · Produksi · Quality · Operasional',
            contact: 'S. Abdi Dzikry',
            website: 'sulthanabdi.vercel.app',
            note: ';'
        }
    ];

    const total = slides.length;
    const current = slides[currentSlide];

    const go = (dir) => {
        setCurrentSlide((prev) => Math.max(0, Math.min(total - 1, prev + dir)));
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(1); }
            if (e.key === 'ArrowLeft') go(-1);
            if (e.key === 'Escape') navigate('/projects');
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const SectionHead = ({ label, title, subtitle, center }) => (
        <div className={center ? 'text-center mb-8' : 'mb-8'}>
            <div className={`flex items-center gap-3 mb-3 ${center ? 'justify-center' : ''}`}>
                {!center && <span className="h-1 w-2 bg-[#C9413B]" />}
                <span className="text-[9px] font-mono font-black uppercase tracking-[0.45em] text-[#C9413B]">{label}</span>
                {center && <span className="flex-1 h-px bg-[#E4DDCB]" />}
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-[#16181D] uppercase tracking-tighter leading-none">{title}</h2>
            {subtitle && <p className="text-[#6E6A5C] font-mono text-[10px] tracking-[0.3em] uppercase mt-2 font-bold">{subtitle}</p>}
        </div>
    );

    const Chip = ({ children, color = RED }) => (
        <span className="px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest" style={{ borderColor: color, color }}>
            {children}
        </span>
    );

    return (
        <div className="fixed inset-0 z-[100] bg-[#F1EEE4] text-[#16181D] flex flex-col font-sans overflow-hidden select-none">
            <style>{`
                @media print {
                    @page { size: landscape; margin: 0; }
                    body { background: white; }
                    * { -webkit-print-color-adjust: exact !important; }
                    .no-print { display: none !important; }
                }
                @keyframes jp-slide-in { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
                .jp-slide { animation: jp-slide-in .5s cubic-bezier(.4,0,.2,1) both; }
            `}</style>

            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#C9413B] z-[110] no-print">
                <div
                    className="h-full bg-[#16181D] origin-left transition-transform duration-500"
                    style={{ width: `${((currentSlide + 1) / total) * 100}%` }}
                />
            </div>

            <div className="flex-1 flex items-center justify-center p-2 md:p-6 lg:p-8 relative no-print overflow-hidden">
                <div className="w-full h-full max-w-7xl flex items-center justify-center">
                    <div
                        key={currentSlide}
                        className="jp-slide presentation-card w-full h-auto max-h-full aspect-[16/9] bg-[#FBF9F3] border border-[#E4DDCB] rounded-[2rem] p-8 md:p-10 relative overflow-hidden flex flex-col justify-center shadow-[0_40px_60px_-15px_rgba(22,24,29,0.18)]"
                    >
                        {/* Flower watermark + corner blooms */}
                        <Blossom size={240} opacity={0.05} className="absolute -left-12 -bottom-16 pointer-events-none" />
                        <Blossom size={42} className="absolute right-9 top-9 pointer-events-none hidden md:block" />
                        <BlossomGold size={26} className="absolute right-4 top-16 pointer-events-none hidden md:block" />

                        {/* Header bar */}
                        <div className="absolute top-6 left-8 right-8 flex items-center justify-between z-50">
                            <div className="flex items-center gap-3">
                                <div className="h-4 w-1.5 bg-[#C9413B]" />
                                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#6E6A5C] font-bold">Digitalization • Personal Journey</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#C9413B]" />
                                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#6E6A5C] font-bold">{String(currentSlide + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
                            </div>
                        </div>

                        {/* ── TITLE ── */}
                        {current.type === 'title' && (
                            <div className="relative text-center space-y-5 pt-4">
                                <div className="flex items-center justify-center gap-3">
                                    <span className="h-px w-10 bg-[#A8823C]" />
                                    <Blossom size={18} />
                                    <span className="text-[10px] font-mono uppercase tracking-[0.45em] text-[#A8823C] font-black">IDENTITY • PURPOSE • DIGITALIZATION</span>
                                    <Blossom size={18} />
                                    <span className="h-px w-10 bg-[#A8823C]" />
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black text-[#16181D] leading-none tracking-tighter">
                                    I Am <span className="text-[#C9413B]">Known As?</span>
                                </h1>
                                <p className="text-sm md:text-base text-[#6E6A5C] font-mono tracking-[0.2em] uppercase font-bold max-w-2xl mx-auto">
                                    {current.subtitle}
                                </p>
                                <div className="flex items-center justify-center gap-2 pt-1">
                                    <div className="w-1.5 h-1.5 bg-[#C9413B]" />
                                    <p className="text-xs text-[#16181D] font-bold">{current.author} <span className="text-[#6E6A5C]">— {current.role}</span></p>
                                </div>
                                <div className="flex justify-center gap-2 mt-1">
                                    <Chip>Create</Chip>
                                    <Chip color={GOLD}>Improve</Chip>
                                    <Chip>Impact</Chip>
                                </div>
                            </div>
                        )}

                        {/* ── INTRODUCTION (interview) ── */}
                        {current.type === 'question' && (
                            <div className="relative pt-10 flex flex-col justify-center h-full">
                                <div className="text-center mb-6">
                                    <span className="px-3 py-1 bg-[#C9413B] text-white rounded-md text-[9px] font-black tracking-widest uppercase">Introduction</span>
                                </div>
                                <p className="text-[#A8823C] font-mono text-[11px] md:text-xs tracking-[0.15em] uppercase text-center font-black mb-4">
                                    {current.prompt}
                                </p>
                                <div className="max-w-3xl mx-auto w-full">
                                    <blockquote className="bg-[#F6F3EB] border-l-2 border-[#C9413B] rounded-r-2xl p-6 md:p-8 my-6 italic text-sm md:text-lg text-[#5B564D] font-medium leading-relaxed">
                                        {current.quote}
                                    </blockquote>
                                </div>
                                <div className="flex items-center justify-center gap-3">
                                    <div className="h-px w-8 bg-[#16181D]/30" />
                                    <p className="text-[#6E6A5C] font-mono text-[10px] tracking-[0.35em] uppercase font-black">{current.answer}</p>
                                    <div className="h-px w-8 bg-[#16181D]/30" />
                                </div>
                            </div>
                        )}

                        {/* ── IDENTITY ── */}
                        {current.type === 'identity' && (
                            <div className="relative pt-10 h-full flex flex-col">
                                <SectionHead label={current.label} title={current.title} />
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-[42%_58%] gap-6 min-h-0">
                                    <div className="bg-[#16181D] rounded-[1.5rem] p-6 flex flex-col justify-between relative overflow-hidden">
                                        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-[#C9413B] opacity-20" />
                                        <div className="flex items-center gap-2 text-[#A8823C] font-mono text-[9px] uppercase tracking-widest font-black mb-3">
                                            <Target size={14} /> Identity
                                        </div>
                                        <p className="text-[#F6F3EB] text-sm md:text-base font-medium leading-relaxed">{current.quote}</p>
                                        <div className="mt-5 px-4 py-2.5 bg-[#FBF9F3] text-[#C9413B] rounded-xl inline-flex items-center gap-2 w-fit text-[10px] font-black uppercase tracking-widest shadow">
                                            <ArrowRight size={13} /> {current.selected}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {current.rows.map((r, i) => (
                                            <div key={i} className="bg-white border border-[#E4DDCB] rounded-2xl px-5 py-4 flex items-center gap-4">
                                                <span className="text-[9px] font-black font-mono uppercase tracking-widest text-[#C9413B] w-28 shrink-0">{r.label}</span>
                                                <span className="h-6 w-px bg-[#E4DDCB]" />
                                                <p className="text-xs md:text-sm text-[#16181D] font-bold leading-snug">{r.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── ARTIFACTS ── */}
                        {current.type === 'artifacts' && (
                            <div className="relative pt-10 h-full flex flex-col">
                                <SectionHead label={current.label} title={current.title} subtitle={current.intro} />
                                <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-4 min-h-0">
                                    {current.items.map((it, i) => (
                                        <button key={i} onClick={() => navigate(it.path)} className="group text-left bg-[#F6F3EB] border border-[#E4DDCB] rounded-2xl overflow-hidden flex flex-col hover:border-[#C9413B]/60 hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                                            <div className="relative h-[92px] bg-[#16181D]">
                                                <img src={it.image} alt={it.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                                <span className="absolute top-2 left-2 w-7 h-7 rounded-lg bg-[#16181D]/85 text-[#FBF9F3] flex items-center justify-center backdrop-blur"><it.icon size={13} /></span>
                                                <span className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-[#C9413B] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all">
                                                    <ArrowRight size={11} />
                                                </span>
                                            </div>
                                            <div className="p-4 flex flex-col flex-1">
                                                <h4 className="text-sm font-black uppercase tracking-widest text-[#16181D] leading-none mb-1">{it.name}</h4>
                                                <p className="text-[9px] font-mono font-black uppercase tracking-widest text-[#A8823C] mb-2">{it.org}</p>
                                                <p className="text-[11px] text-[#6E6A5C] font-medium leading-snug">{it.desc}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-4 flex items-center gap-2.5 bg-[#FBF9F3] border border-[#E4DDCB] rounded-xl px-4 py-2.5">
                                    <HeartHandshake size={14} className="text-[#C9413B]" />
                                    <span className="text-[10px] font-bold text-[#5B564D]">"Beberapa sistem tersebut masih digunakan perusahaan." — jawaban yang ingin saya bisa katakan di usia 30.</span>
                                </div>
                            </div>
                        )}

                        {/* ── CREATE vs FINISH ── */}
                        {current.type === 'create' && (
                            <div className="relative pt-10 h-full flex flex-col">
                                <SectionHead label={current.label} title={current.title} subtitle={current.intro} />
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 min-h-0">
                                    {current.pairs.map((p, i) => (
                                        <div key={i} className="rounded-[1.5rem] p-6 relative overflow-hidden" style={{ background: i === 0 ? '#16181D' : '#F6F3EB', border: `1px solid ${i === 0 ? '#16181D' : '#E4DDCB'}` }}>
                                            <div className="flex items-center justify-between mb-4">
                                                <h4 className={`text-sm font-black uppercase tracking-widest ${i === 0 ? 'text-[#F6F3EB]' : 'text-[#16181D]'}`}>{p.title}</h4>
                                                <span className={`text-[9px] font-black font-mono tracking-widest uppercase ${i === 0 ? 'text-[#A8823C]' : 'text-[#C9413B]'}`}>Jam 20.00</span>
                                            </div>
                                            <ol className="space-y-2.5">
                                                {p.steps.map((s, j) => (
                                                    <li key={j} className="flex gap-3 items-start">
                                                        <span className="w-5 h-5 rounded-md shrink-0 flex items-center justify-center text-[9px] font-black" style={{ background: i === 0 ? RED : '#E4DDCB', color: i === 0 ? '#fff' : '#16181D' }}>{j + 1}</span>
                                                        <p className={`text-[11px] md:text-xs leading-snug font-bold ${i === 0 ? 'text-[#F6F3EB]/90' : 'text-[#5B564D]'}`}>{s}</p>
                                                    </li>
                                                ))}
                                            </ol>
                                            <div className="mt-5 text-center">
                                                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: i === 0 ? RED : STEEL }}>⇒ {i === 0 ? 'Akhirnya JADI' : 'Akhirnya SELESAI'}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── LOSS ── */}
                        {current.type === 'loss' && (
                            <div className="relative pt-10 h-full flex flex-col">
                                <SectionHead label={current.label} title={current.title} subtitle={current.intro} />
                                <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-3 min-h-0">
                                    {current.items.map((it, i) => (
                                        <div key={i} className="bg-white border border-t-2 border-t-[#C9413B] rounded-2xl p-4 flex flex-col items-center text-center gap-2.5">
                                            <div className="w-10 h-10 rounded-full bg-[#16181D] text-[#F6F3EB] flex items-center justify-center">
                                                <it.icon size={16} />
                                            </div>
                                            <h4 className="text-[11px] font-black uppercase tracking-widest text-[#16181D] leading-tight">{it.name}</h4>
                                            <p className="text-[9.5px] text-[#6E6A5C] font-medium leading-snug">{it.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 text-center">
                                    <p className="text-[11px] md:text-xs font-bold text-[#C9413B] font-mono uppercase tracking-[0.25em]">Tanpa IT — lima hal ini yang sesungguhnya hilang.</p>
                                </div>
                            </div>
                        )}

                        {/* ── CAREER PATH ── */}
                        {current.type === 'path' && (
                            <div className="relative pt-10 h-full flex flex-col">
                                <SectionHead label={current.label} title={current.title} subtitle={current.intro} />
                                <div className="relative flex-1 flex flex-col justify-center">
                                    {/* connecting line */}
                                    <div className="hidden md:block absolute left-[12.5%] right-[12.5%] top-[18px] h-px bg-[#E4DDCB]" />
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                                        {current.steps.map((s, i) => (
                                            <div key={i} className="flex flex-col items-center text-center">
                                                <div className="relative z-10 flex flex-col items-center gap-2 mb-3">
                                                    <div
                                                        className="w-9 h-9 rounded-full flex items-center justify-center text-[#FBF9F3] shadow-md"
                                                        style={{ background: s.color }}
                                                    >
                                                        <s.icon size={16} />
                                                    </div>
                                                    <span className="text-[9px] font-black font-mono uppercase tracking-widest" style={{ color: s.color }}>{s.year}</span>
                                                </div>
                                                <div className={`rounded-2xl px-4 py-3.5 w-full ${i === current.steps.length - 1 ? 'bg-[#16181D] border border-[#16181D]' : 'bg-[#F6F3EB] border border-[#E4DDCB]'}`}>
                                                    <h4 className={`text-[11px] font-black uppercase tracking-widest mb-1.5 ${i === current.steps.length - 1 ? 'text-[#FBF9F3]' : 'text-[#16181D]'}`}>{s.name}</h4>
                                                    <p className={`text-[10px] leading-snug font-medium ${i === current.steps.length - 1 ? 'text-[#A8823C]' : 'text-[#6E6A5C]'}`}>{s.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-5 flex items-center gap-2.5 bg-[#F6F3EB] border border-[#E4DDCB] rounded-xl px-4 py-2.5">
                                    <Info size={14} className="text-[#A8823C] shrink-0" />
                                    <span className="text-[10px] font-bold text-[#5B564D] leading-snug">{current.note}</span>
                                </div>
                            </div>
                        )}

                        {/* ── REGRET ── */}
                        {current.type === 'regret' && (
                            <div className="relative pt-10 h-full flex flex-col">
                                <SectionHead label={current.label} title={current.title} subtitle={current.intro} />
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 min-h-0">
                                    {current.columns.map((c, i) => (
                                        <div key={i} className={`rounded-[1.5rem] p-7 flex flex-col ${i === 1 ? 'bg-[#F4E4E0] border border-[#C9413B]/40' : 'bg-[#F6F3EB] border border-[#E4DDCB]'}`}>
                                            <span className={`w-fit px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest mb-4 ${i === 1 ? 'bg-[#C9413B] text-white' : 'bg-[#E4DDCB] text-[#6E6A5C]'}`}>{c.tag}</span>
                                            <p className="text-sm md:text-base font-bold leading-relaxed" style={{ color: i === 1 ? '#16181D' : '#6E6A5C' }}>
                                                {c.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 bg-[#16181D] rounded-xl px-5 py-3.5 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#C9413B] text-white flex items-center justify-center shrink-0"><ArrowRight size={14} /></div>
                                    <p className="text-[11px] md:text-xs font-bold text-[#F6F3EB] leading-snug">{current.verdict}</p>
                                </div>
                            </div>
                        )}

                        {/* ── CLOSING ── */}
                        {current.type === 'closing' && (
                            <div className="relative text-center pt-4 space-y-6">
                                <div className="flex items-center justify-center gap-3">
                                    <span className="h-px w-10 bg-[#A8823C]" />
                                    <Blossom size={18} />
                                    <span className="text-[10px] font-mono uppercase tracking-[0.45em] text-[#A8823C] font-black">THANK YOU</span>
                                    <Blossom size={18} />
                                    <span className="h-px w-10 bg-[#A8823C]" />
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black text-[#16181D] leading-none tracking-tighter">
                                    {current.title}
                                </h1>
                                <p className="text-[#6E6A5C] font-mono text-sm tracking-[0.25em] uppercase font-black">{current.subtitle}</p>
                                <button
                                    onClick={() => navigate('/projects')}
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#C9413B] text-[#FBF9F3] rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#16181D] transition-colors shadow-lg"
                                >
                                    {current.cta}
                                    <ArrowRight size={18} />
                                </button>
                                <p className="text-[10px] text-[#8A857A] font-mono uppercase tracking-widest">{current.note}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="no-print flex items-center justify-center gap-4 pb-4 relative z-20">
                <button onClick={() => go(-1)} disabled={currentSlide === 0} className="w-10 h-10 rounded-full bg-[#16181D] text-[#F6F3EB] flex items-center justify-center hover:bg-[#C9413B] transition-colors disabled:opacity-30">
                    <ChevronLeft size={16} />
                </button>
                <div className="flex items-center gap-1.5">
                    {slides.map((_, i) => (
                        <button key={i} onClick={() => setCurrentSlide(i)} className={`h-2 rounded-full transition-all ${i === currentSlide ? 'w-6 bg-[#C9413B]' : 'w-2 bg-[#16181D]/20 hover:bg-[#16181D]/40'}`} aria-label={`Slide ${i + 1}`} />
                    ))}
                </div>
                <button onClick={() => go(1)} disabled={currentSlide === total - 1} className="w-10 h-10 rounded-full bg-[#16181D] text-[#F6F3EB] flex items-center justify-center hover:bg-[#C9413B] transition-colors disabled:opacity-30">
                    <ChevronRight size={16} />
                </button>
                <button onClick={toggleFullscreen} className="w-10 h-10 rounded-full border border-[#16181D]/20 text-[#16181D] flex items-center justify-center hover:bg-[#16181D] hover:text-[#F6F3EB] transition-colors" aria-label="Fullscreen">
                    {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                </button>
            </div>
        </div>
    );
};

export default StoryPresentation;