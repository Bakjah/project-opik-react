import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TitleScreen = ({ isActive, onEnter, isExiting }) => {
  const [isBlinking, setIsBlinking] = useState(true);
  const starTimeRef = useRef(0); // Time counter for star spawn
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const shootingStarsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isMobileRef = useRef(false);

  // Mouse/gyro tracking with smooth interpolation
  useEffect(() => {
    if (!isActive) return;

    let animId;

    // Check if device is mobile
    const checkMobile = () => {
      isMobileRef.current = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 'ontouchstart' in window;
    };
    checkMobile();

    // For desktop - use mouse movement
    const onMouseMove = (e) => {
      if (isMobileRef.current) return;
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5);
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5);
    };

    // For mobile - use touch movement
    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseRef.current.targetX = (touch.clientX / window.innerWidth - 0.5) * 2;
        mouseRef.current.targetY = (touch.clientY / window.innerHeight - 0.5) * 2;
      }
    };

    // For mobile - use device orientation (gyroscope)
    const onDeviceOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        const gamma = Math.max(-45, Math.min(45, e.gamma)) / 90;
        const beta = Math.max(-45, Math.min(45, e.beta - 45)) / 90;
        mouseRef.current.targetX = gamma;
        mouseRef.current.targetY = beta;
      }
    };

    // Request permission for iOS 13+ device orientation
    const requestGyroPermission = async () => {
      if (typeof DeviceOrientationEvent !== 'undefined' &&
          typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', onDeviceOrientation);
          }
        } catch (err) {
          console.log('Device orientation permission denied');
        }
      } else if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', onDeviceOrientation);
      }
    };

    // Smooth interpolation
    const update = () => {
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;
      animId = requestAnimationFrame(update);
    };

    // Add event listeners based on device type
    if (isMobileRef.current) {
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      const handleFirstTouch = () => {
        requestGyroPermission();
        window.removeEventListener('touchstart', handleFirstTouch);
      };
      window.addEventListener('touchstart', handleFirstTouch);
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    } else {
      window.addEventListener('mousemove', onMouseMove);
    }

    update();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(animId);
    };
  }, [isActive]);

  // Blinking
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => setIsBlinking(p => !p), 1500);
    return () => clearInterval(interval);
  }, [isActive]);

  // Canvas with stars + parallax
  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      starsRef.current = [];
      // Initialize stars with 0 opacity (not visible yet)
      for (let i = 0; i < 150; i++) {
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
          spawnTime: Math.random() * 5000, // Random time to appear (0-5 seconds)
        });
      }
    };

    resize();

    const draw = () => {
      if (!canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update time counter
      starTimeRef.current += 16; // Approximate 60fps

      // Parallax offset - BIG movement (80px max)
      const mx = mouseRef.current.x * 80;
      const my = mouseRef.current.y * 60;

      // Draw stars with parallax
      starsRef.current.forEach(star => {
        // Spawn animation - star appears based on its spawnTime
        if (starTimeRef.current < star.spawnTime) {
          // Star hasn't spawned yet, don't draw
          return;
        }

        const spawnProgress = Math.min((starTimeRef.current - star.spawnTime) / 500, 1); // 500ms to fully appear
        const currentOpacity = spawnProgress; // Simple linear fade-in

        // Drift
        star.x += star.speedX;
        star.y += star.speedY;
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Draw position with parallax offset
        let drawX = star.x + mx;
        let drawY = star.y + my;

        // Wrap around
        drawX = ((drawX % canvas.width) + canvas.width) % canvas.width;
        drawY = ((drawY % canvas.height) + canvas.height) % canvas.height;

        // Twinkle
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
      if (Math.random() < 0.025) {
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
  }, [isActive]);

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{ position: 'fixed', inset: 0, zIndex: 998, background: '#050510', overflow: 'hidden' }}
    >
      {/* Canvas Stars BG - fades in and out */}
      <motion.canvas
        ref={canvasRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0 }}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}
      />

      {/* Gradient overlay - fades in and out */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(180deg, rgba(5, 5, 15, 0.5) 0%, rgba(10, 10, 26, 0.3) 100%)' }}
      />

      {/* Nebula 1 - fades in and out */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{ position: 'absolute', top: '-20%', right: '-10%', width: '700px', height: '700px', zIndex: 3, background: 'radial-gradient(circle, rgba(100, 70, 180, 0.35) 0%, transparent 60%)', filter: 'blur(60px)' }}
      />

      {/* Nebula 2 - fades in and out */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ position: 'absolute', bottom: '-15%', left: '-10%', width: '600px', height: '600px', zIndex: 3, background: 'radial-gradient(circle, rgba(40, 80, 150, 0.25) 0%, transparent 60%)', filter: 'blur(70px)' }}
      />

      {/* Aurora - fades in and out */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', zIndex: 4, background: 'linear-gradient(180deg, rgba(78, 242, 210, 0.08) 0%, rgba(100, 80, 180, 0.1) 40%, transparent 100%)', filter: 'blur(50px)' }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
        {/* Title - OPIK */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -20 : 0 }}
          transition={{ duration: 0.5, delay: 0 }}
          style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(3rem, 12vw, 6rem)', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem', textShadow: '0 0 40px rgba(255, 255, 255, 0.5), 0 0 80px rgba(150, 130, 200, 0.4), 0 5px 20px rgba(0,0,0,0.9)' }}
        >
        GINIMAGE
        </motion.h1>

        {/* Subtitle - CREATIVE PORTFOLIO */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -10 : 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ fontFamily: 'Cinzel, serif', color: '#ece2b6', fontSize: 'clamp(0.7rem, 2vw, 1rem)', letterSpacing: '0.5em', marginBottom: '120px', textShadow: '0 0 15px rgba(236, 226, 182, 0.6)' }}
        >
        CREATIVE PORTFOLIO
        </motion.p>

        {/* Button - TAP TO START */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={onEnter}
          onMouseEnter={() => setIsBlinking(false)}
          onMouseLeave={() => setIsBlinking(true)}
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '1rem',
            letterSpacing: '0.3em',
            color: isBlinking ? 'rgba(236, 226, 182, 0.4)' : '#ece2b6',
            background: 'transparent',
            border: 'none',
            padding: '18px 50px',
            cursor: 'pointer',
            position: 'relative',
            transition: 'all 0.3s ease',
            textShadow: isBlinking ? 'none' : '0 0 20px rgba(236, 226, 182, 0.8)',
          }}
        >
          <span style={{ position: 'absolute', top: 0, left: 0, width: '25px', height: '25px', borderTop: '2px solid rgba(236, 226, 182, 0.8)', borderLeft: '2px solid rgba(236, 226, 182, 0.8)' }} />
          <span style={{ position: 'absolute', top: 0, right: 0, width: '25px', height: '25px', borderTop: '2px solid rgba(236, 226, 182, 0.8)', borderRight: '2px solid rgba(236, 226, 182, 0.8)' }} />
          <span style={{ position: 'absolute', bottom: 0, left: 0, width: '25px', height: '25px', borderBottom: '2px solid rgba(236, 226, 182, 0.8)', borderLeft: '2px solid rgba(236, 226, 182, 0.8)' }} />
          <span style={{ position: 'absolute', bottom: 0, right: 0, width: '25px', height: '25px', borderBottom: '2px solid rgba(236, 226, 182, 0.8)', borderRight: '2px solid rgba(236, 226, 182, 0.8)' }} />
          TAP TO START
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TitleScreen;