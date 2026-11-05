import { useEffect, useRef, useState } from 'react';
import { MdPlayArrow, MdOpenInNew } from 'react-icons/md';
import { FaFacebook, FaYoutube, FaPlay, FaExternalLinkAlt } from 'react-icons/fa';

// ── YouTube — plays inline (no login needed) ──
const youtubeVideos = [
  {
    id: 'yt1',
    videoId: '_Zob0a89-Ew',
    tag: 'Official Video',
    source: 'youtube',
    thumb: 'https://img.youtube.com/vi/_Zob0a89-Ew/mqdefault.jpg',
  },
];

// ── Facebook Reels — requires FB login to play inline ──
const facebookReels = [
  {
    id: 'fb1',
    videoId: '1602607494683952',
    tag: 'Project Showcase',
    source: 'facebook',
    thumb: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=400&q=70',
    url: 'https://www.facebook.com/reel/1602607494683952',
  },
  {
    id: 'fb2',
    videoId: '1679734180157167',
    tag: 'Community Tour',
    source: 'facebook',
    thumb: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=70',
    url: 'https://www.facebook.com/reel/1679734180157167',
  },
  {
    id: 'fb3',
    videoId: '1745548686505877',
    tag: 'Lifestyle',
    source: 'facebook',
    thumb: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=70',
    url: 'https://www.facebook.com/reel/1745548686505877',
  },
  {
    id: 'fb4',
    videoId: '2157121364876987',
    tag: 'Latest Update',
    source: 'facebook',
    thumb: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=70',
    url: 'https://www.facebook.com/reel/2157121364876987',
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
  const [activeIdx, setActiveIdx] = useState(0);
  const [ytPlaying, setYtPlaying] = useState(false);
  const [tab, setTab]             = useState('all');

  const filtered = tab === 'youtube'
    ? allVideos.filter(v => v.source === 'youtube')
    : tab === 'facebook'
      ? allVideos.filter(v => v.source === 'facebook')
      : allVideos;

  useEffect(() => { setActiveIdx(0); setYtPlaying(false); }, [tab]);

  const handleSelect = (i) => { setActiveIdx(i); setYtPlaying(false); };

  const activeVideo = filtered[activeIdx] ?? allVideos[0];

  return (
    <section ref={sectionRef} className="py-14 sm:py-20 md:py-28 bg-primary-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
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
            <a href="https://www.youtube.com/@AziziDevelopments" target="_blank" rel="noreferrer"
              className="flex items-center gap-1 text-red-400 text-xs font-semibold hover:text-red-300 transition-colors">
              <FaYoutube size={14} /> YouTube
            </a>
            <a href="https://www.facebook.com/AziziGroup/videos" target="_blank" rel="noreferrer"
              className="flex items-center gap-1 text-blue-400 text-xs font-semibold hover:text-blue-300 transition-colors">
              <FaFacebook size={13} /> Facebook
            </a>
          </div>
        </div>

        {/* Filter tabs */}
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
              <span className="text-[10px] px-1 py-0.5 rounded-full bg-white/20">{t.count}</span>
            </button>
          ))}
        </div>

        {/* Player + Sidebar */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-5 transition-all duration-700
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {/* ── MAIN PLAYER ── */}
          <div className="lg:col-span-2">

            {/* Badges */}
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

            {/* ── YOUTUBE PLAYER ── */}
            {activeVideo.source === 'youtube' && (
              <div className="relative rounded-2xl overflow-hidden bg-black
                ring-1 ring-white/10 shadow-2xl" style={{ paddingBottom: '56.25%' }}>
                {!ytPlaying ? (
                  <div className="absolute inset-0 cursor-pointer group"
                    onClick={() => setYtPlaying(true)}>
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
                      <p className="text-white font-bold text-sm drop-shadow">{activeVideo.tag}</p>
                      <p className="text-white/60 text-xs flex items-center gap-1 mt-0.5">
                        <FaYoutube size={10} className="text-red-400" /> Tap to play
                      </p>
                    </div>
                  </div>
                ) : (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&rel=0&modestbranding=1`}
                    title={activeVideo.tag}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </div>
            )}

            {/* ── FACEBOOK PLAYER ── */}
            {activeVideo.source === 'facebook' && (
              <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl bg-[#18191a]">

                {/* Big thumbnail + info */}
                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                  <img src={activeVideo.thumb} alt={activeVideo.tag}
                    className="absolute inset-0 w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18191a] via-black/30 to-transparent
                    flex flex-col items-center justify-center gap-5 px-6">

                    {/* Facebook logo */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#1877f2] rounded-2xl
                      flex items-center justify-center shadow-xl">
                      <FaFacebook className="text-white" size={30} />
                    </div>

                    <div className="text-center">
                      <p className="text-white font-bold text-base sm:text-lg mb-1">{activeVideo.tag}</p>
                      <p className="text-white/50 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">
                        Facebook requires login to play videos on external websites.
                        Click below to watch on Facebook directly.
                      </p>
                    </div>

                    {/* Watch on Facebook button */}
                    <a
                      href={activeVideo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 bg-[#1877f2] hover:bg-[#166fe5]
                        text-white px-6 sm:px-8 py-3 rounded-xl font-bold text-sm
                        transition-all duration-300 hover:shadow-xl shadow-lg
                        hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <FaFacebook size={16} />
                      Watch on Facebook
                      <FaExternalLinkAlt size={11} />
                    </a>
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="px-4 py-3 flex items-center justify-between border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <FaFacebook className="text-[#1877f2]" size={16} />
                    <span className="text-white/60 text-xs">Azizi Developments · Facebook Reel</span>
                  </div>
                  <a href={activeVideo.url} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1 text-[#1877f2] hover:text-blue-300
                      text-xs font-semibold transition-colors">
                    Open <MdOpenInNew size={13} />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* ── SIDEBAR ── */}
          <div className="lg:col-span-1">
            <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-3 px-1">
              {filtered.length} Video{filtered.length !== 1 ? 's' : ''}
            </p>

            <div className="flex gap-3 overflow-x-auto pb-2
              lg:flex-col lg:overflow-visible lg:space-y-3 lg:max-h-[420px] lg:overflow-y-auto
              scrollbar-none lg:pr-1">
              {filtered.map((video, i) => (
                <button key={video.id} onClick={() => handleSelect(i)}
                  className={`flex-shrink-0 w-36 sm:w-44 lg:w-full rounded-xl overflow-hidden
                    text-left transition-all duration-300 group border-2
                    ${filtered[activeIdx]?.id === video.id
                      ? 'border-gold shadow-lg shadow-gold/20'
                      : 'border-white/10 hover:border-white/30'
                    }`}>
                  <div className="relative bg-gray-900" style={{ paddingBottom: '56.25%' }}>
                    <img src={video.thumb} alt={video.tag}
                      className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
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
                        text-[9px] font-bold px-1.5 py-0.5 rounded-full">▶ Selected</div>
                    )}
                    <div className={`absolute top-1.5 right-1.5 text-[9px] font-bold
                      px-1.5 py-0.5 rounded-full
                      ${video.source === 'youtube' ? 'bg-red-600/90 text-white' : 'bg-blue-600/90 text-white'}`}>
                      {video.source === 'youtube' ? 'YT' : 'FB'}
                    </div>
                  </div>
                  <div className="p-2 bg-primary-dark">
                    <p className="text-white/80 text-[11px] font-semibold leading-tight">{video.tag}</p>
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

            {/* Facebook info note */}
            <div className="mt-4 p-3 bg-white/5 rounded-xl border border-white/10">
              <p className="text-white/50 text-[11px] leading-relaxed">
                <FaFacebook className="inline text-blue-400 mr-1" size={10} />
                <strong className="text-white/70">Facebook videos</strong> require login to play inline.
                Click "Watch on Facebook" to view without leaving this page feel.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
