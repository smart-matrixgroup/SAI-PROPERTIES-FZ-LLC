import { useEffect, useRef, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';

// Dubai skyline / property image placeholders using Unsplash
const heroSlides = [
  {
    bg: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80',
    heading: 'Innovating Connectivity Across Global Markets',
    sub: 'Premium Real Estate Solutions in UAE',
  },
  {
    bg: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&q=80',
    heading: 'Your Gateway to Luxury Living in Dubai',
    sub: 'Trusted Property Experts Since Day One',
  },
  {
    bg: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1920&q=80',
    heading: 'Invest Smart. Live Better.',
    sub: 'Residential & Commercial Properties Across UAE',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const scrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Slides */}
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
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          <div className="hero-overlay absolute inset-0" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <span className="inline-block bg-gold/20 border border-gold/50 text-gold-light text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 animate-fade-in">
            SAI Properties FZ-LLC · Dubai, UAE
          </span>

          {/* Heading */}
          <h1
            key={current}
            className="font-heading font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 animate-slide-up"
          >
            {heroSlides[current].heading}
          </h1>

          {/* Sub */}
          <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-fade-in">
            {heroSlides[current].sub}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-gold text-base px-8 py-3.5"
            >
              View Our Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-outline text-base px-8 py-3.5"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? 'w-8 h-2 bg-gold' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Quick info bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-primary/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/90 text-xs sm:text-sm">
            <a href="tel:+971567986455" className="flex items-center gap-2 hover:text-gold transition-colors">
              <MdPhone className="text-gold flex-shrink-0" size={16} />
              +971 56 798 6455
            </a>
            <a href="mailto:saipropertiesfzllc@gmail.com" className="flex items-center gap-2 hover:text-gold transition-colors">
              <MdEmail className="text-gold flex-shrink-0" size={16} />
              saipropertiesfzllc@gmail.com
            </a>
            <div className="flex items-center gap-2">
              <MdLocationOn className="text-gold flex-shrink-0" size={16} />
              Port Saeed, Deira, Dubai, UAE
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down */}
      <button
        onClick={scrollDown}
        className="absolute bottom-24 right-6 md:right-10 z-10 text-white/60 hover:text-gold transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <HiChevronDown size={32} />
      </button>
    </section>
  );
}
