import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { blogData } from '../data/blog';

const formatDate = (dateStr, language) => {
    const d = new Date(dateStr);
    try {
        return d.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    } catch {
        return dateStr;
    }
};

const Blog = () => {
    const { language } = useLanguage();
    const t = translations[language];
    const posts = blogData.map((post) => ({
        ...post,
        ...(post.translations?.[language] || {}),
    }));

    return (
        <div className="container mx-auto px-6 md:px-12 lg:px-16 pt-28 pb-20 min-h-screen">
            <SEO
                title={t.blog.title}
                description={t.blog.subtitle}
            />

            <header className="mb-12">
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-3">
                    改善 ・ {t.blog.kicker}
                </p>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary mb-3">
                    {t.blog.title}
                </h1>
                <p className="text-text-secondary max-w-2xl leading-relaxed">
                    {t.blog.subtitle}
                </p>
            </header>

            <div className="space-y-6">
                {posts.map((post, i) => (
                    <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 }}
                        className="group border border-border dark:border-zinc-800 rounded-2xl overflow-hidden bg-bg-card hover:border-stone-400/60 dark:hover:border-stone-500/40 transition-colors"
                    >
                        <Link to={`/blog/${post.id}`} className="flex flex-col md:flex-row">
                            <div className="relative md:w-56 lg:w-64 h-44 md:h-auto flex-shrink-0 overflow-hidden bg-bg-secondary">
                                {post.image ? (
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        loading="lazy"
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div
                                            className="flex items-center justify-center w-16 h-16 rounded-xl text-white text-xs font-black font-mono uppercase tracking-widest"
                                            style={{ backgroundColor: post.color || 'var(--accent-green)' }}
                                        >
                                            {post.tag}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                                <div className="flex flex-wrap items-center gap-3 mb-1.5">
                                    <span className="text-[9px] font-black font-mono uppercase tracking-widest text-text-muted border border-border rounded-full px-2.5 py-0.5">
                                        {post.category}
                                    </span>
                                    <span className="flex items-center gap-1 text-[10px] text-text-muted font-mono">
                                        <Clock size={11} /> {post.readTime} min
                                    </span>
                                    <span className="text-[10px] text-text-muted font-mono">
                                        {formatDate(post.date, language)}
                                    </span>
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold text-text-primary group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors mb-2">
                                    {post.title}
                                </h2>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    {post.excerpt}
                                </p>
                            </div>
                            <ArrowUpRight className="text-stone-400 dark:text-stone-500 w-6 h-6 md:rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform flex-shrink-0 mt-4 mr-6 md:self-center" />
                        </Link>
                    </motion.article>
                ))}
            </div>
        </div>
    );
};

export default Blog;
