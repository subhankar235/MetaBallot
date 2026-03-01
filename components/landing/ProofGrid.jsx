import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Lock, Activity, Users, Globe, Zap } from 'lucide-react';

const CountUpNumber = ({ end, suffix = '', prefix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, isInView]);
  
  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const LiveCounter = () => {
  const [votes, setVotes] = useState(1847293);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setVotes(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 800);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[#FF9900]/20 blur-3xl rounded-full" />
      <span className="relative text-5xl md:text-7xl font-bold text-[#FF9900] font-mono">
        {votes.toLocaleString()}
      </span>
      <div className="flex items-center justify-center gap-2 mt-2">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-green-500 text-sm">Live Count</span>
      </div>
    </div>
  );
};

export default function ProofGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });

  return (
    <section ref={ref} className="relative py-32 px-6 bg-[#050505] overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#FF9900]/10 blur-[128px] rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-red-500/5 blur-[128px] rounded-full" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            The Numbers Don't Lie
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Real metrics from real elections. Transparent, verifiable, and trusted worldwide.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Large Card - 100% Immutable */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:row-span-2 bg-gradient-to-br from-[#FF9900]/20 to-transparent rounded-3xl p-10 border border-[#FF9900]/20 flex flex-col justify-center"
          >
            <Shield className="w-12 h-12 text-[#FF9900] mb-6" />
            <div className="text-6xl md:text-8xl font-bold text-[#FF9900] mb-4">
              <CountUpNumber end={100} suffix="%" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">Immutable</h3>
            <p className="text-white/60">
              Every vote recorded on the blockchain is permanent and cannot be altered by anyone, ever.
            </p>
          </motion.div>

          {/* 0% Manipulation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-red-500/10 to-[#FF9900]/10 rounded-3xl p-8 border border-red-500/10"
          >
            <Lock className="w-10 h-10 text-red-500 mb-4" />
            <div className="text-5xl md:text-6xl font-bold mb-2">
              <span className="text-red-500">0</span>
              <span className="text-[#FF9900]">%</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-1">Manipulation</h3>
            <p className="text-white/50 text-sm">
              Zero successful attacks. Zero compromised votes. Zero tolerance.
            </p>
          </motion.div>

          {/* Real-Time Audit */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/5 rounded-3xl p-8 border border-white/10"
          >
            <Activity className="w-10 h-10 text-[#FF9900] mb-4" />
            <LiveCounter />
            <h3 className="text-xl font-semibold text-white mt-4 mb-1">Real-Time Audit</h3>
            <p className="text-white/50 text-sm">
              Watch votes being recorded live on the blockchain.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-2 grid grid-cols-3 gap-6"
          >
            <div className="bg-white/5 rounded-2xl p-6 text-center border border-white/5">
              <Users className="w-8 h-8 text-[#FF9900] mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">
                <CountUpNumber end={2} suffix="M+" />
              </div>
              <p className="text-white/50 text-sm">Active Voters</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 text-center border border-white/5">
              <Globe className="w-8 h-8 text-[#FF9900] mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">
                <CountUpNumber end={47} suffix="+" />
              </div>
              <p className="text-white/50 text-sm">Countries</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 text-center border border-white/5">
              <Zap className="w-8 h-8 text-[#FF9900] mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">
                <CountUpNumber end={99} suffix="%" prefix="" />
              </div>
              <p className="text-white/50 text-sm">Uptime</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}