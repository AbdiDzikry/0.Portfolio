import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
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
                <Link to="/blog" className="text-emerald-600 underline">← Back to Blog</Link>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-bg-primary min-h-screen pt-28 pb-24 px-6 md:px-12 lg:px-16"
        >
            <SEO title={post.title} description={post.excerpt} />

            <div className="max-w-3xl mx-auto">
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors group text-xs font-mono mb-10"
                >
                    <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                    Back to Insights
                </Link>

                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-600 mb-3">
                    {post.category} ・ {post.tag}
                </p>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-text-primary mb-5 leading-tight">
                    {post.title}
                </h1>

                <div className="flex items-center gap-4 text-[11px] text-text-muted font-mono mb-8 pb-8 border-b border-border">
                    <span className="flex items-center gap-1.5">
                        <Clock size={12} /> {post.readTime} min read
                    </span>
                    <span>{formatDate(post.date, language)}</span>
                </div>

                {post.image && (
                    <div className="mb-10 overflow-hidden rounded-2xl border border-border bg-bg-secondary">
                        <img
                            src={post.image}
                            alt={post.title}
                            loading="lazy"
                            className="w-full max-h-96 object-cover"
                        />
                    </div>
                )}

                <div className="space-y-6">
                    {(post.body || []).map((para, i) => (
                        <p key={i} className="text-text-secondary leading-relaxed text-base">
                            {para}
                        </p>
                    ))}
                </div>

                {(post.takeaways && post.takeaways.length > 0) && (
                    <div className="mt-10 border-2 border-emerald-600/40 rounded-2xl p-6 md:p-8 bg-emerald-600/5">
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-600 mb-4">
                            要点 ・ Key Takeaways
                        </p>
                        <ul className="space-y-3">
                            {post.takeaways.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-text-primary">
                                    <span className="mt-1 w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-emerald-600 text-emerald-700 text-xs font-bold hover:bg-emerald-600 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={13} /> All Insights
                    </Link>
                    <span className="text-[10px] font-mono text-text-muted">
                        {post.id.toUpperCase()}-W1.0
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default BlogPost;
