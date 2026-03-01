import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import SectionLabel from './SectionLabel';

const timestamps = [
  { label: '0:12 — Connect your wallet', time: 12 },
  { label: '0:28 — Cast your vote', time: 28 },
  { label: '0:45 — Verify on blockchain', time: 45 },
];

const bullets = [
  'No personal data stored on-chain',
  'Receipt hash generated instantly',
  'Publicly auditable by anyone',
];

export default function DemoVideoSection() {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
    if (videoRef.current) videoRef.current.play();
  };

  const seekTo = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <section ref={ref} className="py-36 px-6 relative overflow-hidden" style={{ background: '#0A0A0A' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(255,157,0,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
        <SectionLabel text="// demo.preview" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2
            style={{ fontFamily: "'Syne', sans-serif" }}
            className="text-4xl md:text-6xl font-bold text-[#F5F5F5] mb-5"
          >
            See CivicChain{' '}
            <span className="text-[#FF9D00]">In Action</span>
          </h2>
          <p className="text-[#888] text-lg max-w-2xl mx-auto">
            Watch how a secure, tamper-proof vote is cast and verified in under 60 seconds.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10 items-center">
          {/* Video Player — 2 cols */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                border: '1px solid rgba(255,157,0,0.35)',
                boxShadow: '0 0 60px rgba(255,157,0,0.12), 0 0 120px rgba(255,157,0,0.06)',
                aspectRatio: '16/9',
                background: 'linear-gradient(135deg, #0f0f0f 0%, #181818 100%)',
              }}
            >
              {/* Grid pattern bg */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,157,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,157,0,0.04) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Actual video (hidden until played) */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                src=""
                onEnded={() => setPlaying(false)}
              />

              {/* Play overlay */}
              {!playing && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={handlePlay}
                    className="relative group"
                  >
                    {/* Radar pulses */}
                    <div
                      className="absolute inset-0 rounded-full bg-[#FF9D00]"
                      style={{ animation: 'radarPulse 2s ease-out infinite', opacity: 0.3 }}
                    />
                    <div
                      className="absolute inset-0 rounded-full bg-[#FF9D00]"
                      style={{ animation: 'radarPulse2 2s ease-out 0.8s infinite', opacity: 0.15 }}
                    />
                    <div
                      className="relative w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: '#FF9D00',
                        boxShadow: '0 0 40px rgba(255,157,0,0.4)',
                      }}
                    >
                      <Play className="w-8 h-8 text-black ml-1" fill="black" />
                    </div>
                  </button>
                </div>
              )}

              {/* Corner tag */}
              <div
                className="absolute top-4 left-4 px-3 py-1 rounded-full"
                style={{
                  background: 'rgba(10,10,10,0.8)',
                  border: '1px solid rgba(255,157,0,0.2)',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '10px',
                  color: '#FF9D00',
                }}
              >
                DEMO v2.4.1
              </div>
            </div>

            {/* Timestamp chips */}
            <div className="flex flex-wrap gap-3 mt-5">
              {timestamps.map((ts) => (
                <button
                  key={ts.time}
                  onClick={() => seekTo(ts.time)}
                  className="px-4 py-2 rounded-full text-xs transition-all duration-300 hover:border-[#FF9D00] hover:text-[#FF9D00]"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#888',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                >
                  ⏱ {ts.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Side bullets — desktop only */}
          <div className="hidden lg:flex flex-col justify-center gap-6">
            {bullets.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                className="flex items-start gap-4 glass-card rounded-2xl p-5"
              >
                <span className="text-[#FF9D00] text-lg font-bold mt-0.5">✦</span>
                <p className="text-[#F5F5F5]/80 text-sm leading-relaxed">{b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}