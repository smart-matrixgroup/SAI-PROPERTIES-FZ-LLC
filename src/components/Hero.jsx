import { useEffect, useRef, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';
import { FaWhatsapp, FaBuilding, FaArrowRight } from 'react-icons/fa';

const heroSlides = [
  {
    bg: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=90&auto=format&fit=crop',
    heading: 'Innovating Connectivity Across Global Markets',
    sub: 'Premium Real Estate Solutions in UAE',
    tag: 'Dubai Marina',
  },
  {
    bg: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=1920&q=90&auto=format&fit=crop',
    heading: 'Your Gateway to Luxury Living in Dubai',
    sub: 'Trusted Property Experts Since Day One',
    tag: 'Palm Jumeirah',
  },
  {
    bg: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&q=90&auto=format&fit=crop',
    heading: 'Invest Smart. Live Better.',
    sub: 'Residential & Commercial Properties Across UAE',
    tag: 'Downtown Dubai',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % heroSlides.length);
      setAnimKey(k => k + 1);
    }, 5500);
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (i) => {
    setCurrent(i);
    setAnimKey(k => k + 1);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % heroSlides.length);
      setAnimKey(k => k + 1);
    }, 5500);
  };

  const scrollDown = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative h-screen min-h-[640px] overflow-hidden">

      {/* ── Background Slides ── */}
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.bg}
            alt={slide.heading}
            className="w-full h-full object-cover object-center"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          {/* Strong gradient overlay — top dark, middle lighter so buildings visible, bottom dark */}
          <div className="absolute inset-0" style={{
            background: `
              linear-gradient(
                to bottom,
                rgba(5,15,45,0.85) 0%,
                rgba(5,15,45,0.55) 30%,
                rgba(5,15,45,0.45) 55%,
                rgba(5,15,45,0.80) 100%
              )
            `
          }}/>
        </div>
      ))}

      {/* ── Hero Content ── */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-24">
        <div className="max-w-4xl mx-auto w-full">

          {/* Location tag */}
          <div
            key={`tag-${animKey}`}
            className="inline-flex items-center gap-2 mb-6"
            style={{ animation: 'fadeSlideDown 0.6s ease forwards' }}
          >
            <span className="flex items-center gap-2 bg-white/15 backdrop-blur-md
              border border-white/25 text-white text-xs font-bold uppercase
              tracking-widest px-5 py-2 rounded-full shadow-xl">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              SAI Properties FZ-LLC
              <span className="w-px h-3 bg-white/30" />
              <FaBuilding size={11} className="text-gold" />
              {heroSlides[current].tag}
            </span>
          </div>

          {/* ── Main Heading — large, bold, clear ── */}
          <h1
            key={`h-${animKey}`}
            className="font-heading font-bold text-white leading-tight mb-5
              text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem]"
            style={{
              animation: 'fadeSlideUp 0.7s ease forwards',
              textShadow: '0 4px 30px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.8)',
            }}
          >
            {heroSlides[current].heading}
          </h1>

          {/* Gold accent divider */}
          <div
            key={`div-${animKey}`}
            className="flex items-center justify-center gap-3 mb-5"
            style={{ animation: 'fadeSlideUp 0.8s ease forwards' }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
            <div className="w-2 h-2 bg-gold rotate-45" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
          </div>

          {/* Sub heading */}
          <p
            key={`sub-${animKey}`}
            className="text-white/95 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium leading-relaxed"
            style={{
              animation: 'fadeSlideUp 0.9s ease forwards',
              textShadow: '0 2px 12px rgba(0,0,0,0.7)',
            }}
          >
            {heroSlides[current].sub}
          </p>

          {/* ── CTA Buttons ── */}
          <div
            key={`btns-${animKey}`}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{ animation: 'fadeSlideUp 1s ease forwards' }}
          >
            {/* Primary */}
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="group flex items-center gap-3 bg-gold hover:bg-gold-dark
                text-white px-8 py-4 rounded-xl font-bold text-base
                transition-all duration-300 hover:shadow-2xl hover:shadow-gold/50
                hover:-translate-y-1 active:translate-y-0 shadow-lg"
            >
              <FaBuilding size={18} className="group-hover:scale-110 transition-transform" />
              View Our Projects
              <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary */}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="flex items-center gap-2 border-2 border-white text-white
                hover:bg-white hover:text-primary px-8 py-4 rounded-xl font-bold
                text-base transition-all duration-300 hover:shadow-2xl hover:-translate-y-1
                active:translate-y-0 backdrop-blur-sm bg-white/5"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* ── Slide Dots ── */}
        <div className="absolute bottom-24 flex items-center gap-3">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-400 ${
                i === current
                  ? 'w-10 h-3 bg-gold shadow-lg shadow-gold/50'
                  : 'w-3 h-3 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* ── Quick Info Bar ── */}
        <div className="absolute bottom-0 left-0 right-0 bg-primary-dark/98
          backdrop-blur-sm border-t border-gold/20">
          <div className="max-w-7xl mx-auto px-4 py-3.5
            flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">

            <a href="tel:+971567986455"
              className="flex items-center gap-2 text-white hover:text-gold
                transition-colors text-xs sm:text-sm font-medium group">
              <span className="w-7 h-7 bg-gold/20 rounded-lg flex items-center justify-center
                group-hover:bg-gold transition-colors flex-shrink-0">
                <MdPhone className="text-gold group-hover:text-white" size={14} />
              </span>
              +971 56 798 6455
            </a>

            <a href="mailto:saipropertiesfzllc@gmail.com"
              className="flex items-center gap-2 text-white hover:text-gold
                transition-colors text-xs sm:text-sm font-medium group">
              <span className="w-7 h-7 bg-gold/20 rounded-lg flex items-center justify-center
                group-hover:bg-gold transition-colors flex-shrink-0">
                <MdEmail className="text-gold group-hover:text-white" size={14} />
              </span>
              saipropertiesfzllc@gmail.com
            </a>

            <div className="flex items-center gap-2 text-white text-xs sm:text-sm font-medium group">
              <span className="w-7 h-7 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <MdLocationOn className="text-gold" size={14} />
              </span>
              Port Saeed, Deira, Dubai, UAE
            </div>

            <a href="https://wa.me/971567986455"
              target="_blank" rel="noreferrer"
              className="flex items-center gap-2 bg-green-500/20 hover:bg-green-500
                text-green-400 hover:text-white px-4 py-1.5 rounded-lg
                transition-all duration-300 text-xs sm:text-sm font-bold border border-green-500/30">
              <FaWhatsapp size={14} />
              Chat Now
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Down */}
      <button
        onClick={scrollDown}
        className="absolute bottom-20 right-6 md:right-10 z-10 text-white/60
          hover:text-gold transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <HiChevronDown size={34} />
      </button>

      {/* ── Keyframe animations ── */}
      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
