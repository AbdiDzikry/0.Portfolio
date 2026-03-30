import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const HeroV2 = () => {
    const { language } = useLanguage();
    const t = translations[language].hero;
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yScroll = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    const AnimatedWord = ({ word, delayIndex = 0, className = "" }) => {
        if (!word) return null;
        const characters = word.split("");
        
        return (
            <span className={`flex ${className}`}>
                {characters.map((char, i) => {
                    const start = (delayIndex * 0.1) + (i * 0.02);
                    const end = start + 0.15;
                    
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const charY = useTransform(scrollYProgress, [start, end], [0, -150], { clamp: true });
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const charOpacity = useTransform(scrollYProgress, [start, end], [1, 0], { clamp: true });

                    return (
                        <div key={i} className="overflow-hidden">
                            <motion.span
                                initial={{ y: "150%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ 
                                    duration: 0.8, 
                                    delay: 0.5 + (delayIndex * 0.2) + (i * 0.04), 
                                    ease: [0.33, 1, 0.68, 1] 
                                }}
                                style={{ y: charY, opacity: charOpacity }}
                                className="inline-block"
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        </div>
                    );
                })}
            </span>
        );
    };


    return (
        <section ref={containerRef} className="relative min-h-[180vh] bg-bg-primary pt-16 pb-20 px-6 md:px-20 overflow-hidden">
            {/* Sticky Hero Container */}
            <div className="sticky top-14 h-[80vh] flex flex-col justify-start">
                <motion.div style={{ opacity: opacityHero }} className="max-w-[1400px] w-full">
                    <div className="flex flex-col">
                        <motion.span 
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                            className="text-accent-pink font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-2 block ml-2"
                        >
                            {t.role}
                        </motion.span>
                        
                        <div className="relative">
                            <h1 className="big-text text-text-primary select-none flex flex-col leading-[0.9]">
                                <span className="text-reveal">
                                    <AnimatedWord word={t.word1} delayIndex={0} />
                                </span>
                                <span className="text-reveal md:ml-[10%]">
                                    <AnimatedWord word={t.word2} delayIndex={1} className="text-accent-pink outline-text" />
                                </span>
                                <span className="text-reveal md:ml-[20%]">
                                    <AnimatedWord word={t.word3} delayIndex={2} />
                                </span>
                            </h1>
                        </div>
                    </div>
                </motion.div>
            </div>


            {/* Experience / Impact Section (Scrolls up over the hero) */}
            <div className="relative z-10 mt-[20vh] grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 border-t border-border pt-20">
                <div className="flex flex-col gap-4">
                    <span className="font-mono text-xs text-text-muted uppercase tracking-widest">{t.expLabel}</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-6xl font-bold text-text-primary">2.5</span>
                        <span className="text-xl font-medium text-text-secondary uppercase">{t.expUnits}</span>
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed max-w-[280px]">
                        {t.expDesc}
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <span className="font-mono text-xs text-text-muted uppercase tracking-widest">{t.collabLabel}</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-6xl font-bold text-text-primary">06</span>
                        <span className="text-xl font-medium text-text-secondary uppercase">{t.collabUnits}</span>
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed max-w-[280px]">
                        {t.collabDesc}
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <span className="font-mono text-xs text-text-muted uppercase tracking-widest">{t.execLabel}</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-6xl font-bold text-text-primary">05+</span>
                        <span className="text-xl font-medium text-text-secondary uppercase">{t.execUnits}</span>
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed max-w-[280px]">
                        {t.execDesc}
                    </p>
                </div>
            </div>

            {/* Background Accent Lines (Flow-like) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-0">
                <div className="absolute left-[10%] top-0 w-px h-full bg-text-primary" />
                <div className="absolute left-[30%] top-0 w-px h-full bg-text-primary" />
                <div className="absolute left-[50%] top-0 w-px h-full bg-text-primary" />
                <div className="absolute left-[70%] top-0 w-px h-full bg-text-primary" />
                <div className="absolute left-[90%] top-0 w-px h-full bg-text-primary" />
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .outline-text {
                    -webkit-text-stroke: 1.5px currentColor;
                    color: transparent;
                }
                .dark .outline-text {
                    -webkit-text-stroke: 1px currentColor;
                }
            `}} />
        </section>
    );
};

export default HeroV2;
