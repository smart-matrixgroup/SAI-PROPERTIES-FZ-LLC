import { useEffect, useRef, useState } from 'react';
import { MdLocationOn, MdApartment, MdPark, MdPool, MdSchool,
  MdLocalMall, MdArrowForward, MdClose, MdCheckCircle } from 'react-icons/md';
import { FaBuilding, FaTree, FaRoad, FaPlane, FaMosque,
  FaSwimmingPool, FaShoppingCart, FaWhatsapp } from 'react-icons/fa';

// ── Data from aziziflorence.com (official public website) ──
const stats = [
  { value: '30M',    label: 'Sq. Ft. Masterplan',       icon: <FaBuilding /> },
  { value: '10,000+', label: 'Homes',                   icon: <MdApartment /> },
  { value: '1.7M',   label: 'Sq. Ft. Bardini Park',     icon: <MdPark /> },
  { value: '160,000+', label: 'Trees & Plants',          icon: <FaTree /> },
  { value: '100+',   label: 'Community Amenities',       icon: <MdPool /> },
  { value: '60km',   label: 'Sikka Pedestrian Network',  icon: <FaRoad /> },
];

const residenceTypes = [
  {
    type: 'Villas',
    beds: '4 – 6 Bedrooms',
    price: 'From AED 4,290,000',
    desc: 'Signature G+2 family villas with double height living, internal courtyards, expansive master suites and dual rooftop terraces.',
    icon: '🏡',
  },
  {
    type: 'Townhouses',
    beds: '3 – 4 Bedrooms',
    price: 'From AED 2,120,000',
    desc: 'Spacious G+1 townhouses with indoor living, outdoor space and elevated balconies — curated to make everyday life feel lavish.',
    icon: '🏘️',
  },
  {
    type: 'Apartments',
    beds: 'Studio – 3 Bedrooms',
    price: 'From AED 1,890,000',
    desc: 'Contemporary apartments designed for modern family life with premium finishes and community access.',
    icon: '🏢',
  },
];

const amenities = {
  'Central Park': [
    'Seasonal Flower Gardens, Zen Gardens & Glow Gardens',
    'Basketball, Tennis & Volleyball Courts, Mini Golf & Skating Park',
    'Walking, Running & Cycling Tracks + Swimming Pools',
    'Kids Play Areas, Restaurants & Cafés, Open Green Spaces',
    'Dancing Fountains & Water Park + Amusement Park',
    'Sculpture Park, Art & Culture Plaza, Outdoor Theatre',
    'Food Trucks, Weekend Market, Yoga Lawn, Outdoor Fitness',
  ],
  'Cluster Facilities': [
    'Dedicated Clubhouse for Men — Gym, Pool, Sauna & Jacuzzi',
    'Dedicated Clubhouse for Women — Gym, Pool, Sauna & Jacuzzi',
    'Separate Children\'s Pool in Every Cluster',
    'Indoor Games & Recreation Room',
    'Landscaped Green Park at the Heart of Every Cluster',
    'BBQ Areas, Jogging Tracks & EV Charging Stations',
    'Cluster Mosque & Community Services',
  ],
  'Community Mall': [
    '700,000 sq. ft. Community Mall',
    'Full Retail Floor — Fashion, Lifestyle & Everyday Stores',
    'Curated Dining + Family Food Hall',
    'Gym, Pools, Steam Room, Sauna, Massage & Jacuzzi',
    'Cinema, Game Room, Escape Room & Adventure Zone',
    'Full Grocery, On-Site Healthcare & Private Members Lounge',
  ],
};

const connectivity = [
  { label: 'Sheikh Mohammed Bin Zayed Road', detail: 'Direct access', icon: <FaRoad /> },
  { label: 'Emirates Road', detail: '10 minutes', icon: <FaRoad /> },
  { label: 'Sharjah International Airport', detail: '10 minutes', icon: <FaPlane /> },
  { label: 'Dubai International Airport', detail: '20 minutes', icon: <FaPlane /> },
  { label: 'University City, Sharjah', detail: '10 minutes', icon: <MdSchool /> },
];

