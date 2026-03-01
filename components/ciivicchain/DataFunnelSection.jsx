import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionLabel from './SectionLabel';

const useCountUp = (target, active, duration = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
};

const sources = [
  { label: 'MetaMask', angle: -60, color: '#E8831D' },
  { label: 'DAO Vote', angle: 0, color: '#FF9D00' },
  { label: 'Snapshot', angle: 60, color: '#8B5CF6' },
  { label: 'Gnosis', angle: 120, color: '#00C2A8' },
  { label: 'Aragon', angle: 180, color: '#FF6B6B' },
  { label: 'On-Chain', angle: 240, color: '#4ADE80' },
];

export default function DataFunnelSection() {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (inView && !pulse) {
      setTimeout(() => setPulse(true), 1200);
    }
  }, [inView]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const stat1 = useCountUp(100, inView);
  const stat3 = useCountUp(10000000, inView, 3000);

  return (
    <section ref={sectionRef} className="py-36 px-6 relative overflow-hidden" style={{ background: '#080808' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle 600px at 50% 50%, rgba(255,157,0,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto">
        <SectionLabel text="// data.pipeline.active" />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-4xl md:text-6xl font-bold text-[#F5F5F5] mb-20 max-w-2xl"
        >
          Every voice,{' '}
          <span className="text-[#FF9D00]">secured</span> on-chain
        </motion.h2>

        {/* Data funnel visual */}
        <div ref={ref} className="relative flex items-center justify-center mb-24">
          <div className="relative w-[340px] h-[340px] md:w-[480px] md:h-[480px]">
            {/* SVG paths */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 480">
              {sources.map((src, i) => {
                const rad = (src.angle * Math.PI) / 180;
                const r = 200;
                const x1 = 240 + Math.cos(rad) * r;
                const y1 = 240 + Math.sin(rad) * r;
                const cx1 = 240 + Math.cos(rad) * r * 0.5;
                const cy1 = 240 + Math.sin(rad) * r * 0.5;
                const pathLength = 280;

                return (
                  <motion.path
                    key={i}
                    d={`M ${x1} ${y1} Q ${cx1} ${cy1} 240 240`}
                    stroke={src.color}
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray={pathLength}
                    initial={{ strokeDashoffset: pathLength }}
                    animate={inView ? { strokeDashoffset: 0 } : {}}
                    transition={{ duration: 1.2, delay: i * 0.15, ease: 'easeInOut' }}
                    style={{ filter: `drop-shadow(0 0 4px ${src.color})` }}
                    opacity={0.7}
                  />
                );
              })}
            </svg>

            {/* Source nodes */}
            {sources.map((src, i) => {
              const rad = (src.angle * Math.PI) / 180;
              const r = 195;
              const x = 50 + ((240 + Math.cos(rad) * r) / 480) * 100;
              const y = 50 + ((240 + Math.sin(rad) * r) / 480) * 100;

              return (
                <motion.div
                  key={i}
                  className="absolute flex flex-col items-center"
                  style={{
                    left: `${((240 + Math.cos(rad) * r) / 480) * 100}%`,
                    top: `${((240 + Math.sin(rad) * r) / 480) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.12 }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-[9px] font-bold glass-card"
                    style={{
                      border: `1px solid ${src.color}40`,
                      color: src.color,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {src.label.slice(0, 3).toUpperCase()}
                  </div>
                  <span
                    className="text-[9px] mt-1 hidden md:block"
                    style={{ color: src.color, fontFamily: "'DM Mono', monospace", opacity: 0.7 }}
                  >
                    {src.label}
                  </span>
                </motion.div>
              );
            })}

            {/* Center Engine */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Radar pulses */}
                {pulse && (
                  <>
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'rgba(255,157,0,0.15)',
                        animation: 'radarPulse 2s ease-out infinite',
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'rgba(255,157,0,0.08)',
                        animation: 'radarPulse2 2s ease-out 0.7s infinite',
                      }}
                    />
                  </>
                )}
                <div
                  className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,157,0,0.2), rgba(255,157,0,0.05))',
                    border: '1px solid rgba(255,157,0,0.4)',
                    boxShadow: '0 0 40px rgba(255,157,0,0.2)',
                  }}
                >
                  <span
                    style={{ fontFamily: "'DM Mono', monospace" }}
                    className="text-[10px] text-[#FF9D00] font-bold text-center leading-tight"
                  >
                    CIVIC<br />CHAIN
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { value: '100%', label: 'Immutable', desc: 'Votes sealed on-chain' },
            { value: '0', label: 'Admin Overrides', desc: 'Zero privilege escalation' },
            { value: '∞', label: 'Verifiable Votes', desc: 'Publicly auditable forever' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.15 }}
              className="text-center glass-card rounded-2xl py-10 px-6"
            >
              <div
                className="text-5xl md:text-6xl font-extrabold text-[#FF9D00] mb-2"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {stat.value}
              </div>
              <div
                className="text-lg font-semibold text-[#F5F5F5] mb-1"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {stat.label}
              </div>
              <div
                className="text-xs text-[#888]"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}