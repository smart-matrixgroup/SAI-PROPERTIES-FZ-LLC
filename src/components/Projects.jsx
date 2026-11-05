import { useEffect, useRef, useState } from 'react';
import { MdLocationOn, MdBed, MdSquareFoot, MdArrowForward, MdStar } from 'react-icons/md';
import pfImg1 from '../assets/pf-img1.jpg';
import pfImg2 from '../assets/pf-img2.jpg';
import pfImg3 from '../assets/pf-img3.jpg';
import aziziImg1 from '../assets/azizi-img1.jpg';
import aziziImg2 from '../assets/azizi-img2.jpg';

const categories = ['All', 'Off-Plan', 'Ready', 'Luxury', 'Azizi'];

const projects = [
  // ── Azizi Developments — All Official Projects ──
  {
    id: 10,
    title: 'Azizi Florence',
    location: 'Um Fanain, Sharjah — E311',
    category: 'Azizi',
    type: 'Villa / Townhouse / Apt',
    beds: '3–6',
    area: '30,000,000',
    price: 'From AED 2,120,000',
    status: 'Off-Plan',
    delivery: 'Q3 2029',
    featured: true,
    developer: 'Azizi Developments',
    highlights: "Sharjah's Largest Masterplan · 10,000+ Homes · 1.7M sqft Park · 30/70 Payment Plan",
    image: aziziImg1,
    link: 'https://aziziflorence.com',
    isAzizi: true,
  },
  {
    id: 11,
    title: 'Burj Azizi',
    location: 'Sheikh Zayed Road, Dubai',
    category: 'Azizi',
    type: 'Suites / Apts / Hotel',
    beds: '1–5+',
    area: '786–2,158',
    price: 'From AED 7,500,000',
    status: 'Off-Plan',
    delivery: 'Q4 2028',
    featured: true,
    developer: 'Azizi Developments',
    highlights: "World's 2nd Tallest Tower · 725m · 131+ Floors · 7-Star Hotel · 1,047 Residences",
    image: pfImg1,
    link: 'https://www.azizidevelopments.com/en',
  },
  {
    id: 12,
    title: 'Azizi Venice',
    location: 'Dubai South, Dubai',
    category: 'Azizi',
    type: 'Apartment / Villa',
    beds: 'Studio–3',
    area: '332–1,451',
    price: 'From AED 600,000',
    status: 'Off-Plan',
    delivery: 'Q4 2026',
    featured: false,
    developer: 'Azizi Developments',
    highlights: 'Crystal Lagoon · 36,000+ Units · Opera House · Waterfront Boulevard',
    image: pfImg2,
    link: 'https://www.azizidevelopments.com/dubai/dubai-south/azizi-venice',
  },
  {
    id: 13,
    title: 'Azizi Riviera',
    location: 'Meydan, MBR City, Dubai',
    category: 'Azizi',
    type: 'Apartment',
    beds: 'Studio–3',
    area: '325–1,650',
    price: 'From AED 538,000',
    status: 'Off-Plan',
    delivery: 'Q4 2027',
    featured: false,
    developer: 'Azizi Developments',
    highlights: 'Mediterranean Community · 75 Buildings · Crystal Lagoon · 5-Star Hotel',
    image: pfImg3,
    link: 'https://www.azizidevelopments.com/dubai/meydan/riviera-beachfront',
  },
  {
    id: 14,
    title: 'Azizi Creek Views III',
    location: 'Dubai Healthcare City, Al Jaddaf',
    category: 'Azizi',
    type: 'Apartment',
    beds: 'Studio–3',
    area: '400–1,800',
    price: 'From AED 538,000',
    status: 'Off-Plan',
    delivery: 'Q3 2027',
    featured: false,
    developer: 'Azizi Developments',
    highlights: 'Panoramic Creek Views · Modern Finishes · Near Downtown Dubai',
    image: aziziImg2,
    link: 'https://www.azizidevelopments.com/dubai/dubai-healthcare-city/creek-views-III',
  },
  {
    id: 15,
    title: 'Azizi Rivière Rêve',
    location: 'Meydan, MBR City, Dubai',
    category: 'Azizi',
    type: 'Apartment',
    beds: 'Studio–3',
    area: '400–2,000',
    price: 'From AED 900,000',
    status: 'Off-Plan',
    delivery: 'Q2 2027',
    featured: false,
    developer: 'Azizi Developments',
    highlights: '5-Star Hotel-Inspired · Infinity Pool · Crystal Lagoon · Retail Boulevard',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80',
    link: 'https://www.azizidevelopments.com/Dubai/meydan/riviera-reve',
  },
  {
    id: 16,
    title: 'Azizi Mina',
    location: 'Palm Jumeirah, Dubai',
    category: 'Luxury',
    type: 'Apartment / Penthouse',
    beds: '1–4',
    area: '700–3,500',
    price: 'From AED 3,200,000',
    status: 'Ready',
    delivery: 'Completed',
    featured: true,
    developer: 'Azizi Developments',
    highlights: '178 Apartments · 4 Penthouses · Beachfront · Ready to Move',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80',
    link: 'https://www.azizidevelopments.com/dubai/palm-jumeirah/mina',
  },
  {
    id: 17,
    title: 'Azizi Royal Bay',
    location: 'Palm Jumeirah, Dubai',
    category: 'Luxury',
    type: 'Apartment / Penthouse',
    beds: '1–4',
    area: '700–4,000',
    price: 'From AED 2,500,000',
    status: 'Ready',
    delivery: 'Completed',
    featured: false,
    developer: 'Azizi Developments',
    highlights: '90 Units · Sea Views · Private Beach · Gym & Pool',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
    link: 'https://www.azizidevelopments.com/Dubai/palm-jumeirah/royal-bay',
  },
];

