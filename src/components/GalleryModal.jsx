import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-6 md:p-8 modal-overlay"
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[1000px] max-h-[85vh] bg-[#121a29] border-2 border-gold-premium rounded-lg overflow-hidden shadow-2xl"
            style={{
              boxShadow: '0 0 60px rgba(0,0,0,0.8), 0 0 40px rgba(236, 226, 182, 0.1)',
            }}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, backgroundColor: '#ece2b6', color: '#0d121d' }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center border border-fantasy-border text-gold-premium transition-colors duration-300 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4L12 12M12 4L4 12" />
              </svg>
            </motion.button>

            {/* Content Grid */}
            <div className="grid md:grid-cols-[1.1fr_1fr] max-h-[85vh]">
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover min-h-[250px] md:min-h-[350px]"
                />
                {/* Decorative frame overlay */}
                <div className="absolute inset-0 border-r border-fantasy-border/50 hidden md:block" />
              </div>

              {/* Details Section */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                {/* Category Tag */}
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-fantasy text-gold-premium text-xs tracking-[2px] uppercase mb-3"
                >
                  {project.categoryLabel}
                </motion.span>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-fantasy text-white text-2xl md:text-3xl mb-5 leading-tight"
                >
                  {project.title}
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-text-muted leading-relaxed mb-6"
                >
                  {project.description}
                </motion.p>

                {/* Tools Section */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  <span className="block font-fantasy text-gold-premium text-xs tracking-[1px]">
                    PERALATAN SENI
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.split(', ').map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 text-sm bg-gold-premium/10 text-gold-premium border border-gold-premium/20 rounded-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-3 mt-8"
                >
                  <motion.button
                    whileHover={{ y: -2, boxShadow: '0 0 20px rgba(236, 226, 182, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 font-fantasy text-sm tracking-wider bg-gradient-gold text-bg-dark border border-gold-premium cursor-pointer hover:border-gold-bright transition-all duration-300"
                  >
                    Lihat Detail
                  </motion.button>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="px-6 py-3 font-fantasy text-sm tracking-wider bg-transparent text-gold-premium border border-gold-premium/50 cursor-pointer hover:border-gold-premium transition-all duration-300"
                  >
                    Tutup
                  </motion.button>
                </motion.div>
              </div>
            </div>

            {/* Decorative corner elements */}
            <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold-premium/30" />
            <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold-premium/30" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryModal;