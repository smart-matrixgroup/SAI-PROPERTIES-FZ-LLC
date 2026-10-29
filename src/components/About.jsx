import { useEffect, useRef, useState } from 'react';
import { MdVerified, MdHandshake, MdTrendingUp } from 'react-icons/md';
import { FaBuilding, FaAward } from 'react-icons/fa';
import vaikunthanImg from '../assets/vaikunthan.png';

const stats = [
  { value: '200+', label: 'Properties Sold', icon: '🏠' },
  { value: '50+',  label: 'Luxury Projects', icon: '🏙️' },
  { value: '10+',  label: 'Years Experience', icon: '📅' },
  { value: '500+', label: 'Happy Clients',  icon: '🤝' },
];

const values = [
  {
    icon: <MdVerified size={26} />,
    title: 'Trusted Expertise',
    desc: 'Over a decade of navigating the UAE real estate market with integrity and deep local knowledge.',
    color: 'bg-blue-600',
    glow: 'hover:shadow-blue-200',
  },
  {
    icon: <MdHandshake size={26} />,
    title: 'Client-First Approach',
    desc: 'Every decision we make is guided by your goals — whether buying, selling, or investing.',
    color: 'bg-gold',
    glow: 'hover:shadow-yellow-200',
  },
  {
    icon: <MdTrendingUp size={26} />,
    title: 'Market Intelligence',
    desc: 'Data-driven insights and global market connectivity to maximise your property returns.',
    color: 'bg-green-600',
    glow: 'hover:shadow-green-200',
  },
  {
    icon: <FaBuilding size={24} />,
    title: 'Premium Portfolio',
    desc: 'Curated residential and commercial properties across Dubai and key UAE locations.',
    color: 'bg-purple-600',
    glow: 'hover:shadow-purple-200',
  },
];

function useIntersection(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

export default function About() {
  const sectionRef = useRef(null);
  const visible = useIntersection(sectionRef);

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Top: Text + Image ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">

          {/* Left: Text */}
          <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
            <p className="section-subtitle">Who We Are</p>
            <h2 className="section-title mb-4">
              Building Dreams,<br />
              <span className="text-gold relative inline-block">
                Delivering Excellence
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-gold to-transparent rounded-full" />
              </span>
            </h2>
            <div className="gold-divider mb-6" />
            <p className="text-gray-600 leading-relaxed mb-4">
              SAI Properties FZ-LLC is a premier real estate company based in the heart of Dubai, UAE.
              We specialize in connecting buyers, sellers, and investors with the finest properties
              across the Emirates and beyond.
            </p>
            <p className="text-gray-600 leading-relaxed mb-7">
              Operating from our office in Port Saeed, Deira, we leverage deep market knowledge
              and a vast global network to offer unparalleled real estate solutions.
            </p>

            {/* Manager highlight card */}
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-sky to-blue-50 rounded-2xl
              border border-primary/10 hover:border-gold/40 hover:shadow-lg transition-all duration-300 group">
              {/* Profile photo */}
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-gold ring-offset-2
                  group-hover:ring-4 transition-all duration-300">
                  <img
                    src={vaikunthanImg}
                    alt="K. Vaikunthan"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
              </div>
              <div className="flex-1">
                <p className="font-heading font-bold text-primary-dark">K. Vaikunthan</p>
                <p className="text-gold text-xs font-bold uppercase tracking-wider">Chief Officer (CO)</p>
                <p className="text-gray-400 text-xs mt-0.5">SAI Properties FZ-LLC · Dubai, UAE</p>
              </div>
              <FaAward className="text-gold/40 group-hover:text-gold transition-colors duration-300 flex-shrink-0" size={28} />
            </div>
          </div>

          {/* Right: Staggered image grid */}
          <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80', alt: 'Dubai property', mt: '' },
                { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80', alt: 'Luxury interior', mt: 'mt-6' },
                { src: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=400&q=80', alt: 'Modern apartment', mt: '' },
                { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', alt: 'Commercial', mt: 'mt-6' },
              ].map((img, i) => (
                <div key={i}
                  className={`${img.mt} overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500
                    hover:-translate-y-1 hover:scale-[1.02] group`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-5 mb-20 transition-all duration-700 delay-300
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 bg-primary rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1
                transition-all duration-300 group relative overflow-hidden"
              style={{ transitionDelay: `${300 + i * 80}ms` }}
            >
              {/* Glow bg */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-light/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="text-2xl mb-1">{stat.icon}</p>
              <p className="text-3xl md:text-4xl font-heading font-bold text-gold mb-1 relative">{stat.value}</p>
              <p className="text-white/70 text-sm font-medium relative">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ── Values ── */}
        <div className={`transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10">
            <p className="section-subtitle">Our Values</p>
            <h2 className="section-title">Why Choose SAI Properties</h2>
            <div className="gold-divider mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border-2 border-gray-100 hover:border-transparent
                  hover:shadow-xl ${v.glow} hover:-translate-y-2
                  transition-all duration-400 group cursor-default`}
                style={{ transitionDelay: `${400 + i * 80}ms` }}
              >
                <div className={`w-13 h-13 w-12 h-12 ${v.color} text-white rounded-2xl flex items-center justify-center mb-5
                  shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  {v.icon}
                </div>
                <h3 className="font-heading font-bold text-primary-dark text-lg mb-2 group-hover:text-primary transition-colors">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                {/* Bottom accent line */}
                <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-gold to-transparent transition-all duration-500 rounded-full" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
