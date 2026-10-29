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
    <section ref={sectionRef} className="py-20 md:py-28 bg-primary-dark">
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
                  <span className="w-5 h-5 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Video player */}
          <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-gray-900 cursor-pointer group"
              onClick={handlePlay}>
              {/* Video element - replace src with actual video file if available */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                poster="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80"
              >
                {/* Add your video file here: <source src="/assets/sai-properties-tour.mp4" type="video/mp4" /> */}
                {/* Fallback image shown via poster attribute */}
              </video>

              {/* Overlay */}
              {showOverlay && (
                <div className="absolute inset-0 bg-primary/50 flex flex-col items-center justify-center">
                  <div className="text-white group-hover:scale-110 transition-transform duration-300">
                    <MdPlayCircle size={72} className="text-gold drop-shadow-lg" />
                  </div>
                  <p className="text-white font-semibold mt-3 text-sm">Watch Property Tour</p>
                </div>
              )}

              {/* Pause button when playing */}
              {playing && (
                <button
                  className="absolute bottom-4 right-4 text-white/70 hover:text-white transition-colors"
                  onClick={handlePlay}
                >
                  <MdPauseCircle size={36} />
                </button>
              )}
            </div>

            {/* Note for video upload */}
            <p className="text-white/40 text-xs text-center mt-3">
              Add your property tour video to <code className="text-gold/60">src/assets/</code> and update the video source
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
