import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import logo from '../assets/logo.svg';

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
      setScrolled(window.scrollY > 60);
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
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Main Header ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-white border-b-2 border-primary-dark shadow-lg py-1'
          : 'bg-white/95 backdrop-blur-md border-b-2 border-primary-dark shadow-md py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* ── Logo (bigger, no text below) ── */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
              className="flex items-center group flex-shrink-0"
            >
              <img
                src={logo}
                alt="SAI Properties FZ-LLC"
                className="h-20 w-auto object-contain transition-all duration-300
                  group-hover:scale-105 drop-shadow-md"
              />
            </a>

            {/* ── Desktop Nav ── */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`font-semibold text-sm uppercase tracking-wider transition-all duration-200 relative group
                    ${activeSection === link.href.replace('#', '')
                      ? 'text-primary'
                      : 'text-gray-700 hover:text-primary'
                    }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold rounded-full transition-all duration-300
                    ${activeSection === link.href.replace('#', '') ? 'w-full' : 'w-0 group-hover:w-full'}`}
                  />
                </a>
              ))}

              {/* WhatsApp button */}
              <a
                href="https://wa.me/971567986455"
                target="_blank" rel="noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white
                  px-4 py-2 rounded-full text-sm font-bold transition-all duration-300
                  hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5"
              >
                <FaWhatsapp size={16} />
                WhatsApp
              </a>

              {/* Get In Touch */}
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                className="bg-primary hover:bg-primary-light text-white px-5 py-2 rounded-full
                  text-sm font-bold transition-all duration-300 hover:shadow-lg
                  hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Get In Touch
              </a>
            </nav>

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX size={26} /> : <HiMenu size={26} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden
          ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="bg-white border-t border-gray-100 px-4 pb-5 pt-3 shadow-xl">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`flex items-center justify-between py-3 px-2 font-semibold
                  border-b border-gray-100 last:border-0 transition-colors
                  ${activeSection === link.href.replace('#', '')
                    ? 'text-primary'
                    : 'text-gray-700 hover:text-primary'
                  }`}
              >
                {link.label}
                {activeSection === link.href.replace('#', '') && (
                  <span className="w-2 h-2 bg-gold rounded-full" />
                )}
              </a>
            ))}
            <div className="flex gap-3 mt-4">
              <a
                href="https://wa.me/971567986455"
                target="_blank" rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-500
                  text-white py-2.5 rounded-xl font-bold text-sm"
              >
                <FaWhatsapp size={16} /> WhatsApp
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                className="flex-1 text-center bg-primary text-white py-2.5 rounded-xl font-bold text-sm"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── Floating WhatsApp Button (always visible) ── */}
      <a
        href="https://wa.me/971567986455"
        target="_blank" rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600
          rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40
          hover:scale-110 transition-all duration-300 group"
      >
        <FaWhatsapp size={28} className="text-white" />
        {/* Tooltip */}
        <span className="absolute right-16 bg-gray-900 text-white text-xs font-semibold
          px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100
          transition-opacity duration-300 pointer-events-none">
          Chat on WhatsApp
        </span>
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-25" />
      </a>
    </>
  );
}
