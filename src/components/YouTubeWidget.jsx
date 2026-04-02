import React, { useState, useEffect, useRef } from 'react';
import { Youtube, ExternalLink, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

/**
 * Spectrum Component
 * A simulated audio visualizer that animates when playing.
 */
const Spectrum = ({ isPlaying }) => {
    // Number of bars in the visualizer - increased for a wider look
    const bars = 40;
    
    return (
        <div className="flex items-end justify-between gap-[2px] h-10 w-full px-2 overflow-hidden pointer-events-none">
            {[...Array(bars)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={isPlaying ? {
                        height: [
                            "20%", "70%", "40%", "90%", "30%", "60%", "20%"
                        ],
                    } : { height: "15%" }}
                    transition={isPlaying ? {
                        duration: 0.6 + Math.random() * 0.8,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.02
                    } : { duration: 0.5 }}
                    className="w-[2px] md:w-[3px] bg-zinc-400 dark:bg-zinc-500 rounded-full"
                />
            ))}
        </div>
    );
};

/**
 * YouTubeWidget Component
 * Displays an embedded YouTube playlist player with a reactive simulated spectrum.
 */
const YouTubeWidget = ({ 
    playlistUrl = 'https://music.youtube.com/playlist?list=PLIp8n4_3xp0ffGtM6pzcmGvNqzigNaWzY' 
}) => {
    const { language } = useLanguage();
    const t = translations[language];
    const [isPlaying, setIsPlaying] = useState(false);
    const playerRef = useRef(null);
    const iframeRef = useRef(null);

    // Extract Playlist ID from URL
    const getPlaylistId = (url) => {
        const match = url.match(/[?&]list=([^&]+)/);
        return match ? match[1] : null;
    };

    const playlistId = getPlaylistId(playlistUrl);

    useEffect(() => {
        // Load YouTube IFrame API script
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        // Define the global callback for the API
        window.onYouTubeIframeAPIReady = () => {
            initializePlayer();
        };

        const initializePlayer = () => {
            if (window.YT && window.YT.Player && iframeRef.current) {
                playerRef.current = new window.YT.Player(iframeRef.current, {
                    events: {
                        onStateChange: (event) => {
                            // 1: PLAYING, 2: PAUSED, 3: BUFFERING, 0: ENDED
                            const state = event.data;
                            setIsPlaying(state === 1 || state === 3);
                        }
                    }
                });
            }
        };

        // If global API is already loaded, initialize immediately
        if (window.YT && window.YT.Player) {
            initializePlayer();
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, []);

    const cardStyles = "block bg-white dark:bg-zinc-900 border border-border rounded-[2.5rem] p-6 md:p-8 relative overflow-hidden group hover:border-zinc-400 dark:hover:border-zinc-500 transition-all duration-500 shadow-sm hover:shadow-lg h-full";

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={cardStyles}
            >
                {/* Background Glow - Intensifies when playing */}
                <motion.div 
                    animate={isPlaying ? { opacity: [0.05, 0.15, 0.05] } : { opacity: 0.05 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-zinc-500 to-transparent pointer-events-none transition-all duration-700" 
                />
                
                <div className="flex flex-col gap-4 h-full relative z-10">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-500 ${isPlaying ? 'bg-zinc-800 dark:bg-zinc-200 text-white dark:text-black scale-110 shadow-lg shadow-black/10' : 'bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400'}`}>
                                <Youtube size={16} />
                            </div>
                            <div>
                                <h4 className="text-[9px] font-mono text-text-muted font-bold uppercase tracking-widest leading-none mb-1">
                                    {t.profile.youtubeHeader || "YOUTUBE_TRACKS"}
                                </h4>
                                <span className={`flex items-center gap-1 text-[8px] font-bold uppercase tracking-tighter transition-colors ${isPlaying ? 'text-zinc-900 dark:text-zinc-100' : 'text-text-muted'}`}>
                                    <span className={`w-1 h-1 rounded-full ${isPlaying ? 'bg-zinc-900 dark:bg-zinc-100 animate-ping' : 'bg-text-muted opacity-40'}`} />
                                    {isPlaying ? 'NOW_STREAMING' : 'IDLE_STREAM'}
                                </span>
                            </div>
                        </div>
                        <a 
                            href={playlistUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-text-muted hover:text-zinc-900 dark:hover:text-zinc-100"
                        >
                            <ExternalLink size={12} />
                        </a>
                    </div>

                    {/* Integrated Player Container */}
                    <div className={`flex-1 min-h-[160px] rounded-2xl overflow-hidden border transition-all duration-500 flex flex-col ${isPlaying ? 'border-zinc-500/40 shadow-lg shadow-black/5' : 'border-border/50 shadow-inner'}`}>
                        {/* Custom Waveform/Spectrum Overlay when playing */}
                        <div className="bg-zinc-50 dark:bg-zinc-950 px-4 pt-4 border-b border-border/20 flex gap-4 items-center group/player overflow-hidden relative">
                             <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isPlaying ? 'bg-zinc-500/10 text-zinc-500' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400'}`}>
                                <Music size={16} className={isPlaying ? 'animate-spin-slow' : ''} />
                             </div>
                             <div className="flex-1">
                                <Spectrum isPlaying={isPlaying} />
                             </div>
                             {/* Scanline effect for playing state */}
                             {isPlaying && <div className="absolute inset-0 bg-zinc-500/5 pointer-events-none animate-pulse" />}
                        </div>

                        {/* Standard IFrame Player */}
                        <div className="flex-1 bg-zinc-100 dark:bg-zinc-800 relative">
                            {playlistId ? (
                                <iframe
                                    ref={iframeRef}
                                    src={`https://www.youtube.com/embed/videoseries?list=${playlistId}&enablejsapi=1&modestbranding=1&rel=0`}
                                    title="YouTube Playlist"
                                    className="w-full h-full"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[10px] text-text-muted font-mono italic">
                                    Invalid Playlist ID.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between px-1">
                        <span className="text-[9px] font-bold text-text-muted uppercase tracking-[0.1em] group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                            {t.profile.youtubeTitle || "My Playlist"}
                        </span>
                        <div className="flex gap-2">
                             <div className={`w-1 h-1 rounded-full transition-colors duration-500 ${isPlaying ? 'bg-red-500' : 'bg-zinc-700'}`} />
                             <div className="w-1 h-1 rounded-full bg-zinc-700" />
                             <div className="w-1 h-1 rounded-full bg-zinc-700" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default YouTubeWidget;
