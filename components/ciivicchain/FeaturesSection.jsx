import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Shield, Lock, BarChart2 } from 'lucide-react';
import SectionLabel from './SectionLabel';

const AnimatedBar = ({ delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const bars = [78, 92, 65, 88, 95];

  return (
    <div ref={ref} className="flex items-end gap-1.5 h-16 mt-4">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-sm"
          style={{ background: i === 4 ? '#FF9D00' : 'rgba(255,157,0,0.3)' }}
          initial={{ height: 0 }}
          animate={inView ? { height: `${h}%` } : {}}
          transition={{ duration: 0.6, delay: delay + i * 0.08, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};

const features = [
  {
    icon: Shield,
    title: 'Tamper-Proof',
    desc: 'Every ballot is cryptographically sealed and distributed across decentralized nodes.',
    mono: 'consensus.algorithm = "PBFT"',
    span: 'md:col-span-2',
  },
  {
    icon: Lock,
    title: 'Anonymous Yet Verifiable',
    desc: 'Zero-knowledge proofs confirm your vote without revealing your identity.',
    mono: 'zk.proof.verified = true',
    span: 'md:col-span-1',
  },
  {
    icon: BarChart2,
    title: 'Live Results',
    desc: 'On-chain tallying updates in real-time as each block is confirmed.',
    mono: 'results.stream = "live"',
    span: 'md:col-span-1',
    hasChart: true,
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section ref={ref} className="py-36 px-6 relative" style={{ background: '#0A0A0A' }}>
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="// features.core" />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-4xl md:text-6xl font-bold text-[#F5F5F5] mb-16 max-w-2xl"
        >
          Three pillars of{' '}
          <span className="text-[#FF9D00]">verifiable</span> democracy
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`group relative glass-card rounded-3xl p-8 transition-all duration-300 hover:border-[#FF9D00]/30 hover:glow-orange ${f.span}`}
              style={{
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[#FF9D00]/20"
                style={{ background: 'rgba(255,157,0,0.08)' }}
              >
                <f.icon className="w-6 h-6 text-[#FF9D00]" />
              </div>

              <h3
                style={{ fontFamily: "'Syne', sans-serif" }}
                className="text-xl font-bold text-[#F5F5F5] mb-3"
              >
                {f.title}
              </h3>
              <p className="text-[#888] text-sm leading-relaxed mb-6">{f.desc}</p>

              {f.hasChart && <AnimatedBar delay={0.4} />}

              <p
                style={{ fontFamily: "'DM Mono', monospace" }}
                className="text-[10px] text-[#FF9D00]/50 mt-4"
              >
                {f.mono}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}