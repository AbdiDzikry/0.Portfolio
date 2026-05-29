import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Globe, Menu, X, MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import './Navbar.css';

const Navbar = ({ onChatToggle }) => {
    const { theme, toggleTheme } = useTheme();
    const { language, toggleLanguage } = useLanguage();
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const t = translations[language];

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
            setIsMenuOpen(false);
        } else {
            setHidden(false);
        }
    });

    const navbarVariants = {
        visible: {
            y: 0,
            x: "-50%",
            opacity: 1,
            transition: { duration: 0.35, ease: "easeInOut" }
        },
        hidden: {
            y: -100,
            x: "-50%",
            opacity: 0,
            transition: { duration: 0.35, ease: "easeInOut" }
        }
    };

    const menuVariants = {
        closed: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.2 }
        },
        open: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, staggerChildren: 0.1 }
        }
    };

    return (
        <motion.nav
            variants={navbarVariants}
            initial="visible"
            animate={hidden ? "hidden" : "visible"}
            className="fixed top-6 left-1/2 z-50 w-full max-w-[900px] -translate-x-1/2 px-4"
        >
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] px-6 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.1)] flex flex-col transition-all duration-300">
                <div className="flex items-center justify-between w-full">
                    <NavLink to="/" className="text-sm font-bold tracking-tight text-black dark:text-white hover:opacity-100 transition-opacity">
                        <span className="font-mono hidden sm:inline uppercase">Sulthan Abdi Dzikry</span>
                        <span className="font-mono sm:hidden">S.A.D</span>.
                    </NavLink>

                    {/* Desktop Navigation Links (Added back) */}
                    <div className="hidden md:flex items-center gap-6">
                        <NavLink to="/" className={({ isActive }) => `text-xs font-bold uppercase tracking-widest ${isActive ? 'text-black' : 'text-zinc-400 hover:text-black'} transition-colors`}>{t.nav.home}</NavLink>
                        <NavLink to="/profile" className={({ isActive }) => `text-xs font-bold uppercase tracking-widest ${isActive ? 'text-black' : 'text-zinc-400 hover:text-black'} transition-colors`}>{t.nav.profile}</NavLink>
                        <NavLink to="/projects" className={({ isActive }) => `text-xs font-bold uppercase tracking-widest ${isActive ? 'text-black' : 'text-zinc-400 hover:text-black'} transition-colors`}>{t.nav.projects}</NavLink>
                        <NavLink to="/case-studies" className={({ isActive }) => `text-xs font-bold uppercase tracking-widest ${isActive ? 'text-black' : 'text-zinc-400 hover:text-black'} transition-colors`}>{t.nav.caseStudies}</NavLink>
                        <NavLink to="/tools" className={({ isActive }) => `text-xs font-bold uppercase tracking-widest ${isActive ? 'text-black' : 'text-zinc-400 hover:text-black'} transition-colors`}>{t.nav.tools}</NavLink>
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={onChatToggle}
                            className="p-2 rounded-full hover:bg-zinc-100 transition-colors group hidden md:flex"
                            aria-label="Chat"
                        >
                            <MessageSquare className="w-5 h-5 text-zinc-500 group-hover:text-black" />
                        </button>

                        <button
                            onClick={toggleLanguage}
                            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-100 transition-colors border border-zinc-100 dark:border-zinc-800"
                            aria-label="Toggle Language"
                        >
                            <span className="text-[11px] font-black font-mono text-black dark:text-white uppercase leading-none">
                                {language === 'en' ? 'EN' : 'ID'}
                            </span>
                        </button>

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-zinc-100 transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-amber-500" />
                            ) : (
                                <Moon className="w-5 h-5 text-zinc-500" />
                            )}
                        </button>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors md:hidden"
                            aria-label="Toggle Menu"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6 text-black dark:text-white" />
                            ) : (
                                <Menu className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
                            )}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="pt-4 pb-2 flex flex-col gap-1 border-t border-zinc-100 dark:border-zinc-800 mt-3"
                        >
                            <MobileNavItem to="/">{t.nav.home}</MobileNavItem>
                            <MobileNavItem to="/profile">{t.nav.profile}</MobileNavItem>
                            <MobileNavItem to="/projects">{t.nav.projects}</MobileNavItem>
                            <MobileNavItem to="/case-studies">{t.nav.caseStudies}</MobileNavItem>
                            <MobileNavItem to="/tools">{t.nav.tools}</MobileNavItem>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

const MobileNavItem = ({ to, children }) => (
    <NavLink to={to} className={({ isActive }) =>
        `px-4 py-3 rounded-xl text-base font-normal transition-all duration-300 
        ${isActive ? 'bg-black dark:bg-white text-white dark:text-black' : 'text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'}`
    }>
        {children}
    </NavLink>
);

export default Navbar;
