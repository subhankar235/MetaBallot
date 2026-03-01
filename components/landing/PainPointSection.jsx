import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { XCircle, CheckCircle, AlertTriangle, Shield, Lock, Eye, EyeOff } from 'lucide-react';

const problems = [
  { icon: AlertTriangle, label: 'Hidden Manipulation', color: 'text-red-500' },
  { icon: EyeOff, label: 'Backdoor Changes', color: 'text-red-500' },
  { icon: XCircle, label: 'Centralized Control', color: 'text-red-500' },
];

const solutions = [
  { icon: Shield, label: 'Decentralized Proof', color: 'text-[#FF9900]' },
  { icon: Lock, label: 'Immutable Records', color: 'text-[#FF9900]' },
  { icon: Eye, label: 'Full Transparency', color: 'text-[#FF9900]' },
];

export default function PainPointSection({ bgProgress }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });

  // Calculate background color based on scroll
  const bgColor = `rgb(${5 + bgProgress * 245}, ${5 + bgProgress * 245}, ${5 + bgProgress * 245})`;
  const textColor = bgProgress > 0.5 ? '#050505' : '#ffffff';

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen py-32 px-6 transition-colors duration-500"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 
            className="text-4xl md:text-6xl font-bold mb-6 transition-colors duration-500"
            style={{ color: textColor }}
          >
            Why VoteChain{' '}
            <span className="text-[#FF9900]">Matters</span>
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto transition-colors duration-500"
            style={{ color: bgProgress > 0.5 ? '#666' : '#999' }}
          >
            Traditional voting systems are vulnerable. We're changing that.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Traditional Systems */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-red-500/5 rounded-3xl blur-3xl" />
            <div 
              className="relative p-8 rounded-3xl border transition-colors duration-500"
              style={{ 
                borderColor: bgProgress > 0.5 ? '#fee2e2' : '#3f1515',
                backgroundColor: bgProgress > 0.5 ? '#fef2f2' : 'rgba(239, 68, 68, 0.05)'
              }}
            >
              <h3 
                className="text-2xl font-semibold mb-8 transition-colors duration-500"
                style={{ color: textColor }}
              >
                Traditional Systems
              </h3>
              <div className="space-y-6">
                {problems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="p-3 rounded-xl bg-red-500/10">
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <span 
                      className="text-lg font-medium transition-colors duration-500"
                      style={{ color: textColor }}
                    >
                      {item.label}
                    </span>
                    <span className="ml-auto text-red-500 text-sm font-semibold px-3 py-1 bg-red-500/10 rounded-full">
                      VULNERABLE
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* VoteChain Solution */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#FF9900]/10 rounded-3xl blur-3xl" />
            <div 
              className="relative p-8 rounded-3xl border transition-colors duration-500"
              style={{ 
                borderColor: bgProgress > 0.5 ? '#fef3c7' : '#3d2f0a',
                backgroundColor: bgProgress > 0.5 ? '#fffbeb' : 'rgba(255, 153, 0, 0.05)'
              }}
            >
              <h3 
                className="text-2xl font-semibold mb-8 transition-colors duration-500"
                style={{ color: textColor }}
              >
                VoteChain Solution
              </h3>
              <div className="space-y-6">
                {solutions.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="p-3 rounded-xl bg-[#FF9900]/10">
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <span 
                      className="text-lg font-medium transition-colors duration-500"
                      style={{ color: textColor }}
                    >
                      {item.label}
                    </span>
                    <span className="ml-auto text-[#FF9900] text-sm font-semibold px-3 py-1 bg-[#FF9900]/10 rounded-full">
                      SECURED
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}