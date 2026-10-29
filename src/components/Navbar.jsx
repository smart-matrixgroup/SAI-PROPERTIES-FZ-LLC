import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Highlight active nav link based on scroll position
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="flex items-center gap-3 group"
          >
            {/* SVG Logo matching company branding */}
            <div className="w-12 h-12 flex-shrink-0">
              <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="40" cy="40" r="38" fill={scrolled ? '#1a3a6b' : 'rgba(255,255,255,0.15)'} stroke={scrolled ? '#c9a84c' : 'rgba(201,168,76,0.8)'} strokeWidth="2"/>
                {/* Skyline silhouette */}
                <g fill={scrolled ? '#c9a84c' : '#e0c068'}>
                  <rect x="15" y="42" width="6" height="22" rx="1"/>
                  <rect x="22" y="34" width="6" height="30" rx="1"/>
                  <rect x="29" y="28" width="8" height="36" rx="1"/>
                  <rect x="38" y="22" width="5" height="42" rx="1"/>
                  {/* Burj Khalifa style */}
                  <rect x="44" y="18" width="4" height="46" rx="1"/>
                  <rect x="49" y="30" width="7" height="34" rx="1"/>
                  <rect x="57" y="38" width="6" height="26" rx="1"/>
                </g>
                {/* Water reflection */}
                <rect x="12" y="64" width="56" height="2" rx="1" fill={scrolled ? '#2a5298' : 'rgba(255,255,255,0.4)'}/>
              </svg>
            </div>
            <div>
              <p className={`font-heading font-bold text-lg leading-tight tracking-wide transition-colors ${scrolled ? 'text-primary-dark' : 'text-white'}`}>
                SAI PROPERTIES
              </p>
              <p className={`text-xs font-semibold tracking-widest transition-colors ${scrolled ? 'text-gold' : 'text-gold-light'}`}>
                FZ-LLC
              </p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`font-medium text-sm uppercase tracking-wider transition-colors duration-200 relative group ${
                  scrolled ? 'text-gray-700 hover:text-primary' : 'text-white/90 hover:text-white'
                } ${activeSection === link.href.replace('#', '') ? (scrolled ? 'text-primary' : 'text-white') : ''}`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${
                  activeSection === link.href.replace('#', '') ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="btn-primary text-sm py-2 px-5 ml-2"
            >
              Get In Touch
            </a>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-md transition-colors ${
              scrolled ? 'text-primary hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white shadow-lg px-4 pb-4 pt-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className={`block py-3 px-2 font-medium text-gray-700 hover:text-primary border-b border-gray-100 last:border-0 transition-colors ${
                activeSection === link.href.replace('#', '') ? 'text-primary font-semibold' : ''
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
            className="btn-primary w-full text-center mt-3 text-sm py-2.5"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </header>
  );
}
