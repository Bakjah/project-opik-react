import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import LoadingScreen from './components/LoadingScreen';
import TitleScreen from './components/TitleScreen';
import StarCanvas from './components/StarCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import GalleryModal from './components/GalleryModal';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Animation variants for staggered fade-in
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.8,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: 'easeOut',
    },
  },
};

function App() {
  // Stage management: 'loading' -> 'title' -> 'main'
  const [stage, setStage] = useState('loading');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleExiting, setTitleExiting] = useState(false);

  // Handle loading screen completion
  const handleLoadingComplete = () => {
    setStage('title');
  };

  // Handle title screen enter - fade out title first
  const handleEnterMain = () => {
    setTitleExiting(true);
    setTimeout(() => {
      setStage('main');
      setTitleExiting(false);
    }, 800);
  };

  // Handle opening project modal
  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Handle closing project modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <div className="relative min-h-screen bg-bg-dark text-text-main">
      {/* Loading Screen */}
      {stage === 'loading' && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {/* Title Screen - with exit animation */}
      <TitleScreen
        isActive={stage === 'title'}
        onEnter={handleEnterMain}
        isExiting={titleExiting}
      />

      {/* Main Website Content */}
      <AnimatePresence>
        {stage === 'main' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative"
          >
            {/* Ambient Background Effects */}
            <motion.div variants={fadeIn} initial="hidden" animate="visible">
              <StarCanvas />
            </motion.div>

            {/* Nebula Glows */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="fixed inset-0 pointer-events-none overflow-hidden z-0"
            >
              <div className="nebula-glow bg-anemo-teal top-0 right-0" />
              <div className="nebula-glow bg-purple-500 bottom-0 left-0" />
            </motion.div>

            {/* Navigation - fades in first */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible">
              <Navbar />
            </motion.div>

            {/* Main Content - Smooth staggered fade-in */}
            <motion.main
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <motion.div variants={fadeInUp}>
                <Hero />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <About />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Portfolio onOpenModal={handleOpenModal} />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Contact />
              </motion.div>
            </motion.main>

            {/* Footer */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible">
              <Footer />
            </motion.div>

            {/* Gallery Modal */}
            <AnimatePresence>
              {isModalOpen && (
                <GalleryModal
                  project={selectedProject}
                  onClose={handleCloseModal}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;