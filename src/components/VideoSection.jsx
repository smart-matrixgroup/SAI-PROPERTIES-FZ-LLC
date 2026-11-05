import { useEffect, useRef, useState } from 'react';
import { MdPlayArrow } from 'react-icons/md';
import { FaFacebook, FaYoutube, FaPlay } from 'react-icons/fa';

const youtubeVideos = [
  {
    id: 'yt1',
    videoId: '_Zob0a89-Ew',
    tag: 'Official Video',
    source: 'youtube',
    thumb: 'https://img.youtube.com/vi/_Zob0a89-Ew/mqdefault.jpg',
  },
];

const facebookReels = [
  {
    id: 'fb1',
    videoId: '1602607494683952',
    tag: 'Project Showcase',
    source: 'facebook',
    thumb: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=400&q=70',
  },
  {
    id: 'fb2',
    videoId: '1679734180157167',
    tag: 'Community Tour',
    source: 'facebook',
    thumb: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=70',
  },
  {
    id: 'fb3',
    videoId: '1745548686505877',
    tag: 'Lifestyle',
    source: 'facebook',
    thumb: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=70',
  },
  {
    id: 'fb4',
    videoId: '2157121364876987',
    tag: 'Latest Update',
    source: 'facebook',
    thumb: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=70',
  },
];

const allVideos = [...youtubeVideos, ...facebookReels];

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

