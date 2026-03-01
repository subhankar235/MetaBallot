import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { GraduationCap, Layers, Building2, Globe } from 'lucide-react';
import SectionLabel from './SectionLabel';

const tabs = [
  {
    id: 'university',
    label: 'University Elections',
    icon: GraduationCap,
    headline: 'Trusted Student Governance',
    desc: 'Enable fully transparent student body elections with cryptographic proof of every vote, eliminating disputes and building trust across campus communities.',
    stat: 'Piloted at 12 universities worldwide',
    color: '#FF9D00',
  },
  {
    id: 'dao',
    label: 'DAO Governance',
    icon: Layers,
    headline: 'Decentralized Decisions at Scale',
    desc: 'Power DAO governance with on-chain voting that integrates with Snapshot, Aragon, and Gnosis Safe — no off-chain backdoors.',
    stat: '$2.4B in treasury governed via CivicChain',
    color: '#8B5CF6',
  },
  {
    id: 'corporate',
    label: 'Corporate Voting',
    icon: Building2,
    headline: 'Board-Level Accountability',
    desc: 'Run shareholder meetings, board resolutions, and proxy votes with immutable audit trails that satisfy compliance requirements globally.',
    stat: 'SOC 2 Type II compliant infrastructure',
    color: '#4ADE80',
  },
  {
    id: 'government',
    label: 'Government Pilots',
    icon: Globe,
    headline: 'The Future of Public Elections',
    desc: 'Pilot programs with local and regional governments to deliver verifiable, anonymous, and tamper-proof elections at municipal scale.',
    stat: 'Active pilots in 3 municipalities',
    color: '#38BDF8',
  },
];

export default function UseCasesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [active, setActive] = useState('university');

  const activeTab = tabs.find((t) => t.id === active);

  return (
    <section ref={ref} className="py-36 px-6 relative" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="// use.cases" />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-4xl md:text-6xl font-bold text-[#F5F5F5] mb-16 max-w-2xl"
        >
          Built for every{' '}
          <span className="text-[#FF9D00]">democratic context</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {/* Tab bar */}
          <div className="flex overflow-x-auto scrollbar-hide gap-1 p-1.5 rounded-2xl mb-10 max-w-fit" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className="relative whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  color: active === tab.id ? '#0A0A0A' : '#888',
                  background: active === tab.id ? '#FF9D00' : 'transparent',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-5 gap-8 items-center"
            >
              {/* Icon */}
              <div className="md:col-span-2 flex items-center justify-center">
                <div
                  className="w-48 h-48 rounded-3xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${activeTab.color}15, ${activeTab.color}05)`,
                    border: `1px solid ${activeTab.color}30`,
                    boxShadow: `0 0 60px ${activeTab.color}15`,
                  }}
                >
                  <activeTab.icon
                    className="w-20 h-20"
                    style={{ color: activeTab.color }}
                    strokeWidth={1.2}
                  />
                </div>
              </div>

              {/* Text */}
              <div className="md:col-span-3">
                <h3
                  style={{ fontFamily: "'Syne', sans-serif" }}
                  className="text-3xl font-bold text-[#F5F5F5] mb-5"
                >
                  {activeTab.headline}
                </h3>
                <p className="text-[#888] text-base leading-relaxed mb-8">{activeTab.desc}</p>
                <div
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-full"
                  style={{
                    background: `${activeTab.color}10`,
                    border: `1px solid ${activeTab.color}30`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: activeTab.color }}
                  />
                  <span
                    style={{ fontFamily: "'DM Mono', monospace", color: activeTab.color }}
                    className="text-xs"
                  >
                    {activeTab.stat}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}