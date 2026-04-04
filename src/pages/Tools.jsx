import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import SEO from '../components/SEO';
import {
    Plus, Check, X, Trash2, Play, Pause, RotateCcw,
    Music, Github, Clock, Calendar, TrendingUp, Flame,
    Download, Upload, Settings, Briefcase, Building2,
    MapPin, ExternalLink, FileText, ChevronDown, ChevronUp
} from 'lucide-react';
import NowPlayingWidget from '../components/NowPlayingWidget';
import GitHubWidget from '../components/GitHubWidget';
import YouTubeWidget from '../components/YouTubeWidget';

/* ── helpers ── */
const getToday = () => new Date().toISOString().split('T')[0];
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

/* ── Main Component ── */
const Tools = () => {
    const { language } = useLanguage();
    const t = translations[language].tools;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-bg-primary min-h-screen pt-28 pb-24 px-6 md:px-12 lg:px-16 transition-colors"
        >
            <SEO title={t.title} description={t.subtitle} />

            {/* Header */}
            <div className="max-w-7xl mx-auto mb-12">
                <span className="font-mono text-xs text-text-muted uppercase tracking-[0.3em]">{t.title}</span>
                <h1 className="text-4xl md:text-5xl font-bold text-text-primary mt-2">{t.title}</h1>
                <p className="text-text-secondary mt-2 max-w-xl">{t.subtitle}</p>
            </div>

            {/* All Tools in One Page - Bento Grid Layout */}
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Music Section - Full Width Top */}
                <section className="bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5 border border-purple-500/20 rounded-3xl p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                            <Music size={20} className="text-purple-500" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-text-primary">Music & Playlist</h2>
                            <p className="text-xs text-text-muted">Curated Playlist</p>
                        </div>
                    </div>
                    <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
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
                </section>

                {/* Bento Grid - 2x2 Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Task Tracker - Blue Theme */}
                    <section className="bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-transparent border border-blue-500/20 rounded-3xl p-6 hover:border-blue-500/40 transition-colors flex flex-col h-[580px]">
                        <div className="flex items-center gap-3 mb-6 flex-shrink-0">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                <Check size={20} className="text-blue-500" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-text-primary">{t.tasks.title}</h2>
                                <p className="text-xs text-text-muted">{t.tasks.subtitle}</p>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col overflow-hidden">
                            <TaskTracker t={t.tasks} />
                        </div>
                    </section>

                    {/* Habit Tracker - Orange Theme */}
                    <section className="bg-gradient-to-br from-orange-500/5 via-amber-500/5 to-transparent border border-orange-500/20 rounded-3xl p-6 hover:border-orange-500/40 transition-colors flex flex-col h-[580px]">
                        <div className="flex items-center gap-3 mb-6 flex-shrink-0">
                            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                                <Flame size={20} className="text-orange-500" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-text-primary">{t.habits.title}</h2>
                                <p className="text-xs text-text-muted">{t.habits.subtitle}</p>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col overflow-hidden">
                            <HabitTracker t={t.habits} />
                        </div>
                    </section>

                    {/* Focus Timer - Pink Theme */}
                    <section className="bg-gradient-to-br from-pink-500/5 via-rose-500/5 to-transparent border border-pink-500/20 rounded-3xl p-6 hover:border-pink-500/40 transition-colors">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
                                <Clock size={20} className="text-pink-500" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-text-primary">{t.timer.title}</h2>
                                <p className="text-xs text-text-muted">{t.timer.subtitle}</p>
                            </div>
                        </div>
                        <FocusTimer t={t.timer} />
                    </section>

                    {/* GitHub - Green Theme */}
                    <section className="bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-transparent border border-green-500/20 rounded-3xl p-6 hover:border-green-500/40 transition-colors">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                                <Github size={20} className="text-green-500" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-text-primary">GitHub Activity</h2>
                                <p className="text-xs text-text-muted">Development progress tracking</p>
                            </div>
                        </div>
                        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
                            <GitHubWidget username="AbdiDzikry" />
                        </div>
                    </section>

                </div>

                {/* Job Tracker - Full Width Section */}
                <section className="bg-gradient-to-br from-indigo-500/5 via-violet-500/5 to-transparent border border-indigo-500/20 rounded-3xl p-6 hover:border-indigo-500/40 transition-colors flex flex-col h-[650px]">
                    <div className="flex items-center gap-3 mb-6 flex-shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                            <Briefcase size={20} className="text-indigo-500" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-text-primary">{t.jobs.title}</h2>
                            <p className="text-xs text-text-muted">{t.jobs.subtitle}</p>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <JobTracker t={t.jobs} />
                    </div>
                </section>

            </div>
        </motion.div>
    );
};

