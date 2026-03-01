import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Shield, Eye, BarChart3, Lock, Hash, User } from 'lucide-react';

const features = [
  {
    id: 'tamper-proof',
    label: 'Tamper-Proof',
    icon: Shield,
    title: 'Permanently Secured',
    description: 'Every vote is cryptographically sealed and distributed across thousands of nodes. Once recorded, it cannot be altered, deleted, or manipulated by anyone.',
    visual: 'hash'
  },
  {
    id: 'anonymous',
    label: 'Anonymous',
    icon: Eye,
    title: 'Zero-Knowledge Privacy',
    description: 'Your vote is verified without revealing your identity. Using advanced cryptographic proofs, we ensure complete anonymity while maintaining full auditability.',
    visual: 'identity'
  },
  {
    id: 'live-results',
    label: 'Live Results',
    icon: BarChart3,
    title: 'Real-Time Transparency',
    description: 'Watch votes being tallied in real-time. Every transaction is publicly verifiable on the blockchain, ensuring complete transparency in the democratic process.',
    visual: 'chart'
  }
];

const HashScroller = () => {
  const [hashes, setHashes] = useState([]);
  
  useEffect(() => {
    const generateHash = () => {
      return '0x' + Array.from({ length: 64 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
    };
    
    const interval = setInterval(() => {
      setHashes(prev => {
        const newHashes = [...prev, generateHash()];
        return newHashes.slice(-5);
      });
    }, 1500);
    
    // Initialize with some hashes
    setHashes([generateHash(), generateHash(), generateHash()]);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="font-mono text-xs space-y-2 overflow-hidden">
      <AnimatePresence mode="popLayout">
        {hashes.map((hash, i) => (
          <motion.div
            key={hash}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1 - i * 0.2, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center gap-2"
          >
            <Lock className="w-3 h-3 text-[#FF9900]" />
            <span className="text-[#FF9900]/80 truncate">{hash}</span>
            <span className="text-green-500 text-[10px] px-2 py-0.5 bg-green-500/10 rounded">VERIFIED</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const IdentityToggle = () => {
  const [revealed, setRevealed] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRevealed(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex items-center justify-center gap-8">
      <AnimatePresence mode="wait">
        {revealed ? (
          <motion.div
            key="user"
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <User className="w-8 h-8 text-white/60" />
            </div>
            <span className="text-sm text-white/60">John Doe</span>
          </motion.div>
        ) : (
          <motion.div
            key="hash"
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-16 h-16 rounded-full bg-[#FF9900]/20 flex items-center justify-center">
              <Hash className="w-8 h-8 text-[#FF9900]" />
            </div>
            <span className="text-sm text-[#FF9900] font-mono">0x7f3a...</span>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="text-2xl text-white/20">→</div>
      <div className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
          <Shield className="w-8 h-8 text-green-500" />
        </div>
        <span className="text-sm text-green-500">Verified Vote</span>
      </div>
    </div>
  );
};

const LiveChart = () => {
  const [votes, setVotes] = useState({ yes: 67, no: 33 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setVotes(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newYes = Math.max(40, Math.min(80, prev.yes + change));
        return { yes: newYes, no: 100 - newYes };
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-[#FF9900]">Option A</span>
          <span className="text-[#FF9900] font-mono">{votes.yes}%</span>
        </div>
        <div className="h-3 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FF9900] to-[#FFB84D] rounded-full"
            animate={{ width: `${votes.yes}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Option B</span>
          <span className="text-white/60 font-mono">{votes.no}%</span>
        </div>
        <div className="h-3 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white/20 rounded-full"
            animate={{ width: `${votes.no}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
      <div className="text-center text-xs text-white/40 mt-4">
        Live • Updated every block
      </div>
    </div>
  );
};

export default function FeatureTabs() {
  const [activeTab, setActiveTab] = useState('tamper-proof');
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });

  useEffect(() => {
    if (!isInView) return;
    
    const duration = 5000;
    const interval = 50;
    let elapsed = 0;
    
    const timer = setInterval(() => {
      elapsed += interval;
      setProgress((elapsed / duration) * 100);
      
      if (elapsed >= duration) {
        elapsed = 0;
        setProgress(0);
        setActiveTab(prev => {
          const currentIndex = features.findIndex(f => f.id === prev);
          return features[(currentIndex + 1) % features.length].id;
        });
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [activeTab, isInView]);

  const activeFeature = features.find(f => f.id === activeTab);

  return (
    <section ref={ref} className="relative py-32 px-6 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Built for <span className="text-[#FF9900]">Trust</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Three pillars that make VoteChain the most secure voting platform ever created.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/5 rounded-full p-1.5 backdrop-blur-sm">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => {
                  setActiveTab(feature.id);
                  setProgress(0);
                }}
                className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === feature.id ? 'text-black' : 'text-white/60 hover:text-white'
                }`}
              >
                {activeTab === feature.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#FF9900] rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <feature.icon className="w-4 h-4" />
                  {feature.label}
                </span>
                {activeTab === feature.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-black/30 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                {activeFeature.title}
              </h3>
              <p className="text-lg text-white/60 leading-relaxed">
                {activeFeature.description}
              </p>
            </div>
            <div className="bg-white/5 rounded-3xl p-8 backdrop-blur-sm border border-white/10 min-h-[250px] flex items-center justify-center">
              {activeFeature.visual === 'hash' && <HashScroller />}
              {activeFeature.visual === 'identity' && <IdentityToggle />}
              {activeFeature.visual === 'chart' && <LiveChart />}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}