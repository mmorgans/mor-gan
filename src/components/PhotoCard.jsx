import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const PhotoCard = ({ image, alt, caption, date, location }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleFlip();
        }
    };

    return (
        <div
            className="photo-card-wrapper perspective-1000 w-full"
            style={{ perspective: '1000px' }}
        >
            <motion.div
                className="photo-card relative w-full cursor-pointer"
                onClick={handleFlip}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role="button"
                aria-label={`Photo: ${alt}. Click to ${isFlipped ? 'see photo' : 'read caption'}`}
                style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    transition: prefersReducedMotion
                        ? 'none'
                        : 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
                }}
                whileHover={!prefersReducedMotion ? { scale: 1.02 } : {}}
                whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
            >
                {/* Front of card - Photo */}
                <div
                    className="photo-front w-full bg-white shadow-lg rounded-sm overflow-hidden"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                    }}
                >
                    <div className="p-4 pb-16">
                        <div className="aspect-[4/3] w-full bg-zinc-100 rounded-sm overflow-hidden">
                            <img
                                src={image}
                                alt={alt}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>

                {/* Back of card - Caption */}
                <div
                    className="photo-back absolute inset-0 w-full h-full bg-white shadow-lg rounded-sm overflow-hidden"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    <div className="p-6 h-full flex flex-col justify-center items-center text-center">
                        <p className="font-serif text-lg text-zinc-700 mb-4">
                            {caption}
                        </p>
                        {(date || location) && (
                            <div className="text-sm text-zinc-400 font-sans space-y-1">
                                {date && <p>{date}</p>}
                                {location && <p>{location}</p>}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PhotoCard;
