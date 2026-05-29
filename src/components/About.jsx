import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const skills = [
    'Digital Illustration',
    'Character Design',
    'Concept Art',
    'Visual Development',
    'Composition',
    'Color Theory',
  ];

  return (
    <section id="about" className="relative py-28 px-8 md:px-[8%]">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-dark/50 to-transparent pointer-events-none" />

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="font-fantasy text-gold-premium text-3xl md:text-4xl tracking-[3px] mb-2">
          I. TENTANG SAYA
        </h2>
        <span className="block font-fantasy text-text-muted text-xs tracking-[5px] mt-3">
          THE CREATOR
        </span>
        {/* Decorative line */}
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gold-premium to-transparent mx-auto mt-6" />
      </motion.div>

      {/* Content Grid */}
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="relative glass p-8 md:p-10 rounded-lg text-center"
          style={{
            border: '2px solid rgba(236, 226, 182, 0.2)',
            outline: '1px solid rgba(236, 226, 182, 0.05)',
            outlineOffset: '-6px',
          }}
        >
          {/* Corner ornaments */}
          <span className="absolute top-3 left-3 text-gold-premium/40 text-sm">✦</span>
          <span className="absolute bottom-3 right-3 text-gold-premium/40 text-sm">✦</span>

          {/* Profile Image - Diamond shape */}
          <div className="relative w-[180px] h-[180px] mx-auto mb-6 perspective-1000">
            <motion.div
              whileHover={{ rotateY: 10, rotateX: -10 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full border-2 border-gold-premium transform rotate-45 overflow-hidden rounded-xl shadow-lg"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500"
                alt="Profile"
                className="w-[140%] h-[140%] object-cover transform -rotate-45 -translate-x-[15%] -translate-y-[15%]"
              />
            </motion.div>
          </div>

          {/* Name & Role */}
          <h3 className="font-fantasy text-white text-xl mb-1">Nama Kamu</h3>
          <span className="text-gold-premium font-fantasy text-xs tracking-[2px] uppercase block mb-6">
            DKV Concept Artist
          </span>

          {/* Skills Tags */}
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="
                  px-3 py-1.5 text-xs font-fantasy tracking-wider
                  bg-gold-premium/5 border border-gold-premium/15
                  text-gold-premium rounded-sm
                  hover:bg-gold-premium/10 transition-colors duration-300 cursor-default
                "
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* About Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <p className="text-text-muted leading-relaxed text-base md:text-lg">
            Salam, Penjelajah! Saya adalah lulusan Desain Komunikasi Visual (DKV) yang
            mendedikasikan media gambar digital untuk merekam keindahan fiksi epik,
            mitologi, dan petualangan fantasi.
          </p>

          <p className="text-text-muted leading-relaxed text-base md:text-lg">
            Gaya gambar saya banyak dipengaruhi oleh keanggunan seni visual gim petualangan
            open-world, berfokus pada pencahayaan alami yang lembut, lingkungan arsitektur
            kuno, serta detail ekspresi karakter yang kuat.
          </p>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="border-l-2 border-gold-premium pl-6 py-2 italic text-text-muted/80"
          >
            <span className="text-gold-premium font-fantasy text-sm tracking-wider block mb-2">
              ✦ PHILOSOPHY
            </span>
            "Menangkap esensi magis yang tersembunyi di dalam narasi visual."
          </motion.blockquote>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { number: '2+', label: 'Tahun Pengalaman' },
              { number: '50+', label: 'Proyek Selesai' },
              { number: '100%', label: 'Passion' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="font-fantasy text-gold-premium text-2xl md:text-3xl font-bold">{stat.number}</div>
                <div className="text-text-muted text-xs tracking-wider mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;