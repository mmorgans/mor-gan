import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useDragControls, useReducedMotion } from 'framer-motion';

const InteractiveBio = () => {
    const [activeIdentity, setActiveIdentity] = useState(null);
    const isMobile = useIsMobile();
    const dragControls = useDragControls();
    const prefersReducedMotion = useReducedMotion();

    const toggleIdentity = (identity) => {
        setActiveIdentity(activeIdentity === identity ? null : identity);
    };

    return (
        <main id="main-content" className="min-h-screen flex items-start justify-center p-8 pt-24 md:pt-48 bg-white selection:bg-gray-100 selection:text-black relative">

            {/* Mobile Backdrop - Closes drawer on click */}
            {/* z-40 ensures it's above main content but below the drawer */}
            <AnimatePresence>
                {activeIdentity && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveIdentity(null)}
                        className="fixed inset-0 bg-zinc-900/20 z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start">
                {/* Main Headline - Sticky on Desktop */}
                <div className="md:col-span-7 md:sticky md:top-32">
                    <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-zinc-900 leading-tight text-left">
                        Hi, I'm
                        <br />
                        Morgan Salisbury.
                        <br className="mt-8 block" />
                        I am a{' '}
                        <span className="whitespace-nowrap">
                            <SimpleTrigger
                                label="journalist"
                                isActive={activeIdentity === 'journalist'}
                                onClick={() => toggleIdentity('journalist')}
                            />
                            , an{' '}
                            <SimpleTrigger
                                label="advocate"
                                isActive={activeIdentity === 'advocate'}
                                onClick={() => toggleIdentity('advocate')}
                            />
                        </span>
                        , and a{' '}
                        <SimpleTrigger
                            label="student"
                            isActive={activeIdentity === 'student'}
                            onClick={() => toggleIdentity('student')}
                        />
                        .
                        <br className="mt-8 block" />
                        Here's my{' '}
                        <SimpleTrigger
                            label="resume"
                            isActive={activeIdentity === 'resume'}
                            onClick={() => toggleIdentity('resume')}
                        />
                        .
                        <br />
                        I would love to
                        <br />
                        <a
                            href="mailto:morgan@mor-gan.com"
                            className="text-zinc-500 hover:text-zinc-800 cursor-pointer transition-all duration-200 decoration-zinc-300 hover:underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:outline-none rounded-sm"
                        >
                            work together
                        </a>
                        !
                    </h1>
                </div>

                {/* Content Area - Bottom Drawer on Mobile, Side Column on Desktop */}
                {/* z-50 ensures the drawer is above the mobile backdrop and all other content */}
                <motion.div
                    id="bio-content"
                    role="region"
                    aria-live="polite"
                    className={`
                        fixed bottom-0 left-0 right-0 z-50 bg-white p-8 pb-12 rounded-t-[2rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] border-t border-zinc-100 max-h-[85vh] overflow-y-auto
                        md:relative md:inset-auto md:col-span-5 md:bg-transparent md:p-0 md:shadow-none md:border-none md:max-h-none md:overflow-visible md:mt-2
                    `}
                    // Mobile: Animates drawer up/down. Desktop: Stays in place.
                    animate={isMobile ? (activeIdentity ? { y: 0 } : { y: "110%" }) : { y: 0 }}
                    initial={false}
                    transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", damping: 25, stiffness: 350 }}
                    // Enable drag only on mobile for vertical dismissal
                    drag={isMobile ? "y" : false}
                    dragListener={false}
                    dragControls={dragControls}
                    // Constraints prevent dragging upwards or past the initial position
                    dragConstraints={{ top: 0, bottom: 0 }}
                    // Higher elasticity makes the drag feel more responsive and fluid
                    dragElastic={{ top: 0.1, bottom: 0.6 }}
                    onDragEnd={(event, info) => {
                        // Lower velocity threshold for easier flick dismissal
                        if (info.offset.y > 80 || info.velocity.y > 400) {
                            setActiveIdentity(null);
                        }
                    }}
                >
                    {/* Mobile Close Handle/Button */}
                    <div
                        className="md:hidden w-full flex justify-center py-4 -mt-4 mb-2 cursor-grab touch-none"
                        onPointerDown={(e) => dragControls.start(e)}
                        role="button"
                        aria-label="Drag down to close panel"
                        tabIndex={0}
                    >
                        <div className="w-12 h-1.5 bg-zinc-200 rounded-full" />
                    </div>

                    <AnimatePresence mode="wait">
                        {activeIdentity && BIO_CONTENT[activeIdentity] && (
                            <motion.div
                                key={activeIdentity}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="space-y-6"
                            >
                                {BIO_CONTENT[activeIdentity].component ? (
                                    BIO_CONTENT[activeIdentity].component
                                ) : (
                                    <>
                                        {/* Standard Text Content */}
                                        <p className="text-xl md:text-2xl text-zinc-600 font-serif leading-relaxed">
                                            {BIO_CONTENT[activeIdentity].text}
                                        </p>

                                        {/* Optional Actions/Links */}
                                        {BIO_CONTENT[activeIdentity].links && (
                                            <div className="pt-2">
                                                {BIO_CONTENT[activeIdentity].linksTitle && (
                                                    <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
                                                        {BIO_CONTENT[activeIdentity].linksTitle}
                                                    </h3>
                                                )}
                                                <div className="flex flex-col gap-3 text-zinc-500 font-serif text-lg">
                                                    {BIO_CONTENT[activeIdentity].links.map((link, i) => (
                                                        <a
                                                            key={i}
                                                            href={link.url}
                                                            target={link.external ? "_blank" : undefined}
                                                            rel={link.external ? "noopener noreferrer" : undefined}
                                                            className="hover:text-zinc-900 transition-colors w-max hover:underline decoration-zinc-300 underline-offset-4 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:outline-none rounded-sm"
                                                        >
                                                            {link.label} {link.external && '↗'}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </main >
    );
};

const SimpleTrigger = ({ label, isActive, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-expanded={isActive}
            aria-controls="bio-content"
            className={`
                cursor-pointer transition-all duration-200 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:outline-none rounded-sm
                ${isActive ? 'text-zinc-900 underline decoration-zinc-900 decoration-2 underline-offset-4' : 'text-zinc-500 hover:text-zinc-800'}
            `}
        >
            {label}
        </button>
    );
};

// --- Data & Helpers ---

/**
 * Hook to detect mobile view with debounce for performance
 */
const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        let timeoutId;
        const checkMobile = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        const debouncedCheck = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(checkMobile, 100);
        };

        checkMobile();
        window.addEventListener('resize', debouncedCheck);
        return () => {
            window.removeEventListener('resize', debouncedCheck);
            clearTimeout(timeoutId);
        };
    }, [breakpoint]);

    return isMobile;
};

const BIO_CONTENT = {
    journalist: {
        text: "I’m a visual storyteller studying Journalism and Political Science. As a high school Editor-in-Chief and Broadcast Producer for student press, I used every medium available to me to make stories accessible and hold power accountable. My work started the federal civil rights lawsuit I am now fighting.",
        links: [
        ]
    },
    advocate: {
        text: "I believe privacy is a human right. Alongside two colleagues, I initiated a federal lawsuit challenging algorithmic surveillance in our former school district. I’ve lectured on surveillance at the University of Kansas and presented at the National Scholastic Press Association. We continue to advocate for students, and our fight has been the subject of reporting by The Washington Post, the Associated Press, and The New York Times.",
        linksTitle: "Featured In",
        links: [
            { label: "The Washington Post", url: "https://www.washingtonpost.com/nation/2025/09/24/students-lawsuit-ai-tool-gaggle/", external: true },
            { label: "Associated Press", url: "https://apnews.com/article/ai-school-surveillance-gaggle-goguardian-bark-8c531cde8f9aee0b1ef06cfce109724a", external: true },
            { label: "The New York Times", url: "https://www.nytimes.com/2024/12/18/learning/should-schools-spy-on-student-devices-to-prevent-self-harm.html", external: true }
        ]
    },
    student: {
        text: "I study Multimedia Journalism and Political Science at the University of Kansas. I am an Undergraduate Research Fellow, where I do soil analysis and model massive datasets in R and Google Earth Engine. I also founded Morgan Consulting, where I build custom hardware and provide consultation and support to make technology accessible for everyone.",
        links: [
            { label: "Morgan Consulting", url: "https://consulting.mor-gan.com", external: true },
            { label: "Lab Docs", url: "https://docs.mor-gan.com", external: true }
        ]
    },
    resume: {
        // Resume has a unique layout, so we render a custom component structure
        component: (
            <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-8">
                    <a href="/Morgan_Salisbury_Resume.pdf" download className="bg-zinc-900 text-white px-8 py-4 rounded-full font-sans text-sm font-medium tracking-wide hover:bg-zinc-700 transition-colors shadow-lg shadow-zinc-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-900 focus-visible:outline-none">
                        Download PDF
                    </a>
                    <span className="text-zinc-400 italic font-serif">Jan 2026</span>
                </div>

                <div className="grid grid-cols-1 gap-8 text-zinc-600">
                    <div>
                        <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Competencies</h3>
                        <ul className="space-y-2 font-serif text-lg">
                            <li>Scientific Data Analysis</li>
                            <li>IT Infrastructure & Support</li>
                            <li>Multimedia Storytelling</li>
                            <li>Investigative Journalism</li>
                            <li>Civic Advocacy & Policy</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Recognitions</h3>
                        <ul className="space-y-2 font-serif text-lg">
                            <li>Featured: New York Times</li>
                            <li>Finalist: SPLC Courage in Student Journalism Award</li>
                            <li>Speaker: NSPA National Conference</li>
                            <li>Research Fellow: Oregon State University & The University of Kansas</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
};

export default InteractiveBio;
