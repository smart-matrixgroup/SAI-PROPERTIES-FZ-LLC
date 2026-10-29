import { useEffect, useRef, useState } from 'react';
import { MdVerified, MdHandshake, MdTrendingUp } from 'react-icons/md';
import { FaBuilding } from 'react-icons/fa';

const stats = [
  { value: '200+', label: 'Properties Sold' },
  { value: '50+', label: 'Luxury Projects' },
  { value: '10+', label: 'Years Experience' },
  { value: '500+', label: 'Happy Clients' },
];

const values = [
  {
    icon: <MdVerified size={28} />,
    title: 'Trusted Expertise',
    desc: 'Over a decade of navigating the UAE real estate market with integrity and deep local knowledge.',
  },
  {
    icon: <MdHandshake size={28} />,
    title: 'Client-First Approach',
    desc: 'Every decision we make is guided by your goals — whether buying, selling, or investing.',
  },
  {
    icon: <MdTrendingUp size={28} />,
    title: 'Market Intelligence',
    desc: 'Data-driven insights and global market connectivity to maximise your property returns.',
  },
  {
    icon: <FaBuilding size={28} />,
    title: 'Premium Portfolio',
    desc: 'Curated residential and commercial properties across Dubai and key UAE locations.',
  },
];

function useIntersection(ref, threshold = 0.2) {
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
    <section id="about" ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top: Text + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left: Text */}
          <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <p className="section-subtitle">Who We Are</p>
            <h2 className="section-title mb-4">
              Building Dreams,<br />
              <span className="text-gold">Delivering Excellence</span>
            </h2>
            <div className="gold-divider mb-6" />
            <p className="text-gray-600 leading-relaxed mb-4">
              SAI Properties FZ-LLC is a premier real estate company based in the heart of Dubai, UAE. 
              We specialize in connecting buyers, sellers, and investors with the finest properties 
              across the Emirates and beyond.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Operating from our office in Port Saeed, Deira, we leverage deep market knowledge 
              and a vast global network to offer unparalleled real estate solutions. From luxury 
              apartments to landmark commercial spaces, we bring every transaction to life with 
              transparency, precision, and care.
            </p>
            <div className="flex items-center gap-4 p-4 bg-sky rounded-xl border border-primary/10">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">KV</span>
              </div>
              <div>
                <p className="font-semibold text-primary-dark">K. Vaikunthan</p>
                <p className="text-sm text-gray-500">Manager, SAI Properties FZ-LLC</p>
              </div>
            </div>
          </div>

          {/* Right: Image grid */}
          <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="grid grid-cols-2 gap-3">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80"
                alt="Dubai property"
                className="rounded-xl w-full h-48 object-cover shadow-md"
              />
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80"
                alt="Luxury interior"
                className="rounded-xl w-full h-48 object-cover shadow-md mt-6"
              />
              <img
                src="https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=400&q=80"
                alt="Modern apartment"
                className="rounded-xl w-full h-48 object-cover shadow-md"
              />
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"
                alt="Commercial property"
                className="rounded-xl w-full h-48 object-cover shadow-md mt-6"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-6 bg-primary rounded-2xl shadow-md">
              <p className="text-3xl md:text-4xl font-heading font-bold text-gold mb-1">{stat.value}</p>
              <p className="text-white/80 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className={`transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10">
            <p className="section-subtitle">Our Values</p>
            <h2 className="section-title">Why Choose SAI Properties</h2>
            <div className="gold-divider mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="p-6 rounded-xl border border-gray-100 hover:border-gold/30 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {v.icon}
                </div>
                <h3 className="font-heading font-semibold text-primary-dark text-lg mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
