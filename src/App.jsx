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

function App() {
  // Stage management: 'loading' -> 'title' -> 'main'
  const [stage, setStage] = useState('loading');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle loading screen completion
  const handleLoadingComplete = () => {
    setStage('title');
  };

  // Handle title screen enter (with white flash)
  const handleEnterMain = () => {
    setStage('main');
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

      {/* Title Screen (Gatekeeper) */}
      <TitleScreen
        isActive={stage === 'title'}
        onEnter={handleEnterMain}
      />

      {/* Main Website Content */}
      <AnimatePresence>
        {stage === 'main' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="relative"
          >
            {/* Ambient Background Effects */}
            <StarCanvas />

            {/* Nebula Glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
              <div className="nebula-glow bg-anemo-teal top-0 right-0" />
              <div className="nebula-glow bg-purple-500 bottom-0 left-0" />
            </div>

            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <main>
              <Hero />
              <About />
              <Portfolio onOpenModal={handleOpenModal} />
              <Contact />
            </main>

            {/* Footer */}
            <Footer />

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