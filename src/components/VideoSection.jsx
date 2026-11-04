import { useEffect, useRef, useState } from 'react';
import { MdPlayArrow } from 'react-icons/md';
import { FaFacebook } from 'react-icons/fa';

// ── Azizi Facebook Reels ──
const reels = [
  {
    id: 1,
    videoId: '1602607494683952',
    title: 'Azizi Developments',
    tag: 'Project Showcase',
  },
  {
    id: 2,
    videoId: '1679734180157167',
    title: 'Azizi Developments',
    tag: 'Community Tour',
  },
  {
    id: 3,
    videoId: '1745548686505877',
    title: 'Azizi Developments',
    tag: 'Lifestyle',
  },
  {
    id: 4,
    videoId: '2157121364876987',
    title: 'Azizi Developments',
    tag: 'Latest Update',
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

export default function VideoSection() {
  const sectionRef = useRef(null);
  const visible = useIntersection(sectionRef);
  const [activeReel, setActiveReel] = useState(0);
  const [loaded, setLoaded] = useState({});

  const handleLoad = (id) => setLoaded(prev => ({ ...prev, [id]: true }));

  const activeVideo = reels[activeReel];

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-primary-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className={`text-center mb-12 transition-all duration-700
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
            Official Videos
          </p>
          <h2 className="font-heading font-bold text-white text-3xl md:text-4xl leading-tight mb-4">
            Azizi Developments<br />
            <span className="text-gold">Project Videos</span>
          </h2>
          <div className="gold-divider mx-auto mb-4" />
          <p className="text-white/60 max-w-xl mx-auto text-sm">
            Watch the latest videos from Azizi Developments — official property tours,
            project showcases and lifestyle videos.
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <FaFacebook className="text-blue-400" size={16} />
            <a href="https://www.facebook.com/AziziGroup/videos"
              target="_blank" rel="noreferrer"
              className="text-blue-400 hover:text-blue-300 text-xs font-semibold
                hover:underline transition-colors">
              Follow Azizi Developments on Facebook
            </a>
          </div>
        </div>

        {/* ── Main Video Player ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main featured reel */}
          <div className={`lg:col-span-2 transition-all duration-700
            ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative rounded-2xl overflow-hidden bg-black
              ring-1 ring-white/10 shadow-2xl" style={{ paddingBottom: '56.25%' }}>
              {/* Loading spinner */}
              {!loaded[activeVideo.videoId] && (
                <div className="absolute inset-0 flex items-center justify-center bg-primary-dark z-10">
                  <div className="w-10 h-10 border-2 border-gold/30 border-t-gold
                    rounded-full animate-spin" />
                </div>
              )}
              <iframe
                key={activeVideo.videoId}
                className="absolute inset-0 w-full h-full"
                src={`https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F${activeVideo.videoId}&show_text=false&appId=&width=560`}
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title={`Azizi Reel ${activeVideo.videoId}`}
                onLoad={() => handleLoad(activeVideo.videoId)}
              />
            </div>

            {/* Tag + FB link */}
            <div className="flex items-center justify-between mt-3 px-1">
              <span className="text-xs bg-gold/20 text-gold px-3 py-1 rounded-full font-semibold">
                {activeVideo.tag}
              </span>
              <a
                href={`https://www.facebook.com/reel/${activeVideo.videoId}`}
                target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300
                  text-xs font-semibold transition-colors"
              >
                <FaFacebook size={13} /> View on Facebook
              </a>
            </div>
          </div>

          {/* Reel thumbnails sidebar */}
          <div className={`flex flex-col gap-4 transition-all duration-700 delay-200
            ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <p className="text-white/50 text-xs uppercase tracking-widest font-semibold px-1">
              More Videos
            </p>
            {reels.map((reel, i) => (
              <button
                key={reel.id}
                onClick={() => setActiveReel(i)}
                className={`relative rounded-xl overflow-hidden text-left
                  transition-all duration-300 group border-2
                  ${activeReel === i
                    ? 'border-gold shadow-lg shadow-gold/20'
                    : 'border-white/10 hover:border-white/30'
                  }`}
              >
                {/* Thumbnail iframe (small, muted preview) */}
                <div className="relative bg-primary" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    src={`https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F${reel.videoId}&show_text=false&appId=&width=200`}
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    frameBorder="0"
                    title={`Thumb ${reel.videoId}`}
                    tabIndex={-1}
                  />
                  {/* Play overlay */}
                  {activeReel !== i && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center
                      group-hover:bg-black/20 transition-colors">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center
                        group-hover:bg-gold transition-colors">
                        <MdPlayArrow className="text-white" size={18} />
                      </div>
                    </div>
                  )}
                  {/* Active indicator */}
                  {activeReel === i && (
                    <div className="absolute top-2 left-2 bg-gold text-white text-[10px]
                      font-bold px-2 py-0.5 rounded-full">
                      ▶ Playing
                    </div>
                  )}
                </div>
                <div className="p-2 bg-primary-dark">
                  <p className="text-white/80 text-xs font-semibold">{reel.tag}</p>
                  <p className="text-white/40 text-[10px] mt-0.5 flex items-center gap-1">
                    <FaFacebook size={10} className="text-blue-400" />
                    Azizi Developments
                  </p>
                </div>
              </button>
            ))}

            {/* See all link */}
            <a
              href="https://www.facebook.com/AziziGroup/videos"
              target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600/20
                hover:bg-blue-600/40 border border-blue-500/30 text-blue-400
                py-3 rounded-xl text-xs font-bold transition-all duration-300
                hover:border-blue-400"
            >
              <FaFacebook size={14} />
              See All Videos on Facebook
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
