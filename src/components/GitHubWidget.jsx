import { useState, useEffect } from 'react';
import { Github, GitCommit, Star, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const GitHubWidget = ({ username = 'AbdiDzikry' }) => {
    const [stats, setStats] = useState(null);
    const [recentActivity, setRecentActivity] = useState(null);
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                // Fetch user stats
                const userResponse = await fetch(`https://api.github.com/users/${username}`);
                if (!userResponse.ok) throw new Error('User not found');
                const userData = await userResponse.json();

                // Fetch recent events (last 100 for contribution tracking)
                const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`);
                if (!eventsResponse.ok) throw new Error('Events not found');
                const eventsData = await eventsResponse.json();

                setStats({
                    repos: userData.public_repos,
                    followers: userData.followers,
                    following: userData.following,
                    avatar: userData.avatar_url,
                    bio: userData.bio,
                    url: userData.html_url
                });

                // Process contribution data (last 52 weeks)
                if (Array.isArray(eventsData)) {
                    const contributionMap = {};
                    const now = new Date();

                    // Initialize last 52 weeks with 0
                    for (let i = 0; i < 364; i++) {
                        const d = new Date(now);
                        d.setDate(d.getDate() - i);
                        const dateStr = d.toISOString().split('T')[0];
                        contributionMap[dateStr] = 0;
                    }

                    // Count contributions per day
                    eventsData.forEach(event => {
                        const dateStr = new Date(event.created_at).toISOString().split('T')[0];
                        if (contributionMap.hasOwnProperty(dateStr)) {
                            contributionMap[dateStr] += 1;
                        }
                    });

                    // Convert to array for rendering
                    const contribArray = Object.entries(contributionMap)
                        .map(([date, count]) => ({ date, count }))
                        .sort((a, b) => new Date(a.date) - new Date(b.date));

                    setContributions(contribArray);

                    // Get latest push event
                    const latestPush = eventsData.find(event => event.type === 'PushEvent');
                    if (latestPush) {
                        setRecentActivity({
                            repo: latestPush.repo.name,
                            message: latestPush.payload.commits?.[0]?.message || 'Recent commit',
                            time: new Date(latestPush.created_at),
                            url: `https://github.com/${latestPush.repo.name}`
                        });
                    }
                }

                setLoading(false);
            } catch (err) {
                console.error('GitHub fetch error:', err);
                setStats(null);
                setLoading(false);
            }
        };

        fetchGitHubData();
        const interval = setInterval(fetchGitHubData, 300000);
        return () => clearInterval(interval);
    }, [username]);

    if (loading) {
        return (
            <div className="bg-gradient-to-br from-white/50 via-white/20 to-transparent dark:from-zinc-900/50 dark:via-zinc-900/20 dark:to-transparent backdrop-blur-xl rounded-2xl border border-white/60 dark:border-white/10 p-4 shadow-lg">
                <div className="space-y-3">
                    <div className="h-4 bg-bg-secondary rounded w-1/2 animate-pulse" />
                    <div className="h-3 bg-bg-secondary rounded w-3/4 animate-pulse" />
                </div>
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="bg-gradient-to-br from-white/50 via-white/20 to-transparent dark:from-zinc-900/50 dark:via-zinc-900/20 dark:to-transparent backdrop-blur-xl rounded-2xl border border-white/60 dark:border-white/10 p-4 shadow-lg">
                <div className="flex items-center gap-3 text-text-muted">
                    <Github size={20} className="opacity-50" />
                    <span className="text-xs">Unable to load GitHub data</span>
                </div>
            </div>
        );
    }

    const getTimeAgo = (date) => {
        const seconds = Math.floor((new Date() - date) / 1000);
        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        };

        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit);
            if (interval >= 1) {
                return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
            }
        }
        return 'just now';
    };

    // Contribution level colors
    const getContributionColor = (count) => {
        if (count === 0) return 'bg-white/20 dark:bg-black/20';
        if (count <= 2) return 'bg-green-200/60 dark:bg-green-900/40';
        if (count <= 4) return 'bg-green-300/70 dark:bg-green-700/50';
        if (count <= 6) return 'bg-green-400/80 dark:bg-green-600/60';
        return 'bg-green-500 dark:bg-green-500';
    };

    // Group contributions by week for grid layout
    const renderContributionGrid = () => {
        if (contributions.length === 0) return null;

        // Group into weeks (7 days each)
        const weeks = [];
        for (let i = 0; i < contributions.length; i += 7) {
            weeks.push(contributions.slice(i, i + 7));
        }

        return (
            <div className="mt-3">
                <div className="text-[10px] text-text-muted mb-2 font-medium">Contribution Activity</div>
                <div className="overflow-x-auto pb-2">
                    <div className="flex gap-[2px] min-w-fit">
                        {weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="flex flex-col gap-[2px]">
                                {week.map((day, dayIndex) => (
                                    <div
                                        key={`${weekIndex}-${dayIndex}`}
                                        className={`w-[10px] h-[10px] rounded-sm ${getContributionColor(day.count)} hover:ring-1 hover:ring-accent-green/50 transition-all cursor-pointer`}
                                        title={`${day.date}: ${day.count} contributions`}
                                    />
                                ))}
                                {/* Fill empty cells if week has less than 7 days */}
                                {Array.from({ length: 7 - week.length }).map((_, i) => (
                                    <div key={`empty-${i}`} className="w-[10px] h-[10px] rounded-sm bg-transparent" />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                {/* Legend */}
                <div className="flex items-center gap-1 mt-2 text-[9px] text-text-muted">
                    <span>Less</span>
                    <div className="w-[10px] h-[10px] rounded-sm bg-white/20 dark:bg-black/20" />
                    <div className="w-[10px] h-[10px] rounded-sm bg-green-200/60 dark:bg-green-900/40" />
                    <div className="w-[10px] h-[10px] rounded-sm bg-green-300/70 dark:bg-green-700/50" />
                    <div className="w-[10px] h-[10px] rounded-sm bg-green-400/80 dark:bg-green-600/60" />
                    <div className="w-[10px] h-[10px] rounded-sm bg-green-500 dark:bg-green-500" />
                    <span>More</span>
                </div>
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-white/50 via-white/20 to-transparent dark:from-zinc-900/50 dark:via-zinc-900/20 dark:to-transparent backdrop-blur-xl rounded-2xl border border-white/60 dark:border-white/10 p-4 shadow-lg hover:shadow-xl hover:border-accent-green/40 transition-all duration-300"
        >
            <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Github size={18} className="text-accent-green" />
                        <span className="text-xs font-bold text-text-primary">GitHub Activity</span>
                    </div>
                    <a
                        href={stats.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-accent-green transition-colors"
                    >
                        <ExternalLink size={14} />
                    </a>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/30 dark:bg-black/20 rounded-lg p-2 text-center">
                        <div className="text-lg font-bold text-text-primary">{stats.repos}</div>
                        <div className="text-[10px] text-text-muted">Repos</div>
                    </div>
                    <div className="bg-white/30 dark:bg-black/20 rounded-lg p-2 text-center">
                        <div className="text-lg font-bold text-text-primary">{stats.followers}</div>
                        <div className="text-[10px] text-text-muted">Followers</div>
                    </div>
                    <div className="bg-white/30 dark:bg-black/20 rounded-lg p-2 text-center">
                        <div className="text-lg font-bold text-text-primary">{stats.following}</div>
                        <div className="text-[10px] text-text-muted">Following</div>
                    </div>
                </div>

                {/* Recent Activity */}
                {recentActivity && (
                    <a
                        href={recentActivity.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-white/30 dark:bg-black/20 rounded-lg p-3 hover:bg-white/50 dark:hover:bg-black/30 transition-colors group"
                    >
                        <div className="flex items-start gap-2">
                            <GitCommit size={14} className="text-accent-green mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-text-primary truncate group-hover:text-accent-green transition-colors">
                                    {recentActivity.repo}
                                </p>
                                <p className="text-[10px] text-text-muted truncate mt-0.5">
                                    {recentActivity.message}
                                </p>
                                <p className="text-[9px] text-text-muted/70 mt-1">
                                    {getTimeAgo(recentActivity.time)}
                                </p>
                            </div>
                        </div>
                    </a>
                )}

                {/* Contribution Grid */}
                {renderContributionGrid()}
            </div>
        </motion.div>
    );
};

export default GitHubWidget;
