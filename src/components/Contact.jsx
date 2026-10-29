import { useEffect, useRef, useState } from 'react';
import { MdLocationOn, MdPhone, MdEmail, MdPerson, MdSend, MdWhatsapp } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';

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

const contactInfo = [
  {
    icon: <MdPhone size={22} />,
    label: 'Phone',
    value: '+971 56 798 6455',
    href: 'tel:+971567986455',
  },
  {
    icon: <FaWhatsapp size={22} />,
    label: 'WhatsApp',
    value: '+971 56 798 6455',
    href: 'https://wa.me/971567986455',
  },
  {
    icon: <MdEmail size={22} />,
    label: 'Email',
    value: 'saipropertiesfzllc@gmail.com',
    href: 'mailto:saipropertiesfzllc@gmail.com',
  },
  {
    icon: <MdLocationOn size={22} />,
    label: 'Office',
    value: 'AlArif Shipping Building, Ist Floor, Office No-117, Port Saeed, Deira, Dubai, UAE',
    href: 'https://maps.google.com/?q=Port+Saeed,Deira,Dubai,UAE',
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const visible = useIntersection(sectionRef);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', interest: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Build mailto link with form data
    const subject = encodeURIComponent(`Property Enquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nInterest: ${formData.interest}\n\nMessage:\n${formData.message}`
    );
    window.open(`mailto:saipropertiesfzllc@gmail.com?subject=${subject}&body=${body}`);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-28 bg-sky">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="section-subtitle">Get In Touch</p>
          <h2 className="section-title mb-4">Contact SAI Properties</h2>
          <div className="gold-divider mx-auto mb-4" />
          <p className="text-gray-500 max-w-xl mx-auto">
            Ready to find your next property? Our team is here to help — reach out and 
            we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left: Contact Info */}
          <div className={`lg:col-span-2 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-primary rounded-2xl p-8 text-white h-full">
              <h3 className="font-heading font-semibold text-xl mb-2">Contact Information</h3>
              <p className="text-white/60 text-sm mb-8">Fill out the form or reach us directly:</p>

              <div className="space-y-6">
                {contactInfo.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-white/90 text-sm leading-snug group-hover:text-gold transition-colors">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Manager card */}
              <div className="mt-10 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">KV</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">K. Vaikunthan</p>
                    <p className="text-white/50 text-xs">Manager</p>
                  </div>
                </div>
              </div>

              {/* Map embed area */}
              <div className="mt-6 rounded-xl overflow-hidden">
                <iframe
                  title="SAI Properties Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.7!2d55.3285!3d25.2697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE2JzExLjAiTiA1NcKwMTknNDIuNiJF!5e0!3m2!1sen!2sae!4v1"
                  width="100%"
                  height="140"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="font-heading font-semibold text-xl text-primary-dark mb-6">Send Us a Message</h3>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
                  ✓ Thank you! Your enquiry has been sent. We'll be in touch shortly.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+971 xx xxx xxxx"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">I'm Interested In</label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white"
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
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">Message *</label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your requirements..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 btn-primary flex items-center justify-center gap-2"
                  >
                    <MdSend size={18} />
                    Send Enquiry
                  </button>
                  <a
                    href="https://wa.me/971567986455"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-semibold transition-colors"
                  >
                    <FaWhatsapp size={18} />
                    WhatsApp Us
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
