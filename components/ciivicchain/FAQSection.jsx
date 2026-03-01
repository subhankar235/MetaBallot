import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import SectionLabel from './SectionLabel';

const faqs = [
  {
    q: 'Can the admin change or delete votes?',
    a: 'No. Once a vote transaction is submitted to the blockchain, it is immutable. Even the contract deployer cannot alter or remove it. The smart contract has no admin privilege that allows vote modification — this is enforced at the code level and publicly verifiable.',
    mono: 'admin.override = false // enforced on-chain',
  },
  {
    q: 'Is my identity visible on the blockchain?',
    a: 'No. CivicChain uses zero-knowledge proofs to verify voter eligibility without revealing who you are. Your wallet address is never directly linked to your vote on the public ledger.',
    mono: 'identity.leak = 0 // zk-SNARK verified',
  },
  {
    q: 'What happens if I lose my receipt hash?',
    a: 'Your vote is still counted regardless. The receipt hash is solely for your personal verification. You can re-derive your transaction hash from your wallet history at any time.',
    mono: 'vote.counted = true // independent of receipt',
  },
  {
    q: 'Can someone vote more than once?',
    a: 'No. Each eligible voter identity is tied to a unique nullifier in the zero-knowledge circuit. The contract rejects any vote from an identity that has already submitted — without knowing who that identity is.',
    mono: 'duplicate.vote = REJECTED // nullifier enforced',
  },
  {
    q: 'Which blockchain network is used?',
    a: 'CivicChain currently deploys on Ethereum Sepolia Testnet for development and Ethereum Mainnet for production elections. Enterprise clients can request deployment on private EVM-compatible chains.',
    mono: 'chain.id = [11155111, 1, "custom-evm"]',
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [open, setOpen] = useState(null);

  return (
    <section ref={ref} className="py-36 px-6 relative" style={{ background: '#080808' }}>
      <div className="max-w-3xl mx-auto">
        <SectionLabel text="// faq.answered" />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-4xl md:text-6xl font-bold text-[#F5F5F5] mb-16"
        >
          Questions?{' '}
          <span className="text-[#FF9D00]">Answered.</span>
        </motion.h2>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-6 p-6 text-left transition-colors duration-300 hover:bg-white/[0.02]"
              >
                <span
                  style={{ fontFamily: "'Syne', sans-serif" }}
                  className="text-base font-medium text-[#F5F5F5]"
                >
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    border: '1px solid rgba(255,157,0,0.4)',
                    color: '#FF9D00',
                    fontSize: '18px',
                    lineHeight: 1,
                  }}
                >
                  +
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-[#888] text-sm leading-relaxed mb-4">{faq.a}</p>
                      <p
                        style={{ fontFamily: "'DM Mono', monospace" }}
                        className="text-[11px] text-[#FF9D00]/50"
                      >
                        {faq.mono}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}