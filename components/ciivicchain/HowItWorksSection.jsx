import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Wallet, Vote, Hash, Search } from 'lucide-react';
import SectionLabel from './SectionLabel';

const steps = [
  { icon: Wallet, num: '01', title: 'Connect Wallet', desc: 'Authenticate with MetaMask or WalletConnect' },
  { icon: Vote, num: '02', title: 'Cast Vote', desc: 'Submit your encrypted ballot on-chain' },
  { icon: Hash, num: '03', title: 'Receive Hash', desc: 'Get a unique cryptographic receipt' },
  { icon: Search, num: '04', title: 'Verify On-Chain', desc: 'Publicly audit your vote anytime' },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const svgRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end center'] });
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="py-36 px-6 relative overflow-hidden" style={{ background: '#0D0D0D' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 100%, rgba(255,157,0,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
        <SectionLabel text="// process.flow" />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-4xl md:text-6xl font-bold text-[#F5F5F5] mb-20 max-w-2xl"
        >
          Four steps to an{' '}
          <span className="text-[#FF9D00]">immutable</span> vote
        </motion.h2>

        {/* Desktop horizontal */}
        <div className="hidden md:block relative">
          {/* SVG connector line */}
          <div className="absolute top-14 left-[10%] right-[10%] h-px">
            <svg width="100%" height="2" className="overflow-visible">
              <motion.line
                x1="0" y1="1" x2="100%" y2="1"
                stroke="rgba(255,157,0,0.15)"
                strokeWidth="1"
                strokeDasharray="6 4"
              />
              <motion.line
                x1="0" y1="1" x2="100%" y2="1"
                stroke="#FF9D00"
                strokeWidth="1.5"
                strokeDasharray="0 100%"
                style={{
                  strokeDashoffset: useTransform(lineProgress, [0, 1], ['100%', '0%']),
                  strokeDasharray: '100% 0',
                  filter: 'drop-shadow(0 0 6px rgba(255,157,0,0.6))',
                }}
              />
            </svg>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.18 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-6">
                  {/* Glow ring */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'rgba(255,157,0,0.12)', filter: 'blur(10px)', transform: 'scale(1.4)' }}
                  />
                  <div
                    className="relative w-28 h-28 rounded-full flex items-center justify-center glass-card border-[#FF9D00]/20"
                    style={{ border: '1px solid rgba(255,157,0,0.2)' }}
                  >
                    <s.icon className="w-10 h-10 text-[#FF9D00]" />
                  </div>
                  <div
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{
                      background: '#FF9D00',
                      color: '#0A0A0A',
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {s.num}
                  </div>
                </div>
                <h3
                  style={{ fontFamily: "'Syne', sans-serif" }}
                  className="text-lg font-bold text-[#F5F5F5] mb-2"
                >
                  {s.title}
                </h3>
                <p className="text-sm text-[#888] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden flex flex-col gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="flex items-start gap-5"
            >
              <div className="relative flex-shrink-0">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center glass-card"
                  style={{ border: '1px solid rgba(255,157,0,0.2)' }}
                >
                  <s.icon className="w-6 h-6 text-[#FF9D00]" />
                </div>
                <div
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                  style={{ background: '#FF9D00', color: '#0A0A0A', fontFamily: "'DM Mono', monospace" }}
                >
                  {s.num.slice(1)}
                </div>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Syne', sans-serif" }} className="text-lg font-bold text-[#F5F5F5] mb-1">
                  {s.title}
                </h3>
                <p className="text-sm text-[#888]">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}