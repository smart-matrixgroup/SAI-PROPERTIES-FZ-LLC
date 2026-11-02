import { useState, useEffect, useRef } from 'react';
import { FaWhatsapp, FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import { MdLogin } from 'react-icons/md';
import logo from '../assets/logo.svg';

// Basic obfuscation — split to avoid plain text in source
const _c = (parts) => parts.join('');
const VALID_EMAIL    = _c(['sai-property', '@', 'gmail.com']);
const VALID_PASSWORD = _c(['admin', '@', '123']);
const WA_NUMBER      = '971567986455';

export default function Intro({ onEnter }) {
  const [fadeOut,      setFadeOut]      = useState(false);
  const [visible,      setVisible]      = useState(true);
  const [textVisible,  setTextVisible]  = useState(false);
  const [formVisible,  setFormVisible]  = useState(false);
  const [email,        setEmail]        = useState('');
  const [password,     setPassword]     = useState('');
  const [showPass,     setShowPass]     = useState(false);
  const [error,        setError]        = useState('');
  const [shaking,      setShaking]      = useState(false);
  const [loading,      setLoading]      = useState(false);
  const emailRef = useRef(null);

  useEffect(() => {
    const t1 = setTimeout(() => setTextVisible(true), 400);
    const t2 = setTimeout(() => {
      setFormVisible(true);
      setTimeout(() => emailRef.current?.focus(), 300);
    }, 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleLogin = (e) => {
    e?.preventDefault();
    if (!email || !password) {
      setError('Please enter email and password.');
      shake();
      return;
    }
    if (email.trim() !== VALID_EMAIL || password !== VALID_PASSWORD) {
      setError('Incorrect email or password. Please try again.');
      shake();
      setPassword('');
      return;
    }
    // Correct — animate out
    setError('');
    setLoading(true);
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => { setVisible(false); onEnter(); }, 700);
    }, 600);
  };

  const shake = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center
        transition-all duration-700 ${fadeOut ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
      style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0f2347 45%, #1a3a6b 75%, #0a1628 100%)' }}
    >
      {/* ── Background decoration ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-gold/10"
            style={{
              width:  `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              left:   `${Math.random() * 100}%`,
              top:    `${Math.random() * 100}%`,
              animation: `floatP ${Math.random() * 6 + 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent" />
        <div className="absolute left-0 top-1/3 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
      </div>

      {/* ── Main card ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-md">

        {/* Logo */}
        <div className="mb-5" style={{ animation: 'logoIn 0.8s ease forwards', opacity: 0 }}>
          <img src={logo} alt="SAI Properties FZ-LLC"
            className="h-28 w-auto object-contain drop-shadow-2xl mx-auto" />
        </div>

        {/* Company name */}
        <div className={`transition-all duration-700 mb-7
          ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h1 className="font-heading font-bold text-white text-3xl sm:text-4xl tracking-wide mb-1">
            SAI PROPERTIES
          </h1>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
            <p className="text-gold font-bold text-sm tracking-[0.4em] uppercase">FZ-LLC</p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="text-white/40 text-xs tracking-widest uppercase">
            Premium Real Estate · Dubai, UAE
          </p>
        </div>

        {/* ── Login Form ── */}
        <div className={`w-full transition-all duration-700
          ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <form
            onSubmit={handleLogin}
            className={`bg-white/8 backdrop-blur-md border border-white/15
              rounded-2xl p-6 shadow-2xl w-full
              ${shaking ? 'animate-[shake_0.4s_ease]' : ''}`}
          >
            <p className="text-white/60 text-xs uppercase tracking-widest mb-5 font-medium">
              Sign in to continue
            </p>

            {/* Email */}
            <div className="mb-4">
              <div className={`flex items-center gap-3 bg-white/10 border rounded-xl px-4 py-3
                transition-all duration-200
                ${email ? 'border-gold/50' : 'border-white/15'} focus-within:border-gold focus-within:bg-white/15`}>
                <FaEnvelope className="text-gold/70 flex-shrink-0" size={15} />
                <input
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="Email address"
                  className="flex-1 bg-transparent text-white placeholder-white/30
                    text-sm focus:outline-none"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-5">
              <div className={`flex items-center gap-3 bg-white/10 border rounded-xl px-4 py-3
                transition-all duration-200
                ${password ? 'border-gold/50' : 'border-white/15'} focus-within:border-gold focus-within:bg-white/15`}>
                <FaLock className="text-gold/70 flex-shrink-0" size={15} />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="Password"
                  className="flex-1 bg-transparent text-white placeholder-white/30
                    text-sm focus:outline-none"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="text-white/30 hover:text-gold transition-colors flex-shrink-0"
                  tabIndex={-1}
                >
                  {showPass ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 px-3 py-2 bg-red-500/15 border border-red-500/30
                rounded-xl text-red-300 text-xs font-medium text-left">
                ⚠ {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2
                bg-gold hover:bg-gold-dark text-white font-bold py-3.5 rounded-xl
                transition-all duration-300 hover:shadow-lg hover:shadow-gold/30
                hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60
                disabled:cursor-not-allowed text-sm tracking-wider uppercase"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white
                    rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <>
                  <MdLogin size={18} />
                  Enter Site
                </>
              )}
            </button>
          </form>

          {/* WhatsApp button */}
          <a
            href={`https://wa.me/${WA_NUMBER}?text=Hello%20SAI%20Properties%2C%20I%20would%20like%20to%20enquire%20about%20your%20properties.`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 w-full flex items-center justify-center gap-2
              bg-green-500/15 hover:bg-green-500 border border-green-500/40 hover:border-green-500
              text-green-400 hover:text-white font-semibold py-3 rounded-xl
              transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30
              hover:-translate-y-0.5 text-sm"
          >
            <FaWhatsapp size={18} />
            Chat on WhatsApp · +971 56 798 6455
          </a>
        </div>

        {/* Bottom tagline */}
        <p className={`mt-6 text-white/20 text-xs tracking-[0.25em] uppercase
          transition-all duration-700 delay-700
          ${formVisible ? 'opacity-100' : 'opacity-0'}`}>
          Innovating Connectivity Across Global Markets
        </p>
      </div>

      <style>{`
        @keyframes logoIn {
          0%   { opacity:0; transform:scale(0.7) translateY(-15px); }
          60%  { transform:scale(1.05) translateY(0); }
          100% { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes floatP {
          0%,100% { transform:translateY(0) translateX(0); opacity:.3; }
          33%     { transform:translateY(-18px) translateX(8px); opacity:.8; }
          66%     { transform:translateY(8px) translateX(-6px); opacity:.5; }
        }
        @keyframes shake {
          0%,100% { transform:translateX(0); }
          20%     { transform:translateX(-8px); }
          40%     { transform:translateX(8px); }
          60%     { transform:translateX(-5px); }
          80%     { transform:translateX(5px); }
        }
        .duration-700 { transition-duration:700ms; }
      `}</style>
    </div>
  );
}
