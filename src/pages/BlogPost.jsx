import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { blogData } from '../data/blog';

const formatDate = (dateStr, language) => {
    const d = new Date(dateStr);
    try {
        return d.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    } catch {
        return dateStr;
    }
};

const BlogPost = () => {
    const { id } = useParams();
    const { language } = useLanguage();
    const raw = blogData.find((p) => p.id === id);
    const post = raw ? { ...raw, ...(raw.translations?.[language] || {}) } : null;

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center text-text-primary gap-4">
                <h2 className="text-xl font-bold">Post not found</h2>
                <Link to="/blog" className="text-emerald-600 underline">← Back to Insights</Link>
            </div>
        );
    }

    const isIndonesian = language === 'id';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-bg-primary min-h-screen pt-28 pb-24 px-6 md:px-12 lg:px-16"
        >
            <SEO title={post.title} description={post.excerpt} />

            <div className="max-w-3xl mx-auto space-y-8">
                {/* Back button */}
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors group text-xs font-mono"
                >
                    <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                    {isIndonesian ? 'Kembali ke Arsip Riset' : 'Back to Insights'}
                </Link>

                {/* Academic Paper Header */}
                <div className="border-b border-border pb-6 space-y-4">
                    <div className="flex flex-wrap items-center gap-2.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-[10px] font-mono font-bold uppercase tracking-wider">
                            {post.category}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-bg-secondary border border-border text-text-muted text-[10px] font-mono font-bold uppercase tracking-wider">
                            {post.tag || 'RESEARCH ARTICLE'}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-stone-500/10 text-stone-500 text-[9px] font-mono font-bold uppercase tracking-widest ml-auto">
                            PEER-REFERENCED WORKING PAPER
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-text-primary leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-text-muted font-mono pt-2">
                        <span className="flex items-center gap-1.5">
                            <Clock size={12} /> {post.readTime} min read
                        </span>
                        <span>•</span>
                        <span>{formatDate(post.date, language)}</span>
                        <span>•</span>
                        <span className="text-emerald-600 font-semibold">
                            Sulthan Abdi Dzikry / Industrial & Software Engineering
                        </span>
                    </div>
                </div>

                {/* Featured image if available */}
                {post.image && (
                    <div className="overflow-hidden rounded-2xl border border-border bg-bg-secondary shadow-sm">
                        <img
                            src={post.image}
                            alt={post.title}
                            loading="lazy"
                            className="w-full max-h-96 object-cover"
                        />
                    </div>
                )}

                {/* Academic Abstract Box */}
                {post.abstract && (
                    <div className="rounded-2xl border border-border/80 bg-bg-secondary/60 p-6 md:p-7 space-y-2.5 shadow-sm relative overflow-hidden">
                        <div className="flex items-center gap-2 text-text-primary text-xs font-mono font-bold uppercase tracking-wider">
                            <FileText size={14} className="text-emerald-600" />
                            <span>{isIndonesian ? 'Abstrak Penelitian' : 'Research Abstract'}</span>
                        </div>
                        <p className="text-text-secondary text-sm md:text-base leading-relaxed italic">
                            {post.abstract}
                        </p>
                        {post.keywords && (
                            <div className="pt-2 flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-text-muted">
                                <span className="font-bold text-text-primary">Keywords:</span>
                                {post.keywords.map((kw, i) => (
                                    <span key={i} className="px-2 py-0.5 bg-bg-primary rounded border border-border">
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Main Body Content (Structured Sections or Paragraphs) */}
                <div className="space-y-8 pt-2">
                    {post.sections && post.sections.length > 0 ? (
                        post.sections.map((section, idx) => (
                            <div key={idx} className="space-y-3">
                                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary border-b border-border/60 pb-2">
                                    {section.heading}
                                </h2>
                                <div className="space-y-4">
                                    {section.content.map((p, pIdx) => (
                                        <p key={pIdx} className="text-text-secondary leading-relaxed text-sm md:text-base">
                                            {p}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        (post.body || []).map((para, i) => (
                            <p key={i} className="text-text-secondary leading-relaxed text-sm md:text-base">
                                {para}
                            </p>
                        ))
                    )}
                </div>

                {/* Empirical Takeaways / Kesimpulan Manajerial */}
                {post.takeaways && post.takeaways.length > 0 && (
                    <div className="border border-emerald-600/30 rounded-2xl p-6 md:p-8 bg-emerald-600/5 space-y-4">
                        <div className="flex items-center gap-2 text-emerald-600 text-[11px] font-mono font-black uppercase tracking-[0.25em]">
                            <CheckCircle2 size={15} />
                            <span>{isIndonesian ? 'Kesimpulan Empiris & Implikasi' : 'Empirical Findings & Implications'}</span>
                        </div>
                        <ul className="space-y-2.5">
                            {post.takeaways.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-text-primary">
                                    <span className="mt-1 w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Academic References Section (Free Access / Open Access DOIs) */}
                {post.references && post.references.length > 0 && (
                    <div className="border-t border-border pt-8 space-y-4">
                        <div className="flex items-center gap-2">
                            <BookOpen size={16} className="text-emerald-600" />
                            <h3 className="text-sm md:text-base font-bold text-text-primary uppercase tracking-wider font-mono">
                                {isIndonesian ? 'Daftar Pustaka & Jurnal Terbuka (Open Access)' : 'References & Open Access Literature'}
                            </h3>
                        </div>
                        <p className="text-xs text-text-muted">
                            {isIndonesian
                                ? 'Artikel ini mengadopsi literatur ilmiah rekan sejawat yang dapat diakses secara gratis (Open Access / Free Access) melalui tautan DOI resmi berikut:'
                                : 'This article builds upon peer-reviewed empirical research accessible via the following Open Access and DOI repositories:'}
                        </p>
                        <div className="space-y-3">
                            {post.references.map((ref, i) => (
                                <div
                                    key={i}
                                    className="p-4 rounded-xl bg-bg-secondary border border-border/70 text-xs space-y-1.5 hover:border-emerald-600/40 transition-colors"
                                >
                                    <div className="flex items-center justify-between gap-2 flex-wrap">
                                        <span className="font-bold text-text-primary">
                                            [{i + 1}] {ref.authors} ({ref.year})
                                        </span>
                                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-mono text-[9px] font-bold">
                                            {ref.access || 'Free Access'}
                                        </span>
                                    </div>
                                    <p className="text-text-secondary italic">
                                        "{ref.title}." <span className="text-text-primary font-medium">{ref.journal}</span>.
                                    </p>
                                    {ref.annotation && (
                                        <p className="text-[11px] text-text-muted leading-relaxed">
                                            → <span className="font-medium">{ref.annotation}</span>
                                        </p>
                                    )}
                                    {ref.doi && (
                                        <a
                                            href={ref.doi}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-[11px] text-emerald-600 hover:underline font-mono font-semibold pt-1"
                                        >
                                            <ExternalLink size={11} /> {ref.doi}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer Navigation */}
                <div className="pt-8 border-t border-border flex items-center justify-between">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-emerald-600 text-emerald-700 text-xs font-bold hover:bg-emerald-600 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={13} /> {isIndonesian ? 'Semua Artikel' : 'All Insights'}
                    </Link>
                    <span className="text-[10px] font-mono text-text-muted">
                        WP-{post.id.toUpperCase()}-2026
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default BlogPost;
