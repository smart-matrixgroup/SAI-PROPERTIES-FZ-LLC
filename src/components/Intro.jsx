import { useState, useEffect } from 'react';
import logo from '../assets/logo.svg';

export default function Intro({ onEnter }) {
  const [visible,     setVisible]     = useState(true);
  const [fadeOut,     setFadeOut]     = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [btnVisible,  setBtnVisible]  = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setTextVisible(true), 400);
    const t2 = setTimeout(() => setBtnVisible(true), 1000);

    const handleKey = (e) => { if (e.key === 'Enter') handleEnter(); };
    window.addEventListener('keydown', handleKey);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  const handleEnter = () => {
    setFadeOut(true);
    setTimeout(() => { setVisible(false); onEnter(); }, 800);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center
        transition-all duration-800
        ${fadeOut ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
      style={{
        background: 'linear-gradient(135deg, #0a1628 0%, #0f2347 40%, #1a3a6b 70%, #0a1628 100%)',
      }}
    >
      {/* ── Animated background particles ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gold/10"
            style={{
              width:  `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left:   `${Math.random() * 100}%`,
              top:    `${Math.random() * 100}%`,
              animation: `floatParticle ${Math.random() * 6 + 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent" />
        <div className="absolute left-0 top-1/3 w-full h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        <div className="absolute left-0 bottom-1/3 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">

        {/* Logo */}
        <div
          className="mb-8"
          style={{ animation: 'logoAppear 0.8s ease forwards', opacity: 0 }}
        >
          <img
            src={logo}
            alt="SAI Properties FZ-LLC"
            className="h-36 w-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* Company name */}
        <div className={`transition-all duration-700
          ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h1 className="font-heading font-bold text-white text-4xl sm:text-5xl md:text-6xl
            tracking-wide mb-2 drop-shadow-lg">
            SAI PROPERTIES
          </h1>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
            <p className="text-gold font-bold text-lg tracking-[0.4em] uppercase">FZ-LLC</p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="text-white/60 text-sm sm:text-base tracking-widest uppercase font-medium mb-10">
            Premium Real Estate · Dubai, UAE
          </p>
        </div>

        {/* Enter Button */}
        <div className={`transition-all duration-700 delay-200
          ${btnVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <button
            onClick={handleEnter}
            className="group relative flex items-center gap-3 border-2 border-gold/60
              hover:border-gold text-white px-10 py-4 rounded-full font-bold text-base
              tracking-widest uppercase transition-all duration-300
              hover:bg-gold/10 hover:shadow-2xl hover:shadow-gold/20
              hover:-translate-y-1 active:translate-y-0"
          >
            {/* Shimmer */}
            <span className="absolute inset-0 rounded-full overflow-hidden">
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%]
                bg-gradient-to-r from-transparent via-white/10 to-transparent
                transition-transform duration-700" />
            </span>

            <span className="relative">Enter</span>

            {/* Arrow */}
            <span className="relative flex items-center justify-center w-6 h-6
              border border-gold/50 rounded-full group-hover:border-gold
              group-hover:bg-gold/20 transition-all duration-300">
              <svg className="w-3 h-3 text-gold group-hover:translate-x-0.5 transition-transform"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>

          <p className="text-white/30 text-xs mt-4 tracking-widest uppercase">
            or press{' '}
            <kbd className="bg-white/10 px-2 py-0.5 rounded text-white/50 font-mono">
              Enter
            </kbd>
          </p>
        </div>

        {/* Bottom tagline */}
        <div className={`absolute bottom-10 transition-all duration-700 delay-500
          ${btnVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-white/20 text-xs tracking-[0.3em] uppercase">
            Innovating Connectivity Across Global Markets
          </p>
        </div>
      </div>

      <style>{`
        @keyframes logoAppear {
          0%   { opacity: 0; transform: scale(0.7) translateY(-20px); }
          60%  { transform: scale(1.05) translateY(0); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          33%      { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
          66%      { transform: translateY(10px) translateX(-8px); opacity: 0.5; }
        }
        .duration-800 { transition-duration: 800ms; }
      `}</style>
    </div>
  );
}
