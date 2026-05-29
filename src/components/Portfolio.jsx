import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Portfolio = ({ onOpenModal }) => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'SEMUA' },
    { id: 'character', label: 'KARAKTER' },
    { id: 'illustration', label: 'ILUSTRASI' },
    { id: 'concept', label: 'KONSEP' },
  ];

  const projects = [
    {
      id: 1,
      title: 'The Forest Mage',
      category: 'character',
      categoryLabel: 'Character Design',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800',
      description: 'Desain karakter penyihir pelindung hutan kuno dengan jubah rajutan wol tradisional.',
      tools: 'Clip Studio Paint',
    },
    {
      id: 2,
      title: 'Fading Light in Ruins',
      category: 'illustration',
      categoryLabel: 'Illustration',
      image: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800',
      description: 'Ilustrasi sisa-sisa kastil tua di bawah langit senja keemasan.',
      tools: 'Photoshop, Procreate',
    },
    {
      id: 3,
      title: 'Sky Sanctuary',
      category: 'concept',
      categoryLabel: 'Concept Art',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800',
      description: 'Arsitektur pulau melayang di atas awan, terinspirasi dari kuil pemujaan klasik.',
      tools: 'Photoshop',
    },
    {
      id: 4,
      title: 'Shadow Guardian',
      category: 'character',
      categoryLabel: 'Character Design',
      image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=800',
      description: 'Karakter penjaga bayangan dengan armor gelap dan pedang ethereal.',
      tools: 'Procreate, Photoshop',
    },
    {
      id: 5,
      title: 'Crystal Caverns',
      category: 'illustration',
      categoryLabel: 'Illustration',
      image: 'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?q=80&w=800',
      description: 'Pemandangan gua kristal yang bersinar dengan warna neon misterius.',
      tools: 'Blender, Photoshop',
    },
    {
      id: 6,
      title: 'Floating Kingdom',
      category: 'concept',
      categoryLabel: 'Concept Art',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800',
      description: 'Konsep kerajaan melayang di atas awan dengan arsitektur fantasi.',
      tools: 'Photoshop, Illustrator',
    },
  ];

  const filteredProjects = activeTab === 'all'
    ? projects
    : projects.filter(p => p.category === activeTab);

  return (
    <section id="portfolio" className="relative py-24 px-8 md:px-[8%] bg-[#0a0e17]/60">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #ece2b6 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="font-fantasy text-gold-premium text-3xl md:text-4xl tracking-[3px] mb-2">
          II. GALERI KARYA
        </h2>
        <span className="block font-fantasy text-text-muted text-xs tracking-[5px] mt-3">
          VISUAL ARCHIVE
        </span>
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gold-premium to-transparent mx-auto mt-6" />
      </motion.div>

      {/* Tabs */}
      <div className="flex justify-center gap-6 mb-12 flex-wrap">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative font-fantasy text-sm tracking-[2px] px-4 py-2
              transition-all duration-300 cursor-pointer
              ${activeTab === tab.id
                ? 'text-gold-premium'
                : 'text-text-muted hover:text-gold-premium/70'
              }
            `}
          >
            {tab.label}
            {/* Active underline */}
            <motion.span
              layoutId="activeTab"
              className="absolute -bottom-1 left-1/2 w-12 h-[1px] bg-gold-premium"
              style={{ transform: 'translateX(-50%)' }}
              initial={false}
              animate={{
                opacity: activeTab === tab.id ? 1 : 0,
                scaleX: activeTab === tab.id ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => onOpenModal(project)}
              className="relative aspect-square cursor-pointer group perspective-1000"
            >
              {/* Card Container */}
              <div className="
                relative w-full h-full glass overflow-hidden rounded
                transition-all duration-500
                group-hover:border-gold-premium/50
                group-hover:shadow-[0_0_30px_rgba(236,226,182,0.15)]
              ">
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="
                    w-full h-full object-cover
                    transition-transform duration-700 ease-out
                    group-hover:scale-110
                  "
                />

                {/* Overlay */}
                <div className="
                  absolute inset-0
                  bg-gradient-to-t from-bg-dark via-bg-dark/20 to-transparent
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-400
                " />

                {/* Content Overlay */}
                <div className="
                  absolute inset-0 flex flex-col justify-end p-6
                  translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                  transition-all duration-400 delay-100
                ">
                  <span className="font-fantasy text-gold-premium text-xs tracking-[1px] uppercase mb-1">
                    {project.categoryLabel}
                  </span>
                  <h3 className="font-fantasy text-white text-lg tracking-wide">
                    {project.title}
                  </h3>
                </div>

                {/* Corner decorations */}
                <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-gold-premium/0 group-hover:border-gold-premium/60 transition-all duration-300" />
                <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-gold-premium/0 group-hover:border-gold-premium/60 transition-all duration-300" />
                <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-gold-premium/0 group-hover:border-gold-premium/60 transition-all duration-300" />
                <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-gold-premium/0 group-hover:border-gold-premium/60 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;