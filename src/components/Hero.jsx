import { useEffect, useRef, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';

// ── Crisp Dubai aerial / skyline images ──
const heroSlides = [
  {
    bg: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=90&auto=format&fit=crop',
    heading: 'Innovating Connectivity Across Global Markets',
    sub: 'Premium Real Estate Solutions in UAE',
  },
  {
    bg: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=1920&q=90&auto=format&fit=crop',
    heading: 'Your Gateway to Luxury Living in Dubai',
    sub: 'Trusted Property Experts Since Day One',
  },
  {
    bg: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&q=90&auto=format&fit=crop',
    heading: 'Invest Smart. Live Better.',
    sub: 'Residential & Commercial Properties Across UAE',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPrev(current);
      setCurrent(c => (c + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(intervalRef.current);
  }, [current]);

  const goTo = (i) => {
    setPrev(current);
    setCurrent(i);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setPrev(current);
      setCurrent(c => (c + 1) % heroSlides.length);
    }, 5500);
  };

  const scrollDown = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative h-screen min-h-[640px] overflow-hidden">

      {/* ── Background slides ── */}
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
          {/* Lighter overlay — so Dubai skyline clearly visible */}
          <div className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(10,25,55,0.72) 0%, rgba(15,35,71,0.55) 50%, rgba(10,25,55,0.45) 100%)'
            }}
          />
        </div>
      ))}

      {/* ── Hero Content ── */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-20">
        <div className="max-w-4xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-gold/40
            text-gold text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full mb-7
            animate-fade-in shadow-lg">
            <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
            SAI Properties FZ-LLC · Dubai, UAE
          </div>

          {/* Heading */}
          <h1
            key={current}
            className="font-heading font-bold text-white leading-tight mb-6 animate-slide-up
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
          >
            {heroSlides[current].heading}
          </h1>

          {/* Sub */}
          <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-fade-in font-medium"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
            {heroSlides[current].sub}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="bg-gold hover:bg-gold-dark text-white px-8 py-4 rounded-xl font-bold text-base
                transition-all duration-300 hover:shadow-2xl hover:shadow-gold/40 hover:-translate-y-1
                flex items-center gap-2"
            >
              View Our Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="border-2 border-white/80 text-white hover:bg-white hover:text-primary
                px-8 py-4 rounded-xl font-bold text-base transition-all duration-300
                hover:shadow-2xl hover:-translate-y-1"
            >
              Contact Us
            </a>
            <a
              href="https://wa.me/971567986455"
              target="_blank" rel="noreferrer"
              className="flex items-center gap-2 bg-green-500/90 hover:bg-green-500 border border-green-400/50
                text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-300
                hover:shadow-2xl hover:shadow-green-500/30 hover:-translate-y-1"
            >
              <FaWhatsapp size={20} />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-24 flex items-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-400 ${
                i === current ? 'w-8 h-2.5 bg-gold shadow-lg' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* ── Quick Info Bar ── */}
        <div className="absolute bottom-0 left-0 right-0 bg-primary-dark/95 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-3
            flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
            <a href="tel:+971567986455"
              className="flex items-center gap-2 text-white/90 hover:text-gold transition-colors text-xs sm:text-sm font-medium">
              <MdPhone className="text-gold flex-shrink-0" size={16} />
              +971 56 798 6455
            </a>
            <a href="mailto:saipropertiesfzllc@gmail.com"
              className="flex items-center gap-2 text-white/90 hover:text-gold transition-colors text-xs sm:text-sm font-medium">
              <MdEmail className="text-gold flex-shrink-0" size={16} />
              saipropertiesfzllc@gmail.com
            </a>
            <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm font-medium">
              <MdLocationOn className="text-gold flex-shrink-0" size={16} />
              Port Saeed, Deira, Dubai, UAE
            </div>
            <a href="https://wa.me/971567986455"
              target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-green-400 hover:text-green-300 transition-colors text-xs sm:text-sm font-bold">
              <FaWhatsapp size={16} />
              Chat Now
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <button
        onClick={scrollDown}
        className="absolute bottom-20 right-6 md:right-10 z-10 text-white/50 hover:text-gold
          transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <HiChevronDown size={34} />
      </button>
    </section>
  );
}