function useIntersection(ref, threshold = 0.05) {
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

export default function Projects({ onViewAzizi }) {
  const sectionRef = useRef(null);
  const visible = useIntersection(sectionRef);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  // Handle card tap/click
  const handleCardClick = (project) => {
    if (project.isAzizi) {
      onViewAzizi && onViewAzizi();
    } else if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="section-subtitle">Azizi Developments</p>
          <h2 className="section-title mb-4">Featured Projects & Properties</h2>
          <div className="gold-divider mx-auto mb-5" />
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Explore premium Azizi Developments properties across UAE —
            from beachfront Palm Jumeirah residences to mega masterplan communities.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-200
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300
                relative overflow-hidden ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <span className="absolute inset-0 bg-white/10 rounded-full animate-ping opacity-30" />
              )}
            </button>
          ))}
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-md
                border border-gray-100 hover:border-gold/30 hover:shadow-xl
                transition-all duration-300 group
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: visible ? `${i * 70}ms` : '0ms' }}
            >
              {/* Image — clickable area */}
              <div
                className="relative overflow-hidden h-52 cursor-pointer"
                onClick={() => handleCardClick(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Status badge */}
                <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm ${
                  project.status === 'Off-Plan' ? 'bg-gold/90 text-white' : 'bg-green-500/90 text-white'
                }`}>
                  {project.status}
                </span>

                {/* Developer / Featured badge */}
                {project.developer ? (
                  <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full
                    bg-primary/90 text-white backdrop-blur-sm">AZIZI</span>
                ) : project.featured ? (
                  <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full
                    bg-primary/90 text-white backdrop-blur-sm flex items-center gap-1">
                    <MdStar size={11} className="text-gold" /> Featured
                  </span>
                ) : null}

                {/* Price on image */}
                <div className="absolute bottom-3 left-3">
                  <p className="text-white font-heading font-bold text-lg drop-shadow-md">{project.price}</p>
                  {project.delivery && project.delivery !== 'Completed' && (
                    <p className="text-white/80 text-xs mt-0.5">Delivery: {project.delivery}</p>
                  )}
                </div>

                {/* Tap hint for Azizi */}
                {project.isAzizi && (
                  <div className="absolute inset-0 flex items-center justify-center
                    bg-primary/0 group-hover:bg-primary/60 transition-all duration-300">
                    <span className="opacity-0 group-hover:opacity-100 bg-white text-primary
                      font-bold px-4 py-2 rounded-xl text-sm flex items-center gap-2
                      transition-opacity duration-300">
                      View Details <MdArrowForward size={16} />
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-primary-dark text-base leading-tight">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                      <MdLocationOn size={12} className="text-gold flex-shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-lg
                    font-bold whitespace-nowrap ml-2 flex-shrink-0 text-[11px]">
                    {project.type}
                  </span>
                </div>

                {/* Specs */}
                <div className="flex flex-wrap items-center gap-3 text-gray-500 text-xs mt-2 pt-2 border-t border-gray-100">
                  {project.beds && (
                    <div className="flex items-center gap-1">
                      <MdBed size={13} className="text-primary" /> {project.beds} Beds
                    </div>
                  )}
                  {project.area && project.area !== 'Multiple' && (
                    <div className="flex items-center gap-1">
                      <MdSquareFoot size={13} className="text-primary" />
                      {isNaN(Number(project.area.replace(/,/g,'')))
                        ? project.area
                        : Number(project.area.replace(/,/g,'')).toLocaleString()} sqft
                    </div>
                  )}
                  {project.developer && (
                    <span className="text-primary font-semibold text-[11px]">By {project.developer}</span>
                  )}
                </div>

                {/* Highlights */}
                {project.highlights && (
                  <p className="text-[11px] text-gold font-medium mt-2 leading-relaxed line-clamp-2">
                    {project.highlights}
                  </p>
                )}

                {/* ── Action buttons — always visible (mobile friendly) ── */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                  {/* Primary action */}
                  {project.isAzizi ? (
                    <button
                      onClick={() => handleCardClick(project)}
                      className="flex-1 flex items-center justify-center gap-1.5
                        bg-primary text-white px-3 py-2.5 rounded-xl font-bold text-xs
                        active:bg-primary-dark transition-colors touch-manipulation"
                    >
                      View Details <MdArrowForward size={13} />
                    </button>
                  ) : project.link ? (
                    <a
                      href={project.link}
                      target="_blank" rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5
                        bg-primary text-white px-3 py-2.5 rounded-xl font-bold text-xs
                        active:bg-primary-dark transition-colors"
                    >
                      Official Site <MdArrowForward size={13} />
                    </a>
                  ) : (
                    <div className="flex-1" />
                  )}

                  {/* Enquire button — always */}
                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="flex-1 flex items-center justify-center
                      bg-gold hover:bg-gold-dark text-white px-3 py-2.5 rounded-xl
                      font-bold text-xs transition-colors touch-manipulation"
                  >
                    Enquire
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className={`text-center mt-12 transition-all duration-700 delay-500
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white
              px-10 py-3.5 rounded-xl font-bold text-base transition-all duration-300
              hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            View All Properties <MdArrowForward size={18} />
          </a>
        </div>

      </div>
    </section>
  );
}
