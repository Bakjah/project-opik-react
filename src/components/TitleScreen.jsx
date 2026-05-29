import React, { useState, useEffect, useRef } from 'react';

const TitleScreen = ({ isActive, onEnter }) => {
  const [isBlinking, setIsBlinking] = useState(true);
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const shootingStarsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Mouse tracking with smooth interpolation
  useEffect(() => {
    if (!isActive) return;

    let animId;

    const onMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5);
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5);
    };

    const update = () => {
      // Smooth interpolation
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
        });
      }
    };

    resize();

    const draw = () => {
      if (!canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Parallax offset - BIG movement (80px max)
      const mx = mouseRef.current.x * 80;
      const my = mouseRef.current.y * 60;

      // Draw stars with parallax
      starsRef.current.forEach(star => {
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

        // Star
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${star.brightness * 0.25})`;
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
    <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: '#050510', overflow: 'hidden' }}>
      {/* Canvas Stars BG */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }} />

      {/* Gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(180deg, rgba(5, 5, 15, 0.5) 0%, rgba(10, 10, 26, 0.3) 100%)' }} />

      {/* Nebula 1 */}
      <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '700px', height: '700px', zIndex: 3, background: 'radial-gradient(circle, rgba(100, 70, 180, 0.35) 0%, transparent 60%)', filter: 'blur(60px)' }} />

      {/* Nebula 2 */}
      <div style={{ position: 'absolute', bottom: '-15%', left: '-10%', width: '600px', height: '600px', zIndex: 3, background: 'radial-gradient(circle, rgba(40, 80, 150, 0.25) 0%, transparent 60%)', filter: 'blur(70px)' }} />

      {/* Aurora */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', zIndex: 4, background: 'linear-gradient(180deg, rgba(78, 242, 210, 0.08) 0%, rgba(100, 80, 180, 0.1) 40%, transparent 100%)', filter: 'blur(50px)' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(3rem, 12vw, 6rem)', fontWeight: 'bold', color: 'white', letterSpacing: '0.5em', marginBottom: '0.5rem', textShadow: '0 0 40px rgba(255, 255, 255, 0.5), 0 0 80px rgba(150, 130, 200, 0.4), 0 5px 20px rgba(0,0,0,0.9)' }}>
          OPIK
        </h1>
        <p style={{ fontFamily: 'Cinzel, serif', color: '#ece2b6', fontSize: 'clamp(0.7rem, 2vw, 1rem)', letterSpacing: '0.5em', marginBottom: '120px', textShadow: '0 0 15px rgba(236, 226, 182, 0.6)' }}>
          CREATIVE PORTFOLIO
        </p>
        <button
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
        </button>
      </div>
    </div>
  );
};

export default TitleScreen;