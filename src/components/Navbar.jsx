import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import {
  MdHome,
  MdInfoOutline,
  MdMiscellaneousServices,
  MdApartment,
  MdContactPhone,
  MdConstruction,
} from 'react-icons/md';
import logo from '../assets/logo.svg';

const navLinks = [
  { label: 'Home',     href: '#home',     icon: MdHome },
  { label: 'About',    href: '#about',    icon: MdInfoOutline },
  { label: 'Services', href: '#services', icon: MdMiscellaneousServices },
  { label: 'Projects', href: '#projects', icon: MdApartment },
  { label: 'Updates',  href: '#updates',  icon: MdConstruction },
  { label: 'Contact',  href: '#contact',  icon: MdContactPhone },
];

export default function Navbar() {
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
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ═══════════════════════════════════════
          TOP HEADER — Desktop + Mobile logo bar
      ═══════════════════════════════════════ */}
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
              className="flex items-center gap-2 flex-shrink-0 group"
            >
              <div className={`flex-shrink-0 transition-all duration-300
                group-hover:scale-105
                ${scrolled ? 'h-12 w-12' : 'h-14 w-14'}`}>
                <img
                  src={logo}
                  alt="SAI Properties logo"
                  className="h-full w-full object-contain drop-shadow-md"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className={`font-heading font-bold tracking-widest text-primary-dark
                  transition-all duration-300
                  ${scrolled ? 'text-sm sm:text-base' : 'text-base sm:text-lg'}`}>
                  SAI PROPERTIES
                </span>
                <span className="text-gold font-bold text-[10px] sm:text-xs tracking-[0.3em] uppercase">
                  FZ-LLC
                </span>
              </div>
            </a>

            {/* ── Desktop Nav (md+) ── */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.href.replace('#', '');
                const showIcons = !scrolled;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className={`relative flex flex-col items-center gap-0.5 px-3 lg:px-4
                      rounded-xl font-semibold text-xs uppercase tracking-wider
                      transition-all duration-300 group overflow-hidden
                      ${showIcons
                        ? 'py-2 opacity-100 max-w-[80px]'
                        : 'py-0 opacity-0 max-w-0 px-0 pointer-events-none'}
                      ${isActive
                        ? 'text-primary bg-primary/8'
                        : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                      }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-xl" />
                    )}
                    <span className={`relative z-10 transition-all duration-300
                      ${isActive
                        ? 'text-primary scale-110'
                        : 'text-gray-400 group-hover:text-primary group-hover:scale-110'
                      }`}>
                      <Icon size={18} />
                    </span>
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold rounded-full" />
                    )}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-gold rounded-full
                      transition-all duration-300
                      ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                    />
                  </a>
                );
              })}

              <div className="w-px h-8 bg-gray-200 mx-2" />
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                className="bg-primary hover:bg-primary-light text-white px-5 py-2
                  rounded-full text-sm font-bold transition-all duration-300
                  hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Get In Touch
              </a>
            </nav>

            {/* ── Mobile: WhatsApp button in header ── */}
            <a
              href="https://wa.me/971567986455"
              target="_blank" rel="noreferrer"
              className="md:hidden flex items-center gap-1.5 bg-green-500 text-white
                px-3 py-2 rounded-full text-xs font-bold shadow-md"
            >
              <FaWhatsapp size={15} />
              Chat
            </a>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════
          MOBILE BOTTOM NAV BAR (mobile only)
      ═══════════════════════════════════════ */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50
          bg-white border-t-2 border-primary-dark shadow-2xl"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-stretch">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5
                  transition-all duration-200 relative min-h-[56px]
                  ${isActive ? 'text-primary' : 'text-gray-400 active:text-primary'}`}
              >
                {/* Active top indicator */}
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2
                    w-8 h-0.5 bg-gold rounded-full" />
                )}

                {/* Active bg pill */}
                {isActive && (
                  <span className="absolute inset-x-1 inset-y-1 bg-primary/8 rounded-xl" />
                )}

                {/* Icon */}
                <span className={`relative z-10 transition-all duration-200
                  ${isActive ? 'scale-110 -translate-y-0.5' : ''}`}>
                  <Icon size={20} />
                </span>

                {/* Label */}
                <span className={`relative z-10 text-[10px] font-bold leading-none
                  transition-all duration-200
                  ${isActive ? 'text-primary' : 'text-gray-400'}`}>
                  {link.label}
                </span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* ═══════════════════════════════════════
          FLOATING WHATSAPP — Desktop only
      ═══════════════════════════════════════ */}
      <a
        href="https://wa.me/971567986455"
        target="_blank" rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="hidden md:flex fixed bottom-6 right-6 z-50 w-14 h-14
          bg-green-500 hover:bg-green-600 rounded-full items-center justify-center
          shadow-2xl shadow-green-500/40 hover:scale-110 transition-all duration-300 group"
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
