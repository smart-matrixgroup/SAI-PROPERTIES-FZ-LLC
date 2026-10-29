import { useEffect, useRef, useState } from 'react';
import { MdApartment, MdBusiness, MdSearch, MdAttachMoney, MdSupportAgent, MdGavel } from 'react-icons/md';

const services = [
  {
    icon: <MdApartment size={36} />,
    title: 'Residential Sales',
    desc: 'Find your dream home from our curated collection of villas, apartments, and townhouses across prime Dubai locations.',
    color: 'from-blue-50 to-blue-100',
    iconBg: 'bg-blue-600',
  },
  {
    icon: <MdBusiness size={36} />,
    title: 'Commercial Properties',
    desc: 'Office spaces, retail units, and commercial plots strategically located to power your business growth in UAE.',
    color: 'from-indigo-50 to-indigo-100',
    iconBg: 'bg-indigo-600',
  },
  {
    icon: <MdAttachMoney size={36} />,
    title: 'Property Investment',
    desc: 'Maximise your ROI with our expert investment advisory — from off-plan projects to ready properties with high yield.',
    color: 'from-yellow-50 to-yellow-100',
    iconBg: 'bg-yellow-600',
  },
  {
    icon: <MdSearch size={36} />,
    title: 'Property Management',
    desc: 'End-to-end property management services including tenant sourcing, maintenance coordination, and rental income handling.',
    color: 'from-green-50 to-green-100',
    iconBg: 'bg-green-600',
  },
  {
    icon: <MdSupportAgent size={36} />,
    title: 'Buyer & Seller Advisory',
    desc: 'Personalised guidance throughout your property journey — from valuation and listing to negotiations and closing.',
    color: 'from-purple-50 to-purple-100',
    iconBg: 'bg-purple-600',
  },
  {
    icon: <MdGavel size={36} />,
    title: 'Legal & Documentation',
    desc: 'Seamless handling of all property documentation, title deed transfers, and RERA compliance for a stress-free transaction.',
    color: 'from-red-50 to-red-100',
    iconBg: 'bg-red-600',
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

export default function Services() {
  const sectionRef = useRef(null);
  const visible = useIntersection(sectionRef);

  return (
    <section id="services" ref={sectionRef} className="py-20 md:py-28 bg-sky">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="section-subtitle">What We Offer</p>
          <h2 className="section-title mb-4">Our Core Services</h2>
          <div className="gold-divider mx-auto mb-4" />
          <p className="text-gray-500 max-w-2xl mx-auto">
            From finding your first home to building a diversified real estate portfolio — 
            we provide comprehensive services tailored to every stage of your property journey.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-default
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
              style={{ transitionDelay: visible ? `${i * 80}ms` : '0ms' }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 ${service.iconBg} text-white rounded-2xl flex items-center justify-center mb-5 
                group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="font-heading font-semibold text-xl text-primary-dark mb-3">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>

              {/* Bottom line */}
              <div className="mt-5 pt-4 border-t border-gray-100">
                <span className="text-primary font-semibold text-sm group-hover:text-gold transition-colors duration-300 flex items-center gap-1">
                  Learn more 
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className={`mt-16 bg-primary rounded-2xl p-8 md:p-12 text-center transition-all duration-700 delay-500
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="font-heading font-bold text-white text-2xl md:text-3xl mb-3">
            Ready to Find Your Perfect Property?
          </h3>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Talk to our experts today. We'll help you navigate the UAE real estate market with confidence.
          </p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-gold text-base px-8 py-3.5 inline-block"
          >
            Schedule a Free Consultation
          </a>
        </div>

      </div>
    </section>
  );
}
