import React from 'react';
import AlienShooter from '../components/AlienShooter';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const Game = () => {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <div className="container mx-auto px-6 md:px-12 lg:px-16 pt-10 min-h-screen flex flex-col">
            <SEO
                title={t.game.metaTitle}
                description={t.game.metaDesc}
            />
            <header className="page-header text-center md:translate-x-14">
                <h1 className="page-title">{t.game.title}</h1>
                <p className="page-subtitle">{t.game.subtitle}</p>
            </header>

            <div className="flex-grow flex items-center justify-center md:translate-x-14">
                <AlienShooter />
            </div>
        </div>
    );
};

export default Game;
