import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import SEO from '../components/SEO';
import {
    Plus, Check, X, Trash2, Play, Pause, RotateCcw,
    Music, Github, Clock, Calendar, TrendingUp, Flame,
    Download, Upload, Settings, Briefcase, Building2,
    MapPin, ExternalLink, FileText, ChevronDown, ChevronUp,
    StickyNote, Wallet, Target, Pin, Search, Filter,
    CheckCircle2, Edit3, ArrowUpRight
} from 'lucide-react';
import NowPlayingWidget from '../components/NowPlayingWidget';
import GitHubWidget from '../components/GitHubWidget';
import YouTubeWidget from '../components/YouTubeWidget';
import AlienShooter from '../components/AlienShooter';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

/* ── helpers ── */
const getToday = () => new Date().toISOString().split('T')[0];
const safeJsonParse = (key, fallback) => {
    try {
        const saved = localStorage.getItem(key);
        if (!saved || saved === 'undefined' || saved === 'null') return fallback;
        const parsed = JSON.parse(saved);
        return parsed !== null && parsed !== undefined ? parsed : fallback;
    } catch {
        return fallback;
    }
};
const getWeekDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
};
const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
};

/* ── Error Boundary ── */
import React from 'react';

class ToolsErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error("Tools page error caught by ErrorBoundary:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center bg-bg-primary">
                    <div className="max-w-md bg-bg-secondary border border-border p-8 rounded-3xl space-y-4">
                        <span className="text-4xl">🛠️</span>
                        <h2 className="text-xl font-bold text-text-primary">Terjadi Kendala Memuat Tools</h2>
                        <p className="text-xs text-text-muted leading-relaxed">
                            Data lokal tools yang tersimpan di browser Anda mengalami masalah format. Klik tombol di bawah untuk membersihkan data cache tools dan memuat ulang.
                        </p>
                        <button
                            onClick={() => {
                                localStorage.removeItem('tools_tasks');
                                localStorage.removeItem('tools_habits');
                                localStorage.removeItem('tools_jobs');
                                localStorage.removeItem('tools_timer');
                                localStorage.removeItem('tools_notes');
                                localStorage.removeItem('tools_goals');
                                localStorage.removeItem('tools_expenses');
                                localStorage.removeItem('tools_budget');
                                window.location.reload();
                            }}
                            className="w-full py-3 bg-text-primary text-bg-primary rounded-xl font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
                        >
                            Reset Data Tools & Reload
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

/* ── Main Component ── */
const Tools = () => {
    const { language } = useLanguage();
    const currentTrans = translations[language] || translations['id'] || translations['en'];
    const t = currentTrans?.tools || {};
    const [collapsedTask, setCollapsedTask] = useState(false);
    const [collapsedHabit, setCollapsedHabit] = useState(false);
    const [collapsedMusic, setCollapsedMusic] = useState(false);
    const [collapsedJobs, setCollapsedJobs] = useState(false);
    const [collapsedTimer, setCollapsedTimer] = useState(false);
    const [collapsedGithub, setCollapsedGithub] = useState(false);
    const [collapsedNotes, setCollapsedNotes] = useState(false);
    const [collapsedExpense, setCollapsedExpense] = useState(false);
    const [collapsedGoals, setCollapsedGoals] = useState(false);
    const [collapsedGame, setCollapsedGame] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-bg-primary min-h-screen pt-28 pb-24 px-6 md:px-12 lg:px-16 transition-colors"
        >
            <SEO title={t?.title || "Tools"} description={t?.subtitle || "Productivity Tools"} />

            {/* Header */}
            <div className="max-w-7xl mx-auto mb-12">
                <span className="font-mono text-xs text-text-muted uppercase tracking-[0.3em]">{t?.title || "Tools"}</span>
                <h1 className="text-4xl md:text-5xl font-bold text-text-primary mt-2">{t?.title || "Tools"}</h1>
                <p className="text-text-secondary mt-2 max-w-xl">{t?.subtitle}</p>
            </div>

            {/* All Tools in One Page - Bento Grid Layout */}
            <div className="max-w-7xl mx-auto space-y-6">


                {/* Music Section - Full Width Top */}
                <section className="bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5 border border-purple-500/20 rounded-3xl p-6 md:p-8 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                <Music size={20} className="text-purple-500" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-text-primary">Music & Playlist</h2>
                                <p className="text-xs text-text-muted">Curated Playlist</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setCollapsedMusic(!collapsedMusic)}
                            className={`p-2 rounded-lg transition-all ${collapsedMusic ? 'bg-purple-500/10 text-purple-500' : 'hover:bg-purple-500/10 text-text-muted hover:text-purple-500'}`}
                        >
                            {collapsedMusic ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                        </button>
                    </div>
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${collapsedMusic ? 'max-h-0 opacity-0' : 'max-h-[600px] opacity-100'}`}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {/* Cat GIF Section */}
                            <div className="md:col-span-1 bg-white border border-border/50 rounded-2xl p-5 flex items-center justify-center">
                                <img
                                    src="/cat.gif"
                                    alt="Cat Animation"
                                    className="w-32 h-32 object-contain"
                                />
                            </div>

                            {/* YouTube Playlist */}
                            <div className="md:col-span-3 bg-white border border-border/50 rounded-2xl p-5">
                                <div className="rounded-xl overflow-hidden" style={{ minHeight: '350px', height: '100%' }}>
                                    <div className="youtube-widget-wrapper" style={{ height: '100%', minHeight: '350px' }}>
                                        <YouTubeWidget playlistUrl="https://music.youtube.com/playlist?list=PLIp8n4_3xp0ffGtM6pzcmGvNqzigNaWzY&si=Gyd-2FBr1xsHJacC" />
                                    </div>
                                </div>
                                <style>{`
                                    .youtube-widget-wrapper > div {
                                        min-height: 350px !important;
                                        height: 100% !important;
                                    }
                                    .youtube-widget-wrapper > div > div {
                                        min-height: 250px !important;
                                        flex: 1 !important;
                                    }
                                    .youtube-widget-wrapper iframe {
                                        min-height: 220px !important;
                                        height: 100% !important;
                                    }
                                `}</style>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Job Tracker - Full Width Section (Below Music) */}
                <section className="bg-gradient-to-br from-indigo-500/5 via-violet-500/5 to-transparent border border-indigo-500/20 rounded-3xl p-6 hover:border-indigo-500/40 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                                <Briefcase size={20} className="text-indigo-500" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-text-primary">{t?.jobs?.title || "Job Tracker"}</h2>
                                <p className="text-xs text-text-muted">{t?.jobs?.subtitle || "Track your job applications"}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setCollapsedJobs(!collapsedJobs)}
                            className={`p-2 rounded-lg transition-all ${collapsedJobs ? 'bg-indigo-500/10 text-indigo-500' : 'hover:bg-indigo-500/10 text-text-muted hover:text-indigo-500'}`}
                        >
                            {collapsedJobs ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                        </button>
                    </div>
                    <AnimatePresence>
                        {!collapsedJobs && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                className="overflow-hidden"
                            >
                                <JobTracker t={t?.jobs || {}} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                {/* Bento Grid - 2x2 Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

                    {/* Task Tracker - Blue Theme */}
                    <section className="bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-transparent border border-blue-500/20 rounded-3xl p-6 hover:border-blue-500/40 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                    <Check size={20} className="text-blue-500" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-text-primary">{t?.tasks?.title || "Task Tracker"}</h2>
                                    <p className="text-xs text-text-muted">{t?.tasks?.subtitle || "Track daily tasks"}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setCollapsedTask(!collapsedTask)}
                                className={`p-2 rounded-lg transition-all ${collapsedTask ? 'bg-blue-500/10 text-blue-500' : 'hover:bg-blue-500/10 text-text-muted hover:text-blue-500'}`}
                            >
                                {collapsedTask ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                            </button>
                        </div>
                        <AnimatePresence>
                            {!collapsedTask && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="h-[580px] flex flex-col">
                                        <TaskTracker t={t?.tasks || {}} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>

                    {/* Habit Tracker - Orange Theme */}
                    <section className="bg-gradient-to-br from-orange-500/5 via-amber-500/5 to-transparent border border-orange-500/20 rounded-3xl p-6 hover:border-orange-500/40 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                                    <Flame size={20} className="text-orange-500" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-text-primary">{t?.habits?.title || "Habit Tracker"}</h2>
                                    <p className="text-xs text-text-muted">{t?.habits?.subtitle || "Track habits"}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setCollapsedHabit(!collapsedHabit)}
                                className={`p-2 rounded-lg transition-all ${collapsedHabit ? 'bg-orange-500/10 text-orange-500' : 'hover:bg-orange-500/10 text-text-muted hover:text-orange-500'}`}
                            >
                                {collapsedHabit ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                            </button>
                        </div>
                        <AnimatePresence>
                            {!collapsedHabit && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="h-[580px] flex flex-col">
                                        <HabitTracker t={t?.habits || {}} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>

                    {/* Focus Timer - Pink Theme */}
                    <section className="bg-gradient-to-br from-pink-500/5 via-rose-500/5 to-transparent border border-pink-500/20 rounded-3xl p-6 hover:border-pink-500/40 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
                                    <Clock size={20} className="text-pink-500" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-text-primary">{t?.timer?.title || "Focus Timer"}</h2>
                                    <p className="text-xs text-text-muted">{t?.timer?.subtitle || "Track focus time"}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setCollapsedTimer(!collapsedTimer)}
                                className={`p-2 rounded-lg transition-all ${collapsedTimer ? 'bg-pink-500/10 text-pink-500' : 'hover:bg-pink-500/10 text-text-muted hover:text-pink-500'}`}
                            >
                                {collapsedTimer ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                            </button>
                        </div>
                        <AnimatePresence>
                            {!collapsedTimer && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                    className="overflow-hidden"
                                >
                                    <FocusTimer t={t?.timer || {}} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>

                    {/* GitHub - Green Theme */}
                    <section className="bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-transparent border border-green-500/20 rounded-3xl p-6 hover:border-green-500/40 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                                    <Github size={20} className="text-green-500" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-text-primary">GitHub Activity</h2>
                                    <p className="text-xs text-text-muted">Development progress tracking</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setCollapsedGithub(!collapsedGithub)}
                                className={`p-2 rounded-lg transition-all ${collapsedGithub ? 'bg-green-500/10 text-green-500' : 'hover:bg-green-500/10 text-text-muted hover:text-green-500'}`}
                            >
                                {collapsedGithub ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                            </button>
                        </div>
                        <AnimatePresence>
                            {!collapsedGithub && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
                                        <GitHubWidget username="AbdiDzikry" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>

                </div>

                {/* Additional Tools - Notes & Goals */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

                    {/* Notes - Amber Sticky Theme */}
                    <section className="bg-gradient-to-br from-amber-500/5 via-yellow-500/5 to-transparent border border-amber-500/20 rounded-3xl p-6 hover:border-amber-500/40 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                                    <StickyNote size={20} className="text-amber-500" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-text-primary">{t?.notes?.title || "Notes"}</h2>
                                    <p className="text-xs text-text-muted">{t?.notes?.subtitle || "Quick notes"}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setCollapsedNotes(!collapsedNotes)}
                                className={`p-2 rounded-lg transition-all ${collapsedNotes ? 'bg-amber-500/10 text-amber-500' : 'hover:bg-amber-500/10 text-text-muted hover:text-amber-500'}`}
                            >
                                {collapsedNotes ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                            </button>
                        </div>
                        <AnimatePresence>
                            {!collapsedNotes && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="h-[420px] flex flex-col">
                                        <NotesTool t={t?.notes || {}} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>

                    {/* Goals - Teal Theme */}
                    <section className="bg-gradient-to-br from-teal-500/5 via-cyan-500/5 to-transparent border border-teal-500/20 rounded-3xl p-6 hover:border-teal-500/40 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                                    <Target size={20} className="text-teal-500" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-text-primary">{t?.goals?.title || "Goals"}</h2>
                                    <p className="text-xs text-text-muted">{t?.goals?.subtitle || "Long term goals"}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setCollapsedGoals(!collapsedGoals)}
                                className={`p-2 rounded-lg transition-all ${collapsedGoals ? 'bg-teal-500/10 text-teal-500' : 'hover:bg-teal-500/10 text-text-muted hover:text-teal-500'}`}
                            >
                                {collapsedGoals ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                            </button>
                        </div>
                        <AnimatePresence>
                            {!collapsedGoals && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="h-[420px] flex flex-col">
                                        <GoalsTool t={t?.goals || {}} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>

                </div>

                {/* Expense Tracker - Full Width Violet Theme */}
                <section className="bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-transparent border border-violet-500/20 rounded-3xl p-6 hover:border-violet-500/40 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                                <Wallet size={20} className="text-violet-500" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-text-primary">{t?.expense?.title || "Expense Tracker"}</h2>
                                <p className="text-xs text-text-muted">{t?.expense?.subtitle || "Track spending & budget"}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setCollapsedExpense(!collapsedExpense)}
                            className={`p-2 rounded-lg transition-all ${collapsedExpense ? 'bg-violet-500/10 text-violet-500' : 'hover:bg-violet-500/10 text-text-muted hover:text-violet-500'}`}
                        >
                            {collapsedExpense ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                        </button>
                    </div>
                    <AnimatePresence>
                        {!collapsedExpense && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                className="overflow-hidden"
                            >
                                <ExpenseTracker t={t?.expense || {}} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                {/* Game Section — Paling Bawah */}
                <section className="bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-indigo-500/5 border border-cyan-500/20 rounded-3xl p-6 md:p-8 transition-all hover:border-cyan-500/40">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                                <span className="text-xl">🎮</span>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-text-primary">
                                    {language === 'en' ? 'Mini Game' : 'Mini Game'}
                                </h2>
                                <p className="text-xs text-text-muted">
                                    {language === 'en' ? 'Shoot the alien invaders — WASD / Arrow keys + Space' : 'Tembak alien penyerang — WASD / Tombol arah + Spasi'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setCollapsedGame(!collapsedGame)}
                            className={`p-2 rounded-lg transition-all ${collapsedGame ? 'bg-cyan-500/10 text-cyan-500' : 'hover:bg-cyan-500/10 text-text-muted hover:text-cyan-500'}`}
                        >
                            {collapsedGame ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                        </button>
                    </div>
                    <AnimatePresence>
                        {!collapsedGame && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                className="overflow-hidden"
                            >
                                <div className="flex items-center justify-center">
                                    <AlienShooter />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

            </div>
        </motion.div>
    );
};

/* ═══════════════════════════════════════════
   TASK TRACKER
═══════════════════════════════════════════ */
const TaskTracker = ({ t }) => {
    const [tasks, setTasks] = useState(() => safeJsonParse('tools_tasks', []));
    const [newTask, setNewTask] = useState('');
    const [showNoteInput, setShowNoteInput] = useState(null);
    const [noteText, setNoteText] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('tools_tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (!newTask.trim()) return;
        const task = {
            id: Date.now(),
            text: newTask.trim(),
            completed: false,
            notes: [],
            createdAt: new Date().toISOString(),
            date: getToday()
        };
        setTasks([task, ...tasks]);
        setNewTask('');
        if (inputRef.current) inputRef.current.focus();
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const addNote = (taskId) => {
        if (!noteText.trim()) return;
        setTasks(tasks.map(task =>
            task.id === taskId
                ? { ...task, notes: [...task.notes, { text: noteText.trim(), createdAt: new Date().toISOString() }] }
                : task
        ));
        setNoteText('');
        setShowNoteInput(null);
    };

    const todayTasks = tasks.filter(task => task.date === getToday());
    const weekDates = getWeekDates();
    const weekTasks = tasks.filter(task => weekDates.includes(task.date));
    const completedToday = todayTasks.filter(task => task.completed).length;
    const completedWeek = weekTasks.filter(task => task.completed).length;
    const totalWeek = weekTasks.length;
    const completionRate = totalWeek > 0 ? Math.round((completedWeek / totalWeek) * 100) : 0;

    return (
        <div className="flex flex-col h-full">
            {/* Add Task - Fixed at top */}
            <div className="flex gap-3 mb-6 flex-shrink-0">
                <input
                    ref={inputRef}
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTask()}
                    placeholder={t.addTask}
                    className="flex-1 bg-bg-primary border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue transition-colors"
                />
                <button
                    onClick={addTask}
                    className="bg-text-primary text-bg-primary px-5 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                    <Plus size={18} />
                </button>
            </div>

            {/* Scrollable Content: Stats + Tasks List */}
            <div className="flex-1 space-y-6 mb-6 overflow-y-auto">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-bg-primary border border-border rounded-xl p-4">
                        <div className="text-2xl font-bold text-text-primary">{todayTasks.length}</div>
                        <div className="text-xs text-text-muted mt-1">{t.today}</div>
                    </div>
                    <div className="bg-bg-primary border border-border rounded-xl p-4">
                        <div className="text-2xl font-bold text-text-primary">{completedWeek}/{totalWeek}</div>
                        <div className="text-xs text-text-muted mt-1">{t.week}</div>
                    </div>
                    <div className="bg-bg-primary border border-border rounded-xl p-4">
                        <div className="text-2xl font-bold text-text-primary">{completionRate}%</div>
                        <div className="text-xs text-text-muted mt-1">{t.completionRate}</div>
                    </div>
                    <div className="bg-bg-primary border border-border rounded-xl p-4">
                        <div className="text-2xl font-bold text-text-primary">{tasks.length}</div>
                        <div className="text-xs text-text-muted mt-1">{t.total}</div>
                    </div>
                </div>

                {/* Tasks List */}
                <div className="space-y-3">
                    {todayTasks.length === 0 && (
                        <div className="text-center py-8 text-text-muted">
                            <Check size={40} className="mx-auto mb-3 opacity-20" />
                            <p>{t.noTasks}</p>
                        </div>
                    )}

                    {todayTasks.map(task => (
                        <div key={task.id} className="bg-bg-primary border border-border rounded-xl p-4 group hover:border-accent-blue/50 transition-colors">
                            <div className="flex items-start gap-3">
                                <button
                                    onClick={() => toggleTask(task.id)}
                                    className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${task.completed
                                        ? 'bg-accent-blue border-accent-blue text-white'
                                        : 'border-border hover:border-accent-blue'
                                        }`}
                                >
                                    {task.completed && <Check size={12} />}
                                </button>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm ${task.completed ? 'line-through text-text-muted' : 'text-text-primary'}`}>
                                        {task.text}
                                    </p>
                                    {task.notes.length > 0 && (
                                        <div className="mt-2 space-y-1">
                                            {task.notes.map((note, i) => (
                                                <div key={i} className="text-xs text-text-muted bg-bg-primary/50 rounded-lg px-3 py-2">
                                                    {note.text}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => {
                                            setShowNoteInput(showNoteInput === task.id ? null : task.id);
                                            setNoteText('');
                                        }}
                                        className="p-1.5 rounded-lg hover:bg-bg-primary text-text-muted hover:text-text-primary transition-colors"
                                        title="Add note"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Note Input */}
                            {showNoteInput === task.id && (
                                <div className="mt-3 flex gap-2 pl-8">
                                    <input
                                        type="text"
                                        value={noteText}
                                        onChange={(e) => setNoteText(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && addNote(task.id)}
                                        placeholder={t.addNote}
                                        className="flex-1 bg-bg-primary border border-border rounded-lg px-3 py-2 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue"
                                        autoFocus
                                    />
                                    <button
                                        onClick={() => addNote(task.id)}
                                        className="bg-accent-blue text-white px-3 py-2 rounded-lg text-xs font-medium hover:opacity-90"
                                    >
                                        Add
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Export/Import - Fixed at bottom */}
            <div className="flex gap-3 pt-4 border-t border-border flex-shrink-0">
                <button
                    onClick={() => {
                        const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                        let content = `TASK TRACKER BACKUP\n`;
                        content += `Date: ${today}\n`;
                        content += `${'='.repeat(50)}\n\n`;

                        tasks.forEach((task, index) => {
                            content += `${index + 1}. ${task.completed ? '[x]' : '[ ]'} ${task.text}\n`;
                            content += `   Created: ${new Date(task.createdAt).toLocaleDateString('id-ID')}\n`;
                            content += `   Status: ${task.completed ? 'Completed' : 'Pending'}\n`;
                            if (task.notes.length > 0) {
                                content += `   Notes:\n`;
                                task.notes.forEach((note, i) => {
                                    content += `     - ${note.text}\n`;
                                });
                            }
                            content += `\n`;
                        });

                        content += `${'='.repeat(50)}\n`;
                        content += `Total Tasks: ${tasks.length}\n`;
                        content += `Completed: ${tasks.filter(t => t.completed).length}\n`;
                        content += `Pending: ${tasks.filter(t => !t.completed).length}\n`;

                        const blob = new Blob([content], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `tasks-backup-${getToday()}.txt`;
                        a.click();
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-border rounded-lg text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                    <Download size={14} /> Export TXT
                </button>
                <label className="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-border rounded-lg text-sm text-text-muted hover:text-text-primary transition-colors cursor-pointer">
                    <Upload size={14} /> Import TXT/JSON
                    <input
                        type="file"
                        accept=".txt,.json"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                try {
                                    const content = event.target.result;

                                    if (file.name.endsWith('.json')) {
                                        // JSON format
                                        const imported = JSON.parse(content);
                                        if (Array.isArray(imported)) {
                                            setTasks(imported);
                                        }
                                    } else if (file.name.endsWith('.txt')) {
                                        // TXT format parsing
                                        const tasks = [];
                                        const lines = content.split('\n');
                                        let currentTask = null;
                                        let inNotes = false;

                                        for (let i = 0; i < lines.length; i++) {
                                            const line = lines[i].trim();

                                            // Skip header/footer lines
                                            if (line.startsWith('TASK TRACKER') ||
                                                line.startsWith('Date:') ||
                                                line.startsWith('=') ||
                                                line.startsWith('Total Tasks:') ||
                                                line.startsWith('Completed:') ||
                                                line.startsWith('Pending:') ||
                                                line === '') {
                                                if (line === '' && currentTask) {
                                                    inNotes = false;
                                                }
                                                continue;
                                            }

                                            // Check if this is a task line (starts with number)
                                            const taskMatch = line.match(/^\d+\.\s+\[([ x])\]\s+(.+)/);
                                            if (taskMatch) {
                                                if (currentTask) tasks.push(currentTask);
                                                currentTask = {
                                                    id: Date.now() + tasks.length,
                                                    text: taskMatch[2],
                                                    completed: taskMatch[1] === 'x',
                                                    notes: [],
                                                    createdAt: new Date().toISOString(),
                                                    date: new Date().toISOString().split('T')[0]
                                                };
                                                inNotes = false;
                                                continue;
                                            }

                                            // Check for Created date
                                            if (line.startsWith('Created:')) {
                                                const dateStr = line.replace('Created: ', '').trim();
                                                if (currentTask) {
                                                    const parts = dateStr.split('/');
                                                    if (parts.length === 3) {
                                                        currentTask.createdAt = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}T00:00:00.000Z`;
                                                        currentTask.date = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
                                                    }
                                                }
                                                continue;
                                            }

                                            // Check for Status
                                            if (line.startsWith('Status:')) {
                                                continue;
                                            }

                                            // Check for Notes section
                                            if (line === 'Notes:') {
                                                inNotes = true;
                                                continue;
                                            }

                                            // Check for note item
                                            if (inNotes && line.startsWith('- ')) {
                                                if (currentTask) {
                                                    currentTask.notes.push({
                                                        text: line.substring(2),
                                                        createdAt: new Date().toISOString()
                                                    });
                                                }
                                                continue;
                                            }
                                        }

                                        if (currentTask) tasks.push(currentTask);

                                        if (tasks.length > 0) {
                                            setTasks(tasks);
                                        } else {
                                            alert('No tasks found in file');
                                        }
                                    }
                                } catch (err) {
                                    alert('Invalid file format');
                                    console.error(err);
                                }
                            };
                            reader.readAsText(file);
                        }}
                    />
                </label>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════
   HABIT TRACKER
