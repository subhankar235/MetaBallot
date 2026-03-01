import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Lock } from 'lucide-react';

export default function HeroSection({ scrollProgress }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      {/* Central Shield Icon - appears as particles funnel */}
      <motion.div
        className="absolute z-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: scrollProgress > 0.3 ? 1 : 0,
          scale: scrollProgress > 0.3 ? 1 : 0.5
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[#FF9900] blur-3xl opacity-30 rounded-full" />
          <Shield className="w-24 h-24 text-[#FF9900] relative z-10" strokeWidth={1.5} />
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Lock className="w-4 h-4 text-[#FF9900]" />
            <span className="text-sm text-white/70">Secured by Blockchain Technology</span>
          </motion.div>

          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.95] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            The Future of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9900] to-[#FFB84D]">
              Secure Digital
            </span>{' '}
            Voting is Here
          </h1>

          <motion.p
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: scrollProgress > 0.2 ? 1 : 0.6 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            VoteChain uses blockchain technology to ensure every vote is immutable, 
            transparent, and completely secure from manipulation.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              className="bg-[#FF9900] hover:bg-[#FFB84D] text-black font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-[#FF9900]/20"
            >
              Start Voting Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              className="text-white border border-white/20 hover:bg-white/5 px-8 py-6 text-lg rounded-full"
            >
              View Demo
            </Button>
          </motion.div>

          <motion.p
            className="mt-8 text-sm text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.6 }}
          >
            Built on decentralized blockchain infrastructure
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF9900]" />
        </motion.div>
      </motion.div>
    </section>
  );
}