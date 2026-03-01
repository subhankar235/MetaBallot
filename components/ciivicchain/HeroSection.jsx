import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import HeroParticles from './HeroParticles';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 60]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
      style={{ background: '#0A0A0A' }}
    >
      <HeroParticles />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,157,0,0.07) 0%, transparent 70%)',
        }}
      />

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF9D00] live-dot" />
          <span
            style={{ fontFamily: "'DM Mono', monospace" }}
            className="text-xs text-[#FF9D00]/80 tracking-wider"
          >
            // blockchain.status = LIVE
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#F5F5F5] leading-[0.95] tracking-tight mb-8"
        >
          <span className="whitespace-nowrap">Build Trust Into</span>
          <br className="my-2" />
          <span
            style={{
              WebkitTextStroke: '1px #FF9D00',
              color: 'transparent',
            }}
          >
            Every Decision
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-lg md:text-xl text-[#888] max-w-2xl mb-10 leading-relaxed"
        >
          Tamper-proof, anonymous, blockchain-verified voting at scale.
          <br className="hidden md:block" />
          Built for institutions that cannot afford to lose trust.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 mb-14"
        >
          <button
            className="px-8 py-4 rounded-full text-black font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,157,0,0.35)]"
            style={{ background: '#FF9D00', fontFamily: "'Syne', sans-serif" }}
          >
            Start Voting →
          </button>
          <button
            className="px-8 py-4 rounded-full text-[#F5F5F5] font-semibold text-base border border-[#F5F5F5]/20 transition-all duration-300 hover:border-[#FF9D00] hover:text-[#FF9D00]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            View Demo
          </button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          {['Smart Contract Verified', 'Zero Admin Override', 'Real-Time Audit'].map((badge, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF9D00]" />
              <span
                style={{ fontFamily: "'DM Mono', monospace" }}
                className="text-xs text-[#888] tracking-wide"
              >
                {badge}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-pulse">
        <span
          style={{ fontFamily: "'DM Mono', monospace" }}
          className="text-[10px] text-[#FF9D00]/50 tracking-widest"
        >
          SCROLL
        </span>
        <ChevronDown className="w-5 h-5 text-[#FF9D00]" />
      </div>
    </section>
  );
}