import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PageTransition = ({ children }) => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial="initialState"
                animate="animateState"
                exit="exitState"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // smooth ease out
                variants={{
                    initialState: {
                        opacity: 0,
                        y: 20,
                    },
                    animateState: {
                        opacity: 1,
                        y: 0,
                    },
                    exitState: {
                        opacity: 0,
                        y: -20,
                    }
                }}
                className="w-full h-full"
                onAnimationComplete={() => window.scrollTo(0, 0)}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition;
