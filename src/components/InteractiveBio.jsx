import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import bioData from '../content/bio.json';

// Track prefetched URLs to avoid duplicate requests
const prefetchedUrls = new Set();

// Prefetch using fetch for more reliable caching
const prefetchUrl = (url) => {
    if (prefetchedUrls.has(url)) return;
    prefetchedUrls.add(url);

    // Use fetch with low priority to preload the page
    fetch(url, { priority: 'low' }).catch(() => { });
};

const InteractiveBio = () => {
    const [activeIdentity, setActiveIdentity] = useState(null);
    const isMobile = useIsMobile();
    const prefersReducedMotion = useReducedMotion();

    const toggleIdentity = (identity) => {
        setActiveIdentity(activeIdentity === identity ? null : identity);
    };

    const goBack = () => setActiveIdentity(null);

    // Shared spring transition - high damping for no recoil
    const springTransition = prefersReducedMotion
        ? { duration: 0 }
        : { type: "spring", damping: 40, stiffness: 300 };

    // Mobile slide variants
    const mobileSlideVariants = {
        enter: { x: "100%" },
        center: { x: 0 },
        exit: { x: "100%" }
    };

    return (
        <>
            {/* ==================== MOBILE LAYOUT ==================== */}
            {isMobile && (
                <main id="main-content" className="min-h-screen bg-white selection:bg-gray-100 selection:text-black overflow-hidden">
                    {/* Main View - Slides left when detail is active */}
                    <motion.div
                        className="min-h-screen flex items-center justify-start px-12 py-8"
                        animate={{ x: activeIdentity ? "-100%" : 0 }}
                        transition={springTransition}
                    >
                        <div className="max-w-lg w-full space-y-8">
                            {/* Name Block */}
                            <div className="font-serif text-3xl sm:text-4xl text-zinc-900 leading-tight">
                                Hi, I'm<br />
                                Morgan Salisbury.
                            </div>

                            {/* Identity Block */}
                            <div className="font-serif text-3xl sm:text-4xl text-zinc-900 leading-tight">
                                I am a{' '}
                                <SimpleTrigger
                                    label="journalist"
                                    isActive={activeIdentity === 'journalist'}
                                    onClick={() => toggleIdentity('journalist')}
                                />
                                ,{' '}
                                <span className="whitespace-nowrap">
                                    an{' '}
                                    <SimpleTrigger
                                        label="advocate"
                                        isActive={activeIdentity === 'advocate'}
                                        onClick={() => toggleIdentity('advocate')}
                                    />
                                </span>
                                ,<br />
                                and a{' '}
                                <span className="whitespace-nowrap">
                                    <SimpleTrigger
                                        label="student"
                                        isActive={activeIdentity === 'student'}
                                        onClick={() => toggleIdentity('student')}
                                    />
                                    .
                                </span>
                            </div>

                            {/* Resume Block */}
                            <div className="font-serif text-3xl sm:text-4xl text-zinc-900 leading-tight">
                                Here's my{' '}
                                <span className="whitespace-nowrap">
                                    <SimpleTrigger
                                        label="resume"
                                        isActive={activeIdentity === 'resume'}
                                        onClick={() => toggleIdentity('resume')}
                                    />
                                    .
                                </span>
                            </div>

                            {/* Photos Block */}
                            <div className="font-serif text-3xl sm:text-4xl text-zinc-900 leading-tight">
                                Check out my{' '}
                                <span className="whitespace-nowrap">
                                    <SimpleTrigger
                                        label="photos"
                                        isActive={activeIdentity === 'photos'}
                                        onClick={() => toggleIdentity('photos')}
                                    />
                                    .
                                </span>
                            </div>

                            {/* CTA Block */}
                            <div className="font-serif text-3xl sm:text-4xl text-zinc-900 leading-tight">
                                Want to{' '}
                                <span className="whitespace-nowrap">
                                    <SimpleTrigger
                                        label="get in touch"
                                        isActive={activeIdentity === 'contact'}
                                        onClick={() => toggleIdentity('contact')}
                                    />
                                    ?
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Detail View - Slides in from right */}
                    <AnimatePresence>
                        {activeIdentity && BIO_CONTENT[activeIdentity] && (
                            <motion.div
                                key={activeIdentity}
                                className="fixed inset-0 bg-white z-50"
                                initial="enter"
                                animate="center"
                                exit="exit"
                                variants={mobileSlideVariants}
                                transition={springTransition}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={{ left: 0, right: 0.5 }}
                                onDragEnd={(event, info) => {
                                    // Swipe right to go back
                                    if (info.offset.x > 100 || info.velocity.x > 400) {
                                        goBack();
                                    }
                                }}
                            >
                                {/* Back Button - iOS-style chevron on left edge */}
                                <button
                                    onClick={goBack}
                                    className="fixed left-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 flex items-center justify-center text-zinc-400 hover:text-zinc-600 transition-colors focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:outline-none rounded-full"
                                    aria-label="Go back"
                                >
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="15 18 9 12 15 6" />
                                    </svg>
                                </button>

                                {/* Detail Content */}
                                <div className="min-h-screen flex items-start justify-center p-8 pt-24 pl-16">
                                    <div className="max-w-lg w-full space-y-6">
                                        {BIO_CONTENT[activeIdentity].component ? (
                                            BIO_CONTENT[activeIdentity].component
                                        ) : (
                                            <>
                                                <p className="text-xl text-zinc-600 font-serif leading-relaxed">
                                                    {BIO_CONTENT[activeIdentity].text}
                                                </p>

                                                {BIO_CONTENT[activeIdentity].links && BIO_CONTENT[activeIdentity].links.length > 0 && (
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
                                                                    onMouseEnter={!link.external ? () => prefetchUrl(link.url) : undefined}
                                                                    className="hover:text-zinc-900 transition-colors w-max hover:underline decoration-zinc-300 underline-offset-4 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:outline-none rounded-sm"
                                                                >
                                                                    {link.label} {link.external && <svg className="inline-block w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            )}

            {/* ==================== DESKTOP LAYOUT ==================== */}
            {!isMobile && (
                <main id="main-content" className="min-h-screen flex items-center justify-center px-16 py-8 bg-white selection:bg-gray-100 selection:text-black relative">
                    <div className="max-w-6xl w-full grid grid-cols-12 gap-24 items-start">
                        {/* Main Headline - Sticky */}
                        <div className="col-span-7 sticky top-32 space-y-6">
                            {/* Name Block */}
                            <div className="font-serif text-4xl lg:text-5xl xl:text-6xl text-zinc-900 leading-tight">
                                Hi, I'm<br />
                                Morgan Salisbury.
                            </div>

                            {/* Identity Block */}
                            <div className="font-serif text-4xl lg:text-5xl xl:text-6xl text-zinc-900 leading-tight">
                                I am a{' '}
                                <SimpleTrigger
                                    label="journalist"
                                    isActive={activeIdentity === 'journalist'}
                                    onClick={() => toggleIdentity('journalist')}
                                />
                                ,{' '}
                                <span className="whitespace-nowrap">
                                    an{' '}
                                    <SimpleTrigger
                                        label="advocate"
                                        isActive={activeIdentity === 'advocate'}
                                        onClick={() => toggleIdentity('advocate')}
                                    />
                                </span>
                                ,<br />
                                and a{' '}
                                <span className="whitespace-nowrap">
                                    <SimpleTrigger
                                        label="student"
                                        isActive={activeIdentity === 'student'}
                                        onClick={() => toggleIdentity('student')}
                                    />
                                    .
                                </span>
                            </div>

                            {/* Resume Block */}
                            <div className="font-serif text-4xl lg:text-5xl xl:text-6xl text-zinc-900 leading-tight">
                                Here's my{' '}
                                <span className="whitespace-nowrap">
                                    <SimpleTrigger
                                        label="resume"
                                        isActive={activeIdentity === 'resume'}
                                        onClick={() => toggleIdentity('resume')}
                                    />
                                    .
                                </span>
                            </div>

                            {/* Photos Block */}
                            <div className="font-serif text-4xl lg:text-5xl xl:text-6xl text-zinc-900 leading-tight">
                                Check out my{' '}
                                <span className="whitespace-nowrap">
                                    <SimpleTrigger
                                        label="photos"
                                        isActive={activeIdentity === 'photos'}
                                        onClick={() => toggleIdentity('photos')}
                                    />
                                    .
                                </span>
                            </div>

                            {/* CTA Block */}
                            <div className="font-serif text-4xl lg:text-5xl xl:text-6xl text-zinc-900 leading-tight">
                                Want to{' '}
                                <span className="whitespace-nowrap">
                                    <SimpleTrigger
                                        label="get in touch"
                                        isActive={activeIdentity === 'contact'}
                                        onClick={() => toggleIdentity('contact')}
                                    />
                                    ?
                                </span>
                            </div>
                        </div>

                        {/* Content Area - Side Column */}
                        <div
                            id="bio-content"
                            role="region"
                            aria-live="polite"
                            className="col-span-5 mt-2"
                        >
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
                                                <p className="text-2xl text-zinc-600 font-serif leading-relaxed">
                                                    {BIO_CONTENT[activeIdentity].text}
                                                </p>

                                                {BIO_CONTENT[activeIdentity].links && BIO_CONTENT[activeIdentity].links.length > 0 && (
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
                                                                    onMouseEnter={!link.external ? () => prefetchUrl(link.url) : undefined}
                                                                    className="hover:text-zinc-900 transition-colors w-max hover:underline decoration-zinc-300 underline-offset-4 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:outline-none rounded-sm"
                                                                >
                                                                    {link.label} {link.external && <svg className="inline-block w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>}
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
                        </div>
                    </div>
                </main>
            )}
        </>
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

// Build BIO_CONTENT from JSON data, adding the resume component
const BIO_CONTENT = {
    ...bioData,
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
                            <li>Featured: New York Times, AP, Washington Post, Kansas Reflector</li>
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
