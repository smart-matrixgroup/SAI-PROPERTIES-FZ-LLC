import { useEffect, useRef, useState } from 'react';
import { MdPlayArrow } from 'react-icons/md';
import { FaFacebook, FaYoutube } from 'react-icons/fa';

// ── YouTube Videos ──
const youtubeVideos = [
  {
    id: 'yt1',
    videoId: '_Zob0a89-Ew',
    title: 'Azizi Developments',
    tag: 'Official Video',
    source: 'youtube',
  },
];

// ── Facebook Reels ──
const facebookReels = [
  { id: 'fb1', videoId: '1602607494683952', tag: 'Project Showcase', source: 'facebook' },
  { id: 'fb2', videoId: '1679734180157167', tag: 'Community Tour',   source: 'facebook' },
  { id: 'fb3', videoId: '1745548686505877', tag: 'Lifestyle',         source: 'facebook' },
  { id: 'fb4', videoId: '2157121364876987', tag: 'Latest Update',     source: 'facebook' },
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
  const visible = useIntersection(sectionRef);
  const [activeIdx, setActiveIdx] = useState(0);
  const [loaded, setLoaded] = useState({});
  const [tab, setTab] = useState('all'); // 'all' | 'youtube' | 'facebook'

  const filtered = tab === 'youtube'
    ? allVideos.filter(v => v.source === 'youtube')
    : tab === 'facebook'
      ? allVideos.filter(v => v.source === 'facebook')
      : allVideos;

  // Reset active when tab changes
  useEffect(() => { setActiveIdx(0); }, [tab]);

  const activeVideo = filtered[activeIdx] ?? allVideos[0];

  const renderPlayer = (video, isMain = false) => {
    if (video.source === 'youtube') {
      return (
        <iframe
          key={video.videoId}
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1${isMain ? '&autoplay=0' : ''}`}
          title={video.tag}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setLoaded(p => ({ ...p, [video.videoId]: true }))}
        />
      );
    }
    return (
      <iframe
        key={video.videoId}
        className="absolute inset-0 w-full h-full"
        src={`https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F${video.videoId}&show_text=false&appId=&width=560`}
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        title={`Azizi Reel ${video.videoId}`}
        onLoad={() => setLoaded(p => ({ ...p, [video.videoId]: true }))}
      />
    );
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-primary-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className={`text-center mb-10 transition-all duration-700
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">Official Videos</p>
          <h2 className="font-heading font-bold text-white text-3xl md:text-4xl leading-tight mb-4">
            Azizi Developments<br />
            <span className="text-gold">Project Videos</span>
          </h2>
          <div className="gold-divider mx-auto mb-4" />
          <p className="text-white/60 max-w-xl mx-auto text-sm">
            Watch official property tours, project showcases and lifestyle videos from Azizi Developments.
          </p>

          {/* Source links */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <a href="https://www.youtube.com/@AziziDevelopments" target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-red-400 hover:text-red-300 text-xs font-semibold transition-colors">
              <FaYoutube size={16} /> YouTube Channel
            </a>
            <a href="https://www.facebook.com/AziziGroup/videos" target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-xs font-semibold transition-colors">
              <FaFacebook size={15} /> Facebook Videos
            </a>
          </div>
        </div>

        {/* ── Filter tabs ── */}
        <div className={`flex justify-center gap-3 mb-8 transition-all duration-700 delay-100
          ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {[
            { key: 'all',      label: 'All Videos',  count: allVideos.length },
            { key: 'youtube',  label: 'YouTube',     count: youtubeVideos.length, icon: <FaYoutube className="text-red-400" size={13}/> },
            { key: 'facebook', label: 'Facebook',    count: facebookReels.length, icon: <FaFacebook className="text-blue-400" size={13}/> },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold
                transition-all duration-300 border
                ${tab === t.key
                  ? 'bg-gold text-white border-gold shadow-lg'
                  : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white'
                }`}>
              {t.icon}
              {t.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full
                ${tab === t.key ? 'bg-white/20' : 'bg-white/10'}`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── Player + Sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main player */}
          <div className={`lg:col-span-2 transition-all duration-700
            ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>

            {/* Source badge */}
            <div className="flex items-center gap-2 mb-3">
              {activeVideo.source === 'youtube' ? (
                <span className="flex items-center gap-1.5 bg-red-600/20 text-red-400
                  border border-red-500/30 px-3 py-1 rounded-full text-xs font-bold">
                  <FaYoutube size={13} /> YouTube
                </span>
              ) : (
                <span className="flex items-center gap-1.5 bg-blue-600/20 text-blue-400
                  border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold">
                  <FaFacebook size={12} /> Facebook
                </span>
              )}
              <span className="text-gold text-xs font-semibold bg-gold/10
                border border-gold/20 px-3 py-1 rounded-full">
                {activeVideo.tag}
              </span>
            </div>

            {/* Video iframe */}
            <div className="relative rounded-2xl overflow-hidden bg-black
              ring-1 ring-white/10 shadow-2xl" style={{ paddingBottom: '56.25%' }}>
              {!loaded[activeVideo.videoId] && (
                <div className="absolute inset-0 flex items-center justify-center bg-primary-dark z-10">
                  <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                </div>
              )}
              {renderPlayer(activeVideo, true)}
            </div>

            {/* External link */}
            <div className="mt-3 flex justify-end">
              {activeVideo.source === 'youtube' ? (
                <a href={`https://youtu.be/${activeVideo.videoId}`}
                  target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-red-400 hover:text-red-300
                    text-xs font-semibold transition-colors">
                  <FaYoutube size={13} /> Watch on YouTube
                </a>
              ) : (
                <a href={`https://www.facebook.com/reel/${activeVideo.videoId}`}
                  target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300
                    text-xs font-semibold transition-colors">
                  <FaFacebook size={13} /> View on Facebook
                </a>
              )}
            </div>
          </div>

          {/* Sidebar thumbnails */}
          <div className={`flex flex-col gap-3 transition-all duration-700 delay-200
            ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <p className="text-white/50 text-xs uppercase tracking-widest font-semibold px-1">
              {filtered.length} Video{filtered.length !== 1 ? 's' : ''}
            </p>

            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1
              scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {filtered.map((video, i) => (
                <button key={video.id} onClick={() => setActiveIdx(i)}
                  className={`w-full relative rounded-xl overflow-hidden text-left
                    transition-all duration-300 group border-2
                    ${activeIdx === i && tab !== 'all' || filtered[activeIdx]?.id === video.id
                      ? 'border-gold shadow-lg shadow-gold/20'
                      : 'border-white/10 hover:border-white/30'
                    }`}>
                  {/* Thumbnail */}
                  <div className="relative bg-primary-dark" style={{ paddingBottom: '56.25%' }}>
                    {video.source === 'youtube' ? (
                      <img
                        src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                        alt={video.tag}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <iframe
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        src={`https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F${video.videoId}&show_text=false&appId=&width=200`}
                        style={{ border: 'none', overflow: 'hidden' }}
                        scrolling="no"
                        frameBorder="0"
                        title={`Thumb ${video.videoId}`}
                        tabIndex={-1}
                      />
                    )}

                    {/* Play overlay */}
                    {filtered[activeIdx]?.id !== video.id && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center
                        group-hover:bg-black/20 transition-colors">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center
                          group-hover:bg-gold transition-colors">
                          <MdPlayArrow className="text-white" size={18} />
                        </div>
                      </div>
                    )}

                    {/* Playing indicator */}
                    {filtered[activeIdx]?.id === video.id && (
                      <div className="absolute top-2 left-2 bg-gold text-white text-[10px]
                        font-bold px-2 py-0.5 rounded-full">▶ Playing</div>
                    )}

                    {/* Source badge */}
                    <div className={`absolute top-2 right-2 text-[10px] font-bold
                      px-2 py-0.5 rounded-full
                      ${video.source === 'youtube'
                        ? 'bg-red-600/80 text-white'
                        : 'bg-blue-600/80 text-white'
                      }`}>
                      {video.source === 'youtube' ? 'YT' : 'FB'}
                    </div>
                  </div>

                  <div className="p-2 bg-primary-dark">
                    <p className="text-white/80 text-xs font-semibold">{video.tag}</p>
                    <p className="text-white/40 text-[10px] mt-0.5 flex items-center gap-1">
                      {video.source === 'youtube'
                        ? <><FaYoutube size={9} className="text-red-400" /> YouTube</>
                        : <><FaFacebook size={9} className="text-blue-400" /> Facebook</>
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
