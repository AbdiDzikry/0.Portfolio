import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const themeOptions = ['light', 'dark', 'japanese'];

export const ThemeProvider = ({ children }) => {
    // Check localStorage or system preference on initial load
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
            const saved = localStorage.getItem('theme');
            if (themeOptions.includes(saved)) return saved;
        }
        if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light'; // Default to light if no preference
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark', 'japanese');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => {
            const idx = themeOptions.indexOf(prev);
            return themeOptions[(idx + 1) % themeOptions.length];
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext) || { theme: 'dark', toggleTheme: () => {} };