export default function VideoSection() {
  const sectionRef = useRef(null);
  const visible    = useIntersection(sectionRef);
  const [activeIdx,  setActiveIdx]  = useState(0);
  const [playing,    setPlaying]    = useState(false); // show iframe only after tap
  const [tab,        setTab]        = useState('all');
  const [fbLoaded,   setFbLoaded]   = useState(false);

  const filtered = tab === 'youtube'
    ? allVideos.filter(v => v.source === 'youtube')
    : tab === 'facebook'
      ? allVideos.filter(v => v.source === 'facebook')
      : allVideos;

  useEffect(() => { setActiveIdx(0); setPlaying(false); setFbLoaded(false); }, [tab]);

  const handleSelect = (i) => {
    setActiveIdx(i);
    setPlaying(false);
    setFbLoaded(false);
  };

  const activeVideo = filtered[activeIdx] ?? allVideos[0];

  // ── Facebook SDK inject (once) ──
  useEffect(() => {
    if (document.getElementById('facebook-jssdk')) return;
    // Inject FB SDK
    const script = document.createElement('script');
    script.id  = 'facebook-jssdk';
    script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);
    // Init FB after load
    window.fbAsyncInit = function () {
      if (window.FB) window.FB.init({ xfbml: true, version: 'v18.0' });
    };
  }, []);

  // Re-parse FB embeds when active video changes to facebook
  useEffect(() => {
    if (playing && activeVideo.source === 'facebook' && window.FB) {
      setTimeout(() => window.FB.XFBML?.parse(), 300);
    }
  }, [playing, activeVideo]);

  return (
    <section ref={sectionRef} className="py-14 sm:py-20 md:py-28 bg-primary-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className={`text-center mb-8 transition-all duration-700
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-gold font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
            Official Videos
          </p>
          <h2 className="font-heading font-bold text-white text-2xl sm:text-3xl md:text-4xl leading-tight mb-3">
            Azizi Developments
            <span className="text-gold"> Project Videos</span>
          </h2>
          <div className="gold-divider mx-auto mb-3" />
          <p className="text-white/60 max-w-xl mx-auto text-xs sm:text-sm">
            Watch official property tours, project showcases and lifestyle videos.
          </p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <a href="https://www.youtube.com/@AziziDevelopments"
              target="_blank" rel="noreferrer"
              className="flex items-center gap-1 text-red-400 text-xs font-semibold hover:text-red-300 transition-colors">
              <FaYoutube size={14} /> YouTube
            </a>
            <a href="https://www.facebook.com/AziziGroup/videos"
              target="_blank" rel="noreferrer"
              className="flex items-center gap-1 text-blue-400 text-xs font-semibold hover:text-blue-300 transition-colors">
              <FaFacebook size={13} /> Facebook
            </a>
          </div>
        </div>

        {/* ── Filter tabs ── */}
        <div className={`flex justify-center gap-2 mb-6 transition-all duration-700 delay-100
          ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {[
            { key: 'all',      label: 'All',      count: allVideos.length },
            { key: 'youtube',  label: 'YouTube',  count: youtubeVideos.length,
              icon: <FaYoutube className="text-red-400" size={11}/> },
            { key: 'facebook', label: 'Facebook', count: facebookReels.length,
              icon: <FaFacebook className="text-blue-400" size={11}/> },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-1 px-3 sm:px-4 py-2 rounded-full
                text-xs font-bold transition-all duration-300 border
                ${tab === t.key
                  ? 'bg-gold text-white border-gold shadow-lg'
                  : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'
                }`}>
              {t.icon}{t.label}
              <span className="text-[10px] px-1 py-0.5 rounded-full bg-white/20">
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── Player + Sidebar ── */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-5 transition-all duration-700
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {/* ── MAIN PLAYER ── */}
          <div className="lg:col-span-2">

            {/* Source + tag badges */}
            <div className="flex items-center gap-2 mb-2">
              {activeVideo.source === 'youtube' ? (
                <span className="flex items-center gap-1 bg-red-600/20 text-red-400
                  border border-red-500/30 px-2.5 py-1 rounded-full text-xs font-bold">
                  <FaYoutube size={11} /> YouTube
                </span>
              ) : (
                <span className="flex items-center gap-1 bg-blue-600/20 text-blue-400
                  border border-blue-500/30 px-2.5 py-1 rounded-full text-xs font-bold">
                  <FaFacebook size={10} /> Facebook
                </span>
              )}
              <span className="text-gold text-xs font-semibold bg-gold/10
                border border-gold/20 px-2.5 py-1 rounded-full">
                {activeVideo.tag}
              </span>
            </div>

            {/* ════════════ PLAYER BOX ════════════ */}
            <div className="relative rounded-2xl overflow-hidden bg-black ring-1 ring-white/10 shadow-2xl"
              style={{ paddingBottom: '56.25%' }}>

              {/* ── YOUTUBE ── */}
              {activeVideo.source === 'youtube' && (
                !playing ? (
                  /* Thumbnail + big play button */
                  <div className="absolute inset-0 cursor-pointer group"
                    onClick={() => setPlaying(true)}>
                    <img src={activeVideo.thumb} alt={activeVideo.tag}
                      className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25
                      transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full
                        flex items-center justify-center shadow-2xl
                        group-hover:scale-110 transition-transform duration-300">
                        <FaPlay className="text-white ml-1" size={22} />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <p className="text-white font-bold text-sm drop-shadow">
                        {activeVideo.tag}
                      </p>
                      <p className="text-white/60 text-xs flex items-center gap-1 mt-0.5">
                        <FaYoutube size={10} className="text-red-400" /> Tap to play
                      </p>
                    </div>
                  </div>
                ) : (
                  /* YouTube iframe — loads after tap */
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&rel=0&modestbranding=1`}
                    title={activeVideo.tag}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )
              )}

              {/* ── FACEBOOK — FB XFBML embed (plays inside site) ── */}
              {activeVideo.source === 'facebook' && (
                !playing ? (
                  /* Thumbnail + play button */
                  <div className="absolute inset-0 cursor-pointer group"
                    onClick={() => setPlaying(true)}>
                    <img src={activeVideo.thumb} alt={activeVideo.tag}
                      className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30
                      transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-full
                        flex items-center justify-center shadow-2xl
                        group-hover:scale-110 transition-transform duration-300">
                        <FaFacebook className="text-white" size={26} />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <p className="text-white font-bold text-sm drop-shadow">
                        {activeVideo.tag}
                      </p>
                      <p className="text-white/60 text-xs flex items-center gap-1 mt-0.5">
                        <FaFacebook size={10} className="text-blue-400" /> Tap to play
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Facebook embed — fills the box */
                  <div className="absolute inset-0 w-full h-full bg-black
                    flex items-center justify-center overflow-hidden">
                    {!fbLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center z-10 bg-black">
                        <div className="w-10 h-10 border-2 border-blue-400/30
                          border-t-blue-400 rounded-full animate-spin" />
                      </div>
                    )}
                    {/* FB iframe embed — most reliable cross-browser method */}
                    <iframe
                      src={`https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F${activeVideo.videoId}&show_text=false&width=560&height=315&appId`}
                      width="100%"
                      height="100%"
                      style={{ border: 'none', overflow: 'hidden', display: 'block' }}
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      title={activeVideo.tag}
                      onLoad={() => setFbLoaded(true)}
                    />
                  </div>
                )
              )}
            </div>
            {/* ═══════════════════════════════════ */}

            {/* Note for Facebook */}
            {activeVideo.source === 'facebook' && playing && (
              <p className="text-white/30 text-xs mt-2 text-center">
                Facebook video plays inside this page ·{' '}
                <a href={`https://www.facebook.com/reel/${activeVideo.videoId}`}
                  target="_blank" rel="noreferrer"
                  className="text-blue-400 hover:underline">
                  Open in Facebook
                </a>
              </p>
            )}
          </div>

          {/* ── SIDEBAR / MOBILE HORIZONTAL GRID ── */}
          <div className="lg:col-span-1">
            <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-3 px-1">
              {filtered.length} Video{filtered.length !== 1 ? 's' : ''}
            </p>

            <div className="flex gap-3 overflow-x-auto pb-2
              lg:flex-col lg:overflow-visible lg:space-y-3 lg:max-h-[420px] lg:overflow-y-auto
              scrollbar-none lg:pr-1">
              {filtered.map((video, i) => (
                <button
                  key={video.id}
                  onClick={() => handleSelect(i)}
                  className={`flex-shrink-0 w-36 sm:w-44 lg:w-full rounded-xl overflow-hidden
                    text-left transition-all duration-300 group border-2
                    ${filtered[activeIdx]?.id === video.id
                      ? 'border-gold shadow-lg shadow-gold/20'
                      : 'border-white/10 hover:border-white/30'
                    }`}
                >
                  <div className="relative bg-gray-900" style={{ paddingBottom: '56.25%' }}>
                    <img
                      src={video.thumb}
                      alt={video.tag}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    {filtered[activeIdx]?.id !== video.id && (
                      <div className="absolute inset-0 bg-black/45 flex items-center justify-center
                        group-hover:bg-black/25 transition-colors">
                        <div className="w-7 h-7 bg-white/20 rounded-full
                          flex items-center justify-center group-hover:bg-gold transition-colors">
                          <MdPlayArrow className="text-white" size={16} />
                        </div>
                      </div>
                    )}
                    {filtered[activeIdx]?.id === video.id && (
                      <div className="absolute top-1.5 left-1.5 bg-gold text-white
                        text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                        ▶ Playing
                      </div>
                    )}
                    <div className={`absolute top-1.5 right-1.5 text-[9px] font-bold
                      px-1.5 py-0.5 rounded-full
                      ${video.source === 'youtube'
                        ? 'bg-red-600/90 text-white'
                        : 'bg-blue-600/90 text-white'
                      }`}>
                      {video.source === 'youtube' ? 'YT' : 'FB'}
                    </div>
                  </div>
                  <div className="p-2 bg-primary-dark">
                    <p className="text-white/80 text-[11px] font-semibold leading-tight">
                      {video.tag}
                    </p>
                    <p className="text-white/40 text-[10px] mt-0.5 flex items-center gap-0.5">
                      {video.source === 'youtube'
                        ? <><FaYoutube size={8} className="text-red-400" /> YouTube</>
                        : <><FaFacebook size={8} className="text-blue-400" /> Facebook</>
                      }
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
