import { MdPhone, MdEmail, MdLocationOn } from 'react-icons/md';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  'Residential Sales',
  'Commercial Properties',
  'Property Investment',
  'Property Management',
  'Buyer & Seller Advisory',
  'Legal & Documentation',
];

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNav = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary-dark text-white">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12">
                <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="40" cy="40" r="38" fill="rgba(255,255,255,0.08)" stroke="rgba(201,168,76,0.6)" strokeWidth="2"/>
                  <g fill="#c9a84c">
                    <rect x="15" y="42" width="6" height="22" rx="1"/>
                    <rect x="22" y="34" width="6" height="30" rx="1"/>
                    <rect x="29" y="28" width="8" height="36" rx="1"/>
                    <rect x="38" y="22" width="5" height="42" rx="1"/>
                    <rect x="44" y="18" width="4" height="46" rx="1"/>
                    <rect x="49" y="30" width="7" height="34" rx="1"/>
                    <rect x="57" y="38" width="6" height="26" rx="1"/>
                  </g>
                  <rect x="12" y="64" width="56" height="2" rx="1" fill="rgba(201,168,76,0.4)"/>
                </svg>
              </div>
              <div>
                <p className="font-heading font-bold text-lg text-white leading-tight">SAI PROPERTIES</p>
                <p className="text-gold text-xs font-semibold tracking-widest">FZ-LLC</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Premium real estate solutions in UAE — connecting you to the finest properties 
              and investment opportunities across Dubai and global markets.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { icon: <FaWhatsapp size={16} />, href: 'https://wa.me/971567986455', label: 'WhatsApp' },
                { icon: <FaInstagram size={16} />, href: '#', label: 'Instagram' },
                { icon: <FaFacebook size={16} />, href: '#', label: 'Facebook' },
                { icon: <FaLinkedin size={16} />, href: '#', label: 'LinkedIn' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:bg-gold hover:text-white transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                    className="text-white/50 hover:text-gold text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2.5">
              {services.map((s, i) => (
                <li key={i} className="text-white/50 text-sm hover:text-gold transition-colors cursor-default flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-4">
              <a href="tel:+971567986455" className="flex items-start gap-3 text-white/50 hover:text-gold transition-colors group">
                <MdPhone size={18} className="text-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm">+971 56 798 6455</span>
              </a>
              <a href="mailto:saipropertiesfzllc@gmail.com" className="flex items-start gap-3 text-white/50 hover:text-gold transition-colors group">
                <MdEmail size={18} className="text-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm break-all">saipropertiesfzllc@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-white/50">
                <MdLocationOn size={18} className="text-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">
                  AlArif Shipping Building,<br />
                  Ist Floor, Office No-117,<br />
                  Port Saeed, Deira,<br />
                  Dubai, UAE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/30 text-xs">
          <p>© {year} SAI Properties FZ-LLC. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Innovating Connectivity Across Global Markets
            <span className="text-gold ml-1">✦</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
