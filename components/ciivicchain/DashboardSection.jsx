

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import SectionLabel from './SectionLabel';

const useCountUp = (target, active, duration = 2500) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
};

const DonutChart = ({ inView }) => {
  const segments = [
    { label: 'Alice Chen', pct: 48, color: '#FF9D00' },
    { label: 'Marcus Webb', pct: 32, color: '#F5F5F5' },
    { label: 'Priya Nair', pct: 20, color: '#888' },
  ];

  const r = 60;
  const stroke = 22;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex items-center gap-8">
      <div className="relative w-36 h-36 flex-shrink-0">
        <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
          <circle cx="80" cy="80" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
          {segments.map((seg, i) => {
            const dashLen = (seg.pct / 100) * circumference;
            const dashOffset = -(offset / 100) * circumference;
            offset += seg.pct;
            return (
              <motion.circle
                key={i}
                cx="80" cy="80" r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth={stroke}
                strokeDasharray={`0 ${circumference}`}
                animate={inView ? { strokeDasharray: `${dashLen} ${circumference - dashLen}`, strokeDashoffset: dashOffset } : {}}
                transition={{ duration: 1.2, delay: i * 0.2, ease: 'easeInOut' }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div style={{ fontFamily: "'DM Mono', monospace" }} className="text-lg font-bold text-[#FF9D00]">48%</div>
            <div className="text-[9px] text-[#888]">leading</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: seg.color }} />
            <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-xs text-[#888]">{seg.label}</span>
            <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-xs ml-auto" style2={{ color: seg.color }}>{seg.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const txns = [
  { hash: '0x7f3a...b91c', time: '2s ago', status: 'Confirmed' },
  { hash: '0xd2e1...45fa', time: '14s ago', status: 'Confirmed' },
  { hash: '0x8b7c...23d9', time: '31s ago', status: 'Confirmed' },
];

export default function DashboardSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const votes = useCountUp(1247, inView, 2500);

  return (
    <section className="py-36 px-6 relative" style={{ background: '#0A0A0A' }}>
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="// dashboard.live" />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7 }}
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-4xl md:text-6xl font-bold text-[#F5F5F5] mb-16 max-w-2xl"
        >
          Full Transparency,{' '}
          <span className="text-[#FF9D00]">Live</span>
        </motion.h2>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative rounded-3xl p-8 md:p-12 glow-orange"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,157,0,0.2)',
            backgroundImage: `linear-gradient(rgba(255,157,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,157,0,0.025) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        >
          {/* Header bar */}
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <div>
              <h3 style={{ fontFamily: "'Syne', sans-serif" }} className="text-xl font-bold text-[#F5F5F5]">
                City Council Election 2025
              </h3>
              <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-xs text-[#888] mt-1">
                election.id = 0x4f9c...
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)' }}>
              <span className="w-2 h-2 rounded-full bg-green-400 live-dot" />
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-xs text-green-400">
                Chain Synced • Last block: 2s ago
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Left: Donut */}
            <div>
              <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-xs text-[#888] mb-6">
                vote.distribution
              </p>
              <DonutChart inView={inView} />

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="rounded-2xl p-4" style={{ background: 'rgba(255,157,0,0.05)', border: '1px solid rgba(255,157,0,0.1)' }}>
                  <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] text-[#888] mb-1">Total Votes Cast</p>
                  <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-2xl font-bold text-[#FF9D00]">
                    {votes.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-2xl p-4" style={{ background: 'rgba(255,157,0,0.05)', border: '1px solid rgba(255,157,0,0.1)' }}>
                  <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] text-[#888] mb-1">Blockchain Txns</p>
                  <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-2xl font-bold text-[#FF9D00]">
                    {votes.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Transactions */}
            <div>
              <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-xs text-[#888] mb-6">
                tx.recent
              </p>
              <div className="space-y-3">
                {txns.map((tx, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-sm text-[#F5F5F5]">{tx.hash}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-xs text-[#888]">{tx.time}</span>
                      <span className="text-xs text-green-400 px-2 py-1 rounded-full" style={{ background: 'rgba(74,222,128,0.1)' }}>
                        ✓ {tx.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}