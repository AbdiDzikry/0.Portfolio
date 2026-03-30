import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './ProjectCard.css';

const MotionLink = motion.create(Link);

const ProjectCard = ({ id, title, category, description, tags, image, size = 'medium', viewMode = 'grid' }) => {
    const isList = viewMode === 'list';
    const ref = useRef(null);

    // Motion values for 3D Tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring smoothing for tilt
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    // Calculate rotation based on mouse position
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    // Spotlight position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;

        // Calculate (x, y) as relative range [-0.5, 0.5] for tilt
        const xPct = (mouseXPos / width) - 0.5;
        const yPct = (mouseYPos / height) - 0.5;

        x.set(xPct);
        y.set(yPct);

        // Set raw pixel position for spotlight
        mouseX.set(mouseXPos);
        mouseY.set(mouseYPos);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <MotionLink
            ref={ref}
            to={`/projects/${id}`}
            className={`project-card group block h-full relative bg-bg-card rounded-xl border border-border/50 ${isList ? 'list-view flex flex-row items-center' : 'flex flex-col'}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: isList ? 0 : rotateX, // Disable tilt in list view for better UX
                rotateY: isList ? 0 : rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ y: 0 }}
            whileHover={{ y: -5 }} // Slight lift is enough with 3D effect
        >
            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-50"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([latestX, latestY]) => `radial-gradient(600px circle at ${latestX}px ${latestY}px, rgba(16, 185, 129, 0.1), transparent 40%)`
                    ),
                }}
            />

            {/* Glow Effect Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {image && (
                <div
                    className={`card-image-container relative overflow-hidden shrink-0 ${isList ? 'h-full w-48' : 'h-48 w-full rounded-t-xl'} bg-bg-secondary`}
                >
                    <motion.img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover relative z-10"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-90 z-20"></div>
                </div>
            )}

            <div
                className={`card-content p-6 flex flex-col flex-1 relative z-10 ${isList ? 'justify-center' : ''}`}
                style={{ transform: "translateZ(30px)" }} // Content floats even higher
            >
                <div className="card-header flex justify-between items-start mb-2">
                    <span className="category-tag mono text-[10px] text-accent-blue uppercase tracking-widest border border-accent-blue/20 px-2 py-1 rounded-md bg-accent-blue/5 backdrop-blur-sm group-hover:bg-accent-blue/10 group-hover:border-accent-blue/50 transition-colors">
                        {category}
                    </span>
                    <motion.div
                        className={`p-2 rounded-full bg-bg-secondary text-text-muted group-hover:text-accent-blue group-hover:bg-accent-blue/10 ${isList ? 'hidden md:block' : ''}`}
                        whileHover={{ rotate: 45, scale: 1.1 }}
                    >
                        <ArrowUpRight size={16} />
                    </motion.div>
                </div>

                <div className="card-body flex-1">
                    <h3 className="text-2xl font-display font-bold text-text-primary mb-2 transition-colors group-hover:text-accent-blue">{title}</h3>
                    <p className={`text-text-secondary text-sm leading-relaxed mb-4 ${isList ? 'line-clamp-2 md:line-clamp-none' : 'line-clamp-3'}`}>{description}</p>
                </div>

                <div className={`card-footer ${isList ? 'mt-2' : 'mt-4 pt-4 border-t border-border/50 group-hover:border-accent-blue/30 transition-colors'}`}>
                    <div className="tags flex flex-wrap gap-2">
                        {(tags || []).map((tag, i) => (
                            <span key={i} className="text-[10px] font-mono text-text-muted bg-bg-secondary px-2 py-1 rounded border border-border/50 transition-all duration-300 group-hover:border-accent-blue/30 group-hover:text-accent-blue group-hover:bg-accent-blue/5">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </MotionLink>
    );
};

export default ProjectCard;
