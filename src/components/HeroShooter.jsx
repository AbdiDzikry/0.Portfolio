import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../utils/translations';

const HeroShooter = () => {
    const { language } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const t = translations[language].hero;

    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const stateRef = useRef({
        W: 0,
        H: 0,
        words: [],
        parts: [],       // {x,y,vx,vy,free,size,color,baseX,baseY}
        plane: null,
        bullets: [],
        stars: [],
        keys: {},
        touching: false,
        animId: null,
        initialized: false,
        frame: 0,
        firing: false,
    });

    // Build particles from rendered text (offscreen)
    const buildText = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const s = stateRef.current;
        const W = s.W;
        const vw = window.innerWidth;
        const vh = s.H;

        // Editorial typographic design — each word has its own size + weight
        const baseFontSize = Math.min(0.10 * vw, 0.085 * vh);

        // Three words with distinct visual treatment
        const layout = [
            {
                text: (t.word1 || '').toUpperCase(),
                outline: false,
                scale: 1.0,       // solid headline
            },
            {
                text: (t.word2 || '').toUpperCase(),
                outline: true,
                scale: 0.95,      // same ballpark size, outline style — clean
            },
            {
                text: (t.word3 || '').toUpperCase(),
                outline: false,
                scale: 1.08,      // largest solid — focal point
            },
        ];

        const lineGap = baseFontSize * 0.30; // vertical gap between lines
        const startY = Math.max(170, s.H * 0.24); // below role subheader

        // Pre-measure each line's height so we can stack them
        const lineHeights = layout.map(w => baseFontSize * w.scale);
        const lineOffsets = [0];
        for (let i = 1; i < layout.length; i++) {
            lineOffsets.push(lineOffsets[i - 1] + lineHeights[i - 1] + lineGap);
        }

        s.words = layout.filter(w => w.text && w.text.trim().length > 0);

        // offscreen canvas for each line
        const parts = [];
        s.parts = parts;

        s.words.forEach((w, li) => {
            const fontSize = baseFontSize * w.scale;
            const font = `bold ${fontSize}px Manrope`;
            ctx.font = font; // update ctx.font for measureText
            const textWidth = ctx.measureText(w.text).width;
            const lineX = (W - textWidth) / 2; // horizontally centered

            const pad = 50;
            const lineH = Math.ceil(fontSize * 1.3 + pad * 2);
            const lineW = Math.ceil(textWidth + pad * 2);
            const off = document.createElement('canvas');
            off.width = lineW;
            off.height = lineH;
            const octx = off.getContext('2d');
            octx.font = font;
            octx.textBaseline = 'alphabetic';
            octx.textAlign = 'left';

            const baseYLine = startY + lineOffsets[li];
            const offTextY = pad + fontSize * 0.85;

            const colorPrimary = isDark ? '#ffffff' : '#111111';
            const colorAccent = isDark ? '#c8ccbf' : '#7d8260';

            if (w.outline) {
                // Outline stroke — needs sufficient lineWidth for particles to sample cleanly
                octx.strokeStyle = colorAccent;
                octx.lineWidth = Math.max(2.5, fontSize * 0.022);
                octx.strokeText(w.text, pad, offTextY);
            } else {
                octx.fillStyle = colorPrimary;
                octx.fillText(w.text, pad, offTextY);
            }

            // sample pixels
            const img = octx.getImageData(0, 0, lineW, lineH);
            const data = img.data;
            const step = Math.max(3, Math.round(fontSize * 0.03));
            for (let py = 0; py < lineH; py += step) {
                for (let px = 0; px < lineW; px += step) {
                    const idx = (py * lineW + px) * 4;
                    const a = data[idx + 3];
                    if (a > 100) {
                        const r = data[idx], g = data[idx + 1], b = data[idx + 2];
                        parts.push({
                            baseX: lineX + (px - pad),
                            baseY: baseYLine + (py - pad),
                            x: lineX + (px - pad),
                            y: baseYLine + (py - pad),
                            vx: 0, vy: 0,
                            free: false,
                            size: step * 0.9,
                            color: `rgb(${r},${g},${b})`,
                        });
                    }
                }
            }
        });
    };

    // Initialize sizes + plane + stars
    const buildScene = () => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;
        const s = stateRef.current;

        const rect = container.getBoundingClientRect();
        const W = Math.max(320, rect.width);
        const H = Math.max(400, rect.height);

        const dpr = Math.min(2, window.devicePixelRatio || 1);
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = `${W}px`;
        canvas.style.height = `${H}px`;

        s.W = W;
        s.H = H;
        s.dpr = dpr;
        // Position plane slightly higher for more comfortable play area
        s.planeBaseY = Math.max(H * 0.40, H - 300);

        if (!s.initialized) {
            s.initialized = true;
            s.plane = { x: W * 0.5, y: s.planeBaseY, speed: 7, cd: 0, tilt: 0 };
        } else {
            s.plane.y = s.planeBaseY;
            s.plane.tilt = 0;
            if (s.plane.x > W) s.plane.x = W * 0.5;
        }

        // stars
        s.stars = [];
        for (let i = 0; i < 70; i++) {
            s.stars.push({
                x: Math.random() * W,
                y: Math.random() * H,
                speed: 0.2 + Math.random() * 0.8,
                size: Math.random() * 1.6 + 0.4,
            });
        }

        buildText();
    };

    // Main loop
    useEffect(() => {
        buildScene();

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const s = stateRef.current;

        const onResize = () => {
            buildScene();
        };

        const handleKeyDown = (e) => {
            if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(e.key)) e.preventDefault();
            s.keys[e.key] = true;
        };
        const handleKeyUp = (e) => { s.keys[e.key] = false; };

        const getPos = (e) => {
            const rect = canvas.getBoundingClientRect();
            const cx = e.touches ? e.touches[0].clientX : e.clientX;
            return { x: cx - rect.left };
        };

        const handlePointerDown = (e) => {
            s.touching = true;
            const p = getPos(e.nativeEvent || e);
            s.plane.x = p.x;
        };
        const handlePointerMove = (e) => {
            if (!s.touching) return;
            const p = getPos(e.nativeEvent || e);
            s.plane.x = p.x;
        };
        const handlePointerUp = () => { s.touching = false; };
        const handlePointerLeave = () => { s.touching = false; };

        canvas.addEventListener('pointerdown', handlePointerDown);
        canvas.addEventListener('pointermove', handlePointerMove);
        canvas.addEventListener('pointerup', handlePointerUp);
        canvas.addEventListener('pointerleave', handlePointerLeave);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('resize', onResize);

        const loop = () => {
            s.animId = requestAnimationFrame(loop);
            const W = s.W, H = s.H, dpr = s.dpr;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, W, H);

            // background
            ctx.fillStyle = isDark ? '#0a0a0f' : '#ffffff';
            ctx.fillRect(0, 0, W, H);

            // stars (retro space feeling, subtle)
            s.stars.forEach(st => {
                st.y += st.speed;
                if (st.y > H) { st.y = -2; st.x = Math.random() * W; }
                ctx.fillStyle = isDark ? `rgba(255,255,255,${0.25 + st.speed*0.15})` : `rgba(60,70,90,${0.2 + st.speed*0.12})`;
                ctx.beginPath();
                ctx.arc(st.x, st.y, st.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // ---- draw words as solid block (background word) ----
            // Draw each word by blitting its particles' "home" cells is expensive. Instead draw a subtle
            // "grid target" version: we draw the not-yet-free particles directly (cheap since we only
            // advance particles that are free).
            // We redraw ALL particles every frame; to keep it fast we only draw non-free ones as solid
            // dots, then free ones as moving debris.
            const freeParts = [];
            s.parts.forEach(p => {
                if (p.free) {
                    freeParts.push(p);
                } else {
                    ctx.fillStyle = p.color;
                    ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
                }
            });

            // ---- bullets ----
            ctx.fillStyle = '#22d3ee';
            s.bullets.forEach(b => {
                b.y -= 9;
                ctx.fillRect(b.x - 1.5, b.y - 8, 3, 12);
            });
            s.bullets = s.bullets.filter(b => b.y > -20);
            s.bullets.forEach(b => {
                // collision with particles
                for (let i = 0; i < s.parts.length; i++) {
                    const p = s.parts[i];
                    if (p.free) continue;
                    const dx = b.x - p.x;
                    const dy = b.y - p.y;
                    if (dx * dx + dy * dy < (p.size + 6) * (p.size + 6)) {
                        p.free = true;
                        const ang = Math.atan2(p.y - b.y, p.x - b.x);
                        const sp = 2 + Math.random() * 4;
                        p.vx = Math.cos(ang) * sp;
                        p.vy = Math.sin(ang) * sp - 1;
                    }
                }
            });

            // ---- plane (left/right only) ----
            const pl = s.plane;
            pl.y = s.planeBaseY;
            s.frame++;
            let dir = 0;
            if (s.keys['ArrowLeft'] || s.keys['a'] || s.keys['A']) { pl.x -= pl.speed; dir = -1; }
            if (s.keys['ArrowRight'] || s.keys['d'] || s.keys['D']) { pl.x += pl.speed; dir = 1; }
            pl.x = Math.max(20, Math.min(W - 20, pl.x));
            pl.tilt += (dir * 1.2 - pl.tilt) * 0.25; // smooth tilt while moving

            // firing: space OR touching
            pl.cd--;
            s.firing = (s.keys[' '] || s.touching);
            if (s.firing && pl.cd <= 0) {
                s.bullets.push({ x: pl.x, y: pl.y - 18, vx: 0 });
                pl.cd = 10;
            }

            drawPlane(ctx, pl.x, pl.y, pl.tilt, s.frame, s.firing, isDark);

            // ---- debris physics ----
            freeParts.forEach(p => {
                p.vy += 0.12; // gravity
                p.vx *= 0.99;
                p.x += p.vx;
                p.y += p.vy;
                ctx.fillStyle = p.color;
                ctx.globalAlpha = clamp(1 - (p.y / H), 0.15, 1);
                ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
            });
            ctx.globalAlpha = 1;
        };

        loop();

        return () => {
            cancelAnimationFrame(s.animId);
            canvas.removeEventListener('pointerdown', handlePointerDown);
            canvas.removeEventListener('pointermove', handlePointerMove);
            canvas.removeEventListener('pointerup', handlePointerUp);
            canvas.removeEventListener('pointerleave', handlePointerLeave);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('resize', onResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDark]);

    // Rebuild text when language changes
    useEffect(() => {
        buildScene();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language, t.word1, t.word2, t.word3]);

    return (
        <section ref={containerRef} className="relative bg-bg-primary overflow-hidden">
            {/* Full-screen interactive game area */}
            <div className="sticky top-0 h-screen w-full">
                {/* Canvas responsible for words + plane + effects */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full block touch-none select-none cursor-crosshair"
                />

                {/* Brand + role label — clear gap below navbar */}
                <div className="absolute top-[8.5rem] inset-x-0 text-center z-10 pointer-events-none px-6">
                    <span className="text-accent-pink font-mono text-xs md:text-sm tracking-[0.3em] uppercase inline-block">
                        {t.role}
                    </span>
                </div>

                {/* Instructions pill (bottom-left, inside game area) */}
                <div className="absolute bottom-8 left-6 md:left-20 z-10 pointer-events-none hidden sm:flex flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                        {language === 'en' ? 'Shoot the words with your ship' : 'Tembak kata-kata dengan pesawatmu'}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                        {language === 'en' ? 'Desktop: ← → + Space · Mobile: touch / drag' : 'Desktop: ← → + Spasi · Mobile: sentuh / seret'}
                    </span>
                </div>

                {/* Scroll hint bottom-center */}
                <div className="absolute bottom-8 inset-x-0 text-center z-10 pointer-events-none">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted opacity-60">
                        {language === 'en' ? '↓ Scroll for stats' : '↓ Gulir untuk statistik'}
                    </span>
                </div>
            </div>

            {/* Stats section — below the game viewport */}
            <div className="relative z-10 bg-bg-primary px-6 md:px-20 py-16 border-t border-border">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-16 max-w-5xl">
                    <div className="flex flex-col gap-1.5">
                        <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">{t.expLabel}</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl md:text-5xl font-bold text-text-primary">{t.expValue || '2.5'}</span>
                            <span className="text-base md:text-lg font-medium text-text-secondary uppercase">{t.expUnits}</span>
                        </div>
                        <p className="text-xs text-text-muted leading-relaxed max-w-[280px]">{t.expDesc}</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">{t.collabLabel}</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl md:text-5xl font-bold text-text-primary">06</span>
                            <span className="text-base md:text-lg font-medium text-text-secondary uppercase">{t.collabUnits}</span>
                        </div>
                        <p className="text-xs text-text-muted leading-relaxed max-w-[280px]">{t.collabDesc}</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">{t.execLabel}</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl md:text-5xl font-bold text-text-primary">05+</span>
                            <span className="text-base md:text-lg font-medium text-text-secondary uppercase">{t.execUnits}</span>
                        </div>
                        <p className="text-xs text-text-muted leading-relaxed max-w-[280px]">{t.execDesc}</p>
                    </div>
                </div>
            </div>

            {/* Background accent lines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-0">
                <div className="absolute left-[10%] top-0 w-px h-full bg-text-primary" />
                <div className="absolute left-[30%] top-0 w-px h-full bg-text-primary" />
                <div className="absolute left-[50%] top-0 w-px h-full bg-text-primary" />
                <div className="absolute left-[70%] top-0 w-px h-full bg-text-primary" />
                <div className="absolute left-[90%] top-0 w-px h-full bg-text-primary" />
            </div>
        </section>
    );
};

// Pixel-art sprite (faces up). Chars: . empty · B body (grey) · D dark shading · C cockpit · F flame (animated)
const PLANE_SPRITE = [
    '......BB......',
    '.....BCCB.....',
    '.....BCCB.....',
    '....BBCCBB....',
    '..DBBBBBBBBD..',
    '.DBBBBBBBBBBD.',
    '.BBBBBBBBBBBB.',
    '.BBBBBBBBBBBB.',
    '..BBBBBBBBBB..',
    '...BFFFFFFB...',
    '...FFFFFFFF...',
    '....FFFFFF....',
    '.....FFFF.....',
];

function drawPlane(ctx, x, y, tilt, frame, firing, isDark) {
    const sprite = PLANE_SPRITE;
    const rows = sprite.length;
    const cols = sprite[0].length;
    const ps = 2.5; // pixel size (smaller plane)

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(tilt); // interactive banking while moving

    const body = isDark ? '#c4c4c8' : '#71717a';
    const dark = isDark ? '#8e8e94' : '#3f3f46';
    const cockpit = isDark ? '#f4f4f5' : '#18181b';
    const flameLight = '#fbbf24';
    const flameDeep = '#f97316';

    const flameMaxRow = firing ? rows - 1 : rows - 3; // longer flame while firing
    const flicker = (Math.sin(frame * 0.6) > 0 ? 1 : 0);

    const x0 = -((cols * ps) / 2);
    const y0 = -((rows * ps) / 2);

    ctx.shadowColor = 'rgba(140,140,150,0.5)';
    ctx.shadowBlur = 8;

    for (let r = 0; r < rows; r++) {
        const row = sprite[r];
        for (let c = 0; c < cols; c++) {
            const ch = row[c];
            if (ch === '.') continue;
            const px = x0 + c * ps;
            const py = y0 + r * ps;

            if (ch === 'B') { ctx.fillStyle = body; }
            else if (ch === 'D') { ctx.fillStyle = dark; }
            else if (ch === 'C') { ctx.fillStyle = cockpit; }
            else if (ch === 'F') {
                // animated flame: skip frames above the current flame length
                const rel = rows - 1 - r;
                if (rel > flameMaxRow) continue;
                ctx.fillStyle = rel <= 1 ? flameDeep : flameLight;
                const w = ps;
                // flicker trims the outer column on alternating frames for a burning tip
                const h = ps - (rel <= 0 ? flicker : 0);
                ctx.fillRect(px, py, w, Math.max(h, 1));
                continue;
            }
            ctx.fillRect(px, py, ps, ps);
        }
    }

    ctx.restore();
}

function clamp(v, min, max) {
    return v < min ? min : v > max ? max : v;
}

export default HeroShooter;
