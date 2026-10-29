import { useEffect, useRef, useState } from 'react';
import { MdLocationOn, MdBed, MdBathtub, MdSquareFoot, MdArrowForward, MdStar } from 'react-icons/md';

const categories = ['All', 'Residential', 'Commercial', 'Luxury', 'Off-Plan'];

const projects = [
  {
    id: 1, title: 'Marina Heights', location: 'Dubai Marina, UAE',
    category: 'Luxury', type: 'Apartment', beds: 3, baths: 2, area: '1,850',
    price: 'AED 2.8M', status: 'Ready', featured: true,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
  },
  {
    id: 2, title: 'Palm Grove Villas', location: 'Palm Jumeirah, UAE',
    category: 'Luxury', type: 'Villa', beds: 5, baths: 4, area: '4,200',
    price: 'AED 8.5M', status: 'Ready', featured: true,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80',
  },
  {
    id: 3, title: 'Downtown Business Hub', location: 'Downtown Dubai, UAE',
    category: 'Commercial', type: 'Office', beds: null, baths: null, area: '3,500',
    price: 'AED 5.2M', status: 'Ready', featured: false,
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
  },
  {
    id: 4, title: 'Creek View Residences', location: 'Dubai Creek Harbour, UAE',
    category: 'Off-Plan', type: 'Apartment', beds: 2, baths: 2, area: '1,200',
    price: 'AED 1.6M', status: 'Off-Plan', featured: false,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
  },
  {
    id: 5, title: 'Deira Gold Towers', location: 'Deira, Dubai, UAE',
    category: 'Commercial', type: 'Retail', beds: null, baths: null, area: '2,100',
    price: 'AED 3.1M', status: 'Ready', featured: false,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
  },
  {
    id: 6, title: 'Emaar Suburban Homes', location: 'Arabian Ranches, UAE',
    category: 'Residential', type: 'Villa', beds: 4, baths: 3, area: '3,100',
    price: 'AED 4.4M', status: 'Ready', featured: false,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80',
  },
  {
    id: 7, title: 'Sports City Apartments', location: 'Dubai Sports City, UAE',
    category: 'Residential', type: 'Apartment', beds: 1, baths: 1, area: '750',
    price: 'AED 650K', status: 'Ready', featured: false,
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80',
  },
  {
    id: 8, title: 'Harbour Square Towers', location: 'Business Bay, UAE',
    category: 'Off-Plan', type: 'Apartment', beds: 2, baths: 2, area: '1,100',
    price: 'AED 1.9M', status: 'Off-Plan', featured: false,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
  },
  {
    id: 9, title: 'JBR Beachfront Suites', location: 'Jumeirah Beach, UAE',
    category: 'Luxury', type: 'Apartment', beds: 3, baths: 3, area: '2,200',
    price: 'AED 4.2M', status: 'Ready', featured: false,
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80',
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

export default function Projects() {
  const sectionRef = useRef(null);
  const visible = useIntersection(sectionRef);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="section-subtitle">Our Portfolio</p>
          <h2 className="section-title mb-4">Featured Projects & Properties</h2>
          <div className="gold-divider mx-auto mb-5" />
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Explore our handpicked selection of premium properties across UAE —
            from beachfront residences to high-yield commercial investments.
          </p>
        </div>

        {/* ── Filter Tabs ── */}
        <div className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-200
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 relative overflow-hidden ${
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

        {/* ── Property Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl
                hover:-translate-y-2 border border-gray-100 hover:border-gold/30
                transition-all duration-400 group
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: visible ? `${i * 70}ms` : '0ms' }}
            >
              {/* ── Image ── */}
              <div className="relative overflow-hidden h-52">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600"
                  loading="lazy"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Status badge */}
                <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm ${
                  project.status === 'Off-Plan'
                    ? 'bg-gold/90 text-white'
                    : 'bg-green-500/90 text-white'
                }`}>
                  {project.status}
                </span>

                {/* Featured badge */}
                {project.featured && (
                  <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full
                    bg-primary/90 text-white backdrop-blur-sm flex items-center gap-1">
                    <MdStar size={11} className="text-gold" /> Featured
                  </span>
                )}

                {/* Hover overlay with CTA */}
                <div className="absolute inset-0 bg-primary/80 flex items-center justify-center
                  opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="bg-white text-primary font-bold px-5 py-2.5 rounded-xl
                      flex items-center gap-2 hover:bg-gold hover:text-white transition-colors
                      shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    Enquire Now <MdArrowForward size={16} />
                  </a>
                </div>

                {/* Price on image */}
                <div className="absolute bottom-3 left-3">
                  <p className="text-white font-heading font-bold text-lg drop-shadow-md">{project.price}</p>
                </div>
              </div>

              {/* ── Info ── */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-primary-dark text-lg leading-tight group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                      <MdLocationOn size={13} className="text-gold flex-shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-lg font-bold whitespace-nowrap ml-2 flex-shrink-0">
                    {project.type}
                  </span>
                </div>

                {/* Specs */}
                <div className="flex items-center gap-4 text-gray-500 text-xs mt-3 pt-3 border-t border-gray-100">
                  {project.beds && (
                    <div className="flex items-center gap-1 hover:text-primary transition-colors">
                      <MdBed size={14} className="text-primary" /> {project.beds} Beds
                    </div>
                  )}
                  {project.baths && (
                    <div className="flex items-center gap-1 hover:text-primary transition-colors">
                      <MdBathtub size={14} className="text-primary" /> {project.baths} Baths
                    </div>
                  )}
                  <div className="flex items-center gap-1 hover:text-primary transition-colors">
                    <MdSquareFoot size={14} className="text-primary" /> {project.area} sqft
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => (
                      <MdStar key={s} size={13} className="text-gold" />
                    ))}
                  </div>
                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="text-xs bg-primary hover:bg-gold text-white px-4 py-1.5 rounded-lg
                      transition-all duration-300 font-bold hover:shadow-md hover:-translate-y-0.5"
                  >
                    Enquire
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── View All ── */}
        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
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
