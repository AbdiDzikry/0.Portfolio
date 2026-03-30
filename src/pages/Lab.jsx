import React from 'react';
import Game2048 from '../components/Game2048';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const Lab = () => {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <div className="container mx-auto px-6 md:px-12 lg:px-16 pt-10 min-h-screen flex flex-col">
            <SEO
                title={t.lab.metaTitle}
                description={t.lab.metaDesc}
            />
            <header className="page-header text-center md:translate-x-14">
                <h1 className="page-title">{t.lab.title}</h1>
                <p className="page-subtitle">{t.lab.subtitle}</p>
            </header>

            <div className="flex-grow flex items-center justify-center md:translate-x-14">
                <Game2048 />
            </div>
        </div>
    );
};

export default Lab;
