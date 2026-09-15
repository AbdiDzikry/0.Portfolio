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
import ProfileV2 from './pages/ProfileV2';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import ProjectKaizen from './pages/ProjectKaizen';
import CaseStudies from './pages/CaseStudies';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Lab from './pages/Lab';
import Game from './pages/Game';
import Presentation from './pages/Presentation';
import NonconformityPresentation from './pages/NonconformityPresentation';
import StoryPresentation from './pages/StoryPresentation';
import Tools from './pages/Tools';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';

function AppContent() {
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-bg-primary min-h-screen text-text-primary transition-colors duration-300 font-sans flex flex-col relative">
      <Navbar onChatToggle={() => setIsChatOpen(!isChatOpen)} />
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
            <Route path="/profile-v2" element={<PageTransition><ProfileV2 /></PageTransition>} />
            <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
            <Route path="/projects/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
            <Route path="/projects/:id/kaizen" element={<PageTransition><ProjectKaizen /></PageTransition>} />
            <Route path="/case-studies" element={<PageTransition><CaseStudies /></PageTransition>} />
            <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
            <Route path="/blog/:id" element={<PageTransition><BlogPost /></PageTransition>} />
            <Route path="/lab" element={<PageTransition><Lab /></PageTransition>} />
            <Route path="/game" element={<PageTransition><Game /></PageTransition>} />
            <Route path="/tools" element={<PageTransition><Tools /></PageTransition>} />
            <Route path="/presentation" element={<Presentation />} />
            <Route path="/presentation/nonconformity" element={<NonconformityPresentation />} />
            <Route path="/presentation/who-i-become" element={<StoryPresentation />} />
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
