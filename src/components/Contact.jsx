import { useEffect, useRef, useState } from 'react';
import { MdLocationOn, MdPhone, MdEmail, MdSend } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import vaikunthanImg from '../assets/vaikunthan.png';

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

const contactInfo = [
  {
    icon: <MdPhone size={20} />,
    label: 'Phone',
    value: '+971 56 798 6455',
    href: 'tel:+971567986455',
    color: 'bg-blue-500',
  },
  {
    icon: <FaWhatsapp size={20} />,
    label: 'WhatsApp',
    value: '+971 56 798 6455',
    href: 'https://wa.me/971567986455',
    color: 'bg-green-500',
  },
  {
    icon: <MdEmail size={20} />,
    label: 'Email',
    value: 'saipropertiesfzllc@gmail.com',
    href: 'mailto:saipropertiesfzllc@gmail.com',
    color: 'bg-gold',
  },
  {
    icon: <MdLocationOn size={20} />,
    label: 'Office',
    value: 'AlArif Shipping Building, Ist Floor, Office No-117, Port Saeed, Deira, Dubai, UAE',
    href: 'https://maps.google.com/?q=AlArif+Shipping+Building+Port+Saeed+Deira+Dubai+UAE',
    color: 'bg-red-500',
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const visible = useIntersection(sectionRef);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', interest: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Property Enquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nInterest: ${formData.interest}\n\nMessage:\n${formData.message}`
    );
    window.open(`mailto:saipropertiesfzllc@gmail.com?subject=${subject}&body=${body}`);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputClass = (name) =>
    `w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none transition-all duration-300 bg-white ${
      focusedField === name
        ? 'border-gold shadow-md shadow-gold/10 scale-[1.01]'
        : 'border-gray-200 hover:border-primary/40'
    }`;

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-28 bg-sky overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="section-subtitle">Get In Touch</p>
          <h2 className="section-title mb-4">Contact SAI Properties</h2>
          <div className="gold-divider mx-auto mb-4" />
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            Ready to find your next property? Our team is here to help — reach out and
            we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ── Left: Contact Info Panel ── */}
          <div className={`lg:col-span-2 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
            <div className="bg-primary rounded-3xl p-8 text-white h-full flex flex-col relative overflow-hidden">

              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gold/10 rounded-full pointer-events-none" />

              <div className="relative z-10">
                <h3 className="font-heading font-bold text-2xl mb-1">Contact Information</h3>
                <p className="text-white/50 text-sm mb-8">Fill out the form or reach us directly</p>

                {/* Contact items */}
                <div className="space-y-5">
                  {contactInfo.map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="flex items-start gap-4 group"
                      style={{ transitionDelay: `${i * 80}ms` }}
                    >
                      <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0
                        shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{item.label}</p>
                        <p className="text-white/90 text-sm leading-snug group-hover:text-gold transition-colors duration-200">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* ── Manager Profile Card ── */}
                <div className="mt-8 pt-7 border-t border-white/10">
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl border border-white/10
                    hover:bg-white/15 hover:border-gold/30 transition-all duration-300 group">
                    {/* Profile image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-gold ring-offset-2 ring-offset-primary
                        group-hover:ring-4 transition-all duration-300">
                        <img
                    src={vaikunthanImg}
                    alt="K. Vaikunthan"
                    className="w-full h-full object-cover object-center scale-110"
                  />
                      </div>
                      {/* Online dot */}
                      <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-primary animate-pulse" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-white text-base">K. Vaikunthan</p>
                      <p className="text-gold text-xs font-semibold uppercase tracking-wider">Chief Officer (CO)</p>
                      <p className="text-white/40 text-xs mt-0.5">SAI Properties FZ-LLC</p>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="mt-5 rounded-2xl overflow-hidden ring-1 ring-white/10">
                  <iframe
                    title="SAI Properties Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.7!2d55.3285!3d25.2697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE2JzExLjAiTiA1NcKwMTknNDIuNiJF!5e0!3m2!1sen!2sae!4v1"
                    width="100%"
                    height="130"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">
              {/* Decorative top-right accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full pointer-events-none" />

              <h3 className="font-heading font-bold text-2xl text-primary-dark mb-1 relative">Send Us a Message</h3>
              <p className="text-gray-400 text-sm mb-6 relative">We'll respond within 24 hours</p>

              {/* Success banner */}
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border-2 border-green-300 rounded-2xl text-green-700 text-sm font-semibold flex items-center gap-3 animate-slide-up">
                  <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white flex-shrink-0">✓</span>
                  Thank you! Your enquiry has been sent. We'll be in touch shortly.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="group">
                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 transition-colors ${focusedField === 'name' ? 'text-gold' : 'text-gray-500'}`}>
                      Full Name *
                    </label>
                    <input
                      type="text" name="name" required
                      value={formData.name} onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField('')}
                      placeholder="Your full name"
                      className={inputClass('name')}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 transition-colors ${focusedField === 'email' ? 'text-gold' : 'text-gray-500'}`}>
                      Email Address *
                    </label>
                    <input
                      type="email" name="email" required
                      value={formData.email} onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      placeholder="your@email.com"
                      className={inputClass('email')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 transition-colors ${focusedField === 'phone' ? 'text-gold' : 'text-gray-500'}`}>
                      Phone Number
                    </label>
                    <input
                      type="tel" name="phone"
                      value={formData.phone} onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField('')}
                      placeholder="+971 xx xxx xxxx"
                      className={inputClass('phone')}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 transition-colors ${focusedField === 'interest' ? 'text-gold' : 'text-gray-500'}`}>
                      I'm Interested In
                    </label>
                    <select
                      name="interest"
                      value={formData.interest} onChange={handleChange}
                      onFocus={() => setFocusedField('interest')}
                      onBlur={() => setFocusedField('')}
                      className={inputClass('interest') + ' cursor-pointer'}
                    >
                      <option value="">Select option</option>
                      <option value="Buying">Buying a Property</option>
                      <option value="Selling">Selling a Property</option>
                      <option value="Renting">Renting</option>
                      <option value="Investing">Investment Property</option>
                      <option value="Commercial">Commercial Space</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 transition-colors ${focusedField === 'message' ? 'text-gold' : 'text-gray-500'}`}>
                    Message *
                  </label>
                  <textarea
                    name="message" required
                    value={formData.message} onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField('')}
                    rows={5}
                    placeholder="Tell us about your requirements..."
                    className={inputClass('message') + ' resize-none'}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-light
                      text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-300
                      hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <MdSend size={18} />
                    Send Enquiry
                  </button>
                  <a
                    href="https://wa.me/971567986455"
                    target="_blank" rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600
                      text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-300
                      hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <FaWhatsapp size={18} />
                    WhatsApp Us
                  </a>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-gray-100">
                  {['24h Response', 'Free Consultation', 'Expert Advice'].map((badge, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-[10px] font-bold">✓</span>
                      {badge}
                    </div>
                  ))}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
