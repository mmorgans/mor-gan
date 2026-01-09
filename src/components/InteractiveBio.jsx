import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveBio = () => {
    const [activeIdentity, setActiveIdentity] = useState(null);

    const toggleIdentity = (identity) => {
        setActiveIdentity(activeIdentity === identity ? null : identity);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-white selection:bg-gray-100 selection:text-black">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start">
                {/* Main Headline - Sticky on Desktop */}
                <div className="md:col-span-7 md:sticky md:top-32">
                    <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-zinc-900 leading-tight text-left">
                        Hi, I'm Morgan Salisbury.
                        <br className="mt-8 block" />
                        I am a{' '}
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
                        . I would love to{' '}
                        <SimpleTrigger
                            label="work together"
                            isActive={activeIdentity === 'contact'}
                            onClick={() => toggleIdentity('contact')}
                        />
                        !
                    </h1>
                </div>

                {/* Content Area - Appears to the right on Desktop */}
                <div className="md:col-span-5 relative mt-8 md:mt-2 min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {activeIdentity === 'journalist' && (
                            <motion.div
                                key="journalist"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="space-y-6"
                            >
                                <p className="text-xl md:text-2xl text-zinc-600 font-serif leading-relaxed">
                                    I am a visual storyteller and data journalist at the University of Kansas (4.0 GPA). I combine rigorous investigation with multimedia design to uncover the systems that govern our lives—transforming complex data into human narratives.
                                </p>
                                <a href="#portfolio" className="inline-block text-sm font-semibold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 hover:border-zinc-900 transition-colors">
                                    View Portfolio
                                </a>
                            </motion.div>
                        )}

                        {activeIdentity === 'advocate' && (
                            <motion.div
                                key="advocate"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="space-y-8"
                            >
                                <p className="text-xl md:text-2xl text-zinc-600 font-serif leading-relaxed">
                                    I believe that privacy is a civil right. I am a lead plaintiff in a federal civil rights lawsuit against my former school district for their use of invasive student surveillance software.
                                </p>
                                <div>
                                    <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Featured In</h3>
                                    <div className="flex flex-col gap-3 text-zinc-500 font-serif text-lg">
                                        <span>60 Minutes</span>
                                        <span>The New York Times</span>
                                        <span>Washington Post</span>
                                        <span>AP</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeIdentity === 'student' && (
                            <motion.div
                                key="student"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="space-y-6"
                            >
                                <p className="text-xl md:text-2xl text-zinc-600 font-serif leading-relaxed">
                                    I stand at the intersection of policy and technology. I don't just study political science; I build tools for it. From rapid-prototyping hardware solutions as President of Morgan Consulting to managing research data, I turn technical skill into solved problems.
                                </p>
                                <div className="flex flex-col gap-4 text-base font-sans pt-4">
                                    <a href="https://consulting.mor-gan.com" className="group flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors">
                                        <span className="border-b border-zinc-300 group-hover:border-zinc-900">Morgan Consulting</span> ↗
                                    </a>
                                    <a href="https://docs.mor-gan.com" className="group flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors">
                                        <span className="border-b border-zinc-300 group-hover:border-zinc-900">Lab Docs</span> ↗
                                    </a>
                                </div>
                            </motion.div>
                        )}

                        {activeIdentity === 'resume' && (
                            <motion.div
                                key="resume"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="space-y-8"
                            >
                                <div className="flex items-center justify-between border-b border-zinc-100 pb-8">
                                    <a href="/Morgan_Salisbury_Resume.pdf" download className="bg-zinc-900 text-white px-8 py-4 rounded-full font-sans text-sm font-medium tracking-wide hover:bg-zinc-700 transition-colors shadow-lg shadow-zinc-200">
                                        Download PDF
                                    </a>
                                    <span className="text-zinc-400 italic font-serif">Jan 2026</span>
                                </div>

                                <div className="grid grid-cols-1 gap-8 text-zinc-600">
                                    <div>
                                        <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Competencies</h3>
                                        <ul className="space-y-2 font-serif text-lg">
                                            <li>Data Journalism</li>
                                            <li>Information Design</li>
                                            <li>Privacy Law & Policy</li>
                                            <li>Hardware Engineering</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Recognitions</h3>
                                        <ul className="space-y-2 font-serif text-lg">
                                            <li>University Scholar (4.0)</li>
                                            <li>Investigative Award</li>
                                            <li>Featured: 60 Minutes</li>
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeIdentity === 'contact' && (
                            <motion.div
                                key="contact"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="space-y-10"
                            >
                                <div>
                                    <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Email</h3>
                                    <a href="mailto:morgan@mor-gan.com" className="text-2xl md:text-3xl font-serif text-zinc-900 underline decoration-zinc-200 decoration-1 underline-offset-8 hover:decoration-zinc-900 transition-all block break-words">
                                        morgan@mor-gan.com
                                    </a>
                                </div>
                                <div>
                                    <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Social</h3>
                                    <div className="flex flex-col gap-3 text-sm font-sans font-medium uppercase tracking-widest text-zinc-500">
                                        <a href="https://linkedin.com" className="hover:text-zinc-900 transition-colors w-max">LinkedIn ↗</a>
                                        <a href="https://twitter.com" className="hover:text-zinc-900 transition-colors w-max">Twitter / X ↗</a>
                                        <a href="https://github.com" className="hover:text-zinc-900 transition-colors w-max">GitHub ↗</a>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const SimpleTrigger = ({ label, isActive, onClick }) => {
    return (
        <span
            onClick={onClick}
            className={`
                cursor-pointer transition-all duration-200
                ${isActive ? 'text-zinc-900 underline decoration-zinc-900 decoration-2 underline-offset-4' : 'text-zinc-500 hover:text-zinc-800'}
            `}
        >
            {label}
        </span>
    );
};

export default InteractiveBio;
