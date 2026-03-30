import { useState } from 'react';
import './CaseStudies.css';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { ideasData } from '../data/ideas';

const CaseStudies = () => {
    const { language } = useLanguage();
    const t = translations[language];
    const [activeId, setActiveId] = useState(1);

    // Get localized study content
    const studies = ideasData.map(study => ({
        ...study,
        ...(study.translations?.[language] || {})
    }));

    return (
        <div className="container mx-auto px-6 md:px-12 lg:px-16 pt-10 min-h-screen flex flex-col">
            <SEO
                title={t.ideas.title}
                description={t.ideas.subtitle}
            />
            <header className="page-header text-center md:translate-x-14">
                <h1 className="page-title">{t.ideas.title}</h1>
                <p className="page-subtitle">{t.ideas.subtitle}</p>
            </header>

            <div className="bookshelf">
                {studies.map((study) => (
                    <div
                        key={study.id}
                        className={`book-spine ${activeId === study.id ? 'active' : ''}`}
                        onClick={() => setActiveId(study.id)}
                        style={{ '--spine-color': study.color }}
                    >
                        <div className="spine-content">
                            <span className="spine-title mono">{study.title}</span>
                            <span className="spine-number">0{study.id}</span>
                        </div>

                        <div className="book-cover">
                            <div className="cover-content">
                                <h2 className="cover-title">{study.title}</h2>
                                <h3 className="cover-client">{study.category}</h3>
                                <div className="metric-badge" style={{ color: study.color, borderColor: study.color }}>
                                    {study.status}
                                </div>
                                <p className="cover-desc">{study.description}</p>
                                <button className="read-more-btn">{t.ideas.explore} →</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CaseStudies;
