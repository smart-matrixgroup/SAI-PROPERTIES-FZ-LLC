import { useEffect, useRef, useState } from 'react';
import { MdConstruction, MdArrowForward, MdCheckCircle,
  MdSchedule, MdLocationOn, MdOpenInNew } from 'react-icons/md';
import { FaHardHat, FaBuilding } from 'react-icons/fa';
import pfImg1 from '../assets/pf-img1.jpg';
import pfImg2 from '../assets/pf-img2.jpg';
import pfImg3 from '../assets/pf-img3.jpg';
import aziziImg1 from '../assets/azizi-img1.jpg';
import aziziImg2 from '../assets/azizi-img2.jpg';

// ── Construction update data (sourced from public news & azizidevelopments.com) ──
const updates = [
  {
    id: 1,
    project: 'Burj Azizi',
    location: 'Sheikh Zayed Road, Dubai',
    progress: 18,
    status: 'Under Construction',
    statusColor: 'bg-blue-500',
    delivery: 'Q4 2028',
    update: 'As of May 2026: Raft foundation & 9-basement automated car park underway with ~750 workers on site daily. Extensive foundation & structural work progressing. Tower to reach 725m — world\'s 2nd tallest.',
    date: 'Oct 2026',
    link: 'https://www.azizidevelopments.com/en',
    image: pfImg1,
    tag: 'Live Update',
  },
  {
    id: 2,
    project: 'Azizi Venice',
    location: 'Dubai South, Dubai',
    progress: 50,
    status: 'Under Construction',
    statusColor: 'bg-blue-500',
    delivery: 'Q4 2025 – 2027 (Phases)',
    update: '24/7 round-the-clock construction schedule. 1,503 homes sold in August 2026 alone (13.5% of all Dubai home sales). Won Best Luxury Residential Development — Luxury Lifestyle Awards 2025.',
    date: 'Oct 2026',
    link: 'https://www.azizidevelopments.com/dubai/dubai-south/azizi-venice',
    image: pfImg2,
    tag: 'Live Update',
  },
  {
    id: 3,
    project: 'Azizi Riviera Beachfront I',
    location: 'Meydan, MBR City, Dubai',
    progress: 58,
    status: 'Advanced Construction',
    statusColor: 'bg-orange-500',
    delivery: 'Q4 2027',
    update: 'Official milestone: 58% construction complete. Mediterranean-inspired community advancing rapidly with KONE elevator installations underway across multiple buildings.',
    date: 'Sep 2026',
    link: 'https://www.azizidevelopments.com/dubai/meydan/riviera-beachfront',
    image: pfImg3,
    tag: '58% Complete',
  },
  {
    id: 4,
    project: 'Azizi Creek Views III',
    location: 'Dubai Healthcare City, Dubai',
    progress: 55,
    status: 'Under Construction',
    statusColor: 'bg-blue-500',
    delivery: 'Q3 2027',
    update: 'KONE elevator systems being installed. Panoramic Creek Views III advancing in Dubai Healthcare City. Modern finishes and premium interiors taking shape.',
    date: 'Sep 2026',
    link: 'https://www.azizidevelopments.com/dubai/dubai-healthcare-city/creek-views-III',
    image: aziziImg1,
    tag: null,
  },
  {
    id: 5,
    project: 'Azizi Rivière Rêve',
    location: 'Meydan, MBR City, Dubai',
    progress: 62,
    status: 'Advanced Construction',
    statusColor: 'bg-orange-500',
    delivery: 'Q2 2027',
    update: 'Advancing rapidly alongside Riviera Beachfront. Hotel-inspired luxury development with KONE elevator integration confirmed. Infinity pool & five-star amenities installation in progress.',
    date: 'Sep 2026',
    link: 'https://www.azizidevelopments.com/Dubai/meydan/riviera-reve',
    image: aziziImg2,
    tag: null,
  },
  {
    id: 6,
    project: 'Azizi Central',
    location: 'Dubai Sports City, Dubai',
    progress: 35,
    status: 'Under Construction',
    statusColor: 'bg-blue-500',
    delivery: 'Q2 2027',
    update: 'Official milestone: 35% construction complete. Structure and interiors progressing in Dubai Sports City with commissioning, landscaping and quality audits commencing.',
    date: 'Aug 2026',
    link: 'https://www.azizidevelopments.com/en',
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80',
    tag: '35% Complete',
  },
  {
    id: 7,
    project: 'Azizi Florence',
    location: 'Um Fanain, Sharjah',
    progress: 5,
    status: 'New Launch',
    statusColor: 'bg-gold',
    delivery: 'Q3 2029',
    update: "Sharjah's largest masterplan — New Launch 2026. Site preparation underway across 30M sqft. Expression of Interest phase open. 30/70 payment plan. Golden Visa eligible.",
    date: 'Oct 2026',
    link: 'https://aziziflorence.com',
    image: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=600&q=80',
    tag: 'New Launch',
  },
  {
    id: 8,
    project: 'Azizi Mina',
    location: 'Palm Jumeirah, Dubai',
    progress: 100,
    status: 'Completed',
    statusColor: 'bg-green-500',
    delivery: 'Completed',
    update: '178 apartments & 4 penthouses fully handed over. Residents enjoying beachfront lifestyle on Palm Jumeirah. Ready to move in units available for resale.',
    date: 'Jul 2026',
    link: 'https://www.azizidevelopments.com/dubai/palm-jumeirah/mina',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80',
    tag: 'Ready',
  },
  {
    id: 9,
    project: 'Azizi Royal Bay',
    location: 'Palm Jumeirah, Dubai',
    progress: 100,
    status: 'Completed',
    statusColor: 'bg-green-500',
    delivery: 'Completed',
    update: '90 luxury units & 2 penthouses successfully handed over. Iconic 45° rotated tower offering exclusive sea views. Ready to move in units available for resale.',
    date: 'Jul 2026',
    link: 'https://www.azizidevelopments.com/Dubai/palm-jumeirah/royal-bay',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
    tag: 'Ready',
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

export default function ConstructionUpdates() {
  const sectionRef = useRef(null);
  const visible = useIntersection(sectionRef);
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Under Construction', 'Advanced Construction', 'New Launch', 'Completed'];

  const filtered = filter === 'All'
    ? updates
    : updates.filter(u => u.status === filter);

  return (
    <section id="updates" ref={sectionRef} className="py-20 md:py-28 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className={`text-center mb-12 transition-all duration-700
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="section-subtitle">Live Progress</p>
          <h2 className="section-title mb-4">Construction Updates</h2>
          <div className="gold-divider mx-auto mb-5" />
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest construction progress on all Azizi Developments projects
            available through SAI Properties FZ-LLC.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Source: <a href="https://www.azizidevelopments.com/construction-updates"
              target="_blank" rel="noreferrer"
              className="text-primary hover:underline">
              azizidevelopments.com/construction-updates
            </a>
          </p>
        </div>

        {/* ── Summary stats ── */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 transition-all duration-700 delay-100
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {[
            { label: 'Total Projects', value: '9', icon: <FaBuilding />, color: 'bg-primary' },
            { label: 'Under Construction', value: '5', icon: <FaHardHat />, color: 'bg-blue-500' },
            { label: 'Completed', value: '2', icon: <MdCheckCircle />, color: 'bg-green-500' },
            { label: 'New Launch', value: '1', icon: <MdConstruction />, color: 'bg-gold' },
          ].map((s, i) => (
            <div key={i} className={`${s.color} rounded-2xl p-5 text-white text-center
              hover:-translate-y-1 transition-all duration-300 shadow-md`}>
              <div className="text-2xl mb-1 flex justify-center opacity-80">{s.icon}</div>
              <p className="text-2xl font-heading font-bold">{s.value}</p>
              <p className="text-white/70 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Filter tabs ── */}
        <div className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-200
          ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                filter === f
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}>
              {f}
            </button>
          ))}
        </div>

        {/* ── Update Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, i) => (
            <div key={item.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl
                border border-gray-100 hover:border-gold/30 transition-all duration-400
                hover:-translate-y-1 group
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: visible ? `${i * 70}ms` : '0ms' }}>

              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img src={item.image} alt={item.project}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Status badge */}
                <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1
                  rounded-full text-white backdrop-blur-sm ${item.statusColor}/90`}>
                  {item.status}
                </span>

                {/* Tag */}
                {item.tag && (
                  <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1
                    rounded-full bg-gold/90 text-white backdrop-blur-sm">
                    {item.tag}
                  </span>
                )}

                {/* Progress on image */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-xs font-bold">Construction Progress</span>
                    <span className="text-gold font-bold text-sm">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-1.5 backdrop-blur-sm">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-gold to-yellow-300
                        transition-all duration-1000"
                      style={{ width: visible ? `${item.progress}%` : '0%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-heading font-bold text-primary-dark text-base
                      group-hover:text-primary transition-colors leading-tight">
                      {item.project}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                      <MdLocationOn size={12} className="text-gold flex-shrink-0" />
                      {item.location}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <MdSchedule size={12} className="text-primary" />
                      {item.delivery}
                    </div>
                    <p className="text-gray-300 text-xs mt-0.5">{item.date}</p>
                  </div>
                </div>

                <p className="text-gray-500 text-xs leading-relaxed mt-3 line-clamp-3">
                  {item.update}
                </p>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <a href={item.link} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1 text-xs text-primary hover:text-gold
                      font-semibold transition-colors">
                    <MdOpenInNew size={13} /> Official Page
                  </a>
                  <a href="#contact"
                    onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="text-xs bg-primary hover:bg-gold text-white px-3 py-1.5
                      rounded-lg font-bold transition-all duration-300 hover:-translate-y-0.5">
                    Enquire
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Source note ── */}
        <p className={`text-center text-gray-400 text-xs mt-10 transition-all duration-700
          ${visible ? 'opacity-100' : 'opacity-0'}`}>
          Construction progress data sourced from{' '}
          <a href="https://www.azizidevelopments.com/construction-updates"
            target="_blank" rel="noreferrer"
            className="text-primary hover:underline">
            azizidevelopments.com
          </a>{' '}
          and public listings. Last updated: October 2026.
        </p>

      </div>
    </section>
  );
}
