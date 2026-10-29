import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b-2 border-primary-dark shadow-md py-2"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="flex items-center group"
          >
            {/* Actual SAI Properties Logo */}
            <img
              src={logo}
              alt="SAI Properties FZ-LLC"
              className="h-16 w-auto object-contain transition-all duration-300 drop-shadow-lg"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`font-medium text-sm uppercase tracking-wider transition-colors duration-200 relative group text-gray-700 hover:text-primary
                  ${activeSection === link.href.replace('#', '') ? 'text-primary' : ''}`}
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
            className="md:hidden p-2 rounded-md transition-colors text-primary hover:bg-gray-100"
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
