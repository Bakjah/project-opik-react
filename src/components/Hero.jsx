import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const starTimeRef = useRef(0); // Time counter for star spawn
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const shootingStarsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Mouse tracking with smooth interpolation
  useEffect(() => {
    let animId;

    const onMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5);
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5);
    };

    const update = () => {
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.1;
      animId = requestAnimationFrame(update);
    };

    window.addEventListener('mousemove', onMouseMove);
    update();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Canvas with stars + parallax
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      starsRef.current = [];
      // Initialize stars with 0 opacity (not visible yet)
      for (let i = 0; i < 120; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          brightness: Math.random() * 0.4 + 0.6,
          twinkleDir: 1,
          twinkleSpeed: Math.random() * 0.01 + 0.005,
          opacity: 0, // Each star starts invisible
          spawnTime: Math.random() * 50000, // Random time to appear (0-5 seconds)
        });
      }
    };

    resize();

    const draw = () => {
      if (!canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update time counter
      starTimeRef.current += 16; // Approximate 60fps

      // BIG parallax offset (80px horizontal, 60px vertical)
      const mx = mouseRef.current.x * 80;
      const my = mouseRef.current.y * 60;

      // Stars with parallax
      starsRef.current.forEach(star => {
        // Spawn animation - star appears based on its spawnTime
        if (starTimeRef.current < star.spawnTime) {
          // Star hasn't spawned yet, don't draw
          return;
        }

        const spawnProgress = Math.min((starTimeRef.current - star.spawnTime) / 500, 1); // 500ms to fully appear
        const currentOpacity = spawnProgress; // Simple linear fade-in

        star.x += star.speedX;
        star.y += star.speedY;
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        let drawX = star.x + mx;
        let drawY = star.y + my;

        drawX = ((drawX % canvas.width) + canvas.width) % canvas.width;
        drawY = ((drawY % canvas.height) + canvas.height) % canvas.height;

        star.brightness += star.twinkleSpeed * star.twinkleDir;
        if (star.brightness > 1 || star.brightness < 0.4) star.twinkleDir *= -1;

        // Star with individual fade-in opacity
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness * currentOpacity})`;
        ctx.fill();

        // Glow with fade-in opacity
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${star.brightness * currentOpacity * 0.25})`;
        ctx.fill();
      });

      // Shooting stars
      if (Math.random() < 0.02) {
        shootingStarsRef.current.push({
          x: Math.random() * canvas.width,
          y: -50,
          length: Math.random() * 100 + 80,
          speed: Math.random() * 10 + 8,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
          opacity: 1,
          trail: [],
        });
      }

      shootingStarsRef.current = shootingStarsRef.current.filter(s => {
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.01;

        s.trail.unshift({ x: s.x, y: s.y });
        if (s.trail.length > 30) s.trail.pop();

        s.trail.forEach((t, i) => {
          const prog = i / s.trail.length;
          const trailX = ((t.x + mx) % canvas.width + canvas.width) % canvas.width;
          const trailY = ((t.y + my) % canvas.height + canvas.height) % canvas.height;
          ctx.beginPath();
          ctx.arc(trailX, trailY, (1 - prog) * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity * (1 - prog)})`;
          ctx.fill();
        });

        const headX = ((s.x + mx) % canvas.width + canvas.width) % canvas.width;
        const headY = ((s.y + my) % canvas.height + canvas.height) % canvas.height;

        if (s.opacity > 0) {
          ctx.beginPath();
          ctx.arc(headX, headY, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
          ctx.fill();
        }

        return s.opacity > 0;
      });

      requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 clamp(2rem, 8vw, 8rem)', overflow: 'hidden' }}>
      {/* Canvas Stars BG */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }} />

      {/* Gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(180deg, rgba(8, 11, 20, 0.4) 0%, rgba(13, 21, 40, 0.25) 100%)' }} />

      {/* Nebula 1 */}
      <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: '600px', height: '600px', zIndex: 3, background: 'radial-gradient(circle, rgba(100, 80, 180, 0.3) 0%, transparent 60%)', filter: 'blur(60px)' }} />

      {/* Nebula 2 */}
      <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '500px', height: '500px', zIndex: 3, background: 'radial-gradient(circle, rgba(60, 100, 180, 0.2) 0%, transparent 60%)', filter: 'blur(70px)' }} />

      {/* Aurora */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '60%', zIndex: 4, background: 'linear-gradient(180deg, rgba(78, 242, 210, 0.06) 0%, rgba(100, 80, 180, 0.08) 30%, transparent 100%)', filter: 'blur(40px)' }} />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ position: 'relative', zIndex: 20, maxWidth: '650px' }}
      >
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <motion.span animate={{ textShadow: ['0 0 10px rgba(236, 226, 182, 0.5)', '0 0 25px rgba(236, 226, 182, 0.9)', '0 0 10px rgba(236, 226, 182, 0.5)'] }} transition={{ duration: 3, repeat: Infinity }} style={{ fontFamily: 'Cinzel, serif', color: '#ece2b6', fontSize: '0.875rem', letterSpacing: '0.25em', textShadow: '0 0 15px rgba(236, 226, 182, 0.6)' }}>
            ✦ VISUAL STORYTELLER
          </motion.span>
          <span style={{ width: '48px', height: '1px', background: 'rgba(236, 226, 182, 0.4)' }} />
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} style={{ fontFamily: 'Cinzel, serif', color: 'white', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 'bold', lineHeight: 1.2, marginBottom: '24px', textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}>
          Coretan Imajinasi di Semesta Fantasi
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} style={{ color: '#a5b1c2', fontSize: 'clamp(1rem, 2vw, 1.125rem)', lineHeight: 1.7, marginBottom: '32px', maxWidth: '550px' }}>
          Lulusan DKV yang memadukan keindahan lanskap magis klasik dengan desain karakter bergaya gim petualangan RPG. Menghidupkan kisah melalui goresan kuas digital imersif.
        </motion.p>

        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }} onClick={scrollToPortfolio} whileHover={{ y: -3, boxShadow: '0 0 30px rgba(236, 226, 182, 0.6)' }} whileTap={{ scale: 0.98 }} style={{ display: 'inline-block', padding: '14px 40px', fontFamily: 'Cinzel, serif', fontWeight: 'bold', fontSize: '0.875rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0d121d', background: 'linear-gradient(135deg, #f5ecd2, #cebc87)', border: '1px solid #ece2b6', boxShadow: '0 4px 15px rgba(0,0,0,0.5)', cursor: 'pointer' }}>
          Buka Kompendium
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontFamily: 'Cinzel, serif', color: 'rgba(236, 226, 182, 0.6)', fontSize: '0.75rem', letterSpacing: '0.2em' }}>SCROLL</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #ece2b6, transparent)' }} />
      </motion.div>

      {/* Bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to top, #0d121d, transparent)', zIndex: 5, pointerEvents: 'none' }} />
    </section>
  );
};

export default Hero;