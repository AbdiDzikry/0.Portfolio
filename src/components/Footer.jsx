import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const Footer = () => {
    const { language } = useLanguage();
    const t = translations[language].footer;

    return (
        <footer className="w-full py-8 text-center flex justify-center pb-24 md:pb-8">
            <div className="bg-white border border-border/50 rounded-full px-6 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.15)] transition-all duration-300 inline-flex flex-col md:flex-row items-center gap-2 md:gap-4">
                <p className="text-xs text-zinc-500 font-mono">
                    &copy; 2026 {t.builtBy}
                </p>
                <a
                    href="https://www.linkedin.com/in/sulthan-abdi-dzikry/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-accent-green hover:text-accent-green/80 transition-colors px-3 py-1 bg-zinc-50 rounded-full"
                >
                    Sulthan A. Dzikry
                </a>
            </div>
        </footer>
    );
};

export default Footer;
