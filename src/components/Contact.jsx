import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      url: '#',
    },
    {
      name: 'Email',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      url: 'mailto:email@example.com',
    },
    {
      name: 'ArtStation',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 002.164 1.333h13.457l-2.792-4.838H0zm24 .025c0-.484-.143-.935-.388-1.314L15.728 2.728a2.424 2.424 0 00-2.164-1.333H9.469L21.598 22.54l1.92-3.325c.378-.637.482-.919.482-1.467zm-11.129-3.462L7.428 4.858l-5.444 9.428h10.887z"/>
        </svg>
      ),
      url: '#',
    },
    {
      name: 'Behance',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7.803 9.217c.74.186 1.243.186 1.806.186 1.95 0 2.102-1.107 2.102-1.728 0-.745-.351-1.16-1.728-1.16-.933 0-1.863.248-2.18.745v-2.223c.62-.435 1.657-.775 2.84-.775 2.222 0 3.41 1.087 3.41 3.158 0 1.9-1.088 2.78-2.78 3.123v.062c1.9.248 3.224 1.58 3.224 3.554 0 2.16-1.788 3.617-4.45 3.617-1.657 0-2.902-.558-3.594-1.45h-.062v-2.84c-.744 1.45-2.16 2.284-3.74 2.284-1.45 0-2.715-.807-2.715-2.656 0-1.76.87-2.717 3.03-3.432zm1.264-1.512h1.512c1.203 0 1.606-.373 1.606-1.018 0-.62-.434-.994-1.512-.994-.434 0-.807.124-1.018.311-.124.124-.186.31-.186.558 0 .434.186.745.598 1.143zm1.55 6.09c.434 0 .683-.186.683-.558 0-.434-.31-.62-.87-.62h-.93v1.178h1.118zm-1.178-2.532h1.45c.869 0 1.388-.435 1.388-1.143 0-.621-.434-1.018-1.203-1.018h-1.018v2.161h.382zM15.14 6.5c.87 0 1.512-.372 1.512-.869 0-.558-.621-1.018-1.637-1.018h-1.388v1.887h1.513zM3 8.137h5.032V6.5H3v1.637zm2.16 3.77h5.033v-1.61h-5.032v1.61zm0 3.77h5.032v-1.638h-5.032v1.638zm1.16-3.77h2.715c1.45 0 2.407.62 2.407 1.888 0 .807-.558 1.512-1.512 1.634v.062c1.2.124 1.863.745 1.863 1.76 0 1.45-1.203 1.974-2.655 1.974h-3.182V12.08h.186v.87h-.186v1.512h2.16zm3.182 3.74c.933 0 1.512-.434 1.512-1.143 0-.558-.434-.993-1.388-.993h-1.328v2.136h1.203zm0-1.26h-.621v-1.637h.682c.62 0 .994.248.994.807 0 .558-.434.869-.993.869h-.062z"/>
        </svg>
      ),
      url: '#',
    },
  ];

  return (
    <section id="contact" className="relative py-24 px-8 md:px-[8%]">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] nebula-glow bg-anemo-teal/10 pointer-events-none" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="max-w-[750px] mx-auto text-center relative"
      >
        {/* Section Title */}
        <h2 className="font-fantasy text-gold-premium text-3xl md:text-4xl tracking-[3px] mb-2">
          III. HUBUNGI SAYA
        </h2>
        <span className="block font-fantasy text-text-muted text-xs tracking-[5px] mt-3 mb-10">
          CONTACT
        </span>
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gold-premium to-transparent mx-auto mb-10" />

        {/* Description */}
        <p className="text-text-muted text-base md:text-lg leading-relaxed mb-10">
          Mari berkolaborasi membuat petualangan visual baru atau diskusikan kebutuhan
          proyek komersial Anda. Saya selalu terbuka untuk kesempatan kreatif!
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-5 mb-10">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="
                w-14 h-14 flex items-center justify-center
                border border-fantasy-border text-text-muted
                rounded transition-all duration-300 cursor-pointer
                hover:bg-gold-premium hover:text-bg-dark hover:border-gold-premium
              "
              title={link.name}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.a
          href="mailto:email@example.com"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -3, boxShadow: '0 0 25px rgba(236, 226, 182, 0.4)' }}
          whileTap={{ scale: 0.98 }}
          className="
            inline-block px-10 py-4 font-fantasy font-bold text-sm
            tracking-[2px] uppercase bg-gradient-gold text-bg-dark
            border border-gold-premium shadow-lg cursor-pointer no-underline
            transition-all duration-300 hover:border-gold-bright
          "
        >
          Kirim Pesan
        </motion.a>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          className="absolute -left-16 top-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent to-gold-premium hidden md:block"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          className="absolute -right-16 top-1/2 w-32 h-[1px] bg-gradient-to-l from-transparent to-gold-premium hidden md:block"
        />
      </motion.div>
    </section>
  );
};

export default Contact;