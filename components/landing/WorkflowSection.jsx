import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Wallet, Vote, CheckCircle, ArrowDown } from 'lucide-react';

const steps = [
  {
    icon: Wallet,
    number: '01',
    title: 'Connect Wallet',
    description: 'Link your digital wallet to authenticate your identity securely. One wallet, one vote guarantee.',
  },
  {
    icon: Vote,
    number: '02',
    title: 'Cast Your Vote',
    description: 'Select your choice from the ballot. Your vote is encrypted and signed with your private key.',
  },
  {
    icon: CheckCircle,
    number: '03',
    title: 'Verify Hash',
    description: 'Receive a unique transaction hash. Verify your vote on the blockchain explorer anytime.',
  },
];

const StepCard = ({ step, index, isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      <div className="flex gap-8">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.2 + 0.3,
            type: "spring",
            bounce: 0.4
          }}
          className="relative flex-shrink-0"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF9900] to-[#FFB84D] flex items-center justify-center shadow-lg shadow-[#FF9900]/30">
            <step.icon className="w-10 h-10 text-black" strokeWidth={1.5} />
          </div>
          <div className="absolute -top-2 -left-2 w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-white">
            {step.number}
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 pt-2">
          <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
          <p className="text-white/60 leading-relaxed">{step.description}</p>
        </div>
      </div>

      {/* Connector Line */}
      {index < steps.length - 1 && (
        <motion.div
          initial={{ height: 0 }}
          animate={isInView ? { height: 60 } : {}}
          transition={{ duration: 0.4, delay: index * 0.2 + 0.5 }}
          className="ml-10 w-[2px] bg-gradient-to-b from-[#FF9900]/50 to-transparent my-4"
        />
      )}
    </motion.div>
  );
};

export default function WorkflowSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });

  return (
    <section ref={ref} className="relative py-32 px-6 bg-[#0a0a0a]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Vote in <span className="text-[#FF9900]">3 Simple Steps</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            From connection to verification in under a minute. 
            Democracy made simple, secure, and transparent.
          </p>
        </motion.div>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <StepCard 
              key={step.number} 
              step={step} 
              index={index} 
              isInView={isInView}
            />
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF9900] hover:bg-[#FFB84D] text-black font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-[#FF9900]/20">
            Get Started Now
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}