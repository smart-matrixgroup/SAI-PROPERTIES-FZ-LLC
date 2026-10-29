import { useEffect, useRef, useState } from 'react';
import { MdPlayCircle, MdPauseCircle } from 'react-icons/md';

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

export default function VideoSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const visible = useIntersection(sectionRef);
  const [playing, setPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  const handlePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
        setPlaying(false);
        setShowOverlay(true);
      } else {
        videoRef.current.play();
        setPlaying(true);
        setShowOverlay(false);
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-primary-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text */}
          <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">See It For Yourself</p>
            <h2 className="font-heading font-bold text-white text-3xl md:text-4xl leading-tight mb-6">
              Experience Dubai's Finest<br />
              <span className="text-gold">Real Estate</span>
            </h2>
            <div className="gold-divider mb-6" />
            <p className="text-white/70 leading-relaxed mb-6">
              Step inside our premium properties and discover what makes SAI Properties
              FZ-LLC the preferred choice for discerning buyers and investors across UAE
              and global markets.
            </p>
            <ul className="space-y-3">
              {[
                'Luxury waterfront apartments',
                'High-ROI investment properties',
                'Landmark commercial spaces',
                'Off-plan projects with flexible payment plans',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80 text-sm">
                  <span className="w-5 h-5 bg-gold rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Video player — note text REMOVED */}
          <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-gray-900 cursor-pointer group ring-1 ring-white/10"
              onClick={handlePlay}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                poster="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=85"
              >
                {/* Place your video: <source src="/sai-tour.mp4" type="video/mp4" /> */}
              </video>

              {showOverlay && (
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-primary/30 to-transparent
                  flex flex-col items-center justify-center">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    <MdPlayCircle size={80} className="text-gold drop-shadow-2xl" />
                  </div>
                  <p className="text-white font-bold mt-3 text-base tracking-wide">Watch Property Tour</p>
                </div>
              )}

              {playing && (
                <button
                  className="absolute bottom-4 right-4 text-white/70 hover:text-white transition-colors"
                  onClick={(e) => { e.stopPropagation(); handlePlay(); }}
                >
                  <MdPauseCircle size={38} />
                </button>
              )}
            </div>
            {/* Note text completely removed as requested */}
          </div>

        </div>
      </div>
    </section>
  );
}
