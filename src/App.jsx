import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import NavbarVertical from './components/NavbarVertical';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import CaseStudies from './pages/CaseStudies';
import Lab from './pages/Lab';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';

function AppContent() {
  const location = useLocation();
  const isStoneBg = location.pathname === '/profile' || location.pathname === '/';
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-bg-primary min-h-screen text-text-primary transition-colors duration-300 font-sans flex flex-col relative">
      <Navbar onChatToggle={() => setIsChatOpen(!isChatOpen)} />
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
            <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
            <Route path="/projects/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
            <Route path="/case-studies" element={<PageTransition><CaseStudies /></PageTransition>} />
            <Route path="/lab" element={<PageTransition><Lab /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <ThemeProvider>
          <Router>
            <AppContent />
          </Router>
        </ThemeProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
