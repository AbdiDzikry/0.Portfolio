import { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../data/projects';
import SEO from '../components/SEO';
import './Projects.css';

const Projects = () => {
    const projects = projectsData;
    const [viewMode, setViewMode] = useState('grid');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <>
            <SEO
                title="Projects"
                description="Explore Sulthan Abdi Dzikry's portfolio of coding projects and technical solutions"
            />
            <div className="container mx-auto px-6 md:px-12 lg:px-16 pt-10 min-h-screen">
                <motion.header
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="page-header mb-12"
                >
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h1 className="page-title">Selected Works</h1>
                            <p className="page-subtitle">A collection of coding projects and technical solutions.</p>
                        </div>

                        <div className="flex items-center gap-2 bg-bg-secondary p-1 rounded-lg border border-border/50 mx-auto md:mx-0">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-bg-card shadow text-accent-blue' : 'text-text-muted hover:text-text-primary'}`}
                                aria-label="Grid View"
                            >
                                <LayoutGrid size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-bg-card shadow text-accent-blue' : 'text-text-muted hover:text-text-primary'}`}
                                aria-label="List View"
                            >
                                <List size={20} />
                            </button>
                        </div>
                    </div>
                </motion.header>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className={viewMode === 'grid' ? 'projects-grid' : 'projects-list space-y-6 max-w-4xl mx-auto'}
                >
                    <AnimatePresence mode='wait'>
                        {projects.map((proj, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                layout
                            >
                                <ProjectCard {...proj} viewMode={viewMode} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </>
    );
};

export default Projects;

