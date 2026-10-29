import { useEffect, useRef, useState } from 'react';
import { MdApartment, MdBusiness, MdSearch, MdAttachMoney, MdSupportAgent, MdGavel, MdArrowForward } from 'react-icons/md';

const services = [
  {
    icon: <MdApartment size={34} />,
    title: 'Residential Sales',
    desc: 'Find your dream home from our curated collection of villas, apartments, and townhouses across prime Dubai locations.',
    iconBg: 'bg-blue-600',
    accent: 'group-hover:border-blue-300 group-hover:shadow-blue-100',
    tag: 'Most Popular',
  },
  {
    icon: <MdBusiness size={34} />,
    title: 'Commercial Properties',
    desc: 'Office spaces, retail units, and commercial plots strategically located to power your business growth in UAE.',
    iconBg: 'bg-indigo-600',
    accent: 'group-hover:border-indigo-300 group-hover:shadow-indigo-100',
    tag: null,
  },
  {
    icon: <MdAttachMoney size={34} />,
    title: 'Property Investment',
    desc: 'Maximise your ROI with our expert investment advisory — from off-plan projects to ready properties with high yield.',
    iconBg: 'bg-amber-500',
    accent: 'group-hover:border-amber-300 group-hover:shadow-amber-100',
    tag: 'High ROI',
  },
  {
    icon: <MdSearch size={34} />,
    title: 'Property Management',
    desc: 'End-to-end property management including tenant sourcing, maintenance coordination, and rental income handling.',
    iconBg: 'bg-green-600',
    accent: 'group-hover:border-green-300 group-hover:shadow-green-100',
    tag: null,
  },
  {
    icon: <MdSupportAgent size={34} />,
    title: 'Buyer & Seller Advisory',
    desc: 'Personalised guidance throughout your property journey — from valuation and listing to negotiations and closing.',
    iconBg: 'bg-purple-600',
    accent: 'group-hover:border-purple-300 group-hover:shadow-purple-100',
    tag: null,
  },
  {
    icon: <MdGavel size={34} />,
    title: 'Legal & Documentation',
    desc: 'Seamless handling of all property documentation, title deed transfers, and RERA compliance for a stress-free transaction.',
    iconBg: 'bg-red-500',
    accent: 'group-hover:border-red-300 group-hover:shadow-red-100',
    tag: null,
  },
];

function useIntersection(ref, threshold = 0.1) {
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

export default function Services() {
  const sectionRef = useRef(null);
  const visible = useIntersection(sectionRef);

  return (
    <section id="services" ref={sectionRef} className="py-20 md:py-28 bg-sky overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="section-subtitle">What We Offer</p>
          <h2 className="section-title mb-4">Our Core Services</h2>
          <div className="gold-divider mx-auto mb-5" />
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            From finding your first home to building a diversified real estate portfolio —
            we provide comprehensive services tailored to every stage of your property journey.
          </p>
        </div>

        {/* ── Service Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl p-7 border-2 border-transparent shadow-sm
                hover:shadow-2xl hover:-translate-y-2 ${service.accent}
                transition-all duration-400 group cursor-default relative overflow-hidden
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: visible ? `${i * 90}ms` : '0ms' }}
            >
              {/* Tag badge */}
              {service.tag && (
                <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider
                  bg-gold/10 text-gold border border-gold/30 px-2.5 py-1 rounded-full">
                  {service.tag}
                </span>
              )}

              {/* Decorative bg circle */}
              <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-gray-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon */}
              <div className={`w-14 h-14 ${service.iconBg} text-white rounded-2xl flex items-center justify-center mb-5
                shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 relative z-10`}>
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="font-heading font-bold text-xl text-primary-dark mb-3 group-hover:text-primary transition-colors relative z-10">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5 relative z-10">{service.desc}</p>

              {/* Animated arrow link */}
              <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:text-gold transition-colors duration-300 relative z-10">
                Learn more
                <MdArrowForward className="group-hover:translate-x-2 transition-transform duration-300" size={16} />
              </div>

              {/* Bottom highlight bar */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-gold to-transparent transition-all duration-500 rounded-bl-2xl" />
            </div>
          ))}
        </div>

        {/* ── CTA Banner ── */}
        <div className={`mt-16 relative overflow-hidden bg-primary rounded-3xl p-8 md:p-12 text-center
          transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-48 h-48 bg-white/5 rounded-full -translate-x-20 -translate-y-20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold/5 rounded-full translate-x-24 translate-y-24 pointer-events-none" />

          <div className="relative z-10">
            <p className="text-gold text-xs font-bold uppercase tracking-widest mb-3">Free Consultation Available</p>
            <h3 className="font-heading font-bold text-white text-2xl md:text-3xl mb-3">
              Ready to Find Your Perfect Property?
            </h3>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Talk to our experts today. We'll help you navigate the UAE real estate market with confidence.
            </p>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white
                px-8 py-3.5 rounded-xl font-bold text-base transition-all duration-300
                hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              Schedule a Free Consultation
              <MdArrowForward size={18} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
