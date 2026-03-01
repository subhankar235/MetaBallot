import React, { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export default function ParticleCanvas({ scrollProgress = 0 }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const centerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      centerRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const particleCount = 120;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.7 ? '#FF9900' : '#ffffff',
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const center = centerRef.current;
      const progress = scrollProgress;
      const funnelStrength = progress * 0.08;
      const speedMultiplier = 1 + progress * 3;

      particlesRef.current.forEach((p) => {
        // Calculate direction to center
        const dx = center.x - p.x;
        const dy = center.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Apply funnel force based on scroll
        if (progress > 0.1) {
          p.vx += (dx / dist) * funnelStrength;
          p.vy += (dy / dist) * funnelStrength;
        }

        // Apply velocity with damping
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        // Add slight randomness
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vy += (Math.random() - 0.5) * 0.02;

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * (1 - progress * 0.5);
        ctx.fill();
      });

      // Draw center glow when funneling
      if (progress > 0.2) {
        const gradient = ctx.createRadialGradient(
          center.x, center.y, 0,
          center.x, center.y, 150 * progress
        );
        gradient.addColorStop(0, `rgba(255, 153, 0, ${progress * 0.3})`);
        gradient.addColorStop(1, 'rgba(255, 153, 0, 0)');
        ctx.globalAlpha = 1;
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: '#050505' }}
    />
  );
}