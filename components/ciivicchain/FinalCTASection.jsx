import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import CivicLogo from './CivicLogo';

export default function FinalCTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      ref={ref}
      className="relative py-40 px-6 overflow-hidden grain-overlay"
      style={{ background: '#050505' }}
    >
      {/* Animated orange glow */}
      <div
        className="absolute inset-0 pointer-events-none orange-glow-pulse"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,157,0,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Additional glow layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle 300px at 50% 50%, rgba(255,157,0,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-10"
        >
          <CivicLogo size={60} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-5xl md:text-7xl font-extrabold text-[#F5F5F5] leading-[0.95] mb-8"
        >
          The Infrastructure{' '}
          <br />
          <span className="text-[#FF9D00]">Democracy Deserves.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-xl text-[#888] max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          Join the movement toward transparent, verifiable, trustless governance.
          Every vote counts. Every vote is provable. Every vote is yours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <button
            className="group px-10 py-5 rounded-full text-black font-bold text-lg transition-all duration-300 hover:scale-105"
            style={{
              background: '#FF9D00',
              fontFamily: "'Syne', sans-serif",
              boxShadow: '0 0 40px rgba(255,157,0,0.3)',
            }}
          >
            Start Voting →
          </button>
          <button
            className="px-10 py-5 rounded-full font-semibold text-lg border transition-all duration-300 hover:border-[#FF9D00] hover:text-[#FF9D00]"
            style={{
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#F5F5F5',
              fontFamily: "'Syne', sans-serif",
            }}
          >
            View Source Code
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3">
            <CivicLogo size={22} />
            <span style={{ fontFamily: "'Syne', sans-serif" }} className="text-sm text-[#888]">CivicChain</span>
          </div>
          <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-xs text-[#888]/60">
            © 2025 CivicChain &nbsp;•&nbsp; Built on Ethereum &nbsp;•&nbsp; Open Source &nbsp;•&nbsp;
            <a href="#" className="hover:text-[#FF9D00] transition-colors"> Contact</a>
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 live-dot" />
            <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] text-green-400/60">All Systems Operational</span>
          </div>
        </div>
      </div>
    </section>
  );
}