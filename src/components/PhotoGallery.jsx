import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import PhotoCard from './PhotoCard';
import galleryData from '../content/gallery.json';

const PhotoGallery = () => {
    const prefersReducedMotion = useReducedMotion();
    const { photos } = galleryData;

    // Staggered entrance animation matching existing patterns
    const containerVariants = prefersReducedMotion
        ? {}
        : {
              hidden: { opacity: 0 },
              show: {
                  opacity: 1,
                  transition: {
                      staggerChildren: 0.1,
                  },
              },
          };

    const itemVariants = prefersReducedMotion
        ? {}
        : {
              hidden: { opacity: 0, y: 20 },
              show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                      type: 'spring',
                      damping: 40,
                      stiffness: 300,
                  },
              },
          };

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >
            {photos.map((photo, index) => (
                <motion.div key={index} variants={itemVariants}>
                    <PhotoCard {...photo} />
                </motion.div>
            ))}
        </motion.div>
    );
};

export default PhotoGallery;
