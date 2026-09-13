import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, FileText, Sun, Moon, MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const NavbarVertical = ({ onChatToggle }) => {
    const { theme, toggleTheme } = useTheme();
    const { language, toggleLanguage } = useLanguage();
    const t = translations[language];

    return (
        <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-8 py-8 px-2" 
        >
            {/* Floating Pill Container - Forced White */}
            <div className="bg-white border border-zinc-200 rounded-full py-8 px-2 shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col items-center gap-6">
                <NavIcon to="/" icon={<Home size={18} />} label={t.nav.home} />
                <NavIcon to="/profile" icon={<User size={18} />} label={t.nav.profile} />
                <NavIcon to="/projects" icon={<Briefcase size={18} />} label={t.nav.projects} />
                <NavIcon to="/case-studies" icon={<FileText size={18} />} label={t.nav.caseStudies} />
                
                <div className="w-4 h-[1px] bg-zinc-100 my-1" />

                <button
                    onClick={onChatToggle}
                    className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-black transition-colors"
                >
                    <MessageSquare size={18} />
                </button>
                
                <button
                    onClick={toggleLanguage}
                    className="text-[10px] font-bold font-mono text-zinc-500 hover:text-black transition-colors uppercase"
                >
                    {language}
                </button>

                <button
                    onClick={toggleTheme}
                    className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-black transition-colors"
                >
                    {theme === 'dark' ? <Sun size={18} /> : theme === 'japanese' ? (
                        <span className="w-[14px] h-[14px] rounded-full bg-[#C9413B] inline-block border-2 border-[#A8823C]" />
                    ) : <Moon size={18} />}
                </button>
            </div>
        </motion.nav>
    );
};

const NavIcon = ({ to, icon, label }) => (
    <NavLink to={to} className="relative group">
        {({ isActive }) => (
            <div className="flex items-center justify-center w-10 h-10 relative">
                <span className={`transition-all duration-500 ${isActive ? 'text-black scale-110' : 'text-zinc-400 hover:text-black'}`}>
                    {icon}
                </span>
                {isActive && (
                    <motion.div 
                        layoutId="nav-dot"
                        className="absolute -right-2 w-1 h-1 rounded-full bg-accent-pink"
                    />
                )}
                <span className="absolute right-12 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold uppercase tracking-widest text-black whitespace-nowrap pointer-events-none bg-white px-2 py-1 rounded shadow-sm border border-zinc-100">
                    {label}
                </span>
            </div>
        )}
    </NavLink>
);

export default NavbarVertical;
