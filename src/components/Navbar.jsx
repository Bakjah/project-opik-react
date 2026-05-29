import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME', icon: '✦' },
    { id: 'about', label: 'ABOUT', icon: '✦' },
    { id: 'portfolio', label: 'GALLERY', icon: '✦' },
    { id: 'contact', label: 'CONTACT', icon: '✦' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Scrollspy logic
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`
          fixed top-0 left-0 w-full px-8 md:px-[8%]
          flex justify-between items-center
          z-[100] transition-all duration-300
          ${isScrolled
            ? 'bg-bg-dark/90 backdrop-blur-xl border-b border-fantasy-border/50 py-3'
            : 'bg-transparent py-5'
          }
        `}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
          className="font-fantasy font-bold text-gold-premium text-xl tracking-[2px] no-underline hover:text-gold-bright transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(236,226,182,0.4)] cursor-pointer"
        >
          ✦ OPIK
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
              className={`
                relative font-fantasy text-sm tracking-[2px] no-underline
                transition-all duration-300 cursor-pointer
                ${activeSection === item.id
                  ? 'text-gold-premium text-glow'
                  : 'text-text-muted hover:text-gold-premium'
                }
              `}
            >
              {item.label}
              {/* Active indicator */}
              <span
                className={`
                  absolute -bottom-2 left-1/2 transition-all duration-300
                  ${activeSection === item.id
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-0'
                  }
                `}
                style={{
                  transform: 'translateX(-50%)',
                  width: '6px',
                  height: '6px',
                  background: '#ece2b6',
                  borderRadius: '50%',
                  boxShadow: '0 0 8px #ffd700',
                }}
              />
              {/* Hover underline effect */}
              <span className="absolute -bottom-3 left-0 w-full h-[1px] bg-gold-premium/0 transition-all duration-300 group-hover:bg-gold-premium/50" />
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
        >
          <motion.span
            animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-gold-premium transition-colors duration-300"
          />
          <motion.span
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-gold-premium transition-colors duration-300"
          />
          <motion.span
            animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-gold-premium transition-colors duration-300"
          />
        </button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] md:hidden mobile-menu-overlay"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    font-fantasy text-2xl tracking-[3px] no-underline
                    ${activeSection === item.id ? 'text-gold-premium text-glow' : 'text-text-muted'}
                    hover:text-gold-premium transition-colors duration-300 cursor-pointer
                  `}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;