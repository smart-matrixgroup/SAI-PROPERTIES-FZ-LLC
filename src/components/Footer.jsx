import { MdPhone, MdEmail, MdLocationOn } from 'react-icons/md';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import logo from '../assets/logo.svg';

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
            <div className="mb-4">
              <img
                src={logo}
                alt="SAI Properties FZ-LLC"
                className="h-20 w-auto object-contain drop-shadow-lg"
              />
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