/* ═══════════════════════════════════════════
   TASK TRACKER
═══════════════════════════════════════════ */
const TaskTracker = ({ t }) => {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('tools_tasks');
        return saved ? JSON.parse(saved) : [];
    });
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
    const [habits, setHabits] = useState(() => {
        const saved = localStorage.getItem('tools_habits');
        return saved ? JSON.parse(saved) : [];
    });
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
const JobTracker = ({ t }) => {
    const [jobs, setJobs] = useState(() => {
        const saved = localStorage.getItem('tools_jobs');
        return saved ? JSON.parse(saved) : [];
    });
    const [showAddForm, setShowAddForm] = useState(false);
    const [newJob, setNewJob] = useState({ company: '', position: '', status: 'applied', dateApplied: getToday() });
    const [expandedNotes, setExpandedNotes] = useState(null);
    const [noteText, setNoteText] = useState('');

    useEffect(() => {
        localStorage.setItem('tools_jobs', JSON.stringify(jobs));
    }, [jobs]);

    const addJob = () => {
        if (!newJob.company.trim() || !newJob.position.trim()) return;
        const job = {
            id: Date.now(),
            company: newJob.company.trim(),
            position: newJob.position.trim(),
            status: newJob.status,
            dateApplied: newJob.dateApplied || getToday(),
            notes: [],
            createdAt: new Date().toISOString()
        };
        setJobs([job, ...jobs]);
        setNewJob({ company: '', position: '', status: 'applied', dateApplied: getToday() });
        setShowAddForm(false);
    };

    const updateJobStatus = (id, status) => {
        setJobs(jobs.map(job => job.id === id ? { ...job, status } : job));
    };

    const deleteJob = (id) => {
        setJobs(jobs.filter(job => job.id !== id));
    };

    const addNote = (jobId) => {
        if (!noteText.trim()) return;
        setJobs(jobs.map(job =>
            job.id === jobId
                ? { ...job, notes: [...job.notes, { text: noteText.trim(), createdAt: new Date().toISOString() }] }
                : job
        ));
        setNoteText('');
    };

    const statusColors = {
        applied: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        screening: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        interview: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
        offered: 'bg-green-500/10 text-green-500 border-green-500/20',
        rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
        withdrawn: 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    };

    const activeJobs = jobs.filter(j => ['applied', 'screening', 'interview'].includes(j.status)).length;
    const interviews = jobs.filter(j => j.status === 'interview').length;
    const offers = jobs.filter(j => j.status === 'offered').length;

    return (
        <div className="flex flex-col h-full">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-bg-primary border border-border rounded-xl p-4">
                    <div className="text-2xl font-bold text-text-primary">{jobs.length}</div>
                    <div className="text-xs text-text-muted mt-1">{t.totalApplications}</div>
                </div>
                <div className="bg-bg-primary border border-border rounded-xl p-4">
                    <div className="text-2xl font-bold text-text-primary">{activeJobs}</div>
                    <div className="text-xs text-text-muted mt-1">{t.activeApplications}</div>
                </div>
                <div className="bg-bg-primary border border-border rounded-xl p-4">
                    <div className="text-2xl font-bold text-text-primary">{interviews}</div>
                    <div className="text-xs text-text-muted mt-1">{t.interviewsScheduled}</div>
                </div>
                <div className="bg-bg-primary border border-border rounded-xl p-4">
                    <div className="text-2xl font-bold text-text-primary">{offers}</div>
                    <div className="text-xs text-text-muted mt-1">{t.offersReceived}</div>
                </div>
            </div>

            {/* Add Job Button / Form */}
            <div className="mb-6">
                {!showAddForm ? (
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="w-full bg-bg-primary border border-border border-dashed rounded-xl p-4 text-sm text-text-muted hover:text-text-primary hover:border-accent-blue transition-all flex items-center justify-center gap-2"
                    >
                        <Plus size={16} /> {t.addJob}
                    </button>
                ) : (
                    <div className="bg-bg-primary border border-border rounded-xl p-4 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                value={newJob.company}
                                onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                                placeholder={t.company}
                                className="bg-bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue"
                            />
                            <input
                                type="text"
                                value={newJob.position}
                                onChange={(e) => setNewJob({ ...newJob, position: e.target.value })}
                                placeholder={t.position}
                                className="bg-bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <select
                                value={newJob.status}
                                onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
                                className="bg-bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-blue"
                            >
                                <option value="applied">{t.applied}</option>
                                <option value="screening">{t.screening}</option>
                                <option value="interview">{t.interview}</option>
                                <option value="offered">{t.offered}</option>
                                <option value="rejected">{t.rejected}</option>
                                <option value="withdrawn">{t.withdrawn}</option>
                            </select>
                            <input
                                type="date"
                                value={newJob.dateApplied}
                                onChange={(e) => setNewJob({ ...newJob, dateApplied: e.target.value })}
                                className="bg-bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-blue"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={addJob}
                                className="flex-1 bg-accent-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
                            >
                                Add Job
                            </button>
                            <button
                                onClick={() => setShowAddForm(false)}
                                className="px-4 py-2 bg-bg-secondary border border-border rounded-lg text-sm text-text-muted hover:text-text-primary"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Jobs List */}
            <div className="flex-1 space-y-3 mb-6 overflow-y-auto">
                {jobs.length === 0 && (
                    <div className="text-center py-12 text-text-muted">
                        <Briefcase size={40} className="mx-auto mb-3 opacity-20" />
                        <p>{t.noJobs}</p>
                    </div>
                )}

                {jobs.map(job => (
                    <div key={job.id} className="bg-bg-primary border border-border rounded-xl p-4 group hover:border-accent-blue/50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <Building2 size={14} className="text-text-muted flex-shrink-0" />
                                    <h3 className="text-sm font-medium text-text-primary">{job.company}</h3>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-text-muted">
                                    <FileText size={12} className="flex-shrink-0" />
                                    <span>{job.position}</span>
                                    <span className="text-text-muted/50">•</span>
                                    <Calendar size={12} className="flex-shrink-0" />
                                    <span>{new Date(job.dateApplied).toLocaleDateString('id-ID')}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <select
                                    value={job.status}
                                    onChange={(e) => updateJobStatus(job.id, e.target.value)}
                                    className={`text-[10px] font-bold px-2 py-1 rounded-full border ${statusColors[job.status]} focus:outline-none cursor-pointer`}
                                >
                                    <option value="applied">{t.applied}</option>
                                    <option value="screening">{t.screening}</option>
                                    <option value="interview">{t.interview}</option>
                                    <option value="offered">{t.offered}</option>
                                    <option value="rejected">{t.rejected}</option>
                                    <option value="withdrawn">{t.withdrawn}</option>
                                </select>
                                <button
                                    onClick={() => deleteJob(job.id)}
                                    className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/10 text-text-muted hover:text-red-500 transition-all"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Notes Section */}
                        {job.notes.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-border">
                                <button
                                    onClick={() => setExpandedNotes(expandedNotes === job.id ? null : job.id)}
                                    className="flex items-center gap-2 text-xs text-text-muted hover:text-text-primary transition-colors"
                                >
                                    {expandedNotes === job.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                    {job.notes.length} {t.notes}
                                </button>
                                {expandedNotes === job.id && (
                                    <div className="mt-2 space-y-2">
                                        {job.notes.map((note, i) => (
                                            <div key={i} className="text-xs text-text-muted bg-bg-secondary/50 rounded-lg px-3 py-2">
                                                {note.text}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Add Note Input */}
                        <div className="mt-3 flex gap-2">
                            <input
                                type="text"
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addNote(job.id)}
                                onFocus={() => setExpandedNotes(job.id)}
                                placeholder={t.addNote}
                                className="flex-1 bg-bg-secondary border border-border rounded-lg px-3 py-2 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue"
                            />
                            <button
                                onClick={() => addNote(job.id)}
                                className="bg-accent-blue text-white px-3 py-2 rounded-lg text-xs font-medium hover:opacity-90"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Export/Import */}
            <div className="flex gap-3 pt-4 border-t border-border flex-shrink-0">
                <button
                    onClick={() => {
                        const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                        let content = `JOB TRACKER BACKUP\nDate: ${today}\n${'='.repeat(50)}\n\n`;
                        jobs.forEach((j, i) => {
                            content += `${i + 1}. ${j.company} - ${j.position}\n`;
                            content += `   Status: ${j.status}\n`;
                            content += `   Date Applied: ${j.dateApplied}\n`;
                            if (j.notes.length > 0) {
                                content += `   Notes:\n`;
                                j.notes.forEach((note, n) => {
                                    content += `     - ${note.text}\n`;
                                });
                            }
                            content += `\n`;
                        });
                        content += `${'='.repeat(50)}\nTotal: ${jobs.length}\n`;
                        const blob = new Blob([content], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `jobs-backup-${getToday()}.txt`;
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
                                        if (Array.isArray(imported)) setJobs(imported);
                                    } else if (file.name.endsWith('.txt')) {
                                        const importedJobs = [];
                                        const lines = content.split('\n');
                                        let currentJob = null;
                                        let inNotes = false;
                                        for (let i = 0; i < lines.length; i++) {
                                            const line = lines[i].trim();
                                            if (line.startsWith('JOB TRACKER') || line.startsWith('Date:') || line.startsWith('=') || line.startsWith('Total:') || line === '') {
                                                if (line === '' && currentJob) {
                                                    importedJobs.push(currentJob);
                                                    currentJob = null;
                                                }
                                                continue;
                                            }
                                            const jobMatch = line.match(/^\d+\.\s+(.+?)\s+-\s+(.+)/);
                                            if (jobMatch) {
                                                if (currentJob) importedJobs.push(currentJob);
                                                currentJob = {
                                                    id: Date.now() + importedJobs.length,
                                                    company: jobMatch[1],
                                                    position: jobMatch[2],
                                                    status: 'applied',
                                                    dateApplied: getToday(),
                                                    notes: [],
                                                    createdAt: new Date().toISOString()
                                                };
                                                inNotes = false;
                                                continue;
                                            }
                                            if (line.startsWith('Status:')) {
                                                if (currentJob) currentJob.status = line.replace('Status: ', '').trim();
                                                continue;
                                            }
                                            if (line.startsWith('Date Applied:')) {
                                                if (currentJob) currentJob.dateApplied = line.replace('Date Applied: ', '').trim();
                                                continue;
                                            }
                                            if (line === 'Notes:') { inNotes = true; continue; }
                                            if (inNotes && line.startsWith('- ')) {
                                                if (currentJob) currentJob.notes.push({ text: line.substring(2), createdAt: new Date().toISOString() });
                                                continue;
                                            }
                                        }
                                        if (currentJob) importedJobs.push(currentJob);
                                        if (importedJobs.length > 0) setJobs(importedJobs);
                                        else alert('No jobs found in file');
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
        const saved = localStorage.getItem('tools_timer');
        if (saved) {
            const data = JSON.parse(saved);
            setSessions(data.sessions || 0);
            setTotalFocusTime(data.totalFocusTime || 0);
        }
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

export default Tools;