const faqs = [
  {
    q: 'Is Azizi Florence the largest community in Sharjah?',
    a: 'Yes. Spanning 30 million sq. ft., Azizi Florence is the largest lifestyle community in Sharjah, master-planned around a 1.7 million sq. ft. Signature Central Park with 49,000 planned residents.',
  },
  {
    q: 'What payment plan is available?',
    a: '30/70 payment plan — 30% during construction and 70% on handover. Townhouses from AED 2.12M, Villas from AED 4.29M. Handover expected Q3 2029.',
  },
  {
    q: 'Can foreign nationals buy freehold property here?',
    a: 'Yes. Under Sharjah\'s 2022 ownership reforms, buyers of all nationalities can own on a 100% freehold basis, registered through SRERD.',
  },
  {
    q: 'Does buying qualify me for a UAE Golden Visa?',
    a: 'Yes. A property purchase of AED 2M or more qualifies for the 10-year UAE Golden Visa. Every townhouse (from AED 2.12M) and villa (from AED 4.29M) qualifies.',
  },
  {
    q: 'Are there schools and mosques inside?',
    a: 'Yes. On-site school for ~1,000 students, two main Jumma mosques and six cluster mosques are within walking distance.',
  },
];

function useIntersection(ref, threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

export default function AziziFlorence({ onClose }) {
  const [activeTab, setActiveTab] = useState('Central Park');
  const [openFaq, setOpenFaq] = useState(null);
  const topRef = useRef(null);
  const statsRef = useRef(null);
  const statsVisible = useIntersection(statsRef);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-[998] bg-white overflow-y-auto" ref={topRef}>

      {/* ── Sticky Header ── */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-heading font-bold text-primary-dark text-lg">Azizi Florence</h1>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <MdLocationOn size={12} className="text-gold" />
              Um Fanain, Sharjah · By Azizi Developments
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://aziziflorence.com" target="_blank" rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs bg-primary text-white
                px-4 py-2 rounded-full font-bold hover:bg-primary-light transition-colors">
              Official Site <MdArrowForward size={13} />
            </a>
            <a href="https://wa.me/971567986455?text=I%20am%20interested%20in%20Azizi%20Florence%2C%20Sharjah"
              target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-xs bg-green-500 text-white
                px-4 py-2 rounded-full font-bold hover:bg-green-600 transition-colors">
              <FaWhatsapp size={13} /> Enquire
            </a>
            <button onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
              <MdClose size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Hero Banner ── */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <img
          src="/SAI-PROPERTIES-FZ-LLC/assets/azizi-img1.jpg"
          alt="Azizi Florence"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(10,22,55,0.8) 0%, rgba(10,22,55,0.4) 60%, transparent 100%)' }} />
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <span className="inline-flex items-center gap-2 bg-gold text-white text-xs font-bold
            px-3 py-1.5 rounded-full mb-3 w-fit">
            Off-Plan · Delivery Q3 2029
          </span>
          <h2 className="font-heading font-bold text-white text-3xl sm:text-5xl mb-2 drop-shadow-lg">
            Azizi Florence
          </h2>
          <p className="text-white/80 text-base sm:text-lg font-medium">
            Sharjah's Largest Masterplan Community
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Stats Grid ── */}
        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
          {stats.map((s, i) => (
            <div key={i}
              className={`text-center p-5 bg-primary rounded-2xl transition-all duration-500
                ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="text-gold text-xl mb-2">{s.icon}</div>
              <p className="font-heading font-bold text-gold text-2xl">{s.value}</p>
              <p className="text-white/60 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── About ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
          <div>
            <p className="section-subtitle">About the Project</p>
            <h3 className="section-title mb-4">A World of Its Own</h3>
            <div className="gold-divider mb-5" />
            <p className="text-gray-600 leading-relaxed mb-4">
              Azizi Florence unfolds along Sheikh Mohammad Bin Zayed Road (E311), emerging as
              <strong className="text-primary"> Sharjah's largest master-planned community</strong>.
              A destination where nature, family, architecture and a sense of belonging come
              together to create a life designed for lasting memories.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Spanning <strong className="text-primary">30 million sq. ft.</strong>, the community is
              anchored by the <strong className="text-primary">1.7 million sq. ft. Azizi Bardini Park</strong>,
              along with 100+ world-class amenities and an exceptional collection of apartments,
              townhouses and villas.
            </p>
          </div>
          <div className="bg-sky rounded-2xl p-6 border border-primary/10">
            <h4 className="font-heading font-bold text-primary-dark text-lg mb-5">Payment Plan</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-primary/10">
                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">30%</span>
                </div>
                <div>
                  <p className="font-bold text-primary-dark">During Construction</p>
                  <p className="text-gray-400 text-sm">Flexible installments</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gold/20">
                <div className="w-14 h-14 bg-gold rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">70%</span>
                </div>
                <div>
                  <p className="font-bold text-primary-dark">On Handover</p>
                  <p className="text-gray-400 text-sm">Q3 2029</p>
                </div>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-green-700 text-sm font-semibold flex items-center gap-2">
                  <MdCheckCircle className="text-green-500" size={18} />
                  Qualifies for 10-Year UAE Golden Visa (AED 2M+)
                </p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-blue-700 text-sm font-semibold flex items-center gap-2">
                  <MdCheckCircle className="text-blue-500" size={18} />
                  100% Freehold for All Nationalities
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Residence Types ── */}
        <div className="mb-14">
          <div className="text-center mb-8">
            <p className="section-subtitle">Choose Your Home</p>
            <h3 className="section-title">Residence Types</h3>
            <div className="gold-divider mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {residenceTypes.map((r, i) => (
              <div key={i} className="bg-white border-2 border-gray-100 hover:border-gold/40
                rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="text-4xl mb-4">{r.icon}</div>
                <h4 className="font-heading font-bold text-primary-dark text-xl mb-1">{r.type}</h4>
                <p className="text-gold font-bold text-sm mb-1">{r.beds}</p>
                <p className="text-primary font-bold text-lg mb-3">{r.price}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
                <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-gradient-to-r
                  from-gold to-transparent transition-all duration-500 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Amenities ── */}
        <div className="mb-14">
          <div className="text-center mb-8">
            <p className="section-subtitle">World-Class Amenities</p>
            <h3 className="section-title">100+ Amenities Across 3 Levels</h3>
            <div className="gold-divider mx-auto mt-3" />
          </div>
          {/* Tab buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {Object.keys(amenities).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {tab}
              </button>
            ))}
          </div>
          {/* Amenity list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {amenities[activeTab].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-sky rounded-xl
                border border-primary/10 hover:border-gold/30 transition-colors">
                <MdCheckCircle className="text-gold flex-shrink-0 mt-0.5" size={18} />
                <p className="text-gray-700 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Connectivity ── */}
        <div className="mb-14">
          <div className="text-center mb-8">
            <p className="section-subtitle">Location</p>
            <h3 className="section-title">Well Connected</h3>
            <div className="gold-divider mx-auto mt-3" />
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
              Set in Um Fanain, Sharjah, directly across Sheikh Mohammed Bin Zayed Road (E311).
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {connectivity.map((c, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white border border-gray-100
                rounded-xl hover:border-gold/30 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl
                  flex items-center justify-center flex-shrink-0">
                  {c.icon}
                </div>
                <div>
                  <p className="font-semibold text-primary-dark text-sm">{c.label}</p>
                  <p className="text-gold text-xs font-bold">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQs ── */}
        <div className="mb-14 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="section-subtitle">FAQs</p>
            <h3 className="section-title">Common Questions</h3>
            <div className="gold-divider mx-auto mt-3" />
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden
                hover:border-gold/30 transition-colors">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left
                    hover:bg-sky transition-colors">
                  <span className="font-semibold text-primary-dark text-sm pr-4">{faq.q}</span>
                  <span className={`text-gold font-bold text-xl flex-shrink-0 transition-transform duration-300
                    ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="bg-primary rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full
            -translate-y-20 translate-x-20 pointer-events-none" />
          <p className="text-gold text-xs font-bold uppercase tracking-widest mb-3">
            Enquire Through SAI Properties
          </p>
          <h3 className="font-heading font-bold text-white text-2xl sm:text-3xl mb-3">
            Interested in Azizi Florence?
          </h3>
          <p className="text-white/60 mb-8 max-w-lg mx-auto text-sm">
            Contact SAI Properties FZ-LLC for expert guidance, site visits and the best pricing on Azizi Florence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={onClose}
              className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark
                text-white px-8 py-3.5 rounded-xl font-bold transition-all duration-300
                hover:shadow-xl hover:-translate-y-0.5">
              <MdArrowForward size={18} /> Enquire Now
            </button>
            <a href="https://wa.me/971567986455?text=I%20am%20interested%20in%20Azizi%20Florence%2C%20Sharjah"
              target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600
                text-white px-8 py-3.5 rounded-xl font-bold transition-all duration-300
                hover:shadow-xl hover:-translate-y-0.5">
              <FaWhatsapp size={18} /> WhatsApp Us
            </a>
            <a href="https://aziziflorence.com" target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 border-2 border-white/50
                hover:border-white text-white px-8 py-3.5 rounded-xl font-bold
                transition-all duration-300 hover:-translate-y-0.5">
              Official Site
            </a>
          </div>
          <p className="text-white/30 text-xs mt-5">
            Content sourced from aziziflorence.com — official Azizi Developments website
          </p>
        </div>

      </div>
    </div>
  );
}
