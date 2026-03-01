import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionLabel from './SectionLabel';

const tools = [
  { name: 'Solidity', role: 'Smart Contract Language', color: '#627EEA', abbr: 'SOL' },
  { name: 'Hardhat', role: 'Dev & Testing Framework', color: '#F7CA18', abbr: 'HH' },
  { name: 'Next.js', role: 'Full-Stack React Framework', color: '#F5F5F5', abbr: 'NXT' },
  { name: 'shadcn/ui', role: 'Accessible UI Components', color: '#FF9D00', abbr: 'SHN' },
  { name: 'MetaMask', role: 'Web3 Wallet Integration', color: '#E8831D', abbr: 'MM' },
  { name: 'Web3.js', role: 'Blockchain Interaction Layer', color: '#F16822', abbr: 'W3' },
];

export default function TechStackSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section ref={ref} className="py-36 px-6 relative" style={{ background: '#0D0D0D' }}>
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="// tech.stack" />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-4xl md:text-6xl font-bold text-[#F5F5F5] mb-16 max-w-2xl"
        >
          Built With{' '}
          <span className="text-[#FF9D00]">Battle-Tested</span> Tools
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group glass-card rounded-2xl p-6 cursor-default transition-all duration-300 hover:-translate-y-1"
              style={{
                transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
              }}
              whileHover={{
                borderColor: 'rgba(255,157,0,0.3)',
                boxShadow: '0 0 30px rgba(255,157,0,0.1)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-sm font-bold"
                style={{
                  background: `${tool.color}15`,
                  border: `1px solid ${tool.color}30`,
                  color: tool.color,
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {tool.abbr}
              </div>
              <h3
                style={{ fontFamily: "'Syne', sans-serif" }}
                className="text-lg font-bold text-[#F5F5F5] mb-1"
              >
                {tool.name}
              </h3>
              <p
                style={{ fontFamily: "'DM Mono', monospace" }}
                className="text-xs text-[#888]"
              >
                {tool.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}