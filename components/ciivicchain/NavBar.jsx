import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CivicLogo from './CivicLogo';

const links = ['Features', 'How It Works', 'Use Cases', 'Transparency', 'FAQ'];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      }}
    >
      <div className="flex items-center gap-3">
        <CivicLogo size={32} />
        <span style={{ fontFamily: "'Syne', sans-serif" }} className="text-[#F5F5F5] font-semibold text-lg tracking-tight">
          CivicChain
        </span>
      </div>

      <div className="hidden md:flex items-center gap-7">
        {links.map((link) => (
          <a
            key={link}
            href="#"
            className="text-sm text-[#888] hover:text-[#F5F5F5] transition-colors duration-300"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {link}
          </a>
        ))}
      </div>

      <button
        className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
        style={{
          background: '#FF9D00',
          color: '#0A0A0A',
          fontFamily: "'Syne', sans-serif",
        }}
      >
        Launch App
      </button>
    </motion.nav>
  );
}