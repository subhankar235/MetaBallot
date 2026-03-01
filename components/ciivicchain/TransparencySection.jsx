import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Copy, Check, ExternalLink, Github } from 'lucide-react';
import SectionLabel from './SectionLabel';

export default function TransparencySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('0x4a3b8c7d2e1f5a9b6c4d3e2f1a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a9b');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={ref} className="py-36 px-6 relative overflow-hidden" style={{ background: '#0D0D0D' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle 400px at 50% 50%, rgba(255,157,0,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-3xl mx-auto text-center">
        <SectionLabel text="// contract.verified = true" />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-16"
        >
          Radical{' '}
          <span className="text-[#FF9D00]">Transparency</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card rounded-3xl p-8 md:p-12 text-left glow-orange"
        >
          {/* Live indicator */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}>
              <span className="w-2 h-2 rounded-full bg-green-400 live-dot" />
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] text-green-400 tracking-widest">LIVE ON-CHAIN</span>
            </div>
          </div>

          <div className="space-y-5">
            {/* Contract Address */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-xs text-[#888]">Contract Address</span>
              <div className="flex items-center gap-3">
                <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-sm text-[#FF9D00] break-all">
                  0x4a3b...f9c2
                </span>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg transition-all duration-200 hover:bg-[#FF9D00]/10"
                >
                  {copied
                    ? <Check className="w-4 h-4 text-green-400" />
                    : <Copy className="w-4 h-4 text-[#888] hover:text-[#FF9D00]" />
                  }
                </button>
              </div>
            </div>

            {/* Network */}
            <div className="flex items-center justify-between py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-xs text-[#888]">Network</span>
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-sm text-[#F5F5F5]">Ethereum Sepolia Testnet</span>
            </div>

            {/* Compiler */}
            <div className="flex items-center justify-between py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-xs text-[#888]">Compiler</span>
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-sm text-[#F5F5F5]">Solidity v0.8.24</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 hover:bg-[#FF9D00]/10 hover:border-[#FF9D00] text-sm"
              style={{ border: '1px solid rgba(255,157,0,0.4)', color: '#FF9D00', fontFamily: "'Syne', sans-serif" }}
            >
              View on Explorer <ExternalLink className="w-4 h-4" />
            </button>
            <button
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 hover:bg-[#FF9D00]/10 hover:border-[#FF9D00] text-sm"
              style={{ border: '1px solid rgba(255,157,0,0.4)', color: '#FF9D00', fontFamily: "'Syne', sans-serif" }}
            >
              GitHub Open Source <Github className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}