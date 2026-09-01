import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, RotateCcw, Heart, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const CANVAS_W = 480;
const CANVAS_H = 640;

const PLAYER_W = 40;
const PLAYER_H = 40;
const BULLET_SPEED = 8;
const ENEMY_SPEED = 1.6;
const ENEMY_SPEEDUP = 0.5;

const SHIP_COLORS = ['#22c55e', '#3b82f6', '#f43f5e', '#eab308', '#a855f7', '#14b8a6'];

const AlienShooter = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(() => parseInt(localStorage.getItem('alien-shooter-best') || '0'));
    const [gameOver, setGameOver] = useState(false);
    const [gameState, setGameState] = useState('idle'); // idle | playing | over
    const [lives, setLives] = useState(3);
    const [level, setLevel] = useState(1);

    const gameRef = useRef({
        running: false,
        player: { x: CANVAS_W / 2, y: CANVAS_H - 70, w: PLAYER_W, h: PLAYER_H, speed: 6, shootCooldown: 0 },
        bullets: [],
        enemyBullets: [],
        enemies: [],
        keys: {},
        score: 0,
        lives: 3,
        level: 1,
        enemyFireCd: 0,
        spawnCd: 80,
        frame: 0,
        starField: [],
    });

    // Initialize starfield
    const initStars = useCallback(() => {
        const stars = [];
        for (let i = 0; i < 80; i++) {
            stars.push({
                x: Math.random() * CANVAS_W,
                y: Math.random() * CANVAS_H,
                speed: 0.5 + Math.random() * 1.5,
                size: Math.random() * 2 + 0.5,
            });
        }
        return stars;
    }, []);

    const resetGame = useCallback(() => {
        const g = gameRef.current;
        g.running = true;
        g.player = { x: CANVAS_W / 2, y: CANVAS_H - 70, w: PLAYER_W, h: PLAYER_H, speed: 6, shootCooldown: 0 };
        g.bullets = [];
        g.enemyBullets = [];
        g.enemies = [];
        g.keys = {};
        g.score = 0;
        g.lives = 3;
        g.level = 1;
        g.enemyFireCd = 0;
        g.spawnCd = 80;
        g.frame = 0;
        g.starField = initStars();
        setScore(0);
        setLives(3);
        setLevel(1);
        setGameOver(false);
        setGameState('playing');
    }, [initStars]);

    const startGame = useCallback(() => {
        resetGame();
    }, [resetGame]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
                e.preventDefault();
            }
            gameRef.current.keys[e.key] = true;
        };
        const handleKeyUp = (e) => {
            gameRef.current.keys[e.key] = false;
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Update best score
    useEffect(() => {
        if (score > bestScore) {
            setBestScore(score);
            localStorage.setItem('alien-shooter-best', score.toString());
        }
    }, [score, bestScore]);

    const gameLoop = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const g = gameRef.current;

        if (!g.running) return;

        const update = () => {
            g.frame++;

            // Player movement
            const p = g.player;
            if (g.keys['ArrowLeft'] || g.keys['a'] || g.keys['A']) p.x -= p.speed;
            if (g.keys['ArrowRight'] || g.keys['d'] || g.keys['D']) p.x += p.speed;
            if (g.keys['ArrowUp'] || g.keys['w'] || g.keys['W']) p.y -= p.speed;
            if (g.keys['ArrowDown'] || g.keys['s'] || g.keys['S']) p.y += p.speed;

            p.x = Math.max(p.w / 2, Math.min(CANVAS_W - p.w / 2, p.x));
            p.y = Math.max(p.h / 2, Math.min(CANVAS_H - p.h / 2, p.y));

            // Shooting
            p.shootCooldown--;
            if ((g.keys[' '] ) && p.shootCooldown <= 0) {
                g.bullets.push({ x: p.x, y: p.y - p.h / 2, w: 4, h: 12 });
                p.shootCooldown = 8;
            }

            // Move bullets
            g.bullets = g.bullets.filter(b => b.y > -20);
            g.bullets.forEach(b => (b.y -= BULLET_SPEED));

            // Move enemy bullets
            g.enemyBullets = g.enemyBullets.filter(b => b.y < CANVAS_H + 20);
            g.enemyBullets.forEach(b => (b.y += BULLET_SPEED * 0.8));

            // Spawn enemies
            g.spawnCd--;
            if (g.spawnCd <= 0) {
                const cols = 5 + Math.floor(Math.random() * 3);
                const row = Math.floor(Math.random() * 2);
                for (let i = 0; i < cols; i++) {
                    const x = 30 + i * ((CANVAS_W - 60) / cols) + (Math.random() * 10 - 5);
                    g.enemies.push({
                        x,
                        y: -30 - row * 50 - Math.random() * 30,
                        w: 30,
                        h: 30,
                        color: SHIP_COLORS[Math.floor(Math.random() * SHIP_COLORS.length)],
                        hp: 1,
                        speedX: (Math.random() * 2 - 1) * 0.8,
                        wobble: Math.random() * 6.28,
                    });
                }
                g.spawnCd = Math.max(30, 80 - (g.level - 1) * 8);
            }

            // Move enemies (sine-wave drift down)
            g.enemies.forEach(en => {
                en.wobble += 0.08;
                en.y += ENEMY_SPEED + ENEMY_SPEEDUP * (g.level - 1);
                en.x += Math.sin(en.wobble) * 1.2;
                en.x = Math.max(en.w / 2, Math.min(CANVAS_W - en.w / 2, en.x));
            });

            // Enemy shooting
            g.enemyFireCd--;
            if (g.enemyFireCd <= 0 && g.enemies.length > 0) {
                const shooter = g.enemies[Math.floor(Math.random() * g.enemies.length)];
                g.enemyBullets.push({ x: shooter.x, y: shooter.y + shooter.h / 2, w: 6, h: 6, color: '#f43f5e' });
                g.enemyFireCd = Math.max(30, 90 - g.level * 8);
            }

            // Collision: bullets vs enemies
            for (let bi = g.bullets.length - 1; bi >= 0; bi--) {
                const b = g.bullets[bi];
                for (let ei = g.enemies.length - 1; ei >= 0; ei--) {
                    const en = g.enemies[ei];
                    if (
                        b.x < en.x + en.w / 2 &&
                        b.x > en.x - en.w / 2 &&
                        b.y < en.y + en.h / 2 &&
                        b.y > en.y - en.h / 2
                    ) {
                        g.bullets.splice(bi, 1);
                        g.enemies.splice(ei, 1);
                        g.score += 10;
                        setScore(g.score);
                        break;
                    }
                }
            }

            // Collision: player vs enemies & enemy bullets
            const playerRect = { x: p.x - p.w / 2, y: p.y - p.h / 2, w: p.w, h: p.h };
            for (let ei = g.enemies.length - 1; ei >= 0; ei--) {
                const en = g.enemies[ei];
                if (
                    playerRect.x < en.x + en.w / 2 &&
                    playerRect.x + playerRect.w > en.x - en.w / 2 &&
                    playerRect.y < en.y + en.h / 2 &&
                    playerRect.y + playerRect.h > en.y - en.h / 2
                ) {
                    g.enemies.splice(ei, 1);
                    hitPlayer(g);
                }
            }
            for (let bi = g.enemyBullets.length - 1; bi >= 0; bi--) {
                const b = g.enemyBullets[bi];
                if (
                    playerRect.x < b.x + b.w / 2 &&
                    playerRect.x + playerRect.w > b.x - b.w / 2 &&
                    playerRect.y < b.y + b.h / 2 &&
                    playerRect.y + playerRect.h > b.y - b.h / 2
                ) {
                    g.enemyBullets.splice(bi, 1);
                    hitPlayer(g);
                }
            }

            // Level progression
            if (g.score > 0 && Math.floor(g.score / 200) + 1 > g.level) {
                g.level = Math.floor(g.score / 200) + 1;
                setLevel(g.level);
            }

            function hitPlayer(game) {
                game.lives--;
                setLives(game.lives);
                if (game.lives <= 0) {
                    game.running = false;
                    setGameOver(true);
                    setScore(game.score);
                    setGameState('over');
                }
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

            // Background
            const bgGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
            if (isDark) {
                bgGrad.addColorStop(0, '#0a0a0f');
                bgGrad.addColorStop(1, '#101018');
            } else {
                bgGrad.addColorStop(0, '#eef0ea');
                bgGrad.addColorStop(1, '#e2e5dd');
            }
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

            // Starfield
            g.starField.forEach(star => {
                star.y += star.speed;
                if (star.y > CANVAS_H) { star.y = 0; star.x = Math.random() * CANVAS_W; }
                ctx.fillStyle = isDark ? `rgba(255,255,255,${0.3 + star.speed * 0.2})` : `rgba(60,70,90,${0.3 + star.speed * 0.2})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Player ship (triangle)
            const p = g.player;
            ctx.save();
            ctx.shadowColor = '#22c55e';
            ctx.shadowBlur = 20;
            ctx.fillStyle = '#4ade80';
            ctx.beginPath();
            ctx.moveTo(p.x, p.y - p.h / 2);
            ctx.lineTo(p.x - p.w / 2, p.y + p.h / 2);
            ctx.lineTo(p.x + p.w / 2, p.y + p.h / 2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            // Engine flame
            ctx.fillStyle = '#fbbf24';
            ctx.beginPath();
            ctx.moveTo(p.x - 6, p.y + p.h / 2 - 2);
            ctx.lineTo(p.x, p.y + p.h / 2 + 10);
            ctx.lineTo(p.x + 6, p.y + p.h / 2 - 2);
            ctx.closePath();
            ctx.fill();

            // Bullets
            ctx.fillStyle = '#22d3ee';
            g.bullets.forEach(b => {
                ctx.shadowColor = '#22d3ee';
                ctx.shadowBlur = 12;
                ctx.fillRect(b.x - b.w / 2, b.y, b.w, b.h);
                ctx.shadowBlur = 0;
            });

            // Enemy bullets
            g.enemyBullets.forEach(b => {
                ctx.shadowColor = '#f43f5e';
                ctx.shadowBlur = 10;
                ctx.fillStyle = b.color;
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.w / 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            // Enemies (varied alien ships)
            g.enemies.forEach(en => {
                ctx.save();
                ctx.shadowColor = en.color;
                ctx.shadowBlur = 15;
                ctx.fillStyle = en.color;
                // UFO body
                ctx.beginPath();
                ctx.ellipse(en.x, en.y, en.w / 2, en.h / 2.4, 0, 0, Math.PI * 2);
                ctx.fill();
                // dome
                ctx.fillStyle = isDark ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.9)';
                ctx.beginPath();
                ctx.arc(en.x, en.y - en.h / 5, en.w / 4.5, 0, Math.PI);
                ctx.fill();
                // lights
                ctx.fillStyle = '#fbbf24';
                ctx.beginPath();
                ctx.arc(en.x - en.w / 4, en.y, 2.5, 0, Math.PI * 2);
                ctx.arc(en.x + en.w / 4, en.y, 2.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });

            // HUD on canvas (optional) - lives & level drawn in React instead
        };

        if (g.running) {
            update();
            draw();
        }
    }, [isDark]);

    // Main rAF loop - only runs a single loop, checks running flag each frame
    useEffect(() => {
        const g = gameRef.current;
        let animId;

        const loop = () => {
            if (!g.running) return;
            gameLoop();
            animId = requestAnimationFrame(loop);
        };

        if (gameState === 'playing') {
            animId = requestAnimationFrame(loop);
        }

        return () => {
            if (animId) cancelAnimationFrame(animId);
        };
    }, [gameLoop, gameState]);

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto py-12">
            {/* Header */}
            <div className="flex justify-between items-center w-full px-6 py-4 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-zinc-200 dark:border-white/20 rounded-2xl shadow-xl">
                <div className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60">Score</span>
                    <span className="text-2xl font-display font-bold text-accent-green">{score}</span>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60">Best</span>
                        <div className="flex items-center gap-2">
                            <Rocket size={14} className="text-amber-500" />
                            <span className="text-lg font-bold">{bestScore}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60">Level</span>
                        <div className="flex items-center gap-1">
                            <Zap size={14} className="text-accent-green" />
                            <span className="text-lg font-bold">{level}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60">Lives</span>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: lives }).map((_, i) => (
                                <Heart key={i} size={14} className="text-red-500 fill-red-500" />
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={startGame}
                        className="p-3 bg-zinc-100 dark:bg-white/10 rounded-xl hover:bg-zinc-200 dark:hover:bg-white/20 transition-all hover:scale-110 active:scale-95 text-text-primary/80"
                        title="Restart"
                    >
                        <RotateCcw size={20} />
                    </button>
                </div>
            </div>

            {/* Game Canvas */}
            <div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-2xl">
                <canvas
                    ref={canvasRef}
                    width={CANVAS_W}
                    height={CANVAS_H}
                    className={`max-w-full h-auto select-none ${isDark ? 'bg-[#0a0a0f]' : 'bg-[#eef0ea]'}`}
                />

                <AnimatePresence>
                    {(gameState === 'idle' || gameState === 'over') && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 text-center p-6 cursor-pointer"
                            onClick={startGame}
                        >
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="bg-zinc-800/80 border border-white/20 p-8 rounded-3xl backdrop-blur-xl shadow-2xl"
                            >
                                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-green/20 text-accent-green">
                                    <Rocket size={32} />
                                </div>
                                <h2 className="text-3xl font-display font-bold mb-2 text-white">
                                    {gameState === 'over' ? 'Game Over' : 'Alien Shooter'}
                                </h2>
                                <p className="text-white/60 mb-4 font-mono text-sm uppercase tracking-widest">
                                    {gameState === 'over' ? `Final Score: ${score}` : 'Defend Earth from alien invasion'}
                                </p>
                                {gameState === 'over' && (
                                    <p className="text-amber-400 mb-4 font-mono text-sm">
                                        {lives > 0 ? 'Nice shootin\', pilot!' : 'The aliens got you...'}
                                    </p>
                                )}
                                <button
                                    onClick={startGame}
                                    className="px-8 py-3 bg-accent-green text-white font-bold rounded-xl hover:bg-accent-green/80 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(var(--accent-green-rgb),0.3)]"
                                >
                                    {gameState === 'over' ? 'Play Again' : 'Start Game'}
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Instructions */}
            <div className="p-6 bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl w-full text-center">
                <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-accent-green mb-3">How to Play</h4>
                <p className="text-xs text-text-secondary leading-relaxed font-mono">
                    Use <span className="text-text-primary px-1 border border-zinc-200 dark:border-white/20 rounded">ARROW KEYS</span> or <span className="text-text-primary px-1 border border-zinc-200 dark:border-white/20 rounded">WASD</span> to move your ship.
                    Press <span className="text-text-primary px-1 border border-zinc-200 dark:border-white/20 rounded">SPACE</span> to fire and blast the <span className="text-accent-green font-bold">ALIENS</span>!
                    Survive the waves, level up every 200 points.
                </p>
            </div>
        </div>
    );
};

export default AlienShooter;
