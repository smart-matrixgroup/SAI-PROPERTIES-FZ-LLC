import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import {
  MdHome,
  MdInfoOutline,
  MdMiscellaneousServices,
  MdApartment,
  MdContactPhone,
} from 'react-icons/md';
import logo from '../assets/logo.svg';

const navLinks = [
  { label: 'Home',     href: '#home',     icon: MdHome },
  { label: 'About',    href: '#about',    icon: MdInfoOutline },
  { label: 'Services', href: '#services', icon: MdMiscellaneousServices },
  { label: 'Projects', href: '#projects', icon: MdApartment },
  { label: 'Contact',  href: '#contact',  icon: MdContactPhone },
];

export default function Navbar() {
  const [isOpen,        setIsOpen]        = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 60);
      setScrollingDown(currentY > lastY && currentY > 100);
      lastY = currentY;
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && currentY >= el.offsetTop - 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ══════════════════════ HEADER ══════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300
          ${scrolled ? 'shadow-lg py-1' : 'shadow-md py-1'}
          ${scrollingDown ? 'border-b-0' : 'border-b-2 border-primary-dark'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* ── Logo ── */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
              className="flex items-center gap-3 flex-shrink-0 group"
            >
              <div className={`flex-shrink-0 transition-all duration-300
                group-hover:scale-105 group-hover:rotate-3
                ${scrolled ? 'h-14 w-14' : 'h-16 w-16'}`}>
                <img
                  src={logo}
                  alt="SAI Properties logo"
                  className="h-full w-full object-contain drop-shadow-md"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className={`font-heading font-bold tracking-widest text-primary-dark
                  transition-all duration-300 ${scrolled ? 'text-base' : 'text-lg'}`}>
                  SAI PROPERTIES
                </span>
                <span className="text-gold font-bold text-xs tracking-[0.3em] uppercase">
                  FZ-LLC
                </span>
              </div>
            </a>

            {/* ── Desktop Nav ── */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.href.replace('#', '');
                const showIcons = !scrolled; // icons + text visible only at top

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className={`relative flex flex-col items-center gap-0.5 px-4
                      rounded-xl font-semibold text-xs uppercase tracking-wider
                      transition-all duration-300 group overflow-hidden
                      ${showIcons ? 'py-2 opacity-100 max-w-[80px]' : 'py-0 opacity-0 max-w-0 px-0 pointer-events-none'}
                      ${isActive
                        ? 'text-primary bg-primary/8'
                        : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                      }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-xl" />
                    )}

                    {/* Icon */}
                    <span className={`relative z-10 transition-all duration-300
                      ${isActive
                        ? 'text-primary scale-110'
                        : 'text-gray-400 group-hover:text-primary group-hover:scale-110 group-hover:-translate-y-0.5'
                      }`}>
                      <Icon size={18} />
                    </span>

                    {/* Label */}
                    <span className="relative z-10">{link.label}</span>

                    {/* Active dot */}
                    {isActive && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold rounded-full" />
                    )}

                    {/* Hover underline */}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-gold rounded-full
                      transition-all duration-300
                      ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                    />
                  </a>
                );
              })}

              {/* Divider */}
              <div className="w-px h-8 bg-gray-200 mx-2" />

              {/* WhatsApp pill */}
              <a
                href="https://wa.me/971567986455"
                target="_blank" rel="noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600
                  text-white px-4 py-2 rounded-full text-sm font-bold
                  transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30
                  hover:-translate-y-0.5 hover:scale-105 active:scale-95"
              >
                <FaWhatsapp size={16} className="animate-pulse" />
                WhatsApp
              </a>

              {/* Get In Touch */}
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                className="bg-primary hover:bg-primary-light text-white px-5 py-2
                  rounded-full text-sm font-bold transition-all duration-300
                  hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5
                  hover:scale-105 active:scale-95"
              >
                Get In Touch
              </a>
            </nav>

            {/* ── Mobile hamburger ── */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-primary hover:bg-primary/10
                transition-all duration-300 hover:rotate-90"
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX size={26} /> : <HiMenu size={26} />}
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown ── */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden
          ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white border-t border-gray-100 px-4 pb-5 pt-3 shadow-xl">
            {navLinks.map((link, i) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  style={{ animationDelay: `${i * 60}ms` }}
                  className={`flex items-center gap-3 py-3 px-3 rounded-xl mb-1
                    font-semibold transition-all duration-200
                    ${isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                    }`}
                >
                  {/* Icon */}
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                    transition-all duration-200
                    ${isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <Icon size={16} />
                  </span>
                  <span className="flex-1">{link.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                  )}
                </a>
              );
            })}

            <div className="flex gap-3 mt-4 pt-3 border-t border-gray-100">
              <a
                href="https://wa.me/971567986455"
                target="_blank" rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2
                  bg-green-500 text-white py-3 rounded-xl font-bold text-sm
                  hover:bg-green-600 transition-colors shadow-md"
              >
                <FaWhatsapp size={18} /> WhatsApp
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                className="flex-1 flex items-center justify-center bg-primary text-white
                  py-3 rounded-xl font-bold text-sm hover:bg-primary-light
                  transition-colors shadow-md"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ══════════════════════ FLOATING WHATSAPP ══════════════════════ */}
      <a
        href="https://wa.me/971567986455"
        target="_blank" rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600
          rounded-full flex items-center justify-center
          shadow-2xl shadow-green-500/40 hover:scale-110
          transition-all duration-300 group"
      >
        <FaWhatsapp size={28} className="text-white" />
        <span className="absolute right-16 bg-gray-900 text-white text-xs font-semibold
          px-3 py-1.5 rounded-lg whitespace-nowrap
          opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat on WhatsApp
        </span>
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-25" />
      </a>
    </>
  );
}