═══════════════════════════════════════════ */
const HabitTracker = ({ t }) => {
    const [habits, setHabits] = useState(() => safeJsonParse('tools_habits', []));
    const [newHabit, setNewHabit] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('tools_habits', JSON.stringify(habits));
    }, [habits]);

    const addHabit = () => {
        if (!newHabit.trim()) return;
        const habit = {
            id: Date.now(),
            name: newHabit.trim(),
            completedDates: [],
            createdAt: new Date().toISOString()
        };
        setHabits([...habits, habit]);
        setNewHabit('');
        if (inputRef.current) inputRef.current.focus();
    };

    const toggleHabit = (id, date) => {
        setHabits(habits.map(habit => {
            if (habit.id !== id) return habit;
            const hasDate = habit.completedDates.includes(date);
            return {
                ...habit,
                completedDates: hasDate
                    ? habit.completedDates.filter(d => d !== date)
                    : [...habit.completedDates, date]
            };
        }));
    };

    const deleteHabit = (id) => {
        setHabits(habits.filter(h => h.id !== id));
    };

    const getStreak = (completedDates) => {
        if (completedDates.length === 0) return 0;
        const sorted = [...completedDates].sort().reverse();
        let streak = 0;
        const today = new Date();

        for (let i = 0; i < 365; i++) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            if (sorted.includes(dateStr)) {
                streak++;
            } else if (i > 0) {
                break;
            }
        }
        return streak;
    };

    const getBestStreak = (completedDates) => {
        if (completedDates.length === 0) return 0;
        const sorted = [...new Set(completedDates)].sort();
        let best = 1, current = 1;

        for (let i = 1; i < sorted.length; i++) {
            const prev = new Date(sorted[i - 1]);
            const curr = new Date(sorted[i]);
            const diff = (curr - prev) / (1000 * 60 * 60 * 24);
            if (diff === 1) {
                current++;
                best = Math.max(best, current);
            } else {
                current = 1;
            }
        }
        return best;
    };

    const weekDates = getWeekDates();
    const today = getToday();

    return (
        <div className="flex flex-col h-full">
            {/* Add Habit - Fixed at top */}
            <div className="flex gap-3 mb-6 flex-shrink-0">
                <input
                    ref={inputRef}
                    type="text"
                    value={newHabit}
                    onChange={(e) => setNewHabit(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addHabit()}
                    placeholder={t.addHabit}
                    className="flex-1 bg-bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue transition-colors"
                />
                <button
                    onClick={addHabit}
                    className="bg-text-primary text-bg-primary px-5 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                    <Plus size={18} />
                </button>
            </div>

            {/* Habits List */}
            <div className="flex-1 space-y-4 mb-6 overflow-y-auto">
                {habits.length === 0 && (
                    <div className="text-center py-12 text-text-muted">
                        <Flame size={48} className="mx-auto mb-4 opacity-20" />
                        <p>{t.noHabits}</p>
                    </div>
                )}

                {habits.map(habit => {
                    const streak = getStreak(habit.completedDates);
                    const bestStreak = getBestStreak(habit.completedDates);
                    const totalCompleted = habit.completedDates.length;
                    const daysSinceCreation = Math.max(1, Math.floor((Date.now() - new Date(habit.createdAt).getTime()) / (1000 * 60 * 60 * 24)));
                    const completionRate = Math.min(100, Math.round((totalCompleted / daysSinceCreation) * 100));

                    return (
                        <div key={habit.id} className="bg-bg-secondary border border-border rounded-xl p-5 group hover:border-accent-orange/50 transition-colors">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-sm font-medium text-text-primary">{habit.name}</h3>
                                    {streak > 0 && (
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <Flame size={12} className="text-accent-orange" />
                                            <span className="text-xs text-accent-orange font-medium">{streak} {t.streak}</span>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => deleteHabit(habit.id)}
                                    className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/10 text-text-muted hover:text-red-500 transition-all"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>

                            {/* Week View */}
                            <div className="grid grid-cols-7 gap-2">
                                {weekDates.map((date, i) => {
                                    const isCompleted = habit.completedDates.includes(date);
                                    const isToday = date === today;
                                    const d = new Date(date);
                                    const dayName = t.days[d.getDay()];

                                    return (
                                        <button
                                            key={date}
                                            onClick={() => toggleHabit(habit.id, date)}
                                            className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs transition-all ${isCompleted
                                                ? 'bg-accent-blue text-white'
                                                : isToday
                                                    ? 'bg-bg-primary border border-accent-blue/50 text-text-primary'
                                                    : 'bg-bg-primary/50 text-text-muted hover:bg-bg-primary'
                                                }`}
                                        >
                                            <span className="text-[9px] opacity-60">{dayName}</span>
                                            <span className="font-medium">{d.getDate()}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
                                <div className="text-center">
                                    <div className="text-lg font-bold text-text-primary">{streak}</div>
                                    <div className="text-[9px] text-text-muted uppercase">{t.currentStreak}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-bold text-text-primary">{bestStreak}</div>
                                    <div className="text-[9px] text-text-muted uppercase">{t.bestStreak}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-bold text-text-primary">{completionRate}%</div>
                                    <div className="text-[9px] text-text-muted uppercase">{t.completionRate}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Export/Import - Fixed position at bottom */}
            <div className="flex gap-3 pt-4 border-t border-border mt-auto">
                <button
                    onClick={() => {
                        const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                        let content = `HABIT TRACKER BACKUP\nDate: ${today}\n${'='.repeat(50)}\n\n`;
                        habits.forEach((h, i) => {
                            content += `${i + 1}. ${h.name}\n`;
                            content += `   Created: ${new Date(h.createdAt).toLocaleDateString('id-ID')}\n`;
                            content += `   Completed Dates: ${h.completedDates.join(', ')}\n`;
                            content += `   Current Streak: ${getStreak(h.completedDates)} days\n\n`;
                        });
                        content += `${'='.repeat(50)}\nTotal Habits: ${habits.length}\n`;
                        const blob = new Blob([content], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `habits-backup-${getToday()}.txt`;
                        a.click();
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-border rounded-lg text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                    <Download size={14} /> Export TXT
                </button>
                <label className="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-border rounded-lg text-sm text-text-muted hover:text-text-primary transition-colors cursor-pointer">
                    <Upload size={14} /> Import TXT/JSON
                    <input
                        type="file"
                        accept=".txt,.json"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                try {
                                    const content = event.target.result;
                                    if (file.name.endsWith('.json')) {
                                        const imported = JSON.parse(content);
                                        if (Array.isArray(imported)) setHabits(imported);
                                    } else if (file.name.endsWith('.txt')) {
                                        const importedHabits = [];
                                        const lines = content.split('\n');
                                        let currentHabit = null;
                                        for (let i = 0; i < lines.length; i++) {
                                            const line = lines[i].trim();
                                            if (line.startsWith('HABIT TRACKER') || line.startsWith('Date:') || line.startsWith('=') || line.startsWith('Total Habits:') || line === '') {
                                                if (line === '' && currentHabit) {
                                                    importedHabits.push(currentHabit);
                                                    currentHabit = null;
                                                }
                                                continue;
                                            }
                                            const habitMatch = line.match(/^\d+\.\s+(.+)/);
                                            if (habitMatch) {
                                                if (currentHabit) importedHabits.push(currentHabit);
                                                currentHabit = {
                                                    id: Date.now() + importedHabits.length,
                                                    name: habitMatch[1],
                                                    completedDates: [],
                                                    createdAt: new Date().toISOString()
                                                };
                                                continue;
                                            }
                                            if (line.startsWith('Completed Dates:')) {
                                                const datesStr = line.replace('Completed Dates: ', '').trim();
                                                if (currentHabit && datesStr) {
                                                    currentHabit.completedDates = datesStr.split(',').map(d => d.trim()).filter(Boolean);
                                                }
                                                continue;
                                            }
                                        }
                                        if (currentHabit) importedHabits.push(currentHabit);
                                        if (importedHabits.length > 0) setHabits(importedHabits);
                                        else alert('No habits found in file');
                                    }
                                } catch (err) {
                                    alert('Invalid file format');
                                }
                            };
                            reader.readAsText(file);
                        }}
                    />
                </label>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════
   JOB TRACKER
═══════════════════════════════════════════ */
const defaultApplications = [
    {
        id: 1711000001,
        company: 'PT Telkom Indonesia (Persero) Tbk',
        role: 'Frontend / Full Stack Developer',
        source: 'LinkedIn',
        stage: 'interview',
        appliedDate: '2026-03-12',
        salary: 'IDR 12.000.000 - 18.000.000',
        location: 'Jakarta (Hybrid)',
        url: 'https://careers.telkom.co.id',
        notes: 'Interview user terjadwal. Presentasi arsitektur WMS & Smart Factory ecosystem.'
    },
    {
        id: 1711000002,
        company: 'Astra International',
        role: 'Digitalization & IT Engineer',
        source: 'JobStreet',
        stage: 'tech_test',
        appliedDate: '2026-03-15',
        salary: 'IDR 11.000.000 - 16.000.000',
        location: 'Sunter, Jakarta (Onsite)',
        url: 'https://www.astra.co.id/Career',
        notes: 'Take-home assignment: REST API integration dan database query optimization.'
    },
    {
        id: 1711000003,
        company: 'Bank Mandiri (Livin’ by Mandiri)',
        role: 'Web Application Engineer',
        source: 'LinkedIn',
        stage: 'screening',
        appliedDate: '2026-03-18',
        salary: 'IDR 14.000.000 - 20.000.000',
        location: 'Plaza Mandiri, Jakarta',
        url: 'https://mandiri.workable.com',
        notes: 'Screening HR selesai. Menunggu konfirmasi jadwal user interview.'
    },
    {
        id: 1711000004,
        company: 'Traveloka',
        role: 'Frontend Engineer (React / Next.js)',
        source: 'Glints',
        stage: 'applied',
        appliedDate: '2026-03-20',
        salary: 'IDR 15.000.000 - 22.000.000',
        location: 'BSD City / Remote',
        url: 'https://www.traveloka.com/en-id/careers',
        notes: 'Melampirkan portfolio showcase live demo dan sertifikasi BNSP.'
    }
];

const STAGE_CONFIG = {
    applied: { label: 'Terkirim', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20' },
    screening: { label: 'HR Screening', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20' },
    tech_test: { label: 'Tech Test', badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20' },
    interview: { label: 'Interview', badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20' },
    offered: { label: 'Offering', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20' },
    rejected: { label: 'Rejected', badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20' }
};

const STAGE_KEYS = ['applied', 'screening', 'tech_test', 'interview', 'offered', 'rejected'];

const JobTracker = ({ t }) => {
    // Tab State: 'pipeline' | 'analytics'
    const [activeTab, setActiveTab] = useState('pipeline');

    // Individual Application Records
    const [applications, setApplications] = useState(() => safeJsonParse('tools_applications', defaultApplications));

    // Source Counters & Daily Logs (Preserved Legacy & Analytics)
    const [subjects, setSubjects] = useState(() => safeJsonParse('tools_jobs', []));
    const [showAddSubjectForm, setShowAddSubjectForm] = useState(false);
    const [newSubject, setNewSubject] = useState({ name: '', count: 0 });
    const [expandedHistory, setExpandedHistory] = useState(null);
    const [newLog, setNewLog] = useState({ subjectId: null, date: getToday(), count: 1, note: '' });
    const [showLogForm, setShowLogForm] = useState(null);

    // Pipeline Filter & Search
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStage, setSelectedStage] = useState('all');

    // Add / Edit Application Form Modal/Card
    const [showAppForm, setShowAppForm] = useState(false);
    const [editingAppId, setEditingAppId] = useState(null);
    const [appForm, setAppForm] = useState({
        company: '',
        role: '',
        source: 'LinkedIn',
        stage: 'applied',
        appliedDate: getToday(),
        salary: '',
        location: '',
        url: '',
        notes: ''
    });

    // LocalStorage sync
    useEffect(() => {
        localStorage.setItem('tools_applications', JSON.stringify(applications));
    }, [applications]);

    useEffect(() => {
        localStorage.setItem('tools_jobs', JSON.stringify(subjects));
    }, [subjects]);

    /* ── Pipeline Operations ── */
    const resetAppForm = () => {
        setAppForm({
            company: '',
            role: '',
            source: 'LinkedIn',
            stage: 'applied',
            appliedDate: getToday(),
            salary: '',
            location: '',
            url: '',
            notes: ''
        });
        setEditingAppId(null);
        setShowAppForm(false);
    };

    const handleSaveApplication = (e) => {
        e.preventDefault();
        if (!appForm.company.trim() || !appForm.role.trim()) return;

        if (editingAppId) {
            setApplications(applications.map(app =>
                app.id === editingAppId ? { ...app, ...appForm } : app
            ));
        } else {
            const newApp = {
                id: Date.now(),
                ...appForm
            };
            setApplications([newApp, ...applications]);
        }
        resetAppForm();
    };

    const handleEditApplication = (app) => {
        setAppForm({
            company: app.company,
            role: app.role,
            source: app.source || 'LinkedIn',
            stage: app.stage || 'applied',
            appliedDate: app.appliedDate || getToday(),
            salary: app.salary || '',
            location: app.location || '',
            url: app.url || '',
            notes: app.notes || ''
        });
        setEditingAppId(app.id);
        setShowAppForm(true);
    };

    const handleDeleteApplication = (id) => {
        setApplications(applications.filter(app => app.id !== id));
    };

    const handleCycleStage = (id, currentStage) => {
        const currentIndex = STAGE_KEYS.indexOf(currentStage);
        const nextStage = STAGE_KEYS[(currentIndex + 1) % STAGE_KEYS.length];
        setApplications(applications.map(app =>
            app.id === id ? { ...app, stage: nextStage } : app
        ));
    };

    const handleSetStage = (id, nextStage) => {
        setApplications(applications.map(app =>
            app.id === id ? { ...app, stage: nextStage } : app
        ));
    };

    /* ── Source/Subject Operations (Preserved) ── */
    const addSubject = () => {
        if (!newSubject.name.trim()) return;
        const subject = {
            id: Date.now(),
            name: newSubject.name.trim(),
            count: parseInt(newSubject.count) || 0,
            createdAt: new Date().toISOString(),
            logs: []
        };
        setSubjects([subject, ...subjects]);
        setNewSubject({ name: '', count: 0 });
        setShowAddSubjectForm(false);
    };

    const handleCountChange = (id, newCount) => {
        const normalized = Math.max(0, newCount || 0);
        setSubjects(subjects.map(subject =>
            subject.id === id ? { ...subject, count: normalized } : subject
        ));
    };

    const deleteSubject = (id) => {
        setSubjects(subjects.filter(subject => subject.id !== id));
    };

    const toggleHistory = (id) => {
        setExpandedHistory(expandedHistory === id ? null : id);
        setShowLogForm(null);
    };

    const openLogForm = (subjectId) => {
        setShowLogForm(subjectId);
        setNewLog({ subjectId, date: getToday(), count: 1, note: '' });
    };

    const addLog = () => {
        if (!newLog.count || newLog.count <= 0) return;
        setSubjects(subjects.map(subject => {
            if (subject.id !== newLog.subjectId) return subject;
            const updatedLogs = [...(subject.logs || []), {
                date: newLog.date,
                count: parseInt(newLog.count),
                note: newLog.note.trim(),
                createdAt: new Date().toISOString()
            }];
            updatedLogs.sort((a, b) => new Date(b.date) - new Date(a.date));
            return { ...subject, logs: updatedLogs, count: subject.count + parseInt(newLog.count) };
        }));
        setShowLogForm(null);
        setNewLog({ subjectId: null, date: getToday(), count: 1, note: '' });
    };

    const deleteLog = (subjectId, logIndex) => {
        setSubjects(subjects.map(subject => {
            if (subject.id !== subjectId) return subject;
            const updatedLogs = subject.logs.filter((_, i) => i !== logIndex);
            const newTotal = updatedLogs.reduce((sum, log) => sum + log.count, 0);
            return { ...subject, logs: updatedLogs, count: newTotal };
        }));
    };

    /* ── Metrics & Stats ── */
    const totalApps = applications.length;
    const activePipelineCount = applications.filter(a => ['applied', 'screening', 'tech_test', 'interview'].includes(a.stage)).length;
    const interviewAndTestCount = applications.filter(a => ['tech_test', 'interview'].includes(a.stage)).length;
    const offerCount = applications.filter(a => a.stage === 'offered').length;

    // Filtered Applications
    const filteredApplications = applications.filter(app => {
        const matchesStage = selectedStage === 'all' || app.stage === selectedStage;
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch = !query ||
            app.company.toLowerCase().includes(query) ||
            app.role.toLowerCase().includes(query) ||
            (app.source && app.source.toLowerCase().includes(query)) ||
            (app.location && app.location.toLowerCase().includes(query)) ||
            (app.notes && app.notes.toLowerCase().includes(query));
        return matchesStage && matchesSearch;
    });

    // Analytics Chart Data (Legacy logs + Subject counts)
    const totalSourceApplications = subjects.reduce((sum, s) => sum + s.count, 0);
    const allLogs = subjects.flatMap(s => (s.logs || []).map(l => ({ date: l.date, count: l.count })));
    const dailyDataMap = {};
    allLogs.forEach(l => {
        dailyDataMap[l.date] = (dailyDataMap[l.date] || 0) + l.count;
    });
    const lineChartData = Object.entries(dailyDataMap)
        .map(([date, count]) => ({
            date,
            applications: count,
            label: new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const PASTEL_COLORS = [
        '#a78bfa', '#f9a8d4', '#86efac', '#fcd34d', '#93c5fd', '#c4b5fd',
        '#fdba74', '#86efac', '#67e8f9', '#f0abfc', '#a5b4fc', '#818cf8'
    ];

    const pieChartData = subjects
        .filter(s => s.count > 0)
        .map(s => ({
            name: s.name.length > 12 ? s.name.substring(0, 12) + '...' : s.name,
            fullName: s.name,
            value: s.count
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 6);

    return (
        <div className="flex flex-col h-full space-y-4">
            {/* Top Stat Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-bg-primary border border-border rounded-xl p-3">
                    <div className="text-2xl font-bold text-text-primary">{totalApps}</div>
                    <div className="text-[11px] text-text-muted mt-0.5">Total Terlacak</div>
                </div>
                <div className="bg-bg-primary border border-border rounded-xl p-3">
                    <div className="text-2xl font-bold text-amber-400">{activePipelineCount}</div>
                    <div className="text-[11px] text-text-muted mt-0.5">Pipeline Aktif</div>
                </div>
                <div className="bg-bg-primary border border-border rounded-xl p-3">
                    <div className="text-2xl font-bold text-cyan-400">{interviewAndTestCount}</div>
                    <div className="text-[11px] text-text-muted mt-0.5">Test & Interview</div>
                </div>
                <div className="bg-bg-primary border border-border rounded-xl p-3">
                    <div className="text-2xl font-bold text-emerald-400">{offerCount}</div>
                    <div className="text-[11px] text-text-muted mt-0.5">Offering Stage</div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center justify-between border-b border-border/80 pb-2">
                <div className="flex gap-1.5 p-1 bg-bg-secondary rounded-xl border border-border/50 text-xs">
                    <button
                        onClick={() => setActiveTab('pipeline')}
                        className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                            activeTab === 'pipeline'
                                ? 'bg-bg-primary text-text-primary shadow-sm border border-border/60'
                                : 'text-text-muted hover:text-text-primary'
                        }`}
                    >
                        <Target size={13} />
                        <span>Pipeline Lamaran</span>
                        <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-accent-blue/10 text-accent-blue font-bold">
                            {applications.length}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('analytics')}
                        className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                            activeTab === 'analytics'
                                ? 'bg-bg-primary text-text-primary shadow-sm border border-border/60'
                                : 'text-text-muted hover:text-text-primary'
                        }`}
                    >
                        <TrendingUp size={13} />
                        <span>Analisis & Sumber</span>
                        <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-purple-500/10 text-purple-400 font-bold">
                            {subjects.length}
                        </span>
                    </button>
                </div>

                {activeTab === 'pipeline' && (
                    <button
                        onClick={() => {
                            resetAppForm();
                            setShowAppForm(true);
                        }}
                        className="px-3.5 py-1.5 bg-accent-blue hover:opacity-90 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                    >
                        <Plus size={14} />
                        <span>Tambah Lamaran</span>
                    </button>
                )}
            </div>

            {/* TAB 1: PIPELINE VIEW */}
            {activeTab === 'pipeline' && (
                <div className="space-y-4">
                    {/* Add / Edit Form Modal or Card */}
                    {showAppForm && (
                        <div className="bg-bg-primary border border-border/80 rounded-2xl p-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
                                <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                                    <Briefcase size={15} className="text-accent-blue" />
                                    {editingAppId ? 'Edit Catatan Lamaran' : 'Tambah Lamaran Baru'}
                                </h3>
                                <button
                                    onClick={resetAppForm}
                                    className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-secondary"
                                >
                                    <X size={15} />
                                </button>
                            </div>

                            <form onSubmit={handleSaveApplication} className="space-y-3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[11px] text-text-muted block mb-1">Perusahaan *</label>
                                        <input
                                            type="text"
                                            required
                                            value={appForm.company}
                                            onChange={(e) => setAppForm({ ...appForm, company: e.target.value })}
                                            placeholder="cth. PT Telkom Indonesia"
                                            className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-1.5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] text-text-muted block mb-1">Posisi / Role *</label>
                                        <input
                                            type="text"
                                            required
                                            value={appForm.role}
                                            onChange={(e) => setAppForm({ ...appForm, role: e.target.value })}
                                            placeholder="cth. Frontend Developer"
                                            className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-1.5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div>
                                        <label className="text-[11px] text-text-muted block mb-1">Platform / Sumber</label>
                                        <select
                                            value={appForm.source}
                                            onChange={(e) => setAppForm({ ...appForm, source: e.target.value })}
                                            className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-1.5 text-xs text-text-primary focus:outline-none focus:border-accent-blue"
                                        >
                                            <option value="LinkedIn">LinkedIn</option>
                                            <option value="JobStreet">JobStreet</option>
                                            <option value="Glints">Glints</option>
                                            <option value="Kalibrr">Kalibrr</option>
                                            <option value="Dealls">Dealls</option>
                                            <option value="TechInAsia">Tech in Asia</option>
                                            <option value="Career Site">Career Site Perusahaan</option>
                                            <option value="Referral">Referral / Rekomendasi</option>
                                            <option value="Lainnya">Lainnya</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[11px] text-text-muted block mb-1">Tahapan Saat Ini</label>
                                        <select
                                            value={appForm.stage}
                                            onChange={(e) => setAppForm({ ...appForm, stage: e.target.value })}
                                            className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-1.5 text-xs text-text-primary focus:outline-none focus:border-accent-blue"
                                        >
                                            {STAGE_KEYS.map(key => (
                                                <option key={key} value={key}>{STAGE_CONFIG[key].label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[11px] text-text-muted block mb-1">Tanggal Melamar</label>
                                        <input
                                            type="date"
                                            value={appForm.appliedDate}
                                            onChange={(e) => setAppForm({ ...appForm, appliedDate: e.target.value })}
                                            className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-1.5 text-xs text-text-primary focus:outline-none focus:border-accent-blue"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[11px] text-text-muted block mb-1">Range Gaji / Ekspektasi</label>
                                        <input
                                            type="text"
                                            value={appForm.salary}
                                            onChange={(e) => setAppForm({ ...appForm, salary: e.target.value })}
                                            placeholder="cth. IDR 10.000.000 - 15.000.000"
                                            className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-1.5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] text-text-muted block mb-1">Lokasi & Tipe Kerja</label>
                                        <input
                                            type="text"
                                            value={appForm.location}
                                            onChange={(e) => setAppForm({ ...appForm, location: e.target.value })}
                                            placeholder="cth. Jakarta (Hybrid) / Remote"
                                            className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-1.5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[11px] text-text-muted block mb-1">Link Lowongan / Portal</label>
                                    <input
                                        type="url"
                                        value={appForm.url}
                                        onChange={(e) => setAppForm({ ...appForm, url: e.target.value })}
                                        placeholder="https://..."
                                        className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-1.5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue"
                                    />
                                </div>

                                <div>
                                    <label className="text-[11px] text-text-muted block mb-1">Catatan / Kontak HR / Info Wawancara</label>
                                    <textarea
                                        rows={2}
                                        value={appForm.notes}
                                        onChange={(e) => setAppForm({ ...appForm, notes: e.target.value })}
                                        placeholder="Jadwal tes teknis, nama interviewer, feedback atau checklist berkas..."
                                        className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-1.5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue resize-none"
                                    />
                                </div>

                                <div className="flex gap-2 pt-1">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-accent-blue text-white py-2 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity"
                                    >
                                        {editingAppId ? 'Perbarui Lamaran' : 'Simpan Lamaran'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetAppForm}
                                        className="px-4 py-2 bg-bg-secondary border border-border text-text-muted hover:text-text-primary rounded-lg text-xs"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Filter & Search Bar */}
                    <div className="flex flex-col sm:flex-row gap-2.5 items-center justify-between">
                        {/* Search Input */}
                        <div className="relative w-full sm:w-72">
                            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari perusahaan, posisi, lokasi..."
                                className="w-full bg-bg-secondary border border-border rounded-xl pl-8 pr-3 py-1.5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                                >
                                    <X size={12} />
                                </button>
                            )}
                        </div>

                        {/* Stage Filter Pills */}
                        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                            <button
                                onClick={() => setSelectedStage('all')}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap ${
                                    selectedStage === 'all'
                                        ? 'bg-text-primary text-bg-primary font-semibold'
                                        : 'bg-bg-secondary border border-border text-text-muted hover:text-text-primary'
                                }`}
                            >
                                Semua ({applications.length})
                            </button>
                            {STAGE_KEYS.map(key => {
                                const count = applications.filter(a => a.stage === key).length;
                                const isSelected = selectedStage === key;
                                return (
                                    <button
                                        key={key}
                                        onClick={() => setSelectedStage(key)}
                                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap border ${
                                            isSelected
                                                ? STAGE_CONFIG[key].badge + ' ring-1 ring-white/20 font-bold'
                                                : 'bg-bg-secondary border-border text-text-muted hover:text-text-primary'
                                        }`}
                                    >
                                        {STAGE_CONFIG[key].label} ({count})
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Applications List */}
                    <div className="space-y-3">
                        {filteredApplications.length === 0 ? (
                            <div className="text-center py-12 bg-bg-primary border border-border/60 rounded-2xl">
                                <Briefcase size={36} className="mx-auto mb-2.5 opacity-20 text-text-muted" />
                                <p className="text-xs text-text-muted">
                                    {searchQuery || selectedStage !== 'all'
                                        ? 'Tidak ada lamaran yang cocok dengan filter pencarian.'
                                        : 'Belum ada data lamaran. Mulai tambahkan lamaran pekerjaan Anda!'}
                                </p>
                            </div>
                        ) : (
                            filteredApplications.map(app => {
                                const currentConfig = STAGE_CONFIG[app.stage] || STAGE_CONFIG.applied;

                                return (
                                    <div
                                        key={app.id}
                                        className="bg-bg-primary border border-border/80 rounded-xl p-4 hover:border-accent-blue/50 transition-all shadow-sm group"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                            {/* Company & Role Details */}
                                            <div className="space-y-1.5 flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h4 className="text-sm font-bold text-text-primary">{app.company}</h4>
                                                    {/* Stage Cycle Pill */}
                                                    <button
                                                        onClick={() => handleCycleStage(app.id, app.stage)}
                                                        title="Klik untuk maju ke tahapan berikutnya"
                                                        className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border transition-all cursor-pointer ${currentConfig.badge}`}
                                                    >
                                                        {currentConfig.label} ↻
                                                    </button>
                                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-bg-secondary border border-border text-text-muted">
                                                        {app.source}
                                                    </span>
                                                </div>

                                                <p className="text-xs font-medium text-text-secondary flex items-center gap-1.5">
                                                    <Briefcase size={12} className="text-accent-blue flex-shrink-0" />
                                                    {app.role}
                                                </p>

                                                {/* Meta Info (Salary, Location, Date) */}
                                                <div className="flex items-center gap-3 text-[11px] text-text-muted flex-wrap pt-0.5">
                                                    {app.appliedDate && (
                                                        <span className="flex items-center gap-1">
                                                            <Calendar size={11} />
                                                            {new Date(app.appliedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                        </span>
                                                    )}
                                                    {app.location && (
                                                        <span className="flex items-center gap-1">
                                                            <MapPin size={11} />
                                                            {app.location}
                                                        </span>
                                                    )}
                                                    {app.salary && (
                                                        <span className="flex items-center gap-1 font-mono text-text-secondary">
                                                            <Wallet size={11} />
                                                            {app.salary}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Notes Snippet */}
                                                {app.notes && (
                                                    <p className="text-[11px] text-text-muted bg-bg-secondary/60 rounded-lg p-2 border border-border/40 mt-1.5 leading-relaxed">
                                                        {app.notes}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Action Buttons & Stage Selector */}
                                            <div className="flex items-center sm:flex-col items-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40">
                                                {/* Stage Direct Select */}
                                                <select
                                                    value={app.stage}
                                                    onChange={(e) => handleSetStage(app.id, e.target.value)}
                                                    className="bg-bg-secondary border border-border rounded-lg px-2 py-1 text-[11px] text-text-primary focus:outline-none focus:border-accent-blue"
                                                >
                                                    {STAGE_KEYS.map(key => (
                                                        <option key={key} value={key}>{STAGE_CONFIG[key].label}</option>
                                                    ))}
                                                </select>

                                                <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                                                    {app.url && (
                                                        <a
                                                            href={app.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-1.5 rounded-lg bg-bg-secondary border border-border text-text-muted hover:text-accent-blue transition-colors"
                                                            title="Buka Link Lowongan"
                                                        >
                                                            <ArrowUpRight size={13} />
                                                        </a>
                                                    )}
                                                    <button
                                                        onClick={() => handleEditApplication(app)}
                                                        className="p-1.5 rounded-lg bg-bg-secondary border border-border text-text-muted hover:text-text-primary transition-colors"
                                                        title="Edit Data"
                                                    >
                                                        <Edit3 size={13} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteApplication(app.id)}
                                                        className="p-1.5 rounded-lg bg-bg-secondary border border-border text-text-muted hover:text-rose-400 transition-colors"
                                                        title="Hapus Lamaran"
                                                    >
                                                        <Trash2 size={13} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            )}

            {/* TAB 2: ANALYTICS & SOURCE LOGS (PRESERVED) */}
            {activeTab === 'analytics' && (
                <div className="space-y-4">
                    {/* Charts Section */}
                    {subjects.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Area Chart - Daily Activity */}
                            <div className="bg-bg-primary border border-border rounded-xl p-4">
                                <h3 className="text-sm font-semibold text-text-primary mb-3">{t.chartDailyActivity || 'Aktivitas Harian'}</h3>
                                {lineChartData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={200}>
                                        <AreaChart data={lineChartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                                            <defs>
                                                <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.6} />
                                                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#444" strokeOpacity={0.3} />
                                            <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#888' }} />
                                            <YAxis tick={{ fontSize: 10, fill: '#888' }} allowDecimals={false} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #444', borderRadius: '8px', fontSize: '12px' }}
                                                labelStyle={{ color: '#ccc' }}
                                                formatter={(value) => [`${value} ${t.applications || 'lamaran'}`, t.chartDailyActivity || 'Aktivitas']}
                                            />
                                            <Area type="monotone" dataKey="applications" stroke="#a78bfa" strokeWidth={2} fill="url(#colorApps)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-[200px] flex items-center justify-center text-text-muted text-xs">
                                        {t.noDataToShow || 'Tambahkan log untuk melihat analitik.'}
                                    </div>
                                )}
                            </div>

                            {/* Pie Chart - Source Distribution */}
                            <div className="bg-bg-primary border border-border rounded-xl p-4">
                                <h3 className="text-sm font-semibold text-text-primary mb-3">{t.chartDistribution || 'Distribusi Sumber'}</h3>
                                {pieChartData.length > 0 ? (
                                    <div className="flex items-center gap-2">
                                        <ResponsiveContainer width="60%" height={200}>
                                            <PieChart>
                                                <Pie
                                                    data={pieChartData}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    outerRadius={75}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {pieChartData.map((_entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={PASTEL_COLORS[index % PASTEL_COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #444', borderRadius: '8px', fontSize: '12px' }}
                                                    formatter={(value) => {
                                                        const percentage = Math.round((value / Math.max(1, totalSourceApplications)) * 100);
                                                        return [`${value} lamaran (${percentage}%)`];
                                                    }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                        {/* Legend */}
                                        <div className="flex-1 space-y-1">
                                            {pieChartData.map((entry, index) => (
                                                <div key={index} className="flex items-center gap-2 text-xs">
                                                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: PASTEL_COLORS[index % PASTEL_COLORS.length] }}></div>
                                                    <span className="text-text-muted truncate">{entry.fullName}</span>
                                                    <span className="text-text-primary font-medium ml-auto">{entry.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-[200px] flex items-center justify-center text-text-muted text-xs">
                                        {t.noDataToShow || 'Tambahkan data sumber untuk melihat distribusi.'}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Add Source Button / Form */}
                    <div>
                        {!showAddSubjectForm ? (
                            <button
                                onClick={() => setShowAddSubjectForm(true)}
                                className="w-full bg-bg-primary border border-border border-dashed rounded-xl p-3 text-xs text-text-muted hover:text-text-primary hover:border-accent-blue transition-all flex items-center justify-center gap-2"
                            >
                                <Plus size={14} /> {t.addSubject || 'Tambah Sumber / Portal Lowongan'}
                            </button>
                        ) : (
                            <div className="bg-bg-primary border border-border rounded-xl p-4 space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        value={newSubject.name}
                                        onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                                        placeholder={t.sourceName || 'Nama sumber (e.g. LinkedIn, JobStreet)'}
                                        className="bg-bg-secondary border border-border rounded-lg px-3 py-2 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue"
                                    />
                                    <input
                                        type="number"
                                        value={newSubject.count}
                                        onChange={(e) => setNewSubject({ ...newSubject, count: e.target.value })}
                                        placeholder={t.applicationCount || 'Jumlah lamaran awal'}
                                        min="0"
                                        className="bg-bg-secondary border border-border rounded-lg px-3 py-2 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={addSubject}
                                        className="flex-1 bg-accent-blue text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90"
                                    >
                                        {t.addSource || 'Tambah Sumber'}
                                    </button>
                                    <button
                                        onClick={() => setShowAddSubjectForm(false)}
                                        className="px-3 py-1.5 bg-bg-secondary border border-border rounded-lg text-xs text-text-muted hover:text-text-primary"
                                    >
                                        {t.cancel || 'Batal'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sources List with Daily Log Dropdown */}
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {subjects.length === 0 && (
                            <div className="text-center py-8 text-text-muted text-xs border border-border/60 rounded-xl bg-bg-primary">
                                <Briefcase size={32} className="mx-auto mb-2 opacity-20" />
                                <p>{t.noSubjects || 'Belum ada portal sumber lamaran.'}</p>
                            </div>
                        )}

                        {subjects.map(subject => {
                            const subjectLogs = subject.logs || [];
                            const isHistoryExpanded = expandedHistory === subject.id;
                            const isLogFormOpen = showLogForm === subject.id;

                            return (
                                <div key={subject.id} className="bg-bg-primary border border-border rounded-xl group hover:border-accent-blue/50 transition-colors">
                                    <div className="p-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 flex-1">
                                                <Building2 size={15} className="text-text-muted flex-shrink-0" />
                                                <h3 className="text-xs font-semibold text-text-primary">{subject.name}</h3>
                                                <div className="flex items-center gap-1.5">
                                                    <input
                                                        type="number"
                                                        value={subject.count}
                                                        onChange={(e) => handleCountChange(subject.id, parseInt(e.target.value) || 0)}
                                                        min="0"
                                                        className="bg-bg-secondary border border-border rounded-lg px-2 py-0.5 text-xs text-text-primary focus:outline-none focus:border-accent-blue w-16"
                                                    />
                                                    <span className="text-[11px] text-text-secondary">
                                                        {subject.count === 1 ? (t.applicationSingular || 'lamaran') : (t.applicationPlural || 'lamaran')}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => openLogForm(subject.id)}
                                                    className="p-1 rounded-lg hover:bg-green-500/10 text-text-muted hover:text-green-500 transition-all"
                                                    title={t.addLogEntry || 'Tambah Log Harian'}
                                                >
                                                    <Plus size={13} />
                                                </button>
                                                <button
                                                    onClick={() => toggleHistory(subject.id)}
                                                    className={`p-1 rounded-lg transition-all flex items-center gap-1 ${isHistoryExpanded ? 'bg-accent-blue/10 text-accent-blue' : 'hover:bg-blue-500/10 text-text-muted hover:text-blue-500'}`}
                                                >
                                                    {isHistoryExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                                                    {subjectLogs.length > 0 && (
                                                        <span className="text-[10px] font-mono">{subjectLogs.length}</span>
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => deleteSubject(subject.id)}
                                                    className="p-1 rounded-lg hover:bg-rose-500/10 text-text-muted hover:text-rose-500 transition-all"
                                                >
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>
                                        </div>

                                        {isLogFormOpen && (
                                            <div className="mt-3 pt-3 border-t border-border bg-bg-secondary/40 rounded-lg p-2.5 space-y-2">
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                                    <input
                                                        type="date"
                                                        value={newLog.date}
                                                        onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
                                                        className="bg-bg-secondary border border-border rounded-lg px-2 py-1 text-xs text-text-primary focus:outline-none focus:border-accent-blue"
                                                    />
                                                    <input
                                                        type="number"
                                                        value={newLog.count}
                                                        onChange={(e) => setNewLog({ ...newLog, count: e.target.value })}
                                                        min="1"
                                                        placeholder={t.count || 'Jumlah'}
                                                        className="bg-bg-secondary border border-border rounded-lg px-2 py-1 text-xs text-text-primary focus:outline-none focus:border-accent-blue"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={newLog.note}
                                                        onChange={(e) => setNewLog({ ...newLog, note: e.target.value })}
                                                        placeholder={t.logNote || 'Catatan opsional'}
                                                        className="bg-bg-secondary border border-border rounded-lg px-2 py-1 text-xs text-text-primary focus:outline-none focus:border-accent-blue"
                                                    />
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={addLog}
                                                        className="flex-1 bg-accent-blue text-white px-3 py-1 rounded-lg text-xs font-semibold hover:opacity-90"
                                                    >
                                                        {t.saveLog || 'Simpan Log'}
                                                    </button>
                                                    <button
                                                        onClick={() => setShowLogForm(null)}
                                                        className="px-3 py-1 bg-bg-secondary border border-border rounded-lg text-xs text-text-muted hover:text-text-primary"
                                                    >
                                                        {t.cancel || 'Batal'}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* History Dropdown */}
                                    {isHistoryExpanded && (
                                        <div className="border-t border-border px-3 pb-3">
                                            {subjectLogs.length === 0 ? (
                                                <div className="py-4 text-center text-xs text-text-muted">
                                                    {t.noLogs || 'Belum ada riwayat aktivitas untuk sumber ini.'}
                                                </div>
                                            ) : (
                                                <div className="space-y-1.5 mt-2.5 max-h-40 overflow-y-auto">
                                                    {subjectLogs.map((log, index) => (
                                                        <div key={index} className="flex items-center justify-between bg-bg-secondary/60 rounded-lg px-3 py-1.5 group/log">
                                                            <div className="flex items-center gap-2.5 flex-1 min-w-0">
                                                                <Calendar size={11} className="text-text-muted flex-shrink-0" />
                                                                <div className="truncate">
                                                                    <span className="text-xs font-medium text-text-primary">
                                                                        {new Date(log.date).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}
                                                                    </span>
                                                                    <span className="ml-2 bg-accent-blue/10 text-accent-blue px-1.5 py-0.5 rounded text-[10px] font-bold">
                                                                        +{log.count}
                                                                    </span>
                                                                    {log.note && (
                                                                        <span className="text-[11px] text-text-muted ml-2 truncate">({log.note})</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() => deleteLog(subject.id, index)}
                                                                className="p-1 rounded opacity-0 group-hover/log:opacity-100 hover:bg-rose-500/10 text-text-muted hover:text-rose-500 transition-all"
                                                            >
                                                                <X size={11} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Unified Export/Import Backup */}
            <div className="flex flex-wrap gap-2.5 pt-3 border-t border-border/70 flex-shrink-0">
                <button
                    onClick={() => {
                        const backupData = {
                            version: 2,
                            exportDate: new Date().toISOString(),
                            sources: subjects,
                            applications: applications
                        };
                        const dataStr = JSON.stringify(backupData, null, 2);
                        const blob = new Blob([dataStr], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `job-tracker-backup-${getToday()}.json`;
                        a.click();
                        URL.revokeObjectURL(url);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-secondary border border-border rounded-lg text-xs text-text-muted hover:text-text-primary transition-colors"
                >
                    <Download size={13} /> Export Backup (JSON)
                </button>

                <label className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-secondary border border-border rounded-lg text-xs text-text-muted hover:text-text-primary transition-colors cursor-pointer">
                    <Upload size={13} /> Import Backup (JSON)
                    <input
                        type="file"
                        accept=".json"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                try {
                                    const imported = JSON.parse(event.target.result);
                                    if (Array.isArray(imported)) {
                                        if (imported.length > 0 && ('company' in imported[0] || 'role' in imported[0])) {
                                            setApplications(imported);
                                        } else {
                                            setSubjects(imported);
                                        }
                                        alert('Data berhasil di-import!');
                                    } else if (imported && typeof imported === 'object') {
                                        if (Array.isArray(imported.sources)) setSubjects(imported.sources);
                                        if (Array.isArray(imported.applications)) setApplications(imported.applications);
                                        alert('Data aplikasi dan sumber berhasil di-import!');
                                    } else {
                                        alert('Format file JSON tidak valid.');
                                    }
                                } catch {
                                    alert('Gagal membaca file JSON.');
                                }
                            };
                            reader.readAsText(file);
                        }}
                    />
                </label>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════
   FOCUS TIMER
═══════════════════════════════════════════ */
const FocusTimer = ({ t }) => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('work'); // work, shortBreak, longBreak
    const [sessions, setSessions] = useState(0);
    const [totalFocusTime, setTotalFocusTime] = useState(0);
    const intervalRef = useRef(null);

    const durations = {
        work: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 15 * 60
    };

    useEffect(() => {
        const data = safeJsonParse('tools_timer', { sessions: 0, totalFocusTime: 0 });
        setSessions(data.sessions || 0);
        setTotalFocusTime(data.totalFocusTime || 0);
    }, []);

    useEffect(() => {
        localStorage.setItem('tools_timer', JSON.stringify({ sessions, totalFocusTime }));
    }, [sessions, totalFocusTime]);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prev => prev - 1);
                if (mode === 'work') {
                    setTotalFocusTime(prev => prev + 1);
                }
            }, 1000);
        } else if (timeLeft === 0) {
            if (mode === 'work') {
                setSessions(prev => prev + 1);
            }
            setIsRunning(false);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning, timeLeft, mode]);

    const toggleTimer = () => setIsRunning(!isRunning);

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(durations[mode]);
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setIsRunning(false);
        setTimeLeft(durations[newMode]);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const formatHours = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        return `${h}h ${m}m`;
    };

    const progress = ((durations[mode] - timeLeft) / durations[mode]) * 100;

    return (
        <div className="space-y-8">
            {/* Mode Selector */}
            <div className="flex gap-2 justify-center">
                {[
                    { id: 'work', label: t.work },
                    { id: 'shortBreak', label: t.shortBreak },
                    { id: 'longBreak', label: t.longBreak }
                ].map(m => (
                    <button
                        key={m.id}
                        onClick={() => switchMode(m.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === m.id
                            ? 'bg-accent-blue text-white'
                            : 'bg-bg-secondary text-text-muted hover:text-text-primary'
                            }`}
                    >
                        {m.label}
                    </button>
                ))}
            </div>

            {/* Timer Display */}
            <div className="flex flex-col items-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                    {/* Progress Ring */}
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-border opacity-20"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeDasharray={`${progress * 2.83} 283`}
                            strokeLinecap="round"
                            className="text-accent-blue transition-all duration-1000"
                        />
                    </svg>

                    {/* Time Display */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-5xl md:text-6xl font-mono font-bold text-text-primary">
                            {formatTime(timeLeft)}
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex gap-4 mt-8">
                    <button
                        onClick={toggleTimer}
                        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isRunning
                            ? 'bg-bg-secondary text-text-primary hover:bg-bg-tertiary'
                            : 'bg-accent-blue text-white hover:bg-accent-blue/90'
                            }`}
                    >
                        {isRunning ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                    </button>
                    <button
                        onClick={resetTimer}
                        className="w-16 h-16 rounded-full bg-bg-secondary text-text-muted flex items-center justify-center hover:text-text-primary hover:bg-bg-tertiary transition-all"
                    >
                        <RotateCcw size={20} />
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-bg-secondary border border-border rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-text-primary">{sessions}</div>
                    <div className="text-xs text-text-muted mt-1">{t.sessions}</div>
                </div>
                <div className="bg-bg-secondary border border-border rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-text-primary">{formatHours(totalFocusTime)}</div>
                    <div className="text-xs text-text-muted mt-1">{t.totalFocus}</div>
                </div>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════
   WIDGETS SECTION
═══════════════════════════════════════════ */
const WidgetsSection = ({ t }) => {
    const [githubUsername, setGithubUsername] = useState('AbdiDzikry');

    useEffect(() => {
        const saved = localStorage.getItem('tools_github_username');
        if (saved) setGithubUsername(saved);
    }, []);

    const saveGithubUsername = () => {
        localStorage.setItem('tools_github_username', githubUsername);
    };

    return (
        <div className="space-y-8">
            {/* GitHub Username Setting */}
            <div className="bg-bg-secondary border border-border rounded-xl p-5">
                <h3 className="text-sm font-medium text-text-primary mb-3 flex items-center gap-2">
                    <Settings size={14} /> {t.setGithubUsername}
                </h3>
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={githubUsername}
                        onChange={(e) => setGithubUsername(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && saveGithubUsername()}
                        className="flex-1 bg-bg-primary border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue"
                    />
                    <button
                        onClick={saveGithubUsername}
                        className="bg-accent-blue text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                        {t.save}
                    </button>
                </div>
            </div>

            {/* Now Playing */}
            <div className="bg-bg-secondary border border-border rounded-xl p-5">
                <h3 className="text-sm font-medium text-text-primary mb-4 flex items-center gap-2">
                    <Music size={16} className="text-accent-pink" /> {t.nowPlaying}
                </h3>
                <NowPlayingWidget username="testis3131" />
            </div>

            {/* GitHub Activity */}
            <div className="bg-bg-secondary border border-border rounded-xl p-5">
                <h3 className="text-sm font-medium text-text-primary mb-4 flex items-center gap-2">
                    <Github size={16} className="text-text-primary" /> {t.githubActivity}
                </h3>
                <GitHubWidget username={githubUsername} />
            </div>

            {/* YouTube Playlist */}
            <div className="bg-bg-secondary border border-border rounded-xl p-5">
                <h3 className="text-sm font-medium text-text-primary mb-4 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    {t.youtubePlaylist}
                </h3>
                <YouTubeWidget playlistUrl="https://music.youtube.com/playlist?list=PLIp8n4_3xp0ffGtM6pzcmGvNqzigNaWzY&si=Gyd-2FBr1xsHJacC" />
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════
   NOTES TOOL
═══════════════════════════════════════════ */
const NOTES_COLORS = ['#fde68a', '#d9f99d', '#a5f3fc', '#fbcfe8', '#ddd6fe'];

const NotesTool = ({ t }) => {
    const [notes, setNotes] = useState(() => safeJsonParse('tools_notes', []));
    const [text, setText] = useState('');
    const [color, setColor] = useState(NOTES_COLORS[0]);

    useEffect(() => {
        localStorage.setItem('tools_notes', JSON.stringify(notes));
    }, [notes]);

    const addNote = () => {
        if (!text.trim()) return;
        const note = {
            id: Date.now(),
            text: text.trim(),
            color,
            createdAt: new Date().toISOString(),
            pinned: false
        };
        setNotes([note, ...notes]);
        setText('');
    };

    const togglePin = (id) => {
        setNotes(notes.map(n =>
            n.id === id ? { ...n, pinned: !n.pinned } : n
        ));
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(n => n.id !== id));
    };

    const sortedNotes = [...notes].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col gap-3 mb-5 flex-shrink-0">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={t.placeholder}
                    rows={2}
                    className="w-full bg-bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue transition-colors resize-none"
                />
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-text-muted uppercase tracking-wider">{t.colors}</span>
                        {NOTES_COLORS.map(c => (
                            <button
                                key={c}
                                onClick={() => setColor(c)}
                                className={`w-5 h-5 rounded-full transition-transform ${color === c ? 'ring-2 ring-offset-2 ring-text-primary scale-110' : 'hover:scale-110'}`}
                                style={{ backgroundColor: c }}
                            />
                        ))}
                    </div>
                    <button
                        onClick={addNote}
                        disabled={!text.trim()}
                        className="bg-text-primary text-bg-primary px-5 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-40"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                {sortedNotes.length === 0 && (
                    <div className="text-center py-12 text-text-muted">
                        <StickyNote size={48} className="mx-auto mb-4 opacity-20" />
                        <p>{t.noNotes}</p>
                    </div>
                )}

                {sortedNotes.map(note => (
                    <div
                        key={note.id}
                        className="relative rounded-xl p-4 shadow-sm group"
                        style={{ backgroundColor: note.color }}
                    >
                        {note.pinned && (
                            <span className="absolute -top-2 right-3 text-[9px] font-bold text-bg-primary bg-text-primary/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Pin size={9} strokeWidth={3} /> {t.pinned}
                            </span>
                        )}
                        <p className="text-sm text-black/80 whitespace-pre-wrap pr-8">{note.text}</p>
                        <div className="absolute top-3 right-3 flex items-center gap-1">
                            <button
                                onClick={() => togglePin(note.id)}
                                className={`p-1 rounded-md text-black/50 hover:text-black transition-colors ${note.pinned ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                                title="Pin"
                            >
                                <Pin size={13} />
                            </button>
                            <button
                                onClick={() => deleteNote(note.id)}
                                className="p-1 rounded-md text-black/50 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                title={t.delete}
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════
   GOALS TOOL
═══════════════════════════════════════════ */
const GoalsTool = ({ t }) => {
    const [goals, setGoals] = useState(() => safeJsonParse('tools_goals', []));
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState('');

    useEffect(() => {
        localStorage.setItem('tools_goals', JSON.stringify(goals));
    }, [goals]);

    const addGoal = () => {
        if (!title.trim()) return;
        const goal = {
            id: Date.now(),
            title: title.trim(),
            deadline: deadline || null,
            progress: 0,
            createdAt: new Date().toISOString()
        };
        setGoals([goal, ...goals]);
        setTitle('');
        setDeadline('');
        setShowForm(false);
    };

    const deleteGoal = (id) => {
        setGoals(goals.filter(g => g.id !== id));
    };

    const setProgress = (id, progress) => {
        setGoals(goals.map(g =>
            g.id === id ? { ...g, progress: Math.max(0, Math.min(100, progress)) } : g
        ));
    };

    const isOverdue = (deadline) => deadline && new Date(deadline) < new Date(getToday());

    return (
        <div className="flex flex-col h-full">
            <div className="flex-shrink-0 mb-5">
                {!showForm ? (
                    <button
                        onClick={() => setShowForm(true)}
                        className="w-full bg-bg-secondary border border-dashed border-teal-500/40 rounded-xl px-4 py-3 text-sm text-text-muted hover:text-text-primary hover:border-teal-500 transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus size={16} /> {t.addGoal}
                    </button>
                ) : (
                    <div className="bg-bg-secondary border border-border rounded-xl p-4 space-y-3">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addGoal()}
                            placeholder={t.addGoal}
                            autoFocus
                            className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-teal-500 transition-colors"
                        />
                        <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-text-muted" />
                            <input
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                className="flex-1 bg-bg-primary border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-teal-500 transition-colors"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={addGoal}
                                disabled={!title.trim()}
                                className="flex-1 bg-teal-500 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity text-sm disabled:opacity-40"
                            >
                                {t.save}
                            </button>
                            <button
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 rounded-lg bg-bg-primary border border-border text-text-muted hover:text-text-primary transition-colors text-sm"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-1">
                {goals.length === 0 && (
                    <div className="text-center py-12 text-text-muted">
                        <Target size={48} className="mx-auto mb-4 opacity-20" />
                        <p>{t.noGoals}</p>
                    </div>
                )}

                {goals.map(goal => {
                    const completed = goal.progress >= 100;
                    return (
                        <div key={goal.id} className="bg-bg-secondary border border-border rounded-xl p-5 group hover:border-teal-500/40 transition-colors">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className={`text-sm font-medium text-text-primary ${completed ? 'line-through opacity-50' : ''}`}>
                                        {goal.title}
                                    </h3>
                                    {goal.deadline && (
                                        <p className={`text-[10px] mt-1 flex items-center gap-1 ${isOverdue(goal.deadline) && !completed ? 'text-red-500' : 'text-text-muted'}`}>
                                            <Calendar size={12} />
                                            {t.due}: {new Date(goal.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            {isOverdue(goal.deadline) && !completed && ' | ' + t.due}
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                                    {completed && <span className="text-xs font-bold text-teal-500">{t.completed}</span>}
                                    <button
                                        onClick={() => deleteGoal(goal.id)}
                                        className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/10 text-text-muted hover:text-red-500 transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div className="mt-4">
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-[10px] text-text-muted uppercase tracking-wider">{t.progress}</span>
                                    <span className="text-xs font-bold text-teal-500">{goal.progress}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={goal.progress}
                                    onChange={(e) => setProgress(goal.id, parseInt(e.target.value))}
                                    className="w-full accent-[#14b8a6]"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════
   EXPENSE TRACKER
═══════════════════════════════════════════ */
const EXPENSE_COLORS = ['#60a5fa', '#fca5a5', '#fcd34d', '#34d399', '#a78bfa', '#f472b6'];

const ExpenseTracker = ({ t }) => {
    const { language } = useLanguage();
    const [expenses, setExpenses] = useState(() => safeJsonParse('tools_expenses', []));
    const [budget, setBudget] = useState(() => safeJsonParse('tools_budget', 0));
    const [showForm, setShowForm] = useState(false);
    const [amount, setAmount] = useState('');
    const defaultCategories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Other'];
    const categoriesList = t?.categories || defaultCategories;
    const [category, setCategory] = useState(categoriesList[0] || 'Food');
    const [note, setNote] = useState('');
    const [date, setDate] = useState(getToday());

    useEffect(() => {
        localStorage.setItem('tools_expenses', JSON.stringify(expenses));
    }, [expenses]);

    useEffect(() => {
        localStorage.setItem('tools_budget', JSON.stringify(budget));
    }, [budget]);

    const monthKey = getToday().slice(0, 7);

    const addExpense = () => {
        const value = parseFloat(amount);
        if (!value || value <= 0) return;
        const expense = {
            id: Date.now(),
            amount: value,
            category,
            note: note.trim(),
            date,
            month: date.slice(0, 7)
        };
        setExpenses([expense, ...expenses]);
        setAmount('');
        setNote('');
        setShowForm(false);
    };

    const deleteExpense = (id) => {
        setExpenses(expenses.filter(e => e.id !== id));
    };

    const monthExpenses = expenses.filter(e => e.month === monthKey);
    const total = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
    const remaining = budget > 0 ? budget - total : null;

    const byCategory = {};
    monthExpenses.forEach(e => {
        byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
    });
    const catData = Object.entries(byCategory).map(([name, value]) => ({
        name,
        value: Math.round(value)
    }));

    return (
        <div className="flex flex-col md:flex-row gap-6">
            {/* Left: Form & List */}
            <div className="flex-1 min-w-0">
                {/* Budget summary */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="bg-bg-secondary border border-border rounded-xl p-4 text-center">
                        <div className="text-lg font-bold text-text-primary">{formatMoney(total, language)}</div>
                        <div className="text-[10px] text-text-muted uppercase">{t.spent}</div>
                    </div>
                    <div className="bg-bg-secondary border border-border rounded-xl p-4 text-center">
                        <div className="text-lg font-bold text-text-primary">{formatMoney(budget, language)}</div>
                        <div className="text-[10px] text-text-muted uppercase">{t.budget}</div>
                        <button
                            onClick={() => {
                                const val = prompt(t.setBudget, budget || '');
                                if (val !== null) {
                                    const parsed = parseFloat(val);
                                    if (!isNaN(parsed) && parsed >= 0) setBudget(parsed);
                                }
                            }}
                            className="mt-1 text-[10px] text-violet-500 hover:underline"
                        >
                            {t.save}
                        </button>
                    </div>
                    <div className={`bg-bg-secondary border rounded-xl p-4 text-center ${remaining !== null && remaining < 0 ? 'border-red-500/40' : 'border-border'}`}>
                        <div className={`text-lg font-bold ${remaining !== null && remaining < 0 ? 'text-red-500' : 'text-text-primary'}`}>
                            {remaining !== null ? formatMoney(remaining, language) : '-'}
                        </div>
                        <div className="text-[10px] text-text-muted uppercase">{t.remaining}</div>
                    </div>
                </div>

                {/* Divider visualization */}
                {budget > 0 && (
                    <div className="w-full h-2.5 bg-bg-secondary rounded-full overflow-hidden mb-5 border border-border">
                        <div
                            className={`h-full transition-all ${total > budget ? 'bg-red-500' : 'bg-violet-500'}`}
                            style={{ width: `${budget > 0 ? Math.min(100, (total / budget) * 100) : 0}%` }}
                        />
                    </div>
                )}

                {/* Add expense */}
                {!showForm ? (
                    <button
                        onClick={() => setShowForm(true)}
                        className="w-full bg-bg-secondary border border-dashed border-violet-500/40 rounded-xl px-4 py-3 text-sm text-text-muted hover:text-text-primary hover:border-violet-500 transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus size={16} /> {t.addExpense}
                    </button>
                ) : (
                    <div className="bg-bg-secondary border border-border rounded-xl p-4 space-y-3">
                        <div className="flex flex-wrap gap-2">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder={t.amount}
                                autoFocus
                                className="flex-1 min-w-[120px] bg-bg-primary border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-violet-500 transition-colors"
                            />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="bg-bg-primary border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-violet-500 transition-colors"
                            >
                                {categoriesList.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="bg-bg-primary border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-violet-500 transition-colors"
                            />
                        </div>
                        <input
                            type="text"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addExpense()}
                            placeholder={t.note}
                            className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-violet-500 transition-colors"
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={addExpense}
                                disabled={!amount}
                                className="flex-1 bg-violet-500 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity text-sm disabled:opacity-40"
                            >
                                {t.add}
                            </button>
                            <button
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 rounded-lg bg-bg-primary border border-border text-text-muted hover:text-text-primary transition-colors text-sm"
                            >
                                {t.cancel}
                            </button>
                        </div>
                    </div>
                )}

                {/* List */}
                <div className="mt-4 space-y-2 max-h-72 overflow-y-auto pr-1">
                    {monthExpenses.length === 0 && (
                        <div className="text-center py-10 text-text-muted">
                            <Wallet size={40} className="mx-auto mb-3 opacity-20" />
                            <p className="text-sm">{t.noData}</p>
                        </div>
                    )}
                    {monthExpenses.map(e => (
                        <div key={e.id} className="flex items-center gap-3 bg-bg-secondary border border-border rounded-xl px-4 py-3 group hover:border-violet-500/40 transition-colors">
                            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                                style={{ backgroundColor: EXPENSE_COLORS[Math.max(0, categoriesList.indexOf(e.category)) % EXPENSE_COLORS.length] }}
                            >
                                {e.category[0]}
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-text-primary">{e.note || e.category}</p>
                                <p className="text-[10px] text-text-muted">{e.category} - {new Date(e.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</p>
                            </div>
                            <span className="text-sm font-medium text-text-primary flex-shrink-0">-{formatMoney(e.amount, language)}</span>
                            <button
                                onClick={() => deleteExpense(e.id)}
                                className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/10 text-text-muted hover:text-red-500 transition-all flex-shrink-0"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Pie chart */}
            <div className="md:w-96 flex-shrink-0">
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={catData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={2}
                            >
                                {catData.map((entry, index) => (
                                    <Cell key={entry.name} fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                {catData.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                        {catData.map((c, i) => (
                            <div key={c.name} className="flex items-center gap-2 text-xs">
                                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: EXPENSE_COLORS[i % EXPENSE_COLORS.length] }} />
                                <span className="text-text-secondary flex-1">{c.name}</span>
                                <span className="text-text-primary font-medium">{formatMoney(c.value, language)}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

function formatMoney(value, language) {
    const locale = language === 'id' ? 'id-ID' : 'en-US';
    const currency = language === 'id' ? 'IDR' : undefined;
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency || 'USD',
        maximumFractionDigits: 0
    }).format(value || 0);
}

const ToolsWrapper = () => (
    <ToolsErrorBoundary>
        <Tools />
    </ToolsErrorBoundary>
);

export default ToolsWrapper;
